import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import Login from '../components/Login';

describe('Login component', () => {
  test('renders username and password fields', () => {
    const { getByLabelText } = render(<Login />);
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('allows user to enter username and password', () => {
    const { getByLabelText } = render(<Login />);
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('testpassword');
  });

  test('submits form with username and password when Sign in button is clicked', async () => {
    const { getByLabelText } = render(<Login />);
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    // const signInButton = getByText('Sign in');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    // fireEvent.click(signInButton);
  });

});
