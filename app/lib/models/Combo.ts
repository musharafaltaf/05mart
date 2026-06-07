import mongoose from "mongoose"

const ComboSchema = new mongoose.Schema({

name:String,

comboPrice:Number,

originalPrice:Number,

products:[
{
_id:String,
name:String,
image:String,
price:Number,
sizes:[String]
}
]

},{
timestamps:true
})

export default mongoose.models.Combo ||
mongoose.model("Combo",ComboSchema)