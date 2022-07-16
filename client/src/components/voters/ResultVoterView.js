import { useEffect, useState } from "react";
import Proposal from "../Proposal";

export default function ResultVoterView({owner, contract, accounts}) {


   const[proposalId, setProposalId] = useState(null);

    useEffect(() => {

      if( ! contract || ! owner ){
        return;
      }
  
        async function talliedVote(){
      
          try {
    
              // let winningId = await contract.methods.winningProposalID;
              console.log();
              const proposalTalliedId = await contract.methods.winningProposalID().call({ from: owner });

              setProposalId(proposalTalliedId);

          } catch (error) {
              console.log(error)
          }
          
        }
  
      talliedVote();
  
    }, [contract, owner]);

    
  

    return (
      
        <div className="flex justify-center">
          <div className="text-center rounded-md bg-green-50 p-4 mt-10 w-1/3"> 
              <h3 className="text-sm font-medium text-green-800">AND THE WINNNER IS</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>The proposal : <Proposal proposalId={proposalId} contract={contract} accounts={accounts}/></p>
              </div>
          </div>
        </div>
      )  
}
