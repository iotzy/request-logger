const Koa = require('koa');
// import koaBody from 'koa-body';
const koaBody = require('koa-bodyparser');
// const koaBody = require('koa-body');
// const fetch = require('node-fetch');
import fetch from 'node-fetch'


var styles = {
    'bold': ['\x1B[1m%s\x1B[22m'],
    'italic': ['\x1B[3m%s\x1B[23m'],
    'underline': ['\x1B[4m%s\x1B[24m'],
    'inverse': ['\x1B[7m%s\x1B[27m'],
    'strikethrough': ['\x1B[9m%s\x1B[29m'],
    'white': ['\x1B[37m%s\x1B[39m'],
    'grey': ['\x1B[90m%s\x1B[39m'],
    'black': ['\x1B[30m%s\x1B[39m'],
    'blue': ['\x1B[34m%s\x1B[39m'],
    'cyan': ['\x1B[36m%s\x1B[39m'],
    'green': ['\x1B[32m%s\x1B[39m'],
    'magenta': ['\x1B[35m%s\x1B[39m'],
    'red': ['\x1B[31m%s\x1B[39m'],
    'yellow': ['\x1B[33m%s\x1B[39m'],
    'whiteBG': ['\x1B[47m%s\x1B[49m'],
    'greyBG': ['\x1B[49;5;8m%s\x1B[49m'],
    'blackBG': ['\x1B[40m%s\x1B[49m'],
    'blueBG': ['\x1B[44m%s\x1B[49m'],
    'cyanBG': ['\x1B[46m%s\x1B[49m'],
    'greenBG': ['\x1B[42m%s\x1B[49m'],
    'magentaBG': ['\x1B[45m%s\x1B[49m'],
    'redBG': ['\x1B[41m%s\x1B[49m'],
    'yellowBG': ['\x1B[43m%s\x1B[49m']
};

const args = process.argv.slice(2);

let port = "";
let server = ""
args.forEach(item => {
    const arr = item.split("=");
    if (arr[0] === 'p' || arr[0] === "port") {
        port = arr[1]
    }
    if (arr[0] === 's' || arr[0] === "server") {
        server = arr[1]
    }
})


const listenPort = port || 3000
const destServer = server || 'http://127.0.0.1:8000'
const app = new Koa();
app.use(koaBody());
app.use(async ctx => {
    ctx.set('Access-Control-Allow-Origin', ctx.headers.origin); // 很奇怪的是，使用 * 会出现一些其他问题
    ctx.set('Access-Control-Allow-Headers', 'content-type');
    ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH')

    console.log(styles.red[0], "***********************  request  start  ***********************")
    console.log(styles.red[0] + styles.green[0], "path:   ", destServer + ctx.path);
    console.log(styles.red[0] + styles.green[0], "method: ", ctx.method);
    console.log(styles.red[0] + styles.green[0], "query:  ", ctx.query);
    console.log(styles.red[0] + styles.green[0], "data:   ",  JSON.stringify(ctx.request.body));
    console.log(styles.red[0] + styles.green[0], "bearer:    ", ctx.request.headers['bearer']);
    console.log(styles.red[0], "***********************  request  end  ***********************")
    var res, data;
    if (['post', 'POST', 'put', 'PUT'].includes(ctx.method)) {
        res = await fetch(`${destServer}${ctx.path}`, {
            body: JSON.stringify(ctx.request.body),
            headers: ctx.header,
            method: ctx.method,
            credentials: 'include'
        })
        data = await res.json();
    }
    if (['get', 'GET', 'delete', 'DELETE'].includes(ctx.method)) {
        let paramsArray = [];
        //拼接参数
        Object.keys(ctx.query).forEach(key => {
            paramsArray.push(key + '=' + ctx.query[key])
        })
        if (paramsArray.length) {
            if (ctx.path.search(/\?/) === -1) {
                ctx.path += '?' + paramsArray.join('&')
            } else {
                ctx.path += '&' + paramsArray.join('&')
            }
            ;
        }
        res = await fetch(`${destServer}${ctx.path}`, {
            headers: ctx.header,
            method: ctx.method,
            credentials: 'include'
        })
        data = await res.json();
    }

    console.log(styles.cyan[0], "***********************  response  start  ***********************")
    console.log(styles.cyan[0] + styles.green[0], "data:    ", JSON.stringify(data));
    console.log(styles.cyan[0], "***********************  response  end  ***********************")
    ctx.response.body = data;

});

app.listen(listenPort);
console.log(styles.blue[0] + styles.green[0], "logger server listen on port: ", listenPort);
console.log(styles.blue[0] + styles.green[0], "destination server is: ", destServer.toString());
