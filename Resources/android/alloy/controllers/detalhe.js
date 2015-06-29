function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function renderCarrinho() {
        var data = [];
        var count = 0;
        var carrinho = consultaCarrinhoPedidoByPedido(pedido);
        if (carrinho.isValidRow()) {
            var razao = carrinho.fieldByName("cl_razao");
            var cnpj = carrinho.fieldByName("cl_cnpj");
            var forma_pgto = carrinho.fieldByName("crp_forma_pagamento");
            var data_pag = carrinho.fieldByName("ped_data_pag");
            var entrega_prazo = carrinho.fieldByName("ped_entrega_prazo");
            var entrega = carrinho.fieldByName("ped_entrega");
            var rua = carrinho.fieldByName("cl_end_unid");
            var numero = carrinho.fieldByName("cl_n_unid");
            var bairro = carrinho.fieldByName("cl_bairro_unid");
            var cidade = carrinho.fieldByName("cl_cidade_unid");
            var uf = carrinho.fieldByName("cl_uf_unid");
            var comp = carrinho.fieldByName("cl_comp_unid");
            var cep = carrinho.fieldByName("cl_cep_unid");
            var crp_data = carrinho.fieldByName("crp_data");
            var desconto = carrinho.fieldByName("desconto");
            var desconto_parcela = carrinho.fieldByName("desconto_parcela");
            var desconto_especial = carrinho.fieldByName("desconto_especial");
            var prazo_de_entrega = selectPrazo(entrega_prazo, entrega);
            var parcelas = 1;
            if (new RegExp("/").test(data_pag)) {
                var tmp = data_pag.split("/");
                parcelas = tmp.length;
            }
            var endereco = rua + "," + numero + "\n" + bairro + ", " + cidade + " - " + uf + "\nComp.:" + comp + " CEP: " + cep;
            $.label_razao.text = razao;
            $.label_cnpj.text = cnpj;
            $.label_forma_pgto.text = forma_pgto;
            $.label_parcelas.text = parcelas;
            $.label_prazo_medio.text = "imediato";
            $.label_prazo_entrega.text = prazo_de_entrega;
            $.label_representante.text = Ti.App.Properties.getString(CURRENT_USER_NAME);
            $.label_endereco.text = endereco;
        }
        var valor_total = 0;
        var valor_total_ipi = 0;
        var peso_total = 0;
        var cubagem_a_total = 0;
        var cubagem_l_total = 0;
        var cubagem_p_total = 0;
        var total = 0;
        var desconto = 0;
        while (carrinho.isValidRow()) {
            var template;
            var prd_id = carrinho.fieldByName("prd_id");
            var prd_referencia = carrinho.fieldByName("prd_referencia");
            var prd_nome_colecao = carrinho.fieldByName("prd_nome_colecao");
            var entrega_prazo = carrinho.fieldByName("ped_entrega_prazo");
            var entrega = carrinho.fieldByName("ped_entrega");
            var tmh_nome = carrinho.fieldByName("ped_entrega");
            var crp_preco_unitario = carrinho.fieldByName("crp_preco_unitario");
            var prd_peso = carrinho.fieldByName("ifp_peso");
            var prd_cub_a = carrinho.fieldByName("ifp_cub_a");
            var prd_cub_l = carrinho.fieldByName("ifp_cub_l");
            var prd_cub_p = carrinho.fieldByName("ifp_cub_p");
            var crp_quantidade = carrinho.fieldByName("crp_quantidade");
            var prd_ipi = carrinho.fieldByName("prd_ipi");
            var ped_numero = carrinho.fieldByName("ped_numero");
            var prazo_de_entrega = selectPrazo(entrega_prazo, entrega);
            var valor_produtos = crp_preco_unitario * crp_quantidade;
            var valor_ipi = valor_produtos * prd_ipi / 100;
            var valor_total_produto = valor_produtos + valor_ipi;
            peso_total += prd_peso;
            cubagem_a_total += prd_cub_a;
            cubagem_l_total += prd_cub_l;
            cubagem_p_total += prd_cub_p;
            valor_total += valor_produtos;
            valor_total_ipi += valor_ipi;
            if (0 == count) {
                template = "pedido_lista_escuro";
                count++;
            } else {
                count = 0;
                template = "pedido_lista_claro";
            }
            total += valor_total_produto;
            data.push({
                template: template,
                imagem_produto: {
                    image: getImagesFolder() + selectImagemPrincipal(prd_id)
                },
                label_ref: {
                    text: prd_referencia
                },
                label_colecao: {
                    text: prd_nome_colecao
                },
                label_prazo: {
                    text: prazo_de_entrega
                },
                label_tam: {
                    text: tmh_nome
                },
                label_preco: {
                    text: formatCurrency(crp_preco_unitario)
                },
                label_peso: {
                    text: prd_peso
                },
                label_cubagem: {
                    text: prd_cub_a + " x " + prd_cub_l + " x " + prd_cub_p
                },
                label_quantidade: {
                    text: crp_quantidade
                },
                label_precototal: {
                    text: formatCurrency(valor_produtos)
                },
                label_ipi: {
                    text: prd_ipi + "%\n" + formatCurrency(valor_ipi)
                },
                label_sustrib: {
                    text: "0,00%\n R$ 0,00"
                },
                label_valorfinal: {
                    text: formatCurrency(valor_total_produto)
                }
            });
            carrinho.next();
        }
        var valor_total_desconto = 0;
        valor_total = valor_total - valor_total_ipi - valor_total_desconto;
        var valor_parcelas = valor_total / parcelas;
        $.listapedidos.sections[0].setItems(data);
        $.label_ipi.text = formatCurrency(valor_total_ipi);
        $.label_valor_parcelas.text = formatCurrency(valor_parcelas);
        $.label_cubagem.text = cubagem_a_total * cubagem_l_total * cubagem_p_total + " m3";
        $.label_peso.text = peso_total + " Kg";
        $.numeroPedido.text = "NÚMERO DO PEDIDO: " + ped_numero;
        $.dataPedido.text = "DATA: " + crp_data;
        $.label_total.text = "TOTAL: " + formatCurrency(total);
        var descontoI = total * desconto / 100;
        var final = total - descontoI;
        var descontoII = final * desconto_parcela / 100;
        final -= descontoII;
        var descontoIII = final * desconto_especial / 100;
        desconto = descontoI + descontoII + descontoIII;
        final -= descontoIII;
        $.label_desconto.text = "DESCONTOS: " + formatCurrency(desconto);
        $.label_totalcomdesconto.text = "TOTAL COM DESCONTOS: " + formatCurrency(final);
    }
    function selectPrazo(periodo, entrega) {
        var result = "";
        var prazo = entrega.substring(0, 4) + "-" + entrega.substring(4, 6) + "-" + entrega.substring(6, 8);
        var data = new Date(prazo);
        var mes = data.getMonth() + 1;
        var primeiro = new Date();
        var ultimodia = new Date();
        entrega = "quinzenal";
        switch (entrega) {
          case "mensal":
            primeiro = new Date(data.getFullYear(), mes, 1);
            ultimodia = new Date(data.getFullYear(), mes, 0);
            result = mes + " mês\n" + primeiro.getDate() + " de " + getMonth(mes) + " a " + ultimodia.getDate() + " de " + getMonth(mes);
            break;

          case "semanal":
            primeiro = data.getDate() - data.getDay();
            ultimodia = primeiro + 6;
            result = getWeekOfYear(data) + " semana\n" + primeiro + " de " + getMonth(mes) + " a " + ultimodia + " de " + getMonth(mes);
            break;

          case "quinzenal":
            var quinzena = 0;
            if (data.getDate() <= 15) {
                quinzena = 2 * (mes + 1);
                primeiro = 1;
                ultimodia = 15;
            } else {
                quinzena = 2 * (mes + 1) + 1;
                primeiro = 16;
                var tmp = new Date(data.getFullYear(), mes, 0);
                ultimodia = tmp.getDate();
            }
            result = getWeekOfYear(data) + " semana\n" + primeiro + " de " + getMonth(mes) + " a " + ultimodia + " de " + getMonth(mes);
        }
        return result;
    }
    function voltar() {
        $.window.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "detalhe";
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
    $.__views.window = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        id: "window"
    });
    $.__views.window && $.addTopLevelView($.__views.window);
    $.__views.__alloyId344 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "99%",
        id: "__alloyId344"
    });
    $.__views.window.add($.__views.__alloyId344);
    $.__views.__alloyId345 = Ti.UI.createLabel({
        color: "#008382",
        font: {
            fontSize: 22
        },
        height: "50%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "0%",
        width: "98%",
        text: "Informações do pedido",
        id: "__alloyId345"
    });
    $.__views.__alloyId344.add($.__views.__alloyId345);
    $.__views.numeroPedido = Ti.UI.createLabel({
        color: "#333333",
        font: {
            fontSize: 15
        },
        height: "50%",
        left: "1%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        top: "50%",
        width: "48%",
        id: "numeroPedido"
    });
    $.__views.__alloyId344.add($.__views.numeroPedido);
    $.__views.dataPedido = Ti.UI.createLabel({
        color: "#333333",
        font: {
            fontSize: 15
        },
        height: "50%",
        right: "1%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        top: "50%",
        width: "48%",
        text: "00/00/0000 às 00:00",
        id: "dataPedido"
    });
    $.__views.__alloyId344.add($.__views.dataPedido);
    $.__views.__alloyId346 = Ti.UI.createView({
        height: "39%",
        top: "10%",
        layout: "horizontal",
        width: "100%",
        id: "__alloyId346"
    });
    $.__views.window.add($.__views.__alloyId346);
    $.__views.__alloyId347 = Ti.UI.createView({
        height: "100%",
        layout: "vertical",
        left: "1%",
        width: "32%",
        id: "__alloyId347"
    });
    $.__views.__alloyId346.add($.__views.__alloyId347);
    $.__views.__alloyId348 = Ti.UI.createLabel({
        backgroundColor: "#ececec",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "8%",
        top: "2%",
        width: "100%",
        text: "CNPJ",
        id: "__alloyId348"
    });
    $.__views.__alloyId347.add($.__views.__alloyId348);
    $.__views.label_cnpj = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#a6aaad",
        borderWidth: "1",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "10%",
        width: "100%",
        id: "label_cnpj"
    });
    $.__views.__alloyId347.add($.__views.label_cnpj);
    $.__views.__alloyId349 = Ti.UI.createLabel({
        backgroundColor: "#ececec",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "8%",
        top: "2%",
        width: "100%",
        text: "RAZÃO SOCIAL",
        id: "__alloyId349"
    });
    $.__views.__alloyId347.add($.__views.__alloyId349);
    $.__views.label_razao = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#a6aaad",
        borderWidth: "1",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "20%",
        width: "100%",
        id: "label_razao"
    });
    $.__views.__alloyId347.add($.__views.label_razao);
    $.__views.__alloyId350 = Ti.UI.createLabel({
        backgroundColor: "#ececec",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "8%",
        top: "2%",
        width: "100%",
        text: "ICMS SOMENTE PARA CRÉDITO",
        id: "__alloyId350"
    });
    $.__views.__alloyId347.add($.__views.__alloyId350);
    $.__views.label_icms = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#a6aaad",
        borderWidth: "1",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "10%",
        width: "100%",
        text: "R$ 0,00",
        id: "label_icms"
    });
    $.__views.__alloyId347.add($.__views.label_icms);
    $.__views.__alloyId351 = Ti.UI.createLabel({
        backgroundColor: "#ececec",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "8%",
        top: "2%",
        width: "100%",
        text: "IPI DESTACADO",
        id: "__alloyId351"
    });
    $.__views.__alloyId347.add($.__views.__alloyId351);
    $.__views.label_ipi = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#a6aaad",
        borderWidth: "1",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "10%",
        width: "100%",
        id: "label_ipi"
    });
    $.__views.__alloyId347.add($.__views.label_ipi);
    $.__views.__alloyId352 = Ti.UI.createView({
        height: "100%",
        layout: "vertical",
        left: "1%",
        width: "32%",
        id: "__alloyId352"
    });
    $.__views.__alloyId346.add($.__views.__alloyId352);
    $.__views.__alloyId353 = Ti.UI.createLabel({
        backgroundColor: "#ececec",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "8%",
        top: "2%",
        width: "100%",
        text: "FORMA DE PAGAMENTO",
        id: "__alloyId353"
    });
    $.__views.__alloyId352.add($.__views.__alloyId353);
    $.__views.label_forma_pgto = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#a6aaad",
        borderWidth: "1",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "10%",
        width: "100%",
        id: "label_forma_pgto"
    });
    $.__views.__alloyId352.add($.__views.label_forma_pgto);
    $.__views.__alloyId354 = Ti.UI.createLabel({
        backgroundColor: "#ececec",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "8%",
        top: "2%",
        width: "100%",
        text: "NÚMERO DE PARCELAS",
        id: "__alloyId354"
    });
    $.__views.__alloyId352.add($.__views.__alloyId354);
    $.__views.label_parcelas = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#a6aaad",
        borderWidth: "1",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "10%",
        width: "100%",
        id: "label_parcelas"
    });
    $.__views.__alloyId352.add($.__views.label_parcelas);
    $.__views.__alloyId355 = Ti.UI.createLabel({
        backgroundColor: "#ececec",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "8%",
        top: "2%",
        width: "100%",
        text: "VALOR DAS PARCELAS",
        id: "__alloyId355"
    });
    $.__views.__alloyId352.add($.__views.__alloyId355);
    $.__views.label_valor_parcelas = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#a6aaad",
        borderWidth: "1",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "10%",
        width: "100%",
        id: "label_valor_parcelas"
    });
    $.__views.__alloyId352.add($.__views.label_valor_parcelas);
    $.__views.__alloyId356 = Ti.UI.createLabel({
        backgroundColor: "#ececec",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "8%",
        top: "2%",
        width: "100%",
        text: "PRAZO MÉDIO",
        id: "__alloyId356"
    });
    $.__views.__alloyId352.add($.__views.__alloyId356);
    $.__views.label_prazo_medio = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#a6aaad",
        borderWidth: "1",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "10%",
        width: "100%",
        id: "label_prazo_medio"
    });
    $.__views.__alloyId352.add($.__views.label_prazo_medio);
    $.__views.__alloyId357 = Ti.UI.createLabel({
        backgroundColor: "#ececec",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "8%",
        top: "2%",
        width: "100%",
        text: "REPRESENTANTE",
        id: "__alloyId357"
    });
    $.__views.__alloyId352.add($.__views.__alloyId357);
    $.__views.label_representante = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#a6aaad",
        borderWidth: "1",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "10%",
        width: "100%",
        id: "label_representante"
    });
    $.__views.__alloyId352.add($.__views.label_representante);
    $.__views.__alloyId358 = Ti.UI.createView({
        height: "100%",
        layout: "vertical",
        left: "1%",
        width: "32%",
        id: "__alloyId358"
    });
    $.__views.__alloyId346.add($.__views.__alloyId358);
    $.__views.__alloyId359 = Ti.UI.createLabel({
        backgroundColor: "#ececec",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "8%",
        top: "2%",
        width: "100%",
        text: "PRAZO DE ENTREGA",
        id: "__alloyId359"
    });
    $.__views.__alloyId358.add($.__views.__alloyId359);
    $.__views.label_prazo_entrega = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#a6aaad",
        borderWidth: "1",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "20%",
        width: "100%",
        id: "label_prazo_entrega"
    });
    $.__views.__alloyId358.add($.__views.label_prazo_entrega);
    $.__views.__alloyId360 = Ti.UI.createLabel({
        backgroundColor: "#ececec",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "8%",
        top: "2%",
        width: "100%",
        text: "CUBAGEM",
        id: "__alloyId360"
    });
    $.__views.__alloyId358.add($.__views.__alloyId360);
    $.__views.label_cubagem = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#a6aaad",
        borderWidth: "1",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "10%",
        width: "100%",
        id: "label_cubagem"
    });
    $.__views.__alloyId358.add($.__views.label_cubagem);
    $.__views.__alloyId361 = Ti.UI.createLabel({
        backgroundColor: "#ececec",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "8%",
        top: "2%",
        width: "100%",
        text: "PESO",
        id: "__alloyId361"
    });
    $.__views.__alloyId358.add($.__views.__alloyId361);
    $.__views.label_peso = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#a6aaad",
        borderWidth: "1",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "10%",
        width: "100%",
        id: "label_peso"
    });
    $.__views.__alloyId358.add($.__views.label_peso);
    $.__views.__alloyId362 = Ti.UI.createLabel({
        backgroundColor: "#ececec",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "8%",
        top: "2%",
        width: "100%",
        text: "ENDEREÇO DE ENTREGA",
        id: "__alloyId362"
    });
    $.__views.__alloyId358.add($.__views.__alloyId362);
    $.__views.label_endereco = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#a6aaad",
        borderWidth: "1",
        color: "#000000",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "20%",
        width: "100%",
        id: "label_endereco"
    });
    $.__views.__alloyId358.add($.__views.label_endereco);
    $.__views.__alloyId363 = Ti.UI.createView({
        height: "36%",
        top: "50%",
        width: "99%",
        id: "__alloyId363"
    });
    $.__views.window.add($.__views.__alloyId363);
    $.__views.__alloyId364 = Ti.UI.createView({
        backgroundColor: "#008382",
        height: "12%",
        font: {
            fontSize: 15
        },
        top: "0%",
        color: "#008382",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId364"
    });
    $.__views.__alloyId363.add($.__views.__alloyId364);
    $.__views.__alloyId365 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "7%",
        text: "Produto",
        id: "__alloyId365"
    });
    $.__views.__alloyId364.add($.__views.__alloyId365);
    $.__views.__alloyId366 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId366"
    });
    $.__views.__alloyId364.add($.__views.__alloyId366);
    $.__views.__alloyId367 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "7%",
        text: "Marca / Ref.",
        id: "__alloyId367"
    });
    $.__views.__alloyId364.add($.__views.__alloyId367);
    $.__views.__alloyId368 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId368"
    });
    $.__views.__alloyId364.add($.__views.__alloyId368);
    $.__views.__alloyId369 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "5%",
        text: "Coleção",
        id: "__alloyId369"
    });
    $.__views.__alloyId364.add($.__views.__alloyId369);
    $.__views.__alloyId370 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId370"
    });
    $.__views.__alloyId364.add($.__views.__alloyId370);
    $.__views.__alloyId371 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "14%",
        text: "Prazo de entrega",
        id: "__alloyId371"
    });
    $.__views.__alloyId364.add($.__views.__alloyId371);
    $.__views.__alloyId372 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId372"
    });
    $.__views.__alloyId364.add($.__views.__alloyId372);
    $.__views.__alloyId373 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "4%",
        text: "Tam.",
        id: "__alloyId373"
    });
    $.__views.__alloyId364.add($.__views.__alloyId373);
    $.__views.__alloyId374 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId374"
    });
    $.__views.__alloyId364.add($.__views.__alloyId374);
    $.__views.__alloyId375 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "7%",
        text: "Preço Unitário",
        id: "__alloyId375"
    });
    $.__views.__alloyId364.add($.__views.__alloyId375);
    $.__views.__alloyId376 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId376"
    });
    $.__views.__alloyId364.add($.__views.__alloyId376);
    $.__views.__alloyId377 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "4%",
        text: "Peso",
        id: "__alloyId377"
    });
    $.__views.__alloyId364.add($.__views.__alloyId377);
    $.__views.__alloyId378 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId378"
    });
    $.__views.__alloyId364.add($.__views.__alloyId378);
    $.__views.__alloyId379 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "13%",
        text: "Cubagem (A x L x P)",
        id: "__alloyId379"
    });
    $.__views.__alloyId364.add($.__views.__alloyId379);
    $.__views.__alloyId380 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId380"
    });
    $.__views.__alloyId364.add($.__views.__alloyId380);
    $.__views.__alloyId381 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "6%",
        text: "Quantidade",
        id: "__alloyId381"
    });
    $.__views.__alloyId364.add($.__views.__alloyId381);
    $.__views.__alloyId382 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId382"
    });
    $.__views.__alloyId364.add($.__views.__alloyId382);
    $.__views.__alloyId383 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "7%",
        text: "Preço total",
        id: "__alloyId383"
    });
    $.__views.__alloyId364.add($.__views.__alloyId383);
    $.__views.__alloyId384 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId384"
    });
    $.__views.__alloyId364.add($.__views.__alloyId384);
    $.__views.__alloyId385 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "7%",
        text: "IPI",
        id: "__alloyId385"
    });
    $.__views.__alloyId364.add($.__views.__alloyId385);
    $.__views.__alloyId386 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId386"
    });
    $.__views.__alloyId364.add($.__views.__alloyId386);
    $.__views.__alloyId387 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "6%",
        text: "Sus. Trib.",
        id: "__alloyId387"
    });
    $.__views.__alloyId364.add($.__views.__alloyId387);
    $.__views.__alloyId388 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId388"
    });
    $.__views.__alloyId364.add($.__views.__alloyId388);
    $.__views.__alloyId389 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "11%",
        text: "Valor final do produto",
        id: "__alloyId389"
    });
    $.__views.__alloyId364.add($.__views.__alloyId389);
    var __alloyId390 = {};
    var __alloyId393 = [];
    var __alloyId395 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId396 = [];
            var __alloyId398 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId399 = [];
                    var __alloyId401 = {
                        type: "Ti.UI.ImageView",
                        bindId: "imagem_produto",
                        properties: {
                            height: "95%",
                            bindId: "imagem_produto"
                        }
                    };
                    __alloyId399.push(__alloyId401);
                    return __alloyId399;
                }(),
                properties: {
                    width: "7%"
                }
            };
            __alloyId396.push(__alloyId398);
            var __alloyId403 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId396.push(__alloyId403);
            var __alloyId405 = {
                type: "Ti.UI.Label",
                bindId: "label_ref",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    font: {
                        fontSize: 13
                    },
                    color: "black",
                    bindId: "label_ref"
                }
            };
            __alloyId396.push(__alloyId405);
            var __alloyId407 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId396.push(__alloyId407);
            var __alloyId409 = {
                type: "Ti.UI.Label",
                bindId: "label_colecao",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "5%",
                    font: {
                        fontSize: 13
                    },
                    color: "black",
                    bindId: "label_colecao"
                }
            };
            __alloyId396.push(__alloyId409);
            var __alloyId411 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId396.push(__alloyId411);
            var __alloyId413 = {
                type: "Ti.UI.Label",
                bindId: "label_prazo",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "14%",
                    font: {
                        fontSize: 13
                    },
                    color: "black",
                    bindId: "label_prazo"
                }
            };
            __alloyId396.push(__alloyId413);
            var __alloyId415 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId396.push(__alloyId415);
            var __alloyId417 = {
                type: "Ti.UI.Label",
                bindId: "label_tam",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "4%",
                    font: {
                        fontSize: 13
                    },
                    color: "black",
                    bindId: "label_tam"
                }
            };
            __alloyId396.push(__alloyId417);
            var __alloyId419 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId396.push(__alloyId419);
            var __alloyId421 = {
                type: "Ti.UI.Label",
                bindId: "label_preco",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    font: {
                        fontSize: 13
                    },
                    color: "black",
                    bindId: "label_preco"
                }
            };
            __alloyId396.push(__alloyId421);
            var __alloyId423 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId396.push(__alloyId423);
            var __alloyId425 = {
                type: "Ti.UI.Label",
                bindId: "label_peso",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "4%",
                    font: {
                        fontSize: 13
                    },
                    color: "black",
                    bindId: "label_peso"
                }
            };
            __alloyId396.push(__alloyId425);
            var __alloyId427 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId396.push(__alloyId427);
            var __alloyId429 = {
                type: "Ti.UI.Label",
                bindId: "label_cubagem",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "13%",
                    font: {
                        fontSize: 13
                    },
                    color: "black",
                    bindId: "label_cubagem"
                }
            };
            __alloyId396.push(__alloyId429);
            var __alloyId431 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId396.push(__alloyId431);
            var __alloyId433 = {
                type: "Ti.UI.Label",
                bindId: "label_quantidade",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "6%",
                    color: "black",
                    font: {
                        fontSize: 13
                    },
                    bindId: "label_quantidade"
                }
            };
            __alloyId396.push(__alloyId433);
            var __alloyId435 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId396.push(__alloyId435);
            var __alloyId437 = {
                type: "Ti.UI.Label",
                bindId: "label_precototal",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    color: "black",
                    bindId: "label_precototal"
                }
            };
            __alloyId396.push(__alloyId437);
            var __alloyId439 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId396.push(__alloyId439);
            var __alloyId441 = {
                type: "Ti.UI.Label",
                bindId: "label_ipi",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    color: "black",
                    bindId: "label_ipi"
                }
            };
            __alloyId396.push(__alloyId441);
            var __alloyId443 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId396.push(__alloyId443);
            var __alloyId445 = {
                type: "Ti.UI.Label",
                bindId: "label_sustrib",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "6%",
                    color: "black",
                    bindId: "label_sustrib"
                }
            };
            __alloyId396.push(__alloyId445);
            var __alloyId447 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId396.push(__alloyId447);
            var __alloyId449 = {
                type: "Ti.UI.Label",
                bindId: "label_valorfinal",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "12%",
                    color: "black",
                    bindId: "label_valorfinal"
                }
            };
            __alloyId396.push(__alloyId449);
            return __alloyId396;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId393.push(__alloyId395);
    var __alloyId392 = {
        properties: {
            width: "100%",
            backgroundColor: "#EBEBEB",
            height: 100,
            name: "pedido_lista_escuro"
        },
        childTemplates: __alloyId393
    };
    __alloyId390["pedido_lista_escuro"] = __alloyId392;
    var __alloyId452 = [];
    var __alloyId454 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId455 = [];
            var __alloyId457 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId458 = [];
                    var __alloyId460 = {
                        type: "Ti.UI.ImageView",
                        bindId: "imagem_produto",
                        properties: {
                            height: "95%",
                            bindId: "imagem_produto"
                        }
                    };
                    __alloyId458.push(__alloyId460);
                    return __alloyId458;
                }(),
                properties: {
                    width: "7%"
                }
            };
            __alloyId455.push(__alloyId457);
            var __alloyId462 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId455.push(__alloyId462);
            var __alloyId464 = {
                type: "Ti.UI.Label",
                bindId: "label_ref",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    font: {
                        fontSize: 13
                    },
                    color: "black",
                    bindId: "label_ref"
                }
            };
            __alloyId455.push(__alloyId464);
            var __alloyId466 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId455.push(__alloyId466);
            var __alloyId468 = {
                type: "Ti.UI.Label",
                bindId: "label_colecao",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "5%",
                    font: {
                        fontSize: 13
                    },
                    color: "black",
                    bindId: "label_colecao"
                }
            };
            __alloyId455.push(__alloyId468);
            var __alloyId470 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId455.push(__alloyId470);
            var __alloyId472 = {
                type: "Ti.UI.Label",
                bindId: "label_prazo",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "14%",
                    font: {
                        fontSize: 13
                    },
                    color: "black",
                    bindId: "label_prazo"
                }
            };
            __alloyId455.push(__alloyId472);
            var __alloyId474 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId455.push(__alloyId474);
            var __alloyId476 = {
                type: "Ti.UI.Label",
                bindId: "label_tam",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "4%",
                    font: {
                        fontSize: 13
                    },
                    color: "black",
                    bindId: "label_tam"
                }
            };
            __alloyId455.push(__alloyId476);
            var __alloyId478 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId455.push(__alloyId478);
            var __alloyId480 = {
                type: "Ti.UI.Label",
                bindId: "label_preco",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    font: {
                        fontSize: 13
                    },
                    color: "black",
                    bindId: "label_preco"
                }
            };
            __alloyId455.push(__alloyId480);
            var __alloyId482 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId455.push(__alloyId482);
            var __alloyId484 = {
                type: "Ti.UI.Label",
                bindId: "label_peso",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "4%",
                    font: {
                        fontSize: 13
                    },
                    color: "black",
                    bindId: "label_peso"
                }
            };
            __alloyId455.push(__alloyId484);
            var __alloyId486 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId455.push(__alloyId486);
            var __alloyId488 = {
                type: "Ti.UI.Label",
                bindId: "label_cubagem",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "13%",
                    font: {
                        fontSize: 13
                    },
                    color: "black",
                    bindId: "label_cubagem"
                }
            };
            __alloyId455.push(__alloyId488);
            var __alloyId490 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId455.push(__alloyId490);
            var __alloyId492 = {
                type: "Ti.UI.Label",
                bindId: "label_quantidade",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "6%",
                    color: "black",
                    font: {
                        fontSize: 13
                    },
                    bindId: "label_quantidade"
                }
            };
            __alloyId455.push(__alloyId492);
            var __alloyId494 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId455.push(__alloyId494);
            var __alloyId496 = {
                type: "Ti.UI.Label",
                bindId: "label_precototal",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    color: "black",
                    bindId: "label_precototal"
                }
            };
            __alloyId455.push(__alloyId496);
            var __alloyId498 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId455.push(__alloyId498);
            var __alloyId500 = {
                type: "Ti.UI.Label",
                bindId: "label_ipi",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    color: "black",
                    bindId: "label_ipi"
                }
            };
            __alloyId455.push(__alloyId500);
            var __alloyId502 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId455.push(__alloyId502);
            var __alloyId504 = {
                type: "Ti.UI.Label",
                bindId: "label_sustrib",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "6%",
                    color: "black",
                    bindId: "label_sustrib"
                }
            };
            __alloyId455.push(__alloyId504);
            var __alloyId506 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId455.push(__alloyId506);
            var __alloyId508 = {
                type: "Ti.UI.Label",
                bindId: "label_valorfinal",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "12%",
                    color: "black",
                    bindId: "label_valorfinal"
                }
            };
            __alloyId455.push(__alloyId508);
            return __alloyId455;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId452.push(__alloyId454);
    var __alloyId451 = {
        properties: {
            width: "100%",
            backgroundColor: "#FBFBFB",
            height: 100,
            name: "pedido_lista_claro"
        },
        childTemplates: __alloyId452
    };
    __alloyId390["pedido_lista_claro"] = __alloyId451;
    $.__views.__alloyId509 = Ti.UI.createListSection({
        id: "__alloyId509"
    });
    var __alloyId511 = [];
    __alloyId511.push($.__views.__alloyId509);
    $.__views.listapedidos = Ti.UI.createListView({
        width: "100%",
        top: "10%",
        sections: __alloyId511,
        templates: __alloyId390,
        id: "listapedidos",
        defaultItemTemplate: "pedido_lista"
    });
    $.__views.__alloyId363.add($.__views.listapedidos);
    $.__views.__alloyId512 = Ti.UI.createView({
        backgroundColor: "#008382",
        height: "4%",
        top: "86%",
        width: "99%",
        layout: "horizontal",
        id: "__alloyId512"
    });
    $.__views.window.add($.__views.__alloyId512);
    $.__views.label_total = Ti.UI.createLabel({
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "33%",
        id: "label_total"
    });
    $.__views.__alloyId512.add($.__views.label_total);
    $.__views.__alloyId513 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId513"
    });
    $.__views.__alloyId512.add($.__views.__alloyId513);
    $.__views.label_desconto = Ti.UI.createLabel({
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "33%",
        id: "label_desconto"
    });
    $.__views.__alloyId512.add($.__views.label_desconto);
    $.__views.__alloyId514 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId514"
    });
    $.__views.__alloyId512.add($.__views.__alloyId514);
    $.__views.label_totalcomdesconto = Ti.UI.createLabel({
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "33%",
        id: "label_totalcomdesconto"
    });
    $.__views.__alloyId512.add($.__views.label_totalcomdesconto);
    $.__views.__alloyId515 = Ti.UI.createView({
        backgroundColor: "#59595b",
        bottom: "1%",
        height: "7%",
        width: "99%",
        id: "__alloyId515"
    });
    $.__views.window.add($.__views.__alloyId515);
    $.__views.__alloyId516 = Ti.UI.createView({
        id: "__alloyId516"
    });
    $.__views.__alloyId515.add($.__views.__alloyId516);
    $.__views.__alloyId517 = Ti.UI.createButton({
        title: "Voltar",
        id: "__alloyId517"
    });
    $.__views.__alloyId516.add($.__views.__alloyId517);
    voltar ? $.__views.__alloyId517.addEventListener("click", voltar) : __defers["$.__views.__alloyId517!click!voltar"] = true;
    $.__views.__alloyId518 = Ti.UI.createView({
        height: "auto",
        width: "auto",
        backgroundColor: "white",
        layout: "horizontal",
        id: "__alloyId518"
    });
    $.__views.__alloyId515.add($.__views.__alloyId518);
    $.__views.__alloyId519 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        height: "80%",
        right: "14%",
        width: "14%",
        title: "Voltar Pedidos",
        id: "__alloyId519"
    });
    $.__views.__alloyId515.add($.__views.__alloyId519);
    voltar ? $.__views.__alloyId519.addEventListener("click", voltar) : __defers["$.__views.__alloyId519!click!voltar"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/carrinho.js");
    Ti.include("/database/carrinho_pedido.js");
    Ti.include("/database/imagens_produtos.js");
    Ti.include("/database/pedido.js");
    var args = arguments[0] || {};
    var pedido = args.ped_id || 0;
    renderCarrinho();
    __defers["$.__views.__alloyId517!click!voltar"] && $.__views.__alloyId517.addEventListener("click", voltar);
    __defers["$.__views.__alloyId519!click!voltar"] && $.__views.__alloyId519.addEventListener("click", voltar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;