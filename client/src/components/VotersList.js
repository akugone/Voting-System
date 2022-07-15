/* This example requires Tailwind CSS v2.0+ */
import {XIcon } from '@heroicons/react/outline';

export default function VotersList({votersList}) {
  return (
    <div>
      <ul  className="mt-3  sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {votersList.map((user,index) => (
        <div key={index} className='flex mt-4'>
            <li className="text-white">
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


