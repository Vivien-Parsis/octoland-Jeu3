var WinOrLose;
var pause = false;
var timeCount = 0;
var life = 3;
var speedObstacle = 250;
var speedEnfant = 250;
var score = 0;
var HarponActive = false;
var OursinActive = true;
var highScore = 0;
var music;

function preload() {
    this.load.image('player', 'assets/image/player.png');
    this.load.image('oursin', 'assets/image/oursin.png');
    this.load.image('background', 'assets/image/background.png');
    this.load.image('enfant', 'assets/image/bg.png');
    this.load.image('harpon', 'assets/image/harpon.png');
    this.load.image('resetbutton', 'assets/image/reset.png');
    //this.load.audio('musicBG', ['assets/audio/musicBG.mp3', 'assets/audio/musicBG.ogg']);
}

function create() {
    //music = game.add.audio('musicBG');
    //music.loop = true;
    //music.play();
  
    this.q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    this.background = this.physics.add.image(config.width/2,config.height/2,'background');
    this.background.setScale(config.width/this.background.width, config.height/this.background.height);

    this.resetbutton = this.physics.add.image(0,0,'resetbutton').setScale(0.1,0.1);
    this.resetbutton.setPosition(config.width-(this.resetbutton.displayWidth/2)-5,(this.resetbutton.displayHeight/2)+5);
    
    this.player = this.physics.add.image(config.width / 2, 0, 'player').setScale(0.04, 0.04);
    this.player.setPosition(config.width / 2, config.height - (this.player.displayHeight/2));
    this.player.setCollideWorldBounds(true);
    this.player.setImmovable(true);
    
    this.oursin = this.physics.add.image(config.width / 2, 50, 'oursin').setScale(0.07, 0.07);
    this.enfant = this.physics.add.image(config.width / 2, 50, 'enfant').setScale(0.20, 0.20);
    this.harpon = this.physics.add.image(config.width / 2, 50, 'harpon').setScale(0.5, 0.5);
    this.enfant.setPosition(RandInt(this.enfant.displayWidth/2,config.width - (this.enfant.displayWidth/2)), -50);
    
    do{this.oursin.setPosition(RandInt(this.oursin.displayWidth/2,config.width - (this.oursin.displayWidth/2)), -150);}
      while((this.oursin.x-(this.oursin.displayWidth/2) > this.enfant.x-(this.enfant.displayWidth/2) 
            && this.oursin.x-(this.oursin.displayWidth/2) < this.enfant.x+(this.enfant.displayWidth/2)) 
            || (this.oursin.x+(this.oursin.displayWidth/2) > this.enfant.x-(this.enfant.displayWidth/2) 
            && this.oursin.x+(this.oursin.displayWidth/2) < this.enfant.x+(this.enfant.displayWidth/2)));
    
    do{this.harpon.setPosition(RandInt(this.harpon.displayWidth/2,config.width - (this.harpon.displayWidth/2)), -150);}
      while((this.harpon.x-(this.harpon.displayWidth/2) > this.enfant.x-(this.enfant.displayWidth/2) 
            && this.harpon.x-(this.harpon.displayWidth/2) < this.enfant.x+(this.enfant.displayWidth/2)) 
            || (this.harpon.x+(this.harpon.displayWidth/2) > this.enfant.x-(this.enfant.displayWidth/2) 
            && this.harpon.x+(this.harpon.displayWidth/2) < this.enfant.x+(this.enfant.displayWidth/2)));

    this.chronoText = this.add.text(10,10,'chrono',{fontfamily:"Passion-Regu",fill:'#dddddd',stroke:'#000000',strokeThickness:5});
    this.winText = this.add.text(config.width/3,config.height/2,'',{fontfamily:"Passion-Regu",fill:'#eeee00',stroke:'#222222',strokeThickness:6});
    

    this.timer = this.time.delayedCall(1000,null,null,this);
    
    this.ColisionPlOr = this.physics.add.collider
      (
        this.player,
        this.oursin,
        function(_player,_oursin)
        {
          if(_player.body.touching.up && _oursin.body.touching.down
             || _player.body.touching.left && _oursin.body.touching.right
             || _player.body.touching.right && _oursin.body.touching.left)
          {
            life -= 1;
            _oursin.setPosition(RandInt(_oursin.displayWidth/2,config.width - (_oursin.displayWidth/2)), -_oursin.displayHeight);
            //speedObstacle += 10;
            let randSelect = RandInt(0,2);
            if(randSelect==0)
            {
              HarponActive = true;
              OursinActive = false;
            }
            if(randSelect==1)
            {
              HarponActive = false;
              OursinActive = true;
            }
            
          }
        }
      );
    this.ColisionPlHa = this.physics.add.collider
      (
        this.player,
        this.harpon,
        function(_player,_harpon)
        {
          if(_player.body.touching.up && _harpon.body.touching.down
             || _player.body.touching.left && _harpon.body.touching.right
             || _player.body.touching.right && _harpon.body.touching.left)
          {
             life -= 1;
            _harpon.setPosition(RandInt(_harpon.displayWidth/2,config.width - (_harpon.displayWidth/2)), -_harpon.displayHeight);
            //speedObstacle += 10;
            let randSelect = RandInt(0,2);
            if(randSelect==0)
            {
              HarponActive = true;
              OursinActive = false;
            }
            if(randSelect==1)
            {
              HarponActive = false;
              OursinActive = true;
            }   
          }
        }
      );
    this.ColisionPlEf = this.physics.add.collider
      (
          this.player,
          this.enfant,
          function(_player,_enfant)
        {
          if(_player.body.touching.up && _enfant.body.touching.down
             || _player.body.touching.left && _enfant.body.touching.right
             || _player.body.touching.right && _enfant.body.touching.left)
          {
            _enfant.setPosition(RandInt(_enfant.displayWidth/2,config.width - (_enfant.displayWidth/2)), -_enfant.displayHeight);
            //speedEnfant += 5;
            score += 100*life;
          }
        }
      );
}

