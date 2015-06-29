function getTableEmailEmpresa() {
    return "tb_email_emp";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createEmailEmpresa() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableEmailEmpresa() + "(\n		id INTEGER PRIMARY KEY, ee_id INTEGER, ee_email TEXT, ee_grupo INTEGER, ee_nome TEXT, ep_id INTEGER, ee_cargo TEXT, ee_recebe_pedido INTEGER, ee_recebe_credito INTEGER, fk_marcas INTEGER\n		);");
    db.close();
}

function dropEmailEmpresa() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableEmailEmpresa());
    db.close();
}

function insertEmailEmpresa(ee_id, ee_email, ee_grupo, ee_nome, ep_id, ee_cargo, ee_recebe_pedido, ee_recebe_credito, fk_marcas) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableEmailEmpresa() + " (\n		ee_id, ee_email, ee_grupo, ee_nome, ep_id, ee_cargo, ee_recebe_pedido, ee_recebe_credito, fk_marcas) \n	VALUES (?,?,?,?,?,?,?,?,?)", ee_id, ee_email, ee_grupo, ee_nome, ep_id, ee_cargo, ee_recebe_pedido, ee_recebe_credito, fk_marcas);
    db.close();
}

function selectallEmailEmpresa() {
    db = dbLoad();
    var descontovolume = db.execute("SELECT * FROM " + getTableEmailEmpresa());
    db.close();
    return descontovolume;
}

function processEmailEmpresa(jsonTxt) {
    dropEmailEmpresa();
    createEmailEmpresa();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var ee_id = jsonObject[j].ee_id;
        var ee_email = jsonObject[j].ee_email;
        var ee_grupo = jsonObject[j].ee_grupo;
        var ee_nome = jsonObject[j].ee_nome;
        var ep_id = jsonObject[j].ep_id;
        var ee_cargo = jsonObject[j].ee_cargo;
        var ee_recebe_pedido = jsonObject[j].ee_recebe_pedido;
        var ee_recebe_credito = jsonObject[j].ee_recebe_credito;
        var fk_marcas = jsonObject[j].fk_marcas;
        insertEmailEmpresa(ee_id, ee_email, ee_grupo, ee_nome, ep_id, ee_cargo, ee_recebe_pedido, ee_recebe_credito, fk_marcas);
    }
}