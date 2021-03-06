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
            var desconto_unit = carrinho.fieldByName("desconto_unit");
            var prazo_de_entrega = selectPrazo(entrega_prazo, entrega);
            var valor_produtos = crp_preco_unitario * crp_quantidade;
            valor_produtos -= desconto_unit;
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
        alert(total);
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
    $.__views.__alloyId563 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "99%",
        id: "__alloyId563"
    });
    $.__views.finalizacao.add($.__views.__alloyId563);
    $.__views.__alloyId564 = Ti.UI.createLabel({
        color: "#008382",
        font: {
            fontSize: 22
        },
        height: "50%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: "0%",
        width: "98%",
        text: "Informações do pedido",
        id: "__alloyId564"
    });
    $.__views.__alloyId563.add($.__views.__alloyId564);
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
    $.__views.__alloyId563.add($.__views.numeroPedido);
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
    $.__views.__alloyId563.add($.__views.dataPedido);
    $.__views.__alloyId565 = Ti.UI.createView({
        height: "39%",
        top: "10%",
        layout: "horizontal",
        width: "100%",
        id: "__alloyId565"
    });
    $.__views.finalizacao.add($.__views.__alloyId565);
    $.__views.__alloyId566 = Ti.UI.createView({
        height: "100%",
        layout: "vertical",
        left: "1%",
        width: "32%",
        id: "__alloyId566"
    });
    $.__views.__alloyId565.add($.__views.__alloyId566);
    $.__views.__alloyId567 = Ti.UI.createLabel({
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
        id: "__alloyId567"
    });
    $.__views.__alloyId566.add($.__views.__alloyId567);
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
    $.__views.__alloyId566.add($.__views.label_cnpj);
    $.__views.__alloyId568 = Ti.UI.createLabel({
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
        id: "__alloyId568"
    });
    $.__views.__alloyId566.add($.__views.__alloyId568);
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
    $.__views.__alloyId566.add($.__views.label_razao);
    $.__views.__alloyId569 = Ti.UI.createLabel({
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
        id: "__alloyId569"
    });
    $.__views.__alloyId566.add($.__views.__alloyId569);
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
    $.__views.__alloyId566.add($.__views.label_icms);
    $.__views.__alloyId570 = Ti.UI.createLabel({
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
        id: "__alloyId570"
    });
    $.__views.__alloyId566.add($.__views.__alloyId570);
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
    $.__views.__alloyId566.add($.__views.label_ipi);
    $.__views.__alloyId571 = Ti.UI.createView({
        height: "100%",
        layout: "vertical",
        left: "1%",
        width: "32%",
        id: "__alloyId571"
    });
    $.__views.__alloyId565.add($.__views.__alloyId571);
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
        text: "FORMA DE PAGAMENTO",
        id: "__alloyId572"
    });
    $.__views.__alloyId571.add($.__views.__alloyId572);
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
    $.__views.__alloyId571.add($.__views.label_forma_pgto);
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
        text: "NÚMERO DE PARCELAS",
        id: "__alloyId573"
    });
    $.__views.__alloyId571.add($.__views.__alloyId573);
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
    $.__views.__alloyId571.add($.__views.label_parcelas);
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
        text: "VALOR DAS PARCELAS",
        id: "__alloyId574"
    });
    $.__views.__alloyId571.add($.__views.__alloyId574);
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
    $.__views.__alloyId571.add($.__views.label_valor_parcelas);
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
        text: "PRAZO MÉDIO",
        id: "__alloyId575"
    });
    $.__views.__alloyId571.add($.__views.__alloyId575);
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
    $.__views.__alloyId571.add($.__views.label_prazo_medio);
    $.__views.__alloyId576 = Ti.UI.createLabel({
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
        id: "__alloyId576"
    });
    $.__views.__alloyId571.add($.__views.__alloyId576);
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
    $.__views.__alloyId571.add($.__views.label_representante);
    $.__views.__alloyId577 = Ti.UI.createView({
        height: "100%",
        layout: "vertical",
        left: "1%",
        width: "32%",
        id: "__alloyId577"
    });
    $.__views.__alloyId565.add($.__views.__alloyId577);
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
        text: "PRAZO DE ENTREGA",
        id: "__alloyId578"
    });
    $.__views.__alloyId577.add($.__views.__alloyId578);
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
    $.__views.__alloyId577.add($.__views.label_prazo_entrega);
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
        text: "CUBAGEM",
        id: "__alloyId579"
    });
    $.__views.__alloyId577.add($.__views.__alloyId579);
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
    $.__views.__alloyId577.add($.__views.label_cubagem);
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
        text: "PESO",
        id: "__alloyId580"
    });
    $.__views.__alloyId577.add($.__views.__alloyId580);
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
    $.__views.__alloyId577.add($.__views.label_peso);
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
        text: "ENDEREÇO DE ENTREGA",
        id: "__alloyId581"
    });
    $.__views.__alloyId577.add($.__views.__alloyId581);
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
    $.__views.__alloyId577.add($.__views.label_endereco);
    $.__views.__alloyId582 = Ti.UI.createView({
        height: "36%",
        top: "50%",
        width: "99%",
        id: "__alloyId582"
    });
    $.__views.finalizacao.add($.__views.__alloyId582);
    $.__views.__alloyId583 = Ti.UI.createView({
        backgroundColor: "#008382",
        height: "12%",
        font: {
            fontSize: 15
        },
        top: "0%",
        color: "#008382",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId583"
    });
    $.__views.__alloyId582.add($.__views.__alloyId583);
    $.__views.__alloyId584 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "7%",
        text: "Produto",
        id: "__alloyId584"
    });
    $.__views.__alloyId583.add($.__views.__alloyId584);
    $.__views.__alloyId585 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId585"
    });
    $.__views.__alloyId583.add($.__views.__alloyId585);
    $.__views.__alloyId586 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "7%",
        text: "Marca / Ref.",
        id: "__alloyId586"
    });
    $.__views.__alloyId583.add($.__views.__alloyId586);
    $.__views.__alloyId587 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId587"
    });
    $.__views.__alloyId583.add($.__views.__alloyId587);
    $.__views.__alloyId588 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "5%",
        text: "Coleção",
        id: "__alloyId588"
    });
    $.__views.__alloyId583.add($.__views.__alloyId588);
    $.__views.__alloyId589 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId589"
    });
    $.__views.__alloyId583.add($.__views.__alloyId589);
    $.__views.__alloyId590 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "14%",
        text: "Prazo de entrega",
        id: "__alloyId590"
    });
    $.__views.__alloyId583.add($.__views.__alloyId590);
    $.__views.__alloyId591 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId591"
    });
    $.__views.__alloyId583.add($.__views.__alloyId591);
    $.__views.__alloyId592 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "4%",
        text: "Tam.",
        id: "__alloyId592"
    });
    $.__views.__alloyId583.add($.__views.__alloyId592);
    $.__views.__alloyId593 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId593"
    });
    $.__views.__alloyId583.add($.__views.__alloyId593);
    $.__views.__alloyId594 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "7%",
        text: "Preço Unitário",
        id: "__alloyId594"
    });
    $.__views.__alloyId583.add($.__views.__alloyId594);
    $.__views.__alloyId595 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId595"
    });
    $.__views.__alloyId583.add($.__views.__alloyId595);
    $.__views.__alloyId596 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "4%",
        text: "Peso",
        id: "__alloyId596"
    });
    $.__views.__alloyId583.add($.__views.__alloyId596);
    $.__views.__alloyId597 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId597"
    });
    $.__views.__alloyId583.add($.__views.__alloyId597);
    $.__views.__alloyId598 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "13%",
        text: "Cubagem (A x L x P)",
        id: "__alloyId598"
    });
    $.__views.__alloyId583.add($.__views.__alloyId598);
    $.__views.__alloyId599 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId599"
    });
    $.__views.__alloyId583.add($.__views.__alloyId599);
    $.__views.__alloyId600 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "6%",
        text: "Quantidade",
        id: "__alloyId600"
    });
    $.__views.__alloyId583.add($.__views.__alloyId600);
    $.__views.__alloyId601 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId601"
    });
    $.__views.__alloyId583.add($.__views.__alloyId601);
    $.__views.__alloyId602 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "7%",
        text: "Preço total",
        id: "__alloyId602"
    });
    $.__views.__alloyId583.add($.__views.__alloyId602);
    $.__views.__alloyId603 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId603"
    });
    $.__views.__alloyId583.add($.__views.__alloyId603);
    $.__views.__alloyId604 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "7%",
        text: "IPI",
        id: "__alloyId604"
    });
    $.__views.__alloyId583.add($.__views.__alloyId604);
    $.__views.__alloyId605 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId605"
    });
    $.__views.__alloyId583.add($.__views.__alloyId605);
    $.__views.__alloyId606 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "6%",
        text: "S.T",
        id: "__alloyId606"
    });
    $.__views.__alloyId583.add($.__views.__alloyId606);
    $.__views.__alloyId607 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId607"
    });
    $.__views.__alloyId583.add($.__views.__alloyId607);
    $.__views.__alloyId608 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "8%",
        text: "Valor do Produto",
        id: "__alloyId608"
    });
    $.__views.__alloyId583.add($.__views.__alloyId608);
    var __alloyId609 = {};
    var __alloyId612 = [];
    var __alloyId614 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId615 = [];
            var __alloyId617 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId618 = [];
                    var __alloyId620 = {
                        type: "Ti.UI.ImageView",
                        bindId: "imagem_produto",
                        properties: {
                            height: "95%",
                            bindId: "imagem_produto"
                        }
                    };
                    __alloyId618.push(__alloyId620);
                    return __alloyId618;
                }(),
                properties: {
                    width: "7%"
                }
            };
            __alloyId615.push(__alloyId617);
            var __alloyId622 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId615.push(__alloyId622);
            var __alloyId624 = {
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
            __alloyId615.push(__alloyId624);
            var __alloyId626 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId615.push(__alloyId626);
            var __alloyId628 = {
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
            __alloyId615.push(__alloyId628);
            var __alloyId630 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId615.push(__alloyId630);
            var __alloyId632 = {
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
            __alloyId615.push(__alloyId632);
            var __alloyId634 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId615.push(__alloyId634);
            var __alloyId636 = {
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
            __alloyId615.push(__alloyId636);
            var __alloyId638 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId615.push(__alloyId638);
            var __alloyId640 = {
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
            __alloyId615.push(__alloyId640);
            var __alloyId642 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId615.push(__alloyId642);
            var __alloyId644 = {
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
            __alloyId615.push(__alloyId644);
            var __alloyId646 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId615.push(__alloyId646);
            var __alloyId648 = {
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
            __alloyId615.push(__alloyId648);
            var __alloyId650 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId615.push(__alloyId650);
            var __alloyId652 = {
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
            __alloyId615.push(__alloyId652);
            var __alloyId654 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId615.push(__alloyId654);
            var __alloyId656 = {
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
            __alloyId615.push(__alloyId656);
            var __alloyId658 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId615.push(__alloyId658);
            var __alloyId660 = {
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
            __alloyId615.push(__alloyId660);
            var __alloyId662 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId615.push(__alloyId662);
            var __alloyId664 = {
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
            __alloyId615.push(__alloyId664);
            var __alloyId666 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId615.push(__alloyId666);
            var __alloyId668 = {
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
            __alloyId615.push(__alloyId668);
            return __alloyId615;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId612.push(__alloyId614);
    var __alloyId611 = {
        properties: {
            width: "100%",
            backgroundColor: "#EBEBEB",
            height: 100,
            name: "pedido_lista_escuro"
        },
        childTemplates: __alloyId612
    };
    __alloyId609["pedido_lista_escuro"] = __alloyId611;
    var __alloyId671 = [];
    var __alloyId673 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId674 = [];
            var __alloyId676 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId677 = [];
                    var __alloyId679 = {
                        type: "Ti.UI.ImageView",
                        bindId: "imagem_produto",
                        properties: {
                            height: "95%",
                            bindId: "imagem_produto"
                        }
                    };
                    __alloyId677.push(__alloyId679);
                    return __alloyId677;
                }(),
                properties: {
                    width: "7%"
                }
            };
            __alloyId674.push(__alloyId676);
            var __alloyId681 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId674.push(__alloyId681);
            var __alloyId683 = {
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
            __alloyId674.push(__alloyId683);
            var __alloyId685 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId674.push(__alloyId685);
            var __alloyId687 = {
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
            __alloyId674.push(__alloyId687);
            var __alloyId689 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId674.push(__alloyId689);
            var __alloyId691 = {
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
            __alloyId674.push(__alloyId691);
            var __alloyId693 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId674.push(__alloyId693);
            var __alloyId695 = {
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
            __alloyId674.push(__alloyId695);
            var __alloyId697 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId674.push(__alloyId697);
            var __alloyId699 = {
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
            __alloyId674.push(__alloyId699);
            var __alloyId701 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId674.push(__alloyId701);
            var __alloyId703 = {
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
            __alloyId674.push(__alloyId703);
            var __alloyId705 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId674.push(__alloyId705);
            var __alloyId707 = {
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
            __alloyId674.push(__alloyId707);
            var __alloyId709 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId674.push(__alloyId709);
            var __alloyId711 = {
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
            __alloyId674.push(__alloyId711);
            var __alloyId713 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId674.push(__alloyId713);
            var __alloyId715 = {
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
            __alloyId674.push(__alloyId715);
            var __alloyId717 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId674.push(__alloyId717);
            var __alloyId719 = {
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
            __alloyId674.push(__alloyId719);
            var __alloyId721 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId674.push(__alloyId721);
            var __alloyId723 = {
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
            __alloyId674.push(__alloyId723);
            var __alloyId725 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId674.push(__alloyId725);
            var __alloyId727 = {
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
            __alloyId674.push(__alloyId727);
            return __alloyId674;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId671.push(__alloyId673);
    var __alloyId670 = {
        properties: {
            width: "100%",
            backgroundColor: "#FBFBFB",
            height: 100,
            name: "pedido_lista_claro"
        },
        childTemplates: __alloyId671
    };
    __alloyId609["pedido_lista_claro"] = __alloyId670;
    $.__views.__alloyId728 = Ti.UI.createListSection({
        id: "__alloyId728"
    });
    var __alloyId730 = [];
    __alloyId730.push($.__views.__alloyId728);
    $.__views.listapedidos = Ti.UI.createListView({
        width: "100%",
        top: "10%",
        sections: __alloyId730,
        templates: __alloyId609,
        id: "listapedidos",
        defaultItemTemplate: "pedido_lista"
    });
    $.__views.__alloyId582.add($.__views.listapedidos);
    $.__views.__alloyId731 = Ti.UI.createView({
        backgroundColor: "#008382",
        height: "4%",
        top: "86%",
        width: "99%",
        layout: "horizontal",
        id: "__alloyId731"
    });
    $.__views.finalizacao.add($.__views.__alloyId731);
    $.__views.label_total = Ti.UI.createLabel({
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "33%",
        id: "label_total"
    });
    $.__views.__alloyId731.add($.__views.label_total);
    $.__views.__alloyId732 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId732"
    });
    $.__views.__alloyId731.add($.__views.__alloyId732);
    $.__views.label_desconto = Ti.UI.createLabel({
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "33%",
        id: "label_desconto"
    });
    $.__views.__alloyId731.add($.__views.label_desconto);
    $.__views.__alloyId733 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId733"
    });
    $.__views.__alloyId731.add($.__views.__alloyId733);
    $.__views.label_totalcomdesconto = Ti.UI.createLabel({
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "33%",
        id: "label_totalcomdesconto"
    });
    $.__views.__alloyId731.add($.__views.label_totalcomdesconto);
    $.__views.__alloyId734 = Ti.UI.createView({
        backgroundColor: "#59595b",
        bottom: "1%",
        height: "7%",
        width: "99%",
        id: "__alloyId734"
    });
    $.__views.finalizacao.add($.__views.__alloyId734);
    $.__views.__alloyId735 = Ti.UI.createView({
        id: "__alloyId735"
    });
    $.__views.__alloyId734.add($.__views.__alloyId735);
    $.__views.__alloyId736 = Ti.UI.createButton({
        title: "Voltar",
        id: "__alloyId736"
    });
    $.__views.__alloyId735.add($.__views.__alloyId736);
    voltar ? $.__views.__alloyId736.addEventListener("click", voltar) : __defers["$.__views.__alloyId736!click!voltar"] = true;
    $.__views.__alloyId737 = Ti.UI.createView({
        height: "auto",
        width: "auto",
        backgroundColor: "white",
        layout: "horizontal",
        id: "__alloyId737"
    });
    $.__views.__alloyId734.add($.__views.__alloyId737);
    $.__views.__alloyId738 = Ti.UI.createImageView({
        image: "/images/primeiro.png",
        height: "80%",
        left: "1%",
        id: "__alloyId738"
    });
    $.__views.__alloyId737.add($.__views.__alloyId738);
    primeiro ? $.__views.__alloyId738.addEventListener("click", primeiro) : __defers["$.__views.__alloyId738!click!primeiro"] = true;
    $.__views.__alloyId739 = Ti.UI.createImageView({
        image: "/images/anterior.png",
        height: "80%",
        left: "1%",
        id: "__alloyId739"
    });
    $.__views.__alloyId737.add($.__views.__alloyId739);
    anterior ? $.__views.__alloyId739.addEventListener("click", anterior) : __defers["$.__views.__alloyId739!click!anterior"] = true;
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
    $.__views.__alloyId737.add($.__views.paginacao);
    $.__views.__alloyId740 = Ti.UI.createImageView({
        image: "/images/proximo.png",
        height: "80%",
        left: "1%",
        id: "__alloyId740"
    });
    $.__views.__alloyId737.add($.__views.__alloyId740);
    proximo ? $.__views.__alloyId740.addEventListener("click", proximo) : __defers["$.__views.__alloyId740!click!proximo"] = true;
    $.__views.__alloyId741 = Ti.UI.createImageView({
        image: "/images/ultimo.png",
        height: "80%",
        left: "1%",
        id: "__alloyId741"
    });
    $.__views.__alloyId737.add($.__views.__alloyId741);
    ultimo ? $.__views.__alloyId741.addEventListener("click", ultimo) : __defers["$.__views.__alloyId741!click!ultimo"] = true;
    $.__views.__alloyId742 = Ti.UI.createButton({
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
        id: "__alloyId742"
    });
    $.__views.__alloyId734.add($.__views.__alloyId742);
    voltar ? $.__views.__alloyId742.addEventListener("click", voltar) : __defers["$.__views.__alloyId742!click!voltar"] = true;
    $.__views.__alloyId743 = Ti.UI.createButton({
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
        id: "__alloyId743"
    });
    $.__views.__alloyId734.add($.__views.__alloyId743);
    totalizacoes ? $.__views.__alloyId743.addEventListener("click", totalizacoes) : __defers["$.__views.__alloyId743!click!totalizacoes"] = true;
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
    __defers["$.__views.__alloyId736!click!voltar"] && $.__views.__alloyId736.addEventListener("click", voltar);
    __defers["$.__views.__alloyId738!click!primeiro"] && $.__views.__alloyId738.addEventListener("click", primeiro);
    __defers["$.__views.__alloyId739!click!anterior"] && $.__views.__alloyId739.addEventListener("click", anterior);
    __defers["$.__views.__alloyId740!click!proximo"] && $.__views.__alloyId740.addEventListener("click", proximo);
    __defers["$.__views.__alloyId741!click!ultimo"] && $.__views.__alloyId741.addEventListener("click", ultimo);
    __defers["$.__views.__alloyId742!click!voltar"] && $.__views.__alloyId742.addEventListener("click", voltar);
    __defers["$.__views.__alloyId743!click!totalizacoes"] && $.__views.__alloyId743.addEventListener("click", totalizacoes);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;