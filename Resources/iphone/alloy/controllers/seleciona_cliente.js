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
    function buscaCliente() {
        if (0 != $.buscaRazao.value.length) {
            var search = $.buscaRazao.value;
            clientes = selectClientesByRazao(search);
            resultadoCliente(clientes);
        } else if (0 != $.buscaCnpj.value.length) {
            var search = $.buscaCnpj.value;
            clientes = selectClientesByCnpj(search);
            resultadoCliente(clientes);
        } else if (0 != $.buscaErp.value.length) {
            var search = $.buscaErp.value;
            clientes = selectClientesByErp(search);
            resultadoCliente(clientes);
        } else alert("Favor preencher o campo de busca");
    }
    function buscaAlfabetica() {
        Titanium.UI.currentWindow;
        if ("android" == Ti.Platform.osname) var letras = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ]; else var letras = [ "A", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ];
        var dialog = Titanium.UI.createOptionDialog({
            options: letras,
            destructive: 2,
            cancel: 0,
            title: "Buscar por ordem alfabética"
        });
        dialog.show();
        dialog.addEventListener("click", function(e) {
            var clientes = selectClientesByAlfabetica(letras[e.index]);
            resultadoCliente(clientes);
        });
    }
    function resultadoCliente(clientes) {
        var template = [];
        if (Ti.App.Properties.getList(SELECTED_CLIENTS)) {
            var conjunto = Ti.App.Properties.getList(SELECTED_CLIENTS);
            for (var quantidade = 0; quantidade < conjunto.length; quantidade++) template[conjunto[quantidade]] = 0 == quantidade && 3 != Ti.App.Properties.getString(CURRENT_SOFTWARE) ? "clientes_base" : "clientes_selecionado";
        }
        var data = [];
        while (clientes.isValidRow()) {
            var cl_id = clientes.fieldByName("cl_id");
            var razao = clientes.fieldByName("cl_razao");
            var cnpj = clientes.fieldByName("cl_cnpj");
            var bairro = clientes.fieldByName("cl_bairro_unid");
            var cidade = clientes.fieldByName("cl_cidade_unid");
            Ti.API.info(razao);
            template[cl_id] || (template[cl_id] = "clientes_naoselecionado");
            var largura_botao;
            largura_botao = "android" == Ti.Platform.osname ? "11%" : "9%";
            data.push({
                cl_id: cl_id,
                label_razao: {
                    text: razao
                },
                label_cnpj: {
                    text: cnpj
                },
                label_bairro: {
                    text: bairro
                },
                label_cidade: {
                    text: cidade
                },
                btn_selecionar: {
                    width: largura_botao
                },
                template: template[cl_id]
            });
            clientes.next();
        }
        $.listaClientes.sections[0].setItems(data);
    }
    function selecionaCliente(e) {
        var section = $.listaClientes.sections[e.sectionIndex];
        var item = section.getItemAt(e.itemIndex);
        var id = item.cl_id;
        var template = addSelectedClients(id);
        if ("amarelo" == template) {
            item.template = "clientes_base";
            section.updateItemAt(e.itemIndex, item);
        } else if ("vermelho" == template) {
            item.template = "clientes_selecionado";
            section.updateItemAt(e.itemIndex, item);
            Ti.API.info(getSelectedClients());
        }
    }
    function removeClienteSelecionado(e) {
        var section = $.listaClientes.sections[e.sectionIndex];
        var item = section.getItemAt(e.itemIndex);
        var id = item.cl_id;
        delSelectedClients(id);
        item.template = "clientes_naoselecionado";
        section.updateItemAt(e.itemIndex, item);
    }
    function removeClienteBase(e) {
        var section = $.listaClientes.sections[e.sectionIndex];
        var item = section.getItemAt(e.itemIndex);
        var id = item.cl_id;
        var conjunto = Ti.App.Properties.getList(SELECTED_CLIENTS);
        for (var quantidade = 0; quantidade < conjunto.length; quantidade++) ;
        if (1 == quantidade) {
            delSelectedClients(id);
            item.template = "clientes_naoselecionado";
            section.updateItemAt(e.itemIndex, item);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "seleciona_cliente";
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
    $.__views.seleciona_cliente = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        id: "seleciona_cliente"
    });
    $.__views.seleciona_cliente && $.addTopLevelView($.__views.seleciona_cliente);
    var __alloyId1231 = {};
    var __alloyId1234 = [];
    var __alloyId1236 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1237 = [];
            var __alloyId1239 = {
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
            __alloyId1237.push(__alloyId1239);
            return __alloyId1237;
        }(),
        properties: {
            backgroundColor: "#3f3a35",
            borderColor: "#9ccccb",
            borderWidth: "4",
            color: "#ffffff",
            height: "94",
            top: "10",
            width: "90%"
        },
        events: {
            click: menuClick
        }
    };
    __alloyId1234.push(__alloyId1236);
    var __alloyId1233 = {
        properties: {
            height: "112dp",
            name: "menuTemplate"
        },
        childTemplates: __alloyId1234
    };
    __alloyId1231["menuTemplate"] = __alloyId1233;
    var __alloyId1242 = [];
    $.__views.__alloyId1243 = {
        btnmenu: {
            text: "CNPJ/\n RAZÃO SOCIAL/\n ENDEREÇO LOJA"
        },
        properties: {
            id: "__alloyId1243"
        }
    };
    __alloyId1242.push($.__views.__alloyId1243);
    $.__views.__alloyId1244 = {
        btnmenu: {
            text: "ANÁLISE DE \n CRÉDITO"
        },
        properties: {
            id: "__alloyId1244"
        }
    };
    __alloyId1242.push($.__views.__alloyId1244);
    $.__views.__alloyId1245 = {
        btnmenu: {
            text: "IR AO\n CATÁLOGO"
        },
        properties: {
            id: "__alloyId1245"
        }
    };
    __alloyId1242.push($.__views.__alloyId1245);
    $.__views.__alloyId1246 = {
        btnmenu: {
            text: "PEDIDOS"
        },
        properties: {
            id: "__alloyId1246"
        }
    };
    __alloyId1242.push($.__views.__alloyId1246);
    $.__views.__alloyId1247 = {
        btnmenu: {
            text: "TRANSPORTADORA"
        },
        properties: {
            id: "__alloyId1247"
        }
    };
    __alloyId1242.push($.__views.__alloyId1247);
    $.__views.__alloyId1248 = {
        btnmenu: {
            text: "NOVO CLIENTE"
        },
        properties: {
            id: "__alloyId1248"
        }
    };
    __alloyId1242.push($.__views.__alloyId1248);
    $.__views.__alloyId1249 = {
        btnmenu: {
            text: "FUNÇÕES"
        },
        properties: {
            id: "__alloyId1249"
        }
    };
    __alloyId1242.push($.__views.__alloyId1249);
    $.__views.__alloyId1250 = {
        btnmenu: {
            text: "EMAIL"
        },
        properties: {
            id: "__alloyId1250"
        }
    };
    __alloyId1242.push($.__views.__alloyId1250);
    $.__views.__alloyId1251 = {
        btnmenu: {
            text: "VOLTAR PARA TELA INICIAL"
        },
        properties: {
            id: "__alloyId1251"
        }
    };
    __alloyId1242.push($.__views.__alloyId1251);
    $.__views.__alloyId1252 = {
        btnmenu: {
            text: "TROCAR\n MARCA"
        },
        properties: {
            id: "__alloyId1252"
        }
    };
    __alloyId1242.push($.__views.__alloyId1252);
    $.__views.__alloyId1253 = {
        btnmenu: {
            text: "SAIR"
        },
        properties: {
            id: "__alloyId1253"
        }
    };
    __alloyId1242.push($.__views.__alloyId1253);
    $.__views.__alloyId1240 = Ti.UI.createListSection({
        id: "__alloyId1240"
    });
    $.__views.__alloyId1240.items = __alloyId1242;
    var __alloyId1254 = [];
    __alloyId1254.push($.__views.__alloyId1240);
    $.__views.__alloyId1230 = Ti.UI.createListView({
        backgroundColor: "#ebf7f6",
        height: "100%",
        left: "0",
        width: "15%",
        sections: __alloyId1254,
        templates: __alloyId1231,
        defaultItemTemplate: "menuTemplate",
        id: "__alloyId1230"
    });
    $.__views.seleciona_cliente.add($.__views.__alloyId1230);
    $.__views.__alloyId1255 = Ti.UI.createView({
        height: "100%",
        right: "0",
        width: "85%",
        id: "__alloyId1255"
    });
    $.__views.seleciona_cliente.add($.__views.__alloyId1255);
    $.__views.__alloyId1256 = Ti.UI.createView({
        height: "90",
        top: "0",
        width: "98%",
        id: "__alloyId1256"
    });
    $.__views.__alloyId1255.add($.__views.__alloyId1256);
    $.__views.__alloyId1257 = Ti.UI.createView({
        height: "90%",
        left: "0",
        width: "15%",
        id: "__alloyId1257"
    });
    $.__views.__alloyId1256.add($.__views.__alloyId1257);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        left: "0",
        id: "logoEmpresa"
    });
    $.__views.__alloyId1257.add($.__views.logoEmpresa);
    $.__views.__alloyId1258 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4e8789",
        height: "90",
        left: "15%",
        width: "70%",
        title: "CNPJ / RAZÃO SOCIAL / ENDEREÇO LOJA",
        id: "__alloyId1258"
    });
    $.__views.__alloyId1256.add($.__views.__alloyId1258);
    $.__views.__alloyId1259 = Ti.UI.createView({
        height: "90",
        left: "85%",
        width: "15%",
        id: "__alloyId1259"
    });
    $.__views.__alloyId1256.add($.__views.__alloyId1259);
    $.__views.__alloyId1260 = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        right: "0",
        id: "__alloyId1260"
    });
    $.__views.__alloyId1259.add($.__views.__alloyId1260);
    $.__views.__alloyId1261 = Ti.UI.createView({
        borderColor: "#4e8789",
        borderWidth: "4",
        top: "90",
        width: "98%",
        id: "__alloyId1261"
    });
    $.__views.__alloyId1255.add($.__views.__alloyId1261);
    $.__views.__alloyId1262 = Ti.UI.createView({
        borderColor: "#4e8789",
        borderWidth: "4",
        height: "130",
        top: "0",
        width: "100%",
        id: "__alloyId1262"
    });
    $.__views.__alloyId1261.add($.__views.__alloyId1262);
    $.__views.__alloyId1263 = Ti.UI.createView({
        height: "130",
        left: "1%",
        width: "92%",
        id: "__alloyId1263"
    });
    $.__views.__alloyId1262.add($.__views.__alloyId1263);
    $.__views.buscaRazao = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderRadius: "5",
        borderWidth: "4",
        color: "#000000",
        height: "50",
        left: "0",
        top: "10",
        width: "49%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "buscaRazao",
        hintText: "BUSCAR POR RAZÃO SOCIAL"
    });
    $.__views.__alloyId1263.add($.__views.buscaRazao);
    $.__views.buscaCnpj = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderRadius: "5",
        borderWidth: "4",
        color: "#000000",
        height: "50",
        left: "50%",
        top: "10",
        width: "49%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "buscaCnpj",
        hintText: "BUSCAR POR CNPJ"
    });
    $.__views.__alloyId1263.add($.__views.buscaCnpj);
    $.__views.buscaErp = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderRadius: "5",
        borderWidth: "4",
        color: "#000000",
        height: "50",
        left: "0",
        top: "70",
        width: "49%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "buscaErp",
        hintText: "BUSCAR POR CÓDIGO DO ERP"
    });
    $.__views.__alloyId1263.add($.__views.buscaErp);
    $.__views.__alloyId1264 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        borderColor: "#6EA9A0",
        borderRadius: "5",
        borderWidth: "4",
        color: "#000000",
        height: "50",
        left: "50%",
        top: "70",
        width: "49%",
        title: "BUSCAR POR ORDEM ALFABÉTICA",
        id: "__alloyId1264"
    });
    $.__views.__alloyId1263.add($.__views.__alloyId1264);
    buscaAlfabetica ? $.__views.__alloyId1264.addEventListener("click", buscaAlfabetica) : __defers["$.__views.__alloyId1264!click!buscaAlfabetica"] = true;
    $.__views.__alloyId1265 = Ti.UI.createView({
        height: "130",
        left: "92%",
        top: "0",
        width: "7%",
        id: "__alloyId1265"
    });
    $.__views.__alloyId1262.add($.__views.__alloyId1265);
    $.__views.__alloyId1266 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        height: "110",
        top: "10",
        width: "80%",
        color: "white",
        title: "Ir",
        id: "__alloyId1266"
    });
    $.__views.__alloyId1265.add($.__views.__alloyId1266);
    buscaCliente ? $.__views.__alloyId1266.addEventListener("click", buscaCliente) : __defers["$.__views.__alloyId1266!click!buscaCliente"] = true;
    $.__views.__alloyId1267 = Ti.UI.createView({
        height: "70%",
        top: "220",
        width: "98%",
        id: "__alloyId1267"
    });
    $.__views.__alloyId1255.add($.__views.__alloyId1267);
    var __alloyId1268 = {};
    var __alloyId1271 = [];
    var __alloyId1273 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1274 = [];
            var __alloyId1276 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId1277 = [];
                    var __alloyId1279 = {
                        type: "Ti.UI.Label",
                        bindId: "label_razao",
                        properties: {
                            color: "#000000",
                            height: "100%",
                            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                            width: "98%",
                            bindId: "label_razao"
                        }
                    };
                    __alloyId1277.push(__alloyId1279);
                    return __alloyId1277;
                }(),
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    width: "38%"
                }
            };
            __alloyId1274.push(__alloyId1276);
            var __alloyId1281 = {
                type: "Ti.UI.Label",
                bindId: "label_cnpj",
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    width: "20%",
                    bindId: "label_cnpj"
                }
            };
            __alloyId1274.push(__alloyId1281);
            var __alloyId1283 = {
                type: "Ti.UI.Label",
                bindId: "label_bairro",
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    width: "15%",
                    bindId: "label_bairro"
                }
            };
            __alloyId1274.push(__alloyId1283);
            var __alloyId1285 = {
                type: "Ti.UI.Label",
                bindId: "label_cidade",
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    width: "15%",
                    bindId: "label_cidade"
                }
            };
            __alloyId1274.push(__alloyId1285);
            var __alloyId1287 = {
                type: "Ti.UI.Button",
                bindId: "btn_selecionar",
                properties: {
                    backgroundGradient: {
                        type: "linear",
                        colors: [ "#2c8f8e", "#206764" ]
                    },
                    borderRadius: "5",
                    left: "1%",
                    width: "11%",
                    height: "95%",
                    color: "#ffffff",
                    bindId: "btn_selecionar",
                    title: "Selecionar"
                },
                events: {
                    click: selecionaCliente
                }
            };
            __alloyId1274.push(__alloyId1287);
            return __alloyId1274;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId1271.push(__alloyId1273);
    var __alloyId1270 = {
        properties: {
            height: "50",
            top: "6",
            width: "98%",
            name: "clientes_naoselecionado"
        },
        childTemplates: __alloyId1271
    };
    __alloyId1268["clientes_naoselecionado"] = __alloyId1270;
    var __alloyId1290 = [];
    var __alloyId1292 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1293 = [];
            var __alloyId1295 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId1296 = [];
                    var __alloyId1298 = {
                        type: "Ti.UI.Label",
                        bindId: "label_razao",
                        properties: {
                            color: "#000000",
                            height: "100%",
                            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                            width: "98%",
                            bindId: "label_razao"
                        }
                    };
                    __alloyId1296.push(__alloyId1298);
                    return __alloyId1296;
                }(),
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    width: "38%"
                }
            };
            __alloyId1293.push(__alloyId1295);
            var __alloyId1300 = {
                type: "Ti.UI.Label",
                bindId: "label_cnpj",
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    width: "20%",
                    bindId: "label_cnpj"
                }
            };
            __alloyId1293.push(__alloyId1300);
            var __alloyId1302 = {
                type: "Ti.UI.Label",
                bindId: "label_bairro",
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    width: "15%",
                    bindId: "label_bairro"
                }
            };
            __alloyId1293.push(__alloyId1302);
            var __alloyId1304 = {
                type: "Ti.UI.Label",
                bindId: "label_cidade",
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    width: "15%",
                    bindId: "label_cidade"
                }
            };
            __alloyId1293.push(__alloyId1304);
            var __alloyId1306 = {
                type: "Ti.UI.Button",
                bindId: "btn_selecionar",
                properties: {
                    backgroundGradient: {
                        type: "linear",
                        colors: [ "#d9534f", "#e5302a" ]
                    },
                    borderRadius: "5",
                    left: "1%",
                    width: "11%",
                    height: "95%",
                    color: "white",
                    bindId: "btn_selecionar",
                    title: "Selecionar"
                },
                events: {
                    click: removeClienteSelecionado
                }
            };
            __alloyId1293.push(__alloyId1306);
            return __alloyId1293;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId1290.push(__alloyId1292);
    var __alloyId1289 = {
        properties: {
            height: "50",
            top: "6",
            width: "98%",
            name: "clientes_selecionado"
        },
        childTemplates: __alloyId1290
    };
    __alloyId1268["clientes_selecionado"] = __alloyId1289;
    var __alloyId1309 = [];
    var __alloyId1311 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1312 = [];
            var __alloyId1314 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId1315 = [];
                    var __alloyId1317 = {
                        type: "Ti.UI.Label",
                        bindId: "label_razao",
                        properties: {
                            color: "#000000",
                            height: "100%",
                            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                            width: "98%",
                            bindId: "label_razao"
                        }
                    };
                    __alloyId1315.push(__alloyId1317);
                    return __alloyId1315;
                }(),
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    width: "38%"
                }
            };
            __alloyId1312.push(__alloyId1314);
            var __alloyId1319 = {
                type: "Ti.UI.Label",
                bindId: "label_cnpj",
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    width: "20%",
                    bindId: "label_cnpj"
                }
            };
            __alloyId1312.push(__alloyId1319);
            var __alloyId1321 = {
                type: "Ti.UI.Label",
                bindId: "label_bairro",
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    width: "15%",
                    bindId: "label_bairro"
                }
            };
            __alloyId1312.push(__alloyId1321);
            var __alloyId1323 = {
                type: "Ti.UI.Label",
                bindId: "label_cidade",
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    width: "15%",
                    bindId: "label_cidade"
                }
            };
            __alloyId1312.push(__alloyId1323);
            var __alloyId1325 = {
                type: "Ti.UI.Button",
                bindId: "btn_selecionar",
                properties: {
                    backgroundGradient: {
                        type: "linear",
                        colors: [ "#f5eb4b", "#dcd231" ]
                    },
                    borderRadius: "5",
                    left: "1%",
                    width: "11%",
                    height: "95%",
                    color: "white",
                    bindId: "btn_selecionar",
                    title: "Base"
                },
                events: {
                    click: removeClienteBase
                }
            };
            __alloyId1312.push(__alloyId1325);
            return __alloyId1312;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId1309.push(__alloyId1311);
    var __alloyId1308 = {
        properties: {
            height: "50",
            top: "6",
            width: "98%",
            name: "clientes_base"
        },
        childTemplates: __alloyId1309
    };
    __alloyId1268["clientes_base"] = __alloyId1308;
    $.__views.__alloyId1326 = Ti.UI.createListSection({
        id: "__alloyId1326"
    });
    var __alloyId1328 = [];
    __alloyId1328.push($.__views.__alloyId1326);
    $.__views.listaClientes = Ti.UI.createListView({
        sections: __alloyId1328,
        templates: __alloyId1268,
        id: "listaClientes"
    });
    $.__views.__alloyId1267.add($.__views.listaClientes);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/api/menu.js");
    Ti.include("/api/config.js");
    Ti.include("/database/clientes.js");
    Ti.include("/database/aparencia.js");
    var clientes;
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    Ti.App.Properties.getString(CURRENT_SOFTWARE);
    __defers["$.__views.__alloyId1264!click!buscaAlfabetica"] && $.__views.__alloyId1264.addEventListener("click", buscaAlfabetica);
    __defers["$.__views.__alloyId1266!click!buscaCliente"] && $.__views.__alloyId1266.addEventListener("click", buscaCliente);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;