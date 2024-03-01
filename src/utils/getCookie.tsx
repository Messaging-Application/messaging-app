export const getCookie = (cookieName: string) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === cookieName) {
        return value;
      }
    }
    return null; 
  }