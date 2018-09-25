const path = require('path');
const fs = require('fs');
const execSync = require('child_process').execSync;


execSync(`rm -rf ${path.resolve(__dirname, `../lib`)}`);

console.log("移除文件成功");

console.log("开始编译\r\n");
execSync("tsc --d");

console.log("编译完成\r\n");

console.log("移除不要的文件");

const rmList = [];

rmList.forEach((item) => {
    execSync(`rm -rf ${path.resolve(__dirname, `../lib/${item}.js`)}`);
});

console.log("移除完成");
