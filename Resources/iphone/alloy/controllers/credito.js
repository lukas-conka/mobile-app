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
        menuSelection(e.itemIndex);
    }
    function seleciona_cliente() {
        Titanium.UI.currentWindow;
        var dialog = Titanium.UI.createOptionDialog({
            options: clientes_nomes,
            cancel: 0,
            title: "Selecione o Cliente"
        });
        dialog.show();
        dialog.addEventListener("click", function(e) {
            selected_client = e.index;
            selection();
        });
    }
    function selection() {
        var cliente = getClienteCredito(clientes[selected_client]);
        if (cliente.isValidRow()) {
            var razao = cliente.fieldByName("cl_razao");
            $.selecao.text = razao;
        }
    }
    function ir() {
        var cliente = getClienteCredito(clientes[selected_client]);
        if (cliente.isValidRow()) {
            var credito = cliente.fieldByName("cl_credito_total");
            var utilizado = cliente.fieldByName("cl_credito_utilizado");
            var saldo = credito - utilizado;
            var minimo = cliente.fieldByName("cl_valor_minimo");
            $.credito.text = formatCurrency(credito);
            $.utilizado.text = formatCurrency(utilizado);
            $.saldo.text = formatCurrency(saldo);
            $.minimo.text = formatCurrency(minimo);
        }
    }
    function detalhe() {
        if (0 == uso) {
            var cliente = getClienteCredito(clientes[selected_client]);
            if (cliente.isValidRow()) {
                var aviso = cliente.fieldByName("cl_aviso");
                var observacao = cliente.fieldByName("cl_observacao");
                if (0 == aviso) var cor = "#e9aca7"; else if (1 == aviso) var cor = "#e8e79c"; else var cor = "#cfedcf";
                $.avisoDetalhe.text = observacao;
                $.avisoDetalhe.backgroundColor = cor;
            }
            uso = 1;
        } else {
            $.avisoDetalhe.text = "";
            $.avisoDetalhe.backgroundColor = "transparent";
            uso = 0;
        }
    }
    function funcEnviarCredito() {
        var db = dbLoad();
        createTableCredit();
        var pedido_aumento = $.pedido_credito.value;
        var insert_query = "INSERT INTO credito (fk_id_cliente, fk_id_ep, fk_id_representante, mensagem) VALUES( " + selected_client + ", " + epid + ", " + representante + ",'" + pedido_aumento + "');";
        if (pedido_aumento.length > 0) {
            db.execute(insert_query);
            $.pedido_credito.value = "";
        } else Ti.UI.createAlertDialog({
            message: "O campo não pode estar vázio!",
            ok: "Ok",
            title: "Erro, campo vázio:"
        }).show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "credito";
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
    $.__views.credito = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "credito"
    });
    $.__views.credito && $.addTopLevelView($.__views.credito);
    var __alloyId284 = {};
    var __alloyId287 = [];
    var __alloyId289 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId290 = [];
            var __alloyId292 = {
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
            __alloyId290.push(__alloyId292);
            return __alloyId290;
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
    __alloyId287.push(__alloyId289);
    var __alloyId286 = {
        properties: {
            height: "112dp",
            name: "menuTemplate"
        },
        childTemplates: __alloyId287
    };
    __alloyId284["menuTemplate"] = __alloyId286;
    var __alloyId295 = [];
    $.__views.__alloyId296 = {
        btnmenu: {
            text: "CNPJ/\n RAZÃO SOCIAL/\n ENDEREÇO LOJA"
        },
        properties: {
            id: "__alloyId296"
        }
    };
    __alloyId295.push($.__views.__alloyId296);
    $.__views.__alloyId297 = {
        btnmenu: {
            text: "ANÁLISE DE \n CRÉDITO"
        },
        properties: {
            id: "__alloyId297"
        }
    };
    __alloyId295.push($.__views.__alloyId297);
    $.__views.__alloyId298 = {
        btnmenu: {
            text: "IR AO\n CATÁLOGO"
        },
        properties: {
            id: "__alloyId298"
        }
    };
    __alloyId295.push($.__views.__alloyId298);
    $.__views.__alloyId299 = {
        btnmenu: {
            text: "PEDIDOS"
        },
        properties: {
            id: "__alloyId299"
        }
    };
    __alloyId295.push($.__views.__alloyId299);
    $.__views.__alloyId300 = {
        btnmenu: {
            text: "TRANSPORTADORA"
        },
        properties: {
            id: "__alloyId300"
        }
    };
    __alloyId295.push($.__views.__alloyId300);
    $.__views.__alloyId301 = {
        btnmenu: {
            text: "NOVO CLIENTE"
        },
        properties: {
            id: "__alloyId301"
        }
    };
    __alloyId295.push($.__views.__alloyId301);
    $.__views.__alloyId302 = {
        btnmenu: {
            text: "FUNÇÕES"
        },
        properties: {
            id: "__alloyId302"
        }
    };
    __alloyId295.push($.__views.__alloyId302);
    $.__views.__alloyId303 = {
        btnmenu: {
            text: "EMAIL"
        },
        properties: {
            id: "__alloyId303"
        }
    };
    __alloyId295.push($.__views.__alloyId303);
    $.__views.__alloyId304 = {
        btnmenu: {
            text: "VOLTAR PARA TELA INICIAL"
        },
        properties: {
            id: "__alloyId304"
        }
    };
    __alloyId295.push($.__views.__alloyId304);
    $.__views.__alloyId305 = {
        btnmenu: {
            text: "TROCAR\n MARCA"
        },
        properties: {
            id: "__alloyId305"
        }
    };
    __alloyId295.push($.__views.__alloyId305);
    $.__views.__alloyId306 = {
        btnmenu: {
            text: "SAIR"
        },
        properties: {
            id: "__alloyId306"
        }
    };
    __alloyId295.push($.__views.__alloyId306);
    $.__views.__alloyId293 = Ti.UI.createListSection({
        id: "__alloyId293"
    });
    $.__views.__alloyId293.items = __alloyId295;
    var __alloyId307 = [];
    __alloyId307.push($.__views.__alloyId293);
    $.__views.__alloyId283 = Ti.UI.createListView({
        backgroundColor: "#ebf7f6",
        height: "100%",
        left: "0",
        width: "15%",
        sections: __alloyId307,
        templates: __alloyId284,
        defaultItemTemplate: "menuTemplate",
        id: "__alloyId283"
    });
    $.__views.credito.add($.__views.__alloyId283);
    $.__views.__alloyId308 = Ti.UI.createView({
        height: "100%",
        right: "0",
        width: "85%",
        id: "__alloyId308"
    });
    $.__views.credito.add($.__views.__alloyId308);
    $.__views.__alloyId309 = Ti.UI.createView({
        height: "90",
        top: "0",
        width: "98%",
        id: "__alloyId309"
    });
    $.__views.__alloyId308.add($.__views.__alloyId309);
    $.__views.__alloyId310 = Ti.UI.createView({
        height: "90%",
        left: "0",
        width: "15%",
        id: "__alloyId310"
    });
    $.__views.__alloyId309.add($.__views.__alloyId310);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        left: "0",
        id: "logoEmpresa"
    });
    $.__views.__alloyId310.add($.__views.logoEmpresa);
    $.__views.__alloyId311 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4e8789",
        height: "90",
        left: "15%",
        width: "70%",
        title: "ANÁLISE DE CRÉDITO",
        id: "__alloyId311"
    });
    $.__views.__alloyId309.add($.__views.__alloyId311);
    $.__views.__alloyId312 = Ti.UI.createView({
        height: "90",
        left: "85%",
        width: "15%",
        id: "__alloyId312"
    });
    $.__views.__alloyId309.add($.__views.__alloyId312);
    $.__views.__alloyId313 = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        right: "0",
        id: "__alloyId313"
    });
    $.__views.__alloyId312.add($.__views.__alloyId313);
    $.__views.__alloyId314 = Ti.UI.createView({
        borderColor: "#4e8789",
        borderWidth: "4",
        top: "90",
        width: "98%",
        id: "__alloyId314"
    });
    $.__views.__alloyId308.add($.__views.__alloyId314);
    $.__views.__alloyId315 = Ti.UI.createView({
        height: "65%",
        left: "0",
        top: "0",
        width: "50%",
        id: "__alloyId315"
    });
    $.__views.__alloyId314.add($.__views.__alloyId315);
    $.__views.__alloyId316 = Ti.UI.createView({
        height: "50",
        top: "10",
        width: "100%",
        id: "__alloyId316"
    });
    $.__views.__alloyId315.add($.__views.__alloyId316);
    $.__views.selecao = Ti.UI.createLabel({
        color: "black",
        borderColor: "#6EA9A0",
        borderWidth: "4",
        height: "50",
        left: "80",
        width: "300",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "selecao",
        text: "Seleção de cliente"
    });
    $.__views.__alloyId316.add($.__views.selecao);
    $.__views.__alloyId317 = Ti.UI.createView({
        height: "50",
        top: "70",
        width: "100%",
        id: "__alloyId317"
    });
    $.__views.__alloyId315.add($.__views.__alloyId317);
    $.__views.__alloyId318 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#222222",
        height: "50",
        left: "0",
        width: "70",
        title: "DATA",
        id: "__alloyId318"
    });
    $.__views.__alloyId317.add($.__views.__alloyId318);
    $.__views.data = Ti.UI.createLabel({
        color: "black",
        backgroundColor: "#EBEBE4",
        borderColor: "#6EA9A0",
        borderWidth: "4",
        height: "50",
        left: "80",
        width: "220",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "data"
    });
    $.__views.__alloyId317.add($.__views.data);
    $.__views.__alloyId319 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        height: "50",
        left: "310",
        width: "70",
        color: "white",
        title: "Ir",
        id: "__alloyId319"
    });
    $.__views.__alloyId317.add($.__views.__alloyId319);
    ir ? $.__views.__alloyId319.addEventListener("click", ir) : __defers["$.__views.__alloyId319!click!ir"] = true;
    $.__views.__alloyId320 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        left: "8%",
        top: "30%",
        title: "Detalhes",
        id: "__alloyId320"
    });
    $.__views.__alloyId314.add($.__views.__alloyId320);
    detalhe ? $.__views.__alloyId320.addEventListener("click", detalhe) : __defers["$.__views.__alloyId320!click!detalhe"] = true;
    $.__views.avisoDetalhe = Ti.UI.createLabel({
        color: "#000000",
        height: "30",
        left: "20%",
        top: "30%",
        width: "20%",
        id: "avisoDetalhe"
    });
    $.__views.__alloyId314.add($.__views.avisoDetalhe);
    $.__views.__alloyId321 = Ti.UI.createView({
        height: "65%",
        left: "50%",
        top: "0",
        width: "50%",
        id: "__alloyId321"
    });
    $.__views.__alloyId314.add($.__views.__alloyId321);
    $.__views.__alloyId322 = Ti.UI.createView({
        height: "50",
        top: "0",
        width: "100%",
        id: "__alloyId322"
    });
    $.__views.__alloyId321.add($.__views.__alloyId322);
    $.__views.__alloyId323 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "0",
        title: "CRÉDITO",
        id: "__alloyId323"
    });
    $.__views.__alloyId322.add($.__views.__alloyId323);
    $.__views.__alloyId324 = Ti.UI.createView({
        backgroundColor: "#CCE9E5",
        height: "50",
        left: "0",
        top: "45",
        width: "95%",
        id: "__alloyId324"
    });
    $.__views.__alloyId321.add($.__views.__alloyId324);
    $.__views.credito = Ti.UI.createLabel({
        color: "#222222",
        height: "50",
        width: "96%",
        id: "credito"
    });
    $.__views.__alloyId324.add($.__views.credito);
    $.__views.__alloyId325 = Ti.UI.createView({
        height: "50",
        top: "95",
        width: "100%",
        id: "__alloyId325"
    });
    $.__views.__alloyId321.add($.__views.__alloyId325);
    $.__views.__alloyId326 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "0",
        title: "CRÉDITO UTILIZADO",
        id: "__alloyId326"
    });
    $.__views.__alloyId325.add($.__views.__alloyId326);
    $.__views.__alloyId327 = Ti.UI.createView({
        backgroundColor: "#CCE9E5",
        height: "50",
        left: "0",
        top: "140",
        width: "95%",
        id: "__alloyId327"
    });
    $.__views.__alloyId321.add($.__views.__alloyId327);
    $.__views.utilizado = Ti.UI.createLabel({
        color: "#222222",
        height: "50",
        width: "96%",
        id: "utilizado"
    });
    $.__views.__alloyId327.add($.__views.utilizado);
    $.__views.__alloyId328 = Ti.UI.createView({
        height: "50",
        top: "190",
        width: "100%",
        id: "__alloyId328"
    });
    $.__views.__alloyId321.add($.__views.__alloyId328);
    $.__views.__alloyId329 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "0",
        title: "SALDO",
        id: "__alloyId329"
    });
    $.__views.__alloyId328.add($.__views.__alloyId329);
    $.__views.__alloyId330 = Ti.UI.createView({
        backgroundColor: "#CCE9E5",
        height: "50",
        left: "0",
        top: "235",
        width: "95%",
        id: "__alloyId330"
    });
    $.__views.__alloyId321.add($.__views.__alloyId330);
    $.__views.saldo = Ti.UI.createLabel({
        color: "#222222",
        height: "50",
        width: "96%",
        id: "saldo"
    });
    $.__views.__alloyId330.add($.__views.saldo);
    $.__views.__alloyId331 = Ti.UI.createView({
        height: "50",
        top: "285",
        width: "100%",
        id: "__alloyId331"
    });
    $.__views.__alloyId321.add($.__views.__alloyId331);
    $.__views.__alloyId332 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "0",
        title: "VALOR MÍNIMO PARA COMPRA",
        id: "__alloyId332"
    });
    $.__views.__alloyId331.add($.__views.__alloyId332);
    $.__views.__alloyId333 = Ti.UI.createView({
        backgroundColor: "#CCE9E5",
        height: "50",
        left: "0",
        top: "330",
        width: "95%",
        id: "__alloyId333"
    });
    $.__views.__alloyId321.add($.__views.__alloyId333);
    $.__views.minimo = Ti.UI.createLabel({
        color: "#222222",
        height: "50",
        width: "96%",
        id: "minimo"
    });
    $.__views.__alloyId333.add($.__views.minimo);
    $.__views.__alloyId334 = Ti.UI.createView({
        height: "35%",
        top: "65%",
        width: "95%",
        id: "__alloyId334"
    });
    $.__views.__alloyId314.add($.__views.__alloyId334);
    $.__views.__alloyId335 = Ti.UI.createView({
        height: "50",
        top: "0",
        width: "100%",
        id: "__alloyId335"
    });
    $.__views.__alloyId334.add($.__views.__alloyId335);
    $.__views.__alloyId336 = Ti.UI.createButton({
        backgroundColor: "#FFFFFF",
        color: "#4E8789",
        height: "50",
        left: "0",
        title: "PEDIDO DE AUMENTO DE CRÉDITO",
        id: "__alloyId336"
    });
    $.__views.__alloyId335.add($.__views.__alloyId336);
    $.__views.pedido_credito = Ti.UI.createTextField({
        borderColor: "#6EA9A0",
        borderWidth: "4",
        height: "45%",
        top: "45",
        width: "100%",
        color: "black",
        textAlign: "center",
        hintText: "",
        id: "pedido_credito"
    });
    $.__views.__alloyId334.add($.__views.pedido_credito);
    $.__views.__alloyId337 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        bottom: "12",
        height: "50",
        right: "8",
        width: "90",
        color: "white",
        title: "Enviar",
        id: "__alloyId337"
    });
    $.__views.__alloyId334.add($.__views.__alloyId337);
    funcEnviarCredito ? $.__views.__alloyId337.addEventListener("click", funcEnviarCredito) : __defers["$.__views.__alloyId337!click!funcEnviarCredito"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/api/menu.js");
    Ti.include("/database/aparencia.js");
    Ti.include("/api/config.js");
    Ti.include("/database/credito.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    var representante = Ti.App.Properties.getString(CURRENT_USER_ID);
    var epid = Ti.App.Properties.getString(CURRENT_EMPRESA);
    Ti.App.Properties.getString(SELECTED_CLIENTS);
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    var ano = data.getFullYear();
    var selected_client = 0;
    var clientes = [];
    var clientes_nomes = [];
    var meses = [ "janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro" ];
    var pt = dia + " de  " + meses[mes] + " de " + ano;
    $.data.text = "  " + pt;
    $.selecao.addEventListener("click", function() {
        seleciona_cliente();
    });
    var result = getClienteNomes(getSelectedClients().toString());
    while (result.isValidRow()) {
        clientes.push(result.fieldByName("cl_id"));
        clientes_nomes.push(result.fieldByName("cl_razao"));
        result.next();
    }
    selection();
    var uso = 0;
    __defers["$.__views.__alloyId319!click!ir"] && $.__views.__alloyId319.addEventListener("click", ir);
    __defers["$.__views.__alloyId320!click!detalhe"] && $.__views.__alloyId320.addEventListener("click", detalhe);
    __defers["$.__views.__alloyId337!click!funcEnviarCredito"] && $.__views.__alloyId337.addEventListener("click", funcEnviarCredito);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;