import axios from "axios";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
const API_URL = process.env.REACT_APP_API_KEY;

class AuthService {
  login(Email, Password, Remember) {
    return axios
      .post(API_URL + "/login", {
        email: Email,
        pass: Password,
        rem: Remember,
        from: "1h",
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data.jwt_token));
          return response;
        }
      })
      .catch((err) => {
        if (!err.response) {
          return "Network Error";
        } else {
          return err.response;
        }
      });
  }
  signUp(name, Email, password, number) {
    return axios
      .post(API_URL + "/signUp", {
        name: name,
        email: Email,
        password: password,
        ph_no: number,
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((err) => {
        if (!err.response) {
        } else {
        }
      });
  }
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("userRfTkn");
    localStorage.removeItem("LinkToken");
  }
  isAuthenticateduser() {
    if (
      localStorage.getItem("user") === null ||
      localStorage.getItem("user") === undefined ||
      localStorage.getItem("user") === "undefined"
    ) {
      return false;
    }
    const jwtTkn = localStorage.getItem("user");

    const user = jwtDecode(jwtTkn);

    var utcSeconds = user.exp;

    var now = moment().unix();

    if (utcSeconds === null) {
      localStorage.removeItem("user");
      return false;
    }

    if (utcSeconds >= now) {
      return true;
    } else {
      return false;
    }
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
