
export default function ProductStatusBadge({status}) {
    if (!status) {
        return null; 
    }
    const statusLowerCase = status.toLowerCase();
    if(statusLowerCase === 'new'  ){
        return (
            <span className="absolute top-2 left-2 bg-green-700 text-white text-xs font-bold px-2 py-1 rounded">
                {status}
            </span>
        );
    
    }
    if(statusLowerCase === 'sale'){
        return (
            <div className="absolute top-2 left-2 bg-red-700 text-white text-xs font-bold px-2 py-1 rounded">
                {status}
            </div>
        );
    }

  return null; 
  
  
    

  
}
