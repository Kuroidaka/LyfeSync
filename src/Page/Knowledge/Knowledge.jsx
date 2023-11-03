// React related imports
import { useState, createContext } from 'react';

// Component imports
import KnowLedgeBlock from './Components/KnowledgeBlock';
import PodcastShare from './Components/PodcastShare';
import PodcastInfo from './Components/PodcastInfo';

// Style and data imports
import { KnowLedgeStyled } from './Knowledge.desktop';
import { podcastsData } from './Knowledge.data';


export const KnowledgeContext = createContext();

const Knowledge = () => {
  const [isPlayingId, setIsPlayingId] = useState({ isPlaying: false, id: null });
  const [isFavourite, setIsFavourite] = useState({ id: -1, isFavourite: false })
  const [podcastsDataFilter, setPodcastsDataFilter] = useState(podcastsData);
  const [podcastStatus, setPodcastStatus] = useState({});
  const [isPodcastShareDisplay, setIsPodcastShareDisplay] = useState(false);
  const [podcastShare, setPodcastShare] = useState({
    title: null,
    author: null,
    length: null,
    image: null,
    url: null,
  })
  const [isPodcastInfoDisplay, setIsPodcastInfoDisplay] = useState(false);
  const [podcastInfo, setPodcastInfo] = useState({
    id: null,
    title: null,
    author: null,
    length: null,
    description: null,
    thumbnail: null,
    date: null,
    downloadUrl: null,
  })
  const shareValue = {
    isPlayingId,
    setIsPlayingId,
    isFavourite,
    setIsFavourite,
    podcastsDataFilter,
    setPodcastsDataFilter,
    podcastStatus,
    setPodcastStatus,
    podcastShare,
    setPodcastShare,
    setIsPodcastShareDisplay,
    podcastInfo,
    setPodcastInfo,
    setIsPodcastInfoDisplay,
  }
  return (
    <KnowledgeContext.Provider value={shareValue}>
      <KnowLedgeStyled>
        {isPodcastShareDisplay && < PodcastShare />}
        {isPodcastInfoDisplay && <PodcastInfo />}
        <KnowLedgeBlock />
      </KnowLedgeStyled>
    </KnowledgeContext.Provider>
  );
}

export default Knowledge;

