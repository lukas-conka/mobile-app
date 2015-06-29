Ti.include("/api/config.js");
Ti.include("/database/pergunta.js");
Ti.include("/database/aparencia.js");
$.logoEmpresa.image = getImagesFolder() + selectLogoFile();
var busca_texto = '';
resultadoperguntas();

var software = Ti.App.Properties.getString(CURRENT_SOFTWARE);

function resultadoperguntas() {
	var count = 0;
	var perguntas = consultaPerguntas(software, busca_texto);
	var data = [];
	while (perguntas.isValidRow()) {
		count++;
		var prg_id = perguntas.fieldByName("prg_id");
		var prg_pergunta = perguntas.fieldByName("prg_pergunta");
		var prg_resposta = perguntas.fieldByName("prg_resposta");

		data.push({
			"prg_id" : prg_id,
			"label_pergunta" : {
				text : count + ": " + prg_pergunta
			},
			"label_resposta" : {
				text : prg_resposta
			}
		});

		perguntas.next();
	}
	$.listaperguntas.sections[0].setItems(data);
}

function buscarperguntas() {
	busca_texto = $.busca_texto.value;
	resultadoperguntas();
	$.busca_texto.value = '';
}

function voltar() {
	goTo('funcao');
}
