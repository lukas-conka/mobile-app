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
    var __alloyId926 = {};
    var __alloyId929 = [];
    var __alloyId931 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId932 = [];
            var __alloyId934 = {
                type: "Ti.UI.Button",
                bindId: "btnmenu",
                properties: {
                    bindId: "btnmenu"
                }
            };
            __alloyId932.push(__alloyId934);
            return __alloyId932;
        }(),
        properties: {}
    };
    __alloyId929.push(__alloyId931);
    var __alloyId928 = {
        properties: {
            name: "menuTemplate"
        },
        childTemplates: __alloyId929
    };
    __alloyId926["menuTemplate"] = __alloyId928;
    var __alloyId937 = [];
    $.__views.__alloyId938 = {
        btnmenu: {
            title: "CNPJ/\n RAZÃO SOCIAL/\n ENDEREÇO LOJA"
        },
        properties: {
            id: "__alloyId938"
        }
    };
    __alloyId937.push($.__views.__alloyId938);
    $.__views.__alloyId939 = {
        btnmenu: {
            title: "ANÁLISE DE \n CRÉDITO"
        },
        properties: {
            id: "__alloyId939"
        }
    };
    __alloyId937.push($.__views.__alloyId939);
    $.__views.__alloyId940 = {
        btnmenu: {
            title: "IR AO\n CATÁLOGO"
        },
        properties: {
            id: "__alloyId940"
        }
    };
    __alloyId937.push($.__views.__alloyId940);
    $.__views.__alloyId941 = {
        btnmenu: {
            title: "PEDIDOS"
        },
        properties: {
            id: "__alloyId941"
        }
    };
    __alloyId937.push($.__views.__alloyId941);
    $.__views.__alloyId942 = {
        btnmenu: {
            title: "TRANSPORTADORA"
        },
        properties: {
            id: "__alloyId942"
        }
    };
    __alloyId937.push($.__views.__alloyId942);
    $.__views.__alloyId943 = {
        btnmenu: {
            title: "NOVO CLIENTE"
        },
        properties: {
            id: "__alloyId943"
        }
    };
    __alloyId937.push($.__views.__alloyId943);
    $.__views.__alloyId944 = {
        btnmenu: {
            title: "FUNÇÕES"
        },
        properties: {
            id: "__alloyId944"
        }
    };
    __alloyId937.push($.__views.__alloyId944);
    $.__views.__alloyId945 = {
        btnmenu: {
            title: "VOLTAR PARA TELA INICIAL"
        },
        properties: {
            id: "__alloyId945"
        }
    };
    __alloyId937.push($.__views.__alloyId945);
    $.__views.__alloyId946 = {
        btnmenu: {
            title: "SAIR"
        },
        properties: {
            id: "__alloyId946"
        }
    };
    __alloyId937.push($.__views.__alloyId946);
    $.__views.__alloyId935 = Ti.UI.createListSection({
        id: "__alloyId935"
    });
    $.__views.__alloyId935.items = __alloyId937;
    var __alloyId947 = [];
    __alloyId947.push($.__views.__alloyId935);
    $.__views.__alloyId925 = Ti.UI.createListView({
        sections: __alloyId947,
        templates: __alloyId926,
        defaultItemTemplate: "menuTemplate",
        id: "__alloyId925"
    });
    $.__views.menu.add($.__views.__alloyId925);
    menuClick ? $.__views.__alloyId925.addEventListener("itemclick", menuClick) : __defers["$.__views.__alloyId925!itemclick!menuClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/api/menu.js");
    Ti.include("/api/config.js");
    __defers["$.__views.__alloyId925!itemclick!menuClick"] && $.__views.__alloyId925.addEventListener("itemclick", menuClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;