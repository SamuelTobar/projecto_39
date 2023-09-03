class Quiz {
  constructor(){}

  getState(){
    var gamestateRef  = database.ref('gamestate');
    
    gamestateRef.on("value",function(data){
       gamestate = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gamestate: state
    });
  }

  async start(){
    if(gamestate === 0){
      contestant = new Contestant();
      var contestantcountRef = await database.ref('contestantcount').once("value");
      if(contestantcountRef.exists()){
        
        contestantcount = contestantcountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    
    question.hide(); 

    background("Yellow");
    fill(0);
    textSize(30);
    text("Resultados del quiz",340, 50);
    text("----------------------------",330, 65);
    Contestant.getPlayerInfo();
    if(allContestants !== undefined){
  
      var display_Answers = 230;
      fill("Blue");
      textSize(20);
      text("*NOTA: ¡Los participantes que respondieron correctamente están resaltados en color verde!",20,230);

      for(var plr in allContestants){
        debugger;
        var correctAns = "2";
// Marca la condición cuando la respuesta del jugador y la respuesta correcta son iguales
// Si son iguales, rellena con verde
   
if(allContestants[plr].answer === correctAns){
  fill("green");
} else {
  fill("red");
}
// Si no son iguales, rellena con rojo
       
        

        display_Answers+=30;
        textSize(20);
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 250,display_Answers)
      }
    }
  }
}
