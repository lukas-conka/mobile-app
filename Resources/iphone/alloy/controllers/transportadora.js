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
    var __alloyId1402 = {};
    var __alloyId1405 = [];
    var __alloyId1407 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1408 = [];
            var __alloyId1410 = {
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
            __alloyId1408.push(__alloyId1410);
            return __alloyId1408;
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
    __alloyId1405.push(__alloyId1407);
    var __alloyId1404 = {
        properties: {
            height: "112dp",
            name: "menuTemplate"
        },
        childTemplates: __alloyId1405
    };
    __alloyId1402["menuTemplate"] = __alloyId1404;
    var __alloyId1413 = [];
    $.__views.__alloyId1414 = {
        btnmenu: {
            text: "CNPJ/\n RAZÃO SOCIAL/\n ENDEREÇO LOJA"
        },
        properties: {
            id: "__alloyId1414"
        }
    };
    __alloyId1413.push($.__views.__alloyId1414);
    $.__views.__alloyId1415 = {
        btnmenu: {
            text: "ANÁLISE DE \n CRÉDITO"
        },
        properties: {
            id: "__alloyId1415"
        }
    };
    __alloyId1413.push($.__views.__alloyId1415);
    $.__views.__alloyId1416 = {
        btnmenu: {
            text: "IR AO\n CATÁLOGO"
        },
        properties: {
            id: "__alloyId1416"
        }
    };
    __alloyId1413.push($.__views.__alloyId1416);
    $.__views.__alloyId1417 = {
        btnmenu: {
            text: "PEDIDOS"
        },
        properties: {
            id: "__alloyId1417"
        }
    };
    __alloyId1413.push($.__views.__alloyId1417);
    $.__views.__alloyId1418 = {
        btnmenu: {
            text: "TRANSPORTADORA"
        },
        properties: {
            id: "__alloyId1418"
        }
    };
    __alloyId1413.push($.__views.__alloyId1418);
    $.__views.__alloyId1419 = {
        btnmenu: {
            text: "NOVO CLIENTE"
        },
        properties: {
            id: "__alloyId1419"
        }
    };
    __alloyId1413.push($.__views.__alloyId1419);
    $.__views.__alloyId1420 = {
        btnmenu: {
            text: "FUNÇÕES"
        },
        properties: {
            id: "__alloyId1420"
        }
    };
    __alloyId1413.push($.__views.__alloyId1420);
    $.__views.__alloyId1421 = {
        btnmenu: {
            text: "EMAIL"
        },
        properties: {
            id: "__alloyId1421"
        }
    };
    __alloyId1413.push($.__views.__alloyId1421);
    $.__views.__alloyId1422 = {
        btnmenu: {
            text: "VOLTAR PARA TELA INICIAL"
        },
        properties: {
            id: "__alloyId1422"
        }
    };
    __alloyId1413.push($.__views.__alloyId1422);
    $.__views.__alloyId1423 = {
        btnmenu: {
            text: "TROCAR\n MARCA"
        },
        properties: {
            id: "__alloyId1423"
        }
    };
    __alloyId1413.push($.__views.__alloyId1423);
    $.__views.__alloyId1424 = {
        btnmenu: {
            text: "SAIR"
        },
        properties: {
            id: "__alloyId1424"
        }
    };
    __alloyId1413.push($.__views.__alloyId1424);
    $.__views.__alloyId1411 = Ti.UI.createListSection({
        id: "__alloyId1411"
    });
    $.__views.__alloyId1411.items = __alloyId1413;
    var __alloyId1425 = [];
    __alloyId1425.push($.__views.__alloyId1411);
    $.__views.__alloyId1401 = Ti.UI.createListView({
        backgroundColor: "#ebf7f6",
        height: "100%",
        left: "0",
        width: "15%",
        sections: __alloyId1425,
        templates: __alloyId1402,
        defaultItemTemplate: "menuTemplate",
        id: "__alloyId1401"
    });
    $.__views.transportadora.add($.__views.__alloyId1401);
    $.__views.__alloyId1426 = Ti.UI.createView({
        height: "100%",
        right: "0",
        width: "85%",
        id: "__alloyId1426"
    });
    $.__views.transportadora.add($.__views.__alloyId1426);
    $.__views.__alloyId1427 = Ti.UI.createView({
        height: "90",
        top: "0",
        width: "98%",
        id: "__alloyId1427"
    });
    $.__views.__alloyId1426.add($.__views.__alloyId1427);
    $.__views.__alloyId1428 = Ti.UI.createView({
        height: "90%",
        left: "0",
        width: "15%",
        id: "__alloyId1428"
    });
    $.__views.__alloyId1427.add($.__views.__alloyId1428);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        left: "0",
        id: "logoEmpresa"
    });
    $.__views.__alloyId1428.add($.__views.logoEmpresa);
    $.__views.__alloyId1429 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4e8789",
        height: "90",
        left: "15%",
        width: "70%",
        title: "TRANSPORTADORA",
        id: "__alloyId1429"
    });
    $.__views.__alloyId1427.add($.__views.__alloyId1429);
    $.__views.__alloyId1430 = Ti.UI.createView({
        height: "90",
        left: "85%",
        width: "15%",
        id: "__alloyId1430"
    });
    $.__views.__alloyId1427.add($.__views.__alloyId1430);
    $.__views.__alloyId1431 = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        right: "0",
        id: "__alloyId1431"
    });
    $.__views.__alloyId1430.add($.__views.__alloyId1431);
    $.__views.__alloyId1432 = Ti.UI.createView({
        borderColor: "#4e8789",
        borderWidth: "4",
        top: "90",
        width: "98%",
        id: "__alloyId1432"
    });
    $.__views.__alloyId1426.add($.__views.__alloyId1432);
    $.__views.__alloyId1433 = Ti.UI.createView({
        height: "40%",
        top: "0",
        width: "100%",
        id: "__alloyId1433"
    });
    $.__views.__alloyId1432.add($.__views.__alloyId1433);
    $.__views.__alloyId1434 = Ti.UI.createImageView({
        image: "/images/aviso_transportadora.jpg",
        top: "0",
        id: "__alloyId1434"
    });
    $.__views.__alloyId1433.add($.__views.__alloyId1434);
    $.__views.__alloyId1435 = Ti.UI.createView({
        height: "60%",
        top: "40%",
        width: "100%",
        id: "__alloyId1435"
    });
    $.__views.__alloyId1432.add($.__views.__alloyId1435);
    $.__views.__alloyId1436 = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        bottom: "10",
        height: "50",
        left: "10",
        width: "87%",
        hintText: "",
        id: "__alloyId1436"
    });
    $.__views.__alloyId1435.add($.__views.__alloyId1436);
    $.__views.__alloyId1437 = Ti.UI.createButton({
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
        id: "__alloyId1437"
    });
    $.__views.__alloyId1435.add($.__views.__alloyId1437);
    $.__views.__alloyId1438 = Ti.UI.createLabel({
        backgroundColor: "#FFFFFF",
        bottom: "60",
        color: "#4E8789",
        height: "50",
        left: "10",
        text: "Telefone",
        id: "__alloyId1438"
    });
    $.__views.__alloyId1435.add($.__views.__alloyId1438);
    $.__views.__alloyId1439 = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        bottom: "110",
        height: "50",
        left: "10",
        width: "87%",
        hintText: "",
        id: "__alloyId1439"
    });
    $.__views.__alloyId1435.add($.__views.__alloyId1439);
    $.__views.__alloyId1440 = Ti.UI.createLabel({
        backgroundColor: "#FFFFFF",
        bottom: "160",
        color: "#4E8789",
        height: "50",
        left: "10",
        text: "E-MAIL",
        id: "__alloyId1440"
    });
    $.__views.__alloyId1435.add($.__views.__alloyId1440);
    $.__views.__alloyId1441 = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        bottom: "220",
        height: "50",
        left: "10",
        width: "87%",
        hintText: "",
        id: "__alloyId1441"
    });
    $.__views.__alloyId1435.add($.__views.__alloyId1441);
    $.__views.__alloyId1442 = Ti.UI.createLabel({
        backgroundColor: "#FFFFFF",
        bottom: "270",
        color: "#4E8789",
        height: "50",
        left: "10",
        text: "NOME DA TRANSPORTADORA",
        id: "__alloyId1442"
    });
    $.__views.__alloyId1435.add($.__views.__alloyId1442);
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