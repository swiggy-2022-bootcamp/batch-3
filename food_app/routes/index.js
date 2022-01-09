import { createUser, authenticateUser, getAllUsers, getUser, updateUser, deleteUser } from '../controllers/userController';
import { createFood, getFood } from '../controllers/foodController';

export default (app) => {
    app.route('/api/register')
        .post(createUser);

    app.route('/api/authenticate')
        .post(authenticateUser);

    app.route('/api/users')
        .get(getAllUsers);

    app.route('/api/users/:userID')
        .get(getUser)
        .patch(updateUser)
        .delete(deleteUser);

    app.route('/api/food')
        .post(createFood);

    app.route('/api/food/:foodID')
        .get(getFood);
};