function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
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
        while (produtos.isValidRow()) {
            switch (i) {
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
        0 >= current_page && (current_page = paginas);
        cleanImages();
        renderProducts();
    }
    function proximo() {
        current_page++;
        current_page > paginas && (current_page = 1);
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "vitrine_dois_verticais";
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
    var __defers = {};
    $.__views.vitrine_dois_verticais = Ti.UI.createView({
        backgroundColor: "#ffffff",
        id: "vitrine_dois_verticais"
    });
    $.__views.vitrine_dois_verticais && $.addTopLevelView($.__views.vitrine_dois_verticais);
    $.__views.__alloyId1555 = Ti.UI.createView({
        height: "90%",
        top: "0%",
        width: "100%",
        id: "__alloyId1555"
    });
    $.__views.vitrine_dois_verticais.add($.__views.__alloyId1555);
    $.__views.vitrine = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "horizontal",
        width: Ti.UI.SIZE,
        id: "vitrine"
    });
    $.__views.__alloyId1555.add($.__views.vitrine);
    $.__views.gradeA = Ti.UI.createView({
        backgroundColor: "#dddddd",
        height: "98%",
        layout: "vertical",
        width: "48%",
        id: "gradeA"
    });
    $.__views.vitrine.add($.__views.gradeA);
    $.__views.__alloyId1556 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        top: "1%",
        width: "98%",
        id: "__alloyId1556"
    });
    $.__views.gradeA.add($.__views.__alloyId1556);
    $.__views.imagemA = Ti.UI.createImageView({
        width: "100%",
        id: "imagemA"
    });
    $.__views.__alloyId1556.add($.__views.imagemA);
    $.__views.legendaA = Ti.UI.createView({
        top: "2%",
        layout: "horizontal",
        width: "98%",
        bottom: "1%",
        id: "legendaA"
    });
    $.__views.gradeA.add($.__views.legendaA);
    $.__views.precoA = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        color: "#000000",
        font: {
            fontSize: 13
        },
        height: "80%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "20%",
        id: "precoA"
    });
    $.__views.legendaA.add($.__views.precoA);
    $.__views.tempoA = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "80%",
        width: "15%",
        font: {
            fontSize: 13
        },
        left: "1%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoA"
    });
    $.__views.legendaA.add($.__views.tempoA);
    $.__views.selecionaA = Ti.UI.createImageView({
        height: "80%",
        width: "12%",
        zIndex: 10,
        id: "selecionaA"
    });
    $.__views.legendaA.add($.__views.selecionaA);
    $.__views.imagesA = Ti.UI.createView({
        height: "80%",
        left: "1%",
        width: Ti.UI.SIZE,
        id: "imagesA"
    });
    $.__views.legendaA.add($.__views.imagesA);
    $.__views.gradeB = Ti.UI.createView({
        backgroundColor: "#dddddd",
        height: "98%",
        layout: "vertical",
        left: "1%",
        width: "48%",
        id: "gradeB"
    });
    $.__views.vitrine.add($.__views.gradeB);
    $.__views.__alloyId1557 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        top: "1%",
        width: "98%",
        id: "__alloyId1557"
    });
    $.__views.gradeB.add($.__views.__alloyId1557);
    $.__views.imagemB = Ti.UI.createImageView({
        width: "100%",
        id: "imagemB"
    });
    $.__views.__alloyId1557.add($.__views.imagemB);
    $.__views.legendaB = Ti.UI.createView({
        top: "2%",
        layout: "horizontal",
        width: "98%",
        bottom: "1%",
        id: "legendaB"
    });
    $.__views.gradeB.add($.__views.legendaB);
    $.__views.precoB = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        color: "#000000",
        font: {
            fontSize: 13
        },
        height: "80%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "20%",
        id: "precoB"
    });
    $.__views.legendaB.add($.__views.precoB);
    $.__views.tempoB = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "80%",
        width: "15%",
        font: {
            fontSize: 13
        },
        left: "1%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoB"
    });
    $.__views.legendaB.add($.__views.tempoB);
    $.__views.selecionaB = Ti.UI.createImageView({
        height: "80%",
        width: "12%",
        zIndex: 10,
        id: "selecionaB"
    });
    $.__views.legendaB.add($.__views.selecionaB);
    $.__views.imagesB = Ti.UI.createView({
        height: "80%",
        left: "1%",
        width: Ti.UI.SIZE,
        id: "imagesB"
    });
    $.__views.legendaB.add($.__views.imagesB);
    $.__views.__alloyId1558 = Ti.UI.createView({
        height: "10%",
        left: "0%",
        top: "90%",
        width: "100%",
        id: "__alloyId1558"
    });
    $.__views.vitrine_dois_verticais.add($.__views.__alloyId1558);
    $.__views.__alloyId1559 = Ti.UI.createView({
        height: "100%",
        left: "0",
        width: "25%",
        id: "__alloyId1559"
    });
    $.__views.__alloyId1558.add($.__views.__alloyId1559);
    $.__views.botaoQuatroVerticais = Ti.UI.createButton({
        backgroundColor: "#008382",
        borderRadius: "5",
        color: "#ffffff",
        height: "60%",
        left: "5%",
        width: "45%",
        title: "Limpar todas marcações",
        id: "botaoQuatroVerticais"
    });
    $.__views.__alloyId1559.add($.__views.botaoQuatroVerticais);
    limpar ? $.__views.botaoQuatroVerticais.addEventListener("click", limpar) : __defers["$.__views.botaoQuatroVerticais!click!limpar"] = true;
    $.__views.__alloyId1560 = Ti.UI.createButton({
        backgroundColor: "#008382",
        borderRadius: "5",
        color: "#ffffff",
        height: "60%",
        left: "55%",
        width: "45%",
        title: "Voltar",
        id: "__alloyId1560"
    });
    $.__views.__alloyId1559.add($.__views.__alloyId1560);
    voltar ? $.__views.__alloyId1560.addEventListener("click", voltar) : __defers["$.__views.__alloyId1560!click!voltar"] = true;
    $.__views.__alloyId1561 = Ti.UI.createView({
        height: "100%",
        left: "25%",
        width: "50%",
        id: "__alloyId1561"
    });
    $.__views.__alloyId1558.add($.__views.__alloyId1561);
    $.__views.__alloyId1562 = Ti.UI.createImageView({
        image: "/images/primeiro.png",
        height: "60%",
        left: "2%",
        width: "12%",
        id: "__alloyId1562"
    });
    $.__views.__alloyId1561.add($.__views.__alloyId1562);
    primeiro ? $.__views.__alloyId1562.addEventListener("click", primeiro) : __defers["$.__views.__alloyId1562!click!primeiro"] = true;
    $.__views.__alloyId1563 = Ti.UI.createImageView({
        image: "/images/anterior.png",
        height: "60%",
        left: "16%",
        width: "12%",
        id: "__alloyId1563"
    });
    $.__views.__alloyId1561.add($.__views.__alloyId1563);
    anterior ? $.__views.__alloyId1563.addEventListener("click", anterior) : __defers["$.__views.__alloyId1563!click!anterior"] = true;
    $.__views.paginacao = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        borderColor: "#cdcdcd",
        borderWidth: "1",
        color: "#008382",
        height: "60%",
        left: "30%",
        width: "20%",
        title: "1/1",
        id: "paginacao"
    });
    $.__views.__alloyId1561.add($.__views.paginacao);
    $.__views.__alloyId1564 = Ti.UI.createImageView({
        image: "/images/proximo.png",
        height: "60%",
        left: "52%",
        width: "12%",
        id: "__alloyId1564"
    });
    $.__views.__alloyId1561.add($.__views.__alloyId1564);
    proximo ? $.__views.__alloyId1564.addEventListener("click", proximo) : __defers["$.__views.__alloyId1564!click!proximo"] = true;
    $.__views.__alloyId1565 = Ti.UI.createImageView({
        image: "/images/ultimo.png",
        height: "60%",
        left: "66%",
        width: "12%",
        id: "__alloyId1565"
    });
    $.__views.__alloyId1561.add($.__views.__alloyId1565);
    ultimo ? $.__views.__alloyId1565.addEventListener("click", ultimo) : __defers["$.__views.__alloyId1565!click!ultimo"] = true;
    $.__views.__alloyId1566 = Ti.UI.createView({
        height: "100%",
        right: "0%",
        width: "25%",
        id: "__alloyId1566"
    });
    $.__views.__alloyId1558.add($.__views.__alloyId1566);
    $.__views.__alloyId1567 = Ti.UI.createImageView({
        image: "/images/cesta.png",
        height: "60%",
        right: "0%",
        width: "75%",
        id: "__alloyId1567"
    });
    $.__views.__alloyId1566.add($.__views.__alloyId1567);
    cesta ? $.__views.__alloyId1567.addEventListener("click", cesta) : __defers["$.__views.__alloyId1567!click!cesta"] = true;
    $.__views.quantidade = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        borderColor: "#cdcdcd",
        borderWidth: "1",
        color: "#ff0000",
        height: "60%",
        left: "0%",
        width: "20%",
        title: "0",
        id: "quantidade"
    });
    $.__views.__alloyId1566.add($.__views.quantidade);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/api/category_render.js");
    Ti.include("/database/produtos.js");
    Ti.include("/database/imagens_produtos.js");
    var args = arguments[0] || {};
    var marca = args.marca || 0;
    var categoria = args.cat_id || 0;
    var template = args.template || 0;
    var current_page = 1;
    var itemsperpage = 2;
    var empresa = Ti.App.Properties.getString(CURRENT_EMPRESA);
    var produtos = selectProductsCount(categoria, marca, empresa);
    var paginas = Math.ceil(produtos / itemsperpage);
    redimencionaVitrine($.vitrine);
    renderProducts();
    var eventListener = function() {
        Ti.App.removeEventListener("removeBitmap", eventListener);
        Ti.API.info("Dois Verticais");
        cleanImages();
    };
    Ti.App.addEventListener("removeBitmap", eventListener);
    if ("ipad" == Ti.Platform.osname) {
        $.botaoQuatroVerticais.font = {
            fontSize: 13
        };
        $.botaoQuatroVerticais.height = "63%";
        $.botaoQuatroVerticais.title = "Limpar marcações";
        $.botaoQuatroVerticais.textAlign = "center";
    }
    __defers["$.__views.botaoQuatroVerticais!click!limpar"] && $.__views.botaoQuatroVerticais.addEventListener("click", limpar);
    __defers["$.__views.__alloyId1560!click!voltar"] && $.__views.__alloyId1560.addEventListener("click", voltar);
    __defers["$.__views.__alloyId1562!click!primeiro"] && $.__views.__alloyId1562.addEventListener("click", primeiro);
    __defers["$.__views.__alloyId1563!click!anterior"] && $.__views.__alloyId1563.addEventListener("click", anterior);
    __defers["$.__views.__alloyId1564!click!proximo"] && $.__views.__alloyId1564.addEventListener("click", proximo);
    __defers["$.__views.__alloyId1565!click!ultimo"] && $.__views.__alloyId1565.addEventListener("click", ultimo);
    __defers["$.__views.__alloyId1567!click!cesta"] && $.__views.__alloyId1567.addEventListener("click", cesta);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;