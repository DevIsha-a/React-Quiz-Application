let mongoose= require("mongoose");

module.exports= mongoose.model("batches", {
    ba_id: String,
    title: String,
})
