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
    var result = "false";
    if (Ti.App.Properties.getList(SELECTED_PRODUCTS)) var products = Ti.App.Properties.getList(SELECTED_PRODUCTS);
    var index = products.indexOf(id);
    result = index >= 0 ? "true" : "false";
    return result;
}

function AddSelectedProduct(id) {
    var products = [];
    if (Ti.App.Properties.getList(SELECTED_PRODUCTS)) var products = Ti.App.Properties.getList(SELECTED_PRODUCTS);
    var result = "false";
    if ("false" == checkSelectedProduct(id)) {
        products.push(id);
        result = "true";
    } else {
        var index = products.indexOf(id);
        products.splice(index, 1);
        result = "false";
    }
    Ti.App.Properties.setList(SELECTED_PRODUCTS, products);
    return result;
}

function addSelectedClients(cliente) {
    if (Ti.App.Properties.getList(SELECTED_CLIENTS)) {
        var conjunto = Ti.App.Properties.getList(SELECTED_CLIENTS);
        var uso = false;
        var total = 0;
        for (var quantidade = 0; quantidade < conjunto.length; quantidade++) {
            conjunto[quantidade] == cliente && (uso = true);
            total++;
        }
        if (0 == total) {
            if (3 != Ti.App.Properties.getString(CURRENT_SOFTWARE)) {
                var clientes = [ cliente ];
                Ti.App.Properties.setList(SELECTED_CLIENTS, clientes);
                return "amarelo";
            }
            if (2 != Ti.App.Properties.getString(CURRENT_SOFTWARE)) {
                var clientes = [ cliente ];
                Ti.App.Properties.setList(SELECTED_CLIENTS, clientes);
                return "vermelho";
            }
        } else if (false == uso && 2 != Ti.App.Properties.getString(CURRENT_SOFTWARE)) {
            var clientes = Ti.App.Properties.getList(SELECTED_CLIENTS);
            clientes.push(cliente);
            Ti.App.Properties.setList(SELECTED_CLIENTS, clientes);
            return "vermelho";
        }
    } else {
        if (3 != Ti.App.Properties.getString(CURRENT_SOFTWARE)) {
            var clientes = [ cliente ];
            Ti.App.Properties.setList(SELECTED_CLIENTS, clientes);
            return "amarelo";
        }
        if (2 != Ti.App.Properties.getString(CURRENT_SOFTWARE)) {
            var clientes = [ cliente ];
            Ti.App.Properties.setList(SELECTED_CLIENTS, clientes);
            return "vermelho";
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
    var alturaTela = 730;
    var larguraTela = 1280;
    alturaTela = 550;
    larguraTela = 1024;
    var alturaView = Math.round(.9 * alturaTela);
    var larguraView = Math.round(LARGURA_PADRAO * alturaView / ALTURA_PADRAO);
    if (larguraTela > larguraView) {
        vitrine.width = larguraView;
        vitrine.height = alturaView;
    } else {
        alturaView = Math.round(ALTURA_PADRAO * larguraTela / LARGURA_PADRAO);
        vitrine.width = larguraTela;
        vitrine.height = alturaView;
    }
}

function getImagesFolder() {
    var rootdir;
    rootdir = Ti.Filesystem.externalStorageDirectory;
    return rootdir;
}

function formatCurrency(int) {
    int = 100 * int;
    var tmp = int.toFixed(0) + "";
    var neg = false;
    if (0 == tmp.indexOf("-")) {
        neg = true;
        tmp = tmp.replace("-", "");
    }
    1 == tmp.length && (tmp = "0" + tmp);
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    tmp.length > 6 && (tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2"));
    tmp.length > 9 && (tmp = tmp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2,$3"));
    tmp.length > 12 && (tmp = tmp.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2.$3,$4"));
    0 == tmp.indexOf(".") && (tmp = tmp.replace(".", ""));
    0 == tmp.indexOf(",") && (tmp = tmp.replace(",", "0,"));
    return neg ? "R$ -" + tmp : "R$ " + tmp;
}

function goTo(location) {
    var load = Alloy.createController(location).getView();
    load.open({
        fullscreen: true,
        navBarHidden: true
    });
}

function getMonth(month) {
    var meses = [ "janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro" ];
    1 > month && (month = 1);
    return meses[month - 1];
}

function getDayOfYear(d) {
    var yn = d.getFullYear();
    var mn = d.getMonth();
    var dn = d.getDate();
    var d1 = new Date(yn, 0, 1, 12, 0, 0);
    var d2 = new Date(yn, mn, dn, 12, 0, 0);
    var ddiff = Math.round((d2 - d1) / 864e5);
    return ddiff + 1;
}

function getWeekOfYear(d) {
    var day = getDayOfYear(d);
    var week = Math.ceil(day / 7);
    return week;
}

function removeAllViews(view) {
    if (view && void 0 != view.children) {
        var removeData = [];
        for (i = view.children.length; i > 0; i--) removeData.push(view.children[i - 1]);
        for (i = 0; i < removeData.length; i++) view.remove(removeData[i]);
        removeData = null;
    }
}

function resetSession() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; 20 > i; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    Ti.App.Properties.setString(SESSION_ID, text);
    Ti.App.Properties.getString(SESSION_ID);
}

function checkdecimal(value) {
    var text = "";
    text = 10 > value ? "0" + value : value;
    return text;
}

var SOFTWARE_DB_VERSION = 7;

var SOFTWARE_VERSION = .1;

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

var URL_CAMINHO_IMAGENS = "http://marcasedmin.e-catalogos.net/module/edmin/View/fotos/";

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