const express=require("express")
const authMiddleware=require("../middleware/auth.middleware")
const accountController = require("../controllers/account.controller")


const router=express.Router()

/**
 * POST/api/accounts/
 * Create a new account 
 * Protected Route
 */
router.post("/",authMiddleware.authMiddleware,accountController.createAccountController)


/**
 * GET/api/accounts/
 * GET all accounts for the authenticated user
 * protected route
 */
router.get("/", authMiddleware.authMiddleware, accountController.getUserAccountsController)

/**
 * GET/api/accounts/balance/:accountId
 * GET the balance of a specific account
 * protected route
 */
router.get("/balance/:accountId", authMiddleware.authMiddleware, accountController.getAccountBalanceController)

module.exports=router