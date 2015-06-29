function getTableProdutos(){
	return 'tb_produtos';	
}

function dbLoad(){
	var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
	return db;
}

function createProdutos() {
	db = dbLoad();
	db.execute('CREATE TABLE IF NOT EXISTS ' + getTableProdutos() + '(
		id INTEGER PRIMARY KEY, prd_id INTEGER, fk_categorias INTEGER, prd_nome TEXT,
		prd_referencia TEXT, prd_sus_trib FLOAT, prd_ipi FLOAT, prd_icms FLOAT, prd_nome_colecao TEXT,
		prd_dados_tecnicos TEXT, prd_dados_composicao TEXT, prd_dados_descricao TEXT, prd_data_inicio TEXT,
		prd_data_fim TEXT, prd_data_prazo TEXT, prd_data_limite INTEGER, prd_peso FLOAT, prd_cub_a FLOAT,
		prd_cub_l FLOAT, prd_cub_p FLOAT, prd_codigo_barra TEXT, ep_id INTEGER, fk_marca INTEGER, prd_grade INTEGER, fk_ncm INTEGER, prd_tipo INTEGER,
		prd_cota TEXT
		);');
	db.close();
}

function dropProdutos() {
	db = dbLoad();
	db.execute('DROP TABLE IF EXISTS ' + getTableProdutos());
	db.close();
}

function insertProdutos(prd_id, fk_categorias, prd_nome, prd_referencia, prd_sus_trib, prd_ipi, prd_icms, prd_nome_colecao,
		prd_dados_tecnicos, prd_dados_composicao, prd_dados_descricao, prd_data_inicio, prd_data_fim, prd_data_prazo,
		prd_data_limite, prd_peso, prd_cub_a, prd_cub_l, prd_cub_p, prd_codigo_barra, ep_id, fk_marca, prd_grade, fk_ncm, prd_tipo, prd_cota) {
	db = dbLoad();
	db.execute('INSERT INTO ' + getTableProdutos() + ' (
		prd_id, fk_categorias, prd_nome, prd_referencia, prd_sus_trib, prd_ipi, prd_icms, prd_nome_colecao,
		prd_dados_tecnicos, prd_dados_composicao, prd_dados_descricao, prd_data_inicio, prd_data_fim, prd_data_prazo,
		prd_data_limite, prd_peso, prd_cub_a, prd_cub_l, prd_cub_p, prd_codigo_barra, ep_id, fk_marca, prd_grade, fk_ncm, prd_tipo, prd_cota) 
	VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
	prd_id, fk_categorias, prd_nome, prd_referencia, prd_sus_trib, prd_ipi, prd_icms, prd_nome_colecao,
		prd_dados_tecnicos, prd_dados_composicao, prd_dados_descricao, prd_data_inicio, prd_data_fim, prd_data_prazo,
		prd_data_limite, prd_peso, prd_cub_a, prd_cub_l, prd_cub_p, prd_codigo_barra, ep_id, fk_marca, prd_grade, fk_ncm, prd_tipo, prd_cota);
	if (Ti.Platform.osname == "android") {
		db.close();
	}
}

function selectallProdutos() {
	db = dbLoad();
	var produtos = db.execute('SELECT * FROM ' + getTableProdutos());
	return produtos;
}

function listaProdutosQuatro(busca_produto){
	db = dbLoad();
	var query = "SELECT " +
"tb_produtos.prd_id, tb_produtos.prd_nome, tb_produtos.prd_referencia, tb_produtos.prd_codigo_barra, " +  
"tb_info_produtos.ifp_id, tb_info_produtos.ifp_codigo, tb_info_produtos.ifp_valor_1, tb_info_produtos.ifp_valor_2, tb_info_produtos.ifp_valor_3, tb_info_produtos.ifp_qtde_minima, " +
"tb_imagens_produtos.img_caminho, tb_aparencia.apr_arquivo " +
"FROM tb_produtos " + 
"INNER JOIN tb_categorias ON tb_categorias.cat_id = tb_produtos.fk_categorias " +
"INNER JOIN tb_info_produtos ON tb_info_produtos.fk_produtos = tb_produtos.prd_id AND tb_info_produtos.ifp_destaque = '1' " +
"INNER JOIN tb_imagens_produtos ON tb_imagens_produtos.fk_produtos = tb_produtos.prd_id AND tb_imagens_produtos.img_principal = 1 " +
"INNER JOIN tb_aparencia ON tb_aparencia.fk_marcas = tb_produtos.fk_marca AND tb_aparencia.apr_tipo = 'logo' AND tb_aparencia.apr_status = 1 ";
if(busca_produto!=''){
  var search = "WHERE tb_produtos.prd_nome LIKE '%" + busca_produto + "%' OR " +
  " tb_produtos.prd_referencia LIKE '%"  + busca_produto +  "%' OR " +
  " tb_produtos.prd_codigo_barra LIKE '%"  + busca_produto +  "%' ";
  query = query + search;
}
query = query + 
"GROUP BY tb_info_produtos.ifp_id " +
"ORDER BY tb_aparencia.fk_marcas,tb_produtos.prd_referencia";
	var produtos = db.execute(query);
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return produtos;
}

