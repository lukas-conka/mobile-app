function getTablePrecoEstados() {
    return "tb_preco_estado";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createPrecoEstados() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTablePrecoEstados() + "(\n		id INTEGER PRIMARY KEY, pe_id INTEGER, fk_estado INTEGER, pe_preco_1 FLOAT,\n		pe_preco_2 FLOAT, pe_preco_3 FLOAT, pe_icms FLOAT, pe_base INTEGER, fk_marca INTEGER, ep_id INTEGER\n		);");
    db.close();
}

function dropPrecoEstados() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTablePrecoEstados());
    db.close();
}

function insertPrecoEstados(pe_id, fk_estado, pe_preco_1, pe_preco_2, pe_preco_3, pe_icms, pe_base, fk_marca, ep_id) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTablePrecoEstados() + " (\n		pe_id, fk_estado, pe_preco_1, pe_preco_2, pe_preco_3, pe_icms, pe_base, fk_marca, ep_id) \n	VALUES (?,?,?,?,?,?,?,?,?)", pe_id, fk_estado, pe_preco_1, pe_preco_2, pe_preco_3, pe_icms, pe_base, fk_marca, ep_id);
    db.close();
}

function selectallPrecoEstados() {
    db = dbLoad();
    var precoestados = db.execute("SELECT * FROM " + getTablePrecoEstados());
    "android" == Ti.Platform.osname && db.close();
    return precoestados;
}

function processPrecoEstados(jsonTxt) {
    dropPrecoEstados();
    createPrecoEstados();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var pe_id = jsonObject[j].pe_id;
        var fk_estado = jsonObject[j].fk_estado;
        var pe_preco_1 = jsonObject[j].pe_preco_1;
        var pe_preco_2 = jsonObject[j].pe_preco_2;
        var pe_preco_3 = jsonObject[j].pe_preco_3;
        var pe_icms = jsonObject[j].pe_icms;
        var pe_base = jsonObject[j].pe_base;
        var fk_marca = jsonObject[j].fk_marca;
        var ep_id = jsonObject[j].ep_id;
        insertPrecoEstados(pe_id, fk_estado, pe_preco_1, pe_preco_2, pe_preco_3, pe_icms, pe_base, fk_marca, ep_id);
    }
}