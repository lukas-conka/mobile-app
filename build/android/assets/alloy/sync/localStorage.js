function S4(){return(65536*(1+Math.random())|0).toString(16).substring(1)}function guid(){return S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()}function InitAdapter(){throw"localStorage persistence supported only with MobileWeb."}function Sync(e,i,t){function o(e){localStorage.setItem(a,JSON.stringify(e))}var a=i.config.adapter.collection_name,l=i.config.data,r=null;switch(e){case"create":i.id||(i.id=guid(),i.set(i.idAttribute,i.id)),l[i.id]=i,o(l),r=i.toJSON();break;case"read":var d=localStorage.getItem(a),s=d&&JSON.parse(d)||{},n=0;for(var c in s){var f=new i.config.Model(s[c]);i.models.push(f),n++}i.length=n,r=1===n?i.models[0]:i.models;break;case"update":l[i.id]=i,o(l),r=i.toJSON();break;case"delete":delete l[i.id],o(l),r=i.toJSON()}r?(_.isFunction(t.success)&&t.success(r),"read"===e&&i.trigger("fetch")):_.isFunction(t.error)&&t.error(r)}var _=require("alloy/underscore")._;module.exports.sync=Sync,module.exports.beforeModelCreate=function(e){return e=e||{},e.data={},InitAdapter(),e},module.exports.afterModelCreate=function(e){return e=e||{},e.prototype.config.Model=e,e};