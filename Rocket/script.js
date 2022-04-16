var x=true;
var context;
var backgroundColor = "#021F51";
var myCanvas;
var myCircles = [];
var star, stars = [], myStarsVar;
var jet, jets = [], myJetVar;
var myFrameVar;
var height = 0; 
var height_control=true;
var controls = new function() {
    this.rocketspeed = 1;
    
}
//window.setInterval(DoAnimation, 100);
function DoAnimation(){    
    myCanvas = document.getElementById( "MyCanvas" );
    context = myCanvas.getContext( "2d" ); 
    if(x==true){
    context.clearRect( 0, 0, myCanvas.width, myCanvas.height );
    var gui = new dat.GUI();
    gui.add(controls, 'rocketspeed',1,5);
        x=false;
    }
    context.fillStyle = backgroundColor;    
 //background  
    background = new Rect();
    background.Color = '#000318';
    background.scaleX = 1000;
    background.scaleY = 1000;
    background.setReferencePoint((myCanvas.width-background.scaleX)/2,(myCanvas.width-background.scaleY)/2);
    myCircles.push( background );    
//rocket
    body = new Rect();
    body.Color = '#DFE1E4';
    body.scaleX = 320;
    body.scaleY = 100;
    body.setReferencePoint((myCanvas.width-body.scaleX-100)/2,(myCanvas.width-body.scaleY)/2);
    myCircles.push( body );

    wing = new Rect();
    wing.Color = 'lightgray';    
    wing.scaleX = 170;
    wing.scaleY = 50;  
    wing.setReferencePoint(body.X0,body.Y0);
    myCircles.push( wing );
   
    head = new Rect();
    head.Color = 'red';
    head.scaleX = 100;
    head.scaleY = 100;   
    head.setReferencePoint(body.X0,body.Y0+350);
    myCircles.push( head );
    
    doors2 = new Circle();
    doors2.Radius = 5.5;    
    doors2.Color = 'grey';    
    doors2.setReferencePoint(body.X0+body.scaleX/1.3,body.Y0+body.scaleY/2);

    doors = new Circle();
    doors.Radius = 5;    
    doors.Color = 'black';    
    doors.setReferencePoint(doors2.X0,doors2.Y0);

    engine = new Rect();
    engine.Color = 'darkgreen';
    engine.scaleX = 100;
    engine.scaleY = 100;   
    engine.setReferencePoint(body.X0,body.Y0+350);
    myCircles.push( engine );
    
    context.save();
    context.transform(background.scaleX ,0,0,background.scaleY,background.X0,background.Y0);
    background.display();
    context.restore();
//stars
    for ( let i = 0; i < stars.length; i ++ ) {
        var star = stars[ i ];
        var StarsScale = star.S;
        if ( StarsScale == 1 ) { 
            star.setReferencePoint( star.X0 - (6+controls.rocketspeed*2), star.Y0 );
            context.save();
                context.transform( 3, 0, 0, 3, star.X0, star.Y0 );
                star.display();
            context.restore();
        }
        else 
            if ( StarsScale == 2 ) {
                star.setReferencePoint( star.X0 - (8+controls.rocketspeed*2), star.Y0 );
                context.save();
                    context.transform( 4, 0, 0, 4, star.X0, star.Y0 );
                    star.display();
                context.restore();
        }
        else 
            if ( StarsScale == 3 ) {
                star.setReferencePoint( star.X0 - (10+controls.rocketspeed*2), star.Y0 );
                context.save();
                    context.transform( 5, 0, 0, 5, star.X0, star.Y0 );
                    star.display();
                context.restore();
            }
        if ( star.X0 < 0 ) stars.splice( i, 1 );
        
    }   
// jet flames
    for ( let i = 0; i < jets.length; i ++ ) 
    {
        var jet = jets[ i ];
        
                jet.setReferencePoint( jet.X0 - (20+controls.rocketspeed*10), jet.Y0 );
                context.save();
                    context.transform( 150, 0, 0, 25, jet.X0-580, jet.Y0+350);
                    jet.display();
                context.restore();     
    }  
//rocket up and down move   
    if(height_control==true)
    {      
        if(height<=10)
        {
            height+=1+controls.rocketspeed;  
        }
        if(height>10)
        {
            height_control=false;
        }      
             
    }
    if(height_control==false)
    {
        if(height>=-10)
        {
            height-=1+controls.rocketspeed;  
        }
        if(height<-10)
        {
            height_control=true;
        }      
    }
    //rocket
    context.save();
    context.transform(wing.scaleX ,-20,-50,wing.scaleY,wing.X0-10,wing.Y0+100-height);
    wing.display();
    context.restore();

    context.save();
    context.transform(wing.scaleX ,20,50,wing.scaleY,wing.X0-60,wing.Y0-50-height);
    wing.display();
    context.restore(); 

    context.save();
    context.transform(body.scaleX ,0,0,body.scaleY,body.X0,body.Y0-height);
    body.display();
    context.restore();

    context.save();
    context.transform(engine.scaleX-75 ,0,0,engine.scaleY+5,engine.X0-10,engine.Y0-352-height);
    engine.display();
    context.restore();

    context.save();
    context.transform(head.scaleX-50 ,0,0,head.scaleY,head.X0+300,head.Y0-350-height);
    head.display();
    context.restore();    

    context.save();
    context.transform(head.scaleX-50 ,0,0,head.scaleY-25,head.X0+320,head.Y0-338-height);
    head.display();
    context.restore();    

    context.save();
    context.transform(head.scaleX-50 ,0,0,head.scaleY-50,head.X0+340,head.Y0-325-height);
    head.display();
    context.restore();  

    context.save();
    context.transform(doors2.Radius,0,0,doors2.Radius,doors2.X0,doors2.Y0-height);
    doors2.display();
    context.restore();

    context.save();
    context.transform(doors.Radius,0,0,doors.Radius,doors.X0,doors.Y0-height);
    doors.display();
    context.restore(); 

// stars and jets var
    myFrameVar = setTimeout( DoAnimation, 100 );
    myStarsVar = setTimeout(nextStars, 100);
    myJetVar = setTimeout(nextJet, 100);   
   
}
   
    


