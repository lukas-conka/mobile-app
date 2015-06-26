// Zera as variaveis
var args = arguments[0] || {};
Ti.include("/api/config.js");

$.activityIndicator.hide();

if (TEST_VERSION) {
	$.loginChave.value = '1003';
	$.loginUsuario.value = 'teste';
	$.loginSenha.value = '123';
}

function login(e) {

	if ($.loginChave.value.length == 0 || $.loginUsuario.value.length == 0 || $.loginSenha.value.length == 0) {
		alert('Favor preencher os dados corretamente');
	} else {
		$.activityIndicator.show();
		var url = URL_LOGIN;
		var chave = $.loginChave.value;
		var usuario = $.loginUsuario.value;
		var senha = $.loginSenha.value;
		var param = {
			"ecatalogos_representante_chave" : chave,
			"ecatalogos_representante_usuario" : usuario,
			"ecatalogos_representante_senha" : senha
		};

		var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function(e) {
			loginError();
		};

		xhr.onload = function() {
			processResult(this.responseText);
		};

		try {
			xhr.open("POST", url);
			xhr.send(param);
		} catch(e) {
			loginError();
		};
	}
}

function processResult(jsonTxt) {
	var jsonObject = JSON.parse(jsonTxt);

	var success = jsonObject.success;

	if (success == "true") {
		var idusuario = jsonObject.idusuario;
		var nomecompleto = jsonObject.nomecompleto;
		var emailusuario = jsonObject.emailusuario;
		var idempresa = jsonObject.idempresa;
		var politica = jsonObject.politica;
		var filename = jsonObject.filename;

		Ti.App.Properties.setString(LOGIN, "true");
		Ti.App.Properties.setString(CURRENT_USER_ID, idusuario);
		Ti.App.Properties.setString(CURRENT_USER_NAME, nomecompleto);
		Ti.App.Properties.setString(CURRENT_USER_EMAIL, emailusuario);
		Ti.App.Properties.setString(CURRENT_EMPRESA, idempresa);
		Ti.App.Properties.setString(CURRENT_SOFTWARE, politica);
		Ti.App.Properties.setString(SYNC_FILE, filename);

		goToImportar();
	} else {
		$.activityIndicator.hide();
		alert("Usuário, chave ou senha inválidos!");
	}
}

// Funcao que chama a tela de selecionar os clientes, a tela do menu
function goToImportar(e) {
	var importar = Alloy.createController("importar").getView();
	importar.open({
		fullscreen : true,
		navBarHidden : true
	});
}

// Volta para o index, onde tem a opcao do video e ir ao catalogo
function goToIndex(e) {
	var index = Alloy.createController("index").getView();
	index.open({
		fullscreen : true,
		navBarHidden : true
	});
}

function loginError() {
	$.activityIndicator.hide();
	alert('Falha de comunicação');
}