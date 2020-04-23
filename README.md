# React 1.基础知识点

## 目标

- 能够说出 React 是什么
- 能够说出 React 的特点
- 能够掌握 React 的基本使用
- 能够使用 React 脚手架

## 什么是 React （★★★）

React 是一个用于构建用户界面的 javaScript 库，起源于 facebook 的内部项目，后续在 13 年开源了出来

### 特点

- 声明式

你只需要描述 UI 看起来是什么样式，就跟写 HTML 一样，React 负责渲染 UI

- 基于组件

组件时 React 最重要的内容，组件表示页面中的部分内容

- 学习一次，随处使用

使用 React 可以开发 Web 应用，使用 React 可以开发移动端，可以开发 VR 应用

## React 基本使用

### React 的安装

npm i react react-dom

- react 包是核心，提供创建元素，组件等功能
- react-dom 包提供 DOM 相关功能

### React 的使用

- 引入 react 和 react-dom 的两个 js 文件

```html
<script src="./node_modules/react/umd/react.development.js"></script>
<script src="./node_modules/react-dom/umd/react-dom.development.js"></script>
```

- 创建 React 元素

```javascript
// 创建元素节点
// 1. 元素名称
// 2. 元素属性 传递的是个对象
// 3. 元素内容
let title = React.createElement("li", null, "hellow react");
```

- 渲染到页面

```javascript
// 渲染到页面
ReactDOM.render(title, root);
```

## React 脚手架（★★★）

### React 脚手架意义

- 脚手架是开发现代 Web 应用的必备
- 充分利用 Webpack，Babel，ESLint 等工具辅助项目开发
- 零配置，无需手动配置繁琐的工具即可使用
- 关注业务，而不是工具配置

### 使用 React 脚手架初始化项目

- 初始化项目，命令： npx create-react-app my-pro
  - npx 目的：提升包内提供的命令行工具的使用体验
  - 原来：先安装脚手架包，再使用这个包中提供的命令
  - 现在：无需安装脚手架包，就可以直接使用这个包提供的命令
  - create-react-app 这个是脚手架名称 不能随意更改
  - my-pro 自己定义的项目名称
- 启动项目，在项目根目录执行命令： npm start

yarn 命令简介

- yarn 是 Facebook 发布的包管理器，可以看做是 npm 的替代品，功能与 npm 相同
- yarn 具有快速，可靠和安全的特点
- 初始化新项目：yarn init
- 安装包： yarn add 包名称
- 安装项目依赖： yarn

### 脚手架中使用 React

- 导入 react 和 react-dom 两个包

```react
import React from 'react'
import ReactDOM from 'react-dom'
```

- 创建元素

```react
let h1 = React.createElement('h1',null,'我是标题')
```

- 渲染到页面

```react
ReactDOM.render(h1,document.getElementById('root'))
```

# JSX 的使用

## 目标

- 知道什么是 JSX
- 能够使用 JSX 创建 React 元素
- 能够在 JSX 中使用 JavaScript 表达式
- 能够使用 JSX 的条件渲染和列表渲染
- 能够给 JSX 添加样式

## 概述

#### JSX 产生的原因

由于通过 createElement()方法创建的 React 元素有一些问题，代码比较繁琐，结构不直观，无法一眼看出描述的结构，不优雅，用户体验不爽

#### JSX 的概述

JSX 是 JavaScript XML 的简写，表示在 JavaScript 代码中写 HTML 格式的代码

优势：声明式语法更加直观，与 HTML 结构相同，降低了学习成本，提升开发效率

## 简单入门使用（★★★）

#### 使用步骤

- 使用 JSX 语法创建 react 元素

```react
let h1 = <h1>我是通过JSX创建的元素</h1>
```

- 使用 ReactDOM 来渲染元素

```react
ReactDOM.render(h1,document.getElementById('root'))
```

#### 为什么在脚手架中可以使用 JSX 语法

- JSX 不是标准的 ECMAScript 语法，它是 ECMAScript 的语法拓展
- 需要使用 babel 编译处理后，才能在浏览器环境中使用
- create-react-app 脚手架中已经默认有该配置，无需手动配置
- 编译 JSX 语法的包： @bable/preset-react

#### 注意点

- React 元素的属性名使用驼峰命名法
- 特殊属性名：class -> className，for -> htmlFor，tabindex -> tabIndex
- 如果没有子节点的 React 元素可以用 `/>` 来结束
- 推荐：使用 小括号包裹 JSX，从而避免 JS 中自动插入分号报错

## JSX 语法（★★★）

JSX 是来描述页面的结构，我们一般在编写业务逻辑渲染页面的时候，需要涉及到传递值，调用函数，判断条件，循环等，这一些在 JSX 中都能得到支持

#### 嵌入 JS 表达式

语法：{JavaScritp 表达式}

例子：

```react
let content = '插入的内容'
let h1 = <h1>我是通过JSX创建的元素+ {content}</h1>
```

