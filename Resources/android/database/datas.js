function getTableDatas() {
    return "tb_data_pag";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createDatas() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableDatas() + "(\n		id INTEGER PRIMARY KEY, tb_data_id INTEGER, tb_data_nome TEXT, fk_descontos INTEGER, ep_id INTEGER\n		);");
    db.close();
}

function dropDatas() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableDatas());
    db.close();
}

function insertDatas(tb_data_id, tb_data_nome, fk_descontos, ep_id) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableDatas() + " (\n		tb_data_id, tb_data_nome, fk_descontos, ep_id) \n	VALUES (?,?,?,?)", tb_data_id, tb_data_nome, fk_descontos, ep_id);
    db.close();
}

function selectallDatas() {
    db = dbLoad();
    var datas = db.execute("SELECT * FROM " + getTableDatas());
    db.close();
    return datas;
}

function consultaDataPagamento(desconto) {
    db = dbLoad();
    var datas = db.execute("SELECT " + getTableDatas() + ".tb_data_id," + getTableDatas() + ".tb_data_nome FROM " + getTableDatas() + " WHERE " + getTableDatas() + ".fk_descontos = " + desconto);
    db.close();
    return datas;
}

function processDatas(jsonTxt) {
    dropDatas();
    createDatas();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var tb_data_id = jsonObject[j].tb_data_id;
        var tb_data_nome = jsonObject[j].tb_data_nome;
        var fk_descontos = jsonObject[j].fk_descontos;
        var ep_id = jsonObject[j].ep_id;
        insertDatas(tb_data_id, tb_data_nome, fk_descontos, ep_id);
    }
}