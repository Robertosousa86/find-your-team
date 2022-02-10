const setupApp = require('./app');
require('dotenv').config();

const PORT = process.env.HOST;
// Graceful shutdown
(async () => {
  try {
    const app = await setupApp();

    const server = app.listen(PORT, () =>
      console.info(`App running at http://localhost:${PORT}`)
    );

    const exitSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    exitSignals.map((sig) =>
      process.on(sig, () =>
        server.close((err) => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          app.database.connection.close(function () {
            console.info('Database connection closed!');
            process.exit(0);
          });
        })
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
