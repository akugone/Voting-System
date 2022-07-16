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
import TitleHeader from "./components/TitleHeader";

function App(){
  
  // we declare our constants
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [owner, setOwner] = useState(null);
  const [eventaddNewProposal, setEventaddNewProposal] = useState([]);
  const [eventaddNewVoter, setEventaddNewVoter] = useState([]);
  const [eventaddVote, seteventaddVote] = useState([]);
  const [status, setStatus] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);


  useEffect(() => {
    launchWeb3();
    if(contract){
      //getState();
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

  if(contract){
    contract.events.VoterRegistered({ fromBlock: "latest" }) 
    .on('data', event => {
        if (event.returnValues.voterAddress == accounts[0]) {
            setIsRegistered(true)
        }
    })

  }
  
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


 // ::::::::::::: SESSION VOTE ::::::::::::: // 

  async function addVoting(){
    const element = document.getElementById("addSession");
    console.log(element.value);
    const voteToAdd = element.value;
    console.log(voteToAdd);
    let transactionAddNewVote;
    try {

        transactionAddNewVote =await contract.methods.setVote(voteToAdd).send({ from: accounts[0] });
        console.log(transactionAddNewVote);
        
        let newVote = transactionAddNewVote.events.Voted.returnValues.proposalId
        console.log(newVote);

        seteventaddVote([...eventaddVote, newVote]);
        
    } catch (error) {
        console.log(error)
    }
    
    element.value = "";
  }

  // ::::::::::::: TALLIED VOTE ::::::::::::: // 

  async function talliedVote(){
    
    try {

        // let winningId = await contract.methods.winningProposalID;
        console.log();
        const tallied = await contract.methods.tallyVotes().call({ from: owner});
        console.log(tallied);
        
    } catch (error) {
        console.log(error)
    }
    
  }
  
  
  // ::::::::::::: STATE ::::::::::::: //

    if(contract){
      contract.events.WorkflowStatusChange({ fromBlock: "latest" }) 
        .on('data', event => setStatus(event.returnValues.newStatus))
    }
  

    // async function getState(){
    //   const globalStatus = await contract.methods.workflowStatus().call({ from: owner });
    //   setStatus(globalStatus);
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

 
 // ::::::::::::: FRONT ::::::::::::: //
  
  return (

    <div>
      <PreHeader 
      yourAccount={accounts}
      statusN1={status} 
      />

      <TitleHeader />
      

      {(() => {
        if(accounts == owner){
          return <div>
            <Header 
          startProposal={changeStatusStartProposalsRegistering}
          endProposal={changeStatusEndProposalsRegistering}
          startVoting={changeStatusStartVotingSession}
          endVoting={changeStatusEndVotingSession}
          startTallied={changeStatusStartTallied}
          talliedVoteN1={talliedVote}
          />
          <AddVoters 
            addVoter={addNewVoter} 
            voters={eventaddNewVoter} 
          />
          </div>
        }
        else if(!isRegistered){
          return <NotOwner /> 
        }
      })()}


      {
        (isRegistered || accounts == owner && status == 2) && (
          <AddProposal 
          addProposalN1 = {addNewProposal}
          proposalListN1={eventaddNewProposal}
          />
        )
      }

      {
        (accounts == owner || status == 3) && (
          <VotingSession 
         addVoteN1 = {addVoting}
          />
        )
      }
      


      

      <Footer />

    </div>
  );

}

 
export default App;


