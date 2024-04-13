const User = require("../models/user");
const Department = require("../models/department");
const Course = require("../models/course");
const Fees = require("../models/fees");

const createFees = async (req, res) => {
  let requiredAttributes = [
    "userId",
    "departmentId",
    "courseId",
    "paymentMethod",
    "paidAmount",
  ];

  let missingAttributes = [];
  requiredAttributes.forEach((attributeName) => {
    let attributeValue = req.body[attributeName];
    if (!attributeValue || attributeValue === "") {
      missingAttributes.push(attributeName);
    }
  });

  if (req.body.paymentMethod === "Online" && !req.body.transactionId) {
    return res.status(400).json({
      success: false,
      message: "TransactionId is required for Online transaction",
    });
  }

  if (missingAttributes.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Required Fields are missing: ${missingAttributes.join(", ")}`,
    });
  }
  try {
    if (await Fees.findOne({ transactionId: req.body.transactionId })) {
      return res
        .status(400)
        .json({ success: false, message: "Duplicate TransactionId Recieved." });
    }
    const [user, department, course] = await Promise.all([
      User.findById(req.body.userId),
      Department.findById(req.body.departmentId),
      Course.findById(req.body.courseId),
    ]);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${req.body.userId} not found`,
      });
    }
    if (!department) {
      return res.status(404).json({
        success: false,
        message: `Department with ID ${req.body.departmentId} not found`,
      });
    }
    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course with ID ${req.body.courseId} not found`,
      });
    }

    const newFee = req.body;
    const savedFee = new Fees(newFee);
    await savedFee.save();
    user.DueAmount = Math.max(
      parseInt(user.DueAmount, 10) - parseInt(req.body.paidAmount, 10),
      0
    );
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Fee created successfully" });
  } catch (error) {
    console.error("Error creating fee:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const updateFees = async (req, res) => {
  try {
    const { id } = req.params;
    const fee = await Fees.findById(id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: `Fee with ID ${id} not found`,
      });
    }

    const updatedFee = await Fees.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: updatedFee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteFees = async (req, res) => {
  try {
    const { id } = req.params;
    const fee = await Fees.findById(id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: `Fee with ID ${id} not found`,
      });
    }

    await Fees.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `Fee with ID ${id} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFees = async (req, res) => {
  try {
    const fees = await Fees.find();

    res.status(200).json({
      success: true,
      data: fees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFeesByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const feesByUser = await Fees.find({ userId: userId })
      .populate("departmentId")
      .populate("courseId");

    if (feesByUser.length === 0) {
      return res.status(201).json({
        success: true,
        message: "No Fees found",
      });
    }
    if (!feesByUser) {
      return res.status(401).json({
        success: false,
        message: "error during fetching Fees ",
      });
    }
    res.status(201).json({
      success: true,
      data: feesByUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSingleFeeDetailById = async (req, res) => {
  const feeId = req.params.id;
  try {
    const fee = await Fees.findById(feeId);
    if (!fee) {
      return res
        .status(404)
        .json({ success: false, message: "No Details Found for the FeeId" });
    }
    return res.status(200).json({
      success: true,
      data: fee,
      message: "successfully fetched fee detail",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getFeeDetailByTransactionId = async (req, res) => {
  const transactionId = req.params.id;
  try {
    const fee = await Fees.findOne({ transactionId: transactionId });
    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "No Details Found for the TransactionId",
      });
    }

    return res.status(200).json({
      success: true,
      data: fee,
      message: "Successfully Fetched Transaction Details",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getFeesByDepartment = async (req, res) => {
  try {
    let departmentWiseFees = {};
    const allFees = await Fees.find();
    for (let fee of allFees) {
      const departmentId = fee.departmentId.toString();
      if (!departmentWiseFees[departmentId]) {
        departmentWiseFees[departmentId] = [];
      }
      departmentWiseFees[departmentId].push(fee);
    }

    return res.status(200).json({ success: true, data: departmentWiseFees });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getFeesByCourse = async (req, res) => {
  try {
    let courseWiseFees = {};
    const allFees = await Fees.find();
    for (let fee of allFees) {
      const courseId = fee.courseId.toString();
      if (!courseWiseFees[courseId]) {
        courseWiseFees[courseId] = [];
      }
      courseWiseFees[courseId].push(fee);
    }

    return res.status(200).json({ success: true, data: courseWiseFees });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const dueAmountByCourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    const users = await User.find({ Course: courseId });
    const usersWithDueAmount = users?.filter((item) => item?.DueAmount > 0);
    const totalDueAmount = usersWithDueAmount?.reduce((acc, cur) => {
      return acc + Number(cur.DueAmount);
    }, 0);
    return res.json({
      success: true,
      dueAmount: totalDueAmount,
      usersWithDueAmount: usersWithDueAmount,
      message: "Succesfully fetched dueAmounts By course",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const dueAmountBySection = async (req, res) => {
  const sectionId = req.params.id;
  try {
    const users = await User.find({ Section: sectionId });
    const usersWithDueAmount = users?.filter((item) => item?.DueAmount > 0);
    const totalDueAmount = usersWithDueAmount?.reduce((acc, cur) => {
      return acc + Number(cur.DueAmount);
    }, 0);
    return res.json({
      success: true,
      dueAmount: totalDueAmount,
      sectionWiseUsers: usersWithDueAmount,
      message: "Succesfully fetched dueAmounts By Section",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createFees,
  updateFees,
  deleteFees,
  getFees,
  getFeesByUserId,
  getSingleFeeDetailById,
  getFeeDetailByTransactionId,
  getFeesByDepartment,
  getFeesByCourse,
  dueAmountByCourse,
  dueAmountBySection
};
