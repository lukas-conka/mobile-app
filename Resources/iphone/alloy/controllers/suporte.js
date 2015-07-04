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
    $.__views.__alloyId1368 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "100%",
        id: "__alloyId1368"
    });
    $.__views.suporte.add($.__views.__alloyId1368);
    $.__views.__alloyId1369 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#000000",
        right: "10",
        title: "SUPORTE",
        id: "__alloyId1369"
    });
    $.__views.__alloyId1368.add($.__views.__alloyId1369);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        left: "10",
        id: "logoEmpresa"
    });
    $.__views.__alloyId1368.add($.__views.logoEmpresa);
    $.__views.__alloyId1370 = Ti.UI.createView({
        height: "80%",
        top: "10%",
        width: "50%",
        borderRadius: 2,
        borderColor: "#6ea9a0",
        borderWidth: 3,
        layout: "vertical",
        id: "__alloyId1370"
    });
    $.__views.suporte.add($.__views.__alloyId1370);
    $.__views.__alloyId1371 = Ti.UI.createLabel({
        top: "1%",
        left: "2%",
        width: "78%",
        color: "black",
        height: "20%",
        text: "Antes de entrar em contato, pesquise em dúvidas sobre o sistema, outra opção é assistir aos vídeos tutoriais. Caso não encontre a solução do seu problema, entre em contato em uma das opções abaixo.",
        id: "__alloyId1371"
    });
    $.__views.__alloyId1370.add($.__views.__alloyId1371);
    $.__views.__alloyId1372 = Ti.UI.createView({
        left: 0,
        width: "95%",
        top: "1%",
        height: "14%",
        borderColor: "#dddddd",
        borderWidth: 1,
        layout: "horizontal",
        id: "__alloyId1372"
    });
    $.__views.__alloyId1370.add($.__views.__alloyId1372);
    $.__views.__alloyId1373 = Ti.UI.createView({
        left: "2%",
        height: "100%",
        width: "20%",
        id: "__alloyId1373"
    });
    $.__views.__alloyId1372.add($.__views.__alloyId1373);
    $.__views.__alloyId1374 = Ti.UI.createImageView({
        height: "100%",
        image: "/images/suporte_skype.jpg",
        id: "__alloyId1374"
    });
    $.__views.__alloyId1373.add($.__views.__alloyId1374);
    $.__views.__alloyId1375 = Ti.UI.createLabel({
        color: "black",
        left: 5,
        text: "e-catalogos",
        id: "__alloyId1375"
    });
    $.__views.__alloyId1372.add($.__views.__alloyId1375);
    $.__views.__alloyId1376 = Ti.UI.createView({
        left: 0,
        width: "95%",
        top: "1%",
        height: "14%",
        borderColor: "#dddddd",
        borderWidth: 1,
        layout: "horizontal",
        id: "__alloyId1376"
    });
    $.__views.__alloyId1370.add($.__views.__alloyId1376);
    $.__views.__alloyId1377 = Ti.UI.createView({
        left: "2%",
        height: "100%",
        width: "20%",
        id: "__alloyId1377"
    });
    $.__views.__alloyId1376.add($.__views.__alloyId1377);
    $.__views.__alloyId1378 = Ti.UI.createImageView({
        height: "100%",
        image: "/images/suporte_youtube.jpg",
        id: "__alloyId1378"
    });
    $.__views.__alloyId1377.add($.__views.__alloyId1378);
    $.__views.__alloyId1379 = Ti.UI.createLabel({
        color: "black",
        left: 5,
        text: "suporteecatalogos",
        id: "__alloyId1379"
    });
    $.__views.__alloyId1376.add($.__views.__alloyId1379);
    $.__views.__alloyId1380 = Ti.UI.createView({
        left: 0,
        width: "95%",
        top: "1%",
        height: "14%",
        borderColor: "#dddddd",
        borderWidth: 1,
        layout: "horizontal",
        id: "__alloyId1380"
    });
    $.__views.__alloyId1370.add($.__views.__alloyId1380);
    $.__views.__alloyId1381 = Ti.UI.createView({
        left: "2%",
        height: "100%",
        width: "20%",
        id: "__alloyId1381"
    });
    $.__views.__alloyId1380.add($.__views.__alloyId1381);
    $.__views.__alloyId1382 = Ti.UI.createImageView({
        height: "100%",
        image: "/images/suporte_email.jpg",
        id: "__alloyId1382"
    });
    $.__views.__alloyId1381.add($.__views.__alloyId1382);
    $.__views.__alloyId1383 = Ti.UI.createLabel({
        color: "black",
        left: 5,
        text: "suporte@e-catalogos.net",
        id: "__alloyId1383"
    });
    $.__views.__alloyId1380.add($.__views.__alloyId1383);
    $.__views.__alloyId1384 = Ti.UI.createView({
        left: 0,
        width: "95%",
        top: "1%",
        height: "14%",
        borderColor: "#dddddd",
        borderWidth: 1,
        layout: "horizontal",
        id: "__alloyId1384"
    });
    $.__views.__alloyId1370.add($.__views.__alloyId1384);
    $.__views.__alloyId1385 = Ti.UI.createView({
        left: "2%",
        height: "100%",
        width: "20%",
        id: "__alloyId1385"
    });
    $.__views.__alloyId1384.add($.__views.__alloyId1385);
    $.__views.__alloyId1386 = Ti.UI.createImageView({
        height: "100%",
        image: "/images/suporte_telefone.jpg",
        id: "__alloyId1386"
    });
    $.__views.__alloyId1385.add($.__views.__alloyId1386);
    $.__views.__alloyId1387 = Ti.UI.createLabel({
        color: "black",
        left: 5,
        text: "(11) 4304-5813",
        id: "__alloyId1387"
    });
    $.__views.__alloyId1384.add($.__views.__alloyId1387);
    $.__views.__alloyId1388 = Ti.UI.createView({
        left: 0,
        width: "95%",
        top: "1%",
        height: "14%",
        borderColor: "#dddddd",
        borderWidth: 1,
        layout: "horizontal",
        id: "__alloyId1388"
    });
    $.__views.__alloyId1370.add($.__views.__alloyId1388);
    $.__views.__alloyId1389 = Ti.UI.createView({
        left: "2%",
        height: "100%",
        width: "20%",
        id: "__alloyId1389"
    });
    $.__views.__alloyId1388.add($.__views.__alloyId1389);
    $.__views.__alloyId1390 = Ti.UI.createImageView({
        height: "100%",
        image: "/images/suporte_teamviewer.jpg",
        id: "__alloyId1390"
    });
    $.__views.__alloyId1389.add($.__views.__alloyId1390);
    $.__views.__alloyId1391 = Ti.UI.createLabel({
        color: "black",
        left: 5,
        text: "TeamViewer",
        id: "__alloyId1391"
    });
    $.__views.__alloyId1388.add($.__views.__alloyId1391);
    $.__views.__alloyId1392 = Ti.UI.createView({
        height: "7%",
        bottom: "1%",
        width: "100%",
        id: "__alloyId1392"
    });
    $.__views.suporte.add($.__views.__alloyId1392);
    $.__views.__alloyId1393 = Ti.UI.createButton({
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
        id: "__alloyId1393"
    });
    $.__views.__alloyId1392.add($.__views.__alloyId1393);
    voltar ? $.__views.__alloyId1393.addEventListener("click", voltar) : __defers["$.__views.__alloyId1393!click!voltar"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/aparencia.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    __defers["$.__views.__alloyId1393!click!voltar"] && $.__views.__alloyId1393.addEventListener("click", voltar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;