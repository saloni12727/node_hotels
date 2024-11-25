const fact = (num) =>{
    return new Promise((res,rej)=>{
        if(typeof num === 'number')
        {
            let f=1;
             for(let i=1;i<=num;i++){
                f=f*i;
             } 
             res(f)
        }
        else{
            rej("the number is provided must be integier");
        }
        
    })
}

(
    async()=>{
        try{
            const result =await fact(5);
            console.log("factorial is "+result);
        }catch(err)
        {
         console.log("error :" ,err);
        }
    }
)();