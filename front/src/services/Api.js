import Cookies from 'js-cookie'
import { API_URL } from '../utils/constant';

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
  async getProfile() {
    try {
      const response = await fetch(`${this.BASE_URL}/user/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      const data = await response.json();
      return data;
    } catch(e) {
      console.log(e)
      return { error: e }
    }
  }

  async register({ username, password, email }) {
    if(!!username && !!password && !!email) {
      try {
        const headers = new Headers()
        headers.append("Content-Type", "application/json");
        const res = await fetch(`${this.BASE_URL}/auth/register`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ username, password, email }),
        });
        const json = await res.json();
        return json;
      } catch(e) {
        console.error(e)
        return e
      }
    }
  }

  async getArticles() {
    try {
      const response = await fetch(`${this.BASE_URL}/article`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      const data = await response.json();
      return data;
    } catch(e) {
      console.log(e)
      return { error: e }
    }
  }

  async getArticle(id) {
    try {
      const response = await fetch(`${this.BASE_URL}/article/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      const data = await response.json();
      return data;
    } catch(e) {
      console.log(e)
      return { error: e }
    }
  }
  async updateArticle(id, body) {
    try {
      const response = await fetch(`${this.BASE_URL}/article/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      const data = await response.json();
      return data;
    } catch(e) {
      console.log(e)
      return { error: e }
    }
  }
  async deleteArticle(id, body) {
    try {
      const response = await fetch(`${this.BASE_URL}/article/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      const data = await response.json();
      return data;
    } catch(e) {
      console.log(e)
      return { error: e }
    }
  }
  async createArticle(body) {
    try {
      const response = await fetch(`${this.BASE_URL}/article`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      const data = await response.json();
      return data;
    } catch(e) {
      return { error: e }
    }
  }
}

export default new Api(`${API_URL}/api`)