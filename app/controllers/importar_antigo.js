var args = arguments[0] || {};
// Chama as funcoes do banco
Ti.include("/api/config.js");
Ti.include("/database/datas.js");
Ti.include("/database/prazo_medio.js");
Ti.include("/database/estados.js");
Ti.include("/database/preco_estados.js");
Ti.include("/database/categorias.js");
Ti.include("/database/produtos.js");
Ti.include("/database/cor.js");
Ti.include("/database/marcas.js");
Ti.include("/database/tamanho.js");
Ti.include("/database/desconto.js");
Ti.include("/database/desconto_volume.js");
Ti.include("/database/clientes.js");
Ti.include("/database/grupo_cliente.js");
Ti.include("/database/representante.js");
Ti.include("/database/representante_marca.js");
Ti.include("/database/representante_cliente.js");
Ti.include("/database/email.js");
Ti.include("/database/referencia_comercial.js");
Ti.include("/database/referencia_banco.js");
Ti.include("/database/categoriasmarca.js");
Ti.include("/database/clientemarca.js");
Ti.include("/database/aparencia.js");
Ti.include("/database/imagens_produtos.js");
Ti.include("/database/informacao_produto.js");
Ti.include("/database/pergunta.js");
Ti.include("/database/notificacao.js");
Ti.include("/database/pedido.js");
//Ti.include("/database/carrinho.js");
Ti.include("/database/carrinho_pedido.js");
Ti.include("/database/video.js");

function goToImgDownload() {
	$.activityIndicator.hide();
	var login = Alloy.createController("baixar_imagens").getView();
	login.open({
		fullscreen : true,
		navBarHidden : true,
		keepScreenOn : true
	});
}

var xhrRequest = [];
var xhrCount = 0;

var GET_DATAS = 0;
var GET_PRAZO_MEDIO = 1;
var GET_ESTADOS = 2;
var GET_PRECO_ESTADOS = 3;
var GET_CATEGORIAS = 4;
var GET_PRODUTOS = 5;
var GET_COR = 6;
var GET_MARCAS = 7;
var GET_TAMANHO = 8;
var GET_DESCONTO = 9;
var GET_DESCONTO_VOLUME = 10;
var GET_CLIENTES = 11;
var GET_GRUPO_CLIENTE = 12;
var GET_REPRESENTANTE = 13;
var GET_REPRESENTANTE_MARCA = 14;
var GET_REPRESENTANTE_CLIENTE = 15;
var GET_EMAIL = 16;
var GET_REFERENCIA_COMERCIAL = 17;
var GET_REFERENCIA_BANCO = 18;
var GET_INFORMACAO_PRODUTO = 19;
var GET_CATEGORIAS_MARCA = 20;
var GET_CLIENTE_MARCA = 21;
var GET_APARENCIA = 22;
var GET_IMAGENS_PRODUTOS = 23;
var GET_NOTIFICACAO = 24;
var GET_PERGUNTA = 25;
var GET_VIDEO = 26;
var GET_CARRINHO = 27;
var GET_CARRINHO_PEDIDO = 28;
var GET_PEDIDO = 29;
var GO_IMG_DOWNLOAD = 30;

