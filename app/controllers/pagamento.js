Ti.include("/api/config.js");
Ti.include("/database/clientes.js");
Ti.include("/database/carrinho.js");
Ti.include("/database/carrinho_pedido.js");
Ti.include("/database/prazo_medio.js");
Ti.include("/database/pedido.js");
Ti.include("/database/datas.js");
Ti.include("/database/representante.js");

var base = 0;
var bruto;
var condicaoPrazoMedio = [];
var data = [];
var dataPrazoMedio = [];
var descontoEspecial = [];
var descontoPrazo = [];
var descontoVolume = [];
var formaPagamento = "";
var valorInicial = [];
var quantidade = 0;
var total_geral = 0;
var sobrepedido = [];
var desconto_unit = 0;
var aux_total = 0;
var vrf = 0;
//Variavel estatica global que recebe o valor com o desconto de replicar.js

for (var i = 0; i < 7; i++) {
	sobrepedido[i] = 100;
}

if (Ti.App.Properties.getList(SOBRE_PEDIDO)) {
	sobrepedido = Ti.App.Properties.getList(SOBRE_PEDIDO);
}

var conjunto = Ti.App.Properties.getList(SELECTED_CLIENTS);
dadosConsulta();
function dadosConsulta(){
for (var i = 0; i < conjunto.length; i++) {
	var cliente = consultaCliente(conjunto[i]);
	if (cliente.isValidRow()) {
		var cl_id = cliente.fieldByName("cl_id");
		var cl_cnpj = cliente.fieldByName("cl_cnpj");

		dataPrazoMedio[cl_id] = 1;

		quantidade = 0;
		bruto = 0;

		var pedido = consultaCarrinhoByPagamento(Ti.App.Properties.getString(SESSION_ID), conjunto[i]);
		while (pedido.isValidRow()) {
			var car_quantidade = pedido.fieldByName("car_quantidade");
			var car_preco_unitario = pedido.fieldByName("car_preco_unitario");
			var car_ipi = pedido.fieldByName("car_ipi");
			var car_desc_unit = pedido.fieldByName("car_desc_unit");
			desconto_unit = parseFloat(car_desc_unit);
			var produto = car_quantidade * car_preco_unitario;
			produto = produto - car_desc_unit;
			var ipi = (produto * car_ipi) / 100;
			quantidade = quantidade + car_quantidade;
			bruto = bruto + produto + ipi;
			total_geral = total_geral + produto + ipi;
			pedido.next();
		}
		
		aux_total += bruto;
		valorInicial[cl_id] = bruto;
		descontoEspecial[cl_id] = 0;
		descontoPrazo[cl_id] = 0;
		descontoVolume[cl_id] = 0;

		if (base == 0) {
			var porcentagem = 100;
			var cor = "";
			base++;
		} else {
			var porcentagem = sobrepedido[i];
			var cor = "";
		}
		
		data.push({
			"cliente" : cl_id,
			template : "item_cliente",
			"label_porcentagem_botao" : {
				title : porcentagem + "%"
			},
			"label_cnpj" : {
				text : cl_cnpj
			},
			"label_peca" : {
				text : quantidade
			},
			"label_bruto" : {
				text : formatCurrency(bruto)
			},
			"label_dias_botao" : {
				title : "-"
			},
			"label_prazo" : {
				text : "0%"
			},
			"label_especial_botao" : {
				title : "0%"
			},
			"label_volume" : {
				text : "0%"
			},
			"label_parcela" : {
				text : "-"
			},
			"label_desconto" : {
				text : "-"
			},
			"label_condicao" : {
				text : "-"
			},
			"label_credito" : {
				text : "-"
			}
		});
	}
	$.total_geral.text = formatCurrency(total_geral);
}
}

$.listaclientes.sections[0].setItems(data);
$.total_geral.text = formatCurrency(total_geral);

function replicar() {
	goTo('replicar');
}

