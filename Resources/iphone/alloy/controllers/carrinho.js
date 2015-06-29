function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function resultadoCarrinho(carrinho) {
        var totalFinal = 0;
        var scroll = Ti.UI.createScrollView({
            height: "100%",
            width: "100%",
            contentWidth: "auto",
            contentHeight: "auto",
            scrollType: "horizontal",
            layout: "horizontal",
            showVerticalScrollIndicator: true,
            showHorizontalScrollIndicator: true
        });
        $.produto.add(scroll);
        while (carrinho.isValidRow()) {
            total_pedidos++;
            var car_id = carrinho.fieldByName("car_id");
            var car_quantidade = carrinho.fieldByName("car_quantidade");
            var car_preco_unitario = carrinho.fieldByName("car_preco_unitario");
            {
                carrinho.fieldByName("car_entrega");
            }
            {
                carrinho.fieldByName("car_entrega_prazo");
            }
            var prd_id = carrinho.fieldByName("prd_id");
            {
                carrinho.fieldByName("prd_nome");
            }
            var prd_referencia = carrinho.fieldByName("prd_referencia");
            var prd_nome_colecao = carrinho.fieldByName("prd_nome_colecao");
            var prd_data_inicio = carrinho.fieldByName("prd_data_inicio");
            var prd_data_fim = carrinho.fieldByName("prd_data_fim");
            var prd_data_prazo = carrinho.fieldByName("prd_data_prazo");
            {
                carrinho.fieldByName("prd_data_limite");
            }
            var prd_peso = carrinho.fieldByName("prd_peso");
            var prd_cub_a = carrinho.fieldByName("prd_cub_a");
            var prd_cub_l = carrinho.fieldByName("prd_cub_l");
            var prd_cub_p = carrinho.fieldByName("prd_cub_p");
            var prd_ipi = carrinho.fieldByName("car_ipi");
            var tmh_nome = carrinho.fieldByName("tmh_nome");
            var estoque = carrinho.fieldByName("estoque2");
            var tmpl = carrinho.fieldByName("fk_template");
            setGap(prd_data_inicio, prd_data_fim, prd_data_prazo);
            var notfound;
            switch (tmpl) {
              case 1:
                notfound = "/images/notfound_quatro_quadrados.jpg";
                break;

              case 2:
                notfound = "/images/notfound_tres_verticais.jpg";
                break;

              case 3:
                notfound = "/images/notfound_quatro_verticais.jpg";
                break;

              case 4:
                notfound = "/images/notfound_um_horizontal.jpg";
                break;

              case 5:
                notfound = "/images/notfound_dois_horizontais.jpg";
                break;

              case 6:
                notfound = "/images/notfound_dois_verticais.jpg";
                break;

              case 7:
                notfound = "/images/notfound_quatro_horizontais.jpg";
                break;

              case 8:
                notfound = "/images/notfound_cinco_verticais.jpg";
                break;

              case 9:
                notfound = "/images/notfound_seis_verticais.jpg";
            }
            var view = Titanium.UI.createView({
                backgroundColor: "#ffe9e9",
                borderColor: "#dddddd",
                borderRadius: "6",
                borderWidth: "1",
                height: "100%",
                left: "5",
                right: "5",
                width: "100"
            });
            var referencia = Titanium.UI.createLabel({
                color: "#000000",
                font: {
                    fontSize: 13
                },
                height: "10%",
                text: prd_referencia + " - " + tmh_nome,
                top: "5%"
            });
            var arquivoImagem = getImagesFolder() + selectImagemPrincipal(prd_id);
            var arquivoImagem = getImagesFolder() + selectImagemPrincipal(prd_id);
            var file = Ti.Filesystem.getFile(arquivoImagem);
            file ? file.exists() || (arquivoImagem = notfound) : arquivoImagem = notfound;
            var imagem = Titanium.UI.createImageView({
                height: "48%",
                image: arquivoImagem,
                top: "20%"
            });
            if ("mensal" == prd_data_prazo) {
                var inicio = prd_data_inicio.split("-");
                var fim = prd_data_fim.split("-");
                var prazo = "M";
            } else if ("semanal" == prd_data_prazo) {
                var prazo = "S";
                var inicio = prd_data_inicio.split("-");
                var dataInicio = new Date(prd_data_inicio);
                inicio[1] = getWeekOfYear(dataInicio);
                inicio[1] > 52 && (inicio[1] = inicio[1] - 52);
                var fim = prd_data_fim.split("-");
                var dataFim = new Date(prd_data_fim);
                fim[1] = getWeekOfYear(dataFim);
                fim[1] > 52 && (fim[1] = fim[1] - 52);
            } else if ("quinzena" == prd_data_prazo) {
                var inicio = prd_data_inicio.split("-");
                inicio[1] = inicio[1] <= 15 ? 2 * inicio[1] - 1 : 2 * inicio[1];
                var fim = prd_data_fim.split("-");
                fim[1] = fim[1] <= 15 ? 2 * fim[1] - 1 : 2 * fim[1];
                var prazo = "Q";
            }
            var periodo = Titanium.UI.createLabel({
                backgroundColor: "transparent",
                bottom: "5%",
                color: "#000000",
                font: {
                    fontSize: 13
                },
                text: inicio[1] + "/" + inicio[0] + " à " + fim[1] + "/" + fim[0] + " (" + prazo + ")",
                height: "22%",
                width: "98%",
                car_id: car_id,
                prazo: prd_data_prazo,
                prd_data_inicio: prd_data_inicio,
                prd_data_fim: prd_data_fim,
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
            });
            datas_labels.push(periodo);
            datas_inicio.push(prd_data_inicio);
            datas_fim.push(prd_data_fim);
            datas_prazos.push(prd_data_prazo);
            datas_selected.push(0);
            view.periodo = periodo;
            view.selected_item = total_pedidos - 1;
            referencia.periodo = periodo;
            referencia.selected_item = total_pedidos - 1;
            imagem.periodo = periodo;
            imagem.selected_item = total_pedidos - 1;
            periodo.periodo = periodo;
            periodo.selected_item = total_pedidos - 1;
            view.add(referencia);
            view.add(imagem);
            view.add(periodo);
            view.addEventListener("click", function(e) {
                periodoManual(e.source.periodo, e.source.selected_item);
            });
            views_imagens.push(view);
            scroll.add(view);
            var total = car_preco_unitario * car_quantidade;
            var ipi = total * prd_ipi / 100;
            var final = total + ipi;
            totalFinal += final;
            totalSemIPI += total;
            totalIPI += ipi;
            var template;
            if (0 == count) {
                template = "pedido_lista_escuro";
                count++;
            } else {
                count = 0;
                template = "pedido_lista_claro";
            }
            data.push({
                car_id: car_id,
                car_quantidade: car_quantidade,
                estoque: estoque,
                template: template,
                imagem_produto: {
                    image: arquivoImagem
                },
                label_ref: {
                    font: {
                        fontSize: 13
                    },
                    text: prd_referencia
                },
                label_colecao: {
                    font: {
                        fontSize: 13
                    },
                    text: prd_nome_colecao
                },
                label_prazo: {
                    font: {
                        fontSize: 13
                    },
                    text: inicio[1] + "/" + inicio[0] + " à " + fim[1] + "/" + fim[0] + " (" + prazo + ")"
                },
                label_tam: {
                    font: {
                        fontSize: 13
                    },
                    text: tmh_nome
                },
                label_preco: {
                    font: {
                        fontSize: 13
                    },
                    text: formatCurrency(car_preco_unitario)
                },
                label_peso: {
                    font: {
                        fontSize: 13
                    },
                    text: prd_peso + " Kg"
                },
                label_cubagem: {
                    font: {
                        fontSize: 13
                    },
                    text: prd_cub_a + " m x " + prd_cub_l + " m x " + prd_cub_p + " m"
                },
                label_quant: {
                    font: {
                        fontSize: 13
                    },
                    text: car_quantidade
                },
                label_estoque: {
                    font: {
                        fontSize: 13
                    },
                    text: estoque
                },
                label_precototal: {
                    text: formatCurrency(total)
                },
                label_ipi: {
                    text: prd_ipi + "%\n" + formatCurrency(ipi)
                },
                label_sustrib: {
                    text: "R$ 0,00"
                },
                label_valorfinal: {
                    text: formatCurrency(final)
                }
            });
            carrinho.next();
        }
        drawDates();
        $.listapedidos.sections[0].setItems(data);
        $.valor_total.title = "Valor total do pedido: R$ " + formatCurrency(totalFinal);
    }
    function adiciona_quantidade(e) {
        var selecao = $.listapedidos.sections[e.sectionIndex];
        var item = selecao.getItemAt(e.itemIndex);
        var car_id = item.car_id;
        var quantidade = item.car_quantidade;
        var estoque = item.estoque;
        if (estoque > quantidade) {
            quantidade++;
            item.car_quantidade = quantidade;
            item.label_quant.text = quantidade;
            selecao.updateItemAt(e.itemIndex, item);
            updateCarrinhoQuantidade(car_id, quantidade);
        }
    }
    function subtrai_quantidade(e) {
        var selecao = $.listapedidos.sections[e.sectionIndex];
        var item = selecao.getItemAt(e.itemIndex);
        var car_id = item.car_id;
        var quantidade = item.car_quantidade;
        item.estoque;
        quantidade--;
        if (quantidade >= 0) {
            item.car_quantidade = quantidade;
            item.label_quant.text = quantidade;
            selecao.updateItemAt(e.itemIndex, item);
            updateCarrinhoQuantidade(car_id, quantidade);
        }
    }
    function exclui_item(e) {
        var selecao = $.listapedidos.sections[e.sectionIndex];
        var item = selecao.getItemAt(e.itemIndex);
        var itemIndex = e.itemIndex;
        var car_id = item.car_id;
        var dialog = Ti.UI.createAlertDialog({
            title: "Deseja excluir esse produto ?",
            buttonNames: [ "Cancelar", "Confirmar" ]
        });
        dialog.addEventListener("click", function(e) {
            if (1 == e.index) {
                selecao.deleteItemsAt(itemIndex, 1);
                excluidCarrinho(car_id);
                scroll.remove(views_imagens[itemIndex]);
                views_imagens.splice(itemIndex, 1);
            }
        });
        dialog.show();
    }
    function periodoManual(periodo, selected_item) {
        var car_id = periodo.car_id;
        var prazo = periodo.prazo;
        var data_inicio = new Date(periodo.prd_data_inicio);
        var data_fim = new Date(periodo.prd_data_fim);
        var data_atual = new Date(data_selecionada);
        if (prazo == prazo_selecionado && data_atual >= data_inicio && data_fim >= data_atual && "#f8f419" == periodo.backgroundColor) {
            periodo.backgroundColor = "#81dd1f";
            updatePeriod(car_id, data_selecionada, prazo_selecionado);
            Ti.API.info("selected_item=" + selected_item);
            datas_selected[selected_item] = 1;
            recountDates();
        }
    }
    function drawDates() {
        removeAllViews($.periodo_mes);
        removeAllViews($.periodo_semana);
        removeAllViews($.periodo_quinzena);
        var data_inicial = gap_inicial_mes;
        var data_final = gap_final_mes;
        var inicio = data_inicial.getMonth() + 1;
        var fim = data_final.getMonth() + 1 + 12 * (data_final.getFullYear() - data_inicial.getFullYear());
        var data = data_inicial;
        for (var i = inicio; fim > i; i++) {
            data.setMonth(i);
            var primeiro = new Date(data.getFullYear(), i, 1);
            var ultimodia = new Date(data.getFullYear(), i, 0);
            var text = data.getMonth() + 1 + "/" + data.getFullYear() + "\nEntrega:\n" + primeiro.getDate() + " à " + ultimodia.getDate();
            var salvar_data = data.getFullYear() + "-" + checkdecimal(data.getMonth() + 1) + "-" + checkdecimal(data.getDate());
            var display_data = data.getMonth() + 1 + " Mês";
            addDate(text, "mensal", salvar_data, display_data);
            usoMes = true;
        }
        var inicio = getWeekOfYear(gap_inicial_semana) + 1;
        var fim = getWeekOfYear(gap_final_semana) + 52 * (gap_final_semana.getFullYear() - gap_inicial_semana.getFullYear());
        var data = gap_inicial_semana;
        var dia = data.getDate();
        var ano_inicial = gap_inicial_semana.getFullYear();
        dia = data.getDate() - data.getDay() + 1;
        data.setDate(dia);
        var intervalo = fim - inicio;
        for (var i = 0; intervalo > i; i++) {
            var primeiro = data.getDate();
            var primeiro_mes = data.getMonth() + 1;
            data.setDate(data.getDate() + 6);
            var ultimodia = data.getDate();
            var ultimo_mes = data.getMonth() + 1;
            data.setDate(data.getDate() + 1);
            var year_week = 52 * (data.getFullYear() - ano_inicial);
            var text = inicio + i - year_week + "/" + data.getFullYear() + "\nEntrega:\n" + primeiro + "/" + primeiro_mes + " à " + ultimodia + "/" + ultimo_mes;
            var salvar_data = data.getFullYear() + "-" + checkdecimal(data.getMonth() + 1) + "-" + checkdecimal(data.getDate());
            var display_data = inicio + i + " Semana";
            addDate(text, "semanal", salvar_data, display_data);
            usoSemana = true;
        }
        var inicio = 0;
        var fim = 0;
        var mes = gap_inicial_quinzena.getMonth() + 1;
        var data = gap_inicial_quinzena;
        inicio = gap_inicial_quinzena.getDate() <= 15 ? 2 * mes : 2 * mes + 1;
        var mes = gap_final_quinzena.getMonth() + 1;
        fim = gap_final_quinzena.getDate() <= 15 ? 2 * mes + 24 * (gap_final_quinzena.getFullYear() - gap_inicial_quinzena.getFullYear()) : 2 * mes + 1 + 24 * (gap_final_quinzena.getFullYear() - gap_inicial_quinzena.getFullYear());
        var intervalo = fim - inicio;
        var quinzena = 0;
        for (var i = inicio; fim > i; i++) {
            data.setMonth(Math.ceil(i / 2));
            mes = data.getMonth();
            if (i % 2 == 1) {
                primeiro = 1;
                ultimodia = 15;
                data.setDate(ultimodia);
            } else {
                primeiro = 16;
                var tmp = new Date(data.getFullYear(), mes, 0);
                ultimodia = tmp.getDate();
                data.setDate(ultimodia);
            }
            var primeiro_mes = data.getMonth() + 1;
            var ultimo_mes = data.getMonth() + 1;
            quinzena = i - 24 * (data.getFullYear() - gap_inicial_quinzena.getFullYear());
            var text = quinzena + "/" + data.getFullYear() + "\nEntrega:\n/" + primeiro_mes + " à " + ultimodia + "/" + ultimo_mes;
            var salvar_data = data.getFullYear() + "-" + checkdecimal(data.getMonth() + 1) + "-" + checkdecimal(data.getDate());
            var display_data = quinzena + " Quinzena";
            addDate(text, "quinzena", salvar_data, display_data);
            usoQuinzena = true;
        }
        recountDates();
    }
    function showDates() {
        $.view_mes.right = "-100%";
        $.view_semana.right = "-100%";
        $.view_quinzena.right = "-100%";
        $.periodo_label_mes.hide();
        $.periodo_label_semana.hide();
        $.periodo_label_quinzena.hide();
        current_prazo = next_prazo;
        switch (current_prazo) {
          case "mensal":
            $.view_mes.right = "14%";
            $.view_mes.show();
            $.periodo_label_mes.show();
            true == usoSemana ? next_prazo = "semanal" : true == usoQuinzena ? next_prazo = "quinzena" : $.seta.hide();
            break;

          case "semanal":
            $.view_semana.right = "14%";
            $.view_semana.show();
            $.periodo_label_semana.show();
            true == usoQuinzena ? next_prazo = "quinzena" : true == usoMes ? next_prazo = "mensal" : $.seta.hide();
            break;

          case "quinzena":
            $.view_quinzena.right = "14%";
            $.view_quinzena.show();
            $.periodo_label_quinzena.show();
            true == usoMes ? next_prazo = "mensal" : true == usoSemana ? next_prazo = "semanal" : $.seta.hide();
        }
        recountDates();
    }
    function fechar() {
        if (1 >= restantes_marcar) {
            alert("Produtos incluidos com sucesso no pedido.");
            $.pagamento.show();
        } else alert("Seleção de produtos pendente");
    }
    function pagamento() {
        goTo("pagamento");
    }
    function comprando() {
        goTo("categorias");
    }
    function voltar() {
        goTo("calculadora");
    }
    function recountDates() {
        total_periodo = 0;
        restantes_marcar = 0;
        for (var i = 0; i < datas_inicio.length; i++) {
            0 == datas_selected[i] && restantes_marcar++;
            datas_prazos[i] == current_prazo && total_periodo++;
        }
        $.total_pedidos.title = "" + total_pedidos;
        $.disponiveis.title = "" + total_periodo;
        $.restantes.title = "" + restantes_marcar;
    }
    function addDate(text, prazo, periodo, display_value) {
        var view = Titanium.UI.createLabel({
            backgroundColor: "#414243",
            borderWidth: "1",
            borderColor: "#e71123",
            color: "#ffffff",
            height: "80%",
            width: 80,
            left: 3,
            font: {
                fontSize: 13
            },
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            text: text,
            prazo: prazo,
            periodo: periodo,
            display_value: display_value
        });
        view.addEventListener("click", function(e) {
            e.source.backgroundColor = "#F8F419";
            e.source.color = "#000000";
            if (previousPeriodButton && previousPeriodButton != e.source) {
                previousPeriodButton.backgroundColor = "#414243";
                previousPeriodButton.color = "#ffffff";
            }
            previousPeriodButton = e.source;
            selecionaPeriodo(e.source.prazo, e.source.periodo, e.source.display_value);
        });
        switch (prazo) {
          case "mensal":
            $.periodo_mes.add(view);
            break;

          case "semanal":
            $.periodo_semana.add(view);
            break;

          case "quinzena":
            $.periodo_quinzena.add(view);
        }
    }
    function limparMarcacao() {
        prazo_selecionado = "";
        data_selecionada = "";
        for (var i = 0; i < datas_inicio.length; i++) {
            datas_labels[i].backgroundColor = "transparent";
            datas_selected[i] = 0;
        }
        recountDates();
    }
    function selecionaPeriodo(prazo, periodo, display_value) {
        for (var i = 0; i < datas_inicio.length; i++) {
            var data_inicio = new Date(datas_inicio[i]);
            var data_fim = new Date(datas_fim[i]);
            var data_selected = new Date(periodo);
            prazo_selecionado = prazo;
            data_selecionada = data_selected.getFullYear() + "-" + checkdecimal(data_selected.getMonth() + 1) + "-" + checkdecimal(data_selected.getDate());
            if (datas_prazos[i] == prazo && data_selected >= data_inicio && data_fim >= data_selected) if ("transparent" == datas_labels[i].backgroundColor) {
                datas_labels[i].backgroundColor = "#f8f419";
                datas_labels[i].text = display_value;
            } else if ("#f8f419" == datas_labels[i].backgroundColor) if (data_selecionada == data_confirmada) {
                datas_labels[i].backgroundColor = "#81dd1f";
                datas_selected[i] = 1;
                updatePeriod(datas_labels[i].car_id, periodo, datas_prazos[i]);
            } else {
                datas_labels[i].backgroundColor = "#f8f419";
                datas_labels[i].text = display_value;
            }
        }
        recountDates();
        data_confirmada = data_selecionada;
    }
    function updatePeriod(car_id, periodo, prazo) {
        var data = new Date(periodo);
        var data_save = "";
        data_save = data.getFullYear() + checkdecimal(data.getMonth() + 1) + checkdecimal(data.getDate());
        updateCarrinhoPeriod(car_id, data_save, prazo);
    }
    function setGap(inicio, fim, prazo) {
        var data_inicio = new Date(inicio);
        var data_fim = new Date(fim);
        var today = new Date();
        today >= data_inicio && (data_inicio = today);
        switch (prazo) {
          case "mensal":
            gap_inicial_mes >= data_inicio && (gap_inicial_mes = data_inicio);
            data_fim >= gap_final_mes && (gap_final_mes = data_fim);
            break;

          case "semanal":
            gap_inicial_semana >= data_inicio && (gap_inicial_semana = data_inicio);
            data_fim >= gap_final_semana && (gap_final_semana = data_fim);
            break;

          case "quinzena":
            gap_inicial_quinzena >= data_inicio && (gap_inicial_quinzena = data_inicio);
            data_fim >= gap_final_quinzena && (gap_final_quinzena = data_fim);
        }
    }
    function getWeekOfYear(d) {
        var day = getDayOfYear(d);
        var week = Math.ceil(day / 7);
        return week;
    }
    function getDayOfYear(d) {
        var yn = d.getFullYear();
        var mn = d.getMonth();
        var dn = d.getDate();
        var d1 = new Date(yn, 0, 1, 12, 0, 0);
        var d2 = new Date(yn, mn, dn, 12, 0, 0);
        var ddiff = Math.round((d2 - d1) / 864e5);
        return ddiff + 1;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "carrinho";
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
    $.__views.carrinho = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "carrinho"
    });
    $.__views.carrinho && $.addTopLevelView($.__views.carrinho);
    $.__views.__alloyId53 = Ti.UI.createView({
        height: "16%",
        top: "0%",
        width: "100%",
        id: "__alloyId53"
    });
    $.__views.carrinho.add($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#b4282d",
        borderWidth: "1",
        color: "#b4282d",
        font: {
            fontSize: 13
        },
        height: "50%",
        left: "1%",
        top: "10%",
        width: "7%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Total de produtos",
        id: "__alloyId54"
    });
    $.__views.__alloyId53.add($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#b4282d",
        borderWidth: "1",
        color: "#b4282d",
        font: {
            fontSize: 13
        },
        height: "50%",
        left: "8%",
        top: "10%",
        width: "7%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Disponíveis no período",
        id: "__alloyId55"
    });
    $.__views.__alloyId53.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#b4282d",
        borderWidth: "1",
        color: "#b4282d",
        font: {
            fontSize: 13
        },
        height: "50%",
        left: "15%",
        top: "10%",
        width: "7%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Restantes para marcar",
        id: "__alloyId56"
    });
    $.__views.__alloyId53.add($.__views.__alloyId56);
    $.__views.total_pedidos = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        borderColor: "#b4282d",
        borderWidth: "1",
        color: "#b4282d",
        font: {
            fontSize: 13
        },
        height: "40%",
        left: "1%",
        top: "60%",
        width: "7%",
        title: "0",
        id: "total_pedidos"
    });
    $.__views.__alloyId53.add($.__views.total_pedidos);
    $.__views.disponiveis = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        borderColor: "#b4282d",
        borderWidth: "1",
        color: "#b4282d",
        font: {
            fontSize: 13
        },
        height: "40%",
        left: "8%",
        top: "60%",
        width: "7%",
        title: "0",
        id: "disponiveis"
    });
    $.__views.__alloyId53.add($.__views.disponiveis);
    $.__views.restantes = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        borderColor: "#b4282d",
        borderWidth: "1",
        color: "#b4282d",
        font: {
            fontSize: 13
        },
        height: "40%",
        left: "15%",
        top: "60%",
        width: "7%",
        title: "0",
        id: "restantes"
    });
    $.__views.__alloyId53.add($.__views.restantes);
    $.__views.__alloyId57 = Ti.UI.createLabel({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "40%",
        left: "24%",
        top: "10%",
        width: "9%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Limpar marcação",
        id: "__alloyId57"
    });
    $.__views.__alloyId53.add($.__views.__alloyId57);
    limparMarcacao ? $.__views.__alloyId57.addEventListener("click", limparMarcacao) : __defers["$.__views.__alloyId57!click!limparMarcacao"] = true;
    $.__views.__alloyId58 = Ti.UI.createLabel({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        bottom: "0%",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "40%",
        left: "24%",
        width: "9%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Continuar comprando",
        id: "__alloyId58"
    });
    $.__views.__alloyId53.add($.__views.__alloyId58);
    comprando ? $.__views.__alloyId58.addEventListener("click", comprando) : __defers["$.__views.__alloyId58!click!comprando"] = true;
    $.__views.periodo_label_mes = Ti.UI.createLabel({
        height: "90%",
        right: "64%",
        top: "10%",
        color: "#ff0000",
        font: {
            fontSize: 16
        },
        text: "Mês",
        id: "periodo_label_mes"
    });
    $.__views.__alloyId53.add($.__views.periodo_label_mes);
    $.__views.periodo_label_semana = Ti.UI.createLabel({
        height: "90%",
        right: "63%",
        top: "10%",
        color: "#ff0000",
        font: {
            fontSize: 16
        },
        text: "Semana",
        id: "periodo_label_semana",
        visible: "false"
    });
    $.__views.__alloyId53.add($.__views.periodo_label_semana);
    $.__views.periodo_label_quinzena = Ti.UI.createLabel({
        height: "90%",
        right: "62%",
        top: "10%",
        color: "#ff0000",
        font: {
            fontSize: 16
        },
        text: "Quinzena",
        id: "periodo_label_quinzena",
        visible: "false"
    });
    $.__views.__alloyId53.add($.__views.periodo_label_quinzena);
    $.__views.view_semana = Ti.UI.createView({
        height: "90%",
        right: "-100%",
        top: "10%",
        width: "50%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        layout: "horizontal",
        id: "view_semana"
    });
    $.__views.__alloyId53.add($.__views.view_semana);
    $.__views.periodo_semana = Ti.UI.createScrollView({
        height: "100%",
        contentWidth: "auto",
        contentHeight: "auto",
        scrollType: "horizontal",
        layout: "horizontal",
        showHorizontalScrollIndicator: true,
        id: "periodo_semana"
    });
    $.__views.view_semana.add($.__views.periodo_semana);
    $.__views.__alloyId59 = Ti.UI.createLabel({
        backgroundColor: "#414243",
        borderWidth: "1",
        borderColor: "#e71123",
        color: "#ffffff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "80%",
        width: "80",
        text: "05/2015 Entrega: 01 à 31",
        id: "__alloyId59"
    });
    $.__views.periodo_semana.add($.__views.__alloyId59);
    $.__views.view_quinzena = Ti.UI.createView({
        height: "90%",
        right: "-100%",
        top: "10%",
        width: "50%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        layout: "horizontal",
        id: "view_quinzena"
    });
    $.__views.__alloyId53.add($.__views.view_quinzena);
    $.__views.periodo_quinzena = Ti.UI.createScrollView({
        height: "100%",
        contentWidth: "auto",
        contentHeight: "auto",
        scrollType: "horizontal",
        layout: "horizontal",
        showHorizontalScrollIndicator: true,
        id: "periodo_quinzena"
    });
    $.__views.view_quinzena.add($.__views.periodo_quinzena);
    $.__views.__alloyId60 = Ti.UI.createLabel({
        backgroundColor: "#414243",
        borderWidth: "1",
        borderColor: "#e71123",
        color: "#ffffff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "80%",
        width: "80",
        text: "05/2015 Entrega: 01 à 31",
        id: "__alloyId60"
    });
    $.__views.periodo_quinzena.add($.__views.__alloyId60);
    $.__views.view_mes = Ti.UI.createView({
        height: "90%",
        right: "14%",
        top: "10%",
        width: "50%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        layout: "horizontal",
        id: "view_mes"
    });
    $.__views.__alloyId53.add($.__views.view_mes);
    $.__views.periodo_mes = Ti.UI.createScrollView({
        height: "100%",
        contentWidth: "auto",
        contentHeight: "auto",
        scrollType: "horizontal",
        layout: "horizontal",
        showHorizontalScrollIndicator: true,
        id: "periodo_mes"
    });
    $.__views.view_mes.add($.__views.periodo_mes);
    $.__views.__alloyId61 = Ti.UI.createLabel({
        backgroundColor: "#414243",
        borderWidth: "1",
        borderColor: "#e71123",
        color: "#ffffff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "80%",
        width: "80",
        text: "05/2015 Entrega: 01 à 31",
        id: "__alloyId61"
    });
    $.__views.periodo_mes.add($.__views.__alloyId61);
    $.__views.seta = Ti.UI.createImageView({
        height: "90%",
        right: "11%",
        top: "10%",
        image: "/images/seta.jpg",
        id: "seta"
    });
    $.__views.__alloyId53.add($.__views.seta);
    showDates ? $.__views.seta.addEventListener("load", showDates) : __defers["$.__views.seta!load!showDates"] = true;
    showDates ? $.__views.seta.addEventListener("click", showDates) : __defers["$.__views.seta!click!showDates"] = true;
    $.__views.__alloyId62 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        bottom: "20%",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "40%",
        right: "1%",
        width: "9%",
        title: "Fechar pedido",
        id: "__alloyId62"
    });
    $.__views.__alloyId53.add($.__views.__alloyId62);
    fechar ? $.__views.__alloyId62.addEventListener("click", fechar) : __defers["$.__views.__alloyId62!click!fechar"] = true;
    $.__views.__alloyId63 = Ti.UI.createLabel({
        top: "17%",
        color: "#008382",
        font: {
            fontSize: 25
        },
        left: "1%",
        text: "Meu Carrinho",
        id: "__alloyId63"
    });
    $.__views.carrinho.add($.__views.__alloyId63);
    $.__views.produto = Ti.UI.createView({
        height: "19%",
        top: "23%",
        layout: "horizontal",
        width: "99%",
        id: "produto"
    });
    $.__views.carrinho.add($.__views.produto);
    $.__views.__alloyId64 = Ti.UI.createView({
        height: "48%",
        top: "43%",
        width: "99%",
        id: "__alloyId64"
    });
    $.__views.carrinho.add($.__views.__alloyId64);
    $.__views.__alloyId65 = Ti.UI.createView({
        backgroundColor: "#008382",
        height: "10%",
        top: "0%",
        width: "100%",
        id: "__alloyId65"
    });
    $.__views.__alloyId64.add($.__views.__alloyId65);
    $.__views.__alloyId66 = Ti.UI.createLabel({
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "100%",
        left: "0%",
        width: "7%",
        text: "Produto",
        id: "__alloyId66"
    });
    $.__views.__alloyId65.add($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createLabel({
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "100%",
        left: "7%",
        width: "10%",
        text: "Ref.",
        id: "__alloyId67"
    });
    $.__views.__alloyId65.add($.__views.__alloyId67);
    $.__views.__alloyId68 = Ti.UI.createLabel({
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "100%",
        left: "17%",
        width: "5%",
        text: "Coleção",
        id: "__alloyId68"
    });
    $.__views.__alloyId65.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createLabel({
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "100%",
        left: "23%",
        width: "7%",
        text: "Prazo de entrega",
        id: "__alloyId69"
    });
    $.__views.__alloyId65.add($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createLabel({
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "100%",
        left: "30%",
        width: "3%",
        text: "Tam.",
        id: "__alloyId70"
    });
    $.__views.__alloyId65.add($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createLabel({
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "100%",
        left: "33%",
        width: "7%",
        text: "Preço Unit.",
        id: "__alloyId71"
    });
    $.__views.__alloyId65.add($.__views.__alloyId71);
    $.__views.__alloyId72 = Ti.UI.createLabel({
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "100%",
        left: "40%",
        width: "4%",
        text: "Peso",
        id: "__alloyId72"
    });
    $.__views.__alloyId65.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createLabel({
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "100%",
        left: "44%",
        width: "16%",
        text: "Cubagem AxLxP",
        id: "__alloyId73"
    });
    $.__views.__alloyId65.add($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createLabel({
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "100%",
        left: "60%",
        width: "6%",
        text: "Quant. de peças",
        id: "__alloyId74"
    });
    $.__views.__alloyId65.add($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createLabel({
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "100%",
        left: "66%",
        width: "6%",
        text: "Estoque",
        id: "__alloyId75"
    });
    $.__views.__alloyId65.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createLabel({
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "100%",
        left: "72%",
        width: "7%",
        text: "Preço total",
        id: "__alloyId76"
    });
    $.__views.__alloyId65.add($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createLabel({
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "100%",
        left: "79%",
        width: "7%",
        text: "IPI",
        id: "__alloyId77"
    });
    $.__views.__alloyId65.add($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createLabel({
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "100%",
        left: "86%",
        width: "6%",
        text: "S.T.",
        id: "__alloyId78"
    });
    $.__views.__alloyId65.add($.__views.__alloyId78);
    $.__views.__alloyId79 = Ti.UI.createLabel({
        backgroundColor: "#008382",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "100%",
        left: "92%",
        width: "8%",
        text: "Valor final do produto",
        id: "__alloyId79"
    });
    $.__views.__alloyId65.add($.__views.__alloyId79);
    var __alloyId80 = {};
    var __alloyId83 = [];
    var __alloyId85 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId86 = [];
            var __alloyId88 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId89 = [];
                    var __alloyId91 = {
                        type: "Ti.UI.ImageView",
                        bindId: "imagem_produto",
                        properties: {
                            height: "95%",
                            bindId: "imagem_produto"
                        }
                    };
                    __alloyId89.push(__alloyId91);
                    return __alloyId89;
                }(),
                properties: {
                    width: "7%"
                }
            };
            __alloyId86.push(__alloyId88);
            var __alloyId93 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId86.push(__alloyId93);
            var __alloyId95 = {
                type: "Ti.UI.Label",
                bindId: "label_ref",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "10%",
                    font: {
                        fontSize: 9
                    },
                    color: "black",
                    bindId: "label_ref"
                }
            };
            __alloyId86.push(__alloyId95);
            var __alloyId97 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId86.push(__alloyId97);
            var __alloyId99 = {
                type: "Ti.UI.Label",
                bindId: "label_colecao",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "5%",
                    font: {
                        fontSize: 9
                    },
                    color: "black",
                    bindId: "label_colecao"
                }
            };
            __alloyId86.push(__alloyId99);
            var __alloyId101 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId86.push(__alloyId101);
            var __alloyId103 = {
                type: "Ti.UI.Label",
                bindId: "label_prazo",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    font: {
                        fontSize: 9
                    },
                    color: "black",
                    bindId: "label_prazo"
                }
            };
            __alloyId86.push(__alloyId103);
            var __alloyId105 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId86.push(__alloyId105);
            var __alloyId107 = {
                type: "Ti.UI.Label",
                bindId: "label_tam",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "3%",
                    font: {
                        fontSize: 9
                    },
                    color: "black",
                    bindId: "label_tam"
                }
            };
            __alloyId86.push(__alloyId107);
            var __alloyId109 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId86.push(__alloyId109);
            var __alloyId111 = {
                type: "Ti.UI.Label",
                bindId: "label_preco",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    font: {
                        fontSize: 9
                    },
                    color: "black",
                    bindId: "label_preco"
                }
            };
            __alloyId86.push(__alloyId111);
            var __alloyId113 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId86.push(__alloyId113);
            var __alloyId115 = {
                type: "Ti.UI.Label",
                bindId: "label_peso",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "4%",
                    font: {
                        fontSize: 9
                    },
                    color: "black",
                    bindId: "label_peso"
                }
            };
            __alloyId86.push(__alloyId115);
            var __alloyId117 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId86.push(__alloyId117);
            var __alloyId119 = {
                type: "Ti.UI.Label",
                bindId: "label_cubagem",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "16%",
                    font: {
                        fontSize: 9
                    },
                    color: "black",
                    bindId: "label_cubagem"
                }
            };
            __alloyId86.push(__alloyId119);
            var __alloyId121 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId86.push(__alloyId121);
            var __alloyId123 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId124 = [];
                    var __alloyId126 = {
                        type: "Ti.UI.Button",
                        properties: {
                            left: 3,
                            top: 5,
                            height: 25,
                            width: 25,
                            font: {
                                fontSize: 11
                            },
                            backgroundColor: "#c0c0c0",
                            color: "black",
                            title: "+"
                        },
                        events: {
                            click: adiciona_quantidade
                        }
                    };
                    __alloyId124.push(__alloyId126);
                    var __alloyId128 = {
                        type: "Ti.UI.Label",
                        bindId: "label_quant",
                        properties: {
                            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                            color: "black",
                            bindId: "label_quant"
                        }
                    };
                    __alloyId124.push(__alloyId128);
                    var __alloyId130 = {
                        type: "Ti.UI.Button",
                        properties: {
                            left: 3,
                            bottom: 5,
                            height: 25,
                            width: 25,
                            font: {
                                fontSize: 11
                            },
                            backgroundColor: "#c0c0c0",
                            color: "black",
                            title: "-"
                        },
                        events: {
                            click: subtrai_quantidade
                        }
                    };
                    __alloyId124.push(__alloyId130);
                    var __alloyId132 = {
                        type: "Ti.UI.ImageView",
                        properties: {
                            right: 3,
                            bottom: 3,
                            height: 25,
                            width: 25,
                            image: "/images/btn_excluir.png"
                        },
                        events: {
                            click: exclui_item
                        }
                    };
                    __alloyId124.push(__alloyId132);
                    return __alloyId124;
                }(),
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "6%",
                    color: "black",
                    font: {
                        fontSize: 9
                    },
                    backgroundColor: "white"
                }
            };
            __alloyId86.push(__alloyId123);
            var __alloyId134 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId86.push(__alloyId134);
            var __alloyId136 = {
                type: "Ti.UI.Label",
                bindId: "label_estoque",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "6%",
                    font: {
                        fontSize: 10
                    },
                    color: "black",
                    bindId: "label_estoque"
                }
            };
            __alloyId86.push(__alloyId136);
            var __alloyId138 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId86.push(__alloyId138);
            var __alloyId140 = {
                type: "Ti.UI.Label",
                bindId: "label_precototal",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    font: {
                        fontSize: 10
                    },
                    color: "black",
                    bindId: "label_precototal"
                }
            };
            __alloyId86.push(__alloyId140);
            var __alloyId142 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId86.push(__alloyId142);
            var __alloyId144 = {
                type: "Ti.UI.Label",
                bindId: "label_ipi",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    font: {
                        fontSize: 10
                    },
                    color: "black",
                    bindId: "label_ipi"
                }
            };
            __alloyId86.push(__alloyId144);
            var __alloyId146 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId86.push(__alloyId146);
            var __alloyId148 = {
                type: "Ti.UI.Label",
                bindId: "label_sustrib",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "6%",
                    font: {
                        fontSize: 10
                    },
                    color: "black",
                    bindId: "label_sustrib"
                }
            };
            __alloyId86.push(__alloyId148);
            var __alloyId150 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId86.push(__alloyId150);
            var __alloyId152 = {
                type: "Ti.UI.Label",
                bindId: "label_valorfinal",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "6%",
                    font: {
                        fontSize: 10
                    },
                    color: "black",
                    bindId: "label_valorfinal"
                }
            };
            __alloyId86.push(__alloyId152);
            return __alloyId86;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId83.push(__alloyId85);
    var __alloyId82 = {
        properties: {
            width: "100%",
            backgroundColor: "#EBEBEB",
            height: 100,
            name: "pedido_lista_escuro"
        },
        childTemplates: __alloyId83
    };
    __alloyId80["pedido_lista_escuro"] = __alloyId82;
    var __alloyId155 = [];
    var __alloyId157 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId158 = [];
            var __alloyId160 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId161 = [];
                    var __alloyId163 = {
                        type: "Ti.UI.ImageView",
                        bindId: "imagem_produto",
                        properties: {
                            height: "95%",
                            bindId: "imagem_produto"
                        }
                    };
                    __alloyId161.push(__alloyId163);
                    return __alloyId161;
                }(),
                properties: {
                    width: "7%"
                }
            };
            __alloyId158.push(__alloyId160);
            var __alloyId165 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId158.push(__alloyId165);
            var __alloyId167 = {
                type: "Ti.UI.Label",
                bindId: "label_ref",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "10%",
                    font: {
                        fontSize: 9
                    },
                    color: "black",
                    bindId: "label_ref"
                }
            };
            __alloyId158.push(__alloyId167);
            var __alloyId169 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId158.push(__alloyId169);
            var __alloyId171 = {
                type: "Ti.UI.Label",
                bindId: "label_colecao",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "5%",
                    font: {
                        fontSize: 9
                    },
                    color: "black",
                    bindId: "label_colecao"
                }
            };
            __alloyId158.push(__alloyId171);
            var __alloyId173 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId158.push(__alloyId173);
            var __alloyId175 = {
                type: "Ti.UI.Label",
                bindId: "label_prazo",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    font: {
                        fontSize: 9
                    },
                    color: "black",
                    bindId: "label_prazo"
                }
            };
            __alloyId158.push(__alloyId175);
            var __alloyId177 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId158.push(__alloyId177);
            var __alloyId179 = {
                type: "Ti.UI.Label",
                bindId: "label_tam",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "3%",
                    font: {
                        fontSize: 9
                    },
                    color: "black",
                    bindId: "label_tam"
                }
            };
            __alloyId158.push(__alloyId179);
            var __alloyId181 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId158.push(__alloyId181);
            var __alloyId183 = {
                type: "Ti.UI.Label",
                bindId: "label_preco",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    font: {
                        fontSize: 9
                    },
                    color: "black",
                    bindId: "label_preco"
                }
            };
            __alloyId158.push(__alloyId183);
            var __alloyId185 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId158.push(__alloyId185);
            var __alloyId187 = {
                type: "Ti.UI.Label",
                bindId: "label_peso",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "4%",
                    font: {
                        fontSize: 9
                    },
                    color: "black",
                    bindId: "label_peso"
                }
            };
            __alloyId158.push(__alloyId187);
            var __alloyId189 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId158.push(__alloyId189);
            var __alloyId191 = {
                type: "Ti.UI.Label",
                bindId: "label_cubagem",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "16%",
                    font: {
                        fontSize: 9
                    },
                    color: "black",
                    bindId: "label_cubagem"
                }
            };
            __alloyId158.push(__alloyId191);
            var __alloyId193 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId158.push(__alloyId193);
            var __alloyId195 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId196 = [];
                    var __alloyId198 = {
                        type: "Ti.UI.Button",
                        properties: {
                            left: 3,
                            top: 5,
                            height: 25,
                            width: 25,
                            font: {
                                fontSize: 11
                            },
                            backgroundColor: "#c0c0c0",
                            color: "black",
                            title: "+"
                        },
                        events: {
                            click: adiciona_quantidade
                        }
                    };
                    __alloyId196.push(__alloyId198);
                    var __alloyId200 = {
                        type: "Ti.UI.Label",
                        bindId: "label_quant",
                        properties: {
                            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                            color: "black",
                            bindId: "label_quant"
                        }
                    };
                    __alloyId196.push(__alloyId200);
                    var __alloyId202 = {
                        type: "Ti.UI.Button",
                        properties: {
                            left: 3,
                            bottom: 5,
                            height: 25,
                            width: 25,
                            font: {
                                fontSize: 11
                            },
                            backgroundColor: "#c0c0c0",
                            color: "black",
                            title: "-"
                        },
                        events: {
                            click: subtrai_quantidade
                        }
                    };
                    __alloyId196.push(__alloyId202);
                    var __alloyId204 = {
                        type: "Ti.UI.ImageView",
                        properties: {
                            right: 3,
                            bottom: 3,
                            height: 25,
                            width: 25,
                            image: "/images/btn_excluir.png"
                        },
                        events: {
                            click: exclui_item
                        }
                    };
                    __alloyId196.push(__alloyId204);
                    return __alloyId196;
                }(),
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "6%",
                    color: "black",
                    font: {
                        fontSize: 9
                    },
                    backgroundColor: "white"
                }
            };
            __alloyId158.push(__alloyId195);
            var __alloyId206 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId158.push(__alloyId206);
            var __alloyId208 = {
                type: "Ti.UI.Label",
                bindId: "label_estoque",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "6%",
                    font: {
                        fontSize: 10
                    },
                    color: "black",
                    bindId: "label_estoque"
                }
            };
            __alloyId158.push(__alloyId208);
            var __alloyId210 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId158.push(__alloyId210);
            var __alloyId212 = {
                type: "Ti.UI.Label",
                bindId: "label_precototal",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    font: {
                        fontSize: 10
                    },
                    color: "black",
                    bindId: "label_precototal"
                }
            };
            __alloyId158.push(__alloyId212);
            var __alloyId214 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId158.push(__alloyId214);
            var __alloyId216 = {
                type: "Ti.UI.Label",
                bindId: "label_ipi",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "7%",
                    font: {
                        fontSize: 10
                    },
                    color: "black",
                    bindId: "label_ipi"
                }
            };
            __alloyId158.push(__alloyId216);
            var __alloyId218 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId158.push(__alloyId218);
            var __alloyId220 = {
                type: "Ti.UI.Label",
                bindId: "label_sustrib",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "6%",
                    font: {
                        fontSize: 10
                    },
                    color: "black",
                    bindId: "label_sustrib"
                }
            };
            __alloyId158.push(__alloyId220);
            var __alloyId222 = {
                type: "Ti.UI.View",
                properties: {
                    width: 1,
                    height: "100%",
                    backgroundColor: "black"
                }
            };
            __alloyId158.push(__alloyId222);
            var __alloyId224 = {
                type: "Ti.UI.Label",
                bindId: "label_valorfinal",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "6%",
                    font: {
                        fontSize: 10
                    },
                    color: "black",
                    bindId: "label_valorfinal"
                }
            };
            __alloyId158.push(__alloyId224);
            return __alloyId158;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId155.push(__alloyId157);
    var __alloyId154 = {
        properties: {
            width: "100%",
            backgroundColor: "#FBFBFB",
            height: 100,
            name: "pedido_lista_claro"
        },
        childTemplates: __alloyId155
    };
    __alloyId80["pedido_lista_claro"] = __alloyId154;
    $.__views.__alloyId225 = Ti.UI.createListSection({
        id: "__alloyId225"
    });
    var __alloyId227 = [];
    __alloyId227.push($.__views.__alloyId225);
    $.__views.listapedidos = Ti.UI.createListView({
        width: "99%",
        height: "80%",
        top: "10%",
        sections: __alloyId227,
        templates: __alloyId80,
        id: "listapedidos",
        defaultItemTemplate: "pedido_lista"
    });
    $.__views.__alloyId64.add($.__views.listapedidos);
    $.__views.__alloyId228 = Ti.UI.createView({
        backgroundColor: "#008382",
        height: "10%",
        layout: "horizontal",
        top: "90%",
        width: "99%",
        id: "__alloyId228"
    });
    $.__views.__alloyId64.add($.__views.__alloyId228);
    $.__views.__alloyId229 = Ti.UI.createView({
        width: 1,
        height: "100%",
        id: "__alloyId229"
    });
    $.__views.__alloyId228.add($.__views.__alloyId229);
    $.__views.__alloyId230 = Ti.UI.createView({
        width: 1,
        height: "100%",
        id: "__alloyId230"
    });
    $.__views.__alloyId228.add($.__views.__alloyId230);
    $.__views.__alloyId231 = Ti.UI.createView({
        width: 1,
        height: "100%",
        id: "__alloyId231"
    });
    $.__views.__alloyId228.add($.__views.__alloyId231);
    $.__views.__alloyId232 = Ti.UI.createView({
        width: 1,
        height: "100%",
        id: "__alloyId232"
    });
    $.__views.__alloyId228.add($.__views.__alloyId232);
    $.__views.__alloyId233 = Ti.UI.createView({
        width: 1,
        height: "100%",
        id: "__alloyId233"
    });
    $.__views.__alloyId228.add($.__views.__alloyId233);
    $.__views.__alloyId234 = Ti.UI.createLabel({
        color: "#ffffff",
        font: {
            fontSize: "14"
        },
        height: "100%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        width: "39%",
        text: "SOMA DOS TOTAIS:",
        id: "__alloyId234"
    });
    $.__views.__alloyId228.add($.__views.__alloyId234);
    $.__views.__alloyId235 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId235"
    });
    $.__views.__alloyId228.add($.__views.__alloyId235);
    $.__views.__alloyId236 = Ti.UI.createView({
        width: 1,
        height: "100%",
        id: "__alloyId236"
    });
    $.__views.__alloyId228.add($.__views.__alloyId236);
    $.__views.__alloyId237 = Ti.UI.createView({
        width: 1,
        height: "100%",
        id: "__alloyId237"
    });
    $.__views.__alloyId228.add($.__views.__alloyId237);
    $.__views.__alloyId238 = Ti.UI.createView({
        width: 1,
        height: "100%",
        id: "__alloyId238"
    });
    $.__views.__alloyId228.add($.__views.__alloyId238);
    $.__views.__alloyId239 = Ti.UI.createView({
        width: 1,
        height: "100%",
        id: "__alloyId239"
    });
    $.__views.__alloyId228.add($.__views.__alloyId239);
    $.__views.label_totalPreco = Ti.UI.createLabel({
        color: "#ffffff",
        font: {
            fontSize: "14"
        },
        height: "100%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        width: "39%",
        id: "label_totalPreco"
    });
    $.__views.__alloyId228.add($.__views.label_totalPreco);
    $.__views.__alloyId240 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId240"
    });
    $.__views.__alloyId228.add($.__views.__alloyId240);
    $.__views.label_totalIpi = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "7%",
        font: {
            fontSize: 10
        },
        color: "#ffffff",
        id: "label_totalIpi"
    });
    $.__views.__alloyId228.add($.__views.label_totalIpi);
    $.__views.__alloyId241 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId241"
    });
    $.__views.__alloyId228.add($.__views.__alloyId241);
    $.__views.__alloyId242 = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "6%",
        font: {
            fontSize: 10
        },
        color: "black",
        id: "__alloyId242"
    });
    $.__views.__alloyId228.add($.__views.__alloyId242);
    $.__views.__alloyId243 = Ti.UI.createView({
        width: 1,
        height: "100%",
        backgroundColor: "black",
        id: "__alloyId243"
    });
    $.__views.__alloyId228.add($.__views.__alloyId243);
    $.__views.label_totalComIPI = Ti.UI.createLabel({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "6%",
        font: {
            fontSize: 10
        },
        color: "#ffffff",
        id: "label_totalComIPI"
    });
    $.__views.__alloyId228.add($.__views.label_totalComIPI);
    $.__views.__alloyId244 = Ti.UI.createView({
        backgroundColor: "#59595b",
        bottom: "1%",
        height: "7%",
        width: "99%",
        id: "__alloyId244"
    });
    $.__views.carrinho.add($.__views.__alloyId244);
    $.__views.__alloyId245 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        bottom: "10%",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "80%",
        left: "1%",
        width: "10%",
        title: "Voltar",
        id: "__alloyId245"
    });
    $.__views.__alloyId244.add($.__views.__alloyId245);
    voltar ? $.__views.__alloyId245.addEventListener("click", voltar) : __defers["$.__views.__alloyId245!click!voltar"] = true;
    $.__views.pagamento = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        bottom: "10%",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        height: "80%",
        left: "13%",
        width: "10%",
        title: "Ir para pagamento",
        id: "pagamento"
    });
    $.__views.__alloyId244.add($.__views.pagamento);
    pagamento ? $.__views.pagamento.addEventListener("click", pagamento) : __defers["$.__views.pagamento!click!pagamento"] = true;
    $.__views.valor_total = Ti.UI.createButton({
        backgroundColor: "#59595b",
        bottom: "10%",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "80%",
        right: "1%",
        width: "30%",
        title: "Valor total do pedido: R$ 0.00",
        id: "valor_total"
    });
    $.__views.__alloyId244.add($.__views.valor_total);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/carrinho.js");
    Ti.include("/database/imagens_produtos.js");
    var total_pedidos = 0;
    var count = 0;
    var data = [];
    var data_inicial = "2020-01-01";
    var data_final = "2000-01-01";
    var gap_inicial_mes = new Date(data_inicial);
    var gap_final_mes = new Date(data_final);
    var gap_inicial_semana = new Date(data_inicial);
    var gap_final_semana = new Date(data_final);
    var gap_inicial_quinzena = new Date(data_inicial);
    var gap_final_quinzena = new Date(data_final);
    var totalSemIPI = 0;
    var totalIPI = 0;
    var datas_inicio = [];
    var datas_fim = [];
    var datas_prazos = [];
    var datas_labels = [];
    var datas_selected = [];
    var views_imagens = [];
    var current_prazo = "mensal";
    var next_prazo = "mensal";
    var total_periodo = 0;
    var restantes_marcar = 0;
    var data_selecionada;
    var data_confirmada;
    var prazo_selecionado;
    $.periodo_label_mes.transform = Ti.UI.create2DMatrix().rotate(-90);
    $.periodo_label_semana.transform = Ti.UI.create2DMatrix().rotate(-90);
    $.periodo_label_quinzena.transform = Ti.UI.create2DMatrix().rotate(-90);
    var usoMes = false;
    var usoSemana = false;
    var usoQuinzena = false;
    var previousPeriodButton;
    var carrinho = selecionaCarrinho();
    resultadoCarrinho(carrinho);
    $.label_totalPreco.text = formatCurrency(totalSemIPI);
    $.label_totalIpi.text = formatCurrency(totalIPI);
    var totalComIPI = totalSemIPI + totalIPI;
    $.label_totalComIPI.text = formatCurrency(totalComIPI);
    $.pagamento.hide();
    $.periodo_label_mes.hide();
    $.periodo_label_semana.hide();
    $.periodo_label_quinzena.hide();
    if (false == usoMes) {
        showDates();
        showDates();
    }
    __defers["$.__views.__alloyId57!click!limparMarcacao"] && $.__views.__alloyId57.addEventListener("click", limparMarcacao);
    __defers["$.__views.__alloyId58!click!comprando"] && $.__views.__alloyId58.addEventListener("click", comprando);
    __defers["$.__views.seta!load!showDates"] && $.__views.seta.addEventListener("load", showDates);
    __defers["$.__views.seta!click!showDates"] && $.__views.seta.addEventListener("click", showDates);
    __defers["$.__views.__alloyId62!click!fechar"] && $.__views.__alloyId62.addEventListener("click", fechar);
    __defers["$.__views.__alloyId245!click!voltar"] && $.__views.__alloyId245.addEventListener("click", voltar);
    __defers["$.__views.pagamento!click!pagamento"] && $.__views.pagamento.addEventListener("click", pagamento);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;