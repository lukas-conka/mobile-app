function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function cristal() {
        Ti.App.Properties.setString(CURRENT_SOFTWARE, 1);
        goToMarca();
    }
    function esmeralda() {
        Ti.App.Properties.setString(CURRENT_SOFTWARE, 2);
        goToCatalogo();
    }
    function rubi() {
        Ti.App.Properties.setString(CURRENT_SOFTWARE, 3);
        goToCatalogo();
    }
    function safira() {
        Ti.App.Properties.setString(CURRENT_SOFTWARE, 4);
        goToCatalogo();
    }
    function goToCatalogo() {
        goTo("seleciona_cliente");
    }
    function goToMarca() {
        goTo("marca");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "softwares";
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
    $.__views.softwares = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "softwares"
    });
    $.__views.softwares && $.addTopLevelView($.__views.softwares);
    $.__views.__alloyId1342 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId1342"
    });
    $.__views.softwares.add($.__views.__alloyId1342);
    $.__views.__alloyId1343 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "100%",
        id: "__alloyId1343"
    });
    $.__views.__alloyId1342.add($.__views.__alloyId1343);
    $.__views.__alloyId1344 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#000000",
        left: "10",
        title: "SELECIONE O TIPO DE SOFTWARE",
        id: "__alloyId1344"
    });
    $.__views.__alloyId1343.add($.__views.__alloyId1344);
    $.__views.__alloyId1345 = Ti.UI.createImageView({
        id: "__alloyId1345"
    });
    $.__views.__alloyId1343.add($.__views.__alloyId1345);
    $.__views.__alloyId1346 = Ti.UI.createView({
        top: "2%",
        height: "45%",
        width: "90%",
        layout: "horizontal",
        id: "__alloyId1346"
    });
    $.__views.__alloyId1342.add($.__views.__alloyId1346);
    $.__views.__alloyId1347 = Ti.UI.createImageView({
        top: 0,
        width: "37%",
        image: "/images/cristal.png",
        id: "__alloyId1347"
    });
    $.__views.__alloyId1346.add($.__views.__alloyId1347);
    $.__views.__alloyId1348 = Ti.UI.createView({
        left: "2%",
        width: "10%",
        height: "100%",
        layout: "vertical",
        id: "__alloyId1348"
    });
    $.__views.__alloyId1346.add($.__views.__alloyId1348);
    $.__views.__alloyId1349 = Ti.UI.createImageView({
        top: "10%",
        image: "/images/tutorial.png",
        width: "100%",
        id: "__alloyId1349"
    });
    $.__views.__alloyId1348.add($.__views.__alloyId1349);
    $.__views.__alloyId1350 = Ti.UI.createImageView({
        top: "2%",
        image: "/images/select_cristal.png",
        width: "100%",
        id: "__alloyId1350"
    });
    $.__views.__alloyId1348.add($.__views.__alloyId1350);
    cristal ? $.__views.__alloyId1350.addEventListener("click", cristal) : __defers["$.__views.__alloyId1350!click!cristal"] = true;
    $.__views.__alloyId1351 = Ti.UI.createImageView({
        top: 0,
        left: "2%",
        width: "37%",
        image: "/images/esmeralda.png",
        id: "__alloyId1351"
    });
    $.__views.__alloyId1346.add($.__views.__alloyId1351);
    $.__views.__alloyId1352 = Ti.UI.createView({
        left: "2%",
        width: "10%",
        height: "100%",
        layout: "vertical",
        id: "__alloyId1352"
    });
    $.__views.__alloyId1346.add($.__views.__alloyId1352);
    $.__views.__alloyId1353 = Ti.UI.createImageView({
        top: "10%",
        image: "/images/tutorial.png",
        width: "100%",
        id: "__alloyId1353"
    });
    $.__views.__alloyId1352.add($.__views.__alloyId1353);
    $.__views.__alloyId1354 = Ti.UI.createImageView({
        top: "2%",
        image: "/images/select_esmeralda.png",
        width: "100%",
        id: "__alloyId1354"
    });
    $.__views.__alloyId1352.add($.__views.__alloyId1354);
    esmeralda ? $.__views.__alloyId1354.addEventListener("click", esmeralda) : __defers["$.__views.__alloyId1354!click!esmeralda"] = true;
    $.__views.__alloyId1355 = Ti.UI.createView({
        top: "2%",
        height: "45%",
        width: "90%",
        layout: "horizontal",
        id: "__alloyId1355"
    });
    $.__views.__alloyId1342.add($.__views.__alloyId1355);
    $.__views.__alloyId1356 = Ti.UI.createImageView({
        top: 0,
        width: "37%",
        image: "/images/rubi.png",
        id: "__alloyId1356"
    });
    $.__views.__alloyId1355.add($.__views.__alloyId1356);
    $.__views.__alloyId1357 = Ti.UI.createView({
        left: "2%",
        width: "10%",
        height: "100%",
        layout: "vertical",
        id: "__alloyId1357"
    });
    $.__views.__alloyId1355.add($.__views.__alloyId1357);
    $.__views.__alloyId1358 = Ti.UI.createImageView({
        top: "10%",
        image: "/images/tutorial.png",
        width: "100%",
        id: "__alloyId1358"
    });
    $.__views.__alloyId1357.add($.__views.__alloyId1358);
    $.__views.__alloyId1359 = Ti.UI.createImageView({
        top: "2%",
        image: "/images/select_rubi.png",
        width: "100%",
        id: "__alloyId1359"
    });
    $.__views.__alloyId1357.add($.__views.__alloyId1359);
    rubi ? $.__views.__alloyId1359.addEventListener("click", rubi) : __defers["$.__views.__alloyId1359!click!rubi"] = true;
    $.__views.__alloyId1360 = Ti.UI.createImageView({
        top: 0,
        left: "2%",
        width: "37%",
        image: "/images/safira.png",
        id: "__alloyId1360"
    });
    $.__views.__alloyId1355.add($.__views.__alloyId1360);
    $.__views.__alloyId1361 = Ti.UI.createView({
        left: "2%",
        width: "10%",
        height: "100%",
        layout: "vertical",
        id: "__alloyId1361"
    });
    $.__views.__alloyId1355.add($.__views.__alloyId1361);
    $.__views.__alloyId1362 = Ti.UI.createImageView({
        top: "10%",
        image: "/images/tutorial.png",
        width: "100%",
        id: "__alloyId1362"
    });
    $.__views.__alloyId1361.add($.__views.__alloyId1362);
    $.__views.__alloyId1363 = Ti.UI.createImageView({
        top: "2%",
        image: "/images/select_safira.png",
        width: "100%",
        id: "__alloyId1363"
    });
    $.__views.__alloyId1361.add($.__views.__alloyId1363);
    safira ? $.__views.__alloyId1363.addEventListener("click", safira) : __defers["$.__views.__alloyId1363!click!safira"] = true;
    $.__views.__alloyId1364 = Ti.UI.createButton({
        title: "Cristal",
        id: "__alloyId1364"
    });
    $.__views.__alloyId1342.add($.__views.__alloyId1364);
    cristal ? $.__views.__alloyId1364.addEventListener("click", cristal) : __defers["$.__views.__alloyId1364!click!cristal"] = true;
    $.__views.__alloyId1365 = Ti.UI.createButton({
        title: "Esmeralda",
        id: "__alloyId1365"
    });
    $.__views.__alloyId1342.add($.__views.__alloyId1365);
    esmeralda ? $.__views.__alloyId1365.addEventListener("click", esmeralda) : __defers["$.__views.__alloyId1365!click!esmeralda"] = true;
    $.__views.__alloyId1366 = Ti.UI.createButton({
        title: "Rubi",
        id: "__alloyId1366"
    });
    $.__views.__alloyId1342.add($.__views.__alloyId1366);
    rubi ? $.__views.__alloyId1366.addEventListener("click", rubi) : __defers["$.__views.__alloyId1366!click!rubi"] = true;
    $.__views.__alloyId1367 = Ti.UI.createButton({
        title: "Safira",
        id: "__alloyId1367"
    });
    $.__views.__alloyId1342.add($.__views.__alloyId1367);
    safira ? $.__views.__alloyId1367.addEventListener("click", safira) : __defers["$.__views.__alloyId1367!click!safira"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId1350!click!cristal"] && $.__views.__alloyId1350.addEventListener("click", cristal);
    __defers["$.__views.__alloyId1354!click!esmeralda"] && $.__views.__alloyId1354.addEventListener("click", esmeralda);
    __defers["$.__views.__alloyId1359!click!rubi"] && $.__views.__alloyId1359.addEventListener("click", rubi);
    __defers["$.__views.__alloyId1363!click!safira"] && $.__views.__alloyId1363.addEventListener("click", safira);
    __defers["$.__views.__alloyId1364!click!cristal"] && $.__views.__alloyId1364.addEventListener("click", cristal);
    __defers["$.__views.__alloyId1365!click!esmeralda"] && $.__views.__alloyId1365.addEventListener("click", esmeralda);
    __defers["$.__views.__alloyId1366!click!rubi"] && $.__views.__alloyId1366.addEventListener("click", rubi);
    __defers["$.__views.__alloyId1367!click!safira"] && $.__views.__alloyId1367.addEventListener("click", safira);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;