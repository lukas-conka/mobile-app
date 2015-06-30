function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function goToListaPedido() {
        goTo("lista_pedido");
    }
    function goToProdutos() {
        goTo("lista_produtos");
    }
    function goToOffline() {
        goTo("seleciona_cliente");
    }
    function goToOnline() {
        var intent = Ti.Android.createIntent({
            action: Ti.Android.ACTION_VIEW,
            data: "http://marcas.e-catalogos.net"
        });
        Ti.Android.currentActivity.startActivity(intent);
    }
    function goToSuporte() {
        goTo("suporte");
    }
    function goToDuvida() {
        goTo("perguntas");
    }
    function goToRelatorio() {}
    function goToVideo() {
        goTo("lista_video");
    }
    function goToEmail() {
        var emailDialog = Titanium.UI.createEmailDialog();
        if (!emailDialog.isSupported()) {
            Ti.UI.createAlertDialog({
                title: "Error",
                message: "Email não disponível nesse dispositivo"
            }).show();
            return;
        }
        emailDialog.setSubject("Suporte Aplicativo E-Catálogos");
        emailDialog.setToRecipients([ "suporte@e-catalogos.net" ]);
        emailDialog.setMessageBody("");
        emailDialog.setHtml(false);
        emailDialog.addEventListener("complete", function(e) {
            e.result == emailDialog.SENT || alert("message não foi enviado!");
        });
    }
    function goToNotificacao() {
        goTo("lista_notificacao");
    }
    function goToSync() {
        goTo("sincronizacao");
    }
    function goToClientes() {
        goTo("lista_clientes");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "funcao";
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
    $.__views.funcao = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        id: "funcao"
    });
    $.__views.funcao && $.addTopLevelView($.__views.funcao);
    $.__views.__alloyId744 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "100%",
        id: "__alloyId744"
    });
    $.__views.funcao.add($.__views.__alloyId744);
    $.__views.__alloyId745 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#000000",
        right: "10",
        title: "FUNÇÕES",
        id: "__alloyId745"
    });
    $.__views.__alloyId744.add($.__views.__alloyId745);
    $.__views.__alloyId746 = Ti.UI.createImageView({
        left: "10",
        id: "__alloyId746"
    });
    $.__views.__alloyId744.add($.__views.__alloyId746);
    $.__views.__alloyId747 = Ti.UI.createView({
        height: "90%",
        top: "10%",
        width: "100%",
        id: "__alloyId747"
    });
    $.__views.funcao.add($.__views.__alloyId747);
    $.__views.__alloyId748 = Ti.UI.createImageView({
        image: "/images/funcao_pedido.jpg",
        height: "auto",
        left: "0%",
        top: "0%",
        width: "25%",
        id: "__alloyId748"
    });
    $.__views.__alloyId747.add($.__views.__alloyId748);
    goToListaPedido ? $.__views.__alloyId748.addEventListener("click", goToListaPedido) : __defers["$.__views.__alloyId748!click!goToListaPedido"] = true;
    $.__views.__alloyId749 = Ti.UI.createImageView({
        image: "/images/funcao_produto.jpg",
        height: "auto",
        left: "25%",
        top: "0%",
        width: "25%",
        id: "__alloyId749"
    });
    $.__views.__alloyId747.add($.__views.__alloyId749);
    goToProdutos ? $.__views.__alloyId749.addEventListener("click", goToProdutos) : __defers["$.__views.__alloyId749!click!goToProdutos"] = true;
    $.__views.__alloyId750 = Ti.UI.createImageView({
        image: "/images/funcao_cliente.jpg",
        height: "auto",
        left: "50%",
        top: "0%",
        width: "25%",
        id: "__alloyId750"
    });
    $.__views.__alloyId747.add($.__views.__alloyId750);
    goToClientes ? $.__views.__alloyId750.addEventListener("click", goToClientes) : __defers["$.__views.__alloyId750!click!goToClientes"] = true;
    $.__views.__alloyId751 = Ti.UI.createImageView({
        image: "/images/funcao_sincronizacao.jpg",
        height: "auto",
        left: "75%",
        top: "0%",
        width: "25%",
        id: "__alloyId751"
    });
    $.__views.__alloyId747.add($.__views.__alloyId751);
    goToSync ? $.__views.__alloyId751.addEventListener("click", goToSync) : __defers["$.__views.__alloyId751!click!goToSync"] = true;
    $.__views.__alloyId752 = Ti.UI.createImageView({
        image: "/images/funcao_notificacao.jpg",
        height: "auto",
        left: "0%",
        width: "25%",
        id: "__alloyId752"
    });
    $.__views.__alloyId747.add($.__views.__alloyId752);
    goToNotificacao ? $.__views.__alloyId752.addEventListener("click", goToNotificacao) : __defers["$.__views.__alloyId752!click!goToNotificacao"] = true;
    $.__views.__alloyId753 = Ti.UI.createImageView({
        image: "/images/funcao_email.jpg",
        height: "auto",
        left: "25%",
        width: "25%",
        id: "__alloyId753"
    });
    $.__views.__alloyId747.add($.__views.__alloyId753);
    goToEmail ? $.__views.__alloyId753.addEventListener("click", goToEmail) : __defers["$.__views.__alloyId753!click!goToEmail"] = true;
    $.__views.__alloyId754 = Ti.UI.createImageView({
        image: "/images/funcao_video.jpg",
        height: "auto",
        left: "50%",
        width: "25%",
        id: "__alloyId754"
    });
    $.__views.__alloyId747.add($.__views.__alloyId754);
    goToVideo ? $.__views.__alloyId754.addEventListener("click", goToVideo) : __defers["$.__views.__alloyId754!click!goToVideo"] = true;
    $.__views.__alloyId755 = Ti.UI.createImageView({
        image: "/images/funcao_relatorio.jpg",
        height: "auto",
        left: "75%",
        width: "25%",
        id: "__alloyId755"
    });
    $.__views.__alloyId747.add($.__views.__alloyId755);
    goToRelatorio ? $.__views.__alloyId755.addEventListener("click", goToRelatorio) : __defers["$.__views.__alloyId755!click!goToRelatorio"] = true;
    $.__views.__alloyId756 = Ti.UI.createImageView({
        image: "/images/funcao_duvida.jpg",
        bottom: "0%",
        height: "auto",
        left: "0%",
        width: "25%",
        id: "__alloyId756"
    });
    $.__views.__alloyId747.add($.__views.__alloyId756);
    goToDuvida ? $.__views.__alloyId756.addEventListener("click", goToDuvida) : __defers["$.__views.__alloyId756!click!goToDuvida"] = true;
    $.__views.__alloyId757 = Ti.UI.createImageView({
        image: "/images/funcao_suporte.jpg",
        bottom: "0%",
        height: "auto",
        left: "25%",
        width: "25%",
        id: "__alloyId757"
    });
    $.__views.__alloyId747.add($.__views.__alloyId757);
    goToSuporte ? $.__views.__alloyId757.addEventListener("click", goToSuporte) : __defers["$.__views.__alloyId757!click!goToSuporte"] = true;
    $.__views.__alloyId758 = Ti.UI.createImageView({
        image: "/images/funcao_online.jpg",
        bottom: "0%",
        height: "auto",
        left: "50%",
        width: "25%",
        id: "__alloyId758"
    });
    $.__views.__alloyId747.add($.__views.__alloyId758);
    goToOnline ? $.__views.__alloyId758.addEventListener("click", goToOnline) : __defers["$.__views.__alloyId758!click!goToOnline"] = true;
    $.__views.__alloyId759 = Ti.UI.createImageView({
        image: "/images/funcao_offline.jpg",
        bottom: "0%",
        height: "auto",
        left: "75%",
        width: "25%",
        id: "__alloyId759"
    });
    $.__views.__alloyId747.add($.__views.__alloyId759);
    goToOffline ? $.__views.__alloyId759.addEventListener("click", goToOffline) : __defers["$.__views.__alloyId759!click!goToOffline"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    __defers["$.__views.__alloyId748!click!goToListaPedido"] && $.__views.__alloyId748.addEventListener("click", goToListaPedido);
    __defers["$.__views.__alloyId749!click!goToProdutos"] && $.__views.__alloyId749.addEventListener("click", goToProdutos);
    __defers["$.__views.__alloyId750!click!goToClientes"] && $.__views.__alloyId750.addEventListener("click", goToClientes);
    __defers["$.__views.__alloyId751!click!goToSync"] && $.__views.__alloyId751.addEventListener("click", goToSync);
    __defers["$.__views.__alloyId752!click!goToNotificacao"] && $.__views.__alloyId752.addEventListener("click", goToNotificacao);
    __defers["$.__views.__alloyId753!click!goToEmail"] && $.__views.__alloyId753.addEventListener("click", goToEmail);
    __defers["$.__views.__alloyId754!click!goToVideo"] && $.__views.__alloyId754.addEventListener("click", goToVideo);
    __defers["$.__views.__alloyId755!click!goToRelatorio"] && $.__views.__alloyId755.addEventListener("click", goToRelatorio);
    __defers["$.__views.__alloyId756!click!goToDuvida"] && $.__views.__alloyId756.addEventListener("click", goToDuvida);
    __defers["$.__views.__alloyId757!click!goToSuporte"] && $.__views.__alloyId757.addEventListener("click", goToSuporte);
    __defers["$.__views.__alloyId758!click!goToOnline"] && $.__views.__alloyId758.addEventListener("click", goToOnline);
    __defers["$.__views.__alloyId759!click!goToOffline"] && $.__views.__alloyId759.addEventListener("click", goToOffline);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;