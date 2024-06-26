import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'

import Register from '../components/Register';

describe('Register component', () => {
  test('renders username, password, confirm fields', () => {
    const { getByLabelText } = render(<Register />);
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const confirmInput = getByLabelText('Confirm Password');
    const emailInput = getByLabelText('Email');
    const firstnameInput = getByLabelText('Firstname');
    const lastnameInput = getByLabelText('Lastname');

    expect(emailInput).toBeInTheDocument();
    expect(firstnameInput).toBeInTheDocument();
    expect(lastnameInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmInput).toBeInTheDocument();
  });

  test('allows user to enter username, password, confirm', () => {
    const { getByLabelText } = render(<Register />);
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const confirmInput = getByLabelText('Confirm Password');
    const emailInput = getByLabelText('Email');
    const firstnameInput = getByLabelText('Firstname');
    const lastnameInput = getByLabelText('Lastname');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(confirmInput, { target: { value: 'testpassword2' } });
    fireEvent.change(emailInput, { target: { value: 'testuser@gmail.com' } });
    fireEvent.change(firstnameInput, { target: { value: 'testfisrtname' } });
    fireEvent.change(lastnameInput, { target: { value: 'testlastname' } });

    expect(emailInput).toHaveValue('testuser@gmail.com');
    expect(firstnameInput).toHaveValue('testfisrtname');
    expect(lastnameInput).toHaveValue('testlastname');
    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('testpassword');
    expect(confirmInput).toHaveValue('testpassword2');
  });
});
