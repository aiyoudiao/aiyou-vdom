/*
 * File: diff.js                                                               *
 * Project: vdom                                                               *
 * Created Date: 2022-04-09 12:26:48                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-04-09 12:26:48                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * ----------	---	---------------------------------------------------------  *
 */

import {
    patchProp,
    setText,
    createElement,
    replaceElement,
    remove
} from './dom'

export function createDiff(mountElement) {
    
    return diff
    function diff (oldNode, newNode) {
        const { props: oldProps, el: oldEl, tag: oldTag, children: oldChildren = [] } = oldNode
        const { props: newProps, tag: newTag, children: newChildren = [] } = newNode

        // 标签不同 便可替换
        if (oldTag !== newTag) {
            replaceElement(oldEl, createElement(newTag))
            return
        }

        const el = newNode.el = oldEl

        if (newProps) {
            // 新旧不同 便可替换
            Object.keys(newProps).forEach(keyName => {
                newProps[keyName] !== oldProps[keyName] && patchProp(el, keyName, oldProps[keyName], newProps[keyName])
            })

            // 旧有新无 便可移除
            Object.keys(oldProps).forEach(keyName => {
                (!newProps[keyName]) && patchProp(el, keyName, oldProps[keyName], null)
            })
        }
        if (typeof newChildren === 'string') {
            // 都是字符串，但值不同，那么直接替换
            typeof oldChildren === 'string' && newChildren !== oldChildren && setText(el, newChildren)

            // 新children为字符串，旧children为数组，那么直接整个替换
            Array.isArray(oldChildren) && setText(oldEl, newChildren)

            return
        }

        // 非字符串 非数组，那就是错误的数据类型
        if (!Array.isArray(newChildren)) {
            throw 'children is not string or array.'
        }

        // 旧children为字符串，新children为数组，那就先清空dom内容，再生成新children的dom内容挂载到之前清空的这个dom中
        typeof oldChildren === 'string' && (setText(el, ''), newChildren.forEach(vnode => { mountElement(vnode, el) }))

        if (Array.isArray(oldChildren)) {
            const [oldLen, newLen] = [newChildren.length, oldChildren.length]
            const minLen = Math.min(oldLen, newLen)

            // 最小长度的对比，从左到右，按照顺序对比vnode
            for (let i = 0; i < minLen; i++) {
                const [oldVnode, newVnode] = [oldChildren[i], newChildren[i]]
                diff(oldVnode, newVnode)
            }

            // 移除多的节点
            oldLen > minLen && oldChildren.filter((_, i) => i >= minLen).forEach(vnode => remove(vnode.el, el))

            // 添加少的节点
            newLen > minLen && oldChildren.filter((_, i) => i >= minLen).forEach(vnode => mountElement(vnode, el))

        }


    }
}

