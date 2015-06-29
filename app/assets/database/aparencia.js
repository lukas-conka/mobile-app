function getTableAparencia(){
	return 'tb_aparencia';	
}

function dbLoad(){
	var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));	
	return db;
}
function createAparencia() {
	db = dbLoad();
	db.execute('CREATE TABLE IF NOT EXISTS ' + getTableAparencia() + ' (
		id INTEGER PRIMARY KEY, apr_id INTEGER, apr_arquivo TEXT, apr_tipo TEXT,
		apr_data TEXT,apr_status INTEGER, fk_marcas INTEGER
		);');
	db.close();
}

function dropAparencia() {
	db = dbLoad();
	db.execute('DROP TABLE IF EXISTS ' + getTableAparencia());
	db.close();
}

function insertAparencia(apr_id, apr_arquivo, apr_tipo, apr_data, apr_status, fk_marcas) {
	db = dbLoad();
	db.execute('INSERT INTO ' + getTableAparencia() + ' (
		apr_id, apr_arquivo, apr_tipo, apr_data, apr_status, fk_marcas) 
	VALUES (?,?,?,?,?,?)', 
	apr_id, apr_arquivo, apr_tipo, apr_data, apr_status, fk_marcas);
	db.close();
}

function selectallAparencia() {
	db = dbLoad();
	var aparencia = db.execute('SELECT * FROM ' + getTableAparencia());	
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return aparencia;
}

function selectLogoFile(){	
	db = dbLoad();
	var result;
	var aparencia = db.execute('SELECT apr_arquivo FROM ' + getTableAparencia() + ' where fk_marcas = 0 and apr_status = 1 and apr_tipo = "logo"');	
	var apr_arquivo = aparencia.fieldByName('apr_arquivo');	
	/*var logo = Ti.Filesystem.getFile(rootDir, apr_arquivo);
	if (logo.exists()) {		
		result = logo;
	} */
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return apr_arquivo;
}

function selectImageMarca(mc_id){	
	db = dbLoad();
	var result;
	var aparencia = db.execute('SELECT apr_arquivo FROM ' + getTableAparencia() + ' WHERE fk_marcas = ' + mc_id + ' and apr_status = 1 and apr_tipo = "logo"');	
	var apr_arquivo = aparencia.fieldByName('apr_arquivo');
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return apr_arquivo;
}

function processAparencia(jsonTxt) {
	dropAparencia();
	createAparencia();
	var jsonObject = JSON.parse(jsonTxt);
	for (var j = 0; j < jsonObject.length; j++) {
			var apr_id = jsonObject[j].apr_id;
			var apr_arquivo = jsonObject[j].apr_arquivo;
			var apr_tipo = jsonObject[j].apr_tipo;
			var apr_data = jsonObject[j].apr_data;
			var apr_status = jsonObject[j].apr_status;
			var fk_marcas = jsonObject[j].fk_marcas;
			insertAparencia(apr_id, apr_arquivo, apr_tipo, apr_data, apr_status, fk_marcas);		
	}
}

function consultaImagensConceituais(software, marca){
	var query;
	if (software == 4 || software == 3){
		query = "SELECT apr_arquivo FROM tb_aparencia WHERE apr_tipo = 'capa'";
	} else {
		query = "SELECT apr_arquivo FROM tb_aparencia WHERE apr_tipo = 'capa' AND fk_marcas = " + marca;
	}
	db = dbLoad();
	var aparencia = db.execute(query);
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return aparencia;
}
