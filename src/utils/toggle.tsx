export const togglePasswordConfirm = () => {
    const passwordField = document.getElementById("password") as HTMLInputElement | null;
    const confirmField = document.getElementById("confirm") as HTMLInputElement | null;
    const checkBox = document.getElementById("hs-toggle-password-checkbox") as HTMLInputElement | null;
  
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
  }

    
  export const togglePassword = () => {
    const passwordField = document.getElementById("password") as HTMLInputElement | null;
    const checkBox = document.getElementById("hs-toggle-password-checkbox") as HTMLInputElement | null;
  
    if (passwordField && checkBox) {
      if (checkBox.checked) {
        passwordField.type = "text";
      } else {
        passwordField.type = "password";
      }
    }
  }