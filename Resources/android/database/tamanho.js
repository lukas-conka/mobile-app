function getTableTamanho() {
    return "tb_tamanhos";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createTamanho() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableTamanho() + "(\n		id INTEGER PRIMARY KEY, tmh_id INTEGER, tmh_nome TEXT, ep_id INTEGER\n		);");
    db.close();
}

function dropTamanho() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableTamanho());
    db.close();
}

function insertTamanho(tmh_id, tmh_nome, ep_id) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableTamanho() + " (\n		tmh_id, tmh_nome, ep_id) \n	VALUES (?,?,?)", tmh_id, tmh_nome, ep_id);
    db.close();
}

function selectallTamanho() {
    db = dbLoad();
    var tamanho = db.execute("SELECT * FROM " + getTableTamanho());
    db.close();
    return tamanho;
}

function processTamanho(jsonTxt) {
    dropTamanho();
    createTamanho();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) if (0 == jsonObject[j].tmh_excluido && 0 == jsonObject[j].tmh_visualizar) {
        var tmh_id = jsonObject[j].tmh_id;
        var tmh_nome = jsonObject[j].tmh_nome;
        var ep_id = jsonObject[j].ep_id;
        insertTamanho(tmh_id, tmh_nome, ep_id);
    }
}