function getTableFone() {
    return "tb_fone";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createFone() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableFone() + "(\n		id INTEGER PRIMARY KEY, fn_id INTEGER, fn_fone TEXT, fn_ramal INTEGER, fn_contato TEXT, fk_rp TEXT, fk_tipo INTEGER, ep_id INTEGER\n		);");
    db.close();
}

function dropFone() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableFone());
    db.close();
}

function insertFone(fn_id, fn_fone, fn_ramal, fn_contato, fk_rp, fk_tipo, ep_id) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableFone() + " (\n		fn_id, fn_fone, fn_ramal, fn_contato, fk_rp, fk_tipo, ep_id) \n	VALUES (?,?,?,?,?,?,?)", fn_id, fn_fone, fn_ramal, fn_contato, fk_rp, fk_tipo, ep_id);
    db.close();
}

function selectallFone() {
    db = dbLoad();
    var fone = db.execute("SELECT * FROM " + getTableFone());
    db.close();
    return fone;
}

function processFone(jsonTxt) {
    dropFone();
    createFone();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var fn_id = jsonObject[j].fn_id;
        var fn_fone = jsonObject[j].fn_fone;
        var fn_ramal = jsonObject[j].fn_ramal;
        var fn_contato = jsonObject[j].fn_contato;
        var fk_rp = jsonObject[j].fk_rp;
        var fk_tipo = jsonObject[j].fk_tipo;
        var ep_id = jsonObject[j].ep_id;
        insertFone(fn_id, fn_fone, fn_ramal, fn_contato, fk_rp, fk_tipo, ep_id);
    }
}