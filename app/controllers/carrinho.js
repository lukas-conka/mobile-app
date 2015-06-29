Ti.include("/api/config.js");
Ti.include("/database/carrinho.js");
Ti.include("/database/imagens_produtos.js");

var total_pedidos = 0;
var count = 0;
var data = [];
var data_inicial = '2020-01-01';
var data_final = '2000-01-01';
var gap_inicial_mes = new Date(data_inicial);
var gap_final_mes = new Date(data_final);
var gap_inicial_semana = new Date(data_inicial);
var gap_final_semana = new Date(data_final);
var gap_inicial_quinzena = new Date(data_inicial);
var gap_final_quinzena = new Date(data_final);

var totalSemIPI = 0;
var totalIPI = 0;
var totalST = 0;

var datas_inicio = [];
var datas_fim = [];
var datas_prazos = [];
var datas_labels = [];
var datas_selected = [];
var views_imagens = [];
var current_prazo = 'mensal';
var next_prazo = 'mensal';
var total_periodo = 0;
var restantes_marcar = 0;
var data_selecionada;
var data_confirmada;
var prazo_selecionado;
$.periodo_label_mes.transform = Ti.UI.create2DMatrix().rotate(-90);
$.periodo_label_semana.transform = Ti.UI.create2DMatrix().rotate(-90);
$.periodo_label_quinzena.transform = Ti.UI.create2DMatrix().rotate(-90);
var usoMes = false;
var usoSemana = false;
var usoQuinzena = false;
var previousPeriodButton;
var carrinho = selecionaCarrinho();
resultadoCarrinho(carrinho);

$.label_totalPreco.text = formatCurrency(totalSemIPI);
$.label_totalIpi.text = formatCurrency(totalIPI);

var totalComIPI = totalSemIPI + totalIPI;

$.label_totalComIPI.text = formatCurrency(totalComIPI);

$.pagamento.hide();

