import {
    validateUsername,
    validateEmail,
    passwordsMatch,
    validateName,
    validatePassword,
  } from '../utils';
  
  describe('Validation Functions', () => {
    describe('validateUsername', () => {
        it('should throw an error when username is empty', () => {
          expect(() => validateUsername('')).toThrow('Please enter a username.');
        });
      
        it('should throw an error when username contains invalid characters', () => {
          expect(() => validateUsername('user@name')).toThrow(
            'Username should only contain numbers, letters, dashes, dots, and underscores.'
          );
        });
      
        it.each(['username-123', 'username_123', 'username.123'])(
          'should return true when username is valid (%s)',
          (validUsername) => {
            expect(validateUsername(validUsername)).toBe(true);
          }
        );
    });
  
    describe('validateEmail', () => {
        it('should throw an error when email is empty', () => {
          expect(() => validateEmail('')).toThrow('Please enter an email.');
        });
      
        it('should throw an error when email is invalid', () => {
          expect(() => validateEmail('invalid_email')).toThrow(
            'Please enter a valid email address.'
          );
        });
      
        it('should return true when email is valid', () => {
          expect(validateEmail('test@example.com')).toBe(true);
        });
      });
      
      describe('passwordsMatch', () => {
        it('should throw an error when password is empty', () => {
          expect(() => passwordsMatch('', 'confirm')).toThrow('Please enter a password.');
        });
      
        it('should throw an error when confirm password is empty', () => {
          expect(() => passwordsMatch('password', '')).toThrow('Please confirm the password.');
        });
      
        it('should throw an error when passwords do not match', () => {
          expect(() => passwordsMatch('password', 'confirm')).toThrow("Password don't match");
        });
      
        it('should return true when passwords match', () => {
          expect(passwordsMatch('password', 'password')).toBe(true);
        });
      });
      
      describe('validateName', () => {
        it('should throw an error when name is empty', () => {
          expect(() => validateName('')).toThrow('Please enter a name.');
        });
      
        it('should throw an error when name contains numbers', () => {
          expect(() => validateName('John123')).toThrow('Name should not contain numbers.');
        });
      
        it('should return true when name is valid', () => {
          expect(validateName('John')).toBe(true);
        });
      });
      
      describe('validatePassword', () => {
        it('should throw an error when password is empty', () => {
          expect(() => validatePassword('')).toThrow('Please enter a password.');
        });
      
        it('should throw an error when password length is less than 8 characters', () => {
          expect(() => validatePassword('pass')).toThrow('Password must be at least 8 characters long.');
        });
      
        it('should throw an error when password does not contain uppercase letter', () => {
          expect(() => validatePassword('password')).toThrow('Password must contain at least one uppercase letter.');
        });
      
        it('should throw an error when password does not contain lowercase letter', () => {
          expect(() => validatePassword('PASSWORD')).toThrow('Password must contain at least one lowercase letter.');
        });
      
        it('should throw an error when password does not contain a digit', () => {
          expect(() => validatePassword('Password')).toThrow('Password must contain at least one digit.');
        });
      
        it('should throw an error when password does not contain a special character', () => {
          expect(() => validatePassword('Password123')).toThrow('Password must contain at least one special character ($@$!%*?&).');
        });
      
        it('should return true when password is valid', () => {
          expect(validatePassword('Password123$')).toBe(true);
        });
      });
  });
  