(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{109:function(e,t,a){"use strict";a.d(t,"b",function(){return r});let n={dialogs:[{id:1,name:"Dimych"},{id:2,name:"Andrew"},{id:3,name:"Sveta"},{id:4,name:"Sasha"},{id:5,name:"Viktor"},{id:6,name:"Valera"}],messages:[{id:1,message:"Hi"},{id:2,message:"How is your it-kamasutra?"},{id:3,message:"Yo"},{id:4,message:"Yo"},{id:5,message:"Yo"}]};const r=e=>({type:"SEND_MESSAGE",newMessageBody:e});t.a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SEND_MESSAGE":let a=t.newMessageBody;return{...e,messages:[...e.messages,{id:6,message:a}]};default:return e}}},116:function(e,t,a){e.exports={preloader:"Preloader_preloader__2PJeb"}},12:function(e,t,a){"use strict";a.d(t,"b",function(){return s}),a.d(t,"a",function(){return o}),a.d(t,"c",function(){return l});var n=a(114);const r=n.create({withCredentials:!0,baseURL:"https://social-network.samuraijs.com/api/1.0/",headers:{"API-KEY":"d0638082-d4cb-497d-8342-fc69bd07577d"}}),s={getUsers(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;return r.get("users?page=".concat(e,"&count=").concat(t)).then(e=>e.data)},unfollowUser:e=>r.delete("follow/".concat(e)).then(e=>e.data),followUser:e=>r.post("follow/".concat(e)).then(e=>e.data),getUserProfile:e=>(console.warn("Use ProfileAPI object"),o.getUserProfile(e))},o={getUserProfile:e=>r.get("profile/".concat(e)).then(e=>e.data),getStatus:e=>r.get("profile/status/".concat(e)),updateStatus:e=>r.put("profile/status",{status:e})},l={authMe:()=>r.get("auth/me"),login(e,t){let a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return r.post("auth/login",{email:e,password:t,rememberMe:a})},logout:()=>r.delete("auth/login")}},121:function(e,t,a){"use strict";a.d(t,"a",function(){return i});var n=a(0),r=a.n(n),s=a(286),o=a(9);let l=e=>({isAuth:e.auth.isAuth});const i=e=>{return Object(o.b)(l)(class extends r.a.Component{render(){return this.props.isAuth?r.a.createElement(e,this.props):r.a.createElement(s.a,{to:"/login"})}})}},14:function(e,t,a){e.exports={nav:"Navbar_nav__3Attt",item:"Navbar_item__lcYeZ",activeLink:"Navbar_activeLink__1DrKN"}},147:function(e,t,a){e.exports=a(285)},152:function(e,t,a){},153:function(e,t,a){},25:function(e,t,a){"use strict";a.d(t,"b",function(){return c}),a.d(t,"a",function(){return u}),a.d(t,"c",function(){return d});var n=a(0),r=a.n(n),s=a(74),o=a(43),l=a.n(o);const i=e=>{let{input:t,meta:{touched:a,error:n},children:s}=e;const o=a&&n;return r.a.createElement("div",{className:l.a.formControl+" "+(o?l.a.error:"")},r.a.createElement("div",null,s),o&&r.a.createElement("span",null," ",n))},c=e=>{const{input:t,meta:a,child:n,...s}=e;return r.a.createElement(i,e,r.a.createElement("textarea",Object.assign({},t,s)))},u=e=>{const{input:t,meta:a,...n}=e;return r.a.createElement(i,e,r.a.createElement("input",Object.assign({},t,n)))},d=function(e,t,a,n){let o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},l=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"";return r.a.createElement("div",null,r.a.createElement(s.a,Object.assign({component:n,validate:a,name:t,placeholder:e},o)),l)}},285:function(e,t,a){"use strict";a.r(t);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var n=a(0),r=a.n(n),s=a(112),o=a.n(s),l=(a(152),a(153),a(14)),i=a.n(l),c=a(289);var u=()=>r.a.createElement("nav",{className:i.a.nav},r.a.createElement("div",{className:i.a.item},r.a.createElement(c.a,{to:"/profile",activeClassName:i.a.activeLink},"Profile")),r.a.createElement("div",{className:"".concat(i.a.item," ").concat(i.a.active)},r.a.createElement(c.a,{to:"/dialogs",activeClassName:i.a.activeLink},"Messages")),r.a.createElement("div",{className:i.a.item},r.a.createElement(c.a,{to:"/users",activeClassName:i.a.activeLink},"Users")),r.a.createElement("div",{className:i.a.item},r.a.createElement("a",null,"News")),r.a.createElement("div",{className:i.a.item},r.a.createElement("a",null,"Music")),r.a.createElement("div",{className:i.a.item},r.a.createElement("a",null,"Settings"))),d=a(113),m=a(9),g=a(12);const p=(e,t,a,n)=>e.map(e=>e[a]===t?{...e,...n}:e);let E={users:[],pageSize:10,totalUsersCount:0,currentPage:1,isFetching:!0,followingInProgress:[]};const h=e=>({type:"FOLLOW",userId:e}),f=e=>({type:"UNFOLLOW",userId:e}),_=e=>({type:"SET_USERS",users:e}),v=e=>({type:"SET_CURRENT_PAGE",currentPage:e}),w=e=>({type:"TOGGLE_IS_FETCHING",isFetching:e}),b=(e,t)=>({type:"TOGGLE_IS_FOLOWWING_PROGRESS",isFetching:e,userId:t}),S=async(e,t,a,n)=>{e(b(!0,t)),0===(await a(t)).resultCode&&e(n(t)),e(b(!1,t))};var P=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FOLLOW":return{...e,users:p(e.users,t.userId,"id",{followed:!0})};case"UNFOLLOW":return{...e,users:p(e.users,t.userId,"id",{followed:!1})};case"SET_USERS":return{...e,users:t.users};case"SET_CURRENT_PAGE":return{...e,currentPage:t.currentPage};case"SET_TOTAL_USERS_COUNT":return{...e,totalUsersCount:t.totalUsersCount};case"TOGGLE_IS_FETCHING":return{...e,isFetching:t.isFetching};case"TOGGLE_IS_FOLOWWING_PROGRESS":return{...e,followingInProgress:t.isFetching?[...e.followingInProgress,t.userId]:e.followingInProgress.filter(e=>e!=t.userId)};default:return e}},C=a(34),U=a.n(C),y=a(115),O=a.n(y);var N=e=>{let{totalItemsCount:t,pageSize:a,currentPage:s,onPageChanged:o,portionSize:l=10}=e,i=Math.ceil(t/a),c=[];for(let n=1;n<=i;n++)c.push(n);let u=Math.ceil(i/l),[d,m]=Object(n.useState)(1),g=(d-1)*l+1,p=d*l;return r.a.createElement("div",{className:U.a.paginator},d>1&&r.a.createElement("button",{className:U.a.button,onClick:()=>{m(d-1)}},"PREV"),c.filter(e=>e>=g&&e<=p).map(e=>r.a.createElement("span",{className:O()({[U.a.active]:s===e},U.a.pageNumber),onClick:()=>{o(e)},key:e},e)),u>d&&r.a.createElement("button",{className:U.a.button,onClick:()=>{m(d+1)}},"Next"))},I=a(39),T=a.n(I),A=a(76),k=a.n(A);var L=e=>{let{user:t,followingInProgress:a,followUser:n,unfollowUser:s,...o}=e;return r.a.createElement("div",{className:k.a.userCard},r.a.createElement(T.a,{to:"/profile/"+t.id},r.a.createElement("img",{src:t.photos.small?t.photos.small:"https://syrboyi.kz/wp-content/uploads/2020/07/kisspng-question-mark-questions-5b4e9adc353a96.979878161531878108218-768x683.jpg",className:k.a.img})),r.a.createElement("div",null,"Name: ",t.name),r.a.createElement("div",null,t.followed?r.a.createElement("button",{disabled:a.some(e=>e===t.id),onClick:()=>{s(t.id)}},"Unfollow"):r.a.createElement("button",{disabled:a.some(e=>e===t.id),onClick:()=>{n(t.id)}},"Follow")),r.a.createElement("div",null,"Status: ",t.status),t.location&&t.location.city&&r.a.createElement("div",null,"City: ",t.location.city),t.location&&t.location.country&&r.a.createElement("div",null,"Country: ",t.location.country))};var F=e=>{let{totalUsersCount:t,pageSize:a,currentPage:n,onPageChanged:s,users:o,followingInProgress:l,followUser:i,unfollowUser:c,...u}=e;return r.a.createElement("div",null,r.a.createElement(N,{currentPage:n,onPageChanged:s,totalItemsCount:t,pageSize:a}),o.map(e=>r.a.createElement(L,{user:e,followingInProgress:l,followUser:i,unfollowUser:c,key:e.id})))},R=a(30),j=a(7);a(121);const z=e=>e.usersPage.users,x=e=>e.usersPage.pageSize,G=e=>e.usersPage.totalUsersCount,D=e=>e.usersPage.currentPage,M=e=>e.usersPage.isFetching,W=e=>e.usersPage.followingInProgress;var B=Object(j.d)(Object(m.b)(e=>({users:z(e),pageSize:x(e),totalUsersCount:G(e),currentPage:D(e),isFetching:M(e),followingInProgress:W(e)}),{followUser:e=>t=>{S(t,e,g.b.followUser.bind(e),h)},unfollowUser:e=>t=>{S(t,e,g.b.unfollowUser.bind(e),f)},setUsers:_,setPageNumber:v,toggleFollowingProgress:b,getUsers:(e,t)=>async a=>{a(w(!0)),a(v(e));const n=await g.b.getUsers(e,t);a(_(n.items)),a((e=>({type:"SET_TOTAL_USERS_COUNT",totalUsersCount:e}))(n.totalCount)),a(w(!1))}}))(class extends r.a.Component{constructor(){super(...arguments),this.onPageChanged=(e=>{this.props.getUsers(e,this.props.pageSize)})}componentDidMount(){this.props.getUsers(this.props.currentPage,this.props.pageSize)}render(){return r.a.createElement("div",null,this.props.isFetching?r.a.createElement(R.a,null):null,r.a.createElement(F,{totalUsersCount:this.props.totalUsersCount,pageSize:this.props.pageSize,currentPage:this.props.currentPage,users:this.props.users,onPageChanged:this.onPageChanged,unfollowUser:this.props.unfollowUser,followUser:this.props.followUser,followingInProgress:this.props.followingInProgress}))}}),H=a(77),Y=a.n(H);var V=e=>r.a.createElement("header",{className:Y.a.header},r.a.createElement("img",{src:"https://www.freelogodesign.org/Content/img/logo-ex-7.png"}),r.a.createElement("div",{className:Y.a.loginBlock},e.isAuth?r.a.createElement("div",null,e.login," - ",r.a.createElement("button",{onClick:e.logout},"log out")," "):r.a.createElement(T.a,{to:"/login"}," Login"))),q=a(27);let J={userId:null,email:null,login:null,isAuth:!1};const Z=(e,t,a,n)=>({type:"SET_USER_DATA",payload:{userId:e,email:t,login:a,isAuth:n}}),K=()=>async e=>{const t=await g.c.authMe();if(0===t.data.resultCode){let{id:a,email:n,login:r}=t.data.data;e(Z(a,n,r,!0))}};var X=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:J,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_USER_DATA":return{...e,...t.payload};default:return e}};var Q=Object(m.b)(e=>({isAuth:e.auth.isAuth,login:e.auth.login}),{logout:()=>async e=>{0===(await g.c.logout()).data.resultCode&&e(Z(null,null,null,!1))}})(class extends r.a.Component{render(){return r.a.createElement(V,this.props)}}),$=a(110),ee=a(54),te=a(25),ae=a(120),ne=a(43),re=a.n(ne);const se=Object(ee.a)(30),oe=Object($.a)({form:"login"})(e=>{let{handleSubmit:t,error:a}=e;return r.a.createElement("form",{onSubmit:t},Object(te.c)("Email","email",[ee.b,se],te.a),Object(te.c)("Password","password",[ee.b],te.a,{type:"password"}),Object(te.c)(null,"rememberMe",[],te.a,{type:"checkbox"},"remember me"),a&&r.a.createElement("div",{className:re.a.formError},a),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Login")))});var le=Object(m.b)(e=>({isAuth:e.auth.isAuth}),{login:(e,t,a)=>async n=>{const r=await g.c.login(e,t,a);if(0===r.data.resultCode)n(K());else{let e=r.data.messages.length>0?r.data.messages[0]:"Some Error";n(Object(q.a)("login",{_error:e}))}}})(e=>{return e.isAuth?r.a.createElement(ae.a,{to:"/profile"}):r.a.createElement("div",null,r.a.createElement("h1",null,"Login"),r.a.createElement(oe,{onSubmit:t=>{e.login(t.email,t.password,t.rememberMe)}}))});let ie={initialized:!1};var ce=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ie;switch((arguments.length>1?arguments[1]:void 0).type){case"INITIALIZED_SUCCESS":return{...e,initialized:!0};default:return e}},ue=a(290),de=a(109),me=a(81);let ge={};var pe=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ge;arguments.length>1&&arguments[1];return e},Ee=a(118),he=a(111);let fe=Object(j.c)({profilePage:me.b,dialogsPage:de.a,sidebar:pe,usersPage:P,auth:X,form:he.a,app:ce});const _e=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||j.d;var ve=Object(j.e)(fe,_e(Object(j.a)(Ee.a))),we=a(288);const be=e=>t=>r.a.createElement(n.Suspense,{fallback:r.a.createElement(R.a,null)},r.a.createElement(e,t)),Se=r.a.lazy(()=>a.e(4).then(a.bind(null,297))),Pe=r.a.lazy(()=>a.e(3).then(a.bind(null,296)));let Ce=Object(j.d)(ue.a,Object(m.b)(e=>({initialized:e.app.initialized}),{initializeApp:()=>e=>{e(K()).then(()=>{e({type:"INITIALIZED_SUCCESS"})})}}))(class extends r.a.Component{componentDidMount(){this.props.initializeApp()}render(){return this.props.initialized?r.a.createElement("div",{className:"app-wrapper"},r.a.createElement(Q,null),r.a.createElement(u,null),r.a.createElement("div",{className:"app-wrapper-content"},r.a.createElement(d.a,{path:"/dialogs",render:be(Se)}),r.a.createElement(d.a,{path:"/profile/:userId?",render:be(Pe)}),r.a.createElement(d.a,{path:"/users",render:()=>r.a.createElement(B,null)}),r.a.createElement(d.a,{path:"/login",render:()=>r.a.createElement(le,null)}))):r.a.createElement(R.a,null)}});var Ue=e=>r.a.createElement(we.a,{basename:"/react-samurai"},r.a.createElement(m.a,{store:ve},r.a.createElement(Ce,null)));o.a.render(r.a.createElement(Ue,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()})},30:function(e,t,a){"use strict";var n=a(0),r=a.n(n),s=a(116),o=a.n(s);t.a=(e=>r.a.createElement("img",{className:o.a.preloader,src:"https://www.wpfaster.org/wp-content/uploads/2013/06/circle-loading-gif.gif"}))},34:function(e,t,a){e.exports={active:"Paginator_active__NTYpQ",paginator:"Paginator_paginator__21alq",pageNumber:"Paginator_pageNumber__3Vrvs",button:"Paginator_button__26p-J"}},43:function(e,t,a){e.exports={formControl:"FormsControls_formControl__1sAHr",error:"FormsControls_error__2IhFr",formError:"FormsControls_formError__-_-yp"}},54:function(e,t,a){"use strict";a.d(t,"b",function(){return n}),a.d(t,"a",function(){return r});const n=e=>{if(!e)return"Field is required"},r=e=>t=>{if(t.length>e)return"Max length is ".concat(e," symbols")}},76:function(e,t,a){e.exports={userCard:"Users_userCard__i-OBu",img:"Users_img__1yTAF",active:"Users_active__3OmnU"}},77:function(e,t,a){e.exports={header:"Header_header__idR6P",loginBlock:"Header_loginBlock__2oWgm"}},81:function(e,t,a){"use strict";a.d(t,"c",function(){return s}),a.d(t,"d",function(){return o}),a.d(t,"f",function(){return l}),a.d(t,"a",function(){return i}),a.d(t,"e",function(){return c});var n=a(12);let r={posts:[{id:1,message:"Hi, how are you?",likesCount:12},{id:2,message:"It's my first post",likesCount:11},{id:3,message:"Blabla",likesCount:11},{id:4,message:"Dada",likesCount:11}],profile:null,status:""};const s=e=>async t=>{const a=await n.a.getUserProfile(e);t(c(a))},o=e=>async t=>{const a=await n.a.getStatus(e);t(u(a.data))},l=e=>async t=>{0===(await n.a.updateStatus(e)).data.resultCode&&t(u(e))},i=e=>({type:"ADD-POST",message:e}),c=e=>({type:"SET_USER_PROFILE ",profile:e}),u=e=>({type:"SET_USER_STATUS",status:e});t.b=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD-POST":{let a={id:5,message:t.message,likesCount:0};return{...e,posts:[...e.posts,a],newPostText:""}}case"SET_USER_PROFILE ":return{...e,profile:t.profile};case"SET_USER_STATUS":return{...e,status:t.status};default:return e}}}},[[147,1,2]]]);
//# sourceMappingURL=main.a0259984.chunk.js.map