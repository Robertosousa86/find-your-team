/*
 * O construtor irá garantir que toda a vez que alguém tentar criar uma instância do controller ele deve
 * passar o model User por parâmetro.
 */

const bcrypt = require('bcrypt');
require('dotenv').config();

class AuthUserController {
  constructor(User) {
    this.User = User;
  }

  async create(req, res) {
    try {
      const user = new this.User(req.body);

      const hash = await bcrypt.hash(user.password, 10);

      if (await this.User.findOne({ email: req.body.email }))
        return res.status(400).send({ Message: 'E-mail já cadastrado.' });

      user.password = hash;

      await user.save();

      return res
        .status(201)
        .send({ message: 'Usuário(a) criado(a) com sucesso!' });
    } catch (err) {
      return res.send(err.message);
    }
  }
}

module.exports = AuthUserController;
