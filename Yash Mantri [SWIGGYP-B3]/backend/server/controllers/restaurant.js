const restaurant = require('../models').restaurant;
const restaurantmenu = require('../models').restaurantmenu;
module.exports = {
    create(req, res) {
        return restaurant
            .create({
                title: req.body.title,
                content: req.body.content,
            })
            .then(restaurant => res.status(201).send(restaurant))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return restaurant
            .findAll({
                include: [{
                    model: restaurantmenu,
                    as: 'restaurantmenu',
                }],
            })
            .then(restaurant => res.status(200).send(restaurant))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return restaurant
            .findByPk(req.params.restaurantId, {
                include: [{
                    model: restaurantmenu,
                    as: 'restaurantmenu',
                }],
            })
            .then(restaurant => {
                if (!restaurant) {
                    return res.status(404).send({
                        message: 'restaurant Not Found',
                    });
                }
                return res.status(200).send(restaurant);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return restaurant
            .findByPk(req.params.restaurantId, {
                include: [{
                    model: restaurantmenu,
                    as: 'restaurantmenu',
                }],
            })
            .then(restaurant => {
                if (!restaurant) {
                    return res.status(404).send({
                        message: 'restaurant Not Found',
                    });
                }
                return restaurant
                    .update({
                        title: req.body.title || restaurant.title,
                    })
                    .then(() => res.status(200).send(restaurant)) // Send back the updated restaurant.
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
        return restaurant
            .findByPk(req.params.restaurantId)
            .then(restaurant => {
                if (!restaurant) {
                    return res.status(400).send({
                        message: 'restaurant Not Found',
                    });
                }
                return restaurant
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

};