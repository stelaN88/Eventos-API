const Evento = require('../models/Evento');

exports.criarEvento = async (req, res) => {
  try {
    const { titulo, descricao, data, local, vagas } = req.body;
    const evento = await Evento.create({
      titulo, descricao, data, local, vagas,
      criador: req.usuario.id,
    });
    res.status(201).json(evento);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.listarEventos = async (req, res) => {
  try {
    const eventos = await Evento.find().populate('criador', 'nome email');
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.buscarEventoPorId = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id).populate('criador', 'nome email').populate('participantes', 'nome email');
    if (!evento) return res.status(404).json({ erro: 'Evento não encontrado.' });
    res.json(evento);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.atualizarEvento = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) return res.status(404).json({ erro: 'Evento não encontrado.' });
    if (evento.criador.toString() !== req.usuario.id) {
      return res.status(403).json({ erro: 'Sem permissão para editar este evento.' });
    }
    const eventoAtualizado = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(eventoAtualizado);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.deletarEvento = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) return res.status(404).json({ erro: 'Evento não encontrado.' });
    if (evento.criador.toString() !== req.usuario.id) {
      return res.status(403).json({ erro: 'Sem permissão para deletar este evento.' });
    }
    await Evento.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Evento deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.inscreverEvento = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) return res.status(404).json({ erro: 'Evento não encontrado.' });
    if (evento.participantes.includes(req.usuario.id)) {
      return res.status(400).json({ erro: 'Você já está inscrito neste evento.' });
    }
    if (evento.participantes.length >= evento.vagas) {
      return res.status(400).json({ erro: 'Não há vagas disponíveis.' });
    }
    evento.participantes.push(req.usuario.id);
    await evento.save();
    res.json({ mensagem: 'Inscrição realizada com sucesso!', evento });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};