const express = require('express');
const { ROLE } = require('./lookup');
const { authUser, authRole } = require('./basicAuth');
const projectRouter = require('./routes/projectRoutes');

const db = require('./Models');

const app = express();

app.use(express.json());
app.use(setUser);

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
    console.log('connection has been established successfully');
    if (!module.present) {
        app.listen(PORT, () => console.log('listening to port ' + PORT + '...'));
    }

}).catch(err => {
    console.error('Unable to connect to the database  ', err);
});

app.use('/user', require('./routes/userRouter'));
app.use('/role', require('./routes/rolesRouter'));
app.use('/permission', require('./routes/permissionRouter'));

app.use('/projects', projectRouter)

app.get('/home', (req, res) => {
    res.send('Home Page')
})

app.get('/dashboard', authUser, (req, res) => {
    res.send('Dashboard Page')
})

app.get('/admin', authUser, authRole(ROLE.ADMIN), (req, res) => {
    res.send('Admin Page')
})

function setUser(req, res, next) {
    if (req.body.userId == undefined) { next() } else {
        db.sequelize.query("SELECT u.id as id,r.rolename as role FROM users u left join roles r on u.id = r.userId where u.id = :id", {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: { id: req.body.userId },
            attributes: ['id', 'role']
        }).then((roleList) => {
            const userId = req.body.userId
            if (userId) {
                if (roleList.length > 0) {
                    req.user = roleList;
                    req.user.role = roleList[0].role;
                } else {
                    req.user = null;
                }
            }
            next()
        });
    }
}

module.exports = app;