##### 注意点

- 只要是合法的 js 表达式都可以进行嵌入
- JSX 自身也是 js 表达式
- 注意：js 中的对象是一个例外，一般只会出现在 style 属性中
- 注意：在{}中不能出现语句

#### 条件渲染

根据不同的条件来渲染不同的 JSX 结构

```react
let isLoading = true
let loading = ()=>{
    if(isLoading){
        return <div>Loading...</div>
    }
    return <div>加载完成</div>
}
```

可以发现，写 JSX 的条件渲染与我们之前编写代码的逻辑是差不多的，根据不同的判断逻辑，返回不同的 JSX 结构，然后渲染到页面中

#### 列表渲染

- 如果需要渲染一组数据，我们应该使用数组的 map () 方法
- 注意：渲染列表的时候需要添加 key 属性，key 属性的值要保证唯一
- 原则：map()遍历谁，就给谁添加 key 属性
- 注意：尽量避免使用索引号作为 key

```react
let arr = [{
    id:1,
    name:'三国演义'
},{
    id:2,
    name:'水浒传'
},{
    id:3,
    name:'西游记'
},{
    id:4,
    name:'红楼梦'
}]
let ul = (<ul>
    {arr.map(item => <li key={item.id}>{item.name}</li>)}
</ul>)
ReactDOM.render(ul,document.getElementById('root'))
```

#### 样式处理

##### 行内样式 -style

在 style 里面我们通过对象的方式传递数据

```react
<li key={item.id} style={{'color': 'red',"backgroundColor": 'pink'}}>{item.name}</li>
```

这种方式比较的麻烦，不方便进行阅读，而且还会导致代码比较的繁琐

##### 类名 -className

创建 CSS 文件编写样式代码

```css
.container {
  text-align: center;
}
```

在 js 中进行引入，然后设置类名即可

```react
import './css/index.css'

<li className='container' key={item.id} style={{'color': 'red',"backgroundColor": 'pink'}}>{item.name}</li>
```

### 小结

- JSX 是 React 的核心内容
- JSX 表示在 JS 代码中写 HTML 结构，是 React 声明式的体现
- 使用 JSX 配合嵌入的 JS 表达式、条件渲染、列表渲染、可以描述任意 UI 结构
- 推荐使用 className 的方式给 JSX 添加样式
- React 完全利用 JS 语言自身的能力来编写 UI，而不是造轮子增强 HTML 功能

# React 组件

## 目标

- 能够使用函数创建组件
- 能够使用 class 创建组件
- 能够给 React 元素绑定事件
- 能够使用 state 和 setState()
- 能够处理事件中的 this 指向问题

## React 组件介绍

- 组件是 React 的一等公民，使用 React 就是在用组件
- 组件表示页面中的部分功能
- 组合多个组件实现完整的页面功能
- 特点：可复用、独立、可组合

![](images/组件.png)

## 组件的创建方式

### 函数创建组件

- 函数组件：使用 JS 的函数创建组件
- **约定 1：**函数名称必须以大写字母开头
- **约定 2：**函数组件必须有返回值，表示该组件的结构
- 如果返回值为 null，表示不渲染任何内容

#### 示例 demo

编写函数组件

```react
function Hello() {
    return (
        <div>这是第一个函数组件</div>
    )
}

```

const Hello () => <div>这是第一个函数组件</div>

利用 ReactDOM.render()进行渲染

```react
ReactDOM.render(<Hello />,document.getElementById('root'))
```

### 类组件（★★★）

- 使用 ES6 语法的 class 创建的组件
- 约定 1：类名称也必须要大写字母开头
- 约定 2：类组件应该继承 React.Component 父类，从而可以使用父类中提供的方法或者属性
- 约定 3：类组件必须提供 render 方法
- 约定 4：render 方法中必须要有 return 返回值

#### 示例 demo

创建 class 类，继承 React.Component，在里面提供 render 方法，在 return 里面返回内容

```react
class Hello extends React.Component{
    render(){
        return (
            <div>这是第一个类组件</div>
        )
    }
}
```

通过 ReactDOM 进行渲染

```react
ReactDOM.render(<Hello />,document.getElementById('root'))
```

### 抽离成单独的 JS 文件（★★★）

- 思考：项目中组件多了之后，该如何组织这些组件？
- 选择一：将所有的组件放在同一个 JS 文件中
- 选择二：将每个组件放到单独的 JS 文件中
- **组件作为一个独立的个体，一般都会放到一个单独的 JS 文件中**

#### 示例 demo

- 创建 Hello.js
- 在 Hello.js 中导入 React，创建组件，在 Hello.js 中导出

```react
import React from 'react'

export default class extends React.Component {
    render(){
        return (
            <div>单独抽离出来的 Hello</div>
        )
    }
}
```

- 在 index.js 中导入 Hello 组件，渲染到页面

```react
import Hello from './js/Hello'
ReactDOM.render(<Hello />,document.getElementById('root'))
```

