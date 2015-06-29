function getTableRepresentante(){
	return 'tb_representante';	
}

function dbLoad(){
	var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));	
	return db;
}
function createRepresentante() {
	db = dbLoad();
	db.execute('CREATE TABLE IF NOT EXISTS ' + getTableRepresentante() + '(
		id INTEGER PRIMARY KEY, rp_id INTEGER, rp_nome TEXT, rp_rg TEXT, rp_emissor TEXT, rp_data_emissao DATE, rp_cpf TEXT, rp_reg_core TEXT, rp_sexo TEXT, rp_datanasc DATE, fk_tipo TEXT, rp_usuario TEXT, rp_senha TEXT, rp_cep TEXT, rp_endereco TEXT, rp_n TEXT, rp_comp TEXT, rp_bairro TEXT, rp_cidade TEXT, rp_uf TEXT, rp_data DATE, rp_desc_especial INTEGER, rp_limite_desc_especial INTEGER, fk_nivel INTEGER, fk_ep INTEGER, fk_status INTEGER, ep_id INTEGER, rp_cod_erp INTEGER
		);');
	db.close();
}

function dropRepresentante() {
	db = dbLoad();
	db.execute('DROP TABLE IF EXISTS ' + getTableRepresentante());
	db.close();
}

function insertRepresentante(rp_id, rp_nome, rp_rg, rp_emissor, rp_data_emissao, rp_cpf, rp_reg_core, rp_sexo, rp_datanasc, fk_tipo, rp_usuario, rp_senha, rp_cep, rp_endereco, rp_n, rp_comp, rp_bairro, rp_cidade, rp_uf, rp_data, rp_desc_especial, rp_limite_desc_especial, fk_nivel, fk_ep, fk_status, ep_id, rp_cod_erp) {
	db = dbLoad();
	db.execute('INSERT INTO ' + getTableRepresentante() + '(
		rp_id, rp_nome, rp_rg, rp_emissor, rp_data_emissao, rp_cpf, rp_reg_core, rp_sexo, rp_datanasc, fk_tipo, rp_usuario, rp_senha, rp_cep, rp_endereco, rp_n, rp_comp, rp_bairro, rp_cidade, rp_uf, rp_data, rp_desc_especial, rp_limite_desc_especial, fk_nivel, fk_ep, fk_status, ep_id, rp_cod_erp) 
	VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
		rp_id, rp_nome, rp_rg, rp_emissor, rp_data_emissao, rp_cpf, rp_reg_core, rp_sexo, rp_datanasc, fk_tipo, rp_usuario, rp_senha, rp_cep, rp_endereco, rp_n, rp_comp, rp_bairro, rp_cidade, rp_uf, rp_data, rp_desc_especial, rp_limite_desc_especial, fk_nivel, fk_ep, fk_status, ep_id, rp_cod_erp);
	db.close();
}

function selectallRepresentante() {
	db = dbLoad();
	var representante = db.execute("SELECT * FROM " + getTableRepresentante());
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return representante;
}

function consultaMaximoDesconto(){
	db = dbLoad();
	var representante = db.execute("SELECT tb_representante.rp_desc_especial,tb_representante.rp_limite_desc_especial FROM tb_representante");
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return representante;
}

function processRepresentante(jsonTxt) {
	dropRepresentante();
	createRepresentante();
	var jsonObject = JSON.parse(jsonTxt);
	for (var j = 0; j < jsonObject.length; j++) {
		var rp_id = jsonObject[j].rp_id;
		var rp_nome = jsonObject[j].rp_nome;
		var rp_rg = jsonObject[j].rp_rg;
		var rp_emissor = jsonObject[j].rp_emissor;
		var rp_data_emissao = jsonObject[j].rp_data_emissao;
		var rp_cpf = jsonObject[j].rp_cpf;
		var rp_reg_core = jsonObject[j].rp_reg_core;
		var rp_sexo = jsonObject[j].rp_sexo;
		var rp_datanasc = jsonObject[j].rp_datanasc;
		var fk_tipo = jsonObject[j].fk_tipo;
		var rp_usuario = jsonObject[j].rp_usuario;
		var rp_senha = jsonObject[j].rp_senha;
		var rp_cep = jsonObject[j].rp_cep;
		var rp_endereco = jsonObject[j].rp_endereco;
		var rp_n = jsonObject[j].rp_n;
		var rp_comp = jsonObject[j].rp_comp;
		var rp_bairro = jsonObject[j].rp_bairro;
		var rp_cidade = jsonObject[j].rp_cidade;
		var rp_uf = jsonObject[j].rp_uf;
		var rp_data = jsonObject[j].rp_data;
		var rp_desc_especial = jsonObject[j].rp_desc_especial;
		var rp_limite_desc_especial = jsonObject[j].rp_limite_desc_especial;
		var fk_nivel = jsonObject[j].fk_nivel;
		var fk_ep = jsonObject[j].fk_ep;
		var fk_status = jsonObject[j].fk_status;
		var ep_id = jsonObject[j].ep_id;
		var rp_cod_erp = jsonObject[j].rp_cod_erp;
		insertRepresentante(rp_id, rp_nome, rp_rg, rp_emissor, rp_data_emissao, rp_cpf, rp_reg_core, rp_sexo, rp_datanasc, fk_tipo, rp_usuario, rp_senha, rp_cep, rp_endereco, rp_n, rp_comp, rp_bairro, rp_cidade, rp_uf, rp_data, rp_desc_especial, rp_limite_desc_especial, fk_nivel, fk_ep, fk_status, ep_id, rp_cod_erp);
	}
}