const express = require('express');
const {createStudentController} = require('../controllers/studentController');

const router = express.Router();

router.post('/', createStudentController);
// router.get('/', getStudents);
// router.get('/:id', getStudentById);
// router.patch('/:id', updateStudent);
// router.delete('/:id', deleteStudent);

module.exports = router;