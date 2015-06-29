function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function resultadovideos() {
        var videos = selectallVideo();
        var data = [];
        while (videos.isValidRow()) {
            var v_link = videos.fieldByName("v_link");
            var v_titulo = videos.fieldByName("v_titulo");
            var v_descricao = videos.fieldByName("v_descricao");
            data.push({
                v_link: v_link,
                v_titulo: {
                    text: v_titulo
                },
                v_descricao: {
                    text: v_descricao
                }
            });
            videos.next();
        }
        $.listavideos.sections[0].setItems(data);
    }
    function selecionavideo(e) {
        var selecao = $.listavideos.sections[e.sectionIndex];
        var item = selecao.getItemAt(e.itemIndex);
        var link = item.v_link;
        new RegExp("http").test(link) || (link = "http://" + link);
        var intent = Ti.Android.createIntent({
            action: Ti.Android.ACTION_VIEW,
            data: link
        });
        Ti.Android.currentActivity.startActivity(intent);
    }
    function voltar() {
        goTo("funcao");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "lista_video";
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
    $.__views.lista_video = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "lista_video"
    });
    $.__views.lista_video && $.addTopLevelView($.__views.lista_video);
    $.__views.__alloyId965 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "100%",
        id: "__alloyId965"
    });
    $.__views.lista_video.add($.__views.__alloyId965);
    $.__views.__alloyId966 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#000000",
        right: "10",
        title: "LISTA DE VÍDEOS",
        id: "__alloyId966"
    });
    $.__views.__alloyId965.add($.__views.__alloyId966);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        left: "10",
        id: "logoEmpresa"
    });
    $.__views.__alloyId965.add($.__views.logoEmpresa);
    $.__views.__alloyId967 = Ti.UI.createView({
        height: "80%",
        top: "10%",
        width: "100%",
        id: "__alloyId967"
    });
    $.__views.lista_video.add($.__views.__alloyId967);
    $.__views.__alloyId968 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#e2580e", "#f2ad31" ]
        },
        height: "7%",
        top: "5%",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId968"
    });
    $.__views.__alloyId967.add($.__views.__alloyId968);
    $.__views.__alloyId969 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "30%",
        title: "Título",
        id: "__alloyId969"
    });
    $.__views.__alloyId968.add($.__views.__alloyId969);
    $.__views.__alloyId970 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "60%",
        title: "Descrição",
        id: "__alloyId970"
    });
    $.__views.__alloyId968.add($.__views.__alloyId970);
    $.__views.__alloyId971 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "9%",
        title: "Video",
        id: "__alloyId971"
    });
    $.__views.__alloyId968.add($.__views.__alloyId971);
    $.__views.__alloyId972 = Ti.UI.createView({
        height: "90%",
        top: "7%",
        width: "100%",
        id: "__alloyId972"
    });
    $.__views.__alloyId967.add($.__views.__alloyId972);
    var __alloyId973 = {};
    var __alloyId976 = [];
    var __alloyId978 = {
        type: "Ti.UI.View",
        properties: {
            backgroundColor: "#DDDDDD",
            width: "100%",
            heigth: 1,
            top: 0,
            left: 0
        }
    };
    __alloyId976.push(__alloyId978);
    var __alloyId980 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId981 = [];
            var __alloyId983 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId981.push(__alloyId983);
            var __alloyId985 = {
                type: "Ti.UI.Label",
                bindId: "v_titulo",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "30%",
                    bindId: "v_titulo"
                }
            };
            __alloyId981.push(__alloyId985);
            var __alloyId987 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId981.push(__alloyId987);
            var __alloyId989 = {
                type: "Ti.UI.Label",
                bindId: "v_descricao",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "60%",
                    bindId: "v_descricao"
                }
            };
            __alloyId981.push(__alloyId989);
            var __alloyId991 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId981.push(__alloyId991);
            var __alloyId993 = {
                type: "Ti.UI.Button",
                properties: {
                    width: "9%",
                    height: "80%",
                    backgroundImage: "/images/videoplay.jpg"
                },
                events: {
                    click: selecionavideo
                }
            };
            __alloyId981.push(__alloyId993);
            var __alloyId995 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId981.push(__alloyId995);
            return __alloyId981;
        }(),
        properties: {
            backgroundColor: "white",
            top: 2,
            left: 0,
            width: "100%",
            height: "100%",
            layout: "horizontal"
        }
    };
    __alloyId976.push(__alloyId980);
    var __alloyId975 = {
        properties: {
            backgroundColor: "white",
            height: "40",
            top: 0,
            width: "100%",
            name: "video_lista"
        },
        childTemplates: __alloyId976
    };
    __alloyId973["video_lista"] = __alloyId975;
    $.__views.__alloyId996 = Ti.UI.createListSection({
        id: "__alloyId996"
    });
    var __alloyId998 = [];
    __alloyId998.push($.__views.__alloyId996);
    $.__views.listavideos = Ti.UI.createListView({
        height: "90%",
        top: "7%",
        width: "100%",
        sections: __alloyId998,
        templates: __alloyId973,
        id: "listavideos",
        defaultItemTemplate: "video_lista"
    });
    $.__views.__alloyId972.add($.__views.listavideos);
    $.__views.__alloyId999 = Ti.UI.createView({
        height: "7%",
        bottom: "1%",
        width: "100%",
        id: "__alloyId999"
    });
    $.__views.lista_video.add($.__views.__alloyId999);
    $.__views.__alloyId1000 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        left: "1%",
        width: "10%",
        bottom: "1%",
        title: "Voltar",
        id: "__alloyId1000"
    });
    $.__views.__alloyId999.add($.__views.__alloyId1000);
    voltar ? $.__views.__alloyId1000.addEventListener("click", voltar) : __defers["$.__views.__alloyId1000!click!voltar"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/video.js");
    Ti.include("/database/aparencia.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    resultadovideos();
    __defers["$.__views.__alloyId1000!click!voltar"] && $.__views.__alloyId1000.addEventListener("click", voltar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;