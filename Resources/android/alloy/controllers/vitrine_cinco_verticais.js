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
        Ti.API.info("Render um verticais");
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
                break;

              case 4:
                $.gradeE.show();
                preco = $.precoE;
                tempo = $.tempoE;
                seleciona = $.selecionaE;
                imagem = $.imagemE;
                imagens = $.imagesE;
            }
            loadItems(template, produtos, referencia, preco, tempo, seleciona, imagem, imagens, $.quantidade);
            i++;
            produtos.next();
        }
        produtos.close();
    }
    function limpar() {
        var exclui = Ti.UI.createOptionDialog({
            buttonNames: [ "Confirmar", "Cancelar" ],
            destructive: 2,
            cancel: 0,
            title: "Desmarcar itens"
        });
        exclui.show();
        exclui.addEventListener("click", function(e) {
            e.cancel ? categoryClear($.quantidade) : alert("Continue comprando");
        });
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
    this.__controllerPath = "vitrine_cinco_verticais";
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
    $.__views.vitrine_cinco_verticais = Ti.UI.createView({
        backgroundColor: "white",
        id: "vitrine_cinco_verticais"
    });
    $.__views.vitrine_cinco_verticais && $.addTopLevelView($.__views.vitrine_cinco_verticais);
    $.__views.__alloyId1519 = Ti.UI.createView({
        height: "90%",
        top: "0%",
        width: "100%",
        id: "__alloyId1519"
    });
    $.__views.vitrine_cinco_verticais.add($.__views.__alloyId1519);
    $.__views.vitrine = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "horizontal",
        width: Ti.UI.SIZE,
        id: "vitrine"
    });
    $.__views.__alloyId1519.add($.__views.vitrine);
    $.__views.gradeA = Ti.UI.createView({
        backgroundColor: "#dddddd",
        height: "96%",
        layout: "vertical",
        width: "19%",
        id: "gradeA"
    });
    $.__views.vitrine.add($.__views.gradeA);
    $.__views.__alloyId1520 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        top: "1%",
        width: "96%",
        id: "__alloyId1520"
    });
    $.__views.gradeA.add($.__views.__alloyId1520);
    $.__views.imagemA = Ti.UI.createImageView({
        width: "100%",
        id: "imagemA"
    });
    $.__views.__alloyId1520.add($.__views.imagemA);
    $.__views.legendaA = Ti.UI.createView({
        layout: "horizontal",
        top: "1%",
        width: "96%",
        bottom: "1%",
        id: "legendaA"
    });
    $.__views.gradeA.add($.__views.legendaA);
    $.__views.informacaoA = Ti.UI.createView({
        height: "100%",
        layout: "horizontal",
        width: "48%",
        font: {
            fontSize: 3
        },
        id: "informacaoA"
    });
    $.__views.legendaA.add($.__views.informacaoA);
    $.__views.tempoA = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "45%",
        width: "50%",
        font: {
            fontSize: 7
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoA"
    });
    $.__views.informacaoA.add($.__views.tempoA);
    $.__views.selecionaA = Ti.UI.createImageView({
        height: "45%",
        width: "48%",
        zIndex: 10,
        id: "selecionaA"
    });
    $.__views.informacaoA.add($.__views.selecionaA);
    $.__views.precoA = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        color: "#000000",
        font: {
            fontSize: 13
        },
        height: "45%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "5%",
        width: "100%",
        id: "precoA"
    });
    $.__views.informacaoA.add($.__views.precoA);
    $.__views.imagesA = Ti.UI.createView({
        height: "90%",
        width: "50%",
        id: "imagesA"
    });
    $.__views.legendaA.add($.__views.imagesA);
    $.__views.gradeB = Ti.UI.createView({
        backgroundColor: "#dddddd",
        height: "96%",
        layout: "vertical",
        left: "1%",
        width: "19%",
        id: "gradeB"
    });
    $.__views.vitrine.add($.__views.gradeB);
    $.__views.__alloyId1521 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        top: "1%",
        width: "96%",
        id: "__alloyId1521"
    });
    $.__views.gradeB.add($.__views.__alloyId1521);
    $.__views.imagemB = Ti.UI.createImageView({
        width: "100%",
        id: "imagemB"
    });
    $.__views.__alloyId1521.add($.__views.imagemB);
    $.__views.legendaB = Ti.UI.createView({
        layout: "horizontal",
        top: "1%",
        width: "96%",
        bottom: "1%",
        id: "legendaB"
    });
    $.__views.gradeB.add($.__views.legendaB);
    $.__views.informacaoB = Ti.UI.createView({
        height: "100%",
        layout: "horizontal",
        width: "48%",
        font: {
            fontSize: 3
        },
        id: "informacaoB"
    });
    $.__views.legendaB.add($.__views.informacaoB);
    $.__views.tempoB = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "45%",
        width: "50%",
        font: {
            fontSize: 7
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoB"
    });
    $.__views.informacaoB.add($.__views.tempoB);
    $.__views.selecionaB = Ti.UI.createImageView({
        height: "45%",
        width: "48%",
        zIndex: 10,
        id: "selecionaB"
    });
    $.__views.informacaoB.add($.__views.selecionaB);
    $.__views.precoB = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        color: "#000000",
        font: {
            fontSize: 13
        },
        height: "45%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "5%",
        width: "100%",
        id: "precoB"
    });
    $.__views.informacaoB.add($.__views.precoB);
    $.__views.imagesB = Ti.UI.createView({
        height: "90%",
        width: "50%",
        id: "imagesB"
    });
    $.__views.legendaB.add($.__views.imagesB);
    $.__views.gradeC = Ti.UI.createView({
        backgroundColor: "#dddddd",
        height: "96%",
        layout: "vertical",
        left: "1%",
        width: "19%",
        id: "gradeC"
    });
    $.__views.vitrine.add($.__views.gradeC);
    $.__views.__alloyId1522 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        top: "1%",
        width: "96%",
        id: "__alloyId1522"
    });
    $.__views.gradeC.add($.__views.__alloyId1522);
    $.__views.imagemC = Ti.UI.createImageView({
        width: "100%",
        id: "imagemC"
    });
    $.__views.__alloyId1522.add($.__views.imagemC);
    $.__views.legendaC = Ti.UI.createView({
        layout: "horizontal",
        top: "1%",
        width: "96%",
        bottom: "1%",
        id: "legendaC"
    });
    $.__views.gradeC.add($.__views.legendaC);
    $.__views.informacaoC = Ti.UI.createView({
        height: "100%",
        layout: "horizontal",
        width: "48%",
        font: {
            fontSize: 3
        },
        id: "informacaoC"
    });
    $.__views.legendaC.add($.__views.informacaoC);
    $.__views.tempoC = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "45%",
        width: "50%",
        font: {
            fontSize: 7
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoC"
    });
    $.__views.informacaoC.add($.__views.tempoC);
    $.__views.selecionaC = Ti.UI.createImageView({
        height: "45%",
        width: "48%",
        zIndex: 10,
        id: "selecionaC"
    });
    $.__views.informacaoC.add($.__views.selecionaC);
    $.__views.precoC = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        color: "#000000",
        font: {
            fontSize: 13
        },
        height: "45%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "5%",
        width: "100%",
        id: "precoC"
    });
    $.__views.informacaoC.add($.__views.precoC);
    $.__views.imagesC = Ti.UI.createView({
        height: "90%",
        width: "50%",
        id: "imagesC"
    });
    $.__views.legendaC.add($.__views.imagesC);
    $.__views.gradeD = Ti.UI.createView({
        backgroundColor: "#dddddd",
        height: "96%",
        layout: "vertical",
        left: "1%",
        width: "19%",
        id: "gradeD"
    });
    $.__views.vitrine.add($.__views.gradeD);
    $.__views.__alloyId1523 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        top: "1%",
        width: "96%",
        id: "__alloyId1523"
    });
    $.__views.gradeD.add($.__views.__alloyId1523);
    $.__views.imagemD = Ti.UI.createImageView({
        width: "100%",
        id: "imagemD"
    });
    $.__views.__alloyId1523.add($.__views.imagemD);
    $.__views.legendaD = Ti.UI.createView({
        layout: "horizontal",
        top: "1%",
        width: "96%",
        bottom: "1%",
        id: "legendaD"
    });
    $.__views.gradeD.add($.__views.legendaD);
    $.__views.informacaoD = Ti.UI.createView({
        height: "100%",
        layout: "horizontal",
        width: "48%",
        font: {
            fontSize: 3
        },
        id: "informacaoD"
    });
    $.__views.legendaD.add($.__views.informacaoD);
    $.__views.tempoD = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "45%",
        width: "50%",
        font: {
            fontSize: 7
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoD"
    });
    $.__views.informacaoD.add($.__views.tempoD);
    $.__views.selecionaD = Ti.UI.createImageView({
        height: "45%",
        width: "48%",
        zIndex: 10,
        id: "selecionaD"
    });
    $.__views.informacaoD.add($.__views.selecionaD);
    $.__views.precoD = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        color: "#000000",
        font: {
            fontSize: 13
        },
        height: "45%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "5%",
        width: "100%",
        id: "precoD"
    });
    $.__views.informacaoD.add($.__views.precoD);
    $.__views.imagesD = Ti.UI.createView({
        height: "90%",
        width: "50%",
        id: "imagesD"
    });
    $.__views.legendaD.add($.__views.imagesD);
    $.__views.gradeE = Ti.UI.createView({
        backgroundColor: "#dddddd",
        height: "96%",
        layout: "vertical",
        left: "1%",
        width: "19%",
        id: "gradeE"
    });
    $.__views.vitrine.add($.__views.gradeE);
    $.__views.__alloyId1524 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        top: "1%",
        width: "96%",
        id: "__alloyId1524"
    });
    $.__views.gradeE.add($.__views.__alloyId1524);
    $.__views.imagemE = Ti.UI.createImageView({
        width: "100%",
        id: "imagemE"
    });
    $.__views.__alloyId1524.add($.__views.imagemE);
    $.__views.legendaE = Ti.UI.createView({
        layout: "horizontal",
        top: "1%",
        width: "96%",
        bottom: "1%",
        id: "legendaE"
    });
    $.__views.gradeE.add($.__views.legendaE);
    $.__views.informacaoE = Ti.UI.createView({
        height: "100%",
        layout: "horizontal",
        width: "48%",
        font: {
            fontSize: 3
        },
        id: "informacaoE"
    });
    $.__views.legendaE.add($.__views.informacaoE);
    $.__views.tempoE = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "45%",
        width: "50%",
        font: {
            fontSize: 7
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoE"
    });
    $.__views.informacaoE.add($.__views.tempoE);
    $.__views.selecionaE = Ti.UI.createImageView({
        height: "45%",
        width: "48%",
        zIndex: 10,
        id: "selecionaE"
    });
    $.__views.informacaoE.add($.__views.selecionaE);
    $.__views.precoE = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        color: "#000000",
        font: {
            fontSize: 13
        },
        height: "45%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "5%",
        width: "100%",
        id: "precoE"
    });
    $.__views.informacaoE.add($.__views.precoE);
    $.__views.imagesE = Ti.UI.createView({
        height: "90%",
        width: "50%",
        id: "imagesE"
    });
    $.__views.legendaE.add($.__views.imagesE);
    $.__views.__alloyId1525 = Ti.UI.createView({
        height: "10%",
        left: "0%",
        top: "90%",
        width: "100%",
        id: "__alloyId1525"
    });
    $.__views.vitrine_cinco_verticais.add($.__views.__alloyId1525);
    $.__views.__alloyId1526 = Ti.UI.createView({
        height: "100%",
        left: "0",
        width: "25%",
        id: "__alloyId1526"
    });
    $.__views.__alloyId1525.add($.__views.__alloyId1526);
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
    $.__views.__alloyId1526.add($.__views.botaoQuatroVerticais);
    limpar ? $.__views.botaoQuatroVerticais.addEventListener("click", limpar) : __defers["$.__views.botaoQuatroVerticais!click!limpar"] = true;
    $.__views.__alloyId1527 = Ti.UI.createButton({
        backgroundColor: "#008382",
        borderRadius: "5",
        color: "#ffffff",
        height: "60%",
        left: "55%",
        width: "45%",
        title: "Voltar",
        id: "__alloyId1527"
    });
    $.__views.__alloyId1526.add($.__views.__alloyId1527);
    voltar ? $.__views.__alloyId1527.addEventListener("click", voltar) : __defers["$.__views.__alloyId1527!click!voltar"] = true;
    $.__views.__alloyId1528 = Ti.UI.createView({
        height: "100%",
        left: "25%",
        width: "50%",
        id: "__alloyId1528"
    });
    $.__views.__alloyId1525.add($.__views.__alloyId1528);
    $.__views.__alloyId1529 = Ti.UI.createImageView({
        image: "/images/primeiro.png",
        height: "60%",
        left: "2%",
        width: "12%",
        id: "__alloyId1529"
    });
    $.__views.__alloyId1528.add($.__views.__alloyId1529);
    primeiro ? $.__views.__alloyId1529.addEventListener("click", primeiro) : __defers["$.__views.__alloyId1529!click!primeiro"] = true;
    $.__views.__alloyId1530 = Ti.UI.createImageView({
        image: "/images/anterior.png",
        height: "60%",
        left: "16%",
        width: "12%",
        id: "__alloyId1530"
    });
    $.__views.__alloyId1528.add($.__views.__alloyId1530);
    anterior ? $.__views.__alloyId1530.addEventListener("click", anterior) : __defers["$.__views.__alloyId1530!click!anterior"] = true;
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
    $.__views.__alloyId1528.add($.__views.paginacao);
    $.__views.__alloyId1531 = Ti.UI.createImageView({
        image: "/images/proximo.png",
        height: "60%",
        left: "52%",
        width: "12%",
        id: "__alloyId1531"
    });
    $.__views.__alloyId1528.add($.__views.__alloyId1531);
    proximo ? $.__views.__alloyId1531.addEventListener("click", proximo) : __defers["$.__views.__alloyId1531!click!proximo"] = true;
    $.__views.__alloyId1532 = Ti.UI.createImageView({
        image: "/images/ultimo.png",
        height: "60%",
        left: "66%",
        width: "12%",
        id: "__alloyId1532"
    });
    $.__views.__alloyId1528.add($.__views.__alloyId1532);
    ultimo ? $.__views.__alloyId1532.addEventListener("click", ultimo) : __defers["$.__views.__alloyId1532!click!ultimo"] = true;
    $.__views.__alloyId1533 = Ti.UI.createView({
        height: "100%",
        right: "0%",
        width: "25%",
        id: "__alloyId1533"
    });
    $.__views.__alloyId1525.add($.__views.__alloyId1533);
    $.__views.__alloyId1534 = Ti.UI.createImageView({
        image: "/images/cesta.png",
        height: "60%",
        right: "0%",
        width: "75%",
        id: "__alloyId1534"
    });
    $.__views.__alloyId1533.add($.__views.__alloyId1534);
    cesta ? $.__views.__alloyId1534.addEventListener("click", cesta) : __defers["$.__views.__alloyId1534!click!cesta"] = true;
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
    $.__views.__alloyId1533.add($.__views.quantidade);
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
    var itemsperpage = 6;
    var empresa = Ti.App.Properties.getString(CURRENT_EMPRESA);
    var produtos = selectProductsCount(categoria, marca, empresa);
    var paginas = Math.ceil(produtos / itemsperpage);
    redimencionaVitrine($.vitrine);
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
    renderProducts();
    var eventListener = function() {
        Ti.App.removeEventListener("removeBitmap", eventListener);
        Ti.API.info("Cinco verticais");
        cleanImages();
    };
    Ti.App.addEventListener("removeBitmap", eventListener);
    __defers["$.__views.botaoQuatroVerticais!click!limpar"] && $.__views.botaoQuatroVerticais.addEventListener("click", limpar);
    __defers["$.__views.__alloyId1527!click!voltar"] && $.__views.__alloyId1527.addEventListener("click", voltar);
    __defers["$.__views.__alloyId1529!click!primeiro"] && $.__views.__alloyId1529.addEventListener("click", primeiro);
    __defers["$.__views.__alloyId1530!click!anterior"] && $.__views.__alloyId1530.addEventListener("click", anterior);
    __defers["$.__views.__alloyId1531!click!proximo"] && $.__views.__alloyId1531.addEventListener("click", proximo);
    __defers["$.__views.__alloyId1532!click!ultimo"] && $.__views.__alloyId1532.addEventListener("click", ultimo);
    __defers["$.__views.__alloyId1534!click!cesta"] && $.__views.__alloyId1534.addEventListener("click", cesta);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;