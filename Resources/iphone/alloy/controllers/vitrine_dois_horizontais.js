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
    this.__controllerPath = "vitrine_dois_horizontais";
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
    $.__views.vitrine_dois_horizontais = Ti.UI.createView({
        backgroundColor: "white",
        id: "vitrine_dois_horizontais"
    });
    $.__views.vitrine_dois_horizontais && $.addTopLevelView($.__views.vitrine_dois_horizontais);
    $.__views.__alloyId1533 = Ti.UI.createView({
        height: "90%",
        top: "0%",
        width: "100%",
        id: "__alloyId1533"
    });
    $.__views.vitrine_dois_horizontais.add($.__views.__alloyId1533);
    $.__views.vitrine = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        width: Ti.UI.SIZE,
        id: "vitrine"
    });
    $.__views.__alloyId1533.add($.__views.vitrine);
    $.__views.gradeA = Ti.UI.createView({
        backgroundColor: "#dddddd",
        height: "48.5%",
        layout: "vertical",
        top: "1.5%",
        width: "98%",
        id: "gradeA"
    });
    $.__views.vitrine.add($.__views.gradeA);
    $.__views.__alloyId1534 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        top: "3%",
        width: "98%",
        id: "__alloyId1534"
    });
    $.__views.gradeA.add($.__views.__alloyId1534);
    $.__views.imagemA = Ti.UI.createImageView({
        width: "100%",
        id: "imagemA"
    });
    $.__views.__alloyId1534.add($.__views.imagemA);
    $.__views.__alloyId1535 = Ti.UI.createView({
        layout: "horizontal",
        width: "98%",
        id: "__alloyId1535"
    });
    $.__views.gradeA.add($.__views.__alloyId1535);
    $.__views.precoA = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        color: "#000000",
        font: {
            fontSize: 15
        },
        height: "80%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "10%",
        width: "10%",
        id: "precoA"
    });
    $.__views.__alloyId1535.add($.__views.precoA);
    $.__views.tempoA = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        font: {
            fontSize: 15
        },
        height: "80%",
        left: "1%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "10%",
        width: "7%",
        id: "tempoA"
    });
    $.__views.__alloyId1535.add($.__views.tempoA);
    $.__views.selecionaA = Ti.UI.createImageView({
        height: "80%",
        left: "1%",
        top: "10%",
        zIndex: 10,
        id: "selecionaA"
    });
    $.__views.__alloyId1535.add($.__views.selecionaA);
    $.__views.imagesA = Ti.UI.createView({
        height: "80%",
        left: "1%",
        top: "10%",
        width: "60%",
        id: "imagesA"
    });
    $.__views.__alloyId1535.add($.__views.imagesA);
    $.__views.gradeB = Ti.UI.createView({
        backgroundColor: "#dddddd",
        height: "48.5%",
        layout: "vertical",
        top: "1%",
        width: "98%",
        id: "gradeB"
    });
    $.__views.vitrine.add($.__views.gradeB);
    $.__views.__alloyId1536 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        top: "3%",
        width: "98%",
        id: "__alloyId1536"
    });
    $.__views.gradeB.add($.__views.__alloyId1536);
    $.__views.imagemB = Ti.UI.createImageView({
        width: "100%",
        id: "imagemB"
    });
    $.__views.__alloyId1536.add($.__views.imagemB);
    $.__views.__alloyId1537 = Ti.UI.createView({
        layout: "horizontal",
        width: "98%",
        id: "__alloyId1537"
    });
    $.__views.gradeB.add($.__views.__alloyId1537);
    $.__views.precoB = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        color: "#000000",
        font: {
            fontSize: 15
        },
        height: "80%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "10%",
        width: "10%",
        id: "precoB"
    });
    $.__views.__alloyId1537.add($.__views.precoB);
    $.__views.tempoB = Ti.UI.createButton({
        backgroundColor: "#000000",
        color: "#ffffff",
        font: {
            fontSize: 15
        },
        height: "80%",
        left: "1%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "10%",
        width: "7%",
        id: "tempoB"
    });
    $.__views.__alloyId1537.add($.__views.tempoB);
    $.__views.selecionaB = Ti.UI.createImageView({
        height: "80%",
        left: "1%",
        top: "10%",
        zIndex: 10,
        id: "selecionaB"
    });
    $.__views.__alloyId1537.add($.__views.selecionaB);
    $.__views.imagesB = Ti.UI.createView({
        height: "80%",
        left: "1%",
        top: "10%",
        width: "60%",
        id: "imagesB"
    });
    $.__views.__alloyId1537.add($.__views.imagesB);
    $.__views.__alloyId1538 = Ti.UI.createView({
        height: "10%",
        left: "0%",
        top: "90%",
        width: "100%",
        id: "__alloyId1538"
    });
    $.__views.vitrine_dois_horizontais.add($.__views.__alloyId1538);
    $.__views.__alloyId1539 = Ti.UI.createView({
        height: "100%",
        left: "0",
        width: "25%",
        id: "__alloyId1539"
    });
    $.__views.__alloyId1538.add($.__views.__alloyId1539);
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
    $.__views.__alloyId1539.add($.__views.botaoQuatroVerticais);
    limpar ? $.__views.botaoQuatroVerticais.addEventListener("click", limpar) : __defers["$.__views.botaoQuatroVerticais!click!limpar"] = true;
    $.__views.__alloyId1540 = Ti.UI.createButton({
        backgroundColor: "#008382",
        borderRadius: "5",
        color: "#ffffff",
        height: "60%",
        left: "55%",
        width: "45%",
        title: "Voltar",
        id: "__alloyId1540"
    });
    $.__views.__alloyId1539.add($.__views.__alloyId1540);
    voltar ? $.__views.__alloyId1540.addEventListener("click", voltar) : __defers["$.__views.__alloyId1540!click!voltar"] = true;
    $.__views.__alloyId1541 = Ti.UI.createView({
        height: "100%",
        left: "25%",
        width: "50%",
        id: "__alloyId1541"
    });
    $.__views.__alloyId1538.add($.__views.__alloyId1541);
    $.__views.__alloyId1542 = Ti.UI.createImageView({
        image: "/images/primeiro.png",
        height: "60%",
        left: "2%",
        width: "12%",
        id: "__alloyId1542"
    });
    $.__views.__alloyId1541.add($.__views.__alloyId1542);
    primeiro ? $.__views.__alloyId1542.addEventListener("click", primeiro) : __defers["$.__views.__alloyId1542!click!primeiro"] = true;
    $.__views.__alloyId1543 = Ti.UI.createImageView({
        image: "/images/anterior.png",
        height: "60%",
        left: "16%",
        width: "12%",
        id: "__alloyId1543"
    });
    $.__views.__alloyId1541.add($.__views.__alloyId1543);
    anterior ? $.__views.__alloyId1543.addEventListener("click", anterior) : __defers["$.__views.__alloyId1543!click!anterior"] = true;
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
    $.__views.__alloyId1541.add($.__views.paginacao);
    $.__views.__alloyId1544 = Ti.UI.createImageView({
        image: "/images/proximo.png",
        height: "60%",
        left: "52%",
        width: "12%",
        id: "__alloyId1544"
    });
    $.__views.__alloyId1541.add($.__views.__alloyId1544);
    proximo ? $.__views.__alloyId1544.addEventListener("click", proximo) : __defers["$.__views.__alloyId1544!click!proximo"] = true;
    $.__views.__alloyId1545 = Ti.UI.createImageView({
        image: "/images/ultimo.png",
        height: "60%",
        left: "66%",
        width: "12%",
        id: "__alloyId1545"
    });
    $.__views.__alloyId1541.add($.__views.__alloyId1545);
    ultimo ? $.__views.__alloyId1545.addEventListener("click", ultimo) : __defers["$.__views.__alloyId1545!click!ultimo"] = true;
    $.__views.__alloyId1546 = Ti.UI.createView({
        height: "100%",
        right: "0%",
        width: "25%",
        id: "__alloyId1546"
    });
    $.__views.__alloyId1538.add($.__views.__alloyId1546);
    $.__views.__alloyId1547 = Ti.UI.createImageView({
        image: "/images/cesta.png",
        height: "60%",
        right: "0%",
        width: "75%",
        id: "__alloyId1547"
    });
    $.__views.__alloyId1546.add($.__views.__alloyId1547);
    cesta ? $.__views.__alloyId1547.addEventListener("click", cesta) : __defers["$.__views.__alloyId1547!click!cesta"] = true;
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
    $.__views.__alloyId1546.add($.__views.quantidade);
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
        Ti.API.info("Dois Horizontais");
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
    __defers["$.__views.__alloyId1540!click!voltar"] && $.__views.__alloyId1540.addEventListener("click", voltar);
    __defers["$.__views.__alloyId1542!click!primeiro"] && $.__views.__alloyId1542.addEventListener("click", primeiro);
    __defers["$.__views.__alloyId1543!click!anterior"] && $.__views.__alloyId1543.addEventListener("click", anterior);
    __defers["$.__views.__alloyId1544!click!proximo"] && $.__views.__alloyId1544.addEventListener("click", proximo);
    __defers["$.__views.__alloyId1545!click!ultimo"] && $.__views.__alloyId1545.addEventListener("click", ultimo);
    __defers["$.__views.__alloyId1547!click!cesta"] && $.__views.__alloyId1547.addEventListener("click", cesta);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;