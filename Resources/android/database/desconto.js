function getTableDesconto() {
    return "tb_descontos";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createDesconto() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableDesconto() + "(\n		id INTEGER PRIMARY KEY, tb_desconto_id INTEGER, tb_desc_nome TEXT, fk_prazo INTEGER, ep_id INTEGER\n		);");
    db.close();
}

function dropDesconto() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableDesconto());
    db.close();
}

function insertDesconto(tb_desconto_id, tb_desc_nome, fk_prazo, ep_id) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableDesconto() + " (\n		tb_desconto_id, tb_desc_nome, fk_prazo, ep_id) \n	VALUES (?,?,?,?)", tb_desconto_id, tb_desc_nome, fk_prazo, ep_id);
    db.close();
}

function selectallDesconto() {
    db = dbLoad();
    var desconto = db.execute("SELECT * FROM " + getTableDesconto());
    db.close();
    return desconto;
}

function processDesconto(jsonTxt) {
    dropDesconto();
    createDesconto();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var tb_desconto_id = jsonObject[j].tb_desconto_id;
        var tb_desc_nome = jsonObject[j].tb_desc_nome;
        var fk_prazo = jsonObject[j].fk_prazo;
        var ep_id = jsonObject[j].ep_id;
        insertDesconto(tb_desconto_id, tb_desc_nome, fk_prazo, ep_id);
    }
}