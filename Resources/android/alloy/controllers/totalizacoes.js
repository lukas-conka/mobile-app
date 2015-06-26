function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function voltar() {
        resetSession();
        goTo("seleciona_cliente");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "totalizacoes";
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
    $.__views.totalizacoes = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        id: "totalizacoes"
    });
    $.__views.totalizacoes && $.addTopLevelView($.__views.totalizacoes);
    $.__views.__alloyId1472 = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        right: "1%",
        top: "0.8%",
        id: "__alloyId1472"
    });
    $.__views.totalizacoes.add($.__views.__alloyId1472);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        left: "1%",
        top: "0.8%",
        id: "logoEmpresa"
    });
    $.__views.totalizacoes.add($.__views.logoEmpresa);
    $.__views.__alloyId1473 = Ti.UI.createLabel({
        color: "black",
        width: "100%",
        top: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "AGRADECEMOS OS SEUS PEDIDOS ABAIXO RELACIONADOS",
        id: "__alloyId1473"
    });
    $.__views.totalizacoes.add($.__views.__alloyId1473);
    $.__views.corpo = Ti.UI.createView({
        height: "60%",
        top: "15%",
        width: "90%",
        layout: "vertical",
        id: "corpo"
    });
    $.__views.totalizacoes.add($.__views.corpo);
    $.__views.__alloyId1474 = Ti.UI.createView({
        backgroundColor: "#414143",
        height: "5%",
        top: "75%",
        width: "90%",
        id: "__alloyId1474"
    });
    $.__views.totalizacoes.add($.__views.__alloyId1474);
    $.__views.__alloyId1475 = Ti.UI.createLabel({
        color: "#ffffff",
        height: "100%",
        right: "16%",
        width: "20%",
        text: "SOMA DOS PEDIDOS",
        id: "__alloyId1475"
    });
    $.__views.__alloyId1474.add($.__views.__alloyId1475);
    $.__views.total = Ti.UI.createLabel({
        color: "#ffffff",
        height: "100%",
        right: "1%",
        width: "15%",
        id: "total"
    });
    $.__views.__alloyId1474.add($.__views.total);
    $.__views.__alloyId1476 = Ti.UI.createView({
        height: "7%",
        bottom: "1%",
        width: "100%",
        id: "__alloyId1476"
    });
    $.__views.totalizacoes.add($.__views.__alloyId1476);
    $.__views.__alloyId1477 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        height: "80%",
        left: "2%",
        width: "14%",
        title: "Voltar Home",
        id: "__alloyId1477"
    });
    $.__views.__alloyId1476.add($.__views.__alloyId1477);
    voltar ? $.__views.__alloyId1477.addEventListener("click", voltar) : __defers["$.__views.__alloyId1477!click!voltar"] = true;
    $.__views.__alloyId1478 = Ti.UI.createLabel({
        color: "black",
        width: "100%",
        bottom: "16%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "ESTES PEDIDOS FORAM ENVIADOS PARA OS E-MAILS CADASTRADOS ANTERIORMENTE:",
        id: "__alloyId1478"
    });
    $.__views.totalizacoes.add($.__views.__alloyId1478);
    $.__views.emails = Ti.UI.createLabel({
        color: "red",
        width: "100%",
        bottom: "13%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "emails"
    });
    $.__views.totalizacoes.add($.__views.emails);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/aparencia.js");
    Ti.include("/database/pedido.js");
    Ti.include("/database/carrinho_pedido.js");
    Ti.include("/database/email.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    var count = 0;
    var line = Titanium.UI.createView({
        backgroundColor: "#414143",
        height: "20%",
        layout: "horizontal",
        width: "100%"
    });
    var geral = 0;
    var i = 0;
    var pedidos = consultaPedidoTotalizacao(Ti.App.Properties.getString(SESSION_ID));
    while (pedidos.isValidRow()) {
        var ped_id = pedidos.fieldByName("ped_id");
        var ped_numero = pedidos.fieldByName("ped_numero");
        var cl_cnpj = pedidos.fieldByName("cl_cnpj");
        var final = 0;
        var carrinhoPedido = consultaCarrinhoTotalizacao(ped_id);
        while (carrinhoPedido.isValidRow()) {
            var crp_quantidade = carrinhoPedido.fieldByName("crp_quantidade");
            var crp_preco_unitario = carrinhoPedido.fieldByName("crp_preco_unitario");
            var crp_ipi = carrinhoPedido.fieldByName("crp_ipi");
            var desconto_parcela = carrinhoPedido.fieldByName("desconto_parcela");
            var desconto_especial = carrinhoPedido.fieldByName("desconto_especial");
            var total = crp_quantidade * crp_preco_unitario;
            var ipi = total * crp_ipi / 100;
            total += ipi;
            var descontoParcela = total * desconto_parcela / 100;
            total -= descontoParcela;
            var descontoEspecial = total * desconto_especial / 100;
            total -= descontoEspecial;
            final += total;
            carrinhoPedido.next();
        }
        geral += final;
        var item = Titanium.UI.createView({
            height: "100%",
            layout: "vertical",
            width: "33%"
        });
        var label = Titanium.UI.createLabel({
            color: "#ffffff",
            height: "20%",
            text: "CNPJ: " + cl_cnpj,
            width: "100%"
        });
        item.add(label);
        var row = Titanium.UI.createView({
            height: "80%",
            width: "100%",
            layout: "horizontal"
        });
        var pedido = Titanium.UI.createLabel({
            color: "#ffffff",
            text: "Pedido Nº " + ped_numero,
            height: "100%",
            width: 100
        });
        row.add(pedido);
        var valor = Titanium.UI.createLabel({
            color: "#ff0000",
            backgroundColor: "#ffffff",
            text: formatCurrency(final),
            height: "80%",
            width: 120
        });
        row.add(valor);
        var impressora = Titanium.UI.createImageView({
            height: "80%",
            image: "/images/impressora.jpg"
        });
        row.add(impressora);
        var marca = Titanium.UI.createImageView({
            left: "5%",
            height: "75%",
            image: "/images/marca.jpg"
        });
        row.add(marca);
        item.add(row);
        line.add(item);
        count++;
        if (3 == count) {
            $.corpo.add(line);
            line = Titanium.UI.createView({
                backgroundColor: "#414143",
                width: "100%",
                height: "20%",
                layout: "horizontal"
            });
        }
        i++;
        pedidos.next();
    }
    $.corpo.add(line);
    $.total.text = formatCurrency(geral);
    var emailRodape = "";
    var q = 0;
    var email = selectallEmail();
    while (email.isValidRow()) {
        var em_email = email.fieldByName("em_email");
        if (0 == q) {
            emailRodape = em_email;
            q++;
        } else emailRodape = emailRodape + " | " + em_email;
        email.next();
    }
    $.emails.text = emailRodape;
    __defers["$.__views.__alloyId1477!click!voltar"] && $.__views.__alloyId1477.addEventListener("click", voltar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;