function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function menuClick(e) {
        Ti.API.info(e.itemIndex);
        if (1 == e.itemIndex || 2 == e.itemIndex || 3 == e.itemIndex || 4 == e.itemIndex) if (Ti.App.Properties.getList(SELECTED_CLIENTS)) {
            var conjunto = Ti.App.Properties.getList(SELECTED_CLIENTS);
            for (var quantidade = 0; quantidade < conjunto.length; quantidade++) ;
            0 == quantidade ? alert("É necessário a seleção de um cliente ou mais para seguir em diante!") : menuSelection(e.itemIndex);
        } else alert("É necessário a seleção de um cliente ou mais para seguir em diante!"); else menuSelection(e.itemIndex);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "transportadora";
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
    $.__views.transportadora = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "transportadora"
    });
    $.__views.transportadora && $.addTopLevelView($.__views.transportadora);
    var __alloyId1476 = {};
    var __alloyId1479 = [];
    var __alloyId1481 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1482 = [];
            var __alloyId1484 = {
                type: "Ti.UI.Label",
                bindId: "btnmenu",
                properties: {
                    touchEnabled: "false",
                    width: "98%",
                    color: "white",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    bindId: "btnmenu"
                }
            };
            __alloyId1482.push(__alloyId1484);
            return __alloyId1482;
        }(),
        properties: {
            backgroundColor: "#3f3a35",
            borderColor: "#9ccccb",
            borderWidth: "4",
            color: "#ffffff",
            width: "90%",
            height: "80%"
        },
        events: {
            click: menuClick
        }
    };
    __alloyId1479.push(__alloyId1481);
    var __alloyId1478 = {
        properties: {
            height: "112dp",
            name: "menuTemplate"
        },
        childTemplates: __alloyId1479
    };
    __alloyId1476["menuTemplate"] = __alloyId1478;
    var __alloyId1487 = [];
    $.__views.__alloyId1488 = {
        btnmenu: {
            text: "CNPJ/\n RAZÃO SOCIAL/\n ENDEREÇO LOJA"
        },
        properties: {
            id: "__alloyId1488"
        }
    };
    __alloyId1487.push($.__views.__alloyId1488);
    $.__views.__alloyId1489 = {
        btnmenu: {
            text: "ANÁLISE DE \n CRÉDITO"
        },
        properties: {
            id: "__alloyId1489"
        }
    };
    __alloyId1487.push($.__views.__alloyId1489);
    $.__views.__alloyId1490 = {
        btnmenu: {
            text: "IR AO\n CATÁLOGO"
        },
        properties: {
            id: "__alloyId1490"
        }
    };
    __alloyId1487.push($.__views.__alloyId1490);
    $.__views.__alloyId1491 = {
        btnmenu: {
            text: "PEDIDOS"
        },
        properties: {
            id: "__alloyId1491"
        }
    };
    __alloyId1487.push($.__views.__alloyId1491);
    $.__views.__alloyId1492 = {
        btnmenu: {
            text: "TRANSPORTADORA"
        },
        properties: {
            id: "__alloyId1492"
        }
    };
    __alloyId1487.push($.__views.__alloyId1492);
    $.__views.__alloyId1493 = {
        btnmenu: {
            text: "NOVO CLIENTE"
        },
        properties: {
            id: "__alloyId1493"
        }
    };
    __alloyId1487.push($.__views.__alloyId1493);
    $.__views.__alloyId1494 = {
        btnmenu: {
            text: "FUNÇÕES"
        },
        properties: {
            id: "__alloyId1494"
        }
    };
    __alloyId1487.push($.__views.__alloyId1494);
    $.__views.__alloyId1495 = {
        btnmenu: {
            text: "EMAIL"
        },
        properties: {
            id: "__alloyId1495"
        }
    };
    __alloyId1487.push($.__views.__alloyId1495);
    $.__views.__alloyId1496 = {
        btnmenu: {
            text: "VOLTAR PARA TELA INICIAL"
        },
        properties: {
            id: "__alloyId1496"
        }
    };
    __alloyId1487.push($.__views.__alloyId1496);
    $.__views.__alloyId1497 = {
        btnmenu: {
            text: "TROCAR\n MARCA"
        },
        properties: {
            id: "__alloyId1497"
        }
    };
    __alloyId1487.push($.__views.__alloyId1497);
    $.__views.__alloyId1498 = {
        btnmenu: {
            text: "SAIR"
        },
        properties: {
            id: "__alloyId1498"
        }
    };
    __alloyId1487.push($.__views.__alloyId1498);
    $.__views.__alloyId1485 = Ti.UI.createListSection({
        id: "__alloyId1485"
    });
    $.__views.__alloyId1485.items = __alloyId1487;
    var __alloyId1499 = [];
    __alloyId1499.push($.__views.__alloyId1485);
    $.__views.__alloyId1475 = Ti.UI.createListView({
        backgroundColor: "#ebf7f6",
        height: "100%",
        left: "0",
        width: "15%",
        sections: __alloyId1499,
        templates: __alloyId1476,
        defaultItemTemplate: "menuTemplate",
        id: "__alloyId1475"
    });
    $.__views.transportadora.add($.__views.__alloyId1475);
    $.__views.__alloyId1500 = Ti.UI.createView({
        height: "100%",
        right: "0",
        width: "85%",
        id: "__alloyId1500"
    });
    $.__views.transportadora.add($.__views.__alloyId1500);
    $.__views.__alloyId1501 = Ti.UI.createView({
        height: "90",
        top: "0",
        width: "98%",
        id: "__alloyId1501"
    });
    $.__views.__alloyId1500.add($.__views.__alloyId1501);
    $.__views.__alloyId1502 = Ti.UI.createView({
        height: "90%",
        left: "0",
        width: "15%",
        id: "__alloyId1502"
    });
    $.__views.__alloyId1501.add($.__views.__alloyId1502);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        left: "0",
        id: "logoEmpresa"
    });
    $.__views.__alloyId1502.add($.__views.logoEmpresa);
    $.__views.__alloyId1503 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4e8789",
        height: "90",
        left: "15%",
        width: "70%",
        title: "TRANSPORTADORA",
        id: "__alloyId1503"
    });
    $.__views.__alloyId1501.add($.__views.__alloyId1503);
    $.__views.__alloyId1504 = Ti.UI.createView({
        height: "90",
        left: "85%",
        width: "15%",
        id: "__alloyId1504"
    });
    $.__views.__alloyId1501.add($.__views.__alloyId1504);
    $.__views.__alloyId1505 = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        right: "0",
        id: "__alloyId1505"
    });
    $.__views.__alloyId1504.add($.__views.__alloyId1505);
    $.__views.__alloyId1506 = Ti.UI.createView({
        borderColor: "#4e8789",
        borderWidth: "4",
        top: "90",
        width: "98%",
        id: "__alloyId1506"
    });
    $.__views.__alloyId1500.add($.__views.__alloyId1506);
    $.__views.__alloyId1507 = Ti.UI.createView({
        height: "40%",
        top: "0",
        width: "100%",
        id: "__alloyId1507"
    });
    $.__views.__alloyId1506.add($.__views.__alloyId1507);
    $.__views.__alloyId1508 = Ti.UI.createImageView({
        image: "/images/aviso_transportadora.jpg",
        top: "0",
        id: "__alloyId1508"
    });
    $.__views.__alloyId1507.add($.__views.__alloyId1508);
    $.__views.__alloyId1509 = Ti.UI.createView({
        height: "60%",
        top: "40%",
        width: "100%",
        id: "__alloyId1509"
    });
    $.__views.__alloyId1506.add($.__views.__alloyId1509);
    $.__views.__alloyId1510 = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        bottom: "10",
        height: "50",
        left: "10",
        width: "87%",
        hintText: "",
        id: "__alloyId1510"
    });
    $.__views.__alloyId1509.add($.__views.__alloyId1510);
    $.__views.__alloyId1511 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        bottom: "10",
        height: "50",
        right: "10",
        width: "10%",
        color: "white",
        title: "Gravar",
        id: "__alloyId1511"
    });
    $.__views.__alloyId1509.add($.__views.__alloyId1511);
    $.__views.__alloyId1512 = Ti.UI.createLabel({
        backgroundColor: "#FFFFFF",
        bottom: "60",
        color: "#4E8789",
        height: "50",
        left: "10",
        text: "Telefone",
        id: "__alloyId1512"
    });
    $.__views.__alloyId1509.add($.__views.__alloyId1512);
    $.__views.__alloyId1513 = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        bottom: "110",
        height: "50",
        left: "10",
        width: "87%",
        hintText: "",
        id: "__alloyId1513"
    });
    $.__views.__alloyId1509.add($.__views.__alloyId1513);
    $.__views.__alloyId1514 = Ti.UI.createLabel({
        backgroundColor: "#FFFFFF",
        bottom: "160",
        color: "#4E8789",
        height: "50",
        left: "10",
        text: "E-MAIL",
        id: "__alloyId1514"
    });
    $.__views.__alloyId1509.add($.__views.__alloyId1514);
    $.__views.__alloyId1515 = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        bottom: "220",
        height: "50",
        left: "10",
        width: "87%",
        hintText: "",
        id: "__alloyId1515"
    });
    $.__views.__alloyId1509.add($.__views.__alloyId1515);
    $.__views.__alloyId1516 = Ti.UI.createLabel({
        backgroundColor: "#FFFFFF",
        bottom: "270",
        color: "#4E8789",
        height: "50",
        left: "10",
        text: "NOME DA TRANSPORTADORA",
        id: "__alloyId1516"
    });
    $.__views.__alloyId1509.add($.__views.__alloyId1516);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/api/menu.js");
    Ti.include("/database/aparencia.js");
    Ti.include("/api/config.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;