function getTableRpj() {
    return "tb_rpj";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createRpj() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableRpj() + "(\n		id INTEGER PRIMARY KEY, rpj_id INTEGER, rpj_razao TEXT, rpj_cnpj TEXT, rpj_fantasia TEXT, rpj_ie TEXT, rpj_im TEXT, fk_rp INTEGER, ep_id INTEGER \n		);");
    db.close();
}

function dropRpj() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableRpj());
    db.close();
}

function insertRpj(rpj_id, rpj_razao, rpj_cnpj, rpj_fantasia, rpj_ie, rpj_im, fk_rp, ep_id) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableRpj() + " (\n		rpj_id, rpj_razao, rpj_cnpj, rpj_fantasia, rpj_ie, rpj_im, fk_rp, ep_id) \n	VALUES (?,?,?,?,?,?,?)", rpj_id, rpj_razao, rpj_cnpj, rpj_fantasia, rpj_ie, rpj_im, fk_rp, ep_id);
    db.close();
}

function selectallRpj() {
    db = dbLoad();
    var rpj = db.execute("SELECT * FROM " + getTableRpj());
    "android" == Ti.Platform.osname && db.close();
    return rpj;
}

function processRpj(jsonTxt) {
    dropRpj();
    createRpj();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var rpj_id = jsonObject[j].rpj_id;
        var rpj_razao = jsonObject[j].rpj_razao;
        var rpj_cnpj = jsonObject[j].rpj_cnpj;
        var rpj_fantasia = jsonObject[j].rpj_fantasia;
        var rpj_ie = jsonObject[j].rpj_ie;
        var rpj_im = jsonObject[j].rpj_im;
        var fk_rp = jsonObject[j].fk_rp;
        var ep_id = jsonObject[j].ep_id;
        insertRpj(rpj_id, rpj_razao, rpj_cnpj, rpj_fantasia, rpj_ie, rpj_im, fk_rp, ep_id);
    }
}