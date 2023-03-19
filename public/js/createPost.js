

const consultAnalyst=async (data,type)=>
{
    try{const res=await axios({
        method:'POST',
        url:'/webHackers/user/createPost',
        data
        
    
    })
    console.log(res)
    ;}catch (err){console.log(err)}
    }
    
    document.querySelector('.create--form').addEventListener('submit',e=>{
        e.preventDefault();
       
        const form = new FormData();
		var files = document.getElementById("postPhoto").files;
		for (var i = 0; i < files.length; i++)

        
		{
			form.append('postPhoto', files[i]);
		}
    form.append('to', document.getElementById('to').value);
    form.append('date', document.getElementById('date').value);
    form.append('postPhoto', document.getElementById('postPhoto').files);
    form.append('time', document.getElementById('time').value);
    form.append('toTime', document.getElementById('toTime').value);
    form.append('postDescription', document.getElementById('postDescription').value);
   
    console.log(form);

    consultAnalyst(form, 'data');
    window.alert("Your form submitted successfully")
// console.log(req.file)
});
