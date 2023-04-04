import Router from 'express';
import { 
    deleteGoal, 
    getGoals, 
    setGoal, 
    updateGoal } from '../controllers/goalController';

const goalrouter = Router();

goalrouter.route('/').get(getGoals).post(setGoal);

goalrouter.route('/:id').put(updateGoal).delete(deleteGoal);

export { goalrouter }
