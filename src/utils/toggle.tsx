// show/hide password and confirmed password
export const togglePasswordConfirm = (): void => {
  const passwordField: HTMLInputElement | null = document.getElementById("password") as HTMLInputElement | null;
  const confirmField: HTMLInputElement | null = document.getElementById("confirm") as HTMLInputElement | null;
  const checkBox: HTMLInputElement | null = document.getElementById("hs-toggle-password-checkbox") as HTMLInputElement | null;

  if (passwordField && checkBox) {
    if (checkBox.checked) {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
  }
  if (confirmField && checkBox) {
    if (checkBox.checked) {
      confirmField.type = "text";
    } else {
      confirmField.type = "password";
    }
  }
};

// show/hide password
export const togglePassword = (): void => {
  const passwordField: HTMLInputElement | null = document.getElementById("password") as HTMLInputElement | null;
  const checkBox: HTMLInputElement | null = document.getElementById("hs-toggle-password-checkbox") as HTMLInputElement | null;

  if (passwordField && checkBox) {
    if (checkBox.checked) {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
  }
};