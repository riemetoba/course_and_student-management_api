const express = require('express');
const {createStudentController, getStudentsController} = require('../controllers/studentController');

const router = express.Router();

router.post('/', createStudentController);
router.get('/', getStudentsController);
// router.get('/:id', getStudentById);
// router.patch('/:id', updateStudent);
// router.delete('/:id', deleteStudent);

module.exports = router;