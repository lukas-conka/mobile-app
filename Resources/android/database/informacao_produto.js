function getTableInformacaoProduto() {
    return "tb_info_produtos";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createInformacaoProduto() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableInformacaoProduto() + "(\n		id INTEGER PRIMARY KEY, ifp_id INTEGER, fk_tamanhos INTEGER,\n		fk_produtos INTEGER, fk_cores INTEGER, ifp_valor_1 FLOAT, ifp_valor_2 FLOAT, ifp_valor_3 FLOAT,\n		ifp_estoque_1 FLOAT, ifp_estoque_2 FLOAT, ifp_estoque_fixo INTEGER, ifp_qtde_minima INTEGER, ifp_destaque INTEGER,\n		ifp_peso INTEGER, ifp_cub_a FLOAT, ifp_cub_l FLOAT, ifp_cub_p FLOAT, ifp_codigo TEXT, ep_id FLOAT\n		);");
    db.close();
}

function dropInformacaoProduto() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableInformacaoProduto());
    db.close();
}

function insertInformacaoProduto(ifp_id, fk_tamanhos, fk_produtos, fk_cores, ifp_valor_1, ifp_valor_2, ifp_valor_3, ifp_estoque_1, ifp_estoque_2, ifp_estoque_fixo, ifp_qtde_minima, ifp_destaque, ifp_peso, ifp_cub_a, ifp_cub_l, ifp_cub_p, ifp_codigo, ep_id) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableInformacaoProduto() + " (\n		ifp_id, fk_tamanhos,\n		fk_produtos, fk_cores, ifp_valor_1, ifp_valor_2, ifp_valor_3,\n		ifp_estoque_1, ifp_estoque_2, ifp_estoque_fixo, ifp_qtde_minima, ifp_destaque,\n		ifp_peso, ifp_cub_a, ifp_cub_l, ifp_cub_p, ifp_codigo, ep_id) \n	VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", ifp_id, fk_tamanhos, fk_produtos, fk_cores, ifp_valor_1, ifp_valor_2, ifp_valor_3, ifp_estoque_1, ifp_estoque_2, ifp_estoque_fixo, ifp_qtde_minima, ifp_destaque, ifp_peso, ifp_cub_a, ifp_cub_l, ifp_cub_p, ifp_codigo, ep_id);
    db.close();
}

function selectallInformacaoProduto() {
    db = dbLoad();
    var informacaoproduto = db.execute("SELECT * FROM " + getTableInformacaoProduto());
    db.close();
    return informacaoproduto;
}

function selectInformacaoProdutoByTamanhoCor(prd_id, tamanhoid, corid) {
    db = dbLoad();
    query = " SELECT \n		tb_info_produtos.fk_tamanhos, \n		tb_info_produtos.ifp_estoque_1, \n		tb_info_produtos.ifp_id, \n		tb_info_produtos.ifp_estoque_2, \n		tb_info_produtos.ifp_valor_1, \n		tb_info_produtos.ifp_valor_2, \n		tb_info_produtos.ifp_valor_3, \n		tb_info_produtos.ifp_estoque_fixo, \n		tb_info_produtos.ifp_qtde_minima, \n		tb_produtos.prd_grade,\n		tb_produtos.prd_tipo FROM tb_info_produtos \n		INNER JOIN tb_produtos ON tb_produtos.prd_id = tb_info_produtos.fk_produtos\n		WHERE \n		tb_info_produtos.fk_produtos = " + prd_id + "\n		AND tb_info_produtos.fk_cores = " + corid + "\n		AND tb_info_produtos.fk_tamanhos = " + tamanhoid;
    var informacaoproduto = db.execute(query);
    db.close();
    return informacaoproduto;
}

function selectInformacaoProdutoByProduct(prd_id, ep_id) {
    db = dbLoad();
    query = " SELECT \n		tb_info_produtos.fk_tamanhos, \n		tb_info_produtos.ifp_estoque_1, \n		tb_info_produtos.ifp_id, \n		tb_info_produtos.ifp_estoque_2, \n		tb_info_produtos.ifp_valor_1, \n		tb_info_produtos.ifp_valor_2, \n		tb_info_produtos.ifp_valor_3, \n		tb_info_produtos.ifp_estoque_fixo, \n		tb_info_produtos.ifp_qtde_minima, \n		tb_produtos.prd_grade,\n		tb_produtos.prd_tipo,\n		tb_tamanhos.tmh_id,\n		tb_tamanhos.tmh_nome,\n		tb_cores.cor_id,\n		tb_cores.cor_nome,\n		tb_info_produtos.fk_cores\n		FROM tb_info_produtos \n		INNER JOIN tb_tamanhos ON tb_tamanhos.tmh_id = tb_info_produtos.fk_tamanhos\n		INNER JOIN tb_cores ON tb_cores.cor_id = tb_info_produtos.fk_cores  \n		INNER JOIN tb_produtos ON tb_produtos.prd_id = tb_info_produtos.fk_produtos\n		WHERE \n		(tb_info_produtos.ep_id = " + ep_id + " ) AND \n		( tb_info_produtos.fk_produtos = " + prd_id + " )\n		ORDER BY tmh_nome ASC";
    var informacaoproduto = db.execute(query);
    db.close();
    return informacaoproduto;
}

function processInformacaoProduto(jsonTxt) {
    dropInformacaoProduto();
    createInformacaoProduto();
    var jsonObject = JSON.parse(jsonTxt);
    for (var i = 0; i < jsonObject.length; i++) if (0 == jsonObject[i].ifp_excluido) {
        var ifp_id = jsonObject[i].ifp_id;
        var fk_tamanhos = jsonObject[i].fk_tamanhos;
        var fk_produtos = jsonObject[i].fk_produtos;
        var fk_cores = jsonObject[i].fk_cores;
        var ifp_valor_1 = jsonObject[i].ifp_valor_1;
        var ifp_valor_2 = jsonObject[i].ifp_valor_2;
        var ifp_valor_3 = jsonObject[i].ifp_valor_3;
        var ifp_estoque_1 = jsonObject[i].ifp_estoque_1;
        var ifp_estoque_2 = jsonObject[i].ifp_estoque_2;
        var ifp_estoque_fixo = jsonObject[i].ifp_estoque_fixo;
        var ifp_qtde_minima = jsonObject[i].ifp_qtde_minima;
        var ifp_destaque = jsonObject[i].ifp_destaque;
        var ifp_peso = jsonObject[i].ifp_peso;
        var ifp_cub_a = jsonObject[i].ifp_cub_a;
        var ifp_cub_l = jsonObject[i].ifp_cub_l;
        var ifp_cub_p = jsonObject[i].ifp_cub_p;
        var ifp_codigo = jsonObject[i].ifp_codigo;
        var ep_id = jsonObject[i].ep_id;
        insertInformacaoProduto(ifp_id, fk_tamanhos, fk_produtos, fk_cores, ifp_valor_1, ifp_valor_2, ifp_valor_3, ifp_estoque_1, ifp_estoque_2, ifp_estoque_fixo, ifp_qtde_minima, ifp_destaque, ifp_peso, ifp_cub_a, ifp_cub_l, ifp_cub_p, ifp_codigo, ep_id);
    }
}