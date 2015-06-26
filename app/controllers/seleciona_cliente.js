var args = arguments[0] || {};
Ti.include("/api/menu.js");
Ti.include("/api/config.js");
Ti.include("/database/clientes.js");
Ti.include("/database/aparencia.js");
var clientes;

$.logoEmpresa.image = getImagesFolder() + selectLogoFile();

var software = Ti.App.Properties.getString(CURRENT_SOFTWARE);

// Funcao chamada quando um item da lista é clicado
// todo: terminar funcao, colocar os outros itens e funcoes
function menuClick(e) {
	Ti.API.info(e.itemIndex);
	if(e.itemIndex == 1 || e.itemIndex == 2 || e.itemIndex == 3 || e.itemIndex == 4){
		if(Ti.App.Properties.getList(SELECTED_CLIENTS)){
			var conjunto = Ti.App.Properties.getList(SELECTED_CLIENTS);
			for(var quantidade = 0; quantidade < conjunto.length; quantidade++){
			
			}
			if(quantidade == 0){
				alert("É necessário a seleção de um cliente ou mais para seguir em diante!");
			}else{
				menuSelection(e.itemIndex);
			}
		}else{
			alert("É necessário a seleção de um cliente ou mais para seguir em diante!");
		}
	}else{
		menuSelection(e.itemIndex);
	}
}

function buscaCliente(e) {
	if ($.buscaRazao.value.length != 0) {
		var search = $.buscaRazao.value;
		clientes = selectClientesByRazao(search);
		resultadoCliente(clientes);
	} else if($.buscaCnpj.value.length != 0) {
		var search = $.buscaCnpj.value;
		clientes = selectClientesByCnpj(search);
		resultadoCliente(clientes);
	} else if($.buscaErp.value.length != 0) {
		var search = $.buscaErp.value;
		clientes = selectClientesByErp(search);
		resultadoCliente(clientes);
	} else {
		alert('Favor preencher o campo de busca');
	}
}

function buscaAlfabetica(){
	var win = Titanium.UI.currentWindow;
	if (Ti.Platform.osname == "android") {
		var letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	} else {
		var letras = ["A","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];	
	}
	var dialog = Titanium.UI.createOptionDialog({
    	options: letras,
    	destructive: 2,
    	cancel: 0,
    	title: "Buscar por ordem alfabética"
	});
	
	dialog.show();	

	dialog.addEventListener("click",function(e){
		var clientes = selectClientesByAlfabetica(letras[e.index]);
		resultadoCliente(clientes);
	});
}	

function resultadoCliente(clientes){
	var template = [];
	if(Ti.App.Properties.getList(SELECTED_CLIENTS)){
		var conjunto = Ti.App.Properties.getList(SELECTED_CLIENTS);
		for(var quantidade = 0; quantidade < conjunto.length; quantidade++){
			if(quantidade == 0){
				if(Ti.App.Properties.getString(CURRENT_SOFTWARE) != 3){
					template[conjunto[quantidade]] = "clientes_base";
				}else{
					template[conjunto[quantidade]] = "clientes_selecionado";
				}
			}else{
				template[conjunto[quantidade]] = "clientes_selecionado";
			}
		}
	}
	
	var data = [];
	while (clientes.isValidRow()) {
		var cl_id = clientes.fieldByName('cl_id');
		var razao = clientes.fieldByName('cl_razao');
		var cnpj = clientes.fieldByName('cl_cnpj');
		var bairro = clientes.fieldByName('cl_bairro_unid');
		var cidade = clientes.fieldByName('cl_cidade_unid');
		
		Ti.API.info(razao);
		
		if(!template[cl_id]){
			template[cl_id] = "clientes_naoselecionado";
		}
		var largura_botao;
			if (Ti.Platform.osname == "android") {
		largura_botao = "11%";
		} else {
			largura_botao = "9%";
		}
		
		data.push({
			"cl_id":cl_id,
			"label_razao":{ text: razao },
			"label_cnpj":{ text: cnpj },
			"label_bairro":{ text: bairro },
			"label_cidade":{ text: cidade },
			"btn_selecionar":{ width: largura_botao },
       		"template":template[cl_id]    
		});
		clientes.next();
	}
	$.listaClientes.sections[0].setItems(data);
}

function selecionaCliente(e) {
	var section = $.listaClientes.sections[e.sectionIndex];
    var item = section.getItemAt(e.itemIndex);
	var id = item.cl_id;
	
	var template = addSelectedClients(id);
	
	if(template == "amarelo"){
		item.template = "clientes_base";
		section.updateItemAt(e.itemIndex, item);
	}else if(template == "vermelho"){
		item.template = "clientes_selecionado";
		section.updateItemAt(e.itemIndex, item);
		Ti.API.info(getSelectedClients());
	}
}

function removeClienteSelecionado(e){
	var section = $.listaClientes.sections[e.sectionIndex];
    var item = section.getItemAt(e.itemIndex);
	var id = item.cl_id;
	
	delSelectedClients(id);
	
	item.template = "clientes_naoselecionado";
	section.updateItemAt(e.itemIndex,item);
}

function removeClienteBase(e){
	var section = $.listaClientes.sections[e.sectionIndex];
    var item = section.getItemAt(e.itemIndex);
	var id = item.cl_id;
	
	var conjunto = Ti.App.Properties.getList(SELECTED_CLIENTS);
	for(var quantidade = 0; quantidade < conjunto.length; quantidade++){
		
	}
	
	if(quantidade == 1){
		delSelectedClients(id);
		item.template = "clientes_naoselecionado";
		section.updateItemAt(e.itemIndex,item);	
	}
}
