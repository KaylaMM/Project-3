const express = require("express");
const router = express.Router();
// const User = require("../models/User");
const Plant = require("../models/Plant");
// const uploadCloud = require("../config/cloudinary-setup");
// const ensureLogin = require("connect-ensure-login");

router.get("/plant", (req, res, next) => {
  //React Form Component
  res.json(allPlants);
});

//Create a new Plant
router.post("/plant", (req, res, next) => {
  const {
    plant,
    location,
    dateLastWatered,
    amountOfWaterNeeded,
    progressPic,
  } = req.body;
  const newPlant = new Plant({
    plant,
    location,
    dateLastWatered,
    amountOfWaterNeeded,
    progressPic,
  });

  newPlant
    .save()
    .then((plant => {
      res.render(plant)
    })
    .catch((error) => {
      message: "Something went wrong";
    });
});

//Read (Plant) Documents
router.get('/plant', (req, res, next) => {
  Plant.find(allUserPlantsFromDB)
  .then(allUserPlantsFromDB => {
    console.log('Retrieved plants from DB:', allUserPlantsFromDB);
  })
  .catch(error => {
    console.log('Error while getting the plants from the DB: ', error);
  })
  res.json(allPlants)
})

router.get('/plant/:plantId', (req, res, next) => {
  console.log('The ID from the URL is: ', plantId);
  res.json(allPlants);
});

router.get('/plant/:plantId', (req, res, next) => {
  Book.findOne({'_id': req.params.bookId})
    .then(thePlant => {
      res.json(allPlants, { plant: thePlant });
    })
    .catch(error => {
      console.log('Error while retrieving plant details: ', error);
    })
});


//Update a Plant
router.get('/plant', (req, res, next) => {
  //React Update Form Component 
  res.json(plantUpdate)
});

router.get('/plant', (req, res, next) => {
  Plant.findOne({_id: req.querey.plant_id})
  .then((plant) => {
    res.json(plantUpdate, {plant});
  })
  .catch((error) => {
    console.log(error);
  })
});

router.post('/plant', (req, res, next) => {
  const {
    plant,
    location,
    dateLastWatered,
    amountOfWaterNeeded,
    progressPic,
  } = req.body;

  Plant.update({_id: req.query.plant_id}, { $set: {plant, location, dateLastWatered, amountOfWaterNeeded, progressPic}
  })
  .then((updatedPlant) => {
    res.json(allPlants, {updatedPlant});
  })
  .catch((error) => {
    console.log(error);
  })
});

//Delete Plant
router.post('/plant', (req, res, next) => {
  Plant.delete({_id: req.params.plant_id}, {
    $pull: {plants: req.params.plant_id}
  })
  .then((deletedPlant) => {
    res.redirect('plants')

  })
  .catch((error) => {
    console.log(error);
  })
})