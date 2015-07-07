Ti.include("/database/produtos.js");
Ti.include("/database/carrinho.js");
var template = 0;
var imageViews = [];
// Ti.App.Properties.setString("globals_value", 0);
// Ti.App.Properties.setString("X", 0);
var cont = 0;
var teste = true;
// var cont = parseInt(Ti.App.Properties.getString("globals_value"));
function loadItems(tmpl, produtos, referencia, preco, tempo, seleciona, imagem, images, quantidade) {
	template = tmpl;
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

	var prd_id = produtos.fieldByName('prd_id');
	var prd_referencia = produtos.fieldByName('prd_referencia');
	var valor = produtos.fieldByName('ifp_valor_1');
	var prazo = produtos.fieldByName('prd_data_prazo');
	var datainicio = produtos.fieldByName('prd_data_inicio');
	var datafim = produtos.fieldByName('prd_data_fim');
	var limite = produtos.fieldByName('prd_data_limite');

	if (referencia == "null") {
		preco.text = "Ref. " + prd_referencia + "\n" + formatCurrency(valor);
	} else {
		preco.text = formatCurrency(valor);
		referencia.text = "Ref. " + prd_referencia;
	}

	tempo.title = selectPeriod(prazo, datainicio, datafim, limite);

	var principal = getImagesFolder() + selectImagemPrincipal(prd_id);
	var file = Ti.Filesystem.getFile(principal);
	if (file) {
		if (!file.exists()) {
			principal = notfound;
		}
	} else {
		principal = notfound;
	}

	imagem.image = principal;
	imageViews.push(imagem);

	if (template == 1) {
		var imgscroll = Ti.UI.createScrollView({
			width : '100%',
			contentWidth : 'auto',
			contentHeight : 'auto',
			scrollType : 'vertical',
			layout : 'vertical',
			showVerticalScrollIndicator : true,
			showHorizontalScrollIndicator : true
		});

		var img = Ti.UI.createImageView({
			width : "48%",
			left : 3,
			image : principal,
			principal : imagem
		});
		img.addEventListener('click', function(e) {
			e.source.principal.image = e.source.image;
		});
		imageViews.push(img);

		var line = Ti.UI.createView({
			width : "100%",
			height : img.toBlob().width,
			layout : 'horizontal'
		});

		line.add(img);
		var count = 1;
		var smallimgs = selectImagensProdutos(prd_id);
		for (var i = 0; i < smallimgs.length; i++) {
			var img = Ti.UI.createImageView({
				width : "48%",
				left : 3,
				image : scaleImage(getImagesFolder() + smallimgs[i]),
				principal : imagem
			});
			img.addEventListener('click', function(e) {
				e.source.principal.image = e.source.image;
			});
			imageViews.push(img);
			line.add(img);
			count++;
			if (count == 2) {
				count = 0;
				imgscroll.add(line);
				line = Ti.UI.createView({
					width : "100%",
					height : img.toBlob().width,
					layout : 'horizontal'
				});
			}
		}
		imgscroll.add(line);
		images.add(imgscroll);
	} else {
		var rowHeight = '100%';
		if (Ti.Platform.osname != "android") {
			rowHeight = '60dp';
			switch (template) {
			case 4:
				rowHeight = '60dp';
				seleciona.height = rowHeight;
				break;
			case 2:
				rowHeight = '90dp';
				break;
			case 3:
				rowHeight = '75dp';
				break;
			case 9:
				rowHeight = '75dp';
				break;
			}

		}
		var imgscroll = Ti.UI.createScrollView({
			height : rowHeight,
			contentWidth : 'auto',
			contentHeight : 'auto',
			scrollType : 'horizontal',
			layout : 'horizontal',
			showVerticalScrollIndicator : false,
			showHorizontalScrollIndicator : true
		});
		images.add(imgscroll);

		var img = Ti.UI.createImageView({
			height : rowHeight,
			left : 3,
			image : principal,
			principal : imagem
		});
		img.addEventListener('click', function(e) {
			e.source.principal.image = e.source.image;
		});
		imageViews.push(img);
		imgscroll.add(img);

		var smallimgs = selectImagensProdutos(prd_id);

		for (var i = 0; i < smallimgs.length; i++) {
			var img = Ti.UI.createImageView({
				height : rowHeight,
				left : 3,
				image : scaleImage(getImagesFolder() + smallimgs[i]),
				principal : imagem
			});
			img.addEventListener('click', function(e) {
				e.source.principal.image = e.source.image;
			});
			imageViews.push(img);
			imgscroll.add(img);
		}

	}
	//seleciona.width = seleciona.toBlob().height;

	
	// Ti.App.Properties.setString("globals_value", cont);
	
	if (checkSelectedProduct(prd_id) == "true"){
		seleciona.image = '/images/selecionar_vermelho.png';
	}else{
		seleciona.image = '/images/seleciona.png';
	}
	
	seleciona.prd_id = prd_id;
	
	//alert(JSON.stringify(seleciona));
	
	
	if(teste){
		seleciona.addEventListener('click', function(e) {
			teste = false;
			if (AddSelectedProduct(e.source.prd_id) == "true") {
				e.source.image = '/images/selecionar_vermelho.png';
				//seleciona.addEventListener('click', arguments.callee);
				// alert(arguments.callee);
			} 
			else {
				e.source.image = '/images/seleciona.png';
				//seleciona.removeEventListener('click', arguments.callee);
			}
			setSelected(quantidade);
			
		});
	}
	setSelected(quantidade);
}


