/*
 * O construtor irá garantir que toda a vez que alguém tentar criar uma instância do controller ele deve
 * passar o model User por parâmetro.
 */

class UserController {
  constructor(User) {
    this.User = User;
  }

  async create(req, res) {
    try {
      await user.save();
      res.status(201).send({ message: 'Usuário(a) criado(a) com sucesso!' });
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async get(req, res) {
    try {
      const users = await this.User.find({});
      res.send(users);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async getById(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const user = await this.User.find({
        _id: id,
      });
      res.send(user);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async update(req, res) {
    try {
      await this.User.updateOne({ _id: req.params.id }, req.body);
      res
        .status(200)
        .send({ message: 'Dados do usuário(a) atualizados com sucesso!' });
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async remove(req, res) {
    try {
      await this.User.deleteOne({
        _id: req.params.id,
      });
      res.status(200).send({ message: 'Usuário(a) deletado(a) com sucesso!' });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

module.exports = UserController;
