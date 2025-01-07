const tratarDadosCliente = (props) => {
    const { nomeCliente, telefone, cpf, cidade } = props;

    if (!nomeCliente || !telefone || !cpf || !cidade) {
        return "Preencha todos os campos.";
    }
    if (nomeCliente.length < 3) {
        return "Nome inválido.";
    }
    if (cidade.length < 3) {
        return "Cidade inválida.";
    }
    if (telefone.length <= 8) {
        return "Telefone inválido.";
    }
    if (cpf.length <= 11) {
        return "CPF inválido.";
    }
    return "Cliente cadastrado com sucesso!";
}

const tratarVendas = (props) => {
    const { cliente, produto, quantidade } = props;

    if (cliente && cliente.length < 3) {
        return "Cliente inválido.";
    }
    if (!produto || !quantidade) {
        return "Preencha todos os campos.";
    }
    if (produto.length < 3) {
        return "Produto inválido.";
    }
    if (quantidade <= 0) {
        return "Quantidade inválida.";
    }
    return "Venda realizada com sucesso!";
};

export { tratarDadosCliente, tratarVendas };