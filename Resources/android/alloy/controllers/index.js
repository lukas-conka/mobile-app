function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function goToVideo() {}
    function verifyVersions() {
        if (Ti.App.Properties.getInt(DATABASE_VERSION) != SOFTWARE_DB_VERSION && "true" == Ti.App.Properties.getString(LOGIN)) {
            Ti.App.Properties.setString(SYNC, "false");
            Ti.App.Properties.setInt(DATABASE_VERSION, SOFTWARE_DB_VERSION);
            alert("Os dados do seu aplicativo estão desatualizados, será necessário fazer uma sincronia antes de utilizar o sistema");
        }
    }
    function nextStage() {
        var login = Ti.App.Properties.getString(LOGIN);
        var sync = Ti.App.Properties.getString(SYNC);
        "true" == login && "true" == sync ? TEST_VERSION && goToCatalogo() : "true" == login ? goToImportar() : goToLogin();
    }
    function goToLogin() {
        goTo("login");
    }
    function goToImportar() {
        goTo("importar");
    }
    function goToCatalogo() {
        goTo("seleciona_cliente");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.index_mensagem = Ti.UI.createImageView({
        image: "/images/mensagem.jpg",
        top: "100px",
        id: "index_mensagem"
    });
    $.__views.index.add($.__views.index_mensagem);
    $.__views.index_layout = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        layout: "horizontal",
        title: "centered",
        top: "400px",
        id: "index_layout"
    });
    $.__views.index.add($.__views.index_layout);
    $.__views.index_botao_video = Ti.UI.createImageView({
        image: "/images/botao1.jpg",
        id: "index_botao_video"
    });
    $.__views.index_layout.add($.__views.index_botao_video);
    goToVideo ? $.__views.index_botao_video.addEventListener("click", goToVideo) : __defers["$.__views.index_botao_video!click!goToVideo"] = true;
    $.__views.index_botao_ircatalogos = Ti.UI.createImageView({
        image: "/images/botao3.jpg",
        left: "30px",
        id: "index_botao_ircatalogos"
    });
    $.__views.index_layout.add($.__views.index_botao_ircatalogos);
    nextStage ? $.__views.index_botao_ircatalogos.addEventListener("click", nextStage) : __defers["$.__views.index_botao_ircatalogos!click!nextStage"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/carrinho.js");
    verifyVersions();
    var session = Ti.App.Properties.getString(SESSION_ID);
    session ? "" == session && resetSession() : resetSession();
    $.index.open({
        fullscreen: true,
        navBarHidden: true
    });
    __defers["$.__views.index_botao_video!click!goToVideo"] && $.__views.index_botao_video.addEventListener("click", goToVideo);
    __defers["$.__views.index_botao_ircatalogos!click!nextStage"] && $.__views.index_botao_ircatalogos.addEventListener("click", nextStage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;