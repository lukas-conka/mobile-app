Ti.include("/api/config.js");
Ti.include("/database/carrinho.js");
Ti.include("/database/carrinho_pedido.js");
Ti.include("/database/imagens_produtos.js");
Ti.include("/database/pedido.js");


var pedidos = consultaPedidosBySession(Ti.App.Properties.getString(SESSION_ID));
var paginas = pedidos.length;
var current_page = 1;

renderCarrinho();
function renderCarrinho() {
	$.paginacao.title = current_page + " / " + paginas;
	var data = [];
	var count = 0;
	var carrinho = consultaCarrinhoPedidoByPedido(pedidos[current_page - 1]);
	if (carrinho.isValidRow()) {
		var razao = carrinho.fieldByName('cl_razao');
		var cnpj = carrinho.fieldByName('cl_cnpj');
		var forma_pgto = carrinho.fieldByName('crp_forma_pagamento');
		var data_pag = carrinho.fieldByName('ped_data_pag');
		var entrega_prazo = carrinho.fieldByName('ped_entrega_prazo');
		var entrega = carrinho.fieldByName('ped_entrega');
		var rua = carrinho.fieldByName('cl_end_unid');
		var numero = carrinho.fieldByName('cl_n_unid');
		var bairro = carrinho.fieldByName('cl_bairro_unid');
		var cidade = carrinho.fieldByName('cl_cidade_unid');
		var uf = carrinho.fieldByName('cl_uf_unid');
		var comp = carrinho.fieldByName('cl_comp_unid');
		var cep = carrinho.fieldByName('cl_cep_unid');
		var crp_data = carrinho.fieldByName("crp_data");
		var desconto = carrinho.fieldByName("desconto");
		var desconto_parcela = carrinho.fieldByName("desconto_parcela");
		var desconto_especial = carrinho.fieldByName("desconto_especial");

		var prazo_de_entrega = selectPrazo(entrega_prazo, entrega);

		var parcelas = 1;
		if ((new RegExp('/')).test(data_pag)) {
			var tmp = data_pag.split("/");
			parcelas = tmp.length;
		}

		var endereco = rua + "," + numero + "\n" + bairro + ", " + cidade + " - " + uf + "\nComp.:" + comp + " CEP: " + cep;

		$.label_razao.text = razao;
		$.label_cnpj.text = cnpj;
		$.label_forma_pgto.text = forma_pgto;
		$.label_parcelas.text = parcelas;
		$.label_prazo_medio.text = 'imediato';
		$.label_prazo_entrega.text = prazo_de_entrega;
		$.label_representante.text = Ti.App.Properties.getString(CURRENT_USER_NAME);
		$.label_endereco.text = endereco;
	}

	var valor_total = 0;
	var valor_total_ipi = 0;
	var peso_total = 0;
	var cubagem_a_total = 0;
	var cubagem_l_total = 0;
	var cubagem_p_total = 0;
	var total = 0;
	var desconto = 0;

	var carrinho = consultaCarrinhoPedidoByPedido(pedidos[current_page - 1]);
	while (carrinho.isValidRow()) {
		var template;
		var prd_id = carrinho.fieldByName('prd_id');
		var prd_referencia = carrinho.fieldByName('prd_referencia');
		var prd_nome_colecao = carrinho.fieldByName('prd_nome_colecao');
		var entrega_prazo = carrinho.fieldByName('ped_entrega_prazo');
		var entrega = carrinho.fieldByName('ped_entrega');
		var tmh_nome = carrinho.fieldByName('ped_entrega');
		var crp_preco_unitario = carrinho.fieldByName('crp_preco_unitario');
		var prd_peso = carrinho.fieldByName('ifp_peso');
		var prd_cub_a = carrinho.fieldByName('ifp_cub_a');
		var prd_cub_l = carrinho.fieldByName('ifp_cub_l');
		var prd_cub_p = carrinho.fieldByName('ifp_cub_p');
		var crp_quantidade = carrinho.fieldByName('crp_quantidade');
		var prd_ipi = carrinho.fieldByName('prd_ipi');
		var desconto_unit = carrinho.fieldByName('desconto_unit');
		var prazo_de_entrega = selectPrazo(entrega_prazo, entrega);
		var valor_produtos = crp_preco_unitario * crp_quantidade;
		// alert(prazo_de_entrega);
		valor_produtos = valor_produtos - desconto_unit;

		var valor_ipi = (valor_produtos * prd_ipi) / 100;
		var valor_total_produto = valor_produtos + valor_ipi;

		peso_total = peso_total + prd_peso;
		cubagem_a_total = cubagem_a_total + prd_cub_a;
		cubagem_l_total = cubagem_l_total + prd_cub_l;
		cubagem_p_total = cubagem_p_total + prd_cub_p;

		valor_total = valor_total + valor_produtos;
		valor_total_ipi = valor_total_ipi + valor_ipi;

		if (count == 0) {
			template = 'pedido_lista_escuro';
			count++;
		} else {
			count = 0;
			template = 'pedido_lista_claro';
		}

		total = total + valor_total_produto;
		
		Ti.API.info('prd_id=' + prd_id);

		data.push({
			template : template,
			"imagem_produto" : {
				image : getImagesFolder() + selectImagemPrincipal(prd_id)
			},
			"label_ref" : {
				text : prd_referencia
			},
			"label_colecao" : {
				text : prd_nome_colecao
			},
			"label_prazo" : {
				text : prazo_de_entrega
			},
			"label_tam" : {
				text : tmh_nome
			},
			"label_preco" : {
				text : formatCurrency(crp_preco_unitario)
			},
			"label_peso" : {
				text : prd_peso
			},
			"label_cubagem" : {
				text : prd_cub_a + " x " + prd_cub_l + " x " + prd_cub_p
			},
			"label_quantidade" : {
				text : crp_quantidade
			},
			"label_precototal" : {
				text : formatCurrency(valor_produtos)
			},
			"label_ipi" : {
				text : prd_ipi + "%\n" + formatCurrency(valor_ipi)
			},
			"label_sustrib" : {
				text : "0,00%\n R$ 0,00"
			},
			"label_valorfinal" : {
				text : formatCurrency(valor_produtos)
			}
		});

		carrinho.next();
	}
	
	var total_desconto = 0;
	var valor_total_desconto = 0;

	valor_total = valor_total - valor_total_ipi - valor_total_desconto;

	var valor_parcelas = valor_total / parcelas;
	Ti.API.info('valor_parcelas=' + valor_parcelas);

	$.listapedidos.sections[0].setItems(data);
	$.label_ipi.text = formatCurrency(valor_total_ipi);
	//implementado por carlos
	var calculo_cubagem = (cubagem_a_total * cubagem_l_total * cubagem_p_total);
	$.label_cubagem.text = calculo_cubagem.toFixed(2)+ " m3";
	
	$.label_peso.text = peso_total + " Kg";

	$.numeroPedido.text = "NÚMERO DO PEDIDO: " + Ti.App.Properties.getString(CURRENT_USER_ID) + "1" + pedidos[current_page - 1];
	$.dataPedido.text = "DATA: " + crp_data;

	$.label_total.text = "TOTAL: " + formatCurrency(total);

	var descontoI = (total * desconto) / 100;
	var final = total - descontoI;
	var descontoII = (final * desconto_parcela) / 100;
	final = final - descontoII;
	var descontoIII = (final * desconto_especial) / 100;
	desconto = descontoI + descontoII + descontoIII;
	final = final - descontoIII;

	$.label_desconto.text = "DESCONTOS: " + formatCurrency(desconto);
	$.label_valor_parcelas.text = formatCurrency(final/parcelas);
	$.label_totalcomdesconto.text = "TOTAL COM DESCONTOS: " + formatCurrency(final);
}

