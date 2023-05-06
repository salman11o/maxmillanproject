const axios                     = require("axios");
const token                     = process.env.AUTHORIZATION;
const User                      = require("../models/User");
const express = require("express");
const db = require("../db/Connection");
const fs = require('fs');
const shorid = require('shortid');
const shortid = require("shortid");
exports.gitdata = async (req, res, data) => {
    try {

        const response = await axios.get("https://api.github.com/users");
        const users = response.data;
    const userObjects = users.map(user => new User({
        login: user.login,
        node_id:user.node_id,
        avatar_url:user.avatar_url
    }));
 
        const result=await User.insertMany(userObjects);
        if (result)
        {
            writedata(users);
            return res.status(200).send({
                Message: "Data Inserted Successfully",
                Data:userObjects});
        }
        else
        {
            return res.status(501).send({ Message: "Data Insertion Failed" });
            }
        } catch (error) {
            return res.status(501).send({ Message: error.Message });
        }
}

async function writedata(Users)
{
   const res=await fs.writeFile("C:\\Users\\Salman.Hassan\\Desktop\\Remote.JSON", JSON.stringify(Users), (err) => {
  if (err) throw err;
  console.log("Array written to file!");
   });
    
}

exports.getUser = async (req, res) => {
    try
    {
        const arg = req.body.user.login;
        let resp= getUserData("C:\\Users\\Salman.Hassan\\Desktop\\Remote.JSON", arg);
        if (resp)
        {
            return res.status(200).send({
                Message: "User Found",
                Data:resp
            })
        }
        else {
            return res.status(401).send({Message: "User Not Found",
                Data:resp})
        }
    }
    catch (err)
    {
        return res.status(501).send({ Message: err.Message });
    }
}

function getUserData(FileName, userLogin)
{   
        let foundUser = null;
    const data=fs.readFileSync(FileName, "utf-8");
        const users = JSON.parse(data);
            foundUser = users.find((user) => JSON.stringify(user.login) === JSON.stringify(userLogin));

    return foundUser;
} 

exports.getApiKey = async (req, res) =>
{
    try {
        const arg = req.body.user.login;
        let resp= getUserData("C:\\Users\\Salman.Hassan\\Desktop\\Remote.JSON", arg);
        if (resp)
        {
            //const apiKey = createShortId("C:\\Users\\Salman.Hassan\\Desktop\\ApiKeys.txt");
            const Apikey = await createApiKey("C:\\Users\\Salman.Hassan\\Desktop\\ApiKeys.txt");
            
            res.setHeader("api-x-key", Apikey);
            return res.status(200).send({
                Message: "User Found",
                Data:resp,
                Apikey: Apikey,
            })
        }
        else {
            return res.status(401).send({
                Message: "User Not Found",
                Data: resp,
                Apikey: Apikey,
                apiKey:apiKey
            })
        }
    }
    catch (err)
    {
        return res.status(501).send({ Message: err.Message });
    }
    }
function createShortId(file)
{
    const apiKey = shortid.generate()+"\n";
    fs.writeFileSync(file, apiKey, {
        flag:'a'
    });
    return apiKey;
}

async function createApiKey(file)
{
    return new Promise((resolve, reject) => {
        const apiKey = shortid.generate() + "\n";
        fs.appendFile(file, apiKey, (data, err) => {
            if (err) reject(err);
            resolve(apiKey);
        });
    })
}