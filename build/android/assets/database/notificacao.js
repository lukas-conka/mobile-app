function getTableNotificacao(){return"tb_notificacao"}function dbLoad(){var e=Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));return e}function createNotificacao(){db=dbLoad(),db.execute("CREATE TABLE IF NOT EXISTS "+getTableNotificacao()+"(\n		id INTEGER PRIMARY KEY, ntf_id INTEGER, ntf_representante INTEGER, ntf_mensagem TEXT,\n		ntf_data TEXT, ntf_status INTEGER, ntf_grupo INTEGER, ep_id INTEGER\n		);"),db.close()}function dropNotificacao(){db=dbLoad(),db.execute("DROP TABLE IF EXISTS "+getTableNotificacao()),db.close()}function insertNotificacao(e,i,t,o,a,l,r){db=dbLoad(),db.execute("INSERT INTO "+getTableNotificacao()+" (\n		ntf_id, ntf_representante, ntf_mensagem,	ntf_data, ntf_status, ntf_grupo, ep_id) \n	VALUES (?,?,?,?,?,?,?)",e,i,t,o,a,l,r),db.close()}function selectallNotificacao(){db=dbLoad();var e="SELECT ntf_id,ntf_mensagem,ntf_data,ntf_status FROM tb_notificacao ORDER BY ntf_id DESC",i=db.execute(e);return db.close(),i}function processNotificacao(e){dropNotificacao(),createNotificacao();for(var i=JSON.parse(e),t=0;t<i.length;t++){var o=i[t].ntf_id,a=i[t].ntf_representante,l=i[t].ntf_mensagem,r=i[t].ntf_data,_=i[t].ntf_status,d=i[t].ntf_grupo,s=i[t].ep_id;insertNotificacao(o,a,l,r,_,d,s)}}