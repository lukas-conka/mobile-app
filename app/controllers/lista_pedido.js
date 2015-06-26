Ti.include("/api/config.js");
Ti.include("/database/pedido.js");

Ti.include("/database/aparencia.js");
$.logoEmpresa.image = getImagesFolder() + selectLogoFile();

resultadoPedidos();

function resultadoPedidos() {
	var pedidos = consultaPedidos();
	var data = [];
	while (pedidos.isValidRow()) {
		var id = pedidos.fieldByName("ped_id");
		var numero = pedidos.fieldByName("ped_numero");
		var cnpj = pedidos.fieldByName("cl_cnpj");
		var razao = pedidos.fieldByName("cl_razao");
		var ped_data = pedidos.fieldByName("ped_data");
		var date;
		
		if ((new RegExp(' ')).test(ped_data)) {
			var tmp = ped_data.split(" ");
			date = new Date(tmp[0]);
		} else {
			date = ped_data;
		}
		var data_text = date.getDate() + " de " + getMonth(date.getMonth() + 1) + " de " + date.getFullYear();
		data.push({
			ped_id:id,
			"label_numero" : {
				text : numero
			},
			"label_cnpj" : {
				text : cnpj
			},
			"label_razao" : {
				text : razao
			},
			"label_data" : {
				text : data_text
			},
			"label_representante" : {
				text : Ti.App.Properties.getString(CURRENT_USER_NAME)
			}
		});

		Ti.API.info(razao);
		pedidos.next();
	}
	$.listapedidos.sections[0].setItems(data);
}

function enviaEmail() {

}

var view;

function exibeDetalhes(e){
	var section = $.listapedidos.sections[e.sectionIndex];
    var item = section.getItemAt(e.itemIndex);
	var pedido = item.ped_id;
	
	var arg = {
		ped_id:pedido
	};
	
	var load = Alloy.createController("detalhe",arg).getView();
	load.open({
		fullscreen : true,
		navBarHidden : true
	});
}

function voltar() {
	goTo('funcao');
}
