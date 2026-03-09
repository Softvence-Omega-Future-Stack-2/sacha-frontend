import img from '../../assets/tenant.png'

const TenantSection = () => {
    return (
        <div className="mt-12 md:mt-16 lg:mt-20 px-4">
            <div className="flex justify-center">
                <button className="py-2 px-8 bg-[#2563EB1A] rounded-full text-sm md:text-base">
                    Performance
                </button>
            </div>

            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-2xl lg:text-4xl  mt-[19px] text-[#061251] text-center font-dm-sans  font-semibold leading-[120%] capitalize">
                    Forte <span className="text-[#061251] larken-font font-normal leading-[120%]">Tenant Record</span>
                </h1>

                <p className="text-[#061251] text-center  mt-[19px] text-sm sm:text-base md:text-lg">
                    Votre demande, claire et convaincante, en quelques minutes.
                </p>
            </div>

            <div className='mt-10 flex justify-center '>
                <img src={img} alt="image" />
            </div>
        </div>
    )
}

export default TenantSection
