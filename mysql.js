var mysql = require('mysql');
var passwordUtil = require('./utils/password');
var axios = require('axios');
const e = require('express');

// create mysql connection pool
var pool  = mysql.createPool({
    connectionLimit : 1,
    host            : process.env.MYSQL_HOST,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE
});
// check if connection's been successful

pool.query('select name from user_tb limit 1', (error, results, fields) => {
    if (error) {
        console.log('MySQL connection error', error);
        throw error;
    }
    console.log('MySQL server successfully connected');
}); 

// pool.query("UPDATE user_tb SET email=? , phone=? WHERE userId=?", 
//             ['an1@gmail.com','0123456789','69'],
//             function (error, results, fields){
//                if (error){
//                    console.log('Error',error);
//                    return;
//                }
//                console.log('success');
//         });

// pool.query("INSERT INTO borrowRequest(userId,bookDescriptionId,isLent) values(?,?,?)",
//             ['69','3',false],
//             function (error, results, fields) {
//             if (error) {
//                 console.log('Error', error)
//                 return;
//             }
//             console.log('add borrow request');
//         });
       
// pool.query("insert into user_tb (userId, password, name, phone, email, avatar, role) values (?,?,?,?,?,?,?)",
//     [
//         69,
//         passwordUtil.hashPassword('1'),
//         'Ân đuồi bầu',
//         '0123456789',
//         'anduoibau@gmail.com',
//         'https://www.biography.com/.image/c_fill%2Ccs_srgb%2Cfl_progressive%2Ch_400%2Cq_auto:good%2Cw_620/MTE5NTU2MzE2NDIwOTk4NjY3/bruce-lee-9542095-1-402.jpg',
//         1
//     ],
//     function (error, results, fields) {
//         // pass result to callback function
//         if (error) {
//             console.log('Error inserting user Ân đuồi bầu', error)
//             return;
//         }
//         console.log('Added user Ân đuồi bầu');
//     });

// pool.query("insert into user_tb (userId, password, name, phone, email, avatar, role) values (?,?,?,?,?,?,?)",
//     [
//         1,
//         passwordUtil.hashPassword('1'),
//         'Cô thủ thư',
//         '0123456789',
//         'cothuthu@gmail.com',
//         'https://cdn2.iconfinder.com/data/icons/circle-avatars-1/128/039_girl_avatar_profile_woman_headband-512.png',
//         2
//     ],
//     function (error, results, fields) {
//         // pass result to callback function
//         if (error) {
//             console.log('Error inserting Cô thủ thư', error)
//             return;
//         }
//         console.log('Added cô thủ thư');
//     });

// pool.query("insert into user_tb (userId, password, name, phone, email, avatar, role) values (?,?,?,?,?,?,?)",
//     [
//         2,
//         passwordUtil.hashPassword('1'),
//         'Ngài giáo sư',
//         '0123456789',
//         'ngaigiaosu@gmail.com',
//         'https://st2.depositphotos.com/1007566/12301/v/950/depositphotos_123013242-stock-illustration-avatar-man-cartoon.jpg',
//         3
//     ],
//     function (error, results, fields) {
//         // pass result to callback function
//         if (error) {
//             console.log('Error inserting Ngài giáo sư', error)
//             return;
//         }
//         console.log('Added ngài giáo sư');
//     });

// add books to db base on search term
// const searchTerm = 'literature';
// axios.get('https://www.googleapis.com/books/v1/volumes?q=' + searchTerm)
//   .then(function (response) {
//     // handle success
//     for (let item of response.data.items) {
//         const info = item.volumeInfo;
//         if (!info.industryIdentifiers || info.industryIdentifiers.length !== 2)
//             continue;
//         const isbn10id = info.industryIdentifiers[0].identifier.length === 10 ? 0 : 1;
//         pool.query("insert into bookDescription values (default,?,?,?,?,?,?,?,?)",
//         [
//             info.industryIdentifiers[isbn10id].identifier,
//             info.industryIdentifiers[1 - isbn10id].identifier,
//             info.title,
//             info.description,
//             info.publishedDate ? info.publishedDate.substring(0,4) : '1999',
//             info.publisher,
//             1,
//             info.imageLinks.thumbnail
//         ],
//         function (error, results, fields) {
//             // pass result to callback function
//             if (error) {
//                 console.log('Error inserting ', error)
//                 return;
//             }
//             console.log('Added');
//         });
//     }
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   });

module.exports = pool;
