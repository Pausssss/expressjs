const pool = require('../config/db');

class User {
    // Lấy tất cả người dùng
    static async findAll() {
        const [rows] = await pool.query('SELECT id, username, role, created_at, avatar_url FROM users');
        return rows;
    }

    // Tìm kiếm người dùng theo username (với LIKE để tìm kiếm theo tên người dùng gần đúng)
    static async findByUsername(username) {
        const [rows] = await pool.query('SELECT id, username, role, created_at, avatar_url FROM users WHERE username LIKE ?', [`%${username}%`]);
        return rows;
    }
}

module.exports = User;
