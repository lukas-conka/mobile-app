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
        if ("android" == Ti.Platform.osname) {
            var intent = Ti.Android.createIntent({
                action: Ti.Android.ACTION_VIEW,
                data: link
            });
            Ti.Android.currentActivity.startActivity(intent);
        } else Ti.Platform.openURL(link);
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
    $.__views.__alloyId886 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "100%",
        id: "__alloyId886"
    });
    $.__views.lista_video.add($.__views.__alloyId886);
    $.__views.__alloyId887 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#000000",
        right: "10",
        title: "LISTA DE VÍDEOS",
        id: "__alloyId887"
    });
    $.__views.__alloyId886.add($.__views.__alloyId887);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        left: "10",
        id: "logoEmpresa"
    });
    $.__views.__alloyId886.add($.__views.logoEmpresa);
    $.__views.__alloyId888 = Ti.UI.createView({
        height: "80%",
        top: "10%",
        width: "100%",
        id: "__alloyId888"
    });
    $.__views.lista_video.add($.__views.__alloyId888);
    $.__views.__alloyId889 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#e2580e", "#f2ad31" ]
        },
        height: "7%",
        top: "5%",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId889"
    });
    $.__views.__alloyId888.add($.__views.__alloyId889);
    $.__views.__alloyId890 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "30%",
        title: "Título",
        id: "__alloyId890"
    });
    $.__views.__alloyId889.add($.__views.__alloyId890);
    $.__views.__alloyId891 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "60%",
        title: "Descrição",
        id: "__alloyId891"
    });
    $.__views.__alloyId889.add($.__views.__alloyId891);
    $.__views.__alloyId892 = Ti.UI.createButton({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "9%",
        title: "Video",
        id: "__alloyId892"
    });
    $.__views.__alloyId889.add($.__views.__alloyId892);
    $.__views.__alloyId893 = Ti.UI.createView({
        height: "90%",
        top: "7%",
        width: "100%",
        id: "__alloyId893"
    });
    $.__views.__alloyId888.add($.__views.__alloyId893);
    var __alloyId894 = {};
    var __alloyId897 = [];
    var __alloyId899 = {
        type: "Ti.UI.View",
        properties: {
            backgroundColor: "#DDDDDD",
            width: "100%",
            heigth: 1,
            top: 0,
            left: 0
        }
    };
    __alloyId897.push(__alloyId899);
    var __alloyId901 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId902 = [];
            var __alloyId904 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId902.push(__alloyId904);
            var __alloyId906 = {
                type: "Ti.UI.Label",
                bindId: "v_titulo",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "30%",
                    bindId: "v_titulo"
                }
            };
            __alloyId902.push(__alloyId906);
            var __alloyId908 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId902.push(__alloyId908);
            var __alloyId910 = {
                type: "Ti.UI.Label",
                bindId: "v_descricao",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "60%",
                    bindId: "v_descricao"
                }
            };
            __alloyId902.push(__alloyId910);
            var __alloyId912 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId902.push(__alloyId912);
            var __alloyId914 = {
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
            __alloyId902.push(__alloyId914);
            var __alloyId916 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId902.push(__alloyId916);
            return __alloyId902;
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
    __alloyId897.push(__alloyId901);
    var __alloyId896 = {
        properties: {
            backgroundColor: "white",
            height: "40",
            top: 0,
            width: "100%",
            name: "video_lista"
        },
        childTemplates: __alloyId897
    };
    __alloyId894["video_lista"] = __alloyId896;
    $.__views.__alloyId917 = Ti.UI.createListSection({
        id: "__alloyId917"
    });
    var __alloyId919 = [];
    __alloyId919.push($.__views.__alloyId917);
    $.__views.listavideos = Ti.UI.createListView({
        height: "90%",
        top: "7%",
        width: "100%",
        sections: __alloyId919,
        templates: __alloyId894,
        id: "listavideos",
        defaultItemTemplate: "video_lista"
    });
    $.__views.__alloyId893.add($.__views.listavideos);
    $.__views.__alloyId920 = Ti.UI.createView({
        height: "7%",
        bottom: "1%",
        width: "100%",
        id: "__alloyId920"
    });
    $.__views.lista_video.add($.__views.__alloyId920);
    $.__views.__alloyId921 = Ti.UI.createButton({
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
        id: "__alloyId921"
    });
    $.__views.__alloyId920.add($.__views.__alloyId921);
    voltar ? $.__views.__alloyId921.addEventListener("click", voltar) : __defers["$.__views.__alloyId921!click!voltar"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/video.js");
    Ti.include("/database/aparencia.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    resultadovideos();
    __defers["$.__views.__alloyId921!click!voltar"] && $.__views.__alloyId921.addEventListener("click", voltar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;