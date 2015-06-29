function getTableReferenciaComercial(){
	return 'tb_ref_comercial';	
}

function dbLoad(){
	var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));	
	return db;
}
function createReferenciaComercial() {
	db = dbLoad();
	db.execute('CREATE TABLE IF NOT EXISTS ' + getTableReferenciaComercial() + '(
		id INTEGER PRIMARY KEY, rf_id INTEGER, rf_fornecedor TEXT, rf_fone TEXT, rf_responsavel TEXT, rf_email TEXT,
		fk_cl INTEGER, ep_id INTEGER
		);');
	db.close();
}

function dropReferenciaComercial() {
	db = dbLoad();
	db.execute('DROP TABLE IF EXISTS ' + getTableReferenciaComercial());
	db.close();
}

function insertReferenciaComercial(rf_id, rf_fornecedor, rf_fone, rf_responsavel, rf_email,	fk_cl, ep_id) {
	db = dbLoad();
	db.execute('INSERT INTO ' + getTableReferenciaComercial() + ' (
		rf_id, rf_fornecedor, rf_fone, rf_responsavel, rf_email, fk_cl, ep_id) 
	VALUES (?,?,?,?,?,?,?)', 
	rf_id, rf_fornecedor, rf_fone, rf_responsavel, rf_email, fk_cl, ep_id);
	db.close();
}

function selectallReferenciaComercial() {
	db = dbLoad();
	var referenciacomercial = db.execute('SELECT * FROM ' + getTableReferenciaComercial());	
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return referenciacomercial;
}

function processReferenciaComercial(jsonTxt) {
	dropReferenciaComercial();
	createReferenciaComercial();
	var jsonObject = JSON.parse(jsonTxt);
	for (var j = 0; j < jsonObject.length; j++) {
			var rf_id = jsonObject[j].rf_id;
			var rf_fornecedor = jsonObject[j].rf_fornecedor;
			var rf_fone = jsonObject[j].rf_fone;
			var rf_responsavel = jsonObject[j].rf_responsavel;
			var rf_email = jsonObject[j].rf_email;
			var	fk_cl = jsonObject[j].fk_cl;
			var ep_id = jsonObject[j].ep_id;
			insertReferenciaComercial(rf_id, rf_fornecedor, rf_fone, rf_responsavel, rf_email, fk_cl, ep_id);
		}
	}
