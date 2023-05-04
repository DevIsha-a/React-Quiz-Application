let mongoose= require("mongoose");

module.exports= mongoose.model("exam", {
    ex_id: String,
    sub_name: String,
    Question:[{
        quest: String,
        correct_ans:String, 
         options:[String],
        
    }

    ]

    
})
