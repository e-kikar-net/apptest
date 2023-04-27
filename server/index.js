const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/api", (req, res) => {
    const { exec } = require("child_process");

    exec("who", (err, stdout, stderr) => {
        if (err) {
            // console.error(`Error executing command: ${err}`);
            //res.json({ message: 'error' });
            //return;
            whoResult = `moti     pts/0        2023-04-23 09:39 (31.154.28.130)
moti2     pts/0        2023-04-23 09:39 (31.154.28.130)
moti3     pts/0        2023-04-23 09:39 (31.154.28.130)
moti4     pts/0        2023-04-23 09:39 (31.154.28.130)
moti5    pts/0        2023-04-23 09:39 (31.154.28.130)
            `;

        } else {
            whoResult = stdout;
        }

        const loggedInUsers = whoResult.trim().split('\n').map(line => {
            const fields = line.split(/\s+/);
            console.log(fields[0]);
            return {
                name: fields[0] //,
                    //                tty: fields[1],
                    //  loginTime: fields[2] + ' ' + fields[3]
            };
        });
        //    console.log(`Number of logged-in users: ${loggedInUsers}`);
        res.json({ users: loggedInUsers });
    });
});

app.listen(5000, () => {
    console.log("API server listening on port 5000");
});