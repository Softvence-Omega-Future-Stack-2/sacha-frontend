
// import img1 from '../../../../assets/dashboard/Ellipse 2171 (1).svg';
// import img2 from '../../../../assets/dashboard/Ellipse 2171 (2).svg';
// import img3 from '../../../../assets/dashboard/Ellipse 2171 (3).svg';

export default function App() {
  const chartData = [
    95, 92, 88, 85, 100, 72, 68, 75, 82, 88, 92, 88, 85, 80, 75, 70, 65, 68, 72,
    78, 85, 90, 88, 85, 80, 38, 82, 88, 92, 95, 96,
  ];



  return (
    <>
      <div className="mt-4">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Card - Property Overview */}
            <div className="lg:col-span-2 bg-white rounded-2xl  border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Property Overview
                </h2>

              </div>


              <div className="relative">
                <div>
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-4 text-sm text-gray-500">
                    <span>100%</span>
                    <span>80%</span>
                    <span>60%</span>
                    <span>40%</span>
                    <span>20%</span>
                  </div>

                  {/* Chart */}
                  <div className="ml-16 h-64 flex items-end justify-between gap-1">
                    {chartData.map((height, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400  transition-all duration-500 hover:from-blue-700 hover:to-blue-500"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
                {/* Y-axis labels */}

                {/* X-axis labels */}
                <div className="ml-16 mt-4 flex justify-between text-xs text-gray-500">
                  {[
                    "01",
                    "03",
                    "06",
                    "09",
                    "12",
                    "15",
                    "18",
                    "21",
                    "24",
                    "27",
                    "30",
                  ].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
              </div>

              {/* Total Revenue */}
              <div className="mt-8 flex items-end gap-3">
                <span className="text-5xl font-medium text-gray-900">25k</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Total Revenue
                  </p>
                  <p className="text-xs text-gray-500">in last month</p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  );
}
