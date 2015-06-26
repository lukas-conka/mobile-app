function getTableRepresentanteCliente() {
    return "tb_representante_cliente";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createRepresentanteCliente() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableRepresentanteCliente() + " (\n		id INTEGER PRIMARY KEY, rc_id INTEGER, ep_id INTEGER, fk_cli INTEGER,\n		fk_rp INTEGER\n		);");
    db.close();
}

function dropRepresentanteCliente() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableRepresentanteCliente());
    db.close();
}

function insertRepresentanteCliente(rc_id, ep_id, fk_cli, fk_rp) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableRepresentanteCliente() + " (\n		rc_id, ep_id, fk_cli,fk_rp)\n	VALUES (?,?,?,?)", rc_id, ep_id, fk_cli, fk_rp);
    db.close();
}

function selectallRepresentanteCliente() {
    db = dbLoad();
    var representantecliente = db.execute("SELECT * FROM " + getTableRepresentanteCliente());
    db.close();
    return representantecliente;
}

function processRepresentanteCliente(jsonTxt) {
    dropRepresentanteCliente();
    createRepresentanteCliente();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var rc_id = jsonObject[j].rc_id;
        var ep_id = jsonObject[j].ep_id;
        var fk_cli = jsonObject[j].fk_cli;
        var fk_rp = jsonObject[j].fk_rp;
        insertRepresentanteCliente(rc_id, ep_id, fk_cli, fk_rp);
    }
}