var args = arguments[0] || {};
Ti.include("/api/menu.js");
Ti.include("/api/config.js");
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
