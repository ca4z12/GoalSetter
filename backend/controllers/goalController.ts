import { Request, Response } from "express";

import asyncHandler from "express-async-handler";
import { Goal } from "../models/goalModel";
import { User } from "../models/userModel";

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req: Request, res: Response) => {

    const goals = await Goal.find({ user: req.user?.id })

    res.status(200).json(goals)
});


// @desc Post goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req: Request, res: Response) => {

    // Check if text field is filled
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text a field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user?.id
    })

    res.status(200).json(goal)
})

// @desc Update goal
// @route UPDATE /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req: Request, res: Response) => {

    const id = req.params.id

    const goal = await Goal.findById(id)

    // Check if goal exists
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // Check if user exists
    const user = await User.findById(req.user?.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }


    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(id, {
        text: req.body.text,
    }, {
        new: true
    })

    res.status(200).json(updatedGoal)
})

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req: Request, res: Response) => {

    const id = req.params.id

    const goal = await Goal.findById(id)

    // Check if goal exists
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // Check if user exists
    const user = await User.findById(req.user?.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    await Goal.findByIdAndDelete(id)

    res.status(200).json({ message: `Delete goal: ${id}` })
})

export {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}
