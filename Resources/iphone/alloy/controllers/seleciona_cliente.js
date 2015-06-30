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
    var __alloyId1307 = {};
    var __alloyId1310 = [];
    var __alloyId1312 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1313 = [];
            var __alloyId1315 = {
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
            __alloyId1313.push(__alloyId1315);
            return __alloyId1313;
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
    __alloyId1310.push(__alloyId1312);
    var __alloyId1309 = {
        properties: {
            height: "112dp",
            name: "menuTemplate"
        },
        childTemplates: __alloyId1310
    };
    __alloyId1307["menuTemplate"] = __alloyId1309;
    var __alloyId1318 = [];
    $.__views.__alloyId1319 = {
        btnmenu: {
            text: "CNPJ/\n RAZÃO SOCIAL/\n ENDEREÇO LOJA"
        },
        properties: {
            id: "__alloyId1319"
        }
    };
    __alloyId1318.push($.__views.__alloyId1319);
    $.__views.__alloyId1320 = {
        btnmenu: {
            text: "ANÁLISE DE \n CRÉDITO"
        },
        properties: {
            id: "__alloyId1320"
        }
    };
    __alloyId1318.push($.__views.__alloyId1320);
    $.__views.__alloyId1321 = {
        btnmenu: {
            text: "IR AO\n CATÁLOGO"
        },
        properties: {
            id: "__alloyId1321"
        }
    };
    __alloyId1318.push($.__views.__alloyId1321);
    $.__views.__alloyId1322 = {
        btnmenu: {
            text: "PEDIDOS"
        },
        properties: {
            id: "__alloyId1322"
        }
    };
    __alloyId1318.push($.__views.__alloyId1322);
    $.__views.__alloyId1323 = {
        btnmenu: {
            text: "TRANSPORTADORA"
        },
        properties: {
            id: "__alloyId1323"
        }
    };
    __alloyId1318.push($.__views.__alloyId1323);
    $.__views.__alloyId1324 = {
        btnmenu: {
            text: "NOVO CLIENTE"
        },
        properties: {
            id: "__alloyId1324"
        }
    };
    __alloyId1318.push($.__views.__alloyId1324);
    $.__views.__alloyId1325 = {
        btnmenu: {
            text: "FUNÇÕES"
        },
        properties: {
            id: "__alloyId1325"
        }
    };
    __alloyId1318.push($.__views.__alloyId1325);
    $.__views.__alloyId1326 = {
        btnmenu: {
            text: "EMAIL"
        },
        properties: {
            id: "__alloyId1326"
        }
    };
    __alloyId1318.push($.__views.__alloyId1326);
    $.__views.__alloyId1327 = {
        btnmenu: {
            text: "VOLTAR PARA TELA INICIAL"
        },
        properties: {
            id: "__alloyId1327"
        }
    };
    __alloyId1318.push($.__views.__alloyId1327);
    $.__views.__alloyId1328 = {
        btnmenu: {
            text: "TROCAR\n MARCA"
        },
        properties: {
            id: "__alloyId1328"
        }
    };
    __alloyId1318.push($.__views.__alloyId1328);
    $.__views.__alloyId1329 = {
        btnmenu: {
            text: "SAIR"
        },
        properties: {
            id: "__alloyId1329"
        }
    };
    __alloyId1318.push($.__views.__alloyId1329);
    $.__views.__alloyId1316 = Ti.UI.createListSection({
        id: "__alloyId1316"
    });
    $.__views.__alloyId1316.items = __alloyId1318;
    var __alloyId1330 = [];
    __alloyId1330.push($.__views.__alloyId1316);
    $.__views.__alloyId1306 = Ti.UI.createListView({
        backgroundColor: "#ebf7f6",
        height: "100%",
        left: "0",
        width: "15%",
        sections: __alloyId1330,
        templates: __alloyId1307,
        defaultItemTemplate: "menuTemplate",
        id: "__alloyId1306"
    });
    $.__views.seleciona_cliente.add($.__views.__alloyId1306);
    $.__views.__alloyId1331 = Ti.UI.createView({
        height: "100%",
        right: "0",
        width: "85%",
        id: "__alloyId1331"
    });
    $.__views.seleciona_cliente.add($.__views.__alloyId1331);
    $.__views.__alloyId1332 = Ti.UI.createView({
        height: "90",
        top: "0",
        width: "98%",
        id: "__alloyId1332"
    });
    $.__views.__alloyId1331.add($.__views.__alloyId1332);
    $.__views.__alloyId1333 = Ti.UI.createView({
        height: "90%",
        left: "0",
        width: "15%",
        id: "__alloyId1333"
    });
    $.__views.__alloyId1332.add($.__views.__alloyId1333);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        left: "0",
        id: "logoEmpresa"
    });
    $.__views.__alloyId1333.add($.__views.logoEmpresa);
    $.__views.__alloyId1334 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4e8789",
        height: "90",
        left: "15%",
        width: "70%",
        title: "CNPJ / RAZÃO SOCIAL / ENDEREÇO LOJA",
        id: "__alloyId1334"
    });
    $.__views.__alloyId1332.add($.__views.__alloyId1334);
    $.__views.__alloyId1335 = Ti.UI.createView({
        height: "90",
        left: "85%",
        width: "15%",
        id: "__alloyId1335"
    });
    $.__views.__alloyId1332.add($.__views.__alloyId1335);
    $.__views.__alloyId1336 = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        right: "0",
        id: "__alloyId1336"
    });
    $.__views.__alloyId1335.add($.__views.__alloyId1336);
    $.__views.__alloyId1337 = Ti.UI.createView({
        borderColor: "#4e8789",
        borderWidth: "4",
        top: "90",
        width: "98%",
        id: "__alloyId1337"
    });
    $.__views.__alloyId1331.add($.__views.__alloyId1337);
    $.__views.__alloyId1338 = Ti.UI.createView({
        borderColor: "#4e8789",
        borderWidth: "4",
        height: "130",
        top: "0",
        width: "100%",
        id: "__alloyId1338"
    });
    $.__views.__alloyId1337.add($.__views.__alloyId1338);
    $.__views.__alloyId1339 = Ti.UI.createView({
        height: "130",
        left: "1%",
        width: "92%",
        id: "__alloyId1339"
    });
    $.__views.__alloyId1338.add($.__views.__alloyId1339);
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
    $.__views.__alloyId1339.add($.__views.buscaRazao);
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
    $.__views.__alloyId1339.add($.__views.buscaCnpj);
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
    $.__views.__alloyId1339.add($.__views.buscaErp);
    $.__views.__alloyId1340 = Ti.UI.createButton({
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
        id: "__alloyId1340"
    });
    $.__views.__alloyId1339.add($.__views.__alloyId1340);
    buscaAlfabetica ? $.__views.__alloyId1340.addEventListener("click", buscaAlfabetica) : __defers["$.__views.__alloyId1340!click!buscaAlfabetica"] = true;
    $.__views.__alloyId1341 = Ti.UI.createView({
        height: "130",
        left: "92%",
        top: "0",
        width: "7%",
        id: "__alloyId1341"
    });
    $.__views.__alloyId1338.add($.__views.__alloyId1341);
    $.__views.__alloyId1342 = Ti.UI.createButton({
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
        id: "__alloyId1342"
    });
    $.__views.__alloyId1341.add($.__views.__alloyId1342);
    buscaCliente ? $.__views.__alloyId1342.addEventListener("click", buscaCliente) : __defers["$.__views.__alloyId1342!click!buscaCliente"] = true;
    $.__views.__alloyId1343 = Ti.UI.createView({
        height: "70%",
        top: "220",
        width: "98%",
        id: "__alloyId1343"
    });
    $.__views.__alloyId1331.add($.__views.__alloyId1343);
    var __alloyId1344 = {};
    var __alloyId1347 = [];
    var __alloyId1349 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1350 = [];
            var __alloyId1352 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId1353 = [];
                    var __alloyId1355 = {
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
                    __alloyId1353.push(__alloyId1355);
                    return __alloyId1353;
                }(),
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    width: "38%"
                }
            };
            __alloyId1350.push(__alloyId1352);
            var __alloyId1357 = {
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
            __alloyId1350.push(__alloyId1357);
            var __alloyId1359 = {
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
            __alloyId1350.push(__alloyId1359);
            var __alloyId1361 = {
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
            __alloyId1350.push(__alloyId1361);
            var __alloyId1363 = {
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
            __alloyId1350.push(__alloyId1363);
            return __alloyId1350;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId1347.push(__alloyId1349);
    var __alloyId1346 = {
        properties: {
            height: "50",
            top: "6",
            width: "98%",
            name: "clientes_naoselecionado"
        },
        childTemplates: __alloyId1347
    };
    __alloyId1344["clientes_naoselecionado"] = __alloyId1346;
    var __alloyId1366 = [];
    var __alloyId1368 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1369 = [];
            var __alloyId1371 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId1372 = [];
                    var __alloyId1374 = {
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
                    __alloyId1372.push(__alloyId1374);
                    return __alloyId1372;
                }(),
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    width: "38%"
                }
            };
            __alloyId1369.push(__alloyId1371);
            var __alloyId1376 = {
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
            __alloyId1369.push(__alloyId1376);
            var __alloyId1378 = {
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
            __alloyId1369.push(__alloyId1378);
            var __alloyId1380 = {
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
            __alloyId1369.push(__alloyId1380);
            var __alloyId1382 = {
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
            __alloyId1369.push(__alloyId1382);
            return __alloyId1369;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId1366.push(__alloyId1368);
    var __alloyId1365 = {
        properties: {
            height: "50",
            top: "6",
            width: "98%",
            name: "clientes_selecionado"
        },
        childTemplates: __alloyId1366
    };
    __alloyId1344["clientes_selecionado"] = __alloyId1365;
    var __alloyId1385 = [];
    var __alloyId1387 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1388 = [];
            var __alloyId1390 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId1391 = [];
                    var __alloyId1393 = {
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
                    __alloyId1391.push(__alloyId1393);
                    return __alloyId1391;
                }(),
                properties: {
                    backgroundColor: "#cce9e5",
                    color: "#000000",
                    height: "100%",
                    width: "38%"
                }
            };
            __alloyId1388.push(__alloyId1390);
            var __alloyId1395 = {
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
            __alloyId1388.push(__alloyId1395);
            var __alloyId1397 = {
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
            __alloyId1388.push(__alloyId1397);
            var __alloyId1399 = {
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
            __alloyId1388.push(__alloyId1399);
            var __alloyId1401 = {
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
            __alloyId1388.push(__alloyId1401);
            return __alloyId1388;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId1385.push(__alloyId1387);
    var __alloyId1384 = {
        properties: {
            height: "50",
            top: "6",
            width: "98%",
            name: "clientes_base"
        },
        childTemplates: __alloyId1385
    };
    __alloyId1344["clientes_base"] = __alloyId1384;
    $.__views.__alloyId1402 = Ti.UI.createListSection({
        id: "__alloyId1402"
    });
    var __alloyId1404 = [];
    __alloyId1404.push($.__views.__alloyId1402);
    $.__views.listaClientes = Ti.UI.createListView({
        sections: __alloyId1404,
        templates: __alloyId1344,
        id: "listaClientes"
    });
    $.__views.__alloyId1343.add($.__views.listaClientes);
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
    __defers["$.__views.__alloyId1340!click!buscaAlfabetica"] && $.__views.__alloyId1340.addEventListener("click", buscaAlfabetica);
    __defers["$.__views.__alloyId1342!click!buscaCliente"] && $.__views.__alloyId1342.addEventListener("click", buscaCliente);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;