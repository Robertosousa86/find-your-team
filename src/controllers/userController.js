/*
 * O construtor irá garantir que toda a vez que alguém tentar criar uma instância do controller ele deve
 * passar o model User por parâmetro.
 */
const bcrypt = require('bcrypt');

class UserController {
  constructor(User) {
    this.User = User;
  }

  async create(req, res) {
    try {
      const user = new this.User(req.body);
      const hash = await bcrypt.hash(user.password, 10);

      user.password = hash;

      await user.save();

      return res
        .status(201)
        .send({ message: 'Usuário(a) criado(a) com sucesso!' });
    } catch (err) {
      return res.send(err.message);
    }
  }

  async get(req, res) {
    try {
      const users = await this.User.find({});

      if (!users.length)
        return res
          .status(400)
          .send({ message: 'Não há usuários cadastrados no sistema!' });

      return res.send(users);
    } catch (err) {
      return res.send(err.message);
    }
  }

  async getById(req, res) {
    try {
      const user = await this.User.find({ _id: req.params.id });

      if (!user.length)
        return res
          .status(400)
          .send({ message: 'Não há usuário(a) cadastrado(a) com esse id!' });

      return res.send(user);
    } catch (err) {
      return res.send(err.message);
    }
  }

  async update(req, res) {
    try {
      const user = await this.User.updateOne({ _id: req.params.id }, req.body);

      if (!user.matchedCount)
        return res
          .status(400)
          .send({ message: 'Não há usuário(a) cadastrado(a) com esse id!' });
      res
        .status(200)
        .send({ message: 'Dados do usuário(a) atualizados com sucesso!' });
    } catch (err) {
      return res.send(err.message);
    }
  }

  async remove(req, res) {
    try {
      const user = await this.User.find({ _id: req.params.id });

      if (user.length) {
        await this.User.deleteOne({
          _id: req.params.id,
        });

        return res
          .status(200)
          .send({ message: 'Usuário(a) deletado(a) com sucesso!' });
      } else {
        return res
          .status(400)
          .send({ message: 'Não há usuário(a) cadastrado(a) com esse id!' });
      }
    } catch (err) {
      return res.send(err.message);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    const userData = await this.User.findOne({ email }).select('+password');

    if (!userData) return res.status(400).send({ message: 'E-mail inválido.' });

    if (!(await bcrypt.compare(password, userData.password)))
      return res.status(400).send({ message: 'Ops... Senha incorreta!' });

    userData.password = undefined;

    return res.status(200).send({ userData });
  }
}

module.exports = UserController;
