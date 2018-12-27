let jsTransform = function(el) {
  if (typeof el === 'object') jsTransform.el = el
  else if (typeof el === 'string') jsTransform.el = document.querySelector(el)
  else return
  return {
    cssTransform: function(attr, val, dynconf) {
      if (!attr) return

      if (!dynconf || !dynconf.toString().trim()) {
        //不需要动画效果的或者只是获取值的
        return noTime(jsTransform.el, attr, val)
      } else {
        // 需要动画效果
        // 如果dynconf是数字类型
        if (dynconf + 0 === dynconf) {
          let conf = {}
          conf.time = dynconf
          hasTime(jsTransform.el, attr, val, conf)
        } else {
          hasTime(jsTransform.el, attr, val, dynconf)
        }
      }

      function hasTime(element, attr, val, dynconf) {
        const Tween = {
          linear: function(t, b, c, d) {
            return (c * t) / d + b
          },
          easeIn: function(t, b, c, d) {
            return c * (t /= d) * t + b
          },
          easeOut: function(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b
          },
          easeBoth: function(t, b, c, d) {
            if ((t /= d / 2) < 1) {
              return (c / 2) * t * t + b
            }
            return (-c / 2) * (--t * (t - 2) - 1) + b
          },

          elasticIn: function(t, b, c, d, a, p) {
            if (t === 0) {
              return b
            }
            if ((t /= d) == 1) {
              return b + c
            }
            if (!p) {
              p = d * 0.3
            }
            if (!a || a < Math.abs(c)) {
              a = c
              let s = p / 4
            } else {
              let s = (p / (2 * Math.PI)) * Math.asin(c / a)
            }
            return (
              -(
                a *
                Math.pow(2, 10 * (t -= 1)) *
                Math.sin(((t * d - s) * (2 * Math.PI)) / p)
              ) + b
            )
          },
          elasticOut: function(t, b, c, d, a, p) {
            if (t === 0) {
              return b
            }
            if ((t /= d) == 1) {
              return b + c
            }
            if (!p) {
              p = d * 0.3
            }
            if (!a || a < Math.abs(c)) {
              a = c
              let s = p / 4
            } else {
              let s = (p / (2 * Math.PI)) * Math.asin(c / a)
            }
            return (
              a *
                Math.pow(2, -10 * t) *
                Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
              c +
              b
            )
          },
          elasticBoth: function(t, b, c, d, a, p) {
            if (t === 0) {
              return b
            }
            if ((t /= d / 2) == 2) {
              return b + c
            }
            if (!p) {
              p = d * (0.3 * 1.5)
            }
            if (!a || a < Math.abs(c)) {
              a = c
              let s = p / 4
            } else {
              let s = (p / (2 * Math.PI)) * Math.asin(c / a)
            }
            if (t < 1) {
              return (
                -0.5 *
                  (a *
                    Math.pow(2, 10 * (t -= 1)) *
                    Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
                b
              )
            }
            return (
              a *
                Math.pow(2, -10 * (t -= 1)) *
                Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
                0.5 +
              c +
              b
            )
          },
          backIn: function(t, b, c, d, s) {
            if (typeof s == 'undefined') {
              s = 1.70158
            }
            return c * (t /= d) * t * ((s + 1) * t - s) + b
          },
          backOut: function(t, b, c, d, s) {
            if (typeof s == 'undefined') {
              s = 2.70158 //回缩的距离
            }
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
          },
          backBoth: function(t, b, c, d, s) {
            if (typeof s == 'undefined') {
              s = 1.70158
            }
            if ((t /= d / 2) < 1) {
              return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b
            }
            return (
              (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
            )
          },
          bounceIn: function(t, b, c, d) {
            return c - Tween['bounceOut'](d - t, 0, c, d) + b
          },
          bounceOut: function(t, b, c, d) {
            if ((t /= d) < 1 / 2.75) {
              return c * (7.5625 * t * t) + b
            } else if (t < 2 / 2.75) {
              return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b
            } else if (t < 2.5 / 2.75) {
              return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b
            }
            return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
          },
          bounceBoth: function(t, b, c, d) {
            if (t < d / 2) {
              return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b
            }
            return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
          }
        }
        if (!dynconf.type) {
          dynconf.type = 'linear'
        }
        if (!dynconf.time && dynconf.time != 0) {
          dynconf.time = 1000
        }
        let ts = 0
        let d = dynconf.time / 20
        let b = {}
        let c = {}
        b[attr] = noTime(element, attr)
        c[attr] = val - b[attr]
        clearInterval(element.cssTransformTimer)
        element.cssTransformTimer = setInterval(function() {
          ts++
          if (ts > d) {
            clearInterval(element.cssTransformTimer)
            dynconf.onComplete && dynconf.onComplete()
          } else {
            let val = Number(
              Tween[dynconf.type](ts, b[attr], c[attr], d).toFixed(2)
            )
            noTime(element, attr, val)
          }
        }, 20)
      }

      function noTime(element, attr, val) {
        if (!element.transform) {
          element.transform = {}
        }
        // 取值
        if (typeof val == 'undefined') {
          //   当取值时，值为空，除了scale系列设为初始值100，其它初始值都设为0
          if (!element.transform[attr]) {
            switch (attr) {
              case 'scale':
              case 'scaleX':
              case 'scaleY':
              case 'scaleZ':
                element.transform[attr] = 100
                break
              default:
                element.transform[attr] = 0
            }
          }
          // 直接返回所要取的值
          return element.transform[attr]
        } else {
          // 赋值
          element.transform[attr] = val
          let transformVal = ''
          for (let s in element.transform) {
            switch (s) {
              case 'scale':
              case 'scaleX':
              case 'scaleY':
              case 'scaleZ':
                transformVal += ' ' + s + '(' + val / 100 + ')'
                break
              case 'rotate':
              case 'rotateX':
              case 'rotateY':
              case 'rotateZ':
              case 'skewX':
              case 'skewY':
                transformVal += ' ' + s + '(' + val + 'deg)'
                break
              default:
                transformVal += ' ' + s + '(' + val + 'px)'
            }
          }
          element.style.WebkitTransform = element.style.transform = transformVal
        }
      }
      return this
    },
    stopCssTransform: function() {
      clearInterval(jsTransform.el.cssTransformTimer)
      return this
    }
  }
}

module.exports = jsTransform
