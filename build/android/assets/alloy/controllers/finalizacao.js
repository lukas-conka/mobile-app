function __processArg(e,i){var t=null;return e&&(t=e[i]||null,delete e[i]),t}function Controller(){function e(){s.paginacao.title=b+" / "+v;var e=[],i=0,t=consultaCarrinhoPedidoByPedido(T[b-1]);if(t.isValidRow()){var o=t.fieldByName("cl_razao"),a=t.fieldByName("cl_cnpj"),l=t.fieldByName("crp_forma_pagamento"),_=t.fieldByName("ped_data_pag"),d=t.fieldByName("ped_entrega_prazo"),n=t.fieldByName("ped_entrega"),c=t.fieldByName("cl_end_unid"),f=t.fieldByName("cl_n_unid"),p=t.fieldByName("cl_bairro_unid"),h=t.fieldByName("cl_cidade_unid"),I=t.fieldByName("cl_uf_unid"),g=t.fieldByName("cl_comp_unid"),y=t.fieldByName("cl_cep_unid"),u=t.fieldByName("crp_data"),w=t.fieldByName("desconto"),E=t.fieldByName("desconto_parcela"),m=t.fieldByName("desconto_especial"),C=r(d,n),k=1;if(new RegExp("/").test(_)){var A=_.split("/");k=A.length}var N=c+","+f+"\n"+p+", "+h+" - "+I+"\nComp.:"+g+" CEP: "+y;s.label_razao.text=o,s.label_cnpj.text=a,s.label_forma_pgto.text=l,s.label_parcelas.text=k,s.label_prazo_medio.text="imediato",s.label_prazo_entrega.text=C,s.label_representante.text=Ti.App.Properties.getString(CURRENT_USER_NAME),s.label_endereco.text=N}for(var L=0,U=0,R=0,x=0,S=0,V=0,M=0,w=0,t=consultaCarrinhoPedidoByPedido(T[b-1]);t.isValidRow();){var D,B=t.fieldByName("prd_id"),z=t.fieldByName("prd_referencia"),P=t.fieldByName("prd_nome_colecao"),d=t.fieldByName("ped_entrega_prazo"),n=t.fieldByName("ped_entrega"),O=t.fieldByName("ped_entrega"),G=t.fieldByName("crp_preco_unitario"),F=t.fieldByName("ifp_peso"),X=t.fieldByName("ifp_cub_a"),j=t.fieldByName("ifp_cub_l"),q=t.fieldByName("ifp_cub_p"),$=t.fieldByName("crp_quantidade"),W=t.fieldByName("prd_ipi"),Y=t.fieldByName("desconto_unit"),C=r(d,n),H=G*$;H-=Y;var J=H*W/100,Q=H+J;R+=F,x+=X,S+=j,V+=q,L+=H,U+=J,0==i?(D="pedido_lista_escuro",i++):(i=0,D="pedido_lista_claro"),M+=Q,Ti.API.info("prd_id="+B),e.push({template:D,imagem_produto:{image:getImagesFolder()+selectImagemPrincipal(B)},label_ref:{text:z},label_colecao:{text:P},label_prazo:{text:C},label_tam:{text:O},label_preco:{text:formatCurrency(G)},label_peso:{text:F},label_cubagem:{text:X+" x "+j+" x "+q},label_quantidade:{text:$},label_precototal:{text:formatCurrency(H)},label_ipi:{text:W+"%\n"+formatCurrency(J)},label_sustrib:{text:"0,00%\n R$ 0,00"},label_valorfinal:{text:formatCurrency(H)}}),t.next()}var Z=0;L=L-U-Z;var K=L/k;Ti.API.info("valor_parcelas="+K),s.listapedidos.sections[0].setItems(e),s.label_ipi.text=formatCurrency(U);var ei=x*S*V;s.label_cubagem.text=ei.toFixed(2)+" m3",s.label_peso.text=R+" Kg",s.numeroPedido.text="NÚMERO DO PEDIDO: "+Ti.App.Properties.getString(CURRENT_USER_ID)+"1"+T[b-1],s.dataPedido.text="DATA: "+u,s.label_total.text="TOTAL: "+formatCurrency(M);var ii=M*w/100,ti=M-ii,oi=ti*E/100;ti-=oi;var ai=ti*m/100;w=ii+oi+ai,ti-=ai,s.label_desconto.text="DESCONTOS: "+formatCurrency(w),s.label_valor_parcelas.text=formatCurrency(ti/k),s.label_totalcomdesconto.text="TOTAL COM DESCONTOS: "+formatCurrency(ti)}function i(){b--,0>=b&&(b=v),e()}function t(){b++,b>v&&(b=1),e()}function o(){b=1,e()}function a(){b=v,e()}function l(){resetSession(),goTo("seleciona_cliente")}function r(e,i){var t="",o=i.substring(0,4)+"-"+i.substring(4,6)+"-"+i.substring(6,8),a=new Date(o),l=a.getMonth()+1,_=new Date,r=new Date;switch(i="quinzenal"){case"mensal":_=new Date(a.getFullYear(),l,1),r=new Date(a.getFullYear(),l,0),t=l+" mês\n"+_.getDate()+" de "+getMonth(l)+" a "+r.getDate()+" de "+getMonth(l);break;case"semanal":_=a.getDate()-a.getDay(),r=_+6,t=getWeekOfYear(a)+" semana\n"+_+" de "+getMonth(l)+" a "+r+" de "+getMonth(l);break;case"quinzenal":var d=0;if(a.getDate()<=15)d=2*(l+1),_=1,r=15;else{d=2*(l+1)+1,_=16;var s=new Date(a.getFullYear(),l,0);r=s.getDate()}t=getWeekOfYear(a)+" semana\n"+_+" de "+getMonth(l)+" a "+r+" de "+getMonth(l)}return t}function l(){goTo("seleciona_cliente")}function d(){goTo("totalizacoes")}require("alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="finalizacao",this.args=arguments[0]||{},arguments[0]&&(__processArg(arguments[0],"__parentSymbol"),__processArg(arguments[0],"$model"),__processArg(arguments[0],"__itemTemplate"));var s=this,n={},c={};s.__views.finalizacao=Ti.UI.createWindow({backgroundColor:"#ffffff",id:"finalizacao"}),s.__views.finalizacao&&s.addTopLevelView(s.__views.finalizacao),s.__views.__alloyId563=Ti.UI.createView({height:"10%",top:"0",width:"99%",id:"__alloyId563"}),s.__views.finalizacao.add(s.__views.__alloyId563),s.__views.__alloyId564=Ti.UI.createLabel({color:"#008382",font:{fontSize:22},height:"50%",textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,top:"0%",width:"98%",text:"Informações do pedido",id:"__alloyId564"}),s.__views.__alloyId563.add(s.__views.__alloyId564),s.__views.numeroPedido=Ti.UI.createLabel({color:"#333333",font:{fontSize:15},height:"50%",left:"1%",textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT,top:"50%",width:"48%",id:"numeroPedido"}),s.__views.__alloyId563.add(s.__views.numeroPedido),s.__views.dataPedido=Ti.UI.createLabel({color:"#333333",font:{fontSize:15},height:"50%",right:"1%",textAlign:Ti.UI.TEXT_ALIGNMENT_RIGHT,top:"50%",width:"48%",text:"00/00/0000 às 00:00",id:"dataPedido"}),s.__views.__alloyId563.add(s.__views.dataPedido),s.__views.__alloyId565=Ti.UI.createView({height:"39%",top:"10%",layout:"horizontal",width:"100%",id:"__alloyId565"}),s.__views.finalizacao.add(s.__views.__alloyId565),s.__views.__alloyId566=Ti.UI.createView({height:"100%",layout:"vertical",left:"1%",width:"32%",id:"__alloyId566"}),s.__views.__alloyId565.add(s.__views.__alloyId566),s.__views.__alloyId567=Ti.UI.createLabel({backgroundColor:"#ececec",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"8%",top:"2%",width:"100%",text:"CNPJ",id:"__alloyId567"}),s.__views.__alloyId566.add(s.__views.__alloyId567),s.__views.label_cnpj=Ti.UI.createLabel({backgroundColor:"#ffffff",borderColor:"#a6aaad",borderWidth:"1",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"10%",width:"100%",id:"label_cnpj"}),s.__views.__alloyId566.add(s.__views.label_cnpj),s.__views.__alloyId568=Ti.UI.createLabel({backgroundColor:"#ececec",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"8%",top:"2%",width:"100%",text:"RAZÃO SOCIAL",id:"__alloyId568"}),s.__views.__alloyId566.add(s.__views.__alloyId568),s.__views.label_razao=Ti.UI.createLabel({backgroundColor:"#ffffff",borderColor:"#a6aaad",borderWidth:"1",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"20%",width:"100%",id:"label_razao"}),s.__views.__alloyId566.add(s.__views.label_razao),s.__views.__alloyId569=Ti.UI.createLabel({backgroundColor:"#ececec",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"8%",top:"2%",width:"100%",text:"ICMS SOMENTE PARA CRÉDITO",id:"__alloyId569"}),s.__views.__alloyId566.add(s.__views.__alloyId569),s.__views.label_icms=Ti.UI.createLabel({backgroundColor:"#ffffff",borderColor:"#a6aaad",borderWidth:"1",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"10%",width:"100%",text:"R$ 0,00",id:"label_icms"}),s.__views.__alloyId566.add(s.__views.label_icms),s.__views.__alloyId570=Ti.UI.createLabel({backgroundColor:"#ececec",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"8%",top:"2%",width:"100%",text:"IPI DESTACADO",id:"__alloyId570"}),s.__views.__alloyId566.add(s.__views.__alloyId570),s.__views.label_ipi=Ti.UI.createLabel({backgroundColor:"#ffffff",borderColor:"#a6aaad",borderWidth:"1",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"10%",width:"100%",id:"label_ipi"}),s.__views.__alloyId566.add(s.__views.label_ipi),s.__views.__alloyId571=Ti.UI.createView({height:"100%",layout:"vertical",left:"1%",width:"32%",id:"__alloyId571"}),s.__views.__alloyId565.add(s.__views.__alloyId571),s.__views.__alloyId572=Ti.UI.createLabel({backgroundColor:"#ececec",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"8%",top:"2%",width:"100%",text:"FORMA DE PAGAMENTO",id:"__alloyId572"}),s.__views.__alloyId571.add(s.__views.__alloyId572),s.__views.label_forma_pgto=Ti.UI.createLabel({backgroundColor:"#ffffff",borderColor:"#a6aaad",borderWidth:"1",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"10%",width:"100%",id:"label_forma_pgto"}),s.__views.__alloyId571.add(s.__views.label_forma_pgto),s.__views.__alloyId573=Ti.UI.createLabel({backgroundColor:"#ececec",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"8%",top:"2%",width:"100%",text:"NÚMERO DE PARCELAS",id:"__alloyId573"}),s.__views.__alloyId571.add(s.__views.__alloyId573),s.__views.label_parcelas=Ti.UI.createLabel({backgroundColor:"#ffffff",borderColor:"#a6aaad",borderWidth:"1",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"10%",width:"100%",id:"label_parcelas"}),s.__views.__alloyId571.add(s.__views.label_parcelas),s.__views.__alloyId574=Ti.UI.createLabel({backgroundColor:"#ececec",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"8%",top:"2%",width:"100%",text:"VALOR DAS PARCELAS",id:"__alloyId574"}),s.__views.__alloyId571.add(s.__views.__alloyId574),s.__views.label_valor_parcelas=Ti.UI.createLabel({backgroundColor:"#ffffff",borderColor:"#a6aaad",borderWidth:"1",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"10%",width:"100%",id:"label_valor_parcelas"}),s.__views.__alloyId571.add(s.__views.label_valor_parcelas),s.__views.__alloyId575=Ti.UI.createLabel({backgroundColor:"#ececec",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"8%",top:"2%",width:"100%",text:"PRAZO MÉDIO",id:"__alloyId575"}),s.__views.__alloyId571.add(s.__views.__alloyId575),s.__views.label_prazo_medio=Ti.UI.createLabel({backgroundColor:"#ffffff",borderColor:"#a6aaad",borderWidth:"1",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"10%",width:"100%",id:"label_prazo_medio"}),s.__views.__alloyId571.add(s.__views.label_prazo_medio),s.__views.__alloyId576=Ti.UI.createLabel({backgroundColor:"#ececec",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"8%",top:"2%",width:"100%",text:"REPRESENTANTE",id:"__alloyId576"}),s.__views.__alloyId571.add(s.__views.__alloyId576),s.__views.label_representante=Ti.UI.createLabel({backgroundColor:"#ffffff",borderColor:"#a6aaad",borderWidth:"1",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"10%",width:"100%",id:"label_representante"}),s.__views.__alloyId571.add(s.__views.label_representante),s.__views.__alloyId577=Ti.UI.createView({height:"100%",layout:"vertical",left:"1%",width:"32%",id:"__alloyId577"}),s.__views.__alloyId565.add(s.__views.__alloyId577),s.__views.__alloyId578=Ti.UI.createLabel({backgroundColor:"#ececec",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"8%",top:"2%",width:"100%",text:"PRAZO DE ENTREGA",id:"__alloyId578"}),s.__views.__alloyId577.add(s.__views.__alloyId578),s.__views.label_prazo_entrega=Ti.UI.createLabel({backgroundColor:"#ffffff",borderColor:"#a6aaad",borderWidth:"1",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"20%",width:"100%",id:"label_prazo_entrega"}),s.__views.__alloyId577.add(s.__views.label_prazo_entrega),s.__views.__alloyId579=Ti.UI.createLabel({backgroundColor:"#ececec",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"8%",top:"2%",width:"100%",text:"CUBAGEM",id:"__alloyId579"}),s.__views.__alloyId577.add(s.__views.__alloyId579),s.__views.label_cubagem=Ti.UI.createLabel({backgroundColor:"#ffffff",borderColor:"#a6aaad",borderWidth:"1",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"10%",width:"100%",id:"label_cubagem"}),s.__views.__alloyId577.add(s.__views.label_cubagem),s.__views.__alloyId580=Ti.UI.createLabel({backgroundColor:"#ececec",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"8%",top:"2%",width:"100%",text:"PESO",id:"__alloyId580"}),s.__views.__alloyId577.add(s.__views.__alloyId580),s.__views.label_peso=Ti.UI.createLabel({backgroundColor:"#ffffff",borderColor:"#a6aaad",borderWidth:"1",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"10%",width:"100%",id:"label_peso"}),s.__views.__alloyId577.add(s.__views.label_peso),s.__views.__alloyId581=Ti.UI.createLabel({backgroundColor:"#ececec",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"8%",top:"2%",width:"100%",text:"ENDEREÇO DE ENTREGA",id:"__alloyId581"}),s.__views.__alloyId577.add(s.__views.__alloyId581),s.__views.label_endereco=Ti.UI.createLabel({backgroundColor:"#ffffff",borderColor:"#a6aaad",borderWidth:"1",color:"#000000",font:{fontSize:13},textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,height:"20%",width:"100%",id:"label_endereco"}),s.__views.__alloyId577.add(s.__views.label_endereco),s.__views.__alloyId582=Ti.UI.createView({height:"36%",top:"50%",width:"99%",id:"__alloyId582"}),s.__views.finalizacao.add(s.__views.__alloyId582),s.__views.__alloyId583=Ti.UI.createView({backgroundColor:"#008382",height:"12%",font:{fontSize:15},top:"0%",color:"#008382",width:"100%",layout:"horizontal",id:"__alloyId583"}),s.__views.__alloyId582.add(s.__views.__alloyId583),s.__views.__alloyId584=Ti.UI.createLabel({textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,backgroundColor:"#008382",color:"#ffffff",font:{fontSize:13},height:"100%",width:"7%",text:"Produto",id:"__alloyId584"}),s.__views.__alloyId583.add(s.__views.__alloyId584),s.__views.__alloyId585=Ti.UI.createView({width:1,height:"100%",backgroundColor:"black",id:"__alloyId585"}),s.__views.__alloyId583.add(s.__views.__alloyId585),s.__views.__alloyId586=Ti.UI.createLabel({textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,backgroundColor:"#008382",color:"#ffffff",font:{fontSize:13},height:"100%",width:"7%",text:"Marca / Ref.",id:"__alloyId586"}),s.__views.__alloyId583.add(s.__views.__alloyId586),s.__views.__alloyId587=Ti.UI.createView({width:1,height:"100%",backgroundColor:"black",id:"__alloyId587"}),s.__views.__alloyId583.add(s.__views.__alloyId587),s.__views.__alloyId588=Ti.UI.createLabel({textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,backgroundColor:"#008382",color:"#ffffff",font:{fontSize:13},height:"100%",width:"5%",text:"Coleção",id:"__alloyId588"}),s.__views.__alloyId583.add(s.__views.__alloyId588),s.__views.__alloyId589=Ti.UI.createView({width:1,height:"100%",backgroundColor:"black",id:"__alloyId589"}),s.__views.__alloyId583.add(s.__views.__alloyId589),s.__views.__alloyId590=Ti.UI.createLabel({textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,backgroundColor:"#008382",color:"#ffffff",font:{fontSize:13},height:"100%",width:"14%",text:"Prazo de entrega",id:"__alloyId590"}),s.__views.__alloyId583.add(s.__views.__alloyId590),s.__views.__alloyId591=Ti.UI.createView({width:1,height:"100%",backgroundColor:"black",id:"__alloyId591"}),s.__views.__alloyId583.add(s.__views.__alloyId591),s.__views.__alloyId592=Ti.UI.createLabel({textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,backgroundColor:"#008382",color:"#ffffff",font:{fontSize:13},height:"100%",width:"4%",text:"Tam.",id:"__alloyId592"}),s.__views.__alloyId583.add(s.__views.__alloyId592),s.__views.__alloyId593=Ti.UI.createView({width:1,height:"100%",backgroundColor:"black",id:"__alloyId593"}),s.__views.__alloyId583.add(s.__views.__alloyId593),s.__views.__alloyId594=Ti.UI.createLabel({textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,backgroundColor:"#008382",color:"#ffffff",font:{fontSize:13},height:"100%",width:"7%",text:"Preço Unitário",id:"__alloyId594"}),s.__views.__alloyId583.add(s.__views.__alloyId594),s.__views.__alloyId595=Ti.UI.createView({width:1,height:"100%",backgroundColor:"black",id:"__alloyId595"}),s.__views.__alloyId583.add(s.__views.__alloyId595),s.__views.__alloyId596=Ti.UI.createLabel({textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,backgroundColor:"#008382",color:"#ffffff",font:{fontSize:13},height:"100%",width:"4%",text:"Peso",id:"__alloyId596"}),s.__views.__alloyId583.add(s.__views.__alloyId596),s.__views.__alloyId597=Ti.UI.createView({width:1,height:"100%",backgroundColor:"black",id:"__alloyId597"}),s.__views.__alloyId583.add(s.__views.__alloyId597),s.__views.__alloyId598=Ti.UI.createLabel({textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,backgroundColor:"#008382",color:"#ffffff",font:{fontSize:13},height:"100%",width:"13%",text:"Cubagem (A x L x P)",id:"__alloyId598"}),s.__views.__alloyId583.add(s.__views.__alloyId598),s.__views.__alloyId599=Ti.UI.createView({width:1,height:"100%",backgroundColor:"black",id:"__alloyId599"}),s.__views.__alloyId583.add(s.__views.__alloyId599),s.__views.__alloyId600=Ti.UI.createLabel({textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,backgroundColor:"#008382",color:"#ffffff",font:{fontSize:13},height:"100%",width:"6%",text:"Quantidade",id:"__alloyId600"}),s.__views.__alloyId583.add(s.__views.__alloyId600),s.__views.__alloyId601=Ti.UI.createView({width:1,height:"100%",backgroundColor:"black",id:"__alloyId601"}),s.__views.__alloyId583.add(s.__views.__alloyId601),s.__views.__alloyId602=Ti.UI.createLabel({textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,backgroundColor:"#008382",color:"#ffffff",font:{fontSize:13},height:"100%",width:"7%",text:"Preço total",id:"__alloyId602"}),s.__views.__alloyId583.add(s.__views.__alloyId602),s.__views.__alloyId603=Ti.UI.createView({width:1,height:"100%",backgroundColor:"black",id:"__alloyId603"}),s.__views.__alloyId583.add(s.__views.__alloyId603),s.__views.__alloyId604=Ti.UI.createLabel({textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,backgroundColor:"#008382",color:"#ffffff",font:{fontSize:13},height:"100%",width:"7%",text:"IPI",id:"__alloyId604"}),s.__views.__alloyId583.add(s.__views.__alloyId604),s.__views.__alloyId605=Ti.UI.createView({width:1,height:"100%",backgroundColor:"black",id:"__alloyId605"}),s.__views.__alloyId583.add(s.__views.__alloyId605),s.__views.__alloyId606=Ti.UI.createLabel({textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,backgroundColor:"#008382",color:"#ffffff",font:{fontSize:13},height:"100%",width:"6%",text:"S.T",id:"__alloyId606"}),s.__views.__alloyId583.add(s.__views.__alloyId606),s.__views.__alloyId607=Ti.UI.createView({width:1,height:"100%",backgroundColor:"black",id:"__alloyId607"}),s.__views.__alloyId583.add(s.__views.__alloyId607),s.__views.__alloyId608=Ti.UI.createLabel({textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,backgroundColor:"#008382",color:"#ffffff",font:{fontSize:13},height:"100%",width:"8%",text:"Valor do Produto",id:"__alloyId608"}),s.__views.__alloyId583.add(s.__views.__alloyId608);var f={},p=[],h={type:"Ti.UI.View",childTemplates:function(){var e=[],i={type:"Ti.UI.View",childTemplates:function(){var e=[],i={type:"Ti.UI.ImageView",bindId:"imagem_produto",properties:{height:"95%",bindId:"imagem_produto"}};return e.push(i),e}(),properties:{width:"7%"}};e.push(i);var t={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(t);var o={type:"Ti.UI.Label",bindId:"label_ref",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"7%",font:{fontSize:13},color:"black",bindId:"label_ref"}};e.push(o);var a={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(a);var l={type:"Ti.UI.Label",bindId:"label_colecao",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"5%",font:{fontSize:13},color:"black",bindId:"label_colecao"}};e.push(l);var _={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(_);var r={type:"Ti.UI.Label",bindId:"label_prazo",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"14%",font:{fontSize:13},color:"black",bindId:"label_prazo"}};e.push(r);var d={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(d);var s={type:"Ti.UI.Label",bindId:"label_tam",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"4%",font:{fontSize:13},color:"black",bindId:"label_tam"}};e.push(s);var n={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(n);var c={type:"Ti.UI.Label",bindId:"label_preco",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"7%",font:{fontSize:13},color:"black",bindId:"label_preco"}};e.push(c);var f={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(f);var p={type:"Ti.UI.Label",bindId:"label_peso",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"4%",font:{fontSize:13},color:"black",bindId:"label_peso"}};e.push(p);var h={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(h);var I={type:"Ti.UI.Label",bindId:"label_cubagem",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"13%",font:{fontSize:13},color:"black",bindId:"label_cubagem"}};e.push(I);var g={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(g);var y={type:"Ti.UI.Label",bindId:"label_quantidade",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"6%",color:"black",font:{fontSize:13},bindId:"label_quantidade"}};e.push(y);var u={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(u);var w={type:"Ti.UI.Label",bindId:"label_precototal",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"7%",color:"black",font:{fontSize:13},bindId:"label_precototal"}};e.push(w);var T={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(T);var v={type:"Ti.UI.Label",bindId:"label_ipi",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"7%",color:"black",font:{fontSize:13},bindId:"label_ipi"}};e.push(v);var b={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(b);var E={type:"Ti.UI.Label",bindId:"label_sustrib",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"6%",color:"black",font:{fontSize:13},bindId:"label_sustrib"}};e.push(E);var m={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(m);var C={type:"Ti.UI.Label",bindId:"label_valorfinal",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"8%",color:"black",font:{fontSize:13},bindId:"label_valorfinal"}};return e.push(C),e}(),properties:{layout:"horizontal"}};p.push(h);var I={properties:{width:"100%",backgroundColor:"#EBEBEB",height:100,name:"pedido_lista_escuro"},childTemplates:p};f.pedido_lista_escuro=I;var g=[],y={type:"Ti.UI.View",childTemplates:function(){var e=[],i={type:"Ti.UI.View",childTemplates:function(){var e=[],i={type:"Ti.UI.ImageView",bindId:"imagem_produto",properties:{height:"95%",bindId:"imagem_produto"}};return e.push(i),e}(),properties:{width:"7%"}};e.push(i);var t={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(t);var o={type:"Ti.UI.Label",bindId:"label_ref",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"7%",font:{fontSize:13},color:"black",bindId:"label_ref"}};e.push(o);var a={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(a);var l={type:"Ti.UI.Label",bindId:"label_colecao",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"5%",font:{fontSize:13},color:"black",bindId:"label_colecao"}};e.push(l);var _={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(_);var r={type:"Ti.UI.Label",bindId:"label_prazo",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"14%",font:{fontSize:13},color:"black",bindId:"label_prazo"}};e.push(r);var d={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(d);var s={type:"Ti.UI.Label",bindId:"label_tam",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"4%",font:{fontSize:13},color:"black",bindId:"label_tam"}};e.push(s);var n={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(n);var c={type:"Ti.UI.Label",bindId:"label_preco",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"7%",font:{fontSize:13},color:"black",bindId:"label_preco"}};e.push(c);var f={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(f);var p={type:"Ti.UI.Label",bindId:"label_peso",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"4%",font:{fontSize:13},color:"black",bindId:"label_peso"}};e.push(p);var h={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(h);var I={type:"Ti.UI.Label",bindId:"label_cubagem",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"13%",font:{fontSize:13},color:"black",bindId:"label_cubagem"}};e.push(I);var g={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(g);var y={type:"Ti.UI.Label",bindId:"label_quantidade",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"6%",color:"black",font:{fontSize:13},bindId:"label_quantidade"}};e.push(y);var u={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(u);var w={type:"Ti.UI.Label",bindId:"label_precototal",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"7%",color:"black",font:{fontSize:13},bindId:"label_precototal"}};e.push(w);var T={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(T);var v={type:"Ti.UI.Label",bindId:"label_ipi",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"7%",color:"black",font:{fontSize:13},bindId:"label_ipi"}};e.push(v);var b={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(b);var E={type:"Ti.UI.Label",bindId:"label_sustrib",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"6%",color:"black",font:{fontSize:13},bindId:"label_sustrib"}};e.push(E);var m={type:"Ti.UI.View",properties:{width:1,height:"100%",backgroundColor:"black"}};e.push(m);var C={type:"Ti.UI.Label",bindId:"label_valorfinal",properties:{textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,width:"8%",color:"black",font:{fontSize:13},bindId:"label_valorfinal"}};return e.push(C),e}(),properties:{layout:"horizontal"}};g.push(y);var u={properties:{width:"100%",backgroundColor:"#FBFBFB",height:100,name:"pedido_lista_claro"},childTemplates:g};f.pedido_lista_claro=u,s.__views.__alloyId728=Ti.UI.createListSection({id:"__alloyId728"});var w=[];w.push(s.__views.__alloyId728),s.__views.listapedidos=Ti.UI.createListView({width:"100%",top:"10%",sections:w,templates:f,id:"listapedidos",defaultItemTemplate:"pedido_lista"}),s.__views.__alloyId582.add(s.__views.listapedidos),s.__views.__alloyId731=Ti.UI.createView({backgroundColor:"#008382",height:"4%",top:"86%",width:"99%",layout:"horizontal",id:"__alloyId731"}),s.__views.finalizacao.add(s.__views.__alloyId731),s.__views.label_total=Ti.UI.createLabel({color:"#ffffff",font:{fontSize:13},height:"100%",width:"33%",id:"label_total"}),s.__views.__alloyId731.add(s.__views.label_total),s.__views.__alloyId732=Ti.UI.createView({width:1,height:"100%",backgroundColor:"black",id:"__alloyId732"}),s.__views.__alloyId731.add(s.__views.__alloyId732),s.__views.label_desconto=Ti.UI.createLabel({color:"#ffffff",font:{fontSize:13},height:"100%",width:"33%",id:"label_desconto"}),s.__views.__alloyId731.add(s.__views.label_desconto),s.__views.__alloyId733=Ti.UI.createView({width:1,height:"100%",backgroundColor:"black",id:"__alloyId733"}),s.__views.__alloyId731.add(s.__views.__alloyId733),s.__views.label_totalcomdesconto=Ti.UI.createLabel({color:"#ffffff",font:{fontSize:13},height:"100%",width:"33%",id:"label_totalcomdesconto"}),s.__views.__alloyId731.add(s.__views.label_totalcomdesconto),s.__views.__alloyId734=Ti.UI.createView({backgroundColor:"#59595b",bottom:"1%",height:"7%",width:"99%",id:"__alloyId734"}),s.__views.finalizacao.add(s.__views.__alloyId734),s.__views.__alloyId735=Ti.UI.createView({id:"__alloyId735"}),s.__views.__alloyId734.add(s.__views.__alloyId735),s.__views.__alloyId736=Ti.UI.createButton({title:"Voltar",id:"__alloyId736"}),s.__views.__alloyId735.add(s.__views.__alloyId736),l?s.__views.__alloyId736.addEventListener("click",l):c["$.__views.__alloyId736!click!voltar"]=!0,s.__views.__alloyId737=Ti.UI.createView({height:"auto",width:"auto",backgroundColor:"white",layout:"horizontal",id:"__alloyId737"}),s.__views.__alloyId734.add(s.__views.__alloyId737),s.__views.__alloyId738=Ti.UI.createImageView({image:"/images/primeiro.png",height:"80%",left:"1%",id:"__alloyId738"}),s.__views.__alloyId737.add(s.__views.__alloyId738),o?s.__views.__alloyId738.addEventListener("click",o):c["$.__views.__alloyId738!click!primeiro"]=!0,s.__views.__alloyId739=Ti.UI.createImageView({image:"/images/anterior.png",height:"80%",left:"1%",id:"__alloyId739"}),s.__views.__alloyId737.add(s.__views.__alloyId739),i?s.__views.__alloyId739.addEventListener("click",i):c["$.__views.__alloyId739!click!anterior"]=!0,s.__views.paginacao=Ti.UI.createButton({backgroundColor:"#ffffff",borderColor:"#cdcdcd",borderWidth:"1",color:"#008382",height:"80%",left:"1%",width:"14%",title:"1/1",id:"paginacao"}),s.__views.__alloyId737.add(s.__views.paginacao),s.__views.__alloyId740=Ti.UI.createImageView({image:"/images/proximo.png",height:"80%",left:"1%",id:"__alloyId740"}),s.__views.__alloyId737.add(s.__views.__alloyId740),t?s.__views.__alloyId740.addEventListener("click",t):c["$.__views.__alloyId740!click!proximo"]=!0,s.__views.__alloyId741=Ti.UI.createImageView({image:"/images/ultimo.png",height:"80%",left:"1%",id:"__alloyId741"}),s.__views.__alloyId737.add(s.__views.__alloyId741),a?s.__views.__alloyId741.addEventListener("click",a):c["$.__views.__alloyId741!click!ultimo"]=!0,s.__views.__alloyId742=Ti.UI.createButton({backgroundGradient:{type:"linear",colors:["#2c8f8e","#206764"]},borderRadius:"5",color:"#ffffff",height:"80%",right:"14%",width:"14%",title:"Voltar Categorias",id:"__alloyId742"}),s.__views.__alloyId734.add(s.__views.__alloyId742),l?s.__views.__alloyId742.addEventListener("click",l):c["$.__views.__alloyId742!click!voltar"]=!0,s.__views.__alloyId743=Ti.UI.createButton({backgroundGradient:{type:"linear",colors:["#2c8f8e","#206764"]},borderRadius:"5",color:"#ffffff",height:"80%",right:"1%",width:"12%",title:"Totalizações",id:"__alloyId743"}),s.__views.__alloyId734.add(s.__views.__alloyId743),d?s.__views.__alloyId743.addEventListener("click",d):c["$.__views.__alloyId743!click!totalizacoes"]=!0,n.destroy=function(){},_.extend(s,s.__views),Ti.include("/api/config.js"),Ti.include("/database/carrinho.js"),Ti.include("/database/carrinho_pedido.js"),Ti.include("/database/imagens_produtos.js"),Ti.include("/database/pedido.js");var T=consultaPedidosBySession(Ti.App.Properties.getString(SESSION_ID)),v=T.length,b=1;e(),c["$.__views.__alloyId736!click!voltar"]&&s.__views.__alloyId736.addEventListener("click",l),c["$.__views.__alloyId738!click!primeiro"]&&s.__views.__alloyId738.addEventListener("click",o),c["$.__views.__alloyId739!click!anterior"]&&s.__views.__alloyId739.addEventListener("click",i),c["$.__views.__alloyId740!click!proximo"]&&s.__views.__alloyId740.addEventListener("click",t),c["$.__views.__alloyId741!click!ultimo"]&&s.__views.__alloyId741.addEventListener("click",a),c["$.__views.__alloyId742!click!voltar"]&&s.__views.__alloyId742.addEventListener("click",l),c["$.__views.__alloyId743!click!totalizacoes"]&&s.__views.__alloyId743.addEventListener("click",d),_.extend(s,n)}var Alloy=require("alloy"),Backbone=Alloy.Backbone,_=Alloy._;module.exports=Controller;