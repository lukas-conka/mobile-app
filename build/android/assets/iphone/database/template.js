function getTableTemplate(){return"tb_templates"}function dbLoad(){var e=Ti.Database.open(Ti.App.Properties.getString(DATABASE_FILE));return e}function createTemplate(){db=dbLoad(),db.execute("CREATE TABLE IF NOT EXISTS "+getTableTemplate()+"(\n		id INTEGER PRIMARY KEY, tpl_id INTEGER, tpl_nome TEXT, tpl_numero_produtos INTEGER, tpl_disposicao_produtos TEXT, tpl_caminho_template TEXT, ep_id INTEGER\n		);"),db.close()}function dropTemplate(){db=dbLoad(),db.execute("DROP TABLE IF EXISTS "+getTableTemplate()),db.close()}function insertTemplate(e,i,t,o,a,l){db=dbLoad(),db.execute("INSERT INTO "+getTableTemplate()+" (\n		tpl_id, tpl_nome, tpl_numero_produtos, tpl_disposicao_produtos, tpl_caminho_template, ep_id) \n	VALUES (?,?,?,?,?,?)",e,i,t,o,a,l),db.close()}function selectallTemplate(){db=dbLoad();var e=db.execute("SELECT * FROM "+getTableTemplate());return"android"==Ti.Platform.osname&&db.close(),e}function processTemplate(e){dropTemplate(),createTemplate();for(var i=JSON.parse(e),t=0;t<i.length;t++){var o=i[t].tpl_id,a=i[t].tpl_nome,l=i[t].tpl_numero_produtos,r=i[t].tpl_disposicao_produtos,_=i[t].tpl_caminho_template,d=i[t].ep_id;insertTemplate(o,a,l,r,_,d)}}