import React, { useMemo } from 'react';
import { Button, Flex, FlexProps, Text } from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';
import { setDate as _setDate } from '../store/actions/dates';
import moment from 'moment';

const TopBar = React.forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const { currentDate, selectedDate } = useSelector(
    (state: AppState) => state.dates
  );
  const dispatch = useDispatch();

  const setDate = (payload: Parameters<typeof _setDate>[0]) =>
    _setDate(payload)(dispatch);

  const { prevMonth, nextMonth } = useMemo(() => {
    const date = moment(selectedDate);

    return {
      nextMonth: date.add(1, 'M').format('YYYY-MM-DD'),
      prevMonth: date.add(-2, 'M').format('YYYY-MM-DD'),
    };
  }, [selectedDate]);

  return (
    <Flex
      width={'100vw'}
      height={'60px'}
      justifyContent={'space-between'}
      alignItems={'center'}
      p={3}
      borderBottomColor={'black'}
      borderBottomWidth={'2px'}
      {...props}
      ref={ref}
    >
      <Flex columnGap={4} alignItems={'center'}>
        <GiHamburgerMenu size={24} />
        <Text fontSize={'1.5rem'} fontWeight={'bold'}>
          Awesome Calendar
        </Text>
        <Button
          variant={'unstyled'}
          borderWidth={'1.5px'}
          borderColor={'black'}
          borderRadius={0}
          minWidth={'5rem'}
          onClick={() =>
            setDate({
              selectedDate: currentDate,
            })
          }
        >
          Today
        </Button>
        <Flex columnGap={1} alignItems={'center'}>
          <Button
            variant={'unstyled'}
            minWidth={0}
            width={'20px'}
            onClick={() =>
              setDate({
                selectedDate: prevMonth,
              })
            }
          >
            <FaChevronLeft />
          </Button>
          <Button
            variant={'unstyled'}
            minWidth={0}
            width={'20px'}
            onClick={() =>
              setDate({
                selectedDate: nextMonth,
              })
            }
          >
            <FaChevronRight />
          </Button>
          <Text fontWeight={'bold'} fontSize={'18px'}>
            {moment(selectedDate).format('MMMM YYYY')}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
});

export default TopBar;
