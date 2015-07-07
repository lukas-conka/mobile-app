//vou mexer no replicar
var args = arguments[0] || {};
Ti.include("/api/config.js");
Ti.include("/database/clientes.js");
Ti.include("/database/carrinho.js");
Ti.include("/database/imagens_produtos.js");

var clientes = Ti.App.Properties.getList(SELECTED_CLIENTS);
var count = 0;
var data = [];
var sobrepedido = [];
var cinza_escuro = "#999999";
var cinza_claro = "#D2D2D2";
var carrinho = selecionaCarrinhoById(clientes[0]);
console.log("cliente " + clientes[0]);
var quantidades = [];
var cliente_visivel = [];
var session = Ti.App.Properties.getString(SESSION_ID);
var fk_usu = Ti.App.Properties.getString(CURRENT_USER_ID);
var ep_id = Ti.App.Properties.getString(CURRENT_EMPRESA);
var botao_visivel = [$.botao_cliente1, $.botao_cliente2, $.botao_cliente3, $.botao_cliente4, $.botao_cliente5, $.botao_cliente6, $.botao_cliente7];

var idbase = Ti.App.Properties.getString("idbase");
var idcliente = Ti.App.Properties.getString("idcliente");

for (var i = 0; i < 7; i++) {
	cliente_visivel[i] = 'false';
	botao_visivel[i].visible = 'false';
	sobrepedido[i]=100;
}

if(Ti.App.Properties.getList(SOBRE_PEDIDO)){
	sobrepedido = Ti.App.Properties.getList(SOBRE_PEDIDO);
}

for (var i = 0; i < clientes.length; i++) {
	cliente_visivel[i] = 'true';
	botao_visivel[i].visible = 'true';
	
	if(idbase == clientes[i]){
		botao_visivel[i].title = 'BASE';
		
	}
}

