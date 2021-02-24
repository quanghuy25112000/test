const style=`<style>
    .home{
        width: 100vw;
        height: 100vh;
        background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzSP2QVPLOvnrycYR1Pky7QD2UPuJjrS2GDw&usqp=CAU');
        background-size: cover;
        background-repeat: no-repeat;
    }
    .title{
        font-family: 'Sancreek', cursive;
        color: #fd0000;
        font-size: 100px;
        text-align: center;
    }
    .form{
        box-shadow: 0 0 10px red;
        width: 50vw;
        height: 70vh;
        margin: auto;
        margin-top: -5vh;
        background-color: #272525;
    }
    
    #question{
        padding:50px;
        line-height: 6.5vh;
    }
    #all-answer{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 40px; 
         
    }
    #game-question{
        box-shadow: 0 0 70px red;
    }
    #score{
        color:yellow;
        margin-top:10vh;
        padding:25px 0 0 25px;
        font-size: 20px;
        font-family: 'Chakra Petch', sans-serif;
    }
    
    #snackbar {
        visibility: hidden;
        min-width: 250px;
        margin-left: -125px;
        background-color: white;
        color: #fff;
        text-align: center;
        border-radius: 2px;
        padding: 16px;
        position: fixed;
        z-index: 1;
        left: 50%;
        bottom: 30px;
        font-size: 17px;
      }
      
      #snackbar.show {
        visibility: visible;
        -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
        animation: fadein 0.5s, fadeout 0.5s 2.5s;
      }
      
      @-webkit-keyframes fadein {
        from {bottom: 0; opacity: 0;} 
        to {bottom: 30px; opacity: 1;}
      }
      
      @keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 30px; opacity: 1;}
      }
      
      @-webkit-keyframes fadeout {
        from {bottom: 30px; opacity: 1;} 
        to {bottom: 0; opacity: 0;}
      }
      
      @keyframes fadeout {
        from {bottom: 30px; opacity: 1;}
        to {bottom: 0; opacity: 0;}
      }
      
</style>`
export class Gameplay extends HTMLElement{
    listQues1
    order
    score
    ok
    k
    constructor(){
        super()
        this.listQues1= []
        this.score=0
        this.order=0
        this.ok=[]
        this.k=0;
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    async connectedCallback(){
        
        //<div id="question-answer"></div>

        this.shadowDom.innerHTML=`
        ${style}
        <div id="all">
            <div id="question-answer">
            
            </div>
            
        </div>
        <div id="snackbar">Exactly</div>
        `
        // lay du lieu ve
        this.listQues1 =[]
       
        for(let i=0;i<this.listQues1.length;i++){
                this.ok.push(0);
            }
            this.ok[this.order]=1
         
        var str=`
            {"response_code":0,"results":[{"category":"Sports","type":"multiple","difficulty":"easy","question":"Which team won the 2015-16 English Premier League?","correct_answer":"Leicester City","incorrect_answers":["Liverpool","Cheslea","Manchester United"]},{"category":"Sports","type":"multiple","difficulty":"easy","question":"In Baseball, how many times does the ball have to be pitched outside of the strike zone before the batter is walked?","correct_answer":"4","incorrect_answers":["1","2","3"]},{"category":"Sports","type":"multiple","difficulty":"easy","question":"Who is often called &quot;the Maestro&quot; in the men&#039;s tennis circuit?","correct_answer":"Roger Federer","incorrect_answers":["Bill Tilden","Boris Becker","Pete Sampras"]},{"category":"Sports","type":"multiple","difficulty":"easy","question":"Which player holds the NHL record of 2,857 points?","correct_answer":"Wayne Gretzky","incorrect_answers":["Mario Lemieux ","Sidney Crosby","Gordie Howe"]},{"category":"Sports","type":"multiple","difficulty":"easy","question":"In the 2014 FIFA World Cup, what was the final score in the match Brazil - Germany?","correct_answer":"1-7","incorrect_answers":["1-5","1-6","2-6"]}]}`;

        var obj = JSON.parse(str); 
         console.log(obj.results[0].incorrect_answers[0]);
         for(let i=0;i<obj.results.length;i++){
             this.listQues1.push(obj.results[i])
         }
         console.log(this.listQues1);
         this.showQuestion(this.order)
    }
    // async getMany(i){
    //     const res =await firebase.firestore().collection('questions').where('group','==',i).get()
    //     const questions=getDatas(res)
    //     return questions   
    // }
    showQuestion(index){

        const question=this.listQues1[index]
        
        this.shadowDom.querySelector('#question-answer').innerHTML = `
            <div class="home">
                <div class="title">Football</div>
                <div class="form">
                    <div id="score">Point: 0</div>
                    <div id="question">
                        <game-question id="game-question" question="${question.question}"></game-question>
                    </div>
                    <div id="all-answer">
                        <game-answer id="a1" answer="${question.correct_answer}" isTrue="1"></game-answer>
                        <game-answer id="a2" answer="${question.incorrect_answers[0]}" isTrue="0"></game-answer>
                        <game-answer id="a3" answer="${question.incorrect_answers[1]}" isTrue="0"></game-answer>
                        <game-answer id="a4" answer="${question.incorrect_answers[2]}" isTrue="0"></game-answer> 
                    </div>
                         
                </div>
                
            </div>
            
        `
        
        this.shadowDom.querySelector('#all-answer').addEventListener('click',(e) => {  
            
            const id=e.target.id
            
                setTimeout(()=>{
                if(this.k<this.listQues1.length-1){  
                    if(this.shadowDom.querySelector('#'+id).getAttribute('isTrue')==1) {
                    
                        while(this.ok[this.order]===1){
                            this.order=Math.floor(Math.random()*this.listQues1.length)
                        }
                        
                        this.ok[this.order]=1;
                        this.my('Exactly ✔','green')
                        // alert('doi chut');
                        // (()=>{
                        //     var x = document.getElementById("snackbar");
                        //     x.className = "show";
                        //     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                        //     console.log('done');
                        // })
                        setTimeout(()=>{
        
                            this.showQuestion(this.order)
                            this.k++;
                            this.score+=10
                            this.shadowDom.getElementById('score').innerHTML=`Point: ${this.score}`
                            
                       },1000)
                    }
                    else if(this.shadowDom.querySelector('#'+id).getAttribute('isTrue')==0){
                        this.my('Wrong ✘','red')
                        setTimeout(()=>{
                            // this.shadowDom.querySelector('#all').innerHTML=`<end-screen point="${this.score}"></end-screen>`
                            alert(`Game over, Your core: ${this.score}`)
                        },1000)
                        // if(this.score>getItemLocalStorage('currentUser').point) this.updatePoint(getItemLocalStorage('currentUser').gmail,this.score)
                    
                    }
                }
                else{
                    if(this.shadowDom.querySelector('#'+id).getAttribute('isTrue')==1) {
                        this.my('Exactly ✔','green')
                        setTimeout(()=>{
                            // this.shadowDom.querySelector('#all').innerHTML=`<victory-screen point="${this.score+1}"></victory-screen>`
                            alert('Victory')
                        },1000)
                        // if(this.score>getItemLocalStorage('currentUser').point)
                        // this.updatePoint(getItemLocalStorage('currentUser').gmail,this.score+1)
                    }
                    else  alert(`Game over, Your core: ${this.score}`)
                       
                }},1000)
               
         })
         
        
    }
    my(mess,color){
        var x = this.shadowDom.getElementById("snackbar");
        x.innerHTML=`<style> #snackbar{color:${color};}</style>${mess}`
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 500);
        
    }
    // async updatePoint(gmail,point){
    //     const res=await firebase.firestore().collection('user').where('gmail','==',gmail).get()
    //     const user=getDatas(res)
    //     firebase.firestore().collection('user').doc(user[0].id).update({'point':point})
    // }
    print(){
        console.log('chinh xac')
    }
    

}

window.customElements.define('gameplay-screen',Gameplay)