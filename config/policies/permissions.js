const jwt = require('jsonwebtoken');
module.exports = async (ctx, next) => {
  if(ctx.request.headers.authenticated){
    const token = ctx.request.header.authenticated.split(' ')[1];
    const decoded = jwt.verify(token,process.env.SECRET_KEY)
    const user = await strapi.services.usuarios.findOne({email: decoded.email});
    if(user){
      ctx.state.user = user;
      await next();
    }else{
      ctx.throw(400, 'User not found');
    }
  }else{
    return ctx.throw(403, 'You are not authorized to access this resource');
  }
}
