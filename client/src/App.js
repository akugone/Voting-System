import React, { useState, useEffect } from "react";
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";
import "./App.css";

function App(){
  
  // we declare our constants
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [owner, setOwner] = useState(null);
  const [eventaddNewVoter, setEventaddNewVoter] = useState([]);
  const [eventaddNewProposal, setEventaddNewProposal] = useState(null);
  const [Globalstatus, setStatus] = useState(null);


  useEffect(() => {
    launchWeb3();
    getStatus();
  },[]);

  async function getStatus(){
    
    if(contract) {
      console.log("bnjour");
      const globalstatus = await contract.methods.workflowStatus.call({ from: owner });
      console.log(globalstatus);
      setStatus(globalstatus);
    }
  }


  async function launchWeb3() {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

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
      //console.log(instance);

      setAccounts(accounts);
      setOwner(accounts[0]);
      setWeb3(web3);
      setContract(instance);
      
    
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }


 // ::::::::::::: REGISTRATION ::::::::::::: //

  
  async function addNewVoter(){
      const element = document.getElementById("addVoter");
      const voterToAdd = element.value;
      let transactionAddNewVoter;
      try {
          transactionAddNewVoter = await contract.methods.addVoter(voterToAdd).send({ from: owner });
          //setEventaddNewVoter(transactionAddNewVoter.events.VoterRegistered.returnValues.voterAddress);
          let newVoters = transactionAddNewVoter.events.VoterRegistered.returnValues.voterAddress
          eventaddNewVoter.push(newVoters);
          
          console.log(eventaddNewVoter);
           
      } catch (error) {
          console.log(error)
      }
    
      // Récupérer l'évenement dans la transaction
      element.value = "";
  }

  // ::::::::::::: PROPOSAL ::::::::::::: // 
  
  async function addNewProposal(){
    const element = document.getElementById("addProposal");
    const proposalToAdd = element.value;
    let transactionAddNewProposal;
    try {
        transactionAddNewProposal =await contract.methods.addProposal(proposalToAdd).send({ from: owner });
        setEventaddNewProposal(transactionAddNewProposal.events.ProposalRegistered.returnValues.proposalAddress);
        
    } catch (error) {
        console.log(error)
    }
    // Récupérer l'évenement dans la transaction
    element.value = "";
  }
  
  // ::::::::::::: STATE ::::::::::::: //

  
  async function changeStatusaddvoter(){
    await contract.methods.startaddVoterSession().send({ from: owner });
  }

  async function changeStatusStartProposalsRegistering(){
    await contract.methods.startProposalsRegistering().send({ from: owner });
  }


 // ::::::::::::: FRONT ::::::::::::: //
  
  return (
    <div>
      <h3 className="">contract address is {accounts}</h3>
      <h3 className="">les inscrits sont</h3>
      <ul>
        {eventaddNewVoter.map((user,index) =>
            <li key={index}>{user}</li>
        )}
      </ul>

      <h3 className="">la premiere proposition est  {eventaddNewProposal}</h3>
      <h3 className="">le status actuelle est {Globalstatus}</h3>

      <br/><br/>
      <input id="addVoter" type="text" placeholder="add your Voter"/>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addNewVoter}>Set the new voter</button>

      <br/><br/>
      <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4" type="button" onClick={changeStatusaddvoter}>allow add voter</button>

      <br/><br/>
      <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4" type="button" onClick={changeStatusStartProposalsRegistering}>allow proposal registering</button>


      <br/><br/>
      <input id="addProposal" type="text" placeholder="add your Proposal"/>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addNewProposal}>Set a new proposal</button>

      <br/><br/>

     


    </div>
  );

}

 
export default App;


