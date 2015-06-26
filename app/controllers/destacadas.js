var args = arguments[0] || {};
Ti.include("/api/config.js");
Ti.include("/database/aparencia.js");

var mc_id = Ti.App.Properties.getString(SELECTED_MARCA);
var software = Ti.App.Properties.getString(CURRENT_SOFTWARE);

var consulta = consultaImagensConceituais(software, mc_id);
var imagens = [];
var imagem_atual = 0;
var rotate = true;

slideRun();

while (consulta.isValidRow()) {
	var apr_arquivo = consulta.fieldByName('apr_arquivo');
	var dest = Ti.Filesystem.getFile(getImagesFolder(), apr_arquivo);
	if (dest.exists()) {
		imagens.push(apr_arquivo);
	}
	consulta.next();
}

if (imagens.length > 0)
	nextImage();
function nextImage() {
	var imagem = getImagesFolder() + imagens[imagem_atual];
	$.imagem.image = null;
	$.imagem.image = imagem;
	imagem_atual++;
	if (imagem_atual >= imagens.length)
		imagem_atual = 0;
	if (rotate) {
		slideRun();
	}
}

function prevImage() {
	$.imagem.image = getImagesFolder() + imagens[imagem_atual];
	imagem_atual--;
	if (imagem_atual < 0)
		imagem_atual = imagens.length - 1;
}

function nextSlide() {
	stopSlides();
	nextImage();
}

function prevSlide() {
	stopSlides();
	prevImage();
}

function slideRun() {
	setTimeout(function() {
		if (rotate) {
			nextImage();
		}
	}, 2000);
}

function stopSlides() {
	rotate = false;
}

function goToMenu() {
	stopSlides();
	$.imagem.image = null;
	goTo('seleciona_cliente');
}

var eventListener = function() {
	Ti.App.removeEventListener('removeBitmap', eventListener);
	Ti.API.info('Destacadas');
	stopSlides();
	$.imagem.image = null;
};
Ti.App.addEventListener('removeBitmap', eventListener);
