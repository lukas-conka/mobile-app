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
    $.__views.__alloyId1329 = Ti.UI.createLabel({
        top: 10,
        color: "#000000",
        left: 10,
        text: "SINCRONIZAÇÃO DE DADOS",
        id: "__alloyId1329"
    });
    $.__views.sincronizacao.add($.__views.__alloyId1329);
    $.__views.__alloyId1330 = Ti.UI.createLabel({
        color: "#000000",
        top: "10%",
        right: 10,
        left: 10,
        text: "As funções EXPORTAR e IMPORTAR são fundamentáis para sincronizar as informações com o sistema web, em caso de inclusão ou correção de alguma informação e/ou imagem efetuadas pelo fabricante.\n\n\n A ação de sincronizar os dados não elimina a necessidade de backup.",
        id: "__alloyId1330"
    });
    $.__views.sincronizacao.add($.__views.__alloyId1330);
    $.__views.__alloyId1331 = Ti.UI.createView({
        height: "60%",
        top: "30%",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId1331"
    });
    $.__views.sincronizacao.add($.__views.__alloyId1331);
    $.__views.__alloyId1332 = Ti.UI.createView({
        backgroundColor: "white",
        borderRadius: "5",
        width: "45%",
        left: "3%",
        id: "__alloyId1332"
    });
    $.__views.__alloyId1331.add($.__views.__alloyId1332);
    $.__views.__alloyId1333 = Ti.UI.createLabel({
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
        id: "__alloyId1333"
    });
    $.__views.__alloyId1332.add($.__views.__alloyId1333);
    $.__views.__alloyId1334 = Ti.UI.createLabel({
        top: "20%",
        color: "black",
        left: "5%",
        text: "Dados dos pedidos\nDados dos clientes\nDados de email",
        id: "__alloyId1334"
    });
    $.__views.__alloyId1332.add($.__views.__alloyId1334);
    $.__views.__alloyId1335 = Ti.UI.createButton({
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
        id: "__alloyId1335"
    });
    $.__views.__alloyId1332.add($.__views.__alloyId1335);
    exportar ? $.__views.__alloyId1335.addEventListener("click", exportar) : __defers["$.__views.__alloyId1335!click!exportar"] = true;
    $.__views.__alloyId1336 = Ti.UI.createView({
        backgroundColor: "white",
        borderRadius: "5",
        width: "45%",
        left: "3%",
        id: "__alloyId1336"
    });
    $.__views.__alloyId1331.add($.__views.__alloyId1336);
    $.__views.__alloyId1337 = Ti.UI.createLabel({
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
        id: "__alloyId1337"
    });
    $.__views.__alloyId1336.add($.__views.__alloyId1337);
    $.__views.__alloyId1338 = Ti.UI.createLabel({
        top: "20%",
        color: "black",
        left: "5%",
        text: "Dados dos produtos\nDados das imagens\nDados de marcas\nDados dos representantes",
        id: "__alloyId1338"
    });
    $.__views.__alloyId1336.add($.__views.__alloyId1338);
    $.__views.__alloyId1339 = Ti.UI.createButton({
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
        id: "__alloyId1339"
    });
    $.__views.__alloyId1336.add($.__views.__alloyId1339);
    importar ? $.__views.__alloyId1339.addEventListener("click", importar) : __defers["$.__views.__alloyId1339!click!importar"] = true;
    $.__views.__alloyId1340 = Ti.UI.createView({
        height: "7%",
        bottom: "1%",
        width: "100%",
        id: "__alloyId1340"
    });
    $.__views.sincronizacao.add($.__views.__alloyId1340);
    $.__views.__alloyId1341 = Ti.UI.createButton({
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
        id: "__alloyId1341"
    });
    $.__views.__alloyId1340.add($.__views.__alloyId1341);
    voltar ? $.__views.__alloyId1341.addEventListener("click", voltar) : __defers["$.__views.__alloyId1341!click!voltar"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId1335!click!exportar"] && $.__views.__alloyId1335.addEventListener("click", exportar);
    __defers["$.__views.__alloyId1339!click!importar"] && $.__views.__alloyId1339.addEventListener("click", importar);
    __defers["$.__views.__alloyId1341!click!voltar"] && $.__views.__alloyId1341.addEventListener("click", voltar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;