var valor_total = 0;
var quantidade_total = 0;
//var aux_total = 0;
renderList();
function renderList(){
while (carrinho.isValidRow()) {
	var car_id = carrinho.fieldByName('car_id');
	var car_quantidade = carrinho.fieldByName('car_quantidade');
	// var car_preco_unitario = carrinho.fieldByName('car_preco_unitario');
	var prd_id = carrinho.fieldByName('prd_id');
	var prd_nome = carrinho.fieldByName('prd_nome');
	var car_preco_unitario = carrinho.fieldByName('car_preco_unitario');
	var prd_referencia = carrinho.fieldByName('prd_referencia');
	var estoque = carrinho.fieldByName('ifp_estoque_2');
	var prd_nome_colecao = carrinho.fieldByName('prd_nome_colecao');
	var tmh_nome = carrinho.fieldByName('tmh_nome');
	var cor_nome = carrinho.fieldByName('cor_nome');
	var fk_cores = carrinho.fieldByName('fk_cores');
	var fk_tamanhos = carrinho.fieldByName('fk_tamanhos');
	var car_ipi = carrinho.fieldByName('prd_ipi');
	var tmpl = carrinho.fieldByName('fk_template');
	var car_desc_unit = carrinho.fieldByName("car_desc_unit");
	
	quantidade_total = quantidade_total + car_quantidade;

	var label_cortamanho = cor_nome + " - " + tmh_nome;
	
	var total_ref =  car_preco_unitario*car_quantidade;
	total_ref = total_ref - car_desc_unit;

	valor_total+=total_ref;
	aux_total = valor_total;
	
	var notfound;
	switch(tmpl) {
	case 1:
		notfound = "/images/notfound_quatro_quadrados.jpg";
		break;
	case 2:
		notfound = "/images/notfound_tres_verticais.jpg";
		break;
	case 3:
		notfound = "/images/notfound_quatro_verticais.jpg";
		break;
	case 4:
		notfound = "/images/notfound_um_horizontal.jpg";
		break;
	case 5:
		notfound = "/images/notfound_dois_horizontais.jpg";
		break;
	case 6:
		notfound = "/images/notfound_dois_verticais.jpg";
		break;
	case 7:
		notfound = "/images/notfound_quatro_horizontais.jpg";
		break;
	case 8:
		notfound = "/images/notfound_cinco_verticais.jpg";
		break;
	case 9:
		notfound = "/images/notfound_seis_verticais.jpg";
		break;
	}
	
	var arquivoImagem = getImagesFolder() + selectImagemPrincipal(prd_id);

	var arquivoImagem = getImagesFolder() + selectImagemPrincipal(prd_id);
	var file = Ti.Filesystem.getFile(arquivoImagem);
	
	if (file) {
		if (!file.exists()) {
			arquivoImagem = notfound;
		}
	} else {
		arquivoImagem = notfound;
	}

	var titulo = Ti.UI.createLabel({
		backgroundColor : "red",
		color : "#ffffff",
		font : {
			fontSize : 13
		},
		height : "100%",
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		width : "8%",
		text : "cl_cnpj"
	});

	var cliente_selected0 = getSelectedCheck(prd_id, fk_cores, fk_tamanhos, clientes[0]);
	var cliente_selected1 = getSelectedCheck(prd_id, fk_cores, fk_tamanhos, clientes[1]);
	var cliente_selected2 = getSelectedCheck(prd_id, fk_cores, fk_tamanhos, clientes[2]);
	var cliente_selected3 = getSelectedCheck(prd_id, fk_cores, fk_tamanhos, clientes[3]);
	var cliente_selected4 = getSelectedCheck(prd_id, fk_cores, fk_tamanhos, clientes[4]);
	var cliente_selected5 = getSelectedCheck(prd_id, fk_cores, fk_tamanhos, clientes[5]);
	var cliente_selected6 = getSelectedCheck(prd_id, fk_cores, fk_tamanhos, clientes[6]);
	var cliente_selected7 = getSelectedCheck(prd_id, fk_cores, fk_tamanhos, clientes[7]);

	quantidades.push(car_quantidade);
	
	data.push({
		car_id : car_id,
		car_quantidade : car_quantidade,
		estoque : estoque,
		prd_id : prd_id,
		fk_tamanhos : fk_tamanhos,
		fk_cores : fk_cores,
		car_preco_unitario: car_preco_unitario,
		"view_produto" : {
			backgroundColor : cinza_claro,
		},
		"label_prod" : {
			text : label_cortamanho
		},
		"imagem_produto" : {
			image : arquivoImagem
		},
		"label_qtde" : {
			backgroundColor : cinza_escuro,
			text : car_quantidade
		},
		"label_preco" : {
			backgroundColor : cinza_claro,
			text : car_preco_unitario
		},
		"label_desconto" : {
			backgroundColor : cinza_escuro,
			text : "0%",
			bindId : 0
		},
		"label_ref" : {
			backgroundColor : cinza_claro,
			text : prd_referencia
		},
		"total_ref": {
			backgroundColor : cinza_escuro,
			text : formatCurrency(total_ref),
			total_ref : total_ref,
			VAL: total_ref
		},
		"view_cliente" : {
			prd_id : prd_id
		},
		"label_cliente0" : {
			text : "Qtd.\n" + car_quantidade
		},
		"seleciona_cliente0" : {
			prd_id : prd_id,
			fk_tamanhos : fk_tamanhos,
			fk_cores : fk_cores,
			car_quantidade: Math.round(car_quantidade*sobrepedido[0]/100),
			car_preco_unitario: car_preco_unitario, 
			car_ipi : car_ipi, 
			image: cliente_selected0,
			cliente: clientes[0]
		},
		"view_cliente1" : {
			visible : cliente_visivel[1],
			backgroundColor : cinza_claro,
			cliente: 1
		},
		"label_cliente1" : {
			text : "Qtd.\n" + car_quantidade
		},
		"seleciona_cliente1" : {
			prd_id : prd_id,
			fk_tamanhos : fk_tamanhos,
			fk_cores : fk_cores,
			car_preco_unitario: car_preco_unitario, 
			car_ipi : car_ipi, 
			car_quantidade: Math.round(car_quantidade*sobrepedido[1]/100),
			image: cliente_selected1,
			cliente: clientes[1]

		},

		"view_cliente2" : {
			visible : cliente_visivel[1],
			backgroundColor : cinza_escuro,
			cliente: 2
		},
		"label_cliente2" : {
			text : "Qtd.\n" + car_quantidade
		},
		"seleciona_cliente2" : {
			prd_id : prd_id,
			fk_tamanhos : fk_tamanhos,
			fk_cores : fk_cores,
			car_preco_unitario: car_preco_unitario, 
			car_ipi : car_ipi, 
			car_quantidade: Math.round(car_quantidade*sobrepedido[2]/100),
			image: cliente_selected2,
			cliente: clientes[1]

		},

		"view_cliente3" : {
			visible : cliente_visivel[3],
			backgroundColor : cinza_claro,
			cliente: 3
		},
		"label_cliente3" : {
			text : "Qtd.\n" + car_quantidade
		},
		"seleciona_cliente3" : {
			prd_id : prd_id,
			fk_tamanhos : fk_tamanhos,
			fk_cores : fk_cores,
			car_preco_unitario: car_preco_unitario, 
			car_ipi : car_ipi, 
			car_quantidade: Math.round(car_quantidade*sobrepedido[3]/100),
			image: cliente_selected3,
			cliente: clientes[2]
		},

		"view_cliente4" : {
			visible : cliente_visivel[3],
			backgroundColor : cinza_escuro,
			cliente: 4
		},
		"label_cliente4" : {
			text : "Qtd.\n" + car_quantidade
		},
		"seleciona_cliente4" : {
			prd_id : prd_id,
			fk_tamanhos : fk_tamanhos,
			fk_cores : fk_cores,
			car_preco_unitario: car_preco_unitario, 
			car_ipi : car_ipi, 
			car_quantidade: Math.round(car_quantidade*sobrepedido[4]/100),
			image: cliente_selected4,
			cliente: clientes[3]

		},

		"view_cliente5" : {
			visible : cliente_visivel[4],
			backgroundColor : cinza_claro,
			cliente: 5
		},
		"label_cliente5" : {
			text : "Qtd.\n" + car_quantidade
		},
		"seleciona_cliente5" : {
			prd_id : prd_id,
			fk_tamanhos : fk_tamanhos,
			fk_cores : fk_cores,
			car_preco_unitario: car_preco_unitario, 
			car_ipi : car_ipi, 
			car_quantidade: Math.round(car_quantidade*sobrepedido[5]/100),
			image: cliente_selected5,
			cliente: clientes[4]

		},

		"view_cliente6" : {
			visible : cliente_visivel[5],
			backgroundColor : cinza_escuro,
			cliente: 6
		},
		"label_cliente6" : {
			text : "Qtd.\n" + car_quantidade
		},
		"seleciona_cliente6" : {
			prd_id : prd_id,
			fk_tamanhos : fk_tamanhos,
			fk_cores : fk_cores,
			car_preco_unitario: car_preco_unitario, 
			car_ipi : car_ipi, 
			car_quantidade: Math.round(car_quantidade*sobrepedido[6]/100),
			image: cliente_selected6,
			cliente: clientes[5]

		}
	});
	carrinho.next();
	total_ref  = 0;
	}
	
	$.listapedidos.sections[0].setItems(data);
	$.total_qtde.text = quantidade_total;
	$.total_preco.text = formatCurrency(valor_total);
	// selecionaCarrinho(clientes[0])
}

