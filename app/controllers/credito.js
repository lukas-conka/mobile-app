var args = arguments[0] || {};
Ti.include("/api/menu.js");
Ti.include("/database/aparencia.js");
Ti.include("/api/config.js");
Ti.include("/database/credito.js");

$.logoEmpresa.image = getImagesFolder() + selectLogoFile();

//Ids do cliente, empresa e representante
var representante = Ti.App.Properties.getString(CURRENT_USER_ID);
var epid =  Ti.App.Properties.getString(CURRENT_EMPRESA);
var clienteid = Ti.App.Properties.getString(SELECTED_CLIENTS);

var data = new Date();
var dia = data.getDate();
var mes = data.getMonth();
var ano = data.getFullYear();
var selected_client = 0;
var clientes = [];
var clientes_nomes = [];
var meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
var pt = dia + " de  " + meses[mes] + " de " + ano;
$.data.text = '  ' + pt;

$.selecao.addEventListener("click", function(e) {
	seleciona_cliente();
});

var result = getClienteNomes(getSelectedClients().toString());

while (result.isValidRow()) {
	clientes.push(result.fieldByName('cl_id'));
	clientes_nomes.push(result.fieldByName('cl_razao'));
	result.next();
}

selection();


function menuClick(e) {
	Ti.API.info(e.itemIndex);
	menuSelection(e.itemIndex);
}

function seleciona_cliente() {
	var win = Titanium.UI.currentWindow;
	var dialog = Titanium.UI.createOptionDialog({
		options : clientes_nomes,
		cancel : 0,
		title : "Selecione o Cliente"
	});
	
	dialog.show();
	
	dialog.addEventListener("click", function(e) {
		selected_client = e.index;
		selection();
	});
}

function selection() {
	var cliente = getClienteCredito(clientes[selected_client]);
	if (cliente.isValidRow()) {
		var razao = cliente.fieldByName('cl_razao');
		$.selecao.text = razao;
		
	}
}

function ir() {
	var cliente = getClienteCredito(clientes[selected_client]);
	if (cliente.isValidRow()) {
		var credito = cliente.fieldByName('cl_credito_total');
		var utilizado = cliente.fieldByName('cl_credito_utilizado');
		var saldo = credito - utilizado;
		var minimo = cliente.fieldByName('cl_valor_minimo');
		$.credito.text = formatCurrency(credito);
		$.utilizado.text = formatCurrency(utilizado);
		$.saldo.text = formatCurrency(saldo);
		$.minimo.text = formatCurrency(minimo);
	}
}

var uso = 0;

function detalhe(){
	if(uso == 0){
		var cliente = getClienteCredito(clientes[selected_client]);
		if(cliente.isValidRow()){
			var aviso = cliente.fieldByName("cl_aviso");
			var observacao = cliente.fieldByName("cl_observacao");
			if(aviso == 0){
				var cor = "#e9aca7";
			}else if(aviso == 1){
				var cor = "#e8e79c";
			}else{
				var cor = "#cfedcf";
			}
			$.avisoDetalhe.text = observacao;
			$.avisoDetalhe.backgroundColor = cor;
		}
		uso = 1;	
	}else{
		$.avisoDetalhe.text = "";
		$.avisoDetalhe.backgroundColor = "transparent";
		uso = 0;
	}
}

function funcEnviarCredito(e){
	
	var db = dbLoad();
	
	//Funcao de criar tabela do pedido de aumento de credito
	createTableCredit();
	// fim da funcao, nao mexer nessa merda
	
	var pedido_aumento = $.pedido_credito.value;
	var insert_query = "INSERT INTO credito (fk_id_cliente, fk_id_ep, fk_id_representante, mensagem) VALUES( " + selected_client + ", " + epid + ", " + representante + "" + ",'" + pedido_aumento + "');";
	var select_query = "SELECT * FROM credito";
	
	if(pedido_aumento.length > 0){
		
		db.execute(insert_query);
		$.pedido_credito.value = "";
			
	}else{
		
		Ti.UI.createAlertDialog({message:"O campo não pode estar vázio!", ok: "Ok", title:"Erro, campo vázio:"}).show();
		
	}
	
}