function getTableClientes() {
    return "tb_cliente";
}

function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createClientes() {
    db = dbLoad();
    db.execute("CREATE TABLE IF NOT EXISTS " + getTableClientes() + "(\n		id INTEGER PRIMARY KEY, cl_id INTEGER, cl_nome_comprador TEXT, cl_cargo TEXT,\n		cl_razao TEXT, cl_fantasia TEXT, cl_unidade TEXT, cl_cnpj TEXT, cl_ie TEXT,\n		cl_fone TEXT, cl_ddd TEXT, cl_cep_fa TEXT, cl_end_fa TEXT,\n		cl_n_fa TEXT, cl_comp_fa TEXT, cl_bairro_fa TEXT, cl_cidade_fa TEXT, cl_uf_fa TEXT,\n		cl_fone_fa FLOAT, cl_fax_fa FLOAT, email_cad TEXT, cl_entrega INTEGER, cl_data INTEGER,\n		fk_rp INTEGER, preco_1 INTEGER, preco_2 INTEGER, preco_3 INTEGER, cl_credito_total FLOAT, cl_credito_utilizado FLOAT,\n		cl_cep_unid TEXT, cl_end_unid TEXT, cl_n_unid TEXT, cl_comp_unid TEXT, cl_bairro_unid, TEXT, cl_cidade_unid TEXT, cl_uf_unid TEXT,\n		cl_fone_unid TEXT, cl_fax_unid TEXT, cl_tipo TEXT, cl_email_add1 TEXT, cl_email_add2 TEXT, ep_id INTEGER, cl_valor_minimo FLOAT, cl_status INTEGER, cl_cod_erp INTEGER, cl_aviso INTEGER, cl_observacao TEXT\n		);");
    db.close();
}

function dropClientes() {
    db = dbLoad();
    db.execute("DROP TABLE IF EXISTS " + getTableClientes());
    db.close();
}

function insertClientes(cl_id, cl_nome_comprador, cl_cargo, cl_razao, cl_fantasia, cl_unidade, cl_cnpj, cl_ie, cl_fone, cl_ddd, cl_cep_fa, cl_end_fa, cl_n_fa, cl_comp_fa, cl_bairro_fa, cl_cidade_fa, cl_uf_fa, cl_fone_fa, cl_fax_fa, email_cad, cl_entrega, cl_data, fk_rp, preco_1, preco_2, preco_3, cl_credito_total, cl_credito_utilizado, cl_cep_unid, cl_end_unid, cl_n_unid, cl_comp_unid, cl_bairro_unid, cl_cidade_unid, cl_uf_unid, cl_fone_unid, cl_fax_unid, cl_tipo, cl_email_add1, cl_email_add2, ep_id, cl_valor_minimo, cl_status, cl_cod_erp, cl_aviso, cl_observacao) {
    db = dbLoad();
    db.execute("INSERT INTO " + getTableClientes() + " (\n		cl_id, cl_nome_comprador, cl_cargo,\n		cl_razao, cl_fantasia, cl_unidade, cl_cnpj, cl_ie,\n		cl_fone, cl_ddd, cl_cep_fa, cl_end_fa,\n		cl_n_fa, cl_comp_fa, cl_bairro_fa, cl_cidade_fa, cl_uf_fa,\n		cl_fone_fa, cl_fax_fa, email_cad, cl_entrega, cl_data,\n		fk_rp, preco_1, preco_2, preco_3, cl_credito_total, cl_credito_utilizado,\n		cl_cep_unid, cl_end_unid, cl_n_unid, cl_comp_unid, cl_bairro_unid, cl_cidade_unid, cl_uf_unid, cl_fone_unid, cl_fax_unid, cl_tipo, cl_email_add1, cl_email_add2, ep_id, cl_valor_minimo, cl_status, cl_cod_erp, cl_aviso, cl_observacao) \n	VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", cl_id, cl_nome_comprador, cl_cargo, cl_razao, cl_fantasia, cl_unidade, cl_cnpj, cl_ie, cl_fone, cl_ddd, cl_cep_fa, cl_end_fa, cl_n_fa, cl_comp_fa, cl_bairro_fa, cl_cidade_fa, cl_uf_fa, cl_fone_fa, cl_fax_fa, email_cad, cl_entrega, cl_data, fk_rp, preco_1, preco_2, preco_3, cl_credito_total, cl_credito_utilizado, cl_cep_unid, cl_end_unid, cl_n_unid, cl_comp_unid, cl_bairro_unid, cl_cidade_unid, cl_uf_unid, cl_fone_unid, cl_fax_unid, cl_tipo, cl_email_add1, cl_email_add2, ep_id, cl_valor_minimo, cl_status, cl_cod_erp, cl_aviso, cl_observacao);
    db.close();
}

function selectallClientes() {
    db = dbLoad();
    var clientes = db.execute("SELECT * FROM " + getTableClientes());
    db.close();
    return clientes;
}

function consultaTodosClientes() {
    db = dbLoad();
    var clientes = db.execute("SELECT cl_id, cl_razao, cl_fantasia, cl_cnpj FROM " + getTableClientes() + " ORDER BY cl_razao ASC");
    db.close();
    return clientes;
}

function getClienteNomes(ids) {
    db = dbLoad();
    var clientes = db.execute("SELECT cl_razao, cl_id FROM " + getTableClientes() + " WHERE cl_id IN (" + ids + ") ORDER BY cl_razao ASC");
    db.close();
    return clientes;
}

function getClienteCredito(cliente) {
    db = dbLoad();
    var clientes = db.execute("SELECT cl_razao,cl_credito_total,cl_credito_utilizado,cl_valor_minimo,cl_aviso,cl_observacao FROM " + getTableClientes() + " WHERE cl_id = " + cliente);
    db.close();
    return clientes;
}

