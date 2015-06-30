function getTableCarrinhoPedido(){
	return 'tb_carrinho_pedido';	
}

function dbLoad(){
	var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));	
	return db;
}

function createCarrinhoPedido() {
	db = dbLoad();
	db.execute('CREATE TABLE IF NOT EXISTS ' + getTableCarrinhoPedido() + '(
		id INTEGER PRIMARY KEY, crp_id INTEGER, crp_session_id TEXT, crp_quantidade INTEGER, crp_preco_unitario TEXT, crp_ipi TEXT, crp_icms TEXT, crp_data DATE, desconto TEXT, desconto_parcela TEXT, desconto_especial TEXT, crp_forma_pagamento TEXT, crp_fk_pedido INTEGER, fk_usu INTEGER, fk_tamanhos INTEGER, fk_produtos INTEGER, fk_cores INTEGER, rp_id INTEGER, ep_id INTEGER
		);');
	db.close();
}

function dropCarrinhoPedido() {
	db = dbLoad();
	db.execute('DROP TABLE IF EXISTS ' + getTableCarrinhoPedido());
	db.close();
}

function insertCarrinhoPedido(crp_id, crp_session_id, crp_quantidade, crp_preco_unitario, crp_ipi, crp_icms, crp_data, desconto, desconto_parcela, desconto_especial, crp_forma_pagamento, crp_fk_pedido, fk_usu, fk_tamanhos, fk_produtos, fk_cores, rp_id, ep_id, desconto_unit) {
	db = dbLoad();
	db.execute('INSERT INTO ' + getTableCarrinhoPedido() + '(
		crp_id, crp_session_id, crp_quantidade, crp_preco_unitario, crp_ipi, crp_icms, crp_data, desconto, desconto_parcela, desconto_especial, crp_forma_pagamento, crp_fk_pedido, fk_usu, fk_tamanhos, fk_produtos, fk_cores, rp_id, ep_id, desconto_unit) 
	VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
		crp_id, crp_session_id, crp_quantidade, crp_preco_unitario, crp_ipi, crp_icms, crp_data, desconto, desconto_parcela, desconto_especial, crp_forma_pagamento, crp_fk_pedido, fk_usu, fk_tamanhos, fk_produtos, fk_cores, rp_id, ep_id, desconto_unit);
	db.close();
}

function consultaUltimoCarrinhoPedido(){
	db = dbLoad();
	var carrinhoPedido = db.execute("SELECT " + getTableCarrinhoPedido() + ".crp_id FROM " + getTableCarrinhoPedido() + " ORDER BY " + getTableCarrinhoPedido() + ".crp_id DESC LIMIT 1");
	var result = 0;
	if(carrinhoPedido.isValidRow()){
		result = carrinhoPedido.fieldByName("crp_id")
	}
	db.close();
	return result;
}

function selectallCarrinhoPedido() {
	db = dbLoad();
	var carrinhopedido = db.execute('SELECT * FROM ' + getTableCarrinhoPedido());	
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return carrinhopedido;
}

