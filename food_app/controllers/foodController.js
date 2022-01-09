import food from '../models/foodModel.js';

/*
To add a new food to the system.
{
    foodId: Number,
    foodName: String,
    foodCost: Number,
    foodType: Indian/Chinese/Mexican
}
*/
exports.createFood = async (req, res) => {
    const newFood = new food(req.body);

    await newFood.save((err, food) => {
        if (err) {
            res.status(409).json({ message: err.message });
        }

        res.status(201).json(food);
    });
};

// To return a food item specified with :foodID
exports.getFood = async (req, res) => {
    await food.findById(req.params.foodID, (err, food) => {
        if (err) {
            res.status(500).json({
                message: `Sorry Food Not Found`
            });
        } else if (!food) {
            res.status(404).json({
                message: `Sorry Food Not Found`
            })
        } else {
            res.status(200).json(food);
        }
    });
};