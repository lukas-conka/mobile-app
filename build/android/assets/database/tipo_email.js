function getTableTipoEmail(){return"tb_tipo_email"}function dbLoad(){var e=Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));return e}function createTipoEmail(){db=dbLoad(),db.execute("CREATE TABLE IF NOT EXISTS "+getTableTipoEmail()+"(\n		id INTEGER PRIMARY KEY, te_id INTEGER, te_nome TEXT, ep_id INTEGER\n		);"),db.close()}function dropTipoEmail(){db=dbLoad(),db.execute("DROP TABLE IF EXISTS "+getTableTipoEmail()),db.close()}function insertTipoEmail(e,i,t){db=dbLoad(),db.execute("INSERT INTO "+getTableTipoEmail()+" (\n		tpfn_id, tpfn_nome) \n	VALUES (?,?,?)",e,i,t),db.close()}function selectallTipoEmail(){db=dbLoad();var e=db.execute("SELECT * FROM "+getTableTipoEmail());return db.close(),e}function processTipoEmail(e){dropTipoEmail(),createTipoEmail();for(var i=JSON.parse(e),t=0;t<i.length;t++){var o=i[t].te_id,a=i[t].te_nome,l=i[t].ep_id;insertTipoEmail(o,a,l)}}