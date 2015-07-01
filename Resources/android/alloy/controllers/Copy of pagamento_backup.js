function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
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
        var calculo1 = valorInicial[cliente] * descontoPrazo[cliente] / 100;
        var resultado1 = valorInicial[cliente] - calculo1;
        var dscEspecial = 0;
        descontoEspecial[cliente] > 0 && dscEspecial++;
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
        var aux = 0;
        if (dscEspecial > 0) {
            aux = resultado1 - resultado2;
            dscEspecial = 0;
        }
        item.label_parcela.text = dataPrazoMedio[cliente] + "x de " + formatCurrency(parcelaComDesconto);
        item.label_desconto.text = formatCurrency(resultado1 - aux);
        item.label_credito.text = formatCurrency(utilizado);
        $.total_geral.text = formatCurrency(resultado1 - aux);
        selecao.updateItemAt(comando.itemIndex, item);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Copy of pagamento_backup";
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
    var data = [];
    var dataPrazoMedio = [];
    var descontoEspecial = [];
    var descontoPrazo = [];
    var descontoVolume = [];
    var valorInicial = [];
    var quantidade;
    var total_geral = 0;
    var sobrepedido = [];
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
    }
    $.listaclientes.sections[0].setItems(data);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;