function __processArg(e,i){var t=null;return e&&(t=e[i]||null,delete e[i]),t}function Controller(){function e(){for(var e=listaProdutosQuatro(p),i=[];e.isValidRow();){var t=e.fieldByName("prd_id"),o=e.fieldByName("img_caminho"),a=e.fieldByName("prd_referencia"),_=e.fieldByName("prd_codigo_barra"),d=e.fieldByName("prd_nome"),r=e.fieldByName("apr_arquivo"),s=e.fieldByName("ifp_valor_1"),n=e.fieldByName("ifp_valor_2"),c=e.fieldByName("ifp_valor_3"),I=formatCurrency(s)+"\n"+formatCurrency(n)+"\n"+formatCurrency(c),h=e.fieldByName("ifp_qtde_minima"),w="/images/seleciona.png";"true"==checkSelectedProduct(t)&&(w="/images/selecionar_vermelho.png"),i.push({prd_id:t,imagem_produto:{image:getImagesFolder()+o},label_referencia:{text:a},label_barras:{text:_},label_nome:{text:d},imagem_marca:{image:getImagesFolder()+r},label_preco:{text:I},label_quantidade_min:{text:h},image_selecionar:{image:w}}),e.next()}l.listaprodutos.sections[0].setItems(i)}function i(){p=l.buscar.value,e(),l.buscar.value=""}function t(e){var i=l.listaprodutos.sections[e.sectionIndex],t=i.getItemAt(e.itemIndex),o=t.prd_id,a=t.image_selecionar;a.image="true"==AddSelectedProduct(o)?"/images/selecionar_vermelho.png":"/images/seleciona.png",i.updateItemAt(e.itemIndex,t)}function o(){goTo("funcao")}function a(){if(0!=f.length)goTo("calculadora");else{var e=Ti.UI.createAlertDialog({message:"É necessário a seleção de um cliente ou mais para seguir em diante!",title:"Selecionar cliente:"});e.show()}}require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="lista_produtos",this.args=arguments[0]||{},arguments[0]&&(__processArg(arguments[0],"__parentSymbol"),__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate"));var l=this,d={},r={};l.__views.lista_produtos=Ti.UI.createWindow({backgroundColor:"#ffffff",id:"lista_produtos"}),l.__views.lista_produtos&&l.addTopLevelView(l.__views.lista_produtos),l.__views.__alloyId886=Ti.UI.createView({height:"10%",top:"0",width:"100%",id:"__alloyId886"}),l.__views.lista_produtos.add(l.__views.__alloyId886),l.__views.__alloyId887=Ti.UI.createButton({backgroundColor:"#ffffff",color:"#000000",right:"10",title:"LISTA DE PRODUTOS",id:"__alloyId887"}),l.__views.__alloyId886.add(l.__views.__alloyId887),l.__views.logoEmpresa=Ti.UI.createImageView({left:"10",id:"logoEmpresa"}),l.__views.__alloyId886.add(l.__views.logoEmpresa),l.__views.__alloyId888=Ti.UI.createView({height:"80%",top:"10%",width:"100%",id:"__alloyId888"}),l.__views.lista_produtos.add(l.__views.__alloyId888),l.__views.__alloyId889=Ti.UI.createLabel({color:"black",right:"48%",top:0,text:"Referência, nome ou código de barras",id:"__alloyId889"}),l.__views.__alloyId888.add(l.__views.__alloyId889),l.__views.__alloyId890=Ti.UI.createImageView({right:"45%",image:"/images/codigo_barra.png",width:"2%",top:5,id:"__alloyId890"}),l.__views.__alloyId888.add(l.__views.__alloyId890),l.__views.buscar=Ti.UI.createTextField({color:"black",right:"34%",width:"10%",top:2,id:"buscar",hintText:"Buscar"}),l.__views.__alloyId888.add(l.__views.buscar),l.__views.__alloyId891=Ti.UI.createButton({right:"32%",top:0,backgroundColor:"#c0c0c0",color:"#336633",borderRadius:9,title:"Ir",id:"__alloyId891"}),l.__views.__alloyId888.add(l.__views.__alloyId891),i?l.__views.__alloyId891.addEventListener("click",i):r["$.__views.__alloyId891!click!buscarProdutos"]=!0,l.__views.__alloyId892=Ti.UI.createView({backgroundGradient:{type:"linear",colors:["#449e46","#aed252"]},height:"7%",top:"10%",width:"100%",layout:"horizontal",id:"__alloyId892"}),l.__views.__alloyId888.add(l.__views.__alloyId892),l.__views.__alloyId893=Ti.UI.createLabel({backgroundColor:"transparent",color:"#ffffff",height:"100%",width:"10%",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,font:{fontSize:13},text:"PRODUTO",id:"__alloyId893"}),l.__views.__alloyId892.add(l.__views.__alloyId893),l.__views.__alloyId894=Ti.UI.createLabel({backgroundColor:"transparent",color:"#ffffff",height:"100%",width:"10%",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,font:{fontSize:13},text:"REFERÊNCIA",id:"__alloyId894"}),l.__views.__alloyId892.add(l.__views.__alloyId894),l.__views.__alloyId895=Ti.UI.createLabel({backgroundColor:"transparent",color:"#ffffff",height:"100%",width:"20%",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,font:{fontSize:13},text:"CÓDIGO DE BARRAS",id:"__alloyId895"}),l.__views.__alloyId892.add(l.__views.__alloyId895),l.__views.__alloyId896=Ti.UI.createLabel({backgroundColor:"transparent",color:"#ffffff",height:"100%",width:"20%",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,font:{fontSize:13},text:"NOME",id:"__alloyId896"}),l.__views.__alloyId892.add(l.__views.__alloyId896),l.__views.__alloyId897=Ti.UI.createLabel({backgroundColor:"transparent",color:"#ffffff",height:"100%",width:"10%",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,font:{fontSize:13},text:"MARCA",id:"__alloyId897"}),l.__views.__alloyId892.add(l.__views.__alloyId897),l.__views.__alloyId898=Ti.UI.createLabel({backgroundColor:"transparent",color:"#ffffff",height:"100%",width:"10%",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,font:{fontSize:13},text:"PREÇO",id:"__alloyId898"}),l.__views.__alloyId892.add(l.__views.__alloyId898),l.__views.__alloyId899=Ti.UI.createLabel({backgroundColor:"transparent",color:"#ffffff",height:"100%",width:"10%",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,font:{fontSize:13},text:"QTDE. MÍNIMA",id:"__alloyId899"}),l.__views.__alloyId892.add(l.__views.__alloyId899),l.__views.__alloyId900=Ti.UI.createLabel({backgroundColor:"transparent",color:"#ffffff",height:"100%",width:"10%",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,font:{fontSize:13},text:"SELECIONAR",id:"__alloyId900"}),l.__views.__alloyId892.add(l.__views.__alloyId900),l.__views.__alloyId901=Ti.UI.createView({height:"90%",top:"10%",width:"100%",id:"__alloyId901"}),l.__views.__alloyId888.add(l.__views.__alloyId901);var s={},n=[],c={type:"Ti.UI.View",properties:{backgroundColor:"#DDDDDD",width:"100%",heigth:1,top:0,left:0}};n.push(c);var I={type:"Ti.UI.View",childTemplates:function(){var e=[],i={type:"Ti.UI.View",properties:{backgroundColor:"#DDDDDD",width:1,heigth:"100%"}};e.push(i);var o={type:"Ti.UI.View",childTemplates:function(){var e=[],i={type:"Ti.UI.ImageView",bindId:"imagem_produto",properties:{width:"100%",bindId:"imagem_produto"}};return e.push(i),e}(),properties:{width:"10%",height:"90%"}};e.push(o);var a={type:"Ti.UI.View",properties:{backgroundColor:"#DDDDDD",width:1,heigth:"100%"}};e.push(a);var l={type:"Ti.UI.Label",bindId:"label_referencia",properties:{color:"black",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"10%",bindId:"label_referencia"}};e.push(l);var _={type:"Ti.UI.View",properties:{backgroundColor:"#DDDDDD",width:1,heigth:"100%"}};e.push(_);var d={type:"Ti.UI.Label",bindId:"label_barras",properties:{color:"black",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"20%",bindId:"label_barras"}};e.push(d);var r={type:"Ti.UI.View",properties:{backgroundColor:"#DDDDDD",width:1,heigth:"100%"}};e.push(r);var s={type:"Ti.UI.Label",bindId:"label_nome",properties:{color:"black",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"20%",bindId:"label_nome"}};e.push(s);var n={type:"Ti.UI.View",properties:{backgroundColor:"#DDDDDD",width:1,heigth:"100%"}};e.push(n);var c={type:"Ti.UI.View",childTemplates:function(){var e=[],i={type:"Ti.UI.ImageView",bindId:"imagem_marca",properties:{width:"80%",bindId:"imagem_marca"}};return e.push(i),e}(),properties:{width:"10%"}};e.push(c);var I={type:"Ti.UI.View",properties:{backgroundColor:"#DDDDDD",width:1,heigth:"100%"}};e.push(I);var h={type:"Ti.UI.Label",bindId:"label_preco",properties:{color:"black",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"10%",bindId:"label_preco"}};e.push(h);var w={type:"Ti.UI.View",properties:{backgroundColor:"#DDDDDD",width:1,heigth:"100%"}};e.push(w);var f={type:"Ti.UI.Label",bindId:"label_quantidade_min",properties:{color:"black",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"10%",bindId:"label_quantidade_min"}};e.push(f);var p={type:"Ti.UI.View",properties:{backgroundColor:"#DDDDDD",width:1,heigth:"100%"}};e.push(p);var v={type:"Ti.UI.View",childTemplates:function(){var e=[],i={type:"Ti.UI.ImageView",bindId:"image_selecionar",properties:{width:"70%",bindId:"image_selecionar"},events:{click:t}};return e.push(i),e}(),properties:{width:"9%"}};e.push(v);var T={type:"Ti.UI.View",properties:{backgroundColor:"#DDDDDD",width:1,heigth:"100%"}};return e.push(T),e}(),properties:{backgroundColor:"white",top:2,left:0,width:"100%",height:"100%",layout:"horizontal"}};n.push(I);var h={properties:{backgroundColor:"white",height:"100dp",name:"produto_lista"},childTemplates:n};s.produto_lista=h,l.__views.__alloyId954=Ti.UI.createListSection({id:"__alloyId954"});var w=[];w.push(l.__views.__alloyId954),l.__views.listaprodutos=Ti.UI.createListView({height:"90%",top:"10%",width:"100%",sections:w,templates:s,id:"listaprodutos",defaultItemTemplate:"produto_lista"}),l.__views.__alloyId901.add(l.__views.listaprodutos),l.__views.__alloyId957=Ti.UI.createView({height:"7%",bottom:"1%",width:"100%",id:"__alloyId957"}),l.__views.lista_produtos.add(l.__views.__alloyId957),l.__views.__alloyId958=Ti.UI.createButton({backgroundGradient:{type:"linear",colors:["#2c8f8e","#206764"]},borderRadius:"5",color:"#ffffff",left:"1%",width:"10%",bottom:"1%",title:"Voltar",id:"__alloyId958"}),l.__views.__alloyId957.add(l.__views.__alloyId958),o?l.__views.__alloyId958.addEventListener("click",o):r["$.__views.__alloyId958!click!voltar"]=!0,l.__views.__alloyId959=Ti.UI.createLabel({backgroundGradient:{type:"linear",colors:["#2c8f8e","#206764"]},borderRadius:"5",color:"#ffffff",right:"1%",width:"12%",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,bottom:"1%",text:"Ir para selecionados",id:"__alloyId959"}),l.__views.__alloyId957.add(l.__views.__alloyId959),a?l.__views.__alloyId959.addEventListener("click",a):r["$.__views.__alloyId959!click!irSelecionados"]=!0,d.destroy=function(){},_.extend(l,l.__views),Ti.include("/api/config.js"),Ti.include("/database/produtos.js"),Ti.include("/database/aparencia.js");var f=Ti.App.Properties.getList(SELECTED_CLIENTS);l.logoEmpresa.image=getImagesFolder()+selectLogoFile();var f=Ti.App.Properties.getList(SELECTED_CLIENTS),p="";e(),r["$.__views.__alloyId891!click!buscarProdutos"]&&l.__views.__alloyId891.addEventListener("click",i),r["$.__views.__alloyId958!click!voltar"]&&l.__views.__alloyId958.addEventListener("click",o),r["$.__views.__alloyId959!click!irSelecionados"]&&l.__views.__alloyId959.addEventListener("click",a),_.extend(l,d)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;