
Ti.include("/api/config.js");
Ti.include("/database/carrinho.js");
// Ir ao video
// Todo: implementar video
function goToVideo(e) {
}

verifyVersions();
//resetSession();

var session = Ti.App.Properties.getString(SESSION_ID);
if (!session) {
	resetSession();
} else if (session == "") {
	resetSession();
}

function verifyVersions() {
	if (Ti.App.Properties.getInt(DATABASE_VERSION) != SOFTWARE_DB_VERSION && Ti.App.Properties.getString(LOGIN) == "true") {
		Ti.App.Properties.setString(SYNC, "false");
		Ti.App.Properties.setInt(DATABASE_VERSION, SOFTWARE_DB_VERSION);
		alert('Os dados do seu aplicativo estão desatualizados, será necessário fazer uma sincronia antes de utilizar o sistema');
	}
}

// Ir a tela de login
// Todo: verificar se está logado, se sim ir para a tela de clientes
function nextStage(e) {
	var login = Ti.App.Properties.getString(LOGIN);
	var sync = Ti.App.Properties.getString(SYNC);
	
	if (login == "true" && sync == "true") {
		if (TEST_VERSION) {
			goToCatalogo();
		}
			
	} else if (login == "true") {
		goToImportar();
	} else {
		goToLogin();
	}
}

function goToLogin() {
	goTo('login');
}

function goToImportar() {
	goTo('importar');
}

function goToCatalogo() {
	goTo('seleciona_cliente');
}

function goToSoftware() {
	goTo('categorias');
}

// Inicia a tela em fullsscreen e com barra oculta
$.index.open({
	fullscreen : true,
	navBarHidden : true
});
