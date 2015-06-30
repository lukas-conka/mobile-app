


//outro teste
//teste do lucas 

var args = arguments[0] || {};
Ti.include("/database/imagens_produtos.js");
Ti.include("/database/aparencia.js");
Ti.include("/api/config.js");

var rootDir = getImagesFolder();
var downloadQueue = [];
var totalimages = 0;
var xhrRequest = [];
var xhrCount = 0;

/*while (images.isValidRow()) {
 var img_tmp = images.fieldByName('img_caminho');
 var img_caminho = img_tmp.replace(/ /g,"%20");
 Ti.API.info(img_caminho);
 var dest = Ti.Filesystem.getFile(rootDir, img_caminho);
 if (!dest.exists()) {
 totalimages++;
 downloadQueue.push(URL_CAMINHO_IMAGENS + img_caminho);
 }
 images.next();
 }*/

var images = selectallImagensProdutos();
while (images.isValidRow()) {
	var img_tmp = images.fieldByName('img_caminho');
	var img_caminho = img_tmp.replace(/ /g, "%20");
	var dest = Ti.Filesystem.getFile(rootDir, img_caminho);
	if (!dest.exists()) {
		totalimages++;
		downloadQueue.push(URL_CAMINHO_IMAGENS + img_caminho);
	}
	images.next();
}
images.close();

var aparencias = selectallAparencia();
while (aparencias.isValidRow()) {
	var img_tmp = aparencias.fieldByName('apr_arquivo');
	var img_caminho = img_tmp.replace(/ /g, "%20");
	var dest = Ti.Filesystem.getFile(rootDir, img_caminho);
	if (!dest.exists()) {
		totalimages++;
		downloadQueue.push(URL_CAMINHO_IMAGENS + img_caminho);
	}
	aparencias.next();
}
aparencias.close();

loadthenextFile();

function goToClient() {
	$.activityIndicator.setMessage("Download de imagens concluido");
	goTo('seleciona_cliente');
}

function goToSoftware() {
	$.activityIndicator.setMessage("Download de imagens concluido");
	goTo('softwares');
}

function retrieveData(params) {
	var url = params.URL;

	xhrRequest[xhrCount] = Ti.Network.createHTTPClient({
		timeout : 5000
	});

	xhrRequest[xhrCount].onerror = function() {
		xhrRequest[xhrCount] = null;
		Ti.API.info('Erro ao Baixar Imagem=' + url);
		xhrCount++;
		loadthenextFile();
	};
	xhrRequest[xhrCount].onload = function() {
		SaveFile(params.folderName, params.fileName, this.responseData);
		xhrRequest[xhrCount] = null;
		loadthenextFile();
	};

	try {
		xhrRequest[xhrCount].open('GET', url);
		xhrRequest[xhrCount].send();
	} catch(e) {
		xhrRequest[xhrCount] = null;
		Ti.API.info('Erro ao Baixar Imagem=' + url);
		xhrCount++;
		loadthenextFile();
	};

};

function loadthenextFile() {
	if (xhrCount > 0) {
		downloadQueue[xhrCount - 1] == null;
	}

	if (xhrCount < downloadQueue.length) {
		var fileUrl = downloadQueue[xhrCount];

		var fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
		fileName = fileName;

		retrieveData({
			URL : fileUrl,
			fileName : fileName,
			folderName : rootDir
		});

		xhrCount++;
		$.activityIndicator.setMessage("Baixando imagem " + xhrCount + " de " + totalimages + "...");
	} else {
		Ti.App.Properties.setString(SYNC, "true");
		Ti.App.Properties.setInt(DATABASE_VERSION, SOFTWARE_DB_VERSION);
		if (TEST_VERSION)
			goToSoftware();
		else
			goToClient();
	}
};

function SaveFile(foldername, filename, response) {

	var dest = Ti.Filesystem.getFile(rootDir, filename);
	dest.write(response);

}

function showIndicator(e) {
	$.activityIndicator.show();
}