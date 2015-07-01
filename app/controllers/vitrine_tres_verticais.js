Ti.include("/api/config.js");
Ti.include("/api/category_render.js");
Ti.include("/database/produtos.js");
Ti.include("/database/imagens_produtos.js");
var args = arguments[0] || {};
var marca = args.marca || 0;
var categoria = args.cat_id || 0;
var template = args.template || 0;
var current_page = 1;

var itemsperpage = 3;

var empresa = Ti.App.Properties.getString(CURRENT_EMPRESA);
var produtos = selectProductsCount(categoria, marca, empresa);
var paginas = Math.ceil(produtos / itemsperpage);

redimencionaVitrine($.vitrine);

renderProducts();

function renderProducts() {
	$.paginacao.title = current_page + "/" + paginas;

	var i = 0;
	var preco;
	var seleciona;
	var imagem;
	var imagens;
	var tempo;
	var referencia = "null";
	var start = (current_page - 1) * itemsperpage;
	var produtos = selectProductsByPage(empresa, marca, categoria, start, itemsperpage);

	$.gradeA.hide();
	$.gradeB.hide();
	$.gradeC.hide();

	while (produtos.isValidRow()) {
		switch(i) {
		case 0:
			$.gradeA.show();
			preco = $.precoA;
			tempo = $.tempoA;
			seleciona = $.selecionaA;
			imagem = $.imagemA;
			imagens = $.imagesA;
			break;
		case 1:
			$.gradeB.show();
			preco = $.precoB;
			tempo = $.tempoB;
			seleciona = $.selecionaB;
			imagem = $.imagemB;
			imagens = $.imagesB;
			break;
		case 2:
			$.gradeC.show();
			preco = $.precoC;
			tempo = $.tempoC;
			seleciona = $.selecionaC;
			imagem = $.imagemC;
			imagens = $.imagesC;
			break;
		}
		loadItems(template, produtos, referencia, preco, tempo, seleciona, imagem, imagens, $.quantidade);
		i++;
		produtos.next();
	}
	produtos.close();
}

function limpar() {
	var valores = ["sim","nao"];
	
	var exclui  = Ti.UI.createOptionDialog({
		options: valores,
		destructive: 2,
		cancel: 0,
		title: "Desmarcar iteins"
	});
	
	exclui.show();
	
	exclui.addEventListener("click", function(e){
		if(valores[e.index] == "sim"){
				categoryClear($.quantidade);
		} else {
			alert("Continue comprando");
		}
	
	});
}

function voltar() {
	categoryVoltar();
}

function anterior() {
	current_page--;
	if (current_page <= 0)
		current_page = paginas;
		cleanImages();
	renderProducts();
}

function proximo() {
	current_page++;
	if (current_page > paginas)
		current_page = 1;
		cleanImages();
	renderProducts();
}

function primeiro() {
	current_page = 1;
	cleanImages();
	renderProducts();
}

function ultimo() {
	current_page = paginas;
	cleanImages();
	renderProducts();
}

function cesta() {
	categoryCesta();
}

var eventListener = function() {
	Ti.App.removeEventListener('removeBitmap', eventListener);
	Ti.API.info('Tres Verticais');
	cleanImages();
};
Ti.App.addEventListener('removeBitmap', eventListener);

if(Ti.Platform.osname == "ipad"){
	
	
	$.botaoQuatroVerticais.font = {fontSize: 13};
	$.botaoQuatroVerticais.height = "63%";
	$.botaoQuatroVerticais.title = "Limpar marcações";
	$.botaoQuatroVerticais.textAlign = "center";
	
}