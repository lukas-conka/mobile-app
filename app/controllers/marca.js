Ti.include("/api/config.js");
Ti.include("/database/marcas.js");
Ti.include("/database/aparencia.js");

var scrollView = Ti.UI.createScrollView({
	top : 10,
	left : 0,
	contentWidth : 'auto',
	contentHeight : 'auto',
	showVerticalScrollIndicator : true,
});
$.corpo.add(scrollView);
var y = 0;
var x = 0;
var linha = 0;
var coluna = 0;
var marcas = selectallMarcas(Ti.App.Properties.getString(CURRENT_USER_ID));
var i = 0;
var mc_ids = [];
var software = Ti.App.Properties.getString(CURRENT_SOFTWARE);
while (marcas.isValidRow()) {
	var mc_id = marcas.fieldByName('mc_id');
	var mc_nome = marcas.fieldByName('mc_nome');
	mc_ids.push(mc_id);
	if (coluna > 3) {
		coluna = 0;
		linha++;
	}
	x = 7 + 22 * coluna;
	y = linha * 190;
	var view = Titanium.UI.createView({
		backgroundColor : "#f8f8f8",
		borderColor : "#4e8789",
		borderWidth : "1",
		height : "170",
		top : y,
		left : x + "%",
		width : "20%"
	});
	var label = Titanium.UI.createButton({
		backgroundColor : "#f8f8f8",
		color : "#000000",
		height : "20%",
		title : mc_nome,
		top : "0%",
		width : "100%",
		mc_id : mc_id
	});
	label.index = i;

	var button = Titanium.UI.createImageView({
		//backgroundColor : "transparent",
		color : "#000000",
		image : getImagesFolder() + selectImageMarca(mc_id),
		top : "25%",
		width : "70%",
		mc_id : mc_id
	});
	button.index = i;
	label.addEventListener('click', function(e) {
		Ti.App.Properties.setString(SELECTED_MARCA, e.source.mc_id);
		if (software == 1) {
			goToCliente();
		} else {
			goToCatalogo();
		}
	});
	button.addEventListener('click', function(e) {
		Ti.App.Properties.setString(SELECTED_MARCA, e.source.mc_id);
		if (software == 1) {
			goToCliente();
		} else {
			goToCatalogo();
		}
	});
	view.add(label);
	view.add(button);
	scrollView.add(view);
	coluna++;
	i++;
	marcas.next();
}

function goToCatalogo(e) {
	goTo('categorias');
}

function goToCliente(e) {
	goTo('seleciona_cliente');
}