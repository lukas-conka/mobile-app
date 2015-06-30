function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function resultadoclientes() {
        var clientes = consultaTodosClientes();
        var data = [];
        while (clientes.isValidRow()) {
            var cl_id = clientes.fieldByName("cl_id");
            var cl_razao = clientes.fieldByName("cl_razao");
            var cl_fantasia = clientes.fieldByName("cl_fantasia");
            var cl_cnpj = clientes.fieldByName("cl_cnpj");
            data.push({
                cl_id: cl_id,
                cl_razao: {
                    text: cl_razao
                },
                cl_fantasia: {
                    text: cl_fantasia
                },
                cl_cnpj: {
                    text: cl_cnpj
                }
            });
            clientes.next();
        }
        $.listaclientes.sections[0].setItems(data);
    }
    function selecionacliente() {}
    function voltar() {
        goTo("funcao");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "lista_clientes";
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
    $.__views.lista_clientes = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "lista_clientes"
    });
    $.__views.lista_clientes && $.addTopLevelView($.__views.lista_clientes);
    $.__views.__alloyId760 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "100%",
        id: "__alloyId760"
    });
    $.__views.lista_clientes.add($.__views.__alloyId760);
    $.__views.__alloyId761 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#000000",
        right: "10",
        title: "LISTA DE CLIENTES",
        id: "__alloyId761"
    });
    $.__views.__alloyId760.add($.__views.__alloyId761);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        left: "10",
        id: "logoEmpresa"
    });
    $.__views.__alloyId760.add($.__views.logoEmpresa);
    $.__views.__alloyId762 = Ti.UI.createView({
        height: "80%",
        top: "10%",
        width: "100%",
        id: "__alloyId762"
    });
    $.__views.lista_clientes.add($.__views.__alloyId762);
    $.__views.__alloyId763 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#e2580e", "#f2ad31" ]
        },
        height: "7%",
        top: "5%",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId763"
    });
    $.__views.__alloyId762.add($.__views.__alloyId763);
    $.__views.__alloyId764 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "41%",
        title: "Razão Social",
        id: "__alloyId764"
    });
    $.__views.__alloyId763.add($.__views.__alloyId764);
    $.__views.__alloyId765 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "26%",
        title: "Nome Fantasia",
        id: "__alloyId765"
    });
    $.__views.__alloyId763.add($.__views.__alloyId765);
    $.__views.__alloyId766 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "26%",
        title: "CNPJ",
        id: "__alloyId766"
    });
    $.__views.__alloyId763.add($.__views.__alloyId766);
    $.__views.__alloyId767 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "7%",
        title: "Info",
        id: "__alloyId767"
    });
    $.__views.__alloyId763.add($.__views.__alloyId767);
    $.__views.__alloyId768 = Ti.UI.createView({
        height: "90%",
        top: "7%",
        width: "100%",
        id: "__alloyId768"
    });
    $.__views.__alloyId762.add($.__views.__alloyId768);
    var __alloyId769 = {};
    var __alloyId772 = [];
    var __alloyId774 = {
        type: "Ti.UI.View",
        properties: {
            backgroundColor: "#DDDDDD",
            width: "100%",
            heigth: 1,
            top: 0,
            left: 0
        }
    };
    __alloyId772.push(__alloyId774);
    var __alloyId776 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId777 = [];
            var __alloyId779 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId777.push(__alloyId779);
            var __alloyId781 = {
                type: "Ti.UI.Label",
                bindId: "cl_razao",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "41%",
                    bindId: "cl_razao"
                }
            };
            __alloyId777.push(__alloyId781);
            var __alloyId783 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId777.push(__alloyId783);
            var __alloyId785 = {
                type: "Ti.UI.Label",
                bindId: "cl_fantasia",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "26%",
                    bindId: "cl_fantasia"
                }
            };
            __alloyId777.push(__alloyId785);
            var __alloyId787 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId777.push(__alloyId787);
            var __alloyId789 = {
                type: "Ti.UI.Label",
                bindId: "cl_cnpj",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "26%",
                    bindId: "cl_cnpj"
                }
            };
            __alloyId777.push(__alloyId789);
            var __alloyId791 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId777.push(__alloyId791);
            var __alloyId793 = {
                type: "Ti.UI.Button",
                properties: {
                    color: "#336633",
                    font: {
                        fontSize: 15
                    },
                    title: "+"
                },
                events: {
                    click: selecionacliente
                }
            };
            __alloyId777.push(__alloyId793);
            var __alloyId795 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId777.push(__alloyId795);
            return __alloyId777;
        }(),
        properties: {
            backgroundColor: "white",
            top: 2,
            left: 0,
            width: "100%",
            height: "100%",
            layout: "horizontal"
        }
    };
    __alloyId772.push(__alloyId776);
    var __alloyId771 = {
        properties: {
            backgroundColor: "white",
            height: "40",
            top: 0,
            width: "100%",
            name: "cliente_lista"
        },
        childTemplates: __alloyId772
    };
    __alloyId769["cliente_lista"] = __alloyId771;
    $.__views.__alloyId796 = Ti.UI.createListSection({
        id: "__alloyId796"
    });
    var __alloyId798 = [];
    __alloyId798.push($.__views.__alloyId796);
    $.__views.listaclientes = Ti.UI.createListView({
        height: "90%",
        top: "7%",
        width: "100%",
        sections: __alloyId798,
        templates: __alloyId769,
        id: "listaclientes",
        defaultItemTemplate: "cliente_lista"
    });
    $.__views.__alloyId768.add($.__views.listaclientes);
    $.__views.__alloyId799 = Ti.UI.createView({
        height: "7%",
        bottom: "1%",
        width: "100%",
        id: "__alloyId799"
    });
    $.__views.lista_clientes.add($.__views.__alloyId799);
    $.__views.__alloyId800 = Ti.UI.createButton({
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
        id: "__alloyId800"
    });
    $.__views.__alloyId799.add($.__views.__alloyId800);
    voltar ? $.__views.__alloyId800.addEventListener("click", voltar) : __defers["$.__views.__alloyId800!click!voltar"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/clientes.js");
    Ti.include("/database/aparencia.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    resultadoclientes();
    __defers["$.__views.__alloyId800!click!voltar"] && $.__views.__alloyId800.addEventListener("click", voltar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;