function resultadoCarrinho(carrinho) {
	var totalFinal = 0;

	var scroll = Ti.UI.createScrollView({
		height : '100%',
		width : '100%',
		contentWidth : 'auto',
		contentHeight : 'auto',
		scrollType : 'horizontal',
		layout : 'horizontal',
		showVerticalScrollIndicator : true,
		showHorizontalScrollIndicator : true
	});

	$.produto.add(scroll);

	while (carrinho.isValidRow()) {
		total_pedidos++;
		var car_id = carrinho.fieldByName('car_id');
		var car_quantidade = carrinho.fieldByName('car_quantidade');
		var car_preco_unitario = carrinho.fieldByName('car_preco_unitario');
		var car_entrega = carrinho.fieldByName('car_entrega');
		var car_entrega_prazo = carrinho.fieldByName('car_entrega_prazo');
		var prd_id = carrinho.fieldByName('prd_id');
		var prd_nome = carrinho.fieldByName('prd_nome');
		var prd_referencia = carrinho.fieldByName('prd_referencia');
		var prd_nome_colecao = carrinho.fieldByName('prd_nome_colecao');
		var prd_data_inicio = carrinho.fieldByName('prd_data_inicio');
		var prd_data_fim = carrinho.fieldByName('prd_data_fim');
		var prd_data_prazo = carrinho.fieldByName('prd_data_prazo');
		var prd_data_limite = carrinho.fieldByName('prd_data_limite');
		var prd_peso = carrinho.fieldByName('prd_peso');
		var prd_cub_a = carrinho.fieldByName('prd_cub_a');
		var prd_cub_l = carrinho.fieldByName('prd_cub_l');
		var prd_cub_p = carrinho.fieldByName('prd_cub_p');
		var prd_ipi = carrinho.fieldByName('car_ipi');
		var tmh_nome = carrinho.fieldByName('tmh_nome');
		var estoque = carrinho.fieldByName('estoque2');
		var tmpl = carrinho.fieldByName('fk_template');

		setGap(prd_data_inicio, prd_data_fim, prd_data_prazo);

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

		var view = Titanium.UI.createView({
			backgroundColor : "#ffe9e9",
			borderColor : "#dddddd",
			borderRadius : "6",
			borderWidth : "1",
			height : "100%",
			left : "5",
			right : "5",
			width : "100"
		});

		var referencia = Titanium.UI.createLabel({
			color : "#000000",
			font : {
				fontSize : 13
			},
			height : "10%",
			text : prd_referencia + " - " + tmh_nome,
			top : "5%"
		});

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

		var imagem = Titanium.UI.createImageView({
			height : "48%",
			image : arquivoImagem,
			top : "20%"
		});

		if (prd_data_prazo == "mensal") {
			var inicio = prd_data_inicio.split("-");
			var fim = prd_data_fim.split("-");
			var prazo = "M";
		} else if (prd_data_prazo == "semanal") {
			var prazo = "S";
			var inicio = prd_data_inicio.split("-");
			var dataInicio = new Date(prd_data_inicio);
			inicio[1] = getWeekOfYear(dataInicio);
			if (inicio[1] > 52) {
				inicio[1] = inicio[1] - 52;
			}
			var fim = prd_data_fim.split("-");
			var dataFim = new Date(prd_data_fim);
			fim[1] = getWeekOfYear(dataFim);
			if (fim[1] > 52) {
				fim[1] = fim[1] - 52;
			}
		} else if (prd_data_prazo == "quinzena") {
			var inicio = prd_data_inicio.split("-");
			if (inicio[1] <= 15) {
				inicio[1] = (inicio[1] * 2) - 1;
			} else {
				inicio[1] = inicio[1] * 2;
			}
			var fim = prd_data_fim.split("-");
			if (fim[1] <= 15) {
				fim[1] = (fim[1] * 2) - 1;
			} else {
				fim[1] = fim[1] * 2;
			}
			var prazo = "Q";
		}

		var periodo = Titanium.UI.createLabel({
			backgroundColor : 'transparent',
			bottom : "5%",
			color : "#000000",
			font : {
				fontSize : 13
			},
			text : inicio[1] + "/" + inicio[0] + " à " + fim[1] + "/" + fim[0] + " (" + prazo + ")",
			height : "22%",
			width : "98%",
			car_id : car_id,
			prazo : prd_data_prazo,
			prd_data_inicio : prd_data_inicio,
			prd_data_fim : prd_data_fim,
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
		});

		datas_labels.push(periodo);
		datas_inicio.push(prd_data_inicio);
		datas_fim.push(prd_data_fim);
		datas_prazos.push(prd_data_prazo);
		datas_selected.push(0);

		view.periodo = periodo;
		view.selected_item = total_pedidos - 1;
		referencia.periodo = periodo;
		referencia.selected_item = total_pedidos - 1;
		imagem.periodo = periodo;
		imagem.selected_item = total_pedidos - 1;
		periodo.periodo = periodo;
		periodo.selected_item = total_pedidos - 1;
		view.add(referencia);
		view.add(imagem);
		view.add(periodo);
		view.addEventListener('click', function(e) {
			periodoManual(e.source.periodo, e.source.selected_item);
		});
		views_imagens.push(view);

		scroll.add(view);

		var total = car_preco_unitario * car_quantidade;
		var ipi = (total * prd_ipi) / 100;
		var final = total + ipi;

		totalFinal = totalFinal + final;

		totalSemIPI = totalSemIPI + total;
		totalIPI = totalIPI + ipi;

		var template;

		if (count == 0) {
			template = 'pedido_lista_escuro';
			count++;
		} else {
			count = 0;
			template = 'pedido_lista_claro';
		}

		data.push({
			car_id : car_id,
			car_quantidade : car_quantidade,
			estoque : estoque,
			template : template,
			"imagem_produto" : {
				image : arquivoImagem
			},
			"label_ref" : {
				font : {
					fontSize : 13
				},
				text : prd_referencia
			},
			"label_colecao" : {
				font : {
					fontSize : 13
				},
				text : prd_nome_colecao
			},
			"label_prazo" : {
				font : {
					fontSize : 13
				},
				text : inicio[1] + "/" + inicio[0] + " à " + fim[1] + "/" + fim[0] + " (" + prazo + ")"
			},
			"label_tam" : {
				font : {
					fontSize : 13
				},
				text : tmh_nome
			},
			"label_preco" : {
				font : {
					fontSize : 13
				},
				text : formatCurrency(car_preco_unitario)
			},
			"label_peso" : {
				font : {
					fontSize : 13
				},
				text : prd_peso + " Kg"
			},
			"label_cubagem" : {
				font : {
					fontSize : 13
				},
				text : prd_cub_a + " m x " + prd_cub_l + " m x " + prd_cub_p + " m"
			},
			"label_quant" : {
				font : {
					fontSize : 13
				},
				text : car_quantidade
			},
			"label_estoque" : {
				font : {
					fontSize : 13
				},
				text : estoque
			},
			"label_precototal" : {
				text : formatCurrency(total)
			},
			"label_ipi" : {
				text : prd_ipi + "%\n" + formatCurrency(ipi)
			},
			"label_sustrib" : {
				text : "R$ 0,00"
			},
			"label_valorfinal" : {
				text : formatCurrency(final)
			}
		});
		carrinho.next();
	}
	drawDates();
	$.listapedidos.sections[0].setItems(data);
	$.valor_total.title = "Valor total do pedido: R$ " + formatCurrency(totalFinal);
}