function selectProductById(prdid, ep_id, tabelapreco){
	db = dbLoad();
	query = "SELECT tb_produtos.fk_categorias,
		tb_categoria_marca.fk_template,
		tb_info_produtos.fk_cores,
		tb_produtos.prd_referencia, 
		tb_produtos.prd_id, 
		tb_produtos.prd_icms, 
		tb_produtos.prd_ipi, 
		tb_produtos.prd_nome, 
		tb_produtos.prd_nome_colecao, 
		tb_produtos.prd_dados_tecnicos, 
		tb_produtos.prd_dados_composicao, 
		tb_produtos.prd_dados_descricao, 
		tb_produtos.prd_data_inicio, 
		tb_produtos.prd_data_fim, 
		tb_produtos.prd_data_prazo,
		tb_produtos.prd_codigo_barra,
		( SELECT MIN(tb_info_produtos.ifp_valor_" + tabelapreco + " ) AS minValor 
		FROM tb_info_produtos 
		WHERE ( tb_info_produtos.fk_produtos = tb_produtos.prd_id ) ) AS minValor, 
		( SELECT MAX(tb_info_produtos.ifp_valor_" + tabelapreco + " ) AS maxValor  
		FROM tb_info_produtos 
		WHERE ( tb_info_produtos.fk_produtos = tb_produtos.prd_id ) ) AS maxValor 
		FROM tb_produtos
		INNER JOIN tb_info_produtos ON tb_info_produtos.fk_produtos = tb_produtos.prd_id AND tb_info_produtos.ifp_destaque = 1 
		LEFT JOIN tb_categorias ON tb_categorias.cat_id = tb_produtos.fk_categorias
		LEFT JOIN tb_categorias as sub1 ON sub1.cat_id = tb_categorias.parent
		LEFT JOIN tb_categorias as sub2 ON sub2.cat_id = sub1.parent 
		INNER JOIN tb_categoria_marca ON tb_categoria_marca.fk_categoria 
		IN (tb_categorias.cat_id, sub1.cat_id, sub2.cat_id) AND tb_categoria_marca.fk_marca = tb_produtos.fk_marca
		WHERE tb_produtos.ep_id =" + ep_id + " AND tb_produtos.prd_id = " + prdid;
	var produto = db.execute(query);
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return produto;
}

function selectProductsCount(categoria, marca, ep_id) {
	db = dbLoad();	
	var query = "SELECT COUNT(*) AS total
	FROM tb_produtos
	INNER JOIN tb_info_produtos ON tb_info_produtos.fk_produtos = tb_produtos.prd_id
	LEFT JOIN tb_categorias as cat ON cat.cat_id = " + categoria + "
	LEFT JOIN tb_categorias as sub1 ON sub1.parent = cat.cat_id 
	LEFT JOIN tb_categorias as sub2 ON sub2.parent = sub1.cat_id
	WHERE
	tb_produtos.ep_id = " + ep_id + " AND
	tb_produtos.fk_categorias IN (cat.cat_id, sub1.cat_id, sub2.cat_id) AND
	tb_produtos.fk_marca = " + marca + " AND
	tb_produtos.prd_data_inicio <> 0 AND
	tb_produtos.prd_data_fim <> 0 
	GROUP BY tb_info_produtos.fk_produtos";
	Ti.API.info('querycount=' + query);
	var produtos = db.execute(query);
	var count = 0;
	while (produtos.isValidRow()){
		count ++;
		produtos.next();
	}
	var items = count;
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return items;
}