function selectClientesByRazao(search) {
    db = dbLoad();
    var clientes = db.execute("SELECT * FROM " + getTableClientes() + " where cl_razao LIKE '%" + search + "%'");
    db.close();
    return clientes;
}

function selectClientesByCnpj(search) {
    db = dbLoad();
    var clientes = db.execute("SELECT * FROM " + getTableClientes() + " where cl_cnpj LIKE '%" + search + "%'");
    db.close();
    return clientes;
}

function selectClientesByErp(search) {
    db = dbLoad();
    var clientes = db.execute("SELECT * FROM " + getTableClientes() + " where cl_cod_erp LIKE '%" + search + "%'");
    db.close();
    return clientes;
}

function selectClientesByAlfabetica(search) {
    db = dbLoad();
    var clientes = db.execute("SELECT * FROM " + getTableClientes() + " where cl_razao LIKE '" + search + "%'");
    db.close();
    return clientes;
}

function consultaCliente(id) {
    db = dbLoad();
    var cliente = db.execute("SELECT cl_cnpj,cl_id FROM " + getTableClientes() + " WHERE cl_id = " + id);
    db.close();
    return cliente;
}

function consultaCredito(id) {
    db = dbLoad();
    var cliente = db.execute("SELECT cl_credito_total, cl_credito_utilizado,cl_valor_minimo FROM " + getTableClientes() + " WHERE cl_id = " + id);
    db.close();
    return cliente;
}

function processClientes(jsonTxt) {
    dropClientes();
    createClientes();
    var jsonObject = JSON.parse(jsonTxt);
    for (var i = 0; i < jsonObject.length; i++) if (0 == jsonObject[i].cl_status) {
        var cl_id = jsonObject[i].cl_id;
        var cl_nome_comprador = jsonObject[i].cl_nome_comprador;
        var cl_cargo = jsonObject[i].cl_cargo;
        var cl_razao = jsonObject[i].cl_razao;
        var cl_fantasia = jsonObject[i].cl_fantasia;
        var cl_unidade = jsonObject[i].cl_unidade;
        var cl_cnpj = jsonObject[i].cl_cnpj;
        var cl_ie = jsonObject[i].cl_ie;
        var cl_fone = jsonObject[i].cl_fone;
        var cl_ddd = jsonObject[i].cl_ddd;
        var cl_cep_fa = jsonObject[i].cl_cep_fa;
        var cl_end_fa = jsonObject[i].cl_end_fa;
        var cl_n_fa = jsonObject[i].cl_n_fa;
        var cl_comp_fa = jsonObject[i].cl_comp_fa;
        var cl_bairro_fa = jsonObject[i].cl_bairro_fa;
        var cl_cidade_fa = jsonObject[i].cl_cidade_fa;
        var cl_uf_fa = jsonObject[i].cl_uf_fa;
        var cl_fone_fa = jsonObject[i].cl_fone_fa;
        var cl_fax_fa = jsonObject[i].cl_fax_fa;
        var email_cad = jsonObject[i].email_cad;
        var cl_entrega = jsonObject[i].cl_entrega;
        var cl_data = jsonObject[i].cl_data;
        var fk_rp = jsonObject[i].fk_rp;
        var preco_1 = jsonObject[i].preco_1;
        var preco_2 = jsonObject[i].preco_2;
        var preco_3 = jsonObject[i].preco_3;
        var cl_credito_total = jsonObject[i].cl_credito_total;
        var cl_credito_utilizado = jsonObject[i].cl_credito_utilizado;
        var cl_cep_unid = jsonObject[i].cl_cep_unid;
        var cl_end_unid = jsonObject[i].cl_end_unid;
        var cl_n_unid = jsonObject[i].cl_n_unid;
        var cl_comp_unid = jsonObject[i].cl_comp_unid;
        var cl_bairro_unid = jsonObject[i].cl_bairro_unid;
        var cl_cidade_unid = jsonObject[i].cl_cidade_unid;
        var cl_uf_unid = jsonObject[i].cl_uf_unid;
        var cl_fone_unid = jsonObject[i].cl_fone_unid;
        var cl_fax_unid = jsonObject[i].cl_fax_unid;
        var cl_tipo = jsonObject[i].cl_tipo;
        var cl_email_add1 = jsonObject[i].cl_email_add1;
        var cl_email_add2 = jsonObject[i].cl_email_add2;
        var ep_id = jsonObject[i].ep_id;
        var cl_valor_minimo = jsonObject[i].cl_valor_minimo;
        var cl_status = jsonObject[i].cl_status;
        var cl_cod_erp = jsonObject[i].cl_cod_erp;
        var cl_aviso = jsonObject[i].cl_aviso;
        var cl_observacao = jsonObject[i].cl_observacao;
        insertClientes(cl_id, cl_nome_comprador, cl_cargo, cl_razao, cl_fantasia, cl_unidade, cl_cnpj, cl_ie, cl_fone, cl_ddd, cl_cep_fa, cl_end_fa, cl_n_fa, cl_comp_fa, cl_bairro_fa, cl_cidade_fa, cl_uf_fa, cl_fone_fa, cl_fax_fa, email_cad, cl_entrega, cl_data, fk_rp, preco_1, preco_2, preco_3, cl_credito_total, cl_credito_utilizado, cl_cep_unid, cl_end_unid, cl_n_unid, cl_comp_unid, cl_bairro_unid, cl_cidade_unid, cl_uf_unid, cl_fone_unid, cl_fax_unid, cl_tipo, cl_email_add1, cl_email_add2, ep_id, cl_valor_minimo, cl_status, cl_cod_erp, cl_aviso, cl_observacao);
    }
}