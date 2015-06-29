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
        var tempo;
        var referencia = "null";
        var start = (current_page - 1) * itemsperpage;
        var produtos = selectProductsByPage(empresa, marca, categoria, start, itemsperpage);
        $.gradeA.hide();
        while (produtos.isValidRow()) {
            switch (i) {
              case 0:
                $.gradeA.show();
                preco = $.precoA;
                tempo = $.tempoA;
                seleciona = $.selecionaA;
                referencia = $.referenciaA;
                imagem = $.imagemA;
            }
            loadItems(template, produtos, referencia, preco, tempo, seleciona, imagem, $.imagesA, $.quantidade);
            i++;
            produtos.next();
        }
        produtos.close();
    }
    function goToListaProdutos() {
        listProdutos();
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
    this.__controllerPath = "vitrine_um_horizontal";
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
        backgroundColor: "#ffffff",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId1652 = Ti.UI.createView({
        height: "90%",
        top: "0",
        id: "__alloyId1652"
    });
    $.__views.win.add($.__views.__alloyId1652);
    $.__views.gradeA = Ti.UI.createView({
        backgroundColor: "#dddddd",
        bottom: "0",
        height: "98%",
        width: "98%",
        id: "gradeA"
    });
    $.__views.__alloyId1652.add($.__views.gradeA);
    $.__views.__alloyId1653 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: "86%",
        top: "1.5%",
        width: "98%",
        id: "__alloyId1653"
    });
    $.__views.gradeA.add($.__views.__alloyId1653);
    $.__views.imagemA = Ti.UI.createImageView({
        width: "100%",
        id: "imagemA"
    });
    $.__views.__alloyId1653.add($.__views.imagemA);
    $.__views.__alloyId1654 = Ti.UI.createView({
        height: "8.8%",
        top: "89%",
        width: "98%",
        layout: "horizontal",
        id: "__alloyId1654"
    });
    $.__views.gradeA.add($.__views.__alloyId1654);
    $.__views.precoA = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        color: "#000000",
        height: "100%",
        left: "0",
        width: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "precoA"
    });
    $.__views.__alloyId1654.add($.__views.precoA);
    $.__views.referenciaA = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        color: "#000000",
        height: "100%",
        left: 3,
        width: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "referenciaA"
    });
    $.__views.__alloyId1654.add($.__views.referenciaA);
    $.__views.tempoA = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "100%",
        left: 3,
        width: "7%",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoA"
    });
    $.__views.__alloyId1654.add($.__views.tempoA);
    $.__views.selecionaA = Ti.UI.createImageView({
        height: "100%",
        left: 3,
        zIndex: 10,
        id: "selecionaA"
    });
    $.__views.__alloyId1654.add($.__views.selecionaA);
    $.__views.imagesA = Ti.UI.createView({
        left: 3,
        height: "100%",
        width: "400dp",
        id: "imagesA"
    });
    $.__views.__alloyId1654.add($.__views.imagesA);
    $.__views.__alloyId1655 = Ti.UI.createView({
        height: "10%",
        left: "0%",
        top: "90%",
        width: "100%",
        id: "__alloyId1655"
    });
    $.__views.win.add($.__views.__alloyId1655);
    $.__views.__alloyId1656 = Ti.UI.createView({
        height: "100%",
        left: "0",
        width: "25%",
        id: "__alloyId1656"
    });
    $.__views.__alloyId1655.add($.__views.__alloyId1656);
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
    $.__views.__alloyId1656.add($.__views.botaoQuatroVerticais);
    limpar ? $.__views.botaoQuatroVerticais.addEventListener("click", limpar) : __defers["$.__views.botaoQuatroVerticais!click!limpar"] = true;
    $.__views.__alloyId1657 = Ti.UI.createButton({
        backgroundColor: "#008382",
        borderRadius: "5",
        color: "#ffffff",
        height: "60%",
        left: "55%",
        width: "45%",
        title: "Voltar",
        id: "__alloyId1657"
    });
    $.__views.__alloyId1656.add($.__views.__alloyId1657);
    voltar ? $.__views.__alloyId1657.addEventListener("click", voltar) : __defers["$.__views.__alloyId1657!click!voltar"] = true;
    $.__views.__alloyId1658 = Ti.UI.createView({
        height: "100%",
        left: "25%",
        width: "50%",
        id: "__alloyId1658"
    });
    $.__views.__alloyId1655.add($.__views.__alloyId1658);
    $.__views.__alloyId1659 = Ti.UI.createImageView({
        image: "/images/primeiro.png",
        height: "60%",
        left: "2%",
        width: "12%",
        id: "__alloyId1659"
    });
    $.__views.__alloyId1658.add($.__views.__alloyId1659);
    primeiro ? $.__views.__alloyId1659.addEventListener("click", primeiro) : __defers["$.__views.__alloyId1659!click!primeiro"] = true;
    $.__views.__alloyId1660 = Ti.UI.createImageView({
        image: "/images/anterior.png",
        height: "60%",
        left: "16%",
        width: "12%",
        id: "__alloyId1660"
    });
    $.__views.__alloyId1658.add($.__views.__alloyId1660);
    anterior ? $.__views.__alloyId1660.addEventListener("click", anterior) : __defers["$.__views.__alloyId1660!click!anterior"] = true;
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
    $.__views.__alloyId1658.add($.__views.paginacao);
    $.__views.__alloyId1661 = Ti.UI.createImageView({
        image: "/images/proximo.png",
        height: "60%",
        left: "52%",
        width: "12%",
        id: "__alloyId1661"
    });
    $.__views.__alloyId1658.add($.__views.__alloyId1661);
    proximo ? $.__views.__alloyId1661.addEventListener("click", proximo) : __defers["$.__views.__alloyId1661!click!proximo"] = true;
    $.__views.__alloyId1662 = Ti.UI.createImageView({
        image: "/images/ultimo.png",
        height: "60%",
        left: "66%",
        width: "12%",
        id: "__alloyId1662"
    });
    $.__views.__alloyId1658.add($.__views.__alloyId1662);
    ultimo ? $.__views.__alloyId1662.addEventListener("click", ultimo) : __defers["$.__views.__alloyId1662!click!ultimo"] = true;
    $.__views.__alloyId1663 = Ti.UI.createImageView({
        image: "/images/lupa.png",
        height: "60%",
        left: "79%",
        width: "12%",
        id: "__alloyId1663"
    });
    $.__views.__alloyId1658.add($.__views.__alloyId1663);
    goToListaProdutos ? $.__views.__alloyId1663.addEventListener("click", goToListaProdutos) : __defers["$.__views.__alloyId1663!click!goToListaProdutos"] = true;
    $.__views.__alloyId1664 = Ti.UI.createView({
        height: "100%",
        right: "0%",
        width: "25%",
        id: "__alloyId1664"
    });
    $.__views.__alloyId1655.add($.__views.__alloyId1664);
    $.__views.__alloyId1665 = Ti.UI.createImageView({
        image: "/images/cesta.png",
        height: "60%",
        right: "0%",
        width: "75%",
        id: "__alloyId1665"
    });
    $.__views.__alloyId1664.add($.__views.__alloyId1665);
    cesta ? $.__views.__alloyId1665.addEventListener("click", cesta) : __defers["$.__views.__alloyId1665!click!cesta"] = true;
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
    $.__views.__alloyId1664.add($.__views.quantidade);
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
    var itemsperpage = 1;
    var empresa = Ti.App.Properties.getString(CURRENT_EMPRESA);
    var produtos = selectProductsCount(categoria, marca, empresa);
    var paginas = Math.ceil(produtos / itemsperpage);
    renderProducts();
    var eventListener = function() {
        Ti.App.removeEventListener("removeBitmap", eventListener);
        Ti.API.info("Um horizontal");
        cleanImages();
    };
    Ti.App.addEventListener("removeBitmap", eventListener);
    __defers["$.__views.botaoQuatroVerticais!click!limpar"] && $.__views.botaoQuatroVerticais.addEventListener("click", limpar);
    __defers["$.__views.__alloyId1657!click!voltar"] && $.__views.__alloyId1657.addEventListener("click", voltar);
    __defers["$.__views.__alloyId1659!click!primeiro"] && $.__views.__alloyId1659.addEventListener("click", primeiro);
    __defers["$.__views.__alloyId1660!click!anterior"] && $.__views.__alloyId1660.addEventListener("click", anterior);
    __defers["$.__views.__alloyId1661!click!proximo"] && $.__views.__alloyId1661.addEventListener("click", proximo);
    __defers["$.__views.__alloyId1662!click!ultimo"] && $.__views.__alloyId1662.addEventListener("click", ultimo);
    __defers["$.__views.__alloyId1663!click!goToListaProdutos"] && $.__views.__alloyId1663.addEventListener("click", goToListaProdutos);
    __defers["$.__views.__alloyId1665!click!cesta"] && $.__views.__alloyId1665.addEventListener("click", cesta);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;