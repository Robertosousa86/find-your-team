/*
 * O construtor irá garantir que toda a vez que alguém tentar criar uma instância do controller ele deve
 * passar o model User por parâmetro.
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class RegisterController {
  constructor(User) {
    this.User = User;
  }

  tokenGenerator(params = {}) {
    return jwt.sign(params, process.env.SECRET, {
      expiresIn: 86400,
    });
  }

  async create(req, res) {
    try {
      const user = new this.User(req.body);

      if (await this.User.findOne({ name: req.body.name }))
        return res
          .status(400)
          .send({ Message: 'Nome de usuário(a) já cadastrado.' });

      if (await this.User.findOne({ email: req.body.email }))
        return res.status(400).send({ Message: 'E-mail já cadastrado.' });

      user.password = await bcrypt.hash(user.password, 10);

      await user.save();

      user.password = undefined;

      return res
        .status(201)
        .send({ user, token: this.tokenGenerator({ id: user.id }) });
    } catch (err) {
      return res.send(err.message);
    }
  }
}

module.exports = RegisterController;
