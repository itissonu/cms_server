const Notes = require('../models/Notes');
const Notice = require('../models/Notice');


const createNote = async (req, res) => {
    try {
        const { URL, Description, subject, DepartmentName, type } = req.body;
        const newNote = new Notes({ URL, Description, subject, DepartmentName, type });
        const savedNote = await newNote.save();
        res.status(201).json({success:true,
            message:"Created Successfukky",
            savedNote});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const editNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { URL, Description, subject, DepartmentName, type } = req.body;
        const updatedNote = await Notes.findByIdAndUpdate(id, { URL, Description, subject, DepartmentName, type }, { new: true });
        res.status(200).json({success:true,message:"updated",updatedNote});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        await Notes.findByIdAndDelete(id);
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getVideosBySubject = async (req, res) => {
    try {
        const { subjectId } = req.params;
        const videos = await Notes.find({ subject: subjectId, type: 'video' });
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getallArticles=async(req,res)=>{
    try {
        const videos = await Notes.find().populate('subject');
        
        res.status(200).json({
            message:"all article",
            data:videos
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

const getallVideos=async(req,res)=>{
    try {
       
        const videos = await Notes.find({  type: 'video' }).populate('subject');
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


const getArticlesBySubject = async (req, res) => {
    try {
        const { subjectId } = req.params;
        const articles = await Notes.find({ subject: subjectId, type: 'article' });
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getVideosByDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;
        const videos = await Notes.find({ DepartmentName: departmentId, type: 'video' });
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getArticlesByDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;
        const articles = await Notes.find({ DepartmentName: departmentId, type: 'article' });
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const createNotice = async (req, res) => {
    try {
        const { title, content, isUrgent, date } = req.body;
        const newNotice = new Notice({ title, content, isUrgent, date });
        if (req.body.department) {
            newNotice.department = req.body.department;
        }
        const savedNotice = await newNotice.save();
        res.status(201).json(savedNotice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getAllNotices = async (req, res) => {
    try {
        const notices = await Notice.find();
        res.status(200).json({data:notices});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const deleteNotice = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedNotice = await Notice.findByIdAndDelete(id);
      if (!deletedNotice) {
        return res.status(404).json({ message: 'Notice not found' });
      }
      res.status(200).json({ message: 'Notice deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  


module.exports = {
    createNote, editNote, deleteNote, getVideosBySubject,
    getArticlesBySubject,
    getVideosByDepartment,
    getArticlesByDepartment,createNotice,getAllNotices,deleteNotice,getallArticles,getallVideos
}
