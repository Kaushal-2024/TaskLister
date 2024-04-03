const router  =  require('express').Router();

const index = require('./../controller/index')
const htmlTask = require('../controller/t1tot6html')
const {  formGet,formPost,getAllUser,getOneUserDetailByID } = require('./../controller/t8fileCrud/controller')
const t9mysqlCrud  = require('./../controller/t9mysqlCrud/index')
const t10student = require('./../controller/t10attenc/index')
const t11dynegrid = require('./../controller/t11dyngrid/index')
const t12searchFilter = require('./../controller/t12searchFilter/index')
const t13deliSearch = require('./../controller/t13deliSearch/index')
const t14studentIU = require('./../controller/t14studentIU/index')
const t15jobIU = require('./../controller/t15jobIU/index')
const t16json = require('./../controller/t16jsonpl/index')
const t17timezone = require('./../controller/t17timezone/index')


// mian login and regi route
router.route("/login").get(index.loginGet)
router.route("/login").post(index.loginPost)
router.route("/dashboard").get(index.dashboard)
router.route("/regUser").get(index.regUserGet)
router.route("/regUser").post(index.regUserPost)
router.route("/confirmReg/:a_code").get(index.confirmReg)
router.route("/getAllEmailId").get(index.getAllEmailId)



// all html file route
router.route("/dynemicTable").get( htmlTask.dynemicTabel)
router.route("/cucuCube").get( htmlTask.cucuCube)
router.route("/ticTacToa").get( htmlTask.ticTacToa)
router.route("/eyesClone").get( htmlTask.eyesClone)
router.route("/awanHoster").get( htmlTask.awanHoster)
router.route("/hireX").get( htmlTask.hireX)
router.route("/domeBord").get( htmlTask.domeBord)

//task 8 file crud opration
router.route("/form").get(formGet)
router.route("/form").post(formPost)
router.route("/getAllUser").get(getAllUser)
router.route("/userDetails/:userId").get(getOneUserDetailByID)


//task 9 mysql crud
router.route("/t9form").get(t9mysqlCrud.formGet)
router.route("/t9form").post(t9mysqlCrud.formPost)
router.route("/t9getAllUser").get(t9mysqlCrud.getAllUser)
router.route("/t9deleteUser/:userId").get(t9mysqlCrud.deleteUserById)
router.route("/t9userDetails/:userId").get(t9mysqlCrud.getOneUserDetailByID)


// task 10 student attendance result
router.route("/getAllStudentAttendance").get(t10student.getAllStudentAttendance)
router.route("/getAllStudentResult").get(t10student.getAllStudentResult)
router.route("/viewStudentResult/:stud_id").get(t10student.viewStudentResultById)


// task 11 dynemic grid
router.route("/t11showTable").get(t11dynegrid.showTableGet)
router.route("/t11showTable").post(t11dynegrid.showTablePost)


//task 12 search filter
router.route("/searchRecord").get(t12searchFilter.searchRecordGet)
router.route("/searchRecord").post(t12searchFilter.searchRecordPost)

//task 13 delimiter search
router.route("/delimitedSearch").get(t13deliSearch.delimitedSearchGet)
router.route("/delimitedSearch").post(t13deliSearch.delimitedSearchPost)

// task 14 studnet Insert Update
router.route("/insertForm").get(t14studentIU.insertFormGet)
router.route("/insertForm").post(t14studentIU.insertFormPost)
router.route("/updateForm/:sid").get(t14studentIU.updateFromGet)
router.route("/updateForm/:sid").post(t14studentIU.updateFromPost)

// task 15 job from insert update
router.route("/allJobApplicantList").get(t15jobIU.getAllJobApplicanteData)
router.route("/jobRegistration").get(t15jobIU.jobRegistrationGet)
router.route("/jobRegistration").post(t15jobIU.jobRegistrationPost)
router.route("/jobUpdate/:id").get(t15jobIU.jobUpdateGet)
router.route("/jobUpdate/:id").post(t15jobIU.jobUpdatePost)
router.route("/fetchUserData/:id").get(t15jobIU.fetchUserData)
router.route("/getStateData").get(t15jobIU.getStateData)
router.route("/getCityData/:sid").get(t15jobIU.getCityData)


//task 16 JSON Plase holder api task
router.route("/posts").get(t16json.getAllPost)
router.route("/posts/:postId").get(t16json.getPostById)

// task 17 timeZone 
router.route("/timeZone").get(t17timezone.timeZone)
router.route("/fetchCityData").get(t17timezone.fetchCityData)



module.exports = router;
 