/**
 * 轻量级的JS工具库，欲添加新的工具函数，请联系skywodpeng
 * @author skywodpeng<skywodpeng@tencent.com>
 * @since 2014-01-15   v1.0.1
 */

;(function(){


/**
 * 将SKY暴露给父模块控制，同时使用了单例模式
 */
var root = this;
var SKY = function(obj) {
    if (obj instanceof SKY) return obj;
    if (!(this instanceof SKY)) return new SKY(obj);
};
root.SKY = SKY;

/**
 * 如果应用中已经有SKY对象了，那么调用此方法，解决命名冲突的问题
 */
SKY.conflict = function(){
	return root.SKY;
}

/**
 * SKY工具库的版本号
 */
SKY.version = '1.01';


/************[工具函数部分]************/

/**
 * 校验字符串是否为纯数字
 * @param String str 要校验的字符串
 * @return Boolean true 是纯数字， false 不是纯数字
 */
SKY.isNumber = function(str){
	var ex = /^\d+$/
	return ex.test(str);
}

/**
 * 校验字符串是否为email格式
 * @param String str 要校验的字符串
 * @return Boolean true 格式ok false 格式错误
 */
SKY.isEmail =  function(str){
	var reg = /^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	return reg.test(str);
}

/**
 * log方法，解决console.log在IE报错的问题
 * @param String msg 要打印的Log
 */
SKY.log = function(msg){
	if (typeof(console) != 'undefined')  console.log(msg);
}


/**
 * 数字格式化，默认采用千分位分割的方式
 * @param Number  number 需要格式化的数字
 * @param char    decimails 保留的精度
 * @param char    dec_point 小数点，默认为"."
 * @param char    thousands_sep 千分位的分隔字符，默认为","
 * @return String 格式化好的字符串
 * @example  SKY.numFormat(1002.12) => 1,002.12
 */
SKY.numFormat = function(number, decimals, dec_point, thousands_sep) {  
    var n = !isFinite(+number) ? 0 : +number,  
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),  
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,  
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,  
        s = '',  
        toFixedFix = function (n, prec) {  
            var k = Math.pow(10, prec);  
            return '' + Math.round(n * k) / k;        
        };  
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');  
    if (s[0].length > 3) {  
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);      
    }  
    if ((s[1] || '').length < prec) {  
        s[1] = s[1] || '';  
        s[1] += new Array(prec - s[1].length + 1).join('0');  
    }    return s.join(dec);  
} 


/**
 * 格式化的数字反格式化
 * @param String str 被格式化的数字
 * @return float 去除千分位分隔符之后的数字
 */
SKY.numDeFormat = function(str){
	return parseFloat(SKY.strReplace(str),10);
}

/**
 * 获取当前的日期，格式为0000-00-00
 * @return String 当前的日期
 */
SKY.getDate = function(){
    var date = new Date();
    var year = date.getFullYear();  
    var month = date.getMonth()+1;
    var day = date.getDate();

    if(month < 10) month = '0'+month;
    if(day < 10) day = '0'+day;
    return year+'-'+month+'-'+day;
}

/**
 * 字符串替换函数
 * @param String str 要处理的字符串
 * @param String find 要搜索的字符串，默认为","
 * @param String rep 要替换的字符串，默认为''
 * @return String 替换完成的字符串
 */
SKY.strReplace = function(str, find, rep){
	if(typeof rep === 'undefined') find = ',';
	if(typeof rep === 'undefined') rep = '';
	eval('var re = /'+find+'/g');
	return str.replace(re,rep);
}

/**
 * 去除字符串两边的空格
 */
SKY.trim = function(str){
	return str.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * 去除字符串左边的空格
 */
SKY.ltrim = function(str){
     return str.replace(/(^\s*)/g,'');
}

/**
 * 去除字符串右边的空格
 */
SKY.rtrim = function(str){
     return str.replace(/(\s*$)/g,'');
}

/**
 * 获取浏览器的参数
 * @param String name
 */
SKY.getUrlParam = function(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null;
}

/**
 * 克隆一个对象，包括日期类型，数组类型，普通类型的对象
 * @param Object obj 
 * @param Object 被深复制出来的object
 */
SKY.clone = function (obj) {

    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; ++i) {
            copy[i] = SKY.clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = SKY.clone(obj[attr]);
        }
        return copy;
    }
}

/************[end工具函数部分]************/

/**
 * 对AMD规范的支持
 */
if (typeof define === 'function' && define.amd) {
	define('SKY', [], function() {
	  return SKY;
	});
}
}.call(this));
