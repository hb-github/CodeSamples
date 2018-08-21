require('express-async-errors');
import app from './server/config/express';
import Constants from './server/config/constants';
import errHandler from './server/middleware/error-handler';


// if error is not an instanceOf APIError, convert it.
app.use(errHandler.converter);
// catch 404 and forward to error handler
app.use(errHandler.notFound);
// error handler, send stacktrace only during development
app.use(errHandler.handler);

app.listen(Constants.port, () => {
  console.log(`Port: ${Constants.port} Env: ${Constants.env} 🍺`);
});
