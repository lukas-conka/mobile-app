Ti.include("/api/config.js");
Ti.include("/database/produtos.js");
Ti.include("/database/aparencia.js");
$.logoEmpresa.image = getImagesFolder() + selectLogoFile();
var busca_texto = '';
resultadoProdutos();

function resultadoProdutos() {
	var produtos = listaProdutosQuatro(busca_texto);
	var data = [];
	while (produtos.isValidRow()) {

		var prd_id = produtos.fieldByName("prd_id");
		var imagem = produtos.fieldByName("img_caminho");
		var referencia = produtos.fieldByName("prd_referencia");
		var barras = produtos.fieldByName("prd_codigo_barra");
		var nome = produtos.fieldByName("prd_nome");
		var marca = produtos.fieldByName("apr_arquivo");
		var preco1 = produtos.fieldByName("ifp_valor_1");
		var preco2 = produtos.fieldByName("ifp_valor_2");
		var preco3 = produtos.fieldByName("ifp_valor_3");
		var precos = formatCurrency(preco1) + "\n" + formatCurrency(preco2) + "\n" + formatCurrency(preco3);
		var qtde_min = produtos.fieldByName("ifp_qtde_minima");

		var selecao = '/images/seleciona.png';
		if (checkSelectedProduct(prd_id) == 'true')
			selecao = '/images/selecionar_vermelho.png';

		data.push({
			"prd_id" : prd_id,
			"imagem_produto" : {
				image : getImagesFolder() + imagem
			},
			"label_referencia" : {
				text : referencia
			},
			"label_barras" : {
				text : barras
			},
			"label_nome" : {
				text : nome
			},
			"imagem_marca" : {
				image : getImagesFolder() + marca
			},
			"label_preco" : {
				text : precos
			},
			"label_quantidade_min" : {
				text : qtde_min
			},
			"image_selecionar" : {
				image : selecao
			}
		});

		produtos.next();
	}
	$.listaprodutos.sections[0].setItems(data);
}

function buscarProdutos() {
	busca_texto = $.buscar.value;
	resultadoProdutos();
	$.buscar.value = '';
}

// function Merda(){
// 	
	// alert
// 	
// }

function selecionaProduto(e) {
	var selecao = $.listaprodutos.sections[e.sectionIndex];
	var item = selecao.getItemAt(e.itemIndex);
	var prd_id = item.prd_id;
	var button = item.image_selecionar;
	if (AddSelectedProduct(prd_id) == "true") {
		button.image = '/images/selecionar_vermelho.png';
	} else {
		button.image = '/images/seleciona.png';
	}
	selecao.updateItemAt(e.itemIndex, item);
}

function voltar() {
	goTo('funcao');
}

function irSelecionados() {
	goTo('calculadora');
}