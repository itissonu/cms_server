const express = require("express");

const {
  createFees,
  getFees,
  updateFees,
  deleteFees,
  getFeesByUserId,
  getFeeDetailByTransactionId,
  getSingleFeeDetailById,
  getFeesByDepartment,
  getFeesByCourse,
  dueAmountByCourse,
  dueAmountBySection,
} = require("../controller/feesController");

const router = express.Router();

router.post("/create", createFees);
router.put("/update/:id", updateFees);
router.delete("/:id", deleteFees);
router.get("/getAllFees", getFees);
router.get("/getFeesByUserId/:id", getFeesByUserId);
router.get("/feeByTransactionId/:id", getFeeDetailByTransactionId);
router.get("/singleFeeDetails/:id", getSingleFeeDetailById);
router.get("/getFeesByDepartment", getFeesByDepartment);
router.get("/getFeesByCourse", getFeesByCourse);
router.get("/DueAmountByCourse/:id", dueAmountByCourse);
router.get("/dueAmountBySection/:id", dueAmountBySection);

module.exports = router;
