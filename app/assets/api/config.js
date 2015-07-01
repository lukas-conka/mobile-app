// Versoes
var SOFTWARE_DB_VERSION = 7;
var SOFTWARE_VERSION = 0.1;
var TEST_VERSION = true;

var LOGIN = "LOGIN";
var SYNC = "SYNC";
var SELECTED_CLIENTS = "SELECTED_CLIENTS";
var SELECTED_PRODUCTS = "SELECTED_PRODUCTS";
var SELECTED_MARCA = "SELECTED_MARCA";
var SELECTED_CATEGORY = "SELECTED_CATEGORY";
var CURRENT_USER_ID = "CURRENT_USER_ID";
var CURRENT_USER_NAME = "CURRENT_USER_NAME";
var CURRENT_USER_EMAIL = "CURRENT_USER_EMAIL";
var CURRENT_EMPRESA = "CURRENT_EMPRESA";
var CURRENT_SOFTWARE = "CURRENT_SOFTWARE";
var DATABASE_VERSION = "DATABASE_VERSION";
var DATABASE_FILE = "DATABASE_FILE";
var SYNC_FILE = "SYNC_FILE";
var SESSION_ID = "SESSION_ID";
var SOBRE_PEDIDO = "SOBRE_PEDIDO";

var URL_BASE = "http://marcas.e-catalogos.net";
//var URL_BASE = "http://integracao.net-pedido.com";
var URL_CAMINHO_IMAGENS = "http://marcasedmin.e-catalogos.net/module/edmin/View/fotos/";
//var URL_CAMINHO_IMAGENS = "http://integracaoedmin.net-pedido.com/module/edmin/View/fotos/";

var URL_HORA_DATA = URL_BASE + "/Loja/jsonHoraData/";
var URL_LOGIN = URL_BASE + "/Loja/jsonAcessaRepresentante";
var URL_SYNC = URL_BASE + "/Loja/jsonSincroniza";
var URL_DATAS = URL_BASE + "/Loja/jsonConsultaData_pagamento/";
var URL_PRAZO_MEDIO = URL_BASE + "/Loja/jsonConsultaPrazo_medio/";
var URL_ESTADOS = URL_BASE + "/Loja/jsonConsultaEstados/";
var URL_PRECO_ESTADOS = URL_BASE + "/Loja/jsonConsultaPreco_estado/";
var URL_CATEGORIAS = URL_BASE + "/Loja/jsonConsultaCategoria/";
var URL_PRODUTOS = URL_BASE + "/Loja/jsonConsultaProduto/";
var URL_COR = URL_BASE + "/Loja/jsonConsultaCores/";
var URL_MARCAS = URL_BASE + "/Loja/jsonConsultaMarcas/";
var URL_TAMANHO = URL_BASE + "/Loja/jsonConsultaTamanho/";
var URL_DESCONTO = URL_BASE + "/Loja/jsonConsultaDesconto/";
var URL_DESCONTO_VOLUME = URL_BASE + "/Loja/jsonConsultaDesconto_volume/";
var URL_CLIENTES = URL_BASE + "/Loja/jsonConsultaCliente/";
var URL_GRUPO_CLIENTE = URL_BASE + "/Loja/jsonConsultaGrupo_cliente/";
var URL_REPRESENTANTE = URL_BASE + "/Loja/jsonConsultaRepresentante/";
var URL_REPRESENTANTE_MARCA = URL_BASE + "/Loja/jsonConsultaRepresentanteMarca/";
var URL_REPRESENTANTE_CLIENTE = URL_BASE + "/Loja/jsonConsultaRepresentante_cliente/";
var URL_EMAIL = URL_BASE + "/Loja/jsonConsultaEmail/";
var URL_REFERENCIA_COMERCIAL = URL_BASE + "/Loja/jsonConsultaReferencia_comercial/";
var URL_REFERENCIA_BANCO = URL_BASE + "/Loja/jsonConsultaReferencia_banco/";
var URL_APARENCIA = URL_BASE + "/Loja/jsonConsultaAparencia/";
var URL_CATEGORIAS_MARCA = URL_BASE + "/Loja/jsonConsultaCategoriasMarca/";
var URL_CLIENTE_MARCA = URL_BASE + "/Loja/jsonConsultaClienteMarca/";
var URL_IMAGENS_PRODUTOS = URL_BASE + "/Loja/jsonConsultaImagem_produto/";
var URL_INFORMACAO_PRODUTO = URL_BASE + "/Loja/jsonConsultaInformacao_produto/";
var URL_PERGUNTA = URL_BASE + "/Loja/jsonConsultaPergunta/";
var URL_NOTIFICACAO = URL_BASE + "/Loja/jsonConsultaNotificacao/";
var URL_PEDIDO = URL_BASE + "/Loja/jsonConsultaPedido/";
var URL_CARRINHO_PEDIDO = URL_BASE + "/Loja/jsonConsultaCarrinho_pedido/";
var URL_VIDEO = URL_BASE + "/Loja/jsonConsultaVideo/";

function getSelectedClients() {
	var clientes = Ti.App.Properties.getList(SELECTED_CLIENTS);
	return clientes;
}

function getSelectedProducts() {
	var tmp = Ti.App.Properties.getList(SELECTED_PRODUCTS);
	return tmp;
}

function checkSelectedProduct(id) {
	var products = [];
	var result = "true";
	if (Ti.App.Properties.getList(SELECTED_PRODUCTS)) {
		var products = Ti.App.Properties.getList(SELECTED_PRODUCTS);
	}
	var index = products.indexOf(id);
	if (index > 0) {
		result = "true";
	} else {
		result = "false";
	}
	return result;
}

//AddSelectedProduct("true");
Ti.App.Properties.setString("marca", 0);

