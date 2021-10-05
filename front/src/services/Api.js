// import Cookies from 'js-cookie'

class Api {
  constructor(BASE_URL) {
    this.BASE_URL = BASE_URL;
  }

  async index() {
    const response = await fetch(`${this.BASE_URL}`);
    const data = await response.json();
    return data;
  }
  
  async login({ username, password }) {
    console.log('lol')
    const headers = new Headers()
    headers.append("Content-Type", "application/json");
    const res = await fetch(`${this.BASE_URL}/auth/login`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json();
    return json;
  }
}

export default new Api('http://localhost:4000/api')