function cleanImages() {
	if (Ti.Platform.osname == "android") {
		for (var i = 0; i < imageViews.length; i++) {
			imageViews[i].image = null;
			//imageViews[i].remove();
			//imageViews[i] = undefined;
		}
		imageViews = [];
	}
}

function scaleImage(imagePath) {
	/*height = 50;
	 width = 50;

	 var imageView = Ti.UI.createImageView({
	 image : imagePath,
	 width : width,
	 height : height
	 });

	 return imageView.toImage();*/
	return imagePath;
}

function resizeSmallImage(imagem) {
	var imageView = Titanium.UI.createImageView({
		image : imagem,
		width : 50,
		height : 50
	});

	imagem = imageView.toImage();
	return imagem;
}

function selectPeriod(prazo, datainicio, datafim, limite) {
	var fim = new Date(datafim);
	var hoje = new Date();
	var result;
	Ti.API.info('prazo=' + prazo);
	switch (prazo) {
	case "mensal":
		var tmp = new Date(fim.getYear(), fim.getMonth(), 0);
		var ultimodia = tmp.getDate();
		var hojedia = hoje.getDate();
		var falta = ultimodia - limite - hoje;
		if (falta <= 10) {
			if (falta == 0) {
				result = "Hj|M\n " + (hoje.getMonth() + 1) + "/" + hoje.getFullYear();
			} else if (falta < 0) {
				result = "M\n " + (hoje.getMonth() + 2) + "/" + hoje.getFullYear();
			} else {
				result = falta + "d|M\n " + (hoje.getMonth() + 1) + "/" + hoje.getFullYear();
			}
		} else {
			result = "M\n " + (hoje.getMonth() + 1) + "/" + hoje.getFullYear();
		}
		break;
	case "semanal":
		fim.setDate(fim.getDate() + limite);
		var ultimodia = getDayOfYear(fim);
		var hojedia = getDayOfYear(hoje);
		var falta = ultimodia - hojedia;
		if (falta <= 10) {
			if (falta == 0) {
				result = "Hj|S\n " + (getWeekOfYear(hoje) + Math.round(limite / 7)) + "/" + hoje.getFullYear();
			} else if (falta < 0) {
				result = "S\n " + ((getWeekOfYear(hoje) + Math.round(limite / 7)) + 1) + "/" + hoje.getFullYear();
			} else {
				result = falta + "d|S\n " + (getWeekOfYear(hoje) + Math.round(limite / 7)) + "/" + hoje.getFullYear();
			}
		} else {
			result = "S\n " + (getWeekOfYear(hoje) + Math.round(limite / 7)) + "/" + hoje.getFullYear();
		}
		break;
	case "quinzena":
		fim.setDate(fim.getDate() + limite);
		var ultimodia = getDayOfYear(fim);
		var hojedia = getDayOfYear(hoje);
		var falta = ultimodia - hojedia;
		if (falta <= 10) {
			if (falta == 0) {
				result = "Hj|Q\n " + Math.ceil((getDayOfYear(hoje) + 1) / 15) + "/" + hoje.getFullYear();
			} else if (falta < 0) {
				result = "Q\n " + (Math.ceil((getDayOfYear(hoje) + 1) / 15) + 2) + "/" + hoje.getFullYear();
			} else {
				result = falta + "d|Q\n " + Math.ceil((getDayOfYear(hoje) + 1) / 15) + "/" + hoje.getFullYear();
			}
		} else {
			result = "Q\n " + Math.ceil((getDayOfYear(hoje) + 1) / 15) + "/" + hoje.getFullYear();
		}
		break;
	}
	return result;
}

function setSelected(quantidade) {
	var products = getSelectedProducts();
	var selecionados = 0;
	if (products) {
		selecionados = products.length.toString();
	}
	quantidade.title = selecionados;
}

function categoryClear(quantidade) {
	cleanImages();
	resetCarrinho();
	Ti.App.Properties.setList(SELECTED_PRODUCTS, "");
	quantidade.title = "0";
	var login = Alloy.createController("categorias").getView();
	login.open({
		fullscreen : true,
		navBarHidden : true
	});
}

function categoryVoltar() {
	cleanImages();
	var login = Alloy.createController("seleciona_cliente").getView();
	login.open({
		fullscreen : true,
		navBarHidden : true
	});
}

function categoryCesta() {
	cleanImages();
	var produtos = Ti.App.Properties.getList(SELECTED_PRODUCTS);
	if (produtos) {
		if (produtos.length > 0) {
			var calculadora = Alloy.createController("calculadora").getView();
			calculadora.open({
				fullscreen : true,
				navBarHidden : true
			});

		} else
			alert('Selecione ao menos um produto para avançar');
	} else
		alert('Selecione ao menos um produto para avançar');
}

function listProdutos() {
	var produtos = Alloy.createController("lista_produtos").getView();
	produtos.open({
		fullscreen : true,
		navBarHidden : true
	});
}

function getDayOfYear(d) {// d is a Date object
	var yn = d.getFullYear();
	var mn = d.getMonth();
	var dn = d.getDate();
	var d1 = new Date(yn, 0, 1, 12, 0, 0);
	// noon on Jan. 1
	var d2 = new Date(yn, mn, dn, 12, 0, 0);
	// noon on input date
	var ddiff = Math.round((d2 - d1) / 864e5);
	return ddiff + 1;
}

function getWeekOfYear(d) {
	var day = getDayOfYear(d);
	var week = Math.ceil(day / 7);
	return week;
}