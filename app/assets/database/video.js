function getTableVideo(){
	return 'tb_video';	
}

function dbLoad(){
	var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));	
	return db;
}
function createVideo() {
	db = dbLoad();
	db.execute('CREATE TABLE IF NOT EXISTS ' + getTableVideo() + '(
		id INTEGER PRIMARY KEY, v_id INTEGER, v_link INTEGER, v_titulo TEXT,
		v_descricao TEXT, v_grupo INTEGER, ep_id INTEGER, fk_marcas INTEGER
		);');
	db.close();
}

function dropVideo() {
	db = dbLoad();
	db.execute('DROP TABLE IF EXISTS ' + getTableVideo());
	db.close();
}

function insertVideo(v_id, v_link, v_titulo, v_descricao, v_grupo, ep_id, fk_marcas) {
	db = dbLoad();
	db.execute('INSERT INTO ' + getTableVideo() + ' (
		v_id, v_link, v_titulo, v_descricao, v_grupo, ep_id, fk_marcas) 
	VALUES (?,?,?,?,?,?,?)', 
	v_id, v_link, v_titulo, v_descricao, v_grupo, ep_id, fk_marcas);
	db.close();
}

function selectallVideo() {
	db = dbLoad();
	var video = db.execute('SELECT * FROM ' + getTableVideo());	
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return video;
}

function processVideo(jsonTxt) {
	dropVideo();
	createVideo();
	var jsonObject = JSON.parse(jsonTxt);
	for (var j = 0; j < jsonObject.length; j++) {
			var v_id = jsonObject[j].v_id;
			var v_link = jsonObject[j].v_link;
			var v_titulo = jsonObject[j].v_titulo;
			var v_descricao = jsonObject[j].v_descricao;
			var v_grupo = jsonObject[j].v_grupo;
			var ep_id = jsonObject[j].ep_id;
			var fk_marcas = jsonObject[j].fk_marcas;
			insertVideo(v_id, v_link, v_titulo, v_descricao, v_grupo, ep_id, fk_marcas);
	}
}