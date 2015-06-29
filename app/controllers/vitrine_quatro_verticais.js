	Ti.include("/api/config.js");
Ti.include("/api/category_render.js");
Ti.include("/database/produtos.js");
Ti.include("/database/imagens_produtos.js");
var args = arguments[0] || {};
var marca = args.marca || 0;
var categoria = args.cat_id || 0;
var template = args.template || 0;
var current_page = 1;

var itemsperpage = 4;

var empresa = Ti.App.Properties.getString(CURRENT_EMPRESA);
var produtos = selectProductsCount(categoria, marca, empresa);
var paginas = Math.ceil(produtos / itemsperpage);

redimencionaVitrine($.vitrine);

/*
if(Ti.Platform.osname == "android"){
	$.legendaA.height = "14%";
	$.legendaB.height = "14%";
	$.legendaC.height = "14%";
	$.legendaD.height = "14%";
	
	$.informacaoA.width = "40%";
	$.informacaoB.width = "40%";
	$.informacaoC.width = "40%";
	$.informacaoD.width = "40%";
	
	$.gradeA.width = "28%";
	$.gradeB.width = "28%";
	$.gradeC.width = "28%";
	$.gradeD.width = "28%";
}else{
	$.legendaA.height = "15%";
	$.legendaB.height = "15%";
	$.legendaC.height = "15%";
	$.legendaD.height = "15%";
	
	$.informacaoA.width = "45%";
	$.informacaoB.width = "45%";
	$.informacaoC.width = "45%";
	$.informacaoD.width = "45%";
}
*/

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
	$.gradeD.hide();

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
		case 3:
			$.gradeD.show();
			preco = $.precoD;
			tempo = $.tempoD;
			seleciona = $.selecionaD;
			imagem = $.imagemD;
			imagens = $.imagesD;
			break;
		}
		loadItems(template, produtos, referencia, preco, tempo, seleciona, imagem, imagens, $.quantidade);
		i++;
		produtos.next();
	}
	produtos.close();
}

function limpar() {
	categoryClear($.quantidade);
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
	Ti.API.info('Quatro verticais');
	cleanImages();
};
Ti.App.addEventListener('removeBitmap', eventListener);

if(Ti.Platform.osname == "ipad"){
	
	
	$.botaoQuatroVerticais.font = {fontSize: 13};
	$.botaoQuatroVerticais.height = "63%";
	$.botaoQuatroVerticais.title = "Limpar marcações";
	$.botaoQuatroVerticais.textAlign = "center";
	
}if(Ti.Platform.osname == "android"){
	
	
	$.botaoQuatroVerticais.font = {fontSize: 13};
	$.botaoQuatroVerticais.height = "63%";
	$.botaoQuatroVerticais.title = "Limpar marcações";
	$.botaoQuatroVerticais.textAlign = "center";
	
	$.gradeA.left = "1%";
	$.gradeA.width = "23%";
	
	$.gradeB.width = "23%";
	$.gradeC.width = "23%";
	$.gradeD.width = "23%";
	
}
