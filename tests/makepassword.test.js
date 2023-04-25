const fs = require('fs');
const p = require('../src/makepassword');

describe('makepassword should create file', () => {
    const passwordFile = './tests/passwordtest.txt';
    const encryptedFile = './tests/passwordtest.enc.txt';

    beforeEach(() => {
        try {
            fs.unlinkSync(encryptedFile);
        } catch (err) {
            // Ignore error if file doesn't exist
        }
    });

    test('creates encrypted file with correct contents', () => {
        // Make sure password.enc.txt does not exist before running the function.
        expect(fs.existsSync(encryptedFile)).toBe(false);

        // Run the function to create the encrypted file
        p.makepassword(fs.readFileSync(passwordFile, 'utf8'), fs.createWriteStream(encryptedFile));

        // Make sure password.enc.txt does exist after running the function.
        expect(fs.existsSync(encryptedFile)).toBe(true);

        // Make sure the contents of password.enc.txt has correct contents.
        const expectedContents =
            'sm.cho@hello.com:8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92\n' +
            'john.deacon@good.com:c495634064a4baa0c6f7a5aed1f9f47488b421a4eca666a0b112baa720cee7f5\n' +
            'alan.may@best.com:89e01536ac207279409d4de1e5253e01f4a1769e696db0d6062ca9b8f56767c8\n' +
            'henry.taylor@edu.com:14f4cbccaee1fa7fe31820e2d57f1389823350a6fe23054b2a3d7dde4fa8531b\n';
        const actualContents = fs.readFileSync(encryptedFile, 'utf8');
        expect(actualContents).toEqual(expectedContents);
    });
});
