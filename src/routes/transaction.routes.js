const {Router} = require("express");

const transactionRoutes = Router();


const authMiddleware = require("../middleware/auth.middleware");
const transactionController = require("../controllers/transaction.controller");


/**
 * POST /api/transactions/
 * create a new transaction
 */
transactionRoutes.post("/", authMiddleware.authMiddleware, transactionController.createTransaction);

/**
 * POST /api/transactions/system/initial-funds
 * create initial funds for system user
 * 
 */
transactionRoutes.post("/system/initial-funds", authMiddleware.authMiddleware, transactionController.createInitialFundsTransaction);

// Add your transaction routes here
// Example:
// transactionRoutes.post("/transfer", transferController);

module.exports = transactionRoutes;