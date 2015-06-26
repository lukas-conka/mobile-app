Ti.include("/api/config.js");
Ti.include("/database/aparencia.js");
Ti.include("/database/pedido.js");
Ti.include("/database/carrinho_pedido.js");
Ti.include("/database/email.js");

$.logoEmpresa.image = getImagesFolder() + selectLogoFile();

var count = 0;

var line = Titanium.UI.createView({
	backgroundColor:"#414143",
	height:"20%",
	layout:"horizontal",
	width:"100%"
});

var geral = 0;

var i = 0;
var pedidos = consultaPedidoTotalizacao(Ti.App.Properties.getString(SESSION_ID));
while(pedidos.isValidRow()){
	var ped_id = pedidos.fieldByName("ped_id");
	var ped_numero = pedidos.fieldByName("ped_numero");
	var cl_cnpj = pedidos.fieldByName("cl_cnpj");
	
	var final = 0;
	
	var carrinhoPedido = consultaCarrinhoTotalizacao(ped_id);
	while(carrinhoPedido.isValidRow()){
		var crp_quantidade = carrinhoPedido.fieldByName("crp_quantidade");
		var crp_preco_unitario = carrinhoPedido.fieldByName("crp_preco_unitario");
		var crp_ipi = carrinhoPedido.fieldByName("crp_ipi");
		var desconto_parcela = carrinhoPedido.fieldByName("desconto_parcela");
		var desconto_especial = carrinhoPedido.fieldByName("desconto_especial");
		
		var total = crp_quantidade * crp_preco_unitario;
		var ipi = (total * crp_ipi) / 100;
		total = total + ipi;
		
		var descontoParcela = (total * desconto_parcela) / 100;
		total = total - descontoParcela;
		
		var descontoEspecial = (total * desconto_especial) / 100;
		total = total - descontoEspecial;
		
		final = final + total;
		
		carrinhoPedido.next();
	}
	
	geral = geral + final;
	
	var item = Titanium.UI.createView({
		height:"100%",
		layout:"vertical",
		width:"33%"
	});

	var label = Titanium.UI.createLabel({
		color:"#ffffff",
		height:"20%",
		text:"CNPJ: " + cl_cnpj,
		width:"100%"
	});
	item.add(label);

	var row = Titanium.UI.createView({
		height : "80%",
		width : "100%",
		layout : "horizontal"
	});

	var pedido = Titanium.UI.createLabel({
		color : '#ffffff',
		text : "Pedido Nº " + ped_numero,
		height : "100%",
		width : 100
	});
	row.add(pedido);

	var valor = Titanium.UI.createLabel({
		color : '#ff0000',
		backgroundColor : '#ffffff',
		text:formatCurrency(final),
		height : "80%",
		width : 120
	});
	row.add(valor);

	var impressora = Titanium.UI.createImageView({
		height : "80%",
		image : '/images/impressora.jpg'
	});
	row.add(impressora);

	var marca = Titanium.UI.createImageView({
		left : "5%",
		height : "75%",
		image : '/images/marca.jpg'
	});
	row.add(marca);
	item.add(row);
	line.add(item);
	count++;
	if (count == 3) {
		$.corpo.add(line);
		line = Titanium.UI.createView({
			backgroundColor:"#414143",
			width : "100%",
			height : "20%",
			layout : "horizontal"
		});
	}
	
	i++;
	
	pedidos.next();
}

$.corpo.add(line);
$.total.text = formatCurrency(geral);

var emailRodape = "";
var q = 0;
var email = selectallEmail();
while(email.isValidRow()){
	var em_email = email.fieldByName("em_email");
	if(q == 0){
		emailRodape = em_email;
		q++;
	}else{
		emailRodape = emailRodape + " | " + em_email;
	}
	email.next();
}

$.emails.text = emailRodape;

function voltar() {
	resetSession();
	goTo('seleciona_cliente');
}