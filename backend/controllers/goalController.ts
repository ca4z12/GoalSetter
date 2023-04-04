import { Request, Response } from "express";

import asyncHandler from "express-async-handler";
import { Goal } from "../models/goalModel";

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req: Request, res: Response) => {

    const goals = await Goal.find()

    res.status(200).json(goals)
});


// @desc Post goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req: Request, res: Response) => {

    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text a field')
    }

    const goal = await Goal.create({ text: req.body.text })

    res.status(200).json(goal)
})

// @desc Update goal
// @route UPDATE /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req: Request, res: Response) => {

    const id = req.params.id

    const goal = await Goal.findById(id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
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

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    await Goal.findByIdAndDelete(id)

    res.status(200).json({ message: `Delete goal: ${id}`})
})

export { 
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}