const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const otpRoute=require('./routes/OTPRoute')
const userRoute=require('./routes/userRoute')
const feesRoute=require('./routes/feesRouter')
const mentorRoute=require('./routes/mentorRoute')
const CourseRoute=require('./routes/CourseRoute');
const subjectRoute=require('./routes/SubjectRoute')
const SectionRoute=require('./routes/SectionsRoutes');
const attendanceRoute=require('./routes/AttendanceRoute')
const DepartmentRoute=require('./routes/DepartmentRoute');
const examTypeRoute=require('./routes/ExamTypeRoutes');
const examSubjecteRoute=require('./routes/ExamSubjectRoute')
const examMarkRoute=require('./routes/examMarkRoute')
const timeTableRoute=require("./routes/TimeTableRoute")
const notesRoute=require('./routes/NotesRoutes')
const blogRoute=require('./routes/BlogRoutes')

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
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
}));


app.use('/api/otp',otpRoute)
app.use('/api/user',userRoute)
app.use('/api/course',CourseRoute)
app.use('/api/fees',feesRoute)
app.use('/api/mentor',mentorRoute)
app.use('/api/section',SectionRoute)
app.use('/api/subject',subjectRoute)
app.use('/api/department',DepartmentRoute)
app.use('/api/attendance',attendanceRoute)
app.use('/api/examType',examTypeRoute)
app.use('/api/examsubject',examSubjecteRoute)
app.use('/api/exammark',examMarkRoute)
app.use('/api/timetable',timeTableRoute)
app.use('/api/notes',notesRoute)
app.use('/api/blog',blogRoute)

app.listen(8005,()=>{
    DatabaseConnection()
    console.log("connected to backend")
})

