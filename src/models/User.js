const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Schema do modelo de Usuário.
 * Define a estrutura dos documentos de usuários no MongoDB.
 */
const userSchema = new mongoose.Schema({
  /**
   * Nome do usuário.
   * @type {string}
   * @required
   */
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
  },

  /**
   * E-mail do usuário. Deve ser único na base de dados.
   * @type {string}
   * @required
   * @unique
   */
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true,
  },

  /**
   * Senha do usuário. Armazenada de forma criptografada.
   * @type {string}
   * @required
   * @minlength 6
   */
  senha: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter no mínimo 6 caracteres'],
  },
}, { timestamps: true });

/**
 * Hook executado antes de salvar o usuário.
 * Criptografa a senha caso ela tenha sido modificada.
 * @function
 * @returns {void}
 */
userSchema.pre('save', async function () {
  if (!this.isModified('senha')) return;
  this.senha = await bcrypt.hash(this.senha, 10);
});

/**
 * Compara a senha digitada com a senha criptografada armazenada.
 * @method
 * @param {string} senhaDigitada - Senha informada pelo usuário no login
 * @returns {Promise<boolean>} Retorna true se as senhas correspondem, false caso contrário
 */
userSchema.methods.compararSenha = async function (senhaDigitada) {
  return bcrypt.compare(senhaDigitada, this.senha);
};

/**
 * Model de Usuário baseado no userSchema.
 * @module User
 */
module.exports = mongoose.model('User', userSchema);