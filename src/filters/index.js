const _cover = num => {
    let n = parseInt(num, 10);
    return n < 10 ? '0' + n : n;
}

export function date (time) {
  const d = new Date(time*1000)
  return _cover(d.getMonth()+1) + '-' + _cover(d.getDate()) + ' ' + _cover(d.getHours()) + ':' + _cover(d.getMinutes());
}

export const zhihuimg = (value) => {
  return value && value.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
}

export const zhihulink = (value) => {
  return value && unescape(value.replace(/https:\/\/link.zhihu.com\/\?target=/g, ''))
}
