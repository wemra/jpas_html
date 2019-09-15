import '@babel/polyfill'
import 'bootstrap'
import * as $ from 'jquery'
import {env} from '../config'
import moment from 'moment'
import '../css/index.scss'

$(document).ready(()=>{
    window.app = new Application()
})

class Application {
    constructor(){
        start()
    }

    start() {

    }
}
