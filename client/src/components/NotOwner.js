export default function NotOwner() {

    return (

      <div className="flex justify-center ">
        <div className="text-center rounded-md bg-red-50 p-4 mt-10 w-1/3"> 
          <h3 className="text-sm font-medium text-red-800">YOU CAN'T VIEW THIS MODULE, PLEASE ASK THE OWNER TO ADD YOU IN THE WHITLIST</h3>
          <div className="mt-2 text-sm text-red-700">
            
              <p>Ce composant ne sert pas a grand chose mais c'est juste pour l'utilisation d'une conditions "si tu n'est pas le owner"</p>    
          </div>
        </div>
      </div>
  )

  
}

