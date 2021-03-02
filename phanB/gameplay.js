const style=`<style>
    .home{
        width: 100vw;
        height: 100vh;
        background: url('https://i0.wp.com/d9n64ieh9hz8y.cloudfront.net/wp-content/uploads/20150809045841/feat_mob_gaming-8.jpg?fit=%2C&ssl=1');
        background-size: cover;
        background-repeat: no-repeat;
    
      
</style>`
export class Gameplay extends HTMLElement{
    listQuestion
    point
    
    constructor(){
        super()
        this.listQuestion= []
        this.point=0
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    async connectedCallback(){

        this.shadowDom.innerHTML=`
        ${style}
        <div id="all">
            <div id="question-answer">
            
            </div>
            
        </div>
        
        `
        this.listQuestion =[]
        var string=`
            {"response_code":0,"results":[{"category":"Sports","type":"multiple","difficulty":"easy","question":"Which team won the 2015-16 English Premier League?","correct_answer":"Leicester City","incorrect_answers":["Liverpool","Cheslea","Manchester United"]},{"category":"Sports","type":"multiple","difficulty":"easy","question":"In Baseball, how many times does the ball have to be pitched outside of the strike zone before the batter is walked?","correct_answer":"4","incorrect_answers":["1","2","3"]},{"category":"Sports","type":"multiple","difficulty":"easy","question":"Who is often called &quot;the Maestro&quot; in the men&#039;s tennis circuit?","correct_answer":"Roger Federer","incorrect_answers":["Bill Tilden","Boris Becker","Pete Sampras"]},{"category":"Sports","type":"multiple","difficulty":"easy","question":"Which player holds the NHL record of 2,857 points?","correct_answer":"Wayne Gretzky","incorrect_answers":["Mario Lemieux ","Sidney Crosby","Gordie Howe"]},{"category":"Sports","type":"multiple","difficulty":"easy","question":"In the 2014 FIFA World Cup, what was the final score in the match Brazil - Germany?","correct_answer":"1-7","incorrect_answers":["1-5","1-6","2-6"]}]}`;

        var object = JSON.parse(string); 
         for(let i=0;i<object.results.length;i++){
             this.listQuestion.push(object.results[i])
         }
         
         this.showQuestion()
    }
    
    showQuestion(){
        const question=this.listQuestion[0]      
        this.shadowDom.querySelector('#question-answer').innerHTML = `
            <div class="home">
                <div class="form">
                    <div id="point">Point: 0</div>
                    <div id="question">
                        <question-component id="game-question" question="${question.question}"></question-component>
                    </div>
                    <div id="all-answer">
                        <answer-component id="a1" answer="${question.correct_answer}" isTrue="1"></answer-component>
                        <answer-component id="a2" answer="${question.incorrect_answers[0]}" isTrue="0"></answer-component>
                        <answer-component id="a3" answer="${question.incorrect_answers[1]}" isTrue="0"></answer-component>
                        <answer-component id="a4" answer="${question.incorrect_answers[2]}" isTrue="0"></answer-component> 
                    </div>
                         
                </div>
                
            </div>
            
        `
        
        this.shadowDom.querySelector('#all-answer').addEventListener('click',(e) => {  
            const id=e.target.id
                setTimeout(()=>{
                if(this.listQuestion.length>=2){  
                    if(this.shadowDom.querySelector('#'+id).getAttribute('isTrue')==1) {
                        this.order=Math.floor(Math.random()*this.listQuestion.length)
                        this.listQuestion.shift()
                        alert('Chính xác')
                        setTimeout(()=>{
                            this.showQuestion()
                            this.point+=10
                            this.shadowDom.getElementById('point').innerHTML=`Point: ${this.point}`
                       },500)
                    }
                    else if(this.shadowDom.querySelector('#'+id).getAttribute('isTrue')==0){
                       
                        setTimeout(()=>{ 
                            alert(`Game over, Your core: ${this.point}`)
                        },500)
                    }
                }
                else{
                    if(this.shadowDom.querySelector('#'+id).getAttribute('isTrue')==1) {
                        setTimeout(()=>{
                            alert(`Victory, Your Point: ${this.point+10}`)
                        },500)
                    }
                    else  alert(`Game over, Your core: ${this.point}`)
                       
                }},500)
               
         })
         
        
    }
}

window.customElements.define('game-play',Gameplay)