export default function Header({owner, contract}) {


  async function changeStatusStartProposalsRegistering(){
    await contract.methods.startProposalsRegistering().send({ from: owner });

  }

  async function changeStatusEndProposalsRegistering(){
    await contract.methods.endProposalsRegistering().send({ from: owner });
  
  }

  async function changeStatusStartVotingSession(){
    await contract.methods.startVotingSession().send({ from: owner });
   
  }

  async function changeStatusEndVotingSession(){
    await contract.methods.endVotingSession().send({ from: owner });

  }

  async function changeStatusStartTallied(){
    await contract.methods.tallyVotes().send({ from: owner });

  }

  
  
  return (
    <div className="relative bg-gray-50 overflow-hidden">
      <div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full" aria-hidden="true">
        <div className="relative h-full max-w-7xl mx-auto">
          <svg
            className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={784} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
          </svg>
          <svg
            className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={784} fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" />
          </svg>
        </div>
      </div>

      <div className="relative pt-6 pb-16 sm:pb-10">
        <main className="mt-7 mx-auto max-w-7xl px-4 ">
          <div className="text-center">
            
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <button
                 
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Add Voter
                </button>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <button
                  onClick={changeStatusStartProposalsRegistering}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Add Proposal
                </button>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <button
                  onClick={changeStatusEndProposalsRegistering}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  End Proposal
                </button>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <button
                  onClick={changeStatusStartVotingSession}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Start Voting
                </button>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <button
                  onClick={changeStatusEndVotingSession}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  End Voting
                </button>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <button
                  onClick={changeStatusStartTallied}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Tallied Vote
                </button>
              </div>
            </div>  
          </div>
        </main>
      </div>
    </div>
  )
}