function adiciona_quantidade(e) {
	var selecao = $.listapedidos.sections[e.sectionIndex];
	var item = selecao.getItemAt(e.itemIndex);
	var car_id = item.car_id;
	var quantidade = item.car_quantidade;
	var estoque = item.estoque;
	if (quantidade < estoque) {
		quantidade++;
		item.car_quantidade = quantidade;
		item.label_quant.text = quantidade;
		selecao.updateItemAt(e.itemIndex, item);
		updateCarrinhoQuantidade(car_id, quantidade);
	}
}

function subtrai_quantidade(e) {
	var selecao = $.listapedidos.sections[e.sectionIndex];
	var item = selecao.getItemAt(e.itemIndex);
	var car_id = item.car_id;
	var quantidade = item.car_quantidade;
	var estoque = item.estoque;
	quantidade--;
	if (quantidade >= 0) {
		item.car_quantidade = quantidade;
		item.label_quant.text = quantidade;
		selecao.updateItemAt(e.itemIndex, item);
		updateCarrinhoQuantidade(car_id, quantidade);
	}
}

function exclui_item(e) {
	var selecao = $.listapedidos.sections[e.sectionIndex];
	var item = selecao.getItemAt(e.itemIndex);
	var itemIndex = e.itemIndex;
	var car_id = item.car_id;

	var dialog = Ti.UI.createAlertDialog({
		title : 'Deseja excluir esse produto ?',
		buttonNames : ['Cancelar', 'Confirmar']
	});
	dialog.addEventListener('click', function(e) {
		if (e.index == 1) {
			selecao.deleteItemsAt(itemIndex, 1);
			excluidCarrinho(car_id);
			scroll.remove(views_imagens[itemIndex]);
			views_imagens.splice(itemIndex, 1);
		}
	});
	dialog.show();
}

function periodoManual(periodo, selected_item) {

	var car_id = periodo.car_id;
	var prazo = periodo.prazo;
	var data_inicio = new Date(periodo.prd_data_inicio);
	var data_fim = new Date(periodo.prd_data_fim);
	var data_atual = new Date(data_selecionada);

	/*Ti.API.info('prazo=' + prazo);
	 Ti.API.info('data_inicio=' + data_inicio);
	 Ti.API.info('periodo=' + periodo);
	 Ti.API.info('data_fim=' + data_fim);
	 Ti.API.info('data_selecionada=' + data_selecionada);*/

	if (prazo == prazo_selecionado && data_atual >= data_inicio && data_atual <= data_fim) {
		if (periodo.backgroundColor == '#f8f419') {
			periodo.backgroundColor = '#81dd1f';
			updatePeriod(car_id, data_selecionada, prazo_selecionado);
			Ti.API.info('selected_item=' + selected_item);
			datas_selected[selected_item] = 1;
			recountDates();
		}
	}
}

