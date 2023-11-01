const passport = require("passport");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_KEY = "jwtactive2002";
const JWT_RESET_KEY = "jwtreset2002";

//------------ User Model ------------//
const User = require("../models/User");
const Subject = require("../models/Subject");
const Placements = require("../models/Placement");
const Internships = require("../models/Internship");
const Learners = require("../models/Learner");
const Learner = require("../models/Learner");
const Mentor = require("../models/Mentor");
const Student_feeds = require("../models/Student_feed");
const Parent_feeds = require("../models/Parent_feed");
const Alumni_feeds = require("../models/Alumni_feed");
const Teacher_feeds = require("../models/Teacher_feed");
const Employer_feeds = require("../models/Employer_feed");
//------------ Register Handle ------------//
exports.registerHandle = (req, res) => {
  const {
    name,
    email,
    phoneno,
    rollno,
    password,
    password2,
    course,
    branch,
    year,
    batch,
    gender,
    address,
  } = req.body;
  const { role } = "user";
  let errors = [];

  //------------ Checking required fields ------------//
  if (
    !name ||
    !email ||
    !course ||
    !branch ||
    !year ||
    !batch ||
    !gender ||
    !phoneno ||
    !rollno ||
    !password ||
    !address ||
    !password2
  ) {
    errors.push({ msg: "Please enter required fields" });
  }

  //------------ Checking password mismatch ------------//
  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  //------------ Checking password length ------------//
  if (password.length < 8) {
    errors.push({ msg: "Password must be at least 8 characters" });
  }
  if (phoneno.length < 10 || phoneno.length > 10) {
    errors.push({ msg: "Phone No must be 10 digit" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      phoneno,
      rollno,
      course,
      branch,
      year,
      batch,
      gender,
      password,
      password2,
      added_by: "Self",
      role: "user",
      address,
    });
  } else {
    //------------ Validation passed ------------//
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //------------ User already exists ------------//
        errors.push({ msg: "Email ID already registered" });
        res.render("register", {
          errors,
          name,
          email,
          phoneno,
          rollno,
          course,
          branch,
          year,
          batch,
          gender,
          password,
          password2,
          added_by: "Self",
          role: "user",
          address,
        });
      } else {
        const token = jwt.sign(
          { name, email, course,branch, year, batch, phoneno, rollno, gender, password, address },
          JWT_KEY,
          { expiresIn: "30m" }
        );

        let errors = [];
        if (token) {
          jwt.verify(token, JWT_KEY, (err, decodedToken) => {
            if (err) {
              req.flash(
                "error_msg",
                "Incorrect or expired link! Please register again."
              );
              res.redirect("/register");
            } else {
              const {
                name,
                email,
                course,
                branch,
                year,
                batch,
                phoneno,
                rollno,
                gender,
                password,
                address,
              } = decodedToken;
              User.findOne({ email: email }).then((user) => {
                if (user) {
                  //------------ User already exists ------------//
                  req.flash(
                    "error_msg",
                    "Email ID already registered! Please log in."
                  );
                  res.redirect("/login");
                } else {
                  const newUser = new User({
                    name,
                    email,
                    phoneno,
                    rollno,
                    course,
                    branch,
                    year,
                    batch,
                    gender,
                    password,
                    added_by: "Self",
                    role: "user",
                    address,
                  });

                  bcryptjs.genSalt(10, (err, salt) => {
                    bcryptjs.hash(newUser.password, salt, (err, hash) => {
                      if (err) throw err;
                      newUser.password = hash;
                      newUser
                        .save()
                        .then((user) => {
                          req.flash(
                            "success_msg",
                            "Account Registered. You can now log in."
                          );

                          res.redirect("/login");
                        })
                        .catch((err) => console.log(err));
                    });
                  });
                }
              });
            }
          });
        } else {
          console.log("Account activation error!");
        }
      }
    });
  }
};

