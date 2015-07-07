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
            }
            loadItems(template, produtos, referencia, preco, tempo, seleciona, imagem, imagens, $.quantidade);
            i++;
            produtos.next();
        }
        produtos.close();
    }
    function limpar() {
        var exclui = Ti.UI.createAlertDialog({
            buttonNames: [ "Confirmar", "Cancelar" ],
            destructive: 2,
            title: "Desmarcar itens",
            message: "Essa opcao ira desmarcar todos os itens selecionados em todas as paginas!"
        });
        exclui.show();
        exclui.addEventListener("click", function(e) {
            0 == e.index ? categoryClear($.quantidade) : alert("Continue comprando");
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
    this.__controllerPath = "vitrine_tres_verticais";
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
    $.__views.vitrine_tres_verticais = Ti.UI.createView({
        backgroundColor: "#ffffff",
        id: "vitrine_tres_verticais"
    });
    $.__views.vitrine_tres_verticais && $.addTopLevelView($.__views.vitrine_tres_verticais);
    $.__views.__alloyId1638 = Ti.UI.createView({
        height: "90%",
        top: "0%",
        width: "100%",
        id: "__alloyId1638"
    });
    $.__views.vitrine_tres_verticais.add($.__views.__alloyId1638);
    $.__views.vitrine = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "horizontal",
        width: Ti.UI.SIZE,
        id: "vitrine"
    });
    $.__views.__alloyId1638.add($.__views.vitrine);
    $.__views.gradeA = Ti.UI.createView({
        backgroundColor: "#dddddd",
        height: "100%",
        layout: "vertical",
        width: "32%",
        id: "gradeA"
    });
    $.__views.vitrine.add($.__views.gradeA);
    $.__views.__alloyId1639 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        top: "1%",
        width: "98%",
        id: "__alloyId1639"
    });
    $.__views.gradeA.add($.__views.__alloyId1639);
    $.__views.imagemA = Ti.UI.createImageView({
        width: "100%",
        id: "imagemA"
    });
    $.__views.__alloyId1639.add($.__views.imagemA);
    $.__views.legendaA = Ti.UI.createView({
        layout: "horizontal",
        top: "1%",
        width: "98%",
        bottom: "1%",
        id: "legendaA"
    });
    $.__views.gradeA.add($.__views.legendaA);
    $.__views.informacaoA = Ti.UI.createView({
        height: "100%",
        layout: "horizontal",
        width: "35%",
        id: "informacaoA"
    });
    $.__views.legendaA.add($.__views.informacaoA);
    $.__views.tempoA = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "45%",
        width: "49%",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoA"
    });
    $.__views.informacaoA.add($.__views.tempoA);
    $.__views.selecionaA = Ti.UI.createImageView({
        height: "45%",
        width: "49%",
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
        width: "98%",
        id: "precoA"
    });
    $.__views.informacaoA.add($.__views.precoA);
    $.__views.imagesA = Ti.UI.createView({
        height: "90%",
        width: "63%",
        id: "imagesA"
    });
    $.__views.legendaA.add($.__views.imagesA);
    $.__views.gradeB = Ti.UI.createView({
        backgroundColor: "#dddddd",
        height: "100%",
        layout: "vertical",
        left: "1%",
        width: "32%",
        id: "gradeB"
    });
    $.__views.vitrine.add($.__views.gradeB);
    $.__views.__alloyId1640 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        top: "1%",
        width: "98%",
        id: "__alloyId1640"
    });
    $.__views.gradeB.add($.__views.__alloyId1640);
    $.__views.imagemB = Ti.UI.createImageView({
        width: "100%",
        id: "imagemB"
    });
    $.__views.__alloyId1640.add($.__views.imagemB);
    $.__views.legendaB = Ti.UI.createView({
        layout: "horizontal",
        top: "1%",
        width: "98%",
        bottom: "1%",
        id: "legendaB"
    });
    $.__views.gradeB.add($.__views.legendaB);
    $.__views.informacaoB = Ti.UI.createView({
        height: "100%",
        layout: "horizontal",
        width: "35%",
        id: "informacaoB"
    });
    $.__views.legendaB.add($.__views.informacaoB);
    $.__views.tempoB = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "45%",
        width: "49%",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoB"
    });
    $.__views.informacaoB.add($.__views.tempoB);
    $.__views.selecionaB = Ti.UI.createImageView({
        height: "45%",
        width: "49%",
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
        width: "98%",
        id: "precoB"
    });
    $.__views.informacaoB.add($.__views.precoB);
    $.__views.imagesB = Ti.UI.createView({
        height: "90%",
        width: "63%",
        id: "imagesB"
    });
    $.__views.legendaB.add($.__views.imagesB);
    $.__views.gradeC = Ti.UI.createView({
        backgroundColor: "#dddddd",
        height: "100%",
        layout: "vertical",
        left: "1%",
        width: "32%",
        id: "gradeC"
    });
    $.__views.vitrine.add($.__views.gradeC);
    $.__views.__alloyId1641 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        top: "1%",
        width: "98%",
        id: "__alloyId1641"
    });
    $.__views.gradeC.add($.__views.__alloyId1641);
    $.__views.imagemC = Ti.UI.createImageView({
        width: "100%",
        id: "imagemC"
    });
    $.__views.__alloyId1641.add($.__views.imagemC);
    $.__views.legendaC = Ti.UI.createView({
        layout: "horizontal",
        top: "1%",
        width: "98%",
        bottom: "1%",
        id: "legendaC"
    });
    $.__views.gradeC.add($.__views.legendaC);
    $.__views.informacaoC = Ti.UI.createView({
        height: "100%",
        layout: "horizontal",
        width: "35%",
        id: "informacaoC"
    });
    $.__views.legendaC.add($.__views.informacaoC);
    $.__views.tempoC = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "45%",
        width: "49%",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "tempoC"
    });
    $.__views.informacaoC.add($.__views.tempoC);
    $.__views.selecionaC = Ti.UI.createImageView({
        height: "45%",
        width: "49%",
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
        width: "98%",
        id: "precoC"
    });
    $.__views.informacaoC.add($.__views.precoC);
    $.__views.imagesC = Ti.UI.createView({
        height: "90%",
        width: "63%",
        id: "imagesC"
    });
    $.__views.legendaC.add($.__views.imagesC);
    $.__views.__alloyId1642 = Ti.UI.createView({
        height: "10%",
        top: "90%",
        width: "100%",
        id: "__alloyId1642"
    });
    $.__views.vitrine_tres_verticais.add($.__views.__alloyId1642);
    $.__views.__alloyId1643 = Ti.UI.createView({
        height: "100%",
        left: "0",
        width: "25%",
        id: "__alloyId1643"
    });
    $.__views.__alloyId1642.add($.__views.__alloyId1643);
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
    $.__views.__alloyId1643.add($.__views.botaoQuatroVerticais);
    limpar ? $.__views.botaoQuatroVerticais.addEventListener("click", limpar) : __defers["$.__views.botaoQuatroVerticais!click!limpar"] = true;
    $.__views.__alloyId1644 = Ti.UI.createButton({
        backgroundColor: "#008382",
        borderRadius: "5",
        color: "#ffffff",
        height: "60%",
        left: "55%",
        width: "45%",
        title: "Voltar",
        id: "__alloyId1644"
    });
    $.__views.__alloyId1643.add($.__views.__alloyId1644);
    voltar ? $.__views.__alloyId1644.addEventListener("click", voltar) : __defers["$.__views.__alloyId1644!click!voltar"] = true;
    $.__views.__alloyId1645 = Ti.UI.createView({
        height: "100%",
        left: "25%",
        width: "50%",
        id: "__alloyId1645"
    });
    $.__views.__alloyId1642.add($.__views.__alloyId1645);
    $.__views.__alloyId1646 = Ti.UI.createImageView({
        image: "/images/primeiro.png",
        height: "60%",
        left: "2%",
        width: "12%",
        id: "__alloyId1646"
    });
    $.__views.__alloyId1645.add($.__views.__alloyId1646);
    primeiro ? $.__views.__alloyId1646.addEventListener("click", primeiro) : __defers["$.__views.__alloyId1646!click!primeiro"] = true;
    $.__views.__alloyId1647 = Ti.UI.createImageView({
        image: "/images/anterior.png",
        height: "60%",
        left: "16%",
        width: "12%",
        id: "__alloyId1647"
    });
    $.__views.__alloyId1645.add($.__views.__alloyId1647);
    anterior ? $.__views.__alloyId1647.addEventListener("click", anterior) : __defers["$.__views.__alloyId1647!click!anterior"] = true;
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
    $.__views.__alloyId1645.add($.__views.paginacao);
    $.__views.__alloyId1648 = Ti.UI.createImageView({
        image: "/images/proximo.png",
        height: "60%",
        left: "52%",
        width: "12%",
        id: "__alloyId1648"
    });
    $.__views.__alloyId1645.add($.__views.__alloyId1648);
    proximo ? $.__views.__alloyId1648.addEventListener("click", proximo) : __defers["$.__views.__alloyId1648!click!proximo"] = true;
    $.__views.__alloyId1649 = Ti.UI.createImageView({
        image: "/images/ultimo.png",
        height: "60%",
        left: "66%",
        width: "12%",
        id: "__alloyId1649"
    });
    $.__views.__alloyId1645.add($.__views.__alloyId1649);
    ultimo ? $.__views.__alloyId1649.addEventListener("click", ultimo) : __defers["$.__views.__alloyId1649!click!ultimo"] = true;
    $.__views.__alloyId1650 = Ti.UI.createView({
        height: "100%",
        right: "0%",
        width: "25%",
        id: "__alloyId1650"
    });
    $.__views.__alloyId1642.add($.__views.__alloyId1650);
    $.__views.__alloyId1651 = Ti.UI.createImageView({
        image: "/images/cesta.png",
        height: "60%",
        right: "0%",
        width: "75%",
        id: "__alloyId1651"
    });
    $.__views.__alloyId1650.add($.__views.__alloyId1651);
    cesta ? $.__views.__alloyId1651.addEventListener("click", cesta) : __defers["$.__views.__alloyId1651!click!cesta"] = true;
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
    $.__views.__alloyId1650.add($.__views.quantidade);
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
    var itemsperpage = 3;
    var empresa = Ti.App.Properties.getString(CURRENT_EMPRESA);
    var produtos = selectProductsCount(categoria, marca, empresa);
    var paginas = Math.ceil(produtos / itemsperpage);
    redimencionaVitrine($.vitrine);
    renderProducts();
    var eventListener = function() {
        Ti.App.removeEventListener("removeBitmap", eventListener);
        Ti.API.info("Tres Verticais");
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
    __defers["$.__views.__alloyId1644!click!voltar"] && $.__views.__alloyId1644.addEventListener("click", voltar);
    __defers["$.__views.__alloyId1646!click!primeiro"] && $.__views.__alloyId1646.addEventListener("click", primeiro);
    __defers["$.__views.__alloyId1647!click!anterior"] && $.__views.__alloyId1647.addEventListener("click", anterior);
    __defers["$.__views.__alloyId1648!click!proximo"] && $.__views.__alloyId1648.addEventListener("click", proximo);
    __defers["$.__views.__alloyId1649!click!ultimo"] && $.__views.__alloyId1649.addEventListener("click", ultimo);
    __defers["$.__views.__alloyId1651!click!cesta"] && $.__views.__alloyId1651.addEventListener("click", cesta);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;