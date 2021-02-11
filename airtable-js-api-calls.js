
let  apiCall = function(baseId, tableId, params = {}, method = "GET"){

    ////////console.log('asdqasda')


    let url = new URL(`https://api.airtable.com/v0/${baseId}/${tableId}`)


     let request = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer APIKEY',
           // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH'
        }
        }

    
       if(typeof params == "string"){

           this.url = url+"/"+params

        }else if(typeof params == "object"){


            switch (method){
                case "GET":

                    let urlFields = []
                    if(params.fields){
                        urlFields = [...params.fields]
                    }

                    delete params.fields

                    url.search = new URLSearchParams({

                        ...params
                        
                    })



                    

                    //convert fields to 
                    let fetchUrl = url.href

                    ////////console.log(urlFields)

                    urlFields.forEach(field =>{
                    field =  field.replace(" ", "+")
                        fetchUrl += "&fields%5B%5D=" + field

                    
                    })

                    this.url = fetchUrl


                break;
                default:

                //default url
                this.url =  url.href

                console.log(this, this.url)


                request["body"] = JSON.stringify(params)

            
                //data as params


                break;
            }

            

        }else{

            return "failed"

        }
    



    


 console.log(request, this.url)

    
    
    this.data = async function(){
        let response = await fetch(this.url, request )

    let data = await response.json()
    return data
    }

    return this

}



    const apiGet = async function (base, table, params = {} ){

        let call = new apiCall(base, table, params , "GET")

         let data = await call.data()

         return data

    }
    const apiUpdate = async function (base, table, params = {} ){

        let call = new apiCall(base, table, params , "PATCH")

         let data = await call.data()

         return data

    }

    const apiCreate = async function (base, table, params = {} ){

        let call = new apiCall(base, table, params , "POST")

            let data = await call.data()

            return data

    }

    const apiDelete = async function (base, table, params = {} ){

     


        let call = new apiCall(base, table, params , "DELETE")

            let data = await call.data()

            return data

    }
