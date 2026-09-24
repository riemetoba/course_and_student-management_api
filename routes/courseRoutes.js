const express = require('express');
const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    getCourseStudents
} = require('../controllers/courseController');

const router = express.Router();

router.post('/', createCourse);
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.patch('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.get('/:id/students', getCourseStudents);

module.exports = router;