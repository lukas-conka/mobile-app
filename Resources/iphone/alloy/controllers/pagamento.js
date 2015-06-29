function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function replicar() {
        goTo("replicar");
    }
    function descontoPrazoMedio(e) {
        var comando = e;
        var identificacao = [];
        var prazo = [];
        var desconto = [];
        var texto = [];
        var selecao = $.listaclientes.sections[comando.sectionIndex];
        var item = selecao.getItemAt(comando.itemIndex);
        var cliente = item.cliente;
        var prazoMedio = consultaPrazoPagamento();
        while (prazoMedio.isValidRow()) {
            {
                prazoMedio.fieldByName("tb_pr_id");
            }
            var tb_pr_nome = prazoMedio.fieldByName("tb_pr_nome");
            var tb_desc_nome = prazoMedio.fieldByName("tb_desc_nome");
            var tb_desconto_id = prazoMedio.fieldByName("tb_desconto_id");
            identificacao.push(tb_desconto_id);
            prazo.push(tb_pr_nome);
            desconto.push(tb_desc_nome);
            texto.push(tb_pr_nome + " (" + tb_desc_nome + "% de desconto)");
            prazoMedio.next();
        }
        Titanium.UI.currentWindow;
        var dialog = Titanium.UI.createOptionDialog({
            options: texto,
            destructive: 2,
            cancel: 0,
            title: "Prazo médio"
        });
        dialog.show();
        dialog.addEventListener("click", function(e) {
            descontoDatas(comando, cliente, identificacao[e.index], prazo[e.index], desconto[e.index]);
        });
    }
    function descontoDatas(comando, cliente, identificacaoPrazo, prazo, desconto) {
        var identificacao = [];
        var dataMedia = [];
        var result = false;
        var dataPrazo = consultaDataPagamento(identificacaoPrazo);
        while (dataPrazo.isValidRow()) {
            result = true;
            var tb_data_id = dataPrazo.fieldByName("tb_data_id");
            var tb_data_nome = dataPrazo.fieldByName("tb_data_nome");
            dataMedia.push(tb_data_nome);
            identificacao.push(tb_data_id);
            dataPrazo.next();
        }
        if (result) {
            {
                Titanium.UI.currentWindow;
            }
            var dialog = Titanium.UI.createOptionDialog({
                options: dataMedia,
                destructive: 2,
                cancel: 0,
                title: "Data"
            });
            dialog.show();
            dialog.addEventListener("click", function(e) {
                calculoPrazoMedio(comando, cliente, prazo, desconto, dataMedia[e.index]);
            });
        } else {
            descontoPrazo[cliente] = desconto;
            dataPrazoMedio[cliente] = 1;
            condicaoPrazoMedio[cliente] = "Imediato";
            var selecao = $.listaclientes.sections[comando.sectionIndex];
            var item = selecao.getItemAt(comando.itemIndex);
            item.label_dias_botao.title = prazo;
            item.label_prazo.text = descontoPrazo[cliente] + "%";
            item.label_condicao.text = dataMedia;
            selecao.updateItemAt(comando.itemIndex, item);
            calculoParcela(comando, cliente);
        }
    }
    function calculoPrazoMedio(comando, cliente, prazo, desconto, dataMedia) {
        var parcela = dataMedia.split("/");
        descontoPrazo[cliente] = desconto;
        dataPrazoMedio[cliente] = parcela.length;
        condicaoPrazoMedio[cliente] = dataMedia;
        var selecao = $.listaclientes.sections[comando.sectionIndex];
        var item = selecao.getItemAt(comando.itemIndex);
        item.label_dias_botao.title = prazo;
        item.label_prazo.text = descontoPrazo[cliente] + "%";
        item.label_condicao.text = dataMedia;
        selecao.updateItemAt(comando.itemIndex, item);
        calculoParcela(comando, cliente);
    }
    function descontoEspecial(e) {
        var comando = e;
        var desconto = [];
        var texto = [];
        var selecao = $.listaclientes.sections[comando.sectionIndex];
        var item = selecao.getItemAt(comando.itemIndex);
        var cliente = item.cliente;
        var representante = consultaMaximoDesconto();
        representante.fieldByName("rp_desc_especial");
        var rp_limite_desc_especial = representante.fieldByName("rp_limite_desc_especial");
        for (porcentagem = 0; rp_limite_desc_especial >= porcentagem; porcentagem++) {
            desconto.push(porcentagem);
            texto.push(porcentagem + "%");
        }
        Titanium.UI.currentWindow;
        var dialog = Titanium.UI.createOptionDialog({
            options: texto,
            destructive: 2,
            cancel: 0,
            title: "Desconto especial"
        });
        dialog.show();
        dialog.addEventListener("click", function(e) {
            calculoEspecial(comando, cliente, desconto[e.index]);
        });
    }
    function calculoEspecial(comando, cliente, desconto) {
        descontoEspecial[cliente] = desconto;
        var selecao = $.listaclientes.sections[comando.sectionIndex];
        var item = selecao.getItemAt(comando.itemIndex);
        item.label_especial_botao.title = desconto + "%";
        selecao.updateItemAt(comando.itemIndex, item);
        calculoParcela(comando, cliente);
    }
    function calculoParcela(comando, cliente) {
        var calculo1 = 0;
        calculo1 = 0 != aux_calc ? aux_calc * descontoPrazo[cliente] / 100 : valorInicial[cliente] * descontoPrazo[cliente] / 100;
        var resultado1 = 0;
        resultado1 = 0 != aux_calc ? aux_calc - calculo1 : valorInicial[cliente] - calculo1;
        var calculo2 = resultado1 * descontoEspecial[cliente] / 100;
        var resultado2 = resultado1 - calculo2;
        var parcelaSemDesconto = 0;
        parcelaSemDesconto = 0 != aux_calc ? aux_calc / dataPrazoMedio[cliente] : valorInicial[cliente] / dataPrazoMedio[cliente];
        var parcelaComDesconto = resultado2 / dataPrazoMedio[cliente];
        var credito = getClienteCredito(cliente);
        var cl_credito_utilizado = credito.fieldByName("cl_credito_utilizado");
        var cl_credito_total = credito.fieldByName("cl_credito_total");
        var utilizado = cl_credito_total - cl_credito_utilizado - resultado2;
        var selecao = $.listaclientes.sections[comando.sectionIndex];
        var item = selecao.getItemAt(comando.itemIndex);
        item.label_parcela.text = dataPrazoMedio[cliente] + "x de " + formatCurrency(parcelaComDesconto);
        item.label_desconto.text = formatCurrency(resultado2);
        item.label_credito.text = formatCurrency(utilizado);
        $.total_geral.text = formatCurrency(resultado2);
        selecao.updateItemAt(comando.itemIndex, item);
    }
    function selecionaBoleto() {
        formaPagamento = "boleto";
        $.cheque.image = "/images/seleciona.png";
        $.deposito.image = "/images/seleciona.png";
        $.combinar.image = "/images/seleciona.png";
        $.boleto.image = "/images/selecionar_vermelho.png";
    }
    function selecionaCheque() {
        formaPagamento = "cheque";
        $.boleto.image = "/images/seleciona.png";
        $.deposito.image = "/images/seleciona.png";
        $.combinar.image = "/images/seleciona.png";
        $.cheque.image = "/images/selecionar_vermelho.png";
    }
    function selecionaDeposito() {
        formaPagamento = "deposito";
        $.boleto.image = "/images/seleciona.png";
        $.cheque.image = "/images/seleciona.png";
        $.combinar.image = "/images/seleciona.png";
        $.deposito.image = "/images/selecionar_vermelho.png";
    }
    function selecionaCombinar() {
        formaPagamento = "combinar";
        $.boleto.image = "/images/seleciona.png";
        $.cheque.image = "/images/seleciona.png";
        $.deposito.image = "/images/seleciona.png";
        $.combinar.image = "/images/selecionar_vermelho.png";
    }
    function volta() {
        goTo("carrinho");
    }
    function finalizaPagamento() {
        if ("" == formaPagamento) alert("Forma de pagamento não selecionada"); else {
            var q = 0;
            var today = new Date();
            var save_date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":00";
            for (var i = 0; i < conjunto.length; i++) {
                var carrinho = consultaFinalCarrinho(Ti.App.Properties.getString(SESSION_ID), conjunto[i]);
                var ultimoPedido = consultaUltimoPedido();
                var ultimoCarrinhoPedido = consultaUltimoCarrinhoPedido() + 1;
                var ped_id = ultimoPedido + 1;
                var numero = Ti.App.Properties.getString(CURRENT_USER_ID) + "1" + ped_id;
                for (var j = 0; j < carrinho.length; j++) {
                    var car_quantidade = carrinho[j][0];
                    var car_preco_unitario = carrinho[j][1];
                    var car_ipi = carrinho[j][2];
                    var car_icms = carrinho[j][3];
                    var car_entrega = carrinho[j][4];
                    var car_entrega_prazo = carrinho[j][5];
                    {
                        carrinho[j][6];
                    }
                    var fk_produtos = carrinho[j][7];
                    var fk_tamanhos = carrinho[j][8];
                    var fk_cores = carrinho[j][9];
                    var crp_id = ultimoCarrinhoPedido + q;
                    q++;
                    insertCarrinhoPedido(crp_id, Ti.App.Properties.getString(SESSION_ID), car_quantidade, car_preco_unitario, car_ipi, car_icms, save_date, 0, descontoPrazo[conjunto[i]], descontoEspecial[conjunto[i]], formaPagamento, ped_id, conjunto[i], fk_tamanhos, fk_produtos, fk_cores, Ti.App.Properties.getString(CURRENT_USER_ID), 2);
                }
                insertPedido(ped_id, Ti.App.Properties.getString(SESSION_ID), 1, condicaoPrazoMedio[conjunto[i]], car_entrega, car_entrega_prazo, save_date, 1, numero, "", "N", conjunto[i], Ti.App.Properties.getString(CURRENT_USER_ID), 2);
            }
            cleanOrders();
            goTo("finalizacao");
        }
    }
    function cleanOrders() {
        resetCarrinho();
        var products = [];
        var clientes = [];
        Ti.App.Properties.setList(SELECTED_CLIENTS, clientes);
        Ti.App.Properties.setList(SELECTED_PRODUCTS, products);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "pagamento";
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
    $.__views.pagamento = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "pagamento"
    });
    $.__views.pagamento && $.addTopLevelView($.__views.pagamento);
    $.__views.__alloyId1073 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#4e8789",
        top: "2%",
        title: "PAGAMENTO",
        id: "__alloyId1073"
    });
    $.__views.pagamento.add($.__views.__alloyId1073);
    $.__views.__alloyId1074 = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        right: "1%",
        top: "0.8%",
        id: "__alloyId1074"
    });
    $.__views.pagamento.add($.__views.__alloyId1074);
    $.__views.__alloyId1075 = Ti.UI.createView({
        backgroundColor: "#dbdbdb",
        bottom: "1%",
        height: "92%",
        width: "98%",
        id: "__alloyId1075"
    });
    $.__views.pagamento.add($.__views.__alloyId1075);
    $.__views.__alloyId1076 = Ti.UI.createView({
        height: "7%",
        top: "2%",
        width: "98%",
        id: "__alloyId1076"
    });
    $.__views.__alloyId1075.add($.__views.__alloyId1076);
    $.__views.__alloyId1077 = Ti.UI.createLabel({
        backgroundColor: "#20706d",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        left: "5%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "13%",
        text: "CNPJ",
        id: "__alloyId1077"
    });
    $.__views.__alloyId1076.add($.__views.__alloyId1077);
    $.__views.__alloyId1078 = Ti.UI.createLabel({
        backgroundColor: "#69a09d",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        left: "0%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "5%",
        text: "% Sobre Pedido",
        id: "__alloyId1078"
    });
    $.__views.__alloyId1076.add($.__views.__alloyId1078);
    $.__views.__alloyId1079 = Ti.UI.createLabel({
        backgroundColor: "#69a09d",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        left: "18%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "7%",
        text: "Nº Peças",
        id: "__alloyId1079"
    });
    $.__views.__alloyId1076.add($.__views.__alloyId1079);
    $.__views.__alloyId1080 = Ti.UI.createLabel({
        backgroundColor: "#20706d",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        left: "25%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "10%",
        text: "Valor Bruto",
        id: "__alloyId1080"
    });
    $.__views.__alloyId1076.add($.__views.__alloyId1080);
    $.__views.__alloyId1081 = Ti.UI.createLabel({
        backgroundColor: "#69a09d",
        color: "#ffffff",
        height: "100%",
        font: {
            fontSize: 13
        },
        left: "35%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "5%",
        text: "Prazo Médio / Dias",
        id: "__alloyId1081"
    });
    $.__views.__alloyId1076.add($.__views.__alloyId1081);
    $.__views.__alloyId1082 = Ti.UI.createLabel({
        backgroundColor: "#20706d",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        left: "40%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "5%",
        text: "Desc. Prazo Médio",
        id: "__alloyId1082"
    });
    $.__views.__alloyId1076.add($.__views.__alloyId1082);
    $.__views.__alloyId1083 = Ti.UI.createLabel({
        backgroundColor: "#69a09d",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        left: "45%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "5%",
        text: "Desc. Esp.",
        id: "__alloyId1083"
    });
    $.__views.__alloyId1076.add($.__views.__alloyId1083);
    $.__views.__alloyId1084 = Ti.UI.createLabel({
        backgroundColor: "#20706d",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        left: "50%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "5%",
        text: "Desc. Vol.",
        id: "__alloyId1084"
    });
    $.__views.__alloyId1076.add($.__views.__alloyId1084);
    $.__views.__alloyId1085 = Ti.UI.createLabel({
        backgroundColor: "#69a09d",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        left: "55%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "11%",
        text: "Valor Parcela",
        id: "__alloyId1085"
    });
    $.__views.__alloyId1076.add($.__views.__alloyId1085);
    $.__views.__alloyId1086 = Ti.UI.createLabel({
        backgroundColor: "#20706d",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        left: "66%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "11%",
        text: "Valor final do pedido",
        id: "__alloyId1086"
    });
    $.__views.__alloyId1076.add($.__views.__alloyId1086);
    $.__views.__alloyId1087 = Ti.UI.createLabel({
        backgroundColor: "#69a09d",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        left: "77%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "11%",
        text: "Condições de Pagamento",
        id: "__alloyId1087"
    });
    $.__views.__alloyId1076.add($.__views.__alloyId1087);
    $.__views.__alloyId1088 = Ti.UI.createLabel({
        backgroundColor: "#20706d",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        left: "88%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "12%",
        text: "Crédito para Compra",
        id: "__alloyId1088"
    });
    $.__views.__alloyId1076.add($.__views.__alloyId1088);
    var __alloyId1089 = {};
    var __alloyId1092 = [];
    var __alloyId1094 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1095 = [];
            var __alloyId1097 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId1098 = [];
                    var __alloyId1100 = {
                        type: "Ti.UI.Button",
                        bindId: "label_porcentagem_botao",
                        properties: {
                            backgroundGradient: {
                                type: "linear",
                                colors: [ "#2c8f8e", "#206764" ]
                            },
                            color: "#ffffff",
                            font: {
                                fontSize: 13
                            },
                            height: "90%",
                            width: "90%",
                            bindId: "label_porcentagem_botao"
                        },
                        events: {
                            click: replicar
                        }
                    };
                    __alloyId1098.push(__alloyId1100);
                    return __alloyId1098;
                }(),
                properties: {
                    backgroundColor: "#e1e1e1",
                    color: "#000000",
                    font: {
                        fontSize: 13
                    },
                    height: "100%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "5%"
                }
            };
            __alloyId1095.push(__alloyId1097);
            var __alloyId1102 = {
                type: "Ti.UI.Label",
                bindId: "label_cnpj",
                properties: {
                    backgroundColor: "#d2d2d2",
                    color: "#000000",
                    font: {
                        fontSize: 13
                    },
                    height: "100%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "13%",
                    bindId: "label_cnpj"
                }
            };
            __alloyId1095.push(__alloyId1102);
            var __alloyId1104 = {
                type: "Ti.UI.Label",
                bindId: "label_peca",
                properties: {
                    backgroundColor: "#e1e1e1",
                    color: "#000000",
                    font: {
                        fontSize: 13
                    },
                    height: "100%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    bindId: "label_peca"
                }
            };
            __alloyId1095.push(__alloyId1104);
            var __alloyId1106 = {
                type: "Ti.UI.Label",
                bindId: "label_bruto",
                properties: {
                    backgroundColor: "#d2d2d2",
                    color: "#000000",
                    font: {
                        fontSize: 13
                    },
                    height: "100%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "10%",
                    bindId: "label_bruto"
                }
            };
            __alloyId1095.push(__alloyId1106);
            var __alloyId1108 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId1109 = [];
                    var __alloyId1111 = {
                        type: "Ti.UI.Button",
                        bindId: "label_dias_botao",
                        properties: {
                            backgroundGradient: {
                                type: "linear",
                                colors: [ "#2c8f8e", "#206764" ]
                            },
                            color: "#ffffff",
                            font: {
                                fontSize: 13
                            },
                            height: "90%",
                            width: "90%",
                            bindId: "label_dias_botao"
                        },
                        events: {
                            click: descontoPrazoMedio
                        }
                    };
                    __alloyId1109.push(__alloyId1111);
                    return __alloyId1109;
                }(),
                properties: {
                    backgroundColor: "#e1e1e1",
                    color: "#000000",
                    font: {
                        fontSize: 13
                    },
                    height: "100%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "5%"
                }
            };
            __alloyId1095.push(__alloyId1108);
            var __alloyId1113 = {
                type: "Ti.UI.Label",
                bindId: "label_prazo",
                properties: {
                    backgroundColor: "#d2d2d2",
                    color: "#000000",
                    font: {
                        fontSize: 13
                    },
                    height: "100%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "5%",
                    bindId: "label_prazo"
                }
            };
            __alloyId1095.push(__alloyId1113);
            var __alloyId1115 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId1116 = [];
                    var __alloyId1118 = {
                        type: "Ti.UI.Button",
                        bindId: "label_especial_botao",
                        properties: {
                            backgroundGradient: {
                                type: "linear",
                                colors: [ "#2c8f8e", "#206764" ]
                            },
                            color: "#ffffff",
                            font: {
                                fontSize: 13
                            },
                            height: "90%",
                            width: "90%",
                            bindId: "label_especial_botao"
                        },
                        events: {
                            click: descontoEspecial
                        }
                    };
                    __alloyId1116.push(__alloyId1118);
                    return __alloyId1116;
                }(),
                properties: {
                    backgroundColor: "#e1e1e1",
                    color: "#000000",
                    font: {
                        fontSize: 13
                    },
                    height: "100%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "5%"
                }
            };
            __alloyId1095.push(__alloyId1115);
            var __alloyId1120 = {
                type: "Ti.UI.Label",
                bindId: "label_volume",
                properties: {
                    backgroundColor: "#d2d2d2",
                    color: "#000000",
                    font: {
                        fontSize: 13
                    },
                    height: "100%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "5%",
                    bindId: "label_volume"
                }
            };
            __alloyId1095.push(__alloyId1120);
            var __alloyId1122 = {
                type: "Ti.UI.Label",
                bindId: "label_parcela",
                properties: {
                    backgroundColor: "#e1e1e1",
                    color: "#000000",
                    font: {
                        fontSize: 13
                    },
                    height: "100%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "11%",
                    bindId: "label_parcela"
                }
            };
            __alloyId1095.push(__alloyId1122);
            var __alloyId1124 = {
                type: "Ti.UI.Label",
                bindId: "label_desconto",
                properties: {
                    backgroundColor: "#d2d2d2",
                    color: "#000000",
                    font: {
                        fontSize: 13
                    },
                    height: "100%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "11%",
                    bindId: "label_desconto"
                }
            };
            __alloyId1095.push(__alloyId1124);
            var __alloyId1126 = {
                type: "Ti.UI.Label",
                bindId: "label_condicao",
                properties: {
                    backgroundColor: "#e1e1e1",
                    color: "#000000",
                    font: {
                        fontSize: 13
                    },
                    height: "100%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "11%",
                    bindId: "label_condicao"
                }
            };
            __alloyId1095.push(__alloyId1126);
            var __alloyId1128 = {
                type: "Ti.UI.Label",
                bindId: "label_credito",
                properties: {
                    backgroundColor: "#d2d2d2",
                    color: "#000000",
                    font: {
                        fontSize: 13
                    },
                    height: "100%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "12%",
                    bindId: "label_credito"
                }
            };
            __alloyId1095.push(__alloyId1128);
            return __alloyId1095;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId1092.push(__alloyId1094);
    var __alloyId1091 = {
        properties: {
            height: "40",
            width: "100%",
            name: "item_cliente"
        },
        childTemplates: __alloyId1092
    };
    __alloyId1089["item_cliente"] = __alloyId1091;
    $.__views.__alloyId1129 = Ti.UI.createListSection({
        id: "__alloyId1129"
    });
    var __alloyId1131 = [];
    __alloyId1131.push($.__views.__alloyId1129);
    $.__views.listaclientes = Ti.UI.createListView({
        top: "9%",
        width: "98%",
        height: "50%",
        sections: __alloyId1131,
        templates: __alloyId1089,
        id: "listaclientes",
        defaultItemTemplate: "cliente_lista"
    });
    $.__views.__alloyId1075.add($.__views.listaclientes);
    $.__views.__alloyId1132 = Ti.UI.createView({
        backgroundColor: "#20706d",
        height: "6%",
        top: "60%",
        width: "98%",
        id: "__alloyId1132"
    });
    $.__views.__alloyId1075.add($.__views.__alloyId1132);
    $.__views.total_geral = Ti.UI.createLabel({
        backgroundColor: "#20706d",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        right: "1%",
        width: "6%",
        text: "R$ 0,00",
        id: "total_geral"
    });
    $.__views.__alloyId1132.add($.__views.total_geral);
    $.__views.__alloyId1133 = Ti.UI.createLabel({
        backgroundColor: "#20706d",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        right: "8%",
        width: "6%",
        text: "Total Geral:",
        id: "__alloyId1133"
    });
    $.__views.__alloyId1132.add($.__views.__alloyId1133);
    $.__views.__alloyId1134 = Ti.UI.createLabel({
        backgroundColor: "#dbdbdb",
        color: "#333333",
        font: {
            fontSize: 17
        },
        left: "1%",
        top: "67%",
        text: "Observação",
        id: "__alloyId1134"
    });
    $.__views.__alloyId1075.add($.__views.__alloyId1134);
    $.__views.__alloyId1135 = Ti.UI.createTextField({
        backgroundColor: "#ffffff",
        height: "15%",
        top: "71%",
        width: "98%",
        id: "__alloyId1135"
    });
    $.__views.__alloyId1075.add($.__views.__alloyId1135);
    $.__views.__alloyId1136 = Ti.UI.createLabel({
        color: "#008280",
        left: "1%",
        top: "87%",
        text: "Formas de pagamento",
        id: "__alloyId1136"
    });
    $.__views.__alloyId1075.add($.__views.__alloyId1136);
    $.__views.__alloyId1137 = Ti.UI.createView({
        bottom: "1%",
        height: "8%",
        layout: "horizontal",
        width: "98%",
        id: "__alloyId1137"
    });
    $.__views.__alloyId1075.add($.__views.__alloyId1137);
    $.__views.boleto = Ti.UI.createImageView({
        height: "80%",
        image: "/images/seleciona.png",
        id: "boleto"
    });
    $.__views.__alloyId1137.add($.__views.boleto);
    selecionaBoleto ? $.__views.boleto.addEventListener("click", selecionaBoleto) : __defers["$.__views.boleto!click!selecionaBoleto"] = true;
    $.__views.__alloyId1138 = Ti.UI.createLabel({
        backgroundColor: "#dbdbdb",
        color: "#000000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "7%",
        left: 1,
        text: "Boleto",
        id: "__alloyId1138"
    });
    $.__views.__alloyId1137.add($.__views.__alloyId1138);
    selecionaBoleto ? $.__views.__alloyId1138.addEventListener("click", selecionaBoleto) : __defers["$.__views.__alloyId1138!click!selecionaBoleto"] = true;
    $.__views.cheque = Ti.UI.createImageView({
        height: "86%",
        image: "/images/seleciona.png",
        id: "cheque"
    });
    $.__views.__alloyId1137.add($.__views.cheque);
    selecionaCheque ? $.__views.cheque.addEventListener("click", selecionaCheque) : __defers["$.__views.cheque!click!selecionaCheque"] = true;
    $.__views.__alloyId1139 = Ti.UI.createLabel({
        backgroundColor: "#dbdbdb",
        color: "#000000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "7%",
        left: 1,
        text: "Cheque pré",
        id: "__alloyId1139"
    });
    $.__views.__alloyId1137.add($.__views.__alloyId1139);
    selecionaCheque ? $.__views.__alloyId1139.addEventListener("click", selecionaCheque) : __defers["$.__views.__alloyId1139!click!selecionaCheque"] = true;
    $.__views.deposito = Ti.UI.createImageView({
        height: "86%",
        image: "/images/seleciona.png",
        id: "deposito"
    });
    $.__views.__alloyId1137.add($.__views.deposito);
    selecionaDeposito ? $.__views.deposito.addEventListener("click", selecionaDeposito) : __defers["$.__views.deposito!click!selecionaDeposito"] = true;
    $.__views.__alloyId1140 = Ti.UI.createLabel({
        backgroundColor: "#dbdbdb",
        color: "#000000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "8%",
        left: 1,
        text: "Depósito",
        id: "__alloyId1140"
    });
    $.__views.__alloyId1137.add($.__views.__alloyId1140);
    selecionaDeposito ? $.__views.__alloyId1140.addEventListener("click", selecionaDeposito) : __defers["$.__views.__alloyId1140!click!selecionaDeposito"] = true;
    $.__views.combinar = Ti.UI.createImageView({
        height: "86%",
        image: "/images/seleciona.png",
        id: "combinar"
    });
    $.__views.__alloyId1137.add($.__views.combinar);
    selecionaCombinar ? $.__views.combinar.addEventListener("click", selecionaCombinar) : __defers["$.__views.combinar!click!selecionaCombinar"] = true;
    $.__views.__alloyId1141 = Ti.UI.createLabel({
        backgroundColor: "#dbdbdb",
        color: "#000000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "8%",
        left: 1,
        text: "À combinar",
        id: "__alloyId1141"
    });
    $.__views.__alloyId1137.add($.__views.__alloyId1141);
    selecionaCombinar ? $.__views.__alloyId1141.addEventListener("click", selecionaCombinar) : __defers["$.__views.__alloyId1141!click!selecionaCombinar"] = true;
    $.__views.__alloyId1142 = Ti.UI.createLabel({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        bottom: "1%",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        height: "6%",
        right: "1%",
        width: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "FINALIZAR PEDIDO",
        id: "__alloyId1142"
    });
    $.__views.__alloyId1075.add($.__views.__alloyId1142);
    finalizaPagamento ? $.__views.__alloyId1142.addEventListener("click", finalizaPagamento) : __defers["$.__views.__alloyId1142!click!finalizaPagamento"] = true;
    $.__views.__alloyId1143 = Ti.UI.createLabel({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        bottom: "1%",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        height: "6%",
        right: "12%",
        width: "20%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "FINALIZAR PEDIDO E ALTERAR MARCA",
        id: "__alloyId1143"
    });
    $.__views.__alloyId1075.add($.__views.__alloyId1143);
    $.__views.__alloyId1144 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        bottom: "1%",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "6%",
        right: "33%",
        width: "6%",
        title: "VOLTAR",
        id: "__alloyId1144"
    });
    $.__views.__alloyId1075.add($.__views.__alloyId1144);
    volta ? $.__views.__alloyId1144.addEventListener("click", volta) : __defers["$.__views.__alloyId1144!click!volta"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/clientes.js");
    Ti.include("/database/carrinho.js");
    Ti.include("/database/carrinho_pedido.js");
    Ti.include("/database/prazo_medio.js");
    Ti.include("/database/pedido.js");
    Ti.include("/database/datas.js");
    Ti.include("/database/representante.js");
    var base = 0;
    var bruto;
    var condicaoPrazoMedio = [];
    var data = [];
    var dataPrazoMedio = [];
    var descontoEspecial = [];
    var descontoPrazo = [];
    var descontoVolume = [];
    var formaPagamento = "";
    var valorInicial = [];
    var quantidade;
    var total_geral = 0;
    var sobrepedido = [];
    var lista_xd = Ti.App.Properties.getString("valor_desconto_ref");
    for (var i = 0; 7 > i; i++) sobrepedido[i] = 100;
    Ti.App.Properties.getList(SOBRE_PEDIDO) && (sobrepedido = Ti.App.Properties.getList(SOBRE_PEDIDO));
    var conjunto = Ti.App.Properties.getList(SELECTED_CLIENTS);
    for (var i = 0; i < conjunto.length; i++) {
        var cliente = consultaCliente(conjunto[i]);
        if (cliente.isValidRow()) {
            var cl_id = cliente.fieldByName("cl_id");
            var cl_cnpj = cliente.fieldByName("cl_cnpj");
            dataPrazoMedio[cl_id] = 1;
            quantidade = 0;
            bruto = 0;
            var pedido = consultaCarrinhoByPagamento(Ti.App.Properties.getString(SESSION_ID), conjunto[i]);
            while (pedido.isValidRow()) {
                var car_quantidade = pedido.fieldByName("car_quantidade");
                var car_preco_unitario = pedido.fieldByName("car_preco_unitario");
                var car_ipi = pedido.fieldByName("car_ipi");
                var produto = car_quantidade * car_preco_unitario;
                var ipi = produto * car_ipi / 100;
                quantidade += car_quantidade;
                bruto = bruto + produto + ipi;
                total_geral += bruto;
                pedido.next();
            }
            descontoEspecial[cl_id] = 0;
            descontoPrazo[cl_id] = 0;
            descontoVolume[cl_id] = 0;
            valorInicial[cl_id] = bruto;
            if (0 == base) {
                var porcentagem = 100;
                base++;
            } else {
                var porcentagem = sobrepedido[i];
            }
            if (lista_xd > 0) {
                bruto = lista_xd;
                lista_xd = 0;
            } else bruto = bruto;
            100 > porcentagem && (porcentagem = 0);
            data.push({
                cliente: cl_id,
                template: "item_cliente",
                label_porcentagem_botao: {
                    title: porcentagem + "%"
                },
                label_cnpj: {
                    text: cl_cnpj
                },
                label_peca: {
                    text: quantidade
                },
                label_bruto: {
                    text: formatCurrency(bruto)
                },
                label_dias_botao: {
                    title: "-"
                },
                label_prazo: {
                    text: "0%"
                },
                label_especial_botao: {
                    title: "0%"
                },
                label_volume: {
                    text: "0%"
                },
                label_parcela: {
                    text: "-"
                },
                label_desconto: {
                    text: "-"
                },
                label_condicao: {
                    text: "-"
                },
                label_credito: {
                    text: "-"
                }
            });
        }
        $.total_geral.text = formatCurrency(bruto);
    }
    $.listaclientes.sections[0].setItems(data);
    var aux_calc = Ti.App.Properties.getString("valor_desconto_ref");
    Ti.App.Properties.setString("valor_desconto_ref", 0);
    __defers["$.__views.boleto!click!selecionaBoleto"] && $.__views.boleto.addEventListener("click", selecionaBoleto);
    __defers["$.__views.__alloyId1138!click!selecionaBoleto"] && $.__views.__alloyId1138.addEventListener("click", selecionaBoleto);
    __defers["$.__views.cheque!click!selecionaCheque"] && $.__views.cheque.addEventListener("click", selecionaCheque);
    __defers["$.__views.__alloyId1139!click!selecionaCheque"] && $.__views.__alloyId1139.addEventListener("click", selecionaCheque);
    __defers["$.__views.deposito!click!selecionaDeposito"] && $.__views.deposito.addEventListener("click", selecionaDeposito);
    __defers["$.__views.__alloyId1140!click!selecionaDeposito"] && $.__views.__alloyId1140.addEventListener("click", selecionaDeposito);
    __defers["$.__views.combinar!click!selecionaCombinar"] && $.__views.combinar.addEventListener("click", selecionaCombinar);
    __defers["$.__views.__alloyId1141!click!selecionaCombinar"] && $.__views.__alloyId1141.addEventListener("click", selecionaCombinar);
    __defers["$.__views.__alloyId1142!click!finalizaPagamento"] && $.__views.__alloyId1142.addEventListener("click", finalizaPagamento);
    __defers["$.__views.__alloyId1144!click!volta"] && $.__views.__alloyId1144.addEventListener("click", volta);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;