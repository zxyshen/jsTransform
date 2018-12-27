# jsTransform
> 封装transfom操作(提供动画效果)

### 基本方法
  #### cssTransform(attr, val, dynconf)
    * @attr string 要操作的transfom属性 
    * @val {Number} 给attr赋值
    * @dynconf {object/Number} 动画选项；当值为Number时函数会执行一个时间为Number缓动形式为Linear的动画
      * @type {string} 缓动形式；默认为Linear 
      * @time {Number} 动画执行时间(ms)；默认为1000
      * @onComplete {Function} 动画结束时执行的函数；默认为null 
 
 
  #### stopCssTransform
 
 
### 使用示例
```
jsTransform('#demo').cssTransform('scale', 200, {
  time: 1000,
  type: 'linear'
}).cssTransform('translateX', 300, {
  time: 1000,
  type: 'linear'
})
```

### 注意事项
<font color=red>1.cssTransform只可以获取到用cssTransform设置的transform值</font> 
<font color=red>2.cssTransform设置和获取的scale系列值都是100的倍数</font> 
