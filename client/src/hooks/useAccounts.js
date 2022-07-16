import { useEffect, useState } from "react";
import { getAccounts } from "../services/web3Service";
import useWeb3 from "./useWeb3";

export default function useAccounts(){
    const [accounts, setAccounts] = useState([])
    const { web3 } = useWeb3();

    useEffect(() => {

        if( ! web3 ){
            return;
        }

        async function getAccountsData(){
            const accountsData = await getAccounts(web3);
            setAccounts(accountsData);
        }
        
        getAccountsData()
    }, [web3]);


    return {
        accounts
    };
}