function AddSelectedProduct(id) {
	
	var products = [];
	if (Ti.App.Properties.getList(SELECTED_PRODUCTS)) {
		var products = Ti.App.Properties.getList(SELECTED_PRODUCTS);
	}
<<<<<<< HEAD
	if (checkSelectedProduct(id) == "false" && parseInt(Ti.App.Properties.getString("marca"))) {
=======
	var result = "false";
	if (checkSelectedProduct(id) == "false") {
>>>>>>> d3e31c3f60a98ee403c4d100e859ff7ada05e007
		products.push(id);
		result = "true";
	} else {
		var marca2 = parseInt(Ti.App.Properties.getString("marca"));
		Ti.App.Properties.setString("marca", marca2 + 1);
		var index = products.indexOf(id);
<<<<<<< HEAD
		//products.slice(index, 1);
		products.splice(index, 1);
=======
<<<<<<< HEAD
		products.splice(index, 1);
=======
		products.slice(index, 0);
		//products.splice(inde, 1);
>>>>>>> 1ef0c9ecadc18894883c55e9831fe72080f3b589
>>>>>>> d3e31c3f60a98ee403c4d100e859ff7ada05e007
		result = "false";
	}
	Ti.App.Properties.setList(SELECTED_PRODUCTS, products);
	return result;
<<<<<<< HEAD
			
}	

	
=======
}

>>>>>>> d3e31c3f60a98ee403c4d100e859ff7ada05e007
function addSelectedClients(cliente) {
	if (Ti.App.Properties.getList(SELECTED_CLIENTS)) {
		var conjunto = Ti.App.Properties.getList(SELECTED_CLIENTS);
		var uso = false;
		var total = 0;

		for (var quantidade = 0; quantidade < conjunto.length; quantidade++) {
			if (conjunto[quantidade] == cliente) {
				uso = true;
			}
			total++;
		}

		if (total == 0) {
			if (Ti.App.Properties.getString(CURRENT_SOFTWARE) != 3) {
				var clientes = [cliente];
				Ti.App.Properties.setList(SELECTED_CLIENTS, clientes);
				return "amarelo";
			} else {
				if (Ti.App.Properties.getString(CURRENT_SOFTWARE) != 2) {
					var clientes = [cliente];
					Ti.App.Properties.setList(SELECTED_CLIENTS, clientes);
					return "vermelho";
				}
			}
		} else {
			if (uso == false) {
				if (Ti.App.Properties.getString(CURRENT_SOFTWARE) != 2) {
					var clientes = Ti.App.Properties.getList(SELECTED_CLIENTS);
					clientes.push(cliente);
					Ti.App.Properties.setList(SELECTED_CLIENTS, clientes);
					return "vermelho";
				}
			}
		}

	} else {
		if (Ti.App.Properties.getString(CURRENT_SOFTWARE) != 3) {
			var clientes = [cliente];
			Ti.App.Properties.setList(SELECTED_CLIENTS, clientes);
			return "amarelo";
		} else {
			if (Ti.App.Properties.getString(CURRENT_SOFTWARE) != 2) {
				var clientes = [cliente];
				Ti.App.Properties.setList(SELECTED_CLIENTS, clientes);
				return "vermelho";
			}
		}
	}
}


function delSelectedClients(cliente) {

	var conjunto = Ti.App.Properties.getList(SELECTED_CLIENTS);
	var posicao = conjunto.indexOf(cliente);
	conjunto.splice(posicao, 1);

	Ti.App.Properties.setList(SELECTED_CLIENTS, conjunto);

}

function redimencionaVitrine(vitrine) {
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
<<<<<<< HEAD
		alturaTela -210;
		larguraTela -250;
=======
		alturaTela -550;
		larguraTela -1024;
>>>>>>> d3e31c3f60a98ee403c4d100e859ff7ada05e007
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

function getImagesFolder() {
	var rootdir;
	if (Ti.Platform.osname == "android") {
		rootdir = Ti.Filesystem.externalStorageDirectory;
	} else {
		rootdir = Ti.Filesystem.applicationDataDirectory;
	}
	return rootdir;
}

function formatCurrency(int) {
	int = int * 100;

	var tmp = int.toFixed(0) + '';
	var neg = false;
	if (tmp.indexOf("-") == 0) {
		neg = true;
		tmp = tmp.replace("-", "");
	}

	if (tmp.length == 1)
		tmp = "0" + tmp;

	tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
	if (tmp.length > 6)
		tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

	if (tmp.length > 9)
		tmp = tmp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2,$3");

	if (tmp.length > 12)
		tmp = tmp.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2.$3,$4");

	if (tmp.indexOf(".") == 0)
		tmp = tmp.replace(".", "");
	if (tmp.indexOf(",") == 0)
		tmp = tmp.replace(",", "0,");

	return ( neg ? 'R$ -' + tmp : "R$ " + tmp);
}

function goTo(location) {
	var load = Alloy.createController(location).getView();
	load.open({
		fullscreen : true,
		navBarHidden : true
	});
}

function getMonth(month) {
	var meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
	if (month < 1)
		month = 1;
	return meses[month - 1];
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

function removeAllViews(view) {
	if (view && view.children != undefined) {
		var removeData = [];
		for ( i = view.children.length; i > 0; i--) {
			removeData.push(view.children[i - 1]);
		};

		for ( i = 0; i < removeData.length; i++) {
			view.remove(removeData[i]);
		}
		removeData = null;
	};
}

function resetSession() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 20; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	Ti.App.Properties.setString(SESSION_ID, text);
	Ti.App.Properties.getString(SESSION_ID);
}

function checkdecimal(value) {
	var text = '';
	if (value < 10) {
		text = '0' + value;
	} else
		text = value;
	return text;
}
