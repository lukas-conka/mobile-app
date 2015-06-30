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
    var __alloyId1141 = {};
    var __alloyId1144 = [];
    var __alloyId1146 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1147 = [];
            var __alloyId1149 = {
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
            __alloyId1147.push(__alloyId1149);
            return __alloyId1147;
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
    __alloyId1144.push(__alloyId1146);
    var __alloyId1143 = {
        properties: {
            height: "112dp",
            name: "menuTemplate"
        },
        childTemplates: __alloyId1144
    };
    __alloyId1141["menuTemplate"] = __alloyId1143;
    var __alloyId1152 = [];
    $.__views.__alloyId1153 = {
        btnmenu: {
            text: "CNPJ/\n RAZÃO SOCIAL/\n ENDEREÇO LOJA"
        },
        properties: {
            id: "__alloyId1153"
        }
    };
    __alloyId1152.push($.__views.__alloyId1153);
    $.__views.__alloyId1154 = {
        btnmenu: {
            text: "ANÁLISE DE \n CRÉDITO"
        },
        properties: {
            id: "__alloyId1154"
        }
    };
    __alloyId1152.push($.__views.__alloyId1154);
    $.__views.__alloyId1155 = {
        btnmenu: {
            text: "IR AO\n CATÁLOGO"
        },
        properties: {
            id: "__alloyId1155"
        }
    };
    __alloyId1152.push($.__views.__alloyId1155);
    $.__views.__alloyId1156 = {
        btnmenu: {
            text: "PEDIDOS"
        },
        properties: {
            id: "__alloyId1156"
        }
    };
    __alloyId1152.push($.__views.__alloyId1156);
    $.__views.__alloyId1157 = {
        btnmenu: {
            text: "TRANSPORTADORA"
        },
        properties: {
            id: "__alloyId1157"
        }
    };
    __alloyId1152.push($.__views.__alloyId1157);
    $.__views.__alloyId1158 = {
        btnmenu: {
            text: "NOVO CLIENTE"
        },
        properties: {
            id: "__alloyId1158"
        }
    };
    __alloyId1152.push($.__views.__alloyId1158);
    $.__views.__alloyId1159 = {
        btnmenu: {
            text: "FUNÇÕES"
        },
        properties: {
            id: "__alloyId1159"
        }
    };
    __alloyId1152.push($.__views.__alloyId1159);
    $.__views.__alloyId1160 = {
        btnmenu: {
            text: "EMAIL"
        },
        properties: {
            id: "__alloyId1160"
        }
    };
    __alloyId1152.push($.__views.__alloyId1160);
    $.__views.__alloyId1161 = {
        btnmenu: {
            text: "VOLTAR PARA TELA INICIAL"
        },
        properties: {
            id: "__alloyId1161"
        }
    };
    __alloyId1152.push($.__views.__alloyId1161);
    $.__views.__alloyId1162 = {
        btnmenu: {
            text: "TROCAR\n MARCA"
        },
        properties: {
            id: "__alloyId1162"
        }
    };
    __alloyId1152.push($.__views.__alloyId1162);
    $.__views.__alloyId1163 = {
        btnmenu: {
            text: "SAIR"
        },
        properties: {
            id: "__alloyId1163"
        }
    };
    __alloyId1152.push($.__views.__alloyId1163);
    $.__views.__alloyId1150 = Ti.UI.createListSection({
        id: "__alloyId1150"
    });
    $.__views.__alloyId1150.items = __alloyId1152;
    var __alloyId1164 = [];
    __alloyId1164.push($.__views.__alloyId1150);
    $.__views.__alloyId1140 = Ti.UI.createListView({
        backgroundColor: "#ebf7f6",
        height: "100%",
        left: "0",
        width: "15%",
        sections: __alloyId1164,
        templates: __alloyId1141,
        defaultItemTemplate: "menuTemplate",
        id: "__alloyId1140"
    });
    $.__views.pedidos.add($.__views.__alloyId1140);
    $.__views.__alloyId1165 = Ti.UI.createView({
        height: "100%",
        right: "0",
        width: "85%",
        id: "__alloyId1165"
    });
    $.__views.pedidos.add($.__views.__alloyId1165);
    $.__views.__alloyId1166 = Ti.UI.createView({
        height: "90",
        top: "0",
        width: "98%",
        id: "__alloyId1166"
    });
    $.__views.__alloyId1165.add($.__views.__alloyId1166);
    $.__views.__alloyId1167 = Ti.UI.createView({
        height: "90%",
        left: "0",
        width: "15%",
        id: "__alloyId1167"
    });
    $.__views.__alloyId1166.add($.__views.__alloyId1167);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        left: "0",
        id: "logoEmpresa"
    });
    $.__views.__alloyId1167.add($.__views.logoEmpresa);
    $.__views.__alloyId1168 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4e8789",
        height: "90",
        left: "15%",
        width: "70%",
        title: "PEDIDOS",
        id: "__alloyId1168"
    });
    $.__views.__alloyId1166.add($.__views.__alloyId1168);
    $.__views.__alloyId1169 = Ti.UI.createView({
        height: "90",
        left: "85%",
        width: "15%",
        id: "__alloyId1169"
    });
    $.__views.__alloyId1166.add($.__views.__alloyId1169);
    $.__views.__alloyId1170 = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        right: "0",
        id: "__alloyId1170"
    });
    $.__views.__alloyId1169.add($.__views.__alloyId1170);
    $.__views.__alloyId1171 = Ti.UI.createView({
        borderColor: "#4e8789",
        borderWidth: "4",
        top: "90",
        width: "98%",
        id: "__alloyId1171"
    });
    $.__views.__alloyId1165.add($.__views.__alloyId1171);
    $.__views.__alloyId1172 = Ti.UI.createView({
        borderColor: "#4e8789",
        borderWidth: "4",
        height: "70",
        top: "0",
        width: "100%",
        id: "__alloyId1172"
    });
    $.__views.__alloyId1171.add($.__views.__alloyId1172);
    $.__views.__alloyId1173 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#222222",
        height: "50",
        left: "0",
        width: "50",
        title: "DE",
        id: "__alloyId1173"
    });
    $.__views.__alloyId1172.add($.__views.__alloyId1173);
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
    $.__views.__alloyId1172.add($.__views.datainicio);
    datePicker ? $.__views.datainicio.addEventListener("click", datePicker) : __defers["$.__views.datainicio!click!datePicker"] = true;
    $.__views.__alloyId1174 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#222222",
        height: "50",
        left: "290",
        width: "50",
        title: "ATÉ",
        id: "__alloyId1174"
    });
    $.__views.__alloyId1172.add($.__views.__alloyId1174);
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
    $.__views.__alloyId1172.add($.__views.datafim);
    datePicker ? $.__views.datafim.addEventListener("click", datePicker) : __defers["$.__views.datafim!click!datePicker"] = true;
    $.__views.__alloyId1175 = Ti.UI.createButton({
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
        id: "__alloyId1175"
    });
    $.__views.__alloyId1172.add($.__views.__alloyId1175);
    listaPedidos ? $.__views.__alloyId1175.addEventListener("click", listaPedidos) : __defers["$.__views.__alloyId1175!click!listaPedidos"] = true;
    var __alloyId1176 = {};
    var __alloyId1179 = [];
    var __alloyId1181 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1182 = [];
            var __alloyId1184 = {
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
            __alloyId1182.push(__alloyId1184);
            var __alloyId1186 = {
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
            __alloyId1182.push(__alloyId1186);
            var __alloyId1188 = {
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
            __alloyId1182.push(__alloyId1188);
            var __alloyId1190 = {
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
            __alloyId1182.push(__alloyId1190);
            var __alloyId1192 = {
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
            __alloyId1182.push(__alloyId1192);
            return __alloyId1182;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId1179.push(__alloyId1181);
    var __alloyId1178 = {
        properties: {
            height: "50",
            top: "6",
            width: "98%",
            name: "pedido_lista"
        },
        childTemplates: __alloyId1179
    };
    __alloyId1176["pedido_lista"] = __alloyId1178;
    $.__views.__alloyId1193 = Ti.UI.createListSection({
        id: "__alloyId1193"
    });
    var __alloyId1195 = [];
    __alloyId1195.push($.__views.__alloyId1193);
    $.__views.listapedidos = Ti.UI.createListView({
        top: "74",
        height: "88%",
        width: "98%",
        sections: __alloyId1195,
        templates: __alloyId1176,
        id: "listapedidos",
        defaultItemTemplate: "pedido_lista"
    });
    $.__views.__alloyId1171.add($.__views.listapedidos);
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
    __defers["$.__views.__alloyId1175!click!listaPedidos"] && $.__views.__alloyId1175.addEventListener("click", listaPedidos);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;