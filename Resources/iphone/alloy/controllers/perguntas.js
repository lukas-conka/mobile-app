function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function resultadoperguntas() {
        var count = 0;
        var perguntas = consultaPerguntas(software, busca_texto);
        var data = [];
        while (perguntas.isValidRow()) {
            count++;
            var prg_id = perguntas.fieldByName("prg_id");
            var prg_pergunta = perguntas.fieldByName("prg_pergunta");
            var prg_resposta = perguntas.fieldByName("prg_resposta");
            data.push({
                prg_id: prg_id,
                label_pergunta: {
                    text: count + ": " + prg_pergunta
                },
                label_resposta: {
                    text: prg_resposta
                }
            });
            perguntas.next();
        }
        $.listaperguntas.sections[0].setItems(data);
    }
    function buscarperguntas() {
        busca_texto = $.busca_texto.value;
        resultadoperguntas();
        $.busca_texto.value = "";
    }
    function voltar() {
        goTo("funcao");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "perguntas";
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
    $.__views.perguntas = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        id: "perguntas"
    });
    $.__views.perguntas && $.addTopLevelView($.__views.perguntas);
    $.__views.__alloyId1122 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "100%",
        id: "__alloyId1122"
    });
    $.__views.perguntas.add($.__views.__alloyId1122);
    $.__views.__alloyId1123 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#000000",
        right: "10",
        title: "DÚVIDAS SOBRE O SISTEMA",
        id: "__alloyId1123"
    });
    $.__views.__alloyId1122.add($.__views.__alloyId1123);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        left: "10",
        id: "logoEmpresa"
    });
    $.__views.__alloyId1122.add($.__views.logoEmpresa);
    $.__views.__alloyId1124 = Ti.UI.createView({
        height: "80%",
        top: "11%",
        width: "100%",
        id: "__alloyId1124"
    });
    $.__views.perguntas.add($.__views.__alloyId1124);
    $.__views.__alloyId1125 = Ti.UI.createView({
        width: "95%",
        layout: "horizontal",
        id: "__alloyId1125"
    });
    $.__views.__alloyId1124.add($.__views.__alloyId1125);
    $.__views.busca_texto = Ti.UI.createTextField({
        borderColor: "#6ea9a0",
        borderRadius: 5,
        color: "black",
        width: "90%",
        height: 48,
        left: 10,
        font: {
            fontSize: 10
        },
        id: "busca_texto",
        hintText: "O que você está procurando?"
    });
    $.__views.__alloyId1125.add($.__views.busca_texto);
    $.__views.__alloyId1126 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        left: "1%",
        width: "5%",
        bottom: "1%",
        title: "Ir",
        id: "__alloyId1126"
    });
    $.__views.__alloyId1125.add($.__views.__alloyId1126);
    buscarperguntas ? $.__views.__alloyId1126.addEventListener("click", buscarperguntas) : __defers["$.__views.__alloyId1126!click!buscarperguntas"] = true;
    $.__views.__alloyId1127 = Ti.UI.createView({
        height: "90%",
        width: "100%",
        id: "__alloyId1127"
    });
    $.__views.__alloyId1124.add($.__views.__alloyId1127);
    var __alloyId1128 = {};
    var __alloyId1131 = [];
    var __alloyId1133 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1134 = [];
            var __alloyId1136 = {
                type: "Ti.UI.Label",
                bindId: "label_pergunta",
                properties: {
                    color: "#2c8f8e",
                    width: "100%",
                    height: 45,
                    top: 3,
                    bindId: "label_pergunta"
                }
            };
            __alloyId1134.push(__alloyId1136);
            var __alloyId1138 = {
                type: "Ti.UI.Label",
                bindId: "label_resposta",
                properties: {
                    color: "black",
                    top: 0,
                    width: "100%",
                    height: 45,
                    bindId: "label_resposta"
                }
            };
            __alloyId1134.push(__alloyId1138);
            var __alloyId1140 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: "100%",
                    heigth: 1,
                    top: 3,
                    left: 0
                }
            };
            __alloyId1134.push(__alloyId1140);
            return __alloyId1134;
        }(),
        properties: {
            backgroundColor: "white",
            top: 2,
            left: 0,
            width: "100%",
            height: "100%",
            layout: "vertical"
        }
    };
    __alloyId1131.push(__alloyId1133);
    var __alloyId1130 = {
        properties: {
            backgroundColor: "white",
            height: "100",
            top: 0,
            width: "90%",
            name: "pergunta_lista"
        },
        childTemplates: __alloyId1131
    };
    __alloyId1128["pergunta_lista"] = __alloyId1130;
    $.__views.__alloyId1141 = Ti.UI.createListSection({
        id: "__alloyId1141"
    });
    var __alloyId1143 = [];
    __alloyId1143.push($.__views.__alloyId1141);
    $.__views.listaperguntas = Ti.UI.createListView({
        height: "90%",
        top: "10%",
        width: "100%",
        sections: __alloyId1143,
        templates: __alloyId1128,
        id: "listaperguntas",
        defaultItemTemplate: "pergunta_lista"
    });
    $.__views.__alloyId1127.add($.__views.listaperguntas);
    $.__views.__alloyId1144 = Ti.UI.createView({
        height: "7%",
        bottom: "1%",
        width: "100%",
        id: "__alloyId1144"
    });
    $.__views.perguntas.add($.__views.__alloyId1144);
    $.__views.__alloyId1145 = Ti.UI.createButton({
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
        id: "__alloyId1145"
    });
    $.__views.__alloyId1144.add($.__views.__alloyId1145);
    voltar ? $.__views.__alloyId1145.addEventListener("click", voltar) : __defers["$.__views.__alloyId1145!click!voltar"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/pergunta.js");
    Ti.include("/database/aparencia.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    var busca_texto = "";
    resultadoperguntas();
    var software = Ti.App.Properties.getString(CURRENT_SOFTWARE);
    __defers["$.__views.__alloyId1126!click!buscarperguntas"] && $.__views.__alloyId1126.addEventListener("click", buscarperguntas);
    __defers["$.__views.__alloyId1145!click!voltar"] && $.__views.__alloyId1145.addEventListener("click", voltar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;