const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    RegdNo: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    personalDetails:{
        FirstName: {
            type: String,
            required: true,
        },
        LastName: {
            type: String,
            required: true,
        },
        MiddleName: {
            type: String,
        },
        Gender: {
            type: String,
            required: true,
        },
        Natioanality: {
            type: String,
            default: "Indian"
        },
        Caste: {
            type: String,
            required: true,
        },
        DOB: {
            type: String,
            required: true
        },
        Religion: {
            type: String,
            required: true,
        },
        Bloodgrp: {
            type: String,
        },
        hostel: {
            type: Boolean,
            required: true,
            default: false
        },
        transport:{
            type: Boolean,
            required: true,
            default: false
        },
        Lunch: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    PhoneNo: {
        type: String,
        required: true,
    },
    whatsappNo: {
        type: String,
    },
    Course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    Department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    Section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true,
    },
    Batch: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
       
        default: true
    },
    PAN: {
        type: String,
    },
    Guardian: {

        name: {
            type: String,
            required: true
        },
        relation: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        profession: {
            type: String
        }
    },
    address:{
        houseNo: {
            type: String,
            required: true
        },
        district:{
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        }
    },
    permanentAddress: {
        houseNo: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        }
    },
    mentor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentors",
        default: false
    },
    // isAdmin:{
    //     type: Boolean,
    //     required: true,
    //     default: false
    // },
    DueAmoumt:{
        type:Number,
       required:true     
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    },

});

module.exports = mongoose.model("User", userSchema);
