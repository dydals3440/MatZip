import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import useGetCalendarPosts from '@/hooks/queries/useGetCalendarPosts';
import Calendar from '@/components/calendar/Calendar';
import EventList from '@/components/calendar/EventList';
import {getMonthYearDetails, getNewMonthYear} from '@/utils';
import {colors} from '@/constants';

import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';

interface CalendarHomeScreenProps {}

const CalendarHomeScreen = ({}: CalendarHomeScreenProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);
  const {
    data: posts,
    isPending,
    isError,
  } = useGetCalendarPosts(monthYear.year, monthYear.month);

  const moveToToday = () => {
    setSelectedDate(new Date().getDate());
    setMonthYear(getMonthYearDetails(new Date()));
  };

  useEffect(() => {
    // 버튼을 눌렀을 떄 뿐 아니라, 맨 처음 캘린더 컴포넌트로 들어올 떄 현재 날짜가 바로 보이도록 useEffect의 첫 렌더링에 실행할 수 있도록 해줌.
    moveToToday();
  }, []);

  if (isPending || isError) {
    return <></>;
  }

  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        schedules={posts}
        onChangeMonth={handleUpdateMonth}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
        moveToToday={moveToToday}
      />
      <EventList posts={posts[selectedDate]} />
    </SafeAreaView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
  });

export default CalendarHomeScreen;
