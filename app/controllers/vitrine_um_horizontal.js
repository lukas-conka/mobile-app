Ti.include("/api/config.js");
Ti.include("/api/category_render.js");
Ti.include("/database/produtos.js");
Ti.include("/database/imagens_produtos.js");
var args = arguments[0] || {};
var marca = args.marca || 0;
var categoria = args.cat_id || 0;
var template = args.template || 0;
var current_page = 1;

var itemsperpage = 1;

var empresa = Ti.App.Properties.getString(CURRENT_EMPRESA);
var produtos = selectProductsCount(categoria, marca, empresa);
var paginas = Math.ceil(produtos / itemsperpage);

//redimencionaVitrine($.vitrine);

renderProducts();

function loading() {
	var win = Ti.UI.createWindow({
		backgroundColor : 'gray',
		fullscreen : true
	});

	var style;
	if (Ti.Platform.name === 'iPhone OS') {
		style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	} else {
		style = Ti.UI.ActivityIndicatorStyle.DARK;
	}
	var activityIndicator = Ti.UI.createActivityIndicator({
		color : 'green',
		font : {
			fontFamily : 'Helvetica Neue',
			fontSize : 26,
			fontWeight : 'bold'
		},
		message : 'Loading...',
		style : style,
		top : 10,
		left : 10,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	win.add(activityIndicator);
	win.open();
	activityIndicator.show();
}

function renderProducts() {	
	$.paginacao.title = current_page + "/" + paginas;

	var i = 0;
	var preco;
	var seleciona;
	var imagem;
	var tempo;
	var referencia = "null";
	var start = (current_page - 1) * itemsperpage;
	var produtos = selectProductsByPage(empresa, marca, categoria, start, itemsperpage);

	$.gradeA.hide();
	// Ti.App.Properties.setString("aux", 0);
	while (produtos.isValidRow()) {
		switch(i) {
		case 0:
			$.gradeA.show();
			preco = $.precoA;
			tempo = $.tempoA;
			seleciona = $.selecionaA;
			referencia = $.referenciaA;
			imagem = $.imagemA;
			break;
		}
		loadItems(template, produtos, referencia, preco, tempo, seleciona, imagem, $.imagesA, $.quantidade);
		
		// var var_melo = parseInt(Ti.App.Properties.getString("aux"));
		//var_melo++;
		// Ti.App.Properties.setString("aux", var_melo);
		i++;
		produtos.next();
	}
	produtos.close();
}

function goToListaProdutos(){

	listProdutos();
}

function limpar() {
		var valores = ["sim","nao"];
	
	// if(Ti.Platform.osname == "android"){
		
		var exclui  = Ti.UI.createAlertDialog({
			//options: valores,
			buttonNames: ['Confirmar','Cancelar'],
			destructive: 2,
			title: "Desmarcar itens"
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

function test() {
	alert('chegou');
}

var eventListener = function() {
	Ti.App.removeEventListener('removeBitmap', eventListener);
	Ti.API.info('Um horizontal');
	cleanImages();
};
Ti.App.addEventListener('removeBitmap', eventListener);

if(Ti.Platform.osname == "ipad"){
	
	
	$.botaoQuatroVerticais.font = {fontSize: 13};
	$.botaoQuatroVerticais.height = "63%";
	$.botaoQuatroVerticais.title = "Limpar marcações";
	$.botaoQuatroVerticais.textAlign = "center";
	
}