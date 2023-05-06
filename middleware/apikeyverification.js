const fs = require('fs');
const header=`api-x-header`
exports.verify = (req, res, next) => {
    const apikey = req.headers[header];
    const apikeyquery = req.query.apikey;
    const apikeyparams = req.params.apikey;
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
            return res.status(403).send({ Message: `Not Found "${apikey}" in the file.` });
        }
    }
}