const style=`
<style>
    #input{
        margin-top:10px;

    }
</style>
`
export class Input extends HTMLElement{
    constructor(){
        super()
        this.shadow_dom=this.attachShadow({mode:'open'})

    }
    connectedCallback(){
        this.type=this.getAttribute('type')
        this.placeholder=this.getAttribute('placeholder')
        this.error=this.getAttribute('error')||''
        this.shadow_dom.innerHTML=`
        ${style}
            <div>
                <input id="input" type="${this.type}" placeholder="${this.placeholder}"
                <div class="error">${this.error}</div>
            </div>
        `
    }
    static get observedAttributes(){
        return ['error']
    }
    attributeChangedCallback(name,oldName,newName){
        if(name==='error'){
            this.shadow_dom.querySelector(`.error`).innerHTML=newName
        }
    }
    getValue(){
        const value=this.shadow_dom.getElementById('input').value
        return value
    }
    get value(){
        const value=this.shadow_dom.getElementById('input').value
        return value
    }
}
window.customElements.define('input-wrapper',Input)