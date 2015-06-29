function getTableImagensProdutos() {
    return "tb_imagens_produtos";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createImagensProdutos() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableImagensProdutos() + "(\n		id INTEGER PRIMARY KEY, img_id INTEGER, img_caminho TEXT, img_ordem INTEGER,\n		img_principal INTEGER, fk_produtos INTEGER, fk_cores INTEGER, ep_id INTEGER\n		);");
    db.close();
}

function dropImagensProdutos() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableImagensProdutos());
    db.close();
}

function insertImagensProdutos(img_id, img_caminho, img_ordem, img_principal, fk_produtos, fk_cores, ep_id) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableImagensProdutos() + " (\n		img_id, img_caminho, img_ordem, img_principal, fk_produtos, fk_cores, ep_id) \n	VALUES (?,?,?,?,?,?,?)", img_id, img_caminho, img_ordem, img_principal, fk_produtos, fk_cores, ep_id);
    db.close();
}

function selectImagemPrincipal(produto) {
    db = dbLoad();
    var imagem = "notfound";
    var infoprodutos = db.execute("SELECT fk_cores FROM tb_info_produtos WHERE fk_produtos = " + produto + " AND ifp_destaque = 1 LIMIT 1");
    if (infoprodutos.isValidRow()) {
        var corId = infoprodutos.fieldByName("fk_cores");
        var query = "SELECT img_caminho FROM " + getTableImagensProdutos() + " WHERE img_principal = 1 AND fk_produtos = " + produto + " AND fk_cores = " + corId + " LIMIT 1";
        Ti.API.info("selectImagemPrincipal=" + query);
        var imagensprodutos = db.execute(query);
        imagensprodutos.isValidRow() && (imagem = imagensprodutos.fieldByName("img_caminho"));
        db.close();
    }
    return imagem;
}

function selectImagemVariantePrincipal(produto, corId) {
    db = dbLoad();
    var result = "notfound";
    var imagensprodutos = db.execute("SELECT img_caminho FROM " + getTableImagensProdutos() + " WHERE img_principal = 1 AND fk_produtos = " + produto + " AND fk_cores = " + corId + " LIMIT 1");
    imagensprodutos.isValidRow() && (result = imagensprodutos.fieldByName("img_caminho"));
    db.close();
    return result;
}

function selectImagensPorVariante(produto, corId) {
    db = dbLoad();
    var imagens = [];
    var imagensprodutos = db.execute("SELECT img_caminho FROM " + getTableImagensProdutos() + " WHERE fk_produtos = " + produto + " AND fk_cores = " + corId + " ORDER BY img_ordem ASC");
    while (imagensprodutos.isValidRow()) {
        var imagem = imagensprodutos.fieldByName("img_caminho");
        imagens.push(imagem);
        imagensprodutos.next();
    }
    db.close();
    return imagens;
}

function selectImagensProdutos(produto) {
    db = dbLoad();
    var imagens = [];
    var infoprodutos = db.execute("SELECT fk_cores FROM tb_info_produtos WHERE fk_produtos = " + produto + " AND ifp_destaque = 1 LIMIT 1");
    var corId = infoprodutos.fieldByName("fk_cores");
    var imagensprodutos = db.execute("SELECT img_caminho FROM " + getTableImagensProdutos() + " WHERE img_principal = 0 AND fk_produtos = " + produto + " AND fk_cores = " + corId + " ORDER BY img_ordem ASC");
    while (imagensprodutos.isValidRow()) {
        var imagem = imagensprodutos.fieldByName("img_caminho");
        imagens.push(imagem);
        imagensprodutos.next();
    }
    db.close();
    return imagens;
}

function selectallImagensProdutos() {
    db = dbLoad();
    var imagensprodutos = db.execute("SELECT img_caminho FROM " + getTableImagensProdutos());
    db.close();
    return imagensprodutos;
}

function processImagensProdutos(jsonTxt) {
    dropImagensProdutos();
    createImagensProdutos();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) if (0 == jsonObject[j].img_excluido) {
        var img_id = jsonObject[j].img_id;
        var img_caminho = jsonObject[j].img_caminho;
        var img_ordem = jsonObject[j].img_ordem;
        var img_principal = jsonObject[j].img_principal;
        var fk_produtos = jsonObject[j].fk_produtos;
        var fk_cores = jsonObject[j].fk_cores;
        var ep_id = jsonObject[j].ep_id;
        insertImagensProdutos(img_id, img_caminho, img_ordem, img_principal, fk_produtos, fk_cores, ep_id);
    }
}