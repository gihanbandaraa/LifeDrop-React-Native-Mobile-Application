import { decode } from 'base-64';
if (typeof atob === 'undefined') {
    global.atob = decode;
  }