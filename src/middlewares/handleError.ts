import { NextFunction, Request, Response } from "express"

export const handleError = (error: any , req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode).json({error: error.message})
}

export default handleError
