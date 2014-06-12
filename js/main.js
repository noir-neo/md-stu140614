// おまじないだよ☆
var game = game || {};

(function(ns) {
  
  // 最初に呼ばれます。
  // jQueryでいう $(function(){}); のtmlib版みたいな？
  tm.main(function() {
    
    // 画面縦横を定義
    ns.SCREEN_WIDTH = 1920;
    ns.SCREEN_HEIGHT = 1080;
    ns.SCREEN_CENTER_X = ns.SCREEN_WIDTH / 2;
    ns.SCREEN_CENTER_Y = ns.SCREEN_HEIGHT / 2;
    
    ns.app = tm.display.CanvasApp('#world'); // canvasのidを指定
    ns.app.resize(ns.SCREEN_WIDTH, ns.SCREEN_HEIGHT); // 縦横を指定
    ns.app.fitWindow(); // canvasを画面サイズに合わせて等倍拡大縮小
    
    ns.app.replaceScene(MainScene());
    
    ns.app.run(); // おらっ動けっ
    
  });
  
  // メインシーン
  tm.define('MainScene', {
    superClass: 'tm.app.Scene',
    
    // シーンを作るとき最初に呼ばれる
    init: function() {
      this.superInit();
      ns.app.background = '#e74c3c'; // 背景色
      
      this.own = OwnShape(200, 50).addChildTo(this);
      
      
    },
    
    // 毎フレームごとに呼ばれる
    update: function() {
      
    },
    
  });
  
  tm.define('OwnShape', {
    superClass: 'tm.display.RectangleShape',
    init: function(width, height) {
      this.superInit(width, height);
      this.setBoundingType('rect')
        .setPosition(ns.SCREEN_CENTER_X, ns.SCREEN_HEIGHT-100);
      this.color = '#2980b9';
    },
    
    update: function() {
      var direction = ns.app.keyboard.getKeyDirection();
      this.x += direction.x * 50;
      var leftBorder = this.width/2;
      var rightBorder = ns.SCREEN_WIDTH -  this.width/2;
      if (this.x <leftBorder) this.x = leftBorder;
      if (this.x > rightBorder) this.x = rightBorder;
    },
    
    draw: function(canvas) {
      canvas.fillStyle = this.color;
      canvas.fillRect(-this.width/2, -this.height/2, this.width, this.height);
    },
    
  });
  

})(game);