//-------------Register Teacher Handle------//
exports.tea_registerHandle = (req, res) => {
  const {
    name,
    email,
    phoneno,
    password,
    password2,
    department,
    qualification,
    roa,
    gender,
  } = req.body;
  const { role } = "teacher";
  let errors = [];

  //------------ Checking required fields ------------//
  if (
    !name ||
    !email ||
    !department ||
    !qualification ||
    !roa ||
    !gender ||
    !phoneno ||
    !password ||
    !password2
  ) {
    errors.push({ msg: "Please enter required fields" });
  }

  //------------ Checking password mismatch ------------//
  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  //------------ Checking password length ------------//
  if (password.length < 8) {
    errors.push({ msg: "Password must be at least 8 characters" });
  }
  if (phoneno.length < 10 || phoneno.length > 10) {
    errors.push({ msg: "Phone No must be 10 digit" });
  }

  if (errors.length > 0) {
    res.render("tea_register", {
      errors,
      name,
      email,
      phoneno,
      department,
      qualification,
      roa,
      gender,
      password,
      password2,
      added_by: "Self",
      role: "teacher",
    });
  } else {
    //------------ Validation passed ------------//
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //------------ User already exists ------------//
        errors.push({ msg: "Email ID already registered" });
        res.render("tea_register", {
          errors,
          name,
          email,
          phoneno,
          department,
          qualification,
          roa,
          gender,
          password,
          password2,
          added_by: "Self",
          role: "teacher",
        });
      } else {
        const token = jwt.sign(
          {
            name,
            email,
            department,
            qualification,
            roa,
            phoneno,
            gender,
            password,
          },
          JWT_KEY,
          { expiresIn: "30m" }
        );

        let errors = [];
        if (token) {
          jwt.verify(token, JWT_KEY, (err, decodedToken) => {
            if (err) {
              req.flash(
                "error_msg",
                "Incorrect or expired link! Please register again."
              );
              res.redirect("/register");
            } else {
              const {
                name,
                email,
                department,
                qualification,
                roa,
                phoneno,
                gender,
                password,
              } = decodedToken;
              User.findOne({ email: email }).then((user) => {
                if (user) {
                  //------------ User already exists ------------//
                  req.flash(
                    "error_msg",
                    "Email ID already registered! Please log in."
                  );
                  res.redirect("/login");
                } else {
                  const newUser = new User({
                    name,
                    email,
                    phoneno,
                    department,
                    qualification,
                    roa,
                    gender,
                    password,
                    added_by: "Self",
                    role: "teacher",
                  });

                  bcryptjs.genSalt(10, (err, salt) => {
                    bcryptjs.hash(newUser.password, salt, (err, hash) => {
                      if (err) throw err;
                      newUser.password = hash;
                      newUser
                        .save()
                        .then((user) => {
                          req.flash(
                            "success_msg",
                            "Account Registered. You can now log in."
                          );

                          res.redirect("/login");
                        })
                        .catch((err) => console.log(err));
                    });
                  });
                }
              });
            }
          });
        } else {
          console.log("Account activation error!");
        }
      }
    });
  }
};

//------------ Register Subject  ------------//
exports.registerSubHandle = (req, res) => {
  const { sub_code, sub_name, sub_dept, semester } = req.body;
  let errors = [];
  //------------ Checking required fields ------------//
  if (!sub_name || !sub_code || !sub_dept) {
    errors.push({ msg: "Please enter required fields" });
  }
  if (errors.length > 0) {
    res.render("sub_register", {
      errors,
      sub_name,
      sub_code,
      sub_dept,
    });
  } else {
    //------------ Validation passed ------------//
    Subject.findOne({ sub_code: sub_code, semester: semester }).then((user) => {
      if (user) {
        //------------ User already exists ------------//
        errors.push({ msg: "Subject already register" });
        res.render("sub_register", {
          errors,
          sub_name,
          sub_code,
          sub_dept,
          semester
        });
      } else {
        const newSub = new Subject({
          sub_name,
          sub_code,
          sub_dept,
          semester,
          added_by: req.user.name,
        });
        newSub
          .save()
          .then((user) => {
            req.flash("success_msg", "Subject Registered");

            res.redirect("/sub_register");
          })
          .catch((err) => console.log(err));
      }
    });
  }
};


