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
        $.gradeC.hide();
        $.gradeD.hide();
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
    this.__controllerPath = "vitrine_quatro_horizontais";
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
    $.__views.vitrine_quatro_horizontais = Ti.UI.createView({
        backgroundColor: "white",
        id: "vitrine_quatro_horizontais"
    });
    $.__views.vitrine_quatro_horizontais && $.addTopLevelView($.__views.vitrine_quatro_horizontais);
    $.__views.__alloyId1487 = Ti.UI.createView({
        height: "90%",
        top: "0",
        id: "__alloyId1487"
    });
    $.__views.vitrine_quatro_horizontais.add($.__views.__alloyId1487);
    $.__views.vitrine = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "horizontal",
        width: Ti.UI.SIZE,
        id: "vitrine"
    });
    $.__views.__alloyId1487.add($.__views.vitrine);
    $.__views.gradeA = Ti.UI.createView({
        backgroundColor: "#dddddd",
        bottom: "0",
        height: "48.5%",
        left: "0.6%",
        top: "1.5%",
        width: "49%",
        id: "gradeA"
    });
    $.__views.vitrine.add($.__views.gradeA);
    $.__views.__alloyId1488 = Ti.UI.createView({
        backgroundColor: "#000000",
        height: "74%",
        top: "3%",
        width: "97%",
        id: "__alloyId1488"
    });
    $.__views.gradeA.add($.__views.__alloyId1488);
    $.__views.imagemA = Ti.UI.createImageView({
        width: "100%",
        id: "imagemA"
    });
    $.__views.__alloyId1488.add($.__views.imagemA);
    $.__views.__alloyId1489 = Ti.UI.createView({
        height: "17%",
        top: "80%",
        width: "97%",
        layout: "horizontal",
        id: "__alloyId1489"
    });
    $.__views.gradeA.add($.__views.__alloyId1489);
    $.__views.precoA = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        color: "#000000",
        height: "100%",
        left: "0",
        width: "20%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "precoA"
    });
    $.__views.__alloyId1489.add($.__views.precoA);
    $.__views.tempoA = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "100%",
        left: 3,
        width: "13%",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoA"
    });
    $.__views.__alloyId1489.add($.__views.tempoA);
    $.__views.selecionaA = Ti.UI.createImageView({
        height: "100%",
        left: 3,
        zIndex: 10,
        id: "selecionaA"
    });
    $.__views.__alloyId1489.add($.__views.selecionaA);
    $.__views.imagesA = Ti.UI.createView({
        left: 3,
        height: "100%",
        width: "auto",
        id: "imagesA"
    });
    $.__views.__alloyId1489.add($.__views.imagesA);
    $.__views.gradeB = Ti.UI.createView({
        backgroundColor: "#dddddd",
        bottom: "0",
        height: "48.5%",
        left: "0.6%",
        width: "49%",
        id: "gradeB"
    });
    $.__views.vitrine.add($.__views.gradeB);
    $.__views.__alloyId1490 = Ti.UI.createView({
        backgroundColor: "#000000",
        height: "74%",
        top: "3%",
        width: "97%",
        id: "__alloyId1490"
    });
    $.__views.gradeB.add($.__views.__alloyId1490);
    $.__views.imagemB = Ti.UI.createImageView({
        width: "100%",
        id: "imagemB"
    });
    $.__views.__alloyId1490.add($.__views.imagemB);
    $.__views.__alloyId1491 = Ti.UI.createView({
        height: "17%",
        top: "80%",
        width: "97%",
        layout: "horizontal",
        id: "__alloyId1491"
    });
    $.__views.gradeB.add($.__views.__alloyId1491);
    $.__views.precoB = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        color: "#000000",
        height: "100%",
        left: "0",
        width: "20%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "precoB"
    });
    $.__views.__alloyId1491.add($.__views.precoB);
    $.__views.tempoB = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "100%",
        left: 3,
        width: "13%",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoB"
    });
    $.__views.__alloyId1491.add($.__views.tempoB);
    $.__views.selecionaB = Ti.UI.createImageView({
        height: "100%",
        left: 3,
        zIndex: 10,
        id: "selecionaB"
    });
    $.__views.__alloyId1491.add($.__views.selecionaB);
    $.__views.imagesB = Ti.UI.createView({
        left: 3,
        height: "100%",
        width: "auto",
        id: "imagesB"
    });
    $.__views.__alloyId1491.add($.__views.imagesB);
    $.__views.gradeC = Ti.UI.createView({
        backgroundColor: "#dddddd",
        bottom: "0",
        height: "48.5%",
        right: "0.6%",
        top: "1.5%",
        width: "49%",
        id: "gradeC"
    });
    $.__views.vitrine.add($.__views.gradeC);
    $.__views.__alloyId1492 = Ti.UI.createView({
        backgroundColor: "#000000",
        height: "74%",
        top: "3%",
        width: "97%",
        id: "__alloyId1492"
    });
    $.__views.gradeC.add($.__views.__alloyId1492);
    $.__views.imagemC = Ti.UI.createImageView({
        width: "100%",
        id: "imagemC"
    });
    $.__views.__alloyId1492.add($.__views.imagemC);
    $.__views.__alloyId1493 = Ti.UI.createView({
        height: "17%",
        top: "80%",
        width: "97%",
        layout: "horizontal",
        id: "__alloyId1493"
    });
    $.__views.gradeC.add($.__views.__alloyId1493);
    $.__views.precoC = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        color: "#000000",
        height: "100%",
        left: "0",
        width: "20%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "precoC"
    });
    $.__views.__alloyId1493.add($.__views.precoC);
    $.__views.tempoC = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "100%",
        left: 3,
        width: "13%",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoC"
    });
    $.__views.__alloyId1493.add($.__views.tempoC);
    $.__views.selecionaC = Ti.UI.createImageView({
        height: "100%",
        left: 3,
        zIndex: 10,
        id: "selecionaC"
    });
    $.__views.__alloyId1493.add($.__views.selecionaC);
    $.__views.imagesC = Ti.UI.createView({
        left: 3,
        height: "100%",
        width: "auto",
        id: "imagesC"
    });
    $.__views.__alloyId1493.add($.__views.imagesC);
    $.__views.gradeD = Ti.UI.createView({
        backgroundColor: "#dddddd",
        bottom: "0",
        height: "48.5%",
        right: "0.6%",
        width: "49%",
        id: "gradeD"
    });
    $.__views.vitrine.add($.__views.gradeD);
    $.__views.__alloyId1494 = Ti.UI.createView({
        backgroundColor: "#000000",
        height: "74%",
        top: "3%",
        width: "97%",
        id: "__alloyId1494"
    });
    $.__views.gradeD.add($.__views.__alloyId1494);
    $.__views.imagemD = Ti.UI.createImageView({
        width: "100%",
        id: "imagemD"
    });
    $.__views.__alloyId1494.add($.__views.imagemD);
    $.__views.__alloyId1495 = Ti.UI.createView({
        height: "17%",
        top: "80%",
        width: "97%",
        layout: "horizontal",
        id: "__alloyId1495"
    });
    $.__views.gradeD.add($.__views.__alloyId1495);
    $.__views.precoD = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        color: "#000000",
        height: "100%",
        left: "0",
        width: "20%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "precoD"
    });
    $.__views.__alloyId1495.add($.__views.precoD);
    $.__views.tempoD = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "100%",
        left: 3,
        width: "13%",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoD"
    });
    $.__views.__alloyId1495.add($.__views.tempoD);
    $.__views.selecionaD = Ti.UI.createImageView({
        height: "100%",
        left: 3,
        zIndex: 10,
        id: "selecionaD"
    });
    $.__views.__alloyId1495.add($.__views.selecionaD);
    $.__views.imagesD = Ti.UI.createView({
        left: 3,
        height: "100%",
        width: "auto",
        id: "imagesD"
    });
    $.__views.__alloyId1495.add($.__views.imagesD);
    $.__views.__alloyId1496 = Ti.UI.createView({
        height: "10%",
        left: "0%",
        top: "90%",
        width: "100%",
        id: "__alloyId1496"
    });
    $.__views.__alloyId1487.add($.__views.__alloyId1496);
    $.__views.__alloyId1497 = Ti.UI.createView({
        height: "100%",
        left: "0",
        width: "25%",
        id: "__alloyId1497"
    });
    $.__views.__alloyId1496.add($.__views.__alloyId1497);
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
    $.__views.__alloyId1497.add($.__views.botaoQuatroVerticais);
    limpar ? $.__views.botaoQuatroVerticais.addEventListener("click", limpar) : __defers["$.__views.botaoQuatroVerticais!click!limpar"] = true;
    $.__views.__alloyId1498 = Ti.UI.createButton({
        backgroundColor: "#008382",
        borderRadius: "5",
        color: "#ffffff",
        height: "60%",
        left: "55%",
        width: "45%",
        title: "Voltar",
        id: "__alloyId1498"
    });
    $.__views.__alloyId1497.add($.__views.__alloyId1498);
    voltar ? $.__views.__alloyId1498.addEventListener("click", voltar) : __defers["$.__views.__alloyId1498!click!voltar"] = true;
    $.__views.__alloyId1499 = Ti.UI.createView({
        height: "100%",
        left: "25%",
        width: "50%",
        id: "__alloyId1499"
    });
    $.__views.__alloyId1496.add($.__views.__alloyId1499);
    $.__views.__alloyId1500 = Ti.UI.createImageView({
        image: "/images/primeiro.png",
        height: "60%",
        left: "2%",
        width: "12%",
        id: "__alloyId1500"
    });
    $.__views.__alloyId1499.add($.__views.__alloyId1500);
    primeiro ? $.__views.__alloyId1500.addEventListener("click", primeiro) : __defers["$.__views.__alloyId1500!click!primeiro"] = true;
    $.__views.__alloyId1501 = Ti.UI.createImageView({
        image: "/images/anterior.png",
        height: "60%",
        left: "16%",
        width: "12%",
        id: "__alloyId1501"
    });
    $.__views.__alloyId1499.add($.__views.__alloyId1501);
    anterior ? $.__views.__alloyId1501.addEventListener("click", anterior) : __defers["$.__views.__alloyId1501!click!anterior"] = true;
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
    $.__views.__alloyId1499.add($.__views.paginacao);
    $.__views.__alloyId1502 = Ti.UI.createImageView({
        image: "/images/proximo.png",
        height: "60%",
        left: "52%",
        width: "12%",
        id: "__alloyId1502"
    });
    $.__views.__alloyId1499.add($.__views.__alloyId1502);
    proximo ? $.__views.__alloyId1502.addEventListener("click", proximo) : __defers["$.__views.__alloyId1502!click!proximo"] = true;
    $.__views.__alloyId1503 = Ti.UI.createImageView({
        image: "/images/ultimo.png",
        height: "60%",
        left: "66%",
        width: "12%",
        id: "__alloyId1503"
    });
    $.__views.__alloyId1499.add($.__views.__alloyId1503);
    ultimo ? $.__views.__alloyId1503.addEventListener("click", ultimo) : __defers["$.__views.__alloyId1503!click!ultimo"] = true;
    $.__views.__alloyId1504 = Ti.UI.createView({
        height: "100%",
        right: "0%",
        width: "25%",
        id: "__alloyId1504"
    });
    $.__views.__alloyId1496.add($.__views.__alloyId1504);
    $.__views.__alloyId1505 = Ti.UI.createImageView({
        image: "/images/cesta.png",
        height: "60%",
        right: "0%",
        width: "75%",
        id: "__alloyId1505"
    });
    $.__views.__alloyId1504.add($.__views.__alloyId1505);
    cesta ? $.__views.__alloyId1505.addEventListener("click", cesta) : __defers["$.__views.__alloyId1505!click!cesta"] = true;
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
    $.__views.__alloyId1504.add($.__views.quantidade);
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
    var itemsperpage = 4;
    var empresa = Ti.App.Properties.getString(CURRENT_EMPRESA);
    var produtos = selectProductsCount(categoria, marca, empresa);
    var paginas = Math.ceil(produtos / itemsperpage);
    redimencionaVitrine($.vitrine);
    renderProducts();
    var eventListener = function() {
        Ti.App.removeEventListener("removeBitmap", eventListener);
        Ti.API.info("Quatro horizontais");
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
    __defers["$.__views.__alloyId1498!click!voltar"] && $.__views.__alloyId1498.addEventListener("click", voltar);
    __defers["$.__views.__alloyId1500!click!primeiro"] && $.__views.__alloyId1500.addEventListener("click", primeiro);
    __defers["$.__views.__alloyId1501!click!anterior"] && $.__views.__alloyId1501.addEventListener("click", anterior);
    __defers["$.__views.__alloyId1502!click!proximo"] && $.__views.__alloyId1502.addEventListener("click", proximo);
    __defers["$.__views.__alloyId1503!click!ultimo"] && $.__views.__alloyId1503.addEventListener("click", ultimo);
    __defers["$.__views.__alloyId1505!click!cesta"] && $.__views.__alloyId1505.addEventListener("click", cesta);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;