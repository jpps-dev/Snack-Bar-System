var nomesProdutos = [];
var precosProdutos = [];
var totaisVendas = [];

function cadastrarProduto() {
    var nome = prompt("Digite o nome do produto:");

    if (nome == null || nome == "") {
        alert("Nome inválido.");
        return;
    }

    for (var i = 0; i < nomesProdutos.length; i++) {
        if (nomesProdutos[i].toLowerCase() == nome.toLowerCase()) {
            alert("Esse produto já está cadastrado.");
            return;
        }
    }

    var preco = parseFloat(prompt("Digite o preço do produto:"));

    if (isNaN(preco) || preco <= 0) {
        alert("O preço deve ser maior que zero.");
        return;
    }

    nomesProdutos.push(nome);
    precosProdutos.push(preco);

    atualizarTabela();

    alert("Produto cadastrado com sucesso.");
}

function listarProdutos() {
    if (nomesProdutos.length == 0) {
        alert("Não existem produtos cadastrados.");
        return;
    }

    var lista = "PRODUTOS CADASTRADOS\n\n";

    for (var i = 0; i < nomesProdutos.length; i++) {
        lista +=
            (i + 1) + " - " +
            nomesProdutos[i] +
            " - R$ " +
            precosProdutos[i].toFixed(2) +
            "\n";
    }

    alert(lista);
}

function calcularTotalVenda(preco, quantidade) {
    return preco * quantidade;
}

function calcularDesconto(total) {
    if (total > 50) {
        return total * 0.10;
    } else {
        return 0;
    }
}

function exibirResumoVenda(nome, preco, quantidade, subtotal, desconto) {
    var total = subtotal - desconto;

    alert(
        "RESUMO DA VENDA\n\n" +
        "Produto: " + nome + "\n" +
        "Preço: R$ " + preco.toFixed(2) + "\n" +
        "Quantidade: " + quantidade + "\n" +
        "Subtotal: R$ " + subtotal.toFixed(2) + "\n" +
        "Desconto: R$ " + desconto.toFixed(2) + "\n" +
        "Valor final: R$ " + total.toFixed(2)
    );
}

function realizarVenda() {
    if (nomesProdutos.length == 0) {
        alert("Cadastre um produto primeiro.");
        return;
    }

    var lista = "PRODUTOS DISPONÍVEIS\n\n";

    for (var i = 0; i < nomesProdutos.length; i++) {
        lista +=
            (i + 1) + " - " +
            nomesProdutos[i] +
            " - R$ " +
            precosProdutos[i].toFixed(2) +
            "\n";
    }

    var codigo = parseInt(
        prompt(lista + "\nDigite o código do produto:")
    );

    if (isNaN(codigo) || codigo < 1 || codigo > nomesProdutos.length) {
        alert("Código inválido.");
        return;
    }

    var quantidade = parseInt(
        prompt("Digite a quantidade:")
    );

    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Quantidade inválida.");
        return;
    }

    var indice = codigo - 1;
    var nome = nomesProdutos[indice];
    var preco = precosProdutos[indice];

    var subtotal = calcularTotalVenda(preco, quantidade);
    var desconto = calcularDesconto(subtotal);

    exibirResumoVenda(
        nome,
        preco,
        quantidade,
        subtotal,
        desconto
    );

    var confirmar = confirm("Deseja confirmar esta venda?");

    if (confirmar == true) {
        totaisVendas.push(subtotal - desconto);
        atualizarTabela();

        alert("Venda registrada com sucesso.");
    } else {
        alert("Venda cancelada.");
    }
}

function obterTotalVendasDia() {
    var total = 0;

    for (var i = 0; i < totaisVendas.length; i++) {
        total += totaisVendas[i];
    }

    return total;
}

function exibirTotalVendasDia() {
    if (totaisVendas.length == 0) {
        alert("Ainda não existem vendas.");
        return;
    }

    alert(
        "TOTAL DE VENDAS DO DIA\n\n" +
        "Quantidade de vendas: " + totaisVendas.length + "\n" +
        "Total vendido: R$ " +
        obterTotalVendasDia().toFixed(2)
    );
}

function exibirMenu() {
    return prompt(
        "MENU PRINCIPAL\n\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos cadastrados\n" +
        "3 - Realizar venda\n" +
        "4 - Consultar total de vendas do dia\n" +
        "5 - Encerrar o sistema\n\n" +
        "Digite uma opção:"
    );
}

function executarSistema() {
    var opcao;

    do {
        opcao = exibirMenu();

        switch (opcao) {
            case "1":
                cadastrarProduto();
                break;

            case "2":
                listarProdutos();
                break;

            case "3":
                realizarVenda();
                break;

            case "4":
                exibirTotalVendasDia();
                break;

            case "5":
                alert("Sistema encerrado.");
                break;

            default:
                alert("Opção inválida.");
        }

    } while (opcao != "5");
}

function atualizarTabela() {
    var tabela = "";

    for (var i = 0; i < nomesProdutos.length; i++) {
        tabela +=
            "<tr>" +
            "<td>" + (i + 1) + "</td>" +
            "<td>" + nomesProdutos[i] + "</td>" +
            "<td>R$ " + precosProdutos[i].toFixed(2) + "</td>" +
            "</tr>";
    }

    if (nomesProdutos.length == 0) {
        tabela =
            "<tr>" +
            "<td colspan='3'>Nenhum produto cadastrado.</td>" +
            "</tr>";
    }

    document.getElementById("productsTable").innerHTML = tabela;
}

atualizarTabela();
executarSistema();