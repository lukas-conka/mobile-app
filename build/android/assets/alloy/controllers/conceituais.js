function __processArg(e,i){var t=null;return e&&(t=e[i]||null,delete e[i]),t}function Controller(){require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="conceituais",this.args=arguments[0]||{},arguments[0]&&(__processArg(arguments[0],"__parentSymbol"),__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate"));var e=this,i={};e.__views.conceituais=Ti.UI.createWindow({backgroundColor:"white",id:"conceituais"}),e.__views.conceituais&&e.addTopLevelView(e.__views.conceituais),e.__views.__alloyId266=Ti.UI.createView({height:"100%",left:"0",width:"15%",id:"__alloyId266"}),e.__views.conceituais.add(e.__views.__alloyId266),e.__views.__alloyId267=Ti.UI.createImageView({height:"15%",top:"0",width:"100%",id:"__alloyId267"}),e.__views.__alloyId266.add(e.__views.__alloyId267),e.__views.__alloyId268=Ti.UI.createButton({backgroundColor:"#ffffff",color:"#000000",height:"5%",top:"15%",width:"100%",title:"Categorias",id:"__alloyId268"}),e.__views.__alloyId266.add(e.__views.__alloyId268);var t=[];e.__views.__alloyId273={properties:{backgroundColor:"#3e3935",borderColor:"#008382",borderWidth:"4",color:"#ffffff",height:"60",top:"10",width:"90%",title:"Exemplo",id:"__alloyId273"}},t.push(e.__views.__alloyId273),e.__views.__alloyId270=Ti.UI.createListSection({id:"__alloyId270"}),e.__views.__alloyId270.items=t;var o=[];o.push(e.__views.__alloyId270),e.__views.__alloyId269=Ti.UI.createListView({backgroundColor:"#d0e2e6",borderColor:"#008382",borderWidth:"4",height:"80%",top:"20%",width:"100%",sections:o,id:"__alloyId269"}),e.__views.__alloyId266.add(e.__views.__alloyId269),e.__views.__alloyId275=Ti.UI.createView({height:"10%",left:"15%",top:"0",width:"85%",id:"__alloyId275"}),e.__views.conceituais.add(e.__views.__alloyId275),e.__views.__alloyId276=Ti.UI.createView({height:"100%",left:"0",width:"25%",id:"__alloyId276"}),e.__views.__alloyId275.add(e.__views.__alloyId276),e.__views.__alloyId277=Ti.UI.createImageView({image:"/images/logo_rodape.jpg",left:"5%",id:"__alloyId277"}),e.__views.__alloyId276.add(e.__views.__alloyId277),e.__views.__alloyId278=Ti.UI.createButton({backgroundColor:"#ffffff",color:"#008382",height:"100%",left:"25%",width:"50%",title:"Fotos conceituais de nosso Catálogo:",id:"__alloyId278"}),e.__views.__alloyId275.add(e.__views.__alloyId278),e.__views.__alloyId279=Ti.UI.createView({height:"100%",left:"75%",width:"25%",id:"__alloyId279"}),e.__views.__alloyId275.add(e.__views.__alloyId279),e.__views.__alloyId280=Ti.UI.createButton({backgroundColor:"#008382",borderRadius:"5",color:"#ffffff",height:"60%",right:"55%",width:"45%",title:"ALTERAR MARCA",id:"__alloyId280"}),e.__views.__alloyId279.add(e.__views.__alloyId280),e.__views.__alloyId281=Ti.UI.createButton({backgroundColor:"#008382",borderRadius:"5",color:"#ffffff",height:"60%",right:"5%",width:"45%",title:"MENU",id:"__alloyId281"}),e.__views.__alloyId279.add(e.__views.__alloyId281),e.__views.__alloyId282=Ti.UI.createView({height:"90%",left:"15%",top:"10%",width:"85%",id:"__alloyId282"}),e.__views.conceituais.add(e.__views.__alloyId282),i.destroy=function(){},_.extend(e,e.__views),_.extend(e,i)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;