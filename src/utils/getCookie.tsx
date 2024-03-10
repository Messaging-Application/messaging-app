// get the specified cookie by name
export const getCookie = (cookieName: string): string | null => {
  const cookieString: string = document.cookie;
  const cookies: string[] = cookieString.split(';');
  for (const cookie of cookies) {
    const [name, value]: string[] = cookie.trim().split('=');
    if (name === cookieName) {
      return value;
    }
  }
  return null;
};