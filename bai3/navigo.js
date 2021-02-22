var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);
import {getItemLocalStorage} from './ultis.js'
router
  .on({
    'login': function () {
      redirect('login')
    },
    'register': function () {
      redirect('register')
    },
    'post':async function () {
      const check=await checkAuthen()
      if(check){
        redirect('post')
      }
      else router.navigate('login')
      },
    
    '*': function () {
     router.navigate('login')
    }
  })
  .resolve();
  function redirect(screenName){
    if(screenName == 'register'){
        document.getElementById('main-screen').innerHTML = `
            <register-screen></register-screen>
        `
    }else if(screenName == 'login'){
        document.getElementById('main-screen').innerHTML = `
        <login-screen></login-screen>
        `
    }else if(screenName == 'post'){
        document.getElementById('main-screen').innerHTML=`
            <post-screen></post-screen>
        `
    }
    
}

async function checkAuthen(){
    const user = getItemLocalStorage('currentUser');
    if(user){
        const res = await firebase.firestore().collection('users').where('gmail','==',user.gmail).where('password','==',user.password).get();
            if(res.empty ) {
                return false
            } else {
                return true
            }
    }
    else {
         return false
    }
}
window.router=router