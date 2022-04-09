/*
 * File: main.js                                                               *
 * Project: vdom                                                               *
 * Created Date: 2022-04-09 09:12:27                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-04-09 13:28:29                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * ----------	---	---------------------------------------------------------    *
 */
import './style.css'
import { createMount } from './src/renderer'
import { createDiff } from './src/diff'
import { h } from './src/h'
import * as $dom from './src/dom'


const vApp = document.getElementById('vdom')
const app = document.getElementById('dom')

const render = createRender(vApp)
const normalRender = createNormalRender(app)

// 定时更新：vdom渲染
const vdomInterval = createMyInterval()
vdomInterval(render)

// 定时更新：dom渲染
const domInterval = createMyInterval()
domInterval(normalRender)

function createMyInterval(intervel = 1000) {
  let index = 1
  const len = 8
  const data = Array(len).fill(0)
  
  return function (customRender) {
    setInterval(() => {
      // index = ~~ (Math.random() * len)

      data[index % len] = index ++
      customRender(data)
    }, intervel)
  }
}


function createRender (container) {
  const mountElement = createMount()
  const diff = createDiff(mountElement)

  let vnode;

  return function (data) {
    const newVNode = h('ul', {}, data.map(v => h('li', {}, String(v))))

    if(vnode) { 
      diff(vnode, newVNode) 
      return
    }

    mountElement(newVNode, container)
    vnode = newVNode
  }
}

function createNormalRender (container) {

  let el;
  return function (data) {
    $dom.setText(container, '')
    el = $dom.createElement('ul')
    data.map(v => {
      const node = $dom.createElement('li')
      $dom.insert($dom.createText(String(v)), node)
      $dom.insert(node, el)
    })

    $dom.insert(el, container)
  }
}


