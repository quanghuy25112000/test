let a=[
    {
        name:"arcenal",
        points:99,
        gd:45
    },
    {
        name:"chelsea",
        points:75,
        gd:39
    },
    {
        name:"mu",
        points:75,
        gd:29
    }
]

a.sort(function(a,b){
    if(a.points===b.points) return b.gd-a.gd
    return b.points-a.points
})
for(let i=0;i<a.length;i++){
    a[i].position=a.length-i;
}
console.log(a);