import React, { createRef, useState } from 'react';
import { Checkbox, Flex, Input, Text } from '@chakra-ui/react';
import { connect, ConnectedProps } from 'react-redux';
import { updateDateEventList as _updateDateEventList } from '../store/actions/dates';
import { AppState } from '../store';
import useOnClickOutside from '../hooks/useClickOnOutside';

const EventList: React.FC<Props> = ({
  selectedDate,
  isActive,
  index,
  name,
  updateDateEventList,
}) => {
  const [isOnEdit, setIsOnEdit] = useState(false);
  const inputRef = createRef<HTMLInputElement>();

  useOnClickOutside(inputRef, () => setIsOnEdit(false));

  const onKeyDown: React.KeyboardEventHandler = (event) => {
    if (event.key !== 'Enter') return;

    event.preventDefault();

    if (!inputRef.current?.value) return;

    updateDateEventList({
      index,
      date: selectedDate,
      list: {
        isActive: false,
        name: inputRef.current.value,
      },
    });
    setIsOnEdit(false);
  };

  return (
    <Flex gap={2}>
      <Checkbox
        checked={isActive}
        size={'lg'}
        onChange={(e) =>
          updateDateEventList({
            index,
            date: selectedDate,
            list: {
              name,
              isActive: e.currentTarget.checked,
            },
          })
        }
      />
      {isOnEdit ? (
        <Input
          placeholder="New Calendar"
          onKeyDown={onKeyDown}
          fontSize={'20px'}
          value={name}
          ref={inputRef}
        />
      ) : (
        <Text
          fontSize={'20px'}
          onDoubleClick={() => setIsOnEdit(true)}
          userSelect={'none'}
        >
          {name}
        </Text>
      )}
    </Flex>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedDate: state.dates.selectedDate,
});

const connector = connect(mapStateToProps, {
  updateDateEventList: _updateDateEventList,
});

type Props = ConnectedProps<typeof connector> &
  Panteon.EventType & {
    index: number;
  };

export default connector(EventList);
