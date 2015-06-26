Ti.include("/api/config.js");
Ti.include("/database/clientes.js");
Ti.include("/database/aparencia.js");
$.logoEmpresa.image = getImagesFolder() + selectLogoFile();
resultadoclientes();
function resultadoclientes() {
	var clientes = consultaTodosClientes();
	var data = [];
	while (clientes.isValidRow()) {

		var cl_id = clientes.fieldByName("cl_id");
		var cl_razao = clientes.fieldByName("cl_razao");
		var cl_fantasia = clientes.fieldByName("cl_fantasia");
		var cl_cnpj = clientes.fieldByName("cl_cnpj");

		data.push({
			"cl_id" : cl_id,
			"cl_razao" : {
				text : cl_razao
			},
			"cl_fantasia" : {
				text : cl_fantasia
			},
			"cl_cnpj" : {
				text : cl_cnpj
			}
		});

		clientes.next();
	}
	$.listaclientes.sections[0].setItems(data);
}

function selecionacliente(e) {


}

function voltar() {
	goTo('funcao');
}

function irSelecionados() {
	goTo('calculadora');
}