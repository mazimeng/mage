const fs = require('fs');
const request = require('request');
var tencentyoutuyun = require('./lib/youtu');

var conf = tencentyoutuyun.conf;
var youtu = tencentyoutuyun.youtu;
var auth = tencentyoutuyun.auth;

// 设置开发者和应用信息, 请填写你在开放平台
var appid = '10110256';
var secretId = 'AKIDLUSAcomQq0uYv2SUKuEHZfbUDmBLjwNY';
var secretKey = '5wXsxta2FCwRhiU1JM9hz0lGVUCernTu';
var userid = '12485912';
conf.setAppInfo(appid, secretId, secretKey, userid, 0);

let signature = auth.appSign(1514641179, userid);

console.log(signature);