function selectProductsByPage(ep_id, marca, categoria, start, limit) {
	db = dbLoad();
	query = "SELECT	tb_produtos.prd_id, tb_produtos.prd_nome, tb_produtos.prd_referencia, tb_produtos.fk_categorias,tb_produtos.prd_data_inicio,
	tb_produtos.prd_data_fim, tb_produtos.prd_data_prazo, tb_produtos.prd_data_limite, tb_info_produtos.fk_cores, 
	tb_info_produtos.ifp_valor_1, tb_info_produtos.ifp_valor_2, tb_info_produtos.ifp_valor_3
	FROM tb_info_produtos
	INNER JOIN tb_produtos ON tb_produtos.prd_id = tb_info_produtos.fk_produtos 	
	LEFT JOIN tb_categorias as cat ON cat.cat_id = " + categoria + "
	LEFT JOIN tb_categorias as sub1 ON sub1.parent = cat.cat_id 
	LEFT JOIN tb_categorias as sub2 ON sub2.parent = sub1.cat_id
	WHERE tb_produtos.ep_id = " + ep_id + " AND
	tb_produtos.fk_categorias IN (cat.cat_id, sub1.cat_id, sub2.cat_id) AND
	tb_produtos.fk_marca = " + marca + " AND
	tb_produtos.prd_data_inicio <> 0 AND
	tb_produtos.prd_data_fim <> 0 AND
	tb_info_produtos.ifp_destaque = 1
	GROUP BY
	tb_produtos.prd_id
	ORDER BY
	tb_produtos.prd_nome
	LIMIT " + start + ", " + limit+ "";
	Ti.API.info('selectProductsByPage=' + query);
	var produtos = db.execute(query);
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return produtos;
}

function processProdutos(jsonTxt){
	dropProdutos();
	createProdutos();
	var jsonObject = JSON.parse(jsonTxt);
	for (var i = 0; i < jsonObject.length; i++) {
		if (jsonObject[i].prd_excluido == 0) {
			var prd_id = jsonObject[i].prd_id;
			var fk_categorias = jsonObject[i].fk_categorias;
			var prd_nome = jsonObject[i].prd_nome;
			var prd_referencia = jsonObject[i].prd_referencia;
			var prd_sus_trib = jsonObject[i].prd_sus_trib;
			var prd_ipi = jsonObject[i].prd_ipi;
			var prd_icms = jsonObject[i].prd_icms;
			var prd_nome_colecao = jsonObject[i].prd_nome_colecao;
			var prd_dados_tecnicos = jsonObject[i].prd_dados_tecnicos;
			var prd_dados_composicao = jsonObject[i].prd_dados_composicao;
			var prd_dados_descricao = jsonObject[i].prd_dados_descricao;
			var prd_data_inicio = jsonObject[i].prd_data_inicio;
			var prd_data_fim = jsonObject[i].prd_data_fim;
			var prd_data_prazo = jsonObject[i].prd_data_prazo;
			var prd_data_limite = jsonObject[i].prd_data_limite;
			var prd_peso = jsonObject[i].prd_peso;
			var prd_cub_a = jsonObject[i].prd_cub_a;
			var prd_cub_l = jsonObject[i].prd_cub_l;
			var prd_cub_p = jsonObject[i].prd_cub_p;
			var prd_codigo_barra = jsonObject[i].prd_codigo_barra;
			var ep_id = jsonObject[i].ep_id;
			var fk_marca = jsonObject[i].fk_marca;
			var prd_grade = jsonObject[i].prd_grade;
			var fk_ncm = jsonObject[i].fk_ncm;
			var prd_tipo = jsonObject[i].prd_tipo;
			var prd_cota = jsonObject[i].prd_cota;
			insertProdutos(prd_id, fk_categorias, prd_nome, prd_referencia, prd_sus_trib, prd_ipi, prd_icms, prd_nome_colecao, prd_dados_tecnicos, prd_dados_composicao, prd_dados_descricao, prd_data_inicio, prd_data_fim, prd_data_prazo, prd_data_limite, prd_peso, prd_cub_a, prd_cub_l, prd_cub_p, prd_codigo_barra, ep_id, fk_marca, prd_grade, fk_ncm, prd_tipo, prd_cota);
		}
	}
}