function authUser(req, res, next) {
    if (req.user == null) {
        res.status(403)
        return res.send('User not exist');
    }

    next()
}

function authRole(role) {
    return (req, res, next) => {
        console.log(req.user.role);
        console.log(role);
        if (req.user.role === null)
            return res.send('Role is not assigned for this User');
        if (req.user.role.toString().toUpperCase() !== role.toString().toUpperCase()) {
            res.status(401)
            return res.send("You don't have enough permission to access this page");
        }
        next()
    }
}

module.exports = {
    authUser,
    authRole
}