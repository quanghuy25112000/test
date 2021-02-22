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
export class Register extends HTMLElement{
    constructor(){
        super()
        this.shadow_dom=this.attachShadow({mode:'open'})

    }
    connectedCallback(){
        this.shadow_dom.innerHTML=`
        ${style}
            
            <div class="home">
                
                
                <div id="main">
                <h1>Register</h1>
                    <form id="Register-form">
                        <div class ="login-container">
                        <input-wrapper id="name" type="text" placeholder="User name"></input-wrapper>
                            <input-wrapper id="gmail" type="text" placeholder="User gmail"></input-wrapper>
                            <input-wrapper id="password" type="password" placeholder="password"></input-wrapper>
                            </div>
                            <button id="register">Register</button>
                            <br>
                            <div id="next"><a>Already have an account, Login?</a></div>
                        </div>
                    <form>
                </div>
            </div>
            
        `
        this.shadow_dom.getElementById('register').addEventListener('click',async ()=>{
            let ok=true;
            const gmail=this.shadow_dom.getElementById('gmail').value
            const name=this.shadow_dom.getElementById('name').value
            const password=this.shadow_dom.getElementById('password').value
            if(gmail.trim()==''){
                ok=false;
                alert('blank')
            }
            if(name.trim()==''){
                ok=false;
                alert('blank')
            }
            if(password.trim()==''){
                ok=false;
                alert('blank')
            }
            const user={
                name: name,
                gmail:gmail,
                password:password
            }
            if(ok){
                const check=await this.checkGmail(gmail)
                if(check){
                    alert('Gmail already avilable')
                }
                else{
                    firebase.firestore().collection('users').add(user)
                    alert('Register Success')
                    router.navigate('login')
                }
            }
            
        })
        this.shadow_dom.getElementById('next').addEventListener('click',()=>{
            router.navigate('login')
        })
    }
    
    async checkGmail(gmail){
        const res=await firebase.firestore().collection('users').where('gmail','==',gmail).get()
        return !res.empty
    }
}
window.customElements.define('register-screen',Register)