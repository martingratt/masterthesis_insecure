import {exec} from "child_process";
import si from "systeminformation";
import serialize from "node-serialize";
import path from "path";

const __dirname = path.resolve(path.dirname(''));

export class frontendController {
    static commendExecution(req, res) {
        const command = 'ping ' + req.query.ip;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                res.status(500).send(error)
            } else {
                res.status(200).send(stdout)
            }
        });
    }
    static login(req, res) {
        res.render('login');
    }
    static logout(req, res) {
        res.clearCookie('profile');
        res.clearCookie('jwt');
        req.session.destroy()
        res.render('login');
    }

    static knownVuln(req, res) {
        const queryData = req.query.name
        si.services(queryData).then((data) => {
            res.json(data);
        });
    }

    static insecureDeserialization(req, res) {
        if (req.cookies.profile) {
            const str = new Buffer(req.cookies.profile, 'base64').toString();
            const obj = serialize.unserialize(str);
            if (obj.username) {
                res.render('insecureDeserialization',
                    {
                        username: obj.username,
                        city: obj.city}
                    )
            }
        } else {
            res.render('login')
        }
    }

    static pathTraversal(req, res) {
        const fileName = req.query.fileName;
        const filePath = __dirname + fileName;
        res.sendFile(filePath);
    }
}