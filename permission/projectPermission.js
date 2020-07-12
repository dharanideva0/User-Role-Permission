const { ROLE } = require('../models');
const db = require('../Models');

function canViewProject(user, project) {
    var projectList = [];
    if (project.length > 0)
        projectList = project.filter(per => per.permission.toString().toUpperCase() === "VIEW".toString().toUpperCase())

    if (projectList.length > 0)
        return true
}

function canDeleteProject(user, project) {
    var projectList = [];
    if (project.length > 0)
        projectList = project.filter(per => per.permission.toString().toUpperCase() === "DELETE".toString().toUpperCase())

    if (projectList.length > 0)
        return true
}

module.exports = {
    canViewProject,
    canDeleteProject
}