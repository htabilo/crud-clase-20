const express = require('express'),
router = express.Router(),
{
    createPost,
    getPosts

} = require('../controllers/Post.controller')

router.post('/', createPost)
router.get('/', getPosts)  

module.exports = router
