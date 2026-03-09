

import Title from '../Title';

import building from '../../../../assets/dashboard/building-03.svg'
import user from '../../../../assets/dashboard/user-03.svg'
import mngr from '../../../../assets/dashboard/message-notification-square.svg'
import clndr from '../../../../assets/dashboard/calendar.svg'


export default function Header() {
  return (
    <>
      <div className="">
        <div className="">
          {/* Header */}
          <Title title="Dashboard" paragraph='Manage your assets and applications in the blink of an eye' />


          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* My Assets */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-base font-medium text-gray-900">My assets</h3>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <img src={building} height={24} width={24} />
                </div>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">3</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                  +1 this month
                </span>
              </div>
            </div>

            {/* Applications received */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-base font-medium text-gray-900">Applications received</h3>
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <img src={user} height={24} width={24} />
                </div>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">12</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                  +3 this week
                </span>
              </div>
            </div>

            {/* Unread messages */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-base font-medium text-gray-900">Unread messages</h3>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <img src={mngr} height={24} width={24} />
                </div>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">5</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                  New today
                </span>
              </div>
            </div>

            {/* Scheduled visits */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-base font-medium text-gray-900">Scheduled visits</h3>
                <div className="p-2 bg-orange-50 rounded-lg">
                  <img src={clndr} height={24} width={24} />
                </div>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">8</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-full">
                  This week
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}