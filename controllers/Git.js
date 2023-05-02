const axios                     = require("axios");
const dotenv                    = require("dotenv");
dotenv.config();
const token                     = process.env.AUTHORIZATION;
const User                      = require("../models/User");


module.exports.gitdata = async (req, res, next) => {
    try {
            const resp = await axios.get("https://api.github.com/users", {
                headers: {
                    Authorization   : `token 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`,
                },
            });
        if (resp)
        {   
             res.status(200).send({
                Message: "Fetch Successful",
                Data:resp.data    
            })
        }
        else {
             res.status(500).send({
                Message: "Fetch Failed",
                Data:resp.data    
            })
        }
        return res;
        } catch (error) {
            return res.status(501).send({ Message: error.Message });
        }
}

module.exports.UserCreation = async(data) =>{
    try {
           
    } catch (error) {
        return res.status(500).send({ Message: error.Message });
    }
}

