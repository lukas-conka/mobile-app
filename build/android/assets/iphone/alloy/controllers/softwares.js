function __processArg(e,i){var t=null;return e&&(t=e[i]||null,delete e[i]),t}function Controller(){function e(){Ti.App.Properties.setString(CURRENT_SOFTWARE,1),a()}function i(){Ti.App.Properties.setString(CURRENT_SOFTWARE,2),o()}function t(){Ti.App.Properties.setString(CURRENT_SOFTWARE,3),o()}function l(){Ti.App.Properties.setString(CURRENT_SOFTWARE,4),o()}function o(){goTo("seleciona_cliente")}function a(){goTo("marca")}require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="softwares",this.args=arguments[0]||{},arguments[0]&&(__processArg(arguments[0],"__parentSymbol"),__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate"));var d=this,r={},s={};d.__views.softwares=Ti.UI.createWindow({backgroundColor:"white",id:"softwares"}),d.__views.softwares&&d.addTopLevelView(d.__views.softwares),d.__views.__alloyId1416=Ti.UI.createView({layout:"vertical",id:"__alloyId1416"}),d.__views.softwares.add(d.__views.__alloyId1416),d.__views.__alloyId1417=Ti.UI.createView({height:"10%",top:"0",width:"100%",id:"__alloyId1417"}),d.__views.__alloyId1416.add(d.__views.__alloyId1417),d.__views.__alloyId1418=Ti.UI.createButton({backgroundColor:"#ffffff",color:"#000000",left:"10",title:"SELECIONE O TIPO DE SOFTWARE",id:"__alloyId1418"}),d.__views.__alloyId1417.add(d.__views.__alloyId1418),d.__views.__alloyId1419=Ti.UI.createImageView({id:"__alloyId1419"}),d.__views.__alloyId1417.add(d.__views.__alloyId1419),d.__views.__alloyId1420=Ti.UI.createView({top:"2%",height:"45%",width:"90%",layout:"horizontal",id:"__alloyId1420"}),d.__views.__alloyId1416.add(d.__views.__alloyId1420),d.__views.__alloyId1421=Ti.UI.createImageView({top:0,width:"37%",image:"/images/cristal.png",id:"__alloyId1421"}),d.__views.__alloyId1420.add(d.__views.__alloyId1421),d.__views.__alloyId1422=Ti.UI.createView({left:"2%",width:"10%",height:"100%",layout:"vertical",id:"__alloyId1422"}),d.__views.__alloyId1420.add(d.__views.__alloyId1422),d.__views.__alloyId1423=Ti.UI.createImageView({top:"10%",image:"/images/tutorial.png",width:"100%",id:"__alloyId1423"}),d.__views.__alloyId1422.add(d.__views.__alloyId1423),d.__views.__alloyId1424=Ti.UI.createImageView({top:"2%",image:"/images/select_cristal.png",width:"100%",id:"__alloyId1424"}),d.__views.__alloyId1422.add(d.__views.__alloyId1424),e?d.__views.__alloyId1424.addEventListener("click",e):s["$.__views.__alloyId1424!click!cristal"]=!0,d.__views.__alloyId1425=Ti.UI.createImageView({top:0,left:"2%",width:"37%",image:"/images/esmeralda.png",id:"__alloyId1425"}),d.__views.__alloyId1420.add(d.__views.__alloyId1425),d.__views.__alloyId1426=Ti.UI.createView({left:"2%",width:"10%",height:"100%",layout:"vertical",id:"__alloyId1426"}),d.__views.__alloyId1420.add(d.__views.__alloyId1426),d.__views.__alloyId1427=Ti.UI.createImageView({top:"10%",image:"/images/tutorial.png",width:"100%",id:"__alloyId1427"}),d.__views.__alloyId1426.add(d.__views.__alloyId1427),d.__views.__alloyId1428=Ti.UI.createImageView({top:"2%",image:"/images/select_esmeralda.png",width:"100%",id:"__alloyId1428"}),d.__views.__alloyId1426.add(d.__views.__alloyId1428),i?d.__views.__alloyId1428.addEventListener("click",i):s["$.__views.__alloyId1428!click!esmeralda"]=!0,d.__views.__alloyId1429=Ti.UI.createView({top:"2%",height:"45%",width:"90%",layout:"horizontal",id:"__alloyId1429"}),d.__views.__alloyId1416.add(d.__views.__alloyId1429),d.__views.__alloyId1430=Ti.UI.createImageView({top:0,width:"37%",image:"/images/rubi.png",id:"__alloyId1430"}),d.__views.__alloyId1429.add(d.__views.__alloyId1430),d.__views.__alloyId1431=Ti.UI.createView({left:"2%",width:"10%",height:"100%",layout:"vertical",id:"__alloyId1431"}),d.__views.__alloyId1429.add(d.__views.__alloyId1431),d.__views.__alloyId1432=Ti.UI.createImageView({top:"10%",image:"/images/tutorial.png",width:"100%",id:"__alloyId1432"}),d.__views.__alloyId1431.add(d.__views.__alloyId1432),d.__views.__alloyId1433=Ti.UI.createImageView({top:"2%",image:"/images/select_rubi.png",width:"100%",id:"__alloyId1433"}),d.__views.__alloyId1431.add(d.__views.__alloyId1433),t?d.__views.__alloyId1433.addEventListener("click",t):s["$.__views.__alloyId1433!click!rubi"]=!0,d.__views.__alloyId1434=Ti.UI.createImageView({top:0,left:"2%",width:"37%",image:"/images/safira.png",id:"__alloyId1434"}),d.__views.__alloyId1429.add(d.__views.__alloyId1434),d.__views.__alloyId1435=Ti.UI.createView({left:"2%",width:"10%",height:"100%",layout:"vertical",id:"__alloyId1435"}),d.__views.__alloyId1429.add(d.__views.__alloyId1435),d.__views.__alloyId1436=Ti.UI.createImageView({top:"10%",image:"/images/tutorial.png",width:"100%",id:"__alloyId1436"}),d.__views.__alloyId1435.add(d.__views.__alloyId1436),d.__views.__alloyId1437=Ti.UI.createImageView({top:"2%",image:"/images/select_safira.png",width:"100%",id:"__alloyId1437"}),d.__views.__alloyId1435.add(d.__views.__alloyId1437),l?d.__views.__alloyId1437.addEventListener("click",l):s["$.__views.__alloyId1437!click!safira"]=!0,d.__views.__alloyId1438=Ti.UI.createButton({title:"Cristal",id:"__alloyId1438"}),d.__views.__alloyId1416.add(d.__views.__alloyId1438),e?d.__views.__alloyId1438.addEventListener("click",e):s["$.__views.__alloyId1438!click!cristal"]=!0,d.__views.__alloyId1439=Ti.UI.createButton({title:"Esmeralda",id:"__alloyId1439"}),d.__views.__alloyId1416.add(d.__views.__alloyId1439),i?d.__views.__alloyId1439.addEventListener("click",i):s["$.__views.__alloyId1439!click!esmeralda"]=!0,d.__views.__alloyId1440=Ti.UI.createButton({title:"Rubi",id:"__alloyId1440"}),d.__views.__alloyId1416.add(d.__views.__alloyId1440),t?d.__views.__alloyId1440.addEventListener("click",t):s["$.__views.__alloyId1440!click!rubi"]=!0,d.__views.__alloyId1441=Ti.UI.createButton({title:"Safira",id:"__alloyId1441"}),d.__views.__alloyId1416.add(d.__views.__alloyId1441),l?d.__views.__alloyId1441.addEventListener("click",l):s["$.__views.__alloyId1441!click!safira"]=!0,r.destroy=function(){},_.extend(d,d.__views),arguments[0]||{},s["$.__views.__alloyId1424!click!cristal"]&&d.__views.__alloyId1424.addEventListener("click",e),s["$.__views.__alloyId1428!click!esmeralda"]&&d.__views.__alloyId1428.addEventListener("click",i),s["$.__views.__alloyId1433!click!rubi"]&&d.__views.__alloyId1433.addEventListener("click",t),s["$.__views.__alloyId1437!click!safira"]&&d.__views.__alloyId1437.addEventListener("click",l),s["$.__views.__alloyId1438!click!cristal"]&&d.__views.__alloyId1438.addEventListener("click",e),s["$.__views.__alloyId1439!click!esmeralda"]&&d.__views.__alloyId1439.addEventListener("click",i),s["$.__views.__alloyId1440!click!rubi"]&&d.__views.__alloyId1440.addEventListener("click",t),s["$.__views.__alloyId1441!click!safira"]&&d.__views.__alloyId1441.addEventListener("click",l),_.extend(d,r)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;