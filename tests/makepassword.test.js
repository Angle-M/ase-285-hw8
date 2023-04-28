const fs = require('fs');
const crypto = require('crypto');
const { makepassword } = ('./src/makepassword');

describe('makepassword', () => {
  const password_file = 'password.txt';
  const encrypted_file = 'password.enc.txt';

  beforeEach(() => {
    // Make sure password.enc.txt does not exist before running each test.
    if (fs.existsSync(encrypted_file)) {
      fs.unlinkSync(encrypted_file);
    }
  });

  it('should create password.enc.txt', () => {
    // Make sure password.enc.txt does exist after running the function.
    makepassword(password_file, encrypted_file);
    expect(fs.existsSync(encrypted_file)).toBe(true);
  });

  it('should have correct contents in password.enc.txt', () => {
    // Make sure the contents of password.enc.txt has correct contents.
    const lines = fs.readFileSync(encrypted_file, 'utf8').trim().split('\n');
    for (let line of lines) {
      const [email, hash] = line.split(':');
      expect(email).toMatch(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    }
  });
});
