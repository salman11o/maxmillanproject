const fs = require('fs');

exports.verify = (req, res, next) => {
    const apikey = req.params.apikey;
    console.log(apikey);
    if (!apikey) {
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        });
    }
    else {
        const fileData = fs.readFileSync("C:\\Users\\Salman.Hassan\\Desktop\\ApiKeys.txt", 'utf-8');
        if (fileData.includes(apikey)) {
            console.log(`Found "${apikey}" in the file.`);
            next();
        }
        else {
            console.log(`Not Found "${apikey}" in the file.`);
            return res.status(403).send({ Message: `Not Found "${apikey}" in the file.` });
        }
    }
}