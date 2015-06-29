function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function nextImage() {
        var imagem = getImagesFolder() + imagens[imagem_atual];
        $.imagem.image = null;
        $.imagem.image = imagem;
        imagem_atual++;
        imagem_atual >= imagens.length && (imagem_atual = 0);
        rotate && slideRun();
    }
    function prevImage() {
        $.imagem.image = getImagesFolder() + imagens[imagem_atual];
        imagem_atual--;
        0 > imagem_atual && (imagem_atual = imagens.length - 1);
    }
    function nextSlide() {
        stopSlides();
        nextImage();
    }
    function prevSlide() {
        stopSlides();
        prevImage();
    }
    function slideRun() {
        setTimeout(function() {
            rotate && nextImage();
        }, 2e3);
    }
    function stopSlides() {
        rotate = false;
    }
    function goToMenu() {
        stopSlides();
        $.imagem.image = null;
        goTo("seleciona_cliente");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "destacadas";
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
    $.__views.destacadas = Ti.UI.createView({
        backgrounColor: "blue",
        id: "destacadas"
    });
    $.__views.destacadas && $.addTopLevelView($.__views.destacadas);
    $.__views.__alloyId343 = Ti.UI.createButton({
        backgroundColor: "#008382",
        borderRadius: "5",
        color: "#ffffff",
        height: "6%",
        right: "1%",
        top: "1%",
        width: "10%",
        title: "Menu",
        id: "__alloyId343"
    });
    $.__views.destacadas.add($.__views.__alloyId343);
    goToMenu ? $.__views.__alloyId343.addEventListener("click", goToMenu) : __defers["$.__views.__alloyId343!click!goToMenu"] = true;
    $.__views.imagem = Ti.UI.createImageView({
        top: "8%",
        width: "98%",
        id: "imagem"
    });
    $.__views.destacadas.add($.__views.imagem);
    stopSlides ? $.__views.imagem.addEventListener("click", stopSlides) : __defers["$.__views.imagem!click!stopSlides"] = true;
    $.__views.nextSlide = Ti.UI.createImageView({
        image: "/images/slide_right.png",
        right: "2%",
        height: "5%",
        id: "nextSlide"
    });
    $.__views.destacadas.add($.__views.nextSlide);
    nextSlide ? $.__views.nextSlide.addEventListener("click", nextSlide) : __defers["$.__views.nextSlide!click!nextSlide"] = true;
    $.__views.prevSlide = Ti.UI.createImageView({
        image: "/images/slide_left.png",
        left: "2%",
        height: "5%",
        id: "prevSlide"
    });
    $.__views.destacadas.add($.__views.prevSlide);
    prevSlide ? $.__views.prevSlide.addEventListener("click", prevSlide) : __defers["$.__views.prevSlide!click!prevSlide"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/api/config.js");
    Ti.include("/database/aparencia.js");
    var mc_id = Ti.App.Properties.getString(SELECTED_MARCA);
    var software = Ti.App.Properties.getString(CURRENT_SOFTWARE);
    var consulta = consultaImagensConceituais(software, mc_id);
    var imagens = [];
    var imagem_atual = 0;
    var rotate = true;
    slideRun();
    while (consulta.isValidRow()) {
        var apr_arquivo = consulta.fieldByName("apr_arquivo");
        var dest = Ti.Filesystem.getFile(getImagesFolder(), apr_arquivo);
        dest.exists() && imagens.push(apr_arquivo);
        consulta.next();
    }
    imagens.length > 0 && nextImage();
    var eventListener = function() {
        Ti.App.removeEventListener("removeBitmap", eventListener);
        Ti.API.info("Destacadas");
        stopSlides();
        $.imagem.image = null;
    };
    Ti.App.addEventListener("removeBitmap", eventListener);
    __defers["$.__views.__alloyId343!click!goToMenu"] && $.__views.__alloyId343.addEventListener("click", goToMenu);
    __defers["$.__views.imagem!click!stopSlides"] && $.__views.imagem.addEventListener("click", stopSlides);
    __defers["$.__views.nextSlide!click!nextSlide"] && $.__views.nextSlide.addEventListener("click", nextSlide);
    __defers["$.__views.prevSlide!click!prevSlide"] && $.__views.prevSlide.addEventListener("click", prevSlide);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;