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
      
      this.mLabel = tm.display.Label('☆:0', 80)
        .setPosition(50, 100)
        .setFontFamily('cursive')
        .addChildTo(this);
      
      this.mStars = [];
      this.addStar();
    },
    
    // 毎フレームごとに呼ばれる
    update: function() {
      
      this.mStars.each(function(theStar) {
        if (this.own.isHitPointRect(theStar.x, theStar.y)) {
          theStar.direction = - theStar.direction;
          theStar.accelSpeed();
          this.addStar();
        }
      }.bind(this));
      this.mLabel.text = '☆:'+this.mStars.length;
      
    },
    
    addStar: function() {
       this.mStars.push(MyStar(this.own.x, this.own.y-this.own.height/2, 50, 50).addChildTo(this));
    },
    
    deleteStar: function(theStar) {
      var index = this.mStars.indexOf(theStar);
      this.mStars.splice(index, 1);
      //this.removeChild(theStar);
    },
    
  });
  
  tm.define('MyStar', {
    superClass: 'tm.display.StarShape',
    init: function(x, y, width, height) {
      this.superInit(width, height);
      this.setBoundingType('circle')
        .setPosition(x, y);
      this.color = 'white';
      this.rotation = 0;
      this.direction = Math.rand(182, 358);
      this.speed = 20;
      this.active = true;
    },
    
    update: function () {
      if (this.active) {
        
        var theta = this.direction / 180 * Math.PI;
        this.x += Math.cos(theta) * this.speed;
        this.y += Math.sin(theta) * this.speed;

        if (this.x <= 0 || this.x >= ns.SCREEN_WIDTH) {
          this.direction = 180 - this.direction;
          this.accelSpeed();
        }

        if (this.y <= 0) {
          this.direction = -this.direction;
          this.accelSpeed();
        }

        if (this.y >= ns.SCREEN_HEIGHT) {
          this.active = false;
          this.parent.deleteStar(this);
        }

        this.rotation += this.speed;
      }
    },    
    
    accelSpeed: function() {
      this.speed *= 1.01;
    },
    
    draw: function(canvas) {
      canvas.fillStyle = this.color;
      canvas.fillStar(0, 0, this.width/2, 5);
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
