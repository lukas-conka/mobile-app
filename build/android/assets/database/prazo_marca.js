function getTablePrazoMarca(){return"tb_prazo_marca"}function dbLoad(){var e=Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));return e}function createPrazoMarca(){db=dbLoad(),db.execute("CREATE TABLE IF NOT EXISTS "+getTablePrazoMarca()+"(\n		id INTEGER PRIMARY KEY, pm_id INTEGER, fk_prazo INTEGER, fk_marca INTEGER,\n		ep_id INTEGER\n		);"),db.close()}function dropPrazoMarca(){db=dbLoad(),db.execute("DROP TABLE IF EXISTS "+getTablePrazoMarca()),db.close()}function insertPrazoMarca(e,i,t,o){db=dbLoad(),db.execute("INSERT INTO "+getTablePrazoMarca()+" (\n		pm_id, fk_prazo, fk_marca, ep_id) \n	VALUES (?,?,?,?,?,?,?)",e,i,t,o),db.close()}function selectallPrazoMarca(){db=dbLoad();var e=db.execute("SELECT * FROM "+getTablePrazoMarca());return db.close(),e}function processPrazoMarca(e){dropPrazoMarca(),createPrazoMarca();for(var i=JSON.parse(e),t=0;t<i.length;t++){var o=i[t].pm_id,a=i[t].fk_prazo,l=i[t].fk_marca,r=i[t].ep_id;insertPrazoMarca(o,a,l,r)}}