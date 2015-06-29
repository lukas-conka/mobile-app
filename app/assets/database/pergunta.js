function getTablePergunta(){
	return 'tb_pergunta';	
}

function dbLoad(){
	var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));	
	return db;
}
function createPergunta() {
	db = dbLoad();
	db.execute('CREATE TABLE IF NOT EXISTS ' + getTablePergunta() + '(
		id INTEGER PRIMARY KEY, prg_id INTEGER, prg_pergunta TEXT, prg_resposta TEXT, prg_software INTEGER 
		);');
	db.close();
}

function dropPergunta() {
	db = dbLoad();
	db.execute('DROP TABLE IF EXISTS ' + getTablePergunta());
	db.close();
}

function insertPergunta(prg_id, prg_pergunta, prg_resposta, prg_software) {
	db = dbLoad();
	db.execute('INSERT INTO ' + getTablePergunta() + ' (
		prg_id, prg_pergunta, prg_resposta, prg_software) 
	VALUES (?,?,?,?)', 
		prg_id, prg_pergunta, prg_resposta, prg_software);
	db.close();
}

function selectallPergunta() {
	db = dbLoad();
	var pergunta = db.execute('SELECT * FROM ' + getTablePergunta());	
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return pergunta;
}

function consultaPerguntas(software, busca_pergunta) {
	db = dbLoad();
	var query = 'SELECT * FROM ' + getTablePergunta() + " WHERE ";
	if(software!=0 && software){
		var query_software = "(prg_software = 0 OR prg_software = " + software + ") ";
		query = query + query_software;
	} else {
		query = query + "prg_software = 0 "; 
	}
	if(busca_pergunta!='' && busca_pergunta){
  		var search = "AND (prg_pergunta LIKE '%" + busca_pergunta + "%' OR " +
  		" prg_resposta LIKE '%"  + busca_pergunta +  "%')";
  		query = query + search;
	}

	var pergunta = db.execute(query);	
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return pergunta;
}

function processPergunta(jsonTxt) {
	dropPergunta();
	createPergunta();
	var jsonObject = JSON.parse(jsonTxt);
	for (var j = 0; j < jsonObject.length; j++) {
		var prg_id = jsonObject[j].prg_id;
		var prg_pergunta = jsonObject[j].prg_pergunta;
		var prg_resposta = jsonObject[j].prg_resposta;
		var prg_software = jsonObject[j].prg_software;		
		insertPergunta(prg_id, prg_pergunta, prg_resposta, prg_software);
	}
}