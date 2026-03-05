import Leftside from "../../components/Login/Leftside"
import Rightside from "../../components/Login/Rightside"

const Login = () => {
  return (
    <>
      <div className="flex min-h-screen">
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

export default Login