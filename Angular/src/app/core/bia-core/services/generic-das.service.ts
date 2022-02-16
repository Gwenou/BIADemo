import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, first, map } from 'rxjs/operators';
import { from, NEVER, Observable, of, throwError } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';
import { DataResult } from 'src/app/shared/bia-shared/model/data-result';
import { DateHelperService } from './date-helper.service';
import { MatomoTracker } from './matomo/matomo-tracker.service';
import { OnlineOfflineService } from './online-offline.service';
import { AppDB, DataItem } from '../db';

export interface HttpOptions {
  headers?:
  | HttpHeaders
  | {
    [header: string]: string | string[];
  };
  observe?: any;
  params?:
  | HttpParams
  | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
}

interface HttpParam {
  offlineMode?: boolean;
  options?: HttpOptions;
  endpoint?: string;
}

export interface GetParam extends HttpParam {
  id?: string | number;
}

export interface GetListParam extends HttpParam {
}

export interface GetListByPostParam extends HttpParam {
  event: LazyLoadEvent;
}

export interface SaveParam<TIn> extends HttpParam {
  items: TIn[],
}

export interface PutParam<TIn> extends HttpParam {
  item: TIn;
  id: string | number;
}

export interface PostParam<TIn> extends HttpParam {
  item: TIn;
}

export interface DeleteParam extends HttpParam {
  id: string | number;
}

export interface DeletesParam extends HttpParam {
  ids: string[] | number[];
}

export abstract class GenericDas {
  public http: HttpClient;
  public route: string;
  protected matomoTracker: MatomoTracker;
  protected db: AppDB;

  constructor(protected injector: Injector, protected endpoint: string) {
    this.http = injector.get<HttpClient>(HttpClient);
    this.route = GenericDas.buildRoute(endpoint);
    this.matomoTracker = injector.get<MatomoTracker>(MatomoTracker);
    if (OnlineOfflineService.isModeEnabled === true) {
      this.db = injector.get<AppDB>(AppDB);
    }
  }

  public static buildRoute(endpoint: string): string {
    let route = '/' + endpoint + '/';
    route = route.replace('//', '/');
    return environment.apiUrl + route;
  }

  getItem<TOut>(param?: GetParam): Observable<TOut> {
    if (param) {
      param.endpoint = param.endpoint ?? '';
    }

    const url = `${this.route}${param?.endpoint}${param?.id}`;

    let obs$ = this.http.get<TOut>(url, param?.options).pipe(
      map((data) => {
        DateHelperService.fillDate(data);
        this.translateItem(data);
        return data;
      })
    );

    if (param?.offlineMode === true && OnlineOfflineService.isModeEnabled === true) {
      obs$ = this.getWithCatchErrorOffline(obs$, url);
      obs$.pipe(first()).subscribe((result: TOut) => {
        this.clearDataByUrl(url);
        this.addDataTtem(url, result);
      });
    }

    return obs$;
  }

  getListItems<TOut>(param?: GetListParam): Observable<TOut[]> {
    if (param) {
      param.endpoint = param.endpoint ?? '';
    }
    const url = `${this.route}${param?.endpoint}`;

    let obs$ = this.http.get<TOut[]>(url, param?.options).pipe(
      map((items) => {
        items.forEach((item) => {
          DateHelperService.fillDate(item);
          this.translateItem(item);
        });
        return items;
      }));

    if (param?.offlineMode === true && OnlineOfflineService.isModeEnabled === true) {
      obs$ = this.getListWithCatchErrorOffline(obs$, url);
      obs$.pipe(first()).subscribe((results: TOut[]) => {
        this.clearDataByUrl(url);
        results.forEach((result) => {
          this.addDataTtem(url, result);
        });
      });
    }

    return obs$;
  }

  getListItemsByPost<TOut>(param: GetListByPostParam): Observable<DataResult<TOut[]>> {
    if (!param.event) {
      return of();
    }

    param.endpoint = param.endpoint ?? 'all';

    return this.http.post<TOut[]>(`${this.route}${param.endpoint}`, param.event, { observe: 'response' }).pipe(
      map((resp: HttpResponse<TOut[]>) => {
        const totalCount = Number(resp.headers.get('X-Total-Count'));
        const datas = resp.body ? resp.body : [];
        datas.forEach((data) => {
          DateHelperService.fillDate(data);
          this.translateItem(data);
        });

        const dataResult = {
          totalCount,
          data: datas
        } as DataResult<TOut[]>;
        return dataResult;
      })
    );
  }