//------------ Login Handle ------------//
exports.loginHandle = function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      next(err);
      return;
    }
    // User does not exist
    if (!user) {
      req.flash("error", "Invalid email or password");
      res.redirect("/login");
      return;
    }
    req.logIn(user, function (err) {
      // Invalid password
      if (err) {
        req.flash("error", "Invalid email or password");
        next(err);
        return;
      }
      console.log(req.user.role);
      if (req.user.role == "user")
        res.redirect(req.session.redirectTo || "/dashboard");

      if (req.user.role == "admin")
        res.redirect(req.session.redirectTo || "/dashboard1");

      if (req.user.role == "teacher")
        res.redirect(req.session.redirectTo || "/dashboard2");

      return;
    });
  })(req, res, next);
};

//------------ Logout Handle ------------//
exports.logoutHandle = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/");
};


//------------ Faculty alloted to student mentor  ------------//
exports.MentorHandle = (req, res) => {
  const { date, branch_year, name, rollno, topic } = req.body;
  let errors = [];
  //------------ Checking required fields ------------//
  if (!date || !branch_year || !name || !rollno || !topic) {
    errors.push({ msg: "Please enter required fields" });
  }
  if (errors.length > 0) {
    res.render("faculty_allot_student", {
      errors,
      date,
      branch_year,
      name,
      rollno,
      topic,
    });
  } else {
    //------------ Validation passed ------------//
    Mentor.findOne({ name: name, rollno: rollno }).then((user) => {
      if (user) {
        //------------ User already exists ------------//
        errors.push({ msg: "faculty already allorted to student mentor" });
        res.render("faculty_allot_student", {
          errors,
          date,
          branch_year,
          name,
          rollno,
          topic,
        });
      } else {
        const newMen = new Mentor({
          date,
          branch_year,
          name,
          rollno,
          topic,
        });
        newMen
          .save()
          .then((user) => {
            req.flash("success_msg", "faculty allorted to mentor");

            res.redirect("/faculty_allot_student");
          })
          .catch((err) => console.log(err));
      }
    });
  }
};



//--------- datacollection for placement---//
exports.Placement = (req, res) => {
  // validate request
  if (!req.body) {
      req.flash('error_msg', 'Please Enter All Fields !!!');
      return;
  }
  // new user
  const Placement = new Placements({
      rollno: req.body.rollno,
      company: req.body.company,
      package: req.body.package,
      role: req.body.role,
      joindate: req.body.joindate, 
  })
  // save user in the database
  Placement.save(Placement)
      .then(data => {
          //res.send(data)
          req.flash('success_msg', 'Data Submitted !!!');
          res.redirect('/placement_record');
      })
      .catch(err => {
          req.flash('error_msg', 'Data Not Submitted !!!');
          res.redirect('/placement_record');
      });

}


//--------- data slow and fast ---//
exports.Learner = (req, res) => {
  // validate request
  if (!req.body) {
      req.flash('error_msg', 'Please Enter All Fields !!!');
      return;
  }
  // new user
  const Learner = new Learners({
      rollno: req.body.rollno,
      type: req.body.type,
      sessions: req.body.sessions,
      class: req.body.class,
      topic: req.body.topic,
      date: req.body.date, 
  })
  // save user in the database
  Learner.save(Learner)
      .then(data => {
          //res.send(data)
          req.flash('success_msg', 'Data Submitted !!!');
          res.redirect('/view_slowlearner');
      })
      .catch(err => {
        console.log(err);
          req.flash('error_msg', 'Data Not Submitted !!!');
          res.redirect('/student_learner');
      });

}



//--------- Student feedback ---//
exports.Student_feed = (req, res) => {
  // validate request
  if (!req.body) {
      req.flash('error_msg', 'Please Enter All Fields !!!');
      return;
  }
  // new user
  const Student_feed = new Student_feeds({
      email: req.body.email,
      academic_year: req.body.academic_year,
      semester: req.body.semester,
      course1: req.body.course1,
      RadioOption1: req.body.RadioOption1,
      RadioOption2: req.body.RadioOption2, 
      RadioOption3: req.body.RadioOption3, 
      RadioOption4: req.body.RadioOption4, 
      RadioOption5: req.body.RadioOption5,
  })
  // save user in the database
  Student_feed.save(Student_feed)
      .then(data => {
          //res.send(data)
          req.flash('success_msg', 'Data Submitted !!!');
          res.redirect('/feedback_student');
      })
      .catch(err => {
        console.log(err);
          req.flash('error_msg', 'Data Not Submitted !!!');
          res.redirect('/feedback_student');
      });

}

