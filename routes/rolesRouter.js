const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/find/:id", (req, res) => {
    db.Role.findAll({
        where: { UserId: req.params.id },
        include: [db.User]
    }).then(role => {
        res.send(role);
    });
});

router.post("/new", (req, res) => {
    db.Role.create({
        rolename: req.body.roleName,
        status: req.body.status,
        UserId: req.body.userId
    }).then(newRole => {
        res.send(newRole);
    });
});

router.delete('/:id', (req, res) => {
    db.Role.destroy({
            where: { id: req.params.id },
            truncate: false
        })
        .then((rowsAffeected) => {
            if (rowsAffeected > 0) {
                res.send(rowsAffeected);
            } else {
                return res.status(404).json({ success: false, message: "Record not found for this role" });
            }
        });
});

router.put('/:id', (req, res) => {
    const role = db.Role.findAll({
        where: { id: req.params.id }
    });
    console.log(role);
    if (!role) {
        return res.send('role detail not found for this id');
    }
    db.Role.update({
        rolename: req.body.rolename,
        status: req.body.status
    }, {
        where: { id: req.params.id }
    }).then(() => {
        return res.send("Updated Successfully");
    });
});

module.exports = router;