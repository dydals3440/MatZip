import HeaderButton from '../common/HeaderButton';

const CalendarHomeHeaderRight = (onPress: () => void) => {
  return <HeaderButton labelText="오늘" onPress={onPress} />;
};

export default CalendarHomeHeaderRight;
