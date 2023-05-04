let mongoose= require("mongoose");

module.exports= mongoose.model("examResults", {
    ex_id: String,
    sub_name: String,
    user_id:String,
    total_marks:String,
    obt_marks:String


    
})