## React 事件处理（★★★）

### 事件绑定

- React 事件绑定语法与 DOM 事件语法相似
- 语法：on+事件名称=事件处理函数，比如 onClick = function(){}
- 注意：React 事件采用驼峰命名法

#### 示例 demo

```react
export default class extends React.Component {
    clickHandle(e){
        console.log('点了')
    }
    render(){
        return (
            <div><button onClick = {this.clickHandle}>点我点我点我</button></div>
        )
    }
}
```

#### 小结

- 在 React 中绑定事件与原生很类似
- 需要注意点在于，在 React 绑定事件需要遵循驼峰命名法
- 类组件与函数组件绑定事件是差不多的，只是在类组件中绑定事件函数的时候需要用到 this，代表指向当前的类的引用，在函数中不需要调用 this

### 事件对象

- 可以通过事件处理函数的参数获取到事件对象
- React 中的事件对象叫做：合成事件
- 合成事件：兼容所有浏览器，无需担心跨浏览器兼容问题
- 除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 `stopPropagation()`和 `preventDefault()`
- 如果你想获取到原生事件对象，可以通过 `nativeEvent` 属性来进行获取

#### 示例 demo

```react
export default class extends React.Component {
    clickHandle(e){
        // 获取原生事件对象
        console.log(e.)
    }nativeEvent
    render(){
        return (
            <div><button onClick = {this.clickHandle}>点我点我点我</button></div>
        )
    }
}
```

### 支持的事件（有兴趣的课下去研究）

- Clipboard Events 剪切板事件

  - 事件名 ：onCopy onCut onPaste
  - 属性 ：DOMDataTransfer clipboardData

- compositionEvent 复合事件

  - 事件名： onCompositionEnd onCompositionStart onCompositionUpdate
  - 属性： string data

- Keyboard Events 键盘事件

  - 事件名：onKeyDown onKeyPress onKeyUp
  - 属性： 例如 number keyCode 太多就不一一列举

- Focus Events 焦点事件 （这些焦点事件在 React DOM 上的所有元素都有效，不只是表单元素）

  - 事件名： onFocus onBlur
  - 属性： DOMEventTarget relatedTarget

- Form Events 表单事件

  - 事件名： onChange onInput onInvalid onSubmit

- Mouse Events 鼠标事件

  - 事件名：

    ```react
    onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
    onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
    onMouseMove onMouseOut onMouseOver onMouseUp
    ```

- Pointer Events 指针事件

  - 事件名：

    ```react
    onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
    onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
    ```

- Selection Events 选择事件

  - 事件名：onSelect

- Touch Events 触摸事件

  - 事件名：onTouchCancel onTouchEnd onTouchMove onTouchStart

- UI Events UI 事件

  - 事件名： onScroll

- Wheel Events 滚轮事件

  - 事件名：onWheel

  - 属性：

    ```react
    number deltaMode
    number deltaX
    number deltaY
    number deltaZ
    ```

- Media Events 媒体事件

  - 事件名：

    ```react
    onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
    onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
    onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
    onTimeUpdate onVolumeChange onWaiting
    ```

- Image Events 图像事件

  - 事件名：onLoad onError

- Animation Events 动画事件

  - 事件名：onAnimationStart onAnimationEnd onAnimationIteration

- Transition Events 过渡事件

  - 事件名：onTransitionEnd

- Other Events 其他事件

  - 事件名： onToggle

## 有状态组件和无状态组件

- 函数组件又叫做 无状态组件，类组件又叫做 有状态组件
- 状态(state) 即数据
- 函数组件没有自己的状态，只负责数据展示
- 类组件有自己的状态，负责更新 UI，让页面动起来

![](images/状态.png)

## State 和 SetState（★★★）

### state 基本使用

- 状态(state)即数据，是组件内部的私有数据，只能在组件内部使用
- state 的值是对象，表示一个组件中可以有多个数据
- 通过 this.state 来获取状态

#### 示例 demo

```react
export default class extends React.Component {
    constructor(){
        super()

        // 第一种初始化方式
        this.state = {
            count : 0
        }
    }
    // 第二种初始化方式
    state = {
        count:1
    }
    render(){
        return (
            <div>计数器 :{this.state.count}</div>
        )
    }
}
```

### setState() 修改状态

- 状态是可变的
- 语法：this.setState({要修改的数据})
- **注意：不要直接修改 state 中的值，这是错误的**
- setState() 作用：1.修改 state 2.更新 UI
- 思想：数据驱动视图

![](images/修改状态.png)

#### 示例 demo

```react
export default class extends React.Component {
    // 第二种初始化方式
    state = {
        count:1
    }
    render(){
        return (
            <div>
                <div>计数器 :{this.state.count}</div>
                <button onClick={() => {
                     this.setState({
            	 		count: this.state.count+1
           			  })
                }}>+1</button>
            </div>
        )
    }
}
```

#### 小结

