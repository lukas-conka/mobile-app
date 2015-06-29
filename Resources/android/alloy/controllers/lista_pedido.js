function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function resultadoPedidos() {
        var pedidos = consultaPedidos();
        var data = [];
        while (pedidos.isValidRow()) {
            var id = pedidos.fieldByName("ped_id");
            var numero = pedidos.fieldByName("ped_numero");
            var cnpj = pedidos.fieldByName("cl_cnpj");
            var razao = pedidos.fieldByName("cl_razao");
            var ped_data = pedidos.fieldByName("ped_data");
            var date;
            if (new RegExp(" ").test(ped_data)) {
                var tmp = ped_data.split(" ");
                date = new Date(tmp[0]);
            } else date = ped_data;
            var data_text = date.getDate() + " de " + getMonth(date.getMonth() + 1) + " de " + date.getFullYear();
            data.push({
                ped_id: id,
                label_numero: {
                    text: numero
                },
                label_cnpj: {
                    text: cnpj
                },
                label_razao: {
                    text: razao
                },
                label_data: {
                    text: data_text
                },
                label_representante: {
                    text: Ti.App.Properties.getString(CURRENT_USER_NAME)
                }
            });
            Ti.API.info(razao);
            pedidos.next();
        }
        $.listapedidos.sections[0].setItems(data);
    }
    function enviaEmail() {}
    function exibeDetalhes(e) {
        var section = $.listapedidos.sections[e.sectionIndex];
        var item = section.getItemAt(e.itemIndex);
        var pedido = item.ped_id;
        var arg = {
            ped_id: pedido
        };
        var load = Alloy.createController("detalhe", arg).getView();
        load.open({
            fullscreen: true,
            navBarHidden: true
        });
    }
    function voltar() {
        goTo("funcao");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "lista_pedido";
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
    $.__views.lista_pedido = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        id: "lista_pedido"
    });
    $.__views.lista_pedido && $.addTopLevelView($.__views.lista_pedido);
    $.__views.__alloyId835 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "100%",
        id: "__alloyId835"
    });
    $.__views.lista_pedido.add($.__views.__alloyId835);
    $.__views.__alloyId836 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#000000",
        right: "10",
        title: "LISTA DE PEDIDOS",
        id: "__alloyId836"
    });
    $.__views.__alloyId835.add($.__views.__alloyId836);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        left: "10",
        id: "logoEmpresa"
    });
    $.__views.__alloyId835.add($.__views.logoEmpresa);
    $.__views.__alloyId837 = Ti.UI.createView({
        height: "90%",
        top: "10%",
        width: "100%",
        id: "__alloyId837"
    });
    $.__views.lista_pedido.add($.__views.__alloyId837);
    $.__views.__alloyId838 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#4783c4", "#3550a3" ]
        },
        height: "7%",
        top: "0%",
        width: "100%",
        id: "__alloyId838"
    });
    $.__views.__alloyId837.add($.__views.__alloyId838);
    $.__views.__alloyId839 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        left: "0%",
        width: "8%",
        title: "PEDIDO",
        id: "__alloyId839"
    });
    $.__views.__alloyId838.add($.__views.__alloyId839);
    $.__views.__alloyId840 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        left: "8%",
        width: "20%",
        title: "CNPJ",
        id: "__alloyId840"
    });
    $.__views.__alloyId838.add($.__views.__alloyId840);
    $.__views.__alloyId841 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        left: "28%",
        width: "20%",
        title: "RAZÃO SOCIAL",
        id: "__alloyId841"
    });
    $.__views.__alloyId838.add($.__views.__alloyId841);
    $.__views.__alloyId842 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        left: "48%",
        width: "16%",
        title: "DATA",
        id: "__alloyId842"
    });
    $.__views.__alloyId838.add($.__views.__alloyId842);
    $.__views.__alloyId843 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        left: "64%",
        width: "20%",
        title: "REPRESENTANTE",
        id: "__alloyId843"
    });
    $.__views.__alloyId838.add($.__views.__alloyId843);
    $.__views.__alloyId844 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        left: "84%",
        width: "8%",
        title: "EMAIL",
        id: "__alloyId844"
    });
    $.__views.__alloyId838.add($.__views.__alloyId844);
    $.__views.__alloyId845 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        left: "92%",
        width: "8%",
        title: "AÇÕES",
        id: "__alloyId845"
    });
    $.__views.__alloyId838.add($.__views.__alloyId845);
    $.__views.__alloyId846 = Ti.UI.createView({
        height: "90%",
        top: "5%",
        width: "100%",
        id: "__alloyId846"
    });
    $.__views.__alloyId837.add($.__views.__alloyId846);
    var __alloyId847 = {};
    var __alloyId850 = [];
    var __alloyId852 = {
        type: "Ti.UI.View",
        properties: {
            backgroundColor: "#DDDDDD",
            width: "100%",
            heigth: 1,
            top: 0,
            left: 0
        }
    };
    __alloyId850.push(__alloyId852);
    var __alloyId854 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId855 = [];
            var __alloyId857 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId855.push(__alloyId857);
            var __alloyId859 = {
                type: "Ti.UI.Label",
                bindId: "label_numero",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "8%",
                    bindId: "label_numero"
                }
            };
            __alloyId855.push(__alloyId859);
            var __alloyId861 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId855.push(__alloyId861);
            var __alloyId863 = {
                type: "Ti.UI.Label",
                bindId: "label_cnpj",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "20%",
                    bindId: "label_cnpj"
                }
            };
            __alloyId855.push(__alloyId863);
            var __alloyId865 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId855.push(__alloyId865);
            var __alloyId867 = {
                type: "Ti.UI.Label",
                bindId: "label_razao",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "20%",
                    bindId: "label_razao"
                }
            };
            __alloyId855.push(__alloyId867);
            var __alloyId869 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId855.push(__alloyId869);
            var __alloyId871 = {
                type: "Ti.UI.Label",
                bindId: "label_data",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "16%",
                    bindId: "label_data"
                }
            };
            __alloyId855.push(__alloyId871);
            var __alloyId873 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId855.push(__alloyId873);
            var __alloyId875 = {
                type: "Ti.UI.Label",
                bindId: "label_representante",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "20%",
                    bindId: "label_representante"
                }
            };
            __alloyId855.push(__alloyId875);
            var __alloyId877 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId855.push(__alloyId877);
            var __alloyId879 = {
                type: "Ti.UI.Label",
                bindId: "label_email",
                properties: {
                    color: "#008382",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "8%",
                    text: "Enviar",
                    bindId: "label_email"
                },
                events: {
                    click: enviaEmail
                }
            };
            __alloyId855.push(__alloyId879);
            var __alloyId881 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId855.push(__alloyId881);
            var __alloyId883 = {
                type: "Ti.UI.Label",
                bindId: "label_acoes",
                properties: {
                    color: "#008382",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    text: "Detalhes",
                    bindId: "label_acoes"
                },
                events: {
                    click: exibeDetalhes
                }
            };
            __alloyId855.push(__alloyId883);
            var __alloyId885 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId855.push(__alloyId885);
            return __alloyId855;
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
    __alloyId850.push(__alloyId854);
    var __alloyId849 = {
        properties: {
            height: "50",
            top: 0,
            width: "99%",
            name: "pedido_lista"
        },
        childTemplates: __alloyId850
    };
    __alloyId847["pedido_lista"] = __alloyId849;
    $.__views.__alloyId886 = Ti.UI.createListSection({
        id: "__alloyId886"
    });
    var __alloyId888 = [];
    __alloyId888.push($.__views.__alloyId886);
    $.__views.listapedidos = Ti.UI.createListView({
        height: "90%",
        top: "5%",
        width: "100%",
        sections: __alloyId888,
        templates: __alloyId847,
        id: "listapedidos",
        defaultItemTemplate: "pedido_lista"
    });
    $.__views.__alloyId846.add($.__views.listapedidos);
    $.__views.__alloyId889 = Ti.UI.createView({
        height: "7%",
        bottom: "0%",
        width: "100%",
        id: "__alloyId889"
    });
    $.__views.__alloyId837.add($.__views.__alloyId889);
    $.__views.__alloyId890 = Ti.UI.createButton({
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
        id: "__alloyId890"
    });
    $.__views.__alloyId889.add($.__views.__alloyId890);
    voltar ? $.__views.__alloyId890.addEventListener("click", voltar) : __defers["$.__views.__alloyId890!click!voltar"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/pedido.js");
    Ti.include("/database/aparencia.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    resultadoPedidos();
    __defers["$.__views.__alloyId890!click!voltar"] && $.__views.__alloyId890.addEventListener("click", voltar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;