!function(t){function e(e){for(var i,r,a=e[0],l=e[1],c=e[2],u=0,m=[];u<a.length;u++)r=a[u],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&m.push(o[r][0]),o[r]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);for(d&&d(e);m.length;)m.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],i=!0,a=1;a<n.length;a++){var l=n[a];0!==o[l]&&(i=!1)}i&&(s.splice(e--,1),t=r(r.s=n[0]))}return t}var i={},o={0:0},s=[];function r(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=i,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="assets";var a=window.webpackJsonp=window.webpackJsonp||[],l=a.push.bind(a);a.push=e,a=a.slice();for(var c=0;c<a.length;c++)e(a[c]);var d=l;s.push([3,1]),n()}({195:function(t,e,n){},196:function(t,e,n){"use strict";class i{constructor(t,e,n,i,o,s){let r;e.isCorrect=i,e.closeToast=function(){r||n.hide().then((function(){r=!1}))},e.openMoreInfo=function(e){r||(r=!0,t.$broadcast("SHOWHINT",{hint:o,hintUrl:s}))},t.$on("HINTCLOSE",(function(){r=!1}))}}i.$inject=["$rootScope","$scope","$mdToast","isCorrect","hint","hintUrl"],t.exports=i},197:function(t,e,n){"use strict";class i{constructor(t,e,n,i,o,s,r){e.repos=[{name:"Custom",file:"example.json",type:"choice"},{name:"Custom (URL)",file:null,type:"url"},{name:"Custom (Manual)",file:null,type:"text"}].map((function(t){return t.value=t.name.toLowerCase(),s.getConfig("QUIZTYPE")===t.type&&(e.selectedItem=t),t})),e.quiz=s,e.pageNumber="quiz",e.customJson=s.getConfig("QUIZCUSTOMJSON"),e.customUrl=s.getConfig("QUIZCUSTOMURL"),e.setLimit=s.getConfig("SETLIMIT"),e.debugMode=s.getConfig("DEBUGMODE"),e.theme="light"===s.getConfig("THEME"),e.timeLimit=s.getConfig("TIMELIMIT"),e.shuffleQuestions=s.getConfig("SHUFFLEQUESTIONS"),e.shuffleAnswers=s.getConfig("SHUFFLEANSWERS"),e.skipCorrect=s.getConfig("SKIPCORRECT"),e.hideAlert=s.getConfig("HIDEALERT"),e.appVersion=r,e.cheat=void 0,e.history=o.get("history")||[],e.close=function(){i.hide()},e.removeHistory=function(t){const n=o.get("history")||[];n.splice(t,1),o.set("history",n),e.history=n},e.dropCorrect=function(t){o.set("answered",[])},e.save=function(){let o=!1;switch(e.selectedItem&&s.getConfig("QUIZ")!==e.selectedItem.file?(s.setConfig("QUIZ",e.selectedItem.file),o=!0):s.setConfig("QUIZ",null),s.getConfig("QUIZTYPE")!==e.selectedItem.type&&(s.setConfig("QUIZTYPE",e.selectedItem.type),o=!0),s.getConfig("QUIZCUSTOMJSON")!==e.customJson&&(s.setConfig("QUIZCUSTOMJSON",e.customJson),o=!0),s.getConfig("QUIZCUSTOMURL")!==e.customUrl&&(s.setConfig("QUIZCUSTOMURL",e.customUrl),o=!0),s.getConfig("THEME")!==e.theme&&(s.setConfig("THEME",e.theme?"light":"dark"),o=!0),o&&n.location.reload(),s.getConfig("SETLIMIT")!==e.setLimit&&(s.setConfig("SETLIMIT",e.setLimit),t.$broadcast("START")),s.getConfig("TIMELIMIT")!==e.timeLimit&&(s.setConfig("TIMELIMIT",e.timeLimit),t.$broadcast("START")),s.getConfig("DEBUGMODE")!==e.debugMode&&(s.setConfig("DEBUGMODE",e.debugMode),e.quiz.init()),s.getConfig("SHUFFLEQUESTIONS")!==e.shuffleQuestions&&s.setConfig("SHUFFLEQUESTIONS",e.shuffleQuestions),s.getConfig("SHUFFLEANSWERS")!==e.shuffleAnswers&&s.setConfig("SHUFFLEANSWERS",e.shuffleAnswers),s.getConfig("SKIPCORRECT")!==e.skipCorrect&&(s.setConfig("SKIPCORRECT",e.skipCorrect),e.quiz.init()),s.getConfig("HIDEALERT")!==e.hideAlert&&s.setConfig("HIDEALERT",e.hideAlert),e.cheat){case"DEBUGMODE":s.setConfig("DEBUGMODE",!s.getConfig("DEBUGMODE")),e.quiz.init();break;case"SHOWANSWERS":s.setConfig("SHOWANSWERS",!s.getConfig("SHOWANSWERS"));break;default:var r=e.cheat;angular.isUndefined(r)||0!==r.indexOf("GOTO")||t.$broadcast("GOTO",{id:r.replace("GOTO","")})}i.hide()}}}i.$inject=["$rootScope","$scope","$window","$mdDialog","localStorageService","QuizFactory","APP_VERSION"],t.exports=i},198:function(t,e,n){"use strict";class i{constructor(t){this.autostart=angular.isUndefined(t.get("start-intro"))||2!=t.get("start-intro"),this.options={steps:[{intro:"Hi, this is a interactive application for test knowledge",position:"right"},{element:"#step-header",intro:"This application name and selected quiz name",position:"bottom"},{element:"#step-feedback",intro:"Click this button for send feedback or error",position:"left"},{element:"#step-start",intro:"This button for start quiz (circle show remaining time)",position:"left"},{element:"#step-hint",intro:"This get hint for current qustion",position:"left"},{element:"#step-history",intro:"This get your quiz history",position:"left"},{element:"#step-settings",intro:"This for set quiz settings",position:"left"},{element:"#step-info",intro:"And this for get quiz information",position:"left"},{element:"#step-question",intro:"This is a current question with question text and answer variants or answer input field",position:"bottom"},{element:"#step-before",intro:"Click this button for back to previous question",position:"top"},{element:"#step-submit",intro:"Click this button for submit answer",position:"top"},{element:"#step-next",intro:"Click this button for back to next question",position:"top"},{element:"#step-counter",intro:"This is counter right and fail answers (green/left right answers, red/right fail answers, hint show coefficient right answers to fail)",position:"top"},{intro:"Use application with fun! :)",position:"left"}],showStepNumbers:!1,showBullets:!0,exitOnOverlayClick:!1,exitOnEsc:!0,nextLabel:"next",prevLabel:"Previous",skipLabel:"Skip",doneLabel:"Done!"},this.done=function(){t.put("start-intro",2)}}}i.$inject=["$cookies"],t.exports=i},199:function(t,e,n){"use strict";class i{constructor(t,e,i,o,s,r,a,l,c){const d=this;let u,m;const h=function(t){let e,n,i=t.length;for(;i;)n=Math.floor(Math.random()*i--),e=t[i],t[i]=t[n],t[n]=e;return t};this.quiz=l,this.set={current:{variants:{}},questions:{}},this.showAnswers=!1,this.answer="",this.answers=[],this.isCorrect=!1,this.timerValue=100,this.submitted=!1,this.incorrectCount=0,this.correctCount=0,this.end=!1,this.disabled={},c.bindTo(e).add({combo:"enter",callback:function(t){d.submit(),t.preventDefault()}}).add({combo:"left",callback:function(t){d.before(t),t.preventDefault()}}).add({combo:"right",callback:function(t){d.next(t),t.preventDefault()}});for(let t=0;t<9;t++)c.add({combo:""+(t+1),callback:function(e){let n=d.set.current.variants[t]||!1;n&&d.toggle(n,d.answers),e.preventDefault()}});this.exists=function(t,e){return e.indexOf(t)>-1||!angular.isUndefined(this.disabled[this.set.current.id])&&Array.isArray(this.disabled[this.set.current.id])&&this.disabled[this.set.current.id].indexOf(t)>-1},this.toggle=function(t,e){const n=e.indexOf(t);-1===n?e.push(t):e.splice(n,1)},this.start=function(){const t=this;let e;m=60*t.quiz.getConfig("TIMELIMIT"),u&&i.cancel(u),u=i((function(){t.timerValue=100/(60*t.quiz.getConfig("TIMELIMIT"))*m--}),1e3),e=l.getConfig("SHUFFLEQUESTIONS")?h(this.quiz.getQuestions()):this.quiz.getQuestions();let n=t.quiz.getConfig("SETLIMIT");n>t.quiz.getQuestions().length&&(n=t.quiz.getQuestions().length),this.set.questions=e.slice(0,n),this.set.pos=0,this.incorrectCount=0,this.correctCount=0,this.end=!1,this.disabled={},this.next()},this.error=function(t){s.show({template:' <md-dialog aria-label="List dialog">  <md-dialog-content><iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdGRg6zaPT9mi_Nnxrwnr8Zrd2h4olszWL9WmIquV-wuCawag/viewform?usp=pp_url&entry.1382005952=Info&entry.414927858='+d.quiz.getConfig("QUIZCUSTOM")+":"+t+'"></iframe>  </md-dialog-content>  <md-dialog-actions>    <md-button ng-click="closeDialog()" class="md-primary">      Close    </md-button>  </md-dialog-actions></md-dialog>',locals:{id:t},controller:["$scope","$mdDialog",function(t,e){t.closeDialog=function(){e.hide()}}]})},this.next=function(){if(r.hide(),this.submitted=!1,this.isCorrect=!1,this.answer="",this.showAnswers=l.getConfig("SHOWANSWERS"),this.set.pos<this.set.questions.length)this.set.current=this.set.questions[this.set.pos],this.showAnswers&&(this.answer=this.set.current.answers.length>0?this.set.current.answers[0]:""),l.getConfig("SHUFFLEANSWERS")&&(this.set.current.variants=h(this.set.current.variants)),this.set.pos++,this.answers=[];else if(!this.end&&confirm("End test?")){const t=a.get("history")||[];t.push({correct:this.correctCount,incorrect:this.incorrectCount,date:Date.now()}),this.end=!0,a.set("history",t),alert("Great! Correct answer "+this.correctCount+", incorrect answer "+this.incorrectCount+", correct percent "+Math.round(this.correctCount/this.set.questions.length*100)+"%")}},this.before=function(){this.set.pos>1&&(--this.set.pos,this.set.current=this.set.questions[this.set.pos-1],angular.isUndefined(this.disabled[this.set.current.id])||(Array.isArray(this.disabled[this.set.current.id])?this.answers=this.disabled[this.set.current.id]:this.answer=this.disabled[this.set.current.id],this.submitted=!0))},this.submit=function(){const t=this;if(this.submitted)this.next();else{if(this.showAnswers=!0,this.submitted=!0,this.disabled[this.set.current.id]=this.set.current.variants.length>0?this.answers:this.answer,this.set.current.variants.length>0){let e=0;angular.forEach(this.set.current.variants,(function(t,n){t.isCorrect&&e++})),this.isCorrect=this.answers.length&&this.answers.length===e,this.isCorrect&&angular.forEach(this.answers,(function(e,n){e.isCorrect||(t.isCorrect=!1)}))}else this.isCorrect=this.set.current.answers.indexOf(this.answer)>-1;if(this.answer=this.set.current.answers.length>0?this.set.current.answers[0]:"",this.isCorrect){if(this.correctCount++,t.quiz.getConfig("SKIPCORRECT")){const e=a.get("answered")||[];e.push({quiz:t.quiz.getConfig("QUIZ"),questionId:this.set.current.id}),a.set("answered",e)}}else this.incorrectCount++;r.show({hideDelay:0,position:"bottom right",controller:"AnswerToastController",template:n(200),bindToController:!0,locals:{isCorrect:this.isCorrect,hint:this.set.current.hint,hintUrl:this.set.current.hintUrl}})}},this.showSettings=function(t){s.show({controller:"DialogController",template:n(201),targetEvent:t,clickOutsideToClose:!1})},this.showHistory=function(t){s.show({controller:"DialogController",template:n(202),targetEvent:t,clickOutsideToClose:!1})},this.showInfo=function(t){s.show({controller:"DialogController",template:n(203),targetEvent:t,clickOutsideToClose:!1,locals:{tags:[]}})},this.showHint=function(e){t.$broadcast("SHOWHINT",{hint:d.set.current.hint,hintUrl:d.set.current.hintUrl})},t.$on("SHOWHINT",(function(e,n){let i=n.hint||"No hint given!",r=n.hintUrl||"https://www.google.com/webhp?igu=1",a=`${c=i,`<strong>${c}</strong>`}<hr/><br/>${l=r,`<iframe frameborder="0" height="800" width="600" allowfullscreen sandbox"allow-forms allow-scripts" src="${l}"></iframe>`}`;var l,c;s.show(s.alert().title("More info goes here.").htmlContent(o.trustAsHtml(a)).ariaLabel("More info").ok("Got it").targetEvent(e)).then((function(){t.$broadcast("HINTCLOSE")}))})),t.$on("START",(function(t,e){d.start()})),t.$on("GOTO",(function(t,e){let n;angular.forEach(d.quiz.getQuestions(),(function(t,i){t.id==e.id&&(n=t)})),d.set.current=n}))}}i.$inject=["$rootScope","$scope","$interval","$sce","$mdDialog","$mdToast","localStorageService","QuizFactory","hotkeys"],t.exports=i},200:function(t,e){t.exports='<md-toast>\n  <span class="md-toast-text" flex>[[ isCorrect ? \'Correct!\' : \'Wrong!\' ]]</span>\n  <md-button class="md-highlight" ng-click="openMoreInfo($event)">\n    More info\n  </md-button>\n  <md-button ng-click="closeToast()">\n    Close\n  </md-button>\n</md-toast>\n'},201:function(t,e){t.exports='<md-dialog aria-label="Settings" flex="50">\n  <form ng-cloak>\n    <md-toolbar>\n      <div class="md-toolbar-tools">\n        <h2>Quiz client settings</h2>\n        <span flex></span>\n        <md-button class="md-icon-button" ng-click="close()">\n          <md-icon mb-font-set="md">close</md-icon>\n        </md-button>\n      </div>\n    </md-toolbar>\n\n    <md-dialog-content>\n      <div class="md-dialog-content">\n        <md-nav-bar md-selected-nav-item="pageNumber" nav-bar-aria-label="navigation links">\n          <md-nav-item md-nav-click="goto(\'quiz\')" name="quiz">\n            Quiz\n          </md-nav-item>\n          <md-nav-item md-nav-click="goto(\'settings\')" name="settings">\n            Settings\n          </md-nav-item>\n          <md-nav-item md-nav-click="goto(\'other\')" name="other">\n            Other\n          </md-nav-item>\n        </md-nav-bar>\n        <div ng-show="pageNumber == \'quiz\'">\n          <h2>Quiz</h2>\n          <md-autocomplete md-selected-item="selectedItem" md-items="item in repos" md-item-text="item.name"\n            md-min-length="0" placeholder="Choose quiz" md-menu-class="autocomplete-custom-template">\n            <md-item-template>\n              <span class="item-title">\n                <md-icon mb-font-set="md">question_answer</md-icon>\n                <span>{{item.name}}</span>\n              </span>\n            </md-item-template>\n          </md-autocomplete>\n          <div ng-show="selectedItem.type == \'text\'">\n            <h2>Custom quiz (Manual)</h2>\n            <md-input-container md-no-float class="md-block">\n              <md-icon mb-font-set="md">cloud_upload</md-icon>\n              <textarea ng-model="customJson" placeholder="Enter json" rows="3" md-resize-textarea></textarea>\n            </md-input-container>\n          </div>\n          <div ng-show="selectedItem.type == \'url\'">\n            <h2>Custom quiz (URL)</h2>\n            <md-input-container md-no-float class="md-block">\n              <md-icon mb-font-set="md">cloud_upload</md-icon>\n              <input ng-model="customUrl" type="text" placeholder="Enter absolute url">\n            </md-input-container>\n          </div>\n        </div>\n        <div ng-show="pageNumber == \'settings\'">\n          <h2>Question set count</h2>\n          <md-slider-container>\n            <md-icon mb-font-set="md">brightness_low</md-icon>\n            <md-slider min="1" max="[[ quiz.getQuestions().length ]]" ng-model="setLimit"\n              aria-label="Question set count" flex md-discrete></md-slider>\n            <md-input-container>\n              <input flex type="number" ng-model="setLimit" aria-label="green" aria-controls="green-slider">\n            </md-input-container>\n          </md-slider-container>\n          <h2>Quiz time limit in min.</h2>\n          <md-slider-container>\n            <md-icon mb-font-set="md">brightness_low</md-icon>\n            <md-slider min="1" max="1440" ng-model="timeLimit" aria-label="Quiz time limit" flex md-discrete>\n            </md-slider>\n            <md-input-container>\n              <input flex type="number" ng-model="timeLimit" aria-label="green" aria-controls="green-slider">\n            </md-input-container>\n          </md-slider-container>\n          <h2>Shuffle questions</h2>\n          <md-checkbox ng-model="shuffleQuestions" aria-label="Shuffle questions">\n            Shuffle questions: [[ shuffleQuestions ]]\n          </md-checkbox>\n          <h2>Shuffle answers</h2>\n          <md-checkbox ng-model="shuffleAnswers" aria-label="Shuffle answers">\n            Shuffle answers: [[ shuffleAnswers ]]\n          </md-checkbox>\n          <h2>Skip </h2>\n          <md-checkbox ng-model="skipCorrect" aria-label="Hide questions answered correctly">\n            Hide questions answered correctly: [[ skipCorrect ]]\n          </md-checkbox>\n          <md-button class="md-raised md-primary" ng-click="dropCorrect()">\n            Drop answered questions\n          </md-button>\n        </div>\n        <div ng-show="pageNumber == \'other\'">\n          <h2>Theme (WIP)</h2>\n          <md-switch class="md-primary" aria-label="Light or Dark" ng-model="theme">\n            [[ theme ? \'Light\' : \'Dark\' ]]\n          </md-switch>\n          <h2>Hide alert</h2>\n          <md-checkbox ng-model="hideAlert" aria-label="Hide alert">\n            Hide alert: [[ hideAlert ]]\n          </md-checkbox>\n          <section ng-show="debugMode">\n            <h2>Debug mode</h2>\n            <md-checkbox ng-model="debugMode" aria-label="Debug mode">\n              Debug mode: [[ debugMode ]]\n            </md-checkbox>\n          </section>\n          <h2>Enter cheat code</h2>\n          <md-input-container md-no-float class="md-block">\n            <md-icon mb-font-set="md">code</md-icon>\n            <input ng-model="cheat" type="text" placeholder="Cheat code">\n          </md-input-container>\n        </div>\n      </div>\n    </md-dialog-content>\n\n    <md-dialog-actions layout="row">\n      <md-button ng-click="close()">\n        Close\n      </md-button>\n      <md-button class="md-raised md-primary" ng-click="save()">\n        Save\n      </md-button>\n    </md-dialog-actions>\n  </form>\n</md-dialog>\n'},202:function(t,e){t.exports='<md-dialog aria-label="Settings">\n  <form ng-cloak>\n    <md-toolbar>\n      <div class="md-toolbar-tools">\n        <h2>Quiz history</h2>\n        <span flex></span>\n        <md-button class="md-icon-button" ng-click="close()">\n          <md-icon mb-font-set="md">close</md-icon>\n        </md-button>\n      </div>\n    </md-toolbar>\n\n    <md-dialog-content>\n      <div class="md-dialog-content">\n        <md-list class="md-dense" flex>\n          <md-subheader class="md-no-sticky">Attempts to pass</md-subheader>\n          <md-list-item class="md-3-line" ng-repeat="element in history">\n            <md-icon mb-font-set="md">history</md-icon>\n            <div class="md-list-item-text" layout="column">\n              <h3>Attempt date: [[ element.date | prettyDate ]]</h3>\n              <p>Correct answers: [[ element.correct ]]</p>\n              <p>Incorrect answers: [[ element.incorrect ]]</p>\n              <p>Ratio: [[ element.correct / (element.incorrect + element.correct) * 100 | number : 0 ]]%</p>\n            </div>\n            <md-button class="md-secondary md-icon-button" ng-click="removeHistory($index)" aria-label="call">\n              <md-icon mb-font-set="md">clear</md-icon>\n            </md-button>\n          </md-list-item>\n        </md-list>\n      </div>\n    </md-dialog-content>\n\n    <md-dialog-actions layout="row">\n      <md-button ng-click="close()">\n        Close\n      </md-button>\n    </md-dialog-actions>\n  </form>\n</md-dialog>\n'},203:function(t,e){t.exports='<md-dialog aria-label="Information">\n  <form ng-cloak>\n    <md-toolbar>\n      <div class="md-toolbar-tools">\n        <h2>Quiz information</h2>\n        <span flex></span>\n        <md-button class="md-icon-button" ng-click="close()">\n          <md-icon mb-font-set="md">close</md-icon>\n        </md-button>\n      </div>\n    </md-toolbar>\n\n    <md-dialog-content>\n      <div class="md-dialog-content">\n        <h2>App version</h2>\n        <p>[[ appVersion ]]</p>\n        <h2>Quiz name</h2>\n        <p>[[ quiz.getHeader("name") ]]</p>\n        <h2>Question count</h2>\n        <p>[[ quiz.getQuestions().length ]]</p>\n        <h2>Question file version</h2>\n        <p>[[ quiz.getHeader("File Version") ]]</p>\n        <h2>Standart time limit</h2>\n        <p>[[ quiz.getHeader("Time Limit") ]]</p>\n        <h2>Need point</h2>\n        <p>[[ quiz.getHeader("Passing Score") ]]</p>\n        <h2>Describe</h2>\n        <p>[[ quiz.getHeader("describe") ]]</p>\n        <h2>Alert!</h2>\n        <p>[[ quiz.getHeader("alert") ]]</p>\n        <h2>Describe</h2>\n        <p>[[ quiz.getHeader("describe") ]]</p>\n        <h2>Supported tags</h2>\n        <p>\n          <md-chips ng-model="tags" ng-init="tags = quiz.getHeader(\'tags\')" readonly="true" md-removable="false">\n          </md-chips>\n        </p>\n      </div>\n    </md-dialog-content>\n\n    <md-dialog-actions layout="row">\n      <md-button ng-click="close()">\n        Close\n      </md-button>\n    </md-dialog-actions>\n  </form>\n</md-dialog>\n'},204:function(t,e,n){"use strict";class i{constructor(t,e,n,i,o,s){return{init:async function(){const t=this,r=s.get("config")||{};t.config={APP_VERSION:r.APP_VERSION||o,QUIZ:r.QUIZ||"example.json",QUIZTYPE:r.QUIZTYPE||"choice",QUIZCUSTOMURL:r.QUIZCUSTOMURL||null,QUIZCUSTOMJSON:r.QUIZCUSTOMJSON||null,SETLIMIT:r.SETLIMIT||75,TIMELIMIT:r.TIMELIMIT||90,SHOWANSWERS:r.SHOWANSWERS||!1,SHUFFLEQUESTIONS:!!angular.isUndefined(r.SHUFFLEQUESTIONS)||r.SHUFFLEQUESTIONS,SHUFFLEANSWERS:!!angular.isUndefined(r.SHUFFLEANSWERS)||r.SHUFFLEANSWERS,SKIPCORRECT:!angular.isUndefined(r.SKIPCORRECT)&&r.SKIPCORRECT,HIDEALERT:!angular.isUndefined(r.HIDEALERT)&&r.HIDEALERT,DEBUGMODE:r.DEBUGMODE||!1,THEME:r.THEME||"light"},t.config.APP_VERSION!==o&&(alert("New version, see changelog!"),window.open("CHANGELOG.md","_blank"),t.setConfig("APP_VERSION",o));let a=null;if("choice"===t.config.QUIZTYPE?a="assets/questions/"+t.config.QUIZ:"url"===t.config.QUIZTYPE&&(a=t.config.QUIZCUSTOMURL),i.search().hasOwnProperty("quizCustomUrl")&&(a=i.search().quizCustomUrl),a)return new Promise((i,o)=>{e({method:"GET",url:a}).then((function(e){t.loadData(e.data),i()}),(function(t){console.log("No response, or "+t),n.show(n.simple().textContent("Questions db loading failed!").position("bottom right").hideDelay(0)),o()}))});if("text"===t.config.QUIZTYPE)return new Promise(e=>{t.loadData(angular.fromJson(t.config.QUIZCUSTOMJSON)),e()});throw new Error("Test data loading - failed!")},loadData:function(t){const e=this;e.questions=[];const n=s.get("answered")||[],i=[];angular.forEach(n,(function(t,e){i.push(t.questionId)})),angular.forEach(t.questions,(function(t,n){t.id=t.id||n+1,e.getConfig("SKIPCORRECT")&&-1!=i.indexOf(t.id)||e.questions.push(t)})),e.header=t.header},getHeader:function(t){return t?this.header&&!angular.isUndefined(this.header[t])?this.header[t]:null:this.header},getQuestions:function(t){return t?this.questions[t]:this.questions},setConfig:function(t,e){this.config[t]=e,s.set("config",this.config)},getConfig:function(t){return t?this.config&&!angular.isUndefined(this.config[t])?this.config[t]:null:this.config}}}}i.$inject=["$rootScope","$http","$mdToast","$location","APP_VERSION","localStorageService"],t.exports=i},3:function(t,e,n){"use strict";n.r(e);n(195);n(0),n(1),n(2),n(7),n(9),n(11),n(13),n(15),n(194);angular.module("quiz-client",["ngMaterial","ngSanitize","ngCookies","angular-intro","hljs","LocalStorageModule","cfp.hotkeys"]).config(["$mdIconProvider","$interpolateProvider","$locationProvider","$sceDelegateProvider","$httpProvider","$mdThemingProvider","localStorageServiceProvider","hotkeysProvider",function(t,e,n,i,o,s,r,a){e.startSymbol("[[ ").endSymbol(" ]]"),n.html5Mode(!0).hashPrefix("*"),o.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;charset=utf-8",o.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",t.fontSet("md","material-icons"),i.resourceUrlWhitelist(["self","https://docs.google.com/**"]),a.useNgRoute=!1,r.setPrefix("quiz-client").setStorageType("localStorage").setNotify(!1,!1),"dark"===angular.fromJson(window.localStorage.getItem("quiz-client.config")||"").THEME&&s.theme("default").primaryPalette("grey").accentPalette("grey").dark(),s.enableBrowserColor({theme:"default",palette:"primary",hue:"200"})}]).run(["$mdTheming","$rootScope","QuizFactory",function(t,e,n){n.init().then(()=>{e.$broadcast("START")})}]).value("APP_VERSION","1.2.0").filter("orderObjectBy",(function(){return function(t,e,n){const i=[];return angular.forEach(t,(function(t){i.push(t)})),i.sort((function(t,n){return t[e]>n[e]?1:-1})),n&&i.reverse(),i}})).filter("prettyDate",(function(){return function(t){const e=new Date(t);return e.toISOString().slice(0,10)+" "+e.toISOString().slice(11,19)}})).filter("prettyForm",(function(){return function(t){return t?t.replace(new RegExp("\n","g"),"<br>"):t}})).controller("AnswerToastController",n(196)).controller("DialogController",n(197)).controller("IntroController",n(198)).controller("QuizController",n(199)).factory("QuizFactory",n(204))}});