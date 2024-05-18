const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const otpRoute = require('./routes/OTPRoute')
const userRoute = require('./routes/userRoute')
const feesRoute = require('./routes/feesRouter')
const mentorRoute = require('./routes/mentorRoute')
const CourseRoute = require('./routes/CourseRoute');
const subjectRoute = require('./routes/SubjectRoute')
const SectionRoute = require('./routes/SectionsRoutes');
const attendanceRoute = require('./routes/AttendanceRoute')
const DepartmentRoute = require('./routes/DepartmentRoute');
const examTypeRoute = require('./routes/ExamTypeRoutes');
const examSubjecteRoute = require('./routes/ExamSubjectRoute')
const examMarkRoute = require('./routes/examMarkRoute')
const timeTableRoute = require("./routes/TimeTableRoute")
const notesRoute = require('./routes/NotesRoutes')
const blogRoute = require('./routes/BlogRoutes')
const ws = require('ws');
const jwt = require("jsonwebtoken");
const Message = require('./models/Message');
const messageRoute=require('./routes/messageRoutes')
const { isAuthenticate } = require('./middleware/tokenAuthentication');
const fs = require('fs');

const DDbURL = "mongodb+srv://bluepirateofficial:bluepirateofficial@cluster0.ehogrnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const DatabaseConnection = async () => {
    try {
        await mongoose.connect(DDbURL);
        console.log("Connected to the database");
    } catch (error) {
        console.log(error);
    }
}

const app = express()

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'https://cms-client-two.vercel.app/',
    credentials: true,
}));



app.use('/api/otp', otpRoute)
app.use('/api/user', userRoute)
app.use('/api/course', CourseRoute)
app.use('/api/fees', feesRoute)
app.use('/api/mentor', mentorRoute)
app.use('/api/section', SectionRoute)
app.use('/api/subject', subjectRoute)
app.use('/api/department', DepartmentRoute)
app.use('/api/attendance', attendanceRoute)
app.use('/api/examType', examTypeRoute)
app.use('/api/examsubject', examSubjecteRoute)
app.use('/api/exammark', examMarkRoute)
app.use('/api/timetable', timeTableRoute)
app.use('/api/notes', notesRoute)
app.use('/api/blog', blogRoute)
app.use('/api/message',messageRoute)


const server = app.listen(8005, () => {
    DatabaseConnection()
    console.log("connected to backend")
})
const wss = new ws.WebSocketServer({ server });

wss.on('connection', (connection, req) => {
    const cookies = req.headers.cookie

    if (cookies) {
        const tokenCookie = cookies.split(';').find(str => str.startsWith(" token="))

        if (tokenCookie) {
            const token = tokenCookie.split("=")[1];
            if (token) {
                jwt.verify(token, 'soumyaranjansahu', {}, (err, user) => {
                    if (err) {
                        throw (err)
                    }
                    const { _id, email } = user
                    connection.userId = _id
                    connection.email = email

                });
            }
        }
    }


    [...wss.clients].forEach(client => {
        client.send(JSON.stringify({
            online: [...wss.clients].map(c => ({ userId: c.userId, username: c.email })),
        }));
    });

    connection.on('message', async (message) => {
        const messageData = JSON.parse(message.toString());
        const { recipient, text, } = messageData;
        console.log(text)

        // let filename = null;
        // if (file) {
        //     console.log('size', file.data.length);
        //     const parts = file.name.split('.');
        //     const ext = parts[parts.length - 1];
        //     filename = Date.now() + '.' + ext;
        //     const path = __dirname + '/uploads/' + filename;
        //     const bufferData = new Buffer(file.data.split(',')[1], 'base64');
        //     fs.writeFile(path, bufferData, () => {
        //         console.log('file saved:' + path);
        //     });
        // }
        if (recipient && (text || file)) {

            const messageDoc = await Message.create({
                sender: connection.userId,
                recipient,
                text,

            });

            console.log('created message');
            [...wss.clients]
                .filter(c => c.userId === recipient)
                .forEach(c => c.send(JSON.stringify({
                    text,
                    sender: connection.userId,
                    recipient,
                    // file: file ? filename : null,
                    _id: messageDoc._id,
                })));
        }
    });

})
