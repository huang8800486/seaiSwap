/* eslint-disable */
export function formatTime(dateTime: number, format = 'yyyy-MM-dd hh:mm:ss') {
  if (!dateTime) return
  const d = new Date(dateTime)
  const o = {
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    S: d.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}
export function formatNumMin(value: string) {
  let result = ''
  const regext = /0{5,}/
  if (value.indexOf('.') !== -1) {
    if (regext.test(value)) {
      const execs = regext.exec(value)
      const pos1 = '0.0' + `{${execs[0].length}}`
      let pos2 = value.split(execs[0])[1]
      result = pos1 + pos2
    } else {
      result = value
    }
  } else {
    result = value
  }
  return result
}
