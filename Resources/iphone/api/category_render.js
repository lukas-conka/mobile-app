function loadItems(tmpl, produtos, referencia, preco, tempo, seleciona, imagem, images, quantidade) {
    template = tmpl;
    var notfound;
    switch (tmpl) {
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
    var prd_id = produtos.fieldByName("prd_id");
    var prd_referencia = produtos.fieldByName("prd_referencia");
    var valor = produtos.fieldByName("ifp_valor_1");
    var prazo = produtos.fieldByName("prd_data_prazo");
    var datainicio = produtos.fieldByName("prd_data_inicio");
    var datafim = produtos.fieldByName("prd_data_fim");
    var limite = produtos.fieldByName("prd_data_limite");
    if ("null" == referencia) preco.text = "Ref. " + prd_referencia + "\n" + formatCurrency(valor); else {
        preco.text = formatCurrency(valor);
        referencia.text = "Ref. " + prd_referencia;
    }
    tempo.title = selectPeriod(prazo, datainicio, datafim, limite);
    var principal = getImagesFolder() + selectImagemPrincipal(prd_id);
    var file = Ti.Filesystem.getFile(principal);
    file ? file.exists() || (principal = notfound) : principal = notfound;
    imagem.image = principal;
    imageViews.push(imagem);
    if (1 == template) {
        var imgscroll = Ti.UI.createScrollView({
            width: "100%",
            contentWidth: "auto",
            contentHeight: "auto",
            scrollType: "vertical",
            layout: "vertical",
            showVerticalScrollIndicator: true,
            showHorizontalScrollIndicator: true
        });
        var img = Ti.UI.createImageView({
            width: "48%",
            left: 3,
            image: principal,
            principal: imagem
        });
        img.addEventListener("click", function(e) {
            e.source.principal.image = e.source.image;
        });
        imageViews.push(img);
        var line = Ti.UI.createView({
            width: "100%",
            height: img.toBlob().width,
            layout: "horizontal"
        });
        line.add(img);
        var count = 1;
        var smallimgs = selectImagensProdutos(prd_id);
        for (var i = 0; i < smallimgs.length; i++) {
            var img = Ti.UI.createImageView({
                width: "48%",
                left: 3,
                image: scaleImage(getImagesFolder() + smallimgs[i]),
                principal: imagem
            });
            img.addEventListener("click", function(e) {
                e.source.principal.image = e.source.image;
            });
            imageViews.push(img);
            line.add(img);
            count++;
            if (2 == count) {
                count = 0;
                imgscroll.add(line);
                line = Ti.UI.createView({
                    width: "100%",
                    height: img.toBlob().width,
                    layout: "horizontal"
                });
            }
        }
        imgscroll.add(line);
        images.add(imgscroll);
    } else {
        var rowHeight = "100%";
        if ("android" != Ti.Platform.osname) {
            rowHeight = "60dp";
            switch (template) {
              case 4:
                rowHeight = "60dp";
                seleciona.height = rowHeight;
                break;

              case 2:
                rowHeight = "90dp";
                break;

              case 3:
                rowHeight = "75dp";
                break;

              case 9:
                rowHeight = "75dp";
            }
        }
        var imgscroll = Ti.UI.createScrollView({
            height: rowHeight,
            contentWidth: "auto",
            contentHeight: "auto",
            scrollType: "horizontal",
            layout: "horizontal",
            showVerticalScrollIndicator: false,
            showHorizontalScrollIndicator: true
        });
        images.add(imgscroll);
        var img = Ti.UI.createImageView({
            height: rowHeight,
            left: 3,
            image: principal,
            principal: imagem
        });
        img.addEventListener("click", function(e) {
            e.source.principal.image = e.source.image;
        });
        imageViews.push(img);
        imgscroll.add(img);
        var smallimgs = selectImagensProdutos(prd_id);
        for (var i = 0; i < smallimgs.length; i++) {
            var img = Ti.UI.createImageView({
                height: rowHeight,
                left: 3,
                image: scaleImage(getImagesFolder() + smallimgs[i]),
                principal: imagem
            });
            img.addEventListener("click", function(e) {
                e.source.principal.image = e.source.image;
            });
            imageViews.push(img);
            imgscroll.add(img);
        }
    }
    seleciona.image = "true" == checkSelectedProduct(prd_id) ? "/images/selecionar_vermelho.png" : "/images/seleciona.png";
    seleciona.prd_id = prd_id;
    teste && seleciona.addEventListener("click", function(e) {
        e.source.image = "true" == AddSelectedProduct(e.source.prd_id) ? "/images/selecionar_vermelho.png" : "/images/seleciona.png";
        setSelected(quantidade);
        teste = false;
    });
    setSelected(quantidade);
    teste = true;
}

function cleanImages() {
    if ("android" == Ti.Platform.osname) {
        for (var i = 0; i < imageViews.length; i++) imageViews[i].image = null;
        imageViews = [];
    }
}

function scaleImage(imagePath) {
    return imagePath;
}

function resizeSmallImage(imagem) {
    var imageView = Titanium.UI.createImageView({
        image: imagem,
        width: 50,
        height: 50
    });
    imagem = imageView.toImage();
    return imagem;
}

function selectPeriod(prazo, datainicio, datafim, limite) {
    var fim = new Date(datafim);
    var hoje = new Date();
    var result;
    Ti.API.info("prazo=" + prazo);
    switch (prazo) {
      case "mensal":
        var tmp = new Date(fim.getYear(), fim.getMonth(), 0);
        var ultimodia = tmp.getDate();
        var hojedia = hoje.getDate();
        var falta = ultimodia - limite - hoje;
        result = 10 >= falta ? 0 == falta ? "Hj|M\n " + (hoje.getMonth() + 1) + "/" + hoje.getFullYear() : 0 > falta ? "M\n " + (hoje.getMonth() + 2) + "/" + hoje.getFullYear() : falta + "d|M\n " + (hoje.getMonth() + 1) + "/" + hoje.getFullYear() : "M\n " + (hoje.getMonth() + 1) + "/" + hoje.getFullYear();
        break;

      case "semanal":
        fim.setDate(fim.getDate() + limite);
        var ultimodia = getDayOfYear(fim);
        var hojedia = getDayOfYear(hoje);
        var falta = ultimodia - hojedia;
        result = 10 >= falta ? 0 == falta ? "Hj|S\n " + (getWeekOfYear(hoje) + Math.round(limite / 7)) + "/" + hoje.getFullYear() : 0 > falta ? "S\n " + (getWeekOfYear(hoje) + Math.round(limite / 7) + 1) + "/" + hoje.getFullYear() : falta + "d|S\n " + (getWeekOfYear(hoje) + Math.round(limite / 7)) + "/" + hoje.getFullYear() : "S\n " + (getWeekOfYear(hoje) + Math.round(limite / 7)) + "/" + hoje.getFullYear();
        break;

      case "quinzena":
        fim.setDate(fim.getDate() + limite);
        var ultimodia = getDayOfYear(fim);
        var hojedia = getDayOfYear(hoje);
        var falta = ultimodia - hojedia;
        result = 10 >= falta ? 0 == falta ? "Hj|Q\n " + Math.ceil((getDayOfYear(hoje) + 1) / 15) + "/" + hoje.getFullYear() : 0 > falta ? "Q\n " + (Math.ceil((getDayOfYear(hoje) + 1) / 15) + 2) + "/" + hoje.getFullYear() : falta + "d|Q\n " + Math.ceil((getDayOfYear(hoje) + 1) / 15) + "/" + hoje.getFullYear() : "Q\n " + Math.ceil((getDayOfYear(hoje) + 1) / 15) + "/" + hoje.getFullYear();
    }
    return result;
}

function setSelected(quantidade) {
    var products = getSelectedProducts();
    var selecionados = 0;
    products && (selecionados = products.length.toString());
    quantidade.title = selecionados;
}

function categoryClear(quantidade) {
    cleanImages();
    resetCarrinho();
    Ti.App.Properties.setList(SELECTED_PRODUCTS, "");
    quantidade.title = "0";
    var login = Alloy.createController("categorias").getView();
    login.open({
        fullscreen: true,
        navBarHidden: true
    });
}

function categoryVoltar() {
    cleanImages();
    var login = Alloy.createController("seleciona_cliente").getView();
    login.open({
        fullscreen: true,
        navBarHidden: true
    });
}

function categoryCesta() {
    cleanImages();
    var produtos = Ti.App.Properties.getList(SELECTED_PRODUCTS);
    if (produtos) if (produtos.length > 0) {
        var calculadora = Alloy.createController("calculadora").getView();
        calculadora.open({
            fullscreen: true,
            navBarHidden: true
        });
    } else alert("Selecione ao menos um produto para avançar"); else alert("Selecione ao menos um produto para avançar");
}

function listProdutos() {
    var produtos = Alloy.createController("lista_produtos").getView();
    produtos.open({
        fullscreen: true,
        navBarHidden: true
    });
}

function getDayOfYear(d) {
    var yn = d.getFullYear();
    var mn = d.getMonth();
    var dn = d.getDate();
    var d1 = new Date(yn, 0, 1, 12, 0, 0);
    var d2 = new Date(yn, mn, dn, 12, 0, 0);
    var ddiff = Math.round((d2 - d1) / 864e5);
    return ddiff + 1;
}

function getWeekOfYear(d) {
    var day = getDayOfYear(d);
    var week = Math.ceil(day / 7);
    return week;
}

Ti.include("/database/produtos.js");

Ti.include("/database/carrinho.js");

var template = 0;

var imageViews = [];

var cont = 0;

var teste = true;