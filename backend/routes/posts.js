const express = require('express');
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');

const router = express.Router();

// Create a post
router.post('/', auth, async (req, res) => {
  try {
    const { text, imageUrl } = req.body;
    if(!text) return res.status(400).json({ msg: 'Post content required' });

    const post = new Post({
      user: req.user.id,
      text,
      imageUrl
    });
    await post.save();
    await post.populate('user', 'name');
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get all posts (latest first)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Delete post - only owner
router.delete('/:id', auth, async (req, res) => {
  try {
    console.log("🗑️ Delete request received for ID:", req.params.id);
    console.log("Authenticated user:", req.user);

    const post = await Post.findById(req.params.id);
    if (!post) {
      console.log("❌ Post not found");
      return res.status(404).json({ msg: 'Post not found' });
    }

    console.log("✅ Post found:", post);

    if (post.user.toString() !== req.user.id) {
      console.log("🚫 Not authorized. Post owner:", post.user, "Requester:", req.user.id);
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Post.findByIdAndDelete(req.params.id);
    console.log("✅ Post deleted successfully");

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error("🔥 Delete post error:", err);
    res.status(500).send('Server error');
  }
});


// Like/unlike
router.post('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({ msg: 'Post not found' });

    const index = post.likes.findIndex(l => l.toString() === req.user.id);
    if(index === -1) {
      post.likes.push(req.user.id);
    } else {
      post.likes.splice(index, 1);
    }
    await post.save();
    res.json(post);
  } catch(err) {
    console.error(err); res.status(500).send('Server error');
  }
});

module.exports = router;
