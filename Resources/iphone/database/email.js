function getTableEmail() {
    return "tb_email";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createEmail() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableEmail() + "(\n		id INTEGER PRIMARY KEY, em_id INTEGER, em_email TEXT, ep_id INTEGER, fk_marcas INTEGER, em_representante INTEGER\n		);");
    db.close();
}

function dropEmail() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableEmail());
    db.close();
}

function insertEmail(em_id, em_email, ep_id, fk_marcas, em_representante) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableEmail() + " (\n		em_id, em_email, ep_id, fk_marcas, em_representante) \n	VALUES (?,?,?,?,?)", em_id, em_email, ep_id, fk_marcas, em_representante);
    db.close();
}

function selectallEmail() {
    db = dbLoad();
    var email = db.execute("SELECT * FROM " + getTableEmail());
    "android" == Ti.Platform.osname && db.close();
    return email;
}

function consultaEmail(representante) {
    db = dbLoad();
    var query = "SELECT em_id,em_email FROM tb_email WHERE em_representante = " + representante;
    var email = db.execute(query);
    "android" == Ti.Platform.osname && db.close();
    return email;
}

function processEmail(jsonTxt) {
    dropEmail();
    createEmail();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var em_id = jsonObject[j].em_id;
        var em_email = jsonObject[j].em_email;
        var ep_id = jsonObject[j].ep_id;
        var fk_marcas = jsonObject[j].fk_marcas;
        var em_representante = jsonObject[j].em_representante;
        insertEmail(em_id, em_email, ep_id, fk_marcas, em_representante);
    }
}