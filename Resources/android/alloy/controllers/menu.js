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
    var __alloyId1000 = {};
    var __alloyId1003 = [];
    var __alloyId1005 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1006 = [];
            var __alloyId1008 = {
                type: "Ti.UI.Button",
                bindId: "btnmenu",
                properties: {
                    bindId: "btnmenu"
                }
            };
            __alloyId1006.push(__alloyId1008);
            return __alloyId1006;
        }(),
        properties: {}
    };
    __alloyId1003.push(__alloyId1005);
    var __alloyId1002 = {
        properties: {
            name: "menuTemplate"
        },
        childTemplates: __alloyId1003
    };
    __alloyId1000["menuTemplate"] = __alloyId1002;
    var __alloyId1011 = [];
    $.__views.__alloyId1012 = {
        btnmenu: {
            title: "CNPJ/\n RAZÃO SOCIAL/\n ENDEREÇO LOJA"
        },
        properties: {
            id: "__alloyId1012"
        }
    };
    __alloyId1011.push($.__views.__alloyId1012);
    $.__views.__alloyId1013 = {
        btnmenu: {
            title: "ANÁLISE DE \n CRÉDITO"
        },
        properties: {
            id: "__alloyId1013"
        }
    };
    __alloyId1011.push($.__views.__alloyId1013);
    $.__views.__alloyId1014 = {
        btnmenu: {
            title: "IR AO\n CATÁLOGO"
        },
        properties: {
            id: "__alloyId1014"
        }
    };
    __alloyId1011.push($.__views.__alloyId1014);
    $.__views.__alloyId1015 = {
        btnmenu: {
            title: "PEDIDOS"
        },
        properties: {
            id: "__alloyId1015"
        }
    };
    __alloyId1011.push($.__views.__alloyId1015);
    $.__views.__alloyId1016 = {
        btnmenu: {
            title: "TRANSPORTADORA"
        },
        properties: {
            id: "__alloyId1016"
        }
    };
    __alloyId1011.push($.__views.__alloyId1016);
    $.__views.__alloyId1017 = {
        btnmenu: {
            title: "NOVO CLIENTE"
        },
        properties: {
            id: "__alloyId1017"
        }
    };
    __alloyId1011.push($.__views.__alloyId1017);
    $.__views.__alloyId1018 = {
        btnmenu: {
            title: "FUNÇÕES"
        },
        properties: {
            id: "__alloyId1018"
        }
    };
    __alloyId1011.push($.__views.__alloyId1018);
    $.__views.__alloyId1019 = {
        btnmenu: {
            title: "VOLTAR PARA TELA INICIAL"
        },
        properties: {
            id: "__alloyId1019"
        }
    };
    __alloyId1011.push($.__views.__alloyId1019);
    $.__views.__alloyId1020 = {
        btnmenu: {
            title: "SAIR"
        },
        properties: {
            id: "__alloyId1020"
        }
    };
    __alloyId1011.push($.__views.__alloyId1020);
    $.__views.__alloyId1009 = Ti.UI.createListSection({
        id: "__alloyId1009"
    });
    $.__views.__alloyId1009.items = __alloyId1011;
    var __alloyId1021 = [];
    __alloyId1021.push($.__views.__alloyId1009);
    $.__views.__alloyId999 = Ti.UI.createListView({
        sections: __alloyId1021,
        templates: __alloyId1000,
        defaultItemTemplate: "menuTemplate",
        id: "__alloyId999"
    });
    $.__views.menu.add($.__views.__alloyId999);
    menuClick ? $.__views.__alloyId999.addEventListener("itemclick", menuClick) : __defers["$.__views.__alloyId999!itemclick!menuClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId999!itemclick!menuClick"] && $.__views.__alloyId999.addEventListener("itemclick", menuClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;