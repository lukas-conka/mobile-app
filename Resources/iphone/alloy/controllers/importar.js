function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function requestFile() {
        var url = URL_SYNC;
        Ti.API.info("Ti.App.Properties.getString(CURRENT_USER_ID)=" + Ti.App.Properties.getString(CURRENT_USER_ID));
        Ti.API.info("Ti.App.Properties.getString(CURRENT_EMPRESA)=" + Ti.App.Properties.getString(CURRENT_EMPRESA));
        var param = {
            ecatalogos_representante_id: Ti.App.Properties.getString(CURRENT_USER_ID),
            ecatalogos_representante_ep_id: Ti.App.Properties.getString(CURRENT_EMPRESA)
        };
        var xhr = Titanium.Network.createHTTPClient({
            timeout: 6e4
        });
        xhr.onerror = function() {
            Ti.API.info("Erro=" + URL_SYNC);
            issueSyncError();
        };
        xhr.onload = function() {
            processResult(this.responseText);
        };
        try {
            xhr.open("POST", url);
            xhr.send(param);
        } catch (e) {
            Ti.API.info("Erro=" + URL_SYNC);
            issueSyncError();
        }
    }
    function processResult(jsonTxt) {
        var jsonObject = JSON.parse(jsonTxt);
        var success = jsonObject.success;
        if ("true" == success) {
            var filename = jsonObject.filename;
            Ti.App.Properties.setString(SYNC_FILE, filename);
            downloadFile();
        } else {
            $.activityIndicator.hide();
            issueSyncError();
        }
    }
    function retrieveData(params) {
        var url = params.URL;
        Ti.API.info("Sincronizando: " + url);
        xhrRequest = Ti.Network.createHTTPClient({
            timeout: 5e3
        });
        xhrRequest.onerror = function() {
            xhrRequest = null;
            Ti.API.info("Erro ao Sincroniar=" + url);
            issueSyncError();
        };
        xhrRequest.onload = function() {
            SaveFile(params.folderName, params.fileName, this.responseData);
            xhrRequest = null;
            var file = Ti.App.Properties.getString(DATABASE_FILE, "empty");
            var newfile;
            if ("empty" != file) {
                var db = Ti.Database.open(file);
                db.remove();
                db = null;
                Ti.API.info("currentfile" + file);
                var tmp = file.split("-");
                var version = parseInt(tmp[1]) + 1;
                version > 1e3 && (version = 1);
                newfile = "ecatalogos-" + version;
                Ti.API.info("newfile" + version);
            } else newfile = "ecatalogos-1";
            Ti.API.info("newfile" + newfile);
            Ti.App.Properties.setString(DATABASE_FILE, newfile);
            var dir = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "../Library/Private Documents/");
            var dir_files = dir.getDirectoryListing();
            for (var i = 1; i < dir_files.length; i++) Ti.API.info("file= " + dir_files[i].toString());
            if ("android" != Ti.Platform.osname) {
                file = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "../Library/Private Documents/", file + ".sql");
                file && file.exists() && Ti.API.info("fileexists");
            }
            db = Ti.Database.install(Titanium.Filesystem.applicationDataDirectory + "database.db", newfile);
            alert(Titanium.Filesystem.applicationDataDirectory);
            db.close();
            db = null;
            verifyImages();
        };
        try {
            xhrRequest.open("GET", url);
            xhrRequest.send();
        } catch (e) {
            xhrRequest = null;
            Ti.API.info("Erro ao Sincroniar=" + url);
            issueSyncError();
        }
    }
    function downloadFile() {
        var fileUrl = Ti.App.Properties.getString(SYNC_FILE);
        var fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
        fileName = fileName;
        retrieveData({
            URL: fileUrl,
            fileName: fileName,
            folderName: rootDir
        });
        $.activityIndicator.setMessage("Sincronizando...");
    }
    function SaveFile(foldername, filename, response) {
        var dest = Ti.Filesystem.getFile(rootDir, "database.db");
        dest.write(response);
    }
    function showIndicator() {
        $.activityIndicator.show();
    }
    function verifyImages() {
        var rootDir = getImagesFolder();
        var images = selectallImagensProdutos();
        var totalimages = 0;
        while (images.isValidRow()) {
            var img_tmp = images.fieldByName("img_caminho");
            var img_caminho = img_tmp.replace(/ /g, "%20");
            var dest = Ti.Filesystem.getFile(rootDir, img_caminho);
            dest.exists() || totalimages++;
            images.next();
        }
        var aparencias = selectallAparencia();
        while (aparencias.isValidRow()) {
            var img_tmp = aparencias.fieldByName("apr_arquivo");
            Ti.API.info(img_tmp);
            var img_caminho = img_tmp.replace(/ /g, "%20");
            var dest = Ti.Filesystem.getFile(rootDir, img_caminho);
            dest.exists() || totalimages++;
            aparencias.next();
        }
        goTo(totalimages > 0 ? "baixar_imagens" : "seleciona_cliente");
    }
    function issueSyncError() {
        Ti.App.Properties.setString(SYNC, "false");
        var alert = Titanium.UI.createAlertDialog({
            title: "Erro",
            message: "Falha ao sincronizar!",
            buttonNames: [ "Ok" ],
            cancel: 0
        });
        alert.addEventListener("click", function() {
            goTo("index");
        });
        alert.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "importar";
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
    $.__views.importar = Ti.UI.createWindow({
        backgroundColor: "white",
        orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT ],
        id: "importar"
    });
    $.__views.importar && $.addTopLevelView($.__views.importar);
    showIndicator ? $.__views.importar.addEventListener("open", showIndicator) : __defers["$.__views.importar!open!showIndicator"] = true;
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Sincronizando, por favor aguarde..."
    });
    $.__views.importar.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/database/imagens_produtos.js");
    Ti.include("/database/aparencia.js");
    Ti.include("/api/config.js");
    var rootDir = Ti.Filesystem.applicationDataDirectory;
    var xhrRequest;
    var products = [];
    var clientes = [];
    Ti.App.Properties.setList(SELECTED_CLIENTS, clientes);
    Ti.App.Properties.setList(SELECTED_PRODUCTS, products);
    requestFile();
    __defers["$.__views.importar!open!showIndicator"] && $.__views.importar.addEventListener("open", showIndicator);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;