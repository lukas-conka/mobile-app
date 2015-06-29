function getTableTemplate() {
    return "tb_templates";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createTemplate() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableTemplate() + "(\n		id INTEGER PRIMARY KEY, tpl_id INTEGER, tpl_nome TEXT, tpl_numero_produtos INTEGER, tpl_disposicao_produtos TEXT, tpl_caminho_template TEXT, ep_id INTEGER\n		);");
    db.close();
}

function dropTemplate() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableTemplate());
    db.close();
}

function insertTemplate(tpl_id, tpl_nome, tpl_numero_produtos, tpl_disposicao_produtos, tpl_caminho_template, ep_id) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableTemplate() + " (\n		tpl_id, tpl_nome, tpl_numero_produtos, tpl_disposicao_produtos, tpl_caminho_template, ep_id) \n	VALUES (?,?,?,?,?,?)", tpl_id, tpl_nome, tpl_numero_produtos, tpl_disposicao_produtos, tpl_caminho_template, ep_id);
    db.close();
}

function selectallTemplate() {
    db = dbLoad();
    var template = db.execute("SELECT * FROM " + getTableTemplate());
    db.close();
    return template;
}

function processTemplate(jsonTxt) {
    dropTemplate();
    createTemplate();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        var tpl_id = jsonObject[j].tpl_id;
        var tpl_nome = jsonObject[j].tpl_nome;
        var tpl_numero_produtos = jsonObject[j].tpl_numero_produtos;
        var tpl_disposicao_produtos = jsonObject[j].tpl_disposicao_produtos;
        var tpl_caminho_template = jsonObject[j].tpl_caminho_template;
        var ep_id = jsonObject[j].ep_id;
        insertTemplate(tpl_id, tpl_nome, tpl_numero_produtos, tpl_disposicao_produtos, tpl_caminho_template, ep_id);
    }
}