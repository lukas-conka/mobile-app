var args = arguments[0] || {};
Ti.include("/api/config.js");
Ti.include("/database/aparencia.js");
Ti.include("/database/clientes.js");
Ti.include("/database/produtos.js");
Ti.include("/database/aparencia.js");
Ti.include("/database/carrinho.js");
Ti.include("/database/imagens_produtos.js");
Ti.include("/database/informacao_produto.js");

var current_page = 1;
var tabeladepreco = 1;
var ep_id = Ti.App.Properties.getString(CURRENT_EMPRESA);
var produtos = Ti.App.Properties.getList(SELECTED_PRODUCTS);
var fk_usu = Ti.App.Properties.getList(CURRENT_USER_ID);
var clientes = Ti.App.Properties.getList(SELECTED_CLIENTS);
var tabelapreco = 1;
var fk_cli = clientes[0];
var prd_id = 0;
var informacoes;
var composicao;
var prazodeentrega;
var descricao;
var codigodebarras;
var botoes = [];
var valores = [];
var estoques = [];
var cores = [];
var tamanhos = [];
var coresid = [];
var tamanhosid = [];
var botoes_selecionados = [];
var porpreco = false;
var table;
var preco_unitario = 0;
var ipi = 0;
var icms = 0;
var sortido = false;
var cor_atual = 0;
var imagemPrincipal;
var lista_visible = false;
var scrollView;
var scroll;
var line;
var center;
var layout;
var quantidaderef = 0;
var valorref = 0;
var quantidadetotal = 0;
var valortotal = 0;

$.logoEmpresa.image = getImagesFolder() + selectLogoFile();
$.apaga.title = '<<';
renderProduct();
renderLista();
$.pagina_final.text = produtos.length;

var min_credito = 0;
var max_credito = 0;
var cliente = consultaCredito(clientes[0]);
if (cliente.isValidRow()) {
	min_credito = cliente.fieldByName('cl_valor_minimo');
	max_credito = cliente.fieldByName('cl_credito_total') - cliente.fieldByName('cl_credito_utilizado');
}