//--------- Parnet feedback ---//
exports.Parent_feed = (req, res) => {
  // validate request
  if (!req.body) {
      req.flash('error_msg', 'Please Enter All Fields !!!');
      return;
  }
  // new user
  const Parent_feed = new Parent_feeds({
      email: req.body.email,
      name: req.body.name,
      relation: req.body.relation,
      s_name: req.body.s_name,
      branch: req.body.branch,
      academic_year: req.body.academic_year,
      Option1: req.body.Option1,
      Option2: req.body.Option2, 
      Option3: req.body.Option3, 
      Option4: req.body.Option4, 
      Option5: req.body.Option5,
  })
  // save user in the database
  Parent_feed.save(Parent_feed)
      .then(data => {
          //res.send(data)
          req.flash('success_msg', 'Data Submitted !!!');
          res.redirect('/feedback_parent');
      })
      .catch(err => {
        console.log(err);
          req.flash('error_msg', 'Data Not Submitted !!!');
          res.redirect('/feedback_parent');
      });

}

//--------- Alumni feedback ---//
exports.Alumni_feed = (req, res) => {
  // validate request
  if (!req.body) {
      req.flash('error_msg', 'Please Enter All Fields !!!');
      return;
  }
  // new user
  const Alumni_feed = new Alumni_feeds({
      email: req.body.email,
      department: req.body.department,
      name: req.body.name,
      phone: req.body.phone,
      degree: req.body.degree,
      branch: req.body.branch,
      passing_year: req.body.passing_year,
      enrollment_no: req.body.enrollment_no,
      organization_name: req.body.organization_name, 
      designation: req.body.designation, 
      joining_year: req.body.joining_year, 
  })
  // save user in the database
  Alumni_feed.save(Alumni_feed)
      .then(data => {
          //res.send(data)
          req.flash('success_msg', 'Data Submitted !!!');
          res.redirect('/feedback_alumni');
      })
      .catch(err => {
        console.log(err);
          req.flash('error_msg', 'Data Not Submitted !!!');
          res.redirect('/feedback_alumni');
      });

}


//--------- Teacher feedback ---//
exports.Teacher_feed = (req, res) => {
  // validate request
  if (!req.body) {
      req.flash('error_msg', 'Please Enter All Fields !!!');
      return;
  }
  // new user
  const Teacher_feed = new Teacher_feeds({
      email: req.body.email,
      name: req.body.name,
      department: req.body.department,
      academic_year: req.body.academic_year,
      Option1: req.body.Option1,
      Option2: req.body.Option2, 
      Option3: req.body.Option3, 
      Option4: req.body.Option4, 
      Option5: req.body.Option5,
  })
  // save user in the database
  Teacher_feed.save(Teacher_feed)
      .then(data => {
          //res.send(data)
          req.flash('success_msg', 'Data Submitted !!!');
          res.redirect('/feedback_teacher');
      })
      .catch(err => {
        console.log(err);
          req.flash('error_msg', 'Data Not Submitted !!!');
          res.redirect('/feedback_teacher');
      });

}


//--------- Empoyer feedback ---//
exports.Employer_feed = (req, res) => {
  // validate request
  if (!req.body) {
      req.flash('error_msg', 'Please Enter All Fields !!!');
      return;
  }
  // new user
  const Employer_feed = new Employer_feeds({
      email: req.body.email,
      name: req.body.name,
      organization_name: req.body.organization_name, 
      designation: req.body.designation,
      phone: req.body.phone,
      address: req.body.address,
      Option1: req.body.Option1,
      Option2: req.body.Option2, 
      Option3: req.body.Option3, 
      Option4: req.body.Option4, 
      Option5: req.body.Option5,
  })
  // save user in the database
  Employer_feed.save(Employer_feed)
      .then(data => {
          //res.send(data)
          req.flash('success_msg', 'Data Submitted !!!');
          res.redirect('/feedback_employer');
      })
      .catch(err => {
        console.log(err);
          req.flash('error_msg', 'Data Not Submitted !!!');
          res.redirect('/feedback_employer');
      });

}






