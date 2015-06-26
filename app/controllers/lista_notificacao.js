Ti.include("/api/config.js");
Ti.include("/database/notificacao.js");
Ti.include("/database/aparencia.js");
$.logoEmpresa.image = getImagesFolder() + selectLogoFile();
resultadoNotificacoes();

function resultadoNotificacoes() {
	var notificacoes = selectallNotificacao();
	var data = [];
	while (notificacoes.isValidRow()) {

		var label_data = notificacoes.fieldByName("ntf_data");
		var label_mensagem = notificacoes.fieldByName("ntf_mensagem");

		data.push({
			"label_data" : {
				text : label_data
			},
			"label_mensagem" : {
				text : label_mensagem
			}
		});
		notificacoes.next();
	}
	$.listanotificacoes.sections[0].setItems(data);
}

function voltar() {
	goTo('funcao');
}