function consultaCarrinhoPedidoByPedido(pedido){
	db = dbLoad();
	var query = "SELECT " + 
	"tb_carrinho_pedido.crp_quantidade, tb_carrinho_pedido.desconto_unit, tb_carrinho_pedido.crp_preco_unitario, tb_carrinho_pedido.crp_ipi, " +
	"tb_carrinho_pedido.crp_data, tb_carrinho_pedido.desconto, tb_carrinho_pedido.desconto_parcela, tb_carrinho_pedido.desconto_especial, " +
	"tb_carrinho_pedido.crp_forma_pagamento, tb_carrinho_pedido.fk_tamanhos, tb_carrinho_pedido.fk_produtos, tb_carrinho_pedido.fk_cores, " +
	"tb_pedido.ped_entrega, tb_pedido.ped_entrega_prazo, tb_pedido.ped_numero, tb_pedido.ped_observacao, tb_pedido.fk_marcas, tb_pedido.ped_data_pag, " +
	"tb_cliente.cl_cnpj, tb_cliente.cl_razao, tb_cliente.cl_cep_unid, tb_cliente.cl_end_unid, tb_cliente.cl_n_unid, tb_cliente.cl_comp_unid, tb_cliente.cl_bairro_unid, tb_cliente.cl_cidade_unid, tb_cliente.cl_uf_unid, " +
	"tb_cores.cor_nome, tb_tamanhos.tmh_nome, " +
	"tb_produtos.prd_nome, tb_produtos.prd_referencia, tb_produtos.prd_ipi, tb_produtos.prd_nome_colecao, tb_produtos.fk_marca,tb_produtos.prd_id, " +
	"tb_info_produtos.ifp_peso, tb_info_produtos.ifp_cub_a, tb_info_produtos.ifp_cub_l, tb_info_produtos.ifp_cub_p " +
	"FROM tb_carrinho_pedido " +
	"INNER JOIN tb_pedido ON tb_pedido.ped_id = " + pedido + " " +
	"INNER JOIN tb_cliente ON tb_cliente.cl_id = tb_pedido.fk_cli " +
	"INNER JOIN tb_cores ON tb_cores.cor_id = tb_carrinho_pedido.fk_cores " +
	"INNER JOIN tb_tamanhos ON tb_tamanhos.tmh_id = tb_carrinho_pedido.fk_tamanhos " +
	"INNER JOIN tb_produtos ON tb_produtos.prd_id = tb_carrinho_pedido.fk_produtos " +
	"INNER JOIN tb_info_produtos ON tb_info_produtos.fk_produtos = tb_carrinho_pedido.fk_produtos AND tb_info_produtos.fk_cores = tb_carrinho_pedido.fk_cores AND tb_info_produtos.fk_tamanhos = tb_carrinho_pedido.fk_tamanhos " +
	"WHERE tb_carrinho_pedido.crp_fk_pedido = " + pedido + " " +
	"ORDER BY tb_carrinho_pedido.fk_produtos;";
	var carrinhopedido = db.execute(query);
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return carrinhopedido;
}

function consultaCarrinhoTotalizacao(pedido){
	db = dbLoad();
	var pedido = db.execute("SELECT tb_carrinho_pedido.crp_quantidade,tb_carrinho_pedido.crp_preco_unitario,tb_carrinho_pedido.crp_ipi, tb_carrinho_pedido.desconto_unit, tb_carrinho_pedido.desconto_parcela,tb_carrinho_pedido.desconto_especial FROM tb_carrinho_pedido WHERE tb_carrinho_pedido.crp_fk_pedido = " + pedido);
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return pedido;
}

function processCarrinhoPedido(jsonTxt) {
	dropCarrinhoPedido();
	createCarrinhoPedido();
	var jsonObject = JSON.parse(jsonTxt);
	for (var j = 0; j < jsonObject.length; j++) {
		var crp_id = jsonObject[j].crp_id;
		var crp_session_id = jsonObject[j].crp_session_id;
		var crp_quantidade = jsonObject[j].crp_quantidade;
		var crp_preco_unitario = jsonObject[j].crp_preco_unitario;
		var crp_ipi = jsonObject[j].crp_ipi;
		var crp_icms = jsonObject[j].crp_icms;
		var crp_data = jsonObject[j].crp_data;
		var desconto = jsonObject[j].desconto;
		var desconto_parcela = jsonObject[j].desconto_parcela;
		var desconto_especial = jsonObject[j].desconto_especial;
		var crp_forma_pagamento = jsonObject[j].crp_forma_pagamento;
		var crp_fk_pedido = jsonObject[j].crp_fk_pedido;
		var fk_usu = jsonObject[j].fk_usu;
		var fk_tamanhos = jsonObject[j].fk_tamanhos;
		var fk_produtos = jsonObject[j].fk_produtos;
		var fk_cores = jsonObject[j].fk_cores;
		var rp_id = jsonObject[j].rp_id;
		var ep_id = jsonObject[j].ep_id;
		insertCarrinhoPedido(crp_id, crp_session_id, crp_quantidade, crp_preco_unitario, crp_ipi, crp_icms, crp_data, desconto, desconto_parcela, desconto_especial, crp_forma_pagamento, crp_fk_pedido, fk_usu, fk_tamanhos, fk_produtos, fk_cores, rp_id, ep_id);
	}
}