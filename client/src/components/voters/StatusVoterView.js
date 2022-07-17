import AddProposal from "./AddProposal";
import EndProposal from "./EndProposal";
import VotingSession from "./VotingSession";
import EndVotingSession from "./EndVotingSession";
import ResultVoterView from "./ResultVoterView";

export default function StatusVoterView({status, accounts, contract, owner}) {

    return (
    <>

{
        // 0 = add voter
        (status == 0) && (
            <AddProposal accounts={accounts} contract={contract}/>
        )
    }

    {
        // 1 = add proposal
        (status == 1) && (
            <AddProposal accounts={accounts} contract={contract}/>
        )
    }

    {
        // 2 = end proposal
        (status == 2) && (
            <EndProposal />
        )
    }

    {
        // 3 = Start voting
        (status == 3) && (
            <VotingSession accounts={accounts} contract={contract} />
        )
    }

    {
        // 4 = end Voting
        (status == 4) && (
            <EndVotingSession />
        )
    }

    {
        // 5 = Tally vote
        (status == 5) && (
            <ResultVoterView contract={contract} owner={owner} accounts={accounts} />
        )
    }


  

    </>
        
    )
    

    

}