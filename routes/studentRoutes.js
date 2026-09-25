const express = require('express');
const {createStudent, getStudents, getStudentById, updateStudent, deleteStudent, enrollStudent} = require('../controllers/studentController');

const router = express.Router();

router.post('/', createStudent);
router.get('/', getStudents);
router.get('/:id', getStudentById);
router.patch('/:id',  updateStudent);
router.delete('/:id',  deleteStudent);
router.post('/:studentId/enroll/:courseId', enrollStudent);

module.exports = router;