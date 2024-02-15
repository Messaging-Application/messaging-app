import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'

import Register from '../components/Register';

describe('Register component', () => {
  test('renders username, password, confirm fields', () => {
    const { getByLabelText } = render(<Register />);
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const confirmInput = getByLabelText('Confirm Password');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmInput).toBeInTheDocument();
  });

  test('allows user to enter username, password, confirm', () => {
    const { getByLabelText } = render(<Register />);
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const confirmInput = getByLabelText('Confirm Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(confirmInput, { target: { value: 'testpassword2' } });

    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('testpassword');
    expect(confirmInput).toHaveValue('testpassword2');
  });

  test('submits form with username, password, confirm when Sign up button is clicked', async () => {
    const { getByLabelText, getByText } = render(<Register />);
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const confirmInput = getByLabelText('Confirm Password');
    const signUpButton = getByText('Sign up');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(confirmInput, { target: { value: 'testpassword2' } });
    fireEvent.click(signUpButton);
  });

});
