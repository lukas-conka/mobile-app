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
    function importar() {
        goTo("importar");
    }
    function exportar() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "sincronizacao";
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
    $.__views.sincronizacao = Ti.UI.createWindow({
        backgroundColor: "#ebebeb",
        id: "sincronizacao"
    });
    $.__views.sincronizacao && $.addTopLevelView($.__views.sincronizacao);
    $.__views.__alloyId1405 = Ti.UI.createLabel({
        top: 10,
        color: "#000000",
        left: 10,
        text: "SINCRONIZAÇÃO DE DADOS",
        id: "__alloyId1405"
    });
    $.__views.sincronizacao.add($.__views.__alloyId1405);
    $.__views.__alloyId1406 = Ti.UI.createLabel({
        color: "#000000",
        top: "10%",
        right: 10,
        left: 10,
        text: "As funções EXPORTAR e IMPORTAR são fundamentáis para sincronizar as informações com o sistema web, em caso de inclusão ou correção de alguma informação e/ou imagem efetuadas pelo fabricante.\n\n\n A ação de sincronizar os dados não elimina a necessidade de backup.",
        id: "__alloyId1406"
    });
    $.__views.sincronizacao.add($.__views.__alloyId1406);
    $.__views.__alloyId1407 = Ti.UI.createView({
        height: "60%",
        top: "30%",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId1407"
    });
    $.__views.sincronizacao.add($.__views.__alloyId1407);
    $.__views.__alloyId1408 = Ti.UI.createView({
        backgroundColor: "white",
        borderRadius: "5",
        width: "45%",
        left: "3%",
        id: "__alloyId1408"
    });
    $.__views.__alloyId1407.add($.__views.__alloyId1408);
    $.__views.__alloyId1409 = Ti.UI.createLabel({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        width: "95%",
        height: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "1%",
        text: "EXPORTAR",
        id: "__alloyId1409"
    });
    $.__views.__alloyId1408.add($.__views.__alloyId1409);
    $.__views.__alloyId1410 = Ti.UI.createLabel({
        top: "20%",
        color: "black",
        left: "5%",
        text: "Dados dos pedidos\nDados dos clientes\nDados de email",
        id: "__alloyId1410"
    });
    $.__views.__alloyId1408.add($.__views.__alloyId1410);
    $.__views.__alloyId1411 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        right: "3%",
        width: "15%",
        bottom: "3%",
        title: "OK",
        id: "__alloyId1411"
    });
    $.__views.__alloyId1408.add($.__views.__alloyId1411);
    exportar ? $.__views.__alloyId1411.addEventListener("click", exportar) : __defers["$.__views.__alloyId1411!click!exportar"] = true;
    $.__views.__alloyId1412 = Ti.UI.createView({
        backgroundColor: "white",
        borderRadius: "5",
        width: "45%",
        left: "3%",
        id: "__alloyId1412"
    });
    $.__views.__alloyId1407.add($.__views.__alloyId1412);
    $.__views.__alloyId1413 = Ti.UI.createLabel({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        width: "95%",
        height: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "1%",
        text: "IMPORTAR",
        id: "__alloyId1413"
    });
    $.__views.__alloyId1412.add($.__views.__alloyId1413);
    $.__views.__alloyId1414 = Ti.UI.createLabel({
        top: "20%",
        color: "black",
        left: "5%",
        text: "Dados dos produtos\nDados das imagens\nDados de marcas\nDados dos representantes",
        id: "__alloyId1414"
    });
    $.__views.__alloyId1412.add($.__views.__alloyId1414);
    $.__views.__alloyId1415 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        right: "3%",
        width: "15%",
        bottom: "3%",
        title: "OK",
        id: "__alloyId1415"
    });
    $.__views.__alloyId1412.add($.__views.__alloyId1415);
    importar ? $.__views.__alloyId1415.addEventListener("click", importar) : __defers["$.__views.__alloyId1415!click!importar"] = true;
    $.__views.__alloyId1416 = Ti.UI.createView({
        height: "7%",
        bottom: "1%",
        width: "100%",
        id: "__alloyId1416"
    });
    $.__views.sincronizacao.add($.__views.__alloyId1416);
    $.__views.__alloyId1417 = Ti.UI.createButton({
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
        id: "__alloyId1417"
    });
    $.__views.__alloyId1416.add($.__views.__alloyId1417);
    voltar ? $.__views.__alloyId1417.addEventListener("click", voltar) : __defers["$.__views.__alloyId1417!click!voltar"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId1411!click!exportar"] && $.__views.__alloyId1411.addEventListener("click", exportar);
    __defers["$.__views.__alloyId1415!click!importar"] && $.__views.__alloyId1415.addEventListener("click", importar);
    __defers["$.__views.__alloyId1417!click!voltar"] && $.__views.__alloyId1417.addEventListener("click", voltar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;