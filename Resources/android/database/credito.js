function dbLoad() {
    var db = Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));
    return db;
}

function createTableCredit() {
    var table_credit_query = "CREATE TABLE IF NOT EXISTS credito (id INTEGER PRIMARY KEY AUTOINCREMENT, fk_id_cliente INTEGER, fk_id_ep INTEGER, fk_id_representante INTEGER, mensagem TEXT);";
    var db = dbLoad();
    db.execute(table_credit_query);
}