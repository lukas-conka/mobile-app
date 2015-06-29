function getTableVolumeMarca() {
    return "tb_volume_marca";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createVolumeMarca() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableVolumeMarca() + " (\n		id INTEGER PRIMARY KEY, vlm_ip INTEGER, fk_desconto INTEGER, fk_marca INTEGER,\n		ep_id INTEGER\n		);");
    db.close();
}

function dropVolumeMarca() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS  " + getTableVolumeMarca());
    db.close();
}

function insertVolumeMarca(vlm_ip, fk_desconto, fk_marca, ep_id) {
    db = dbLoad();
    db.execute("INSERT INTO  " + getTableVolumeMarca() + "(\n		vlm_ip, fk_desconto, fk_marca, ep_id) \n	VALUES (?,?,?,?)", vlm_ip, fk_desconto, fk_marca, ep_id);
    db.close();
}

function selectallVolumeMarca() {
    db = dbLoad();
    var volumemarca = db.execute("SELECT * FROM  " + getTableVolumeMarca());
    "android" == Ti.Platform.osname && db.close();
    return volumemarca;
}

function processVolumeMarca(jsonTxt) {
    dropVolumeMarca();
    createVolumeMarca();
    var jsonObject = JSON.parse(jsonTxt);
    for (var j = 0; j < jsonObject.length; j++) {
        Ti.API.info("VLMID=" + jsonObject[j].vlm_ip);
        var vlm_ip = jsonObject[j].vlm_ip;
        var fk_desconto = jsonObject[j].fk_desconto;
        var fk_marca = jsonObject[j].fk_marca;
        var ep_id = jsonObject[j].ep_id;
        insertVolumeMarca(vlm_ip, fk_desconto, fk_marca, ep_id);
    }
}