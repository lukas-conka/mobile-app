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
        menuSelection(e.itemIndex);
    }
    function grava() {
        dbLoad();
        $.idCampoA.value;
        $.idCampoB.value;
        $.idCampoC.value;
        $.idCampoD.value;
        $.idCampoE.value;
        $.idCampoF.value;
        $.idCampoG.value;
        $.idCampoH.value;
        $.idCampoI.value;
        $.idCampoJ.value;
        $.idCampoK.value;
        $.idCampoL.value;
        $.idCampoM.value;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "novo_cliente";
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
    $.__views.novo_cliente = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "novo_cliente"
    });
    $.__views.novo_cliente && $.addTopLevelView($.__views.novo_cliente);
    var __alloyId1028 = {};
    var __alloyId1031 = [];
    var __alloyId1033 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId1034 = [];
            var __alloyId1036 = {
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
            __alloyId1034.push(__alloyId1036);
            return __alloyId1034;
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
    __alloyId1031.push(__alloyId1033);
    var __alloyId1030 = {
        properties: {
            height: "112dp",
            name: "menuTemplate"
        },
        childTemplates: __alloyId1031
    };
    __alloyId1028["menuTemplate"] = __alloyId1030;
    var __alloyId1039 = [];
    $.__views.__alloyId1040 = {
        btnmenu: {
            text: "CNPJ/\n RAZÃO SOCIAL/\n ENDEREÇO LOJA"
        },
        properties: {
            id: "__alloyId1040"
        }
    };
    __alloyId1039.push($.__views.__alloyId1040);
    $.__views.__alloyId1041 = {
        btnmenu: {
            text: "ANÁLISE DE \n CRÉDITO"
        },
        properties: {
            id: "__alloyId1041"
        }
    };
    __alloyId1039.push($.__views.__alloyId1041);
    $.__views.__alloyId1042 = {
        btnmenu: {
            text: "IR AO\n CATÁLOGO"
        },
        properties: {
            id: "__alloyId1042"
        }
    };
    __alloyId1039.push($.__views.__alloyId1042);
    $.__views.__alloyId1043 = {
        btnmenu: {
            text: "PEDIDOS"
        },
        properties: {
            id: "__alloyId1043"
        }
    };
    __alloyId1039.push($.__views.__alloyId1043);
    $.__views.__alloyId1044 = {
        btnmenu: {
            text: "TRANSPORTADORA"
        },
        properties: {
            id: "__alloyId1044"
        }
    };
    __alloyId1039.push($.__views.__alloyId1044);
    $.__views.__alloyId1045 = {
        btnmenu: {
            text: "NOVO CLIENTE"
        },
        properties: {
            id: "__alloyId1045"
        }
    };
    __alloyId1039.push($.__views.__alloyId1045);
    $.__views.__alloyId1046 = {
        btnmenu: {
            text: "FUNÇÕES"
        },
        properties: {
            id: "__alloyId1046"
        }
    };
    __alloyId1039.push($.__views.__alloyId1046);
    $.__views.__alloyId1047 = {
        btnmenu: {
            text: "EMAIL"
        },
        properties: {
            id: "__alloyId1047"
        }
    };
    __alloyId1039.push($.__views.__alloyId1047);
    $.__views.__alloyId1048 = {
        btnmenu: {
            text: "VOLTAR PARA TELA INICIAL"
        },
        properties: {
            id: "__alloyId1048"
        }
    };
    __alloyId1039.push($.__views.__alloyId1048);
    $.__views.__alloyId1049 = {
        btnmenu: {
            text: "TROCAR\n MARCA"
        },
        properties: {
            id: "__alloyId1049"
        }
    };
    __alloyId1039.push($.__views.__alloyId1049);
    $.__views.__alloyId1050 = {
        btnmenu: {
            text: "SAIR"
        },
        properties: {
            id: "__alloyId1050"
        }
    };
    __alloyId1039.push($.__views.__alloyId1050);
    $.__views.__alloyId1037 = Ti.UI.createListSection({
        id: "__alloyId1037"
    });
    $.__views.__alloyId1037.items = __alloyId1039;
    var __alloyId1051 = [];
    __alloyId1051.push($.__views.__alloyId1037);
    $.__views.__alloyId1027 = Ti.UI.createListView({
        backgroundColor: "#ebf7f6",
        height: "100%",
        left: "0",
        width: "15%",
        sections: __alloyId1051,
        templates: __alloyId1028,
        defaultItemTemplate: "menuTemplate",
        id: "__alloyId1027"
    });
    $.__views.novo_cliente.add($.__views.__alloyId1027);
    $.__views.__alloyId1052 = Ti.UI.createView({
        height: "100%",
        right: "0",
        width: "85%",
        id: "__alloyId1052"
    });
    $.__views.novo_cliente.add($.__views.__alloyId1052);
    $.__views.__alloyId1053 = Ti.UI.createView({
        height: "90",
        top: "0",
        width: "98%",
        id: "__alloyId1053"
    });
    $.__views.__alloyId1052.add($.__views.__alloyId1053);
    $.__views.__alloyId1054 = Ti.UI.createView({
        height: "90%",
        left: "0",
        width: "15%",
        id: "__alloyId1054"
    });
    $.__views.__alloyId1053.add($.__views.__alloyId1054);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        id: "logoEmpresa"
    });
    $.__views.__alloyId1054.add($.__views.logoEmpresa);
    $.__views.__alloyId1055 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4e8789",
        height: "90",
        left: "15%",
        width: "70%",
        title: "NOVO CLIENTE",
        id: "__alloyId1055"
    });
    $.__views.__alloyId1053.add($.__views.__alloyId1055);
    $.__views.__alloyId1056 = Ti.UI.createView({
        height: "90",
        left: "85%",
        width: "15%",
        id: "__alloyId1056"
    });
    $.__views.__alloyId1053.add($.__views.__alloyId1056);
    $.__views.__alloyId1057 = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        id: "__alloyId1057"
    });
    $.__views.__alloyId1056.add($.__views.__alloyId1057);
    $.__views.__alloyId1058 = Ti.UI.createView({
        borderColor: "#4e8789",
        borderWidth: "4",
        top: "90",
        width: "98%",
        id: "__alloyId1058"
    });
    $.__views.__alloyId1052.add($.__views.__alloyId1058);
    $.__views.__alloyId1059 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "10",
        top: "0",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "RAZÃO SOCIAL",
        id: "__alloyId1059"
    });
    $.__views.__alloyId1058.add($.__views.__alloyId1059);
    $.__views.idCampoA = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        height: "50",
        left: "10",
        top: "45",
        width: "87%",
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "idCampoA",
        hintText: ""
    });
    $.__views.__alloyId1058.add($.__views.idCampoA);
    $.__views.__alloyId1060 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "10",
        top: "95",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "CNPJ",
        id: "__alloyId1060"
    });
    $.__views.__alloyId1058.add($.__views.__alloyId1060);
    $.__views.idCampoB = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        height: "50",
        left: "10",
        top: "140",
        width: "43%",
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "idCampoB",
        hintText: ""
    });
    $.__views.__alloyId1058.add($.__views.idCampoB);
    $.__views.__alloyId1061 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "45%",
        top: "95",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "INSCRIÇÃO ESTADUAL",
        id: "__alloyId1061"
    });
    $.__views.__alloyId1058.add($.__views.__alloyId1061);
    $.__views.idCampoC = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        height: "50",
        left: "45%",
        top: "140",
        width: "43%",
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "idCampoC",
        hintText: ""
    });
    $.__views.__alloyId1058.add($.__views.idCampoC);
    $.__views.__alloyId1062 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "10",
        top: "190",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "ENDEREÇO",
        id: "__alloyId1062"
    });
    $.__views.__alloyId1058.add($.__views.__alloyId1062);
    $.__views.idCampoD = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        height: "50",
        left: "10",
        top: "235",
        width: "43%",
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "idCampoD",
        hintText: ""
    });
    $.__views.__alloyId1058.add($.__views.idCampoD);
    $.__views.__alloyId1063 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "45%",
        top: "190",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "NÚMERO",
        id: "__alloyId1063"
    });
    $.__views.__alloyId1058.add($.__views.__alloyId1063);
    $.__views.idCampoE = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        height: "50",
        left: "45%",
        top: "235",
        width: "43%",
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "idCampoE",
        hintText: ""
    });
    $.__views.__alloyId1058.add($.__views.idCampoE);
    $.__views.__alloyId1064 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "10",
        top: "285",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "COMPLEMENTO",
        id: "__alloyId1064"
    });
    $.__views.__alloyId1058.add($.__views.__alloyId1064);
    $.__views.idCampoF = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        height: "50",
        left: "10",
        top: "330",
        width: "43%",
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "idCampoF",
        hintText: ""
    });
    $.__views.__alloyId1058.add($.__views.idCampoF);
    $.__views.__alloyId1065 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "45%",
        top: "285",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "CEP",
        id: "__alloyId1065"
    });
    $.__views.__alloyId1058.add($.__views.__alloyId1065);
    $.__views.idCampoG = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        height: "50",
        left: "45%",
        top: "330",
        width: "43%",
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "idCampoG",
        hintText: ""
    });
    $.__views.__alloyId1058.add($.__views.idCampoG);
    $.__views.__alloyId1066 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "10",
        top: "380",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "CIDADE",
        id: "__alloyId1066"
    });
    $.__views.__alloyId1058.add($.__views.__alloyId1066);
    $.__views.idCampoH = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        height: "50",
        left: "10",
        top: "425",
        width: "43%",
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "idCampoH",
        hintText: ""
    });
    $.__views.__alloyId1058.add($.__views.idCampoH);
    $.__views.__alloyId1067 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "45%",
        top: "380",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "UF",
        id: "__alloyId1067"
    });
    $.__views.__alloyId1058.add($.__views.__alloyId1067);
    $.__views.idCampoI = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        height: "50",
        left: "45%",
        top: "425",
        width: "43%",
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "idCampoI",
        hintText: ""
    });
    $.__views.__alloyId1058.add($.__views.idCampoI);
    $.__views.__alloyId1068 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "10",
        top: "475",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "E-MAIL",
        id: "__alloyId1068"
    });
    $.__views.__alloyId1058.add($.__views.__alloyId1068);
    $.__views.idCampoJ = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        height: "50",
        left: "10",
        top: "520",
        width: "43%",
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "idCampoJ",
        hintText: ""
    });
    $.__views.__alloyId1058.add($.__views.idCampoJ);
    $.__views.__alloyId1069 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "45%",
        top: "475",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "TELEFONE",
        id: "__alloyId1069"
    });
    $.__views.__alloyId1058.add($.__views.__alloyId1069);
    $.__views.idCampoK = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        height: "50",
        left: "45%",
        top: "520",
        width: "43%",
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "idCampoK",
        hintText: ""
    });
    $.__views.__alloyId1058.add($.__views.idCampoK);
    $.__views.__alloyId1070 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "10",
        top: "570",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "COMPRADOR",
        id: "__alloyId1070"
    });
    $.__views.__alloyId1058.add($.__views.__alloyId1070);
    $.__views.idCampoL = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        height: "50",
        left: "10",
        top: "615",
        width: "43%",
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "idCampoL",
        hintText: ""
    });
    $.__views.__alloyId1058.add($.__views.idCampoL);
    $.__views.__alloyId1071 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "45%",
        top: "570",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "CARGO",
        id: "__alloyId1071"
    });
    $.__views.__alloyId1058.add($.__views.__alloyId1071);
    $.__views.idCampoM = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        height: "50",
        left: "45%",
        top: "615",
        width: "43%",
        color: "black",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "idCampoM",
        hintText: ""
    });
    $.__views.__alloyId1058.add($.__views.idCampoM);
    $.__views.__alloyId1072 = Ti.UI.createButton({
        backgroundColor: "#216a67",
        bottom: "10",
        height: "50",
        right: "10",
        width: "10%",
        color: "white",
        borderRadius: "5",
        title: "Cadastrar",
        id: "__alloyId1072"
    });
    $.__views.__alloyId1058.add($.__views.__alloyId1072);
    grava ? $.__views.__alloyId1072.addEventListener("click", grava) : __defers["$.__views.__alloyId1072!click!grava"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/api/menu.js");
    Ti.include("/database/aparencia.js");
    Ti.include("/api/config.js");
    Ti.include("/database/credito.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    Ti.App.Properties.getString(CURRENT_USER_ID);
    Ti.App.Properties.getString(CURRENT_EMPRESA);
    var clienteid = Ti.App.Properties.getList(SELECTED_CLIENTS);
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    "INSERT INTO tb_cliente values (" + clienteid[0] + "," + campo + "," + campo1 + "," + campo2 + "," + campo3 + "," + campo4 + "," + campo5 + "," + campo6 + "," + campo6 + "," + campo8 + "," + campo9 + "," + campo10 + "," + campo11 + "," + campo12 + ");";
    __defers["$.__views.__alloyId1072!click!grava"] && $.__views.__alloyId1072.addEventListener("click", grava);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;