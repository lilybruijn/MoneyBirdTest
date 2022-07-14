const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET apis/moneybird/users/
router.get("/", async (req, res) => {
try {
    const users = await axios.get('https://moneybird.com/api/v2/234526464103416842/users/', {
        headers: {
            'Authorization': 'Bearer guYEJ1KU6u7agjOgz0GtkxXLa_YfzP2Mnkdvm0Kv4Gs',
            'Access-Control-Allow-Headers' : '*'
        }
    });
    res.json(users.data);
} catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: "Server error" });
}
});

// GET apis/moneybird/users/byId
router.get("/byId/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        const users = await axios.get('https://moneybird.com/api/v2/234526464103416842/users/', {
            headers: {
                'Authorization': 'Bearer guYEJ1KU6u7agjOgz0GtkxXLa_YfzP2Mnkdvm0Kv4Gs',
                'Access-Control-Allow-Headers' : '*'
            }
        });
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