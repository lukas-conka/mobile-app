function getTableCarrinho() {
    return "tb_carrinho";
}

function selecionaCarrinhoById(id) {
    db = dbLoad();
    var query = "SELECT DISTINCT car.car_id as car_id, car.fk_usu as fk_usu, img.img_caminho as img_caminho, prod.prd_sus_trib as prd_sus_trib,car.car_ipi as car_ipi, car.car_icms as car_icms,car.fk_cores AS fk_cores, car.car_entrega as car_entrega, car.car_entrega_prazo as car_entrega_prazo, prod.prd_id as prd_id,prod.prd_ipi,prod.prd_referencia as prd_referencia,prod.prd_nome_colecao as prd_nome_colecao, prod.prd_grade as prd_grade, prod.prd_data_inicio as prd_data_inicio, prod.prd_data_fim as prd_data_fim, prod.prd_data_prazo as prd_data_prazo, prod.prd_data_limite as prd_data_limite,ifp.ifp_peso as prd_peso,ifp.ifp_cub_a as prd_cub_a,ifp.ifp_cub_l as prd_cub_l,ifp.ifp_cub_p as prd_cub_p,prod.fk_categorias as prd_cat,ifp.ifp_codigo, tm.tmh_nome as tmh_nome,car.car_preco_unitario as car_preco_unitario,car.car_quantidade as car_quantidade,  ( SELECT SUM(tb_carrinho.car_quantidade) FROM tb_carrinho  WHERE ( tb_carrinho.fk_produtos = prod.prd_id ) ) as car_quantidade2,car.fk_cli as fk_cli, car.car_replica as car_replica,  prod.prd_nome as prd_nome,car.car_session_id as car_session_id,car.fk_tamanhos as fk_tamanhos,tm.tmh_id as tmh_id,car.fk_produtos AS fk_produtos, ifp.ifp_estoque_2 as estoque2,ifp.ifp_estoque_2 as ifp_estoque_2,ifp.ifp_qtde_minima as qtde_minima,( SELECT SUM(tb_info_produtos.ifp_estoque_fixo) FROM tb_info_produtos WHERE (tb_info_produtos.ep_id = car.ep_id) AND ( tb_info_produtos.fk_produtos = prod.prd_id ) AND tb_info_produtos.ifp_excluido = 0) as estoque_fixo,tb_cores.cor_nome as cor_nome,( SELECT SUM(tb_carrinho.car_preco_unitario*tb_info_produtos.ifp_estoque_fixo) FROM tb_carrinho INNER JOIN tb_info_produtos ON tb_info_produtos.fk_produtos = tb_carrinho.fk_produtos AND tb_info_produtos.fk_cores = tb_carrinho.fk_cores AND tb_info_produtos.fk_tamanhos = tb_carrinho.fk_tamanhos WHERE ( tb_carrinho.fk_produtos = prod.prd_id ) AND (tb_carrinho.car_session_id = car.car_session_id)) as soma_preco_unit,tb_cliente.cl_credito_total as cl_credito_total,tb_cliente.cl_credito_utilizado as cl_credito_utilizado,apr.apr_arquivo,cm.fk_template FROM tb_carrinho as car LEFT JOIN tb_imagens_produtos as img  ON img.fk_produtos = car.fk_produtos AND img.fk_cores = car.fk_cores AND img.img_principal = 1   LEFT JOIN tb_info_produtos as ifp ON ( ifp.fk_produtos = car.fk_produtos ) AND ( ifp.fk_cores = car.fk_cores ) AND ( ifp.fk_tamanhos = car.fk_tamanhos ) INNER JOIN tb_cores ON tb_cores.cor_id = car.fk_cores LEFT JOIN tb_cliente ON tb_cliente.cl_id = car.fk_cli LEFT JOIN tb_estados es ON es.es_sigla = tb_cliente.cl_uf_unid INNER JOIN tb_produtos as prod ON prod.prd_id = car.fk_produtos AND prod.prd_referencia = prod.prd_referencia INNER JOIN tb_categorias as cat ON cat.cat_id = prod.fk_categorias INNER JOIN tb_aparencia as apr ON apr.fk_marcas = prod.fk_marca AND apr_tipo = 'logo' AND apr_status = '1' INNER JOIN tb_categoria_marca as cm ON cm.fk_categoria = prod.fk_categorias AND cm.fk_marca = prod.fk_marca,tb_tamanhos as tm WHERE car.fk_tamanhos = tm.tmh_id AND prod.prd_id = car.fk_produtos AND prod.prd_referencia = prod.prd_referencia AND fk_cli = " + id;
    Ti.API.info(query);
    var carrinho = db.execute(query);
    "android" == Ti.Platform.osname && db.close();
    return carrinho;
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createCarrinho() {
    db = dbLoad();
    db.execute("DROP TABLE tb_carrinho");
    db.execute("CREATE TABLE tb_carrinho (\n		id INTEGER PRIMARY KEY, car_id INTEGER, car_session_id TEXT, car_quantidade INTEGER, car_preco_unitario TEXT, car_ipi TEXT, car_icms TEXT,\n		car_entrega TEXT, car_entrega_prazo TEXT, car_status INTEGER, car_data DATE, car_replica INTEGER, fk_usu INTEGER, fk_produtos INTEGER,\n		fk_tamanhos INTEGER, fk_cores INTEGER, fk_cli INTEGER, ep_id INTEGER, car_desc_unit INTEGER\n		);");
    db.close();
}

function dropCarrinho() {
    db = dbLoad();
    db.close();
}

function resetCarrinho() {
    db = dbLoad();
    db.execute("DELETE FROM " + getTableCarrinho());
    db.close();
}

function insertCarrinho(car_session_id, car_quantidade, car_preco_unitario, car_ipi, car_icms, car_entrega, car_entrega_prazo, car_status, car_data, car_replica, fk_usu, fk_produtos, fk_tamanhos, fk_cores, fk_cli, ep_id, car_desc_unit) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableCarrinho() + " (\n		car_session_id, car_quantidade, car_preco_unitario, car_ipi, car_icms, car_entrega, car_entrega_prazo, \n	car_status, car_data, car_replica, fk_usu, fk_produtos, fk_tamanhos, fk_cores, fk_cli, ep_id, car_desc_unit) \n	VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", car_session_id, car_quantidade, car_preco_unitario, car_ipi, car_icms, car_entrega, car_entrega_prazo, car_status, car_data, car_replica, fk_usu, fk_produtos, fk_tamanhos, fk_cores, fk_cli, ep_id, car_desc_unit);
    db.close();
}

