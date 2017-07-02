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
* 基于tinify压缩图片
* 获取内、外网IP地址

## Installation

```shell
npm i -g ya-basement
```

## Usages

```shell
ya open --key=dirName --value=dirPath   自定义配置打开的路径别名
ya open dirName or dirPath 命令行快速打开文件/文件夹

ya yd man 中英文快速翻译，基于有道翻译

ya tinify --key=secretKey  配置密钥
ya tinify --path=dirPath [--size=70]  压缩图片，--size为显示阀值

ya ip 获取内、外网IP
```

## Issues

Submit the [issues](https://github.com/ybg555/ya-basement/issues) if you find any bug or have any suggestion.

## Contribution

Fork the [repository](https://github.com/ybg555/ya-basement/tree/master) and submit pull requests.

## Release Notes

[CHANGELOG](https://github.com/ybg555/ya-basement/blob/master/CHANGELOG.md)

## License

[![npm](https://img.shields.io/npm/l/ya-basement.svg)](https://github.com/ybg555/ya-basement/blob/master/LICENSE.md)

