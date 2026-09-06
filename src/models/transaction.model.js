const mongoose=require("mongoose")


const transactionSchema=new mongoose.Schema(
    {
    fromAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required:[true,"transaction must be associated with a source account"],
        index:true
    },
    toAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required:[true,"transaction must be associated with a destination account"],
        index:true
    },
     status: {
      type: String,
      enum:{
     values: ["PENDING", "COMPLETED", "FAILED","REVERSED"],
     message: "Status can either PENDING, COMPLETED ,FAILED OR REVERSED",
      },
      default: "PENDING",
    },
     amount: {
      type: Number,
      required:[true,"Amount is required for transaction"],
      min:[0,"Transaction amount must be greater than 0"]
    },
    idempotencyKey: {
      type: String,
      required: [true, "Idempotency key is required for transaction"],
      index: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const transactionModel = mongoose.model("transaction",transactionSchema
);

module.exports = transactionModel