function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "xxxxxxxxxxxxxxxlista_produtos";
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
    $.__views.xxxxxxxxxxxxxxxlista_produtos = Ti.UI.createWindow({
        id: "xxxxxxxxxxxxxxxlista_produtos"
    });
    $.__views.xxxxxxxxxxxxxxxlista_produtos && $.addTopLevelView($.__views.xxxxxxxxxxxxxxxlista_produtos);
    $.__views.__alloyId1585 = Ti.UI.createView({
        id: "__alloyId1585"
    });
    $.__views.xxxxxxxxxxxxxxxlista_produtos.add($.__views.__alloyId1585);
    $.__views.__alloyId1586 = Ti.UI.createButton({
        title: "LISTA DE PRODUTOS",
        id: "__alloyId1586"
    });
    $.__views.__alloyId1585.add($.__views.__alloyId1586);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        id: "logoEmpresa"
    });
    $.__views.__alloyId1585.add($.__views.logoEmpresa);
    $.__views.__alloyId1587 = Ti.UI.createView({
        id: "__alloyId1587"
    });
    $.__views.xxxxxxxxxxxxxxxlista_produtos.add($.__views.__alloyId1587);
    $.__views.__alloyId1588 = Ti.UI.createLabel({
        text: "Referência, nome ou código de barras",
        id: "__alloyId1588"
    });
    $.__views.__alloyId1587.add($.__views.__alloyId1588);
    $.__views.__alloyId1589 = Ti.UI.createImageView({
        id: "__alloyId1589"
    });
    $.__views.__alloyId1587.add($.__views.__alloyId1589);
    $.__views.buscar = Ti.UI.createTextField({
        id: "buscar",
        hintText: "Buscar"
    });
    $.__views.__alloyId1587.add($.__views.buscar);
    $.__views.__alloyId1590 = Ti.UI.createButton({
        title: "Ir",
        id: "__alloyId1590"
    });
    $.__views.__alloyId1587.add($.__views.__alloyId1590);
    buscarProdutos ? $.__views.__alloyId1590.addEventListener("click", buscarProdutos) : __defers["$.__views.__alloyId1590!click!buscarProdutos"] = true;
    $.__views.__alloyId1591 = Ti.UI.createView({
        id: "__alloyId1591"
    });
    $.__views.__alloyId1587.add($.__views.__alloyId1591);
    $.__views.__alloyId1592 = Ti.UI.createLabel({
        text: "PRODUTO",
        id: "__alloyId1592"
    });
    $.__views.__alloyId1591.add($.__views.__alloyId1592);
    $.__views.__alloyId1593 = Ti.UI.createLabel({
        text: "REFERÊNCIA",
        id: "__alloyId1593"
    });
    $.__views.__alloyId1591.add($.__views.__alloyId1593);
    $.__views.__alloyId1594 = Ti.UI.createLabel({
        text: "CÓDIGO DE BARRAS",
        id: "__alloyId1594"
    });
    $.__views.__alloyId1591.add($.__views.__alloyId1594);
    $.__views.__alloyId1595 = Ti.UI.createLabel({
        text: "NOME",
        id: "__alloyId1595"
    });
    $.__views.__alloyId1591.add($.__views.__alloyId1595);
    $.__views.__alloyId1596 = Ti.UI.createLabel({
        text: "MARCA",
        id: "__alloyId1596"
    });
    $.__views.__alloyId1591.add($.__views.__alloyId1596);
    $.__views.__alloyId1597 = Ti.UI.createLabel({
        text: "PREÇO",
        id: "__alloyId1597"
    });
    $.__views.__alloyId1591.add($.__views.__alloyId1597);
    $.__views.__alloyId1598 = Ti.UI.createLabel({
        text: "QTDE. MÍNIMA",
        id: "__alloyId1598"
    });
    $.__views.__alloyId1591.add($.__views.__alloyId1598);
    $.__views.__alloyId1599 = Ti.UI.createLabel({
        text: "SELECIONAR",
        id: "__alloyId1599"
    });
    $.__views.__alloyId1591.add($.__views.__alloyId1599);
    $.__views.__alloyId1600 = Ti.UI.createView({
        id: "__alloyId1600"
    });
    $.__views.__alloyId1587.add($.__views.__alloyId1600);
    var __alloyId1601 = {};
    var __alloyId1604 = [];
    var __alloyId1606 = {
        type: "Ti.UI.View",
        properties: {}
    };
    __alloyId1604.push(__alloyId1606);
    var __alloyId1608 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1609 = [];
            var __alloyId1611 = {
                type: "Ti.UI.View",
                properties: {}
            };
            __alloyId1609.push(__alloyId1611);
            var __alloyId1613 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId1614 = [];
                    var __alloyId1616 = {
                        type: "Ti.UI.ImageView",
                        bindId: "imagem_produto",
                        properties: {
                            bindId: "imagem_produto"
                        }
                    };
                    __alloyId1614.push(__alloyId1616);
                    return __alloyId1614;
                }(),
                properties: {}
            };
            __alloyId1609.push(__alloyId1613);
            var __alloyId1618 = {
                type: "Ti.UI.View",
                properties: {}
            };
            __alloyId1609.push(__alloyId1618);
            var __alloyId1620 = {
                type: "Ti.UI.Label",
                bindId: "label_referencia",
                properties: {
                    bindId: "label_referencia"
                }
            };
            __alloyId1609.push(__alloyId1620);
            var __alloyId1622 = {
                type: "Ti.UI.View",
                properties: {}
            };
            __alloyId1609.push(__alloyId1622);
            var __alloyId1624 = {
                type: "Ti.UI.Label",
                bindId: "label_barras",
                properties: {
                    bindId: "label_barras"
                }
            };
            __alloyId1609.push(__alloyId1624);
            var __alloyId1626 = {
                type: "Ti.UI.View",
                properties: {}
            };
            __alloyId1609.push(__alloyId1626);
            var __alloyId1628 = {
                type: "Ti.UI.Label",
                bindId: "label_nome",
                properties: {
                    bindId: "label_nome"
                }
            };
            __alloyId1609.push(__alloyId1628);
            var __alloyId1630 = {
                type: "Ti.UI.View",
                properties: {}
            };
            __alloyId1609.push(__alloyId1630);
            var __alloyId1632 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId1633 = [];
                    var __alloyId1635 = {
                        type: "Ti.UI.ImageView",
                        bindId: "imagem_marca",
                        properties: {
                            bindId: "imagem_marca"
                        }
                    };
                    __alloyId1633.push(__alloyId1635);
                    return __alloyId1633;
                }(),
                properties: {}
            };
            __alloyId1609.push(__alloyId1632);
            var __alloyId1637 = {
                type: "Ti.UI.View",
                properties: {}
            };
            __alloyId1609.push(__alloyId1637);
            var __alloyId1639 = {
                type: "Ti.UI.Label",
                bindId: "label_preco",
                properties: {
                    bindId: "label_preco"
                }
            };
            __alloyId1609.push(__alloyId1639);
            var __alloyId1641 = {
                type: "Ti.UI.View",
                properties: {}
            };
            __alloyId1609.push(__alloyId1641);
            var __alloyId1643 = {
                type: "Ti.UI.Label",
                bindId: "label_quantidade_min",
                properties: {
                    bindId: "label_quantidade_min"
                }
            };
            __alloyId1609.push(__alloyId1643);
            var __alloyId1645 = {
                type: "Ti.UI.View",
                properties: {}
            };
            __alloyId1609.push(__alloyId1645);
            var __alloyId1647 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId1648 = [];
                    var __alloyId1650 = {
                        type: "Ti.UI.ImageView",
                        bindId: "image_selecionar",
                        properties: {
                            bindId: "image_selecionar"
                        },
                        events: {
                            click: selecionaProduto
                        }
                    };
                    __alloyId1648.push(__alloyId1650);
                    return __alloyId1648;
                }(),
                properties: {}
            };
            __alloyId1609.push(__alloyId1647);
            var __alloyId1652 = {
                type: "Ti.UI.View",
                properties: {}
            };
            __alloyId1609.push(__alloyId1652);
            return __alloyId1609;
        }(),
        properties: {
            layout: "horizontal"
        }
    };
    __alloyId1604.push(__alloyId1608);
    var __alloyId1603 = {
        properties: {
            name: "produto_lista"
        },
        childTemplates: __alloyId1604
    };
    __alloyId1601["produto_lista"] = __alloyId1603;
    $.__views.__alloyId1653 = Ti.UI.createListSection({
        id: "__alloyId1653"
    });
    var __alloyId1655 = [];
    __alloyId1655.push($.__views.__alloyId1653);
    $.__views.listaprodutos = Ti.UI.createListView({
        sections: __alloyId1655,
        templates: __alloyId1601,
        id: "listaprodutos",
        defaultItemTemplate: "produto_lista"
    });
    $.__views.__alloyId1600.add($.__views.listaprodutos);
    $.__views.__alloyId1656 = Ti.UI.createView({
        id: "__alloyId1656"
    });
    $.__views.xxxxxxxxxxxxxxxlista_produtos.add($.__views.__alloyId1656);
    $.__views.__alloyId1657 = Ti.UI.createButton({
        title: "Voltar",
        id: "__alloyId1657"
    });
    $.__views.__alloyId1656.add($.__views.__alloyId1657);
    voltar ? $.__views.__alloyId1657.addEventListener("click", voltar) : __defers["$.__views.__alloyId1657!click!voltar"] = true;
    $.__views.__alloyId1658 = Ti.UI.createLabel({
        text: "Ir para selecionados",
        id: "__alloyId1658"
    });
    $.__views.__alloyId1656.add($.__views.__alloyId1658);
    irSelecionados ? $.__views.__alloyId1658.addEventListener("click", irSelecionados) : __defers["$.__views.__alloyId1658!click!irSelecionados"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId1590!click!buscarProdutos"] && $.__views.__alloyId1590.addEventListener("click", buscarProdutos);
    __defers["$.__views.__alloyId1657!click!voltar"] && $.__views.__alloyId1657.addEventListener("click", voltar);
    __defers["$.__views.__alloyId1658!click!irSelecionados"] && $.__views.__alloyId1658.addEventListener("click", irSelecionados);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;