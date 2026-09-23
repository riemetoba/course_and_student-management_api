const Student = require("../models/studentSchema");
const mongoose = require("mongoose");

let createStudentController = async (req, res) => {
  try {
    let { name, email, phone, age } = req.body;

    if (age < 18) {
      return res.status(400).json({
        success: false,
        message: "Student age must be 18 or above",
      });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const student = new Student({ name, email, phone, age });
    await student.save();

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================



module.exports = { createStudentController };
