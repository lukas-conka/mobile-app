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
        $.paginacao.title = current_page + " / " + paginas;
        var data = [];
        var count = 0;
        var carrinho = consultaCarrinhoPedidoByPedido(pedidos[current_page - 1]);
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
        var carrinho = consultaCarrinhoPedidoByPedido(pedidos[current_page - 1]);
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
            Ti.API.info("prd_id=" + prd_id);
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
                    text: formatCurrency(valor_produtos)
                }
            });
            carrinho.next();
        }
        var valor_total_desconto = 0;
        valor_total = valor_total - valor_total_ipi - valor_total_desconto;
        var valor_parcelas = valor_total / parcelas;
        Ti.API.info("valor_parcelas=" + valor_parcelas);
        $.listapedidos.sections[0].setItems(data);
        $.label_ipi.text = formatCurrency(valor_total_ipi);
        var calculo_cubagem = cubagem_a_total * cubagem_l_total * cubagem_p_total;
        $.label_cubagem.text = calculo_cubagem.toFixed(2) + " m3";
        $.label_peso.text = peso_total + " Kg";
        $.numeroPedido.text = "NÚMERO DO PEDIDO: " + Ti.App.Properties.getString(CURRENT_USER_ID) + "1" + pedidos[current_page - 1];
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
        $.label_valor_parcelas.text = formatCurrency(final / parcelas);
        $.label_totalcomdesconto.text = "TOTAL COM DESCONTOS: " + formatCurrency(final);
    }
    function anterior() {
        current_page--;
        0 >= current_page && (current_page = paginas);
        renderCarrinho();
    }
    function proximo() {
        current_page++;
        current_page > paginas && (current_page = 1);
        renderCarrinho();
    }
    function primeiro() {
        current_page = 1;
        renderCarrinho();
    }
    function ultimo() {
        current_page = paginas;
        renderCarrinho();
    }
    function voltar() {
        resetSession();
        goTo("seleciona_cliente");
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
        goTo("seleciona_cliente");
    }
    function totalizacoes() {
        goTo("totalizacoes");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "finalizacao";
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
    $.__views.finalizacao = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        id: "finalizacao"
    });
    $.__views.finalizacao && $.addTopLevelView($.__views.finalizacao);
    $.__views.__alloyId568 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "99%",
        id: "__alloyId568"
    });
    $.__views.finalizacao.add($.__views.__alloyId568);
    $.__views.__alloyId569 = Ti.UI.createLabel({
        color: "#008382",
        font: {
            fontSize: 22
        },
        height: "50%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "0%",
        width: "98%",
        text: "Informações do pedido",
        id: "__alloyId569"
    });
    $.__views.__alloyId568.add($.__views.__alloyId569);
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
    $.__views.__alloyId568.add($.__views.numeroPedido);
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
    $.__views.__alloyId568.add($.__views.dataPedido);
    $.__views.__alloyId570 = Ti.UI.createView({
        height: "39%",
        top: "10%",
        layout: "horizontal",
        width: "100%",
        id: "__alloyId570"
    });
    $.__views.finalizacao.add($.__views.__alloyId570);
    $.__views.__alloyId571 = Ti.UI.createView({
        height: "100%",
        layout: "vertical",
        left: "1%",
        width: "32%",
        id: "__alloyId571"
    });
    $.__views.__alloyId570.add($.__views.__alloyId571);
    $.__views.__alloyId572 = Ti.UI.createLabel({
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
        id: "__alloyId572"
    });
    $.__views.__alloyId571.add($.__views.__alloyId572);
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
    $.__views.__alloyId571.add($.__views.label_cnpj);
    $.__views.__alloyId573 = Ti.UI.createLabel({
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
        id: "__alloyId573"
    });
    $.__views.__alloyId571.add($.__views.__alloyId573);
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
    $.__views.__alloyId571.add($.__views.label_razao);
    $.__views.__alloyId574 = Ti.UI.createLabel({
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
        id: "__alloyId574"
    });
    $.__views.__alloyId571.add($.__views.__alloyId574);
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
    $.__views.__alloyId571.add($.__views.label_icms);
    $.__views.__alloyId575 = Ti.UI.createLabel({
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
        id: "__alloyId575"
    });
    $.__views.__alloyId571.add($.__views.__alloyId575);
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
    $.__views.__alloyId571.add($.__views.label_ipi);
    $.__views.__alloyId576 = Ti.UI.createView({
        height: "100%",
        layout: "vertical",
        left: "1%",
        width: "32%",
        id: "__alloyId576"
    });
    $.__views.__alloyId570.add($.__views.__alloyId576);
    $.__views.__alloyId577 = Ti.UI.createLabel({
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
        id: "__alloyId577"
    });
    $.__views.__alloyId576.add($.__views.__alloyId577);
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
    $.__views.__alloyId576.add($.__views.label_forma_pgto);
    $.__views.__alloyId578 = Ti.UI.createLabel({
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
        id: "__alloyId578"
    });
    $.__views.__alloyId576.add($.__views.__alloyId578);
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
    $.__views.__alloyId576.add($.__views.label_parcelas);
    $.__views.__alloyId579 = Ti.UI.createLabel({
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
        id: "__alloyId579"
    });
    $.__views.__alloyId576.add($.__views.__alloyId579);
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
    $.__views.__alloyId576.add($.__views.label_valor_parcelas);
    $.__views.__alloyId580 = Ti.UI.createLabel({
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
        id: "__alloyId580"
    });
    $.__views.__alloyId576.add($.__views.__alloyId580);
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
    $.__views.__alloyId576.add($.__views.label_prazo_medio);
    $.__views.__alloyId581 = Ti.UI.createLabel({
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
        id: "__alloyId581"
    });
    $.__views.__alloyId576.add($.__views.__alloyId581);
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
    $.__views.__alloyId576.add($.__views.label_representante);
    $.__views.__alloyId582 = Ti.UI.createView({
        height: "100%",
        layout: "vertical",
        left: "1%",
        width: "32%",
        id: "__alloyId582"
    });
    $.__views.__alloyId570.add($.__views.__alloyId582);
    $.__views.__alloyId583 = Ti.UI.createLabel({
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
        id: "__alloyId583"
    });
    $.__views.__alloyId582.add($.__views.__alloyId583);
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
    $.__views.__alloyId582.add($.__views.label_prazo_entrega);
    $.__views.__alloyId584 = Ti.UI.createLabel({
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
        id: "__alloyId584"
    });
    $.__views.__alloyId582.add($.__views.__alloyId584);
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
    $.__views.__alloyId582.add($.__views.label_cubagem);
    $.__views.__alloyId585 = Ti.UI.createLabel({
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
        id: "__alloyId585"
    });
    $.__views.__alloyId582.add($.__views.__alloyId585);
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
    $.__views.__alloyId582.add($.__views.label_peso);
    $.__views.__alloyId586 = Ti.UI.createLabel({
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
        id: "__alloyId586"
    });
    $.__views.__alloyId582.add($.__views.__alloyId586);
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
    $.__views.__alloyId582.add($.__views.label_endereco);
    $.__views.__alloyId587 = Ti.UI.createView({
        height: "36%",
        top: "50%",
        width: "99%",
        id: "__alloyId587"
    });
    $.__views.finalizacao.add($.__views.__alloyId587);
    $.__views.__alloyId588 = Ti.UI.createView({
        backgroundColor: "#008382",
        height: "12%",
        font: {
            fontSize: 15
        },
        top: "0%",
        color: "#008382",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId588"
    });
    $.__views.__alloyId587.add($.__views.__alloyId588);
    $.__views.__alloyId589 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "7%",
        text: "Produto",
        id: "__alloyId589"
    });
    $.__views.__alloyId588.add($.__views.__alloyId589);
    $.__views.__alloyId590 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId590"
    });
    $.__views.__alloyId588.add($.__views.__alloyId590);
    $.__views.__alloyId591 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "7%",
        text: "Marca / Ref.",
        id: "__alloyId591"
    });
    $.__views.__alloyId588.add($.__views.__alloyId591);
    $.__views.__alloyId592 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId592"
    });
    $.__views.__alloyId588.add($.__views.__alloyId592);
    $.__views.__alloyId593 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "5%",
        text: "Coleção",
        id: "__alloyId593"
    });
    $.__views.__alloyId588.add($.__views.__alloyId593);
    $.__views.__alloyId594 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId594"
    });
    $.__views.__alloyId588.add($.__views.__alloyId594);
    $.__views.__alloyId595 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "14%",
        text: "Prazo de entrega",
        id: "__alloyId595"
    });
    $.__views.__alloyId588.add($.__views.__alloyId595);
    $.__views.__alloyId596 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId596"
    });
    $.__views.__alloyId588.add($.__views.__alloyId596);
    $.__views.__alloyId597 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "4%",
        text: "Tam.",
        id: "__alloyId597"
    });
    $.__views.__alloyId588.add($.__views.__alloyId597);
    $.__views.__alloyId598 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId598"
    });
    $.__views.__alloyId588.add($.__views.__alloyId598);
    $.__views.__alloyId599 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "7%",
        text: "Preço Unitário",
        id: "__alloyId599"
    });
    $.__views.__alloyId588.add($.__views.__alloyId599);
    $.__views.__alloyId600 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId600"
    });
    $.__views.__alloyId588.add($.__views.__alloyId600);
    $.__views.__alloyId601 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "4%",
        text: "Peso",
        id: "__alloyId601"
    });
    $.__views.__alloyId588.add($.__views.__alloyId601);
    $.__views.__alloyId602 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId602"
    });
    $.__views.__alloyId588.add($.__views.__alloyId602);
    $.__views.__alloyId603 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "13%",
        text: "Cubagem (A x L x P)",
        id: "__alloyId603"
    });
    $.__views.__alloyId588.add($.__views.__alloyId603);
    $.__views.__alloyId604 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId604"
    });
    $.__views.__alloyId588.add($.__views.__alloyId604);
    $.__views.__alloyId605 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "6%",
        text: "Quantidade",
        id: "__alloyId605"
    });
    $.__views.__alloyId588.add($.__views.__alloyId605);
    $.__views.__alloyId606 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId606"
    });
    $.__views.__alloyId588.add($.__views.__alloyId606);
    $.__views.__alloyId607 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "7%",
        text: "Preço total",
        id: "__alloyId607"
    });
    $.__views.__alloyId588.add($.__views.__alloyId607);
    $.__views.__alloyId608 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId608"
    });
    $.__views.__alloyId588.add($.__views.__alloyId608);
    $.__views.__alloyId609 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "7%",
        text: "IPI",
        id: "__alloyId609"
    });
    $.__views.__alloyId588.add($.__views.__alloyId609);
    $.__views.__alloyId610 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId610"
    });
    $.__views.__alloyId588.add($.__views.__alloyId610);
    $.__views.__alloyId611 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "6%",
        text: "S.T",
        id: "__alloyId611"
    });
    $.__views.__alloyId588.add($.__views.__alloyId611);
    $.__views.__alloyId612 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId612"
    });
    $.__views.__alloyId588.add($.__views.__alloyId612);
    $.__views.__alloyId613 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "8%",
        text: "Valor do Produto",
        id: "__alloyId613"
    });
    $.__views.__alloyId588.add($.__views.__alloyId613);
    var __alloyId614 = {};
    var __alloyId617 = [];
    var __alloyId619 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId620 = [];
            var __alloyId622 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId623 = [];
                    var __alloyId625 = {
                        type: "Ti.UI.ImageView",
                        bindId: "imagem_produto",
                        properties: {
                            height: "95%",
                            bindId: "imagem_produto"
                        }
                    };
                    __alloyId623.push(__alloyId625);
                    return __alloyId623;
                }(),
                properties: {
                    width: "7%"
                }
            };
            __alloyId620.push(__alloyId622);
            var __alloyId627 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId620.push(__alloyId627);
            var __alloyId629 = {
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
            __alloyId620.push(__alloyId629);
            var __alloyId631 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId620.push(__alloyId631);
            var __alloyId633 = {
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
            __alloyId620.push(__alloyId633);
            var __alloyId635 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId620.push(__alloyId635);
            var __alloyId637 = {
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
            __alloyId620.push(__alloyId637);
            var __alloyId639 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId620.push(__alloyId639);
            var __alloyId641 = {
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
            __alloyId620.push(__alloyId641);
            var __alloyId643 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId620.push(__alloyId643);
            var __alloyId645 = {
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
            __alloyId620.push(__alloyId645);
            var __alloyId647 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId620.push(__alloyId647);
            var __alloyId649 = {
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
            __alloyId620.push(__alloyId649);
            var __alloyId651 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId620.push(__alloyId651);
            var __alloyId653 = {
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
            __alloyId620.push(__alloyId653);
            var __alloyId655 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId620.push(__alloyId655);
            var __alloyId657 = {
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
            __alloyId620.push(__alloyId657);
            var __alloyId659 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId620.push(__alloyId659);
            var __alloyId661 = {
                type: "Ti.UI.Label",
                bindId: "label_precototal",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    color: "black",
                    font: {
                        fontSize: 13
                    },
                    bindId: "label_precototal"
                }
            };
            __alloyId620.push(__alloyId661);
            var __alloyId663 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId620.push(__alloyId663);
            var __alloyId665 = {
                type: "Ti.UI.Label",
                bindId: "label_ipi",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    color: "black",
                    font: {
                        fontSize: 13
                    },
                    bindId: "label_ipi"
                }
            };
            __alloyId620.push(__alloyId665);
            var __alloyId667 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId620.push(__alloyId667);
            var __alloyId669 = {
                type: "Ti.UI.Label",
                bindId: "label_sustrib",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "6%",
                    color: "black",
                    font: {
                        fontSize: 13
                    },
                    bindId: "label_sustrib"
                }
            };
            __alloyId620.push(__alloyId669);
            var __alloyId671 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId620.push(__alloyId671);
            var __alloyId673 = {
                type: "Ti.UI.Label",
                bindId: "label_valorfinal",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "8%",
                    color: "black",
                    font: {
                        fontSize: 13
                    },
                    bindId: "label_valorfinal"
                }
            };
            __alloyId620.push(__alloyId673);
            return __alloyId620;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId617.push(__alloyId619);
    var __alloyId616 = {
        properties: {
            width: "100%",
            backgroundColor: "#EBEBEB",
            height: 100,
            name: "pedido_lista_escuro"
        },
        childTemplates: __alloyId617
    };
    __alloyId614["pedido_lista_escuro"] = __alloyId616;
    var __alloyId676 = [];
    var __alloyId678 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId679 = [];
            var __alloyId681 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId682 = [];
                    var __alloyId684 = {
                        type: "Ti.UI.ImageView",
                        bindId: "imagem_produto",
                        properties: {
                            height: "95%",
                            bindId: "imagem_produto"
                        }
                    };
                    __alloyId682.push(__alloyId684);
                    return __alloyId682;
                }(),
                properties: {
                    width: "7%"
                }
            };
            __alloyId679.push(__alloyId681);
            var __alloyId686 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId679.push(__alloyId686);
            var __alloyId688 = {
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
            __alloyId679.push(__alloyId688);
            var __alloyId690 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId679.push(__alloyId690);
            var __alloyId692 = {
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
            __alloyId679.push(__alloyId692);
            var __alloyId694 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId679.push(__alloyId694);
            var __alloyId696 = {
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
            __alloyId679.push(__alloyId696);
            var __alloyId698 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId679.push(__alloyId698);
            var __alloyId700 = {
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
            __alloyId679.push(__alloyId700);
            var __alloyId702 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId679.push(__alloyId702);
            var __alloyId704 = {
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
            __alloyId679.push(__alloyId704);
            var __alloyId706 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId679.push(__alloyId706);
            var __alloyId708 = {
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
            __alloyId679.push(__alloyId708);
            var __alloyId710 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId679.push(__alloyId710);
            var __alloyId712 = {
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
            __alloyId679.push(__alloyId712);
            var __alloyId714 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId679.push(__alloyId714);
            var __alloyId716 = {
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
            __alloyId679.push(__alloyId716);
            var __alloyId718 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId679.push(__alloyId718);
            var __alloyId720 = {
                type: "Ti.UI.Label",
                bindId: "label_precototal",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    color: "black",
                    font: {
                        fontSize: 13
                    },
                    bindId: "label_precototal"
                }
            };
            __alloyId679.push(__alloyId720);
            var __alloyId722 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId679.push(__alloyId722);
            var __alloyId724 = {
                type: "Ti.UI.Label",
                bindId: "label_ipi",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    color: "black",
                    font: {
                        fontSize: 13
                    },
                    bindId: "label_ipi"
                }
            };
            __alloyId679.push(__alloyId724);
            var __alloyId726 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId679.push(__alloyId726);
            var __alloyId728 = {
                type: "Ti.UI.Label",
                bindId: "label_sustrib",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "6%",
                    color: "black",
                    font: {
                        fontSize: 13
                    },
                    bindId: "label_sustrib"
                }
            };
            __alloyId679.push(__alloyId728);
            var __alloyId730 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId679.push(__alloyId730);
            var __alloyId732 = {
                type: "Ti.UI.Label",
                bindId: "label_valorfinal",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "8%",
                    color: "black",
                    font: {
                        fontSize: 13
                    },
                    bindId: "label_valorfinal"
                }
            };
            __alloyId679.push(__alloyId732);
            return __alloyId679;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId676.push(__alloyId678);
    var __alloyId675 = {
        properties: {
            width: "100%",
            backgroundColor: "#FBFBFB",
            height: 100,
            name: "pedido_lista_claro"
        },
        childTemplates: __alloyId676
    };
    __alloyId614["pedido_lista_claro"] = __alloyId675;
    $.__views.__alloyId733 = Ti.UI.createListSection({
        id: "__alloyId733"
    });
    var __alloyId735 = [];
    __alloyId735.push($.__views.__alloyId733);
    $.__views.listapedidos = Ti.UI.createListView({
        width: "100%",
        top: "10%",
        sections: __alloyId735,
        templates: __alloyId614,
        id: "listapedidos",
        defaultItemTemplate: "pedido_lista"
    });
    $.__views.__alloyId587.add($.__views.listapedidos);
    $.__views.__alloyId736 = Ti.UI.createView({
        backgroundColor: "#008382",
        height: "4%",
        top: "86%",
        width: "99%",
        layout: "horizontal",
        id: "__alloyId736"
    });
    $.__views.finalizacao.add($.__views.__alloyId736);
    $.__views.label_total = Ti.UI.createLabel({
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "33%",
        id: "label_total"
    });
    $.__views.__alloyId736.add($.__views.label_total);
    $.__views.__alloyId737 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId737"
    });
    $.__views.__alloyId736.add($.__views.__alloyId737);
    $.__views.label_desconto = Ti.UI.createLabel({
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "33%",
        id: "label_desconto"
    });
    $.__views.__alloyId736.add($.__views.label_desconto);
    $.__views.__alloyId738 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId738"
    });
    $.__views.__alloyId736.add($.__views.__alloyId738);
    $.__views.label_totalcomdesconto = Ti.UI.createLabel({
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "33%",
        id: "label_totalcomdesconto"
    });
    $.__views.__alloyId736.add($.__views.label_totalcomdesconto);
    $.__views.__alloyId739 = Ti.UI.createView({
        backgroundColor: "#59595b",
        bottom: "1%",
        height: "7%",
        width: "99%",
        id: "__alloyId739"
    });
    $.__views.finalizacao.add($.__views.__alloyId739);
    $.__views.__alloyId740 = Ti.UI.createView({
        id: "__alloyId740"
    });
    $.__views.__alloyId739.add($.__views.__alloyId740);
    $.__views.__alloyId741 = Ti.UI.createButton({
        title: "Voltar",
        id: "__alloyId741"
    });
    $.__views.__alloyId740.add($.__views.__alloyId741);
    voltar ? $.__views.__alloyId741.addEventListener("click", voltar) : __defers["$.__views.__alloyId741!click!voltar"] = true;
    $.__views.__alloyId742 = Ti.UI.createView({
        height: "auto",
        width: "auto",
        backgroundColor: "white",
        layout: "horizontal",
        id: "__alloyId742"
    });
    $.__views.__alloyId739.add($.__views.__alloyId742);
    $.__views.__alloyId743 = Ti.UI.createImageView({
        image: "/images/primeiro.png",
        height: "80%",
        left: "1%",
        id: "__alloyId743"
    });
    $.__views.__alloyId742.add($.__views.__alloyId743);
    primeiro ? $.__views.__alloyId743.addEventListener("click", primeiro) : __defers["$.__views.__alloyId743!click!primeiro"] = true;
    $.__views.__alloyId744 = Ti.UI.createImageView({
        image: "/images/anterior.png",
        height: "80%",
        left: "1%",
        id: "__alloyId744"
    });
    $.__views.__alloyId742.add($.__views.__alloyId744);
    anterior ? $.__views.__alloyId744.addEventListener("click", anterior) : __defers["$.__views.__alloyId744!click!anterior"] = true;
    $.__views.paginacao = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        borderColor: "#cdcdcd",
        borderWidth: "1",
        color: "#008382",
        height: "80%",
        left: "1%",
        width: "14%",
        title: "1/1",
        id: "paginacao"
    });
    $.__views.__alloyId742.add($.__views.paginacao);
    $.__views.__alloyId745 = Ti.UI.createImageView({
        image: "/images/proximo.png",
        height: "80%",
        left: "1%",
        id: "__alloyId745"
    });
    $.__views.__alloyId742.add($.__views.__alloyId745);
    proximo ? $.__views.__alloyId745.addEventListener("click", proximo) : __defers["$.__views.__alloyId745!click!proximo"] = true;
    $.__views.__alloyId746 = Ti.UI.createImageView({
        image: "/images/ultimo.png",
        height: "80%",
        left: "1%",
        id: "__alloyId746"
    });
    $.__views.__alloyId742.add($.__views.__alloyId746);
    ultimo ? $.__views.__alloyId746.addEventListener("click", ultimo) : __defers["$.__views.__alloyId746!click!ultimo"] = true;
    $.__views.__alloyId747 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        height: "80%",
        right: "14%",
        width: "14%",
        title: "Voltar Categorias",
        id: "__alloyId747"
    });
    $.__views.__alloyId739.add($.__views.__alloyId747);
    voltar ? $.__views.__alloyId747.addEventListener("click", voltar) : __defers["$.__views.__alloyId747!click!voltar"] = true;
    $.__views.__alloyId748 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        height: "80%",
        right: "1%",
        width: "12%",
        title: "Totalizações",
        id: "__alloyId748"
    });
    $.__views.__alloyId739.add($.__views.__alloyId748);
    totalizacoes ? $.__views.__alloyId748.addEventListener("click", totalizacoes) : __defers["$.__views.__alloyId748!click!totalizacoes"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/carrinho.js");
    Ti.include("/database/carrinho_pedido.js");
    Ti.include("/database/imagens_produtos.js");
    Ti.include("/database/pedido.js");
    var pedidos = consultaPedidosBySession(Ti.App.Properties.getString(SESSION_ID));
    var paginas = pedidos.length;
    var current_page = 1;
    renderCarrinho();
    __defers["$.__views.__alloyId741!click!voltar"] && $.__views.__alloyId741.addEventListener("click", voltar);
    __defers["$.__views.__alloyId743!click!primeiro"] && $.__views.__alloyId743.addEventListener("click", primeiro);
    __defers["$.__views.__alloyId744!click!anterior"] && $.__views.__alloyId744.addEventListener("click", anterior);
    __defers["$.__views.__alloyId745!click!proximo"] && $.__views.__alloyId745.addEventListener("click", proximo);
    __defers["$.__views.__alloyId746!click!ultimo"] && $.__views.__alloyId746.addEventListener("click", ultimo);
    __defers["$.__views.__alloyId747!click!voltar"] && $.__views.__alloyId747.addEventListener("click", voltar);
    __defers["$.__views.__alloyId748!click!totalizacoes"] && $.__views.__alloyId748.addEventListener("click", totalizacoes);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;