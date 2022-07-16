import { useEffect, useState } from "react";
import { getOwner } from "../services/web3Service";
import useWeb3 from "./useWeb3";

export default function useOwner(){
    const [owner, setOwner] = useState(null)
    const { web3 } = useWeb3();

    useEffect(() => {

        if( ! web3 ){
            return;
        }

        async function getOwnerData(){
            const ownerData = await getOwner(web3);
            setOwner(ownerData);
        }
        
        getOwnerData()
    }, [web3]);

    return {
        owner
    };
}