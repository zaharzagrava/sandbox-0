(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{154:function(e,t,a){e.exports=a(257)},255:function(e,t,a){},257:function(e,t,a){"use strict";a.r(t);var n,r=a(0),c=a.n(r),i=a(34),s=a.n(i),o=a(5),l=a.n(o),u=a(8),m=a(23),p=a(143);!function(e){e[e.LOGGED_OUT=0]="LOGGED_OUT",e[e.LOGGED_IN=1]="LOGGED_IN"}(n||(n={}));var d={loginStatus:n.LOGGED_OUT,idToken:"",taskEditDetails:{isOpen:!1,taskId:void 0},taskDetails:{isOpen:!1,taskId:void 0}},f=Object(p.a)((function(e,t){switch(t.type){case"LOGIN_STATUS_UPDATED":return void(e.loginStatus=t.payload);case"ID_TOKEN_UPDATED":return void(e.idToken=t.payload);case"TASK_EDIT_DETAILS_UPDATED":return void(e.taskEditDetails=t.payload);case"TASK_DETAILS_UPDATED":e.taskDetails=t.payload;default:return}}),d),E=function(e){return{type:"LOGIN_STATUS_UPDATED",payload:e}},b=function(e){return{type:"ID_TOKEN_UPDATED",payload:e}},v=function(e,t){return{type:"TASK_EDIT_DETAILS_UPDATED",payload:{isOpen:e,taskId:t}}},h=function(e,t){return{type:"TASK_DETAILS_UPDATED",payload:{isOpen:e,taskId:t}}},y=a(17),k=a(78);a(165);k.apps.length||k.initializeApp({apiKey:"AIzaSyBKIhgWwpaPkkvBC3hPnkVLFD77dAN3MS0",authDomain:"sandbox-0-9b0fb.firebaseapp.com",databaseURL:"https://sandbox-0-9b0fb.firebaseio.com",projectId:"sandbox-0-9b0fb",storageBucket:"sandbox-0-9b0fb.appspot.com",messagingSenderId:"567540248172",appId:"1:567540248172:web:b8ef6638dfb7bbe8ecf249",measurementId:"G-6ET7PKN5F2"});var w=function(){var e=Object(u.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==(t=k.auth().currentUser)){e.next=3;break}throw new Error("firebaseUser === null");case 3:return e.next=5,t.getIdToken();case 5:if(""!==(a=e.sent)){e.next=8;break}throw new Error("idToken === ''");case 8:return e.abrupt("return",a);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=a(79);var O=function(){return c.a.createElement(c.a.Fragment,null,c.a.createElement("nav",{"aria-label":"breadcrumb"},c.a.createElement("ol",{className:"breadcrumb"},c.a.createElement("li",{className:"breadcrumb-item active","aria-current":"page"},"Authorization Page"))),c.a.createElement("div",{className:"container d-flex justify-content-center"},c.a.createElement("div",{className:"p-2 bd-highlight"},c.a.createElement(_.b,{to:"/login"},c.a.createElement("button",{type:"button",className:"btn btn-primary"},"Login"))),c.a.createElement("div",{className:"p-2 bd-highlight"},c.a.createElement(_.b,{to:"/register"},c.a.createElement("button",{type:"button",className:"btn btn-primary"},"Register")))))},T=a(72),N=a.n(T),g=a(41);function D(e){return x.apply(this,arguments)}function x(){return(x=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,N.a.post("/signup",{client_name:t.client_name,email:t.email,client_password:t.client_password});case 3:e.next=8;break;case 5:throw e.prev=5,e.t0=e.catch(0),e.t0;case 8:case"end":return e.stop()}}),e,null,[[0,5]])})))).apply(this,arguments)}function I(e){return j.apply(this,arguments)}function j(){return(j=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.auth().signInWithEmailAndPassword(t.email,t.client_password).catch((function(e){throw console.log("@rest/login"),e}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(e,t){return Object(g.b)([e,t,"GET"],function(){var e=Object(u.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,N.a.get("/tasks");case 3:return a=e.sent,e.abrupt("return",a.data);case 7:throw e.prev=7,e.t0=e.catch(0),console.log("rest/useGetTasks"),e.t0;case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),{refetchOnWindowFocus:!1})}function A(e){return R.apply(this,arguments)}function R(){return(R=Object(u.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N.a.put("".concat("/tasks","/").concat(t.id),t);case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var P;!function(e){e.ACTIVE_FIRST="Active First",e.COMPLETED_FIRST="Completed First",e.DURATION_DATE="Duration Date",e.PRIORITY="Priority"}(P||(P={}));var C=a(117),F=a(104);var L=function(e){var t,a=e.id,n=e.title,i=e.is_done,s=Object(y.b)(),o=Object(r.useState)(!1),p=Object(m.a)(o,2),d=p[0],f=p[1],E=Object(F.b)({opacity:d?1:0}),b=(t=void 0,Object(g.a)(function(){var e=Object(u.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,N.a.delete("".concat("/tasks","/").concat(t.id));case 3:return a=e.sent,e.abrupt("return",a.data);case 7:throw e.prev=7,e.t0=e.catch(0),console.log("rest/useDeleteTask"),e.t0;case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),{onSuccess:t})),k=Object(m.a)(b,1)[0],w=Object(g.c)();function _(){return(_=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),t.stopPropagation(),e.next=4,k({id:a});case 4:w.invalidateQueries(["task",{},"GET"]);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(){return(O=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),t.stopPropagation(),s(v(!0,a));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function T(){return(T=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),s(h(!0,a));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return c.a.createElement("div",{className:"row border my-2 py-2",onClick:function(e){return T.apply(this,arguments)},onMouseEnter:function(e){return f(!0)},onMouseLeave:function(e){return f(!1)}},c.a.createElement("div",{className:"col-auto"},c.a.createElement("span",{style:{fontWeight:i?"bold":"normal"}},n)),c.a.createElement(F.a.button,{className:"col-auto",style:E,onClick:function(e){return _.apply(this,arguments)}},c.a.createElement(C.a,{icon:"trash"})),c.a.createElement(F.a.button,{className:"col-auto mx-2",style:E,onClick:function(e){return O.apply(this,arguments)}},c.a.createElement(C.a,{icon:"edit"})))},U=a(10),G=a(82),q=a.n(G),V=a(148),M=a.n(V),K=a(19);var Y=function(e){var t=e.children;return c.a.createElement("div",{style:{color:"red"}},t)},z={id:-1,title:"",task_description:"",is_done:!1,task_priority:1,due_date:new Date},B=K.c({title:K.d().required("Required"),task_description:K.d().required("Required"),task_priority:K.b().required("Requried"),due_date:K.a().required("Requried")});q.a.setAppElement("#root");var Q=function(){var e,t=Object(r.useState)(!0),a=Object(m.a)(t,2),n=a[0],i=a[1],s=Object(y.b)(),o=Object(y.c)((function(e){return e.client.taskEditDetails})),p=S("task",{}),d=p.data,f=p.status,E=p.error,b=Object(g.c)(),h=(e=void 0,Object(g.a)(function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,A(t);case 3:return e.abrupt("return",e.sent);case 6:throw e.prev=6,e.t0=e.catch(0),console.log("rest/usePutTask"),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}(),{onSuccess:e})),k=Object(m.a)(h,1)[0],w=function(e){return Object(g.a)(function(){var e=Object(u.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,N.a.post("/tasks",t);case 3:return a=e.sent,e.abrupt("return",a.data);case 7:throw e.prev=7,e.t0=e.catch(0),console.log("rest/usePostTask"),e.t0;case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),{onSuccess:e})}(void 0),_=Object(m.a)(w,1)[0];if(!o.isOpen)return n||i(!0),c.a.createElement(c.a.Fragment,null);if("loading"===f)return c.a.createElement("div",null,"Loading...");if(E)return c.a.createElement("div",null,"Error!");var O=void 0!==o.taskId;if(O){var T=(d=d).find((function(e){return e.id===o.taskId}));void 0!==T&&n&&(z={id:T.id,title:T.title,task_description:T.task_description,is_done:T.is_done,task_priority:T.task_priority,due_date:T.due_date},console.log("@initialValues"),console.log(z),i(!1))}function D(e){return x.apply(this,arguments)}function x(){return(x=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s(v(!1));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function I(){return(I=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k(t);case 2:b.invalidateQueries(["task",{},"GET"]);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function j(){return(j=Object(u.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_(t);case 2:a=e.sent,b.invalidateQueries(["task",{},"GET"]),s(v(!0,null===a||void 0===a?void 0:a.id));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return c.a.createElement(q.a,{isOpen:o.isOpen,onRequestClose:D},c.a.createElement(U.d,{initialValues:z,enableReinitialize:!0,validationSchema:B,onSubmit:O?function(e){return I.apply(this,arguments)}:function(e){return j.apply(this,arguments)}},c.a.createElement(U.c,null,c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row py-3"},c.a.createElement("div",{className:"col d-flex justify-content-end"},c.a.createElement("button",{onClick:D,className:"close"},c.a.createElement("span",{"aria-hidden":"true"},"\xd7")))),c.a.createElement("div",{className:"row py-2"},c.a.createElement(U.b,{name:"title",placeholder:"Task Title",className:"form-control"}),c.a.createElement(U.a,{component:Y,name:"title"})),c.a.createElement("div",{className:"row py-2"},c.a.createElement(U.b,{as:"textarea",name:"task_description",placeholder:"Task Description",className:"form-control"}),c.a.createElement(U.a,{component:Y,name:"task_description"})),c.a.createElement("div",{className:"row py-2"},c.a.createElement("label",null,c.a.createElement(U.b,{type:"checkbox",name:"is_done"})," Is Done",c.a.createElement(U.a,{component:Y,name:"is_done"}))),c.a.createElement("div",{className:"row py-2"},c.a.createElement(U.b,{name:"task_priority",placeholder:"Task Priority",className:"form-control"}),c.a.createElement(U.a,{component:Y,name:"task_priority"})),c.a.createElement("div",{className:"row py-2"},c.a.createElement(U.b,{name:"due_date"},(function(e){var t=e.field,a=e.form;e.meta;return c.a.createElement(M.a,{selected:t.value&&new Date(t.value)||null,onChange:function(e,t){e=e,a.setFieldValue("due_date",e)}})})),c.a.createElement(U.a,{component:Y,name:"due_date"})),c.a.createElement("div",{className:"row py-2 d-flex justify-content-center"},c.a.createElement("button",{type:"submit",className:"btn btn-primary"},O?c.a.createElement(c.a.Fragment,null,"Save"):c.a.createElement(c.a.Fragment,null,"Create")))))))};var W=function(){var e=Object(y.b)(),t=Object(y.c)((function(e){return e.client.taskDetails})),a=S("task",{}),n=a.data,r=a.status,i=a.error;if(!t.isOpen)return c.a.createElement(c.a.Fragment,null);if("loading"===r)return c.a.createElement("div",null,"Loading...");if(i)return c.a.createElement("div",null,"Error!");if(void 0===t.taskId)return c.a.createElement(c.a.Fragment,null,"taskId must be defined!");var s=(n=n).find((function(e){return e.id===t.taskId}));function o(e){return m.apply(this,arguments)}function m(){return(m=Object(u.a)(l.a.mark((function t(a){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e(h(!1));case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return c.a.createElement(q.a,{isOpen:t.isOpen,onRequestClose:o},c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row py-3"},c.a.createElement("div",{className:"col d-flex justify-content-end"},c.a.createElement("button",{onClick:o,className:"close"},c.a.createElement("span",{"aria-hidden":"true"},"\xd7")))),c.a.createElement("h4",{className:"row py-2"},s.title),c.a.createElement("p",{className:"row py-2"},s.task_description),c.a.createElement("p",{className:"row py-2"},s.is_done?"Done":"Active"),c.a.createElement("p",{className:"row py-2"},s.task_priority),c.a.createElement("p",{className:"row py-2"},s.due_date)))},J=a(153),X=a(80),H=a(121),Z=new J.a;X.b.add(H.b,H.a);var $=function(){var e,t=Object(r.useState)(P.ACTIVE_FIRST),a=Object(m.a)(t,2),n=a[0],i=a[1],s=S("task",{}),o=s.data,p=s.status,d=s.error,f=Object(y.b)();if("loading"===p)return c.a.createElement("div",null,"Loading...");if(d)return c.a.createElement("div",null,"Error!");function E(){return(E=Object(u.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),void 0!==o){e.next=3;break}return e.abrupt("return");case 3:for(a=0;a<o.length;a++)A({id:o[a].id,is_done:!1});case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function b(){return(b=Object(u.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),void 0!==o){e.next=3;break}return e.abrupt("return");case 3:for(a=0;a<o.length;a++)A({id:o[a].id,is_done:!0});case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function h(){return(h=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),f(v(!0,void 0));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return function(e,t){e.sort((function(e,a){switch(t){case P.ACTIVE_FIRST:return void 0===e.is_done?1:void 0===a.is_done?-1:e.is_done<a.is_done?1:-1;case P.COMPLETED_FIRST:return void 0===e.is_done?1:void 0===a.is_done||e.is_done<a.is_done?-1:1;case P.DURATION_DATE:return void 0===e.due_date?1:void 0===a.due_date||e.due_date<a.due_date?-1:1;case P.PRIORITY:return void 0===e.task_priority?1:void 0===a.task_priority||e.task_priority<a.task_priority?-1:1;default:return 0}}))}(o=o,n),c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"container my-4"},c.a.createElement("div",{className:"row"},c.a.createElement("button",{className:"btn btn-primary",onClick:function(e){return h.apply(this,arguments)}},"Create a task"),c.a.createElement("div",{className:"form-group"},c.a.createElement("select",{className:"form-control",id:"sel1",onChange:function(e){switch(e.target.value){case P.COMPLETED_FIRST:i(P.COMPLETED_FIRST);break;case P.DURATION_DATE:i(P.DURATION_DATE);break;case P.PRIORITY:i(P.PRIORITY);break;default:i(P.ACTIVE_FIRST)}}},c.a.createElement("option",null,P.ACTIVE_FIRST),c.a.createElement("option",null,P.COMPLETED_FIRST),c.a.createElement("option",null,P.DURATION_DATE),c.a.createElement("option",null,P.PRIORITY))),c.a.createElement("button",{className:"btn btn-primary",onClick:function(e){return b.apply(this,arguments)}},"Mark all as Done"),c.a.createElement("button",{className:"btn btn-primary",onClick:function(e){return E.apply(this,arguments)}},"Mark all as Undone")),o.map((function(e,t){return c.a.createElement(L,{key:e.id,id:e.id,title:e.title,is_done:e.is_done})})),c.a.createElement("div",{className:"row my-4 d-flex justify-content-center"},(null===(e=k.auth().currentUser)||void 0===e?void 0:e.emailVerified)||c.a.createElement("button",{className:"btn btn-primary",onClick:function(e){var t;null===(t=k.auth().currentUser)||void 0===t||t.sendEmailVerification().then((function(){})).catch((function(e){throw console.log("pages/TaskPage/Email Verification"),e}))}},"Verify Email"))),c.a.createElement(Q,null),c.a.createElement(W,null))},ee=a(7),te={email:"",client_password:""},ae=K.c({email:K.d().email("Invalid Email").required("Required"),client_password:K.d().min(6,"Password must be at least 6 characters long")});var ne=function(){function e(){return(e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:I(t);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return c.a.createElement(c.a.Fragment,null,c.a.createElement(U.d,{initialValues:te,validationSchema:ae,onSubmit:function(t){return e.apply(this,arguments)}},c.a.createElement(U.c,null,c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row py-2"},c.a.createElement("div",{className:"col-md-12"},c.a.createElement(U.b,{type:"email",name:"email",placeholder:"Email Address",className:"form-control"}),c.a.createElement(U.a,{component:Y,name:"email"}))),c.a.createElement("div",{className:"row py-2"},c.a.createElement("div",{className:"col-md-12"},c.a.createElement(U.b,{type:"password",name:"client_password",placeholder:"Password",className:"form-control"}),c.a.createElement(U.a,{component:Y,name:"client_password"}))),c.a.createElement("div",{className:"row py-2"},c.a.createElement("div",{className:"col-md-12 d-flex justify-content-center p-2"},c.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Login")))))))},re={client_name:"",email:"",client_password:""},ce=K.c({client_name:K.d().required("Required"),email:K.d().email("Invalid Email").required("Required"),client_password:K.d().min(6,"Password must be at least 6 characters long").required("Requried")});var ie=function(){var e=Object(r.useState)(""),t=Object(m.a)(e,2),a=t[0],n=t[1];function i(){return(i=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D(t);case 3:e.next=16;break;case 5:if(e.prev=5,e.t0=e.catch(0),"client_name must be unique"!==e.t0.response.data){e.next=11;break}n("This username is already taken"),e.next=16;break;case 11:if("email must be unique"!==e.t0.response.data){e.next=15;break}n("This email is already taken"),e.next=16;break;case 15:throw e.t0;case 16:case"end":return e.stop()}}),e,null,[[0,5]])})))).apply(this,arguments)}return c.a.createElement(c.a.Fragment,null,c.a.createElement(U.d,{initialValues:re,validationSchema:ce,onSubmit:function(e){return i.apply(this,arguments)}},c.a.createElement(U.c,null,c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row py-2"},c.a.createElement("div",{className:"col-md-12"},c.a.createElement(U.b,{type:"text",name:"client_name",placeholder:"Full Name",className:"form-control"}),c.a.createElement(U.a,{component:Y,name:"client_name"}))),c.a.createElement("div",{className:"row py-2"},c.a.createElement("div",{className:"col-md-12"},c.a.createElement(U.b,{type:"email",name:"email",placeholder:"Email Address",className:"form-control"}),c.a.createElement(U.a,{component:Y,name:"email"}))),c.a.createElement("div",{className:"row py-2"},c.a.createElement("div",{className:"col-md-12"},c.a.createElement(U.b,{type:"password",name:"client_password",placeholder:"Password",className:"form-control"}),c.a.createElement(U.a,{component:Y,name:"client_password"}))),c.a.createElement(Y,null,a),c.a.createElement("div",{className:"row py-2"},c.a.createElement("div",{className:"col-md-12 d-flex justify-content-center p-2"},c.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Register")))))))},se=a(151);var oe=function(e){return Object(se.a)(e),c.a.createElement("h1",null,"This page is not found")};var le=function(){var e=Object(y.b)(),t=Object(r.useState)(!0),a=Object(m.a)(t,2),i=a[0],s=a[1],o=Object(y.c)((function(e){return e.client.idToken})),p=Object(y.c)((function(e){return e.client.loginStatus}));return Object(r.useEffect)((function(){function t(){return(t=Object(u.a)(l.a.mark((function t(a){var r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,s(!1),!a){t.next=11;break}return e(E(n.LOGGED_IN)),t.next=6,w();case 6:r=t.sent,e(b(r)),Z.set("idToken",r,{path:"/"}),t.next=12;break;case 11:e(E(n.LOGGED_OUT));case 12:t.next=18;break;case 14:t.prev=14,t.t0=t.catch(0),console.log("App/useEffect"),console.log(t.t0);case 18:setTimeout((function(){w().then((function(t){e(b(t))})).catch((function(e){console.log("App/useEffect/setTimeout"),console.log(e)}))}),18e5);case 19:case"end":return t.stop()}}),t,null,[[0,14]])})))).apply(this,arguments)}k.auth().onAuthStateChanged((function(e){!function(e){t.apply(this,arguments)}(e)}))}),[]),i?c.a.createElement(c.a.Fragment,null):p===n.LOGGED_IN&&""!==o?(["/login","/register"].includes(window.location.href)&&(console.log("@window.location.href"),console.log(window.location.href),window.history.replaceState("","Task Manager","/")),c.a.createElement(ee.c,null,c.a.createElement(ee.a,{path:"/",exact:!0,component:$}),c.a.createElement(ee.a,{path:"/login",exact:!0,component:$}),c.a.createElement(ee.a,{path:"/register",exact:!0,component:$}),c.a.createElement(ee.a,{component:oe}))):c.a.createElement(ee.c,null,c.a.createElement(ee.a,{path:"/",exact:!0,component:O}),c.a.createElement(ee.a,{path:"/login",exact:!0,component:ne}),c.a.createElement(ee.a,{path:"/register",exact:!0,component:ie}),c.a.createElement(ee.a,{component:oe}))},ue=(a(255),a(256),a(50)),me=Object(ue.b)({client:f}),pe=a(152),de=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||ue.c,fe=Object(ue.d)(me,de());k.auth().signOut(),s.a.render(c.a.createElement(c.a.Fragment,null,c.a.createElement(y.a,{store:fe},c.a.createElement(c.a.StrictMode,null,c.a.createElement(_.a,null,c.a.createElement(le,null)))),c.a.createElement(pe.ReactQueryDevtools,null)),document.getElementById("root"))}},[[154,1,2]]]);
//# sourceMappingURL=main.ba4ea30b.chunk.js.map