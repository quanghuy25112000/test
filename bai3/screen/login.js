const style=`<style>
    .home{
        
        width: 100vw;
        height: 100vh;
        background: url('https://f20-zpc.zdn.vn/1405777170906197418/e7a3d86d16d5e78bbec4.jpg');
    }
    #main{
        margin-top:5vh;
        border: 2px solid black outset;
        height:66vh;
        width:25vw;
        margin:auto;
        padding:40px;
        border-radius:30px;
        background-color:#70734E;
        margin-top: 2vh;
        text-align:center;
    }
    
</style>`
import {getDatas,saveToLocalStorage} from '../ultis.js'
export class Login extends HTMLElement{
    constructor(){
        super()
        this.shadow_dom=this.attachShadow({mode:'open'})

    }
    async connectedCallback(){
        this.shadow_dom.innerHTML=`
        ${style}
            
            <div class="home">
                
                
                <div id="main">
                <h1>Login</h1>
                    <form id="login-form">
                        <div class ="login-container">
                            <input-wrapper id="gmail" type="text" placeholder="User gmail"></input-wrapper>
                            <input-wrapper id="password" type="password" placeholder="password"></input-wrapper>
                        </div>
                        <button id="login">Login</button>
                        <br>
                        <div id="next">Register?</div>
                    <form>
                </div>
            </div>
            </div>
            
        `
        // const gmail=this.shadow_dom.getElementById("gmail").value
        // const password=this.shadow_dom.getElementById('password').value
        // const check=await this.checkGmail(gmail,password)
        this.shadow_dom.getElementById('login').addEventListener('click',async ()=>{
            const gmail=this.shadow_dom.getElementById("gmail").value
            const password=this.shadow_dom.getElementById('password').value
            const check=await this.checkGmail(gmail,password)
            const user=await firebase.firestore().collection('users').where('gmail','==',gmail).where('password','==',password).get()
            if(check){
                
                saveToLocalStorage('currentUser',getDatas(user)[0])
                router.navigate('post')
            }
            else alert('Gmail or password is not true')
        })
        this.shadow_dom.getElementById('next').addEventListener('click',()=>{
            router.navigate('register')
        })
    }
    async checkGmail(gmail,password){
        const res=await firebase.firestore().collection('users').where('gmail','==',gmail).where('password','==',password).get()
        return !res.empty
    }
}
window.customElements.define('login-screen',Login)