const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class LoginController {
  constructor(User) {
    this.User = User;
  }

  async login(req, res) {
    const { email, password } = req.body;

    const user = await this.User.findOne({ email }).select('+password');

    if (!user) return res.status(400).send({ message: 'E-mail inválido.' });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).send({ message: 'Ops... Senha incorreta!' });

    user.password = undefined;
    // (expiresIn: 86400 => 86400 segundos = 24 horas)
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400,
    });

    return res.send({ user, token });
  }
}

module.exports = LoginController;
