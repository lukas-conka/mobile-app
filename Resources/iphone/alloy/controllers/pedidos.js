function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function menuClick(e) {
        Ti.API.info(e.itemIndex);
        if (1 == e.itemIndex || 2 == e.itemIndex || 3 == e.itemIndex || 4 == e.itemIndex) if (Ti.App.Properties.getList(SELECTED_CLIENTS)) {
            var conjunto = Ti.App.Properties.getList(SELECTED_CLIENTS);
            for (var quantidade = 0; quantidade < conjunto.length; quantidade++) ;
            0 == quantidade ? alert("É necessário a seleção de um cliente ou mais para seguir em diante!") : menuSelection(e.itemIndex);
        } else alert("É necessário a seleção de um cliente ou mais para seguir em diante!"); else menuSelection(e.itemIndex);
    }
    function datePicker(e) {
        var selection = e.source;
        var today = new Date();
        var win = Ti.UI.createWindow({
            exitOnClose: false,
            backgroundColor: "gray",
            layout: "vertical"
        });
        var picker = Ti.UI.createPicker({
            type: Ti.UI.PICKER_TYPE_DATE,
            minDate: new Date(2013, 0, 1),
            maxDate: today,
            value: today,
            top: 50,
            buttonNames: [ "Ok" ]
        });
        var btncatDone = Ti.UI.createButton({
            title: "  OK  ",
            style: 1,
            borderRadius: 9,
            font: {
                fontSize: 25
            },
            backgroundColor: "white",
            color: "#336633"
        });
        btncatDone.addEventListener("click", function() {
            win.close();
        });
        win.add(picker);
        win.add(btncatDone);
        win.open();
        var dia = checkdecimal(today.getDate());
        var mes = checkdecimal(today.getMonth() + 1);
        var ano = today.getFullYear();
        selection.title = ano + "-" + mes + "-" + dia;
        picker.addEventListener("change", function(e) {
            Titanium.UI.currentWindow;
            var dia = checkdecimal(e.value.getDate());
            var mes = checkdecimal(e.value.getMonth() + 1);
            var ano = e.value.getFullYear();
            selection.title = ano + "-" + mes + "-" + dia;
        });
    }
    function listaPedidos() {
        if ("yyyy-mm-dd" != $.datainicio.title && "yyyy-mm-dd" != $.datafim.title) {
            var inicio = $.datainicio.title;
            var fim = $.datafim.title;
            var pedidos = consultaPedidosPorData(inicio, fim);
            var data = [];
            var count = 0;
            while (pedidos.isValidRow()) {
                count++;
                var id = pedidos.fieldByName("ped_id");
                var numero = pedidos.fieldByName("ped_numero");
                var cnpj = pedidos.fieldByName("cl_cnpj");
                var razao = pedidos.fieldByName("cl_razao");
                var ped_data = pedidos.fieldByName("ped_data");
                var tmp = ped_data.split(" ");
                var date = new Date(tmp[0]);
                var data_text = date.getDate() + " de " + getMonth(date.getMonth() + 1) + " de " + date.getFullYear();
                data.push({
                    ped_id: id,
                    label_numero: {
                        text: "Nº " + numero
                    },
                    label_data: {
                        text: cnpj
                    },
                    label_razao: {
                        text: razao
                    },
                    label_cnpj: {
                        text: data_text
                    }
                });
                pedidos.next();
            }
            $.listapedidos.sections[0].setItems(data);
            0 == count && alert("Nenhum pedido encontrado no periodo selecionado");
        } else alert("Por favor, selecione as datas para o filtro");
    }
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "pedidos";
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
    $.__views.pedidos = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "pedidos"
    });
    $.__views.pedidos && $.addTopLevelView($.__views.pedidos);
    var __alloyId1067 = {};
    var __alloyId1070 = [];
    var __alloyId1072 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1073 = [];
            var __alloyId1075 = {
                type: "Ti.UI.Label",
                bindId: "btnmenu",
                properties: {
                    touchEnabled: "false",
                    width: "98%",
                    color: "white",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    bindId: "btnmenu"
                }
            };
            __alloyId1073.push(__alloyId1075);
            return __alloyId1073;
        }(),
        properties: {
            backgroundColor: "#3f3a35",
            borderColor: "#9ccccb",
            borderWidth: "4",
            color: "#ffffff",
            width: "90%",
            height: "80%"
        },
        events: {
            click: menuClick
        }
    };
    __alloyId1070.push(__alloyId1072);
    var __alloyId1069 = {
        properties: {
            height: "112dp",
            name: "menuTemplate"
        },
        childTemplates: __alloyId1070
    };
    __alloyId1067["menuTemplate"] = __alloyId1069;
    var __alloyId1078 = [];
    $.__views.__alloyId1079 = {
        btnmenu: {
            text: "CNPJ/\n RAZÃO SOCIAL/\n ENDEREÇO LOJA"
        },
        properties: {
            id: "__alloyId1079"
        }
    };
    __alloyId1078.push($.__views.__alloyId1079);
    $.__views.__alloyId1080 = {
        btnmenu: {
            text: "ANÁLISE DE \n CRÉDITO"
        },
        properties: {
            id: "__alloyId1080"
        }
    };
    __alloyId1078.push($.__views.__alloyId1080);
    $.__views.__alloyId1081 = {
        btnmenu: {
            text: "IR AO\n CATÁLOGO"
        },
        properties: {
            id: "__alloyId1081"
        }
    };
    __alloyId1078.push($.__views.__alloyId1081);
    $.__views.__alloyId1082 = {
        btnmenu: {
            text: "PEDIDOS"
        },
        properties: {
            id: "__alloyId1082"
        }
    };
    __alloyId1078.push($.__views.__alloyId1082);
    $.__views.__alloyId1083 = {
        btnmenu: {
            text: "TRANSPORTADORA"
        },
        properties: {
            id: "__alloyId1083"
        }
    };
    __alloyId1078.push($.__views.__alloyId1083);
    $.__views.__alloyId1084 = {
        btnmenu: {
            text: "NOVO CLIENTE"
        },
        properties: {
            id: "__alloyId1084"
        }
    };
    __alloyId1078.push($.__views.__alloyId1084);
    $.__views.__alloyId1085 = {
        btnmenu: {
            text: "FUNÇÕES"
        },
        properties: {
            id: "__alloyId1085"
        }
    };
    __alloyId1078.push($.__views.__alloyId1085);
    $.__views.__alloyId1086 = {
        btnmenu: {
            text: "EMAIL"
        },
        properties: {
            id: "__alloyId1086"
        }
    };
    __alloyId1078.push($.__views.__alloyId1086);
    $.__views.__alloyId1087 = {
        btnmenu: {
            text: "VOLTAR PARA TELA INICIAL"
        },
        properties: {
            id: "__alloyId1087"
        }
    };
    __alloyId1078.push($.__views.__alloyId1087);
    $.__views.__alloyId1088 = {
        btnmenu: {
            text: "TROCAR\n MARCA"
        },
        properties: {
            id: "__alloyId1088"
        }
    };
    __alloyId1078.push($.__views.__alloyId1088);
    $.__views.__alloyId1089 = {
        btnmenu: {
            text: "SAIR"
        },
        properties: {
            id: "__alloyId1089"
        }
    };
    __alloyId1078.push($.__views.__alloyId1089);
    $.__views.__alloyId1076 = Ti.UI.createListSection({
        id: "__alloyId1076"
    });
    $.__views.__alloyId1076.items = __alloyId1078;
    var __alloyId1090 = [];
    __alloyId1090.push($.__views.__alloyId1076);
    $.__views.__alloyId1066 = Ti.UI.createListView({
        backgroundColor: "#ebf7f6",
        height: "100%",
        left: "0",
        width: "15%",
        sections: __alloyId1090,
        templates: __alloyId1067,
        defaultItemTemplate: "menuTemplate",
        id: "__alloyId1066"
    });
    $.__views.pedidos.add($.__views.__alloyId1066);
    $.__views.__alloyId1091 = Ti.UI.createView({
        height: "100%",
        right: "0",
        width: "85%",
        id: "__alloyId1091"
    });
    $.__views.pedidos.add($.__views.__alloyId1091);
    $.__views.__alloyId1092 = Ti.UI.createView({
        height: "90",
        top: "0",
        width: "98%",
        id: "__alloyId1092"
    });
    $.__views.__alloyId1091.add($.__views.__alloyId1092);
    $.__views.__alloyId1093 = Ti.UI.createView({
        height: "90%",
        left: "0",
        width: "15%",
        id: "__alloyId1093"
    });
    $.__views.__alloyId1092.add($.__views.__alloyId1093);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        left: "0",
        id: "logoEmpresa"
    });
    $.__views.__alloyId1093.add($.__views.logoEmpresa);
    $.__views.__alloyId1094 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4e8789",
        height: "90",
        left: "15%",
        width: "70%",
        title: "PEDIDOS",
        id: "__alloyId1094"
    });
    $.__views.__alloyId1092.add($.__views.__alloyId1094);
    $.__views.__alloyId1095 = Ti.UI.createView({
        height: "90",
        left: "85%",
        width: "15%",
        id: "__alloyId1095"
    });
    $.__views.__alloyId1092.add($.__views.__alloyId1095);
    $.__views.__alloyId1096 = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        right: "0",
        id: "__alloyId1096"
    });
    $.__views.__alloyId1095.add($.__views.__alloyId1096);
    $.__views.__alloyId1097 = Ti.UI.createView({
        borderColor: "#4e8789",
        borderWidth: "4",
        top: "90",
        width: "98%",
        id: "__alloyId1097"
    });
    $.__views.__alloyId1091.add($.__views.__alloyId1097);
    $.__views.__alloyId1098 = Ti.UI.createView({
        borderColor: "#4e8789",
        borderWidth: "4",
        height: "70",
        top: "0",
        width: "100%",
        id: "__alloyId1098"
    });
    $.__views.__alloyId1097.add($.__views.__alloyId1098);
    $.__views.__alloyId1099 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#222222",
        height: "50",
        left: "0",
        width: "50",
        title: "DE",
        id: "__alloyId1099"
    });
    $.__views.__alloyId1098.add($.__views.__alloyId1099);
    $.__views.datainicio = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        borderColor: "#6EA9A0",
        borderWidth: "4",
        color: "#000000",
        height: "50",
        left: "60",
        width: "220",
        id: "datainicio",
        title: "yyyy-mm-dd"
    });
    $.__views.__alloyId1098.add($.__views.datainicio);
    datePicker ? $.__views.datainicio.addEventListener("click", datePicker) : __defers["$.__views.datainicio!click!datePicker"] = true;
    $.__views.__alloyId1100 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#222222",
        height: "50",
        left: "290",
        width: "50",
        title: "ATÉ",
        id: "__alloyId1100"
    });
    $.__views.__alloyId1098.add($.__views.__alloyId1100);
    $.__views.datafim = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        borderColor: "#6EA9A0",
        borderWidth: "4",
        color: "#000000",
        height: "50",
        left: "350",
        width: "220",
        id: "datafim",
        title: "yyyy-mm-dd"
    });
    $.__views.__alloyId1098.add($.__views.datafim);
    datePicker ? $.__views.datafim.addEventListener("click", datePicker) : __defers["$.__views.datafim!click!datePicker"] = true;
    $.__views.__alloyId1101 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        height: "50",
        left: "580",
        width: "70",
        color: "white",
        title: "Ir",
        id: "__alloyId1101"
    });
    $.__views.__alloyId1098.add($.__views.__alloyId1101);
    listaPedidos ? $.__views.__alloyId1101.addEventListener("click", listaPedidos) : __defers["$.__views.__alloyId1101!click!listaPedidos"] = true;
    var __alloyId1102 = {};
    var __alloyId1105 = [];
    var __alloyId1107 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1108 = [];
            var __alloyId1110 = {
                type: "Ti.UI.Label",
                bindId: "label_numero",
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "15%",
                    bindId: "label_numero"
                }
            };
            __alloyId1108.push(__alloyId1110);
            var __alloyId1112 = {
                type: "Ti.UI.Label",
                bindId: "label_data",
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "18%",
                    bindId: "label_data"
                }
            };
            __alloyId1108.push(__alloyId1112);
            var __alloyId1114 = {
                type: "Ti.UI.Label",
                bindId: "label_razao",
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "25%",
                    bindId: "label_razao"
                }
            };
            __alloyId1108.push(__alloyId1114);
            var __alloyId1116 = {
                type: "Ti.UI.Label",
                bindId: "label_cnpj",
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "30%",
                    bindId: "label_cnpj"
                }
            };
            __alloyId1108.push(__alloyId1116);
            var __alloyId1118 = {
                type: "Ti.UI.Label",
                bindId: "label_acoes",
                properties: {
                    backgroundGradient: {
                        type: "linear",
                        colors: [ "#2c8f8e", "#206764" ]
                    },
                    borderRadius: "5",
                    color: "#ffffff",
                    height: "95%",
                    left: "1%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "11%",
                    text: "Detalhes",
                    bindId: "label_acoes"
                },
                events: {
                    click: exibeDetalhes
                }
            };
            __alloyId1108.push(__alloyId1118);
            return __alloyId1108;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId1105.push(__alloyId1107);
    var __alloyId1104 = {
        properties: {
            height: "50",
            top: "6",
            width: "98%",
            name: "pedido_lista"
        },
        childTemplates: __alloyId1105
    };
    __alloyId1102["pedido_lista"] = __alloyId1104;
    $.__views.__alloyId1119 = Ti.UI.createListSection({
        id: "__alloyId1119"
    });
    var __alloyId1121 = [];
    __alloyId1121.push($.__views.__alloyId1119);
    $.__views.listapedidos = Ti.UI.createListView({
        top: "74",
        height: "88%",
        width: "98%",
        sections: __alloyId1121,
        templates: __alloyId1102,
        id: "listapedidos",
        defaultItemTemplate: "pedido_lista"
    });
    $.__views.__alloyId1097.add($.__views.listapedidos);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/api/config.js");
    Ti.include("/database/aparencia.js");
    Ti.include("/database/pedido.js");
    Ti.include("/database/clientes.js");
    Ti.include("/api/menu.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    __defers["$.__views.datainicio!click!datePicker"] && $.__views.datainicio.addEventListener("click", datePicker);
    __defers["$.__views.datafim!click!datePicker"] && $.__views.datafim.addEventListener("click", datePicker);
    __defers["$.__views.__alloyId1101!click!listaPedidos"] && $.__views.__alloyId1101.addEventListener("click", listaPedidos);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;