var args = arguments[0] || {};
Ti.include("/api/config.js");
Ti.include("/database/aparencia.js");
Ti.include("/database/email.js");
Ti.include("/api/menu.js");

$.logoEmpresa.image = getImagesFolder() + selectLogoFile();

var representante = Ti.App.Properties.getString(CURRENT_USER_ID);
var epid =  Ti.App.Properties.getString(CURRENT_EMPRESA);

// Funcao chamada quando um item da lista é clicado
// todo: terminar funcao, colocar os outros itens e funcoes

function menuClick(e) {
	Ti.API.info(e.itemIndex);
	if (e.itemIndex == 1 || e.itemIndex == 2 || e.itemIndex == 3 || e.itemIndex == 4) {
		if (Ti.App.Properties.getList(SELECTED_CLIENTS)) {
			var conjunto = Ti.App.Properties.getList(SELECTED_CLIENTS);
			for (var quantidade = 0; quantidade < conjunto.length; quantidade++) {

			}
			if (quantidade == 0) {
				alert("É necessário a seleção de um cliente ou mais para seguir em diante!");
			} else {
				menuSelection(e.itemIndex);
			}
		} else {
			alert("É necessário a seleção de um cliente ou mais para seguir em diante!");
		}
	} else {
		menuSelection(e.itemIndex);
	}
}

listaEmails();

function listaEmails() {
	var emails = consultaEmail(representante);
	var data = [];
	while (emails.isValidRow()) {
		var em_id = emails.fieldByName("em_id");
		var em_email = emails.fieldByName("em_email");

		data.push({
			em_id : em_id,
			"label_email" : {
				text : em_email
			}
		});
		emails.next();
	}
	$.listaemails.sections[0].setItems(data);
}

var view;

//Função implementada por Carlos Alberto - 1
function novoEmail(e){
	
	var db = dbLoad();
	var txt_email = $.email_valor.value;
	var insert_query = "INSERT INTO tb_email (em_representante, ep_id, em_email) VALUES(" + representante + ", " + epid + ", '" + txt_email + "');";
	var select_query = "SELECT * FROM tb_email;";
	var actionSelect = db.execute(select_query);
	
	var cont = 0;
	
	while(actionSelect.isValidRow()){
		
		if(actionSelect.fieldByName("em_email") == txt_email){
			
			cont++;
			
		}
	
		actionSelect.next();
		
	}
	
	if(cont != 0){
			
		Ti.UI.createAlertDialog({
			
   			message: 'Email ja esta casdastrado!\n'+cont+' registros foram encontrados com esse e-mail!',
    		ok: 'Okay',
   			title: 'Erro, Email!'}
   			
   		).show();
   	
	}else{
		
		db.execute(insert_query);
		listaEmails();
		cont = 0;
		
	}
	
}

//Função implementada por Carlos Alberto - 2
function excluir(e) {
	
	var db = dbLoad();
	var lbl_acoes = $.listaemails.sections[e.sectionIndex];
	var item = lbl_acoes.getItemAt(e.itemIndex);
	var item_id = item.em_id;
	
	var delete_query = "DELETE FROM tb_email WHERE em_id = " + item_id;
	db.execute(delete_query);
	listaEmails();
	
}
