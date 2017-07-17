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

## Installation

```shell
npm i -g ya-basement
```

## Usages

* 根据别名快速打开常用目录

```shell
ya open -k=dirName -v=dirPath   配置打开的路径别名
ya open dirName or dirPath 命令行快速打开文件/文件夹
```

* 翻译

```shell
ya yd man 中英文快速翻译，基于有道翻译
```

* 批量压缩图片

```shell
ya tinify -k=secretKey  配置 tinify 密钥
ya tinify --path=dirPath [--size=70]  压缩图片，--size为显示阀值
```

* 常用模板快速生成到指定目录

```shell
ya init -k=templateName -v=mygitlab.com:owner/name#branch or github:owner/name or localDir  严格按照格式录入，支持gitlab、github、本地文件夹
ya init -d=dir 配置输出目录后，在命令行的下拉框选择模板
```

* 获取IP

```shell
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

