# todolist

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

```
---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

[项目文档](https://simulatedgreg.gitbooks.io/electron-vue/content/cn/)


### 一些问题
* node-sass可能安装失败，需要换淘宝镜像进行安装
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install node-sass
```
* node-sass版本与当前开发系统版本不符合导致npm run dev运行失败，需要将node-sass卸载重新安装
```$xslt
npm uninstall node-sass -D
npm install node-sass -D
```

* 增加ts类型检测