function descontoPrazoMedio(e) {
	var comando = e;
	var identificacao = [];
	var prazo = [];
	var desconto = [];
	var texto = [];

	var selecao = $.listaclientes.sections[comando.sectionIndex];
	var item = selecao.getItemAt(comando.itemIndex);
	var cliente = item.cliente;
	var prazoMedio = consultaPrazoPagamento();
	while (prazoMedio.isValidRow()) {
		var tb_pr_id = prazoMedio.fieldByName("tb_pr_id");
		var tb_pr_nome = prazoMedio.fieldByName("tb_pr_nome");
		var tb_desc_nome = prazoMedio.fieldByName("tb_desc_nome");
		var tb_desconto_id = prazoMedio.fieldByName("tb_desconto_id");
		identificacao.push(tb_desconto_id);
		prazo.push(tb_pr_nome);
		desconto.push(tb_desc_nome);
		texto.push(tb_pr_nome + " (" + tb_desc_nome + "% de desconto)");

		prazoMedio.next();
	}

	var win = Titanium.UI.currentWindow;
	var dialog = Titanium.UI.createOptionDialog({
		options : texto,
		destructive : 2,
		cancel : 0,
		title : "Prazo médio"
	});
	
	// var algo = $.listaclientes.sections[e.sectionIndex];
	// var coisa = algo.getItemAt(e.itemIndex);
	
	dialog.show();
	
	
	dialog.addEventListener("click", function(e) {
		descontoDatas(comando, cliente, identificacao[e.index], prazo[e.index], desconto[e.index]);
	});
	
	
	
}

function descontoDatas(comando, cliente, identificacaoPrazo, prazo, desconto) {
	var identificacao = [];
	var dataMedia = [];

	var result = false;
	var dataPrazo = consultaDataPagamento(identificacaoPrazo);
	while (dataPrazo.isValidRow()) {
		result = true;
		var tb_data_id = dataPrazo.fieldByName("tb_data_id");
		var tb_data_nome = dataPrazo.fieldByName("tb_data_nome");

		dataMedia.push(tb_data_nome);
		identificacao.push(tb_data_id);

		dataPrazo.next();
	}

	if (result) {
		var win = Titanium.UI.currentWindow;
		var dialog = Titanium.UI.createOptionDialog({
			options : dataMedia,
			destructive : 2,
			cancel : 0,
			title : "Data"
		});
		dialog.show();
		dialog.addEventListener("click", function(e) {
			calculoPrazoMedio(comando, cliente, prazo, desconto, dataMedia[e.index]);
		});
	} else {
		descontoPrazo[cliente] = desconto;
		dataPrazoMedio[cliente] = 1;
		condicaoPrazoMedio[cliente] = "Imediato";

		var selecao = $.listaclientes.sections[comando.sectionIndex];
		var item = selecao.getItemAt(comando.itemIndex);
		item.label_dias_botao.title = prazo;
		item.label_prazo.text = descontoPrazo[cliente] + "%";
		item.label_condicao.text = dataMedia;
		selecao.updateItemAt(comando.itemIndex, item);

		calculoParcela(comando, cliente);
	}
}

function calculoPrazoMedio(comando, cliente, prazo, desconto, dataMedia) {
	var parcela = dataMedia.split("/");

	descontoPrazo[cliente] = desconto;
	dataPrazoMedio[cliente] = parcela.length;
	condicaoPrazoMedio[cliente] = dataMedia;

	var selecao = $.listaclientes.sections[comando.sectionIndex];
	var item = selecao.getItemAt(comando.itemIndex);
	item.label_dias_botao.title = prazo;
	item.label_prazo.text = descontoPrazo[cliente] + "%";
	item.label_condicao.text = dataMedia;
	selecao.updateItemAt(comando.itemIndex, item);

	calculoParcela(comando, cliente);
	
}

