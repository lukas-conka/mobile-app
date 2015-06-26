function getTableCor() {
    return "tb_cores";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createCor() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableCor() + "(\n		id INTEGER PRIMARY KEY, cor_id INTEGER, cor_nome TEXT, cor_fixa TEXT, ep_id INTEGER\n		);");
    db.close();
}

function dropCor() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableCor());
    db.close();
}

function insertCor(cor_id, cor_nome, cor_fixa, ep_id) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableCor() + " (\n		cor_id, cor_nome, cor_fixa, ep_id) \n	VALUES (?,?,?,?)", cor_id, cor_nome, cor_fixa, ep_id);
    db.close();
}

function selectallCor() {
    db = dbLoad();
    var cor = db.execute("SELECT * FROM " + getTableCor());
    "android" == Ti.Platform.osname && db.close();
    return cor;
}

function processCor(jsonTxt) {
    dropCor();
    createCor();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var cor_id = jsonObject[j].cor_id;
        var cor_nome = jsonObject[j].cor_nome;
        var cor_fixa = jsonObject[j].cor_fixa;
        var ep_id = jsonObject[j].ep_id;
        insertCor(cor_id, cor_nome, cor_fixa, ep_id);
    }
}