const style=`<style>
    #main{
        border:1px solid black;
        margin-bottom:10px;
        margin-left:200px;
        margin-right:200px;
        padding:10px;
        border-radius:10px;
    }
</style>`
export class PostItem extends HTMLElement{
    constructor(){
        super()
        this.shadow_dom=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.name=this.getAttribute('name')
        this.name_m=this.getAttribute('name_m')
        this.material=this.getAttribute('material')
        this.content=this.getAttribute('content')
        this.shadow_dom.innerHTML=`
        ${style}
            <div id="main">
                <h1>${this.name}</h1>
                <div>
                    <div>Tên món: ${this.name_m}</div>
                    <div>Nguyên liệu: ${this.material}</div>
                    <div>Cách thực hiện: ${this.content}</div> 
                </div>
            </div>
        `
    }
}
window.customElements.define('post-item',PostItem)