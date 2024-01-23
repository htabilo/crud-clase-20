const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    tittle: { type:  String }, 
    body: { type: String }, 
    photo: { type: String },
    state: { type: Boolean },
    //referencia en post
    category: { type: mongoose.ObjectId, ref: 'Category' },
    user: { type: mongoose.ObjectId, ref: 'User' }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post