/*
 * File: dom.js                                                                *
 * Project: vdom                                                               *
 * Created Date: 2022-04-09 10:42:53                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-04-09 10:42:53                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * ----------	---	---------------------------------------------------------  *
 */

import { log } from './_log.js'

/* 新增相关 */

export function createElement(typeName) {
    log('创建元素',['createElement'])
    return document.createElement(typeName)
}

export function insert (el, parent) {
    log('插入元素',['insert'])
    parent.append(el)
}

export function createText(text) {
    log('创建文本',['createText'])
    return new Text(text)
}

/* 删除相关 */

export function remove (el, parent) {
    log('移除元素',['insert'])
    parent.remove(el)
}

/* 修改相关 */

export function replaceElement (oldEle, newEle) {
    log('替换元素',['repalceElement'])
    oldEle.repaceWith(newEle)
}

export function setText (el, text) {
    log('设置文本', ['setText'])
    el.textContent = text // 支持空格换行，innerText会把空白符都清除
    // el.innerText = text
}

export function setInnerHTML (el, text) {
    log('设置InnerHTML', ['setInnerHTML'])
    el.innerHTML = text
}

/* 事件的名称纠正和绑定，然后属性的替换、设置和移除 相关*/
export function patchProp (el, key, prevVal, nextVal) {
    log('patchProp')

    if (key.starsWith('on')) {
        // el.addEventListener(key.slice(2).toLowerCase(), nextVal)
        el.addEventListener(key.slice(2).toLocaleLowerCase(), nextVal) // 支持不同的语言环境时，采用本地地区的转换方法
        log('事件名称纠正和绑定')
        return
    }

    log('属性替换、设置或者移除')
    nextVal === null ? el.removeAttribute(key) : el.setAttribute(key, nextVal)
}
