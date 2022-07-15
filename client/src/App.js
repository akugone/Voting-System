import React, { useState, useEffect } from "react";
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import PreHeader from "./components/PreHeader";
import Header from "./components/Header";
import AddVoters from "./components/AddVoters";
import AddProposal from "./components/AddProposal";
import Footer from "./components/Footer";

function App(){
  
  // we declare our constants
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [owner, setOwner] = useState(null);
  const [eventaddNewProposal, setEventaddNewProposal] = useState([]);
  const [eventaddNewVoter, setEventaddNewVoter] = useState([]);
  const [status, setStatus] = useState(null);


  useEffect(() => {
    launchWeb3();
  },[]);

 
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

      //getState();

      
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
          
          setEventaddNewVoter([...eventaddNewVoter, newVoters]);
          
           
      } catch (error) {
          console.log(error)
      }
    
  
      element.value = "";
  }

  // ::::::::::::: PROPOSAL ::::::::::::: // 
  
  async function addNewProposal(){
    const element = document.getElementById("addProposal");
    const proposalToAdd = element.value;
    let transactionAddNewProposal;
    try {
        transactionAddNewProposal =await contract.methods.addProposal(proposalToAdd).send({ from: owner });
        //setEventaddNewProposal(transactionAddNewProposal.events.ProposalRegistered.returnValues.proposalAddress);
        let newProposals = transactionAddNewProposal.events.ProposalRegistered.returnValues.proposalAddress

        setEventaddNewProposal([...eventaddNewProposal, newProposals]);
        
    } catch (error) {
        console.log(error)
    }
    
    element.value = "";
  }
  
  // ::::::::::::: STATE ::::::::::::: //

  // async function changeStatusaddvoter(){
  //   await contract.methods.startaddVoterSession().send({ from: owner });
  // }

  async function changeStatusStartProposalsRegistering(){
    await contract.methods.startProposalsRegistering().send({ from: owner });
  }

  async function changeStatusEndProposalsRegistering(){
    await contract.methods.endProposalsRegistering().send({ from: owner });
  }

  async function changeStatusStartVotingSession(){
    await contract.methods.startVotingSession().send({ from: owner });
  }

  async function changeStatusEndVotingSession(){
    await contract.methods.endVotingSession().send({ from: owner });
  }

  async function changeStatusStartTallied(){
    await contract.methods.tallyVotes().send({ from: owner });
  }

  // async function getState(){
  //   console.log("bonjour");
  //   const globalStatus = await contract.methods.workflowStatus.call();
  //   console.log(globalStatus);
  //   setStatus(globalStatus);
  // }
    
  


 // ::::::::::::: FRONT ::::::::::::: //
  
  return (

    
    <div>
      <PreHeader yourAccount={accounts}/>

      <Header 
      startProposal={changeStatusStartProposalsRegistering}
      endProposal={changeStatusEndProposalsRegistering}
      startVoting={changeStatusStartVotingSession}
      endVoting={changeStatusEndVotingSession}
      startTallied={changeStatusStartTallied}
      />
      
      <AddVoters addVoter={addNewVoter} />

      <AddProposal addVoterProposal={addNewProposal} />

     
      <ul>
        {eventaddNewVoter.map((user,index) =>
            <li key={index}>{user}</li>
        )}
      </ul>

      <Footer />

    </div>
  );

}

 
export default App;


