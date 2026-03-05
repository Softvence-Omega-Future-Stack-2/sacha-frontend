import Leftside from "../../components/ResetSuccessfull/Leftside"
import Rightside from "../../components/ResetSuccessfull/Rightside"

const ResetSuccessfull = () => {
  return (
    <>
      <div className="flex min-h-screen">
        
        {/* LEFT SIDE: Hidden by default (mobile), visible on medium screens and takes half width */}
        <div className="hidden md:block md:w-1/2">
          <Leftside />
        </div>
        
        {/* RIGHT SIDE: Full width by default (mobile), takes half width on medium screens */}
        <div className="w-full md:w-1/2">
          <Rightside />
        </div>
        
      </div>
    </>
  )
}

export default ResetSuccessfull