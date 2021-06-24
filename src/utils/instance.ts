import axios from "axios";
import { useAuth } from "../providers/auth";


export const instance = axios.create({
  baseURL: 'http://localhost:2100/api',
  timeout: 10000,
  headers: {
    'x-auth-token': '',
    'accept': 'application/json',
    'access-Control-Allow-Origin': '*'
  }
});

export const instanceAuth = axios.create({
  baseURL: 'http://localhost:2100/api/auth',
  timeout: 10000,
  headers: {
    'accept': 'application/json',
    'access-Control-Allow-Origin': '*'
  }
});