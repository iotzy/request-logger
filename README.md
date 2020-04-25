## 此代码为了方便flutter应用测试时可以直观的看见http请求及响应
## 将app的后端服务地址改为此服务地址即可，其实相当于加了一次正向代理
## 需要nodejs环境
## 使用说明

```shell script
    node logger.js p=3000 s=http://127.0.0.1:8000
```

## 参数说明
   `p,port`  启动本地服务的端口 i.e.: 127.0.0.1:[p,port]
   
   `s,server` 代理(目标)的服务器地址


## enjoy it!
