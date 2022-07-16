import React, { useState, useEffect } from "react";
import "./App.css";
import NotOwner from "./components/NotOwner";
import OwnerView from "./components/OwnerView";
import VoterView from "./components/VoterView";
import useAccounts from "./hooks/useAccounts";
import useContract from "./hooks/useContract";
import useOwner from "./hooks/useOwner";


function App(){
  
  // we declare our constants
 
  const [status, setStatus] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);

  const {accounts} = useAccounts();
  const {contract} = useContract();
  const {owner} = useOwner();

  console.log(contract)

  useEffect(() => {

    if( ! contract || ! accounts ){
      return;
    }

    contract.events.VoterRegistered({ fromBlock: "latest" }) 
      .on('data', event => {
          if (event.returnValues.voterAddress == accounts[0]) {
              setIsRegistered(true)
          }
      })

    async function getRegistered(){
        try{
          const isRegisteredData = await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
          setIsRegistered(isRegisteredData)
        } catch(error){
          console.log(error)
        }
      
    }

    getRegistered()

  }, [contract, accounts]);


  useEffect(() => {
    

    if( ! contract){
      return;
    }

    contract.events.WorkflowStatusChange({ fromBlock: "latest" }) 
    .on('data', event => setStatus(event.returnValues.newStatus))

    async function getState(){
      const globalStatus = await contract.methods.workflowStatus().call({ from: owner });
      setStatus(globalStatus);
    }
    getState();

  }, [contract])


 // ::::::::::::: FRONT ::::::::::::: //
  
  return (
    <>

      {
        (accounts.includes(owner)) && (
          <OwnerView
            owner={owner}
            contract={contract}
            accounts = {accounts}
            status = {status} 
          />
        )
      }

      {
        (isRegistered && ! accounts.includes(owner)) && (
          <VoterView
            owner={owner}
            contract={contract}
            accounts = {accounts}
            status = {status} 
          />
          
        )
      }

      {
        (!isRegistered && ! accounts.includes(owner)) && (
            <NotOwner
              accounts = {accounts}
              status = {status} 
            /> 
        )
      }
    </>

  );

}

 
export default App;


