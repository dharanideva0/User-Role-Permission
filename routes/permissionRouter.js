const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/find/:id", (req, res) => {
    db.sequelize.query("SELECT r.*,p.id as PermissionId,p.Module,p.status,p.permission FROM roles r join permissions p on r.id = p.roleId where r.userId = :id", {
        type: db.sequelize.QueryTypes.SELECT,
        replacements: { id: req.params.id }
    }).then((permission) => {
        res.send(permission);
    });
});

router.post("/new", (req, res) => {
    console.log(req.body);
    db.Permission.create({
        rolename: req.body.rolename,
        module: req.body.module,
        permission: req.body.permission,
        status: req.body.status,
        RoleId: req.body.roleId
    }).then(newPermission => {
        console.log(newPermission);
        res.send(newPermission);
    });
});

router.delete('/:id', (req, res) => {
    db.Permission.destroy({
            where: { id: req.params.id },
            truncate: false
        })
        .then((rowsAffeected) => {
            if (rowsAffeected > 0) {
                res.send(rowsAffeected);
            } else {
                return res.status(404).json({ success: false, message: "Record not found for this Permission" });
            }
        });
});

router.put('/:id', (req, res) => {
    const permission = db.Permission.findAll({ where: { id: req.params.id } }).
    then(permission => {
        res.send(permission);
    });
    console.log(permission);
    if (!permission) {
        return res.send('Permission detail not found for this id');
    }
    db.Permission.update({
        module: req.body.module,
        permission: req.body.permission,
        status: req.body.status
    }, {
        where: { id: req.params.id }
    }).then(() => res.send("Updated Successfully"));
});

module.exports = router;