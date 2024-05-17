const express = require('express');
const router = express.Router();
const {
    createNote,
    editNote,
    deleteNote,
  
    getVideosBySubject,
    getArticlesBySubject,
    getVideosByDepartment,
    getArticlesByDepartment,
    deleteNotice,
    getAllNotices,
    createNotice,getallArticles,getallVideos
} = require('../controller/NotesController');


router.post('/createNote', createNote);
router.put('/editNote/:id', editNote);
router.delete('/deleteNote/:id', deleteNote);
router.get('/videosBySubject/:subjectId', getVideosBySubject);
router.get('/articlesBySubject/:subjectId', getArticlesBySubject);
router.get('/allarticles',getallArticles);
router.get('/allvideos',getallVideos);
router.get('/videosByDepartment/:departmentId', getVideosByDepartment);
router.get('/articlesByDepartment/:departmentId', getArticlesByDepartment);
router.post('/notices', createNotice);
router.get('/notices', getAllNotices);
router.delete('/notices/:id', deleteNotice);

module.exports = router;
