// inisiasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require ("cors")
const mysql = require("mysql")

// implementation
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// create MySSQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pelanggaran_siswa"
})

db.connect(error => {
    if (error) {
        console.log(error.message);
    } else {
        console.log("MySQL Connected bestie purr");
    }
})

// end-point akses data user
app.get("/user", (req, res) => {
    // create sql query
    let sql = "select * from user"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                user: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point akses data user berdasarkan id_user tertentu
app.get("/user/:id", (req, res) => {
    let data = {
        id_user: req.params.id
    }

    // create sql query
    let sql = "select * from user where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                user: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data user
app.post("/user", (req, res) => {

    // prepare data
    let data = {
        nama_user: req.body.nama_user,
        username: req.body.username,
        password: req.body.CryptoJS.MD5(password)
    }

    // create sql query insert
    let sql = "insert into user set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted bestie purr"
            }
        }
        res.json(response) // send response
    })
})

//  end-point mengubah data user
app.put("/user", (req, res) => {

    // prepare data
    let data = [
        // data
        {
            nama_user: req.body.nama_user,
            username: req.body.username,
            password: req.body.CryptoJS.MD5(password)
        },

        // parameter (primary key)
        {
            id_user: req.body.id_user
        }
    ]

    // create sql query update
    let sql = "update user set ? where ?"

    //  run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message : result.affectedRows + " data updated bestie purr"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data user berdasarkan id_user
app.delete("/user/:id", (req, res) => {
    // prepare data
    let data = {
        id_user: req.params.id
    }

    // create query sql delete
    let sql = "delete from user where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted bestie purr"
            }
        }
        res.json(response) // send response
    })
})

app.listen(8000, () => {
    console.log("Run on port 8000 bestie purr");
})