function descontoEspecial(e) {
	var comando = e;
	var desconto = [];
	var texto = [];

	var selecao = $.listaclientes.sections[comando.sectionIndex];
	var item = selecao.getItemAt(comando.itemIndex);
	var cliente = item.cliente;

	var representante = consultaMaximoDesconto();
	var rp_desc_especial = representante.fieldByName("rp_desc_especial");
	var rp_limite_desc_especial = representante.fieldByName("rp_limite_desc_especial");

	for ( porcentagem = 0; porcentagem <= rp_limite_desc_especial; porcentagem++) {
		desconto.push(porcentagem);
		texto.push(porcentagem + "%");
	}

	var win = Titanium.UI.currentWindow;
	var dialog = Titanium.UI.createOptionDialog({
		options : texto,
		destructive : 2,
		cancel : 0,
		title : "Desconto especial"
	});
	dialog.show();
	dialog.addEventListener("click", function(e) {
		calculoEspecial(comando, cliente, desconto[e.index]);
	});
}

function calculoEspecial(comando, cliente, desconto) {
	descontoEspecial[cliente] = desconto;
	var selecao = $.listaclientes.sections[comando.sectionIndex];
	var item = selecao.getItemAt(comando.itemIndex);
	item.label_especial_botao.title = desconto + "%";
	selecao.updateItemAt(comando.itemIndex, item);
	calculoParcela(comando, cliente);
}

//Carlos
Ti.App.Properties.setString('totalFinal', 0);
Ti.App.Properties.setString('calc1', 0);
Ti.App.Properties.setString('calc2', 0);

function calculoParcela(comando, cliente) {
	//modificado por Lucas
	var totalFinal = parseFloat(Ti.App.Properties.getString('totalFinal'));
	
	var calculo1 = (valorInicial[cliente] * descontoPrazo[cliente]) / 100;
	var resultado1 = valorInicial[cliente] - calculo1;
	
	
	
	var calculo2 = (resultado1 * descontoEspecial[cliente]) / 100; //valor final do pedido
	// alert(calculo2);
	// aux_total -= calculo1;
	// aux_total -= calculo2;
	
	var resultado2 = resultado1 - calculo2; //valor final do pedido finalmente 

	var parcelaSemDesconto = valorInicial[cliente] / dataPrazoMedio[cliente];
	
	var parcelaComDesconto = resultado2 / dataPrazoMedio[cliente];

	var credito = getClienteCredito(cliente);
	var cl_credito_utilizado = credito.fieldByName("cl_credito_utilizado");
	var cl_credito_total = credito.fieldByName("cl_credito_total");
	var utilizado = cl_credito_total - cl_credito_utilizado - resultado2;

	var selecao = $.listaclientes.sections[comando.sectionIndex];
	var item = selecao.getItemAt(comando.itemIndex);
	
	item.label_parcela.text = dataPrazoMedio[cliente] + "x de " + formatCurrency(parcelaComDesconto);
	item.label_desconto.text = formatCurrency(resultado2);
	item.label_credito.text = formatCurrency(utilizado);
	selecao.updateItemAt(comando.itemIndex, item);
	
	if(calculo1 != 0){
		if(totalFinal == 0){
			aux_total = aux_total - calculo1;
		}
		else{
			
			aux_total = totalFinal;
			aux_total = aux_total - calculo1;
		}
		
		Ti.App.Properties.setString('totalFinal', aux_total);

	}
	if(calculo2 != 0){
		if(totalFinal == 0){
			aux_total = aux_total - calculo2;
		}
		else{
			
			aux_total = totalFinal;
			aux_total = aux_total - calculo2;
		}
		
		Ti.App.Properties.setString('totalFinal', aux_total);
		
	}
	$.total_geral.text = formatCurrency(aux_total);
}

function selecionaBoleto() {
	formaPagamento = "boleto";

	$.cheque.image = "/images/seleciona.png";
	$.deposito.image = "/images/seleciona.png";
	$.combinar.image = "/images/seleciona.png";

	$.boleto.image = "/images/selecionar_vermelho.png";
}

