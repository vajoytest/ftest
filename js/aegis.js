
(function(global,factory){typeof exports==='object'&&typeof module!=='undefined'?module.exports=factory():typeof define==='function'&&define.amd?define(factory):(global=global||self,global.Aegis=factory());}(this,function(){'use strict';var extendStatics=function(d,b){extendStatics=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];};return extendStatics(d,b);};function __extends(d,b){extendStatics(d,b);function __(){this.constructor=d;}d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());}var __assign=function(){__assign=Object.assign||function __assign(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p];}return t;};return __assign.apply(this,arguments);};function __spreadArrays(){for(var s=0,i=0,il=arguments.length;i<il;i++)s+=arguments[i].length;for(var r=Array(s),k=0,i=0;i<il;i++)for(var a=arguments[i],j=0,jl=a.length;j<jl;j++,k++)r[k]=a[j];return r;}var getDefaultConfig=function(){return{version:1,delay:1500,repeat:5,random:1,url:'https://aegis.qq.com/collect',speedUrl:'https://aegis.qq.com/speed',customTimeUrl:'https://aegis.qq.com/speed/custom',whiteListUrl:'https://aegis.qq.com/aegis/whitelist',performanceUrl:'https://aegis.qq.com/speed/performance'};};var EventEmiter=(function(){function EventEmiter(){var _this=this;this.emit=function(name,data){if(!_this)return;var events=_this.__EventsList[name];var handler;if(events&&events.length){events=events.slice();for(var i=0;i<events.length;i++){handler=events[i];try{var result=handler.callback.apply(_this,[data]);if(1===handler.type){_this.remove(name,handler.callback);}if(false===result){break;}}catch(e){throw e;}}}return _this;};this.__EventsList={};}EventEmiter.prototype.indexOf=function(array,value){for(var i=0;i<array.length;i++){if(array[i].callback===value){return i;}}return-1;};EventEmiter.prototype.on=function(name,callback,type){if(type===void 0){type=0;}if(!this)return;var events=this.__EventsList[name];if(!events){events=this.__EventsList[name]=[];}if(this.indexOf(events,callback)===-1){var handler={name:name,type:type||0,callback:callback};events.push(handler);return this;}return this;};EventEmiter.prototype.one=function(name,callback){this.on(name,callback,1);};EventEmiter.prototype.remove=function(name,callback){if(!this)return;var events=this.__EventsList[name];if(!events){return null;}if(!callback){try{delete this.__EventsList[name];}catch(e){}return null;}if(events.length){var index=this.indexOf(events,callback);events.splice(index,1);}return this;};return EventEmiter;}());function buildLogParam(logs){logs=Array.isArray(logs)?logs:[logs];return(logs.map(function(log,index){return Object.getOwnPropertyNames(log).map(function(key){return encodeOnce(key)+"["+index+"]="+encodeOnce(log[key]);}).join('&');}).join('&')+(""+(logs.length?'&count='+logs.length:'')));}function encodeOnce(str){try{return encodeURIComponent(decodeURIComponent(str));}catch(e){return'';}}var LOG_TYPE;(function(LOG_TYPE){LOG_TYPE["INFO_ALL"]="-1";LOG_TYPE["API_RESPONSE"]="1";LOG_TYPE["INFO"]="2";LOG_TYPE["ERROR"]="4";LOG_TYPE["PROMISE_ERROR"]="8";LOG_TYPE["AJAX_ERROR"]="16";LOG_TYPE["SCRIPT_ERROR"]="32";LOG_TYPE["IMAGE_ERROR"]="64";LOG_TYPE["CSS_ERROR"]="128";LOG_TYPE["CONSOLE_ERROR"]="256";LOG_TYPE["MEDIA_ERROR"]="512";LOG_TYPE["RET_ERROR"]="1024";})(LOG_TYPE||(LOG_TYPE={}));var X5TypeNum;(function(X5TypeNum){X5TypeNum[X5TypeNum["newX5"]=0]="newX5";X5TypeNum[X5TypeNum["oldX5"]=1]="oldX5";X5TypeNum[X5TypeNum["other"]=2]="other";})(X5TypeNum||(X5TypeNum={}));var ua=navigator.userAgent.toLowerCase();var x5Type=-1;function getX5Type(){if(x5Type>-1){return x5Type;}x5Type=X5TypeNum.other;if(ua.indexOf('tbs')>-1){var tbsVer=ua.match(/tbs\/([\d\.]+)/);if(tbsVer&&tbsVer[1]&&parseInt(tbsVer[1],10)>=36541){x5Type=X5TypeNum.newX5;}else{x5Type=X5TypeNum.oldX5;}}return x5Type;}function formatUrl(url,isGetQuery){if(typeof url==='string'){return url.split('?')[isGetQuery?1:0]||'';}else{return url;}}function urlIsHttps(url){return/^https/.test(url);}function isNative(Ctor){return typeof Ctor==='function'&&/native code/.test(Ctor.toString());}function canUseResourceTiming(){return(typeof window.performance!=='undefined'&&isNative(window.Performance)&&typeof performance.clearResourceTimings==='function'&&typeof performance.getEntriesByType==='function'&&typeof performance.now==='function');}var assetContentType=['application/octet-stream','application/xhtml+xml','application/xml','application/pdf','application/pkcs12','application/javascript','application/ecmascript','application/vnd.mspowerpoint','application/ogg','text/html','text/css','text/javascript','image','audio','video'];function isRequestAsset(contentType){return assetContentType.some(function(type){return contentType.indexOf(type)!==-1;});}var possibleRetCode=['ret','retcode','code'];var tryToGetRetCode=function(obj){try{if(typeof obj==='string'){obj=JSON.parse(obj);}var keys=Object.getOwnPropertyNames(obj);var intersection=keys.filter(function(key){return possibleRetCode.indexOf(key.toLowerCase())!==-1;});if(intersection.length){return""+obj[intersection[0]];}else{return'unknown';}}catch(e){return'unknown';}};var stringifyHandler=function(){var cache=[];var keyCache=[];return function(key,value){if(value instanceof Error){if(value.message&&value.stack&&value.stack.indexOf(value.message)===-1){return value.message+" \n "+value.stack;}else{return value.stack;}}else if(typeof value==='object'&&value!==null){var index=cache.indexOf(value);if(index!==-1){return'[Circular '+keyCache[index]+']';}cache.push(value);keyCache.push(key||'root');}return value;};};var stringifyPlus=function(target){try{return(JSON.stringify(target,stringifyHandler(),4)||'undefined').replace(/"/gim,'');}catch(e){return"error happen when aegis stringify: \n "+e.message+" \n "+e.stack;}};var onError=function(){errorPipelineList.push(this._normalLogPipeline);startListen();};var errorPipelineList=[];function publishErrorLog(msg){errorPipelineList.forEach(function(errorPipeline){errorPipeline(msg);});}var listening=false;function startListen(){if(listening)return;listening=true;var orgError=window.onerror;window.onerror=function(){var args=[];for(var _i=0;_i<arguments.length;_i++){args[_i]=arguments[_i];}if(args[4]){publishErrorLog({msg:args[4],level:LOG_TYPE.ERROR});}orgError&&orgError.call.apply(orgError,__spreadArrays([window],args));};window.addEventListener('unhandledrejection',function(event){var reason=event&&stringifyPlus(event.reason);publishErrorLog({msg:"PROMISE_ERROR: "+reason,level:LOG_TYPE.PROMISE_ERROR});});window.document.addEventListener('error',function(event){if(!event||!event.target||!event.srcElement)return;var target=event.target||event.srcElement,url=target.src||target.href,tagName=target.tagName;if(url&&tagName){var log={msg:tagName+" load fail: "+url,level:LOG_TYPE.INFO};switch(tagName.toLowerCase()){case'script':log.level=LOG_TYPE.SCRIPT_ERROR;break;case'link':log.level=LOG_TYPE.CSS_ERROR;break;case'audio':case'video':log.level=LOG_TYPE.MEDIA_ERROR;break;default:return;}publishErrorLog(log);}},true);}var collecting=false;var ASSETS_INITIATOR_TYPE=['img','css','script','link','audio','radio'],pipelineList=[];var ReportDefaultNum;(function(ReportDefaultNum){ReportDefaultNum[ReportDefaultNum["number"]=-1]="number";ReportDefaultNum["string"]="";})(ReportDefaultNum||(ReportDefaultNum={}));var getReportDefaultVal=function(rawVal,isDefaultByString){if(typeof rawVal==='number'){return rawVal;}if(typeof rawVal==='string'){return rawVal;}return isDefaultByString?ReportDefaultNum.string:ReportDefaultNum.number;};var assetSpeed=function(){if(!canUseResourceTiming()||!this.config.reportAssetSpeed)return;pipelineList.push(this._speedLogPipeline);if(!collecting){collecting=true;setInterval(collect,this.config.delay);performance.onresourcetimingbufferfull=function(){collectCur=0;performance.clearResourceTimings();};window.document.addEventListener('error',function(event){if(!event||!event.target||!event.srcElement)return;var target=event.target||event.srcElement,url=target.src||target.href;if(url){var failedLog={url:formatUrl(url),status:400,method:'get',type:'static',isHttps:urlIsHttps(url),urlQuery:formatUrl(url,true),x5Type:getX5Type(),x5ContentType:ReportDefaultNum.string,x5HttpStatusCode:ReportDefaultNum.number,x5ImgDecodeStatus:ReportDefaultNum.number,x5ErrorCode:ReportDefaultNum.number,x5LoadFromLocalCache:false,x5ContentLength:ReportDefaultNum.number,domainLookup:ReportDefaultNum.number,connectTime:ReportDefaultNum.number,};publish(failedLog);}},true);}};function publish(msg){pipelineList.forEach(function(pipeline){pipeline(msg);});}var collectCur=0;function collect(){var allEntries=performance.getEntriesByType('resource'),entries=allEntries.slice(collectCur);collectCur=allEntries.length;for(var i=0,l=entries.length;i<l;i++){var entry=entries[i];if(ASSETS_INITIATOR_TYPE.indexOf(entry.initiatorType)!==-1){publish(generateLog(entry));}}}function generateLog(entry){console.log(entry);return{url:formatUrl(entry.name),method:'get',duration:Number(entry.duration.toFixed(2)),status:200,type:'static',isHttps:urlIsHttps(entry.name),urlQuery:formatUrl(entry.name,true),x5Type:getX5Type(),x5ContentType:getReportDefaultVal(entry.x5ContentType,true),x5HttpStatusCode:getReportDefaultVal(entry.x5HttpStatusCode),x5ImgDecodeStatus:getReportDefaultVal(entry.x5ImgDecodeStatus),x5ErrorCode:getReportDefaultVal(entry.x5ErrorCode),x5LoadFromLocalCache:Boolean(entry.x5LoadFromLocalCache),x5ContentLength:entry.encodedBodySize||getReportDefaultVal(entry.x5ContentLength),domainLookup:getReportDefaultVal(entry.domainLookupEnd-entry.domainLookupStart),connectTime:getReportDefaultVal(entry.connectEnd-entry.connectStart),};}var sendList=[];function publish$1(log,instance){var param=[];for(var key in log){param.push(key+"="+log[key]);}sendList.forEach(function(send){send({url:instance.config.performanceUrl+"?"+param.join('&')});});sendList.length=0;}var result;var pagePerformance=function(){var _this=this;if(!canUseResourceTiming())return;sendList.push(this.send);if(result){publish$1(result,this);}else{try{getFirstScreenTiming(function(firstScreenTiming){var t=performance.timing;result={dnsLookup:t.domainLookupEnd-t.domainLookupStart,tcp:t.connectEnd-t.connectStart,ssl:t.secureConnectionStart===0?0:t.requestStart-t.secureConnectionStart,ttfb:t.responseStart-t.requestStart,contentDownload:t.responseEnd-t.responseStart,domParse:t.domInteractive-t.domLoading,resourceDownload:t.loadEventStart-t.domInteractive,firstScreenTiming:Math.floor(firstScreenTiming)};publish$1(result,_this);});}catch(e){}}};function getFirstScreenTiming(callback){var ignoreEleList=['script','style','link','br'],changeList=[];var observeDom=new MutationObserver(function(mutations){var change={roots:[],rootsDomNum:[],time:performance.now()};mutations.forEach(function(mutation){if(!mutation||!mutation.addedNodes||!mutation.addedNodes.forEach)return;mutation.addedNodes.forEach(function(ele){if(ele.nodeType===1&&ignoreEleList.indexOf(ele.nodeName.toLocaleLowerCase())===-1&&!isEleInArray(ele,change.roots)){change.roots.push(ele);change.rootsDomNum.push(walkAndCount(ele)||0);}});});change.roots.length&&changeList.push(change);});observeDom.observe(document,{childList:true,subtree:true});setTimeout(function(){observeDom.disconnect();var maxChange=0,firstScreenTiming=NaN,hasImage=false;changeList.forEach(function(change){for(var i=0;i<change.roots.length;i++){if(change.rootsDomNum[i]>maxChange&&isInFirstScreen(change.roots[i])){maxChange=change.rootsDomNum[i];firstScreenTiming=change.time;}}});window.performance.getEntriesByType('resource').forEach(function(resource){if(resource.initiatorType==='img'&&(resource.fetchStart<firstScreenTiming||resource.startTime<firstScreenTiming)&&resource.responseEnd>firstScreenTiming){hasImage=true;firstScreenTiming=resource.responseEnd;}});callback&&callback(hasImage?firstScreenTiming:firstScreenTiming+25);},3000);}function isEleInArray(target,arr){if(!target||target===document.documentElement){return false;}else if(arr.indexOf(target)!==-1){return true;}else{return isEleInArray(target.parentElement,arr);}}function isInFirstScreen(target){if(!target||!target.getBoundingClientRect)return false;var rect=target.getBoundingClientRect(),screenHeight=window.innerHeight,screenWidth=window.innerWidth;return(rect.left>=0&&rect.left<screenWidth&&rect.top>=0&&rect.top<screenHeight);}function walkAndCount(target){var eleNum=0;if(target&&target.nodeType===1){eleNum++;var children=target.children;if(children&&children.length){for(var i=0;i<children.length;i++){eleNum+=walkAndCount(children[i]);}}}return eleNum;}var override=false;var cgiSpeed=function(){if(!this.config.reportApiSpeed)return;speedPipelineList.push(this._speedLogPipeline);apiResPipelineList.push(this._normalLogPipeline);if(!override){override=true;overrideFetch();overrideXhr();}};var speedPipelineList=[];function publishSpeed(log){speedPipelineList.forEach(function(send){send(log);});}var apiResPipelineList=[];function publishApiRes(log){apiResPipelineList.forEach(function(send){send(log);});}function overrideFetch(){if(typeof window.fetch!=='function')return;var originFetch=window.fetch;window.fetch=function aegisFakeFetch(url,option){var sendTime=Date.now();return originFetch(url,option).then(function(res){try{var contentType=res.headers?res.headers.get('content-type'):'';if(!res.ok||typeof contentType!=='string'||!isRequestAsset(contentType)){res.clone().text().then(function(data){publishApiRes({msg:url+" "+data,level:LOG_TYPE.API_RESPONSE});var ret=tryToGetRetCode(data);var log={url:formatUrl(res.url),isHttps:urlIsHttps(res.url),method:(option&&option.method)||'get',duration:Date.now()-sendTime,type:'fetch',ret:ret||'unknown',status:res.status};publishSpeed(log);if(ret!=='0'&&ret!=='unknown'){publishApiRes({msg:"request url: "+url+" \n response: "+data,level:LOG_TYPE.RET_ERROR});}});}else{var log={url:formatUrl(res.url),isHttps:urlIsHttps(res.url),method:(option&&option.method)||'get',duration:Date.now()-sendTime,type:'static',status:res.status};publishSpeed(log);}}catch(e){}return res;}).catch(function(err){var log={url:formatUrl(url),isHttps:urlIsHttps(url),method:(option&&option.method)||'get',duration:Date.now()-sendTime,type:'fetch',status:600};publishSpeed(log);throw err;});};}function overrideXhr(){var xhrProto=window.XMLHttpRequest.prototype,originOpen=xhrProto.open,originSend=xhrProto.send;xhrProto.open=function aegisFakeXhrOpen(){!this.__sendByAegis&&(this.aegisMethod=arguments[0]);return originOpen.apply(this,arguments);};xhrProto.send=function aegisFakeXhrSend(){var sendTime=Date.now();!this.__sendByAegis&&this.addEventListener('loadend',function aegisXhrLoadendHandler(){var url=this.responseURL;var speedLog={url:formatUrl(url),isHttps:urlIsHttps(url),status:this.status,method:this.aegisMethod||'get',type:'fetch',duration:Date.now()-sendTime};var contentType=this.getResponseHeader('content-type');if(this.status>=400||typeof contentType!=='string'||!isRequestAsset(contentType)){try{publishApiRes({msg:url+" "+this.response,level:LOG_TYPE.API_RESPONSE});speedLog.ret=tryToGetRetCode(this.response);if(speedLog.ret!=='0'&&speedLog.ret!=='unknown'){publishApiRes({msg:"request url: "+url+" \n response: "+this.response,level:LOG_TYPE.RET_ERROR});}}catch(e){speedLog.ret='unknown';}}else{speedLog.type='static';delete speedLog.ret;}publishSpeed(speedLog);});return originSend.apply(this,arguments);};}var aid=function(){var _this=this;getAid(function(aid){_this.bean.aid=aid;});};function getAid(callback){try{var aid_1=window.localStorage.getItem('AEGIS_ID');if(!aid_1){aid_1='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=(Math.random()*16)|0,v=c=='x'?r:(r&0x3)|0x8;return v.toString(16);});window.localStorage.setItem('AEGIS_ID',aid_1);}callback&&callback(aid_1||'');}catch(e){callback&&callback('');}}var tjg=function(Aegis){if(this.config.tjg){setTjgHeader(Aegis);}};var alreadySetTjgHeader=false;function setTjgHeader(aegis){if(alreadySetTjgHeader)return;alreadySetTjgHeader=true;overrideFetch$1(aegis);overrideXHR(aegis);}function overrideFetch$1(aegis){if(typeof window.fetch!=='function')return;var originFetch=window.fetch;window.fetch=function aegisTjgFakeFetch(url,option){if(isSameOrigin(url)){if(typeof option==='object'&&option){if(option.headers){if(option.headers instanceof Headers){option.headers.append('X-Tjg-Json-Span-Context',getTjgHeaderValue(aegis));}}else{option.headers=new Headers({'X-Tjg-Json-Span-Context':getTjgHeaderValue(aegis)});}}else{option={headers:new Headers({'X-Tjg-Json-Span-Context':getTjgHeaderValue(aegis)})};}}return originFetch(url,option);};}function overrideXHR(aegis){if(!window.XMLHttpRequest)return;var originSend=window.XMLHttpRequest.prototype.send,originOpen=window.XMLHttpRequest.prototype.open;window.XMLHttpRequest.prototype.open=function aegisTjgFakeOpen(){if(!this.__sendByAegis&&isSameOrigin(arguments[1])){this.useTjg=true;}return originOpen.apply(this,arguments);};window.XMLHttpRequest.prototype.send=function aegisTjgFakeSend(){if(this.useTjg){this.setRequestHeader('X-Tjg-Json-Span-Context',getTjgHeaderValue(aegis));}return originSend.apply(this,arguments);};}function getTjgHeaderValue(aegis){return JSON.stringify({ids:{trace_id:{high:rand53(),low:rand53()},span_id:rand53(),parent_id:0,flag:2},baggages:{aegis_session_id:aegis._sessionID}});}function rand53(){return parseInt(new Array(53).fill(1).map(function(){return(Math.random()>0.5?1:0);}).join(''),2);}function isSameOrigin(url){var a=document.createElement('a');a.href=url;return location.origin===a.origin;}function createThrottlePipe(delay,maxLength){var timer;var msgs=[];return function(msg,resolve){msgs.push(msg);if(maxLength&&msgs.length>=maxLength){resolve(msgs.splice(0,msgs.length));timer&&clearTimeout(timer);return;}if(timer){clearTimeout(timer);}timer=setTimeout(function(){timer=null;resolve(msgs.splice(0,msgs.length));},delay);};}var formatNormalLogPipe=function(log,resolve){if(Array.isArray(log)){return resolve(log.map(function(log){return{msg:typeof log.msg==='string'?log.msg:stringifyPlus(log.msg),level:log.level};}));}else{return resolve({msg:typeof log.msg==='string'?log.msg:stringifyPlus(log.msg),level:log.level});}};function createWhitelistPipe(aegis){var isWhiteList=false,requestEnd=false;setTimeout(function(){aegis.send({url:aegis.config.whiteListUrl},function(res){try{res=JSON.parse(res)||{};if(res.retcode===0){isWhiteList=res.result.is_in_white_list;}requestEnd=true;}catch(e){}},function(){requestEnd=true;});},50);var pool=[];return function(logs,resolve){if(isWhiteList){resolve(logs.concat(pool.splice(0)).map(function(log){log.level===LOG_TYPE.INFO_ALL&&(log.level=LOG_TYPE.INFO);return log;}));}else{var otherLog=logs.filter(function(log){if(log.level!==LOG_TYPE.INFO&&log.level!==LOG_TYPE.API_RESPONSE){log.level===LOG_TYPE.INFO_ALL&&(log.level=LOG_TYPE.INFO);return true;}if(!requestEnd){pool.push(log);pool.length>=200&&(pool.length=200);}});otherLog.length&&resolve(otherLog);}};}function createSpeedRepeatLimitPipe(){var logMap={};return function(log,resolve){if(Array.isArray(log)){var filterLog=log.filter(function(log){var through=!logMap[log.url];logMap[log.url]=true;return through;});filterLog.length&&resolve(filterLog);}else{!logMap[log.url]&&resolve(log);logMap[log.url]=true;}};}var noop=function(){};function createPipeline(pipeArr){if(!pipeArr||!pipeArr.reduce||!pipeArr.length){throw new TypeError('createPipeline 方法需要传入至少有一个 pipe 的数组');}if(pipeArr.length===1){return function(msg,resolve){pipeArr[0](msg,resolve||noop);};}else{return pipeArr.reduce(function(prePipe,pipe){return function(msg,nextPipe){if(nextPipe===void 0){nextPipe=noop;}return prePipe(msg,function(msg){return(pipe&&pipe(msg,nextPipe));});};});}}var Core=(function(){function Core(config){var _this=this;this.config=getDefaultConfig();this.lifeCycle=new EventEmiter();this.bean={};this._normalLogPipeline=createPipeline([createThrottlePipe(this.config.delay,5),createWhitelistPipe(this),formatNormalLogPipe,function(logs,resolve){var beforeReport=_this.config.beforeReport;if(typeof beforeReport==='function'){logs=logs.filter(function(log){return beforeReport(log)!==false;});}if(logs.length){_this.lifeCycle.emit('beforeReport',logs);return resolve(logs);}},function(logs){_this.send({url:_this.config.url,data:buildLogParam(logs),method:'post',contentType:'application/x-www-form-urlencoded'},function(){var onReport=_this.config.onReport;if(typeof onReport==='function')logs.forEach(function(log){onReport(log);});});}]);this._timeMap={};this._customTimePipeline=createPipeline([createThrottlePipe(this.config.delay),function(logs){_this.send({url:_this.config.customTimeUrl+"?version="+_this.config.version+"&payload="+encodeURIComponent(JSON.stringify({custom:logs}))});}]);}Core.prototype.init=function(config,subClass){var _this=this;this.setConfig(config);Core.installedPlugins.forEach(function(plugin){plugin.call(_this,subClass);});this.lifeCycle.emit('onInited');};Core.prototype.setConfig=function(config){Object.assign(this.config,config);this.bean.id=this.config.id||'';this.bean.uin=this.config.uin||'';this.bean.version=this.config.version||0;return this.config;};Core.prototype.extendBean=function(key,value){this.bean[key]=value;};Core.use=function(plugin){if(Core.installedPlugins.indexOf(plugin)===-1){Core.installedPlugins.push(plugin);}};Core.prototype.send=function(options,success,fail){throw new Error("You need to override \"send\" method");};Core.prototype._sendSDKError=function(err){this.send({url:"https://aegis.qq.com/collect?id=1085&msg[0]="+encodeURIComponent(stringifyPlus(err))+"&level[0]=2&from="+this.config.id+"&count=1&version="+"1.5.15",addBean:false,method:'get'});};Core.prototype.info=function(msg){this._normalLogPipeline({msg:msg,level:LOG_TYPE.INFO});};Core.prototype.infoAll=function(msg){this._normalLogPipeline({msg:msg,level:LOG_TYPE.INFO_ALL});};Core.prototype.report=function(msg){this._normalLogPipeline({msg:msg,level:LOG_TYPE.ERROR});};Core.prototype.reportPv=function(id){if(!id)return;this.send({url:this.config.url+"/"+id});};Core.prototype.reportTime=function(key,duration){if(typeof key!=='string'){console.warn('reportTime 的第一个参数必须为开发者平台申请的 key 值');return;}if(typeof duration!=='number'){console.warn('reportTime 的第二个参数必须为 number 类型哟');return;}this._submitCustomTime(key,duration);};Core.prototype.time=function(key){if(typeof key!=='string'){console.warn('time 的第一个参数必须传入开发者平台申请到的 key 值');return;}if(!this._timeMap[key]){this._timeMap[key]=Date.now();}else{console.warn("Timer "+key+" already exists");}};Core.prototype.timeEnd=function(key){if(typeof key!=='string'){console.warn('timeEnd 的第一个参数必须传入开发者平台申请到的 key 值');return;}if(this._timeMap[key]){this._submitCustomTime(key,Date.now()-this._timeMap[key]);delete this._timeMap[key];}else{console.warn("Timer "+key+" does not exist");}};Core.prototype._submitCustomTime=function(name,duration){this._customTimePipeline({name:name,duration:duration});};Core.installedPlugins=[];return Core;}());var buildParam=function(url,param){if(typeof url!=='string')return'';if(typeof param==='object'&&param){var paramStr=Object.getOwnPropertyNames(param).map(function(key){var v=param[key];return key+"="+(typeof v==='string'?encodeURIComponent(v):encodeURIComponent(JSON.stringify(v)));}).join('&').replace(/eval/gi,'evaI');return""+url+(url.indexOf('?')===-1?'?':'&')+paramStr;}else{return url;}};var ua$1=navigator.userAgent.toLowerCase();function speedShim(logs,bean){var result={fetch:[],static:[]};var formData=new FormData();if(Array.isArray(logs)){logs.forEach(function(log){result[log.type].push(log);});}else{result[logs.type].push(logs);}formData.append('payload',JSON.stringify(__assign({duration:result},bean)));return formData;}function loadScript(url,name,cb){var s=document.createElement('script');var head=document.head;if(typeof name==='function'){cb=name;name='';}s.src=url;s.setAttribute('name',name);s.name=name;s.async=true;s.onload=s.onreadystatechange=function(){if(!s.readyState||s.readyState==='loaded'||s.readyState==='complete'){typeof cb==='function'&&cb(false);head.removeChild(s);}};s.onerror=function(){typeof cb==='function'&&cb(true);head.removeChild(s);};head.appendChild(s);}var PlatTypeNum;(function(PlatTypeNum){PlatTypeNum[PlatTypeNum["android"]=1]="android";PlatTypeNum[PlatTypeNum["ios"]=2]="ios";PlatTypeNum[PlatTypeNum["other"]=100]="other";})(PlatTypeNum||(PlatTypeNum={}));function getPlatform(){var REGEXP_ANDROID=/\bAndroid\s*([^;]+)/;var REGEXP_IOS=/\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/;var platform=PlatTypeNum.other;if(REGEXP_ANDROID.test(ua$1)){platform=PlatTypeNum.android;}else if(REGEXP_IOS.test(ua$1)){platform=PlatTypeNum.ios;}return platform;}var NetworkTypeNum;(function(NetworkTypeNum){NetworkTypeNum[NetworkTypeNum["unknown"]=0]="unknown";NetworkTypeNum[NetworkTypeNum["wifi"]=1]="wifi";NetworkTypeNum[NetworkTypeNum["net2g"]=2]="net2g";NetworkTypeNum[NetworkTypeNum["net3g"]=3]="net3g";NetworkTypeNum[NetworkTypeNum["net4g"]=4]="net4g";})(NetworkTypeNum||(NetworkTypeNum={}));function getNetworkType(callback){function parseNumberType(net){net=String(net).toLowerCase();if(net.indexOf('2g')>=0)return NetworkTypeNum.net2g;if(net.indexOf('3g')>=0)return NetworkTypeNum.net3g;if(net.indexOf('4g')>=0)return NetworkTypeNum.net4g;if(net.indexOf('wifi')>=0)return NetworkTypeNum.wifi;return NetworkTypeNum.unknown;}try{if(window.mqq&&window.mqq.device&&typeof window.mqq.device.getNetworkType=='function'&&window.mqq.support&&window.mqq.support("mqq.device.getNetworkType")){window.mqq.device.getNetworkType(function(result){if(result==-1){result=NetworkTypeNum.unknown;}callback(result);});}else{var netType=(navigator.connection&&navigator.connection.type)?navigator.connection.type:'unknown';callback(parseNumberType(netType));}}catch(e){callback(NetworkTypeNum.unknown);}}function loadFlog(scriptUrl,config){var _a=config.dbConfig,dbConfig=_a===void 0?{}:_a,_b=config.url,url=_b===void 0?'https://aegis.qq.com/badjs':_b,_c=config.offlineLogExp,offlineLogExp=_c===void 0?3:_c,id=config.id,uin=config.uin;var collect=[];var upload=null;function collector(log){collect.push(log);}function uploader(conds,params){if(conds===void 0){conds={};}if(params===void 0){params={};}upload={conds:conds,params:params};}Aegis.useAsyncPlugin(scriptUrl,{exportsConstructor:'Flog',onAegisInit:function(aegis){aegis.lifeCycle.on('beforeReport',collector);aegis.lifeCycle.on('uploadLogs',uploader);},onAegisInitAndPluginLoaded:function(aegis,exportsConstructor){aegis.lifeCycle.remove('beforeReport',collector);aegis.lifeCycle.remove('uploadLogs',uploader);var options=Object.assign({lookupUrl:url+"/offlineAuto?id="+id+"&uin="+uin,uploadUrl:url+'/offlineLog',preservedDay:offlineLogExp,id:id,uin:uin},dbConfig,{sessionId:Aegis._sessionID});try{var flog_1=new exportsConstructor(options);collect.forEach(function(e){flog_1.add(e);});aegis.lifeCycle.on('beforeReport',function(logs){if(logs===void 0){logs=[];}logs.forEach(function(e){flog_1.add(e);});});aegis.lifeCycle.on('uploadLogs',function(conds,params){if(conds===void 0){conds={};}if(params===void 0){params={};}var _conds=Object.assign({id:config.id,uin:config.uin},conds);flog_1.uploadLogs(_conds,params);});if(upload){aegis.lifeCycle.emit('uploadLogs',upload.conds,upload.params);upload=null;}}catch(e){console.log(e);}}});}var Aegis=(function(_super){__extends(Aegis,_super);function Aegis(config){var _this=_super.call(this,config)||this;_this.send=function(options,success,fail){if(!options||typeof options.url!=='string'||!_this.bean.id){return;}var url=options.url;if(options.addBean!==false){url=""+url+(url.indexOf('?')===-1?'?':'&')+_this._bean;}var method=options.method||'get';var xhr=new XMLHttpRequest();xhr.__sendByAegis=true;xhr.addEventListener('readystatechange',function(){if(xhr.readyState===4){if(xhr.status>=400){fail&&fail(xhr.response);}else{success&&success(xhr.response);}}});if(method.toLocaleLowerCase()==='get'){xhr.open('get',buildParam(url,options.data));xhr.send();}else{xhr.open('post',url);if(options.contentType){xhr.setRequestHeader('Content-Type',options.contentType);}if(typeof options.data==='string'){options.data=options.data.replace(/eval/gi,'evaI');}xhr.send(options.data);}};_this._speedLogPipeline=createPipeline([createSpeedRepeatLimitPipe(),createThrottlePipe(_this.config.delay),function(logs,resolve){var beforeReportSpeed=_this.config.beforeReportSpeed;if(typeof beforeReportSpeed==='function'){logs=logs.filter(function(log){return beforeReportSpeed(log)!==false;});}if(logs.length){_this.lifeCycle.emit('beforeReportSpeed',logs);return resolve(logs);}},function(logs){_this.send({url:""+_this.config.speedUrl,method:'post',data:speedShim(logs,_this.bean)});}]);try{config.uin=config.uin||parseInt((document.cookie.match(/\buin=\D+(\d*)/)||[])[1],10)||parseInt((document.cookie.match(/\bilive_uin=\D*(\d+)/)||[])[1],10)||'';if(config.offlineLog)_this._initOfflineLog(config);_this.init(config,Aegis);_this.extendBean('sessionId',Aegis._sessionID);_this.extendBean('platform',getPlatform());_this._addNetworkTypeToBean();}catch(e){console.warn(e);console.log('%c以上错误发生在初始化 Aegis 的过程中，将会影响您正常使用 Aegis，\n建议您联系 aegis-helper，进行反馈，感谢您的支持。','color: red');_this._sendSDKError(e);}return _this;}Object.defineProperty(Aegis.prototype,"_bean",{get:function(){var _this=this;return(Object.getOwnPropertyNames(this.bean).map(function(key){return key+"="+_this.bean[key];}).join('&')+("&from="+encodeURIComponent(location.href)));},enumerable:true,configurable:true});Aegis.prototype._initOfflineLog=function(config){loadFlog('https://cdn-go.cn/vasdev/web_webpersistance_v2/latest/flog.core.min.js',config);};Aegis.prototype._addNetworkTypeToBean=function(){var _this=this;var that=null;that=this;if(typeof this.bean.netType==='undefined'){this.extendBean('netType',0);}getNetworkType(function(type){_this.extendBean('netType',type);setTimeout(that._addNetworkTypeToBean.bind(that),3000);});};Aegis.prototype.uploadLogs=function(params,conds){if(params===void 0){params={};}if(conds===void 0){conds={};}this.lifeCycle.emit('uploadLogs',params,conds);};Aegis.useAsyncPlugin=function(url,options){if(options===void 0){options={};}var _a=options.exportsConstructor,exportsConstructor=_a===void 0?"aegis-plugin-"+this.asyncPluginIndex++:_a,_b=options.onAegisInit,onAegisInit=_b===void 0?function(){}:_b,_c=options.onAegisInitAndPluginLoaded,onAegisInitAndPluginLoaded=_c===void 0?function(){}:_c;if(typeof url!=='string')throw new TypeError('异步插件的 url 必须是 string 类型');if(typeof onAegisInit!=='function'||typeof onAegisInitAndPluginLoaded!=='function')throw new TypeError('onAegisInit、onAegisInitAndPluginLoaded都必须是函数');this.use(function(){var _this=this;try{onAegisInit(this);if(Aegis._asyncPlugin[url]){onAegisInitAndPluginLoaded(this,window[Aegis._asyncPlugin[url]]);}else{loadScript(url,exportsConstructor,function(err){if(err)return;Aegis._asyncPlugin[url]=exportsConstructor;onAegisInitAndPluginLoaded(_this,window[exportsConstructor]);});}}catch(e){console.log("\u5728\u521D\u59CB\u5316\u63D2\u4EF6 "+url+" \u65F6\u53D1\u751F\u4EE5\u4E0B\u9519\u8BEF\uFF1A");console.error(e);}});};Aegis.__version__="1.5.15";Aegis._sessionID="session-"+Date.now();Aegis.asyncPluginIndex=0;Aegis._asyncPlugin={};return Aegis;}(Core));Aegis.use(onError);Aegis.use(cgiSpeed);Aegis.use(assetSpeed);Aegis.use(pagePerformance);Aegis.use(aid);Aegis.use(tjg);return Aegis;}));