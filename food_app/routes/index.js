import user from '../controllers/userController';
import food from '../controllers/foodController';

export default (app) => {
    app.route('/api/register')
        .post(user.createUser);

    app.route('/api/authenticate')
        .post(user.authenticateUser);
        
    app.route('/api/users')
        .get(user.getAllUsers);
        
    app.route('/api/users/:userID')
        .get(user.getUser)
        .put(user.updateUser)
        .delete(user.deleteUser);

    app.route('/api/food')
        .post(food.createFood);

    app.route('/api/food/:foodID')
        .get(food.getFood);
};