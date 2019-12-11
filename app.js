document.addEventListener('DOMContentLoaded',()=>{
    console.log('App.js loaded');

    var qwerty = document.getElementById('qwerty');//Get the element with the id of qwerty and save it to a variable.
    var phrase = document.getElementById('phrase');//Get the element with the id of phrase and save it to a variable.
   
    var btn__reset = document.querySelector('.btn__reset');//Get the element with a class of btn__reset and save it to a variable
    var missed = 0;//Create a missed variable, initialized to 0, wrong 5 times = lose
    var overlay = document.getElementById('overlay');
    var phrases=["gameboy","kickball","football","cat","dog"];//Declare & initialize phrases array, storing at least five strings that contain only letters and spaces, no punctuation.
    var randoNumber = getRandomInt(5);//Use randoNumber to select an index inside of the array. (0 - 4 indexes)
    
    phrase =phrases[randoNumber];
    var PhraseLetters = phrase.split("");//Store all of the li elements in a variable inside checkLetter
    var matchFound=null;//Create a variable to store if a match is found and give it an initial value of null
    var match=null;
    var showLI="";//Create a variable to store the li elements that have the class name “show”

    btn__reset.addEventListener('click', (e) => { //Attach an event listener to the “Start Game” button to hide the start screen overlay.
        overlay.style.display = 'none';//Hide the overlay by changing its display property.
        console.log("Rando Index is: "+ randoNumber);
        getRandomPhraseAsArray(randoNumber, phrases);
    });
    
    function getRandomInt(max){//used to randomly pick index of phrases array
        return Math.floor(Math.random() * Math.floor(max));
    }  

    function getRandomPhraseAsArray(randoNumber, phrases){//randomly pick an index 0-4 in phrases array.
        console.log('Phrase is:' + phrase);
        for(let i = 0; i < phrase.length;i++){     
            var nodeLetter=document.createElement("LI");                 // Create a <li> node   
            var phraseNode = document.createTextNode(phrase[i]);     // Create a text node
            nodeLetter.appendChild(phraseNode);                            // Append the text to <li>
            nodeLetter.className = "letter";
            document.getElementById("phrase").appendChild(nodeLetter);   // Append <li> to <ul> with id="myList"
        }
    }

    const buttons = document.querySelectorAll('button');//adds unchosen class to all QWERTY buttons
    buttons.forEach(button => {
        button.className = "unchosen";
    });

    function checkLetter(butTouched){//checks butTouched for a match with phrase and outputs result
        console.log("PhraseLetters: "+PhraseLetters+" __ phrase length: "+phrase.length);
        
        match=null;

        for(let i = 0; i < phrase.length;i++){ 
            butTouched = button.textContent;
            var LetterOfPhrase=PhraseLetters[i];
            console.log("LetterOfPhrase: "+LetterOfPhrase+" __  butTouched: "+butTouched);

            if(butTouched === LetterOfPhrase){//Create a conditional 
                const letterLI = document.getElementById("phrase").querySelectorAll(".letter");
                letterLI[i].classList.add('show');

                showLI+=(letterLI[i].textContent);
                console.log("phrase= "+phrase+" . showLI= "+showLI);

                matchFound=butTouched;//store the button text in the match variable
                match=true;
                console.log(match+" with: "+matchFound);
            }
            else{//not matched
                console.log(match+" with: "+matchFound);
            }   
            //if no matches are made then return match null
        }
    }

    qwerty.addEventListener('click', (e) => {//Start by creating an event listener for the qwerty element that listens for the “click” event.
        button = e.target;
        if(e.target.tagName === 'BUTTON' && button.className === "unchosen"){//Use a conditional to filter out clicks not on the buttons OR if the button already has the “chosen” class
            button.className = "chosen";//Add the “chosen” class to the button that was pressed.
            const butTouched = button.textContent;

            checkLetter();//Call the checkLetter function and store the results in a variable.

            console.log("Match passed into: "+match);

            if(match === null){//checkLetter doesn't find letter
                button.style.backgroundColor = "red";
                missed+=1;
                const tries = document.getElementById("olboard");//remove once heart image
                const hearts = tries.children;
                    let li = hearts[missed];
                    if(missed<5){
                        li.style.display = 'none';   
                    }             
            }
        }
        checkWin();
    });
    
    function checkWin(){//Displays WIN (compares variables) or LOSE (misses>4)   
        if(phrase.length === showLI.length){//Check if the length of the 2 variables are the same. If they are, display the win overlay
            overlay.className = 'win';//Create the win overlay by adding the “win” class to the start overlay.
            document.querySelector("h2.title").innerHTML = "YOU WIN";//Change the headline text of the start overlay to show a person won.
            overlay.style.display = 'flex';//Change the display property of the overlay to “flex”
            console.log('You win');
            
            btn__reset.addEventListener('click', (e) => {//restart by refreshing page
                location.reload();
            });
        }
        if(missed>4){//Check if the missed counter is greater than 4. If they are, display the lose overlay
            overlay.className = 'lose';//Create the lose overlay by adding the “lose” class to the start overlay.
            document.querySelector("h2.title").innerHTML = "YOU LOSE";//Change the headline text of the start overlay to show a person lost.
            overlay.style.display = 'flex';//Change the display property of the overlay to “flex”      
            console.log('You lose');

            btn__reset.addEventListener('click', (e) => {//restart by refreshing page
                location.reload();
            });
        }
    }
});




