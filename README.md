ya-basement
==========================
[![Travis](https://img.shields.io/travis/ybg555/ya-basement.svg)](https://travis-ci.org/ybg555/ya-basement)
[![npm](https://img.shields.io/npm/dm/ya-basement.svg)](https://www.npmjs.com/package/ya-basement)
[![npm](https://img.shields.io/npm/v/ya-basement.svg)](https://www.npmjs.com/package/ya-basement)
[![node](https://img.shields.io/node/v/ya-basement.svg)](https://www.npmjs.com/package/ya-basement)

本地常用功能操作通过命令集来完成

## Features

* 基于命令行快速打开文件或文件夹，可自定义配置路径
* 中英文快速翻译，基于有道翻译
* 基于 tinify 批量压缩图片
* 常用模板快速生成到指定目录
* 获取内、外网 IP 地址
* 代码性能基准测试

## Installation

```shell
npm i -g ya-basement
```

## Usages

* 根据别名快速打开常用目录

```js
// 配置打开的路径别名
ya open -k=dirName -v=dirPath

// 打开文件/文件夹
ya open dirName or dirPath
```

* 翻译

```shell
ya yd man 中英文快速翻译，基于有道翻译
```

* 批量压缩图片

```js
// 配置 tinify 密钥
ya tinify -k=secretKey

// 压缩图片，--size为显示阀值
ya tinify --path=dirPath [--size=70]
```

* 常用模板快速生成到指定目录

```js
// 配置模板名和模板存放地址，地址支持gitlab、github、本地文件夹
ya init -k=templateName -v=mygitlab.com:owner/name#branch or github:owner/name or localDir

// 使用
ya init -d=dir 填写模板存放地址，在命令行的下拉框选择配置好的模板名
```

* 获取IP

```shell
ya ip 获取内、外网IP
```

* 代码性能基准测试

```shell
ya benchmark -a=js文件 -b=js文件
```


## Issues

Submit the [issues](https://github.com/ybg555/ya-basement/issues) if you find any bug or have any suggestion.

## Contribution

Fork the [repository](https://github.com/ybg555/ya-basement/tree/master) and submit pull requests.

## Release Notes

[CHANGELOG](https://github.com/ybg555/ya-basement/blob/master/CHANGELOG.md)

## License

[![npm](https://img.shields.io/npm/l/ya-basement.svg)](https://github.com/ybg555/ya-basement/blob/master/LICENSE.md)

