import Router from 'express';
import { 
    deleteGoal, 
    getGoals, 
    setGoal, 
    updateGoal } from '../controllers/goalController';
import { authMiddleware } from '../middlewares/authMiddleware';

const goalrouter = Router();

goalrouter.route('/').get(authMiddleware, getGoals).post(authMiddleware, setGoal);

goalrouter.route('/:id').put(authMiddleware, updateGoal).delete(authMiddleware, deleteGoal);

export { goalrouter }
