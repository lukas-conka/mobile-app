function getTablePrazoMedio() {
    return "tb_prazoMedio";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createPrazoMedio() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTablePrazoMedio() + "(\n		id INTEGER PRIMARY KEY, tb_pr_id INTEGER, tb_pr_nome TEXT, ep_id INTEGER,\n		fk_marcas INTEGER\n		);");
    db.close();
}

function dropPrazoMedio() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTablePrazoMedio());
    db.close();
}

function insertPrazoMedio(tb_pr_id, tb_pr_nome, ep_id, fk_marcas) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTablePrazoMedio() + " (\n		tb_pr_id, tb_pr_nome, ep_id, fk_marcas) \n	VALUES (?,?,?,?)", tb_pr_id, tb_pr_nome, ep_id, fk_marcas);
    db.close();
}

function selectallPrazoMedio() {
    db = dbLoad();
    var prazomedio = db.execute("SELECT * FROM " + getTablePrazoMedio());
    db.close();
    return prazomedio;
}

function consultaPrazoPagamento() {
    db = dbLoad();
    var prazomedio = db.execute("SELECT " + getTablePrazoMedio() + ".tb_pr_id," + getTablePrazoMedio() + ".tb_pr_nome,tb_descontos.tb_desc_nome, tb_descontos.tb_desconto_id FROM " + getTablePrazoMedio() + " INNER JOIN tb_descontos ON tb_descontos.fk_prazo = " + getTablePrazoMedio() + ".tb_pr_id");
    db.close();
    return prazomedio;
}

function processPrazoMedio(jsonTxt) {
    dropPrazoMedio();
    createPrazoMedio();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var tb_pr_id = jsonObject[j].tb_pr_id;
        var tb_pr_nome = jsonObject[j].tb_pr_nome;
        var ep_id = jsonObject[j].ep_id;
        var fk_marcas = jsonObject[j].fk_marcas;
        insertPrazoMedio(tb_pr_id, tb_pr_nome, ep_id, fk_marcas);
    }
}