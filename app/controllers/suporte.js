Ti.include("/api/config.js");
Ti.include("/database/aparencia.js");
$.logoEmpresa.image = getImagesFolder() + selectLogoFile();
function voltar() {
	goTo('funcao');
}