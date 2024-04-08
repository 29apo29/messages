class Signup {
  constructor(name, username, email, password) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
  }
  isReady() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[a-zA-Z\s]{3,28}$/;
    return emailRegex.test(this.email) &&
      nameRegex.test(this.name) &&
      (this.username.length >= 6 && this.username.length <= 16) &&
      (this.password.length >= 6 && this.password.length <= 28);
  }
  getAllValues() {
    return {
      ...this
    }
  }
}

module.exports = Signup;