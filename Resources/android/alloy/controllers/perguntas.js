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
    $.__views.__alloyId1201 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "100%",
        id: "__alloyId1201"
    });
    $.__views.perguntas.add($.__views.__alloyId1201);
    $.__views.__alloyId1202 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#000000",
        right: "10",
        title: "DÚVIDAS SOBRE O SISTEMA",
        id: "__alloyId1202"
    });
    $.__views.__alloyId1201.add($.__views.__alloyId1202);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        left: "10",
        id: "logoEmpresa"
    });
    $.__views.__alloyId1201.add($.__views.logoEmpresa);
    $.__views.__alloyId1203 = Ti.UI.createView({
        height: "80%",
        top: "11%",
        width: "100%",
        id: "__alloyId1203"
    });
    $.__views.perguntas.add($.__views.__alloyId1203);
    $.__views.__alloyId1204 = Ti.UI.createView({
        width: "95%",
        layout: "horizontal",
        id: "__alloyId1204"
    });
    $.__views.__alloyId1203.add($.__views.__alloyId1204);
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
    $.__views.__alloyId1204.add($.__views.busca_texto);
    $.__views.__alloyId1205 = Ti.UI.createButton({
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
        id: "__alloyId1205"
    });
    $.__views.__alloyId1204.add($.__views.__alloyId1205);
    buscarperguntas ? $.__views.__alloyId1205.addEventListener("click", buscarperguntas) : __defers["$.__views.__alloyId1205!click!buscarperguntas"] = true;
    $.__views.__alloyId1206 = Ti.UI.createView({
        height: "90%",
        width: "100%",
        id: "__alloyId1206"
    });
    $.__views.__alloyId1203.add($.__views.__alloyId1206);
    var __alloyId1207 = {};
    var __alloyId1210 = [];
    var __alloyId1212 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1213 = [];
            var __alloyId1215 = {
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
            __alloyId1213.push(__alloyId1215);
            var __alloyId1217 = {
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
            __alloyId1213.push(__alloyId1217);
            var __alloyId1219 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: "100%",
                    heigth: 1,
                    top: 3,
                    left: 0
                }
            };
            __alloyId1213.push(__alloyId1219);
            return __alloyId1213;
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
    __alloyId1210.push(__alloyId1212);
    var __alloyId1209 = {
        properties: {
            backgroundColor: "white",
            height: "100",
            top: 0,
            width: "90%",
            name: "pergunta_lista"
        },
        childTemplates: __alloyId1210
    };
    __alloyId1207["pergunta_lista"] = __alloyId1209;
    $.__views.__alloyId1220 = Ti.UI.createListSection({
        id: "__alloyId1220"
    });
    var __alloyId1222 = [];
    __alloyId1222.push($.__views.__alloyId1220);
    $.__views.listaperguntas = Ti.UI.createListView({
        height: "90%",
        top: "10%",
        width: "100%",
        sections: __alloyId1222,
        templates: __alloyId1207,
        id: "listaperguntas",
        defaultItemTemplate: "pergunta_lista"
    });
    $.__views.__alloyId1206.add($.__views.listaperguntas);
    $.__views.__alloyId1223 = Ti.UI.createView({
        height: "7%",
        bottom: "1%",
        width: "100%",
        id: "__alloyId1223"
    });
    $.__views.perguntas.add($.__views.__alloyId1223);
    $.__views.__alloyId1224 = Ti.UI.createButton({
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
        id: "__alloyId1224"
    });
    $.__views.__alloyId1223.add($.__views.__alloyId1224);
    voltar ? $.__views.__alloyId1224.addEventListener("click", voltar) : __defers["$.__views.__alloyId1224!click!voltar"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/pergunta.js");
    Ti.include("/database/aparencia.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    var busca_texto = "";
    resultadoperguntas();
    var software = Ti.App.Properties.getString(CURRENT_SOFTWARE);
    __defers["$.__views.__alloyId1205!click!buscarperguntas"] && $.__views.__alloyId1205.addEventListener("click", buscarperguntas);
    __defers["$.__views.__alloyId1224!click!voltar"] && $.__views.__alloyId1224.addEventListener("click", voltar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;