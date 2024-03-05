const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const CourseRoute=require('./routes/CourseRoute');
const DepartmentRoute=require('./routes/DepartmentRoute');
const SectionRoute=require('./routes/SectionsRoutes');

const DDbURL="mongodb+srv://bluepirateofficial:bluepirateofficial@cluster0.ehogrnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const DatabaseConnection =async()=>{
    try {
            await mongoose.connect(DDbURL);
            console.log("Connected to the database");
    } catch (error) {
        console.log(error);       
    }
}

const app=express()

app.use(cookieParser());
app.use(express.json());

app.use('/api/course',CourseRoute)
app.use('/api/department',DepartmentRoute)
app.use('/api/section',SectionRoute)


app.listen(8005,()=>{
    DatabaseConnection()
    console.log("connected to backend")
})

