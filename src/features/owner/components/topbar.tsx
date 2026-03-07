import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, Loader2 } from 'lucide-react';
import {
    useGetNotificationsQuery,
    useGetUnreadCountQuery,
    useMarkReadMutation,
    useMarkAllReadMutation
} from '../../../redux/featuresAPI/notifications/notifications.api';
import { formatDistanceToNow } from 'date-fns';

// Assuming you have a user image path
import userProfile from '../../../assets/dashboard/topBarWomanImg.jpg';
import ukFlag from '../../../assets/dashboard/uk.svg';
// Assuming a placeholder image for US flag

// Data for the Language Dropdown
const languages = [
    { code: 'EN', name: 'English (UK)', flag: ukFlag },
    { code: 'US', name: 'English (US)', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png' },
    { code: 'DE', name: 'Deutsch', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png' },
];

// Data for the Notifications (for demonstration)
// Removed mock notifications

// Reusable Dropdown Item component
const DropdownItem: React.FC<{ flag: string; name: string; onClick: () => void }> = ({ flag, name, onClick }) => (
    <li
        className="flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        onClick={onClick}
    >
        <img
            src={flag}
            alt={`${name} flag`}
            className="w-4 h-4 object-cover mr-2"
            style={{ borderRadius: '2px' }}
        />
        {name}
    </li>
);

interface HeaderProps {
    sidebarCollapsed: boolean;
    onProfileClick: () => void;
}

const Topbar: React.FC<HeaderProps> = ({ sidebarCollapsed, onProfileClick }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

    // Notification API hooks
    const { data: apiNotifications = [], isLoading: isLoadingNotifs } = useGetNotificationsQuery(undefined, {
        pollingInterval: 30000,
    });
    const { data: unreadData } = useGetUnreadCountQuery(undefined, {
        pollingInterval: 30000,
    });
    const [markRead] = useMarkReadMutation();
    const [markAllRead] = useMarkAllReadMutation();

    const unreadCount = unreadData?.count ?? 0;

    const dropdownRef = useRef<HTMLDivElement>(null);
    const notifRef = useRef<HTMLDivElement>(null);
    const bellRef = useRef<HTMLButtonElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Language Dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
            // Notification Window
            if (
                notifRef.current &&
                !notifRef.current.contains(event.target as Node) &&
                bellRef.current &&
                !bellRef.current.contains(event.target as Node) // Exclude bell click
            ) {
                setIsNotifOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageSelect = (lang: typeof languages[0]) => {
        setSelectedLanguage(lang);
        setIsDropdownOpen(false);
    };

    const marginClass = sidebarCollapsed ? 'ml-[80px] w-[calc(100%-80px)]' : 'ml-64 w-[calc(100%-256px)]';

    return (
        <header
            className={`
                fixed top-0 right-0 
                z-50 
                flex items-center h-16 bg-white border-b border-gray-200 
                transition-all duration-300 
                hidden lg:flex
                ${marginClass} 
            `}
        >
            <div className="flex justify-between items-center w-full px-6">

                {/* Search Bar (Left) - Unchanged */}
                <div className="flex items-center justify-center w-full max-w-sm text-[#061251]
                 bg-white py-2 px-3">

                </div>

                {/* Right Side Icons & Profile */}
                <div className="flex items-center justify-center space-x-6">

                    {/* 1. Language Dropdown */}
                    <div className="relative border-r border-gray-200" ref={dropdownRef}>
                        <button
                            className="flex items-center space-x-1 p-2 rounded-md hover:bg-gray-50 transition-colors"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <img
                                src={selectedLanguage.flag}
                                alt={`${selectedLanguage.code} Flag`}
                                className="w-5 h-5 object-cover"
                                style={{ borderRadius: '2px' }}
                            />
                            <span className="text-gray-700 font-medium text-sm">{selectedLanguage.code}</span>
                            <ChevronDown className={`h-3 w-3 text-gray-700 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                        </button>

                        {/* Dropdown Menu */}
                        <div
                            className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg origin-top-right transition-all duration-300 ease-in-out ${isDropdownOpen
                                ? 'opacity-100 scale-y-100 translate-y-0'
                                : 'opacity-0 scale-y-95 translate-y-1 pointer-events-none'
                                }`}
                            style={{ transformOrigin: 'top right' }}
                        >
                            <ul className="py-1">
                                {languages.map((lang) => (
                                    <DropdownItem
                                        key={lang.code}
                                        flag={lang.flag}
                                        name={lang.name}
                                        onClick={() => handleLanguageSelect(lang)}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="relative  border-r border-gray-200">
                        <button
                            ref={bellRef}
                            className="text-gray-500 right-[12px] hover:text-gray-700 p-2 rounded-full hover:bg-gray-50 transition-colors relative"
                            onClick={() => setIsNotifOpen(!isNotifOpen)}
                        >
                            <Bell className="w-5 h-5" />
                            {/* Notification Badge */}
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 right-0 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full ring-2 ring-white">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Notification Window (Animated) */}
                        <div
                            ref={notifRef}
                            className={`absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${isNotifOpen
                                ? 'opacity-100 scale-100 translate-y-0'
                                : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
                                }`}
                            style={{ transformOrigin: 'top right' }}
                        >
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                                {apiNotifications.some(n => !n.is_read) && (
                                    <button
                                        onClick={() => markAllRead()}
                                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Mark all as read
                                    </button>
                                )}
                            </div>
                            <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                                {isLoadingNotifs ? (
                                    <div className="p-8 flex justify-center">
                                        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                                    </div>
                                ) : apiNotifications.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500 text-sm">
                                        No notifications yet
                                    </div>
                                ) : (
                                    apiNotifications.map((notif) => (
                                        <li
                                            key={notif.id}
                                            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors relative ${!notif.is_read ? 'bg-blue-50/30' : ''}`}
                                            onClick={() => !notif.is_read && markRead(notif.id)}
                                        >
                                            <div className="flex justify-between items-start gap-2">
                                                <div className="flex-1">
                                                    <p className={`text-sm ${!notif.is_read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                                                        {notif.title || 'Notification'}
                                                    </p>
                                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notif.message}</p>
                                                    <p className="text-[10px] text-gray-400 mt-2">
                                                        {notif.created_at ? formatDistanceToNow(new Date(notif.created_at), { addSuffix: true }) : ''}
                                                    </p>
                                                </div>
                                                {!notif.is_read && (
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                                                )}
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                            <div className="p-3 text-center bg-gray-50 hover:bg-gray-100 border-t border-gray-100">
                                <button className="text-xs text-blue-600 font-medium w-full">View All Notifications</button>
                            </div>
                        </div>
                    </div>

                    {/* 3. Profile Image - Unchanged */}
                    <div onClick={onProfileClick} className="h-9 w-9 rounded-full overflow-hidden items-center self-center flex justify-center cursor-pointer border-2 border-transparent hover:border-indigo-500 transition-colors">
                        <img
                            src={userProfile}
                            alt="User Profile"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;