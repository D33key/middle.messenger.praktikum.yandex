import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<div class="app"><div>', {
  url: 'http://localhost',

});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.FormData = jsdom.window.FormData;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
global.DOMParser = jsdom.window.DOMParser;
