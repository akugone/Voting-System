import { useEffect, useState } from "react";
import getWeb3 from "../services/getWeb3";

export default function useWeb3(){
    const [web3, setWeb3] = useState(null)

    useEffect(() => {

        async function getWeb3Data(){
            try{
                const web3Data = await getWeb3();
                setWeb3(web3Data);
            } catch (error) {
                console.error(error);
            }
        }
        
        getWeb3Data()
    }, []);

    return {
        web3
    };
}