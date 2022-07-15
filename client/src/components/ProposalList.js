

export default function ProposalList({proposalListN2}) {
  return (
    <div>
      <ul  className="mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {proposalListN2.map((user,index) => (
        <div key={index} className='flex mt-4'>
            <li  className="text-white">
                {user}    
            </li>
        </div> 
        ))}   
      </ul>
    </div>
  )
}