function anterior() {
	current_page--;
	if (current_page <= 0)
		current_page = paginas;
	renderCarrinho();
}

function proximo() {
	current_page++;
	if (current_page > paginas)
		current_page = 1;
	renderCarrinho();
}

function primeiro() {
	current_page = 1;
	renderCarrinho();
}

function ultimo() {
	current_page = paginas;
	renderCarrinho();
}

function voltar() {
	resetSession();
	goTo("seleciona_cliente");
}

function selectPrazo(periodo, entrega) {
	var result = "";
	var prazo = entrega.substring(0, 4) + '-' + entrega.substring(4, 6) + '-' + entrega.substring(6, 8);
	var data = new Date(prazo);
	var mes = data.getMonth() + 1;
	var primeiro = new Date();
	var ultimodia = new Date();

	entrega = 'quinzenal';
	switch (entrega) {
	case "mensal":
		primeiro = new Date(data.getFullYear(), mes, 1);
		ultimodia = new Date(data.getFullYear(), mes, 0);
		result = mes + " mês\n" + primeiro.getDate() + " de " + getMonth(mes) + " a " + ultimodia.getDate() + " de " + getMonth(mes);
		break;
	case "semanal":
		primeiro = data.getDate() - data.getDay();
		ultimodia = primeiro + 6;
		result = getWeekOfYear(data) + " semana\n" + primeiro + " de " + getMonth(mes) + " a " + ultimodia + " de " + getMonth(mes);
		break;
	case "quinzenal":
		var quinzena = 0;
		if (data.getDate() <= 15) {
			quinzena = (mes + 1) * 2;
			primeiro = 1;
			ultimodia = 15;
		} else {
			quinzena = (mes + 1) * 2 + 1;
			primeiro = 16;
			var tmp = new Date(data.getFullYear(), mes, 0);
			ultimodia = tmp.getDate();
		}
		result = getWeekOfYear(data) + " semana\n" + primeiro + " de " + getMonth(mes) + " a " + ultimodia + " de " + getMonth(mes);
		break;
	}

	return result;
}

function voltar() {
	goTo('seleciona_cliente');
}

function totalizacoes() {
	goTo('totalizacoes');
}