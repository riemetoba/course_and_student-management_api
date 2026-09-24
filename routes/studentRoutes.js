const express = require('express');
const validateObjectId = require('../middlewares/validateObjectId');
const {createStudent, getStudents, getStudentById, updateStudent, deleteStudent, enrollStudent} = require('../controllers/studentController');

const router = express.Router();

router.post('/', createStudent);
router.get('/', getStudents);
router.get('/:id', validateObjectId('id'), getStudentById);
router.patch('/:id', validateObjectId('id'), updateStudent);
router.delete('/:id', validateObjectId('id'), deleteStudent);
router.post('/:studentId/enroll/:courseId', validateObjectId('studentId'), validateObjectId('courseId'), enrollStudent);

module.exports = router;