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

redimencionaVitrine($.vitrine);


if(Ti.Platform.osname == "android"){
	$.legendaA.height = "13%";
	$.legendaB.height = "13%";
	$.legendaC.height = "13%";
	$.legendaD.height = "13%";
	$.legendaE.height = "13%";
	
	$.informacaoA.width = "45%";
	$.informacaoB.width = "45%";
	$.informacaoC.width = "45%";
	$.informacaoD.width = "45%";
	$.informacaoE.width = "45%";
}else{
	$.legendaA.height = "14%";
	$.legendaB.height = "14%";
	$.legendaC.height = "14%";
	$.legendaD.height = "14%";
	$.legendaE.height = "14%";
	
	$.informacaoA.width = "50%";
	$.informacaoB.width = "50%";
	$.informacaoC.width = "50%";
	$.informacaoD.width = "50%";
	$.informacaoE.width = "50%";
}


renderProducts();

function renderProducts() {
	Ti.API.info('Render um verticais');
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
					//permanecer(); quem eh permanecer felipe??
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

function buscaProduto(){
	
}

function cesta() {
	categoryCesta();
}
var eventListener = function() {
	Ti.App.removeEventListener('removeBitmap', eventListener);
	Ti.API.info('Cinco verticais');
	cleanImages();
};
Ti.App.addEventListener('removeBitmap', eventListener);

if(Ti.Platform.osname == "ipad"){
	
	
	$.botaoQuatroVerticais.font = {fontSize: 13};
	$.botaoQuatroVerticais.height = "63%";
	$.botaoQuatroVerticais.title = "Limpar marcações";
	$.botaoQuatroVerticais.textAlign = "center";
	
}