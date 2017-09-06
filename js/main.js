function roll(){
    var temp1 = 0;
    var temp2 = 0;
   
    var image = new Array(6);
    image[1] = 'img/d1.png';
    image[2] = 'img/d2.png';
    image[3] = 'img/d3.png';
    image[4] = 'img/d4.png';
    image[5] = 'img/d5.png';
    image[6] = 'img/d6.png';

    temp1 = Math.floor(Math.random() * 6) + 1;
    temp2 = Math.floor(Math.random() * 6) + 1;
    document.getElementById("scelta1").src = image[temp1];
    document.getElementById("scelta2").src = image[temp2];

    var score =(temp1===1 || temp2===1) ? 0: temp1 + temp2;
    var score1 =(temp1===1 || temp2===1) ? 0: temp1 + temp2;

     if( temp1 === temp2 ){
        // if 1 and 1 scores 4 
        score1 = "You Won!"; 
        // if 1 and 1 scores 0
        // score = 2*(score); 
    } 
    document.getElementById("status").value = "You rolled a "+temp1+" and a "+temp2+" for a score of "+score;
    document.getElementById("status1").value =  score1;
}
