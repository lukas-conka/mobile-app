function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function renderList() {
        while (carrinho.isValidRow()) {
            var car_id = carrinho.fieldByName("car_id");
            var car_quantidade = carrinho.fieldByName("car_quantidade");
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
            quantidade_total += car_quantidade;
            var label_cortamanho = cor_nome + " - " + tmh_nome;
            var total_ref = car_preco_unitario * car_quantidade;
            var ipi = total_ref * car_ipi / 100;
            total_ref += ipi;
            valor_total += total_ref;
            aux_total = valor_total;
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
                    text: "0%",
                    bindId: 0
                },
                label_ref: {
                    backgroundColor: cinza_claro,
                    text: prd_referencia
                },
                total_ref: {
                    backgroundColor: cinza_escuro,
                    text: formatCurrency(total_ref),
                    total_ref: total_ref,
                    VAL: total_ref
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
            total_ref = 0;
        }
        $.listapedidos.sections[0].setItems(data);
        $.total_qtde.text = quantidade_total;
        $.total_preco.text = formatCurrency(aux_total);
    }
    function getSelectedCheck(prd_id, fk_cores, fk_tamanhos, cliente) {
        if (!cliente) return "/images/checkbox-falso.png";
        var carrinho = selectCarrinhoByProductTamanhoCor(prd_id, fk_tamanhos, fk_cores, cliente);
        return 0 != carrinho[0] ? "/images/checkbox-ativo.png" : "/images/checkbox-falso.png";
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Copy of replicar";
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
    Ti.App.Properties.getString(SESSION_ID);
    Ti.App.Properties.getString(CURRENT_USER_ID);
    Ti.App.Properties.getString(CURRENT_EMPRESA);
    var botao_visivel = [ $.botao_cliente1, $.botao_cliente2, $.botao_cliente3, $.botao_cliente4, $.botao_cliente5, $.botao_cliente6, $.botao_cliente7 ];
    for (var i = 0; 7 > i; i++) {
        cliente_visivel[i] = "false";
        botao_visivel[i].visible = "false";
        sobrepedido[i] = 100;
    }
    Ti.App.Properties.getList(SOBRE_PEDIDO) && (sobrepedido = Ti.App.Properties.getList(SOBRE_PEDIDO));
    for (var i = 0; i < clientes.length; i++) {
        cliente_visivel[i] = "true";
        botao_visivel[i].visible = "true";
    }
    var valor_total = 0;
    var quantidade_total = 0;
    var aux_total = 0;
    renderList();
    var background = "";
    for (var i = 0; i < clientes.length; i++) {
        var cliente = consultaCliente(clientes[i]);
        if (cliente.isValidRow()) {
            {
                cliente.fieldByName("cl_id");
            }
            var cl_cnpj = cliente.fieldByName("cl_cnpj");
            background = "#20706d";
            count % 2 == 0 && (background = "#69A09D");
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;