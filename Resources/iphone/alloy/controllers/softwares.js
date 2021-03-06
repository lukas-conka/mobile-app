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
    $.__views.__alloyId1423 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId1423"
    });
    $.__views.softwares.add($.__views.__alloyId1423);
    $.__views.__alloyId1424 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "100%",
        id: "__alloyId1424"
    });
    $.__views.__alloyId1423.add($.__views.__alloyId1424);
    $.__views.__alloyId1425 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#000000",
        left: "10",
        title: "SELECIONE O TIPO DE SOFTWARE",
        id: "__alloyId1425"
    });
    $.__views.__alloyId1424.add($.__views.__alloyId1425);
    $.__views.__alloyId1426 = Ti.UI.createImageView({
        id: "__alloyId1426"
    });
    $.__views.__alloyId1424.add($.__views.__alloyId1426);
    $.__views.__alloyId1427 = Ti.UI.createView({
        top: "2%",
        height: "45%",
        width: "90%",
        layout: "horizontal",
        id: "__alloyId1427"
    });
    $.__views.__alloyId1423.add($.__views.__alloyId1427);
    $.__views.__alloyId1428 = Ti.UI.createImageView({
        top: 0,
        width: "37%",
        image: "/images/cristal.png",
        id: "__alloyId1428"
    });
    $.__views.__alloyId1427.add($.__views.__alloyId1428);
    $.__views.__alloyId1429 = Ti.UI.createView({
        left: "2%",
        width: "10%",
        height: "100%",
        layout: "vertical",
        id: "__alloyId1429"
    });
    $.__views.__alloyId1427.add($.__views.__alloyId1429);
    $.__views.__alloyId1430 = Ti.UI.createImageView({
        top: "10%",
        image: "/images/tutorial.png",
        width: "100%",
        id: "__alloyId1430"
    });
    $.__views.__alloyId1429.add($.__views.__alloyId1430);
    $.__views.__alloyId1431 = Ti.UI.createImageView({
        top: "2%",
        image: "/images/select_cristal.png",
        width: "100%",
        id: "__alloyId1431"
    });
    $.__views.__alloyId1429.add($.__views.__alloyId1431);
    cristal ? $.__views.__alloyId1431.addEventListener("click", cristal) : __defers["$.__views.__alloyId1431!click!cristal"] = true;
    $.__views.__alloyId1432 = Ti.UI.createImageView({
        top: 0,
        left: "2%",
        width: "37%",
        image: "/images/esmeralda.png",
        id: "__alloyId1432"
    });
    $.__views.__alloyId1427.add($.__views.__alloyId1432);
    $.__views.__alloyId1433 = Ti.UI.createView({
        left: "2%",
        width: "10%",
        height: "100%",
        layout: "vertical",
        id: "__alloyId1433"
    });
    $.__views.__alloyId1427.add($.__views.__alloyId1433);
    $.__views.__alloyId1434 = Ti.UI.createImageView({
        top: "10%",
        image: "/images/tutorial.png",
        width: "100%",
        id: "__alloyId1434"
    });
    $.__views.__alloyId1433.add($.__views.__alloyId1434);
    $.__views.__alloyId1435 = Ti.UI.createImageView({
        top: "2%",
        image: "/images/select_esmeralda.png",
        width: "100%",
        id: "__alloyId1435"
    });
    $.__views.__alloyId1433.add($.__views.__alloyId1435);
    esmeralda ? $.__views.__alloyId1435.addEventListener("click", esmeralda) : __defers["$.__views.__alloyId1435!click!esmeralda"] = true;
    $.__views.__alloyId1436 = Ti.UI.createView({
        top: "2%",
        height: "45%",
        width: "90%",
        layout: "horizontal",
        id: "__alloyId1436"
    });
    $.__views.__alloyId1423.add($.__views.__alloyId1436);
    $.__views.__alloyId1437 = Ti.UI.createImageView({
        top: 0,
        width: "37%",
        image: "/images/rubi.png",
        id: "__alloyId1437"
    });
    $.__views.__alloyId1436.add($.__views.__alloyId1437);
    $.__views.__alloyId1438 = Ti.UI.createView({
        left: "2%",
        width: "10%",
        height: "100%",
        layout: "vertical",
        id: "__alloyId1438"
    });
    $.__views.__alloyId1436.add($.__views.__alloyId1438);
    $.__views.__alloyId1439 = Ti.UI.createImageView({
        top: "10%",
        image: "/images/tutorial.png",
        width: "100%",
        id: "__alloyId1439"
    });
    $.__views.__alloyId1438.add($.__views.__alloyId1439);
    $.__views.__alloyId1440 = Ti.UI.createImageView({
        top: "2%",
        image: "/images/select_rubi.png",
        width: "100%",
        id: "__alloyId1440"
    });
    $.__views.__alloyId1438.add($.__views.__alloyId1440);
    rubi ? $.__views.__alloyId1440.addEventListener("click", rubi) : __defers["$.__views.__alloyId1440!click!rubi"] = true;
    $.__views.__alloyId1441 = Ti.UI.createImageView({
        top: 0,
        left: "2%",
        width: "37%",
        image: "/images/safira.png",
        id: "__alloyId1441"
    });
    $.__views.__alloyId1436.add($.__views.__alloyId1441);
    $.__views.__alloyId1442 = Ti.UI.createView({
        left: "2%",
        width: "10%",
        height: "100%",
        layout: "vertical",
        id: "__alloyId1442"
    });
    $.__views.__alloyId1436.add($.__views.__alloyId1442);
    $.__views.__alloyId1443 = Ti.UI.createImageView({
        top: "10%",
        image: "/images/tutorial.png",
        width: "100%",
        id: "__alloyId1443"
    });
    $.__views.__alloyId1442.add($.__views.__alloyId1443);
    $.__views.__alloyId1444 = Ti.UI.createImageView({
        top: "2%",
        image: "/images/select_safira.png",
        width: "100%",
        id: "__alloyId1444"
    });
    $.__views.__alloyId1442.add($.__views.__alloyId1444);
    safira ? $.__views.__alloyId1444.addEventListener("click", safira) : __defers["$.__views.__alloyId1444!click!safira"] = true;
    $.__views.__alloyId1445 = Ti.UI.createButton({
        title: "Cristal",
        id: "__alloyId1445"
    });
    $.__views.__alloyId1423.add($.__views.__alloyId1445);
    cristal ? $.__views.__alloyId1445.addEventListener("click", cristal) : __defers["$.__views.__alloyId1445!click!cristal"] = true;
    $.__views.__alloyId1446 = Ti.UI.createButton({
        title: "Esmeralda",
        id: "__alloyId1446"
    });
    $.__views.__alloyId1423.add($.__views.__alloyId1446);
    esmeralda ? $.__views.__alloyId1446.addEventListener("click", esmeralda) : __defers["$.__views.__alloyId1446!click!esmeralda"] = true;
    $.__views.__alloyId1447 = Ti.UI.createButton({
        title: "Rubi",
        id: "__alloyId1447"
    });
    $.__views.__alloyId1423.add($.__views.__alloyId1447);
    rubi ? $.__views.__alloyId1447.addEventListener("click", rubi) : __defers["$.__views.__alloyId1447!click!rubi"] = true;
    $.__views.__alloyId1448 = Ti.UI.createButton({
        title: "Safira",
        id: "__alloyId1448"
    });
    $.__views.__alloyId1423.add($.__views.__alloyId1448);
    safira ? $.__views.__alloyId1448.addEventListener("click", safira) : __defers["$.__views.__alloyId1448!click!safira"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId1431!click!cristal"] && $.__views.__alloyId1431.addEventListener("click", cristal);
    __defers["$.__views.__alloyId1435!click!esmeralda"] && $.__views.__alloyId1435.addEventListener("click", esmeralda);
    __defers["$.__views.__alloyId1440!click!rubi"] && $.__views.__alloyId1440.addEventListener("click", rubi);
    __defers["$.__views.__alloyId1444!click!safira"] && $.__views.__alloyId1444.addEventListener("click", safira);
    __defers["$.__views.__alloyId1445!click!cristal"] && $.__views.__alloyId1445.addEventListener("click", cristal);
    __defers["$.__views.__alloyId1446!click!esmeralda"] && $.__views.__alloyId1446.addEventListener("click", esmeralda);
    __defers["$.__views.__alloyId1447!click!rubi"] && $.__views.__alloyId1447.addEventListener("click", rubi);
    __defers["$.__views.__alloyId1448!click!safira"] && $.__views.__alloyId1448.addEventListener("click", safira);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;