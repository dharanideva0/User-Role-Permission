const express = require('express')
const router = express.Router()
const { projects } = require('../lookup')
const { authUser } = require('../basicAuth')
const { canViewProject, canDeleteProject, scopedProjects } = require('../permission/projectPermission')
const db = require('../models');

router.get('', authUser, setProject, authGetProject, (req, res) => {
    res.json(req.project)
})

router.delete('', authUser, setProject, authDeleteProject, (req, res) => {
    res.send('Delete Method goes here....')
})

function setProject(req, res, next) {
    const moduleName = db.sequelize.query("SELECT r.userId as userId ,p.module , p.permission  FROM roles r left join permissions p on r.id = p.roleId where r.userid = :id ", {
        type: db.sequelize.QueryTypes.SELECT,
        replacements: { id: req.body.userId },
        attributes: ['userId', 'module', 'permission']
    }).then((module) => {
        const userId = req.body.userId
        if (userId) {
            req.project = module;
        }

        if (req.project.length === 0) {
            res.status(404)
            return res.send('Modules or permissions are not assigned for this user');
        }
        next()
    });
}

function authGetProject(req, res, next) {
    if (!canViewProject(req.user, req.project)) {
        res.status(401)
        return res.send('Not Allowed')
    }
    next()
}

function authDeleteProject(req, res, next) {
    if (!canDeleteProject(req.user, req.project)) {
        res.status(401)
        return res.send('Not Allowed')
    }
    next()
}

module.exports = router