function renderProduct() {
	$.pagina_inicial.text = current_page;

	prd_id = produtos[current_page - 1];
	var produto = selectProductById(prd_id, ep_id, tabeladepreco);
	var template = produto.fieldByName('fk_template');

	var notfound;
	switch(template) {
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

	ipi = produto.fieldByName('prd_ipi');
	icms = produto.fieldByName('prd_icms');

	informacoes = produto.fieldByName('prd_dados_tecnicos');
	composicao = produto.fieldByName('prd_dados_composicao');
	prazodeentrega = selecionaPrazo(produto.fieldByName('prd_data_inicio'), produto.fieldByName('prd_data_fim'));
	descricao = produto.fieldByName('prd_dados_descricao');
	codigodebarras = produto.fieldByName('prd_codigo_barra');

	$.referencia.text = "Referência\n" + produto.fieldByName('prd_referencia');
	$.nome.text = produto.fieldByName('prd_nome');
	$.colecao.text = "Coleção\n" + produto.fieldByName('prd_nome_colecao');
	$.preco.text = "Preço / Qtde\n" + formatCurrency(produto.fieldByName('minValor')) + " a " + formatCurrency(produto.fieldByName('maxValor'));

	var principal = getImagesFolder() + selectImagemPrincipal(prd_id);
	var file = Ti.Filesystem.getFile(principal);
	if (file) {
		if (!file.exists()) {
			principal = notfound;
		}
	} else {
		principal = notfound;
	}

	layout = "vertical";

	switch(template) {
	case 4:
	case 5:
	case 7:
		layout = "vertical";
		break;
	default:
		layout = "horizontal";
		break;
	}

	removeAllViews(scrollView);
	if (scroll)
		$.content.remove(scroll);

	scrollView = Ti.UI.createView({
		top : 10,
		left : 0,
		height : 'auto',
		width : 'auto',
		layout : layout,
	});

	scroll = Ti.UI.createScrollView({
		//height : 'auto',
		//width : 'auto',
		contentWidth : 'auto',
		contentHeight : 'auto',
		scrollType : layout,
		//layout : layout,
		showVerticalScrollIndicator : true,
		showHorizontalScrollIndicator : true
	});

	$.content.add(scroll);

	var variantesView;
	cores = [];
	tamanhos = [];
	coresid = [];
	tamanhosid = [];
	botoes = [];
	var index;

	var tmp = selectInformacaoProdutoByProduct(prd_id, ep_id);
	var infoprodutos = tmp;
	while (infoprodutos.isValidRow()) {
		var ifp_id = infoprodutos.fieldByName('ifp_id');
		var cor = infoprodutos.fieldByName('cor_nome');
		var corid = infoprodutos.fieldByName('cor_id');
		var tamanho = infoprodutos.fieldByName('tmh_nome');
		var tamanhoid = infoprodutos.fieldByName('tmh_id');

		index = cores.indexOf(cor);
		if (index < 0) {
			cores.push(cor);
			coresid.push(corid);
		}

		index = tamanhos.indexOf(tamanho);
		if (index < 0) {
			tamanhos.push(tamanho);
			tamanhosid.push(tamanhoid);
		}

		infoprodutos.next();
	}

	if (table)
		scrollView.remove(table);

	if (layout == "vertical") {
		imagemPrincipal = Titanium.UI.createImageView({
			left : 0,
			width : "98%",
			image : principal,
			borderColor : "#CDCDCD",
			borderWidth : "1"
		});
		scrollView.add(imagemPrincipal);
		center = (imagemPrincipal.toBlob().width - 70 - (tamanhos.length + 3) * 113) / 2;
		line = Titanium.UI.createView({
			top : 3,
			left : Math.round(center),
			height : "auto",
			layout : 'horizontal',
			width : '100%'
		});
		table = Titanium.UI.createView({
			height : "100%",
			layout : 'horizontal',
			width : 'auto'
		});
		variantesView = Titanium.UI.createView({
			height : "100%",
			width : 100,
			layout : layout,
		});

		var content_height = imagemPrincipal.toBlob().height + 5 + cores.length * 113;
		scrollView.height = content_height;
		scrollView.width = "100%";

		line.add(variantesView);
		line.add(table);
		scrollView.add(line);

		var variantes = Titanium.UI.createLabel({
			backgroundColor : "#008382",
			color : "white",
			width : "100%",
			text : "Variantes",
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
		});
		variantesView.add(variantes);

		for (var i = 0; i < cores.length; i++) {
			var img = getImagesFolder() + selectImagemVariantePrincipal(prd_id, coresid[i]);
			var file = Ti.Filesystem.getFile(img);
			if (file) {
				if (!file.exists()) {
					img = notfound;
				}
			} else {
				img = notfound;
			}

			var viewImagem = Titanium.UI.createView({
				height : 100,
				top : 3,
				borderColor : "#008382",
				borderWidth : "1"
			});

			var imagem = Titanium.UI.createImageView({
				backgroundColor : "white",
				width : "98%",
				image : img,
				corid : coresid[i]
			});
			imagem.addEventListener('click', function(e) {
				renderSmallImages(e.source.corid);
				setBigImage(e.source.image);
			});
			viewImagem.add(imagem);
			variantesView.add(viewImagem);
		}

		var total = Titanium.UI.createLabel({
			backgroundColor : "#008382",
			color : "white",
			width : "100%",
			top : 3,
			text : "TOTAL",
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
		});
		variantesView.add(total);
	} else {

		table = Titanium.UI.createView({
			height : "100%",
			layout : 'horizontal',
			width : 'auto'
		});
		imagemPrincipal = Titanium.UI.createImageView({
			image : principal,
			top : "0%",
			left : 0,
			height : "98%",
			borderColor : "#CDCDCD",
			borderWidth : "1"
		});
		scrollView.add(imagemPrincipal);

		center = (imagemPrincipal.toBlob().height - (cores.length) * 113) / 2;

		variantesView = Titanium.UI.createView({
			top : center,
			left : 3,
			layout : "vertical",
			height : "auto",
			width : 100
		});
		scrollView.add(variantesView);
		scrollView.add(table);
		var variantes = Titanium.UI.createLabel({
			backgroundColor : "#008382",
			color : "white",
			width : "100%",
			text : "Variantes",
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
		});
		variantesView.add(variantes);

		var content_width = imagemPrincipal.toBlob().width + 5 + (tamanhos.length + 2) * 103;
		scrollView.width = content_width;
		scrollView.height = "100%";

		for (var i = 0; i < cores.length; i++) {
			var img = getImagesFolder() + selectImagemVariantePrincipal(prd_id, coresid[i]);
			var file = Ti.Filesystem.getFile(img);
			if (file) {
				if (!file.exists()) {
					img = notfound;
				}
			} else {
				img = notfound;
			}
			var viewImagem = Titanium.UI.createView({
				height : 100,
				top : 3,
				borderColor : "#008382",
				borderWidth : "1"
			});

			var imagem = Titanium.UI.createImageView({
				backgroundColor : "white",
				width : "98%",
				image : img,
				corid : coresid[i]
			});
			imagem.addEventListener('click', function(e) {
				renderSmallImages(e.source.corid);
				setBigImage(e.source.image);
			});
			viewImagem.add(imagem);
			variantesView.add(viewImagem);
		}

		var total = Titanium.UI.createLabel({
			backgroundColor : "#008382",
			color : "white",
			width : "100%",
			top : 3,
			text : "TOTAL",
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
		});
		variantesView.add(total);
	}

	scroll.add(scrollView);
	renderTable();
	renderSmallImages(coresid[0]);
}

function renderSmallImages(corid) {
	var imagens = selectImagensPorVariante(prd_id, corid);
	removeAllViews($.imagens);

	var imgscroll = Ti.UI.createScrollView({
		height : '100%',
		contentWidth : 'auto',
		contentHeight : 'auto',
		scrollType : 'horizontal',
		layout : 'horizontal',
		showVerticalScrollIndicator : false,
		showHorizontalScrollIndicator : true
	});
	Ti.API.info('imagens.length=' + imagens.length);

	for (var i = 0; i < imagens.length; i++) {
		var imagem = Titanium.UI.createImageView({
			height : "65dp",
			image : getImagesFolder() + imagens[i],
			right : 3,
			borderColor : "#CDCDCD",
			borderWidth : "1"
		});
		imagem.addEventListener('click', function(e) {
			setBigImage(e.source.image);
		});
		imgscroll.add(imagem);
	}
	$.imagens.add(imgscroll);
}

function setBigImage(imagem) {
	imagemPrincipal.image = imagem;
}

function renderTable() {
	recalculateValues();
	removeAllViews(table);
	var altura = 0;
	if (layout == "horizontal") {
		altura = center;
	}
	var location = 0;
	for (var i = 0; i < tamanhos.length; i++) {
		var coluna = Titanium.UI.createView({
			top : altura,
			left : 3,
			layout : "vertical",
			height : "auto",
			width : 100
		});
		var tamanho = Titanium.UI.createLabel({
			backgroundColor : "#008382",
			color : "white",
			width : "100%",
			text : tamanhos[i],
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
		});
		coluna.add(tamanho);
		var quantidade_total = 0;
		for (var j = 0; j < cores.length; j++) {
			var info_prd = selectInformacaoProdutoByTamanhoCor(prd_id, tamanhosid[i], coresid[j]);
			if (info_prd.isValidRow()) {
				var preco_unitario = info_prd.fieldByName('ifp_valor_1');
				var carrinho = selectCarrinhoByProductTamanhoCor(prd_id, tamanhosid[i], coresid[j], fk_cli);
				var quantidade = 0;
				var valor = 0;
				if (carrinho[0] != 0) {
					quantidade = carrinho[1];
					quantidade_total = quantidade_total + quantidade;
				}
				if (porpreco)
					valor = formatCurrency(preco_unitario);
				else
					valor = quantidade;
				botoes[location] = Titanium.UI.createView({
					height : 100,
					tmh_id : tamanhosid[i],
					cor_id : coresid[j],
					ipi : ipi,
					top : 3,
					icms : icms,
					location : location,
					preco_unit : preco_unitario,
					borderColor : "#008382",
					borderWidth : "1"
				});

				valores[location] = Titanium.UI.createLabel({
					color : "#FF0000",
					width : "100%",
					top : 5,
					text : valor,
					textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
					tmh_id : tamanhosid[i],
					cor_id : coresid[j],
					location : location
				});
				botoes[location].add(valores[location]);

				estoques[location] = Titanium.UI.createLabel({
					color : "#008382",
					width : "100%",
					top : 45,
					text : info_prd.fieldByName('ifp_estoque_2') - quantidade,
					textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
					tmh_id : tamanhosid[i],
					cor_id : coresid[j],
					location : location
				});
				botoes[location].add(estoques[location]);

				var valor_minimo = Titanium.UI.createLabel({
					color : "#E98400",
					width : "100%",
					top : 65,
					text : "min. " + info_prd.fieldByName('ifp_qtde_minima'),
					textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
					tmh_id : tamanhosid[i],
					cor_id : coresid[j],
					location : location
				});
				botoes[location].add(valor_minimo);

				botoes[location].addEventListener('click', function(e) {
					selecionaItem(e.source);
				});
				coluna.add(botoes[location]);
				location++;
			}
		}
		var total = Titanium.UI.createLabel({
			backgroundColor : "#008382",
			color : "white",
			width : "100%",
			top : 3,
			text : quantidade_total,
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
		});
		coluna.add(total);
		table.add(coluna);
	}
	clearAllButtons();
}

function selecionaItem(item) {
	var location = item.location;
	var index = botoes_selecionados.indexOf(location);
	var view = botoes[location];
	if (index < 0) {
		view.backgroundColor = "#FFFF00";
		botoes_selecionados.push(location);
	} else {
		view.backgroundColor = "white";
		botoes_selecionados.splice(index, 1);
	}
}

function botaoOk() {
	if ($.tela.text == '') {
		alert('Digite a quantidade');
	} else {
		var quantidade = $.tela.text;
		if (sortido)
			valorSortido(quantidade);
		else
			valorPorQuantidade(quantidade);
	}
	$.tela.text = '';
	//recalculateValues();
	renderTable();
	//clearAllButtons();
}

function valorPorQuantidade(quantidade) {
	for (var i = 0; i < botoes_selecionados.length; i++) {
		var view = botoes[botoes_selecionados[i]];
		var estoque = estoques[botoes_selecionados[i]].text - quantidade;
		if (estoque < 0)
			estoque = 0;
		insertOrder(view.tmh_id, view.cor_id, quantidade, view.preco_unit, view.ipi, view.icms);
	}
	//renderTable();
}

function botaoSortir() {
	if (sortido) {
		sortido = false;
		$.sortido.backgroundGradient = {
			type : "linear",
			colors : ["#2c8f8e", "#206764"]
		};
	} else {
		sortido = true;
		$.sortido.backgroundGradient = {
			type : "linear",
			colors : ["#d9534f", "#e5302a"]
		};
	}
}

function valorSortido(quantidade) {
	var row = cores.length;
	var col = tamanhos.length;
	var valores = spread(row, col, quantidade);
	for (var i = 0; i < row; i++) {
		for (var j = 0; j < col; j++) {
			var fk_cores = coresid[i];
			var fk_tamanhos = tamanhosid[j];
			var product = selectProductById(prd_id, ep_id, tabelapreco);
			var car_quantidade = valores[i][j];
			var car_preco_unitario = product.fieldByName('minValor');
			var car_ipi = product.fieldByName('prd_ipi');
			var car_icms = product.fieldByName('prd_icms');
			insertOrder(fk_tamanhos, fk_cores, car_quantidade, car_preco_unitario, car_ipi, car_icms);
		}
	}
	renderTable();
}

function spread(row, col, value) {
	var result = [];
	for (var i = 0; i < row; i++) {
		result[i] = [];
		for (var j = 0; j < col; j++) {
			result[i][j] = 0;
		}
	}

	/* decide middle */
	var m1 = col / 2;
	//div
	var m2 = col % 2;
	//mod
	var middle1 = 0;
	var middle2 = 0;

	if (m2 == 1) {
		middle1 = m1 + m2;
	} else {
		middle1 = m1;
		middle2 = m1 + 1;
	}
	middle1--;
	middle2--;

	var mapper = [];
	var pointer = 0;

	if (middle1 > -1) {
		for (var i = 0; i < row; i++) {
			mapper[pointer] = i + "," + middle1;
			pointer++;
		}
	}
	if (middle2 > -1) {
		for (var i = 0; i < row; i++) {
			mapper[pointer] = i + "," + middle2;
			pointer++;
		}
	}
	pointer = 0;
	for (var i = 0; i < row; i++) {
		for (var j = 0; j < col; j++) {
			var newMap = i + "," + j;
			if (mapper.indexOf(newMap) < 0) {
				mapper[pointer] = newMap;
				pointer++;
			}
		}
	}

	/* distribute value */
	pointer = 0;
	for (var k = 0; k < value; k++) {
		var map = mapper[pointer].split(",");
		var val = result[map[0]][map[1]];
		val++;
		result[map[0]][map[1]] = val;
		pointer++;
		if (pointer == (row * col)) {
			pointer = 0;
		}
	}
	return result;
}

function insertOrder(fk_tamanhos, fk_cores, car_quantidade, car_preco_unitario, car_ipi, car_icms) {
	var carrinho = selectCarrinhoByProductTamanhoCor(prd_id, fk_tamanhos, fk_cores, fk_cli);
	var session = Ti.App.Properties.getString(SESSION_ID);
	var fk_usu = Ti.App.Properties.getString(CURRENT_USER_ID);
	if (carrinho[0] != 0) {
		var car_id = carrinho[0];
		var quantidade_atual = carrinho[1];
		var estoque = carrinho[2];
		var quantidade = 0;
		if (car_quantidade != 0)
		if (quantidade > estoque)
			quantidade = estoque;
		updateCarrinho(car_id, session, quantidade, 0, 0, 0, 0, 0);
	} else {
		insertCarrinho(session, car_quantidade, car_preco_unitario, car_ipi, car_icms, 0, 0, 0, 0, 0, fk_usu, prd_id, fk_tamanhos, fk_cores, fk_cli, ep_id);
	}
}

function recalculateValues() {
	quantidaderef = 0;
	valorref = 0;
	quantidadetotal = 0;
	valortotal = 0;
	var carrinho = selectallCarrinho();
	while (carrinho.isValidRow()) {
		if (carrinho.fieldByName('fk_produtos') == prd_id) {
			Ti.API.info('carrinho=' + carrinho.fieldByName('car_quantidade'));
			quantidaderef = quantidaderef + carrinho.fieldByName('car_quantidade');
			valorref = valorref + carrinho.fieldByName('car_quantidade') * carrinho.fieldByName('car_preco_unitario');
		}
		quantidadetotal = quantidadetotal + carrinho.fieldByName('car_quantidade');
		valortotal = valortotal + carrinho.fieldByName('car_quantidade') * carrinho.fieldByName('car_preco_unitario');
		carrinho.next();
	}
	$.pecasref.title = quantidaderef + '';
	$.valorref.title = formatCurrency(valorref);
	$.pecastotal.title = quantidadetotal + '';
	$.valortotal.title = formatCurrency(valortotal);
}

function clearAllButtons() {
	for (var i = 0; i < botoes_selecionados.length; i++) {
		var view = botoes[botoes_selecionados[i]];
		view.backgroundColor = "white";
	}
	botoes_selecionados = [];
}

function selecionaPrazo(inicio, fim) {
	return "De " + inicio + " à " + fim;
}

function goToCatalogo() {
	goTo('categorias');
}

function goToPedido() {

	if (quantidadetotal <= 0) {
		alert('Nenhum produto comprado!');
	} else if (valortotal < min_credito) {
		alert('Valor mínimo para compra é de ' + formatCurrency(min_credito));
	} else {
		goTo('carrinho');
	}
}

function informacoes() {
	alert(informacoes);
}

function composicao() {
	alert(composicao);
}

function precotroca() {
	if (porpreco)
		porpreco = false;
	else
		porpreco = true;
	renderTable();
}

function prazo() {
	alert(prazodeentrega);
}

function descricao() {
	alert(descricao);
}

function codbarras() {
	alert(codigodebarras);
}

function apaga() {
	var str = $.tela.text;
	if (str.length > 0) {
		$.tela.text = str.substring(0, str.length - 1);
	}
}

function botao1() {
	$.tela.text = $.tela.text + '1';
}

function botao2() {
	$.tela.text = $.tela.text + '2';
}

function botao3() {
	$.tela.text = $.tela.text + '3';
}

function botao4() {
	$.tela.text = $.tela.text + '4';
}

function botao5() {
	$.tela.text = $.tela.text + '5';
}

function botao6() {
	$.tela.text = $.tela.text + '6';
}

function botao7() {
	$.tela.text = $.tela.text + '7';
}

function botao8() {
	$.tela.text = $.tela.text + '8';
}

function botao9() {
	$.tela.text = $.tela.text + '9';
}

function botao0() {
	$.tela.text = $.tela.text + '0';
}

function botaoLimpa() {
	clearAllButtons();
	$.tela.text = '';
}

function botaoLista() {
	if (lista_visible) {
		$.produtos.animate({
			curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
			right : "-20%",
			duration : 200
		});
		lista_visible = false;
	} else {
		$.produtos.animate({
			curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
			right : 5,
			duration : 200
		});
		lista_visible = true;
	}
}

function fecharLista() {
	botaoLista();
}

function renderLista() {
	removeAllViews($.listaprodutos);
	var listscroll = Ti.UI.createScrollView({
		top : 10,
		left : 0,
		contentWidth : 'auto',
		contentHeight : 'auto',
		scrollType : 'vertical',
		layout : 'vertical',
		showVerticalScrollIndicator : true,
		showHorizontalScrollIndicator : true
	});
	var linha = Ti.UI.createView({
		width : "100%",
		layout : 'horizontal',
	});
	$.listaprodutos.add(listscroll);
	var linhas = 1;
	for (var i = 0; i < produtos.length; i++) {
		var coluna = Titanium.UI.createView({
			top : 5,
			left : 5,
			layout : "vertical",
			height : 140,
			width : "25%",
			prd_id : produtos[i]
		});
		var border = Titanium.UI.createView({
			layout : "vertical",
			height : "80%",
			width : "100%",
			borderColor : "#008382",
			borderWidth : "1",
			prd_id : produtos[i]
		});
		border.addEventListener('click', function(e) {
			current_page = produtos.indexOf(e.source.prd_id) + 1;
			renderProduct();
		});
		var imagem = Titanium.UI.createImageView({
			height : "60%",
			prd_id : produtos[i],
			image : getImagesFolder() + selectImagemPrincipal(produtos[i])
		});
		border.add(imagem);
		var remove = Titanium.UI.createButton({
			backgroundColor : 'transparent',
			width : "100%",
			image : '/images/apagar.png',
			prd_id : produtos[i]
		});
		coluna.add(border);
		coluna.add(remove);
		if (linhas > 3) {
			linhas = 1;
			listscroll.add(linha);
			linha = Ti.UI.createView({
				width : "100%",
				layout : 'horizontal',
			});
		} else {
			linha.add(coluna);
		}
		linhas++;
	}
	listscroll.add(linha);
}

function botaoZera() {
	for (var i = 0; i < botoes.length; i++) {
		var view = botoes[i];
		insertOrder(view.tmh_id, view.cor_id, 0, 0, 0, 0);
	}
	renderTable();
}

function botaoAnterior() {
	current_page--;
	if ((current_page) <= 0) {
		current_page = produtos.length;
	}
	renderProduct();
}

function botaoProximo() {
	current_page++;
	if (current_page > produtos.length) {
		current_page = 1;
	}
	renderProduct();
}
$.referencia.font = {fontSize: 15};
$.nome.font = {fontSize: 15};
$.colecao.font = {fontSize: 15};
$.informacoes.font = {fontSize: 15};
$.composicao.font = {fontSize: 15};
$.preco.font = {fontSize: 15};
$.prazo.font = {fontSize: 15};
$.descricao.font = {fontSize: 15};
$.codbarras.font = {fontSize: 15};
