const { createExcursion, getAllExcursions, getExcursionById, updateExcursion, deleteExcursion, getExcursionsByCategoryId, getCategories } = require("../models/excursionModel");
const AppError = require("../utils/appError");

exports.createExcursion = async (req, res, next) => {
  try {
    const newExcursion = await createExcursion(req.body);

    if (!newExcursion) {
      throw new AppError("Creation failed", 500);
    }

    res.status(201).json({
      status: "success",
      data: newExcursion,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllExcursions = async (req, res, next) => {
  try {
    const excursions = await getAllExcursions();
    res.status(200).json({
      status: "success",
      data: excursions,
    });
  } catch (error) {
    next(error);
  }
};

exports.getExcursionById = async (req, res, next) => {
  try {
    const excursion = await getExcursionById(req.params.id);
    if (!excursion) {
      throw new AppError("Excursion not found", 404);
    }
    res.status(200).json({
      status: "success",
      data: excursion,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateExcursion = async (req, res, next) => {
  try {
    const updatedExcursion = await updateExcursion(req.params.id, req.body);
    if (!updatedExcursion) {
      throw new AppError("Update failed", 500);
    }
    res.status(200).json({
      status: "success",
      data: updatedExcursion,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteExcursion = async (req, res, next) => {
  try {
    const deletedExcursion = await deleteExcursion(req.params.id);
    if (!deletedExcursion) {
      throw new AppError("Deletion failed", 500);
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.getExcursionsByCategoryId = async (req, res, next) => {
  try {
    const getAllExcursions = await getExcursionsByCategoryId(req.params.id);

    res.status(200).json({
      status: "success",
      data: getAllExcursions
    })
  } catch (error) {
    next(errror)
  }
}

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await getCategories();

    res.status(200).json({
      status: "success",
      data: categories
    })
  } catch (error) {
    next(error)
  }
}