import * as bodyParser from 'body-parser'
import { Request, Response, NextFunction, RequestHandler } from 'express'

export const bodyParserGraphQL: () => RequestHandler = () => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.is('application/graphql')) {
    bodyParser.text({ type: 'application/graphql' })(req, res, () => {
      req.headers['content-type'] = 'application/json'
      req.body = {
        query: req.body
      }
      next()
    })
  } else {
    bodyParser.json()(req, res, next)
  }
}

export const graphql = bodyParserGraphQL
