/*
 * O construtor irá garantir que toda a vez que alguém tentar criar uma instância do controller ele deve
 * passar o model Champion por parâmetro.
 */
class UserPageController {
  constructor(Champion) {
    this.Champion = Champion;
  }

  async create(req, res) {
    try {
      const champion = new this.Champion({ ...req.body, user: req.userId });

      await champion.save();

      return res.status(201).send({ champion });
    } catch (err) {
      return res.send(err.message);
    }
  }

  async get(req, res) {
    try {
      const champions = await this.Champion.find({}).populate('user');

      if (!champions.length)
        return res
          .status(400)
          .send({ message: 'A lista de Campeões está vazia!' });

      return res.send({ champions });
    } catch (err) {
      return res.send(err.message);
    }
  }

  async getById(req, res) {
    try {
      const champion = await this.Champion.findById(req.params.id).populate(
        'user'
      );

      if (!champion)
        return res
          .status(400)
          .send({ message: 'Não há Campeão cadastrado(a) com esse id!' });

      return res.send(champion);
    } catch (err) {
      return res.send(err.message);
    }
  }

  async update(req, res) {
    try {
      const champion = await this.Champion.updateOne(
        { _id: req.params.id },
        req.body
      );

      if (!champion.matchedCount)
        return res
          .status(400)
          .send({ message: 'Não há Campeão cadastrado(a) com esse id!' });
      res
        .status(200)
        .send({ message: 'Dados do Campeão atualizados com sucesso!' });
    } catch (err) {
      return res.send(err.message);
    }
  }

  async remove(req, res) {
    try {
      const champion = await this.Champion.findByIdAndRemove({
        _id: req.params.id,
      });

      if (!champion)
        return res
          .status(400)
          .send({ message: 'Não há Campeão cadastrado(a) com esse id!' });

      return res
        .status(200)
        .send({ message: 'Campeão deletado(a) com sucesso!' });
    } catch (err) {
      return res.send(err.message);
    }
  }
}

module.exports = UserPageController;