function updateCarrinho(car_id, car_session_id, car_quantidade, car_entrega, car_entrega_prazo, car_status, car_data, car_replica) {
    db = dbLoad();
    var query = "UPDATE " + getTableCarrinho() + " SET car_session_id = '" + car_session_id + "', car_quantidade = " + car_quantidade + ", car_entrega = " + car_entrega + ", car_entrega_prazo = " + car_entrega_prazo + ", car_status = " + car_status + ", car_data = " + car_data + ", car_replica = " + car_replica + " WHERE car_id =" + car_id;
    Ti.API.info("query=" + query);
    db.execute(query);
    db.close();
}

function updateCarrinho_car_desc_unit() {
    "UPDATE " + getTableCarrinho() + " SET car_session_id = '" + car_session_id + "', car_quantidade = " + car_quantidade + ", car_entrega = " + car_entrega + ", car_entrega_prazo = " + car_entrega_prazo + ", car_status = " + car_status + ", car_data = " + car_data + ", car_replica = " + car_replica + " WHERE car_id =" + car_id;
}

function updateCarrinhoQuantidade(car_id, quantidade) {
    db = dbLoad();
    var query = "UPDATE " + getTableCarrinho() + " SET car_quantidade = " + quantidade + " WHERE car_id = " + car_id;
    db.execute(query);
    db.close();
}

function excluidCarrinho(car_id) {
    db = dbLoad();
    var query = "DELETE FROM " + getTableCarrinho() + " WHERE car_id = " + car_id;
    db.execute(query);
    db.close();
}

function selectCarrinhoByTamanhoCor(tmh_id, cor_id, fk_cli) {
    db = dbLoad();
    var query = "SELECT id, fk_produtos, car_quantidade, car_preco_unitario, car_ipi, car_icms, car_entrega, car_entrega_prazo from " + getTableCarrinho() + " WHERE fk_tamanhos = " + tmh_id + " AND fk_cores = " + cor_id + " AND fk_cli = " + fk_cli;
    var carrinho = db.execute(query);
    "android" == Ti.Platform.osname && db.close();
    return carrinho;
}

