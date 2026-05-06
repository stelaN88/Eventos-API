const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'Título é obrigatório'],
    trim: true,
  },
  descricao: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
  },
  data: {
    type: Date,
    required: [true, 'Data é obrigatória'],
  },
  local: {
    type: String,
    required: [true, 'Local é obrigatório'],
  },
  vagas: {
    type: Number,
    required: [true, 'Número de vagas é obrigatório'],
    min: [1, 'Deve ter ao menos 1 vaga'],
  },
  participantes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  criador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Evento', eventoSchema);