function selecionaCheque() {
	formaPagamento = "cheque";

	$.boleto.image = "/images/seleciona.png";
	$.deposito.image = "/images/seleciona.png";
	$.combinar.image = "/images/seleciona.png";

	$.cheque.image = "/images/selecionar_vermelho.png";
}

function selecionaDeposito() {
	formaPagamento = "deposito";

	$.boleto.image = "/images/seleciona.png";
	$.cheque.image = "/images/seleciona.png";
	$.combinar.image = "/images/seleciona.png";

	$.deposito.image = "/images/selecionar_vermelho.png";
}

function selecionaCombinar() {
	formaPagamento = "combinar";

	$.boleto.image = "/images/seleciona.png";
	$.cheque.image = "/images/seleciona.png";
	$.deposito.image = "/images/seleciona.png";

	$.combinar.image = "/images/selecionar_vermelho.png";
}

function volta() {
	goTo("carrinho");
}
	

function finalizaPagamento() {
	if (formaPagamento == "") {
		alert("Forma de pagamento não selecionada");
	} else {
		var q = 0;
		var today = new Date();
		var save_date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":00";
		for (var i = 0; i < conjunto.length; i++) {
			var carrinho = consultaFinalCarrinho(Ti.App.Properties.getString(SESSION_ID), conjunto[i]);
			var ultimoPedido = consultaUltimoPedido();
			var ultimoCarrinhoPedido = consultaUltimoCarrinhoPedido() + 1;
			var ped_id = ultimoPedido + 1;
			
			//alterado por carlos
			var numero = Ti.App.Properties.getString(CURRENT_USER_ID) + "1" + ped_id;

			for (var j = 0; j < carrinho.length; j++) {
				var car_quantidade = carrinho[j][0];
				var car_preco_unitario = carrinho[j][1];
				var car_ipi = carrinho[j][2];
				var car_icms = carrinho[j][3];
				var car_entrega = carrinho[j][4];
				var car_entrega_prazo = carrinho[j][5];

				var car_data = carrinho[j][6];
				var fk_produtos = carrinho[j][7];
				var fk_tamanhos = carrinho[j][8];
				var fk_cores = carrinho[j][9];
				var car_desc_unit = carrinho[j][10];
				var crp_id = ultimoCarrinhoPedido + q;
				q++;
				//alert(car_ipi);
				insertCarrinhoPedido(crp_id, Ti.App.Properties.getString(SESSION_ID), car_quantidade, car_preco_unitario, car_ipi, car_icms, save_date, 0, descontoPrazo[conjunto[i]], descontoEspecial[conjunto[i]], formaPagamento, ped_id, conjunto[i], fk_tamanhos, fk_produtos, fk_cores, Ti.App.Properties.getString(CURRENT_USER_ID), 2, car_desc_unit);
			}
			insertPedido(ped_id, Ti.App.Properties.getString(SESSION_ID), 1, condicaoPrazoMedio[conjunto[i]], car_entrega, car_entrega_prazo, save_date, 1, numero, "", "N", conjunto[i], Ti.App.Properties.getString(CURRENT_USER_ID), 2);
		} //funcao inserida por Felipe
			if(condicaoPrazoMedio == ''){
		alert("Selecione prazo medio para continuar!");
	} else {
		cleanOrders();
		goTo("finalizacao");
	}
	}
}

function cleanOrders() {
	resetCarrinho();
	var products = [];
	var clientes = [];
	Ti.App.Properties.setList(SELECTED_CLIENTS, clientes);
	Ti.App.Properties.setList(SELECTED_PRODUCTS, products);
}

function cleanOders2() {
	resetCarrinho();
	var clientes = [];
	Ti.App.Properties.setList(SELECTED_CLIENTS, clientes);
}

//Zerando a constante global para n haver conflito na hora de colocar o valor total
