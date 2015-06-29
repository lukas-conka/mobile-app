function getTableEstados() {
    return "tb_estados";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createEstados() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableEstados() + "(\n		id INTEGER PRIMARY KEY, es_id INTEGER, es_nome TEXT, es_sigla TEXT		\n		);");
    db.close();
}

function dropEstados() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableEstados());
    db.close();
}

function insertEstados(es_id, es_nome, es_sigla) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableEstados() + " (\n		es_id, es_nome, es_sigla) \n	VALUES (?,?,?)", es_id, es_nome, es_sigla);
    db.close();
}

function selectallEstados() {
    db = dbLoad();
    var estados = db.execute("SELECT * FROM " + getTableEstados());
    db.close();
    return estados;
}

function processEstados(jsonTxt) {
    dropEstados();
    createEstados();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var es_id = jsonObject[j].es_id;
        var es_nome = jsonObject[j].es_nome;
        var es_sigla = jsonObject[j].es_sigla;
        insertEstados(es_id, es_nome, es_sigla);
    }
}