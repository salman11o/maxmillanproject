const axios                     = require("axios");
const dotenv                    = require("dotenv");
dotenv.config();
const token                     = process.env.AUTHORIZATION;
const User                      = require("../models/User");
let Users                       = new Array();
Users.fill(0);
module.exports.gitdata = async (req, res, next) => {
    try {
        const resp = await axios.get("https://api.github.com/users", {
            headers: {
                Authorization   : `token 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`,
            },
        });
        Users                   = resp.data;
        next();  
  }
  catch (error) {
    console.log(error.message);
  }
}

module.exports.UserCreation = async(req, res, next) =>{
    try {
        for (let i = 0; i < Users.length; i++)
        {
            const user = new User({
                login: Users[i].login,
                node_id: Users[i].node_id,
                avatar_url: Users[i].avatar_url,
            })
            const resp = await user.save();
            if (resp)
            {
                return res.status(200).send({Message:"Users Created"})
            }
            else
            {
                return res.status(403).send({Message:"Users not Created"})
            }
            }
    } catch (error) {
        return res.status(500).send({ Message: "Internal Error" });
    }
}

