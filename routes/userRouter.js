const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", (req, res) => {
    db.User.findAll({
        include: [db.Role],
    }).then((users) => {
        res.send(users);
    });
});

router.get('/query', (req, res) => {
    db.sequelize.query("SELECT * FROM users u join roles r on u.id = r.userId ", { type: db.sequelize.QueryTypes.SELECT })
        .then((userList) => {
            res.send(userList);
        });
});

router.post("/new", (req, res) => {
    db.User.create({
        username: req.body.username,
    }).then((newUser) => {
        res.statusCode(200).send(newUser);
    }).catch((error) => {
        res.send(error);
    });
});

router.post("/bulk", (req, res) => {
    db.User.bulkCreate(req.body)
        .then((newUser) => {
            res.json(newUser);
        }).catch((error) => {
            res.json(error);
        });
});

router.delete('/:id', (req, res) => {
    db.User.destroy({
            where: { id: req.params.id },
            truncate: false
        })
        .then((rowsAffeected) => {
            if (rowsAffeected > 0) {
                res.send(rowsAffeected);
            } else {
                return res.send('record not found for ths user');
            }
        });
});

router.put('/:id', (req, res) => {
    db.User.update({
        username: req.body.username
    }, {
        where: { id: req.params.id }
    }).then(() => res.send("Updated Successfully"));
});

module.exports = router;