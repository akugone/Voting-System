import Proposal from './Proposal';

export default function ProposalList({proposalsIds, contract, accounts}) {
  return (
    <>
      <ul  className="mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {proposalsIds.map((id) => (
          <Proposal key={id} proposalId={id} contract={contract} accounts={accounts} />
        ))}   
      </ul>
    </>
  )
}


