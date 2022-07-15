import VotersList from "./VotersList"

export default function AddVoters({addVoter,voters}) {
    return (
      <div className="bg-white">
        <div className="">
          <div className="px-6 py-6 bg-indigo-700  md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
            <div className="xl:w-0 xl:flex-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Voter's list
              </h2>

              <VotersList votersList = {voters}/>
              
            </div>
            <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
              <div className="sm:flex">
                <input
                  id="addVoter"
                  name="voters"
                  type="text"
                  required
                  className="w-full border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white rounded-md"
                  placeholder="Please add a voter address"
                />
                <button
                  type="submit"
                  onClick={addVoter}
                  className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent shadow text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                >
                  Add voter
                </button>
              </div>
              <p className="mt-3 max-w-3xl text-lg leading-6 text-indigo-200">
                You can't add the same address twice
              </p>
              <p className="mt-3 max-w-3xl text-lg leading-6 text-indigo-200">
                This section is only admin use.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  