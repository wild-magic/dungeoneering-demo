const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// fake DB
const messages = [
  {
    message: 'From initial server load',
  },
];

nextApp
  .prepare()
  .then(() => {
    // server.get('/p/:id', (req, res) => {
    //   const actualPage = '/post';
    //   const queryParams = { title: req.params.id };
    //   app.render(req, res, actualPage, queryParams);
    // });

    io.on('connection', function(client) {
      console.log('Client connected...');

      client.on('join', function(data) {
        console.log('joined');
      });
      client.on('disconnect', () => console.log('Client disconnected'));
    });

    io.on('connect', socket => {
      setInterval(() => {
        socket.emit('now', {
          message: 'Socketzeit ' + Date.now(),
        });
      }, 1000);
    });

    app.get('/socket.io', (req, res) => {
      console.log('oh no');
      res.json(messages);
    });

    app.get('*', (req, res) => {
      console.log('banana?');
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.log(ex.stack);
    process.exit(1);
  });
