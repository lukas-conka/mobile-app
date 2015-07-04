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
    var __alloyId949 = {};
    var __alloyId952 = [];
    var __alloyId954 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId955 = [];
            var __alloyId957 = {
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
            __alloyId955.push(__alloyId957);
            return __alloyId955;
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
    __alloyId952.push(__alloyId954);
    var __alloyId951 = {
        properties: {
            height: "112dp",
            name: "menuTemplate"
        },
        childTemplates: __alloyId952
    };
    __alloyId949["menuTemplate"] = __alloyId951;
    var __alloyId960 = [];
    $.__views.__alloyId961 = {
        btnmenu: {
            text: "CNPJ/\n RAZÃO SOCIAL/\n ENDEREÇO LOJA"
        },
        properties: {
            id: "__alloyId961"
        }
    };
    __alloyId960.push($.__views.__alloyId961);
    $.__views.__alloyId962 = {
        btnmenu: {
            text: "ANÁLISE DE \n CRÉDITO"
        },
        properties: {
            id: "__alloyId962"
        }
    };
    __alloyId960.push($.__views.__alloyId962);
    $.__views.__alloyId963 = {
        btnmenu: {
            text: "IR AO\n CATÁLOGO"
        },
        properties: {
            id: "__alloyId963"
        }
    };
    __alloyId960.push($.__views.__alloyId963);
    $.__views.__alloyId964 = {
        btnmenu: {
            text: "PEDIDOS"
        },
        properties: {
            id: "__alloyId964"
        }
    };
    __alloyId960.push($.__views.__alloyId964);
    $.__views.__alloyId965 = {
        btnmenu: {
            text: "TRANSPORTADORA"
        },
        properties: {
            id: "__alloyId965"
        }
    };
    __alloyId960.push($.__views.__alloyId965);
    $.__views.__alloyId966 = {
        btnmenu: {
            text: "NOVO CLIENTE"
        },
        properties: {
            id: "__alloyId966"
        }
    };
    __alloyId960.push($.__views.__alloyId966);
    $.__views.__alloyId967 = {
        btnmenu: {
            text: "FUNÇÕES"
        },
        properties: {
            id: "__alloyId967"
        }
    };
    __alloyId960.push($.__views.__alloyId967);
    $.__views.__alloyId968 = {
        btnmenu: {
            text: "EMAIL"
        },
        properties: {
            id: "__alloyId968"
        }
    };
    __alloyId960.push($.__views.__alloyId968);
    $.__views.__alloyId969 = {
        btnmenu: {
            text: "VOLTAR PARA TELA INICIAL"
        },
        properties: {
            id: "__alloyId969"
        }
    };
    __alloyId960.push($.__views.__alloyId969);
    $.__views.__alloyId970 = {
        btnmenu: {
            text: "TROCAR\n MARCA"
        },
        properties: {
            id: "__alloyId970"
        }
    };
    __alloyId960.push($.__views.__alloyId970);
    $.__views.__alloyId971 = {
        btnmenu: {
            text: "SAIR"
        },
        properties: {
            id: "__alloyId971"
        }
    };
    __alloyId960.push($.__views.__alloyId971);
    $.__views.__alloyId958 = Ti.UI.createListSection({
        id: "__alloyId958"
    });
    $.__views.__alloyId958.items = __alloyId960;
    var __alloyId972 = [];
    __alloyId972.push($.__views.__alloyId958);
    $.__views.__alloyId948 = Ti.UI.createListView({
        backgroundColor: "#ebf7f6",
        height: "100%",
        left: "0",
        width: "15%",
        sections: __alloyId972,
        templates: __alloyId949,
        defaultItemTemplate: "menuTemplate",
        id: "__alloyId948"
    });
    $.__views.novo_cliente.add($.__views.__alloyId948);
    $.__views.__alloyId973 = Ti.UI.createView({
        height: "100%",
        right: "0",
        width: "85%",
        id: "__alloyId973"
    });
    $.__views.novo_cliente.add($.__views.__alloyId973);
    $.__views.__alloyId974 = Ti.UI.createView({
        height: "90",
        top: "0",
        width: "98%",
        id: "__alloyId974"
    });
    $.__views.__alloyId973.add($.__views.__alloyId974);
    $.__views.__alloyId975 = Ti.UI.createView({
        height: "90%",
        left: "0",
        width: "15%",
        id: "__alloyId975"
    });
    $.__views.__alloyId974.add($.__views.__alloyId975);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        id: "logoEmpresa"
    });
    $.__views.__alloyId975.add($.__views.logoEmpresa);
    $.__views.__alloyId976 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4e8789",
        height: "90",
        left: "15%",
        width: "70%",
        title: "NOVO CLIENTE",
        id: "__alloyId976"
    });
    $.__views.__alloyId974.add($.__views.__alloyId976);
    $.__views.__alloyId977 = Ti.UI.createView({
        height: "90",
        left: "85%",
        width: "15%",
        id: "__alloyId977"
    });
    $.__views.__alloyId974.add($.__views.__alloyId977);
    $.__views.__alloyId978 = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        id: "__alloyId978"
    });
    $.__views.__alloyId977.add($.__views.__alloyId978);
    $.__views.__alloyId979 = Ti.UI.createView({
        borderColor: "#4e8789",
        borderWidth: "4",
        top: "90",
        width: "98%",
        id: "__alloyId979"
    });
    $.__views.__alloyId973.add($.__views.__alloyId979);
    $.__views.__alloyId980 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "10",
        top: "0",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "RAZÃO SOCIAL",
        id: "__alloyId980"
    });
    $.__views.__alloyId979.add($.__views.__alloyId980);
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
    $.__views.__alloyId979.add($.__views.idCampoA);
    $.__views.__alloyId981 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "10",
        top: "95",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "CNPJ",
        id: "__alloyId981"
    });
    $.__views.__alloyId979.add($.__views.__alloyId981);
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
    $.__views.__alloyId979.add($.__views.idCampoB);
    $.__views.__alloyId982 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "45%",
        top: "95",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "INSCRIÇÃO ESTADUAL",
        id: "__alloyId982"
    });
    $.__views.__alloyId979.add($.__views.__alloyId982);
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
    $.__views.__alloyId979.add($.__views.idCampoC);
    $.__views.__alloyId983 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "10",
        top: "190",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "ENDEREÇO",
        id: "__alloyId983"
    });
    $.__views.__alloyId979.add($.__views.__alloyId983);
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
    $.__views.__alloyId979.add($.__views.idCampoD);
    $.__views.__alloyId984 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "45%",
        top: "190",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "NÚMERO",
        id: "__alloyId984"
    });
    $.__views.__alloyId979.add($.__views.__alloyId984);
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
    $.__views.__alloyId979.add($.__views.idCampoE);
    $.__views.__alloyId985 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "10",
        top: "285",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "COMPLEMENTO",
        id: "__alloyId985"
    });
    $.__views.__alloyId979.add($.__views.__alloyId985);
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
    $.__views.__alloyId979.add($.__views.idCampoF);
    $.__views.__alloyId986 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "45%",
        top: "285",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "CEP",
        id: "__alloyId986"
    });
    $.__views.__alloyId979.add($.__views.__alloyId986);
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
    $.__views.__alloyId979.add($.__views.idCampoG);
    $.__views.__alloyId987 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "10",
        top: "380",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "CIDADE",
        id: "__alloyId987"
    });
    $.__views.__alloyId979.add($.__views.__alloyId987);
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
    $.__views.__alloyId979.add($.__views.idCampoH);
    $.__views.__alloyId988 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "45%",
        top: "380",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "UF",
        id: "__alloyId988"
    });
    $.__views.__alloyId979.add($.__views.__alloyId988);
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
    $.__views.__alloyId979.add($.__views.idCampoI);
    $.__views.__alloyId989 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "10",
        top: "475",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "E-MAIL",
        id: "__alloyId989"
    });
    $.__views.__alloyId979.add($.__views.__alloyId989);
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
    $.__views.__alloyId979.add($.__views.idCampoJ);
    $.__views.__alloyId990 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "45%",
        top: "475",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "TELEFONE",
        id: "__alloyId990"
    });
    $.__views.__alloyId979.add($.__views.__alloyId990);
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
    $.__views.__alloyId979.add($.__views.idCampoK);
    $.__views.__alloyId991 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "10",
        top: "570",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "COMPRADOR",
        id: "__alloyId991"
    });
    $.__views.__alloyId979.add($.__views.__alloyId991);
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
    $.__views.__alloyId979.add($.__views.idCampoL);
    $.__views.__alloyId992 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "45%",
        top: "570",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        title: "CARGO",
        id: "__alloyId992"
    });
    $.__views.__alloyId979.add($.__views.__alloyId992);
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
    $.__views.__alloyId979.add($.__views.idCampoM);
    $.__views.__alloyId993 = Ti.UI.createButton({
        backgroundColor: "#216a67",
        bottom: "10",
        height: "50",
        right: "10",
        width: "10%",
        color: "white",
        borderRadius: "5",
        title: "Cadastrar",
        id: "__alloyId993"
    });
    $.__views.__alloyId979.add($.__views.__alloyId993);
    grava ? $.__views.__alloyId993.addEventListener("click", grava) : __defers["$.__views.__alloyId993!click!grava"] = true;
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
    Ti.App.Properties.getList(SELECTED_CLIENTS);
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    __defers["$.__views.__alloyId993!click!grava"] && $.__views.__alloyId993.addEventListener("click", grava);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;