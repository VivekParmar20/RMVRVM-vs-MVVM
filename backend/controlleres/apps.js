const responseManager = require("../utilities/responseManager");
const App = require("../models/apps");

exports.listApps = async (req, res) => {
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.setHeader("Access-Control-Allow-Origin", "*");

    App.find()
        .lean()
        .then((appList) => {
            return responseManager.onSuccess(
                "App list",
                appList,
                res
            );
        })
        .catch((error) => {
            return responseManager.onError(error, res);
        })
};


exports.flterApps = async (req, res) => {
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.setHeader("Access-Control-Allow-Origin", "*");

        const {minAge, maxAge} = req.query;
        let filter = {};

  // Apply age filters if provided
  if (minAge && maxAge) {
    filter.age = { $gte: parseInt(minAge), $lte: parseInt(maxAge) };
  } else if (minAge) {
    filter.age = { $gte: parseInt(minAge) };
  } else if (maxAge) {
    filter.age = { $lte: parseInt(maxAge) };
  }

  App.find(filter)
    .lean()
    .then((appList) => {
      return responseManager.onSuccess("Filtered App list", appList, res);
    })
    .catch((error) => {
      return responseManager.onError(error, res);
    });
};
