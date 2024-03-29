<div align="center">
<img src="https://img.alicdn.com/imgextra/i3/O1CN01FZeXqK1XjGsLAR6LX_!!6000000002959-2-tps-128-128.png" alt="logo"/>
<h1>DataWorks Search Tables Chrome Extension</h1>

![](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![](https://badges.aleen42.com/src/vitejs.svg)

</div>

## Usage Documents

## Demo

### 应用安装 Extension Installation 

- 插件安装地址 [link](https://chromewebstore.google.com/detail/dataworks-%E6%90%9C%E8%A1%A8/pchandealfkoepcpkddkijpfiglgjkgi?hl=en)

### 操作影片
- [YouTube](https://www.youtube.com/watch?v=aCjk6-mTys8)

### URL 框搜索 (支持跳转 DataWorks 数据地图)
![image](https://img.alicdn.com/imgextra/i2/O1CN01e2Nrqe1RDlwT2dL7Z_!!6000000002078-0-tps-1474-256.jpg)

### 插件设定页
![image](https://img.alicdn.com/imgextra/i3/O1CN019nzShk1DWBEt2Jxia_!!6000000000223-0-tps-2878-1664.jpg)

### 插件浮层页面
![image](https://img.alicdn.com/imgextra/i3/O1CN01Hxs4sR1gQL2kNnFFb_!!6000000004136-0-tps-800-658.jpg)


## Table of Contents

- [Intro](#intro)
- [Features](#features)
- [Installation](#installation)
    - [Procedures](#procedures)
        - [Chrome](#chrome)
        - [Firefox](#firefox)
- [Documents](#documents)

## Intro <a name="intro"></a>

This is a Chrome extension source code.

## Features <a name="features"></a>

- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vite](https://vitejs.dev/)
- [SASS](https://sass-lang.com/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Husky](https://typicode.github.io/husky/getting-started.html#automatic-recommended)
- [Commitlint](https://commitlint.js.org/#/guides-local-setup?id=install-commitlint)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
- [Chrome Extension Manifest Version 3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- HRR(Hot Rebuild & Refresh/Reload)

## Installation <a name="installation"></a>

## Procedures: <a name="procedures"></a>

1. Clone this repository.
2. Change `name` and `description` in package.json => **Auto synchronize with manifest**
3. Install pnpm globally: `npm install -g pnpm` (check your node version >= 16.6, recommended >= 18)
4. Run `pnpm install`

## And next, depending on the needs:

### For Chrome: <a name="chrome"></a>

1. Run:
    - Dev: `pnpm dev` or `npm run dev`
    - Prod: `pnpm build` or `npm run build`
2. Open in browser - `chrome://extensions`
3. Check - `Developer mode`
4. Find and Click - `Load unpacked extension`
5. Select - `dist` folder

### For Firefox: <a name="firefox"></a>

1. Run:
    - Dev: `pnpm dev:firefox` or `npm run dev:firefox`
    - Prod: `pnpm build:firefox` or `npm run build:firefox`
2. Open in browser - `about:debugging#/runtime/this-firefox`
3. Find and Click - `Load Temporary Add-on...`
4. Select - `manifest.json` from `dist` folder

### <i>Remember in firefox you add plugin in temporary mode, that's mean it's disappear after close browser, you must do it again, on next launch.</i>

## Documents <a name="documents"></a>

- [Vite Plugin](https://vitejs.dev/guide/api-plugin.html)
- [ChromeExtension](https://developer.chrome.com/docs/extensions/mv3/)
- [Rollup](https://rollupjs.org/guide/en/)
- [Rollup-plugin-chrome-extension](https://www.extend-chrome.dev/rollup-plugin)

