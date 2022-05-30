// 颜色阶梯算法，用于获取自定义颜色风格下，不同色阶下的对应颜色
function gradientColor(startColor, endColor, step) {
  let startRGB = colorRgbDecompose(startColor); //转换为rgb数组模式
  console.log('startRGB',startRGB);
  let startR = startRGB[0];
  let startG = startRGB[1];
  let startB = startRGB[2];

  let endRGB = colorRgbDecompose(endColor);
  let endR = endRGB[0];
  let endG = endRGB[1];
  let endB = endRGB[2];

  let averageR = (endR - startR) / step; //总差值
  let averageG = (endG - startG) / step;
  let averageB = (endB - startB) / step;

  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值
    var hex = colorHex(
      "rgb(" +
        parseInt(averageR * i + startR) +
        "," +
        parseInt(averageG * i + startG) +
        "," +
        parseInt(averageB * i + startB) +
        ")"
    );
    console.log('得到hex',hex);
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式并实现rgb三色的分解(这里返回rgb数组模式)
function colorRgbDecompose(hexColor) {
  console.log('coloRgb');
  // 颜色值合法性校验reg
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // eslint-disable-next-line no-redeclare
  var sColor = hexColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
      // 进制转换
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    console.log('sColorChange',sColorChange);
    return sColorChange;
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function colorHex(rgb) {
  console.log('colorHex');
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = hex < 10 ? 0 + "" + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var i = 0; i < aNum.length; i += 1) {
        numHex += aNum[i] + aNum[i];
      }
      return numHex;
    }
  } else {
    return _this;
  }
};

// var gradient = new gradientColor("#013548", "#554851", 10);

export default gradientColor;
