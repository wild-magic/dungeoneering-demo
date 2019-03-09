const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

io.on('connect', socket => {
  setInterval(() => {
    socket.emit('now', {
      message: 'Socketzeit ' + Date.now(),
    });
  }, 1000);
});

nextApp
  .prepare()
  .then(() => {
    // server.get('/p/:id', (req, res) => {
    //   const actualPage = '/post';
    //   const queryParams = { title: req.params.id };
    //   app.render(req, res, actualPage, queryParams);
    // });

    app.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.log(ex.stack);
    process.exit(1);
  });
