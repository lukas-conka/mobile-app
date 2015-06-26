var args = arguments[0] || {};
Ti.include("/api/config.js");
Ti.include("/database/aparencia.js");
Ti.include("/database/pedido.js");
Ti.include("/database/clientes.js");
Ti.include("/api/menu.js");

$.logoEmpresa.image = getImagesFolder() + selectLogoFile();

// Funcao chamada quando um item da lista é clicado
// todo: terminar funcao, colocar os outros itens e funcoes
function menuClick(e) {
	Ti.API.info(e.itemIndex);
	if (e.itemIndex == 1 || e.itemIndex == 2 || e.itemIndex == 3 || e.itemIndex == 4) {
		if (Ti.App.Properties.getList(SELECTED_CLIENTS)) {
			var conjunto = Ti.App.Properties.getList(SELECTED_CLIENTS);
			for (var quantidade = 0; quantidade < conjunto.length; quantidade++) {

			}
			if (quantidade == 0) {
				alert("É necessário a seleção de um cliente ou mais para seguir em diante!");
			} else {
				menuSelection(e.itemIndex);
			}
		} else {
			alert("É necessário a seleção de um cliente ou mais para seguir em diante!");
		}
	} else {
		menuSelection(e.itemIndex);
	}
}

function datePicker(e) {
	var selection = e.source;
	var today = new Date();
	
	var win = Ti.UI.createWindow({
		exitOnClose : false,
		backgroundColor : 'gray',
		layout : 'vertical'
	});

	var picker = Ti.UI.createPicker({
		type : Ti.UI.PICKER_TYPE_DATE,
		minDate : new Date(2013, 0, 1),
		maxDate : today,
		value : today,
		top : 50,
		buttonNames : ['Ok']
	});

	var btncatDone = Ti.UI.createButton({
		title : '  OK  ',
		style : 1,
		borderRadius: 9,
		font:{fontSize: 25
		},
		backgroundColor: "white",
		color: "#336633"
	});
	btncatDone.addEventListener('click', function(e) {
		win.close();
	});
	win.add(picker);
	win.add(btncatDone);
	win.open();
	
	var dia = checkdecimal(today.getDate());
	var mes = checkdecimal(today.getMonth() + 1);
	var ano = today.getFullYear();
	selection.title = ano + "-" + mes + "-" + dia;

	picker.addEventListener('change', function(e) {
		var current = Titanium.UI.currentWindow;
		var dia = checkdecimal(e.value.getDate());
		var mes = checkdecimal(e.value.getMonth() + 1);
		var ano = e.value.getFullYear();
		selection.title = ano + "-" + mes + "-" + dia;
	});
}

function listaPedidos() {
	if ($.datainicio.title != 'yyyy-mm-dd' && $.datafim.title != 'yyyy-mm-dd') {
		var inicio = $.datainicio.title;
		var fim = $.datafim.title;
		var pedidos = consultaPedidosPorData(inicio, fim);
		var data = [];
		var count = 0;
		while(pedidos.isValidRow()){
			count++;
			var id = pedidos.fieldByName("ped_id");
			var numero = pedidos.fieldByName("ped_numero");
			var cnpj = pedidos.fieldByName("cl_cnpj");
			var razao = pedidos.fieldByName("cl_razao");
			var ped_data = pedidos.fieldByName("ped_data");
			var tmp = ped_data.split(" ");
			var date = new Date(tmp[0]);
			var data_text = date.getDate() + " de " + getMonth(date.getMonth() + 1) + " de " + date.getFullYear();
			data.push({
				ped_id:id,
				"label_numero":{
					text:"Nº " + numero
				},
				"label_data":{
					text:cnpj
				},
				"label_razao":{
					text:razao
				},
				"label_cnpj":{
					text:data_text
				}
			});
			pedidos.next();
		}
		$.listapedidos.sections[0].setItems(data);
		if(count==0){
			alert('Nenhum pedido encontrado no periodo selecionado');
		}
	} else {
		alert('Por favor, selecione as datas para o filtro');
	}
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
