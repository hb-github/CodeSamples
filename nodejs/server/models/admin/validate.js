export function validateUsername(username) {
    return true;
  }
  // export function validateEmail(email) {
  //   const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
  //   return emailRegex.test(email);
  // }
  export function validatePassword(password) {
    return password.length >= 6 && password.match(/\d+/g);
  }
  export function validateEmail(email) {
    const re = new RegExp('[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}','i');
    if (!email) {
      return true;
    }
    return re.test(email);
  }