const util = require('./utility')
const {hash, readFile, writeFile} = require("./utility");

// Choose a hash algorithm
const hash_algo = hash('sha256');

const password_file=  readFile('password.txt');
const encrypted_file = writeFile('password.enc.txt');

function makepassword(password_file,encrypted_file) {


    const lines = password_file.trim().split('\n');

    for (let line of lines) {
        const [email, password] = line.split(':');
        const hash = crypto.createHash(hash_algo).update(password).digest('hex');
        encrypted_file.write(`${email}:${hash}\n`);
    }
    encrypted_file.end();
}
    console.log('Encryption completed successfully.');

module.exports = {makepassword}

