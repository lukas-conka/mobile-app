function getTableReferenciaBanco(){
	return 'tb_ref_banco';	
}

function dbLoad(){
	var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));	
	return db;
}
function createReferenciaBanco() {
	db = dbLoad();
	db.execute('CREATE TABLE IF NOT EXISTS ' + getTableReferenciaBanco() + '(
		id INTEGER PRIMARY KEY, rf_id INTEGER, rf_banco TEXT, rf_ag TEXT,
		rf_conta TEXT, rf_gerente TEXT, rf_email_gerente TEXT, rf_fone_gerente TEXT,
		fk_cl INTEGER, ep_id INTEGER
		);');
	db.close();
}

function dropReferenciaBanco() {
	db = dbLoad();
	db.execute('DROP TABLE IF EXISTS ' + getTableReferenciaBanco());
	db.close();
}

function insertReferenciaBanco(rf_id, rf_banco, rf_ag, rf_conta, rf_gerente, rf_email_gerente, rf_fone_gerente, fk_cl, ep_id) {
	db = dbLoad();
	db.execute('INSERT INTO ' + getTableReferenciaBanco() + ' (
		rf_id, rf_banco, rf_ag, rf_conta, rf_gerente, rf_email_gerente, rf_fone_gerente, fk_cl, ep_id) 
	VALUES (?,?,?,?,?,?,?,?,?)', 
	rf_id, rf_banco, rf_ag, rf_conta, rf_gerente, rf_email_gerente, rf_fone_gerente, fk_cl, ep_id);
	db.close();
}

function selectallReferenciaBanco() {
	db = dbLoad();
	var ReferenciaBanco = db.execute('SELECT * FROM ' + getTableReferenciaBanco());	
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return ReferenciaBanco;
}

function processReferenciaBanco(jsonTxt) {
	dropReferenciaBanco();
	createReferenciaBanco();
	var jsonObject = JSON.parse(jsonTxt);
	for (var j = 0; j < jsonObject.length; j++) {
			var rf_id = jsonObject[j].rf_id;
			var rf_banco = jsonObject[j].rf_banco;
			var rf_ag = jsonObject[j].rf_ag;
			var rf_conta = jsonObject[j].rf_conta;
			var rf_gerente = jsonObject[j].rf_gerente;
			var rf_email_gerente = jsonObject[j].rf_email_gerente;
			var rf_fone_gerente = jsonObject[j].rf_fone_gerente;
			var fk_cl = jsonObject[j].fk_cl;
			var ep_id = jsonObject[j].ep_id;
			insertReferenciaBanco(rf_id, rf_banco, rf_ag, rf_conta, rf_gerente, rf_email_gerente, rf_fone_gerente, fk_cl, ep_id);
	}
}