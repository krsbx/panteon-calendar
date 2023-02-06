import { Box, Checkbox, Flex, Input, Text } from '@chakra-ui/react';
import _ from 'lodash';
import React, { createRef, useState } from 'react';
import { FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { connect, ConnectedProps } from 'react-redux';
import {
  updateDateEventList as _updateDateEventList,
  pushDateEventList as _pushDateEventList,
} from '../store/actions/dates';
import { AppState } from '../store';
import EventList from './EventList';

const SideBar: React.FC<Props> = ({
  pushDateEventList,
  dateEventLists,
  selectedDate,
  topBarHeight,
  width,
}) => {
  const [isEntering, setIsEntering] = useState(false);
  const [isExpand, setIsExpand] = useState(true);
  const inputRef = createRef<HTMLInputElement>();

  const onKeyDown: React.KeyboardEventHandler = (event) => {
    if (event.key !== 'Enter') return;

    event.preventDefault();

    if (!inputRef.current?.value) return;

    pushDateEventList({
      date: selectedDate,
      list: {
        isActive: false,
        name: inputRef.current.value,
      },
    });
    setIsEntering(false);
  };

  return (
    <Flex
      flexDirection={'column'}
      width={`${width}px`}
      height={`calc(100vh - ${topBarHeight}px)`}
      borderRightColor={'black'}
      borderRightWidth={'2px'}
      rowGap={2}
    >
      <Flex
        columnGap={2}
        alignItems={'center'}
        justifyContent={'space-between'}
        p={2}
      >
        <Text fontSize={'20px'} fontWeight={'bold'}>
          My Calendars
        </Text>
        <Flex columnGap={2} alignItems={'center'}>
          <Box cursor={'pointer'} onClick={() => setIsEntering(true)}>
            <FaPlus size={22} />
          </Box>
          <Box cursor={'pointer'} onClick={() => setIsExpand((prev) => !prev)}>
            {isExpand ? <FaChevronUp size={22} /> : <FaChevronDown size={22} />}
          </Box>
        </Flex>
      </Flex>
      <Flex flexDirection={'column'} rowGap={2} p={2}>
        {_.map(dateEventLists[selectedDate], ({ name, isActive }, index) => (
          <EventList
            name={name}
            isActive={isActive}
            index={index}
            key={`event-list${index}`}
          />
        ))}
        {isEntering && (
          <Flex gap={2}>
            <Checkbox size={'lg'} />
            <Input
              placeholder="New Calendar"
              onKeyDown={onKeyDown}
              fontSize={'20px'}
              ref={inputRef}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

const mapStateToProps = (state: AppState) => ({
  dateEventLists: state.dates.dateEventLists,
  selectedDate: state.dates.selectedDate,
});

const connector = connect(mapStateToProps, {
  updateDateEventList: _updateDateEventList,
  pushDateEventList: _pushDateEventList,
});

type Props = ConnectedProps<typeof connector> & {
  width: number;
  topBarHeight: number;
};

export default connector(SideBar);