function update() {
    var pointer = this.input.activePointer;
    this.oursin.setVelocityX(0);
    this.enfant.setVelocityX(0);
    this.harpon.setVelocityX(0);
    
    this.oursin.setActive(OursinActive).setVisible(OursinActive);
    this.ColisionPlOr.active = OursinActive;
    this.harpon.setActive(HarponActive).setVisible(HarponActive);
    this.ColisionPlHa.active = HarponActive;
    
    if(this.r.isDown || pointer.isDown
      && pointer.x > this.resetbutton.x-(this.resetbutton.displayWidth/2)
      && pointer.x < this.resetbutton.x+(this.resetbutton.displayWidth/2)
      && pointer.y > this.resetbutton.y-(this.resetbutton.displayHeight/2)
      && pointer.y < this.resetbutton.y+(this.resetbutton.displayHeight/2))
    {
      pause=false;
      WinOrLose = null;
      this.timer = this.time.delayedCall(1000,null,null,this);
      timeCount = 0;
      life = 3;
      peedObstacle = 250;
      speedEnfant = 250;
      score = 0;
      this.player.setVelocityX(0);
      this.enfant.setPosition(RandInt(this.enfant.displayWidth/2,config.width - (this.enfant.displayWidth/2)), -this.enfant.displayHeight);
      this.player.setPosition(config.width / 2, config.height - (this.player.displayHeight/2));
      
      do{this.oursin.setPosition(RandInt(this.oursin.displayWidth/2,config.width - (this.oursin.displayWidth/2)), -this.oursin.displayWidth);}
        while((this.oursin.x-(this.oursin.displayWidth/2) > this.enfant.x-(this.enfant.displayWidth/2) 
            && this.oursin.x-(this.oursin.displayWidth/2) < this.enfant.x+(this.enfant.displayWidth/2)) 
            || (this.oursin.x+(this.oursin.displayWidth/2) > this.enfant.x-(this.enfant.displayWidth/2) 
            && this.oursin.x+(this.oursin.displayWidth/2) < this.enfant.x+(this.enfant.displayWidth/2)));
    
      do{this.harpon.setPosition(RandInt(this.harpon.displayWidth/2,config.width - (this.harpon.displayWidth/2)), -this.harpon.displayHeight);}
        while((this.harpon.x-(this.harpon.displayWidth/2) > this.enfant.x-(this.enfant.displayWidth/2) 
            && this.harpon.x-(this.harpon.displayWidth/2) < this.enfant.x+(this.enfant.displayWidth/2)) 
            || (this.harpon.x+(this.harpon.displayWidth/2) > this.enfant.x-(this.enfant.displayWidth/2) 
            && this.harpon.x+(this.harpon.displayWidth/2) < this.enfant.x+(this.enfant.displayWidth/2))); 
    }
  
    if(pause==false)
    {
      let textVie ='';
      for(let i = 0; i < life; i++)
      {textVie += '❤️';}
    
      let text = 'Timer: '+timeCount+'s\nHP:'+textVie+'\nScore: '+score+'\nHigh score: '+highScore;
      //  let debugtext = '\n'+pointer.x+'\n'+this.player.x+'\n'+this.player.displayWidth;text += debugtext;
      this.chronoText.setText(text);
      let cursors = this.input.keyboard.createCursorKeys();
      if ((cursors.left.isDown || this.q.isDown) || (cursors.right.isDown || this.d.isDown)) 
      {this.player.setVelocityX(cursors.left.isDown || this.q.isDown ? -300 : 300);}
      else 
      {this.player.setVelocityX(0);}
      
      if(OursinActive)
      {this.oursin.setVelocityY(speedObstacle);}
      else
      {this.oursin.setVelocityY(0);}
      if(HarponActive)
      {this.harpon.setVelocityY(speedObstacle);}
      else
      {this.harpon.setVelocityY(0);}
      
      this.enfant.setVelocityY(speedEnfant);
      
      if(this.oursin.y > config.height+(this.oursin.displayWidth/2) ||this.harpon.y > config.height+(this.oursin.displayWidth/2))
      {
        do{this.oursin.setPosition(RandInt(this.oursin.displayWidth/2,config.width - (this.oursin.displayWidth/2)), -this.oursin.displayHeight);}
        while((this.oursin.x-(this.oursin.displayWidth/2) > this.enfant.x-(this.enfant.displayWidth/2) 
            && this.oursin.x-(this.oursin.displayWidth/2) < this.enfant.x+(this.enfant.displayWidth/2)) 
            || (this.oursin.x+(this.oursin.displayWidth/2) > this.enfant.x-(this.enfant.displayWidth/2) 
            && this.oursin.x+(this.oursin.displayWidth/2) < this.enfant.x+(this.enfant.displayWidth/2)));
    
      do{this.harpon.setPosition(RandInt(this.harpon.displayWidth/2,config.width - (this.harpon.displayWidth/2)), -this.harpon.displayHeight);}
        while((this.harpon.x-(this.harpon.displayWidth/2) > this.enfant.x-(this.enfant.displayWidth/2) 
            && this.harpon.x-(this.harpon.displayWidth/2) < this.enfant.x+(this.enfant.displayWidth/2)) 
            || (this.harpon.x+(this.harpon.displayWidth/2) > this.enfant.x-(this.enfant.displayWidth/2) 
            && this.harpon.x+(this.harpon.displayWidth/2) < this.enfant.x+(this.enfant.displayWidth/2)));
        let randSelect = RandInt(0,2);
        if(randSelect==0)
        {
          HarponActive = true;
          OursinActive = false;
        }
        if(randSelect==1)
        {
          HarponActive = false;
          OursinActive = true;
        }
        //speedObstacle += 10;
      }
      
      if(pointer.isDown 
         && pointer.x>(this.player.x-(this.player.displayWidth/2)) 
         && pointer.x<(this.player.x+(this.player.displayWidth/2))
         && pointer.x>this.player.displayWidth/2 
         && pointer.x<config.width-(this.player.displayWidth/2)
         && pointer.y>this.player.y-this.player.displayHeight
         && pointer.y<this.player.y+this.player.displayHeight)
      {this.player.setPosition(pointer.x, this.player.y);}
      
      if(this.enfant.y > config.height+(this.enfant.displayWidth/2))
      {
        do{this.enfant.setPosition(RandInt(this.enfant.displayWidth/2,config.width - (this.enfant.displayWidth/2)), -this.enfant.displayHeight);}
        while(((this.enfant.x-(this.enfant.displayWidth/2) > this.harpon.x-(this.harpon.displayWidth/2) 
            && this.enfant.x-(this.enfant.displayWidth/2) < this.harpon.x+(this.harpon.displayWidth/2))
            || ((this.enfant.x+(this.enfant.displayWidth/2) > this.harpon.x-(this.harpon.displayWidth/2) 
            && this.enfant.x+(this.enfant.displayWidth/2) < this.harpon.x+(this.harpon.displayWidth/2))))
            || ((this.enfant.x-(this.enfant.displayWidth/2) > this.oursin.x-(this.oursin.displayWidth/2) 
            && this.enfant.x-(this.enfant.displayWidth/2) < this.oursin.x+(this.oursin.displayWidth/2)) 
            || (this.enfant.x+(this.enfant.displayWidth/2) > this.oursin.x-(this.oursin.displayWidth/2) 
            && this.enfant.x+(this.enfant.displayWidth/2) < this.oursin.x+(this.oursin.displayWidth/2))));
    
        //speedEnfant += 5;
        life -= 1;
      }
      
      if(this.timer.getProgress()==1)
      {
        this.timer = this.time.delayedCall(1000,null,null,this);
        timeCount += 1;
      }
        
      if(WinOrLose == 'lose')
      {
        this.winText.setText('You lose');
        this.winText.setPosition((config.width/2)-(this.winText.displayWidth/2),(config.height/2)-(this.winText.displayHeight/2));
        
        //if(WinOrLose == 'win')
        //{this.winText.setText('You Win !🏆');}
        pause = true;
        this.oursin.setVelocityY(0);
        this.player.setVelocityX(0);
        this.enfant.setVelocityY(0);
        this.harpon.setVelocityY(0);
        this.oursin.setPosition(RandInt(this.oursin.displayWidth/2,config.width - (this.oursin.displayWidth/2)), -this.oursin.displayHeight);
        this.player.setPosition(config.width / 2, config.height - (this.player.displayHeight/2));
        this.enfant.setPosition(RandInt(this.enfant.displayWidth/2,config.width - (this.enfant.displayWidth/2)), -this.enfant.displayHeight);
        this.harpon.setPosition(RandInt(this.harpon.displayWidth/2,config.width - (this.harpon.displayWidth/2)), -this.harpon.displayHeight);
        if(score > highScore)
        {highScore=score;}
        let text = 'Timer: '+timeCount+'s\nHP:'+textVie+'\nScore: '+score+'\nHigh score: '+highScore;
        this.chronoText.setText(text);
      }
      
      if(life <= 0)
      {WinOrLose = 'lose';}
      //if(timeCount == 0)
      //{WinOrLose = 'win'}
      if(WinOrLose == null)
      {this.winText.setText();}
    } 
}



function RandInt(min, max)
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 550,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    backgroundColor: '#020E55',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);