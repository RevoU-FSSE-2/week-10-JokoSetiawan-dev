require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const OpenApiValidator = require('express-openapi-validator');
const yaml = require('yaml');
const swaggerUi = require('swagger-ui-express')
const authRoute = require('./routes/auth.route');
const transferReqRoute = require('./routes/transfer.route')
const databaseMiddleware = require('./middleware/database')
const errorHandlerMiddleware = require('./middleware/error-handler')
const {authenticationMiddleware, authorizationMiddleware} = require('./middleware/auth')

const app = express();
const port = process.env.PORT || 9000

app.use(bodyParser.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(yaml.parse(require('fs').readFileSync('./doc/openapi.yaml', 'utf8'))))
app.use(OpenApiValidator.middleware({ 
  apiSpec: './doc/openapi.yaml'
}))
app.use(databaseMiddleware)

app.use('/auth', authRoute)
app.use('/transfer', authenticationMiddleware, transferReqRoute)

app.use(errorHandlerMiddleware)

app.listen(port, () => {
    console.log('listening on port ' + port);
});