function getTableDescontoVolume() {
    return "tb_desconto_volume";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createDescontoVolume() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableDescontoVolume() + "(\n		id INTEGER PRIMARY KEY, dv_id INTEGER, dv_nome TEXT, dv_qtde_valor INTEGER, dv_desconto INTEGER, dv_opcao INTEGER, dv_tipo INTEGER, ep_id INTEGER\n		);");
    db.close();
}

function dropDescontoVolume() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableDescontoVolume());
    db.close();
}

function insertDescontoVolume(dv_id, dv_nome, dv_qtde_valor, dv_desconto, dv_opcao, dv_tipo, ep_id) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableDescontoVolume() + " (\n		dv_id, dv_nome, dv_qtde_valor, dv_desconto, dv_opcao, dv_tipo, ep_id) \n	VALUES (?,?,?,?,?,?,?)", dv_id, dv_nome, dv_qtde_valor, dv_desconto, dv_opcao, dv_tipo, ep_id);
    db.close();
}

function selectallDescontoVolume() {
    db = dbLoad();
    var descontovolume = db.execute("SELECT * FROM " + getTableDescontoVolume());
    "android" == Ti.Platform.osname && db.close();
    return descontovolume;
}

function processDescontoVolume(jsonTxt) {
    dropDescontoVolume();
    createDescontoVolume();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var dv_id = jsonObject[j].dv_id;
        var dv_nome = jsonObject[j].dv_nome;
        var dv_qtde_valor = jsonObject[j].dv_qtde_valor;
        var dv_desconto = jsonObject[j].dv_desconto;
        var dv_opcao = jsonObject[j].dv_opcao;
        var dv_tipo = jsonObject[j].dv_tipo;
        var ep_id = jsonObject[j].ep_id;
        insertDescontoVolume(dv_id, dv_nome, dv_qtde_valor, dv_desconto, dv_opcao, dv_tipo, ep_id);
    }
}