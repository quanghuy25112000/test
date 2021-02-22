const style=`<style>
    #logo{
        padding:10px;
        background-color:orange;
        height:100px;
    }
</style>`

import {getDatas,getItemLocalStorage} from '../ultis.js'
export class ListPost extends HTMLElement{
    list
    constructor(){
        super()
        this.shadow_dom=this.attachShadow({mode:'open'})
        this.list=[]
    }
    async connectedCallback(){
        this.shadow_dom.innerHTML=`
            ${style}
            <div>
                <h1 id="logo">Cook</h1>

            </div>
            <div>
                <div>
                    <input-wrapper id="name_m" type="text" placeholder="Tên món ăn"></inputwrapper>
                    </div>
                    <div><input-wrapper id="material" type="text" placeholder="Nguyên liệu"></input-wrapper></div>
                    <div><input-wrapper id="content" type="text" placeholder="Cách thực hiện"></input-wrapper></div>
                <button id="post">Đăng</button>
            </div>
            <div id="list-post"></div>
            

            `
        this.list=await this.get()
        console.log(this.list);
        for(let i=0;i<this.list.length;i++){
            this.shadow_dom.getElementById('list-post').innerHTML+=`<post-item name="${getItemLocalStorage('currentUser').name}" name_m="${this.list[i].name_m}" material="${this.list[i].material}" content="${this.list[i].content}"></post-item>`
        }
        this.shadow_dom.getElementById('post').addEventListener('click',()=>{
            const name_m=this.shadow_dom.getElementById('name_m').value
            const material=this.shadow_dom.getElementById('material').value
            const content=this.shadow_dom.getElementById('content').value
            if(name_m.trim()==='' || material.trim()==='' || content.trim()===''){
                alert('Must not be blank')
            }
            else{
                const newCook={
                    name_m:name_m,
                    material:material,
                    content:content
                }
                firebase.firestore().collection('cook').add(newCook)
                alert('Post successfully')
            }
        })
    }
    async get(){
        const res=await firebase.firestore().collection('cook').get()
        const m=getDatas(res)
        return m
    }
}
window.customElements.define('post-screen',ListPost)