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
        $.gradeE.hide();
        $.gradeF.hide();
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
                break;

              case 5:
                $.gradeF.show();
                preco = $.precoF;
                tempo = $.tempoF;
                seleciona = $.selecionaF;
                imagem = $.imagemF;
                imagens = $.imagesF;
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
    this.__controllerPath = "vitrine_seis_verticais";
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
    $.__views.vitrine_seis_verticais = Ti.UI.createView({
        backgroundColor: "white",
        id: "vitrine_seis_verticais"
    });
    $.__views.vitrine_seis_verticais && $.addTopLevelView($.__views.vitrine_seis_verticais);
    $.__views.__alloyId1540 = Ti.UI.createView({
        height: "90%",
        top: "0%",
        width: "100%",
        id: "__alloyId1540"
    });
    $.__views.vitrine_seis_verticais.add($.__views.__alloyId1540);
    $.__views.vitrine = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "horizontal",
        width: Ti.UI.SIZE,
        id: "vitrine"
    });
    $.__views.__alloyId1540.add($.__views.vitrine);
    $.__views.gradeA = Ti.UI.createView({
        backgroundColor: "#dddddd",
        height: "95%",
        layout: "vertical",
        width: "15%",
        id: "gradeA"
    });
    $.__views.vitrine.add($.__views.gradeA);
    $.__views.__alloyId1541 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        top: "1%",
        width: "96%",
        id: "__alloyId1541"
    });
    $.__views.gradeA.add($.__views.__alloyId1541);
    $.__views.imagemA = Ti.UI.createImageView({
        width: "100%",
        id: "imagemA"
    });
    $.__views.__alloyId1541.add($.__views.imagemA);
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
        width: "58%",
        id: "informacaoA"
    });
    $.__views.legendaA.add($.__views.informacaoA);
    $.__views.tempoA = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "45%",
        width: "50%",
        font: {
            fontSize: 13
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
        width: "40%",
        id: "imagesA"
    });
    $.__views.legendaA.add($.__views.imagesA);
    $.__views.gradeB = Ti.UI.createView({
        backgroundColor: "#dddddd",
        height: "95%",
        layout: "vertical",
        left: "1%",
        width: "15%",
        id: "gradeB"
    });
    $.__views.vitrine.add($.__views.gradeB);
    $.__views.__alloyId1542 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        top: "1%",
        width: "96%",
        id: "__alloyId1542"
    });
    $.__views.gradeB.add($.__views.__alloyId1542);
    $.__views.imagemB = Ti.UI.createImageView({
        width: "100%",
        id: "imagemB"
    });
    $.__views.__alloyId1542.add($.__views.imagemB);
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
        width: "58%",
        id: "informacaoB"
    });
    $.__views.legendaB.add($.__views.informacaoB);
    $.__views.tempoB = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "45%",
        width: "50%",
        font: {
            fontSize: 13
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
        width: "40%",
        id: "imagesB"
    });
    $.__views.legendaB.add($.__views.imagesB);
    $.__views.gradeC = Ti.UI.createView({
        backgroundColor: "#dddddd",
        height: "95%",
        layout: "vertical",
        left: "1%",
        width: "15%",
        id: "gradeC"
    });
    $.__views.vitrine.add($.__views.gradeC);
    $.__views.__alloyId1543 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        top: "1%",
        width: "96%",
        id: "__alloyId1543"
    });
    $.__views.gradeC.add($.__views.__alloyId1543);
    $.__views.imagemC = Ti.UI.createImageView({
        width: "100%",
        id: "imagemC"
    });
    $.__views.__alloyId1543.add($.__views.imagemC);
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
        width: "58%",
        id: "informacaoC"
    });
    $.__views.legendaC.add($.__views.informacaoC);
    $.__views.tempoC = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "45%",
        width: "50%",
        font: {
            fontSize: 13
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
        width: "40%",
        id: "imagesC"
    });
    $.__views.legendaC.add($.__views.imagesC);
    $.__views.gradeD = Ti.UI.createView({
        backgroundColor: "#dddddd",
        height: "95%",
        layout: "vertical",
        left: "1%",
        width: "15%",
        id: "gradeD"
    });
    $.__views.vitrine.add($.__views.gradeD);
    $.__views.__alloyId1544 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        top: "1%",
        width: "96%",
        id: "__alloyId1544"
    });
    $.__views.gradeD.add($.__views.__alloyId1544);
    $.__views.imagemD = Ti.UI.createImageView({
        width: "100%",
        id: "imagemD"
    });
    $.__views.__alloyId1544.add($.__views.imagemD);
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
        width: "58%",
        id: "informacaoD"
    });
    $.__views.legendaD.add($.__views.informacaoD);
    $.__views.tempoD = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "45%",
        width: "50%",
        font: {
            fontSize: 13
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
        width: "40%",
        id: "imagesD"
    });
    $.__views.legendaD.add($.__views.imagesD);
    $.__views.gradeE = Ti.UI.createView({
        backgroundColor: "#dddddd",
        height: "95%",
        layout: "vertical",
        left: "1%",
        width: "15%",
        id: "gradeE"
    });
    $.__views.vitrine.add($.__views.gradeE);
    $.__views.__alloyId1545 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        top: "1%",
        width: "96%",
        id: "__alloyId1545"
    });
    $.__views.gradeE.add($.__views.__alloyId1545);
    $.__views.imagemE = Ti.UI.createImageView({
        width: "100%",
        id: "imagemE"
    });
    $.__views.__alloyId1545.add($.__views.imagemE);
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
        width: "58%",
        id: "informacaoE"
    });
    $.__views.legendaE.add($.__views.informacaoE);
    $.__views.tempoE = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "45%",
        width: "50%",
        font: {
            fontSize: 13
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
        width: "40%",
        id: "imagesE"
    });
    $.__views.legendaE.add($.__views.imagesE);
    $.__views.gradeF = Ti.UI.createView({
        backgroundColor: "#dddddd",
        height: "95%",
        layout: "vertical",
        left: "1%",
        width: "15%",
        id: "gradeF"
    });
    $.__views.vitrine.add($.__views.gradeF);
    $.__views.__alloyId1546 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        top: "1%",
        width: "96%",
        id: "__alloyId1546"
    });
    $.__views.gradeF.add($.__views.__alloyId1546);
    $.__views.imagemF = Ti.UI.createImageView({
        width: "100%",
        id: "imagemF"
    });
    $.__views.__alloyId1546.add($.__views.imagemF);
    $.__views.legendaF = Ti.UI.createView({
        layout: "horizontal",
        top: "1%",
        width: "96%",
        bottom: "1%",
        id: "legendaF"
    });
    $.__views.gradeF.add($.__views.legendaF);
    $.__views.informacaoF = Ti.UI.createView({
        height: "100%",
        layout: "horizontal",
        width: "58%",
        id: "informacaoF"
    });
    $.__views.legendaF.add($.__views.informacaoF);
    $.__views.tempoF = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "45%",
        width: "50%",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoF"
    });
    $.__views.informacaoF.add($.__views.tempoF);
    $.__views.selecionaF = Ti.UI.createImageView({
        height: "45%",
        width: "48%",
        zIndex: 10,
        id: "selecionaF"
    });
    $.__views.informacaoF.add($.__views.selecionaF);
    $.__views.precoF = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        color: "#000000",
        font: {
            fontSize: 13
        },
        height: "45%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "5%",
        width: "100%",
        id: "precoF"
    });
    $.__views.informacaoF.add($.__views.precoF);
    $.__views.imagesF = Ti.UI.createView({
        height: "90%",
        width: "40%",
        id: "imagesF"
    });
    $.__views.legendaF.add($.__views.imagesF);
    $.__views.__alloyId1547 = Ti.UI.createView({
        height: "10%",
        left: "0%",
        top: "90%",
        width: "100%",
        id: "__alloyId1547"
    });
    $.__views.vitrine_seis_verticais.add($.__views.__alloyId1547);
    $.__views.__alloyId1548 = Ti.UI.createView({
        height: "100%",
        left: "0",
        width: "25%",
        id: "__alloyId1548"
    });
    $.__views.__alloyId1547.add($.__views.__alloyId1548);
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
    $.__views.__alloyId1548.add($.__views.botaoQuatroVerticais);
    limpar ? $.__views.botaoQuatroVerticais.addEventListener("click", limpar) : __defers["$.__views.botaoQuatroVerticais!click!limpar"] = true;
    $.__views.__alloyId1549 = Ti.UI.createButton({
        backgroundColor: "#008382",
        borderRadius: "5",
        color: "#ffffff",
        height: "60%",
        left: "55%",
        width: "45%",
        title: "Voltar",
        id: "__alloyId1549"
    });
    $.__views.__alloyId1548.add($.__views.__alloyId1549);
    voltar ? $.__views.__alloyId1549.addEventListener("click", voltar) : __defers["$.__views.__alloyId1549!click!voltar"] = true;
    $.__views.__alloyId1550 = Ti.UI.createView({
        height: "100%",
        left: "25%",
        width: "50%",
        id: "__alloyId1550"
    });
    $.__views.__alloyId1547.add($.__views.__alloyId1550);
    $.__views.__alloyId1551 = Ti.UI.createImageView({
        image: "/images/primeiro.png",
        height: "60%",
        left: "2%",
        width: "12%",
        id: "__alloyId1551"
    });
    $.__views.__alloyId1550.add($.__views.__alloyId1551);
    primeiro ? $.__views.__alloyId1551.addEventListener("click", primeiro) : __defers["$.__views.__alloyId1551!click!primeiro"] = true;
    $.__views.__alloyId1552 = Ti.UI.createImageView({
        image: "/images/anterior.png",
        height: "60%",
        left: "16%",
        width: "12%",
        id: "__alloyId1552"
    });
    $.__views.__alloyId1550.add($.__views.__alloyId1552);
    anterior ? $.__views.__alloyId1552.addEventListener("click", anterior) : __defers["$.__views.__alloyId1552!click!anterior"] = true;
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
    $.__views.__alloyId1550.add($.__views.paginacao);
    $.__views.__alloyId1553 = Ti.UI.createImageView({
        image: "/images/proximo.png",
        height: "60%",
        left: "52%",
        width: "12%",
        id: "__alloyId1553"
    });
    $.__views.__alloyId1550.add($.__views.__alloyId1553);
    proximo ? $.__views.__alloyId1553.addEventListener("click", proximo) : __defers["$.__views.__alloyId1553!click!proximo"] = true;
    $.__views.__alloyId1554 = Ti.UI.createImageView({
        image: "/images/ultimo.png",
        height: "60%",
        left: "66%",
        width: "12%",
        id: "__alloyId1554"
    });
    $.__views.__alloyId1550.add($.__views.__alloyId1554);
    ultimo ? $.__views.__alloyId1554.addEventListener("click", ultimo) : __defers["$.__views.__alloyId1554!click!ultimo"] = true;
    $.__views.__alloyId1555 = Ti.UI.createView({
        height: "100%",
        right: "0%",
        width: "25%",
        id: "__alloyId1555"
    });
    $.__views.__alloyId1547.add($.__views.__alloyId1555);
    $.__views.__alloyId1556 = Ti.UI.createImageView({
        image: "/images/cesta.png",
        height: "60%",
        right: "0%",
        width: "75%",
        id: "__alloyId1556"
    });
    $.__views.__alloyId1555.add($.__views.__alloyId1556);
    cesta ? $.__views.__alloyId1556.addEventListener("click", cesta) : __defers["$.__views.__alloyId1556!click!cesta"] = true;
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
    $.__views.__alloyId1555.add($.__views.quantidade);
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
    renderProducts();
    var eventListener = function() {
        Ti.App.removeEventListener("removeBitmap", eventListener);
        Ti.API.info("Seis Verticais");
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
    __defers["$.__views.__alloyId1549!click!voltar"] && $.__views.__alloyId1549.addEventListener("click", voltar);
    __defers["$.__views.__alloyId1551!click!primeiro"] && $.__views.__alloyId1551.addEventListener("click", primeiro);
    __defers["$.__views.__alloyId1552!click!anterior"] && $.__views.__alloyId1552.addEventListener("click", anterior);
    __defers["$.__views.__alloyId1553!click!proximo"] && $.__views.__alloyId1553.addEventListener("click", proximo);
    __defers["$.__views.__alloyId1554!click!ultimo"] && $.__views.__alloyId1554.addEventListener("click", ultimo);
    __defers["$.__views.__alloyId1556!click!cesta"] && $.__views.__alloyId1556.addEventListener("click", cesta);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;