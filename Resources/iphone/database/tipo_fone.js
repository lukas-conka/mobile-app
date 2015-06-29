function getTableTipoFone() {
    return "tb_tipo_fone";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createTipoFone() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableTipoFone() + "(\n		id INTEGER PRIMARY KEY, tpfn_id INTEGER, tpfn_nome TEXT\n		);");
    db.close();
}

function dropTipoFone() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableTipoFone());
    db.close();
}

function insertTipoFone(tpfn_id, tpfn_nome) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableTipoFone() + " (\n		tpfn_id, tpfn_nome) \n	VALUES (?,?)", tpfn_id, tpfn_nome);
    db.close();
}

function selectallTipoFone() {
    db = dbLoad();
    var tipofone = db.execute("SELECT * FROM " + getTableTipoFone());
    "android" == Ti.Platform.osname && db.close();
    return tipofone;
}

function processTipoFone(jsonTxt) {
    dropTipoFone();
    createTipoFone();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var tpfn_id = jsonObject[j].tpfn_id;
        var tpfn_nome = jsonObject[j].tpfn_nome;
        insertTipoFone(tpfn_id, tpfn_nome);
    }
}