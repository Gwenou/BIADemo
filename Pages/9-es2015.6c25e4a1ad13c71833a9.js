(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{B5ae:function(e,t,a){"use strict";a.r(t),a.d(t,"PlaneModule",(function(){return ve}));var n=a("tyNb"),s=a("kt0X"),i=a("snw9"),c=a("LRne"),l=a("wO+i"),r=a("eIep"),o=a("lJxs"),b=a("JIr8"),p=a("bOdf"),h=a("zp1y");const d=Object(s.h)("[Planes] Load all by post (PageMode)",Object(s.m)()),u=Object(s.h)("[Planes] Load (PageMode)",Object(s.m)()),m=Object(s.h)("[Planes] Create (PageMode)",Object(s.m)()),g=Object(s.h)("[Planes] Update (PageMode)",Object(s.m)()),f=Object(s.h)("[Planes] Remove (PageMode)",Object(s.m)()),v=Object(s.h)("[Planes] Multi Remove (PageMode)",Object(s.m)()),O=Object(s.h)("[Planes] Load all by post success (PageMode)",Object(s.m)()),S=Object(s.h)("[Planes] Load success (PageMode)",Object(s.m)()),j=Object(s.h)("[Planes] Failure (PageMode)",Object(s.m)());var y=a("dlt+"),C=a("fXoL");let P=(()=>{class e extends y.a{constructor(e){super(e,"Planes")}}return e.\u0275fac=function(t){return new(t||e)(C.Xb(C.r))},e.\u0275prov=C.Jb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var w=a("EVqC");const T=Object(w.a)({selectId:e=>e.id,sortComparer:!1}),x=T.getInitialState({totalCount:0,currentPlane:{},lastLazyLoadEvent:{},loadingGet:!1,loadingGetAll:!1}),D=Object(s.j)(x,Object(s.l)(d,(e,{})=>Object.assign(Object.assign({},e),{loadingGetAll:!0})),Object(s.l)(u,e=>Object.assign(Object.assign({},e),{loadingGet:!0})),Object(s.l)(O,(e,{result:t,event:a})=>{const n=T.setAll(t.data,e);return n.currentPlane={},n.totalCount=t.totalCount,n.lastLazyLoadEvent=a,n.loadingGetAll=!1,n}),Object(s.l)(S,(e,{plane:t})=>Object.assign(Object.assign({},e),{currentPlane:t,loadingGet:!1})),Object(s.l)(j,(e,{})=>Object.assign(Object.assign({},e),{loadingGetAll:!1,loadingGet:!1})));function L(e,t){return Object(s.f)({planes:D})(e,t)}const I=Object(s.i)("planes-mode-page"),k=Object(s.k)(I,e=>e.planes),F=Object(s.k)(k,e=>e.totalCount),A=Object(s.k)(k,e=>e.currentPlane),E=Object(s.k)(k,e=>e.lastLazyLoadEvent),B=Object(s.k)(k,e=>e.loadingGet),N=Object(s.k)(k,e=>e.loadingGetAll),{selectAll:M}=T.getSelectors(k);var $=a("Fx2S");let z=(()=>{class e{constructor(e,t,a,n){this.actions$=e,this.planeDas=t,this.biaMessageService=a,this.store=n,this.loadAllByPost$=Object(i.c)(()=>this.actions$.pipe(Object(i.d)(d),Object(l.a)("event"),Object(r.a)(e=>this.planeDas.getListByPost(e).pipe(Object(o.a)(t=>O({result:t,event:e})),Object(b.a)(e=>(this.biaMessageService.showError(),Object(c.a)(j({error:e})))))))),this.load$=Object(i.c)(()=>this.actions$.pipe(Object(i.d)(u),Object(l.a)("id"),Object(r.a)(e=>this.planeDas.get(e).pipe(Object(o.a)(e=>S({plane:e})),Object(b.a)(e=>(this.biaMessageService.showError(),Object(c.a)(j({error:e})))))))),this.create$=Object(i.c)(()=>this.actions$.pipe(Object(i.d)(m),Object(l.a)("plane"),Object(p.a)(e=>Object(c.a)(e).pipe(Object(h.a)(this.store.select(E)))),Object(r.a)(([e,t])=>this.planeDas.post(e).pipe(Object(o.a)(()=>(this.biaMessageService.showAddSuccess(),d({event:t}))),Object(b.a)(e=>(this.biaMessageService.showError(),Object(c.a)(j({error:e})))))))),this.update$=Object(i.c)(()=>this.actions$.pipe(Object(i.d)(g),Object(l.a)("plane"),Object(p.a)(e=>Object(c.a)(e).pipe(Object(h.a)(this.store.select(E)))),Object(r.a)(([e,t])=>this.planeDas.put(e,e.id).pipe(Object(o.a)(()=>(this.biaMessageService.showUpdateSuccess(),d({event:t}))),Object(b.a)(e=>(this.biaMessageService.showError(),Object(c.a)(j({error:e})))))))),this.destroy$=Object(i.c)(()=>this.actions$.pipe(Object(i.d)(f),Object(l.a)("id"),Object(p.a)(e=>Object(c.a)(e).pipe(Object(h.a)(this.store.select(E)))),Object(r.a)(([e,t])=>this.planeDas.delete(e).pipe(Object(o.a)(()=>(this.biaMessageService.showDeleteSuccess(),d({event:t}))),Object(b.a)(e=>(this.biaMessageService.showError(),Object(c.a)(j({error:e})))))))),this.multiDestroy$=Object(i.c)(()=>this.actions$.pipe(Object(i.d)(v),Object(l.a)("ids"),Object(p.a)(e=>Object(c.a)(e).pipe(Object(h.a)(this.store.select(E)))),Object(r.a)(([e,t])=>this.planeDas.deletes(e).pipe(Object(o.a)(()=>(this.biaMessageService.showDeleteSuccess(),d({event:t}))),Object(b.a)(e=>(this.biaMessageService.showError(),Object(c.a)(j({error:e}))))))))}}return e.\u0275fac=function(t){return new(t||e)(C.Xb(i.a),C.Xb(P),C.Xb($.a),C.Xb(s.b))},e.\u0275prov=C.Jb({token:e,factory:e.\u0275fac}),e})();var V=a("Sa1B"),_=a("VfrA"),G=a("s0Cq"),H=a("E6Oa"),R=a("Iab2"),X=a("RoCi"),q=a("RdrV"),J=a("sYmb"),U=a("XiUz"),K=a("jIms"),Q=a("v8MJ"),Y=a("ofXK");let W=(()=>{class e{constructor(e,t,a,n,s,i){this.store=e,this.router=t,this.authService=a,this.planeDas=n,this.translateService=s,this.biaTranslationService=i,this.flex=!0,this.showColSearch=!1,this.globalSearchValue="",this.defaultPageSize=G.b,this.pageSize=this.defaultPageSize,this.canEdit=!1,this.canDelete=!1,this.canAdd=!1,this.createPlaneRoute="/examples/planes-page/create",this.indexPlaneRoute="/examples/planes-page/"}ngOnInit(){this.initTableConfiguration(),this.setPermissions(),this.planes$=this.store.select(M).pipe(),this.totalCount$=this.store.select(F).pipe(),this.loading$=this.store.select(N).pipe()}onCreate(){this.router.navigate([this.createPlaneRoute])}onEdit(e){this.router.navigate([this.indexPlaneRoute+e+"/edit"])}onDelete(){this.selectedPlanes&&this.store.dispatch(v({ids:this.selectedPlanes.map(e=>e.id)}))}onSelectedElementsChanged(e){this.selectedPlanes=e}onPageSizeChange(e){this.pageSize=e}onLoadLazy(e){this.store.dispatch(d({event:e}))}searchGlobalChanged(e){this.globalSearchValue=e}displayedColumnsChanged(e){this.displayedColumns=e}onToggleSearch(){this.showColSearch=!this.showColSearch}onViewChange(e){this.viewPreference=e}onExportCSV(){const e={};this.columns.map(t=>e[t.value.split(".")[1]]=this.translateService.instant(t.value));const t=Object.assign({columns:e},this.planeListComponent.getLazyLoadMetadata());this.planeDas.getFile(t).subscribe(e=>{R.saveAs(e,this.translateService.instant("app.planes")+".csv")})}setPermissions(){this.canEdit=this.authService.hasPermission(q.a.Plane_Update),this.canDelete=this.authService.hasPermission(q.a.Plane_Delete),this.canAdd=this.authService.hasPermission(q.a.Plane_Create)}initTableConfiguration(){this.biaTranslationService.culture$.subscribe(e=>{this.tableConfiguration={columns:[new _.b("msn","plane.msn"),Object.assign(new _.b("isActive","plane.isActive"),{isSearchable:!1,isSortable:!1,type:_.c.Boolean}),Object.assign(new _.b("firstFlightDate","plane.firstFlightDate"),{type:_.c.Date,formatDate:e.dateFormat}),Object.assign(new _.b("firstFlightTime","plane.firstFlightTime"),{isSearchable:!1,isSortable:!1,type:_.c.Date,formatDate:e.timeFormat}),Object.assign(new _.b("lastFlightDate","plane.lastFlightDate"),{type:_.c.Date,formatDate:e.dateTimeFormat}),Object.assign(new _.b("capacity","plane.capacity"),{type:_.c.Number,filterMode:_.a.Equals})]},this.columns=this.tableConfiguration.columns.map(e=>({key:e.field,value:e.header})),this.displayedColumns=[...this.columns]})}}return e.\u0275fac=function(t){return new(t||e)(C.Nb(s.b),C.Nb(n.c),C.Nb(H.a),C.Nb(P),C.Nb(J.d),C.Nb(X.a))},e.\u0275cmp=C.Hb({type:e,selectors:[["app-planes-index"]],viewQuery:function(e,t){var a;1&e&&C.Lc(V.a,!0),2&e&&C.wc(a=C.cc())&&(t.planeListComponent=a.first)},hostVars:2,hostBindings:function(e,t){2&e&&C.Fb("bia-flex",t.flex)},decls:10,vars:29,consts:[["fxLayout","","fxLayout.xs","column","fxLayoutWrap","wrap"],["fxFlex","100"],[3,"headerTitle","canAdd","canExportCSV","selectedElements","create","exportCSV","delete"],[3,"defaultPageSize","length","columns","columnToDisplays","displayedColumnsChange","filter","pageSizeChange","toggleSearch","viewChange"],[3,"elements","totalRecord","columnToDisplays","pageSize","configuration","showColSearch","globalSearchValue","canEdit","canSelectElement","loading","viewPreference","edit","loadLazy","selectedElementsChanged"]],template:function(e,t){1&e&&(C.Tb(0,"div",0),C.Tb(1,"div",1),C.Tb(2,"bia-table-header",2),C.bc("create",(function(){return t.onCreate()}))("exportCSV",(function(){return t.onExportCSV()}))("delete",(function(){return t.onDelete()})),C.ec(3,"translate"),C.Sb(),C.Tb(4,"bia-table-controller",3),C.bc("displayedColumnsChange",(function(e){return t.displayedColumnsChanged(e)}))("filter",(function(e){return t.searchGlobalChanged(e)}))("pageSizeChange",(function(e){return t.onPageSizeChange(e)}))("toggleSearch",(function(){return t.onToggleSearch()}))("viewChange",(function(e){return t.onViewChange(e)})),C.ec(5,"async"),C.Sb(),C.Tb(6,"bia-table",4),C.bc("edit",(function(e){return t.onEdit(e)}))("loadLazy",(function(e){return t.onLoadLazy(e)}))("selectedElementsChanged",(function(e){return t.onSelectedElementsChanged(e)})),C.ec(7,"async"),C.ec(8,"async"),C.ec(9,"async"),C.Sb(),C.Sb(),C.Sb()),2&e&&(C.Bb(2),C.kc("headerTitle",C.fc(3,19,"plane.listOf"))("canAdd",t.canAdd)("canExportCSV",!0)("selectedElements",t.selectedPlanes),C.Bb(2),C.kc("defaultPageSize",t.defaultPageSize)("length",C.fc(5,21,t.totalCount$))("columns",t.columns)("columnToDisplays",t.displayedColumns),C.Bb(2),C.kc("elements",C.fc(7,23,t.planes$))("totalRecord",C.fc(8,25,t.totalCount$))("columnToDisplays",t.displayedColumns)("pageSize",t.pageSize)("configuration",t.tableConfiguration)("showColSearch",t.showColSearch)("globalSearchValue",t.globalSearchValue)("canEdit",t.canEdit)("canSelectElement",t.canDelete)("loading",C.fc(9,27,t.loading$))("viewPreference",t.viewPreference))},directives:[U.d,U.b,K.a,Q.a,V.a],pipes:[J.c,Y.b],styles:["[_nghost-%COMP%]{flex-direction:column}bia-table-controller[_ngcontent-%COMP%]{margin-left:-35px;margin-right:-35px}"]}),e})();var Z=a("PCNd"),ee=a("3Pt+"),te=a("7kUa"),ae=a("Ji6n"),ne=a("eO1q"),se=a("PjIi"),ie=a("jIHw");let ce=(()=>{class e{constructor(e){this.formBuilder=e,this.plane={},this.save=new C.n,this.cancel=new C.n,this.initForm()}ngOnInit(){}ngOnChanges(e){e.plane&&(this.form.reset(),this.plane&&this.form.patchValue(Object.assign({},this.plane)))}initForm(){this.form=this.formBuilder.group({id:[this.plane.id],msn:[this.plane.msn,ee.o.required],isActive:[this.plane.isActive],firstFlightDate:[this.plane.firstFlightDate,ee.o.required],firstFlightTime:[this.plane.firstFlightTime,ee.o.required],lastFlightDate:[this.plane.lastFlightDate],capacity:[this.plane.capacity,ee.o.required]})}onCancel(){this.form.reset(),this.cancel.next()}onSubmit(){if(this.form.valid){const e=this.form.value;e.id=e.id>0?e.id:0,e.isActive=!!e.isActive&&e.isActive,this.save.emit(e),this.form.reset()}}}return e.\u0275fac=function(t){return new(t||e)(C.Nb(ee.b))},e.\u0275cmp=C.Hb({type:e,selectors:[["app-plane-form"]],inputs:{plane:"plane"},outputs:{save:"save",cancel:"cancel"},features:[C.zb],decls:53,vars:28,consts:[["fxLayout","column",3,"formGroup","submit"],["fxLayout","row","fxLayoutAlign","center"],["fxFlex","90",1,"app-field-container"],[1,"md-inputfield"],["formControlName","msn","type","text","pInputText","","maxlength","64"],[1,"bia-star-mandatory"],["binary","true","formControlName","isActive",3,"label"],["biaLocale","","formControlName","firstFlightDate","placeholder","\xa0","dateFormat","yy-mm-dd",3,"showButtonBar"],["formControlName","firstFlightTime","showTime","true","placeholder","\xa0",3,"timeOnly"],["biaLocale","","formControlName","lastFlightDate","showTime","true","placeholder","DateTime","dateFormat","yy-mm-dd","placeholder","\xa0"],["formControlName","capacity","type","number","pInputText",""],["fxLayout","row","fxLayoutGap","5px","fxLayoutAlign","end end"],["pButton","","type","submit",3,"label","disabled"],["pButton","","type","button",1,"ui-button-secondary",3,"label","click"]],template:function(e,t){1&e&&(C.Tb(0,"form",0),C.bc("submit",(function(){return t.onSubmit()})),C.Tb(1,"div",1),C.Tb(2,"div",2),C.Tb(3,"span",3),C.Ob(4,"input",4),C.Tb(5,"label"),C.Tb(6,"span",5),C.Hc(7,"*"),C.Sb(),C.Hc(8),C.ec(9,"translate"),C.Sb(),C.Sb(),C.Sb(),C.Sb(),C.Tb(10,"div",1),C.Tb(11,"div",2),C.Ob(12,"p-checkbox",6),C.ec(13,"translate"),C.Sb(),C.Sb(),C.Tb(14,"div",1),C.Tb(15,"div",2),C.Tb(16,"span",3),C.Ob(17,"p-calendar",7),C.Tb(18,"label"),C.Tb(19,"span",5),C.Hc(20,"*"),C.Sb(),C.Hc(21),C.ec(22,"translate"),C.Sb(),C.Sb(),C.Sb(),C.Sb(),C.Tb(23,"div",1),C.Tb(24,"div",2),C.Tb(25,"span",3),C.Ob(26,"p-calendar",8),C.Tb(27,"label"),C.Tb(28,"span",5),C.Hc(29,"*"),C.Sb(),C.Hc(30),C.ec(31,"translate"),C.Sb(),C.Sb(),C.Sb(),C.Sb(),C.Tb(32,"div",1),C.Tb(33,"div",2),C.Tb(34,"span",3),C.Ob(35,"p-calendar",9),C.Tb(36,"label"),C.Hc(37),C.ec(38,"translate"),C.Sb(),C.Sb(),C.Sb(),C.Sb(),C.Tb(39,"div",1),C.Tb(40,"div",2),C.Tb(41,"span",3),C.Ob(42,"input",10),C.Tb(43,"label"),C.Tb(44,"span",5),C.Hc(45,"*"),C.Sb(),C.Hc(46),C.ec(47,"translate"),C.Sb(),C.Sb(),C.Sb(),C.Sb(),C.Tb(48,"div",11),C.Ob(49,"button",12),C.ec(50,"translate"),C.Tb(51,"button",13),C.bc("click",(function(){return t.onCancel()})),C.ec(52,"translate"),C.Sb(),C.Sb(),C.Sb()),2&e&&(C.kc("formGroup",t.form),C.Bb(8),C.Ic(C.fc(9,12,"plane.msn")),C.Bb(4),C.lc("label",C.fc(13,14,"plane.isActive")),C.Bb(5),C.kc("showButtonBar",!0),C.Bb(4),C.Ic(C.fc(22,16,"plane.firstFlightDate")),C.Bb(5),C.kc("timeOnly",!0),C.Bb(4),C.Ic(C.fc(31,18,"plane.firstFlightTime")),C.Bb(7),C.Ic(C.fc(38,20,"plane.lastFlightDate")),C.Bb(9),C.Ic(C.fc(47,22,"plane.capacity")),C.Bb(3),C.lc("label",C.fc(50,24,"bia.save")),C.kc("disabled",!t.form.valid),C.Bb(2),C.lc("label",C.fc(52,26,"bia.cancel")))},directives:[ee.p,ee.k,U.d,ee.f,U.c,U.b,ee.a,ee.j,ee.e,te.a,ee.h,ae.a,ne.a,se.a,ee.m,U.e,ie.b],pipes:[J.c],styles:[".app-field-container[_ngcontent-%COMP%]{margin-top:20px;margin-bottom:20px}"],changeDetection:0}),e})(),le=(()=>{class e{constructor(e,t){this.store=e,this.location=t}ngOnInit(){}onSubmitted(e){this.store.dispatch(m({plane:e})),this.location.back()}onCancelled(){this.plane={},this.location.back()}}return e.\u0275fac=function(t){return new(t||e)(C.Nb(s.b),C.Nb(Y.i))},e.\u0275cmp=C.Hb({type:e,selectors:[["app-plane-new"]],decls:1,vars:1,consts:[[3,"plane","cancel","save"]],template:function(e,t){1&e&&(C.Tb(0,"app-plane-form",0),C.bc("cancel",(function(){return t.onCancelled()}))("save",(function(e){return t.onSubmitted(e)})),C.Sb()),2&e&&C.kc("plane",t.plane)},directives:[ce],styles:[""]}),e})();var re=a("quSY");let oe=(()=>{class e{constructor(e){this.store=e,this.sub=new re.a,this.InitSub(),this.loading$=this.store.select(B),this.plane$=this.store.select(A)}get currentPlane(){var e;return(null===(e=this._currentPlane)||void 0===e?void 0:e.id)===this._currentPlaneId?this._currentPlane:null}get currentPlaneId(){return this._currentPlaneId}set currentPlaneId(e){this._currentPlaneId=Number(e),this.store.dispatch(u({id:e}))}InitSub(){this.sub=new re.a,this.sub.add(this.store.select(A).subscribe(e=>{e&&(this._currentPlane=e)}))}}return e.\u0275fac=function(t){return new(t||e)(C.Xb(s.b))},e.\u0275prov=C.Jb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var be=a("y0gQ");function pe(e,t){1&e&&C.Ob(0,"bia-spinner",2),2&e&&C.kc("overlay",!0)}let he=(()=>{class e{constructor(e,t,a){this.store=e,this.location=t,this.planeService=a,this.displayChange=new C.n,this.sub=new re.a}ngOnInit(){}ngOnDestroy(){this.sub&&this.sub.unsubscribe()}onSubmitted(e){this.store.dispatch(g({plane:e})),this.location.back()}onCancelled(){this.location.back()}}return e.\u0275fac=function(t){return new(t||e)(C.Nb(s.b),C.Nb(Y.i),C.Nb(oe))},e.\u0275cmp=C.Hb({type:e,selectors:[["app-plane-edit"]],outputs:{displayChange:"displayChange"},decls:4,vars:6,consts:[[3,"plane","cancel","save"],[3,"overlay",4,"ngIf"],[3,"overlay"]],template:function(e,t){1&e&&(C.Tb(0,"app-plane-form",0),C.bc("cancel",(function(){return t.onCancelled()}))("save",(function(e){return t.onSubmitted(e)})),C.ec(1,"async"),C.Sb(),C.Fc(2,pe,1,1,"bia-spinner",1),C.ec(3,"async")),2&e&&(C.kc("plane",C.fc(1,2,t.planeService.plane$)),C.Bb(2),C.kc("ngIf",C.fc(3,4,t.planeService.loading$)))},directives:[ce,Y.m,be.a],pipes:[Y.b],styles:[""]}),e})();var de=a("+dww"),ue=a("95+j"),me=a("SxV6");function ge(e,t){1&e&&C.Ob(0,"bia-spinner",1),2&e&&C.kc("overlay",!0)}const fe=[{path:"",data:{breadcrumb:null,permission:q.a.Plane_List_Access},component:W,canActivate:[de.a]},{path:"create",data:{breadcrumb:"bia.add",canNavigate:!1,permission:q.a.Plane_Create},component:le,canActivate:[de.a]},{path:":planeId",data:{breadcrumb:"",canNavigate:!0},component:(()=>{class e{constructor(e,t,a,n){this.store=e,this.route=t,this.planeService=a,this.layoutService=n,this.sub=new re.a}ngOnInit(){this.planeService.currentPlaneId=this.route.snapshot.params.planeId,this.sub.add(this.store.select(A).subscribe(e=>{(null==e?void 0:e.msn)&&(this.route.data.pipe(Object(me.a)()).subscribe(t=>{t.breadcrumb=e.msn}),this.layoutService.refreshBreadcrumb())}))}ngOnDestroy(){this.sub&&this.sub.unsubscribe()}}return e.\u0275fac=function(t){return new(t||e)(C.Nb(s.b),C.Nb(n.a),C.Nb(oe),C.Nb(ue.a))},e.\u0275cmp=C.Hb({type:e,selectors:[["ng-component"]],decls:3,vars:3,consts:[[3,"overlay",4,"ngIf"],[3,"overlay"]],template:function(e,t){1&e&&(C.Ob(0,"router-outlet"),C.Fc(1,ge,1,1,"bia-spinner",0),C.ec(2,"async")),2&e&&(C.Bb(1),C.kc("ngIf",C.fc(2,1,t.planeService.loading$)))},directives:[n.g,Y.m,be.a],pipes:[Y.b],styles:[""]}),e})(),canActivate:[de.a],children:[{path:"edit",data:{breadcrumb:"bia.edit",canNavigate:!0,permission:q.a.Plane_Update},component:he,canActivate:[de.a]},{path:"",redirectTo:"edit"}]},{path:"**",redirectTo:""}];let ve=(()=>{class e{}return e.\u0275mod=C.Lb({type:e}),e.\u0275inj=C.Kb({factory:function(t){return new(t||e)},imports:[[Z.a,n.f.forChild(fe),s.d.forFeature("planes-mode-page",L),i.b.forFeature([z])]]}),e})()}}]);