function getTableStatusRepresentante(){
	return 'tb_status_rp';	
}

function dbLoad(){
	var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));	
	return db;
}
function createStatusRepresentante() {
	db = dbLoad();
	db.execute('CREATE TABLE IF NOT EXISTS ' + getTableStatusRepresentante() + '(
		id INTEGER PRIMARY KEY, st_id INTEGER, st_nome TEXT, rp_id INTEGER
		);');
	db.close();
}

function dropStatusRepresentante() {
	db = dbLoad();
	db.execute('DROP TABLE IF EXISTS ' + getTableStatusRepresentante());
	db.close();
}

function insertStatusRepresentante(st_id, st_nome, rp_id) {
	db = dbLoad();
	db.execute('INSERT INTO ' + getTableStatusRepresentante() + ' (
		st_id, st_nome, rp_id) 
	VALUES (?,?,?)', 
		st_id, st_nome, rp_id);
	db.close();
}

function selectallStatusRepresentante() {
	db = dbLoad();
	var statusrepresentante = db.execute('SELECT * FROM ' + getTableStatusRepresentante());	
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return statusrepresentante;
}

function processStatusRepresentante(jsonTxt) {
	dropStatusRepresentante();
	createStatusRepresentante();
	var jsonObject = JSON.parse(jsonTxt);
	for (var j = 0; j < jsonObject.length; j++) {	
		var st_id = jsonObject[j].st_id;
		var st_nome = jsonObject[j].st_nome;
		var rp_id = jsonObject[j].rp_id;
		insertStatusRepresentante(st_id, st_nome, rp_id);
	}
}