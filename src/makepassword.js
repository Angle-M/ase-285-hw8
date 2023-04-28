const fs = require('fs');
const crypto = require('crypto');
const password_file = 'password.txt';
const encrypted_file = 'password.enc.txt';
// Choose a hash algorithm
const hash_algo = 'sha256';
function makepassword(password_file,encrypted_file) {
    password_file = fs.readFileSync('password.txt');
    encrypted_file = fs.createWriteStream('password.enc.txt');
    const lines = password_file.trim().split('\n');
    for (let line of lines) {
        const [email, password] = line.split(':');
        const hash = crypto.createHash(hash_algo).update(password).digest('hex');
        encrypted_file.write(`${email}:${hash}\n`);
    }
    encrypted_file.end();

    console.log('Encryption completed successfully.');
}
if (require.main === module){
    makepassword('/src/password.txt', '/src/password.enc.txt');
}
module.exports = {makepassword};