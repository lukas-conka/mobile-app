function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function goToCatalogo() {
        goTo("categorias");
    }
    function goToCliente() {
        goTo("seleciona_cliente");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "marca";
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
    $.__views.marca = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "marca"
    });
    $.__views.marca && $.addTopLevelView($.__views.marca);
    $.__views.__alloyId1001 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "100%",
        id: "__alloyId1001"
    });
    $.__views.marca.add($.__views.__alloyId1001);
    $.__views.__alloyId1002 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#000000",
        left: "10",
        title: "SELECIONE A MARCA",
        id: "__alloyId1002"
    });
    $.__views.__alloyId1001.add($.__views.__alloyId1002);
    $.__views.__alloyId1003 = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        right: "10",
        id: "__alloyId1003"
    });
    $.__views.__alloyId1001.add($.__views.__alloyId1003);
    $.__views.corpo = Ti.UI.createView({
        height: "90%",
        top: "10%",
        width: "100%",
        id: "corpo"
    });
    $.__views.marca.add($.__views.corpo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/marcas.js");
    Ti.include("/database/aparencia.js");
    var scrollView = Ti.UI.createScrollView({
        top: 10,
        left: 0,
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: true
    });
    $.corpo.add(scrollView);
    var y = 0;
    var x = 0;
    var linha = 0;
    var coluna = 0;
    var marcas = selectallMarcas(Ti.App.Properties.getString(CURRENT_USER_ID));
    var i = 0;
    var mc_ids = [];
    var software = Ti.App.Properties.getString(CURRENT_SOFTWARE);
    while (marcas.isValidRow()) {
        var mc_id = marcas.fieldByName("mc_id");
        var mc_nome = marcas.fieldByName("mc_nome");
        mc_ids.push(mc_id);
        if (coluna > 3) {
            coluna = 0;
            linha++;
        }
        x = 7 + 22 * coluna;
        y = 190 * linha;
        var view = Titanium.UI.createView({
            backgroundColor: "#f8f8f8",
            borderColor: "#4e8789",
            borderWidth: "1",
            height: "170",
            top: y,
            left: x + "%",
            width: "20%"
        });
        var label = Titanium.UI.createButton({
            backgroundColor: "#f8f8f8",
            color: "#000000",
            height: "20%",
            title: mc_nome,
            top: "0%",
            width: "100%",
            mc_id: mc_id
        });
        label.index = i;
        var button = Titanium.UI.createImageView({
            color: "#000000",
            image: getImagesFolder() + selectImageMarca(mc_id),
            top: "25%",
            width: "70%",
            mc_id: mc_id
        });
        button.index = i;
        label.addEventListener("click", function(e) {
            Ti.App.Properties.setString(SELECTED_MARCA, e.source.mc_id);
            1 == software ? goToCliente() : goToCatalogo();
        });
        button.addEventListener("click", function(e) {
            Ti.App.Properties.setString(SELECTED_MARCA, e.source.mc_id);
            1 == software ? goToCliente() : goToCatalogo();
        });
        view.add(label);
        view.add(button);
        scrollView.add(view);
        coluna++;
        i++;
        marcas.next();
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;