function getTableTipoEmail() {
    return "tb_tipo_email";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createTipoEmail() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableTipoEmail() + "(\n		id INTEGER PRIMARY KEY, te_id INTEGER, te_nome TEXT, ep_id INTEGER\n		);");
    db.close();
}

function dropTipoEmail() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableTipoEmail());
    db.close();
}

function insertTipoEmail(te_id, te_nome, ep_id) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableTipoEmail() + " (\n		tpfn_id, tpfn_nome) \n	VALUES (?,?,?)", te_id, te_nome, ep_id);
    db.close();
}

function selectallTipoEmail() {
    db = dbLoad();
    var tipoemail = db.execute("SELECT * FROM " + getTableTipoEmail());
    "android" == Ti.Platform.osname && db.close();
    return tipoemail;
}

function processTipoEmail(jsonTxt) {
    dropTipoEmail();
    createTipoEmail();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var te_id = jsonObject[j].te_id;
        var te_nome = jsonObject[j].te_nome;
        var ep_id = jsonObject[j].ep_id;
        insertTipoEmail(te_id, te_nome, ep_id);
    }
}