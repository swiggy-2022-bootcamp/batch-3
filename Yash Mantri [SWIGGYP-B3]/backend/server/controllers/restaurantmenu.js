const restaurantmenu = require('../models').restaurantmenu;

module.exports = {
    create(req, res) {
        return restaurantmenu
            .create({
                content: req.body.content,
                id: req.body.id,
                price: req.body.price,
                restaurantId: parseInt(req.params.restaurantId),
            })
            .then(restaurantmenu => res.status(201).send(restaurantmenu))
            .catch(error => res.status(400).send(error));
    },
};