export const isNumber = (val: any): val is number => typeof val === 'number'

export function isArray(val: any): val is any[] {
  return Array.isArray(val)
}

export function isString(val: any): val is string {
  return Object.prototype.toString.call(val) === '[object String]'
}

export function isObject(val: any): val is object {
  const type = typeof val
  return val != null && (type == 'object' || type == 'function')
}

export function isHtmlElement(node: any) {
  return node && node.nodeType === Node.ELEMENT_NODE
}

export const isFunction = (functionToCheck: any) => {
  return typeof functionToCheck === 'function'
}

export const isUndefined = (val: any) => {
  return val === undefined
}

export const isDefined = (val: any) => {
  return val !== undefined && val !== null
}

export const isIE = function () {
  return !Number.isNaN(Number((document as any).documentMode))
}

export const isEdge = function () {
  return navigator.userAgent.includes('Edge')
}

export const isFirefox = function () {
  return !!window.navigator.userAgent.match(/firefox/i)
}
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction((val as any).then) && isFunction((val as any).catch)
}

type EmptyObject<T> = { [K in keyof T]?: never }
type EmptyObjectOf<T> = EmptyObject<T> extends T ? EmptyObject<T> : never
export function isEmpty<T extends { __trapAny: any }>(value?: T): boolean
export function isEmpty(value: string): value is ''
export function isEmpty(value: Map<any, any> | Set<any> | null | undefined): boolean
export function isEmpty(value: object): boolean
export function isEmpty(value: number | undefined): value is undefined
export function isEmpty<T extends object>(
  value: T | null | undefined
): value is EmptyObjectOf<T> | null | undefined
export function isEmpty(value?: any): boolean
export function isEmpty(val: string | any[] | object | null | undefined | number | boolean) {
  if (val === null || val === undefined || typeof val === 'boolean') {
    return true
  }

  if (typeof val === 'number') {
    return Number.isNaN(val)
  }

  if (val instanceof Error) {
    return val.message === ''
  }

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !(val as string | any[]).length

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !(val as File | Map<any, any> | Set<any>).size
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length
    }
  }

  return false
}

//判断是否手机端
export function isMobile() {
  const flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
  return flag
}
//判断运行在node环境还是浏览器环境
export const isClient = typeof window !== 'undefined'
