var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
function nextSequence(){ // 3- aqui ele gera e mostra a cor aleatória escolhida e toca o som com base nisso
    userClickedPattern = [];
    var randomChosenColor = buttonColours[Math.floor(Math.random()*4)];
    gamePattern.push(randomChosenColor);
    $("h1").text("Level "+gamePattern.length);
    setTimeout(() =>{
    $("."+randomChosenColor).fadeOut(100).fadeIn(100);
    var audio1 = new Audio("sounds/"+randomChosenColor+".mp3")
    audio1.play();
    audio1.volume = 0.1;
    }, 700);
    }    
$(".btn").on("click", function(){// 4- próximo passo é clicar em algum botão pra fazer igual, o clique fica registrado no "userClickedPattern = []"
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    var audio2 = new Audio("sounds/"+userChosenColour+".mp3");
    audio2.play()
    audio2.volume = 0.1;
    $("#"+this.id).addClass("pressed");
    setTimeout(() =>{
    $("#"+this.id).removeClass("pressed");
    }, 100);
    checkAnswer(userClickedPattern.length-1);// 5- aqui envia pra ser comparado com a ordem de gerados aleatórios
    });
var started = false;
$(document).keydown(function(){// 1- o jogo começa aqui quando se aperta alguma tecla na página
    if (started == false){
    started = true;
    gamePattern = [];
    delete userChosenColour;
    nextSequence();// 2- no final chama essa função
    }
});
function checkAnswer(rs) {
    if (userClickedPattern[rs] === gamePattern[rs]) {// 6- se o número dos clicados for igual o numero de aleatórios gerados, ele vai checar por aqui
    if (userClickedPattern.length === gamePattern.length){ 
        nextSequence(); // -7 se for igual, deleta a "userClickedPattern = []" pra preencher outra do 0, sendo que o pc mantém a ordem do "gamePattern = [];"
    }  
    } else { // 8- game over aqui
        $("h1").text("You suck");
        var audio3 = new Audio("sounds/wrong.mp3");
        audio3.play();
        audio3.volume = 0.05;
        $("body").addClass("game-over");
        setTimeout(() =>{
        $("body").removeClass("game-over");
        }, 200);
        setTimeout(() =>{
        $("h1").text("Press A Key to Start");
        }, 2000);
        started = false;
    }
}