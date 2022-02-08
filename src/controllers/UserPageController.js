class UserPageController {
  constructor(User) {
    this.User = User;
  }

  async getOk(req, res) {
    res.status(200).send({ message: true, user: req.userId });
  }
}

module.exports = UserPageController;
