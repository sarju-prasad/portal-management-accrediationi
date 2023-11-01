const express = require('express');
const router = express.Router();
var User = require('../models/User');
const { ensureAuthenticated , authorizeRoles} = require('../config/checkAuth')

//------------ Importing Controllers ------------//
const authController = require('../controllers/authController')

//------------ Login Route ------------//
router.get('/login', (req, res) => res.render('login'));



//------------ Register Route ------------//
router.get('/register', (req, res) => res.render('register'));

//------------ Register POST Handle ------------//
router.post('/register', authController.registerHandle);


//------------Teacher Register Route ------------//
router.get('/tea_register', (req, res) => res.render('teacher_register'));

//------------ Register POST Handle ------------//
router.post('/tea_register', authController.tea_registerHandle);


//------------Sub Register Route ------------//
router.get('/sub_register', (req, res) => res.render('sub_register'));

//------------ Register POST Handle ------------//
router.post('/sub_register', authController.registerSubHandle);




//------------ Login POST Handle ------------//
router.post('/login', authController.loginHandle);

//------------ Logout GET Handle ------------//
router.get('/logout', authController.logoutHandle);


//--------- Placement Post Handle---//
router.post('/placement_record', authController.Placement);

//------- Slow and fster learner-----//
router.post('/student_learner', authController.Learner);


//-------- user view faculty alloted to student mentor----//
router.get('/view_faculty_as_student_mentor', (req, res) => res.render('view_faculty_as_student_mentor'));

//------------faculty alloted to student mentor Route ------------//
router.get('/faculty_allot_student', (req, res) => res.render('faculty_allot_student'));

//------------ Mentor POST Handle ------------//
router.post('/faculty_allot_student', authController.MentorHandle);


//----------------Feedback forms------------------//
router.get('/feedback', (req, res) => res.render('feedback'));


router.get('/feedback_student', (req, res) => res.render('feedback_student'));
//------- Student feedback-----//
router.post('/feedback_student', authController.Student_feed);

router.get('/feedback_parent', (req, res) => res.render('feedback_parent'));
router.post('/feedback_parent', authController.Parent_feed);

router.get('/feedback_alumni', (req, res) => res.render('feedback_alumni'));
router.post('/feedback_alumni', authController.Alumni_feed);

router.get('/feedback_employer', (req, res) => res.render('feedback_employer'));
router.post('/feedback_employer', authController.Employer_feed);


router.get('/feedback_teacher', (req, res) => res.render('feedback_teacher'));
router.post('/feedback_teacher', authController.Teacher_feed);




router.get('/cultural_competition', (req, res) => res.render('cultural_competition'));

router.get('/Celebrate_special_day', (req, res) => res.render('Celebrate_special_day'));


  
module.exports = router;


