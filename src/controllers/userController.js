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

      res.status(201).send({ message: 'Usuário(a) criado(a) com sucesso!' });
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

      res.send(user);
    } catch (err) {
      return res.send(err.message);
    }
  }

  async update(req, res) {
    try {
      const user = await this.User.findOne({ _id: req.params.id }).select(
        '+password'
      );

      if (!user)
        return res
          .status(400)
          .send({ message: 'Não há usuário(a) cadastrado(a) com esse id!' });

      const hash = await bcrypt.hash(user.password, 10);

      await this.User.updateOne(
        { _id: req.params.id },
        { password: hash },
        req.body
      );

      return res
        .status(200)
        .send({ message: 'Dados do usuário(a) atualizados com sucesso!' });
    } catch (err) {
      return res.send(err.message);
    }
  }

  async remove(req, res) {
    try {
      const user = await this.User.deleteOne({ _id: req.params.id });

      if (!user.length)
        return res
          .status(400)
          .send({ message: 'Não há usuário(a) cadastrado(a) com esse id!' });

      return res
        .status(200)
        .send({ message: 'Usuário(a) deletado(a) com sucesso!' });
    } catch (err) {
      return res.send(err.message);
    }
  }
}

module.exports = UserController;
