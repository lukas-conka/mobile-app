function getTablePrazoMarca() {
    return "tb_prazo_marca";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createPrazoMarca() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTablePrazoMarca() + "(\n		id INTEGER PRIMARY KEY, pm_id INTEGER, fk_prazo INTEGER, fk_marca INTEGER,\n		ep_id INTEGER\n		);");
    db.close();
}

function dropPrazoMarca() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTablePrazoMarca());
    db.close();
}

function insertPrazoMarca(pm_id, fk_prazo, fk_marca, ep_id) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTablePrazoMarca() + " (\n		pm_id, fk_prazo, fk_marca, ep_id) \n	VALUES (?,?,?,?,?,?,?)", pm_id, fk_prazo, fk_marca, ep_id);
    db.close();
}

function selectallPrazoMarca() {
    db = dbLoad();
    var prazomarca = db.execute("SELECT * FROM " + getTablePrazoMarca());
    db.close();
    return prazomarca;
}

function processPrazoMarca(jsonTxt) {
    dropPrazoMarca();
    createPrazoMarca();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var pm_id = jsonObject[j].pm_id;
        var fk_prazo = jsonObject[j].fk_prazo;
        var fk_marca = jsonObject[j].fk_marca;
        var ep_id = jsonObject[j].ep_id;
        insertPrazoMarca(pm_id, fk_prazo, fk_marca, ep_id);
    }
}