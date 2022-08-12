const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = {
  async register(ctx) {
    const {email,password} = ctx.request.body;
    if(email && password){
      const user = await strapi.services.usuarios.findOne({email});
      if(user){
        const hashed = await bcrypt.compare(password, user.password);
        if(hashed){
          const token = jwt.sign({
            username: user.username},
            process.env.SECRET_KEY,{
              expiresIn: '7d'
            });
            ctx.send({
              token: token,
              user: {
                email: user.email
              }
            });
        }else{
          ctx.throw(400, 'Email of password is incorrect');

        }
      }else{
        return ctx.unauthorized('User not found');
      }
    }else{
      ctx.throw(400, 'Email of password is required');
    }
  }
}
