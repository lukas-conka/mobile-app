function getTableSocio(){
	return 'tb_socio';	
}

function dbLoad(){
	var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));	
	return db;
}
function createSocio() {
	db = dbLoad();
	db.execute('CREATE TABLE IF NOT EXISTS ' + getTableSocio() + '(
		id INTEGER PRIMARY KEY, sc_id INTEGER, sc_nome TEXT, sc_cpf TEXT, sc_rg TEXT, sc_emissor TEXT, sc_data_expedicao DATE, sc_naturalidade TEXT, sc_nacionalidade TEXT, sc_email TEXT, sc_cl INTEGER, ep_id INTEGER 
		);');
	db.close();
}

function dropSocio() {
	db = dbLoad();
	db.execute('DROP TABLE IF EXISTS ' + getTableSocio());
	db.close();
}

function insertSocio(sc_id, sc_nome, sc_cpf, sc_rg, sc_emissor, sc_data_expedicao, sc_naturalidade, sc_nacionalidade, sc_email, sc_cl, ep_id) {
	db = dbLoad();
	db.execute('INSERT INTO ' + getTableSocio() + ' (
		sc_id, sc_nome, sc_cpf, sc_rg, sc_emissor, sc_data_expedicao, sc_naturalidade, sc_nacionalidade, sc_email, sc_cl, ep_id) 
	VALUES (?,?,?,?,?,?,?,?,?,?,?)', 
		sc_id, sc_nome, sc_cpf, sc_rg, sc_emissor, sc_data_expedicao, sc_naturalidade, sc_nacionalidade, sc_email, sc_cl, ep_id);
	db.close();
}

function selectallSocio() {
	db = dbLoad();
	var socio = db.execute('SELECT * FROM ' + getTableSocio());	
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return socio;
}

function processSocio(jsonTxt) {
	dropSocio();
	createSocio();
	var jsonObject = JSON.parse(jsonTxt);
	for (var j = 0; j < jsonObject.length; j++) {
		var sc_id = jsonObject[j].sc_id;
		var sc_nome = jsonObject[j].sc_nome;
		var sc_cpf = jsonObject[j].sc_cpf;
		var sc_rg = jsonObject[j].sc_rg;
		var sc_emissor = jsonObject[j].sc_emissor;
		var sc_data_expedicao = jsonObject[j].sc_data_expedicao;
		var sc_naturalidade = jsonObject[j].sc_naturalidade;
		var sc_nacionalidade = jsonObject[j].sc_nacionalidade;
		var sc_email = jsonObject[j].sc_email;
		var sc_cl = jsonObject[j].sc_cl;
		var ep_id = jsonObject[j].ep_id;
		insertSocio(sc_id, sc_nome, sc_cpf, sc_rg, sc_emissor, sc_data_expedicao, sc_naturalidade, sc_nacionalidade, sc_email, sc_cl, ep_id);
	}
}