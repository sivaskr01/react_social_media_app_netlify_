import axios from "axios";
import  { useEffect, useState } from "react";

const useAxiosFetch=(dataURL) =>{
    const[data,setData]=useState([])
    const[fetchError,setFetchError]=useState(null)
    const[isLoading, setIsloading] = useState(false);
    
    useEffect(()=>{
        let isMounted=true;
        const source=axios.CancelToken.source();

        const fetchData=async (url)=>{
         setIsloading(true)
         try{
           const response=await axios.get(url,{cancelToken:source.token});
           if(isMounted){
            setData(response.data)
            setFetchError(null);
           }
         }catch(err){
          if(isMounted){
            setFetchError(err.message);
            setData([])
          }
         }
         finally{
            isMounted && setTimeout(() => setIsloading(false),2000);
         }
        }
        fetchData(dataURL)

        const cleanUp=() =>{
            isMounted=false;
            source.cancel();
        }
        return cleanUp;
     },[dataURL]);
     
   return { data, isLoading,fetchError};
    }
export default useAxiosFetch;