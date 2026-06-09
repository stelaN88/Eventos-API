const mongoose = require('mongoose');

/**
 * Schema do modelo de Evento.
 * Define a estrutura dos documentos de eventos no MongoDB.
 */
const eventoSchema = new mongoose.Schema({
  /**
   * Título do evento.
   * @type {string}
   * @required
   */
  titulo: {
    type: String,
    required: [true, 'Título é obrigatório'],
    trim: true,
  },

  /**
   * Descrição detalhada do evento.
   * @type {string}
   * @required
   */
  descricao: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
  },

  /**
   * Data de realização do evento.
   * @type {Date}
   * @required
   */
  data: {
    type: Date,
    required: [true, 'Data é obrigatória'],
  },

  /**
   * Local de realização do evento.
   * @type {string}
   * @required
   */
  local: {
    type: String,
    required: [true, 'Local é obrigatório'],
  },

  /**
   * Número de vagas disponíveis para o evento.
   * @type {number}
   * @required
   * @minimum 1
   */
  vagas: {
    type: Number,
    required: [true, 'Número de vagas é obrigatório'],
    min: [1, 'Deve ter ao menos 1 vaga'],
  },

  /**
   * Lista de participantes inscritos no evento.
   * @type {Array<mongoose.Schema.Types.ObjectId>}
   * @ref User
   */
  participantes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],

  /**
   * Usuário que criou o evento.
   * @type {mongoose.Schema.Types.ObjectId}
   * @ref User
   * @required
   */
  criador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

/**
 * Model de Evento baseado no eventoSchema.
 * @module Evento
 */
module.exports = mongoose.model('Evento', eventoSchema);