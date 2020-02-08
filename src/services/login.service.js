const crypto = require('crypto');
const bcrypt = require('bcryptjs');

async function validateNewPassword(newPassword, currentPassword, defaultPassword) {
    const minPasswordLength = 8;
    const numericPattern = new RegExp("[0-9]");
    const uppercasePattern = new RegExp("[A-Z]");
    const lowercasePattern = new RegExp("[a-z]");
    const specialPattern = new RegExp("[~!@#$%\^&*()_+{}\":;'\[\]|.,]");

    return await new Promise((resolve, reject) => {
        let ret = {
            status: true,
            msg: "Successfully updated password."
        };

        if (!newPassword) {
            ret.status = false;
            ret.msg = "Missing password.";
            reject(ret);
        }

        if (ret.status && (!newPassword === defaultPassword)) {
            ret.status = false;
            ret.msg = "Cannot reset password to default password.";
            reject(ret);
        }

        if (ret.status && (newPassword.length < minPasswordLength)) {
            ret.status = false;
            ret.msg = `Password too short. Please must be at least ${minPasswordLength} characters."`;
            reject(ret);
        }

        if (ret.status && (!numericPattern.test(newPassword))) {
            ret.status = false;
            ret.msg =  "New password must contain at least 1 number.";
            reject(ret);
        }

        if (ret.status && (!uppercasePattern.test(newPassword))) {
            ret.status = false;
            ret.msg = "New password must contain at least 1 uppercase character.";
            reject(ret);
        }

        if (ret.status && (!lowercasePattern.test(newPassword))) {
            ret.status = false;
            ret.msg = "New password must contain at least 1 lowercase character.";
            reject(ret);
        }

        if (ret.status && (!specialPattern.test(newPassword))) {
            ret.status = false;
            ret.msg = "New password must contain at least 1 special character.";
            reject(ret);
        }

        if(ret.status && (newPassword === currentPassword)) {
            ret.status = false;
            ret.msg = "Cannot reset password to current password.";
            reject(ret);
        }

        resolve(ret)
    });
}

async function hashedPassword(password, sha256=false) {
    const saltRounds = 10;

    if(sha256) {
        password = crypto.createHash('sha256').update(password).digest('hex');
    }

    return await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) reject(err);
            resolve(hash)
        });
    });
}

async function checkPassword(password, dbPassword) {
    return await new Promise((resolve, reject) => {
         bcrypt.compare(password, dbPassword).then(function(isMatch) {
             isMatch ? resolve(true) : reject(false);
        });
    });
}

module.exports = {
    validateNewPassword,
    // getCurrentUser,
    hashedPassword,
    checkPassword
};
