const Koa = require('koa');
const Router = require('@koa/router');
const PORT = process.env.PORT || 3000;

const app = new Koa();
const router = new Router();

router
  .get('/search/:pokemon', (ctx, next) => {
    ctx.body = ctx.params.pokemon;
  })

app
  .use(router.routes())
  .use(router.allowedMethods());

// need to add route for pokemon 


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/ 🥳`);
});