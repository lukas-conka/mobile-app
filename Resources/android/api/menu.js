function menuSelection(index) {
    switch (index) {
      case 0:
        goToSelecionaCliente();
        break;

      case 1:
        goToCredito();
        break;

      case 2:
        var software = Ti.App.Properties.getString(CURRENT_SOFTWARE);
        Ti.API.info("software=" + software);
        1 == software ? goToCatalogo() : goToMarca();
        break;

      case 3:
        goToPedidos();
        break;

      case 4:
        goToTransportadora();
        break;

      case 5:
        var cliente_id = Ti.App.Properties.getList(SELECTED_CLIENTS);
        if (cliente_id.length > 0) goToNovoCliente(); else {
            var Alerta = Ti.UI.createAlertDialog({
                message: "É necessário a seleção de um cliente ou mais para seguir em diante!",
                title: "Selecionar cliente!:"
            });
            Alerta.show();
        }
        break;

      case 6:
        goToFuncoes();
        break;

      case 7:
        goToEmail();
        break;

      case 8:
        goToTelaInicial();
        break;

      case 9:
        goToMarca();
        break;

      case 10:
        goToSair();
    }
}

function goToSelecionaCliente() {
    var login = Alloy.createController("seleciona_cliente").getView();
    login.open({
        fullscreen: true,
        navBarHidden: true
    });
}

function goToCredito() {
    var login = Alloy.createController("credito").getView();
    login.open({
        fullscreen: true,
        navBarHidden: true
    });
}

function goToMarca() {
    var login = Alloy.createController("marca").getView();
    login.open({
        fullscreen: true,
        navBarHidden: true
    });
}

function goToCatalogo() {
    var login = Alloy.createController("categorias").getView();
    login.open({
        fullscreen: true,
        navBarHidden: true
    });
}

function goToPedidos() {
    var login = Alloy.createController("pedidos").getView();
    login.open({
        fullscreen: true,
        navBarHidden: true
    });
}

function goToTransportadora() {
    var login = Alloy.createController("transportadora").getView();
    login.open({
        fullscreen: true,
        navBarHidden: true
    });
}

function goToNovoCliente() {
    var login = Alloy.createController("novo_cliente").getView();
    login.open({
        fullscreen: true,
        navBarHidden: true
    });
}

function goToFuncoes() {
    var login = Alloy.createController("funcao").getView();
    login.open({
        fullscreen: true,
        navBarHidden: true
    });
}

function goToTelaInicial() {
    var login = Alloy.createController("index").getView();
    login.open({
        fullscreen: true,
        navBarHidden: true
    });
}

function goToEmail() {
    var login = Alloy.createController("email").getView();
    login.open({
        fullscreen: true,
        navBarHidden: true
    });
}

function goToSair() {
    var login = Alloy.createController("index").getView();
    login.open({
        fullscreen: true,
        navBarHidden: true
    });
}