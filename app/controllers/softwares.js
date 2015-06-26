var args = arguments[0] || {};

function cristal() {
	Ti.App.Properties.setString(CURRENT_SOFTWARE,1);
	goToMarca();
}

function esmeralda() {
	Ti.App.Properties.setString(CURRENT_SOFTWARE,2);
	goToCatalogo();
}

function rubi() {
	Ti.App.Properties.setString(CURRENT_SOFTWARE,3);
	goToCatalogo();
}

function safira() {
	Ti.App.Properties.setString(CURRENT_SOFTWARE,4);
	goToCatalogo();
}

function goToCatalogo() {
	goTo('seleciona_cliente');
}

function goToMarca() {
	goTo('marca');
}