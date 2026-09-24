const Course = require('../models/Course');
const mongoose = require('mongoose');

const createCourse = async (req, res) => {
    try {
        const { title, description, price, category, duration, isPublished } = req.body;

        if (price <= 0) {
            return res.status(400).json({ error: "Price must be greater than 0" });
        }

        if (duration < 1) {
            return res.status(400).json({ error: "Duration must be 1 month or more" });
        }

        const existingCourse = await Course.findOne({ title, category });
        if (existingCourse) {
            return res.status(400).json({ error: "A course with this title and category already exists" });
        }

        const course = new Course({ title, description, price, category, duration, isPublished });
        await course.save();

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Course ID format" });
        }

        const course = await Course.findById(id);
        
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Course ID format" });
        }

        const course = await Course.findByIdAndUpdate(id, req.body, { 
            new: true, 
            runValidators: true 
        });

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Course ID format" });
        }

        const course = await Course.findByIdAndDelete(id);
        
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
};