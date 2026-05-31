const secureQuery = {
  findUser: (sequelize, email) => {
    return sequelize.query(
      'SELECT * FROM Users WHERE email = ?',
      { replacements: [email], type: sequelize.QueryTypes.SELECT }
    );
  }
};

module.exports = secureQuery;
