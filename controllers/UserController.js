const router = require("express").Router()

const userService = require("../services/UserService")

router.post("/login", userService.login)
router.get("/logout", userService.logout)
router.get("/users", userService.getUsers)
router.get("/users/:id", userService.getUserById)
router.get("/buyers", userService.getBuyers)
router.get("/sellers", userService.getSellers)
router.post("/register", userService.createUser)
router.put("/users/:id", userService.updateUser)
router.delete("/users/:id", userService.deleteUser)

module.exports = router;