function selectCarrinhoByProductTamanhoCor(prd_id, tmh_id, cor_id, fk_cli) {
    db = dbLoad();
    var query = "SELECT tb_carrinho.car_id, tb_carrinho.car_quantidade, tb_carrinho.car_preco_unitario, tb_carrinho.car_ipi, tb_carrinho.car_icms, tb_carrinho.car_entrega, tb_carrinho.car_entrega_prazo, tb_info_produtos.ifp_estoque_2 from " + getTableCarrinho() + " INNER JOIN tb_info_produtos ON tb_info_produtos.fk_produtos = tb_carrinho.fk_produtos WHERE tb_carrinho.fk_produtos = " + prd_id + " AND tb_carrinho.fk_tamanhos = " + tmh_id + " AND tb_carrinho.fk_cores = " + cor_id + " AND tb_carrinho.fk_cli = " + fk_cli + " AND tb_info_produtos.fk_cores = " + cor_id + " AND tb_info_produtos.fk_tamanhos = " + tmh_id;
    var carrinho = db.execute(query);
    "android" == Ti.Platform.osname && db.close();
    var car_id = 0;
    var quantidade_atual = 0;
    var estoque = 0;
    Ti.API.info("query=" + query);
    if (carrinho.isValidRow()) {
        var car_id = carrinho.fieldByName("car_id");
        var quantidade_atual = carrinho.fieldByName("car_quantidade");
        var estoque = carrinho.fieldByName("ifp_estoque_2");
    }
    db.close();
    return [ car_id, quantidade_atual, estoque ];
}

function updateCarrinhoPeriod(car_id, periodo, prazo) {
    db = dbLoad();
    var query = "UPDATE tb_carrinho SET car_entrega = '" + periodo + "', car_entrega_prazo = '" + prazo + "' WHERE car_id = " + car_id;
    db.execute(query);
    db.close();
}

function selectallCarrinho() {
    db = dbLoad();
    var carrinho = db.execute("SELECT * FROM " + getTableCarrinho());
    "android" == Ti.Platform.osname && db.close();
    return carrinho;
}

function processCarrinho() {
    createCarrinho();
}

function consultaCarrinhoByPagamento(sessao, cliente) {
    db = dbLoad();
    var carrinho = db.execute("SELECT tb_carrinho.car_quantidade,tb_carrinho.car_preco_unitario,tb_carrinho.car_ipi FROM tb_carrinho WHERE tb_carrinho.fk_cli = " + cliente);
    "android" == Ti.Platform.osname && db.close();
    return carrinho;
}

function consultaFinalCarrinho(sessao, cliente) {
    db = dbLoad();
    var result = [];
    var carrinho = db.execute("SELECT * FROM " + getTableCarrinho() + " WHERE " + getTableCarrinho() + ".fk_cli = " + cliente + " AND tb_carrinho.car_quantidade > 0");
    count = 0;
    while (carrinho.isValidRow()) {
        result[count] = [];
        result[count][0] = carrinho.fieldByName("car_quantidade");
        result[count][1] = carrinho.fieldByName("car_preco_unitario");
        result[count][2] = carrinho.fieldByName("car_ipi");
        result[count][3] = carrinho.fieldByName("car_icms");
        result[count][4] = carrinho.fieldByName("car_entrega");
        result[count][5] = carrinho.fieldByName("car_entrega_prazo");
        result[count][6] = carrinho.fieldByName("car_data");
        result[count][7] = carrinho.fieldByName("fk_produtos");
        result[count][8] = carrinho.fieldByName("fk_tamanhos");
        result[count][9] = carrinho.fieldByName("fk_cores");
        count++;
        carrinho.next();
    }
    db.close();
    return result;
}

