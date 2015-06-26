function getTableGrupoCliente() {
    return "tb_grupo_cliente";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createGrupoCliente() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableGrupoCliente() + "(\n		id INTEGER PRIMARY KEY, gc_id INTEGER, fk_cli_principal INTEGER, fk_cli_vinculado INTEGER,\n		ep_id INTEGER\n		);");
    db.close();
}

function dropGrupoCliente() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableGrupoCliente());
    db.close();
}

function insertGrupoCliente(gc_id, fk_cli_principal, fk_cli_vinculado, ep_id) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableGrupoCliente() + " (\n		gc_id, fk_cli_principal, fk_cli_vinculado, ep_id) \n	VALUES (?,?,?,?)", gc_id, fk_cli_principal, fk_cli_vinculado, ep_id);
    db.close();
}

function selectallGrupoCliente() {
    db = dbLoad();
    var grupocliente = db.execute("SELECT * FROM " + getTableGrupoCliente());
    "android" == Ti.Platform.osname && db.close();
    return grupocliente;
}

function processGrupoCliente(jsonTxt) {
    dropGrupoCliente();
    createGrupoCliente();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var gc_id = jsonObject[j].gc_id;
        var fk_cli_principal = jsonObject[j].fk_cli_principal;
        var fk_cli_vinculado = jsonObject[j].fk_cli_vinculado;
        var ep_id = jsonObject[j].ep_id;
        insertGrupoCliente(gc_id, fk_cli_principal, fk_cli_vinculado, ep_id);
    }
}