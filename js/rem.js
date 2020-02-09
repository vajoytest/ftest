//屏幕适应
(function(win, doc) {
    if (!win.addEventListener) return;

    var realFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    function setFont() {
        var html = document.documentElement;
        var k = 375;
        var fontSize = html.clientWidth / k * 100;
        html.style.fontSize = fontSize * (16 / realFontSize) + "px";
    }

    setFont();
    setTimeout(function() {
        setFont();
    }, 300);
    doc.addEventListener('DOMContentLoaded', setFont, false);
    win.addEventListener('resize', setFont, false);
    win.addEventListener('load', setFont, false);
})(window, document);
