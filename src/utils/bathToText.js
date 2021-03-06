export function BAHTTEXT(a, b) {
  "use strict";
  if (
    (void 0 === b && (b = "บาทถ้วน"),
    (a = a || 0),
    (a = a.toString().replace(/[, ]/g, "")),
    isNaN(a) || Math.round(100 * parseFloat(a)) / 100 == 0)
  )
    return "ศูนย์บาทถ้วน";
  var e,
    f,
    h,
    i,
    c = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"],
    d = ["", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"],
    g = "";
  if (a.indexOf(".") > -1)
    return (
      (h = a.toString().split(".")),
      (a = h[0]),
      (h[1] = parseFloat("0." + h[1])),
      (h[1] = (Math.round(100 * h[1]) / 100).toString()),
      (h = h[1].split(".")),
      h.length > 1 && 1 === h[1].length && (h[1] = h[1].toString() + "0"),
      (a = parseInt(a, 10) + parseInt(h[0], 10)),
      (g = a ? BAHTTEXT(a) : ""),
      parseInt(h[1], 10) > 0 &&
        (g = g.replace("ถ้วน", "") + BAHTTEXT(h[1], "สตางค์")),
      g
    );
  if (a.length > 7) {
    var j = a.substring(0, a.length - 6),
      k = a.slice(-6);
    return (
      BAHTTEXT(j).replace("บาทถ้วน", "ล้าน") + BAHTTEXT(k).replace("ศูนย์", "")
    );
  }
  for (e = a.length, i = 0; i < e; i += 1)
    (f = parseInt(a.charAt(i), 10)) > 0 &&
      (g +=
        e > 2 && i === e - 1 && 1 === f && "สตางค์" !== b
          ? "เอ็ด" + c[e - 1 - i]
          : d[f] + c[e - 1 - i]);
  return (
    (g = g.replace("หนึ่งสิบ", "สิบ")),
    (g = g.replace("สองสิบ", "ยี่สิบ")),
    (g = g.replace("สิบหนึ่ง", "สิบเอ็ด")) + b
  );
}
