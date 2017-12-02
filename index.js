const fs = require('fs');
const request = require('request');
var tencentyoutuyun = require('./lib/youtu');

var conf = tencentyoutuyun.conf;
var youtu = tencentyoutuyun.youtu;
var auth = tencentyoutuyun.auth;

// 设置开发者和应用信息, 请填写你在开放平台
var appid = '10110256';
var secretId = 'AKIDLUSAcomQq0uYv2SUKuEHZfbUDmBLjwNY';
var secretKey = 'AKIDLUSAcomQq0uYv2SUKuEHZfbUDmBLjwNY';
var userid = '12485912';
conf.setAppInfo(appid, secretId, secretKey, userid, 0);

let signature = process.argv[2];
let modelId = process.argv[3];

let imagePath = '/home/mazimeng/Downloads/elon-musk-driving-roadster.jpg';

try {
    var data = fs.readFileSync(imagePath).toString('base64');
} catch (e) {
    callback({'httpcode': 0, 'code': -1, 'message': 'file ' + imagePath + ' not exists', 'data': {}});
    return;
}

if (data == null) {
    callback({'httpcode': 0, 'code': -1, 'message': 'file ' + imagePath + ' not exists or params error', 'data': {}});
    return;
}

let requestBody = {
    app_id: appid,
    rsp_img_type: 'base64',
    img_data: data,
    opdata: [{
        cmd: 'doFaceMerge',
        params: {
            model_id: modelId
        }
    }]
};

request({
    uri: 'http://api.youtu.qq.com/cgi-bin/pitu_open_access_for_youtu.fcg',
    method: 'POST',
    json: requestBody,
    headers: {
        'Authorization': signature,
        // 'User-Agent'   : conf.USER_AGENT(),
        // 'Content-Length': requestBody.length,
        // 'Content-Type': 'text/json'
    }
}, function callback(error, response, body) {
    if (error) {
        console.log('error', error);
    } else {
        console.log(body.ret);
        fs.writeFile("out.jpg", body.img_base64, 'base64', function(err) {
            if(err) {
                console.log(err);
            }
        });
    }
});