- 修改 state 里面的值我们需要通过 this.setState() 来进行修改
- React 底层会有监听，一旦我们调用了 setState 导致了数据的变化，就会重新调用一次 render 方法，重新渲染当前组件

### 抽取事件处理函数

- 当我们把上面代码的事件处理程序抽取出来后，会报错，找不到 this

![](images/this找不到.png)

#### 原因

- 在 JSX 中我们写的事件处理函数可以找到 this，原因在于在 JSX 中我们利用箭头函数，箭头函数是不会绑定 this，所以会向外一层去寻找，外层是 render 方法，在 render 方法里面的 this 刚好指向的是当前实例对象

## 事件绑定 this 指向

### 箭头函数

- 利用箭头函数自身不绑定 this 的特点

![](images/箭头函数.png)

### 利用 bind 方法（★★★）

利用原型 bind 方法是可以更改函数里面 this 的指向的，所以我们可以在构造中调用 bind 方法，然后把返回的值赋值给我们的函数即可

```react
class App extends React.Component {
  constructor() {
    super()
	...
    // 通过bind方法改变了当前函数中this的指向
    this.onIncrement = this.onIncrement.bind(this)
  }
  // 事件处理程序
  onIncrement() {
    ...
  }

  render() {
    ...
  }
}
```

### class 的实例方法（★★★）

- 利用箭头函数形式的 class 实例方法
- 注意：该语法是实验性语法，但是，由于 babel 的存在可以使用

```react
  // 事件处理程序
  onIncrement = () => {
    console.log('事件处理程序中的this：', this)
    this.setState({
      count: this.state.count + 1
    })
  }
```

### 小结

- 推荐：使用 class 的实例方法，也是依赖箭头函数不绑定 this 的原因
- # React 组件

## 目标

- 能够知道受控组件是什么
- 能够写出受控组件
- 了解非受控组件

## 表单处理

### 受控组件（★★★）

- HTML 中的表单元素是可输入的，也就是有自己的可变状态
- 而 React 中可变状态通常保存在 state 中，并且只能通过`setState()` 方法来修改
- React 讲 state 与表单元素值 value 绑定在一起，有 state 的值来控制表单元素的值
- 受控组件：值受到 react 控制的表单元素

![](images/受控组件.png)

#### 使用步骤

- 在 state 中添加一个状态，作为表单元素的 value 值
- 给表单元素绑定 change 事件，将表单元素的值设置为 state 的值

#### 示例 demo

```react
class App extends React.Component {
    constructor(){
        super()
        this.inputChange = this.inputChange.bind(this)
    }
    state = {
        txt : ''
    }
    inputChange(e){
       this.setState({
           txt: e.target.value
       })
    }
    render(){
        console.log(this.state);

        return (
            <div>
                {/* 把state的值设置给输入框的value，绑定change事件，这样用户在输入内容的时候调用相应函数，在函数里面把当前设置的值赋值给state，从而达到数据的统一 */}
                <input type="text" value={this.state.txt} onChange={this.inputChange}/>
            </div>
        )
    }
}
ReactDOM.render(<App />,document.getElementById('root'))
```

#### 多表单元素优化

- 问题：每个表单元素都有一个单独的事件处理函数，这样太繁琐
- 优化：使用一个事件处理程序同时处理多个表单元素

##### 步骤

- 给表单元素添加 name 属性（用来区分是哪一个表单），名称与 state 相同（用来更新数据的）
- 根据表单内容来获取对应值
- 在 change 事件处理程序中通过 [name] 来修改对应的 state

##### 示例 demo

```react
inputChange(e){
   let target = e.target;
   let value = target.type == 'checkbox' ? target.checked : target.value;
   this.setState({
       [e.target.name]: value
   })
}
<input type="text" value={this.state.txt} name="txt" onChange={this.inputChange}/>
<input type="checkbox" value={this.state.isChecked} name="isChecked" onChange={this.inputChange}/>
```

### 非受控组件 （了解）

- 说明：借助于 ref，使用元素 DOM 方式获取表单元素值
- ref 的作用：获取 DOM 或者组件

#### 使用步骤

- 调用 `React.createRef()` 方法创建 ref 对象
- 将创建好的 ref 对象添加到文本框中
- 通过 ref 对象获取到文本框的值

```react
class App extends React.Component {
    constructor(){
        super()

        //创建 ref
        this.txtRef = React.createRef()
    }
    // 获取文本框的值
    getTxt =() => {
        console.log(this.txtRef.current.value)
    }
    render(){
        return (
          <div>
            <input type ="text" ref={this.txtRef} />
            <button onClick ={this.getTxt}>获取值</button>
          </div>
        )
    }
}
```

# React 组件综合案例（★★★）

## 需求分析

- 渲染评论列表（列表渲染）
- 没有评论数据时渲染：暂无评论（条件渲染）
- 获取评论信息，包括评论人和评论内容（受控组件）
- 发表评论，更新评论列表（`setState()`）