function drawDates() {
	removeAllViews($.periodo_mes);
	removeAllViews($.periodo_semana);
	removeAllViews($.periodo_quinzena);

	// Mes
	var data_inicial = gap_inicial_mes;
	var data_final = gap_final_mes;
	var inicio = data_inicial.getMonth() + 1;
	var fim = data_final.getMonth() + 1 + (data_final.getFullYear() - data_inicial.getFullYear()) * 12;
	var data = data_inicial;

	for (var i = inicio; i < fim; i++) {
		data.setMonth(i);
		var primeiro = new Date(data.getFullYear(), i, 1);
		var ultimodia = new Date(data.getFullYear(), i, 0);
		var text = (data.getMonth() + 1) + '/' + data.getFullYear() + "\nEntrega:\n" + primeiro.getDate() + " à " + ultimodia.getDate();
		var salvar_data = data.getFullYear() + '-' + checkdecimal(data.getMonth() + 1) + '-' + checkdecimal(data.getDate());
		var display_data = data.getMonth() + 1 + " Mês";
		addDate(text, 'mensal', salvar_data, display_data);
		usoMes = true;
	}

	// Semana

	var inicio = getWeekOfYear(gap_inicial_semana) + 1;
	var fim = getWeekOfYear(gap_final_semana) + (gap_final_semana.getFullYear() - gap_inicial_semana.getFullYear()) * 52;
	var data = gap_inicial_semana;
	var dia = data.getDate();
	var ano_inicial = gap_inicial_semana.getFullYear();
	dia = data.getDate() - data.getDay() + 1;
	data.setDate(dia);
	var intervalo = fim - inicio;

	for (var i = 0; i < intervalo; i++) {
		var primeiro = data.getDate();
		var primeiro_mes = data.getMonth() + 1;
		data.setDate(data.getDate() + 6);
		var ultimodia = data.getDate();
		var ultimo_mes = data.getMonth() + 1;
		data.setDate(data.getDate() + 1);
		var year_week = (data.getFullYear() - ano_inicial) * 52;
		var text = (inicio + i - year_week) + '/' + data.getFullYear() + "\nEntrega:\n" + primeiro + "/" + primeiro_mes + " à " + ultimodia + "/" + ultimo_mes;
		var salvar_data = data.getFullYear() + '-' + checkdecimal(data.getMonth() + 1) + '-' + checkdecimal(data.getDate());
		var display_data = inicio + i + " Semana";
		addDate(text, 'semanal', salvar_data, display_data);
		usoSemana = true;
	}

	//Quinzena
	var inicio = 0;
	var fim = 0;
	var mes = gap_inicial_quinzena.getMonth() + 1;
	var data = gap_inicial_quinzena;
	if (gap_inicial_quinzena.getDate() <= 15) {
		inicio = mes * 2;
	} else {
		inicio = mes * 2 + 1;
	}
	var mes = gap_final_quinzena.getMonth() + 1;
	if (gap_final_quinzena.getDate() <= 15) {
		fim = mes * 2 + (gap_final_quinzena.getFullYear() - gap_inicial_quinzena.getFullYear()) * 24;
	} else {
		fim = mes * 2 + 1 + (gap_final_quinzena.getFullYear() - gap_inicial_quinzena.getFullYear()) * 24;
	}
	var intervalo = fim - inicio;

	var quinzena = 0;

	for (var i = inicio; i < fim; i++) {
		data.setMonth(Math.ceil(i / 2));
		mes = data.getMonth();
		if (i % 2 == 1) {
			primeiro = 1;
			ultimodia = 15;
			data.setDate(ultimodia);
		} else {
			primeiro = 16;
			var tmp = new Date(data.getFullYear(), mes, 0);
			ultimodia = tmp.getDate();
			data.setDate(ultimodia);
		}
		var primeiro_mes = data.getMonth() + 1;
		var ultimo_mes = data.getMonth() + 1;
		quinzena = (i - (data.getFullYear() - gap_inicial_quinzena.getFullYear()) * 24);
		var text = quinzena + "/" + data.getFullYear() + "\nEntrega:\n" + "/" + primeiro_mes + " à " + ultimodia + "/" + ultimo_mes;
		var salvar_data = data.getFullYear() + '-' + checkdecimal(data.getMonth() + 1) + '-' + checkdecimal(data.getDate());
		var display_data = quinzena + " Quinzena";
		addDate(text, 'quinzena', salvar_data, display_data);
		usoQuinzena = true;
	}

	recountDates();

}

