function __processArg(e,i){var t=null;return e&&(t=e[i]||null,delete e[i]),t}function Controller(){function e(){s.paginacao.title=h+"/"+u;var e,i,t,_,a,o=0,l="null",d=(h-1)*f,r=selectProductsByPage(y,w,v,d,f);for(s.gradeA.hide(),s.gradeB.hide();r.isValidRow();){switch(o){case 0:s.gradeA.show(),e=s.precoA,a=s.tempoA,i=s.selecionaA,t=s.imagemA,_=s.imagesA;break;case 1:s.gradeB.show(),e=s.precoB,a=s.tempoB,i=s.selecionaB,t=s.imagemB,_=s.imagesB}loadItems(p,r,l,e,a,i,t,_,s.quantidade),o++,r.next()}r.close()}function i(){var e=Ti.UI.createAlertDialog({buttonNames:["Confirmar","Cancelar"],destructive:2,title:"Desmarcar itens"});e.show(),e.addEventListener("click",function(e){0==e.index?categoryClear(s.quantidade):alert("Continue comprando")})}function t(){categoryVoltar()}function a(){h--,0>=h&&(h=u),cleanImages(),e()}function o(){h++,h>u&&(h=1),cleanImages(),e()}function l(){h=1,cleanImages(),e()}function d(){h=u,cleanImages(),e()}function r(){categoryCesta()}require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="vitrine_dois_horizontais",this.args=arguments[0]||{},arguments[0]&&(__processArg(arguments[0],"__parentSymbol"),__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate"));var s=this,n={},c={};s.__views.vitrine_dois_horizontais=Ti.UI.createView({backgroundColor:"white",id:"vitrine_dois_horizontais"}),s.__views.vitrine_dois_horizontais&&s.addTopLevelView(s.__views.vitrine_dois_horizontais),s.__views.__alloyId1533=Ti.UI.createView({height:"90%",top:"0%",width:"100%",id:"__alloyId1533"}),s.__views.vitrine_dois_horizontais.add(s.__views.__alloyId1533),s.__views.vitrine=Ti.UI.createView({height:Ti.UI.SIZE,layout:"vertical",width:Ti.UI.SIZE,id:"vitrine"}),s.__views.__alloyId1533.add(s.__views.vitrine),s.__views.gradeA=Ti.UI.createView({backgroundColor:"#dddddd",height:"48.5%",layout:"vertical",top:"1.5%",width:"98%",id:"gradeA"}),s.__views.vitrine.add(s.__views.gradeA),s.__views.__alloyId1534=Ti.UI.createView({backgroundColor:"#ffffff",height:Ti.UI.SIZE,top:"3%",width:"98%",id:"__alloyId1534"}),s.__views.gradeA.add(s.__views.__alloyId1534),s.__views.imagemA=Ti.UI.createImageView({width:"100%",id:"imagemA"}),s.__views.__alloyId1534.add(s.__views.imagemA),s.__views.__alloyId1535=Ti.UI.createView({layout:"horizontal",width:"98%",id:"__alloyId1535"}),s.__views.gradeA.add(s.__views.__alloyId1535),s.__views.precoA=Ti.UI.createLabel({backgroundColor:"#ffffff",color:"#000000",font:{fontSize:15},height:"80%",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,top:"10%",width:"10%",id:"precoA"}),s.__views.__alloyId1535.add(s.__views.precoA),s.__views.tempoA=Ti.UI.createButton({backgroundColor:"#000000",color:"#ffffff",font:{fontSize:15},height:"80%",left:"1%",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,top:"10%",width:"7%",id:"tempoA"}),s.__views.__alloyId1535.add(s.__views.tempoA),s.__views.selecionaA=Ti.UI.createImageView({height:"80%",left:"1%",top:"10%",zIndex:10,id:"selecionaA"}),s.__views.__alloyId1535.add(s.__views.selecionaA),s.__views.imagesA=Ti.UI.createView({height:"80%",left:"1%",top:"10%",width:"60%",id:"imagesA"}),s.__views.__alloyId1535.add(s.__views.imagesA),s.__views.gradeB=Ti.UI.createView({backgroundColor:"#dddddd",height:"48.5%",layout:"vertical",top:"1%",width:"98%",id:"gradeB"}),s.__views.vitrine.add(s.__views.gradeB),s.__views.__alloyId1536=Ti.UI.createView({backgroundColor:"#ffffff",height:Ti.UI.SIZE,top:"3%",width:"98%",id:"__alloyId1536"}),s.__views.gradeB.add(s.__views.__alloyId1536),s.__views.imagemB=Ti.UI.createImageView({width:"100%",id:"imagemB"}),s.__views.__alloyId1536.add(s.__views.imagemB),s.__views.__alloyId1537=Ti.UI.createView({layout:"horizontal",width:"98%",id:"__alloyId1537"}),s.__views.gradeB.add(s.__views.__alloyId1537),s.__views.precoB=Ti.UI.createLabel({backgroundColor:"#ffffff",color:"#000000",font:{fontSize:15},height:"80%",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,top:"10%",width:"10%",id:"precoB"}),s.__views.__alloyId1537.add(s.__views.precoB),s.__views.tempoB=Ti.UI.createButton({backgroundColor:"#000000",color:"#ffffff",font:{fontSize:15},height:"80%",left:"1%",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,top:"10%",width:"7%",id:"tempoB"}),s.__views.__alloyId1537.add(s.__views.tempoB),s.__views.selecionaB=Ti.UI.createImageView({height:"80%",left:"1%",top:"10%",zIndex:10,id:"selecionaB"}),s.__views.__alloyId1537.add(s.__views.selecionaB),s.__views.imagesB=Ti.UI.createView({height:"80%",left:"1%",top:"10%",width:"60%",id:"imagesB"}),s.__views.__alloyId1537.add(s.__views.imagesB),s.__views.__alloyId1538=Ti.UI.createView({height:"10%",left:"0%",top:"90%",width:"100%",id:"__alloyId1538"}),s.__views.vitrine_dois_horizontais.add(s.__views.__alloyId1538),s.__views.__alloyId1539=Ti.UI.createView({height:"100%",left:"0",width:"25%",id:"__alloyId1539"}),s.__views.__alloyId1538.add(s.__views.__alloyId1539),s.__views.botaoQuatroVerticais=Ti.UI.createButton({backgroundColor:"#008382",borderRadius:"5",color:"#ffffff",height:"60%",left:"5%",width:"45%",title:"Limpar todas marcações",id:"botaoQuatroVerticais"}),s.__views.__alloyId1539.add(s.__views.botaoQuatroVerticais),i?s.__views.botaoQuatroVerticais.addEventListener("click",i):c["$.__views.botaoQuatroVerticais!click!limpar"]=!0,s.__views.__alloyId1540=Ti.UI.createButton({backgroundColor:"#008382",borderRadius:"5",color:"#ffffff",height:"60%",left:"55%",width:"45%",title:"Voltar",id:"__alloyId1540"}),s.__views.__alloyId1539.add(s.__views.__alloyId1540),t?s.__views.__alloyId1540.addEventListener("click",t):c["$.__views.__alloyId1540!click!voltar"]=!0,s.__views.__alloyId1541=Ti.UI.createView({height:"100%",left:"25%",width:"50%",id:"__alloyId1541"}),s.__views.__alloyId1538.add(s.__views.__alloyId1541),s.__views.__alloyId1542=Ti.UI.createImageView({image:"/images/primeiro.png",height:"60%",left:"2%",width:"12%",id:"__alloyId1542"}),s.__views.__alloyId1541.add(s.__views.__alloyId1542),l?s.__views.__alloyId1542.addEventListener("click",l):c["$.__views.__alloyId1542!click!primeiro"]=!0,s.__views.__alloyId1543=Ti.UI.createImageView({image:"/images/anterior.png",height:"60%",left:"16%",width:"12%",id:"__alloyId1543"}),s.__views.__alloyId1541.add(s.__views.__alloyId1543),a?s.__views.__alloyId1543.addEventListener("click",a):c["$.__views.__alloyId1543!click!anterior"]=!0,s.__views.paginacao=Ti.UI.createButton({backgroundColor:"#ffffff",borderColor:"#cdcdcd",borderWidth:"1",color:"#008382",height:"60%",left:"30%",width:"20%",title:"1/1",id:"paginacao"}),s.__views.__alloyId1541.add(s.__views.paginacao),s.__views.__alloyId1544=Ti.UI.createImageView({image:"/images/proximo.png",height:"60%",left:"52%",width:"12%",id:"__alloyId1544"}),s.__views.__alloyId1541.add(s.__views.__alloyId1544),o?s.__views.__alloyId1544.addEventListener("click",o):c["$.__views.__alloyId1544!click!proximo"]=!0,s.__views.__alloyId1545=Ti.UI.createImageView({image:"/images/ultimo.png",height:"60%",left:"66%",width:"12%",id:"__alloyId1545"}),s.__views.__alloyId1541.add(s.__views.__alloyId1545),d?s.__views.__alloyId1545.addEventListener("click",d):c["$.__views.__alloyId1545!click!ultimo"]=!0,s.__views.__alloyId1546=Ti.UI.createView({height:"100%",right:"0%",width:"25%",id:"__alloyId1546"}),s.__views.__alloyId1538.add(s.__views.__alloyId1546),s.__views.__alloyId1547=Ti.UI.createImageView({image:"/images/cesta.png",height:"60%",right:"0%",width:"75%",id:"__alloyId1547"}),s.__views.__alloyId1546.add(s.__views.__alloyId1547),r?s.__views.__alloyId1547.addEventListener("click",r):c["$.__views.__alloyId1547!click!cesta"]=!0,s.__views.quantidade=Ti.UI.createButton({backgroundColor:"#ffffff",borderColor:"#cdcdcd",borderWidth:"1",color:"#ff0000",height:"60%",left:"0%",width:"20%",title:"0",id:"quantidade"}),s.__views.__alloyId1546.add(s.__views.quantidade),n.destroy=function(){},_.extend(s,s.__views),Ti.include("/api/config.js"),Ti.include("/api/category_render.js"),Ti.include("/database/produtos.js"),Ti.include("/database/imagens_produtos.js");var I=arguments[0]||{},w=I.marca||0,v=I.cat_id||0,p=I.template||0,h=1,f=2,y=Ti.App.Properties.getString(CURRENT_EMPRESA),g=selectProductsCount(v,w,y),u=Math.ceil(g/f);redimencionaVitrine(s.vitrine),e();var T=function(){Ti.App.removeEventListener("removeBitmap",T),Ti.API.info("Dois Horizontais"),cleanImages()};Ti.App.addEventListener("removeBitmap",T),"ipad"==Ti.Platform.osname&&(s.botaoQuatroVerticais.font={fontSize:13},s.botaoQuatroVerticais.height="63%",s.botaoQuatroVerticais.title="Limpar marcações",s.botaoQuatroVerticais.textAlign="center"),c["$.__views.botaoQuatroVerticais!click!limpar"]&&s.__views.botaoQuatroVerticais.addEventListener("click",i),c["$.__views.__alloyId1540!click!voltar"]&&s.__views.__alloyId1540.addEventListener("click",t),c["$.__views.__alloyId1542!click!primeiro"]&&s.__views.__alloyId1542.addEventListener("click",l),c["$.__views.__alloyId1543!click!anterior"]&&s.__views.__alloyId1543.addEventListener("click",a),c["$.__views.__alloyId1544!click!proximo"]&&s.__views.__alloyId1544.addEventListener("click",o),c["$.__views.__alloyId1545!click!ultimo"]&&s.__views.__alloyId1545.addEventListener("click",d),c["$.__views.__alloyId1547!click!cesta"]&&s.__views.__alloyId1547.addEventListener("click",r),_.extend(s,n)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;