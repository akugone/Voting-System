import { useEffect, useState } from "react"


export default function Proposal({proposalId, contract, accounts}) {
  const [proposal, setProposal] = useState(null);

  useEffect(() => {

    if( ! proposalId || ! contract || ! accounts ){
      return;
    }

    async function getProposalData(){
      let proposalData = await contract.methods.getOneProposal(proposalId).call({ from: accounts[0] });
      setProposal(proposalData)
    } 
    getProposalData();


    contract.events.Voted({ fromBlock: "latest" }) 
      .on('data', async event => {

        console.log(event)
        
        let proposalData = await contract.methods.getOneProposal(event.returnValues.proposalId).call({ from: accounts[0] });
        setProposal(proposalData)
      })

  }, [proposalId, contract, accounts]);
  



  if( ! proposal ){
    return null;
  }

  console.log(proposal);

  return (
      <div className='flex mt-4'>
          <li  className="text-black-900 font-semibold">
            {`Proposition n°: ${ proposalId } | ${ proposal.description } | ${proposal.voteCount} votes`}
          </li>
      </div>
  )
}


