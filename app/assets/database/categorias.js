function getTableCategorias(){
	return 'tb_categorias';	
}

function dbLoad(){
	var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));	
	return db;
}
function createCategorias() {
	db = dbLoad();
	db.execute('CREATE TABLE IF NOT EXISTS ' + getTableCategorias() + '(
		id INTEGER PRIMARY KEY, cat_id INTEGER, cat_nome TEXT, ep_id INTEGER, cod_categora TEXT, parent INTEGER
		);');
	db.close();
}

function dropCategorias() {
	db = dbLoad();
	db.execute('DROP TABLE IF EXISTS ' + getTableCategorias());
	db.close();
}

function insertCategorias(cat_id, cat_nome, ep_id, parent) {
	db = dbLoad();
	db.execute('INSERT INTO ' + getTableCategorias() + ' (
		cat_id, cat_nome, ep_id, parent) 
	VALUES (?,?,?,?)', 
	cat_id, cat_nome, ep_id, parent);
	db.close();
}

function selectallCategorias() {
	db = dbLoad();
	var categorias = db.execute('SELECT * FROM ' + getTableCategorias());	
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return categorias;
}

/*function selectallMenuCategorias(marca) {
	db = dbLoad();
	var catmarca = db.execute('SELECT fk_categoria FROM categoriasmarca where fk_marca = ' + marca);
	var cat = [];
	while (catmarca.isValidRow()) {		
		cat.push(catmarca.fieldByName('fk_categoria'));
		catmarca.next();
	}	
	Ti.API.info('SELECT cat_id, cat_nome FROM ' + getTableCategorias() + ' where cat_id in (' + cat.toString() + ') ORDER BY "cat_nome" ASC');
	var categorias = db.execute('SELECT cat_id, cat_nome FROM ' + getTableCategorias() + ' where cat_id in (' + cat.toString() + ') ORDER BY "cat_nome" ASC');	
	db.close();
	return categorias;
}*/

function selectAllMenuCategorias(marca, ep_id, software) {
	db = dbLoad();
	var query;
	Ti.API.info('softsw=' + software);
	switch(software) {
		case '3':
			query = softwareThree(ep_id);
		break;
		case '4':
			query = softwareFour(ep_id);
		break;
		default:
		Ti.API.info('aqui=');
			query = softwareTwo(marca,ep_id);
		break;
	}
	Ti.API.info('query=' + query);	
	var categorias = db.execute(query);
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return categorias;							
}

function softwareFour(ep_id){
	query = "SELECT 
    tb_categorias.*, tb_marcas.mc_nome, tb_categoria_marca.fk_marca, tb_categoria_marca.fk_template
    FROM tb_categorias
	LEFT JOIN tb_categorias as sub1 ON sub1.parent = tb_categorias.cat_id
	LEFT JOIN tb_categorias as sub2 ON sub2.parent = sub1.cat_id
	INNER JOIN tb_categoria_marca ON tb_categoria_marca.fk_categoria = tb_categorias.cat_id
	INNER JOIN tb_produtos ON tb_produtos.fk_categorias IN (tb_categorias.cat_id, sub1.cat_id, sub2.cat_id) 
	AND tb_produtos.fk_marca = tb_categoria_marca.fk_marca
	INNER JOIN tb_marcas ON tb_marcas.mc_id = tb_categoria_marca.fk_marca
	WHERE tb_categorias.ep_id = " + ep_id + "
	GROUP BY tb_categoria_marca.catm_id
	ORDER BY tb_marcas.mc_nome ASC,
	tb_categorias.cat_nome ASC";
	return query;
}

function softwareThree(ep_id){
	var tmp = Ti.App.Properties.getList(SELECTED_CLIENTS);
	var clientes = tmp.toString();
	query = "SELECT 
    tb_categorias.*, tb_marcas.mc_nome, tb_categoria_marca.fk_marca, tb_categoria_marca.fk_template
	FROM tb_categorias 
	LEFT JOIN tb_categorias as sub1 ON sub1.parent = tb_categorias.cat_id
	LEFT JOIN tb_categorias as sub2 ON sub2.parent = sub1.cat_id
	INNER JOIN tb_cliente ON tb_cliente.cl_id IN (" + clientes + ")
	INNER JOIN tb_cliente_marca ON tb_cliente_marca.fk_cliente = tb_cliente.cl_id
	INNER JOIN tb_categoria_marca ON tb_categoria_marca.fk_marca = tb_cliente_marca.fk_marca 
	AND tb_categoria_marca.fk_categoria = tb_categorias.cat_id
	INNER JOIN tb_produtos ON tb_produtos.fk_categorias IN (tb_categorias.cat_id, sub1.cat_id, sub2.cat_id) 
	AND tb_produtos.fk_marca = tb_categoria_marca.fk_marca
	INNER JOIN tb_marcas ON tb_marcas.mc_id = tb_cliente_marca.fk_marca
	WHERE tb_categorias.ep_id = " + ep_id + "
	GROUP BY tb_categorias.cat_id, tb_marcas.mc_id 
	ORDER BY tb_marcas.mc_nome ASC, tb_categorias.cat_nome ASC";
	return query;
}

function softwareTwo(marca, ep_id){
	query = "SELECT tb_categoria_marca.fk_marca, tb_categoria_marca.fk_template, tb_categorias.* " +
	"FROM tb_categorias " + 
	"LEFT JOIN tb_categorias as sub1 ON sub1.parent = tb_categorias.cat_id " +
	"LEFT JOIN tb_categorias as sub2 ON sub2.parent = sub1.cat_id " +
	" INNER JOIN tb_categoria_marca ON tb_categoria_marca.fk_marca = " + marca + " AND tb_categoria_marca.fk_categoria = tb_categorias.cat_id " +
	"INNER JOIN tb_produtos ON tb_produtos.fk_categorias IN (tb_categorias.cat_id, sub1.cat_id, sub2.cat_id) " + 
	"AND tb_produtos.fk_marca = tb_categoria_marca.fk_marca " +  
	"GROUP BY tb_categorias.cat_id " +
	"ORDER BY cat_nome";
	return query;
}

function processCategorias(jsonTxt) {
	dropCategorias();
	createCategorias();
	var jsonObject = JSON.parse(jsonTxt);
	for (var j = 0; j < jsonObject.length; j++) {
		if (jsonObject[j].cat_visivel == 0 && jsonObject[j].cat_excluido == 0) {			
			var cat_id = jsonObject[j].cat_id;
			var cat_nome = capitalizeFirstLetter(jsonObject[j].cat_nome);
			var ep_id = jsonObject[j].ep_id;
			var parent = jsonObject[j].parent;
			insertCategorias(cat_id, cat_nome, ep_id, parent);
		}
	}
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}