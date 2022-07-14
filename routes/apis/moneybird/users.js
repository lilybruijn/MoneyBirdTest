const express = require('express');
const router = express.Router();
const axios = require('axios');

const expireTime = 60;

let userCache = null;
let lastUserCache = Math.floor((new Date()).getTime() / (expireTime * 1000));

const getUsers = async () => {
    let currentTime = Math.floor((new Date()).getTime() / (expireTime * 1000));
    if (!userCache || lastUserCache < currentTime) {
        lastUserCache = currentTime;
        userCache = await axios.get('https://moneybird.com/api/v2/234526464103416842/users/', {
            headers: {
                'Authorization': 'Bearer guYEJ1KU6u7agjOgz0GtkxXLa_YfzP2Mnkdvm0Kv4Gs',
                'Access-Control-Allow-Headers' : '*'
            }
        });
    }
    return userCache;
};

// GET apis/moneybird/users/
router.get("/", async (req, res) => {
try {
    const users = await getUsers();
    res.json(users.data.reduce((users, user) => {
        users[user.id] = user;
        user.username = user.name;
        return users;
    }, {}));
} catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: "Server error" });
}
});

// GET apis/moneybird/users/byId
router.get("/byId/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        const users = await getUsers();
        let userArr = [];
        users.data.forEach(element => {
            if(element.id === req.params.id) {
                userArr.push({username: element.name})
            }
        });
        res.send(userArr);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ msg: "Server error" });
    }
    });

module.exports = router;