const mongoose = require('mongoose');
// const express = require('express');  // general server
const {Schema} = mongoose;


const cartSchema = new Schema({
    // title:{type: String, required: true, unique:[true,'Product Already existed with this Name']},
   // description:{type: String, required: true},
    // price:{type: Number, min:[1 , 'Wrong min price'], max:[100000, 'Wrong maximum price']},
    // discountPercentage:{type: Number, min:[0 , 'Wrong min discountPercentage'], max:[90, 'Wrong maximum discountPercentage']},
   // rating:{type: Number, min:[0 , 'Wrong min rating'], max:[5, 'Wrong maximum rating'],default:0},
   // stock:{type: Number, min:[0 , 'Wrong min stock'], default:0},
    // brand:{type: String, required: true},
  //  category:{type: String, required: true},
    // thumbnail:{type: String, required: true},
    quantity:{type: Number, required: true},
    product:{type: Schema.Types.ObjectId, ref: 'Product', required: true}, // passing reference of Product, once we use it we don't have to write above lines
    user:{type: Schema.Types.ObjectId, ref: 'User', required: true}, // passing reference of User. we are giving as a foreign key
  //  images:{type: [String], required: true},
  //  deleted:{ type: Boolean, default: false},

})
// create virtual field fro ._id b/c i am using "id" not "_id"
const virtual = cartSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
cartSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function(doc,ret){delete ret._id}
})

exports.Cart = mongoose.model("Cart", cartSchema);  // exporting model->productSchema