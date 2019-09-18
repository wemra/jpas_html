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
        this.start()
    }

    start() {
        $('.carousel').carousel();
        $('.nav__btn.sp').on('click', function(){
            $('body').addClass('nav--active');
        });
        $('.shadow').on('click', function(){
            $('body').removeClass('nav--active');
        });
    }
}
