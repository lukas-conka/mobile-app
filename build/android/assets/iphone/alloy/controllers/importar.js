function __processArg(e,i){var t=null;return e&&(t=e[i]||null,delete e[i]),t}function Controller(){function e(){var e=URL_SYNC;Ti.API.info("Ti.App.Properties.getString(CURRENT_USER_ID)="+Ti.App.Properties.getString(CURRENT_USER_ID)),Ti.API.info("Ti.App.Properties.getString(CURRENT_EMPRESA)="+Ti.App.Properties.getString(CURRENT_EMPRESA));var t={ecatalogos_representante_id:Ti.App.Properties.getString(CURRENT_USER_ID),ecatalogos_representante_ep_id:Ti.App.Properties.getString(CURRENT_EMPRESA)},o=Titanium.Network.createHTTPClient({timeout:6e4});o.onerror=function(){Ti.API.info("Erro="+URL_SYNC),r()},o.onload=function(){i(this.responseText)};try{o.open("POST",e),o.send(t)}catch(a){Ti.API.info("Erro="+URL_SYNC),r()}}function i(e){var i=JSON.parse(e),t=i.success;if("true"==t){var a=i.filename;Ti.App.Properties.setString(SYNC_FILE,a),o()}else s.activityIndicator.hide(),r()}function t(e){var i=e.URL;Ti.API.info("Sincronizando: "+i),I=Ti.Network.createHTTPClient({timeout:5e3}),I.onerror=function(){I=null,Ti.API.info("Erro ao Sincroniar="+i),r()},I.onload=function(){a(e.folderName,e.fileName,this.responseData),I=null;var i,t=Ti.App.Properties.getString(DATABASE_FILE,"empty");if("empty"!=t){var o=Ti.Database.open(t);o.remove(),o=null,Ti.API.info("currentfile"+t);var l=t.split("-"),_=parseInt(l[1])+1;_>1e3&&(_=1),i="ecatalogos-"+_,Ti.API.info("newfile"+_)}else i="ecatalogos-1";Ti.API.info("newfile"+i),Ti.App.Properties.setString(DATABASE_FILE,i);for(var r=Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory+"../Library/Private Documents/"),s=r.getDirectoryListing(),n=1;n<s.length;n++)Ti.API.info("file= "+s[n].toString());"android"!=Ti.Platform.osname&&(t=Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory+"../Library/Private Documents/",t+".sql"),t&&t.exists()&&Ti.API.info("fileexists")),o=Ti.Database.install(Titanium.Filesystem.applicationDataDirectory+"database.db",i),alert(Titanium.Filesystem.applicationDataDirectory),o.close(),o=null,d()};try{I.open("GET",i),I.send()}catch(t){I=null,Ti.API.info("Erro ao Sincroniar="+i),r()}}function o(){var e=Ti.App.Properties.getString(SYNC_FILE),i=e.substring(e.lastIndexOf("/")+1);i=i,t({URL:e,fileName:i,folderName:h}),s.activityIndicator.setMessage("Sincronizando...")}function a(e,i,t){var o=Ti.Filesystem.getFile(h,"database.db");o.write(t)}function l(){s.activityIndicator.show()}function d(){for(var e=getImagesFolder(),i=selectallImagensProdutos(),t=0;i.isValidRow();){var o=i.fieldByName("img_caminho"),a=o.replace(/ /g,"%20"),l=Ti.Filesystem.getFile(e,a);l.exists()||t++,i.next()}for(var _=selectallAparencia();_.isValidRow();){var o=_.fieldByName("apr_arquivo");Ti.API.info(o);var a=o.replace(/ /g,"%20"),l=Ti.Filesystem.getFile(e,a);l.exists()||t++,_.next()}goTo(t>0?"baixar_imagens":"seleciona_cliente")}function r(){Ti.App.Properties.setString(SYNC,"false");var e=Titanium.UI.createAlertDialog({title:"Erro",message:"Falha ao sincronizar!",buttonNames:["Ok"],cancel:0});e.addEventListener("click",function(){goTo("index")}),e.show()}require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="importar",this.args=arguments[0]||{},arguments[0]&&(__processArg(arguments[0],"__parentSymbol"),__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate"));var s=this,n={},c={};s.__views.importar=Ti.UI.createWindow({backgroundColor:"white",orientationModes:[Ti.UI.LANDSCAPE_LEFT,Ti.UI.LANDSCAPE_RIGHT],id:"importar"}),s.__views.importar&&s.addTopLevelView(s.__views.importar),l?s.__views.importar.addEventListener("open",l):c["$.__views.importar!open!showIndicator"]=!0,s.__views.activityIndicator=Ti.UI.createActivityIndicator({id:"activityIndicator",message:"Sincronizando, por favor aguarde..."}),s.__views.importar.add(s.__views.activityIndicator),n.destroy=function(){},_.extend(s,s.__views),arguments[0]||{},Ti.include("/database/imagens_produtos.js"),Ti.include("/database/aparencia.js"),Ti.include("/api/config.js");var I,h=Ti.Filesystem.applicationDataDirectory,f=[],w=[];Ti.App.Properties.setList(SELECTED_CLIENTS,w),Ti.App.Properties.setList(SELECTED_PRODUCTS,f),e(),c["$.__views.importar!open!showIndicator"]&&s.__views.importar.addEventListener("open",l),_.extend(s,n)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;