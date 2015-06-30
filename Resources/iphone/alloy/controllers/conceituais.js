function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "conceituais";
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
    $.__views.conceituais = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "conceituais"
    });
    $.__views.conceituais && $.addTopLevelView($.__views.conceituais);
    $.__views.__alloyId266 = Ti.UI.createView({
        height: "100%",
        left: "0",
        width: "15%",
        id: "__alloyId266"
    });
    $.__views.conceituais.add($.__views.__alloyId266);
    $.__views.__alloyId267 = Ti.UI.createImageView({
        height: "15%",
        top: "0",
        width: "100%",
        id: "__alloyId267"
    });
    $.__views.__alloyId266.add($.__views.__alloyId267);
    $.__views.__alloyId268 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#000000",
        height: "5%",
        top: "15%",
        width: "100%",
        title: "Categorias",
        id: "__alloyId268"
    });
    $.__views.__alloyId266.add($.__views.__alloyId268);
    var __alloyId272 = [];
    $.__views.__alloyId273 = {
        properties: {
            backgroundColor: "#3e3935",
            borderColor: "#008382",
            borderWidth: "4",
            color: "#ffffff",
            height: "60",
            top: "10",
            width: "90%",
            title: "Exemplo",
            id: "__alloyId273"
        }
    };
    __alloyId272.push($.__views.__alloyId273);
    $.__views.__alloyId270 = Ti.UI.createListSection({
        id: "__alloyId270"
    });
    $.__views.__alloyId270.items = __alloyId272;
    var __alloyId274 = [];
    __alloyId274.push($.__views.__alloyId270);
    $.__views.__alloyId269 = Ti.UI.createListView({
        backgroundColor: "#d0e2e6",
        borderColor: "#008382",
        borderWidth: "4",
        height: "80%",
        top: "20%",
        width: "100%",
        sections: __alloyId274,
        id: "__alloyId269"
    });
    $.__views.__alloyId266.add($.__views.__alloyId269);
    $.__views.__alloyId275 = Ti.UI.createView({
        height: "10%",
        left: "15%",
        top: "0",
        width: "85%",
        id: "__alloyId275"
    });
    $.__views.conceituais.add($.__views.__alloyId275);
    $.__views.__alloyId276 = Ti.UI.createView({
        height: "100%",
        left: "0",
        width: "25%",
        id: "__alloyId276"
    });
    $.__views.__alloyId275.add($.__views.__alloyId276);
    $.__views.__alloyId277 = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        left: "5%",
        id: "__alloyId277"
    });
    $.__views.__alloyId276.add($.__views.__alloyId277);
    $.__views.__alloyId278 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#008382",
        height: "100%",
        left: "25%",
        width: "50%",
        title: "Fotos conceituais de nosso Catálogo:",
        id: "__alloyId278"
    });
    $.__views.__alloyId275.add($.__views.__alloyId278);
    $.__views.__alloyId279 = Ti.UI.createView({
        height: "100%",
        left: "75%",
        width: "25%",
        id: "__alloyId279"
    });
    $.__views.__alloyId275.add($.__views.__alloyId279);
    $.__views.__alloyId280 = Ti.UI.createButton({
        backgroundColor: "#008382",
        borderRadius: "5",
        color: "#ffffff",
        height: "60%",
        right: "55%",
        width: "45%",
        title: "ALTERAR MARCA",
        id: "__alloyId280"
    });
    $.__views.__alloyId279.add($.__views.__alloyId280);
    $.__views.__alloyId281 = Ti.UI.createButton({
        backgroundColor: "#008382",
        borderRadius: "5",
        color: "#ffffff",
        height: "60%",
        right: "5%",
        width: "45%",
        title: "MENU",
        id: "__alloyId281"
    });
    $.__views.__alloyId279.add($.__views.__alloyId281);
    $.__views.__alloyId282 = Ti.UI.createView({
        height: "90%",
        left: "15%",
        top: "10%",
        width: "85%",
        id: "__alloyId282"
    });
    $.__views.conceituais.add($.__views.__alloyId282);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;