// おまじないだよ☆
var game = game || {};

(function(ns) {
  
  // 最初に呼ばれます。
  // jQueryでいう $(function(){}); のtmlib版みたいな？
  tm.main(function() {
    
    // 画面縦横を定義
    ns.SCREEN_WIDTH = 1920;
    ns.SCREEN_HEIGHT = 1080;
    
    ns.app = tm.display.CanvasApp('#world'); // canvasのidを指定
    ns.app.resize(ns.SCREEN_WIDTH, ns.SCREEN_HEIGHT); // 縦横を指定
    ns.app.fitWindow(); // canvasを画面サイズに合わせて等倍拡大縮小
    ns.app.background = '#e74c3c'; // 背景色
    
    ns.app.run(); // おらっ動けっ
    
  });
  
})(game);
