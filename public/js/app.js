
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


// fetch('http://localhost:3000/weather?address=!').then((response)=>{
//     response.json().then((data)=>{
//         if (data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.location , data.forecast)
//         }

//     })


    const weatherForm=document.querySelector('form')
    const input=document.querySelector('input')
    const msgOne=document.getElementById('msg-1')
    const msgTwo=document.getElementById('#msg-2')
    
    weatherForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const location=input.value
        msgOne.textContent='Loading....'
        msgTwo.textContent=''

     fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
       
            if (data.error){
          msgOne.textContent= data.error
          msgTwo.textContent=''
        }
        else{
            msgOne.textContent=data.location , 
            msgTwo.textContent=data.forecast
        }

    })
        
    })


})