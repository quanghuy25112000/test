const style=`<style>
   
</style>`
export class Question extends HTMLElement{
    
    constructor(){
        super()
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.question=this.getAttribute('question')
        this.shadowDom.innerHTML=`
       ${style}
            <div class="game-question">
                <div class="question">
                    ${this.question}
                </div>
            </div>
        `
    }
    // static get observedAttributes(){
    //     return ['question']
    // }
    // attributeChangedCallback(name, oldName, newName){
    //     if(name==='question'){
    //         this.shadowDom.querySelector('.question').innerHTML=newName
    //     }
    // }

}
window.customElements.define('question-component',Question)