  saveItem<TIn, TOut>(param: SaveParam<TIn>) {
    param.endpoint = param.endpoint ?? 'save';
    if (param.items) {
      param.items.forEach((item) => {
        DateHelperService.fillDate(item);
      });
    }

    if (param.offlineMode === true) {
      param.options = OnlineOfflineService.addHttpHeaderRetry(param.options);
      return this.setWithCatchErrorOffline(this.http.post<TOut>(`${this.route}${param.endpoint}`, param.items, param.options));
    } else {
      return this.http.post<TOut>(`${this.route}${param.endpoint}`, param.items, param.options);
    }
  }

  putItem<TIn, TOut>(param: PutParam<TIn>) {
    param.endpoint = param.endpoint ?? '';
    DateHelperService.fillDate(param.item);

    if (param.offlineMode === true) {
      param.options = OnlineOfflineService.addHttpHeaderRetry(param.options);
      return this.setWithCatchErrorOffline(this.http.put<TOut>(`${this.route}${param.endpoint}${param.id}`, param.item, param.options));
    } else {
      return this.http.put<TOut>(`${this.route}${param.endpoint}${param.id}`, param.item, param.options);
    }
  }

  postItem<TIn, TOut>(param: PostParam<TIn>) {
    param.endpoint = param.endpoint ?? '';
    DateHelperService.fillDate(param.item);

    if (param.offlineMode === true) {
      param.options = OnlineOfflineService.addHttpHeaderRetry(param.options);
      return this.setWithCatchErrorOffline(this.http.post<TOut>(this.route, param.item, param.options));
    } else {
      return this.http.post<TOut>(this.route, param.item, param.options);
    }
  }

  deleteItem(param: DeleteParam) {
    param.endpoint = param.endpoint ?? '';

    if (param.offlineMode === true) {
      param.options = OnlineOfflineService.addHttpHeaderRetry(param.options);
      return this.setWithCatchErrorOffline(this.http.delete<void>(`${this.route}${param.endpoint}${param.id}`, param.options));
    } else {
      return this.http.delete<void>(`${this.route}${param.endpoint}${param.id}`, param.options);
    }
  }

  deleteItems(param: DeletesParam) {
    param.endpoint = param.endpoint ?? '';

    if (param.offlineMode === true) {
      param.options = OnlineOfflineService.addHttpHeaderRetry(param.options);
      return this.setWithCatchErrorOffline(this.http.delete<void>(`${this.route}${param.endpoint}?ids=${param.ids.join('&ids=')}`, param.options));
    } else {
      return this.http.delete<void>(`${this.route}${param.endpoint}?ids=${param.ids.join('&ids=')}`, param.options);
    }
  }

  getItemFile(event: LazyLoadEvent, endpoint: string = 'csv'): Observable<any> {
    this.matomoTracker.trackDownload('Export ' + endpoint);
    return this.http.post(`${this.route}${endpoint}`, event, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  translateItem<TOut>(item: TOut) {
    return item;
  }

  protected setWithCatchErrorOffline(obs$: Observable<any>) {
    return obs$.pipe(
      catchError((error) => {
        if (OnlineOfflineService.isModeEnabled === true && OnlineOfflineService.isServerAvailable(error) !== true) {
          return NEVER;
        }
        return throwError(error);
      })
    );
  }

  protected getListWithCatchErrorOffline(obs$: Observable<any>, url: string) {
    return obs$.pipe(
      catchError((error) => {
        if (OnlineOfflineService.isModeEnabled === true && OnlineOfflineService.isServerAvailable(error) !== true) {
          return from(this.db.datas.filter(function (x) {
            return x.url === url;
          }).toArray()).pipe(
            map((dataItems: DataItem[]) => dataItems.map((dataItem) => dataItem.data))
          );
        }
        return throwError(error);
      })
    );
  }

  protected getWithCatchErrorOffline(obs$: Observable<any>, url: string) {
    return obs$.pipe(
      catchError((error) => {
        if (OnlineOfflineService.isModeEnabled === true && OnlineOfflineService.isServerAvailable(error) !== true) {
          return from(this.db.datas.filter(function (x) {
            return x.url === url;
          }).first()).pipe(
            map((dataItem: DataItem | undefined) => dataItem ? dataItem.data : undefined)
          );
        }
        return throwError(error);
      })
    );
  }

  protected clearDataByUrl(url: string) {
    this.db.datas.filter(function (x) {
      return x.url === url;
    }).delete();
  }

  protected addDataTtem(url: string, result: any) {
    const data: DataItem = <DataItem>{ url: url, data: result };
    this.db.datas?.add(data);
  }
}
