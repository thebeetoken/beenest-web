webpackJsonp([0xa25129398ba8],{36:function(e,t){"use strict";function r(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function n(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;var n=Object.getOwnPropertyNames(t).map(function(e){return t[e]});if("0123456789"!==n.join(""))return!1;var a={};return"abcdefghijklmnopqrst".split("").forEach(function(e){a[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},a)).join("")}catch(e){return!1}}var a=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;e.exports=n()?Object.assign:function(e,t){for(var n,c,i=r(e),l=1;l<arguments.length;l++){n=Object(arguments[l]);for(var s in n)o.call(n,s)&&(i[s]=n[s]);if(a){c=a(n);for(var f=0;f<c.length;f++)u.call(n,c[f])&&(i[c[f]]=n[c[f]])}}return i}},150:function(e,t,r){"use strict";var n=function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=n(r(1)),o=function(){return a.default.createElement("div",null,a.default.createElement("h1",null,"NOT FOUND"),a.default.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))};t.default=o}});
//# sourceMappingURL=component---src-pages-404-tsx-f8271b260253ce3b9db3.js.map