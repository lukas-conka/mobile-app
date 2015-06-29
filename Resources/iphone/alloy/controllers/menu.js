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
    this.__controllerPath = "menu";
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
    $.__views.menu = Ti.UI.createWindow({
        id: "menu"
    });
    $.__views.menu && $.addTopLevelView($.__views.menu);
    var __alloyId1005 = {};
    var __alloyId1008 = [];
    var __alloyId1010 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1011 = [];
            var __alloyId1013 = {
                type: "Ti.UI.Button",
                bindId: "btnmenu",
                properties: {
                    bindId: "btnmenu"
                }
            };
            __alloyId1011.push(__alloyId1013);
            return __alloyId1011;
        }(),
        properties: {}
    };
    __alloyId1008.push(__alloyId1010);
    var __alloyId1007 = {
        properties: {
            name: "menuTemplate"
        },
        childTemplates: __alloyId1008
    };
    __alloyId1005["menuTemplate"] = __alloyId1007;
    var __alloyId1016 = [];
    $.__views.__alloyId1017 = {
        btnmenu: {
            title: "CNPJ/\n RAZÃO SOCIAL/\n ENDEREÇO LOJA"
        },
        properties: {
            id: "__alloyId1017"
        }
    };
    __alloyId1016.push($.__views.__alloyId1017);
    $.__views.__alloyId1018 = {
        btnmenu: {
            title: "ANÁLISE DE \n CRÉDITO"
        },
        properties: {
            id: "__alloyId1018"
        }
    };
    __alloyId1016.push($.__views.__alloyId1018);
    $.__views.__alloyId1019 = {
        btnmenu: {
            title: "IR AO\n CATÁLOGO"
        },
        properties: {
            id: "__alloyId1019"
        }
    };
    __alloyId1016.push($.__views.__alloyId1019);
    $.__views.__alloyId1020 = {
        btnmenu: {
            title: "PEDIDOS"
        },
        properties: {
            id: "__alloyId1020"
        }
    };
    __alloyId1016.push($.__views.__alloyId1020);
    $.__views.__alloyId1021 = {
        btnmenu: {
            title: "TRANSPORTADORA"
        },
        properties: {
            id: "__alloyId1021"
        }
    };
    __alloyId1016.push($.__views.__alloyId1021);
    $.__views.__alloyId1022 = {
        btnmenu: {
            title: "NOVO CLIENTE"
        },
        properties: {
            id: "__alloyId1022"
        }
    };
    __alloyId1016.push($.__views.__alloyId1022);
    $.__views.__alloyId1023 = {
        btnmenu: {
            title: "FUNÇÕES"
        },
        properties: {
            id: "__alloyId1023"
        }
    };
    __alloyId1016.push($.__views.__alloyId1023);
    $.__views.__alloyId1024 = {
        btnmenu: {
            title: "VOLTAR PARA TELA INICIAL"
        },
        properties: {
            id: "__alloyId1024"
        }
    };
    __alloyId1016.push($.__views.__alloyId1024);
    $.__views.__alloyId1025 = {
        btnmenu: {
            title: "SAIR"
        },
        properties: {
            id: "__alloyId1025"
        }
    };
    __alloyId1016.push($.__views.__alloyId1025);
    $.__views.__alloyId1014 = Ti.UI.createListSection({
        id: "__alloyId1014"
    });
    $.__views.__alloyId1014.items = __alloyId1016;
    var __alloyId1026 = [];
    __alloyId1026.push($.__views.__alloyId1014);
    $.__views.__alloyId1004 = Ti.UI.createListView({
        sections: __alloyId1026,
        templates: __alloyId1005,
        defaultItemTemplate: "menuTemplate",
        id: "__alloyId1004"
    });
    $.__views.menu.add($.__views.__alloyId1004);
    menuClick ? $.__views.__alloyId1004.addEventListener("itemclick", menuClick) : __defers["$.__views.__alloyId1004!itemclick!menuClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/api/menu.js");
    Ti.include("/api/config.js");
    __defers["$.__views.__alloyId1004!itemclick!menuClick"] && $.__views.__alloyId1004.addEventListener("itemclick", menuClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;