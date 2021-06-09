import {exec} from "child_process";

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
}