

const update= async (pId)=>
{
    try{
        const res = await axios ({

            method:'PATCH',
            url:'/webHackers/user/acceptPost',
            data :{
                pId}
        })

         console.log(res)
    } catch (err){console.log(err)}
}
document.querySelector('.acceptPost--form').addEventListener('submit',e=>{
    e.preventDefault();
   const pId= document.getElementById('pId').value;
   console.log(pId);
update(pId);
window.alert("acception successfull")
});






