var args = arguments[0] || {};
Ti.include("/api/config.js");
Ti.include("/database/categorias.js");
Ti.include("/database/aparencia.js");
Ti.include("/database/categoriasmarca.js");

$.logoEmpresa.image = getImagesFolder() + selectLogoFile();
var view;
var menu_visivel = false;
var data = [];
var mc_id = Ti.App.Properties.getString(SELECTED_MARCA);
var empresa = Ti.App.Properties.getString(CURRENT_EMPRESA);
var software = Ti.App.Properties.getString(CURRENT_SOFTWARE);
var categorias = selectAllMenuCategorias(mc_id, empresa, software);
while (categorias.isValidRow()) {
	var cat_id = categorias.fieldByName('cat_id');
	var cat_nome = categorias.fieldByName('cat_nome');
	var fk_template = categorias.fieldByName('fk_template');
	var marca = categorias.fieldByName('fk_marca');

	if (software == 1 || software == 2) {
		data.push({
			"cat_id" : cat_id,
			"marca" : marca,
			"btnmenu" : {
				text : cat_nome
			},
			"template" : "menuTemplateSimple",
			"fk_template" : fk_template
		});
	} else {
		var mc_nome = categorias.fieldByName('mc_nome');
		data.push({
			"cat_id" : cat_id,
			"marca" : marca,
			"btnmenuA" : {
				text : cat_nome
			},
			"btnmenuB" : {
				text : mc_nome
			},
			"template" : "menuTemplateDouble",
			"fk_template" : fk_template
		});

	}

	categorias.next();
}
categorias.close();
$.listaCategorias.sections[0].setItems(data);

function selecionaCategoria(e) {
	menu_visivel = true;
	showMenu();
	var section = $.listaCategorias.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);
	var cat_id = item.cat_id;
	var template = item.fk_template;
	var marca = item.marca;
	Ti.App.Properties.setString(SELECTED_CATEGORY, cat_id);
	var arg = {
		marca : marca,
		cat_id : cat_id,
		template : template
	};

	if (view) {
		Ti.App.fireEvent('removeBitmap', {
			name : 'bar'
		});
		$.corpo.remove(view);
	}
	switch(template) {
	case 1:
		view = Alloy.createController("vitrine_quatro_quadrados", arg).getView();
		break;
	case 2:
		view = Alloy.createController("vitrine_tres_verticais", arg).getView();
		break;
	case 3:
		view = Alloy.createController("vitrine_quatro_verticais", arg).getView();
		break;
	case 4:
		view = Alloy.createController("vitrine_um_horizontal", arg).getView();
		break;
	case 5:
		view = Alloy.createController("vitrine_dois_horizontais", arg).getView();
		break;
	case 6:
		view = Alloy.createController("vitrine_dois_verticais", arg).getView();
		break;
	case 7:
		view = Alloy.createController("vitrine_quatro_horizontais", arg).getView();
		break;
	case 8:
		view = Alloy.createController("vitrine_cinco_verticais", arg).getView();
		break;
	case 9:
		view = Alloy.createController("vitrine_seis_verticais", arg).getView();
		break;
	}
	$.corpo.add(view);
}

goToDestacadas();
function goToDestacadas() {
	menu_visivel = true;
	showMenu();

	if (view) {
		Ti.App.fireEvent('removeBitmap', {
			name : 'bar'
		});
		$.corpo.remove(view);
	}
	view = Alloy.createController("destacadas").getView();
	$.corpo.add(view);
}

function irMenu() {
	goTo('seleciona_cliente');
}

function showMenu() {
	if (menu_visivel) {
		$.lateral.animate({
			curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
			left : "-15%",
			duration : 200,
			image : '/images/setinhaindo.png'
		});
		menu_visivel = false;
	} else {
		$.lateral.animate({
			curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
			left : 0,
			duration : 200,
			image : '/images/setinhavoltando.png'
		});
		menu_visivel = true;
	}
}