//=================================================================================================

function Circle( ) {
    this.X = 0;
    this.Y = 0;    
    this.Radius = 1;
    this.display = function() {
        context.fillStyle = this.Color;
        context.beginPath();
        context.arc( this.X, this.Y, this.Radius, 0, Math.PI * 2, true );
        context.closePath();
        context.fill();
    }

    this.setReferencePoint = function( x, y ) {
        this.X0 = x;
        this.Y0 = y;
    }
}


function Rect( color )
{
    this.X = 0;
    this.Y = 0;
    this.W = 1;
    this.H = 1;
    this.Color = color;
    this.X0 = 0;
    this.Y0 = 0;

    this.display = function( ) { 
      context.fillStyle = this.Color;
      context.fillRect( this.X, this.Y, this.W, this.H );
    };

    this.setReferencePoint = function( x, y ) {
        this.X0 = x;
        this.Y0 = y;
    }
}

function Stars( rX, rY ) {
    this.X = 0;
    this.Y = 0;

    this.display = function() {
      
        context.fillStyle = "white";
        context.filter="blur(1.5px)";
        context.beginPath();
        context.arc( this.X, this.Y, 1, 0, Math.PI * 2.1, true );
        context.closePath();
        context.fill();
    } 
    this.setReferencePoint = function( x, y ) {
        this.X0 = x;
        this.Y0 = y;
    }
    
    this.setScale = function( s ) {
        this.S = s;
    }
}

function Jet( rX, rY ) {
    this.X = 0;
    this.Y = 0;

    this.display = function() {
      
        context.fillStyle = "orange";
        context.filter="blur(20px)";
        context.beginPath();
        context.arc( this.X, this.Y, 1, 0, Math.PI * 2, true );
        context.closePath();
        context.fill();
    } 
    this.setReferencePoint = function( x, y ) {
        this.X0 = x;
        this.Y0 = y;
    }
    
    this.setScale = function( s ) {
        this.S = s;
    }
}


function nextStars( ) {
    var isOK = Math.floor( Math.random() * 5 );
    console.log( isOK, stars.length  );
    //isOK = 1;
    if ( isOK === 1 ) {
        var cY = Math.floor( Math.random() * ( myCanvas.height) );
        star = new Stars( myCanvas.width, cY );
        if ( cY < myCanvas.height / 4 ) star.setScale( 1 );
        else if ( cY < myCanvas.height / 2 ) star.setScale( 2 );
        else star.setScale( 3 );
        star.setReferencePoint( myCanvas.width, cY );
        stars.push( star );        
    }   
    myStarsVar = setTimeout(nextStars, 5000);    
}

function nextJet( ) 
{
    var isOK = Math.floor( Math.random() * 2 );
    console.log( isOK, jets.length  );
    //isOK = 1;
    if ( isOK === 1 ) {
        var cY = Math.floor( Math.random() * ( myCanvas.height/2-height) );
        jet = new Jet( myCanvas.width, cY/4-height );       
        jet.setReferencePoint( myCanvas.width, cY/4 -height);
        jets.push( jet ); 
          
    }
      
}