function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function login() {
        if (0 == $.loginChave.value.length || 0 == $.loginUsuario.value.length || 0 == $.loginSenha.value.length) alert("Favor preencher os dados corretamente"); else {
            $.activityIndicator.show();
            var url = URL_LOGIN;
            var chave = $.loginChave.value;
            var usuario = $.loginUsuario.value;
            var senha = $.loginSenha.value;
            var param = {
                ecatalogos_representante_chave: chave,
                ecatalogos_representante_usuario: usuario,
                ecatalogos_representante_senha: senha
            };
            var xhr = Titanium.Network.createHTTPClient();
            xhr.onerror = function() {
                loginError();
            };
            xhr.onload = function() {
                processResult(this.responseText);
            };
            try {
                xhr.open("POST", url);
                xhr.send(param);
            } catch (e) {
                loginError();
            }
        }
    }
    function processResult(jsonTxt) {
        var jsonObject = JSON.parse(jsonTxt);
        var success = jsonObject.success;
        if ("true" == success) {
            var idusuario = jsonObject.idusuario;
            var nomecompleto = jsonObject.nomecompleto;
            var emailusuario = jsonObject.emailusuario;
            var idempresa = jsonObject.idempresa;
            var politica = jsonObject.politica;
            var filename = jsonObject.filename;
            Ti.App.Properties.setString(LOGIN, "true");
            Ti.App.Properties.setString(CURRENT_USER_ID, idusuario);
            Ti.App.Properties.setString(CURRENT_USER_NAME, nomecompleto);
            Ti.App.Properties.setString(CURRENT_USER_EMAIL, emailusuario);
            Ti.App.Properties.setString(CURRENT_EMPRESA, idempresa);
            Ti.App.Properties.setString(CURRENT_SOFTWARE, politica);
            Ti.App.Properties.setString(SYNC_FILE, filename);
            goToImportar();
        } else {
            $.activityIndicator.hide();
            alert("Usuário, chave ou senha inválidos!");
        }
    }
    function goToImportar() {
        var importar = Alloy.createController("importar").getView();
        importar.open({
            fullscreen: true,
            navBarHidden: true
        });
    }
    function goToIndex() {
        var index = Alloy.createController("index").getView();
        index.open({
            fullscreen: true,
            navBarHidden: true
        });
    }
    function loginError() {
        $.activityIndicator.hide();
        alert("Falha de comunicação");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
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
    $.__views.login = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "login"
    });
    $.__views.login && $.addTopLevelView($.__views.login);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Aguarde..."
    });
    $.__views.login.add($.__views.activityIndicator);
    $.__views.mensagem_login = Ti.UI.createImageView({
        top: "50px",
        id: "mensagem_login",
        image: "/images/mensagem_login.jpg"
    });
    $.__views.login.add($.__views.mensagem_login);
    $.__views.login_layout = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        layout: "horizontal",
        title: "centered",
        id: "login_layout"
    });
    $.__views.login.add($.__views.login_layout);
    $.__views.loginChave = Ti.UI.createTextField({
        borderColor: "#6ea9a0",
        borderRadius: 5,
        color: "black",
        width: 90,
        height: 48,
        left: 10,
        font: {
            fontSize: 10
        },
        id: "loginChave",
        hintText: "CHAVE"
    });
    $.__views.login_layout.add($.__views.loginChave);
    $.__views.loginUsuario = Ti.UI.createTextField({
        borderColor: "#6ea9a0",
        borderRadius: 5,
        color: "black",
        width: 90,
        height: 48,
        left: 10,
        font: {
            fontSize: 10
        },
        id: "loginUsuario",
        hintText: "LOGIN"
    });
    $.__views.login_layout.add($.__views.loginUsuario);
    $.__views.loginSenha = Ti.UI.createTextField({
        borderColor: "#6ea9a0",
        borderRadius: 5,
        color: "black",
        width: 90,
        height: 48,
        left: 10,
        font: {
            fontSize: 10
        },
        id: "loginSenha",
        hintText: "SENHA"
    });
    $.__views.login_layout.add($.__views.loginSenha);
    $.__views.default_button = Ti.UI.createButton({
        title: "Ir",
        id: "default_button"
    });
    $.__views.login_layout.add($.__views.default_button);
    login ? $.__views.default_button.addEventListener("click", login) : __defers["$.__views.default_button!click!login"] = true;
    $.__views.default_button = Ti.UI.createButton({
        title: "Voltar",
        id: "default_button"
    });
    $.__views.login_layout.add($.__views.default_button);
    goToIndex ? $.__views.default_button.addEventListener("click", goToIndex) : __defers["$.__views.default_button!click!goToIndex"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/api/config.js");
    $.activityIndicator.hide();
    if (TEST_VERSION) {
        $.loginChave.value = "1003";
        $.loginUsuario.value = "teste";
        $.loginSenha.value = "123";
    }
    __defers["$.__views.default_button!click!login"] && $.__views.default_button.addEventListener("click", login);
    __defers["$.__views.default_button!click!goToIndex"] && $.__views.default_button.addEventListener("click", goToIndex);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;