![](images/综合案例.png)

## 搭建评论列表的模板

- 结构

```react
import React from 'react'
import ReactDOM from 'react-dom'

/*
  评论列表案例

  comments: [
    { id: 1, name: 'jack', content: '沙发！！！' },
    { id: 2, name: 'rose', content: '板凳~' },
    { id: 3, name: 'tom', content: '楼主好人' }
  ]
*/

import './index.css'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div>
          <input className="user" type="text" placeholder="请输入评论人" />
          <br />
          <textarea
            className="content"
            cols="30"
            rows="10"
            placeholder="请输入评论内容"
          />
          <br />
          <button>发表评论</button>
        </div>

        <div className="no-comment">暂无评论，快去评论吧~</div>
        <ul>
          <li>
            <h3>评论人：jack</h3>
            <p>评论内容：沙发！！！</p>
          </li>
        </ul>
      </div>
    )
  }
}

// 渲染组件
ReactDOM.render(<App />, document.getElementById('root'))
```

- 样式

```css
.app {
  width: 300px;
  padding: 10px;
  border: 1px solid #999;
}

.user {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.content {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.no-comment {
  text-align: center;
  margin-top: 30px;
}
```

## 渲染评论列表

- 在 state 中初始化评论列表数据

```react
  state = {
    comments: [
      { id: 1, name: 'jack', content: '沙发！！！' },
      { id: 2, name: 'rose', content: '板凳~' },
      { id: 3, name: 'tom', content: '楼主好人' }
    ]
  }
```

- 使用数组的 map 方法遍历 state 中的列表数据
- 给每一个被遍历的 li 元素添加 key 属性
- 在 render 方法里的 ul 节点下嵌入表达式

```react
{
  this.state.comments.map(item => {
    return (
       <li key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.content}</p>
       </li>
    )
  })
}
```

## 渲染暂无评论

- 判断列表数据的长度是否为 0
- 如果为 0，则渲染暂无评论
- 如果不为 0，那么渲染列表数据

- 在 jsx 中大量写逻辑会导致很臃肿，所以我们可以把条件渲染的逻辑抽取成一个函数

```react
/**
 * 条件渲染，这里抽取出来了，这样在结构中不会很混乱
 */
renderList(){
  if (this.state.comments.length === 0) {
    return (<div className="no-comment">暂无评论，快去评论吧~</div>)
  } else {
    return (
      <ul> {
        this.state.comments.map(item => {
          return (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.content}</p>
            </li>
          )
        })
      }
      </ul>
    )
  }
}
```

- 在 render 的 return 方法里面调用这个函数即可

```react
render() {
  return (
    <div>
      ...
      {/* 通过条件渲染来判断是否显示暂无评论 */}
      {this.renderList()}
    </div>
  )
}
```

## 获取评论信息

- 通过受控组件来获取内容
- 初始化用户名和用户内容的 state

```react
userName: '',
userContent: ''
```

- 在结构中，把表单元素的 value 与 state 进行绑定，还需要绑定 name 属性和 onChange 属性

```react
<input className="user" type="text" placeholder="请输入评论人" value={this.state.userName} name="userName" onChange={this.handleForm}/>
<br />
<textarea
  className="content"
  cols="30"
  rows="10"
  placeholder="请输入评论内容"
  value={this.state.userContent}
  name="userContent"
  onChange={this.handleForm}
/>
```

- 在`handleFrom`函数中利用`setState`来让数据保持一致

```react
  handleForm = (e) => {
     this.setState({
       [e.target.name] : e.target.value
     })
  }
```

## 发表评论

- 给按钮绑定事件
- 在事件处理程序中，通过 state 获取评论信息
- 将评论信息添加到 state 中，利用 setState 来更新页面
- 添加评论前需要判断用户是否输入内容
- 添加评论后，需要情况文本框用户输入的值

```react
handleClick = (e) => {
  // 拿到用户输入的内容
  let {userName,userContent} = this.state
  if(userName.trim()==='' || userContent.trim() === ''){
      alert('请输入内容')
      return
  }
  // 利用数组拓展运算符来进行数据的拼接，把用户输入的存放在数组的第一个位置
  let newComments = [{
    id: this.state.comments.length+1,
    name: userName,
    content: userContent
  },...this.state.comments]
  this.setState({
    comments: newComments,
    userName:'',
    userContent: ''
  })
}
```

# React 2.组件进阶

## 目标

- 能够使用 props 接收数据
- 能够实现父子组件之间的通讯
- 能够实现兄弟组件之间的通讯
- 能够给组件添加 props 校验

## 组件通讯介绍

组件是独立且封闭的单元，默认情况下，只能使用组件自己的数据。在组件化过程中，我们将一个完整的功能拆分成多个组件，以更好的完成整个应用的功能。而在这个过程中，多个组件之间不可避免的要共享某些数据。为了实现这些功能，就需要打破组件的独立封闭性，让其与外界沟通，这个过程就是组件通讯

