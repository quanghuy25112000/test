const style=`<style>
    
    
</style>`
export class Answer extends HTMLElement{
    
    constructor(){
        super()
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.answer=this.getAttribute('answer')
        this.isTrue=this.getAttribute('isTrue')
        this.shadowDom.innerHTML=`
        ${style}
            <div class="game-answer">
                <button class="answer">
                    ${this.answer}
                </button>
            </div>
        `
    }
    // static get observedAttributes(){
    //     return ['answer']
    // }
    // attributeChangedCallback(name, oldName, newName){
    //     if(name==='answer'){
    //         this.shadowDom.querySelector('.answer').innerHTML=newName
    //     }
    // }

}
window.customElements.define('answer-component',Answer)