function verifySelected(prd_id, fk_cores, fk_tamanhos, cliente){

	console.log(cliente);
	if(!cliente){
	
		return false;
	}
<<<<<<< HEAD
var carrinho = selectCarrinhoByProductTamanhoCor(prd_id, fk_tamanhos, fk_cores, cliente);
	console.log(carrinho);
	if(carrinho[0]!=0){
		return true;
=======
	var carrinho = selectCarrinhoByProductTamanhoCor(prd_id, fk_tamanhos, fk_cores, cliente);
	if(carrinho[0] != 0){
		
		return  true;
>>>>>>> ab6b51cd101ef16ec02e05f4664d76262351b2ff
	} else {
		
		return false;
	}
}

function getSelectedCheck(prd_id, fk_cores, fk_tamanhos, cliente){
	if(!cliente){
		return '/images/checkbox-falso.png';
	}
	var carrinho = selectCarrinhoByProductTamanhoCor(prd_id, fk_tamanhos, fk_cores, cliente);
	if(carrinho[0]!=0){
		return '/images/checkbox-ativo.png';
	} else {
		return '/images/checkbox-falso.png';
	}
}

function atualizarQuantidades(button){
	var cliente = button.source.cliente;
	Ti.API.info("clientebtn" + cliente);
	var section = $.listapedidos.sections[0];
	for(var i = 0; i < quantidades.length; i++){
		var quantidade = quantidades[i];
		var car_quantidade = Math.round(quantidade*sobrepedido[cliente]/100);
		
		var novo_valor = "Qtd.\n" + car_quantidade;
		
    	var item = section.getItemAt(i);

		var fk_tamanhos = item.fk_tamanhos;
		
		var fk_cores = item.fk_cores;
		var car_preco_unitario = item.car_preco_unitario;
		
		var car_ipi = item.car_ipi;
		var prd_id = item.prd_id;
		
		console.log(prd_id+"prd_id");
		console.log(fk_cores+"fk_cores");
		console.log(fk_tamanhos+"fk_tamanhos");
		console.log(clientes[cliente]+"clientes[clientes]");
		//if(verifySelected(prd_id, fk_cores, fk_tamanhos, clientes[cliente]))
		//comentado para retirar a verificacao de 0 no carrinho pois o ultimo item esta sempre como 0

			insertOrder(clientes[cliente], car_preco_unitario, car_ipi, car_quantidade, prd_id, fk_tamanhos, fk_cores);
		switch(cliente){
		case "1":
			item.label_cliente1.text = novo_valor;
			break;
		case "2":
			item.label_cliente2.text = novo_valor;
			break;
		case "3":
			item.label_cliente3.text = novo_valor;
			break;
		case "4":
			item.label_cliente4.text = novo_valor;
			break;
		case "5":
			item.label_cliente5.text = novo_valor;
			break;
		case "6":
			item.label_cliente6.text = novo_valor;
			break;
		case "7":
			item.label_cliente7.text = novo_valor;
			break;
	}
		
		section.updateItemAt(i,item);
	}
}

function selecionaQuantidade(button){
	var valores = [];
	for(var i = 0; i<=100;  i+=10){
		valores.push(i);
	}
	
	var dialog = Titanium.UI.createOptionDialog({
    	options: valores,
    	destructive: 2,
    	cancel: 0,
    	title: "Selecione a quantidade"
	});
	
	var cliente = button.source.cliente;
	
	dialog.addEventListener("click",function(e){
		Ti.API.info("cliente" + cliente);	
		sobrepedido[cliente] = valores[e.index];
		Ti.API.info("valores" + valores[e.index]);	
		button.source.title = valores[e.index] + "%";
		atualizarQuantidades(button);
		Ti.App.Properties.setList(SOBRE_PEDIDO, sobrepedido);
	});
	
	dialog.show();
}


function selecionaItem(e) {

	var section = $.listapedidos.sections[e.sectionIndex];
    var item = section.getItemAt(e.itemIndex);
	
	var fk_tamanhos = item.fk_tamanhos;
	var fk_cores = item.fk_cores;
	var itemID = selecionaClienteBotao(e.bindId,item);
	var prd_id = itemID.prd_id;
	var cliente = itemID.cliente;
	var fk_tamanhos = itemID.fk_tamanhos;
	var fk_cores = itemID.fk_cores;
	var car_quantidade = itemID.car_quantidade;
	var car_preco_unitario = itemID.car_preco_unitario;
	var car_ipi = itemID.car_ipi;
	var image = itemID.image;
	
	Ti.App.Properties.setString("idcliente",itemID.cliente);
	
	if (image == '/images/checkbox-falso.png') {
		itemID.image = "/images/checkbox-ativo.png";
		insertOrder(cliente, car_preco_unitario, car_ipi, car_quantidade, prd_id, fk_tamanhos, fk_cores);
	} else {
		itemID.image = "/images/checkbox-falso.png";
		removeOrder(cliente, prd_id, fk_tamanhos, fk_cores);
	}	
			
	section.updateItemAt(e.itemIndex, item);
}

//Funcao Implementada por Carlos Alberto =======
function percenteDesconto(event){
	var valores = [];
	
	var section = $.listapedidos.sections[event.sectionIndex];
    var item = section.getItemAt(event.itemIndex);
	
	var fk_tamanhos = item.fk_tamanhos;
	var fk_cores = item.fk_cores;
	var itemID = selecionaClienteBotao(event.bindId,item);
	var prd_id_n = itemID.prd_id;
	var cliente = itemID.cliente;
	var fk_tamanhos = itemID.fk_tamanhos;
	var fk_cores = itemID.fk_cores;
	var car_quantidade = itemID.car_quantidade;
	var car_preco_unitario = itemID.car_preco_unitario;
	var car_ipi = itemID.car_ipi;
	var car_id_n = itemID.car_id;
	
	for(var i = 0; i <= 100; i++){
		valores.push(i);
	}
	
	var percenteDialog  = Ti.UI.createOptionDialog({
		options: valores,
		destructive: 2,
		cancel: 0,
		title: "Selecione a porcentagem"
	});
	
	percenteDialog.show();
	
	percenteDialog.addEventListener("click", function(e){
		
		event.source.text = valores[e.index] + "%";
		event.source.bindId = valores[e.index];
			
		
			
		var total_max = data[event.itemIndex].total_ref.VAL;
		var total_desc = total_max;
		var desc = (total_desc / 100) * valores[e.index];
		var total_total = valor_total;
		var prd_id = data[event.itemIndex].prd_id;
		
		data[event.itemIndex].total_ref.text = formatCurrency(total_desc - desc);
		data[event.itemIndex].total_ref.total_ref = total_desc - desc;
		event.section.updateItemAt(event.itemIndex, data[event.itemIndex]);
		
		
		var db = dbLoad();
		var query = "UPDATE tb_carrinho set car_desc_unit = " + desc + " WHERE car_id = " + car_id_n;
		db.execute(query);
		var aux_ipi = Ti.App.Properties.getString("ipi_");	
		Ti.App.Properties.setString("ipi_mod", aux_ipi);
		$.total_preco.text = formatCurrency(valor_total -= desc);		
	});
		
}

function insertOrder(cliente, car_preco_unitario, car_ipi, car_quantidade, prd_id, fk_tamanhos, fk_cores){
	var carrinho = selectCarrinhoByProductTamanhoCor(prd_id, fk_tamanhos, fk_cores, cliente);
	
	if(carrinho[0]!=0){
		Ti.API.info("atualiza");
		updateCarrinho(carrinho[0], session, car_quantidade, 0, 0, 0, 0, 0);
	} else {
		insertCarrinho(session, car_quantidade, car_preco_unitario, car_ipi, 0, 0, 0, 0, 0, 0, fk_usu, prd_id, fk_tamanhos, fk_cores, cliente, ep_id);
	}
	
	Ti.API.info("add" + carrinho);
	Ti.API.info("prd_id" + prd_id);
	Ti.API.info("fk_tamanhos" + fk_tamanhos);
	Ti.API.info("fk_cores" + fk_cores);
}

function removeOrder(cliente, prd_id, fk_tamanhos, fk_cores){
	var carrinho = selectCarrinhoByProductTamanhoCor(prd_id, fk_tamanhos, fk_cores, cliente);
	if(carrinho[0]!=0){
		Ti.API.info("atualiza");
		updateCarrinho(carrinho[0], session, 0, 0, 0, 0, 0, 0);
	}
	Ti.API.info("remove");
	Ti.API.info("prd_id" + prd_id);
	Ti.API.info("fk_tamanhos" + fk_tamanhos);
	Ti.API.info("fk_cores" + fk_cores);
}

function selecionaClienteBotao(id,item){
	var item;
	switch(id){
		case "view_cliente1":
			item = item.seleciona_cliente1;
		break; 
		case "view_cliente2":
			item = item.seleciona_cliente2;
		break; 
		case "view_cliente3":
			item = item.seleciona_cliente3;
		break; 
		case "view_cliente4":
			item = item.seleciona_cliente4;
		break; 
		case "view_cliente5":
			item = item.seleciona_cliente5;
		break; 
		case "view_cliente6":
			item = item.seleciona_cliente6;
		break; 
		case "view_cliente7":
			item = item.seleciona_cliente7;
		break; 
	}
	return item;
}

var background = "";

for (var i = 0; i < clientes.length; i++) {
	var cliente = consultaCliente(clientes[i]);
	if (cliente.isValidRow()) {
		var cl_id = cliente.fieldByName("cl_id");
		var cl_cnpj = cliente.fieldByName("cl_cnpj");
		background = "#20706d";
		if (count % 2 == 0) {
			background = "#69A09D";
		}
		var titulo = Ti.UI.createLabel({
			backgroundColor : background,
			color : "#ffffff",
			font : {
				fontSize : 13
			},
			height : "100%",
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			width : "8%",
			text : cl_cnpj
		});
		$.cabecalho.add(titulo);
		count++;
	}
}

function apenasNumeros(string) 
{
    var numsStr = string.replace(/[^0-9]/g,'');
    return parseInt(numsStr);
}

function enviar(){
	goTo("pagamento");
}
