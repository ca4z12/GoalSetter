import { Request, Response } from 'express'
import asyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken'
import { compare, genSalt, hash } from 'bcryptjs'
import { User } from '../models/userModel'
import { generateToken } from './generateToken'
import { Document } from 'mongoose'


// @desc Register a user
// @route CREATE /api/users
// @acess Public
const registerUser = asyncHandler(async(req: Request, res: Response) => {
    
    const {
        name,
        email,
        password,
    } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400)
        throw new Error('This email is already registered')
    }

    // Hash password
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })
    

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// @desc Login a user
// @route GET /api/users/login
// @acess Public
const loginUser = asyncHandler(async(req: Request, res: Response) => {

    const { email, password } = req.body
    
    // Check if email and password are correct
    const user = await User.findOne({ email })

    if(user && (await compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        })
    } else {
        res.status(400)
        throw new Error('User or password is incorrect')
    }

})

// @desc Get user data
// @route GET /api/users/me
// @acess Private
const getMe = asyncHandler(async(req: any, res: Response) => {

    const { _id, name, email } = req.user
    
    res.status(200).json({
        id: _id,
        name,
        email
    })
    
})


export {
    registerUser,
    loginUser,
    getMe,
}