function getUrl() {
	var url = "";
	switch(xhrCount) {
	case GET_DATAS:
		url = URL_DATAS + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Prazos...");
		break;
	case GET_PRAZO_MEDIO:
		url = URL_PRAZO_MEDIO + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Prazos...");
		break;
	case GET_ESTADOS:
		url = URL_ESTADOS + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Estados...");
		break;
	case GET_PRECO_ESTADOS:
		url = URL_PRECO_ESTADOS + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Estados...");
		break;
	case GET_CATEGORIAS:
		url = URL_CATEGORIAS + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Categorias...");
		break;
	case GET_PRODUTOS:
		url = URL_PRODUTOS + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Produtos...");
		break;
	case GET_COR:
		url = URL_COR + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Cores...");
		break;
	case GET_TAMANHO:
		url = URL_TAMANHO + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Tamanhos...");
		break;
	case GET_MARCAS:
		url = URL_MARCAS + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Marcas...");
		break;
	case GET_DESCONTO:
		url = URL_DESCONTO + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Descontos...");
		break;
	case GET_DESCONTO_VOLUME:
		url = URL_DESCONTO_VOLUME + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Descontos...");
		break;
	case GET_CLIENTES:
		url = URL_CLIENTES + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Clientes...");
		break;
	case GET_GRUPO_CLIENTE:
		url = URL_GRUPO_CLIENTE + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Clientes...");
		break;
	case GET_REPRESENTANTE:
		url = URL_REPRESENTANTE + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Representante...");
		break;
	case GET_REPRESENTANTE_MARCA:
		url = URL_REPRESENTANTE_MARCA + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Representante...");
		break;
	case GET_REPRESENTANTE_CLIENTE:
		url = URL_REPRESENTANTE_CLIENTE + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Representante...");
		break;
	case GET_EMAIL:
		url = URL_EMAIL + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Contatos...");
		break;
	case GET_REFERENCIA_COMERCIAL:
		url = URL_REFERENCIA_COMERCIAL + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Referências Comerciais...");
		break;
	case GET_REFERENCIA_BANCO:
		url = URL_REFERENCIA_BANCO + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Referências Bancárias...");
		break;
	case GET_APARENCIA:
		url = URL_APARENCIA + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Aparencia...");
		break;
	case GET_CATEGORIAS_MARCA:
		url = URL_CATEGORIAS_MARCA + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Marcas...");
		break;
	case GET_CLIENTE_MARCA:
		url = URL_CLIENTE_MARCA + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Marcas...");
		break;
	case GET_IMAGENS_PRODUTOS:
		url = URL_IMAGENS_PRODUTOS + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Imagens...");
		break;
	case GET_INFORMACAO_PRODUTO:
		url = URL_INFORMACAO_PRODUTO + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Informações dos Produtos...");
		break;
	case GET_PERGUNTA:
		url = URL_PERGUNTA + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Notificações...");
		break;
	case GET_NOTIFICACAO:
		url = URL_NOTIFICACAO + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Notificações...");
		break;
	case GET_PEDIDO:
		url = URL_PEDIDO + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Pedidos...");
		break;
	case GET_CARRINHO:
		url = URL_HORA_DATA + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Pedidos...");
		break;
	case GET_CARRINHO_PEDIDO:
		url = URL_CARRINHO_PEDIDO + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Pedidos...");
		break;
	case GET_VIDEO:
		url = URL_VIDEO + Ti.App.Properties.getString(CURRENT_EMPRESA);
		$.activityIndicator.setMessage("Sincronizando Videos...");
		break;
	}
	Ti.API.info('URL=' + url);
	return url;
}

