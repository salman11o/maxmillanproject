const axios                     = require("axios");
const token                     = process.env.AUTHORIZATION;
const User                      = require("../models/User");
const express = require("express");
const db = require("../db/Connection");
const fs=require('fs')
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
        let resp=await getUserData("C:\\Users\\Salman.Hassan\\Desktop\\Remote.JSON", arg);
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
   return new Promise((resolve, reject) => {
        let foundUser = null;
        fs.readFile(FileName, "utf-8", (err, data) => {
        if (err) reject(err);
    
        const users = JSON.parse(data);
            foundUser = users.find((user) => JSON.stringify(user.login) === JSON.stringify(userLogin));
            resolve(foundUser);
      });
    })
} 

