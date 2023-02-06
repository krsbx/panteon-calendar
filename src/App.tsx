import React, { createRef, useLayoutEffect, useMemo } from 'react';
import { Flex } from '@chakra-ui/react';
import moment from 'moment';
import { connect, ConnectedProps } from 'react-redux';
import TopBar from './components/TopBar';
import useRectObserver from './hooks/useRectObserver';
import EventLists from './components/EventLists';
import SideBar from './components/SideBar';
import { setDate as _setDate } from './store/actions/dates';

const App: React.FC<Props> = ({ setDate }) => {
  const topBarRef = createRef<HTMLDivElement>();
  const topBarHeight = useRectObserver(topBarRef, 'height');
  const topBarWidth = useRectObserver(topBarRef, 'width');
  const cardSize = useMemo(() => {
    return Math.floor(topBarWidth / 8);
  }, [topBarWidth]);

  const currentDate = moment().format('YYYY-MM-DD');

  useLayoutEffect(() => {
    setDate({
      currentDate: currentDate,
      selectedDate: currentDate,
    });
  }, []);

  return (
    <Flex flexDirection={'column'} width={'100vw'} height={'100vh'}>
      <TopBar ref={topBarRef} />
      <Flex
        width={'100vw'}
        height={`calc(100vh - ${topBarHeight ?? 60}px)`}
        flexDirection={'column'}
      >
        <SideBar topBarHeight={topBarHeight} width={cardSize} />
        <EventLists />
      </Flex>
    </Flex>
  );
};

const connector = connect(null, {
  setDate: _setDate,
});

type Props = ConnectedProps<typeof connector>;

export default connector(App);
