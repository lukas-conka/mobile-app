function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function cliente_ID_BASE(clientes_id) {
        iD_BASE(clientes_id);
    }
    function renderList() {
        while (carrinho.isValidRow()) {
            var car_id = carrinho.fieldByName("car_id");
            var car_quantidade = carrinho.fieldByName("car_quantidade");
            var car_preco_unitario = carrinho.fieldByName("car_preco_unitario");
            var prd_id = carrinho.fieldByName("prd_id");
            {
                carrinho.fieldByName("prd_nome");
            }
            var car_preco_unitario = carrinho.fieldByName("car_preco_unitario");
            var prd_referencia = carrinho.fieldByName("prd_referencia");
            var estoque = carrinho.fieldByName("ifp_estoque_2");
            {
                carrinho.fieldByName("prd_nome_colecao");
            }
            var tmh_nome = carrinho.fieldByName("tmh_nome");
            var cor_nome = carrinho.fieldByName("cor_nome");
            var fk_cores = carrinho.fieldByName("fk_cores");
            var fk_tamanhos = carrinho.fieldByName("fk_tamanhos");
            var car_ipi = carrinho.fieldByName("prd_ipi");
            var tmpl = carrinho.fieldByName("fk_template");
            valor_total += car_preco_unitario * car_quantidade;
            quantidade_total += car_quantidade;
            var label_cortamanho = cor_nome + " - " + tmh_nome;
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
            var arquivoImagem = getImagesFolder() + selectImagemPrincipal(prd_id);
            var arquivoImagem = getImagesFolder() + selectImagemPrincipal(prd_id);
            var file = Ti.Filesystem.getFile(arquivoImagem);
            file ? file.exists() || (arquivoImagem = notfound) : arquivoImagem = notfound;
            {
                Ti.UI.createLabel({
                    backgroundColor: "red",
                    color: "#ffffff",
                    font: {
                        fontSize: 13
                    },
                    height: "100%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "8%",
                    text: "cl_cnpj"
                });
            }
            var cliente_selected1 = getSelectedCheck(prd_id, fk_cores, fk_tamanhos, clientes[0]);
            var cliente_selected2 = getSelectedCheck(prd_id, fk_cores, fk_tamanhos, clientes[1]);
            var cliente_selected3 = getSelectedCheck(prd_id, fk_cores, fk_tamanhos, clientes[2]);
            var cliente_selected4 = getSelectedCheck(prd_id, fk_cores, fk_tamanhos, clientes[3]);
            var cliente_selected5 = getSelectedCheck(prd_id, fk_cores, fk_tamanhos, clientes[4]);
            var cliente_selected6 = getSelectedCheck(prd_id, fk_cores, fk_tamanhos, clientes[5]);
            var cliente_selected7 = getSelectedCheck(prd_id, fk_cores, fk_tamanhos, clientes[6]);
            quantidades.push(car_quantidade);
            data.push({
                car_id: car_id,
                car_quantidade: car_quantidade,
                estoque: estoque,
                prd_id: prd_id,
                fk_tamanhos: fk_tamanhos,
                fk_cores: fk_cores,
                car_preco_unitario: car_preco_unitario,
                view_produto: {
                    backgroundColor: cinza_claro
                },
                label_prod: {
                    text: label_cortamanho
                },
                imagem_produto: {
                    image: arquivoImagem
                },
                label_qtde: {
                    backgroundColor: cinza_escuro,
                    text: car_quantidade
                },
                label_preco: {
                    backgroundColor: cinza_claro,
                    text: car_preco_unitario
                },
                label_desconto: {
                    backgroundColor: cinza_escuro,
                    text: "0%"
                },
                label_ref: {
                    backgroundColor: cinza_claro,
                    text: prd_referencia
                },
                view_cliente1: {
                    prd_id: prd_id
                },
                label_cliente1: {
                    text: "Qtd.\n" + car_quantidade
                },
                seleciona_cliente1: {
                    prd_id: prd_id,
                    fk_tamanhos: fk_tamanhos,
                    fk_cores: fk_cores,
                    car_quantidade: Math.round(car_quantidade * sobrepedido[0] / 100),
                    car_preco_unitario: car_preco_unitario,
                    car_ipi: car_ipi,
                    image: cliente_selected1,
                    cliente: clientes[0]
                },
                view_cliente2: {
                    visible: cliente_visivel[1],
                    backgroundColor: cinza_claro,
                    cliente: 2
                },
                label_cliente2: {
                    text: "Qtd.\n" + car_quantidade
                },
                seleciona_cliente2: {
                    prd_id: prd_id,
                    fk_tamanhos: fk_tamanhos,
                    fk_cores: fk_cores,
                    car_preco_unitario: car_preco_unitario,
                    car_ipi: car_ipi,
                    car_quantidade: Math.round(car_quantidade * sobrepedido[1] / 100),
                    image: cliente_selected2,
                    cliente: clientes[1]
                },
                view_cliente3: {
                    visible: cliente_visivel[2],
                    backgroundColor: cinza_escuro,
                    cliente: 3
                },
                label_cliente3: {
                    text: "Qtd.\n" + car_quantidade
                },
                seleciona_cliente3: {
                    prd_id: prd_id,
                    fk_tamanhos: fk_tamanhos,
                    fk_cores: fk_cores,
                    car_preco_unitario: car_preco_unitario,
                    car_ipi: car_ipi,
                    car_quantidade: Math.round(car_quantidade * sobrepedido[2] / 100),
                    image: cliente_selected3,
                    cliente: clientes[2]
                },
                view_cliente4: {
                    visible: cliente_visivel[3],
                    backgroundColor: cinza_claro,
                    cliente: 4
                },
                label_cliente4: {
                    text: "Qtd.\n" + car_quantidade
                },
                seleciona_cliente4: {
                    prd_id: prd_id,
                    fk_tamanhos: fk_tamanhos,
                    fk_cores: fk_cores,
                    car_preco_unitario: car_preco_unitario,
                    car_ipi: car_ipi,
                    car_quantidade: Math.round(car_quantidade * sobrepedido[3] / 100),
                    image: cliente_selected4,
                    cliente: clientes[3]
                },
                view_cliente5: {
                    visible: cliente_visivel[4],
                    backgroundColor: cinza_escuro,
                    cliente: 5
                },
                label_cliente5: {
                    text: "Qtd.\n" + car_quantidade
                },
                seleciona_cliente5: {
                    prd_id: prd_id,
                    fk_tamanhos: fk_tamanhos,
                    fk_cores: fk_cores,
                    car_preco_unitario: car_preco_unitario,
                    car_ipi: car_ipi,
                    car_quantidade: Math.round(car_quantidade * sobrepedido[4] / 100),
                    image: cliente_selected5,
                    cliente: clientes[4]
                },
                view_cliente6: {
                    visible: cliente_visivel[5],
                    backgroundColor: cinza_claro,
                    cliente: 6
                },
                label_cliente6: {
                    text: "Qtd.\n" + car_quantidade
                },
                seleciona_cliente6: {
                    prd_id: prd_id,
                    fk_tamanhos: fk_tamanhos,
                    fk_cores: fk_cores,
                    car_preco_unitario: car_preco_unitario,
                    car_ipi: car_ipi,
                    car_quantidade: Math.round(car_quantidade * sobrepedido[5] / 100),
                    image: cliente_selected6,
                    cliente: clientes[5]
                },
                view_cliente7: {
                    visible: cliente_visivel[6],
                    backgroundColor: cinza_escuro,
                    cliente: 7
                },
                label_cliente7: {
                    text: "Qtd.\n" + car_quantidade
                },
                seleciona_cliente7: {
                    prd_id: prd_id,
                    fk_tamanhos: fk_tamanhos,
                    fk_cores: fk_cores,
                    car_preco_unitario: car_preco_unitario,
                    car_ipi: car_ipi,
                    car_quantidade: Math.round(car_quantidade * sobrepedido[6] / 100),
                    image: cliente_selected7,
                    cliente: clientes[6]
                }
            });
            carrinho.next();
        }
        $.listapedidos.sections[0].setItems(data);
        $.total_qtde.text = quantidade_total;
        $.total_preco.text = formatCurrency(valor_total);
        selecionaCarrinho(clientes[0]);
    }
    function verifySelected(prd_id, fk_cores, fk_tamanhos, cliente) {
        if (!cliente) return false;
        var carrinho = selectCarrinhoByProductTamanhoCor(prd_id, fk_tamanhos, fk_cores, cliente);
        return 0 != carrinho[0] ? true : false;
    }
    function getSelectedCheck(prd_id, fk_cores, fk_tamanhos, cliente) {
        if (!cliente) return "/images/checkbox-falso.png";
        var carrinho = selectCarrinhoByProductTamanhoCor(prd_id, fk_tamanhos, fk_cores, cliente);
        return 0 != carrinho[0] ? "/images/checkbox-ativo.png" : "/images/checkbox-falso.png";
    }
    function atualizarQuantidades(button) {
        var cliente = button.source.cliente;
        Ti.API.info("clientebtn" + cliente);
        var section = $.listapedidos.sections[0];
        for (var i = 0; i < quantidades.length; i++) {
            var quantidade = quantidades[i];
            var car_quantidade = Math.round(quantidade * sobrepedido[cliente] / 100);
            var novo_valor = "Qtd.\n" + car_quantidade;
            var item = section.getItemAt(i);
            var fk_tamanhos = item.fk_tamanhos;
            var fk_cores = item.fk_cores;
            var car_preco_unitario = item.car_preco_unitario;
            var car_ipi = item.car_ipi;
            var prd_id = item.prd_id;
            verifySelected(prd_id, fk_cores, fk_tamanhos, clientes[cliente]) && insertOrder(clientes[cliente], car_preco_unitario, car_ipi, car_quantidade, prd_id, fk_tamanhos, fk_cores);
            switch (cliente) {
              case "1":
                item.label_cliente1.text = novo_valor;
                break;

              case "2":
                item.label_cliente2.text = novo_valor;
                break;

              case "3":
                item.label_cliente3.text = novo_valor;
                break;

              case "4":
                item.label_cliente4.text = novo_valor;
                break;

              case "5":
                item.label_cliente5.text = novo_valor;
                break;

              case "6":
                item.label_cliente6.text = novo_valor;
                break;

              case "7":
                item.label_cliente7.text = novo_valor;
            }
            section.updateItemAt(i, item);
        }
    }
    function selecionaQuantidade(button) {
        var valores = [];
        for (var i = 0; 100 >= i; i++) valores.push(i);
        for (var i = 0; 20 >= i; i++) valores.push(100 + 10 * i);
        var dialog = Titanium.UI.createOptionDialog({
            options: valores,
            destructive: 2,
            cancel: 0,
            title: "Selecione a quantidade"
        });
        var cliente = button.source.cliente;
        dialog.show();
        dialog.addEventListener("click", function(e) {
            Ti.API.info("cliente" + cliente);
            sobrepedido[cliente] = valores[e.index];
            Ti.API.info("valores" + valores[e.index]);
            button.source.title = valores[e.index] + "%";
            atualizarQuantidades(button);
            Ti.App.Properties.setList(SOBRE_PEDIDO, sobrepedido);
        });
    }
    function selecionaItem(e) {
        var section = $.listapedidos.sections[e.sectionIndex];
        var item = section.getItemAt(e.itemIndex);
        var fk_tamanhos = item.fk_tamanhos;
        var fk_cores = item.fk_cores;
        var itemID = selecionaClienteBotao(e.bindId, item);
        var prd_id = itemID.prd_id;
        var cliente = itemID.cliente;
        var fk_tamanhos = itemID.fk_tamanhos;
        var fk_cores = itemID.fk_cores;
        var car_quantidade = itemID.car_quantidade;
        var car_preco_unitario = itemID.car_preco_unitario;
        var car_ipi = itemID.car_ipi;
        var image = itemID.image;
        if ("/images/checkbox-falso.png" == image) {
            itemID.image = "/images/checkbox-ativo.png";
            insertOrder(cliente, car_preco_unitario, car_ipi, car_quantidade, prd_id, fk_tamanhos, fk_cores);
        } else {
            itemID.image = "/images/checkbox-falso.png";
            removeOrder(cliente, prd_id, fk_tamanhos, fk_cores);
        }
        section.updateItemAt(e.itemIndex, item);
    }
    function insertOrder(cliente, car_preco_unitario, car_ipi, car_quantidade, prd_id, fk_tamanhos, fk_cores) {
        var carrinho = selectCarrinhoByProductTamanhoCor(prd_id, fk_tamanhos, fk_cores, cliente);
        if (0 != carrinho[0]) {
            Ti.API.info("atualiza");
            updateCarrinho(carrinho[0], session, car_quantidade, 0, 0, 0, 0, 0);
        } else insertCarrinho(session, car_quantidade, car_preco_unitario, car_ipi, 0, 0, 0, 0, 0, 0, fk_usu, prd_id, fk_tamanhos, fk_cores, cliente, ep_id);
        Ti.API.info("add" + carrinho);
        Ti.API.info("prd_id" + prd_id);
        Ti.API.info("fk_tamanhos" + fk_tamanhos);
        Ti.API.info("fk_cores" + fk_cores);
    }
    function removeOrder(cliente, prd_id, fk_tamanhos, fk_cores) {
        var carrinho = selectCarrinhoByProductTamanhoCor(prd_id, fk_tamanhos, fk_cores, cliente);
        if (0 != carrinho[0]) {
            Ti.API.info("atualiza");
            updateCarrinho(carrinho[0], session, 0, 0, 0, 0, 0, 0);
        }
        Ti.API.info("remove");
        Ti.API.info("prd_id" + prd_id);
        Ti.API.info("fk_tamanhos" + fk_tamanhos);
        Ti.API.info("fk_cores" + fk_cores);
    }
    function selecionaClienteBotao(id, item) {
        var item;
        switch (id) {
          case "view_cliente1":
            item = item.seleciona_cliente1;
            break;

          case "view_cliente2":
            item = item.seleciona_cliente2;
            break;

          case "view_cliente3":
            item = item.seleciona_cliente3;
            break;

          case "view_cliente4":
            item = item.seleciona_cliente4;
            break;

          case "view_cliente5":
            item = item.seleciona_cliente5;
            break;

          case "view_cliente6":
            item = item.seleciona_cliente6;
            break;

          case "view_cliente7":
            item = item.seleciona_cliente7;
        }
        return item;
    }
    function enviar() {
        goTo("pagamento");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "replicar";
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
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.cabecalho = Ti.UI.createView({
        height: "7%",
        top: "2%",
        width: "98%",
        layout: "horizontal",
        id: "cabecalho"
    });
    $.__views.win.add($.__views.cabecalho);
    $.__views.__alloyId1225 = Ti.UI.createLabel({
        backgroundColor: "#69A09D",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "10%",
        text: "Produto",
        id: "__alloyId1225"
    });
    $.__views.cabecalho.add($.__views.__alloyId1225);
    $.__views.__alloyId1226 = Ti.UI.createLabel({
        backgroundColor: "#20706d",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "5%",
        text: "Qtde",
        id: "__alloyId1226"
    });
    $.__views.cabecalho.add($.__views.__alloyId1226);
    $.__views.__alloyId1227 = Ti.UI.createLabel({
        backgroundColor: "#69A09D",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "10%",
        text: "Preço",
        id: "__alloyId1227"
    });
    $.__views.cabecalho.add($.__views.__alloyId1227);
    $.__views.__alloyId1228 = Ti.UI.createLabel({
        backgroundColor: "#20706d",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "10%",
        text: "Dsc. %",
        id: "__alloyId1228"
    });
    $.__views.cabecalho.add($.__views.__alloyId1228);
    $.__views.__alloyId1229 = Ti.UI.createLabel({
        backgroundColor: "#69A09D",
        color: "#ffffff",
        font: {
            fontSize: 13
        },
        height: "100%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "5%",
        text: "Rfr",
        id: "__alloyId1229"
    });
    $.__views.cabecalho.add($.__views.__alloyId1229);
    var __alloyId1230 = {};
    var __alloyId1233 = [];
    var __alloyId1235 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1236 = [];
            var __alloyId1238 = {
                type: "Ti.UI.View",
                bindId: "view_produto",
                childTemplates: function() {
                    var __alloyId1239 = [];
                    var __alloyId1241 = {
                        type: "Ti.UI.Label",
                        bindId: "label_prod",
                        properties: {
                            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                            top: 0,
                            width: "98%",
                            height: "19%",
                            color: "black",
                            font: {
                                fontSize: 12
                            },
                            bindId: "label_prod"
                        }
                    };
                    __alloyId1239.push(__alloyId1241);
                    var __alloyId1243 = {
                        type: "Ti.UI.ImageView",
                        bindId: "imagem_produto",
                        properties: {
                            top: 0,
                            height: "69%",
                            bindId: "imagem_produto"
                        }
                    };
                    __alloyId1239.push(__alloyId1243);
                    return __alloyId1239;
                }(),
                properties: {
                    layout: "vertical",
                    width: "10%",
                    height: "100%",
                    bindId: "view_produto"
                }
            };
            __alloyId1236.push(__alloyId1238);
            var __alloyId1245 = {
                type: "Ti.UI.Label",
                bindId: "label_qtde",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: "black",
                    width: "5%",
                    height: "100%",
                    bindId: "label_qtde"
                }
            };
            __alloyId1236.push(__alloyId1245);
            var __alloyId1247 = {
                type: "Ti.UI.Label",
                bindId: "label_preco",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: "black",
                    width: "10%",
                    height: "100%",
                    bindId: "label_preco"
                }
            };
            __alloyId1236.push(__alloyId1247);
            var __alloyId1249 = {
                type: "Ti.UI.Label",
                bindId: "label_desconto",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: "black",
                    width: "10%",
                    height: "100%",
                    bindId: "label_desconto"
                }
            };
            __alloyId1236.push(__alloyId1249);
            var __alloyId1251 = {
                type: "Ti.UI.Label",
                bindId: "label_ref",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: "black",
                    width: "5%",
                    height: "100%",
                    bindId: "label_ref"
                }
            };
            __alloyId1236.push(__alloyId1251);
            var __alloyId1253 = {
                type: "Ti.UI.View",
                bindId: "view_cliente1",
                childTemplates: function() {
                    var __alloyId1254 = [];
                    var __alloyId1256 = {
                        type: "Ti.UI.ImageView",
                        bindId: "seleciona_cliente1",
                        properties: {
                            touchEnabled: "false",
                            left: "1%",
                            width: "40%",
                            image: "/images/checkbox-falso.png",
                            bindId: "seleciona_cliente1"
                        }
                    };
                    __alloyId1254.push(__alloyId1256);
                    var __alloyId1258 = {
                        type: "Ti.UI.Label",
                        bindId: "label_cliente1",
                        properties: {
                            touchEnabled: "false",
                            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                            right: "15%",
                            color: "black",
                            bindId: "label_cliente1"
                        }
                    };
                    __alloyId1254.push(__alloyId1258);
                    return __alloyId1254;
                }(),
                properties: {
                    width: "8%",
                    height: "100%",
                    bindId: "view_cliente1"
                },
                events: {
                    click: selecionaItem
                }
            };
            __alloyId1236.push(__alloyId1253);
            var __alloyId1260 = {
                type: "Ti.UI.View",
                bindId: "view_cliente2",
                childTemplates: function() {
                    var __alloyId1261 = [];
                    var __alloyId1263 = {
                        type: "Ti.UI.ImageView",
                        bindId: "seleciona_cliente2",
                        properties: {
                            touchEnabled: "false",
                            left: "1%",
                            width: "40%",
                            image: "/images/checkbox-falso.png",
                            bindId: "seleciona_cliente2"
                        }
                    };
                    __alloyId1261.push(__alloyId1263);
                    var __alloyId1265 = {
                        type: "Ti.UI.Label",
                        bindId: "label_cliente2",
                        properties: {
                            touchEnabled: "false",
                            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                            right: "15%",
                            color: "black",
                            bindId: "label_cliente2"
                        }
                    };
                    __alloyId1261.push(__alloyId1265);
                    return __alloyId1261;
                }(),
                properties: {
                    width: "8%",
                    height: "100%",
                    bindId: "view_cliente2"
                },
                events: {
                    click: selecionaItem
                }
            };
            __alloyId1236.push(__alloyId1260);
            var __alloyId1267 = {
                type: "Ti.UI.View",
                bindId: "view_cliente3",
                childTemplates: function() {
                    var __alloyId1268 = [];
                    var __alloyId1270 = {
                        type: "Ti.UI.ImageView",
                        bindId: "seleciona_cliente3",
                        properties: {
                            touchEnabled: "false",
                            left: "1%",
                            width: "40%",
                            image: "/images/checkbox-falso.png",
                            bindId: "seleciona_cliente3"
                        }
                    };
                    __alloyId1268.push(__alloyId1270);
                    var __alloyId1272 = {
                        type: "Ti.UI.Label",
                        bindId: "label_cliente3",
                        properties: {
                            touchEnabled: "false",
                            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                            right: "15%",
                            color: "black",
                            bindId: "label_cliente3"
                        }
                    };
                    __alloyId1268.push(__alloyId1272);
                    return __alloyId1268;
                }(),
                properties: {
                    width: "8%",
                    height: "100%",
                    bindId: "view_cliente3"
                },
                events: {
                    click: selecionaItem
                }
            };
            __alloyId1236.push(__alloyId1267);
            var __alloyId1274 = {
                type: "Ti.UI.View",
                bindId: "view_cliente4",
                childTemplates: function() {
                    var __alloyId1275 = [];
                    var __alloyId1277 = {
                        type: "Ti.UI.ImageView",
                        bindId: "seleciona_cliente4",
                        properties: {
                            touchEnabled: "false",
                            left: "1%",
                            width: "40%",
                            image: "/images/checkbox-falso.png",
                            bindId: "seleciona_cliente4"
                        }
                    };
                    __alloyId1275.push(__alloyId1277);
                    var __alloyId1279 = {
                        type: "Ti.UI.Label",
                        bindId: "label_cliente4",
                        properties: {
                            touchEnabled: "false",
                            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                            right: "15%",
                            color: "black",
                            bindId: "label_cliente4"
                        }
                    };
                    __alloyId1275.push(__alloyId1279);
                    return __alloyId1275;
                }(),
                properties: {
                    width: "8%",
                    height: "100%",
                    bindId: "view_cliente4"
                },
                events: {
                    click: selecionaItem
                }
            };
            __alloyId1236.push(__alloyId1274);
            var __alloyId1281 = {
                type: "Ti.UI.View",
                bindId: "view_cliente5",
                childTemplates: function() {
                    var __alloyId1282 = [];
                    var __alloyId1284 = {
                        type: "Ti.UI.ImageView",
                        bindId: "seleciona_cliente5",
                        properties: {
                            touchEnabled: "false",
                            left: "1%",
                            width: "40%",
                            image: "/images/checkbox-falso.png",
                            bindId: "seleciona_cliente5"
                        }
                    };
                    __alloyId1282.push(__alloyId1284);
                    var __alloyId1286 = {
                        type: "Ti.UI.Label",
                        bindId: "label_cliente5",
                        properties: {
                            touchEnabled: "false",
                            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                            right: "15%",
                            color: "black",
                            bindId: "label_cliente5"
                        }
                    };
                    __alloyId1282.push(__alloyId1286);
                    return __alloyId1282;
                }(),
                properties: {
                    width: "8%",
                    height: "100%",
                    bindId: "view_cliente5"
                },
                events: {
                    click: selecionaItem
                }
            };
            __alloyId1236.push(__alloyId1281);
            var __alloyId1288 = {
                type: "Ti.UI.View",
                bindId: "view_cliente6",
                childTemplates: function() {
                    var __alloyId1289 = [];
                    var __alloyId1291 = {
                        type: "Ti.UI.ImageView",
                        bindId: "seleciona_cliente6",
                        properties: {
                            touchEnabled: "false",
                            left: "1%",
                            width: "40%",
                            image: "/images/checkbox-falso.png",
                            bindId: "seleciona_cliente6"
                        }
                    };
                    __alloyId1289.push(__alloyId1291);
                    var __alloyId1293 = {
                        type: "Ti.UI.Label",
                        bindId: "label_cliente6",
                        properties: {
                            touchEnabled: "false",
                            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                            right: "15%",
                            color: "black",
                            bindId: "label_cliente6"
                        }
                    };
                    __alloyId1289.push(__alloyId1293);
                    return __alloyId1289;
                }(),
                properties: {
                    width: "8%",
                    height: "100%",
                    bindId: "view_cliente6"
                },
                events: {
                    click: selecionaItem
                }
            };
            __alloyId1236.push(__alloyId1288);
            var __alloyId1295 = {
                type: "Ti.UI.View",
                bindId: "view_cliente7",
                childTemplates: function() {
                    var __alloyId1296 = [];
                    var __alloyId1298 = {
                        type: "Ti.UI.ImageView",
                        bindId: "seleciona_cliente7",
                        properties: {
                            touchEnabled: "false",
                            left: "1%",
                            width: "40%",
                            image: "/images/checkbox-falso.png",
                            bindId: "seleciona_cliente7"
                        }
                    };
                    __alloyId1296.push(__alloyId1298);
                    var __alloyId1300 = {
                        type: "Ti.UI.Label",
                        bindId: "label_cliente7",
                        properties: {
                            touchEnabled: "false",
                            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                            right: "15%",
                            color: "black",
                            bindId: "label_cliente7"
                        }
                    };
                    __alloyId1296.push(__alloyId1300);
                    return __alloyId1296;
                }(),
                properties: {
                    width: "8%",
                    height: "100%",
                    bindId: "view_cliente7"
                },
                events: {
                    click: selecionaItem
                }
            };
            __alloyId1236.push(__alloyId1295);
            return __alloyId1236;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId1233.push(__alloyId1235);
    var __alloyId1232 = {
        properties: {
            width: "100%",
            height: "100",
            name: "pedido_lista"
        },
        childTemplates: __alloyId1233
    };
    __alloyId1230["pedido_lista"] = __alloyId1232;
    $.__views.__alloyId1301 = Ti.UI.createListSection({
        id: "__alloyId1301"
    });
    var __alloyId1303 = [];
    __alloyId1303.push($.__views.__alloyId1301);
    $.__views.listapedidos = Ti.UI.createListView({
        top: "10%",
        width: "98%",
        height: "70%",
        sections: __alloyId1303,
        templates: __alloyId1230,
        id: "listapedidos",
        defaultItemTemplate: "pedido_lista"
    });
    $.__views.win.add($.__views.listapedidos);
    $.__views.__alloyId1304 = Ti.UI.createView({
        height: "7%",
        top: "81%",
        width: "98%",
        layout: "horizontal",
        id: "__alloyId1304"
    });
    $.__views.win.add($.__views.__alloyId1304);
    $.__views.__alloyId1305 = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: 13
        },
        height: "100%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "10%",
        text: "Total",
        id: "__alloyId1305"
    });
    $.__views.__alloyId1304.add($.__views.__alloyId1305);
    $.__views.total_qtde = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: 13
        },
        height: "100%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "5%",
        text: "235",
        id: "total_qtde"
    });
    $.__views.__alloyId1304.add($.__views.total_qtde);
    $.__views.total_preco = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: 13
        },
        height: "100%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "10%",
        text: "R$ 23412.11",
        id: "total_preco"
    });
    $.__views.__alloyId1304.add($.__views.total_preco);
    $.__views.__alloyId1306 = Ti.UI.createLabel({
        color: "black",
        font: {
            fontSize: 13
        },
        height: "100%",
        width: "15%",
        text: "Porcentagem:",
        id: "__alloyId1306"
    });
    $.__views.__alloyId1304.add($.__views.__alloyId1306);
    $.__views.botao_cliente1 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        font: {
            fontSize: 11
        },
        borderRadius: "5",
        color: "#ffffff",
        left: "1%",
        width: "6%",
        bottom: "1%",
        title: "100%",
        id: "botao_cliente1",
        cliente: "1"
    });
    $.__views.__alloyId1304.add($.__views.botao_cliente1);
    selecionaQuantidade ? $.__views.botao_cliente1.addEventListener("click", selecionaQuantidade) : __defers["$.__views.botao_cliente1!click!selecionaQuantidade"] = true;
    $.__views.botao_cliente2 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        font: {
            fontSize: 11
        },
        borderRadius: "5",
        color: "#ffffff",
        left: "1%",
        width: "6%",
        bottom: "1%",
        title: "100%",
        id: "botao_cliente2",
        cliente: "2"
    });
    $.__views.__alloyId1304.add($.__views.botao_cliente2);
    selecionaQuantidade ? $.__views.botao_cliente2.addEventListener("click", selecionaQuantidade) : __defers["$.__views.botao_cliente2!click!selecionaQuantidade"] = true;
    $.__views.botao_cliente3 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        font: {
            fontSize: 11
        },
        borderRadius: "5",
        color: "#ffffff",
        left: "1%",
        width: "6%",
        bottom: "1%",
        title: "100%",
        id: "botao_cliente3",
        cliente: "3"
    });
    $.__views.__alloyId1304.add($.__views.botao_cliente3);
    selecionaQuantidade ? $.__views.botao_cliente3.addEventListener("click", selecionaQuantidade) : __defers["$.__views.botao_cliente3!click!selecionaQuantidade"] = true;
    $.__views.botao_cliente4 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        font: {
            fontSize: 11
        },
        borderRadius: "5",
        color: "#ffffff",
        left: "1%",
        width: "6%",
        bottom: "1%",
        title: "100%",
        id: "botao_cliente4",
        cliente: "4"
    });
    $.__views.__alloyId1304.add($.__views.botao_cliente4);
    selecionaQuantidade ? $.__views.botao_cliente4.addEventListener("click", selecionaQuantidade) : __defers["$.__views.botao_cliente4!click!selecionaQuantidade"] = true;
    $.__views.botao_cliente5 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        font: {
            fontSize: 11
        },
        borderRadius: "5",
        color: "#ffffff",
        left: "1%",
        width: "6%",
        bottom: "1%",
        title: "100%",
        id: "botao_cliente5",
        cliente: "5"
    });
    $.__views.__alloyId1304.add($.__views.botao_cliente5);
    selecionaQuantidade ? $.__views.botao_cliente5.addEventListener("click", selecionaQuantidade) : __defers["$.__views.botao_cliente5!click!selecionaQuantidade"] = true;
    $.__views.botao_cliente6 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        font: {
            fontSize: 11
        },
        borderRadius: "5",
        color: "#ffffff",
        left: "1%",
        width: "6%",
        bottom: "1%",
        title: "100%",
        id: "botao_cliente6",
        cliente: "6"
    });
    $.__views.__alloyId1304.add($.__views.botao_cliente6);
    selecionaQuantidade ? $.__views.botao_cliente6.addEventListener("click", selecionaQuantidade) : __defers["$.__views.botao_cliente6!click!selecionaQuantidade"] = true;
    $.__views.botao_cliente7 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        font: {
            fontSize: 11
        },
        borderRadius: "5",
        color: "#ffffff",
        left: "1%",
        width: "6%",
        bottom: "1%",
        title: "100%",
        id: "botao_cliente7",
        cliente: "7"
    });
    $.__views.__alloyId1304.add($.__views.botao_cliente7);
    selecionaQuantidade ? $.__views.botao_cliente7.addEventListener("click", selecionaQuantidade) : __defers["$.__views.botao_cliente7!click!selecionaQuantidade"] = true;
    $.__views.__alloyId1307 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        left: "1%",
        width: "10%",
        bottom: "1%",
        title: "Enviar",
        id: "__alloyId1307"
    });
    $.__views.win.add($.__views.__alloyId1307);
    enviar ? $.__views.__alloyId1307.addEventListener("click", enviar) : __defers["$.__views.__alloyId1307!click!enviar"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/api/config.js");
    Ti.include("/database/clientes.js");
    Ti.include("/database/carrinho.js");
    Ti.include("/database/imagens_produtos.js");
    var clientes = Ti.App.Properties.getList(SELECTED_CLIENTS);
    var count = 0;
    var data = [];
    var sobrepedido = [];
    var cinza_escuro = "#999999";
    var cinza_claro = "#D2D2D2";
    var carrinho = selecionaCarrinho();
    var quantidades = [];
    var cliente_visivel = [];
    var session = Ti.App.Properties.getString(SESSION_ID);
    var fk_usu = Ti.App.Properties.getString(CURRENT_USER_ID);
    var ep_id = Ti.App.Properties.getString(CURRENT_EMPRESA);
    var botao_visivel = [ $.botao_cliente1, $.botao_cliente2, $.botao_cliente3, $.botao_cliente4, $.botao_cliente5, $.botao_cliente6, $.botao_cliente7 ];
    for (var i = 0; 7 > i; i++) {
        cliente_visivel[i] = "false";
        botao_visivel[i].visible = "false";
        sobrepedido[i] = 100;
    }
    cliente_ID_BASE(clientes[0]);
    Ti.App.Properties.getList(SOBRE_PEDIDO) && (sobrepedido = Ti.App.Properties.getList(SOBRE_PEDIDO));
    for (var i = 0; i < clientes.length; i++) {
        cliente_visivel[i] = "true";
        botao_visivel[i].visible = "true";
    }
    var valor_total = 0;
    var quantidade_total = 0;
    renderList();
    for (var i = 0; i < clientes.length; i++) {
        var cliente = consultaCliente(clientes[i]);
        if (cliente.isValidRow()) {
            {
                cliente.fieldByName("cl_id");
            }
            var cl_cnpj = cliente.fieldByName("cl_cnpj");
            var background = "#69A09D";
            count % 2 == 0 && (background = "#20706d");
            var titulo = Ti.UI.createLabel({
                backgroundColor: background,
                color: "#ffffff",
                font: {
                    fontSize: 13
                },
                height: "100%",
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                width: "8%",
                text: cl_cnpj
            });
            $.cabecalho.add(titulo);
            count++;
        }
    }
    __defers["$.__views.botao_cliente1!click!selecionaQuantidade"] && $.__views.botao_cliente1.addEventListener("click", selecionaQuantidade);
    __defers["$.__views.botao_cliente2!click!selecionaQuantidade"] && $.__views.botao_cliente2.addEventListener("click", selecionaQuantidade);
    __defers["$.__views.botao_cliente3!click!selecionaQuantidade"] && $.__views.botao_cliente3.addEventListener("click", selecionaQuantidade);
    __defers["$.__views.botao_cliente4!click!selecionaQuantidade"] && $.__views.botao_cliente4.addEventListener("click", selecionaQuantidade);
    __defers["$.__views.botao_cliente5!click!selecionaQuantidade"] && $.__views.botao_cliente5.addEventListener("click", selecionaQuantidade);
    __defers["$.__views.botao_cliente6!click!selecionaQuantidade"] && $.__views.botao_cliente6.addEventListener("click", selecionaQuantidade);
    __defers["$.__views.botao_cliente7!click!selecionaQuantidade"] && $.__views.botao_cliente7.addEventListener("click", selecionaQuantidade);
    __defers["$.__views.__alloyId1307!click!enviar"] && $.__views.__alloyId1307.addEventListener("click", enviar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;