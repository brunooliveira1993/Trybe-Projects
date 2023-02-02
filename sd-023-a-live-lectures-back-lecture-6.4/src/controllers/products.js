const { verifyToken } = require('../auth/jwtFunctions');

const createProduct = (req, res) => {
  if (!req.body.title || !req.body.price) {
    return res.status(400).json({ message: 'Produto sem título e/ou preço' });
  }
  const { authorization } = req.headers;

  const payload = verifyToken(authorization);
  if (payload.isError) {
    return res.status(401).json({ message: payload.error.message });
  }
  console.log(req.user.dataValues);
  return res.status(201).json({
    message: 'Produto fake criado com sucesso',
    data: { ...req.body, idUser: payload.data.id },
  });
};
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo2LCJ1c2VybmFtZSI6Ikx1Y2FzIn0sImlhdCI6MTY2OTc1NjU1MywiZXhwIjoxNjY5NzU3NDUzfQ.SZbZ4l9tswMtFQcfuET0hdyr2Dut6kFYuYlAu59TCTA
module.exports = { createProduct };
