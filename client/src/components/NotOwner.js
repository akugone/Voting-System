import { XCircleIcon } from '@heroicons/react/solid'

export default function NotOwner() {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex ">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">YOU CAN'T VIEW THIS MODULE, YOU ARE NOT A OWNER</h3>
          <div className="mt-2 text-sm text-red-700">
            <ul role="list" className="list-disc pl-5 space-y-1">
              <li>If you wan't to be one give me some money</li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

