function getTableNcm() {
    return "tb_ncm";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createNcm() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableNcm() + "(\n		id INTEGER PRIMARY KEY, ncm_id INTEGER, ncm_numero TEXT, tb_numero TEXT, ep_id INTEGER\n		);");
    db.close();
}

function dropNcm() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableNcm());
    db.close();
}

function insertNcm(ncm_id, ncm_numero, tb_numero, ep_id) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableNcm() + " (\n		ncm_id, ncm_numero, tb_numero, ep_id) \n	VALUES (?,?,?,?)", ncm_id, ncm_numero, tb_numero, ep_id);
    db.close();
}

function selectallNcm() {
    db = dbLoad();
    var ncm = db.execute("SELECT * FROM" + getTableNcm());
    "android" == Ti.Platform.osname && db.close();
    return ncm;
}

function processNcm(jsonTxt) {
    dropNcm();
    createNcm();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var ncm_id = jsonObject[j].ncm_id;
        var ncm_numero = jsonObject[j].ncm_numero;
        var tb_numero = jsonObject[j].tb_numero;
        var ep_id = jsonObject[j].ep_id;
        insertNcm(ncm_id, ncm_numero, tb_numero, ep_id);
    }
}