function showDates() {
	$.view_mes.right = "-100%";
	$.view_semana.right = "-100%";
	$.view_quinzena.right = "-100%";

	$.periodo_label_mes.hide();
	$.periodo_label_semana.hide();
	$.periodo_label_quinzena.hide();

	current_prazo = next_prazo;

	switch (current_prazo) {
	case 'mensal':
		$.view_mes.right = "14%";
		$.view_mes.show();
		$.periodo_label_mes.show();
		if (usoSemana == true) {
			next_prazo = 'semanal';
		} else if (usoQuinzena == true) {
			next_prazo = 'quinzena';
		} else {
			$.seta.hide();
		}
		break;
	case 'semanal':
		$.view_semana.right = "14%";
		$.view_semana.show();
		$.periodo_label_semana.show();
		if (usoQuinzena == true) {
			next_prazo = 'quinzena';
		} else if (usoMes == true) {
			next_prazo = 'mensal';
		} else {
			$.seta.hide();
		}
		break;
	case 'quinzena':
		$.view_quinzena.right = "14%";
		$.view_quinzena.show();
		$.periodo_label_quinzena.show();
		if (usoMes == true) {
			next_prazo = 'mensal';
		} else if (usoSemana == true) {
			next_prazo = 'semanal';
		} else {
			$.seta.hide();
		}
		break;
	}
	recountDates();
}

function fechar() {
	if (restantes_marcar <= 1) {
		alert('Produtos incluidos com sucesso no pedido.');
		$.pagamento.show();
	} else {
		alert('Seleção de produtos pendente');
	}
}

function pagamento() {
	goTo('pagamento');
}

function comprando() {
	goTo('categorias');
}

function voltar() {
	goTo('calculadora');
}

function recountDates() {
	total_periodo = 0;
	restantes_marcar = 0;
	for (var i = 0; i < datas_inicio.length; i++) {
		if (datas_selected[i] == 0) {
			restantes_marcar++;
		}
		if (datas_prazos[i] == current_prazo) {
			total_periodo++;
		}
	}
	$.total_pedidos.title = '' + total_pedidos;
	$.disponiveis.title = '' + total_periodo;
	$.restantes.title = '' + restantes_marcar;
}

function addDate(text, prazo, periodo, display_value) {
	var view = Titanium.UI.createLabel({
		backgroundColor : "#414243",
		borderWidth : "1",
		borderColor : "#e71123",
		color : "#ffffff",
		height : "80%",
		width : 80,
		left : 3,
		font : {
			fontSize : 13
		},
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
		text : text,
		prazo : prazo,
		periodo : periodo,
		display_value : display_value
	});
	view.addEventListener('click', function(e) {
		e.source.backgroundColor = "#F8F419";
		e.source.color = "#000000";

		if (previousPeriodButton) {
			if (previousPeriodButton != e.source) {
				previousPeriodButton.backgroundColor = "#414243";
				previousPeriodButton.color = "#ffffff";
			}
		}
		previousPeriodButton = e.source;
		selecionaPeriodo(e.source.prazo, e.source.periodo, e.source.display_value);
	});

	switch (prazo) {
	case 'mensal':
		$.periodo_mes.add(view);
		break;
	case 'semanal':
		$.periodo_semana.add(view);
		break;
	case 'quinzena':
		$.periodo_quinzena.add(view);
		break;
	}
}

function limparMarcacao() {
	prazo_selecionado = '';
	data_selecionada = '';
	for (var i = 0; i < datas_inicio.length; i++) {
		datas_labels[i].backgroundColor = 'transparent';
		datas_selected[i] = 0;
	}
	recountDates();
}

