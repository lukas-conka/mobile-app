Ti.include("/api/config.js");
Ti.include("/database/video.js");
Ti.include("/database/aparencia.js");
$.logoEmpresa.image = getImagesFolder() + selectLogoFile();
resultadovideos();
function resultadovideos() {
	var videos = selectallVideo();
	var data = [];
	while (videos.isValidRow()) {

		var v_link = videos.fieldByName("v_link");
		var v_titulo = videos.fieldByName("v_titulo");
		var v_descricao = videos.fieldByName("v_descricao");

		data.push({
			"v_link" : v_link,
			"v_titulo" : {
				text : v_titulo
			},
			"v_descricao" : {
				text : v_descricao
			}
		});

		videos.next();
	}
	$.listavideos.sections[0].setItems(data);
}

function selecionavideo(e) {
	var selecao = $.listavideos.sections[e.sectionIndex];
	var item = selecao.getItemAt(e.itemIndex);
	var link = item.v_link;

	if (!(new RegExp('http')).test(link)) {
		link = 'http://' + link;
	}
	if (Ti.Platform.osname == "android") {
		var intent = Ti.Android.createIntent({
			action : Ti.Android.ACTION_VIEW,
			data : link
		});
		Ti.Android.currentActivity.startActivity(intent);

	} else {
		Ti.Platform.openURL(link);
	}

}

function voltar() {
	goTo('funcao');
}

function irSelecionados() {
	goTo('calculadora');
}