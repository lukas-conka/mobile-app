function getTableEmailRepresentante() {
    return "tb_email_rp";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createEmailRepresentante() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableEmailRepresentante() + "(\n		id INTEGER PRIMARY KEY, em_id INTEGER, em_email TEXT, fk_rp INTEGER, ep_id INTEGER, rp_id INTEGER\n		);");
    db.close();
}

function dropEmailRepresentante() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableEmailRepresentante());
    db.close();
}

function insertEmailRepresentante(em_id, em_email, fk_rp, ep_id, rp_id) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableEmailRepresentante() + " (\n		em_id, em_email, fk_rp, ep_id, rp_id) \n	VALUES (?,?,?,?,?,?,?,?,?)", em_id, em_email, fk_rp, ep_id, rp_id);
    db.close();
}

function selectallEmailRepresentante() {
    db = dbLoad();
    var descontovolume = db.execute("SELECT * FROM " + getTableEmailRepresentante());
    db.close();
    return descontovolume;
}

function processEmailRepresentante(jsonTxt) {
    dropEmailRepresentante();
    createEmailRepresentante();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var em_id = jsonObject[j].em_id;
        var em_email = jsonObject[j].em_email;
        var fk_rp = jsonObject[j].fk_rp;
        var ep_id = jsonObject[j].ep_id;
        var rp_id = jsonObject[j].rp_id;
        insertEmailRepresentante(em_id, em_email, fk_rp, ep_id, rp_id);
    }
}