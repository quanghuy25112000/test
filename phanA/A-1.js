let a1=[1,2,"a"]
let a2=[1,3,"b"]
let k=0;
let a3=[]
for(let i=0;i<a1.length;i++){
    let ok=false;
    for(j=0;j<a2.length;j++){
        if(a1[i]===a2[j]) ok=true
    }
    if(!ok) a3.push(a1[i])
}
for(let i=0;i<a2.length;i++){
    let ok=false;
    for(j=0;j<a1.length;j++){
        if(a2[i]===a1[j]) ok=true
    }
    if(!ok) a3.push(a2[i])
}
console.log(a3);