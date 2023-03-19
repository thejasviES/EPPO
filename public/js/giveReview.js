

const giveReview= async (post,review,rating,from,to)=>
{
    try{
        const res = await axios ({

            method:'POST',
            url:'/webHackers/user/giveReview',
            data :{
                post,review,rating,from,to}
        })

        console.log(res)
    } catch (err){console.log(err)}
}
document.querySelector('.form--review').addEventListener('submit',e=>{
    e.preventDefault();
   const post= document.getElementById('post').value;
   const review= document.getElementById('rev').value;
   const nrating=document.getElementById('rating').value;
   const rating= parseFloat(nrating)
   const from=document.getElementById('fromId').value;
   const to=document.getElementById('toId').value;
   console.log(review)
   giveReview(post,review,rating,from,to);
window.alert("review successfull successfull")
});







