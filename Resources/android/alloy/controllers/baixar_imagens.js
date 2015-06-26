function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function goToClient() {
        $.activityIndicator.setMessage("Download de imagens concluido");
        goTo("seleciona_cliente");
    }
    function goToSoftware() {
        $.activityIndicator.setMessage("Download de imagens concluido");
        goTo("softwares");
    }
    function retrieveData(params) {
        var url = params.URL;
        xhrRequest[xhrCount] = Ti.Network.createHTTPClient({
            timeout: 5e3
        });
        xhrRequest[xhrCount].onerror = function() {
            xhrRequest[xhrCount] = null;
            Ti.API.info("Erro ao Baixar Imagem=" + url);
            xhrCount++;
            loadthenextFile();
        };
        xhrRequest[xhrCount].onload = function() {
            SaveFile(params.folderName, params.fileName, this.responseData);
            xhrRequest[xhrCount] = null;
            loadthenextFile();
        };
        try {
            xhrRequest[xhrCount].open("GET", url);
            xhrRequest[xhrCount].send();
        } catch (e) {
            xhrRequest[xhrCount] = null;
            Ti.API.info("Erro ao Baixar Imagem=" + url);
            xhrCount++;
            loadthenextFile();
        }
    }
    function loadthenextFile() {
        xhrCount > 0 && null == downloadQueue[xhrCount - 1];
        if (xhrCount < downloadQueue.length) {
            var fileUrl = downloadQueue[xhrCount];
            var fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
            fileName = fileName;
            retrieveData({
                URL: fileUrl,
                fileName: fileName,
                folderName: rootDir
            });
            xhrCount++;
            $.activityIndicator.setMessage("Baixando imagem " + xhrCount + " de " + totalimages + "...");
        } else {
            Ti.App.Properties.setString(SYNC, "true");
            Ti.App.Properties.setInt(DATABASE_VERSION, SOFTWARE_DB_VERSION);
            TEST_VERSION ? goToSoftware() : goToClient();
        }
    }
    function SaveFile(foldername, filename, response) {
        var dest = Ti.Filesystem.getFile(rootDir, filename);
        dest.write(response);
    }
    function showIndicator() {
        $.activityIndicator.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "baixar_imagens";
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
    $.__views.baixar_imagens = Ti.UI.createWindow({
        backgroundColor: "white",
        orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT ],
        id: "baixar_imagens"
    });
    $.__views.baixar_imagens && $.addTopLevelView($.__views.baixar_imagens);
    showIndicator ? $.__views.baixar_imagens.addEventListener("open", showIndicator) : __defers["$.__views.baixar_imagens!open!showIndicator"] = true;
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Carregando Imagens..."
    });
    $.__views.baixar_imagens.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/database/imagens_produtos.js");
    Ti.include("/database/aparencia.js");
    Ti.include("/api/config.js");
    var rootDir = getImagesFolder();
    var downloadQueue = [];
    var totalimages = 0;
    var xhrRequest = [];
    var xhrCount = 0;
    var images = selectallImagensProdutos();
    while (images.isValidRow()) {
        var img_tmp = images.fieldByName("img_caminho");
        var img_caminho = img_tmp.replace(/ /g, "%20");
        var dest = Ti.Filesystem.getFile(rootDir, img_caminho);
        if (!dest.exists()) {
            totalimages++;
            downloadQueue.push(URL_CAMINHO_IMAGENS + img_caminho);
        }
        images.next();
    }
    images.close();
    var aparencias = selectallAparencia();
    while (aparencias.isValidRow()) {
        var img_tmp = aparencias.fieldByName("apr_arquivo");
        var img_caminho = img_tmp.replace(/ /g, "%20");
        var dest = Ti.Filesystem.getFile(rootDir, img_caminho);
        if (!dest.exists()) {
            totalimages++;
            downloadQueue.push(URL_CAMINHO_IMAGENS + img_caminho);
        }
        aparencias.next();
    }
    aparencias.close();
    loadthenextFile();
    __defers["$.__views.baixar_imagens!open!showIndicator"] && $.__views.baixar_imagens.addEventListener("open", showIndicator);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;