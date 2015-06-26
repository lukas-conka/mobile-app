function getTablePedido(){
	return 'tb_pedido';	
}

function dbLoad(){
	var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));	
	return db;
}
function createPedido() {
	db = dbLoad();
	db.execute('CREATE TABLE IF NOT EXISTS ' + getTablePedido() + '(
		id INTEGER PRIMARY KEY, ped_id INTEGER, ped_session_id TEXT, ped_cupom INTEGER, ped_data_pag TEXT, ped_entrega TEXT, ped_entrega_prazo TEXT, ped_data DATE, ped_numero INTEGER, ped_observacao TEXT, ped_status TEXT, fk_cli INTEGER, fk_marcas INTEGER, ep_id INTEGER
		);');
	db.close();
}

function dropPedido() {
	db = dbLoad();
	db.execute('DROP TABLE IF EXISTS ' + getTablePedido());
	db.close();
}

function insertPedido(ped_id, ped_session_id, ped_cupom, ped_data_pag, ped_entrega, ped_entrega_prazo, ped_data, ped_exportado, ped_numero, ped_observacao, ped_status, fk_cli, fk_marcas, ep_id) {
	db = dbLoad();
	db.execute('INSERT INTO ' + getTablePedido() + ' (
		ped_id, ped_session_id, ped_cupom, ped_data_pag, ped_entrega, ped_entrega_prazo, ped_data, ped_exportado, ped_numero, ped_observacao, ped_status, fk_cli, fk_marcas, ep_id) 
	VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
		ped_id, ped_session_id, ped_cupom, ped_data_pag, ped_entrega, ped_entrega_prazo, ped_data, ped_exportado, ped_numero, ped_observacao, ped_status, fk_cli, fk_marcas, ep_id);
	db.close();
}

function selectallPedido() {
	db = dbLoad();
	var pedido = db.execute('SELECT * FROM' + getTablePedido() + 'ORDER BY ped_numero DESC');	
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return pedido;
}

function processPedido(jsonTxt) {
	dropPedido();
	createPedido();
	var jsonObject = JSON.parse(jsonTxt);
	for (var j = 0; j < jsonObject.length; j++) {
		var ped_id = jsonObject[j].ped_id;
		var ped_session_id = jsonObject[j].ped_session_id;
		var ped_cupom = jsonObject[j].ped_cupom;
		var ped_data_pag = jsonObject[j].ped_data_pag;
		var ped_entrega = jsonObject[j].ped_entrega;
		var ped_entrega_prazo = jsonObject[j].ped_entrega_prazo;
		var ped_data = jsonObject[j].ped_data;
		var ped_numero = jsonObject[j].ped_numero;
		var ped_observacao = jsonObject[j].ped_observacao;
		var ped_status = jsonObject[j].ped_status;
		var fk_cli = jsonObject[j].fk_cli;
		var fk_marcas = jsonObject[j].fk_marcas;
		var ep_id = jsonObject[j].ep_id;
		insertPedido(ped_id, ped_session_id, ped_cupom, ped_data_pag, ped_entrega, ped_entrega_prazo, ped_data, ped_numero, ped_observacao, ped_status, fk_cli, fk_marcas, ep_id);
	}
}

function consultaPedidosBySession(session){
	db = dbLoad();
	var pedidos = [];
	var query = 'SELECT ped_id FROM ' + getTablePedido() + ' WHERE ped_session_id = "' + session + '"';
	var result = db.execute(query);
	while(result.isValidRow()){
		pedidos.push(result.fieldByName('ped_id'));
		result.next();
	}
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return pedidos;
}

function consultaPedidos(){
	db = dbLoad();
	var pedido = db.execute('SELECT tb_pedido.*,tb_cliente.cl_razao,tb_cliente.cl_cnpj, tb_pedido.ped_data FROM ' + getTablePedido() + 
	' INNER JOIN tb_cliente ON tb_cliente.cl_id = tb_pedido.fk_cli ' 
	+ ' ORDER BY ped_id DESC');
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return pedido;
}

function consultaPedidoTotalizacao(sessao){
	db = dbLoad();
	var pedido = db.execute("SELECT tb_pedido.ped_id,tb_pedido.ped_numero,tb_cliente.cl_cnpj FROM tb_pedido INNER JOIN tb_cliente ON tb_cliente.cl_id = tb_pedido.fk_cli WHERE tb_pedido.ped_session_id = '" + sessao + "'");
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return pedido;
}

function consultaPedidosPorData(inicio,fim){
	db = dbLoad();
	var query = "SELECT tb_pedido.*,tb_cliente.cl_razao,tb_cliente.cl_cnpj, tb_pedido.ped_data " + 
	"FROM " + getTablePedido() + " " + 	
	"INNER JOIN tb_cliente ON tb_cliente.cl_id = tb_pedido.fk_cli " +
	"WHERE ped_data BETWEEN '" + inicio + "' AND '" + fim + "' " +
	" ORDER BY ped_id DESC";
	Ti.API.info('query=' + query);
	var pedido = db.execute(query);
	if (Ti.Platform.osname == "android") {
		db.close();
	}
	return pedido;
}

function consultaUltimoPedido(){
	db = dbLoad();
	var pedido = db.execute("SELECT " + getTablePedido() + ".ped_id," + getTablePedido() + ".ped_id FROM " + getTablePedido() + " ORDER BY " + getTablePedido() + ".ped_id DESC LIMIT 1");
	var result = 0;
	if(pedido.isValidRow()){
		result = pedido.fieldByName("ped_id")
	}
	db.close();
	return result;
}
