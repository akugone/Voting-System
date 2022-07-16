import PreHeader from "./PreHeader";
import TitleHeader from "./TitleHeader";
import Header from "./Header";
import AddVoters from "./AddVoters";
import StatusVoterView from "./voters/StatusVoterView";

export default function OwnerView({accounts, status, owner, contract}) {

    return (

        <>
            <PreHeader 
                accounts={accounts}
                status={status} 
            />

            <TitleHeader />

            <Header owner={owner} contract={contract} />

            <AddVoters owner={owner} contract={contract} />

            <StatusVoterView status={status}/>

        </>




    )





}