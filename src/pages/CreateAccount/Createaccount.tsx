import LeftSide from "../../components/CreateAccount/LeftSide"
import Rightside from "../../components/CreateAccount/Rightside"

const Createaccount = () => {
  return (
    <>
      <div className="flex min-h-screen">
        
        {/* LEFT SIDE: Hidden by default (mobile), visible on medium screens and takes half width */}
        <div className="hidden md:block md:w-1/2">
          <LeftSide />
        </div>
        
        {/* RIGHT SIDE: Full width by default (mobile), takes half width on medium screens */}
        <div className="w-full md:w-1/2">
          <Rightside />
        </div>
        
      </div>
    </>
  )
}

export default Createaccount