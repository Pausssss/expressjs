const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Đảm bảo rằng model User được import đúng

// Trang chủ: Hiển thị tất cả bài đăng
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.render('index', { posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Trang đăng nhập
router.get('/login', (req, res) => {
    res.render('login');
});

// Trang đăng ký
router.get('/register', (req, res) => {
    res.render('register');
});

// Route tìm kiếm
router.get('/search', async (req, res) => {
    const username = req.query.username;

    if (!username) {
        return res.status(400).send('Thiếu tên người dùng trong query');
    }

    try {
        const users = await User.findByUsername(username); // Tìm kiếm theo username
        res.render('searchResults', { users, username }); // render kết quả tìm kiếm
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi hệ thống');
    }
});

module.exports = router;
