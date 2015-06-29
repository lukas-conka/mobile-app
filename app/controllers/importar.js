var args = arguments[0] || {};
Ti.include("/database/imagens_produtos.js");
Ti.include("/database/aparencia.js");
Ti.include("/api/config.js");

var rootDir = Ti.Filesystem.applicationDataDirectory;
var xhrRequest;

var products = [];
var clientes = [];
Ti.App.Properties.setList(SELECTED_CLIENTS, clientes);
Ti.App.Properties.setList(SELECTED_PRODUCTS, products);

requestFile();
function requestFile() {
	var url = URL_SYNC;
	Ti.API.info('Ti.App.Properties.getString(CURRENT_USER_ID)=' + Ti.App.Properties.getString(CURRENT_USER_ID));
	Ti.API.info('Ti.App.Properties.getString(CURRENT_EMPRESA)=' + Ti.App.Properties.getString(CURRENT_EMPRESA));
	var param = {
		"ecatalogos_representante_id" : Ti.App.Properties.getString(CURRENT_USER_ID),
		"ecatalogos_representante_ep_id" : Ti.App.Properties.getString(CURRENT_EMPRESA)
	};

	var xhr = Titanium.Network.createHTTPClient({
		timeout : 60000
	});
	xhr.onerror = function(e) {
		Ti.API.info('Erro=' + URL_SYNC);
		issueSyncError();
	};

	xhr.onload = function() {
		processResult(this.responseText);
	};

	try {
		xhr.open("POST", url);
		xhr.send(param);
	} catch(e) {
		Ti.API.info('Erro=' + URL_SYNC);
		issueSyncError();
	};
}

function processResult(jsonTxt) {
	var jsonObject = JSON.parse(jsonTxt);

	var success = jsonObject.success;

	if (success == "true") {
		var filename = jsonObject.filename;
		Ti.App.Properties.setString(SYNC_FILE, filename);

		downloadFile();
	} else {
		$.activityIndicator.hide();
		issueSyncError();
	}
}

function retrieveData(params) {
	var url = params.URL;
	Ti.API.info('Sincronizando: ' + url);
	xhrRequest = Ti.Network.createHTTPClient({
		timeout : 5000
	});

	xhrRequest.onerror = function() {
		xhrRequest = null;
		Ti.API.info('Erro ao Sincroniar=' + url);
		issueSyncError();
	};
	xhrRequest.onload = function() {
		SaveFile(params.folderName, params.fileName, this.responseData);
		xhrRequest = null;

		var file = Ti.App.Properties.getString(DATABASE_FILE, 'empty');
		var newfile;
		if (file != 'empty') {
			var db = Ti.Database.open(file);
			db.remove();
			db = null;
			Ti.API.info('currentfile' + file);
			var tmp = file.split("-");
			var version = parseInt(tmp[1]) + 1;
			if (version > 1000)
				version = 1;
			newfile = 'ecatalogos-' + version;

			Ti.API.info('newfile' + version);

		} else {
			newfile = 'ecatalogos-1';
		}
		Ti.API.info('newfile' + newfile);
		Ti.App.Properties.setString(DATABASE_FILE, newfile);

		var dir = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "../Library/Private Documents/");
		var dir_files = dir.getDirectoryListing();
		for (var i = 1; i < dir_files.length; i++) {
			Ti.API.info('file= ' + dir_files[i].toString());
		}
		
		//Foi descomentado pois em device que nao fosse android , nao encontrava o diretorio para importar  as imagens
		if (Ti.Platform.osname != "android") {
		 file = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "../Library/Private Documents/", file + ".sql");
		 if (file) {
		 if (file.exists()) {
		 //file.deleteFile();
		 Ti.API.info('fileexists');
		 }
		 }
		 }

		db = Ti.Database.install(Titanium.Filesystem.applicationDataDirectory + 'database.db', newfile);
		alert(Titanium.Filesystem.applicationDataDirectory );
		db.close();
		db = null;
		verifyImages();
	};

	try {
		xhrRequest.open('GET', url);
		xhrRequest.send();
	} catch(e) {
		xhrRequest = null;
		Ti.API.info('Erro ao Sincroniar=' + url);
		issueSyncError();
	};

};

function downloadFile() {
	var fileUrl = Ti.App.Properties.getString(SYNC_FILE);

	var fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
	fileName = fileName;

	retrieveData({
		URL : fileUrl,
		fileName : fileName,
		folderName : rootDir
	});

	$.activityIndicator.setMessage("Sincronizando...");
};

function SaveFile(foldername, filename, response) {

	var dest = Ti.Filesystem.getFile(rootDir, 'database.db');
	dest.write(response);

}

function showIndicator(e) {
	$.activityIndicator.show();
}

function verifyImages() {
	var rootDir = getImagesFolder();
	var images = selectallImagensProdutos();
	var totalimages = 0;
	while (images.isValidRow()) {
		var img_tmp = images.fieldByName('img_caminho');
		var img_caminho = img_tmp.replace(/ /g, "%20");
		var dest = Ti.Filesystem.getFile(rootDir, img_caminho);
		if (!dest.exists()) {
			totalimages++;
		}
		images.next();
	}
	//images.close();

	var aparencias = selectallAparencia();
	while (aparencias.isValidRow()) {
		var img_tmp = aparencias.fieldByName('apr_arquivo');
		Ti.API.info(img_tmp);
		var img_caminho = img_tmp.replace(/ /g, "%20");
		var dest = Ti.Filesystem.getFile(rootDir, img_caminho);
		if (!dest.exists()) {
			totalimages++;
		}
		aparencias.next();
	}
	//aparencias.close();
	if (totalimages > 0) {
		goTo('baixar_imagens');
	} else {
		goTo('seleciona_cliente');
	}
}

function issueSyncError() {
	Ti.App.Properties.setString(SYNC, "false");
	var alert = Titanium.UI.createAlertDialog({
		title : 'Erro',
		message : 'Falha ao sincronizar!',
		buttonNames : ['Ok'],
		cancel : 0
	});
	alert.addEventListener('click', function(e) {
		goTo('index');
	});
	alert.show();
}