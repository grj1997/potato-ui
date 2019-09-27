# potato-ui
<p align="center">
    <img alt="logo" src="http://www.gaorongjun.cn/wp-content/uploads/2018/07/cropped-80cb39dbb6fd5266e1a3a92ea018972bd407367b.jpg" width="120" height="120" style="margin-bottom: 10px;">
</p>

<h3 align="center" style="margin: 30px 0 35px;">基于vue的个人开发移动端组件</h3>


<p align="center">
  🚀<a href="http://www.gaorongjun.cn">访问作者</a>
</p>

---

## 说明

* 实际开发中提取出来的组件
* css预处理器是scss


## 安装

#### NPM

```shell
npm i potato-ui -S
```

#### YARN

```shell
yarn add potato-ui
```

## 快速入门

#### 1. 导入所有组件

```js
import Vue from 'vue';
import potatoUi from 'potato-ui';

Vue.use(potatoUi);
```
#### 2. 使用组件

```html
<p-card-input />
```
> 如果您配置了babel-plugin-import，则不允许导入所有组件。

