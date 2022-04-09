/*
 * File: _log.js                                                               *
 * Project: vdom                                                               *
 * Created Date: 2022-04-09 10:43:38                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-04-09 10:43:38                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * ----------	---	---------------------------------------------------------  *
 */



export function log(message, other) {
    if(!other) {
        console.log('message')
        return
    }

    const [methodName, time = (new Date).toLocaleString()] = other
    console.log(`方法名：${methodName}，执行时间：${time}，打印结果：${message}`)

}