/*
 * File: renderer.js                                                           *
 * Project: vdom                                                               *
 * Created Date: 2022-04-09 11:19:30                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-04-09 11:19:30                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * ----------	---	---------------------------------------------------------  *
 */

import {
    createElement,
    patchProp,
    insert,
    createText
} from './dom'

export function createMount () {

    return mountElement
    function mountElement(vnode, container) {
        vnode.el = createElement(vnode.tag)
        const el = vnode.el
        
        // 处理props
        vnode.props && Object.keys(vnode.props).forEach(keyName => {
            const val = vnode.props[keyName]
            patchProp(vnode.el, keyName, null, val)
        })

        // 处理children
        Array.isArray(vnode.children) ? vnode.children.forEach(v => mountElement(v, el)) : insert(createText(vnode.children), el)

        // 插入到视图中
        insert(el, container)

        // 返回vnode
        return vnode
    }

}

