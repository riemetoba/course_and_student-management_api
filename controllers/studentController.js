const Student = require("../models/studentSchema");
const Course = require('../models/courseSchema');
const mongoose = require("mongoose");

let createStudent = async (req, res) => {
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

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===================================
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Student ID format",
      });
    }

    const student = await Student.findById(id).populate("enrolledCourses");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===================================

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Student ID format",
      });
    }

    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ===================================

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Student ID format",
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (student.enrolledCourses.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete student. They are enrolled in courses.",
      });
    }

    await Student.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ===================================

const enrollStudent = async (req, res) => {
    try {
        const { studentId, courseId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        if (!course.isPublished) {
            return res.status(400).json({ error: "Cannot enroll. Course is not published yet" });
        }

        if (student.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ error: "Student is already enrolled in this course" });
        }

        student.enrolledCourses.push(courseId);
        await student.save();

        res.status(200).json({ 
            message: "Successfully enrolled in the course", 
            student 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// ===================================

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  enrollStudent
};
