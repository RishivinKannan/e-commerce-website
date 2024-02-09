export function checkUserRegister(email) {
  const users = localStorage.getItem("Users")
    ? JSON.parse(localStorage.getItem("Users"))
    : [];
  return users.filter((user) => {
    return user.email.toLowerCase() == email.toLowerCase();
  }).length == 0
    ? false
    : true;
}
export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
export function validatePassword(pass, repass) {
  return pass.length >= 8
    ? pass == repass
      ? { bool: true, statement: "match" }
      : { bool: false, statement: "Password mismatch" }
    : { bool: false, statement: "Password should be more than 8 char" };
}

export function storeUserData(fullname, email, password) {
    const users = localStorage.getItem("Users")
      ? JSON.parse(localStorage.getItem("Users"))
      : [];
    const userAdder = localStorage.getItem("Users")
      ? users.concat({
          username: fullname,
          email: email,
          password: password,
        })
      : [
          {
            username: fullname,
            email: email,
            password: password,
          },
        ];
    localStorage.setItem("Users", JSON.stringify(userAdder));
  }