function getTableClienteMarca(){
	return 'tb_cliente_marca';	
}

function dbLoad(){
	var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));	
	return db;
}

function createClienteMarca() {
	db = dbLoad();
	db.execute('CREATE TABLE IF NOT EXISTS ' + getTableClienteMarca() + '(
		id INTEGER PRIMARY KEY, cm_id INTEGER, fk_cliente INTEGER, fk_marca INTEGER, ep_id INTEGER, cm_preco_1 INTEGER, cm_preco_2 INTEGER, cm_preco_3 INTEGER
		);');
	db.close();
}

function dropClienteMarca() {
	db = dbLoad();
	db.execute('DROP TABLE IF EXISTS ' + getTableClienteMarca());
	db.close();
}

function insertClienteMarca(cm_id, fk_cliente, fk_marca, ep_id, cm_preco_1, cm_preco_2, cm_preco_3) {
	db = dbLoad();
	db.execute('INSERT INTO ' + getTableClienteMarca() + ' (
		cm_id, fk_cliente, fk_marca, ep_id, cm_preco_1, cm_preco_2, cm_preco_3) 
	VALUES (?,?,?,?,?,?,?)', 
		cm_id, fk_cliente, fk_marca, ep_id, cm_preco_1, cm_preco_2, cm_preco_3);
	db.close();
}

function selectallClienteMarca() {
	db = dbLoad();
	var clientemarca = db.execute('SELECT * FROM ' + getTableClienteMarca());
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return clientemarca;
}

function processClienteMarca(jsonTxt) {
	dropClienteMarca();
	createClienteMarca();
	var jsonObject = JSON.parse(jsonTxt);
	for (var j = 0; j < jsonObject.length; j++) {
		var cm_id = jsonObject[j].cm_id;
		var fk_cliente = jsonObject[j].fk_cliente;
		var fk_marca = jsonObject[j].fk_marca;
		var ep_id = jsonObject[j].ep_id;
		var cm_preco_1 = jsonObject[j].cm_preco_1;
		var cm_preco_2 = jsonObject[j].cm_preco_2;
		var cm_preco_3 = jsonObject[j].cm_preco_3;
		insertClienteMarca(cm_id, fk_cliente, fk_marca, ep_id, cm_preco_1, cm_preco_2, cm_preco_3);
	}
}