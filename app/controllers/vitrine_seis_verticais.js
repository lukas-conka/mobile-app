Ti.include("/api/config.js");
Ti.include("/api/category_render.js");
Ti.include("/database/produtos.js");
Ti.include("/database/imagens_produtos.js");
var args = arguments[0] || {};
var marca = args.marca || 0;
var categoria = args.cat_id || 0;
var template = args.template || 0;
var current_page = 1;

var itemsperpage = 6;

var empresa = Ti.App.Properties.getString(CURRENT_EMPRESA);
var produtos = selectProductsCount(categoria, marca, empresa);
var paginas = Math.ceil(produtos / itemsperpage);

redimencionaVitrineSeis($.vitrine);

function redimencionaVitrineSeis(vitrine) {
	var ALTURA_PADRAO = 710;
	var LARGURA_PADRAO = 1260;
	/*
	 var alturaTela = dipUnitsToPixels(Ti.Platform.displayCaps.ydpi);
	 var larguraTela = dipUnitsToPixels(Ti.Platform.displayCaps.xdpi);
	 */

	var alturaTela = 730;
	var larguraTela = 1280;
	if (Ti.Platform.osname != "android") {
		alturaTela = alturaTela - 100;
		larguraTela = larguraTela - 100;
	} else {

		alturaTela -250;
		larguraTela -250;
	}

	var alturaView = Math.round(alturaTela * 0.9);
	var larguraView = Math.round(LARGURA_PADRAO * alturaView / ALTURA_PADRAO);

	if (larguraView < larguraTela) {
		vitrine.width = larguraView;
		vitrine.height = alturaView;
		//alert('largura' + larguraView + ", width: " + v.size.width + ", height: " + v.size.height);
	} else {
		alturaView = Math.round(ALTURA_PADRAO * larguraTela / LARGURA_PADRAO);
		vitrine.width = larguraTela;
		vitrine.height = alturaView;
		//alert('largura' + alturaView + ", width: " + larguraTela + ", height: " + alturaTela);
	}
}



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
	$.gradeE.hide();
	$.gradeF.hide();

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
		case 4:
			$.gradeE.show();
			preco = $.precoE;
			tempo = $.tempoE;
			seleciona = $.selecionaE;
			imagem = $.imagemE;
			imagens = $.imagesE;
			break;
		case 5:
			$.gradeF.show();
			preco = $.precoF;
			tempo = $.tempoF;
			seleciona = $.selecionaF;
			imagem = $.imagemF;
			imagens = $.imagesF;
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
	
	// if(Ti.Platform.osname == "android"){
		
		var exclui  = Ti.UI.createAlertDialog({
			//options: valores,
			buttonNames: ['Confirmar','Cancelar'],
			destructive: 2,
			title: "Desmarcar itens",
			message: "Essa opcao ira desmarcar todos os itens selecionados em todas as paginas!"
		});
		
		exclui.show();
		
		exclui.addEventListener("click", function(e){
			if(e.index == 0){
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
	Ti.API.info('Seis Verticais');
	cleanImages();
};
Ti.App.addEventListener('removeBitmap', eventListener);

if(Ti.Platform.osname == "ipad"){
	
	
	$.botaoQuatroVerticais.font = {fontSize: 13};
	$.botaoQuatroVerticais.height = "63%";
	$.botaoQuatroVerticais.title = "Limpar marcações";
	$.botaoQuatroVerticais.textAlign = "center";
	
}
/*($.informacaoA.font = {fontSize: 7};
$.informacaoB.font = {fontSize: 7};
$.informacaoC.font = {fontSize: 7};
$.informacaoD.font = {fontSize: 7};
$.informacaoE.font = {fontSize: 7};
$.informacaoF.font = {fontSize: 7};
*/