## 组件的 props（★★★）

### 基本使用

- 组件时封闭的，要接受外部数据应该通过 props 来实现
- props 的作用：接收传递给组件的数据
- 传递数据：给组件标签添加属性

![](images/props-设置.png)

- 接收数据：函数组件通过 参数 props 接收数据，类组件通过 this.props 接收数据

  - 函数组件获取

    ![](images/函数组件获取.png)

  - 类组件获取

    ![](images/类组件获取.png)

​

### 特点

- 可以给组件传递任意类型的数据
- props 是只读属性，不能对值进行修改
- 注意：使用类组件时，如果写了构造函数，应该将 props 传递给 super(),否则，无法在构造函数中获取到 props，其他的地方是可以拿到的

![](images/类组件注意点.png)

## 组件通讯的三种方式（★★★）

### 父组件传递数据给子组件

- 父组件提供要传递的 state 数据
- 给子组件标签添加属性，值为 state 中的数据
- 子组件中通过 props 接收父组件中传递的数据

![](images/父传子.png)

### 子组件传递数据给父组件

- 利用回调函数，父组件提供回调，子组件调用，将要传递的数据作为回调函数的参数
- 父组件提供一个回调函数，用来接收数据
- 将该函数作为属性的值，传递给子组件

![](images/子传父-父亲设置回调.png)

- 子组件通过 props 调用回调函数

![](images/子传父-调用回调.png)

### 兄弟组件传递

- 将共享状态(数据)提升到最近的公共父组件中，由公共父组件管理这个状态
- 这个称为状态提升
- 公共父组件职责：1. 提供共享状态 2.提供操作共享状态的方法
- 要通讯的子组件只需要通过 props 接收状态或操作状态的方法

![](images/兄弟传递.png)

#### 示例 demo

- 定义布局结构，一个 Counter 里面包含两个子组件，一个是计数器的提示，一个是按钮

```react
class Counter extends React.Component {
    render() {
        return (<div>
            <Child1 />
            <Child2 />
        </div>
        )
    }
}
class Child1 extends React.Component {
    render() {
        return (
            <h1>计数器：</h1>
        )
    }
}
class Child2 extends React.Component {
    render() {
        return (
            <button>+1</button>
        )
    }
}
```

- 在父组件里定义共享状态，把这个状态传递给第一个子组件

```react
class Counter extends React.Component {
    // 提供共享的状态
    state = {
        count: 0
    }
    render() {
        return (<div>
            {/* 把状态提供给第一个子组件 */}
            <Child1 count={this.state.count}/>
            <Child2 />
        </div>
        )
    }
}
```

- 在第一个子组件里面就能通过 props 获取到

```react
class Child1 extends React.Component {
    render() {
        return (
            <h1>计数器：{this.props.count}</h1>
        )
    }
}
```

- 在父组件中提供共享方法，通过属性传递给第二个子组件，方便第二个子组件来进行调用

```react
    // 提供共享方法
    onIncrement = (res) => {
        // 只要第二个子组件调用了这个函数，就会执行里面代码
        this.setState({
            count: this.state.count + res
        })
    }
    render() {
        return (<div>
            ...
            {/* 把共享方法提供给第二个子组件 */}
            <Child2 onIncrement={this.onIncrement} />
        </div>
        )
    }
```

- 在第二个子组件里面通过 props 来获取到对应函数，然后进行调用

```react
class Child2 extends React.Component {
    handleClick = () => {
        // 这里一旦调用，就会执行父组件里面 onIncrement函数
        this.props.onIncrement(2)
    }
    render() {
        return (
            <button onClick={this.handleClick}>+</button>
        )
    }
}
```

## Context（★★★）

如果出现层级比较多的情况下（例如：爷爷传递数据给孙子），我们会使用 Context 来进行传递

作用： 跨组件传递数据

### 使用步骤

- 调用 `React.createContext()` 创建 Provider(提供数据) 和 Consumer(消费数据) 两个组件

![](images/创建Context.png)

- 使用 Provider 组件作为父节点

![](images/provider.png)

- 设置 value 属性，表示要传递的数据

![](images/设置value属性.png)

- 哪一层想要接收数据，就用 Consumer 进行包裹，在里面回调函数中的参数就是传递过来的值

![](images/Comsumer.png)

### 小结

- 如果两个组件相隔层级比较多，可以使用 Context 实现组件通讯
- Context 提供了两个组件：Provider 和 Consumer
- Provider 组件： 用来提供数据
- Consumer 组件： 用来消费数据

## props 进阶

### children 属性

- children 属性： 表示组件标签的子节点，当组件标签有子节点时，props 就会有该属性
- children 属性与普通的 props 一样，值可以使任意值（文本、react 元素、组件、甚至是函数）

![](images/props-children.png)

### props 校验（★★★）

