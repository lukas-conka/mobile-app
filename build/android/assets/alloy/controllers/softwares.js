function __processArg(e,i){var t=null;return e&&(t=e[i]||null,delete e[i]),t}function Controller(){function e(){Ti.App.Properties.setString(CURRENT_SOFTWARE,1),l()}function i(){Ti.App.Properties.setString(CURRENT_SOFTWARE,2),a()}function t(){Ti.App.Properties.setString(CURRENT_SOFTWARE,3),a()}function o(){Ti.App.Properties.setString(CURRENT_SOFTWARE,4),a()}function a(){goTo("seleciona_cliente")}function l(){goTo("marca")}require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="softwares",this.args=arguments[0]||{},arguments[0]&&(__processArg(arguments[0],"__parentSymbol"),__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate"));var r=this,d={},s={};r.__views.softwares=Ti.UI.createWindow({backgroundColor:"white",id:"softwares"}),r.__views.softwares&&r.addTopLevelView(r.__views.softwares),r.__views.__alloyId1416=Ti.UI.createView({layout:"vertical",id:"__alloyId1416"}),r.__views.softwares.add(r.__views.__alloyId1416),r.__views.__alloyId1417=Ti.UI.createView({height:"10%",top:"0",width:"100%",id:"__alloyId1417"}),r.__views.__alloyId1416.add(r.__views.__alloyId1417),r.__views.__alloyId1418=Ti.UI.createButton({backgroundColor:"#ffffff",color:"#000000",left:"10",title:"SELECIONE O TIPO DE SOFTWARE",id:"__alloyId1418"}),r.__views.__alloyId1417.add(r.__views.__alloyId1418),r.__views.__alloyId1419=Ti.UI.createImageView({id:"__alloyId1419"}),r.__views.__alloyId1417.add(r.__views.__alloyId1419),r.__views.__alloyId1420=Ti.UI.createView({top:"2%",height:"45%",width:"90%",layout:"horizontal",id:"__alloyId1420"}),r.__views.__alloyId1416.add(r.__views.__alloyId1420),r.__views.__alloyId1421=Ti.UI.createImageView({top:0,width:"37%",image:"/images/cristal.png",id:"__alloyId1421"}),r.__views.__alloyId1420.add(r.__views.__alloyId1421),r.__views.__alloyId1422=Ti.UI.createView({left:"2%",width:"10%",height:"100%",layout:"vertical",id:"__alloyId1422"}),r.__views.__alloyId1420.add(r.__views.__alloyId1422),r.__views.__alloyId1423=Ti.UI.createImageView({top:"10%",image:"/images/tutorial.png",width:"100%",id:"__alloyId1423"}),r.__views.__alloyId1422.add(r.__views.__alloyId1423),r.__views.__alloyId1424=Ti.UI.createImageView({top:"2%",image:"/images/select_cristal.png",width:"100%",id:"__alloyId1424"}),r.__views.__alloyId1422.add(r.__views.__alloyId1424),e?r.__views.__alloyId1424.addEventListener("click",e):s["$.__views.__alloyId1424!click!cristal"]=!0,r.__views.__alloyId1425=Ti.UI.createImageView({top:0,left:"2%",width:"37%",image:"/images/esmeralda.png",id:"__alloyId1425"}),r.__views.__alloyId1420.add(r.__views.__alloyId1425),r.__views.__alloyId1426=Ti.UI.createView({left:"2%",width:"10%",height:"100%",layout:"vertical",id:"__alloyId1426"}),r.__views.__alloyId1420.add(r.__views.__alloyId1426),r.__views.__alloyId1427=Ti.UI.createImageView({top:"10%",image:"/images/tutorial.png",width:"100%",id:"__alloyId1427"}),r.__views.__alloyId1426.add(r.__views.__alloyId1427),r.__views.__alloyId1428=Ti.UI.createImageView({top:"2%",image:"/images/select_esmeralda.png",width:"100%",id:"__alloyId1428"}),r.__views.__alloyId1426.add(r.__views.__alloyId1428),i?r.__views.__alloyId1428.addEventListener("click",i):s["$.__views.__alloyId1428!click!esmeralda"]=!0,r.__views.__alloyId1429=Ti.UI.createView({top:"2%",height:"45%",width:"90%",layout:"horizontal",id:"__alloyId1429"}),r.__views.__alloyId1416.add(r.__views.__alloyId1429),r.__views.__alloyId1430=Ti.UI.createImageView({top:0,width:"37%",image:"/images/rubi.png",id:"__alloyId1430"}),r.__views.__alloyId1429.add(r.__views.__alloyId1430),r.__views.__alloyId1431=Ti.UI.createView({left:"2%",width:"10%",height:"100%",layout:"vertical",id:"__alloyId1431"}),r.__views.__alloyId1429.add(r.__views.__alloyId1431),r.__views.__alloyId1432=Ti.UI.createImageView({top:"10%",image:"/images/tutorial.png",width:"100%",id:"__alloyId1432"}),r.__views.__alloyId1431.add(r.__views.__alloyId1432),r.__views.__alloyId1433=Ti.UI.createImageView({top:"2%",image:"/images/select_rubi.png",width:"100%",id:"__alloyId1433"}),r.__views.__alloyId1431.add(r.__views.__alloyId1433),t?r.__views.__alloyId1433.addEventListener("click",t):s["$.__views.__alloyId1433!click!rubi"]=!0,r.__views.__alloyId1434=Ti.UI.createImageView({top:0,left:"2%",width:"37%",image:"/images/safira.png",id:"__alloyId1434"}),r.__views.__alloyId1429.add(r.__views.__alloyId1434),r.__views.__alloyId1435=Ti.UI.createView({left:"2%",width:"10%",height:"100%",layout:"vertical",id:"__alloyId1435"}),r.__views.__alloyId1429.add(r.__views.__alloyId1435),r.__views.__alloyId1436=Ti.UI.createImageView({top:"10%",image:"/images/tutorial.png",width:"100%",id:"__alloyId1436"}),r.__views.__alloyId1435.add(r.__views.__alloyId1436),r.__views.__alloyId1437=Ti.UI.createImageView({top:"2%",image:"/images/select_safira.png",width:"100%",id:"__alloyId1437"}),r.__views.__alloyId1435.add(r.__views.__alloyId1437),o?r.__views.__alloyId1437.addEventListener("click",o):s["$.__views.__alloyId1437!click!safira"]=!0,r.__views.__alloyId1438=Ti.UI.createButton({title:"Cristal",id:"__alloyId1438"}),r.__views.__alloyId1416.add(r.__views.__alloyId1438),e?r.__views.__alloyId1438.addEventListener("click",e):s["$.__views.__alloyId1438!click!cristal"]=!0,r.__views.__alloyId1439=Ti.UI.createButton({title:"Esmeralda",id:"__alloyId1439"}),r.__views.__alloyId1416.add(r.__views.__alloyId1439),i?r.__views.__alloyId1439.addEventListener("click",i):s["$.__views.__alloyId1439!click!esmeralda"]=!0,r.__views.__alloyId1440=Ti.UI.createButton({title:"Rubi",id:"__alloyId1440"}),r.__views.__alloyId1416.add(r.__views.__alloyId1440),t?r.__views.__alloyId1440.addEventListener("click",t):s["$.__views.__alloyId1440!click!rubi"]=!0,r.__views.__alloyId1441=Ti.UI.createButton({title:"Safira",id:"__alloyId1441"}),r.__views.__alloyId1416.add(r.__views.__alloyId1441),o?r.__views.__alloyId1441.addEventListener("click",o):s["$.__views.__alloyId1441!click!safira"]=!0,d.destroy=function(){},_.extend(r,r.__views),arguments[0]||{},s["$.__views.__alloyId1424!click!cristal"]&&r.__views.__alloyId1424.addEventListener("click",e),s["$.__views.__alloyId1428!click!esmeralda"]&&r.__views.__alloyId1428.addEventListener("click",i),s["$.__views.__alloyId1433!click!rubi"]&&r.__views.__alloyId1433.addEventListener("click",t),s["$.__views.__alloyId1437!click!safira"]&&r.__views.__alloyId1437.addEventListener("click",o),s["$.__views.__alloyId1438!click!cristal"]&&r.__views.__alloyId1438.addEventListener("click",e),s["$.__views.__alloyId1439!click!esmeralda"]&&r.__views.__alloyId1439.addEventListener("click",i),s["$.__views.__alloyId1440!click!rubi"]&&r.__views.__alloyId1440.addEventListener("click",t),s["$.__views.__alloyId1441!click!safira"]&&r.__views.__alloyId1441.addEventListener("click",o),_.extend(r,d)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;