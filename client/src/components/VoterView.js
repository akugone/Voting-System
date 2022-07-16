import PreHeader from "./PreHeader";
import TitleHeader from "./TitleHeader";
import StatusVoterView from "./voters/StatusVoterView";


export default function VoterView({accounts,status, contract,owner}) {

    return (
    <>
        <PreHeader 
            accounts={accounts}
            status={status} 
        />

        <TitleHeader />


        <StatusVoterView status={status} accounts={accounts} contract={contract} owner={owner}/>


    </>
        
    )

    

}