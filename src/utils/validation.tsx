export const validateUsername = (username: string): true => {
    if (username.trim() === '') {
        throw new Error('Please enter a username.');
    }
    if (!/^[a-zA-Z0-9_.-]*$/.test(username)) {
        throw new Error('Username should only contain numbers, letters, dashes, dots, and underscores.');
    }
    return true;
};

export const validateEmail = (email: string): true => {
    if (email.trim() === '') {
        throw new Error('Please enter an email.');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Please enter a valid email address.');
    }
    return true;
};


export const passwordsMatch = (password: string, confirm: string): true => {
    if (password.trim() === '') {
        throw new Error('Please enter a password.');
    }
    if (confirm.trim() === '') {
        throw new Error('Please confirm the password.');
    }
    if (confirm != password) {
        throw new Error("Password don't match");
    }
    return true;
}

export const validateName = (name: string): true => {
    if (name.trim() === '') {
        throw new Error('Please enter a name.');
    }
    if (!/^[^\d]*$/.test(name)) {
        throw new Error('Name should not contain numbers.');
    }
    return true;
};

export const validatePassword = (password: string): true => {
    if (password.trim() === '') {
        throw new Error('Please enter a password.');
    }
    // Check if the password meets minimum length requirement
    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long.');
    }

    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        throw new Error('Password must contain at least one uppercase letter.');
    }

    // Check if the password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        throw new Error('Password must contain at least one lowercase letter.');
    }

    // Check if the password contains at least one digit
    if (!/\d/.test(password)) {
        throw new Error('Password must contain at least one digit.');
    }

    // Check if the password contains at least one special character
    if (!/[$@$!%*?&]/.test(password)) {
        throw new Error('Password must contain at least one special character ($@$!%*?&).');
    }
    return true;
};