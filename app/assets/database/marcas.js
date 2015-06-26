function getTableMarcas(){
	return 'tb_marcas';	
}

function dbLoad(){
	var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));	
	return db;
}
function createMarcas() {
	db = dbLoad();
	db.execute('CREATE TABLE IF NOT EXISTS ' + getTableMarcas() + '(
		id INTEGER PRIMARY KEY, mc_id INTEGER, mc_nome TEXT, mc_cnpj TEXT, ep_id INTEGER, mc_endereco TEXT, mc_numero TEXT, mc_complemento TEXT, mc_bairro TEXT, mc_cidade TEXT, mc_uf TEXT, mc_cep TEXT
		);');
	db.close();
}

function dropMarcas() {
	db = dbLoad();
	db.execute('DROP TABLE IF EXISTS ' + getTableMarcas());
	db.close();
}

function insertMarcas(mc_id, mc_nome, mc_cnpj, ep_id, mc_endereco, mc_numero, mc_complemento, mc_bairro, mc_cidade, mc_uf, mc_cep) {
	db = dbLoad();
	db.execute('INSERT INTO ' + getTableMarcas() + ' (mc_id, mc_nome, mc_cnpj, ep_id, mc_endereco, mc_numero, mc_complemento, mc_bairro, mc_cidade, mc_uf, mc_cep) 
	VALUES (?,?,?,?,?,?,?,?,?,?,?)', 
	mc_id, mc_nome, mc_cnpj, ep_id, mc_endereco, mc_numero, mc_complemento, mc_bairro, mc_cidade, mc_uf, mc_cep);
	db.close();
}

function selectallMarcas(representante) {
	db = dbLoad();
	var representantemarca = db.execute('SELECT fk_marca FROM tb_representante_marca WHERE fk_representante = ' + representante);
	var mc = [];
	while (representantemarca.isValidRow()) {		
		mc.push(representantemarca.fieldByName('fk_marca'));
		representantemarca.next();
	}
	var marcas = db.execute('SELECT mc_id,mc_nome FROM ' + getTableMarcas() + ' where mc_id in (' + mc.toString() + ') ORDER BY "mc_nome" ASC');	
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return marcas;
}

function processMarcas(jsonTxt) {
	dropMarcas();
	createMarcas();
	var jsonObject = JSON.parse(jsonTxt);
	for (var j = 0; j < jsonObject.length; j++) {		
			if(jsonObject[j].mc_visualizar==0){
			var mc_id = jsonObject[j].mc_id;
			var mc_nome = jsonObject[j].mc_nome;
			var mc_cnpj = jsonObject[j].mc_cnpj;
			var ep_id = jsonObject[j].ep_id;
			var mc_endereco = jsonObject[j].mc_endereco;
			var mc_numero = jsonObject[j].mc_numero;
			var mc_complemento = jsonObject[j].mc_complemento;
			var mc_bairro = jsonObject[j].mc_bairro;
			var mc_cidade = jsonObject[j].mc_cidade;
			var mc_uf = jsonObject[j].mc_uf;
			var mc_cep = jsonObject[j].mc_cep;
			insertMarcas(mc_id, mc_nome, mc_cnpj, ep_id, mc_endereco, mc_numero, mc_complemento, mc_bairro, mc_cidade, mc_uf, mc_cep);
			}
	}
}