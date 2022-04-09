# aiyou-vdom

自己实现一个虚拟DOM噢，并输出一篇文章，点击 [掘金](https://juejin.cn/post/7084503737213354014)。

在浏览器直接看代码，点击 [github1s](https://github1s.com/aiyoudiao/aiyou-vdom)。

## 使用

``` bash
# 安装yarn全局依赖
npm i -g yarn

# 切换到这个工程目录
cd vdom

# 安装依赖
yarn install

# 运行，看效果
yarn dev
```

如果不行，可以在issue中说一下，我给你解决一下。

## 效果

![](https://gitee.com/aiyoudiao/images/raw/master/2022/04/09/1649488620440-dcb89390-dedf-4616-99f5-348ae2a451d7.png)

![](https://gitee.com/aiyoudiao/images/raw/master/2022/04/09/1649488592532-2651f4a4-6a4d-458e-b735-8fb9eb7c7785.png)

## 设计思路

四个操作：正常的虚拟dom操作，diff算法，h函数返回虚拟dom，还有renderer渲染器将dom插入进视图。

### dom操作

用过jquery就知道，dom操作也无非就是增删改查。

```ts
// 新增
createElement(typeName: string): HTMLDomElement;
insert(el:HTMLDomElement, parent:HTMLDomElement): void;
createText(text: string): Text;

// 删除
remove(el:HTMLDomElement, parent:HTMLDomElement): void;

// 修改
replaceElement(oldEle:HTMLDomElement, newEle:HTMLDomElement): void;
setText(el:HTMLDomElement, text: string): void;
setInnerHTML(el:HTMLDomElement, text: string): void;

// 事件的名称纠正和绑定，然后属性的替换、设置和移除
patchProp(el: HTMLDomElement, key: string, prevVal: any, nextVal: any): void;
```

### diff 算法

这里只做大概的diff设计，简单理解的diff，diff开发中比较常见的，比如git diff、code diff。

先对比tag，不一样就直接替换。

tag一样就检测props。props存在的话，props中新节点不是老节点，直接替换。props中老节点有但是新节点没有，那么全删掉。  
然后检测children，children有两种，一种是字符串，一种是数组。  
新的children是字符串，而之前的children也是字符串，那就对比字符串，看看是否要替换。  
新的children是字符串，之前的children是数组，那就整个替换。  
新的children是数组，而之前的children是字符串，那就把之前的节点清空，再遍历挂载新children中的的元素。
新的children是数组，而之前的children也是数组，这里就复杂一点了，需要递归。简单的话就是按照新旧节点中最少的节点数来进行循环递归，然后看看有没有必要移除掉旧节点中多余的节点，比如旧节点比新节点多。最后看看有没有必要添加新的节点，比如新的节点比旧节点多。

递归是一个深度优先遍历的过程，并不复杂，我有一篇文章有写[通过链表来思考递归](https://juejin.cn/post/7078986034976915463)，递归和回溯的设计是接触算法比较友好的思想的噢，不会很难。

### h函数

h用于返回一个虚拟dom，类似一个集装箱吧，把虚拟dom组装好，返回给你。这里只做简单的实现，理解思想就行。

```ts
// 这里偷了点懒，不过理解它的入参类型即可，不用纠结具体的参数中每一个类型具体的细节
h(tag: string, props: object, children: any[]): object;
```

### renderer 渲染器

这里实现一个mountElement就行了，将vnode渲染成真实的dom，处理props，处理children，插入到视图中，返回传入的vonde。

```ts
mountElement(vnode: object, container: string|HTMLDomElement): object;
```

