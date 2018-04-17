import * as bodyParser from 'body-parser'
import { Request, Response, NextFunction, RequestHandler } from 'express'

export interface BodyParserJSONOptions {
  limit?: number | string,
  inflate?: boolean,
  reviver?: any,
  strict?: boolean,
  type?: string,
  verify?: any,
}

export const bodyParserGraphQL: () => RequestHandler = (options?: BodyParserJSONOptions) => (
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
    bodyParser.json(options)(req, res, next)
  }
}

export const graphql = bodyParserGraphQL
