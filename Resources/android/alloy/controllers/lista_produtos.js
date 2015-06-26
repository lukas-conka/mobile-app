function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function resultadoProdutos() {
        var produtos = listaProdutosQuatro(busca_texto);
        var data = [];
        while (produtos.isValidRow()) {
            var prd_id = produtos.fieldByName("prd_id");
            var imagem = produtos.fieldByName("img_caminho");
            var referencia = produtos.fieldByName("prd_referencia");
            var barras = produtos.fieldByName("prd_codigo_barra");
            var nome = produtos.fieldByName("prd_nome");
            var marca = produtos.fieldByName("apr_arquivo");
            var preco1 = produtos.fieldByName("ifp_valor_1");
            var preco2 = produtos.fieldByName("ifp_valor_2");
            var preco3 = produtos.fieldByName("ifp_valor_3");
            var precos = formatCurrency(preco1) + "\n" + formatCurrency(preco2) + "\n" + formatCurrency(preco3);
            var qtde_min = produtos.fieldByName("ifp_qtde_minima");
            var selecao = "/images/seleciona.png";
            "true" == checkSelectedProduct(prd_id) && (selecao = "/images/selecionar_vermelho.png");
            data.push({
                prd_id: prd_id,
                imagem_produto: {
                    image: getImagesFolder() + imagem
                },
                label_referencia: {
                    text: referencia
                },
                label_barras: {
                    text: barras
                },
                label_nome: {
                    text: nome
                },
                imagem_marca: {
                    image: getImagesFolder() + marca
                },
                label_preco: {
                    text: precos
                },
                label_quantidade_min: {
                    text: qtde_min
                },
                image_selecionar: {
                    image: selecao
                }
            });
            produtos.next();
        }
        $.listaprodutos.sections[0].setItems(data);
    }
    function buscarProdutos() {
        busca_texto = $.buscar.value;
        resultadoProdutos();
        $.buscar.value = "";
    }
    function selecionaProduto(e) {
        var selecao = $.listaprodutos.sections[e.sectionIndex];
        var item = selecao.getItemAt(e.itemIndex);
        var prd_id = item.prd_id;
        var button = item.image_selecionar;
        button.image = "true" == AddSelectedProduct(prd_id) ? "/images/selecionar_vermelho.png" : "/images/seleciona.png";
        selecao.updateItemAt(e.itemIndex, item);
    }
    function voltar() {
        goTo("funcao");
    }
    function irSelecionados() {
        goTo("calculadora");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "lista_produtos";
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
    $.__views.lista_produtos = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        id: "lista_produtos"
    });
    $.__views.lista_produtos && $.addTopLevelView($.__views.lista_produtos);
    $.__views.__alloyId891 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "100%",
        id: "__alloyId891"
    });
    $.__views.lista_produtos.add($.__views.__alloyId891);
    $.__views.__alloyId892 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#000000",
        right: "10",
        title: "LISTA DE PRODUTOS",
        id: "__alloyId892"
    });
    $.__views.__alloyId891.add($.__views.__alloyId892);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        left: "10",
        id: "logoEmpresa"
    });
    $.__views.__alloyId891.add($.__views.logoEmpresa);
    $.__views.__alloyId893 = Ti.UI.createView({
        height: "80%",
        top: "10%",
        width: "100%",
        id: "__alloyId893"
    });
    $.__views.lista_produtos.add($.__views.__alloyId893);
    $.__views.__alloyId894 = Ti.UI.createLabel({
        color: "black",
        right: "48%",
        top: 0,
        text: "Referência, nome ou código de barras",
        id: "__alloyId894"
    });
    $.__views.__alloyId893.add($.__views.__alloyId894);
    $.__views.__alloyId895 = Ti.UI.createImageView({
        right: "45%",
        image: "/images/codigo_barra.png",
        width: "2%",
        top: 5,
        id: "__alloyId895"
    });
    $.__views.__alloyId893.add($.__views.__alloyId895);
    $.__views.buscar = Ti.UI.createTextField({
        color: "black",
        right: "34%",
        width: "10%",
        top: 2,
        id: "buscar",
        hintText: "Buscar"
    });
    $.__views.__alloyId893.add($.__views.buscar);
    $.__views.__alloyId896 = Ti.UI.createButton({
        right: "32%",
        top: 0,
        backgroundColor: "#c0c0c0",
        color: "#336633",
        borderRadius: 9,
        title: "Ir",
        id: "__alloyId896"
    });
    $.__views.__alloyId893.add($.__views.__alloyId896);
    buscarProdutos ? $.__views.__alloyId896.addEventListener("click", buscarProdutos) : __defers["$.__views.__alloyId896!click!buscarProdutos"] = true;
    $.__views.__alloyId897 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#449e46", "#aed252" ]
        },
        height: "7%",
        top: "10%",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId897"
    });
    $.__views.__alloyId893.add($.__views.__alloyId897);
    $.__views.__alloyId898 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 13
        },
        text: "PRODUTO",
        id: "__alloyId898"
    });
    $.__views.__alloyId897.add($.__views.__alloyId898);
    $.__views.__alloyId899 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 13
        },
        text: "REFERÊNCIA",
        id: "__alloyId899"
    });
    $.__views.__alloyId897.add($.__views.__alloyId899);
    $.__views.__alloyId900 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "20%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 13
        },
        text: "CÓDIGO DE BARRAS",
        id: "__alloyId900"
    });
    $.__views.__alloyId897.add($.__views.__alloyId900);
    $.__views.__alloyId901 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "20%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 13
        },
        text: "NOME",
        id: "__alloyId901"
    });
    $.__views.__alloyId897.add($.__views.__alloyId901);
    $.__views.__alloyId902 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 13
        },
        text: "MARCA",
        id: "__alloyId902"
    });
    $.__views.__alloyId897.add($.__views.__alloyId902);
    $.__views.__alloyId903 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 13
        },
        text: "PREÇO",
        id: "__alloyId903"
    });
    $.__views.__alloyId897.add($.__views.__alloyId903);
    $.__views.__alloyId904 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 13
        },
        text: "QTDE. MÍNIMA",
        id: "__alloyId904"
    });
    $.__views.__alloyId897.add($.__views.__alloyId904);
    $.__views.__alloyId905 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 13
        },
        text: "SELECIONAR",
        id: "__alloyId905"
    });
    $.__views.__alloyId897.add($.__views.__alloyId905);
    $.__views.__alloyId906 = Ti.UI.createView({
        height: "90%",
        top: "10%",
        width: "100%",
        id: "__alloyId906"
    });
    $.__views.__alloyId893.add($.__views.__alloyId906);
    var __alloyId907 = {};
    var __alloyId910 = [];
    var __alloyId912 = {
        type: "Ti.UI.View",
        properties: {
            backgroundColor: "#DDDDDD",
            width: "100%",
            heigth: 1,
            top: 0,
            left: 0
        }
    };
    __alloyId910.push(__alloyId912);
    var __alloyId914 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId915 = [];
            var __alloyId917 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId915.push(__alloyId917);
            var __alloyId919 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId920 = [];
                    var __alloyId922 = {
                        type: "Ti.UI.ImageView",
                        bindId: "imagem_produto",
                        properties: {
                            width: "100%",
                            bindId: "imagem_produto"
                        }
                    };
                    __alloyId920.push(__alloyId922);
                    return __alloyId920;
                }(),
                properties: {
                    width: "10%",
                    height: "90%"
                }
            };
            __alloyId915.push(__alloyId919);
            var __alloyId924 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId915.push(__alloyId924);
            var __alloyId926 = {
                type: "Ti.UI.Label",
                bindId: "label_referencia",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "10%",
                    bindId: "label_referencia"
                }
            };
            __alloyId915.push(__alloyId926);
            var __alloyId928 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId915.push(__alloyId928);
            var __alloyId930 = {
                type: "Ti.UI.Label",
                bindId: "label_barras",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "20%",
                    bindId: "label_barras"
                }
            };
            __alloyId915.push(__alloyId930);
            var __alloyId932 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId915.push(__alloyId932);
            var __alloyId934 = {
                type: "Ti.UI.Label",
                bindId: "label_nome",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "20%",
                    bindId: "label_nome"
                }
            };
            __alloyId915.push(__alloyId934);
            var __alloyId936 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId915.push(__alloyId936);
            var __alloyId938 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId939 = [];
                    var __alloyId941 = {
                        type: "Ti.UI.ImageView",
                        bindId: "imagem_marca",
                        properties: {
                            width: "80%",
                            bindId: "imagem_marca"
                        }
                    };
                    __alloyId939.push(__alloyId941);
                    return __alloyId939;
                }(),
                properties: {
                    width: "10%"
                }
            };
            __alloyId915.push(__alloyId938);
            var __alloyId943 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId915.push(__alloyId943);
            var __alloyId945 = {
                type: "Ti.UI.Label",
                bindId: "label_preco",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "10%",
                    bindId: "label_preco"
                }
            };
            __alloyId915.push(__alloyId945);
            var __alloyId947 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId915.push(__alloyId947);
            var __alloyId949 = {
                type: "Ti.UI.Label",
                bindId: "label_quantidade_min",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "10%",
                    bindId: "label_quantidade_min"
                }
            };
            __alloyId915.push(__alloyId949);
            var __alloyId951 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId915.push(__alloyId951);
            var __alloyId953 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId954 = [];
                    var __alloyId956 = {
                        type: "Ti.UI.ImageView",
                        bindId: "image_selecionar",
                        properties: {
                            width: "70%",
                            bindId: "image_selecionar"
                        },
                        events: {
                            click: selecionaProduto
                        }
                    };
                    __alloyId954.push(__alloyId956);
                    return __alloyId954;
                }(),
                properties: {
                    width: "9%"
                }
            };
            __alloyId915.push(__alloyId953);
            var __alloyId958 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId915.push(__alloyId958);
            return __alloyId915;
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
    __alloyId910.push(__alloyId914);
    var __alloyId909 = {
        properties: {
            backgroundColor: "white",
            height: "100dp",
            name: "produto_lista"
        },
        childTemplates: __alloyId910
    };
    __alloyId907["produto_lista"] = __alloyId909;
    $.__views.__alloyId959 = Ti.UI.createListSection({
        id: "__alloyId959"
    });
    var __alloyId961 = [];
    __alloyId961.push($.__views.__alloyId959);
    $.__views.listaprodutos = Ti.UI.createListView({
        height: "90%",
        top: "10%",
        width: "100%",
        sections: __alloyId961,
        templates: __alloyId907,
        id: "listaprodutos",
        defaultItemTemplate: "produto_lista"
    });
    $.__views.__alloyId906.add($.__views.listaprodutos);
    $.__views.__alloyId962 = Ti.UI.createView({
        height: "7%",
        bottom: "1%",
        width: "100%",
        id: "__alloyId962"
    });
    $.__views.lista_produtos.add($.__views.__alloyId962);
    $.__views.__alloyId963 = Ti.UI.createButton({
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
        id: "__alloyId963"
    });
    $.__views.__alloyId962.add($.__views.__alloyId963);
    voltar ? $.__views.__alloyId963.addEventListener("click", voltar) : __defers["$.__views.__alloyId963!click!voltar"] = true;
    $.__views.__alloyId964 = Ti.UI.createLabel({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        right: "1%",
        width: "12%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        bottom: "1%",
        text: "Ir para selecionados",
        id: "__alloyId964"
    });
    $.__views.__alloyId962.add($.__views.__alloyId964);
    irSelecionados ? $.__views.__alloyId964.addEventListener("click", irSelecionados) : __defers["$.__views.__alloyId964!click!irSelecionados"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/produtos.js");
    Ti.include("/database/aparencia.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    var busca_texto = "";
    resultadoProdutos();
    __defers["$.__views.__alloyId896!click!buscarProdutos"] && $.__views.__alloyId896.addEventListener("click", buscarProdutos);
    __defers["$.__views.__alloyId963!click!voltar"] && $.__views.__alloyId963.addEventListener("click", voltar);
    __defers["$.__views.__alloyId964!click!irSelecionados"] && $.__views.__alloyId964.addEventListener("click", irSelecionados);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;