- 对于组件来说，props 是外来的，无法保证组件使用者传入什么格式的数据，简单来说就是组件调用者可能不知道组件封装着需要什么样的数据
- 如果传入的数据不对，可能会导致报错
- 关键问题：组件的使用者不知道需要传递什么样的数据
- props 校验：允许在创建组件的时候，指定 props 的类型、格式等

![](images/props-校验.png)

- 作用：捕获使用组件时因为 props 导致的错误，给出明确的错误提示，增加组件的健壮性

![](images/props-错误提示.png)

#### 使用步骤

- 安装包 `prop-types (yarn add prop-types | npm i props-types)`
- 导入 prop-types 包
- 使用`组件名.propTypes={}` 来给组件的 props 添加校验规则
- 校验规则通过 PropTypes 对象来指定

![](images/propsTypes.png)

#### 常见的约束规则

- 创建的类型： `array、bool、func、number、object、string`
- React 元素类型：`element`
- 必填项：`isRequired`
- 特定结构的对象： `shape({})`
- 更多的[约束规则](https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html#proptypes)

![](images/props-约束规则.png)

### props 的默认值

- 场景：分页组件 -> 每页显示条数

![](images/props默认值.png)

# React.3 组件生命周期（★★★）

## 目标

- 说出组件生命周期对应的钩子函数
- 钩子函数调用的时机

## 概述

意义：组件的生命周期有助于理解组件的运行方式，完成更复杂的组件功能、分析组件错误原因等

组件的生命周期： 组件从被创建到挂载到页面中运行，再到组件不在时卸载的过程

生命周期的每个阶段总是伴随着一些方法调用，这些方法就是生命周期的钩子函数

构造函数的作用：为开发人员在不同阶段操作组件提供了实际

## 生命周期阶段

![](images/生命周期.png)

### 创建时（挂载阶段）

- 执行时机：组件创建时（页面加载时）
- 执行顺序

![](images/创建时-函数执行顺序.png)

![](images/创建时-函数的作用.png)

### 更新时

执行时机：`setState()、 forceUpdate()、 组件接收到新的props`

说明：以上三者任意一种变化，组件就会重新渲染

执行顺序：

![](images/更新时.png)

![](images/更新时-函数作用.png)

### 卸载时

执行时机：组件从页面中消失

作用：用来做清理操作

![](images/卸载时.png)

### 不常用的钩子函数

#### 旧版的生命周期钩子函数

![](images/旧版生命周期函数.png)

#### 新版完整生命会走棋钩子函数

![](images/新版生命周期函数.png)

##### `getDerivedStateFromProps()`

- **`getDerivedStateFromProps`** 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容
- 不管原因是什么，都会在*每次*渲染前触发此方法

##### `shouldComponentUpdate()`

- 根据 **`shouldComponentUpdate()`** 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染
- 当 props 或 state 发生变化时，**`shouldComponentUpdate()`** 会在渲染执行之前被调用。返回值默认为 true

##### `getSnapshotBeforeUpdate()`

- **`getSnapshotBeforeUpdate()`** 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 **`componentDidUpdate()`**
- 此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等

# render-props 模式 （★★★）

## 目标

- 知道 render-props 模式有什么作用
- 能够说出 render-props 的使用步骤

## React 组件复用概述

- 思考：如果两个组件中的部分功能相似或相同，该如何处理？
- 处理方式：复用相似的功能
- 复用什么？
  - state
  - 操作 state 的方法
- 两种方式：
  - render props 模式
  - 高阶组件（HOC）
- 注意： 这两种方式不是新的 API，而是利用 React 自身特点的编码技巧，演化而成的固定模式

## 思路分析

- 思路：将要复用的 state 和操作 state 的方法封装到一个组件中

- 如何拿到该组件中复用的 state

  - 在使用组件时，添加一个值为函数的 prop，通过函数参数来获取

    ![](images/render-props-01.png)

- 如何渲染到任意的 UI

  - 使用该函数的返回值作为要渲染的 UI 内容

    ![](images/render-props-02.png)

## 使用步骤

- 创建 Mouse 组件，在组件中提供复用的逻辑代码
- 将要复用的状态作为 props.render(state)方法的参数，暴露到组件外部
- 使用 props.render() 的返回值作为要渲染的内容

![](images/render-props模式-01.png)

#### 示例 demo

```react
class Mouse extends React.Component {
    // 鼠标位置状态
    state = {
        x: 0,
        y: 0
    }

    // 监听鼠标移动事件
    componentDidMount(){
        window.addEventListener('mousemove',this.handleMouseMove)
    }
    handleMouseMove = e => {
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }
    render(){
        // 向外界提供当前子组件里面的数据
        return this.props.render(this.state)
    }
}
class App extends React.Component {
    render() {
        return (
            <div>
                App
                <Mouse render={mouse => {
                    return <p>X{mouse.x}Y{mouse.y}</p>
                }}/>
            </div>
        )
    }
}
ReactDOM.render(<App />,document.getElementById('root'))
```

## children 代替 render 属性

- 注意：并不是该模式叫 render props 就必须使用名为 render 的 prop，实际上可以使用任意名称的 prop
- 把 prop 是一个函数并且告诉组件要渲染什么内容的技术叫做： render props 模式
- 推荐：使用 childre 代替 render 属性

![](images/render-props-children模式.png)

## 优化代码

- 推荐给 render props 模式添加 props 校验

![](images/优化-添加校验.png)

-

![](images/优化-移除事件绑定.png)

# 高阶组件 （★★★）

## 目标

- 知道高阶组件的作用
- 能够说出高阶的使用步骤

## 概述

- 目的：实现状态逻辑复用
- 采用 包装模式
- 手机：获取保护功能
- 手机壳：提供保护功能
- 高阶组件就相当于手机壳，通过包装组件，增强组件功能

![](images/手机壳.png)

## 思路分析

- 高阶组件(HOC、Higher-Order Component) 是一个函数，接收要包装的组件，返回增强后的组件

![](images/高阶组件-函数.png)

- 高阶组件内部创建了一个类组件，在这个类组件中提供复用的状态逻辑代码，通过 prop 将复用的状态传递给被包装组件`WrappedComponent`

![](images/高阶组件-类组件内部实现.png)

## 使用步骤

- 创建一个函数，名称约定以 with 开头
- 指定函数参数，参数应该以大写字母开头
- 在函数内部创建一个类组件，提供复用的状态逻辑代码，并返回
- 在该组件中，渲染参数组件，同时将状态通过 prop 传递给参数组件
- 调用该高阶组件，传入要增强的组件，通过返回值拿到增强后的组件，并将其渲染到页面

**包装函数**

```react
// 定义一个函数，在函数内部创建一个相应类组件
function withMouse(WrappedComponent) {
    // 该组件提供复用状态逻辑
    class Mouse extends React.Component {
        state = {
            x: 0,
            y: 0
        }
        // 事件的处理函数
        handleMouseMove = (e) => {
            this.setState({
                x: e.clientX,
                y: e.clientY
            })
        }
        // 当组件挂载的时候进行事件绑定
        componentDidMount() {
            window.addEventListener('mousemove', this.handleMouseMove)
        }
        // 当组件移除时候解绑事件
        componentWillUnmount() {
            window.removeEventListener('mousemove', this.handleMouseMove)
        }
        render() {
            // 在render函数里面返回传递过来的组件，把当前组件的状态设置进去
            return <WrappedComponent {...this.state} />
        }
    }
    return Mouse
}
```

**哪个组件需要加强，通过调用`withMouse`这个函数，然后把返回的值设置到父组件中即可**

```react
function Position(props) {
    return (
        <p>
            X:{props.x}
            Y:{props.y}
        </p>
    )
}
// 把position 组件来进行包装
let MousePosition = withMouse(Position)

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                高阶组件
                <MousePosition></MousePosition>
            </div>
        )
    }
}
```

## 设置`displayName`

- 使用高阶组件存在的问题：得到两个组件的名称相同
- 原因：默认情况下，React 使用组件名称作为`displayName`
- 解决方式：为高阶组件设置`displayName`，便于调试时区分不同的组件
- `displayName的作用：用于设置调试信息(React Developer Tools信息)`
- 设置方式：

![](images/高阶组件-displayName.png)

## 传递 props

- 问题：如果没有传递 props，会导致 props 丢失问题
- 解决方式： 渲染`WrappedComponent`时，将 state 和 props 一起传递给组件

![](images/传递props.png)

## 小结

- 组件通讯是构建 React 应用必不可少的一环
- props 的灵活性让组件更加强大
- 状态提升是 React 组件的常用模式
- 组件生命周期有助于理解组件的运行过程
- 钩子函数让开发者可以在特定的时机执行某些功能
- `render props` 模式和高阶组件都可以实现组件状态逻辑的复用
- 组件极简模型： `(state,props) => UI`

# React 原理

## 目标

- 能够知道`setState()`更新数据是异步的
- 能够知道 JSX 语法的转化过程

## `setState()`说明 （★★★）

### 更新数据

- `setState()`更新数据是异步的
- 注意：使用该语法，后面的`setState`不要依赖前面`setState`的值
- 多次调用`setState`，只会触发一次 render

### 推荐语法

- 推荐：使用 `setState((state,props) => {})` 语法
- 参数 state： 表示最新的 state
- 参数 props： 表示最新的 props

![](images/推荐语法.png)

### 第二个参数

- 场景：在状态更新(页面完成重新渲染)后立即执行某个操作
- 语法：`setState(update[,callback])`

![](images/第二个参数.png)

## JSX 语法的转化过程 （★★★）

- JSX 仅仅是`createElement()` 方法的语法糖(简化语法)
- JSX 语法被 @babel/preset-react 插件编译为`createElement()` 方法
- React 元素： 是一个对象，用来描述你希望在屏幕上看到的内容

![](images/语法糖.png)
