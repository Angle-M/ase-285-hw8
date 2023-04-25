const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');
const {hash} = require("./utility");
// Choose a hash algorithm
hash('sha256');

function passwordjs(email, password) {
    const encrypted_file = fs.readFileSync('password.enc.txt', 'utf8');

    const lines = encrypted_file.trim().split('\n');

    let hash = '';
    for (let line of lines) {
        const [stored_email, stored_hash] = line.split(':');
        if (stored_email === email) {
            hash = stored_hash;
            break;
        }
    }

    // Compare the provided password hash with the stored hash value
    const password_hash = crypto.createHash(hash_algo).update(password).digest('hex');
    return hash === password_hash;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter an Email: ', (email) =>{
    rl.question('Enter password: ', (password) =>{
        const iscorrect = passwordjs(email, password);
        console.log(`Password is ${iscorrect ? 'true' : 'false'}.`);
        rl.close();
    });
});
/*
sm.cho@hello.com:123456
john.deacon@good.com:bestpassword
alan.may@best.com:mypassword
henry.taylor@edu.com:educatorbest
 */



