import * as bodyParser from '../src/'
import * as express from 'express'

export const app = express()
app.use(bodyParser.graphql())
app.post('/', (req, res) => res.set('Content-Type', req.get('content-type')).send(req.body))
