import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'

import Profile from '../components/Profile';
import { UserData } from '../types';
describe('Profile component', () => {

  jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => {
    if (key === 'user') {
      return JSON.stringify({
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com'
      });
    }
    return null; 
  });

  const mockUser: UserData = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'johndoe@gmail.com',
    roles: ["ROLE_USER"]
  };

  test('renders username, password, confirm fields', () => {
    const { getByLabelText } = render(<Profile showUser={mockUser}/>);
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
    const { getByLabelText } = render(<Profile showUser={mockUser}/>);
    const passwordInput = getByLabelText('Password');
    const confirmInput = getByLabelText('Confirm Password');
    const emailInput = getByLabelText('Email');
    const firstnameInput = getByLabelText('Firstname');
    const lastnameInput = getByLabelText('Lastname');

    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(confirmInput, { target: { value: 'testpassword2' } });
    fireEvent.change(emailInput, { target: { value: 'testuser@gmail.com' } });
    fireEvent.change(firstnameInput, { target: { value: 'testfisrtname' } });
    fireEvent.change(lastnameInput, { target: { value: 'testlastname' } });

    expect(emailInput).toHaveValue('testuser@gmail.com');
    expect(firstnameInput).toHaveValue('testfisrtname');
    expect(lastnameInput).toHaveValue('testlastname');
    expect(passwordInput).toHaveValue('testpassword');
    expect(confirmInput).toHaveValue('testpassword2');
  });

  test('submits form with username, password, confirm when Sign up button is clicked', async () => {
    const { getByLabelText } = render(<Profile showUser={mockUser}/>);
    const passwordInput = getByLabelText('Password');
    const confirmInput = getByLabelText('Confirm Password');
    const emailInput = getByLabelText('Email');
    const firstnameInput = getByLabelText('Firstname');
    const lastnameInput = getByLabelText('Lastname');

    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(confirmInput, { target: { value: 'testpassword2' } });
    fireEvent.change(emailInput, { target: { value: 'testuser@gmail.com' } });
    fireEvent.change(firstnameInput, { target: { value: 'testfisrtname' } });
    fireEvent.change(lastnameInput, { target: { value: 'testlastname' } });
  });

});
