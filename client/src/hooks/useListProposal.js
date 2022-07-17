import { useEffect, useState } from "react";



export default function useListProposal(contract, accounts) {
    const [eventaddNewProposal, setEventaddNewProposal] = useState([]);
   

    useEffect(() => {

        if( ! contract || ! accounts ){
          return
        }
        
        async function getProposal(){
            try{
    
              const existingProposals = await contract.getPastEvents('ProposalRegistered', { fromBlock: 0, toBlock: 'latest' });
    
               let proposalrArray = existingProposals.map( (proposal) => proposal.returnValues.proposalId)
    
              if( proposalrArray?.length > 0 ){
                setEventaddNewProposal(proposalrArray);
              }
           
            } catch(error){
              console.log(error)
            }
          
        }
      
        getProposal()
      }, [accounts, contract]);

    return {
        eventaddNewProposal,
        setEventaddNewProposal
    };
}