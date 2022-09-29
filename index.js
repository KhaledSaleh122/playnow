var isGameStarted = false;
var btnSelectViewTime = 2000;
var subtractValue = 150;
var btnSelectTimer = null;
var level = 1;
var btnMemory = [];
var index = 0;
var correctNumber; //1
var timePressed = 0;
var restartMode = false;
$(".button-top .btn").on("click",function(){
    if (!isGameStarted && !restartMode){
        isGameStarted = true;
        $(".button-top .btn").addClass("disabled");
        $(".txt-info .text").text("The Game Started Your Level is "+level);
        pickBtn();
        $(".buttons-game .btn").on("click",playerPicks);
        $(".pressTimes").text("You Press Times "+ timePressed);
    }else if(!isGameStarted && restartMode){
        restartMode = false;
        isGameStarted = true;
        $(".button-top .btn").addClass("disabled");
        $(".txt-info .text").text("The Game Started Your Level is "+level);
        pickBtn();
        $(".pressTimes").text("You Press Times "+ timePressed);
    }
});
function playerPicks(){
    if(isGameStarted){
        if(btnSelectTimer == null && timePressed <= (btnMemory.length) -1){
            var audio = new Audio('click.wav');
            audio.play();
            var trueSelection = false;
            $(".Correct").text("correctNumber = "+correctNumber);
            $(".index").text("index = "+index + " arr =  " + btnMemory + " len " + btnMemory.length);
            switch(correctNumber){
                case 1 : console.log($(".f").is(this)); if ($(".f").is(this)){trueSelection = true;}
                break;
                case 2: console.log($(".s").is(this)); if ($(".s").is(this) ){trueSelection = true;}
                break;
                case 3: console.log($(".t").is(this)); if ($(".t").is(this) ){trueSelection = true; }
                break;
                case 4: console.log($(".l").is(this)); if ($(".l").is(this)){trueSelection = true; }
                break;
                default: $(".txt-info .text").text("Error , try refresh the page");
            }
            if(trueSelection){
                if(index < (btnMemory.length) -1){
                    index++;
                    correctNumber = btnMemory[index];
                    $(".Correct").text("correctNumber = "+correctNumber);
                    $(".index").text("index = "+index + " arr =  " + btnMemory + " len " + btnMemory.length);
                    timePressed++;
                    $(".pressTimes").text("You Press Times "+ timePressed);
                }else{
                    level++;
                    $(".txt-info .text").text("Your Level Now is "+level);
                    pickBtn();
                    timePressed =0;
                    $(".pressTimes").text("You Press Times "+ timePressed);
                }
            }else{
                $(".txt-info .text").text("You Picked The Wrong Number Fool , try Again"); 
                isGameStarted = false;
                btnSelectViewTime = 2000;
                subtractValue = 150;
                btnSelectTimer = null;
                level = 1;
                btnMemory = [];
                index = 0;
                timePressed = 0;
                $(".pressTimes").text("Times you press");
                $(".button-top .btn").removeClass("disabled");
                restartMode = true;
            }
        }
    }
}

function pickBtn(){
    var selectBtn = Math.floor(Math.random()*4) + 1;
    btnMemory.push(selectBtn);
    switch(selectBtn){
        case 1 : animSelect($(".f"));
        break;
        case 2: animSelect($(".s"));
        break;
        case 3: animSelect($(".t"));
        break;
        case 4: animSelect($(".l"));
        break;
        default: $(".txt-info .text").text("Error , try refresh the page");
    }
    
}

function animSelect(btn){
    btn.addClass("btn-selected");
    btnSelectTimer = setTimeout(function(){
        btn.removeClass("btn-selected");
        $(".txt-info .text").text("Draw The Pattern Now :)");
        timePressed = 0;
        $(".pressTimes").text("You Press Times "+ timePressed);
        btnSelectTimer = null;
        index = 0;
        correctNumber = btnMemory[index];
        $(".Correct").text("correctNumber = "+correctNumber);
        $(".index").text("index = "+index + " arr =  " + btnMemory + " len " + btnMemory.length);
    },btnSelectViewTime);
    $(".txt-info .text").text("Your Level Now is "+level);
    if(btnSelectViewTime < 1000){
        subtractValue = 100;
    }else if(btnSelectViewTime < 500){
        subtractValue = 50;
    }else if(btnSelectViewTime < 100){
        subtractValue = 10;
    }
    if(btnSelectViewTime - subtractValue > 50 ){
        btnSelectViewTime = btnSelectViewTime - subtractValue;
    }
}
