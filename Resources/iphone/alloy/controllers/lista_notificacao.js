function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function resultadoNotificacoes() {
        var notificacoes = selectallNotificacao();
        var data = [];
        while (notificacoes.isValidRow()) {
            var label_data = notificacoes.fieldByName("ntf_data");
            var label_mensagem = notificacoes.fieldByName("ntf_mensagem");
            data.push({
                label_data: {
                    text: label_data
                },
                label_mensagem: {
                    text: label_mensagem
                }
            });
            notificacoes.next();
        }
        $.listanotificacoes.sections[0].setItems(data);
    }
    function voltar() {
        goTo("funcao");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "lista_notificacao";
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
    $.__views.lista_notificacao = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        id: "lista_notificacao"
    });
    $.__views.lista_notificacao && $.addTopLevelView($.__views.lista_notificacao);
    $.__views.__alloyId801 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "100%",
        id: "__alloyId801"
    });
    $.__views.lista_notificacao.add($.__views.__alloyId801);
    $.__views.__alloyId802 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#000000",
        right: "10",
        title: "LISTA DE NOTIFICAÇÕES",
        id: "__alloyId802"
    });
    $.__views.__alloyId801.add($.__views.__alloyId802);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        left: "10",
        id: "logoEmpresa"
    });
    $.__views.__alloyId801.add($.__views.logoEmpresa);
    $.__views.__alloyId803 = Ti.UI.createView({
        height: "90%",
        top: "10%",
        width: "100%",
        id: "__alloyId803"
    });
    $.__views.lista_notificacao.add($.__views.__alloyId803);
    $.__views.__alloyId804 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#3550a3", "#008382" ]
        },
        height: "7%",
        top: "0%",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId804"
    });
    $.__views.__alloyId803.add($.__views.__alloyId804);
    $.__views.__alloyId805 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "20%",
        title: "DATA E HORA",
        id: "__alloyId805"
    });
    $.__views.__alloyId804.add($.__views.__alloyId805);
    $.__views.__alloyId806 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "80%",
        title: "MENSAGEM",
        id: "__alloyId806"
    });
    $.__views.__alloyId804.add($.__views.__alloyId806);
    $.__views.__alloyId807 = Ti.UI.createView({
        height: "85%",
        top: "7%",
        width: "100%",
        id: "__alloyId807"
    });
    $.__views.__alloyId803.add($.__views.__alloyId807);
    var __alloyId808 = {};
    var __alloyId811 = [];
    var __alloyId813 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId814 = [];
            var __alloyId816 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId817 = [];
                    var __alloyId819 = {
                        type: "Ti.UI.Label",
                        bindId: "label_data",
                        properties: {
                            color: "black",
                            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                            width: "100%",
                            bindId: "label_data"
                        }
                    };
                    __alloyId817.push(__alloyId819);
                    return __alloyId817;
                }(),
                properties: {
                    width: "20%"
                }
            };
            __alloyId814.push(__alloyId816);
            var __alloyId821 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId822 = [];
                    var __alloyId824 = {
                        type: "Ti.UI.Label",
                        bindId: "label_mensagem",
                        properties: {
                            color: "black",
                            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                            width: "100%",
                            bindId: "label_mensagem"
                        }
                    };
                    __alloyId822.push(__alloyId824);
                    return __alloyId822;
                }(),
                properties: {
                    width: "80%"
                }
            };
            __alloyId814.push(__alloyId821);
            return __alloyId814;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId811.push(__alloyId813);
    var __alloyId810 = {
        properties: {
            height: "50",
            top: "6",
            width: "100%",
            name: "notificacoes_lista"
        },
        childTemplates: __alloyId811
    };
    __alloyId808["notificacoes_lista"] = __alloyId810;
    $.__views.__alloyId825 = Ti.UI.createListSection({
        id: "__alloyId825"
    });
    var __alloyId827 = [];
    __alloyId827.push($.__views.__alloyId825);
    $.__views.listanotificacoes = Ti.UI.createListView({
        height: "85%",
        top: "7%",
        width: "100%",
        sections: __alloyId827,
        templates: __alloyId808,
        id: "listanotificacoes",
        defaultItemTemplate: "notificacoes_lista"
    });
    $.__views.__alloyId807.add($.__views.listanotificacoes);
    $.__views.__alloyId828 = Ti.UI.createView({
        height: "7%",
        bottom: "0%",
        width: "100%",
        id: "__alloyId828"
    });
    $.__views.__alloyId803.add($.__views.__alloyId828);
    $.__views.__alloyId829 = Ti.UI.createButton({
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
        id: "__alloyId829"
    });
    $.__views.__alloyId828.add($.__views.__alloyId829);
    voltar ? $.__views.__alloyId829.addEventListener("click", voltar) : __defers["$.__views.__alloyId829!click!voltar"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/notificacao.js");
    Ti.include("/database/aparencia.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    resultadoNotificacoes();
    __defers["$.__views.__alloyId829!click!voltar"] && $.__views.__alloyId829.addEventListener("click", voltar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;