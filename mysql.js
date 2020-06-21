var mysql = require('mysql');
var passwordUtil = require('./utils/password');

// create mysql connection pool
var pool  = mysql.createPool({
    host            : process.env.MYSQL_HOST,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE
});
// check if connection's been successful

pool.query('select name from user limit 1', (error, results, fields) => {
    if (error) {
        console.log('MySQL connection error', error);
        throw error;
    }
    console.log('MySQL server successfully connected');
});

// pool.query("insert into user (userId, password, name, phone, email, avatar, role) values (?,?,?,?,?,?,?)",
//     [
//         69,
//         passwordUtil.hashPassword('1'),
//         'Ân đuồi bầu',
//         '0123456789',
//         'anduoibau@gmail.com',
//         'https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.0-9/53811028_2233206770266706_397922354832867328_n.jpg?_nc_cat=100&_nc_sid=85a577&_nc_ohc=inYcAB6sWbMAX9ZKJE7&_nc_ht=scontent.fsgn4-1.fna&oh=d5e9240dd3eeeafcc5d14788a2ff9676&oe=5F14F789',
//         'ROLE_USER'
//     ],
//     function (error, results, fields) {
//         // pass result to callback function
//         if (error) {
//             console.log('Error inserting user Ân đuồi bầu', error)
//             return;
//         }
//         console.log('Added user Ân đuồi bầu');
//     });

// pool.query("insert into user (userId, password, name, phone, email, avatar, role) values (?,?,?,?,?,?,?)",
//     [
//         1,
//         passwordUtil.hashPassword('1'),
//         'Cô thủ thư',
//         '0123456789',
//         'cothuthu@gmail.com',
//         'https://cdn2.iconfinder.com/data/icons/circle-avatars-1/128/039_girl_avatar_profile_woman_headband-512.png',
//         'ROLE_LIBRARIAN'
//     ],
//     function (error, results, fields) {
//         // pass result to callback function
//         if (error) {
//             console.log('Error inserting Cô thủ thư', error)
//             return;
//         }
//         console.log('Added cô thủ thư');
//     });

// pool.query("insert into user (userId, password, name, phone, email, avatar, role) values (?,?,?,?,?,?,?)",
//     [
//         2,
//         passwordUtil.hashPassword('1'),
//         'Ngài giáo sư',
//         '0123456789',
//         'ngaigiaosu@gmail.com',
//         'https://st2.depositphotos.com/1007566/12301/v/950/depositphotos_123013242-stock-illustration-avatar-man-cartoon.jpg',
//         'ROLE_PROFESSOR'
//     ],
//     function (error, results, fields) {
//         // pass result to callback function
//         if (error) {
//             console.log('Error inserting Ngài giáo sư', error)
//             return;
//         }
//         console.log('Added ngài giáo sư');
//     });

module.exports = pool;
