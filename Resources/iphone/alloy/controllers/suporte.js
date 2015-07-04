function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function voltar() {
        goTo("funcao");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "suporte";
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
    $.__views.suporte = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        id: "suporte"
    });
    $.__views.suporte && $.addTopLevelView($.__views.suporte);
    $.__views.__alloyId1442 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "100%",
        id: "__alloyId1442"
    });
    $.__views.suporte.add($.__views.__alloyId1442);
    $.__views.__alloyId1443 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#000000",
        right: "10",
        title: "SUPORTE",
        id: "__alloyId1443"
    });
    $.__views.__alloyId1442.add($.__views.__alloyId1443);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        left: "10",
        id: "logoEmpresa"
    });
    $.__views.__alloyId1442.add($.__views.logoEmpresa);
    $.__views.__alloyId1444 = Ti.UI.createView({
        height: "80%",
        top: "10%",
        width: "50%",
        borderRadius: 2,
        borderColor: "#6ea9a0",
        borderWidth: 3,
        layout: "vertical",
        id: "__alloyId1444"
    });
    $.__views.suporte.add($.__views.__alloyId1444);
    $.__views.__alloyId1445 = Ti.UI.createLabel({
        top: "1%",
        left: "2%",
        width: "78%",
        color: "black",
        height: "20%",
        text: "Antes de entrar em contato, pesquise em dúvidas sobre o sistema, outra opção é assistir aos vídeos tutoriais. Caso não encontre a solução do seu problema, entre em contato em uma das opções abaixo.",
        id: "__alloyId1445"
    });
    $.__views.__alloyId1444.add($.__views.__alloyId1445);
    $.__views.__alloyId1446 = Ti.UI.createView({
        left: 0,
        width: "95%",
        top: "1%",
        height: "14%",
        borderColor: "#dddddd",
        borderWidth: 1,
        layout: "horizontal",
        id: "__alloyId1446"
    });
    $.__views.__alloyId1444.add($.__views.__alloyId1446);
    $.__views.__alloyId1447 = Ti.UI.createView({
        left: "2%",
        height: "100%",
        width: "20%",
        id: "__alloyId1447"
    });
    $.__views.__alloyId1446.add($.__views.__alloyId1447);
    $.__views.__alloyId1448 = Ti.UI.createImageView({
        height: "100%",
        image: "/images/suporte_skype.jpg",
        id: "__alloyId1448"
    });
    $.__views.__alloyId1447.add($.__views.__alloyId1448);
    $.__views.__alloyId1449 = Ti.UI.createLabel({
        color: "black",
        left: 5,
        text: "e-catalogos",
        id: "__alloyId1449"
    });
    $.__views.__alloyId1446.add($.__views.__alloyId1449);
    $.__views.__alloyId1450 = Ti.UI.createView({
        left: 0,
        width: "95%",
        top: "1%",
        height: "14%",
        borderColor: "#dddddd",
        borderWidth: 1,
        layout: "horizontal",
        id: "__alloyId1450"
    });
    $.__views.__alloyId1444.add($.__views.__alloyId1450);
    $.__views.__alloyId1451 = Ti.UI.createView({
        left: "2%",
        height: "100%",
        width: "20%",
        id: "__alloyId1451"
    });
    $.__views.__alloyId1450.add($.__views.__alloyId1451);
    $.__views.__alloyId1452 = Ti.UI.createImageView({
        height: "100%",
        image: "/images/suporte_youtube.jpg",
        id: "__alloyId1452"
    });
    $.__views.__alloyId1451.add($.__views.__alloyId1452);
    $.__views.__alloyId1453 = Ti.UI.createLabel({
        color: "black",
        left: 5,
        text: "suporteecatalogos",
        id: "__alloyId1453"
    });
    $.__views.__alloyId1450.add($.__views.__alloyId1453);
    $.__views.__alloyId1454 = Ti.UI.createView({
        left: 0,
        width: "95%",
        top: "1%",
        height: "14%",
        borderColor: "#dddddd",
        borderWidth: 1,
        layout: "horizontal",
        id: "__alloyId1454"
    });
    $.__views.__alloyId1444.add($.__views.__alloyId1454);
    $.__views.__alloyId1455 = Ti.UI.createView({
        left: "2%",
        height: "100%",
        width: "20%",
        id: "__alloyId1455"
    });
    $.__views.__alloyId1454.add($.__views.__alloyId1455);
    $.__views.__alloyId1456 = Ti.UI.createImageView({
        height: "100%",
        image: "/images/suporte_email.jpg",
        id: "__alloyId1456"
    });
    $.__views.__alloyId1455.add($.__views.__alloyId1456);
    $.__views.__alloyId1457 = Ti.UI.createLabel({
        color: "black",
        left: 5,
        text: "suporte@e-catalogos.net",
        id: "__alloyId1457"
    });
    $.__views.__alloyId1454.add($.__views.__alloyId1457);
    $.__views.__alloyId1458 = Ti.UI.createView({
        left: 0,
        width: "95%",
        top: "1%",
        height: "14%",
        borderColor: "#dddddd",
        borderWidth: 1,
        layout: "horizontal",
        id: "__alloyId1458"
    });
    $.__views.__alloyId1444.add($.__views.__alloyId1458);
    $.__views.__alloyId1459 = Ti.UI.createView({
        left: "2%",
        height: "100%",
        width: "20%",
        id: "__alloyId1459"
    });
    $.__views.__alloyId1458.add($.__views.__alloyId1459);
    $.__views.__alloyId1460 = Ti.UI.createImageView({
        height: "100%",
        image: "/images/suporte_telefone.jpg",
        id: "__alloyId1460"
    });
    $.__views.__alloyId1459.add($.__views.__alloyId1460);
    $.__views.__alloyId1461 = Ti.UI.createLabel({
        color: "black",
        left: 5,
        text: "(11) 4304-5813",
        id: "__alloyId1461"
    });
    $.__views.__alloyId1458.add($.__views.__alloyId1461);
    $.__views.__alloyId1462 = Ti.UI.createView({
        left: 0,
        width: "95%",
        top: "1%",
        height: "14%",
        borderColor: "#dddddd",
        borderWidth: 1,
        layout: "horizontal",
        id: "__alloyId1462"
    });
    $.__views.__alloyId1444.add($.__views.__alloyId1462);
    $.__views.__alloyId1463 = Ti.UI.createView({
        left: "2%",
        height: "100%",
        width: "20%",
        id: "__alloyId1463"
    });
    $.__views.__alloyId1462.add($.__views.__alloyId1463);
    $.__views.__alloyId1464 = Ti.UI.createImageView({
        height: "100%",
        image: "/images/suporte_teamviewer.jpg",
        id: "__alloyId1464"
    });
    $.__views.__alloyId1463.add($.__views.__alloyId1464);
    $.__views.__alloyId1465 = Ti.UI.createLabel({
        color: "black",
        left: 5,
        text: "TeamViewer",
        id: "__alloyId1465"
    });
    $.__views.__alloyId1462.add($.__views.__alloyId1465);
    $.__views.__alloyId1466 = Ti.UI.createView({
        height: "7%",
        bottom: "1%",
        width: "100%",
        id: "__alloyId1466"
    });
    $.__views.suporte.add($.__views.__alloyId1466);
    $.__views.__alloyId1467 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        left: "1%",
        width: "10%",
        bottom: "1%",
        title: "Voltar",
        id: "__alloyId1467"
    });
    $.__views.__alloyId1466.add($.__views.__alloyId1467);
    voltar ? $.__views.__alloyId1467.addEventListener("click", voltar) : __defers["$.__views.__alloyId1467!click!voltar"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/aparencia.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    __defers["$.__views.__alloyId1467!click!voltar"] && $.__views.__alloyId1467.addEventListener("click", voltar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;