import React, { useState, useEffect } from "react";
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";
import "./App.css";

function App(){
  
  const [storageValue, setStorageValue] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);


useEffect(() => {
  
  async function setUpWeb3() {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      //console.log(web3);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      //console.log(accounts);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VotingContract.networks[networkId];
      const instance = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }
  setUpWeb3();
});

async function handleAddVoter(a){
    await contract.methods.addVoter().send({ from: accounts});
  }

  
  return (
    <div>
      <h3 className="text-red-900">contract address is {accounts}</h3>
      <input onChange={e => handleAddVoter(e.target.value)} placeholder = "add your Voter"></input>
      <button onClick={addVoter}>Set the new voter</button>
    </div>

  
  );

}

 
export default App;


