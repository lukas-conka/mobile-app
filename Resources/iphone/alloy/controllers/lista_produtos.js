function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function resultadoProdutos() {
        var produtos = listaProdutosQuatro(busca_texto);
        var data = [];
        while (produtos.isValidRow()) {
            var prd_id = produtos.fieldByName("prd_id");
            var imagem = produtos.fieldByName("img_caminho");
            var referencia = produtos.fieldByName("prd_referencia");
            var barras = produtos.fieldByName("prd_codigo_barra");
            var nome = produtos.fieldByName("prd_nome");
            var marca = produtos.fieldByName("apr_arquivo");
            var preco1 = produtos.fieldByName("ifp_valor_1");
            var preco2 = produtos.fieldByName("ifp_valor_2");
            var preco3 = produtos.fieldByName("ifp_valor_3");
            var precos = formatCurrency(preco1) + "\n" + formatCurrency(preco2) + "\n" + formatCurrency(preco3);
            var qtde_min = produtos.fieldByName("ifp_qtde_minima");
            var selecao = "/images/seleciona.png";
            "true" == checkSelectedProduct(prd_id) && (selecao = "/images/selecionar_vermelho.png");
            data.push({
                prd_id: prd_id,
                imagem_produto: {
                    image: getImagesFolder() + imagem
                },
                label_referencia: {
                    text: referencia
                },
                label_barras: {
                    text: barras
                },
                label_nome: {
                    text: nome
                },
                imagem_marca: {
                    image: getImagesFolder() + marca
                },
                label_preco: {
                    text: precos
                },
                label_quantidade_min: {
                    text: qtde_min
                },
                image_selecionar: {
                    image: selecao
                }
            });
            produtos.next();
        }
        $.listaprodutos.sections[0].setItems(data);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "lista_produtos";
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
    Ti.include("/api/config.js");
    Ti.include("/database/produtos.js");
    Ti.include("/database/aparencia.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    var busca_texto = "";
    resultadoProdutos();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;