const express = require('express');
const validateObjectId = require('../middlewares/validateObjectId');
const {
    createCourse, getCourses, getCourseById, updateCourse, deleteCourse, getCourseStudents
} = require('../controllers/courseController');

const router = express.Router();

router.post('/', createCourse);
router.get('/', getCourses);
router.get('/:id', validateObjectId('id'), getCourseById);
router.patch('/:id', validateObjectId('id'), updateCourse);
router.delete('/:id', validateObjectId('id'), deleteCourse);
router.get('/:id/students', validateObjectId('id'), getCourseStudents);

module.exports = router;