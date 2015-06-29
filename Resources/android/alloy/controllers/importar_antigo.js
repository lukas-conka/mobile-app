function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "importar_antigo";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
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
    Ti.include("/database/carrinho_pedido.js");
    Ti.include("/database/video.js");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;