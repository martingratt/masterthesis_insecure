import crypto from "crypto";

function createHash(password) {
    const hash = crypto.createHash('md5').update(password).digest('hex');
    return hash;
}

export {createHash}
