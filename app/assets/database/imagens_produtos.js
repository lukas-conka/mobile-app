function getTableImagensProdutos(){
	return 'tb_imagens_produtos';	
}

function dbLoad(){
	var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));	
	return db;
}
function createImagensProdutos() {
	db = dbLoad();
	db.execute('CREATE TABLE IF NOT EXISTS ' + getTableImagensProdutos() + '(
		id INTEGER PRIMARY KEY, img_id INTEGER, img_caminho TEXT, img_ordem INTEGER,
		img_principal INTEGER, fk_produtos INTEGER, fk_cores INTEGER, ep_id INTEGER
		);');
	db.close();
}

function dropImagensProdutos() {
	db = dbLoad();
	db.execute('DROP TABLE IF EXISTS ' + getTableImagensProdutos());
	db.close();
}

function insertImagensProdutos(img_id, img_caminho, img_ordem, img_principal, fk_produtos, fk_cores, ep_id) {
	db = dbLoad();
	db.execute('INSERT INTO ' + getTableImagensProdutos() + ' (
		img_id, img_caminho, img_ordem, img_principal, fk_produtos, fk_cores, ep_id) 
	VALUES (?,?,?,?,?,?,?)', 
	img_id, img_caminho, img_ordem, img_principal, fk_produtos, fk_cores, ep_id);
	db.close();
}

/*function selectLogoFile(rootDir){	
	db = dbLoad();
	var result;
	var aparencia = db.execute('SELECT apr_arquivo FROM aparencia where fk_marcas = 0 and apr_status = 1 and apr_tipo = "logo"');	
	var apr_arquivo = aparencia.fieldByName('apr_arquivo');	
	var logo = Ti.Filesystem.getFile(rootDir, apr_arquivo);
	if (logo.exists()) {		
		result = logo;
	} 
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return result;
}*/

function selectImagemPrincipal(produto) {
	db = dbLoad();
	var result;
	var imagem = "notfound";
	var infoprodutos = db.execute('SELECT fk_cores FROM tb_info_produtos WHERE fk_produtos = ' + produto + ' AND ifp_destaque = 1 LIMIT 1');
	if(infoprodutos.isValidRow()){
		var corId = infoprodutos.fieldByName('fk_cores');
		//infoprodutos.close();
		var query = 'SELECT img_caminho FROM ' + getTableImagensProdutos() + ' WHERE img_principal = 1 AND fk_produtos = ' + produto
	 	+ ' AND fk_cores = ' + corId + ' LIMIT 1';
		Ti.API.info('selectImagemPrincipal=' + query);
		var imagensprodutos = db.execute(query);	
		if(imagensprodutos.isValidRow()){
			imagem = imagensprodutos.fieldByName('img_caminho');
		}
		if (Ti.Platform.osname == "android") {
			db.close();
		}
	}
	return imagem;
}

function selectImagemVariantePrincipal(produto, corId) {
	db = dbLoad();
	var result = "notfound";
	var imagensprodutos = db.execute('SELECT img_caminho FROM ' + getTableImagensProdutos() + ' WHERE img_principal = 1 AND fk_produtos = ' + produto
	 + ' AND fk_cores = ' + corId + ' LIMIT 1');
	if(imagensprodutos.isValidRow()){
		result = imagensprodutos.fieldByName('img_caminho');
	}
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return result;
}

function selectImagensPorVariante(produto, corId) {
	db = dbLoad();
	var result;
	var imagens = [];
	var imagensprodutos = db.execute('SELECT img_caminho FROM ' + getTableImagensProdutos() + ' WHERE fk_produtos = ' + produto
	 + ' AND fk_cores = ' + corId + ' ORDER BY img_ordem ASC');	
	 while (imagensprodutos.isValidRow()){
	 	var imagem = imagensprodutos.fieldByName('img_caminho');
	 	imagens.push(imagem);
	 	imagensprodutos.next();
	 }
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return imagens;
}

function selectImagensProdutos(produto) {
	db = dbLoad();
	var result;
	var imagens = [];
	var infoprodutos = db.execute('SELECT fk_cores FROM tb_info_produtos WHERE fk_produtos = ' + produto + ' AND ifp_destaque = 1 LIMIT 1');
	var corId = infoprodutos.fieldByName('fk_cores');
	//infoprodutos.close();
	var imagensprodutos = db.execute('SELECT img_caminho FROM ' + getTableImagensProdutos() + ' WHERE img_principal = 0 AND fk_produtos = ' + produto
	 + ' AND fk_cores = ' + corId + ' ORDER BY img_ordem ASC');
	 while (imagensprodutos.isValidRow()){
	 	var imagem = imagensprodutos.fieldByName('img_caminho');
	 	imagens.push(imagem);
	 	imagensprodutos.next();
	 }
	if (Ti.Platform.osname == "android") {
		db.close();
	}	
	return imagens;
}

function selectallImagensProdutos() {
	db = dbLoad();
	var imagensprodutos = db.execute('SELECT img_caminho FROM ' + getTableImagensProdutos());	
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return imagensprodutos;
}

function processImagensProdutos(jsonTxt) {
	dropImagensProdutos();
	createImagensProdutos();
	var jsonObject = JSON.parse(jsonTxt);
	for (var j = 0; j < jsonObject.length; j++) {
		if (jsonObject[j].img_excluido == 0) {
			var img_id = jsonObject[j].img_id;
			var img_caminho = jsonObject[j].img_caminho;
			var img_ordem = jsonObject[j].img_ordem;
			var img_principal = jsonObject[j].img_principal;
			var fk_produtos = jsonObject[j].fk_produtos;
			var fk_cores = jsonObject[j].fk_cores;
			var ep_id = jsonObject[j].ep_id;
			insertImagensProdutos(img_id, img_caminho, img_ordem, img_principal, fk_produtos, fk_cores, ep_id);
		}
	}
}