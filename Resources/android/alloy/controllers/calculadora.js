function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function renderProduct() {
        $.pagina_inicial.text = current_page;
        prd_id = produtos[current_page - 1];
        var produto = selectProductById(prd_id, ep_id, tabeladepreco);
        var template = produto.fieldByName("fk_template");
        var notfound;
        switch (template) {
          case 1:
            notfound = "/images/notfound_quatro_quadrados.jpg";
            break;

          case 2:
            notfound = "/images/notfound_tres_verticais.jpg";
            break;

          case 3:
            notfound = "/images/notfound_quatro_verticais.jpg";
            break;

          case 4:
            notfound = "/images/notfound_um_horizontal.jpg";
            break;

          case 5:
            notfound = "/images/notfound_dois_horizontais.jpg";
            break;

          case 6:
            notfound = "/images/notfound_dois_verticais.jpg";
            break;

          case 7:
            notfound = "/images/notfound_quatro_horizontais.jpg";
            break;

          case 8:
            notfound = "/images/notfound_cinco_verticais.jpg";
            break;

          case 9:
            notfound = "/images/notfound_seis_verticais.jpg";
        }
        ipi = produto.fieldByName("prd_ipi");
        icms = produto.fieldByName("prd_icms");
        informacoes = produto.fieldByName("prd_dados_tecnicos");
        composicao = produto.fieldByName("prd_dados_composicao");
        prazodeentrega = selecionaPrazo(produto.fieldByName("prd_data_inicio"), produto.fieldByName("prd_data_fim"));
        descricao = produto.fieldByName("prd_dados_descricao");
        codigodebarras = produto.fieldByName("prd_codigo_barra");
        $.referencia.text = "Referência\n" + produto.fieldByName("prd_referencia");
        $.nome.text = produto.fieldByName("prd_nome");
        $.colecao.text = "Coleção\n" + produto.fieldByName("prd_nome_colecao");
        $.preco.text = "Preço / Qtde\n" + formatCurrency(produto.fieldByName("minValor")) + " a " + formatCurrency(produto.fieldByName("maxValor"));
        var principal = getImagesFolder() + selectImagemPrincipal(prd_id);
        var file = Ti.Filesystem.getFile(principal);
        file ? file.exists() || (principal = notfound) : principal = notfound;
        layout = "vertical";
        switch (template) {
          case 4:
          case 5:
          case 7:
            layout = "vertical";
            break;

          default:
            layout = "horizontal";
        }
        removeAllViews(scrollView);
        scroll && $.content.remove(scroll);
        scrollView = Ti.UI.createView({
            top: 10,
            left: 0,
            height: "auto",
            width: "auto",
            layout: layout
        });
        scroll = Ti.UI.createScrollView({
            contentWidth: "auto",
            contentHeight: "auto",
            scrollType: layout,
            showVerticalScrollIndicator: true,
            showHorizontalScrollIndicator: true
        });
        $.content.add(scroll);
        var variantesView;
        cores = [];
        tamanhos = [];
        coresid = [];
        tamanhosid = [];
        botoes = [];
        var index;
        var tmp = selectInformacaoProdutoByProduct(prd_id, ep_id);
        var infoprodutos = tmp;
        while (infoprodutos.isValidRow()) {
            {
                infoprodutos.fieldByName("ifp_id");
            }
            var cor = infoprodutos.fieldByName("cor_nome");
            var corid = infoprodutos.fieldByName("cor_id");
            var tamanho = infoprodutos.fieldByName("tmh_nome");
            var tamanhoid = infoprodutos.fieldByName("tmh_id");
            index = cores.indexOf(cor);
            if (0 > index) {
                cores.push(cor);
                coresid.push(corid);
            }
            index = tamanhos.indexOf(tamanho);
            if (0 > index) {
                tamanhos.push(tamanho);
                tamanhosid.push(tamanhoid);
            }
            infoprodutos.next();
        }
        table && scrollView.remove(table);
        if ("vertical" == layout) {
            imagemPrincipal = Titanium.UI.createImageView({
                left: 0,
                width: "98%",
                image: principal,
                borderColor: "#CDCDCD",
                borderWidth: "1"
            });
            scrollView.add(imagemPrincipal);
            center = (imagemPrincipal.toBlob().width - 70 - 113 * (tamanhos.length + 3)) / 2;
            line = Titanium.UI.createView({
                top: 3,
                left: Math.round(center),
                height: "auto",
                layout: "horizontal",
                width: "100%"
            });
            table = Titanium.UI.createView({
                height: "100%",
                layout: "horizontal",
                width: "auto"
            });
            variantesView = Titanium.UI.createView({
                height: "100%",
                width: 100,
                layout: layout
            });
            var content_height = imagemPrincipal.toBlob().height + 5 + 113 * cores.length;
            scrollView.height = content_height;
            scrollView.width = "100%";
            line.add(variantesView);
            line.add(table);
            scrollView.add(line);
            var variantes = Titanium.UI.createLabel({
                backgroundColor: "#008382",
                color: "white",
                width: "100%",
                text: "Variantes",
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
            });
            variantesView.add(variantes);
            for (var i = 0; i < cores.length; i++) {
                var img = getImagesFolder() + selectImagemVariantePrincipal(prd_id, coresid[i]);
                var file = Ti.Filesystem.getFile(img);
                file ? file.exists() || (img = notfound) : img = notfound;
                var viewImagem = Titanium.UI.createView({
                    height: 100,
                    top: 3,
                    borderColor: "#008382",
                    borderWidth: "1"
                });
                var imagem = Titanium.UI.createImageView({
                    backgroundColor: "white",
                    width: "98%",
                    image: img,
                    corid: coresid[i]
                });
                imagem.addEventListener("click", function(e) {
                    renderSmallImages(e.source.corid);
                    setBigImage(e.source.image);
                });
                viewImagem.add(imagem);
                variantesView.add(viewImagem);
            }
            var total = Titanium.UI.createLabel({
                backgroundColor: "#008382",
                color: "white",
                width: "100%",
                top: 3,
                text: "TOTAL",
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
            });
            variantesView.add(total);
        } else {
            table = Titanium.UI.createView({
                height: "100%",
                layout: "horizontal",
                width: "auto"
            });
            imagemPrincipal = Titanium.UI.createImageView({
                image: principal,
                top: "0%",
                left: 0,
                height: "98%",
                borderColor: "#CDCDCD",
                borderWidth: "1"
            });
            scrollView.add(imagemPrincipal);
            center = (imagemPrincipal.toBlob().height - 113 * cores.length) / 2;
            variantesView = Titanium.UI.createView({
                top: center,
                left: 3,
                layout: "vertical",
                height: "auto",
                width: 100
            });
            scrollView.add(variantesView);
            scrollView.add(table);
            var variantes = Titanium.UI.createLabel({
                backgroundColor: "#008382",
                color: "white",
                width: "100%",
                text: "Variantes",
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
            });
            variantesView.add(variantes);
            var content_width = imagemPrincipal.toBlob().width + 5 + 103 * (tamanhos.length + 2);
            scrollView.width = content_width;
            scrollView.height = "100%";
            for (var i = 0; i < cores.length; i++) {
                var img = getImagesFolder() + selectImagemVariantePrincipal(prd_id, coresid[i]);
                var file = Ti.Filesystem.getFile(img);
                file ? file.exists() || (img = notfound) : img = notfound;
                var viewImagem = Titanium.UI.createView({
                    height: 100,
                    top: 3,
                    borderColor: "#008382",
                    borderWidth: "1"
                });
                var imagem = Titanium.UI.createImageView({
                    backgroundColor: "white",
                    width: "98%",
                    image: img,
                    corid: coresid[i]
                });
                imagem.addEventListener("click", function(e) {
                    renderSmallImages(e.source.corid);
                    setBigImage(e.source.image);
                });
                viewImagem.add(imagem);
                variantesView.add(viewImagem);
            }
            var total = Titanium.UI.createLabel({
                backgroundColor: "#008382",
                color: "white",
                width: "100%",
                top: 3,
                text: "TOTAL",
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
            });
            variantesView.add(total);
        }
        scroll.add(scrollView);
        renderTable();
        renderSmallImages(coresid[0]);
    }
    function renderSmallImages(corid) {
        var imagens = selectImagensPorVariante(prd_id, corid);
        removeAllViews($.imagens);
        var imgscroll = Ti.UI.createScrollView({
            height: "100%",
            contentWidth: "auto",
            contentHeight: "auto",
            scrollType: "horizontal",
            layout: "horizontal",
            showVerticalScrollIndicator: false,
            showHorizontalScrollIndicator: true
        });
        Ti.API.info("imagens.length=" + imagens.length);
        for (var i = 0; i < imagens.length; i++) {
            var imagem = Titanium.UI.createImageView({
                height: "65dp",
                image: getImagesFolder() + imagens[i],
                right: 3,
                borderColor: "#CDCDCD",
                borderWidth: "1"
            });
            imagem.addEventListener("click", function(e) {
                setBigImage(e.source.image);
            });
            imgscroll.add(imagem);
        }
        $.imagens.add(imgscroll);
    }
    function setBigImage(imagem) {
        imagemPrincipal.image = imagem;
    }
    function renderTable() {
        recalculateValues();
        removeAllViews(table);
        var altura = 0;
        "horizontal" == layout && (altura = center);
        var location = 0;
        for (var i = 0; i < tamanhos.length; i++) {
            var coluna = Titanium.UI.createView({
                top: altura,
                left: 3,
                layout: "vertical",
                height: "auto",
                width: 100
            });
            var tamanho = Titanium.UI.createLabel({
                backgroundColor: "#008382",
                color: "white",
                width: "100%",
                text: tamanhos[i],
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
            });
            coluna.add(tamanho);
            var quantidade_total = 0;
            var vetor = [];
            for (var j = 0; j < cores.length; j++) {
                var info_prd = selectInformacaoProdutoByTamanhoCor(prd_id, tamanhosid[i], coresid[j]);
                if (info_prd.isValidRow()) {
                    var qtnminima = info_prd.fieldByName("ifp_qtde_minima");
                    vetor[prd_id] = [];
                    vetor[prd_id] = qtnminima;
                    var preco_unitario = info_prd.fieldByName("ifp_valor_1");
                    var carrinho = selectCarrinhoByProductTamanhoCor(prd_id, tamanhosid[i], coresid[j], fk_cli);
                    var quantidade = 0;
                    var valor = 0;
                    if (0 != carrinho[0]) {
                        quantidade = carrinho[1];
                        quantidade_total += quantidade;
                    }
                    valor = porpreco ? formatCurrency(preco_unitario) : quantidade;
                    botoes[location] = Titanium.UI.createView({
                        height: 100,
                        tmh_id: tamanhosid[i],
                        cor_id: coresid[j],
                        ipi: ipi,
                        top: 3,
                        icms: icms,
                        location: location,
                        preco_unit: preco_unitario,
                        borderColor: "#008382",
                        borderWidth: "1"
                    });
                    valores[location] = Titanium.UI.createLabel({
                        color: "#FF0000",
                        width: "100%",
                        top: 5,
                        text: valor,
                        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                        tmh_id: tamanhosid[i],
                        cor_id: coresid[j],
                        location: location
                    });
                    botoes[location].add(valores[location]);
                    estoques[location] = Titanium.UI.createLabel({
                        color: "#008382",
                        width: "100%",
                        top: 45,
                        text: info_prd.fieldByName("ifp_estoque_2") - quantidade,
                        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                        tmh_id: tamanhosid[i],
                        cor_id: coresid[j],
                        location: location
                    });
                    botoes[location].add(estoques[location]);
                    var valor_minimo = Titanium.UI.createLabel({
                        color: "#E98400",
                        width: "100%",
                        top: 65,
                        text: "min. " + info_prd.fieldByName("ifp_qtde_minima"),
                        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                        tmh_id: tamanhosid[i],
                        cor_id: coresid[j],
                        location: location
                    });
                    botoes[location].add(valor_minimo);
                    botoes[location].addEventListener("click", function(e) {
                        selecionaItem(e.source);
                    });
                    coluna.add(botoes[location]);
                    location++;
                }
            }
            Ti.App.Properties.setList("lista", vetor);
            var total = Titanium.UI.createLabel({
                backgroundColor: "#008382",
                color: "white",
                width: "100%",
                top: 3,
                text: quantidade_total,
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
            });
            coluna.add(total);
            table.add(coluna);
        }
        clearAllButtons();
    }
    function selecionaItem(item) {
        var location = item.location;
        var index = botoes_selecionados.indexOf(location);
        var view = botoes[location];
        if (0 > index) {
            view.backgroundColor = "#FFFF00";
            botoes_selecionados.push(location);
        } else {
            view.backgroundColor = "white";
            botoes_selecionados.splice(index, 1);
        }
    }
    function botaoOk() {
        var var_global = Ti.App.Properties.getList("lista");
        var qtnminima = var_global[prd_id];
        if ($.tela.text < qtnminima) alert("Quantidade minima de " + qtnminima); else if ("" == $.tela.text) alert("Digite a quantidade"); else {
            var quantidade = $.tela.text;
            sortido ? valorSortido(quantidade) : valorPorQuantidade(quantidade);
            $.tela.text = "";
            renderTable();
        }
    }
    function valorPorQuantidade(quantidade) {
        for (var i = 0; i < botoes_selecionados.length; i++) {
            var view = botoes[botoes_selecionados[i]];
            var estoque = estoques[botoes_selecionados[i]].text - quantidade;
            0 > estoque && (estoque = 0);
            insertOrder(view.tmh_id, view.cor_id, quantidade, view.preco_unit, view.ipi, view.icms);
        }
    }
    function botaoSortir() {
        if (sortido) {
            sortido = false;
            $.sortido.backgroundGradient = {
                type: "linear",
                colors: [ "#2c8f8e", "#206764" ]
            };
        } else {
            sortido = true;
            $.sortido.backgroundGradient = {
                type: "linear",
                colors: [ "#d9534f", "#e5302a" ]
            };
        }
    }
    function valorSortido(quantidade) {
        var row = cores.length;
        var col = tamanhos.length;
        var valores = spread(row, col, quantidade);
        for (var i = 0; row > i; i++) for (var j = 0; col > j; j++) {
            var fk_cores = coresid[i];
            var fk_tamanhos = tamanhosid[j];
            var product = selectProductById(prd_id, ep_id, tabelapreco);
            var car_quantidade = valores[i][j];
            var car_preco_unitario = product.fieldByName("minValor");
            var car_ipi = product.fieldByName("prd_ipi");
            var car_icms = product.fieldByName("prd_icms");
            insertOrder(fk_tamanhos, fk_cores, car_quantidade, car_preco_unitario, car_ipi, car_icms);
        }
        renderTable();
    }
    function spread(row, col, value) {
        var result = [];
        for (var i = 0; row > i; i++) {
            result[i] = [];
            for (var j = 0; col > j; j++) result[i][j] = 0;
        }
        var m1 = col / 2;
        var m2 = col % 2;
        var middle1 = 0;
        var middle2 = 0;
        if (1 == m2) middle1 = m1 + m2; else {
            middle1 = m1;
            middle2 = m1 + 1;
        }
        middle1--;
        middle2--;
        var mapper = [];
        var pointer = 0;
        if (middle1 > -1) for (var i = 0; row > i; i++) {
            mapper[pointer] = i + "," + middle1;
            pointer++;
        }
        if (middle2 > -1) for (var i = 0; row > i; i++) {
            mapper[pointer] = i + "," + middle2;
            pointer++;
        }
        pointer = 0;
        for (var i = 0; row > i; i++) for (var j = 0; col > j; j++) {
            var newMap = i + "," + j;
            if (mapper.indexOf(newMap) < 0) {
                mapper[pointer] = newMap;
                pointer++;
            }
        }
        pointer = 0;
        for (var k = 0; value > k; k++) {
            var map = mapper[pointer].split(",");
            var val = result[map[0]][map[1]];
            val++;
            result[map[0]][map[1]] = val;
            pointer++;
            pointer == row * col && (pointer = 0);
        }
        return result;
    }
    function insertOrder(fk_tamanhos, fk_cores, car_quantidade, car_preco_unitario, car_ipi, car_icms) {
        var carrinho = selectCarrinhoByProductTamanhoCor(prd_id, fk_tamanhos, fk_cores, fk_cli);
        var session = Ti.App.Properties.getString(SESSION_ID);
        var fk_usu = Ti.App.Properties.getString(CURRENT_USER_ID);
        if (0 != carrinho[0]) {
            var car_id = carrinho[0];
            var quantidade_atual = carrinho[1];
            var estoque = carrinho[2];
            var quantidade = 0;
            0 != car_quantidade && (quantidade = quantidade_atual + parseInt(car_quantidade));
            quantidade > estoque && (quantidade = estoque);
            updateCarrinho(car_id, session, quantidade, 0, 0, 0, 0, 0);
        } else insertCarrinho(session, car_quantidade, car_preco_unitario, car_ipi, car_icms, 0, 0, 0, 0, 0, fk_usu, prd_id, fk_tamanhos, fk_cores, fk_cli, ep_id);
    }
    function recalculateValues() {
        quantidaderef = 0;
        valorref = 0;
        quantidadetotal = 0;
        valortotal = 0;
        var carrinho = selectallCarrinho();
        while (carrinho.isValidRow()) {
            if (carrinho.fieldByName("fk_produtos") == prd_id) {
                Ti.API.info("carrinho=" + carrinho.fieldByName("car_quantidade"));
                quantidaderef += carrinho.fieldByName("car_quantidade");
                valorref += carrinho.fieldByName("car_quantidade") * carrinho.fieldByName("car_preco_unitario");
            }
            quantidadetotal += carrinho.fieldByName("car_quantidade");
            valortotal += carrinho.fieldByName("car_quantidade") * carrinho.fieldByName("car_preco_unitario");
            carrinho.next();
        }
        $.pecasref.title = quantidaderef + "";
        $.valorref.title = formatCurrency(valorref);
        $.pecastotal.title = quantidadetotal + "";
        $.valortotal.title = formatCurrency(valortotal);
    }
    function clearAllButtons() {
        for (var i = 0; i < botoes_selecionados.length; i++) {
            var view = botoes[botoes_selecionados[i]];
            view.backgroundColor = "white";
        }
        botoes_selecionados = [];
    }
    function selecionaPrazo(inicio, fim) {
        return "De " + inicio + " à " + fim;
    }
    function goToCatalogo() {
        goTo("categorias");
    }
    function goToPedido() {
        0 >= quantidadetotal ? alert("Nenhum produto comprado!") : min_credito > valortotal ? alert("Valor mínimo para compra é de " + formatCurrency(min_credito)) : goTo("carrinho");
    }
    function informacoes() {
        alert(informacoes);
    }
    function composicao() {
        alert(composicao);
    }
    function precotroca() {
        porpreco = porpreco ? false : true;
        renderTable();
    }
    function prazo() {
        alert(prazodeentrega);
    }
    function descricao() {
        alert(descricao);
    }
    function codbarras() {
        alert(codigodebarras);
    }
    function apaga() {
        var str = $.tela.text;
        str.length > 0 && ($.tela.text = str.substring(0, str.length - 1));
    }
    function botao1() {
        $.tela.text = $.tela.text + "1";
    }
    function botao2() {
        $.tela.text = $.tela.text + "2";
    }
    function botao3() {
        $.tela.text = $.tela.text + "3";
    }
    function botao4() {
        $.tela.text = $.tela.text + "4";
    }
    function botao5() {
        $.tela.text = $.tela.text + "5";
    }
    function botao6() {
        $.tela.text = $.tela.text + "6";
    }
    function botao7() {
        $.tela.text = $.tela.text + "7";
    }
    function botao8() {
        $.tela.text = $.tela.text + "8";
    }
    function botao9() {
        $.tela.text = $.tela.text + "9";
    }
    function botao0() {
        $.tela.text = $.tela.text + "0";
    }
    function botaoLimpa() {
        clearAllButtons();
        $.tela.text = "";
    }
    function botaoLista() {
        if (lista_visible) {
            $.produtos.animate({
                curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
                right: "-20%",
                duration: 200
            });
            lista_visible = false;
        } else {
            $.produtos.animate({
                curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
                right: 5,
                duration: 200
            });
            lista_visible = true;
        }
    }
    function fecharLista() {
        botaoLista();
    }
    function renderLista() {
        removeAllViews($.listaprodutos);
        var listscroll = Ti.UI.createScrollView({
            top: 10,
            left: 0,
            contentWidth: "auto",
            contentHeight: "auto",
            scrollType: "vertical",
            layout: "vertical",
            showVerticalScrollIndicator: true,
            showHorizontalScrollIndicator: true
        });
        var linha = Ti.UI.createView({
            width: "100%",
            layout: "horizontal"
        });
        $.listaprodutos.add(listscroll);
        var linhas = 1;
        for (var i = 0; i < produtos.length; i++) {
            var coluna = Titanium.UI.createView({
                top: 5,
                left: 5,
                layout: "vertical",
                height: 140,
                width: "25%",
                prd_id: produtos[i]
            });
            var border = Titanium.UI.createView({
                layout: "vertical",
                height: "80%",
                width: "100%",
                borderColor: "#008382",
                borderWidth: "1",
                prd_id: produtos[i]
            });
            border.addEventListener("click", function(e) {
                current_page = produtos.indexOf(e.source.prd_id) + 1;
                renderProduct();
            });
            var imagem = Titanium.UI.createImageView({
                height: "60%",
                prd_id: produtos[i],
                image: getImagesFolder() + selectImagemPrincipal(produtos[i])
            });
            border.add(imagem);
            var remove = Titanium.UI.createButton({
                backgroundColor: "transparent",
                width: "100%",
                image: "/images/apagar.png",
                prd_id: produtos[i]
            });
            coluna.add(border);
            coluna.add(remove);
            if (linhas > 3) {
                linhas = 1;
                listscroll.add(linha);
                linha = Ti.UI.createView({
                    width: "100%",
                    layout: "horizontal"
                });
            } else linha.add(coluna);
            linhas++;
        }
        listscroll.add(linha);
    }
    function botaoZera() {
        for (var i = 0; i < botoes.length; i++) {
            var view = botoes[i];
            insertOrder(view.tmh_id, view.cor_id, 0, 0, 0, 0);
        }
        renderTable();
    }
    function botaoAnterior() {
        current_page--;
        0 >= current_page && (current_page = produtos.length);
        renderProduct();
    }
    function botaoProximo() {
        current_page++;
        current_page > produtos.length && (current_page = 1);
        renderProduct();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "calculadora";
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
    $.__views.calculadora = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "calculadora"
    });
    $.__views.calculadora && $.addTopLevelView($.__views.calculadora);
    $.__views.__alloyId0 = Ti.UI.createView({
        height: "10%",
        left: "15%",
        bottom: 0,
        width: "65%",
        layout: "horizontal",
        id: "__alloyId0"
    });
    $.__views.calculadora.add($.__views.__alloyId0);
    $.__views.imagens = Ti.UI.createView({
        left: 0,
        height: "88%",
        width: "55%",
        layout: "horizontal",
        id: "imagens"
    });
    $.__views.__alloyId0.add($.__views.imagens);
    $.__views.__alloyId1 = Ti.UI.createImageView({
        height: "60%",
        image: "/images/estoque.png",
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.pagina_inicial = Ti.UI.createLabel({
        borderColor: "#008382",
        borderWidth: 3,
        color: "red",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: 50,
        height: 50,
        text: "1",
        id: "pagina_inicial"
    });
    $.__views.__alloyId0.add($.__views.pagina_inicial);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        color: "#008382",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: 3,
        text: "de",
        id: "__alloyId2"
    });
    $.__views.__alloyId0.add($.__views.__alloyId2);
    $.__views.pagina_final = Ti.UI.createLabel({
        borderColor: "#008382",
        borderWidth: 3,
        color: "red",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: 50,
        height: 50,
        left: 3,
        text: "1",
        id: "pagina_final"
    });
    $.__views.__alloyId0.add($.__views.pagina_final);
    $.__views.content = Ti.UI.createView({
        height: "85%",
        left: "15%",
        bottom: "15%",
        width: "65%",
        id: "content"
    });
    $.__views.calculadora.add($.__views.content);
    $.__views.__alloyId3 = Ti.UI.createView({
        height: "100%",
        left: "0",
        width: "15%",
        id: "__alloyId3"
    });
    $.__views.calculadora.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        height: "8%",
        top: "1%",
        width: "90%",
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.referencia = Ti.UI.createLabel({
        touchEnabled: "false",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Referência",
        id: "referencia"
    });
    $.__views.__alloyId4.add($.__views.referencia);
    $.__views.__alloyId5 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        height: "8%",
        top: "10%",
        width: "90%",
        id: "__alloyId5"
    });
    $.__views.__alloyId3.add($.__views.__alloyId5);
    $.__views.nome = Ti.UI.createLabel({
        touchEnabled: "false",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "nome"
    });
    $.__views.__alloyId5.add($.__views.nome);
    $.__views.__alloyId6 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        height: "8%",
        top: "19%",
        width: "90%",
        id: "__alloyId6"
    });
    $.__views.__alloyId3.add($.__views.__alloyId6);
    $.__views.colecao = Ti.UI.createLabel({
        touchEnabled: "false",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Coleção",
        id: "colecao"
    });
    $.__views.__alloyId6.add($.__views.colecao);
    $.__views.__alloyId7 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        height: "8%",
        top: "28%",
        width: "90%",
        id: "__alloyId7"
    });
    $.__views.__alloyId3.add($.__views.__alloyId7);
    informacoes ? $.__views.__alloyId7.addEventListener("click", informacoes) : __defers["$.__views.__alloyId7!click!informacoes"] = true;
    $.__views.informacoes = Ti.UI.createLabel({
        touchEnabled: "false",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Informações técnicas",
        id: "informacoes"
    });
    $.__views.__alloyId7.add($.__views.informacoes);
    $.__views.__alloyId8 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        height: "8%",
        top: "37%",
        width: "90%",
        id: "__alloyId8"
    });
    $.__views.__alloyId3.add($.__views.__alloyId8);
    composicao ? $.__views.__alloyId8.addEventListener("click", composicao) : __defers["$.__views.__alloyId8!click!composicao"] = true;
    $.__views.composicao = Ti.UI.createLabel({
        touchEnabled: "false",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Composição",
        id: "composicao"
    });
    $.__views.__alloyId8.add($.__views.composicao);
    $.__views.__alloyId9 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        font: {
            fontSize: 16
        },
        borderRadius: "5",
        color: "#ffffff",
        height: "8%",
        top: "46%",
        width: "90%",
        id: "__alloyId9"
    });
    $.__views.__alloyId3.add($.__views.__alloyId9);
    precotroca ? $.__views.__alloyId9.addEventListener("click", precotroca) : __defers["$.__views.__alloyId9!click!precotroca"] = true;
    $.__views.preco = Ti.UI.createLabel({
        touchEnabled: "false",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Preço / Qtde",
        id: "preco"
    });
    $.__views.__alloyId9.add($.__views.preco);
    $.__views.__alloyId10 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        height: "8%",
        top: "55%",
        width: "90%",
        id: "__alloyId10"
    });
    $.__views.__alloyId3.add($.__views.__alloyId10);
    prazo ? $.__views.__alloyId10.addEventListener("click", prazo) : __defers["$.__views.__alloyId10!click!prazo"] = true;
    $.__views.prazo = Ti.UI.createLabel({
        touchEnabled: "false",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Prazo de entrega",
        id: "prazo"
    });
    $.__views.__alloyId10.add($.__views.prazo);
    $.__views.__alloyId11 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        height: "8%",
        top: "64%",
        width: "90%",
        id: "__alloyId11"
    });
    $.__views.__alloyId3.add($.__views.__alloyId11);
    descricao ? $.__views.__alloyId11.addEventListener("click", descricao) : __defers["$.__views.__alloyId11!click!descricao"] = true;
    $.__views.descricao = Ti.UI.createLabel({
        touchEnabled: "false",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Descrição do produto",
        id: "descricao"
    });
    $.__views.__alloyId11.add($.__views.descricao);
    $.__views.__alloyId12 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        height: "8%",
        top: "73%",
        width: "90%",
        id: "__alloyId12"
    });
    $.__views.__alloyId3.add($.__views.__alloyId12);
    codbarras ? $.__views.__alloyId12.addEventListener("click", codbarras) : __defers["$.__views.__alloyId12!click!codbarras"] = true;
    $.__views.codbarras = Ti.UI.createLabel({
        touchEnabled: "false",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Código de barras",
        id: "codbarras"
    });
    $.__views.__alloyId12.add($.__views.codbarras);
    $.__views.logoEmpresa = Ti.UI.createImageView({
        image: "/images/logo_rodape.jpg",
        top: "82%",
        width: "90%",
        id: "logoEmpresa"
    });
    $.__views.__alloyId3.add($.__views.logoEmpresa);
    $.__views.__alloyId13 = Ti.UI.createView({
        height: "100%",
        right: "0",
        width: "20%",
        id: "__alloyId13"
    });
    $.__views.calculadora.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createView({
        borderColor: "#000000",
        borderWidth: "1",
        height: "10%",
        top: "1%",
        width: "94%",
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    $.__views.tela = Ti.UI.createLabel({
        backgroundColor: "#000000",
        color: "#ffffff",
        font: {
            fontSize: 25
        },
        height: "90%",
        left: "1%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "67%",
        text: "",
        id: "tela"
    });
    $.__views.__alloyId14.add($.__views.tela);
    $.__views.apaga = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        height: "90%",
        right: "1%",
        font: {
            fontSize: 18
        },
        width: "30%",
        title: "",
        id: "apaga"
    });
    $.__views.__alloyId14.add($.__views.apaga);
    apaga ? $.__views.apaga.addEventListener("click", apaga) : __defers["$.__views.apaga!click!apaga"] = true;
    $.__views.__alloyId15 = Ti.UI.createView({
        borderColor: "#cccccc",
        borderWidth: "1",
        height: "50%",
        top: "12%",
        width: "94%",
        id: "__alloyId15"
    });
    $.__views.__alloyId13.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        font: {
            fontSize: 25
        },
        color: "#ffffff",
        height: "15%",
        left: "1%",
        top: "33%",
        width: "31%",
        title: "1",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    botao1 ? $.__views.__alloyId16.addEventListener("click", botao1) : __defers["$.__views.__alloyId16!click!botao1"] = true;
    $.__views.__alloyId17 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        font: {
            fontSize: 25
        },
        color: "#ffffff",
        height: "15%",
        top: "33%",
        width: "31%",
        title: "2",
        id: "__alloyId17"
    });
    $.__views.__alloyId15.add($.__views.__alloyId17);
    botao2 ? $.__views.__alloyId17.addEventListener("click", botao2) : __defers["$.__views.__alloyId17!click!botao2"] = true;
    $.__views.__alloyId18 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        font: {
            fontSize: 25
        },
        color: "#ffffff",
        height: "15%",
        right: "1%",
        top: "33%",
        width: "31%",
        title: "3",
        id: "__alloyId18"
    });
    $.__views.__alloyId15.add($.__views.__alloyId18);
    botao3 ? $.__views.__alloyId18.addEventListener("click", botao3) : __defers["$.__views.__alloyId18!click!botao3"] = true;
    $.__views.__alloyId19 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        font: {
            fontSize: 25
        },
        color: "#ffffff",
        height: "15%",
        left: "1%",
        top: "17%",
        width: "31%",
        title: "4",
        id: "__alloyId19"
    });
    $.__views.__alloyId15.add($.__views.__alloyId19);
    botao4 ? $.__views.__alloyId19.addEventListener("click", botao4) : __defers["$.__views.__alloyId19!click!botao4"] = true;
    $.__views.__alloyId20 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        font: {
            fontSize: 25
        },
        color: "#ffffff",
        height: "15%",
        top: "17%",
        width: "31%",
        title: "5",
        id: "__alloyId20"
    });
    $.__views.__alloyId15.add($.__views.__alloyId20);
    botao5 ? $.__views.__alloyId20.addEventListener("click", botao5) : __defers["$.__views.__alloyId20!click!botao5"] = true;
    $.__views.__alloyId21 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        font: {
            fontSize: 25
        },
        color: "#ffffff",
        height: "15%",
        right: "1%",
        top: "17%",
        width: "31%",
        title: "6",
        id: "__alloyId21"
    });
    $.__views.__alloyId15.add($.__views.__alloyId21);
    botao6 ? $.__views.__alloyId21.addEventListener("click", botao6) : __defers["$.__views.__alloyId21!click!botao6"] = true;
    $.__views.__alloyId22 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        font: {
            fontSize: 25
        },
        color: "#ffffff",
        height: "15%",
        left: "1%",
        top: "1%",
        width: "31%",
        title: "7",
        id: "__alloyId22"
    });
    $.__views.__alloyId15.add($.__views.__alloyId22);
    botao7 ? $.__views.__alloyId22.addEventListener("click", botao7) : __defers["$.__views.__alloyId22!click!botao7"] = true;
    $.__views.__alloyId23 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        font: {
            fontSize: 25
        },
        color: "#ffffff",
        height: "15%",
        top: "1%",
        width: "31%",
        title: "8",
        id: "__alloyId23"
    });
    $.__views.__alloyId15.add($.__views.__alloyId23);
    botao8 ? $.__views.__alloyId23.addEventListener("click", botao8) : __defers["$.__views.__alloyId23!click!botao8"] = true;
    $.__views.__alloyId24 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        font: {
            fontSize: 25
        },
        color: "#ffffff",
        height: "15%",
        right: "1%",
        top: "1%",
        width: "31%",
        title: "9",
        id: "__alloyId24"
    });
    $.__views.__alloyId15.add($.__views.__alloyId24);
    botao9 ? $.__views.__alloyId24.addEventListener("click", botao9) : __defers["$.__views.__alloyId24!click!botao9"] = true;
    $.__views.__alloyId25 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#d9534f", "#e5302a" ]
        },
        borderRadius: "5",
        font: {
            fontSize: 25
        },
        color: "#ffffff",
        height: "15%",
        left: "1%",
        top: "49%",
        width: "31%",
        title: "OK",
        id: "__alloyId25"
    });
    $.__views.__alloyId15.add($.__views.__alloyId25);
    botaoOk ? $.__views.__alloyId25.addEventListener("click", botaoOk) : __defers["$.__views.__alloyId25!click!botaoOk"] = true;
    $.__views.__alloyId26 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        font: {
            fontSize: 25
        },
        color: "#ffffff",
        height: "15%",
        top: "49%",
        width: "31%",
        title: "0",
        id: "__alloyId26"
    });
    $.__views.__alloyId15.add($.__views.__alloyId26);
    botao0 ? $.__views.__alloyId26.addEventListener("click", botao0) : __defers["$.__views.__alloyId26!click!botao0"] = true;
    $.__views.sortido = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        height: "15%",
        right: "1%",
        top: "49%",
        width: "31%",
        id: "sortido"
    });
    $.__views.__alloyId15.add($.__views.sortido);
    botaoSortir ? $.__views.sortido.addEventListener("click", botaoSortir) : __defers["$.__views.sortido!click!botaoSortir"] = true;
    $.__views.__alloyId27 = Ti.UI.createLabel({
        touchEnabled: "false",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "QTDE. SORTIDA",
        id: "__alloyId27"
    });
    $.__views.sortido.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#d9534f", "#e5302a" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        height: "15%",
        left: "1%",
        top: "65%",
        width: "31%",
        id: "__alloyId28"
    });
    $.__views.__alloyId15.add($.__views.__alloyId28);
    botaoLimpa ? $.__views.__alloyId28.addEventListener("click", botaoLimpa) : __defers["$.__views.__alloyId28!click!botaoLimpa"] = true;
    $.__views.__alloyId29 = Ti.UI.createLabel({
        touchEnabled: "false",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "LIMPAR",
        id: "__alloyId29"
    });
    $.__views.__alloyId28.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        font: {
            fontSize: 12
        },
        height: "15%",
        top: "65%",
        width: "31%",
        id: "__alloyId30"
    });
    $.__views.__alloyId15.add($.__views.__alloyId30);
    botaoLista ? $.__views.__alloyId30.addEventListener("click", botaoLista) : __defers["$.__views.__alloyId30!click!botaoLista"] = true;
    $.__views.__alloyId31 = Ti.UI.createLabel({
        touchEnabled: "false",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "LISTAR PROD.",
        id: "__alloyId31"
    });
    $.__views.__alloyId30.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#d9534f", "#e5302a" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        font: {
            fontSize: 12
        },
        height: "15%",
        right: "1%",
        top: "65%",
        width: "31%",
        id: "__alloyId32"
    });
    $.__views.__alloyId15.add($.__views.__alloyId32);
    botaoZera ? $.__views.__alloyId32.addEventListener("click", botaoZera) : __defers["$.__views.__alloyId32!click!botaoZera"] = true;
    $.__views.__alloyId33 = Ti.UI.createLabel({
        touchEnabled: "false",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "ZERAR",
        id: "__alloyId33"
    });
    $.__views.__alloyId32.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        font: {
            fontSize: 12
        },
        height: "18%",
        left: "1%",
        top: "81%",
        width: "48%",
        id: "__alloyId34"
    });
    $.__views.__alloyId15.add($.__views.__alloyId34);
    botaoAnterior ? $.__views.__alloyId34.addEventListener("click", botaoAnterior) : __defers["$.__views.__alloyId34!click!botaoAnterior"] = true;
    $.__views.__alloyId35 = Ti.UI.createLabel({
        touchEnabled: "false",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "PRODUTO ANTERIOR SELECIONADO",
        id: "__alloyId35"
    });
    $.__views.__alloyId34.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        font: {
            fontSize: 12
        },
        height: "18%",
        right: "1%",
        top: "81%",
        width: "48%",
        id: "__alloyId36"
    });
    $.__views.__alloyId15.add($.__views.__alloyId36);
    botaoProximo ? $.__views.__alloyId36.addEventListener("click", botaoProximo) : __defers["$.__views.__alloyId36!click!botaoProximo"] = true;
    $.__views.__alloyId37 = Ti.UI.createLabel({
        touchEnabled: "false",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "PRÓXIMO PRODUTO SELECIONADO",
        id: "__alloyId37"
    });
    $.__views.__alloyId36.add($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: "1",
        color: "#000000",
        font: {
            fontSize: 12
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "6%",
        left: "3%",
        top: "63%",
        width: "40%",
        text: "Nº de peças desta ref.:",
        id: "__alloyId38"
    });
    $.__views.__alloyId13.add($.__views.__alloyId38);
    $.__views.pecasref = Ti.UI.createButton({
        backgroundColor: "#000000",
        borderColor: "#ffffff",
        borderWidth: "1",
        color: "#ffffff",
        height: "6%",
        right: "3%",
        top: "63%",
        width: "54%",
        title: "0",
        id: "pecasref"
    });
    $.__views.__alloyId13.add($.__views.pecasref);
    $.__views.__alloyId39 = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: "1",
        color: "#000000",
        font: {
            fontSize: 12
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "6%",
        left: "3%",
        top: "69%",
        width: "40%",
        text: "Valor desta ref.:",
        id: "__alloyId39"
    });
    $.__views.__alloyId13.add($.__views.__alloyId39);
    $.__views.valorref = Ti.UI.createButton({
        backgroundColor: "#000000",
        borderColor: "#ffffff",
        borderWidth: "1",
        color: "#ffffff",
        height: "6%",
        right: "3%",
        top: "69%",
        width: "54%",
        title: "R$ 0,00",
        id: "valorref"
    });
    $.__views.__alloyId13.add($.__views.valorref);
    $.__views.__alloyId40 = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: "1",
        color: "#000000",
        font: {
            fontSize: 12
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "6%",
        left: "3%",
        top: "76%",
        width: "40%",
        text: "Nº de peças acumuladas:",
        id: "__alloyId40"
    });
    $.__views.__alloyId13.add($.__views.__alloyId40);
    $.__views.pecastotal = Ti.UI.createButton({
        backgroundColor: "#000000",
        borderColor: "#ffffff",
        borderWidth: "1",
        color: "#ffffff",
        height: "6%",
        right: "3%",
        top: "76%",
        width: "54%",
        title: "0",
        id: "pecastotal"
    });
    $.__views.__alloyId13.add($.__views.pecastotal);
    $.__views.__alloyId41 = Ti.UI.createLabel({
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: "1",
        color: "#000000",
        font: {
            fontSize: 12
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: "6%",
        left: "3%",
        top: "82%",
        width: "40%",
        text: "Valor acumulado:",
        id: "__alloyId41"
    });
    $.__views.__alloyId13.add($.__views.__alloyId41);
    $.__views.valortotal = Ti.UI.createButton({
        backgroundColor: "#000000",
        borderColor: "#ffffff",
        borderWidth: "1",
        color: "#ffffff",
        height: "6%",
        right: "3%",
        top: "82%",
        width: "54%",
        title: "R$ 0,00",
        id: "valortotal"
    });
    $.__views.__alloyId13.add($.__views.valortotal);
    $.__views.__alloyId42 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        bottom: "1%",
        color: "#ffffff",
        font: {
            fontSize: 14
        },
        height: "10%",
        right: "3%",
        width: "46%",
        id: "__alloyId42"
    });
    $.__views.__alloyId13.add($.__views.__alloyId42);
    goToCatalogo ? $.__views.__alloyId42.addEventListener("click", goToCatalogo) : __defers["$.__views.__alloyId42!click!goToCatalogo"] = true;
    $.__views.__alloyId43 = Ti.UI.createLabel({
        touchEnabled: "false",
        color: "#ffffff",
        font: {
            fontSize: 11
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "VOLTAR CATEGORIAS",
        id: "__alloyId43"
    });
    $.__views.__alloyId42.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        bottom: "1%",
        height: "10%",
        left: "3%",
        width: "46%",
        id: "__alloyId44"
    });
    $.__views.__alloyId13.add($.__views.__alloyId44);
    goToPedido ? $.__views.__alloyId44.addEventListener("click", goToPedido) : __defers["$.__views.__alloyId44!click!goToPedido"] = true;
    $.__views.__alloyId45 = Ti.UI.createImageView({
        height: "50%",
        image: "/images/carrinho.png",
        id: "__alloyId45"
    });
    $.__views.__alloyId44.add($.__views.__alloyId45);
    goToPedido ? $.__views.__alloyId45.addEventListener("click", goToPedido) : __defers["$.__views.__alloyId45!click!goToPedido"] = true;
    $.__views.produtos = Ti.UI.createView({
        backgroundColor: "white",
        top: 5,
        bottom: 5,
        height: "100%",
        right: "-20%",
        width: "20%",
        borderColor: "#008382",
        borderWidth: "1",
        id: "produtos"
    });
    $.__views.calculadora.add($.__views.produtos);
    $.__views.__alloyId46 = Ti.UI.createLabel({
        backgroundColor: "#008382",
        color: "white",
        top: 0,
        width: "100%",
        height: "5%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Lista de Produtos",
        id: "__alloyId46"
    });
    $.__views.produtos.add($.__views.__alloyId46);
    $.__views.listaprodutos = Ti.UI.createView({
        width: "100%",
        heigth: "85%",
        top: "6%",
        layout: "vertical",
        id: "listaprodutos"
    });
    $.__views.produtos.add($.__views.listaprodutos);
    $.__views.__alloyId47 = Ti.UI.createButton({
        backgroundGradient: {
            type: "linear",
            colors: [ "#2c8f8e", "#206764" ]
        },
        borderRadius: "5",
        color: "#ffffff",
        height: "5%",
        bottom: "2%",
        right: "5%",
        width: "40%",
        title: "Voltar",
        id: "__alloyId47"
    });
    $.__views.produtos.add($.__views.__alloyId47);
    fecharLista ? $.__views.__alloyId47.addEventListener("click", fecharLista) : __defers["$.__views.__alloyId47!click!fecharLista"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.include("/api/config.js");
    Ti.include("/database/aparencia.js");
    Ti.include("/database/clientes.js");
    Ti.include("/database/produtos.js");
    Ti.include("/database/aparencia.js");
    Ti.include("/database/carrinho.js");
    Ti.include("/database/imagens_produtos.js");
    Ti.include("/database/informacao_produto.js");
    var current_page = 1;
    var tabeladepreco = 1;
    var ep_id = Ti.App.Properties.getString(CURRENT_EMPRESA);
    var produtos = Ti.App.Properties.getList(SELECTED_PRODUCTS);
    Ti.App.Properties.getList(CURRENT_USER_ID);
    var clientes = Ti.App.Properties.getList(SELECTED_CLIENTS);
    var tabelapreco = 1;
    var fk_cli = clientes[0];
    var prd_id = 0;
    var informacoes;
    var composicao;
    var prazodeentrega;
    var descricao;
    var codigodebarras;
    var botoes = [];
    var valores = [];
    var estoques = [];
    var cores = [];
    var tamanhos = [];
    var coresid = [];
    var tamanhosid = [];
    var botoes_selecionados = [];
    var porpreco = false;
    var table;
    var ipi = 0;
    var icms = 0;
    var sortido = false;
    var imagemPrincipal;
    var lista_visible = false;
    var scrollView;
    var scroll;
    var line;
    var center;
    var layout;
    var quantidaderef = 0;
    var valorref = 0;
    var quantidadetotal = 0;
    var valortotal = 0;
    $.logoEmpresa.image = getImagesFolder() + selectLogoFile();
    $.apaga.title = "<<";
    renderProduct();
    renderLista();
    $.pagina_final.text = produtos.length;
    var min_credito = 0;
    var max_credito = 0;
    var cliente = consultaCredito(clientes[0]);
    if (cliente.isValidRow()) {
        min_credito = cliente.fieldByName("cl_valor_minimo");
        max_credito = cliente.fieldByName("cl_credito_total") - cliente.fieldByName("cl_credito_utilizado");
    }
    $.informacoes.font = {
        fontSize: 19
    };
    $.referencia.font = {
        fontSize: 19
    };
    $.nome.font = {
        fontSize: 19
    };
    $.colecao.font = {
        fontSize: 19
    };
    $.composicao.font = {
        fontSize: 19
    };
    $.preco.font = {
        fontSize: 19
    };
    $.prazo.font = {
        fontSize: 19
    };
    $.descricao.font = {
        fontSize: 19
    };
    $.codbarras.font = {
        fontSize: 19
    };
    __defers["$.__views.__alloyId7!click!informacoes"] && $.__views.__alloyId7.addEventListener("click", informacoes);
    __defers["$.__views.__alloyId8!click!composicao"] && $.__views.__alloyId8.addEventListener("click", composicao);
    __defers["$.__views.__alloyId9!click!precotroca"] && $.__views.__alloyId9.addEventListener("click", precotroca);
    __defers["$.__views.__alloyId10!click!prazo"] && $.__views.__alloyId10.addEventListener("click", prazo);
    __defers["$.__views.__alloyId11!click!descricao"] && $.__views.__alloyId11.addEventListener("click", descricao);
    __defers["$.__views.__alloyId12!click!codbarras"] && $.__views.__alloyId12.addEventListener("click", codbarras);
    __defers["$.__views.apaga!click!apaga"] && $.__views.apaga.addEventListener("click", apaga);
    __defers["$.__views.__alloyId16!click!botao1"] && $.__views.__alloyId16.addEventListener("click", botao1);
    __defers["$.__views.__alloyId17!click!botao2"] && $.__views.__alloyId17.addEventListener("click", botao2);
    __defers["$.__views.__alloyId18!click!botao3"] && $.__views.__alloyId18.addEventListener("click", botao3);
    __defers["$.__views.__alloyId19!click!botao4"] && $.__views.__alloyId19.addEventListener("click", botao4);
    __defers["$.__views.__alloyId20!click!botao5"] && $.__views.__alloyId20.addEventListener("click", botao5);
    __defers["$.__views.__alloyId21!click!botao6"] && $.__views.__alloyId21.addEventListener("click", botao6);
    __defers["$.__views.__alloyId22!click!botao7"] && $.__views.__alloyId22.addEventListener("click", botao7);
    __defers["$.__views.__alloyId23!click!botao8"] && $.__views.__alloyId23.addEventListener("click", botao8);
    __defers["$.__views.__alloyId24!click!botao9"] && $.__views.__alloyId24.addEventListener("click", botao9);
    __defers["$.__views.__alloyId25!click!botaoOk"] && $.__views.__alloyId25.addEventListener("click", botaoOk);
    __defers["$.__views.__alloyId26!click!botao0"] && $.__views.__alloyId26.addEventListener("click", botao0);
    __defers["$.__views.sortido!click!botaoSortir"] && $.__views.sortido.addEventListener("click", botaoSortir);
    __defers["$.__views.__alloyId28!click!botaoLimpa"] && $.__views.__alloyId28.addEventListener("click", botaoLimpa);
    __defers["$.__views.__alloyId30!click!botaoLista"] && $.__views.__alloyId30.addEventListener("click", botaoLista);
    __defers["$.__views.__alloyId32!click!botaoZera"] && $.__views.__alloyId32.addEventListener("click", botaoZera);
    __defers["$.__views.__alloyId34!click!botaoAnterior"] && $.__views.__alloyId34.addEventListener("click", botaoAnterior);
    __defers["$.__views.__alloyId36!click!botaoProximo"] && $.__views.__alloyId36.addEventListener("click", botaoProximo);
    __defers["$.__views.__alloyId42!click!goToCatalogo"] && $.__views.__alloyId42.addEventListener("click", goToCatalogo);
    __defers["$.__views.__alloyId44!click!goToPedido"] && $.__views.__alloyId44.addEventListener("click", goToPedido);
    __defers["$.__views.__alloyId45!click!goToPedido"] && $.__views.__alloyId45.addEventListener("click", goToPedido);
    __defers["$.__views.__alloyId47!click!fecharLista"] && $.__views.__alloyId47.addEventListener("click", fecharLista);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;