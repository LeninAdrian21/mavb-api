const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
module.exports = async (ctx, next) => {
  const { password } = ctx.request.body;
  if (!password) {
    ctx.throw(400, 'password is required');
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  ctx.request.body.password = hash;
  await next();
}
