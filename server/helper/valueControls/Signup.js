const CustomError = require("../error/CustomError");

class Signup {
  constructor(name, username, email, password) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
  }
  isReady(reject) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[a-zA-Z\s]{3,28}$/;
    if (!emailRegex.test(this.email)) {
      reject(new CustomError("Please write a real email!", 400));
    }
    if (!nameRegex.test(this.name)) {
      reject(new CustomError("Please write a real name!", 400));
    }
    if (this.username.length <= 6 || this.username.length >= 16) {
      reject(new CustomError("Please write a real username!", 400));
    }
    if (this.password.length <= 6 || this.password.length >= 28) {
      reject(new CustomError("Please write a real password!", 400));
    }
  }
  getAllValues() {
    return {
      ...this,
    };
  }
}

module.exports = Signup;
