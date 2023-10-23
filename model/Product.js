const mongoose = require('mongoose');
// const express = require('express');  // general server
const {Schema} = mongoose;


const productSchema = new Schema({
    title:{type: String, required: true, unique:[true,'Product Already existed with this Name']},
    description:{type: String, required: true},
    price:{type: Number, min:[1 , 'Wrong min price'], max:[100000, 'Wrong maximum price']},
    discountPercentage:{type: Number, min:[0 , 'Wrong min discountPercentage'], max:[90, 'Wrong maximum discountPercentage']},
    rating:{type: Number, min:[0 , 'Wrong min rating'], max:[5, 'Wrong maximum rating'],default:0},
    stock:{type: Number, min:[0 , 'Wrong min stock'], default:0},
    brand:{type: String, required: true},
    category:{type: String, required: true},
    thumbnail:{type: String, required: true},
    images:{type: [String], required: true},
    deleted:{ type: Boolean, default: false},

})
// create virtual field fro ._id b/c i am using "id" not "_id"
const virtual = productSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
productSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function(doc,ret){delete ret._id}
})

exports.Product = mongoose.model("Product", productSchema);  // exporting model->productSchema