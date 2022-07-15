/* This example requires Tailwind CSS v2.0+ */
import {XIcon } from '@heroicons/react/outline'

const eventaddNewVoters = ["0x5530281c57A5519214495dBf9Fb5aD980a724849", "0x5530281c57A5519214495dBf9Fb5aD980a724849", "0x5530281c57A5519214495dBf9Fb5aD980a724849", "0x5530281c57A5519214495dBf9Fb5aD980a724849"];

export default function VotersList() {
  return (
    <div>
      <ul role="list" className="mt-3  sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {eventaddNewVoters.map((user,index) => (
        <div className='flex mt-4'>
            <li key={index} className="text-white">
                {user}    
            </li>
            <button
                type="button"
                className="flex rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white ml-5 "
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-6 w-6 text-blue" aria-hidden="true" />
              </button>
        </div> 
        ))}   
      </ul>
    </div>
  )
}


