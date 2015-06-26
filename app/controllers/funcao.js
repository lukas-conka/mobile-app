	Ti.include("/api/config.js");
function goToListaPedido() {
	goTo('lista_pedido');
}

function goToProdutos() {
	goTo('lista_produtos');
}

function goToOffline() {
	goTo('seleciona_cliente');
}

function goToOnline() {
	if (Ti.Platform.osname == "android") {
		var intent = Ti.Android.createIntent({
			action : Ti.Android.ACTION_VIEW,
			data : "http://marcas.e-catalogos.net"
		});
		Ti.Android.currentActivity.startActivity(intent);
	} else {
		Ti.Platform.openURL("http://marcas.e-catalogos.net");
	}
}

function goToSuporte() {
	goTo('suporte');
}

function goToDuvida() {
	goTo('perguntas');
}

function goToRelatorio() {
	//goTo('relatorio');
}

function goToVideo() {
	goTo('lista_video');
}

function goToEmail() {
	var emailDialog = Titanium.UI.createEmailDialog();

	if (!emailDialog.isSupported()) {
		Ti.UI.createAlertDialog({
			title : 'Error',
			message : 'Email não disponível nesse dispositivo'
		}).show();
		return;
	}

	emailDialog.setSubject('Suporte Aplicativo E-Catálogos');
	emailDialog.setToRecipients(['suporte@e-catalogos.net']);
	emailDialog.setMessageBody('');
	emailDialog.setHtml(false);

	emailDialog.addEventListener('complete', function(e) {
		if (e.result == emailDialog.SENT) {
			if (Ti.Platform.osname != 'android') {
				alert("message enviado");
			}
		} else {
			alert("message não foi enviado!");
		}
	});
}

function goToNotificacao() {
	goTo('lista_notificacao');
}

function goToSync() {
	goTo('sincronizacao');
}

function goToClientes() {
	goTo('lista_clientes');
}
