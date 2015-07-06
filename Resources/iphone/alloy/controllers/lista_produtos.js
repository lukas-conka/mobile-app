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
        if (0 != clientes.length) goTo("calculadora"); else {
            var Alerta = Ti.UI.createAlertDialog({
                message: "É necessário a seleção de um cliente ou mais para seguir em diante!",
                title: "Selecionar cliente!:"
            });
            Alerta.show();
        }
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
    $.__views.__alloyId886 = Ti.UI.createView({
        height: "10%",
        top: "0",
        width: "100%",
        id: "__alloyId886"
    });
    $.__views.lista_produtos.add($.__views.__alloyId886);
    $.__views.__alloyId887 = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        color: "#000000",
        right: "10",
        title: "LISTA DE PRODUTOS",
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
    $.__views.lista_produtos.add($.__views.__alloyId888);
    $.__views.__alloyId889 = Ti.UI.createLabel({
        color: "black",
        right: "48%",
        top: 0,
        text: "Referência, nome ou código de barras",
        id: "__alloyId889"
    });
    $.__views.__alloyId888.add($.__views.__alloyId889);
    $.__views.__alloyId890 = Ti.UI.createImageView({
        right: "45%",
        image: "/images/codigo_barra.png",
        width: "2%",
        top: 5,
        id: "__alloyId890"
    });
    $.__views.__alloyId888.add($.__views.__alloyId890);
    $.__views.buscar = Ti.UI.createTextField({
        color: "black",
        right: "34%",
        width: "10%",
        top: 2,
        id: "buscar",
        hintText: "Buscar"
    });
    $.__views.__alloyId888.add($.__views.buscar);
    $.__views.__alloyId891 = Ti.UI.createButton({
        right: "32%",
        top: 0,
        backgroundColor: "#c0c0c0",
        color: "#336633",
        borderRadius: 9,
        title: "Ir",
        id: "__alloyId891"
    });
    $.__views.__alloyId888.add($.__views.__alloyId891);
    buscarProdutos ? $.__views.__alloyId891.addEventListener("click", buscarProdutos) : __defers["$.__views.__alloyId891!click!buscarProdutos"] = true;
    $.__views.__alloyId892 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#449e46", "#aed252" ]
        },
        height: "7%",
        top: "10%",
        width: "100%",
        layout: "horizontal",
        id: "__alloyId892"
    });
    $.__views.__alloyId888.add($.__views.__alloyId892);
    $.__views.__alloyId893 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 13
        },
        text: "PRODUTO",
        id: "__alloyId893"
    });
    $.__views.__alloyId892.add($.__views.__alloyId893);
    $.__views.__alloyId894 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 13
        },
        text: "REFERÊNCIA",
        id: "__alloyId894"
    });
    $.__views.__alloyId892.add($.__views.__alloyId894);
    $.__views.__alloyId895 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "20%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 13
        },
        text: "CÓDIGO DE BARRAS",
        id: "__alloyId895"
    });
    $.__views.__alloyId892.add($.__views.__alloyId895);
    $.__views.__alloyId896 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "20%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 13
        },
        text: "NOME",
        id: "__alloyId896"
    });
    $.__views.__alloyId892.add($.__views.__alloyId896);
    $.__views.__alloyId897 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 13
        },
        text: "MARCA",
        id: "__alloyId897"
    });
    $.__views.__alloyId892.add($.__views.__alloyId897);
    $.__views.__alloyId898 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 13
        },
        text: "PREÇO",
        id: "__alloyId898"
    });
    $.__views.__alloyId892.add($.__views.__alloyId898);
    $.__views.__alloyId899 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 13
        },
        text: "QTDE. MÍNIMA",
        id: "__alloyId899"
    });
    $.__views.__alloyId892.add($.__views.__alloyId899);
    $.__views.__alloyId900 = Ti.UI.createLabel({
        backgroundColor: "transparent",
        color: "#ffffff",
        height: "100%",
        width: "10%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 13
        },
        text: "SELECIONAR",
        id: "__alloyId900"
    });
    $.__views.__alloyId892.add($.__views.__alloyId900);
    $.__views.__alloyId901 = Ti.UI.createView({
        height: "90%",
        top: "10%",
        width: "100%",
        id: "__alloyId901"
    });
    $.__views.__alloyId888.add($.__views.__alloyId901);
    var __alloyId902 = {};
    var __alloyId905 = [];
    var __alloyId907 = {
        type: "Ti.UI.View",
        properties: {
            backgroundColor: "#DDDDDD",
            width: "100%",
            heigth: 1,
            top: 0,
            left: 0
        }
    };
    __alloyId905.push(__alloyId907);
    var __alloyId909 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId910 = [];
            var __alloyId912 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId910.push(__alloyId912);
            var __alloyId914 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId915 = [];
                    var __alloyId917 = {
                        type: "Ti.UI.ImageView",
                        bindId: "imagem_produto",
                        properties: {
                            width: "100%",
                            bindId: "imagem_produto"
                        }
                    };
                    __alloyId915.push(__alloyId917);
                    return __alloyId915;
                }(),
                properties: {
                    width: "10%",
                    height: "90%"
                }
            };
            __alloyId910.push(__alloyId914);
            var __alloyId919 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId910.push(__alloyId919);
            var __alloyId921 = {
                type: "Ti.UI.Label",
                bindId: "label_referencia",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "10%",
                    bindId: "label_referencia"
                }
            };
            __alloyId910.push(__alloyId921);
            var __alloyId923 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId910.push(__alloyId923);
            var __alloyId925 = {
                type: "Ti.UI.Label",
                bindId: "label_barras",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "20%",
                    bindId: "label_barras"
                }
            };
            __alloyId910.push(__alloyId925);
            var __alloyId927 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId910.push(__alloyId927);
            var __alloyId929 = {
                type: "Ti.UI.Label",
                bindId: "label_nome",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "20%",
                    bindId: "label_nome"
                }
            };
            __alloyId910.push(__alloyId929);
            var __alloyId931 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId910.push(__alloyId931);
            var __alloyId933 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId934 = [];
                    var __alloyId936 = {
                        type: "Ti.UI.ImageView",
                        bindId: "imagem_marca",
                        properties: {
                            width: "80%",
                            bindId: "imagem_marca"
                        }
                    };
                    __alloyId934.push(__alloyId936);
                    return __alloyId934;
                }(),
                properties: {
                    width: "10%"
                }
            };
            __alloyId910.push(__alloyId933);
            var __alloyId938 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId910.push(__alloyId938);
            var __alloyId940 = {
                type: "Ti.UI.Label",
                bindId: "label_preco",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "10%",
                    bindId: "label_preco"
                }
            };
            __alloyId910.push(__alloyId940);
            var __alloyId942 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId910.push(__alloyId942);
            var __alloyId944 = {
                type: "Ti.UI.Label",
                bindId: "label_quantidade_min",
                properties: {
                    color: "black",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "10%",
                    bindId: "label_quantidade_min"
                }
            };
            __alloyId910.push(__alloyId944);
            var __alloyId946 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId910.push(__alloyId946);
            var __alloyId948 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId949 = [];
                    var __alloyId951 = {
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
                    __alloyId949.push(__alloyId951);
                    return __alloyId949;
                }(),
                properties: {
                    width: "9%"
                }
            };
            __alloyId910.push(__alloyId948);
            var __alloyId953 = {
                type: "Ti.UI.View",
                properties: {
                    backgroundColor: "#DDDDDD",
                    width: 1,
                    heigth: "100%"
                }
            };
            __alloyId910.push(__alloyId953);
            return __alloyId910;
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
    __alloyId905.push(__alloyId909);
    var __alloyId904 = {
        properties: {
            backgroundColor: "white",
            height: "100dp",
            name: "produto_lista"
        },
        childTemplates: __alloyId905
    };
    __alloyId902["produto_lista"] = __alloyId904;
    $.__views.__alloyId954 = Ti.UI.createListSection({
        id: "__alloyId954"
    });
    var __alloyId956 = [];
    __alloyId956.push($.__views.__alloyId954);
    $.__views.listaprodutos = Ti.UI.createListView({
        height: "90%",
        top: "10%",
        width: "100%",
        sections: __alloyId956,
        templates: __alloyId902,
        id: "listaprodutos",
        defaultItemTemplate: "produto_lista"
    });
    $.__views.__alloyId901.add($.__views.listaprodutos);
    $.__views.__alloyId957 = Ti.UI.createView({
        height: "7%",
        bottom: "1%",
        width: "100%",
        id: "__alloyId957"
    });
    $.__views.lista_produtos.add($.__views.__alloyId957);
    $.__views.__alloyId958 = Ti.UI.createButton({
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
        id: "__alloyId958"
    });
    $.__views.__alloyId957.add($.__views.__alloyId958);
    voltar ? $.__views.__alloyId958.addEventListener("click", voltar) : __defers["$.__views.__alloyId958!click!voltar"] = true;
    $.__views.__alloyId959 = Ti.UI.createLabel({
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
        id: "__alloyId959"
    });
    $.__views.__alloyId957.add($.__views.__alloyId959);
    irSelecionados ? $.__views.__alloyId959.addEventListener("click", irSelecionados) : __defers["$.__views.__alloyId959!click!irSelecionados"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/api/config.js");
    Ti.include("/database/produtos.js");
    Ti.include("/database/aparencia.js");
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    var clientes = Ti.App.Properties.getList(SELECTED_CLIENTS);
    var busca_texto = "";
    resultadoProdutos();
    __defers["$.__views.__alloyId891!click!buscarProdutos"] && $.__views.__alloyId891.addEventListener("click", buscarProdutos);
    __defers["$.__views.__alloyId958!click!voltar"] && $.__views.__alloyId958.addEventListener("click", voltar);
    __defers["$.__views.__alloyId959!click!irSelecionados"] && $.__views.__alloyId959.addEventListener("click", irSelecionados);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;