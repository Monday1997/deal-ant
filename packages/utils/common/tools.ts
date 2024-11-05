import { isPromise } from './type'
/**
 * 最后一次执行
 */
export function debounceDelay<T extends (...args: any[]) => void>(fn: T, delay = 200) {
  let time: NodeJS.Timeout | undefined
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(time)
    time = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
/**
 * 第一次执行
 */
export function debounce<T extends (...arg: any[]) => void>(fn: T, delay = 200) {
  let time
  return function (this: any, ...args: Parameters<T>) {
    if (!time) {
      fn.apply(this, args)
    } else {
      clearTimeout(time)
    }
    time = setTimeout(() => {
      time = null
    }, delay)
  }
}
/**
 * 职责链判断
 */
/* function chainModeJudge(this: any) {
  this.chain = []
}
chainModeJudge.prototype.add = function (fn) {
  this.chain.push(fn)
}
chainModeJudge.prototype.start = async function () {
  for (let key = 0; key < this.chain.length; key++) {
    const fn = this.chain[key]
    const result = fn()
    let error = false
    if (isPromise(fn)) {
      error = await result
    } else {
      error = result
    }
    if (error) {
      return error
    }
  }
} */