function selecionaPeriodo(prazo, periodo, display_value) {
	for (var i = 0; i < datas_inicio.length; i++) {
		var data_inicio = new Date(datas_inicio[i]);
		var data_fim = new Date(datas_fim[i]);
		var data_selected = new Date(periodo);
		prazo_selecionado = prazo;
		data_selecionada = data_selected.getFullYear() + '-' + checkdecimal(data_selected.getMonth() + 1) + '-' + checkdecimal(data_selected.getDate());

		if (datas_prazos[i] == prazo && data_inicio <= data_selected && data_fim >= data_selected) {
			if (datas_labels[i].backgroundColor == 'transparent') {
				datas_labels[i].backgroundColor = '#f8f419';
				datas_labels[i].text = display_value;
			} else if (datas_labels[i].backgroundColor == '#f8f419') {
				if (data_selecionada == data_confirmada) {
					datas_labels[i].backgroundColor = '#81dd1f';
					datas_selected[i] = 1;
					updatePeriod(datas_labels[i].car_id, periodo, datas_prazos[i]);
				} else {
					datas_labels[i].backgroundColor = '#f8f419';
					datas_labels[i].text = display_value;
				}
			}
		}
	}
	recountDates();
	data_confirmada = data_selecionada;
}

function updatePeriod(car_id, periodo, prazo) {
	var data = new Date(periodo);
	var data_save = '';
	data_save = data.getFullYear() + checkdecimal(data.getMonth() + 1) + checkdecimal(data.getDate());
	updateCarrinhoPeriod(car_id, data_save, prazo);
}

function setGap(inicio, fim, prazo) {
	var data_inicio = new Date(inicio);
	var data_fim = new Date(fim);
	var today = new Date();
	if (data_inicio <= today)
		data_inicio = today;
	switch (prazo) {
	case 'mensal':
		if (data_inicio <= gap_inicial_mes)
			gap_inicial_mes = data_inicio;
		if (gap_final_mes <= data_fim)
			gap_final_mes = data_fim;
		break;
	case 'semanal':
		if (data_inicio <= gap_inicial_semana)
			gap_inicial_semana = data_inicio;
		if (gap_final_semana <= data_fim)
			gap_final_semana = data_fim;
		break;
	case 'quinzena':
		if (data_inicio <= gap_inicial_quinzena)
			gap_inicial_quinzena = data_inicio;
		if (gap_final_quinzena <= data_fim)
			gap_final_quinzena = data_fim;
		break;
	}
}

function datas(inicio, fim, prazo, limite) {
	var atual = new Date();
	var ultimo = new Date(atual);
	ultimo.setDate(atual.getDate() + limite);

	atual = atual.split("-");
	ultimo = ultimo.split("-");

	inivio = inicio.split("-");
	fim = fim.split("-");

	if (prazo == "mensal") {
		if (inicio[0] == fim[0]) {
			for (var mes = inicio[1]; mes <= fim[1]; mes++) {
				if (atual[0] < inicio[0]) {
					//Array com a data
				} else {
					if (ultimo[1] <= mes) {
						//Array com a data
					}
				}
			}
		} else {
			for (var ano = inicio[0]; ano <= fim[0]; ano++) {
				if (ano == inicio[0]) {
					for (var mes = inicio[1]; mes <= 12; mes++) {
						if (ano == atual[0]) {
							if (limite[1] <= mes) {
								//Array com a data
							}
						} else if (ano > atual[0]) {
							//Array com a data
						}
					}
				} else if (ano == fim[0]) {
					for (var mes = 1; mes <= fim[1]; mes++) {
						if (ano == atual[0]) {
							if (limite[1] <= mes) {
								//Array com a data
							}
						} else {
							//Array com a data
						}
					}
				} else {
					for (var mes = 1; mes <= 12; mes++) {
						if (ano == atual[0]) {
							if (limite[1] <= mes) {
								//Array com a data
							}
						} else {
							//Array com a data
						}
					}
				}
			}
		}
	} else if (prazo == "semanal") {

	}
}

function getWeekOfYear(d) {
	var day = getDayOfYear(d);
	var week = Math.ceil(day / 7);
	return week;
}

function getDayOfYear(d) {// d is a Date object
	var yn = d.getFullYear();
	var mn = d.getMonth();
	var dn = d.getDate();
	var d1 = new Date(yn, 0, 1, 12, 0, 0);
	var d2 = new Date(yn, mn, dn, 12, 0, 0);
	var ddiff = Math.round((d2 - d1) / 864e5);
	return ddiff + 1;
}

$.periodo_label_mes.hide();
$.periodo_label_semana.hide();
$.periodo_label_quinzena.hide();

if (usoMes == false) {
	showDates();
	showDates();
}
