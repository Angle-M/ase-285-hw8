const fs = require('fs');
const crypto = require('crypto');

// Choose a hash algorithm
const hash_algo = 'sha256';

function makepassword(password_file, encrypted_file) {
    // Read the password file
    const password_data = fs.readFileSync(password_file, 'utf8');

    // Split the file into lines
    const lines = password_data.trim().split('\n');

    // Hash the passwords and write to the encrypted file
    const encrypted_stream = fs.createWriteStream(encrypted_file);
    for (let line of lines) {
        const [email, password] = line.split(':');
        const hash = crypto.createHash(hash_algo).update(password).digest('hex');
        encrypted_stream.write(`${email}:${hash}\n`);
    }
    encrypted_stream.end();

    console.log('Encryption completed successfully.');
}

if (require.main === module) {
    makepassword('./password.txt', './password.enc.txt');
}

module.exports = { makepassword };
