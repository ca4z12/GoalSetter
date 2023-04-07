import { JwtPayload, verify } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { User } from '../models/userModel'
import { NextFunction, Request, Response } from 'express'

const authMiddleware = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = verify(token, '64b04d41c5f713e4103c7ac0b38e77a2') as JwtPayload

            // Get user from the token
            const user = await User.findById(decoded.id).select('-password')
            req.user = user

            next()

        } catch (err) {
            res.status(401)
            throw new Error('Not authorized')
        }

        if(!token) {
            res.status(401)
            throw new Error('Not authorized, no token')
        }
    }
})


export { authMiddleware }



