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
    $.__views.__alloyId765 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "100%",
        id: "__alloyId765"
    });
    $.__views.lista_clientes.add($.__views.__alloyId765);
    $.__views.__alloyId766 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#000000",
        right: "10",
        title: "LISTA DE CLIENTES",
        id: "__alloyId766"
    });
    $.__views.__alloyId765.add($.__views.__alloyId766);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        left: "10",
        id: "logoEmpresa"
    });
    $.__views.__alloyId765.add($.__views.logoEmpresa);
    $.__views.__alloyId767 = Ti.UI.createView({
        height: "80%",
        top: "10%",
        width: "100%",
        id: "__alloyId767"
    });
    $.__views.lista_clientes.add($.__views.__alloyId767);
    $.__views.__alloyId768 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#e2580e", "#f2ad31" ]
        },
        height: "7%",
        top: "5%",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId768"
    });
    $.__views.__alloyId767.add($.__views.__alloyId768);
    $.__views.__alloyId769 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "41%",
        title: "Razão Social",
        id: "__alloyId769"
    });
    $.__views.__alloyId768.add($.__views.__alloyId769);
    $.__views.__alloyId770 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "26%",
        title: "Nome Fantasia",
        id: "__alloyId770"
    });
    $.__views.__alloyId768.add($.__views.__alloyId770);
    $.__views.__alloyId771 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "26%",
        title: "CNPJ",
        id: "__alloyId771"
    });
    $.__views.__alloyId768.add($.__views.__alloyId771);
    $.__views.__alloyId772 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "7%",
        title: "Info",
        id: "__alloyId772"
    });
    $.__views.__alloyId768.add($.__views.__alloyId772);
    $.__views.__alloyId773 = Ti.UI.createView({
        height: "90%",
        top: "7%",
        width: "100%",
        id: "__alloyId773"
    });
    $.__views.__alloyId767.add($.__views.__alloyId773);
    var __alloyId774 = {};
    var __alloyId777 = [];
    var __alloyId779 = {
        type: "Ti.UI.View",
        properties: {
            backgroundColor: "#DDDDDD",
            width: "100%",
            heigth: 1,
            top: 0,
            left: 0
        }
    };
    __alloyId777.push(__alloyId779);
    var __alloyId781 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId782 = [];
            var __alloyId784 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId782.push(__alloyId784);
            var __alloyId786 = {
                type: "Ti.UI.Label",
                bindId: "cl_razao",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "41%",
                    bindId: "cl_razao"
                }
            };
            __alloyId782.push(__alloyId786);
            var __alloyId788 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId782.push(__alloyId788);
            var __alloyId790 = {
                type: "Ti.UI.Label",
                bindId: "cl_fantasia",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "26%",
                    bindId: "cl_fantasia"
                }
            };
            __alloyId782.push(__alloyId790);
            var __alloyId792 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId782.push(__alloyId792);
            var __alloyId794 = {
                type: "Ti.UI.Label",
                bindId: "cl_cnpj",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "26%",
                    bindId: "cl_cnpj"
                }
            };
            __alloyId782.push(__alloyId794);
            var __alloyId796 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId782.push(__alloyId796);
            var __alloyId798 = {
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
            __alloyId782.push(__alloyId798);
            var __alloyId800 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId782.push(__alloyId800);
            return __alloyId782;
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
    __alloyId777.push(__alloyId781);
    var __alloyId776 = {
        properties: {
            backgroundColor: "white",
            height: "40",
            top: 0,
            width: "100%",
            name: "cliente_lista"
        },
        childTemplates: __alloyId777
    };
    __alloyId774["cliente_lista"] = __alloyId776;
    $.__views.__alloyId801 = Ti.UI.createListSection({
        id: "__alloyId801"
    });
    var __alloyId803 = [];
    __alloyId803.push($.__views.__alloyId801);
    $.__views.listaclientes = Ti.UI.createListView({
        height: "90%",
        top: "7%",
        width: "100%",
        sections: __alloyId803,
        templates: __alloyId774,
        id: "listaclientes",
        defaultItemTemplate: "cliente_lista"
    });
    $.__views.__alloyId773.add($.__views.listaclientes);
    $.__views.__alloyId804 = Ti.UI.createView({
        height: "7%",
        bottom: "1%",
        width: "100%",
        id: "__alloyId804"
    });
    $.__views.lista_clientes.add($.__views.__alloyId804);
    $.__views.__alloyId805 = Ti.UI.createButton({
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
        id: "__alloyId805"
    });
    $.__views.__alloyId804.add($.__views.__alloyId805);
    voltar ? $.__views.__alloyId805.addEventListener("click", voltar) : __defers["$.__views.__alloyId805!click!voltar"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/clientes.js");
    Ti.include("/database/aparencia.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    resultadoclientes();
    __defers["$.__views.__alloyId805!click!voltar"] && $.__views.__alloyId805.addEventListener("click", voltar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;