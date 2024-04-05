const router  =  require('express').Router();

const {isLoggedIn} = require('./../middleware/userAuth')

const index = require('./../controller/index')
const htmlTask = require('../controller/t1tot6html')
const {  formGet, formPost, getAllUser, getOneUserDetailByID } = require('./../controller/t8fileCrud/controller')
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
router.route("/dashboard").get(isLoggedIn, index.dashboard)
router.route("/regUser").get(index.regUserGet)
router.route("/regUser").post(index.regUserPost)
router.route("/confirmReg/:a_code").get(index.confirmReg)
router.route("/getAllEmailId").get(index.getAllEmailId)
router.route("/logout").get(index.logOut)



// all html file route
router.route("/dynemicTable").get(isLoggedIn,  htmlTask.dynemicTabel)
router.route("/cucuCube").get(isLoggedIn,  htmlTask.cucuCube)
router.route("/ticTacToa").get(isLoggedIn,  htmlTask.ticTacToa)
router.route("/eyesClone").get(isLoggedIn,  htmlTask.eyesClone)
router.route("/awanHoster").get(isLoggedIn,  htmlTask.awanHoster)
router.route("/hireX").get(isLoggedIn,  htmlTask.hireX)
router.route("/domeBord").get(isLoggedIn,  htmlTask.domeBord)

//task 8 file crud opration
router.route("/form").get(isLoggedIn, formGet)
router.route("/form").post(isLoggedIn, formPost)
router.route("/getAllUser").get(isLoggedIn, getAllUser)
router.route("/userDetails/:userId").get(isLoggedIn, getOneUserDetailByID)


//task 9 mysql crud
router.route("/t9form").get(isLoggedIn, t9mysqlCrud.formGet)
router.route("/t9form").post(isLoggedIn, t9mysqlCrud.formPost)
router.route("/t9getAllUser").get(isLoggedIn, t9mysqlCrud.getAllUser)
router.route("/t9deleteUser/:userId").get(isLoggedIn, t9mysqlCrud.deleteUserById)
router.route("/t9userDetails/:userId").get(isLoggedIn, t9mysqlCrud.getOneUserDetailByID)


// task 10 student attendance result
router.route("/getAllStudentAttendance").get(isLoggedIn, t10student.getAllStudentAttendance)
router.route("/getAllStudentResult").get(isLoggedIn, t10student.getAllStudentResult)
router.route("/viewStudentResult/:stud_id").get(isLoggedIn, t10student.viewStudentResultById)


// task 11 dynemic grid
router.route("/t11showTable").get(isLoggedIn, t11dynegrid.showTableGet)
router.route("/t11showTable").post(isLoggedIn, t11dynegrid.showTablePost)


//task 12 search filter
router.route("/searchRecord").get(isLoggedIn, t12searchFilter.searchRecordGet)
router.route("/searchRecord").post(isLoggedIn, t12searchFilter.searchRecordPost)

//task 13 delimiter search
router.route("/delimitedSearch").get(isLoggedIn, t13deliSearch.delimitedSearchGet)
router.route("/delimitedSearch").post(t13deliSearch.delimitedSearchPost)

// task 14 studnet Insert Update
router.route("/insertForm").get(isLoggedIn, t14studentIU.insertFormGet)
router.route("/insertForm").post(isLoggedIn, t14studentIU.insertFormPost)
router.route("/updateForm/:sid").get(isLoggedIn, t14studentIU.updateFromGet)
router.route("/updateForm/:sid").post(isLoggedIn, t14studentIU.updateFromPost)

// task 15 job from insert update
router.route("/allJobApplicantList").get(isLoggedIn, t15jobIU.getAllJobApplicanteData)
router.route("/jobRegistration").get(isLoggedIn, t15jobIU.jobRegistrationGet)
router.route("/jobRegistration").post(isLoggedIn, t15jobIU.jobRegistrationPost)
router.route("/jobUpdate/:id").get(isLoggedIn, t15jobIU.jobUpdateGet)
router.route("/jobUpdate/:id").post(isLoggedIn, t15jobIU.jobUpdatePost)
router.route("/fetchUserData/:id").get(isLoggedIn, t15jobIU.fetchUserData)
router.route("/getStateData").get(isLoggedIn, t15jobIU.getStateData)
router.route("/getCityData/:sid").get(isLoggedIn, t15jobIU.getCityData)


//task 16 JSON Plase holder api task
router.route("/posts").get(isLoggedIn, t16json.getAllPost)
router.route("/posts/:postId").get(isLoggedIn, t16json.getPostById)


// task 17 timeZone 
router.route("/timeZone").get(isLoggedIn, t17timezone.timeZone)
router.route("/fetchCityData").get(isLoggedIn, t17timezone.fetchCityData)

router.route("/*").get(index.defaultRoute)

module.exports = router;
 