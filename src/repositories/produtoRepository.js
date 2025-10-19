let produtos = [];

function listar({ nome, precoMin, precoMax, page = 1, limit = 10 }) {
  let resultado = produtos;

  if (nome) {
    resultado = resultado.filter(p =>
      p.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  if (precoMin) {
    resultado = resultado.filter(p => p.preco >= parseFloat(precoMin));
  }

  if (precoMax) {
    resultado = resultado.filter(p => p.preco <= parseFloat(precoMax));
  }

  const total = resultado.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginado = resultado.slice(start, end);

  return { total, page, limit, data: paginado };
}

function buscarPorId(id) {
  return produtos.find(p => p.id === id);
}

function criar(produto) {
  produtos.push(produto);
  return produto;
}

function atualizar(id, dados) {
  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  produtos[index] = {
    ...produtos[index],
    ...dados,
    preco: dados.preco !== undefined ? Number(dados.preco) : produtos[index].preco,
    estoque: dados.estoque !== undefined ? Number(dados.estoque) : produtos[index].estoque
  };

  return produtos[index];
}

function excluir(id) {
  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) return false;
  produtos.splice(index, 1);
  return true;
}

module.exports = { listar, buscarPorId, criar, atualizar, excluir };
