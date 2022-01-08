const FoodItem = require("../model/food.model");

async function addFoodItem(req, res) {
  try {
    const { foodId, foodName, foodCost, foodType } = req.body;
    const newFoodItem = await FoodItem.create({
      foodId,
      foodName,
      foodCost,
      foodType,
    });
    res.status(201).json(newFoodItem)
  } catch (err) {
    res.json(["Submission Failed",err])
  }
}

async function getSingleFoodItem(req, res) {
  try {
    const { foodId } = req.params;
    FoodItem.find({ foodId: foodId }, function (err, docs) {
      if (err) {
        res.status(404).json("err");
      } else {
        if (docs.length == 0) {
          res.status(404).json(`Sorry user with userid ${userId} not found`);
        }
        res.status(200).json(docs[0]);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

// async function updateUser(req, res) {
//   try {
//     const { userId } = req.params;
//     const modifiedUser = req.body
//     User.findOneAndUpdate(
//       { id: userId },
//       modifiedUser,
//       {new: true},
//       function (err, docs) {
//         if (err) {
//           console.log(err);
//         } else {
//           if(docs){
//             res.status(200).json(docs)
//           }
//           else{
//             res.status(404).json(`Sorry user with userid ${userId} not found`)
//           }
//         }
//       }
//     );
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function deleteUser(req, res) {
//   try {
//     const { userId } = req.params;
//     User.findOneAndDelete({ id: userId }, function (err, docs) {
//       if (err) {
//         console.log(err);
//         res.status(404).json(`Sorry user with ${userId} not found`);
//       } else {
//         res.status(200).json("User Deleted Successfully");
//       }
//     });
//   } catch (err) {
//     console.log("error", err);
//   }
// }

module.exports = {
  addFoodItem,
  getSingleFoodItem
};
