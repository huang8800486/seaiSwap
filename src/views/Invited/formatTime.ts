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

  // for (const k in o) {
  //   const ret = new RegExp('(' + k + ')').exec(format)
  //   if (ret) {
  //     if (/(y+)/.test(k)) {
  //       format = format.replace(ret[1], (d.getFullYear() + '').substring(4 - ret[1].length))
  //     } else {
  //       format = format.replace(ret[1], ret[1].length === 1 ? o[k] : ('00' + o[k]).substring(('' + o[k]).length))
  //     }
  //   }
  // }
  return format
}
