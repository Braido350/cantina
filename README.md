# Cantina Project

## Descrição

O projeto Cantina é uma aplicação web destinada a gerenciar pedidos e estoque de uma cantina escolar ou de eventos religiosos . A aplicação permite que gerencie pedidos feitos stock e produtos, quais clientes fizeram pedidos. Além disso, os administradores podem gerenciar o estoque de produtos, atualizar o cardápio e visualizar relatórios de vendas.

## Funcionalidades

- **Gerenciamento de Estoque**: Ferramentas para adicionar, remover e atualizar produtos no estoque.
- **Atualização de Cardápio**: Interface para atualizar os itens disponíveis no cardápio.
- **Relatórios de Vendas**: Geração de relatórios detalhados sobre as vendas realizadas.

## Tecnologias Utilizadas

- **Frontend**: React.js e Tailwind.css
- **Backend**: Next.js
- **Banco de Dados**: PostgreSQL
- **Autenticação**: verificando...

- **A Terminar:**
- [x] Cadastro de Clientes {21/01/2025}
- [x] Cadastro de Produtos {05/02/2025}
- [x] Cadastro de Usuários {05/02/2025}
- [ ] Autenticação
- [ ] Logica das vendas de produtos
- [ ] Relatório de Vendas
- [ ] Relatório de Estoque
- [ ] Relatório de Compras dos usuários

### 1. Banco de Dados

Crie as seguintes tabelas (ou modelos, se estiver usando ORM):

- **Clientes**

  - id (PK)
  - nome
  - email
  - senha

- **Vendedores**

  - id (PK)
  - nome
  - email
  - senha

- **Produtos**

  - id (PK)
  - nome
  - descrição
  - preço
  - idVendedor (FK referenciando Vendedores)

- **Pedidos**

  - id (PK)
  - idCliente (FK referenciando Clientes)
  - idProduto (FK referenciando Produtos)
  - data
  - quantidade
  - valorProduto
  - valorTotal
  - valorDesconto
  - valorLiquido

- **Data final do Projeto:**

<!-- cliente vendedor produtos vendidos e venda -->

<!-- vendaID = clienteID + vendedorID -->

<!-- produtosVendidos = vendaID + produtoID + quantidade + valorProduto + valorTotal + ValorDesconto + valorLiquido -->
