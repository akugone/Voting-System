import React, { useState, useEffect } from "react";
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import PreHeader from "./components/PreHeader";
import Header from "./components/Header";
import AddVoters from "./components/AddVoters";
import AddProposal from "./components/AddProposal";
import Footer from "./components/Footer";
import VotingSession from "./components/VotingSession";
import NotOwner from "./components/NotOwner";

function App(){
  
  // we declare our constants
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [owner, setOwner] = useState(null);
  const [eventaddNewProposal, setEventaddNewProposal] = useState([]);
  const [eventaddNewVoter, setEventaddNewVoter] = useState([]);
  const [status, setStatus] = useState(0);


  useEffect(() => {
    launchWeb3();
    if(contract){
      getState();
    }
    
  },[]);

  
  async function launchWeb3() {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
  
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VotingContract.networks[networkId];
      const instance = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork && deployedNetwork.address,

      );

      //récuperer le owner
      const getTheOWner = await instance.methods.owner().call();

      setAccounts(accounts);
      setOwner(getTheOWner);
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

        transactionAddNewProposal =await contract.methods.addProposal(proposalToAdd).send({ from: accounts[0] });
        
        let newProposals = transactionAddNewProposal.events.ProposalRegistered.returnValues.proposalId

        let proposal = await contract.methods.getOneProposal(newProposals).call({ from: accounts[0] });

        console.log(proposal);

        setEventaddNewProposal([...eventaddNewProposal, "Proposition n°: " + newProposals + " " +  proposal ]);
        
    } catch (error) {
        console.log(error)
    }
    
    element.value = "";
  }
  
  // ::::::::::::: STATE ::::::::::::: //

  async function getState(){
    const globalStatus = await contract.methods.workflowStatus().call({ from: owner });
    setStatus(globalStatus);
  }


  // async function changeStatusaddvoter(){
  //   await contract.methods.startaddVoterSession().send({ from: owner });
  // }
    

  async function changeStatusStartProposalsRegistering(){
    await contract.methods.startProposalsRegistering().send({ from: owner });
    getState()
  }

  async function changeStatusEndProposalsRegistering(){
    await contract.methods.endProposalsRegistering().send({ from: owner });
    getState()
  }

  async function changeStatusStartVotingSession(){
    await contract.methods.startVotingSession().send({ from: owner });
    getState()
  }

  async function changeStatusEndVotingSession(){
    await contract.methods.endVotingSession().send({ from: owner });
    getState()
  }

  async function changeStatusStartTallied(){
    await contract.methods.tallyVotes().send({ from: owner });
    getState()
  }

 
 // ::::::::::::: FRONT ::::::::::::: //
  
  return (

    <div>
      <PreHeader 
      yourAccount={accounts}
      statusN1={status} 
      
      
      />

      <Header 
      startProposal={changeStatusStartProposalsRegistering}
      endProposal={changeStatusEndProposalsRegistering}
      startVoting={changeStatusStartVotingSession}
      endVoting={changeStatusEndVotingSession}
      startTallied={changeStatusStartTallied}
      />
      
      {(() => {
        if(accounts == owner){
          return <AddVoters 
            addVoter={addNewVoter} 
            voters={eventaddNewVoter} 
          />
        }
        else{
          return <NotOwner /> 
        }
      })()}


      <AddProposal 
      addProposalN1 = {addNewProposal}
      proposalListN1={eventaddNewProposal}
      />

      <VotingSession />

      <Footer />

    </div>
  );

}

 
export default App;


