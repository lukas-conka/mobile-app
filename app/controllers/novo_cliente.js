var args = arguments[0] || {};
Ti.include("/api/menu.js");
Ti.include("/database/aparencia.js");
Ti.include("/api/config.js");
Ti.include("/database/credito.js");

//testando commit em outro arquivo

$.logoEmpresa.image = getImagesFolder() + selectLogoFile();

//Ids do cliente, empresa e representante
var representante = Ti.App.Properties.getString(CURRENT_USER_ID);
var epid =  Ti.App.Properties.getString(CURRENT_EMPRESA);
var clienteid = Ti.App.Properties.getList(SELECTED_CLIENTS);
$.logoEmpresa.image = getImagesFolder() + selectLogoFile();

// Funcao chamada quando um item da lista é clicado
// todo: terminar funcao, colocar os outros itens e funcoes
function menuClick(e) {
	menuSelection(e.itemIndex);
}

//Terminar esta funcao ate quinta.
//Startada por Felipe Botelho e Carlos Stark

function grava(){
	var db = dbLoad();
	var campo = $.idCampoA.value;
	var campo1 = $.idCampoB.value;
	var campo2 = $.idCampoC.value;
	var campo3 = $.idCampoD.value;
	var campo4 = $.idCampoE.value;
	var campo5 = $.idCampoF.value;
	var campo6 = $.idCampoG.value;
	var campo7 = $.idCampoH.value;
	var campo8 = $.idCampoI.value;
	var campo9 = $.idCampoJ.value;
	var campo10 = $.idCampoK.value;
	var campo11 = $.idCampoL.value;
	var campo12 = $.idCampoM.value;
}
//var insert_query = "INSERT INTO tb_cliente values ("+ clienteid[0] +","+ campo +","+ campo1 +","+ campo2 +","+ campo3 + ","+ campo4 +","+ campo5 +","+ campo6 +","+ campo6 +","+ campo8 +","+ campo9 +",");


