function __processArg(e,i){var t=null;return e&&(t=e[i]||null,delete e[i]),t}function Controller(){function e(e){I=!0,t();var i=o.listaCategorias.sections[e.sectionIndex],a=i.getItemAt(e.itemIndex),l=a.cat_id,r=a.fk_template,_=a.marca;Ti.App.Properties.setString(SELECTED_CATEGORY,l);var d={marca:_,cat_id:l,template:r};switch(g&&(Ti.App.fireEvent("removeBitmap",{name:"bar"}),o.corpo.remove(g)),r){case 1:g=Alloy.createController("vitrine_quatro_quadrados",d).getView();break;case 2:g=Alloy.createController("vitrine_tres_verticais",d).getView();break;case 3:g=Alloy.createController("vitrine_quatro_verticais",d).getView();break;case 4:g=Alloy.createController("vitrine_um_horizontal",d).getView();break;case 5:g=Alloy.createController("vitrine_dois_horizontais",d).getView();break;case 6:g=Alloy.createController("vitrine_dois_verticais",d).getView();break;case 7:g=Alloy.createController("vitrine_quatro_horizontais",d).getView();break;case 8:g=Alloy.createController("vitrine_cinco_verticais",d).getView();break;case 9:g=Alloy.createController("vitrine_seis_verticais",d).getView()}o.corpo.add(g)}function i(){I=!0,t(),g&&(Ti.App.fireEvent("removeBitmap",{name:"bar"}),o.corpo.remove(g)),g=Alloy.createController("destacadas").getView(),o.corpo.add(g)}function t(){I?(o.lateral.animate({curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,left:"-15%",duration:200,image:"/images/setinhaindo.png"}),I=!1):(o.lateral.animate({curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,left:0,duration:200,image:"/images/setinhavoltando.png"}),I=!0)}require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="categorias",this.args=arguments[0]||{},arguments[0]&&(__processArg(arguments[0],"__parentSymbol"),__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate"));var o=this,a={},l={};o.__views.categorias=Ti.UI.createWindow({backgroundColor:"white",id:"categorias"}),o.__views.categorias&&o.addTopLevelView(o.__views.categorias),o.__views.lateral=Ti.UI.createView({height:"100%",left:"-15%",width:"17%",zIndex:10,id:"lateral"}),o.__views.categorias.add(o.__views.lateral),o.__views.__alloyId241=Ti.UI.createView({backgroundColor:"white",width:"88%",height:"100%",left:0,id:"__alloyId241"}),o.__views.lateral.add(o.__views.__alloyId241),o.__views.logoEmpresa=Ti.UI.createImageView({top:5,left:5,width:"98%",id:"logoEmpresa"}),o.__views.__alloyId241.add(o.__views.logoEmpresa),i?o.__views.logoEmpresa.addEventListener("click",i):l["$.__views.logoEmpresa!click!goToDestacadas"]=!0,o.__views.__alloyId242=Ti.UI.createButton({backgroundColor:"#ffffff",color:"#000000",height:"5%",top:"15%",width:"100%",title:"Categorias",id:"__alloyId242"}),o.__views.__alloyId241.add(o.__views.__alloyId242);var r={},d=[],s={type:"Ti.UI.View",childTemplates:function(){var e=[],i={type:"Ti.UI.Label",bindId:"btnmenu",properties:{touchEnabled:"false",width:"98%",color:"white",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,bindId:"btnmenu"}};return e.push(i),e}(),properties:{backgroundColor:"#3f3a35",borderColor:"#9ccccb",borderWidth:"4",color:"#ffffff",width:"90%",height:"80%"},events:{click:e}};d.push(s);var n={properties:{height:"112dp",name:"menuTemplateSimple"},childTemplates:d};r.menuTemplateSimple=n;var c=[],f={type:"Ti.UI.View",childTemplates:function(){var e=[],i={type:"Ti.UI.Label",bindId:"btnmenuA",properties:{touchEnabled:"false",backgroundColor:"#3f3a35",color:"#ffffff",top:"30",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,bindId:"btnmenuA"}};e.push(i);var t={type:"Ti.UI.Label",bindId:"btnmenuB",properties:{touchEnabled:"false",backgroundColor:"#3f3a35",color:"#999",top:"50",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,bindId:"btnmenuB"}};return e.push(t),e}(),properties:{backgroundColor:"#3f3a35",borderColor:"#9ccccb",borderWidth:"4",color:"#ffffff",height:"94",top:"10",width:"90%"},events:{click:e}};c.push(f);var p={properties:{height:"112dp",name:"menuTemplateDouble"},childTemplates:c};r.menuTemplateDouble=p,o.__views.__alloyId262=Ti.UI.createListSection({id:"__alloyId262"});var h=[];h.push(o.__views.__alloyId262),o.__views.listaCategorias=Ti.UI.createListView({backgroundColor:"#d0e2e6",borderColor:"#008382",borderWidth:"4",height:"80%",top:"20%",width:"100%",sections:h,templates:r,defaultItemTemplate:"menuTemplateSimple",id:"listaCategorias"}),o.__views.__alloyId241.add(o.__views.listaCategorias),o.__views.__alloyId265=Ti.UI.createImageView({image:"/images/setinhaindo.png",width:"12%",right:0,id:"__alloyId265"}),o.__views.lateral.add(o.__views.__alloyId265),t?o.__views.__alloyId265.addEventListener("click",t):l["$.__views.__alloyId265!click!showMenu"]=!0,o.__views.corpo=Ti.UI.createView({height:"98%",top:"1%",width:"98%",left:"2%",id:"corpo"}),o.__views.categorias.add(o.__views.corpo),a.destroy=function(){},_.extend(o,o.__views),arguments[0]||{},Ti.include("/api/config.js"),Ti.include("/database/categorias.js"),Ti.include("/database/aparencia.js"),Ti.include("/database/categoriasmarca.js"),o.logoEmpresa.image=getImagesFolder()+selectLogoFile();for(var g,I=!1,u=[],y=Ti.App.Properties.getString(SELECTED_MARCA),w=Ti.App.Properties.getString(CURRENT_EMPRESA),T=Ti.App.Properties.getString(CURRENT_SOFTWARE),v=selectAllMenuCategorias(y,w,T);v.isValidRow();){var b=v.fieldByName("cat_id"),E=v.fieldByName("cat_nome"),m=v.fieldByName("fk_template"),C=v.fieldByName("fk_marca");if(1==T||2==T)u.push({cat_id:b,marca:C,btnmenu:{text:E},template:"menuTemplateSimple",fk_template:m});else{var k=v.fieldByName("mc_nome");u.push({cat_id:b,marca:C,btnmenuA:{text:E},btnmenuB:{text:k},template:"menuTemplateDouble",fk_template:m})}v.next()}v.close(),o.listaCategorias.sections[0].setItems(u),i(),l["$.__views.logoEmpresa!click!goToDestacadas"]&&o.__views.logoEmpresa.addEventListener("click",i),l["$.__views.__alloyId265!click!showMenu"]&&o.__views.__alloyId265.addEventListener("click",t),_.extend(o,a)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;