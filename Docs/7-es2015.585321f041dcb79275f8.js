(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{x9I7:function(e,t,i){"use strict";i.r(t),i.d(t,"AirportModule",(function(){return Ce}));var a=i("tyNb"),s=i("kt0X"),r=i("snw9"),o=i("LRne"),n=i("wO+i"),c=i("eIep"),l=i("lJxs"),b=i("JIr8"),p=i("bOdf"),h=i("zp1y");const d=Object(s.h)("[Airports] Load all by post",Object(s.m)()),u=Object(s.h)("[Airports] Load",Object(s.m)()),g=Object(s.h)("[Airports] Create",Object(s.m)()),f=Object(s.h)("[Airports] Update",Object(s.m)()),O=Object(s.h)("[Airports] Remove",Object(s.m)()),m=Object(s.h)("[Airports] Multi Remove",Object(s.m)()),j=Object(s.h)("[Airports] Load all by post success",Object(s.m)()),S=Object(s.h)("[Airports] Load success",Object(s.m)()),v=Object(s.h)("[Airports] Failure",Object(s.m)()),y=Object(s.h)("[Airports] Open dialog edit"),C=Object(s.h)("[Airports] Close dialog edit"),w=Object(s.h)("[Airports] Open dialog new"),A=Object(s.h)("[Airports] Close dialog new");var x=i("dlt+"),T=i("fXoL");let D=(()=>{class e extends x.a{constructor(e){super(e,"Airports")}}return e.\u0275fac=function(t){return new(t||e)(T.Xb(T.r))},e.\u0275prov=T.Jb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var L=i("EVqC");const E=Object(L.a)({selectId:e=>e.id,sortComparer:!1}),z=E.getInitialState({totalCount:0,currentAirport:{},lastLazyLoadEvent:{},loadingGet:!1,loadingGetAll:!1,displayEditDialog:!1,displayNewDialog:!1}),k=Object(s.j)(z,Object(s.l)(w,e=>Object.assign(Object.assign({},e),{displayNewDialog:!0})),Object(s.l)(A,e=>Object.assign(Object.assign({},e),{displayNewDialog:!1})),Object(s.l)(y,e=>Object.assign(Object.assign({},e),{displayEditDialog:!0})),Object(s.l)(C,e=>Object.assign(Object.assign({},e),{displayEditDialog:!1})),Object(s.l)(d,(e,{})=>Object.assign(Object.assign({},e),{loadingGetAll:!0})),Object(s.l)(u,e=>Object.assign(Object.assign({},e),{loadingGet:!0})),Object(s.l)(j,(e,{result:t,event:i})=>{const a=E.setAll(t.data,e);return a.totalCount=t.totalCount,a.lastLazyLoadEvent=i,a.loadingGetAll=!1,a}),Object(s.l)(S,(e,{airport:t})=>Object.assign(Object.assign({},e),{currentAirport:t,loadingGet:!1})),Object(s.l)(v,(e,{})=>Object.assign(Object.assign({},e),{loadingGetAll:!1,loadingGet:!1})));function $(e,t){return Object(s.f)({airports:k})(e,t)}const P=Object(s.i)("airports"),B=Object(s.k)(P,e=>e.airports),I=Object(s.k)(B,e=>e.totalCount),M=Object(s.k)(B,e=>e.currentAirport),V=Object(s.k)(B,e=>e.lastLazyLoadEvent),N=Object(s.k)(B,e=>e.loadingGet),G=Object(s.k)(B,e=>e.loadingGetAll),F=Object(s.k)(B,e=>e.displayEditDialog),H=Object(s.k)(B,e=>e.displayNewDialog),{selectAll:J}=E.getSelectors(B);var X=i("Fx2S");let R=(()=>{class e{constructor(e,t,i,a){this.actions$=e,this.airportDas=t,this.biaMessageService=i,this.store=a,this.loadAllByPost$=Object(r.c)(()=>this.actions$.pipe(Object(r.d)(d),Object(n.a)("event"),Object(c.a)(e=>this.airportDas.getListByPost(e).pipe(Object(l.a)(t=>j({result:t,event:e})),Object(b.a)(e=>(this.biaMessageService.showError(),Object(o.a)(v({error:e})))))))),this.load$=Object(r.c)(()=>this.actions$.pipe(Object(r.d)(u),Object(n.a)("id"),Object(c.a)(e=>this.airportDas.get(e).pipe(Object(l.a)(e=>S({airport:e})),Object(b.a)(e=>(this.biaMessageService.showError(),Object(o.a)(v({error:e})))))))),this.create$=Object(r.c)(()=>this.actions$.pipe(Object(r.d)(g),Object(n.a)("airport"),Object(p.a)(e=>Object(o.a)(e).pipe(Object(h.a)(this.store.select(V)))),Object(c.a)(([e,t])=>this.airportDas.post(e).pipe(Object(l.a)(()=>(this.biaMessageService.showAddSuccess(),d({event:t}))),Object(b.a)(e=>(this.biaMessageService.showError(),Object(o.a)(v({error:e})))))))),this.update$=Object(r.c)(()=>this.actions$.pipe(Object(r.d)(f),Object(n.a)("airport"),Object(p.a)(e=>Object(o.a)(e).pipe(Object(h.a)(this.store.select(V)))),Object(c.a)(([e,t])=>this.airportDas.put(e,e.id).pipe(Object(l.a)(()=>(this.biaMessageService.showUpdateSuccess(),d({event:t}))),Object(b.a)(e=>(this.biaMessageService.showError(),Object(o.a)(v({error:e})))))))),this.destroy$=Object(r.c)(()=>this.actions$.pipe(Object(r.d)(O),Object(n.a)("id"),Object(p.a)(e=>Object(o.a)(e).pipe(Object(h.a)(this.store.select(V)))),Object(c.a)(([e,t])=>this.airportDas.delete(e).pipe(Object(l.a)(()=>(this.biaMessageService.showDeleteSuccess(),d({event:t}))),Object(b.a)(e=>(this.biaMessageService.showError(),Object(o.a)(v({error:e})))))))),this.multiDestroy$=Object(r.c)(()=>this.actions$.pipe(Object(r.d)(m),Object(n.a)("ids"),Object(p.a)(e=>Object(o.a)(e).pipe(Object(h.a)(this.store.select(V)))),Object(c.a)(([e,t])=>this.airportDas.deletes(e).pipe(Object(l.a)(()=>(this.biaMessageService.showDeleteSuccess(),d({event:t}))),Object(b.a)(e=>(this.biaMessageService.showError(),Object(o.a)(v({error:e}))))))))}}return e.\u0275fac=function(t){return new(t||e)(T.Xb(r.a),T.Xb(D),T.Xb(X.a),T.Xb(s.b))},e.\u0275prov=T.Jb({token:e,factory:e.\u0275fac}),e})();var _=i("Sa1B"),q=i("VfrA"),U=i("s0Cq"),W=i("E6Oa"),K=i("Iab2"),Q=i("RoCi"),Y=i("RdrV"),Z=i("sYmb"),ee=i("XiUz"),te=i("jIms"),ie=i("v8MJ"),ae=i("quSY"),se=i("/RsI"),re=i("7zfz"),oe=i("3Pt+"),ne=i("7kUa"),ce=i("jIHw");let le=(()=>{class e{constructor(e){this.formBuilder=e,this.airport={},this.save=new T.n,this.cancel=new T.n,this.initForm()}ngOnInit(){}ngOnChanges(e){e.airport&&(this.form.reset(),this.airport&&this.form.patchValue(Object.assign({},this.airport)))}initForm(){this.form=this.formBuilder.group({id:[this.airport.id],name:[this.airport.name,oe.o.required],city:[this.airport.city,oe.o.required]})}onCancel(){this.form.reset(),this.cancel.next()}onSubmit(){if(this.form.valid){const e=this.form.value;e.id=e.id>0?e.id:0,this.save.emit(e),this.form.reset()}}}return e.\u0275fac=function(t){return new(t||e)(T.Nb(oe.b))},e.\u0275cmp=T.Hb({type:e,selectors:[["app-airport-form"]],inputs:{airport:"airport"},outputs:{save:"save",cancel:"cancel"},features:[T.zb],decls:24,vars:14,consts:[["fxLayout","column",3,"formGroup","submit"],["fxLayout","row","fxLayoutAlign","center"],["fxFlex","90",1,"app-field-container"],[1,"md-inputfield"],["formControlName","name","type","text","pInputText","","maxlength","64"],[1,"bia-star-mandatory"],["formControlName","city","type","text","pInputText","","maxlength","64"],["fxLayout","row","fxLayoutGap","5px","fxLayoutAlign","end end"],["pButton","","type","submit",3,"label","disabled"],["pButton","","type","button",1,"ui-button-secondary",3,"label","click"]],template:function(e,t){1&e&&(T.Tb(0,"form",0),T.bc("submit",(function(){return t.onSubmit()})),T.Tb(1,"div",1),T.Tb(2,"div",2),T.Tb(3,"span",3),T.Ob(4,"input",4),T.Tb(5,"label"),T.Tb(6,"span",5),T.Hc(7,"*"),T.Sb(),T.Hc(8),T.ec(9,"translate"),T.Sb(),T.Sb(),T.Sb(),T.Sb(),T.Tb(10,"div",1),T.Tb(11,"div",2),T.Tb(12,"span",3),T.Ob(13,"input",6),T.Tb(14,"label"),T.Tb(15,"span",5),T.Hc(16,"*"),T.Sb(),T.Hc(17),T.ec(18,"translate"),T.Sb(),T.Sb(),T.Sb(),T.Sb(),T.Tb(19,"div",7),T.Ob(20,"button",8),T.ec(21,"translate"),T.Tb(22,"button",9),T.bc("click",(function(){return t.onCancel()})),T.ec(23,"translate"),T.Sb(),T.Sb(),T.Sb()),2&e&&(T.kc("formGroup",t.form),T.Bb(8),T.Ic(T.fc(9,6,"airport.name")),T.Bb(9),T.Ic(T.fc(18,8,"airport.city")),T.Bb(3),T.lc("label",T.fc(21,10,"bia.save")),T.kc("disabled",!t.form.valid),T.Bb(2),T.lc("label",T.fc(23,12,"bia.cancel")))},directives:[oe.p,oe.k,ee.d,oe.f,ee.c,ee.b,oe.a,oe.j,oe.e,ne.a,oe.h,ee.e,ce.b],pipes:[Z.c],styles:[".app-field-container[_ngcontent-%COMP%]{margin-top:20px;margin-bottom:20px}"],changeDetection:0}),e})();var be=i("ofXK"),pe=i("y0gQ");function he(e,t){1&e&&T.Ob(0,"bia-spinner",3),2&e&&T.kc("overlay",!0)}const de=function(){return{minWidth:"50vw"}},ue=function(){return{overflow:"auto"}};let ge=(()=>{class e{constructor(e){this.store=e,this.display=!1,this.sub=new ae.a,this.displayChange=new T.n}ngOnInit(){this.loading$=this.store.select(N).pipe(),this.airport$=this.store.select(M).pipe(),this.sub.add(this.store.select(F).pipe().subscribe(e=>this.display=e))}ngOnDestroy(){this.sub&&this.sub.unsubscribe()}onSubmitted(e){this.store.dispatch(f({airport:e})),this.close()}onCancelled(){this.close()}close(){this.store.dispatch(C())}}return e.\u0275fac=function(t){return new(t||e)(T.Nb(s.b))},e.\u0275cmp=T.Hb({type:e,selectors:[["app-airport-edit-dialog"]],outputs:{displayChange:"displayChange"},decls:8,vars:20,consts:[[3,"focusOnShow","visible","modal","closable","responsive","maximizable","contentStyle","visibleChange"],[3,"airport","cancel","save"],[3,"overlay",4,"ngIf"],[3,"overlay"]],template:function(e,t){1&e&&(T.Tb(0,"p-dialog",0),T.bc("visibleChange",(function(e){return t.display=e})),T.Tb(1,"p-header"),T.Hc(2),T.ec(3,"translate"),T.Sb(),T.Tb(4,"app-airport-form",1),T.bc("cancel",(function(){return t.onCancelled()}))("save",(function(e){return t.onSubmitted(e)})),T.ec(5,"async"),T.Sb(),T.Fc(6,he,1,1,"bia-spinner",2),T.ec(7,"async"),T.Sb()),2&e&&(T.Dc(T.nc(18,de)),T.kc("focusOnShow",!1)("visible",t.display)("modal",!0)("closable",!1)("responsive",!0)("maximizable",!0)("contentStyle",T.nc(19,ue)),T.Bb(2),T.Jc(" ",T.fc(3,12,"airport.edit")," "),T.Bb(2),T.kc("airport",T.fc(5,14,t.airport$)),T.Bb(2),T.kc("ngIf",T.fc(7,16,t.loading$)))},directives:[se.a,re.c,le,be.m,pe.a],pipes:[Z.c,be.b],styles:[""]}),e})();const fe=function(){return{minWidth:"50vw"}},Oe=function(){return{overflow:"auto"}};let me=(()=>{class e{constructor(e){this.store=e,this.display=!1,this.sub=new ae.a,this.displayChange=new T.n}ngOnInit(){this.sub.add(this.store.select(H).pipe().subscribe(e=>this.display=e))}ngOnDestroy(){this.sub&&this.sub.unsubscribe()}onSubmitted(e){this.store.dispatch(g({airport:e})),this.close()}onCancelled(){this.airport={},this.close()}close(){this.store.dispatch(A())}}return e.\u0275fac=function(t){return new(t||e)(T.Nb(s.b))},e.\u0275cmp=T.Hb({type:e,selectors:[["app-airport-new-dialog"]],outputs:{displayChange:"displayChange"},decls:5,vars:15,consts:[[3,"focusOnShow","visible","modal","closable","responsive","maximizable","contentStyle","visibleChange"],[3,"airport","cancel","save"]],template:function(e,t){1&e&&(T.Tb(0,"p-dialog",0),T.bc("visibleChange",(function(e){return t.display=e})),T.Tb(1,"p-header"),T.Hc(2),T.ec(3,"translate"),T.Sb(),T.Tb(4,"app-airport-form",1),T.bc("cancel",(function(){return t.onCancelled()}))("save",(function(e){return t.onSubmitted(e)})),T.Sb(),T.Sb()),2&e&&(T.Dc(T.nc(13,fe)),T.kc("focusOnShow",!1)("visible",t.display)("modal",!0)("closable",!1)("responsive",!0)("maximizable",!0)("contentStyle",T.nc(14,Oe)),T.Bb(2),T.Jc(" ",T.fc(3,11,"airport.add")," "),T.Bb(2),T.kc("airport",t.airport))},directives:[se.a,re.c,le],pipes:[Z.c],styles:[""]}),e})(),je=(()=>{class e{constructor(e,t,i,a,s){this.store=e,this.authService=t,this.airportDas=i,this.translateService=a,this.biaTranslationService=s,this.flex=!0,this.showColSearch=!1,this.globalSearchValue="",this.defaultPageSize=U.b,this.pageSize=this.defaultPageSize,this.canEdit=!1,this.canDelete=!1,this.canAdd=!1}ngOnInit(){this.initTableConfiguration(),this.setPermissions(),this.airports$=this.store.select(J).pipe(),this.totalCount$=this.store.select(I).pipe(),this.loading$=this.store.select(G).pipe()}onCreate(){this.store.dispatch(w())}onEdit(e){this.store.dispatch(u({id:e})),this.store.dispatch(y())}onDelete(){this.selectedAirports&&this.store.dispatch(m({ids:this.selectedAirports.map(e=>e.id)}))}onSelectedElementsChanged(e){this.selectedAirports=e}onPageSizeChange(e){this.pageSize=e}onLoadLazy(e){this.store.dispatch(d({event:e}))}searchGlobalChanged(e){this.globalSearchValue=e}displayedColumnsChanged(e){this.displayedColumns=e}onToggleSearch(){this.showColSearch=!this.showColSearch}onViewChange(e){this.viewPreference=e}onExportCSV(){const e={};this.columns.map(t=>e[t.value.split(".")[1]]=this.translateService.instant(t.value));const t=Object.assign({columns:e},this.airportListComponent.getLazyLoadMetadata());this.airportDas.getFile(t).subscribe(e=>{K.saveAs(e,this.translateService.instant("app.airports")+".csv")})}setPermissions(){this.canEdit=this.authService.hasPermission(Y.a.Airport_Update),this.canDelete=this.authService.hasPermission(Y.a.Airport_Delete),this.canAdd=this.authService.hasPermission(Y.a.Airport_Create)}initTableConfiguration(){this.biaTranslationService.culture$.subscribe(e=>{this.tableConfiguration={columns:[new q.b("name","airport.name"),new q.b("city","airport.city")]},this.columns=this.tableConfiguration.columns.map(e=>({key:e.field,value:e.header})),this.displayedColumns=[...this.columns]})}}return e.\u0275fac=function(t){return new(t||e)(T.Nb(s.b),T.Nb(W.a),T.Nb(D),T.Nb(Z.d),T.Nb(Q.a))},e.\u0275cmp=T.Hb({type:e,selectors:[["app-airports-index"]],viewQuery:function(e,t){var i;1&e&&T.Lc(_.a,!0),2&e&&T.wc(i=T.cc())&&(t.airportListComponent=i.first)},hostVars:2,hostBindings:function(e,t){2&e&&T.Fb("bia-flex",t.flex)},decls:12,vars:29,consts:[["fxLayout","","fxLayout.xs","column","fxLayoutWrap","wrap"],["fxFlex","100"],[3,"headerTitle","canAdd","canExportCSV","selectedElements","create","exportCSV","delete"],[3,"defaultPageSize","length","columns","columnToDisplays","displayedColumnsChange","filter","pageSizeChange","toggleSearch","viewChange"],[3,"elements","totalRecord","columnToDisplays","pageSize","configuration","showColSearch","globalSearchValue","canEdit","canSelectElement","loading","viewPreference","edit","loadLazy","selectedElementsChanged"]],template:function(e,t){1&e&&(T.Tb(0,"div",0),T.Tb(1,"div",1),T.Tb(2,"bia-table-header",2),T.bc("create",(function(){return t.onCreate()}))("exportCSV",(function(){return t.onExportCSV()}))("delete",(function(){return t.onDelete()})),T.ec(3,"translate"),T.Sb(),T.Tb(4,"bia-table-controller",3),T.bc("displayedColumnsChange",(function(e){return t.displayedColumnsChanged(e)}))("filter",(function(e){return t.searchGlobalChanged(e)}))("pageSizeChange",(function(e){return t.onPageSizeChange(e)}))("toggleSearch",(function(){return t.onToggleSearch()}))("viewChange",(function(e){return t.onViewChange(e)})),T.ec(5,"async"),T.Sb(),T.Tb(6,"bia-table",4),T.bc("edit",(function(e){return t.onEdit(e)}))("loadLazy",(function(e){return t.onLoadLazy(e)}))("selectedElementsChanged",(function(e){return t.onSelectedElementsChanged(e)})),T.ec(7,"async"),T.ec(8,"async"),T.ec(9,"async"),T.Sb(),T.Sb(),T.Sb(),T.Ob(10,"app-airport-edit-dialog"),T.Ob(11,"app-airport-new-dialog")),2&e&&(T.Bb(2),T.kc("headerTitle",T.fc(3,19,"airport.listOf"))("canAdd",t.canAdd)("canExportCSV",!0)("selectedElements",t.selectedAirports),T.Bb(2),T.kc("defaultPageSize",t.defaultPageSize)("length",T.fc(5,21,t.totalCount$))("columns",t.columns)("columnToDisplays",t.displayedColumns),T.Bb(2),T.kc("elements",T.fc(7,23,t.airports$))("totalRecord",T.fc(8,25,t.totalCount$))("columnToDisplays",t.displayedColumns)("pageSize",t.pageSize)("configuration",t.tableConfiguration)("showColSearch",t.showColSearch)("globalSearchValue",t.globalSearchValue)("canEdit",t.canEdit)("canSelectElement",t.canDelete)("loading",T.fc(9,27,t.loading$))("viewPreference",t.viewPreference))},directives:[ee.d,ee.b,te.a,ie.a,_.a,ge,me],pipes:[Z.c,be.b],styles:["[_nghost-%COMP%]{flex-direction:column}bia-table-controller[_ngcontent-%COMP%]{margin-left:-35px;margin-right:-35px}"]}),e})();var Se=i("PCNd"),ve=i("+dww");const ye=[{path:"",data:{breadcrumb:null,permission:Y.a.Airport_List_Access},component:je,canActivate:[ve.a]},{path:"**",redirectTo:""}];let Ce=(()=>{class e{}return e.\u0275mod=T.Lb({type:e}),e.\u0275inj=T.Kb({factory:function(t){return new(t||e)},imports:[[Se.a,a.f.forChild(ye),s.d.forFeature("airports",$),r.b.forFeature([R])]]}),e})()}}]);