// forked from v416's "[物理演算]Box2d　その１" http://jsdo.it/v416/zrd4
enchant();
var WORLD_SIZE = 320;
var WORLD_HALF = Math.floor(WORLD_SIZE / 2);
var WORLD_SCALE = 32;

window.onload = function(){
    var main = new Game(WORLD_SIZE,WORLD_SIZE);
    
    main.onload = function(){
        
        // 物理空間の生成
        var gravity = new b2Vec2(0,9.8);
        var world = new b2World(gravity,true);
        
        //ボールの配列を定義
        main.circleDefList = [];
        main.circleBdyList = [];
        main.circlePlyList = [];
        main.circleFixList = [];

        function MakeBall(){
            for(var i = 0;i<1;i++){
                //ボールの生成
                main.circleDefList[i]  = new b2BodyDef();
                main.circleDefList[i].type = b2Body.b2_dynamicBody;
                main.circleDefList[i].position.Set(i*7.1/ WORLD_SCALE,0);
                //空間上にオブジェクトを配置
                main.circleBdyList[i] = world.CreateBody(main.circleDefList[i]);
                //円形オブジェクトの定義
                main.circlePlyList[i] = new b2CircleShape(7 / WORLD_SCALE);
                
                main.circleFixList[i] = new b2FixtureDef();
                main.circleFixList[i].shape = main.circlePlyList[i];
                main.circleFixList[i].density = 1;
                main.circleFixList[i].friction = 0.3;
                main.circleFixList[i].restitution = 0.9;
                main.circleBdyList[i].CreateFixture(main.circleFixList[i]);
        	}
            setTimeout(MakeBall,1000);//1sごとに実行            
        }
        MakeBall();
        
        
        //床の生成
        var groundBodyDef = new b2BodyDef();
        groundBodyDef.type = b2Body.b2_staticBody;
        groundBodyDef.position.Set(WORLD_HALF / WORLD_SCALE,
            (WORLD_SIZE - 10) / WORLD_SCALE);
        var groundBody = world.CreateBody(groundBodyDef);
        
        var groundBox = new b2PolygonShape();
        groundBox.SetAsBox(WORLD_SIZE/2/WORLD_SCALE,10/2/WORLD_SCALE);
        
        var groundFixtureDef = new b2FixtureDef();
        groundFixtureDef.shape = groundBox;
        groundFixtureDef.density = 1;
        groundFixtureDef.friction = 1;
        groundBody.CreateFixture(groundFixtureDef);
        
        //壁の配列を定義
        main.wallBodyDefList = [];
        main.wallBodyList = [];
        main.wallBoxList = [];
        main.wallFixtureDefList = [];
        
        //壁の生成
        for(var j = 0;j<6;j++){
            
            main.wallBodyDefList[j] = new b2BodyDef();
            main.wallBodyDefList[j].type = b2Body.b2_staticBody;
            
            if(j<=1){//壁
                main.wallBodyDefList[j].position.Set(WORLD_SIZE*j / WORLD_SCALE,0);
                
                main.wallBodyList[j] = world.CreateBody(main.wallBodyDefList[j]);
            
                main.wallBoxList[j] = new b2PolygonShape();
                main.wallBoxList[j].SetAsBox(10/WORLD_SCALE,WORLD_SIZE /WORLD_SCALE);
            }
            switch(j){
                case 2://左上
                    main.wallBodyDefList[j].position.Set(0,0);
                    main.wallBodyDefList[j].angle = -Math.PI * 43 / 180;  // 傾き
                    main.wallBodyList[j] = world.CreateBody(main.wallBodyDefList[j]);
                
                    main.wallBoxList[j] = new b2PolygonShape();
                    break;
                case 3://右下
                    main.wallBodyDefList[j].position.Set(WORLD_SIZE / WORLD_SCALE,
                    WORLD_SIZE / WORLD_SCALE);
                    main.wallBodyDefList[j].angle = -Math.PI * 43 / 180;  // 傾き
                    main.wallBodyList[j] = world.CreateBody(main.wallBodyDefList[j]);
                
                    main.wallBoxList[j] = new b2PolygonShape();
                    break;
                case 4://右上
                    main.wallBodyDefList[j].position.Set(WORLD_SIZE / WORLD_SCALE,0);
                    main.wallBodyDefList[j].angle = Math.PI * 43 / 180;  // 傾き
                    main.wallBodyList[j] = world.CreateBody(main.wallBodyDefList[j]);
                
                    main.wallBoxList[j] = new b2PolygonShape();
                    break;
                case 5://左下
                    main.wallBodyDefList[j].position.Set(0,WORLD_SIZE / WORLD_SCALE);
                    main.wallBodyDefList[j].angle = Math.PI * 43 / 180;  // 傾き
                    main.wallBodyList[j] = world.CreateBody(main.wallBodyDefList[j]);
                
                    main.wallBoxList[j] = new b2PolygonShape();
                    break;
                default:
                    break;
            }
            if(j>1){
                //壁の大きさ
                main.wallBoxList[j].SetAsBox(3/WORLD_SCALE,(WORLD_HALF+61)/WORLD_SCALE);
            }
			
            
            
            
            
            main.wallFixtureDefList[j] = new b2FixtureDef();
            main.wallFixtureDefList[j].shape = main.wallBoxList[j];
            main.wallFixtureDefList[j].density = 1;
            main.wallFixtureDefList[j].friction = 1;
            main.wallBodyList[j].CreateFixture(main.wallFixtureDefList[j]);
            
        }
        //デバッグ用スプライト
        var debugSprite = new Sprite(WORLD_SIZE,WORLD_SIZE);
        debugSprite.image = new Surface(WORLD_SIZE,WORLD_SIZE);
        main.rootScene.addChild(debugSprite);
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(debugSprite.image.context);
        debugDraw.SetDrawScale(WORLD_SCALE);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetAlpha(1);
        debugDraw.SetFillAlpha(0.4);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit);
        world.SetDebugDraw(debugDraw);
        
        
        main.rootScene.addEventListener(Event.ENTER_FRAME,function(){
            var timeStep = 1 / main.fps;
            var velocityIterations = 1;
            var positionIterations = 1;
            //物理空間の更新
            world.Step(timeStep,velocityIterations,positionIterations);
            
            //debug画面の更新
            world.ClearForces();
            world.DrawDebugData();
        });
       
    };
    main.start();
};