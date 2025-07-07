const excursionRouter = require("express").Router();
const { createExcursion, getAllExcursions, getExcursionById, updateExcursion,
    deleteExcursion, getExcursionsByCategoryId, getCategories } = require("../controllers/excursionController");
const { isAdmin, protect } = require("../middleware/authMiddleware");

excursionRouter.route("/").get(getAllExcursions);

excursionRouter.route("/").post(protect, isAdmin, createExcursion);

excursionRouter.route("/:id")
    .get(getExcursionById)



excursionRouter.route("/:id")
    .patch(protect, isAdmin, updateExcursion)
    .delete(protect, isAdmin, deleteExcursion);

excursionRouter.route("/categories").get(protect, getCategories)

excursionRouter.route("/filterByCategory/:id").get(protect, getExcursionsByCategoryId)

module.exports = excursionRouter;
