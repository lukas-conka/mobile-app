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
        var exclui = Ti.UI.createOptionDialog({
            buttonNames: [ "Confirma", "Cancelar" ],
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
    this.__controllerPath = "vitrine_quatro_quadrados";
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
    $.__views.win = Ti.UI.createView({
        backgroundColor: "white",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId1580 = Ti.UI.createView({
        height: "90%",
        top: "0",
        id: "__alloyId1580"
    });
    $.__views.win.add($.__views.__alloyId1580);
    $.__views.gradeA = Ti.UI.createView({
        backgroundColor: "#dddddd",
        bottom: "0",
        height: "48.5%",
        left: "0.6%",
        top: "1.5%",
        width: "49%",
        id: "gradeA"
    });
    $.__views.__alloyId1580.add($.__views.gradeA);
    $.__views.__alloyId1581 = Ti.UI.createView({
        height: "98%",
        right: "1%",
        width: "70%",
        id: "__alloyId1581"
    });
    $.__views.gradeA.add($.__views.__alloyId1581);
    $.__views.imagemA = Ti.UI.createImageView({
        height: "100%",
        right: "0%",
        id: "imagemA"
    });
    $.__views.__alloyId1581.add($.__views.imagemA);
    $.__views.imagesA = Ti.UI.createView({
        top: 5,
        left: 3,
        width: "28%",
        height: "50%",
        zIndex: 10,
        id: "imagesA"
    });
    $.__views.gradeA.add($.__views.imagesA);
    $.__views.__alloyId1582 = Ti.UI.createView({
        height: "98%",
        left: "3%",
        width: "28%",
        id: "__alloyId1582"
    });
    $.__views.gradeA.add($.__views.__alloyId1582);
    $.__views.precoA = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        bottom: "1%",
        color: "#000000",
        height: "16%",
        left: "0%",
        width: "89.4%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "precoA"
    });
    $.__views.__alloyId1582.add($.__views.precoA);
    $.__views.tempoA = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        bottom: "19%",
        height: "16%",
        left: "0%",
        width: "45.5%",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoA"
    });
    $.__views.__alloyId1582.add($.__views.tempoA);
    $.__views.selecionaA = Ti.UI.createImageView({
        height: "16%",
        bottom: "19%",
        left: "45.5%",
        width: "43%",
        zIndex: 10,
        id: "selecionaA"
    });
    $.__views.__alloyId1582.add($.__views.selecionaA);
    $.__views.gradeB = Ti.UI.createView({
        backgroundColor: "#dddddd",
        bottom: "0",
        height: "48.5%",
        left: "0.6%",
        width: "49%",
        id: "gradeB"
    });
    $.__views.__alloyId1580.add($.__views.gradeB);
    $.__views.__alloyId1583 = Ti.UI.createView({
        height: "98%",
        right: "1%",
        width: "70%",
        id: "__alloyId1583"
    });
    $.__views.gradeB.add($.__views.__alloyId1583);
    $.__views.imagemB = Ti.UI.createImageView({
        height: "100%",
        right: "0%",
        id: "imagemB"
    });
    $.__views.__alloyId1583.add($.__views.imagemB);
    $.__views.imagesB = Ti.UI.createView({
        top: 5,
        left: 3,
        width: "28%",
        height: "50%",
        zIndex: 10,
        id: "imagesB"
    });
    $.__views.gradeB.add($.__views.imagesB);
    $.__views.__alloyId1584 = Ti.UI.createView({
        height: "98%",
        left: "3%",
        width: "28%",
        id: "__alloyId1584"
    });
    $.__views.gradeB.add($.__views.__alloyId1584);
    $.__views.precoB = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        bottom: "1%",
        color: "#000000",
        height: "16%",
        left: "0%",
        width: "89.4%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "precoB"
    });
    $.__views.__alloyId1584.add($.__views.precoB);
    $.__views.tempoB = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        bottom: "19%",
        height: "16%",
        left: "0%",
        width: "45.5%",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoB"
    });
    $.__views.__alloyId1584.add($.__views.tempoB);
    $.__views.selecionaB = Ti.UI.createImageView({
        height: "16%",
        bottom: "19%",
        left: "45.5%",
        width: "43%",
        zIndex: 10,
        id: "selecionaB"
    });
    $.__views.__alloyId1584.add($.__views.selecionaB);
    $.__views.gradeC = Ti.UI.createView({
        backgroundColor: "#dddddd",
        bottom: "0",
        height: "48.5%",
        right: "0.6%",
        top: "1.5%",
        width: "49%",
        id: "gradeC"
    });
    $.__views.__alloyId1580.add($.__views.gradeC);
    $.__views.__alloyId1585 = Ti.UI.createView({
        height: "98%",
        right: "1%",
        width: "70%",
        id: "__alloyId1585"
    });
    $.__views.gradeC.add($.__views.__alloyId1585);
    $.__views.imagemC = Ti.UI.createImageView({
        height: "100%",
        right: "0%",
        id: "imagemC"
    });
    $.__views.__alloyId1585.add($.__views.imagemC);
    $.__views.imagesC = Ti.UI.createView({
        top: 5,
        left: 3,
        width: "28%",
        height: "50%",
        zIndex: 10,
        id: "imagesC"
    });
    $.__views.gradeC.add($.__views.imagesC);
    $.__views.__alloyId1586 = Ti.UI.createView({
        height: "98%",
        left: "3%",
        width: "28%",
        id: "__alloyId1586"
    });
    $.__views.gradeC.add($.__views.__alloyId1586);
    $.__views.precoC = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        bottom: "1%",
        color: "#000000",
        height: "16%",
        left: "0%",
        width: "89.4%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "precoC"
    });
    $.__views.__alloyId1586.add($.__views.precoC);
    $.__views.tempoC = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        bottom: "19%",
        height: "16%",
        left: "0%",
        width: "45.5%",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoC"
    });
    $.__views.__alloyId1586.add($.__views.tempoC);
    $.__views.selecionaC = Ti.UI.createImageView({
        height: "16%",
        bottom: "19%",
        left: "45.5%",
        width: "43%",
        zIndex: 10,
        id: "selecionaC"
    });
    $.__views.__alloyId1586.add($.__views.selecionaC);
    $.__views.gradeD = Ti.UI.createView({
        backgroundColor: "#dddddd",
        bottom: "0",
        height: "48.5%",
        right: "0.6%",
        width: "49%",
        id: "gradeD"
    });
    $.__views.__alloyId1580.add($.__views.gradeD);
    $.__views.__alloyId1587 = Ti.UI.createView({
        height: "98%",
        right: "1%",
        width: "70%",
        id: "__alloyId1587"
    });
    $.__views.gradeD.add($.__views.__alloyId1587);
    $.__views.imagemD = Ti.UI.createImageView({
        height: "100%",
        right: "0%",
        id: "imagemD"
    });
    $.__views.__alloyId1587.add($.__views.imagemD);
    $.__views.imagesD = Ti.UI.createView({
        top: 5,
        left: 3,
        width: "28%",
        height: "50%",
        zIndex: 10,
        id: "imagesD"
    });
    $.__views.gradeD.add($.__views.imagesD);
    $.__views.__alloyId1588 = Ti.UI.createView({
        height: "98%",
        left: "3%",
        width: "28%",
        id: "__alloyId1588"
    });
    $.__views.gradeD.add($.__views.__alloyId1588);
    $.__views.precoD = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        bottom: "1%",
        color: "#000000",
        height: "16%",
        left: "0%",
        width: "89.4%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "precoD"
    });
    $.__views.__alloyId1588.add($.__views.precoD);
    $.__views.tempoD = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        bottom: "19%",
        height: "16%",
        left: "0%",
        width: "45.5%",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoD"
    });
    $.__views.__alloyId1588.add($.__views.tempoD);
    $.__views.selecionaD = Ti.UI.createImageView({
        height: "16%",
        bottom: "19%",
        left: "45.5%",
        width: "43%",
        zIndex: 10,
        id: "selecionaD"
    });
    $.__views.__alloyId1588.add($.__views.selecionaD);
    $.__views.__alloyId1589 = Ti.UI.createView({
        height: "10%",
        left: "0%",
        top: "90%",
        width: "100%",
        id: "__alloyId1589"
    });
    $.__views.win.add($.__views.__alloyId1589);
    $.__views.__alloyId1590 = Ti.UI.createView({
        height: "100%",
        left: "0",
        width: "25%",
        id: "__alloyId1590"
    });
    $.__views.__alloyId1589.add($.__views.__alloyId1590);
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
    $.__views.__alloyId1590.add($.__views.botaoQuatroVerticais);
    limpar ? $.__views.botaoQuatroVerticais.addEventListener("click", limpar) : __defers["$.__views.botaoQuatroVerticais!click!limpar"] = true;
    $.__views.__alloyId1591 = Ti.UI.createButton({
        backgroundColor: "#008382",
        borderRadius: "5",
        color: "#ffffff",
        height: "60%",
        left: "55%",
        width: "45%",
        title: "Voltar",
        id: "__alloyId1591"
    });
    $.__views.__alloyId1590.add($.__views.__alloyId1591);
    voltar ? $.__views.__alloyId1591.addEventListener("click", voltar) : __defers["$.__views.__alloyId1591!click!voltar"] = true;
    $.__views.__alloyId1592 = Ti.UI.createView({
        height: "100%",
        left: "25%",
        width: "50%",
        id: "__alloyId1592"
    });
    $.__views.__alloyId1589.add($.__views.__alloyId1592);
    $.__views.__alloyId1593 = Ti.UI.createImageView({
        image: "/images/primeiro.png",
        height: "60%",
        left: "2%",
        width: "12%",
        id: "__alloyId1593"
    });
    $.__views.__alloyId1592.add($.__views.__alloyId1593);
    primeiro ? $.__views.__alloyId1593.addEventListener("click", primeiro) : __defers["$.__views.__alloyId1593!click!primeiro"] = true;
    $.__views.__alloyId1594 = Ti.UI.createImageView({
        image: "/images/anterior.png",
        height: "60%",
        left: "16%",
        width: "12%",
        id: "__alloyId1594"
    });
    $.__views.__alloyId1592.add($.__views.__alloyId1594);
    anterior ? $.__views.__alloyId1594.addEventListener("click", anterior) : __defers["$.__views.__alloyId1594!click!anterior"] = true;
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
    $.__views.__alloyId1592.add($.__views.paginacao);
    $.__views.__alloyId1595 = Ti.UI.createImageView({
        image: "/images/proximo.png",
        height: "60%",
        left: "52%",
        width: "12%",
        id: "__alloyId1595"
    });
    $.__views.__alloyId1592.add($.__views.__alloyId1595);
    proximo ? $.__views.__alloyId1595.addEventListener("click", proximo) : __defers["$.__views.__alloyId1595!click!proximo"] = true;
    $.__views.__alloyId1596 = Ti.UI.createImageView({
        image: "/images/ultimo.png",
        height: "60%",
        left: "66%",
        width: "12%",
        id: "__alloyId1596"
    });
    $.__views.__alloyId1592.add($.__views.__alloyId1596);
    ultimo ? $.__views.__alloyId1596.addEventListener("click", ultimo) : __defers["$.__views.__alloyId1596!click!ultimo"] = true;
    $.__views.__alloyId1597 = Ti.UI.createView({
        height: "100%",
        right: "0%",
        width: "25%",
        id: "__alloyId1597"
    });
    $.__views.__alloyId1589.add($.__views.__alloyId1597);
    $.__views.__alloyId1598 = Ti.UI.createImageView({
        image: "/images/cesta.png",
        height: "60%",
        right: "0%",
        width: "75%",
        id: "__alloyId1598"
    });
    $.__views.__alloyId1597.add($.__views.__alloyId1598);
    cesta ? $.__views.__alloyId1598.addEventListener("click", cesta) : __defers["$.__views.__alloyId1598!click!cesta"] = true;
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
    $.__views.__alloyId1597.add($.__views.quantidade);
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
    renderProducts();
    var eventListener = function() {
        Ti.App.removeEventListener("removeBitmap", eventListener);
        Ti.API.info("Quatro quadrados");
        cleanImages();
    };
    Ti.App.addEventListener("removeBitmap", eventListener);
    __defers["$.__views.botaoQuatroVerticais!click!limpar"] && $.__views.botaoQuatroVerticais.addEventListener("click", limpar);
    __defers["$.__views.__alloyId1591!click!voltar"] && $.__views.__alloyId1591.addEventListener("click", voltar);
    __defers["$.__views.__alloyId1593!click!primeiro"] && $.__views.__alloyId1593.addEventListener("click", primeiro);
    __defers["$.__views.__alloyId1594!click!anterior"] && $.__views.__alloyId1594.addEventListener("click", anterior);
    __defers["$.__views.__alloyId1595!click!proximo"] && $.__views.__alloyId1595.addEventListener("click", proximo);
    __defers["$.__views.__alloyId1596!click!ultimo"] && $.__views.__alloyId1596.addEventListener("click", ultimo);
    __defers["$.__views.__alloyId1598!click!cesta"] && $.__views.__alloyId1598.addEventListener("click", cesta);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;