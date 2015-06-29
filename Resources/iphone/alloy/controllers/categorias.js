function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function selecionaCategoria(e) {
        menu_visivel = true;
        showMenu();
        var section = $.listaCategorias.sections[e.sectionIndex];
        var item = section.getItemAt(e.itemIndex);
        var cat_id = item.cat_id;
        var template = item.fk_template;
        var marca = item.marca;
        Ti.App.Properties.setString(SELECTED_CATEGORY, cat_id);
        var arg = {
            marca: marca,
            cat_id: cat_id,
            template: template
        };
        if (view) {
            Ti.App.fireEvent("removeBitmap", {
                name: "bar"
            });
            $.corpo.remove(view);
        }
        switch (template) {
          case 1:
            view = Alloy.createController("vitrine_quatro_quadrados", arg).getView();
            break;

          case 2:
            view = Alloy.createController("vitrine_tres_verticais", arg).getView();
            break;

          case 3:
            view = Alloy.createController("vitrine_quatro_verticais", arg).getView();
            break;

          case 4:
            view = Alloy.createController("vitrine_um_horizontal", arg).getView();
            break;

          case 5:
            view = Alloy.createController("vitrine_dois_horizontais", arg).getView();
            break;

          case 6:
            view = Alloy.createController("vitrine_dois_verticais", arg).getView();
            break;

          case 7:
            view = Alloy.createController("vitrine_quatro_horizontais", arg).getView();
            break;

          case 8:
            view = Alloy.createController("vitrine_cinco_verticais", arg).getView();
            break;

          case 9:
            view = Alloy.createController("vitrine_seis_verticais", arg).getView();
        }
        $.corpo.add(view);
    }
    function goToDestacadas() {
        menu_visivel = true;
        showMenu();
        if (view) {
            Ti.App.fireEvent("removeBitmap", {
                name: "bar"
            });
            $.corpo.remove(view);
        }
        view = Alloy.createController("destacadas").getView();
        $.corpo.add(view);
    }
    function showMenu() {
        if (menu_visivel) {
            $.lateral.animate({
                curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
                left: "-15%",
                duration: 200,
                image: "/images/setinhaindo.png"
            });
            menu_visivel = false;
        } else {
            $.lateral.animate({
                curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
                left: 0,
                duration: 200,
                image: "/images/setinhavoltando.png"
            });
            menu_visivel = true;
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "categorias";
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
    $.__views.categorias = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "categorias"
    });
    $.__views.categorias && $.addTopLevelView($.__views.categorias);
    $.__views.lateral = Ti.UI.createView({
        height: "100%",
        left: "-15%",
        width: "17%",
        zIndex: 10,
        id: "lateral"
    });
    $.__views.categorias.add($.__views.lateral);
    $.__views.__alloyId246 = Ti.UI.createView({
        backgroundColor: "white",
        width: "88%",
        height: "100%",
        left: 0,
        id: "__alloyId246"
    });
    $.__views.lateral.add($.__views.__alloyId246);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        top: 5,
        left: 5,
        width: "98%",
        id: "logoEmpresa"
    });
    $.__views.__alloyId246.add($.__views.logoEmpresa);
    goToDestacadas ? $.__views.logoEmpresa.addEventListener("click", goToDestacadas) : __defers["$.__views.logoEmpresa!click!goToDestacadas"] = true;
    $.__views.__alloyId247 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#000000",
        height: "5%",
        top: "15%",
        width: "100%",
        title: "Categorias",
        id: "__alloyId247"
    });
    $.__views.__alloyId246.add($.__views.__alloyId247);
    var __alloyId248 = {};
    var __alloyId251 = [];
    var __alloyId253 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId254 = [];
            var __alloyId256 = {
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
            __alloyId254.push(__alloyId256);
            return __alloyId254;
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
            click: selecionaCategoria
        }
    };
    __alloyId251.push(__alloyId253);
    var __alloyId250 = {
        properties: {
            height: "112dp",
            name: "menuTemplateSimple"
        },
        childTemplates: __alloyId251
    };
    __alloyId248["menuTemplateSimple"] = __alloyId250;
    var __alloyId259 = [];
    var __alloyId261 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId262 = [];
            var __alloyId264 = {
                type: "Ti.UI.Label",
                bindId: "btnmenuA",
                properties: {
                    touchEnabled: "false",
                    backgroundColor: "#3f3a35",
                    color: "#ffffff",
                    top: "30",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    bindId: "btnmenuA"
                }
            };
            __alloyId262.push(__alloyId264);
            var __alloyId266 = {
                type: "Ti.UI.Label",
                bindId: "btnmenuB",
                properties: {
                    touchEnabled: "false",
                    backgroundColor: "#3f3a35",
                    color: "#999",
                    top: "50",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    bindId: "btnmenuB"
                }
            };
            __alloyId262.push(__alloyId266);
            return __alloyId262;
        }(),
        properties: {
            backgroundColor: "#3f3a35",
            borderColor: "#9ccccb",
            borderWidth: "4",
            color: "#ffffff",
            height: "94",
            top: "10",
            width: "90%"
        },
        events: {
            click: selecionaCategoria
        }
    };
    __alloyId259.push(__alloyId261);
    var __alloyId258 = {
        properties: {
            height: "112dp",
            name: "menuTemplateDouble"
        },
        childTemplates: __alloyId259
    };
    __alloyId248["menuTemplateDouble"] = __alloyId258;
    $.__views.__alloyId267 = Ti.UI.createListSection({
        id: "__alloyId267"
    });
    var __alloyId269 = [];
    __alloyId269.push($.__views.__alloyId267);
    $.__views.listaCategorias = Ti.UI.createListView({
        backgroundColor: "#d0e2e6",
        borderColor: "#008382",
        borderWidth: "4",
        height: "80%",
        top: "20%",
        width: "100%",
        sections: __alloyId269,
        templates: __alloyId248,
        defaultItemTemplate: "menuTemplateSimple",
        id: "listaCategorias"
    });
    $.__views.__alloyId246.add($.__views.listaCategorias);
    $.__views.__alloyId270 = Ti.UI.createImageView({
        image: "/images/setinhaindo.png",
        width: "12%",
        right: 0,
        id: "__alloyId270"
    });
    $.__views.lateral.add($.__views.__alloyId270);
    showMenu ? $.__views.__alloyId270.addEventListener("click", showMenu) : __defers["$.__views.__alloyId270!click!showMenu"] = true;
    $.__views.corpo = Ti.UI.createView({
        height: "98%",
        top: "1%",
        width: "98%",
        left: "2%",
        id: "corpo"
    });
    $.__views.categorias.add($.__views.corpo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/api/config.js");
    Ti.include("/database/categorias.js");
    Ti.include("/database/aparencia.js");
    Ti.include("/database/categoriasmarca.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    var view;
    var menu_visivel = false;
    var data = [];
    var mc_id = Ti.App.Properties.getString(SELECTED_MARCA);
    var empresa = Ti.App.Properties.getString(CURRENT_EMPRESA);
    var software = Ti.App.Properties.getString(CURRENT_SOFTWARE);
    var categorias = selectAllMenuCategorias(mc_id, empresa, software);
    while (categorias.isValidRow()) {
        var cat_id = categorias.fieldByName("cat_id");
        var cat_nome = categorias.fieldByName("cat_nome");
        var fk_template = categorias.fieldByName("fk_template");
        var marca = categorias.fieldByName("fk_marca");
        if (1 == software || 2 == software) data.push({
            cat_id: cat_id,
            marca: marca,
            btnmenu: {
                text: cat_nome
            },
            template: "menuTemplateSimple",
            fk_template: fk_template
        }); else {
            var mc_nome = categorias.fieldByName("mc_nome");
            data.push({
                cat_id: cat_id,
                marca: marca,
                btnmenuA: {
                    text: cat_nome
                },
                btnmenuB: {
                    text: mc_nome
                },
                template: "menuTemplateDouble",
                fk_template: fk_template
            });
        }
        categorias.next();
    }
    categorias.close();
    $.listaCategorias.sections[0].setItems(data);
    goToDestacadas();
    __defers["$.__views.logoEmpresa!click!goToDestacadas"] && $.__views.logoEmpresa.addEventListener("click", goToDestacadas);
    __defers["$.__views.__alloyId270!click!showMenu"] && $.__views.__alloyId270.addEventListener("click", showMenu);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;