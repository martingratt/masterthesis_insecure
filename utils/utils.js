import crypto from "crypto";

function hash(password) {
    const hash = crypto.createHash('md5').update(password).digest('hex');
    return hash;
}

export {hash}
