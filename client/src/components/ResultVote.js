export default function ResultVote({talliedVoteN2,statusN2 }) {

    return (
        <div className="flex justify-center">
          <div className="text-center rounded-md bg-green-50 p-4 mt-10 w-1/3"> 
              <h3 className="text-sm font-medium text-green-800">AND THE WINNNER IS</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>The proposal : -------</p>
              </div>
              <div className="pt-5 rounded-md shadow sm:mt-0 sm:ml-3">
                    <button
                      onClick={talliedVoteN2}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      GetThe Tally vote winnner
                    </button>
                  </div>
          </div>
        </div>
      )  
}
