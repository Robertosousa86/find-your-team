/*
 * O construtor irá garantir que toda a vez que alguém tentar criar uma instância do controller ele deve
 * passar o model Product por parâmetro.
 */
class UserController {
  constructor(User) {
    this.User = User;
  }

  async create(req, res) {
    const user = new this.User(req.body);
    try {
      await user.save();
      res.status(201).send(user);
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
}

module.exports = UserController;
