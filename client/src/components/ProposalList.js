
const eventaddNewVoters = ["Premiere proposition", "deuxieme proposition", "troisieme proposition"];


export default function VotersList() {
  return (
    <div>
      <ul role="list" className="mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {eventaddNewVoters.map((user,index) => (
        <div className='flex mt-4'>
            <li key={index} className="text-white">
                {user}    
            </li>
        </div> 
        ))}   
      </ul>
    </div>
  )
}