function processData(output) {
	switch(xhrCount) {
	case GET_DATAS:
		try {
			processDatas(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_PRAZO_MEDIO:
		try {
			processPrazoMedio(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_ESTADOS:
		try {
			processEstados(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_PRECO_ESTADOS:
		try {
			processPrecoEstados(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_CATEGORIAS:
		try {
			processCategorias(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_PRODUTOS:
		try {
			processProdutos(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_COR:
		try {
			processCor(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_MARCAS:
		try {
			processMarcas(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_TAMANHO:
		try {
			processTamanho(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_DESCONTO:
		try {
			processDesconto(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_DESCONTO_VOLUME:
		try {
			processDescontoVolume(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_CLIENTES:
		try {
			processClientes(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_GRUPO_CLIENTE:
		try {
			processGrupoCliente(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_REPRESENTANTE:
		try {
			processRepresentante(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_REPRESENTANTE_MARCA:
		try {
			processRepresentanteMarca(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_REPRESENTANTE_CLIENTE:
		try {
			processRepresentanteCliente(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_EMAIL:
		try {
			processEmail(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_REFERENCIA_COMERCIAL:
		try {
			processReferenciaComercial(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_REFERENCIA_BANCO:
		try {
			processReferenciaBanco(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_INFORMACAO_PRODUTO:
		try {
			processInformacaoProduto(output);
		} catch (e) {
			issueSyncError();
		}
	case GET_CATEGORIAS_MARCA:
		try {
			processCategoriasMarca(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_CLIENTE_MARCA:
		try {
			processClienteMarca(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_APARENCIA:
		try {
			processAparencia(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_IMAGENS_PRODUTOS:
		try {
			processImagensProdutos(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_PERGUNTA:
		try {
			processPergunta(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_NOTIFICACAO:
		try {
			processNotificacao(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_PEDIDO:
		try {
			processPedido(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_CARRINHO_PEDIDO:
		try {
			processCarrinhoPedido(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_CARRINHO:
		try {
			processCarrinho(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	case GET_VIDEO:
		try {
			processVideo(output);
		} catch(e) {
			issueSyncError();
		};
		break;
	}
	xhrCount++;
	loadthenexRequest();
}

function retrieveData() {
	var url = getUrl();

	xhrRequest[xhrCount] = Ti.Network.createHTTPClient({
		timeout : 5000
	});

	xhrRequest[xhrCount].onerror = function() {
		xhrRequest[xhrCount] = null;
		issueSyncError();
	};

	xhrRequest[xhrCount].onload = function() {
		processData(this.responseText);
	};

	try {
		xhrRequest[xhrCount].open('GET', url);
		xhrRequest[xhrCount].send();
	} catch(e) {
		xhrRequest[xhrCount] = null;
		issueSyncError();
	};

};

function loadthenexRequest() {
	if (xhrCount >= GO_IMG_DOWNLOAD) {
		$.activityIndicator.setMessage("Iniciando Download das Imagens...");
		verifyImages();
	} else {
		retrieveData();
	};
}

function verifyImages() {
	var rootDir = getImagesFolder();
	var images = selectallImagensProdutos();
	var totalimages = 0;
	while (images.isValidRow()) {
		var img_tmp = images.fieldByName('img_caminho');
		var img_caminho = img_tmp.replace(/ /g, "%20");
		var dest = Ti.Filesystem.getFile(rootDir, img_caminho);
		if (!dest.exists()) {
			totalimages++;
		}
		images.next();
	}
	//images.close();

	var aparencias = selectallAparencia();
	while (aparencias.isValidRow()) {
		var img_tmp = aparencias.fieldByName('apr_arquivo');
		Ti.API.info(img_tmp);
		var img_caminho = img_tmp.replace(/ /g, "%20");
		var dest = Ti.Filesystem.getFile(rootDir, img_caminho);
		if (!dest.exists()) {
			totalimages++;
		}
		aparencias.next();
	}
	//aparencias.close();
	if (totalimages > 0) {
		goToImgDownload();
	} else {
		goToClient();
	}
}

function goToClient() {
	$.activityIndicator.setMessage("Download de imagens concluido");
	Ti.API.info("totalimages");
	var login = Alloy.createController("seleciona_cliente").getView();
	login.open({
		fullscreen : true,
		navBarHidden : true
	});
}

function showIndicator(e) {
	$.activityIndicator.show();
	loadthenexRequest();
}

function issueSyncError() {
	xhrRequest[xhrCount] = null;
	xhrCount = -99;
	var alert = Titanium.UI.createAlertDialog({
		title : 'Erro',
		message : 'Falha ao sincronizar!',
		buttonNames : ['Ok'],
		cancel : 0
	});
	alert.addEventListener('click', function(e) {
		goToIndex();
	});
	alert.show();
}

function goToIndex() {
	var login = Alloy.createController("index").getView();
	login.open({
		fullscreen : true,
		navBarHidden : true
	});
}