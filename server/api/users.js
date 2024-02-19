const express = require('express');
const router = express.Router();
const { authRequired } = require('./util');
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const { postLogin, getAllUsers, getUserByUsername, createUser, updateUser, deleteUser } = require('../db/sqlHelperFunctions/users');

router.get('/', async (req, res, next) => {
    try {
        const user = await getAllUsers();
        res.send(user);
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const user = await getUserByUsername(req.body.username);
        console.log(user)
        console.log(req.body)
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        console.log(validPassword)
        if (validPassword) {
			const token = jwt.sign(user, JWT_SECRET);
        
            res.cookie("token", token, {
                sameSite: "strict",
                httpOnly: true,
                signed: true
            });

            delete user.password
            console.log(token)
            res.send({ token, user });
    } else {
        res.status(401).send({ error: 'Invalid password' })
    }
} catch (error) {
        next(error);
    }
});


router.get('/me',authRequired, async (req, res, next) => {
    try {
        const user = await getUserFromRequest(req)
        console.log(`user from get me: ${user}`)
        console.log(`username from getme: $requ.`)
        res.send(user);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const {first_name,last_name, username, email, password} = req.body
        console.log(`password: ${password}`)
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
        const token = await createUser({first_name,last_name,username, email, password: hashedPassword});
        
        res.cookie("token", token, {
		    sameSite: "strict",
			signed: true,
		});
        res.send({ token });
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        res.send(user);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const user = await deleteUser(req.params.id);
        res.send(user);
    } catch (err) {
        next(err);
    }
});

module.exports = router;