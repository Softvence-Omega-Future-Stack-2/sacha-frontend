import Leftside from "../../components/Payment/Leftside"
import Rightside from "../../components/Payment/Rightside"

const Payment = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen"> 
        <div className="w-full fix md:block md:w-1/2 bg-[linear-gradient(140deg,rgba(37,99,235,0.2)_0%,rgba(235,232,37,0.2)_100%)]">
          <Leftside />
        </div>
        
      
        <div className="w-full overflow-auto-y md:w-1/2">
          <Rightside />
        </div>
        
      </div>
    </>
  )
}

export default Payment