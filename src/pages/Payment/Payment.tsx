import Leftside from "../../components/Payment/Leftside"
import Rightside from "../../components/Payment/Rightside"

const Payment = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        
        {/* Leftside Container: 
            1. Default (mobile): w-full (full width)
            2. md (medium screens and up): md:block md:w-1/2 (visible, half width)
        */}
        <div className="w-full fix md:block md:w-1/2 bg-[linear-gradient(140deg,rgba(37,99,235,0.2)_0%,rgba(235,232,37,0.2)_100%)]">
          <Leftside />
        </div>
        
        {/* Rightside Container: 
            1. Default (mobile): w-full (full width)
            2. md (medium screens and up): md:w-1/2 (half width)
        */}
        <div className="w-full overflow-auto-y md:w-1/2">
          <Rightside />
        </div>
        
      </div>
    </>
  )
}

export default Payment