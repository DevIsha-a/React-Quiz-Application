const { string } = require("joi");
let mongoose= require("mongoose");

module.exports= mongoose.model("subject", {
    subId: String,
    b_name: String,
    title: String,
})
