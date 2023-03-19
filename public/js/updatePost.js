

const update= async (pId, profDesc)=>
{
    try{
        const res = await axios ({

            method:'PATCH',
            url:'/webHackers/user/updatePost',
            data :{
                pId, profDesc}
        })

         console.log(res)
    } catch (err){console.log(err)}
}
document.querySelector('.updatePost--form').addEventListener('submit',e=>{
    e.preventDefault();
   const pId= document.getElementById('pId').value;
   const profDesc= document.getElementById('profDesc').value;
   console.log(pId,profDesc);
update(pId,profDesc);
window.alert("update successfull")
});






