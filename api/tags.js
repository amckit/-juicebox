const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');
 
 
 
 tagsRouter.get('/', async (req, res)   => {
    const tags = await getAllTags();
  
     res.send({
      tags
    });
  });



tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    // read the tagname from the params
    try {
      // use our method to get posts by tag name from the db
      // send out an object to the client { posts: // the posts }
      const allPosts = await getPostsByTagName(req.params.tagName);

      const posts = allPosts.filter(post => {
        return post.active || (req.user && post.author.id === req.user.id);
      });

      res.send({ posts: posts});
    } catch ({ name, message }) {
      // forward the name and message to the error handler
      next({ name, message });
    }
  });
  
  module.exports = tagsRouter;