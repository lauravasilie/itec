const router = require("express").Router()

const userService = require("../services/UserService")

router.post("/login", userService.loginUser)
router.get("/user", userService.getUsers)
router.post("/user", userService.createUser)
router.put("/user", userService.updateUser)
router.delete("/user", userService.deleteUser)

module.exports = router;