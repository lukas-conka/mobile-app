function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function dadosConsulta() {
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
                    var car_desc_unit = pedido.fieldByName("car_desc_unit");
                    desconto_unit = parseFloat(car_desc_unit);
                    var produto = car_quantidade * car_preco_unitario;
                    produto -= car_desc_unit;
                    var ipi = produto * car_ipi / 100;
                    quantidade += car_quantidade;
                    bruto = bruto + produto + ipi;
                    total_geral = total_geral + produto + ipi;
                    pedido.next();
                }
                aux_total += bruto;
                valorInicial[cl_id] = bruto;
                descontoEspecial[cl_id] = 0;
                descontoPrazo[cl_id] = 0;
                descontoVolume[cl_id] = 0;
                if (0 == base) {
                    var porcentagem = 100;
                    base++;
                } else {
                    var porcentagem = sobrepedido[i];
                }
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
            $.total_geral.text = formatCurrency(total_geral);
        }
    }
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
        var totalFinal = parseFloat(Ti.App.Properties.getString("totalFinal"));
        var calculo1 = valorInicial[cliente] * descontoPrazo[cliente] / 100;
        var resultado1 = valorInicial[cliente] - calculo1;
        var calculo2 = resultado1 * descontoEspecial[cliente] / 100;
        var resultado2 = resultado1 - calculo2;
        valorInicial[cliente] / dataPrazoMedio[cliente];
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
        selecao.updateItemAt(comando.itemIndex, item);
        if (0 != calculo1) {
            if (0 == totalFinal) aux_total -= calculo1; else {
                aux_total = totalFinal;
                aux_total -= calculo1;
            }
            Ti.App.Properties.setString("totalFinal", aux_total);
        }
        if (0 != calculo2) {
            if (0 == totalFinal) aux_total -= calculo2; else {
                aux_total = totalFinal;
                aux_total -= calculo2;
            }
            Ti.App.Properties.setString("totalFinal", aux_total);
        }
        $.total_geral.text = formatCurrency(aux_total);
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
                    var car_desc_unit = carrinho[j][10];
                    var crp_id = ultimoCarrinhoPedido + q;
                    q++;
                    insertCarrinhoPedido(crp_id, Ti.App.Properties.getString(SESSION_ID), car_quantidade, car_preco_unitario, car_ipi, car_icms, save_date, 0, descontoPrazo[conjunto[i]], descontoEspecial[conjunto[i]], formaPagamento, ped_id, conjunto[i], fk_tamanhos, fk_produtos, fk_cores, Ti.App.Properties.getString(CURRENT_USER_ID), 2, car_desc_unit);
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
    $.__views.__alloyId1068 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#4e8789",
        top: "2%",
        title: "PAGAMENTO",
        id: "__alloyId1068"
    });
    $.__views.pagamento.add($.__views.__alloyId1068);
    $.__views.__alloyId1069 = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        right: "1%",
        top: "0.8%",
        id: "__alloyId1069"
    });
    $.__views.pagamento.add($.__views.__alloyId1069);
    $.__views.__alloyId1070 = Ti.UI.createView({
        backgroundColor: "#dbdbdb",
        bottom: "1%",
        height: "92%",
        width: "98%",
        id: "__alloyId1070"
    });
    $.__views.pagamento.add($.__views.__alloyId1070);
    $.__views.__alloyId1071 = Ti.UI.createView({
        height: "7%",
        top: "2%",
        width: "98%",
        id: "__alloyId1071"
    });
    $.__views.__alloyId1070.add($.__views.__alloyId1071);
    $.__views.__alloyId1072 = Ti.UI.createLabel({
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
        id: "__alloyId1072"
    });
    $.__views.__alloyId1071.add($.__views.__alloyId1072);
    $.__views.__alloyId1073 = Ti.UI.createLabel({
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
        id: "__alloyId1073"
    });
    $.__views.__alloyId1071.add($.__views.__alloyId1073);
    $.__views.__alloyId1074 = Ti.UI.createLabel({
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
        id: "__alloyId1074"
    });
    $.__views.__alloyId1071.add($.__views.__alloyId1074);
    $.__views.__alloyId1075 = Ti.UI.createLabel({
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
        id: "__alloyId1075"
    });
    $.__views.__alloyId1071.add($.__views.__alloyId1075);
    $.__views.__alloyId1076 = Ti.UI.createLabel({
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
        id: "__alloyId1076"
    });
    $.__views.__alloyId1071.add($.__views.__alloyId1076);
    $.__views.__alloyId1077 = Ti.UI.createLabel({
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
        id: "__alloyId1077"
    });
    $.__views.__alloyId1071.add($.__views.__alloyId1077);
    $.__views.__alloyId1078 = Ti.UI.createLabel({
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
        id: "__alloyId1078"
    });
    $.__views.__alloyId1071.add($.__views.__alloyId1078);
    $.__views.__alloyId1079 = Ti.UI.createLabel({
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
        id: "__alloyId1079"
    });
    $.__views.__alloyId1071.add($.__views.__alloyId1079);
    $.__views.__alloyId1080 = Ti.UI.createLabel({
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
        id: "__alloyId1080"
    });
    $.__views.__alloyId1071.add($.__views.__alloyId1080);
    $.__views.__alloyId1081 = Ti.UI.createLabel({
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
        id: "__alloyId1081"
    });
    $.__views.__alloyId1071.add($.__views.__alloyId1081);
    $.__views.__alloyId1082 = Ti.UI.createLabel({
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
        id: "__alloyId1082"
    });
    $.__views.__alloyId1071.add($.__views.__alloyId1082);
    $.__views.__alloyId1083 = Ti.UI.createLabel({
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
        id: "__alloyId1083"
    });
    $.__views.__alloyId1071.add($.__views.__alloyId1083);
    var __alloyId1084 = {};
    var __alloyId1087 = [];
    var __alloyId1089 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1090 = [];
            var __alloyId1092 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId1093 = [];
                    var __alloyId1095 = {
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
                    __alloyId1093.push(__alloyId1095);
                    return __alloyId1093;
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
            __alloyId1090.push(__alloyId1092);
            var __alloyId1097 = {
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
            __alloyId1090.push(__alloyId1097);
            var __alloyId1099 = {
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
            __alloyId1090.push(__alloyId1099);
            var __alloyId1101 = {
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
            __alloyId1090.push(__alloyId1101);
            var __alloyId1103 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId1104 = [];
                    var __alloyId1106 = {
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
                    __alloyId1104.push(__alloyId1106);
                    return __alloyId1104;
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
            __alloyId1090.push(__alloyId1103);
            var __alloyId1108 = {
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
            __alloyId1090.push(__alloyId1108);
            var __alloyId1110 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId1111 = [];
                    var __alloyId1113 = {
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
                    __alloyId1111.push(__alloyId1113);
                    return __alloyId1111;
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
            __alloyId1090.push(__alloyId1110);
            var __alloyId1115 = {
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
            __alloyId1090.push(__alloyId1115);
            var __alloyId1117 = {
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
            __alloyId1090.push(__alloyId1117);
            var __alloyId1119 = {
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
            __alloyId1090.push(__alloyId1119);
            var __alloyId1121 = {
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
            __alloyId1090.push(__alloyId1121);
            var __alloyId1123 = {
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
            __alloyId1090.push(__alloyId1123);
            return __alloyId1090;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId1087.push(__alloyId1089);
    var __alloyId1086 = {
        properties: {
            height: "40",
            width: "100%",
            name: "item_cliente"
        },
        childTemplates: __alloyId1087
    };
    __alloyId1084["item_cliente"] = __alloyId1086;
    $.__views.__alloyId1124 = Ti.UI.createListSection({
        id: "__alloyId1124"
    });
    var __alloyId1126 = [];
    __alloyId1126.push($.__views.__alloyId1124);
    $.__views.listaclientes = Ti.UI.createListView({
        top: "9%",
        width: "98%",
        height: "50%",
        sections: __alloyId1126,
        templates: __alloyId1084,
        id: "listaclientes",
        defaultItemTemplate: "cliente_lista"
    });
    $.__views.__alloyId1070.add($.__views.listaclientes);
    $.__views.__alloyId1127 = Ti.UI.createView({
        backgroundColor: "#20706d",
        height: "6%",
        top: "60%",
        width: "98%",
        id: "__alloyId1127"
    });
    $.__views.__alloyId1070.add($.__views.__alloyId1127);
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
    $.__views.__alloyId1127.add($.__views.total_geral);
    $.__views.__alloyId1128 = Ti.UI.createLabel({
        backgroundColor: "#20706d",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        right: "8%",
        width: "6%",
        text: "Total Geral:",
        id: "__alloyId1128"
    });
    $.__views.__alloyId1127.add($.__views.__alloyId1128);
    $.__views.__alloyId1129 = Ti.UI.createLabel({
        backgroundColor: "#dbdbdb",
        color: "#333333",
        font: {
            fontSize: 17
        },
        left: "1%",
        top: "67%",
        text: "Observação",
        id: "__alloyId1129"
    });
    $.__views.__alloyId1070.add($.__views.__alloyId1129);
    $.__views.__alloyId1130 = Ti.UI.createTextField({
        backgroundColor: "#ffffff",
        height: "15%",
        top: "71%",
        width: "98%",
        id: "__alloyId1130"
    });
    $.__views.__alloyId1070.add($.__views.__alloyId1130);
    $.__views.__alloyId1131 = Ti.UI.createLabel({
        color: "#008280",
        left: "1%",
        top: "87%",
        text: "Formas de pagamento",
        id: "__alloyId1131"
    });
    $.__views.__alloyId1070.add($.__views.__alloyId1131);
    $.__views.__alloyId1132 = Ti.UI.createView({
        bottom: "1%",
        height: "8%",
        layout: "horizontal",
        width: "98%",
        id: "__alloyId1132"
    });
    $.__views.__alloyId1070.add($.__views.__alloyId1132);
    $.__views.boleto = Ti.UI.createImageView({
        height: "80%",
        image: "/images/seleciona.png",
        id: "boleto"
    });
    $.__views.__alloyId1132.add($.__views.boleto);
    selecionaBoleto ? $.__views.boleto.addEventListener("click", selecionaBoleto) : __defers["$.__views.boleto!click!selecionaBoleto"] = true;
    $.__views.__alloyId1133 = Ti.UI.createLabel({
        backgroundColor: "#dbdbdb",
        color: "#000000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "7%",
        left: 1,
        text: "Boleto",
        id: "__alloyId1133"
    });
    $.__views.__alloyId1132.add($.__views.__alloyId1133);
    selecionaBoleto ? $.__views.__alloyId1133.addEventListener("click", selecionaBoleto) : __defers["$.__views.__alloyId1133!click!selecionaBoleto"] = true;
    $.__views.cheque = Ti.UI.createImageView({
        height: "86%",
        image: "/images/seleciona.png",
        id: "cheque"
    });
    $.__views.__alloyId1132.add($.__views.cheque);
    selecionaCheque ? $.__views.cheque.addEventListener("click", selecionaCheque) : __defers["$.__views.cheque!click!selecionaCheque"] = true;
    $.__views.__alloyId1134 = Ti.UI.createLabel({
        backgroundColor: "#dbdbdb",
        color: "#000000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "7%",
        left: 1,
        text: "Cheque pré",
        id: "__alloyId1134"
    });
    $.__views.__alloyId1132.add($.__views.__alloyId1134);
    selecionaCheque ? $.__views.__alloyId1134.addEventListener("click", selecionaCheque) : __defers["$.__views.__alloyId1134!click!selecionaCheque"] = true;
    $.__views.deposito = Ti.UI.createImageView({
        height: "86%",
        image: "/images/seleciona.png",
        id: "deposito"
    });
    $.__views.__alloyId1132.add($.__views.deposito);
    selecionaDeposito ? $.__views.deposito.addEventListener("click", selecionaDeposito) : __defers["$.__views.deposito!click!selecionaDeposito"] = true;
    $.__views.__alloyId1135 = Ti.UI.createLabel({
        backgroundColor: "#dbdbdb",
        color: "#000000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "8%",
        left: 1,
        text: "Depósito",
        id: "__alloyId1135"
    });
    $.__views.__alloyId1132.add($.__views.__alloyId1135);
    selecionaDeposito ? $.__views.__alloyId1135.addEventListener("click", selecionaDeposito) : __defers["$.__views.__alloyId1135!click!selecionaDeposito"] = true;
    $.__views.combinar = Ti.UI.createImageView({
        height: "86%",
        image: "/images/seleciona.png",
        id: "combinar"
    });
    $.__views.__alloyId1132.add($.__views.combinar);
    selecionaCombinar ? $.__views.combinar.addEventListener("click", selecionaCombinar) : __defers["$.__views.combinar!click!selecionaCombinar"] = true;
    $.__views.__alloyId1136 = Ti.UI.createLabel({
        backgroundColor: "#dbdbdb",
        color: "#000000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "8%",
        left: 1,
        text: "À combinar",
        id: "__alloyId1136"
    });
    $.__views.__alloyId1132.add($.__views.__alloyId1136);
    selecionaCombinar ? $.__views.__alloyId1136.addEventListener("click", selecionaCombinar) : __defers["$.__views.__alloyId1136!click!selecionaCombinar"] = true;
    $.__views.__alloyId1137 = Ti.UI.createLabel({
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
        id: "__alloyId1137"
    });
    $.__views.__alloyId1070.add($.__views.__alloyId1137);
    finalizaPagamento ? $.__views.__alloyId1137.addEventListener("click", finalizaPagamento) : __defers["$.__views.__alloyId1137!click!finalizaPagamento"] = true;
    $.__views.__alloyId1138 = Ti.UI.createLabel({
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
        id: "__alloyId1138"
    });
    $.__views.__alloyId1070.add($.__views.__alloyId1138);
    $.__views.__alloyId1139 = Ti.UI.createButton({
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
        id: "__alloyId1139"
    });
    $.__views.__alloyId1070.add($.__views.__alloyId1139);
    volta ? $.__views.__alloyId1139.addEventListener("click", volta) : __defers["$.__views.__alloyId1139!click!volta"] = true;
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
    var desconto_unit = 0;

    Ti.App.Properties.getString("valor_desconto_ref");
    if (Ti.App.Properties.getList(SOBRE_PEDIDO)) {
        sobrepedido = Ti.App.Properties.getList(SOBRE_PEDIDO);
        alert(sobrepedido);
    }

    var aux_total = 0;
    for (var i = 0; 7 > i; i++) sobrepedido[i] = 100;
    Ti.App.Properties.getList(SOBRE_PEDIDO) && (sobrepedido = Ti.App.Properties.getList(SOBRE_PEDIDO));

    var conjunto = Ti.App.Properties.getList(SELECTED_CLIENTS);
    dadosConsulta();
    $.listaclientes.sections[0].setItems(data);
    $.total_geral.text = formatCurrency(total_geral);
    Ti.App.Properties.setString("totalFinal", 0);
    Ti.App.Properties.setString("calc1", 0);
    Ti.App.Properties.setString("calc2", 0);
    __defers["$.__views.boleto!click!selecionaBoleto"] && $.__views.boleto.addEventListener("click", selecionaBoleto);
    __defers["$.__views.__alloyId1133!click!selecionaBoleto"] && $.__views.__alloyId1133.addEventListener("click", selecionaBoleto);
    __defers["$.__views.cheque!click!selecionaCheque"] && $.__views.cheque.addEventListener("click", selecionaCheque);
    __defers["$.__views.__alloyId1134!click!selecionaCheque"] && $.__views.__alloyId1134.addEventListener("click", selecionaCheque);
    __defers["$.__views.deposito!click!selecionaDeposito"] && $.__views.deposito.addEventListener("click", selecionaDeposito);
    __defers["$.__views.__alloyId1135!click!selecionaDeposito"] && $.__views.__alloyId1135.addEventListener("click", selecionaDeposito);
    __defers["$.__views.combinar!click!selecionaCombinar"] && $.__views.combinar.addEventListener("click", selecionaCombinar);
    __defers["$.__views.__alloyId1136!click!selecionaCombinar"] && $.__views.__alloyId1136.addEventListener("click", selecionaCombinar);
    __defers["$.__views.__alloyId1137!click!finalizaPagamento"] && $.__views.__alloyId1137.addEventListener("click", finalizaPagamento);
    __defers["$.__views.__alloyId1139!click!volta"] && $.__views.__alloyId1139.addEventListener("click", volta);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
