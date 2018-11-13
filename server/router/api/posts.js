const express = require('express');
const mongodb = require('mongodb');

const router=express.Router();
//GET request
router.get('/',async(req,res)=>{
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
    //res.send('OK');
});

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
      text: req.body.text,
      createdAt: new Date()
    });
    res.status(201).send();
  });
  
  // Delete Post
  router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
  });


async function loadPostsCollection(){
    const client=await mongodb.MongoClient.connect(
        'mongodb://abc123:abc123@ds151463.mlab.com:51463/weifodb',{
            useNewUrlParser:true
        }
    );
    return client.db('weifodb').collection('posts');
}

module.exports=router;

