/*
 * File: h.js                                                                  *
 * Project: vdom                                                               *
 * Created Date: 2022-04-09 11:17:44                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-04-09 11:17:44                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * ----------	---	---------------------------------------------------------  *
 */

import { log } from './_log'

export function h(tag, props, children = []){
    log('返回vdom',['h'])
    return {
        tag, props, children
    }
}
