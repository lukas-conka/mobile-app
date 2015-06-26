function getTableNotificacao(){
	return 'tb_notificacao';	
}

function dbLoad(){
	var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));	
	return db;
}
function createNotificacao() {
	db = dbLoad();
	db.execute('CREATE TABLE IF NOT EXISTS ' + getTableNotificacao() + '(
		id INTEGER PRIMARY KEY, ntf_id INTEGER, ntf_representante INTEGER, ntf_mensagem TEXT,
		ntf_data TEXT, ntf_status INTEGER, ntf_grupo INTEGER, ep_id INTEGER
		);');
	db.close();
}

function dropNotificacao() {
	db = dbLoad();
	db.execute('DROP TABLE IF EXISTS ' + getTableNotificacao());
	db.close();
}

function insertNotificacao(ntf_id, ntf_representante, ntf_mensagem,	ntf_data, ntf_status, ntf_grupo, ep_id) {
	db = dbLoad();
	db.execute('INSERT INTO ' + getTableNotificacao() + ' (
		ntf_id, ntf_representante, ntf_mensagem,	ntf_data, ntf_status, ntf_grupo, ep_id) 
	VALUES (?,?,?,?,?,?,?)', 
	ntf_id, ntf_representante, ntf_mensagem,	ntf_data, ntf_status, ntf_grupo, ep_id);
	db.close();
}

function selectallNotificacao() {
	db = dbLoad();
	var query = "SELECT ntf_id,ntf_mensagem,ntf_data,ntf_status FROM tb_notificacao ORDER BY ntf_id DESC";
	var notificacao = db.execute(query);	
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return notificacao;
}

function processNotificacao(jsonTxt) {
	dropNotificacao();
	createNotificacao();
	var jsonObject = JSON.parse(jsonTxt);
	for (var j = 0; j < jsonObject.length; j++) {
			var ntf_id = jsonObject[j].ntf_id;
			var ntf_representante = jsonObject[j].ntf_representante;
			var ntf_mensagem = jsonObject[j].ntf_mensagem;
			var	ntf_data = jsonObject[j].ntf_data;
			var ntf_status = jsonObject[j].ntf_status;
			var ntf_grupo = jsonObject[j].ntf_grupo;
			var ep_id = jsonObject[j].ep_id;
			insertNotificacao(ntf_id, ntf_representante, ntf_mensagem,	ntf_data, ntf_status, ntf_grupo, ep_id);
	}
}