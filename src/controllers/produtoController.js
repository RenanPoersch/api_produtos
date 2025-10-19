const service = require('../services/produtoService');

function listar(req, res) {
  const filtros = {
    nome: req.query.nome,
    precoMin: req.query.precoMin,
    precoMax: req.query.precoMax,
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10
  };

  res.json(service.listar(filtros));
}

function buscarPorId(req, res) {
  try {
    const produto = service.buscarPorId(req.params.id);
    res.json(produto);
  } catch (err) {
    res.status(404).json({ erro: err.message });
  }
}

function criar(req, res) {
  try {
    const produto = service.criar(req.body);
    res.status(201).json(produto);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

function atualizar(req, res) {
  try {
    const produto = service.atualizar(req.params.id, req.body);
    res.json(produto);
  } catch (err) {
    res.status(404).json({ erro: err.message });
  }
}

function excluir(req, res) {
  try {
    service.excluir(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ erro: err.message });
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, excluir };
