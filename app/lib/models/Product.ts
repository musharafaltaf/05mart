import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

description:{
type:String
},

category:{
type:String
},

/* ORIGINAL PRICE */

mrp:{
type:Number,
required:true
},

/* SELLING PRICE */

price:{
type:Number,
required:true
},

/* MAIN IMAGE */

image:{
type:String,
required:true
},

/* GALLERY IMAGES */

images:{
type:[String],
default:[]
},

/* SIZES */

sizes:{
type:[String],
default:[]
},

/* STOCK */

stock:{
type:Number,
default:0
},

/* FEATURED PRODUCT */

featured:{
type:Boolean,
default:false
},

/* FLASH SALE */

flashSale:{
type:Boolean,
default:false
},

flashPrice:{
type:Number,
default:0
}

},{timestamps:true});

export default mongoose.models.Product ||
mongoose.model("Product",ProductSchema);