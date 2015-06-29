function getTableRepresentanteMarca() {
    return "tb_representante_marca";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createRepresentanteMarca() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableRepresentanteMarca() + "(\n		id INTEGER PRIMARY KEY, rm_id INTEGER, fk_representante INTEGER, fk_marca INTEGER,\n		ep_id INTEGER\n		);");
    db.close();
}

function dropRepresentanteMarca() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableRepresentanteMarca());
    db.close();
}

function insertRepresentanteMarca(rm_id, fk_representante, fk_marca, ep_id) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableRepresentanteMarca() + " (\n		rm_id, fk_representante, fk_marca, ep_id) \n	VALUES (?,?,?,?)", rm_id, fk_representante, fk_marca, ep_id);
    db.close();
}

function selectallRepresentanteMarca(representante) {
    db = dbLoad();
    var representantemarca = db.execute("SELECT fk_marca FROM " + getTableRepresentanteMarca() + " WHERE fk_representante = " + representante);
    "android" == Ti.Platform.osname && db.close();
    return representantemarca;
}

function processRepresentanteMarca(jsonTxt) {
    dropRepresentanteMarca();
    createRepresentanteMarca();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var rm_id = jsonObject[j].rm_id;
        var fk_representante = jsonObject[j].fk_representante;
        var fk_marca = jsonObject[j].fk_marca;
        var ep_id = jsonObject[j].ep_id;
        insertRepresentanteMarca(rm_id, fk_representante, fk_marca, ep_id);
    }
}