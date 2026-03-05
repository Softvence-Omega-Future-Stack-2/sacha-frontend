import { useState } from 'react';
import Title from "../Title";
import GeneralInfo from './GeneralInfo';
import PropertyList from './PropertyList';

const Myadd = () => {
  // view: 'list' | 'create'
  const [view, setView] = useState<'list' | 'create'>('list');

  const handleNewAnnouncement = () => {
    setView('create');
  };

  const handleBackToList = () => {
    setView('list');
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <Title title='My Ads' paragraph='' />

      {view === 'list' ? (
        <PropertyList onNewAnnouncement={handleNewAnnouncement} />
      ) : (
        <GeneralInfo onBack={handleBackToList} />
      )}
    </div>
  );
};

export default Myadd;
