export default class Utils {
  static productIp() {
    let arr = [];
    for (let i = 0; i < 6; i++) {
      let num = Math.random() * 9; //Math.random();每次生成(0-1)之间的数;
      num = parseInt(num, 10);
      arr.push(num);
    }
    return arr.join('');
  }
  static checkEmail(email) {
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if (!reg.test(email))
      return false;
    return true;
  }
  static html_encode(str) {
    let s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
  }
  static html_decode(str) {
    let s = "";
    if (str.length == 0) return "";
    s = str.replace(/&amp;;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    return s;
  }
}
