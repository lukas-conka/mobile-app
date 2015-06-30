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
    function listaEmails() {
        var emails = consultaEmail(representante);
        var data = [];
        while (emails.isValidRow()) {
            var em_id = emails.fieldByName("em_id");
            var em_email = emails.fieldByName("em_email");
            data.push({
                em_id: em_id,
                label_email: {
                    text: em_email
                }
            });
            emails.next();
        }
        $.listaemails.sections[0].setItems(data);
    }
    function novoEmail() {
        var db = dbLoad();
        var txt_email = $.email_valor.value;
        var insert_query = "INSERT INTO tb_email (em_representante, ep_id, em_email) VALUES(" + representante + ", " + epid + ", '" + txt_email + "');";
        var select_query = "SELECT * FROM tb_email;";
        var actionSelect = db.execute(select_query);
        var cont = 0;
        while (actionSelect.isValidRow()) {
            actionSelect.fieldByName("em_email") == txt_email && cont++;
            actionSelect.next();
        }
        if (0 != cont) Ti.UI.createAlertDialog({
            message: "Email ja esta casdastrado!\n" + cont + " registros foram encontrados com esse e-mail!",
            ok: "Okay",
            title: "Erro, Email!"
        }).show(); else {
            db.execute(insert_query);
            listaEmails();
            cont = 0;
        }
    }
    function excluir(e) {
        var db = dbLoad();
        var lbl_acoes = $.listaemails.sections[e.sectionIndex];
        var item = lbl_acoes.getItemAt(e.itemIndex);
        var item_id = item.em_id;
        var delete_query = "DELETE FROM tb_email WHERE em_id = " + item_id;
        db.execute(delete_query);
        listaEmails();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "email";
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
    $.__views.email = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "email"
    });
    $.__views.email && $.addTopLevelView($.__views.email);
    var __alloyId516 = {};
    var __alloyId519 = [];
    var __alloyId521 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId522 = [];
            var __alloyId524 = {
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
            __alloyId522.push(__alloyId524);
            return __alloyId522;
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
    __alloyId519.push(__alloyId521);
    var __alloyId518 = {
        properties: {
            height: "112dp",
            name: "menuTemplate"
        },
        childTemplates: __alloyId519
    };
    __alloyId516["menuTemplate"] = __alloyId518;
    var __alloyId527 = [];
    $.__views.__alloyId528 = {
        btnmenu: {
            text: "CNPJ/\n RAZÃO SOCIAL/\n ENDEREÇO LOJA"
        },
        properties: {
            id: "__alloyId528"
        }
    };
    __alloyId527.push($.__views.__alloyId528);
    $.__views.__alloyId529 = {
        btnmenu: {
            text: "ANÁLISE DE \n CRÉDITO"
        },
        properties: {
            id: "__alloyId529"
        }
    };
    __alloyId527.push($.__views.__alloyId529);
    $.__views.__alloyId530 = {
        btnmenu: {
            text: "IR AO\n CATÁLOGO"
        },
        properties: {
            id: "__alloyId530"
        }
    };
    __alloyId527.push($.__views.__alloyId530);
    $.__views.__alloyId531 = {
        btnmenu: {
            text: "PEDIDOS"
        },
        properties: {
            id: "__alloyId531"
        }
    };
    __alloyId527.push($.__views.__alloyId531);
    $.__views.__alloyId532 = {
        btnmenu: {
            text: "TRANSPORTADORA"
        },
        properties: {
            id: "__alloyId532"
        }
    };
    __alloyId527.push($.__views.__alloyId532);
    $.__views.__alloyId533 = {
        btnmenu: {
            text: "NOVO CLIENTE"
        },
        properties: {
            id: "__alloyId533"
        }
    };
    __alloyId527.push($.__views.__alloyId533);
    $.__views.__alloyId534 = {
        btnmenu: {
            text: "FUNÇÕES"
        },
        properties: {
            id: "__alloyId534"
        }
    };
    __alloyId527.push($.__views.__alloyId534);
    $.__views.__alloyId535 = {
        btnmenu: {
            text: "VOLTAR PARA TELA INICIAL"
        },
        properties: {
            id: "__alloyId535"
        }
    };
    __alloyId527.push($.__views.__alloyId535);
    $.__views.__alloyId536 = {
        btnmenu: {
            text: "SAIR"
        },
        properties: {
            id: "__alloyId536"
        }
    };
    __alloyId527.push($.__views.__alloyId536);
    $.__views.__alloyId525 = Ti.UI.createListSection({
        id: "__alloyId525"
    });
    $.__views.__alloyId525.items = __alloyId527;
    var __alloyId537 = [];
    __alloyId537.push($.__views.__alloyId525);
    $.__views.__alloyId515 = Ti.UI.createListView({
        backgroundColor: "#ebf7f6",
        height: "100%",
        left: "0",
        width: "15%",
        sections: __alloyId537,
        templates: __alloyId516,
        defaultItemTemplate: "menuTemplate",
        id: "__alloyId515"
    });
    $.__views.email.add($.__views.__alloyId515);
    $.__views.__alloyId538 = Ti.UI.createView({
        height: "100%",
        right: "0",
        width: "85%",
        id: "__alloyId538"
    });
    $.__views.email.add($.__views.__alloyId538);
    $.__views.__alloyId539 = Ti.UI.createView({
        height: "90",
        top: "0",
        width: "98%",
        id: "__alloyId539"
    });
    $.__views.__alloyId538.add($.__views.__alloyId539);
    $.__views.__alloyId540 = Ti.UI.createView({
        height: "90%",
        left: "0",
        width: "15%",
        id: "__alloyId540"
    });
    $.__views.__alloyId539.add($.__views.__alloyId540);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        id: "logoEmpresa"
    });
    $.__views.__alloyId540.add($.__views.logoEmpresa);
    $.__views.__alloyId541 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4e8789",
        height: "90",
        left: "15%",
        width: "70%",
        title: "EMAIL",
        id: "__alloyId541"
    });
    $.__views.__alloyId539.add($.__views.__alloyId541);
    $.__views.__alloyId542 = Ti.UI.createView({
        height: "90",
        left: "85%",
        width: "15%",
        id: "__alloyId542"
    });
    $.__views.__alloyId539.add($.__views.__alloyId542);
    $.__views.__alloyId543 = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        id: "__alloyId543"
    });
    $.__views.__alloyId542.add($.__views.__alloyId543);
    $.__views.__alloyId544 = Ti.UI.createView({
        borderColor: "#4e8789",
        borderWidth: "4",
        top: "90",
        width: "98%",
        id: "__alloyId544"
    });
    $.__views.__alloyId538.add($.__views.__alloyId544);
    $.__views.__alloyId545 = Ti.UI.createView({
        borderColor: "#4e8789",
        borderWidth: "4",
        height: "70",
        top: "0",
        width: "100%",
        id: "__alloyId545"
    });
    $.__views.__alloyId544.add($.__views.__alloyId545);
    $.__views.__alloyId546 = Ti.UI.createView({
        top: 0,
        height: "70",
        left: "1%",
        width: "92%",
        id: "__alloyId546"
    });
    $.__views.__alloyId545.add($.__views.__alloyId546);
    $.__views.email_valor = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderRadius: "5",
        borderWidth: "4",
        color: "#000000",
        height: "50",
        left: "0",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "80%",
        id: "email_valor",
        hintText: "Cadastrar novo email"
    });
    $.__views.__alloyId546.add($.__views.email_valor);
    $.__views.__alloyId547 = Ti.UI.createView({
        height: "60",
        left: "92%",
        top: "0",
        width: "7%",
        id: "__alloyId547"
    });
    $.__views.__alloyId545.add($.__views.__alloyId547);
    $.__views.__alloyId548 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        height: "80%",
        top: "10",
        width: "90%",
        color: "white",
        title: "Ir",
        id: "__alloyId548"
    });
    $.__views.__alloyId547.add($.__views.__alloyId548);
    novoEmail ? $.__views.__alloyId548.addEventListener("click", novoEmail) : __defers["$.__views.__alloyId548!click!novoEmail"] = true;
    var __alloyId549 = {};
    var __alloyId552 = [];
    var __alloyId554 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId555 = [];
            var __alloyId557 = {
                type: "Ti.UI.Label",
                bindId: "label_email",
                properties: {
                    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                    color: "#000000",
                    height: "100%",
                    width: "90%",
                    left: 5,
                    bindId: "label_email"
                }
            };
            __alloyId555.push(__alloyId557);
            var __alloyId559 = {
                type: "Ti.UI.Label",
                bindId: "label_acoes",
                properties: {
                    backgroundGradient: {
                        type: "linear",
                        colors: [ "#2c8f8e", "#206764" ]
                    },
                    borderRadius: "5",
                    color: "#ffffff",
                    top: "1%",
                    bottom: "1%",
                    height: "98%",
                    width: "9%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    text: "Excluir",
                    bindId: "label_acoes"
                },
                events: {
                    click: excluir
                }
            };
            __alloyId555.push(__alloyId559);
            return __alloyId555;
        }(),
        properties: {
            width: "100%",
            layout: "horizontal"
        }
    };
    __alloyId552.push(__alloyId554);
    var __alloyId551 = {
        properties: {
            height: "50",
            backgroundColor: "#cce9e5",
            name: "email_lista"
        },
        childTemplates: __alloyId552
    };
    __alloyId549["email_lista"] = __alloyId551;
    $.__views.__alloyId560 = Ti.UI.createListSection({
        id: "__alloyId560"
    });
    var __alloyId562 = [];
    __alloyId562.push($.__views.__alloyId560);
    $.__views.listaemails = Ti.UI.createListView({
        top: "80",
        height: "80%",
        width: "98%",
        sections: __alloyId562,
        templates: __alloyId549,
        id: "listaemails",
        defaultItemTemplate: "email_lista"
    });
    $.__views.__alloyId544.add($.__views.listaemails);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/api/config.js");
    Ti.include("/database/aparencia.js");
    Ti.include("/database/email.js");
    Ti.include("/api/menu.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    var representante = Ti.App.Properties.getString(CURRENT_USER_ID);
    var epid = Ti.App.Properties.getString(CURRENT_EMPRESA);
    listaEmails();
    __defers["$.__views.__alloyId548!click!novoEmail"] && $.__views.__alloyId548.addEventListener("click", novoEmail);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;