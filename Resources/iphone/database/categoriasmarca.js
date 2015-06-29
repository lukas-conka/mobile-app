function getTableCategoriasMarca() {
    return "tb_categoria_marca";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createCategoriasMarca() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableCategoriasMarca() + "(\n		id INTEGER PRIMARY KEY, catm_id INTEGER, fk_marca INTEGER, fk_categoria INTEGER,\n		ep_id INTEGER, fk_template INTEGER\n		);");
    db.close();
}

function dropCategoriasMarca() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableCategoriasMarca());
    db.close();
}

function insertCategoriasMarca(catm_id, fk_marca, fk_categoria, ep_id, fk_template) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableCategoriasMarca() + " (\n		catm_id, fk_marca, fk_categoria, ep_id, fk_template) \n	VALUES (?,?,?,?,?)", catm_id, fk_marca, fk_categoria, ep_id, fk_template);
    db.close();
}

function selectTemplate(categoria, marca) {
    db = dbLoad();
    Ti.API.info("SELECT * FROM " + getTableCategoriasMarca() + " WHERE fk_categoria = " + categoria + " AND fk_marca = " + marca);
    var categoriasmarca = db.execute("SELECT * FROM " + getTableCategoriasMarca() + " WHERE fk_categoria = " + categoria + " AND fk_marca = " + marca);
    var template = categoriasmarca.fieldByName("fk_template");
    "android" == Ti.Platform.osname && db.close();
    return template;
}

function selectallCategoriasMarca() {
    db = dbLoad();
    var categoriasmarca = db.execute("SELECT * FROM " + getTableCategoriasMarca());
    "android" == Ti.Platform.osname && db.close();
    return categoriasmarca;
}

function processCategoriasMarca(jsonTxt) {
    dropCategoriasMarca();
    createCategoriasMarca();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var catm_id = jsonObject[j].catm_id;
        var fk_marca = jsonObject[j].fk_marca;
        var fk_categoria = jsonObject[j].fk_categoria;
        var ep_id = jsonObject[j].ep_id;
        var fk_template = jsonObject[j].fk_template;
        insertCategoriasMarca(catm_id, fk_marca, fk_categoria, ep_id, fk_template);
    }
}