function selecionaCarrinho() {
    db = dbLoad();
    var query = "SELECT DISTINCT \n     car.car_id as car_id, \n     car.fk_usu as fk_usu,\n     img.img_caminho as img_caminho,\n     prod.prd_sus_trib as prd_sus_trib,\n     car.car_ipi as car_ipi,\n     car.car_icms as car_icms,\n                                        car.fk_cores AS fk_cores, \n                                        car.car_entrega as car_entrega, \n                                        car.car_entrega_prazo as car_entrega_prazo, \n                                        prod.prd_id as prd_id,\n                                        prod.prd_ipi,\n                                        prod.prd_referencia as prd_referencia,\n                                        prod.prd_nome_colecao as prd_nome_colecao, \n                                        prod.prd_grade as prd_grade, \n                                        prod.prd_data_inicio as prd_data_inicio, \n                                        prod.prd_data_fim as prd_data_fim, \n                                        prod.prd_data_prazo as prd_data_prazo, \n                                        prod.prd_data_limite as prd_data_limite,\n                                        ifp.ifp_peso as prd_peso,\n                                        ifp.ifp_cub_a as prd_cub_a,\n                                        ifp.ifp_cub_l as prd_cub_l,\n                                        ifp.ifp_cub_p as prd_cub_p,\n                                        prod.fk_categorias as prd_cat,\n                                        ifp.ifp_codigo,\n                                        tm.tmh_nome as tmh_nome,\n                                        car.car_preco_unitario as car_preco_unitario,\n                                        car.car_quantidade as car_quantidade,  \n                                        ( SELECT SUM(tb_carrinho.car_quantidade) FROM tb_carrinho \n                                                     WHERE ( tb_carrinho.fk_produtos = prod.prd_id ) \n                                             ) as car_quantidade2,\n                                        car.fk_cli as fk_cli,    \n                                        car.car_replica as car_replica,  \n                                        prod.prd_nome as prd_nome,\n                                        car.car_session_id as car_session_id,\n                                        car.fk_tamanhos as fk_tamanhos,\n                                        tm.tmh_id as tmh_id,\n                                        car.fk_produtos AS fk_produtos, \n                                        ifp.ifp_estoque_2 as estoque2,\n                                        ifp.ifp_estoque_2 as ifp_estoque_2,\n                                        ifp.ifp_qtde_minima as qtde_minima,\n                                        ( SELECT SUM(tb_info_produtos.ifp_estoque_fixo) FROM tb_info_produtos \n                                                WHERE (tb_info_produtos.ep_id = car.ep_id) AND\n                                                                ( tb_info_produtos.fk_produtos = prod.prd_id ) AND\n                                                                tb_info_produtos.ifp_excluido = 0\n                                        ) as estoque_fixo,\n                                        tb_cores.cor_nome as cor_nome,\n                                        ( SELECT SUM(tb_carrinho.car_preco_unitario*tb_info_produtos.ifp_estoque_fixo) \n                                                FROM \n                                                        tb_carrinho \n                                                        INNER JOIN tb_info_produtos ON tb_info_produtos.fk_produtos = tb_carrinho.fk_produtos AND tb_info_produtos.fk_cores = tb_carrinho.fk_cores AND tb_info_produtos.fk_tamanhos = tb_carrinho.fk_tamanhos\n                                                WHERE \n                                                        ( tb_carrinho.fk_produtos = prod.prd_id ) AND\n                                                (tb_carrinho.car_session_id = car.car_session_id)\n                                        ) as soma_preco_unit,\n                                        tb_cliente.cl_credito_total as cl_credito_total,\n                                        tb_cliente.cl_credito_utilizado as cl_credito_utilizado,\n                                        apr.apr_arquivo,\n                                        cm.fk_template\n                                FROM\n                                    tb_carrinho as car\n                                    LEFT JOIN tb_imagens_produtos as img  ON img.fk_produtos = car.fk_produtos AND img.fk_cores = car.fk_cores AND img.img_principal = 1   \n                                    LEFT JOIN tb_info_produtos as ifp ON ( ifp.fk_produtos = car.fk_produtos ) AND ( ifp.fk_cores = car.fk_cores ) AND ( ifp.fk_tamanhos = car.fk_tamanhos )\n                                    INNER JOIN tb_cores ON tb_cores.cor_id = car.fk_cores\n                                    LEFT JOIN tb_cliente ON tb_cliente.cl_id = car.fk_cli\n                                    LEFT JOIN tb_estados es ON es.es_sigla = tb_cliente.cl_uf_unid\n                                    INNER JOIN tb_produtos as prod ON prod.prd_id = car.fk_produtos AND prod.prd_referencia = prod.prd_referencia\n                                    INNER JOIN tb_categorias as cat ON cat.cat_id = prod.fk_categorias\n                                    INNER JOIN tb_aparencia as apr ON apr.fk_marcas = prod.fk_marca AND apr_tipo = 'logo' AND apr_status = '1'\n                                    INNER JOIN tb_categoria_marca as cm ON cm.fk_categoria = prod.fk_categorias AND cm.fk_marca = prod.fk_marca,\n                                    tb_tamanhos as tm\n                                WHERE\n                                    car.fk_tamanhos = tm.tmh_id AND \n                                    prod.prd_id = car.fk_produtos AND \n                                    prod.prd_referencia = prod.prd_referencia\n                                    ";
    Ti.API.info(query);
    var carrinho = db.execute(query);
    "android" == Ti.Platform.osname && db.close();
    return carrinho;
}