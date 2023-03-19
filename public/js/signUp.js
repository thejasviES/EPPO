

const signup= async (name,email,phone,password,confirmPassword, location)=>
{
    try{
        const res = await axios ({

            method:'POST',
            url:'/webHackers/user/signUp',
            data :{
                name,email,phone,password,confirmPassword,location}
        })

        console.log(res)
    } catch (err){console.log(err)}
}
document.querySelector('.form--signUp').addEventListener('submit',e=>{
    e.preventDefault();
   const email= document.getElementById('email').value;
   const password= document.getElementById('password').value;
   const confirmPassword=document.getElementById('confirmPassword').value;
   const name=document.getElementById('name').value;
   const location=document.getElementById('location').value;
   console.log(location)
   const phone=document.getElementById('phone').value;
signup(name,email,phone,password,confirmPassword,location)
window.alert("signup successfull")});





