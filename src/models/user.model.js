const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")


const userSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase:true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"invalid email"],
        unique:[true,"Email already exists"]
    },
    name: {
        type: String,
        required:[true,"Name is required"]
    },
    password: {
        type: String,
        required:[true,"password is required"],
        minLength:[6,"password must be at least 6 characters long"],
        select: false
    },
    systemUser:{
        type:Boolean,
        default:false,
        immutable:true,
        select:false
    }

},{
  timestamps:true  // user when created the data and when update the data
}
)
//for hashing the password before saving it to the database use the package called bcryptjs
userSchema.pre("save",async function(){
  
    if(!this.isModified("password")) {
        return next()
    }
    const hash = await bcrypt.hash(this.password,10)
    this.password=hash

    return 

})
//comparison between the hash and password to check it true or not if it is true then it is return

userSchema.methods.comparePassword=async function(password){

    return await bcrypt.compare(password, this.password)
}

const userModel=mongoose.model("user",userSchema)

module.exports=userModel