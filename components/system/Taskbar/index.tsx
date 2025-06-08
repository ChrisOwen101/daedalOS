import { memo, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "motion/react";
import {
  importCalendar,
  importSearch,
  importStartMenu,
} from "components/system/Taskbar/functions";
import Clock from "components/system/Taskbar/Clock";
import NotificationButton from "components/system/Taskbar/Notifications/NotificationButton";
import NotificationPanel from "components/system/Taskbar/Notifications/NotificationPanel";
import SearchButton from "components/system/Taskbar/Search/SearchButton";
import StartButton from "components/system/Taskbar/StartButton";
import StyledTaskbar from "components/system/Taskbar/StyledTaskbar";
import TaskbarEntries from "components/system/Taskbar/TaskbarEntries";
import useTaskbarContextMenu from "components/system/Taskbar/useTaskbarContextMenu";
import { CLOCK_CANVAS_BASE_WIDTH, FOCUSABLE_ELEMENT } from "utils/constants";

const Calendar = dynamic(importCalendar);
const Search = dynamic(importSearch);
const StartMenu = dynamic(importStartMenu);

const Taskbar: FC = () => {
  const [startMenuVisible, setStartMenuVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [clockWidth, setClockWidth] = useState(CLOCK_CANVAS_BASE_WIDTH);
  const toggleStartMenu = useCallback(
    (showMenu?: boolean): void =>
      setStartMenuVisible((currentMenuState) => showMenu ?? !currentMenuState),
    []
  );
  const toggleSearch = useCallback(
    (showSearch?: boolean): void =>
      setSearchVisible(
        (currentSearchState) => showSearch ?? !currentSearchState
      ),
    []
  );
  const toggleCalendar = useCallback(
    (showCalendar?: boolean): void =>
      setCalendarVisible(
        (currentCalendarState) => showCalendar ?? !currentCalendarState
      ),
    []
  );
  const toggleNotifications = useCallback(
    (showNotifications?: boolean): void =>
      setNotificationsVisible(
        (currentNotificationsState) =>
          showNotifications ?? !currentNotificationsState
      ),
    []
  );

  return (
    <>
      <AnimatePresence initial={false} presenceAffectsLayout={false}>
        {startMenuVisible && (
          <StartMenu key="startMenu" toggleStartMenu={toggleStartMenu} />
        )}
        {searchVisible && <Search key="search" toggleSearch={toggleSearch} />}
      </AnimatePresence>
      <StyledTaskbar {...useTaskbarContextMenu()} {...FOCUSABLE_ELEMENT}>
        <StartButton
          startMenuVisible={startMenuVisible}
          toggleStartMenu={toggleStartMenu}
        />
        <SearchButton
          searchVisible={searchVisible}
          toggleSearch={toggleSearch}
        />
        <TaskbarEntries clockWidth={clockWidth} hasAI />
        <Clock
          setClockWidth={setClockWidth}
          toggleCalendar={toggleCalendar}
          width={clockWidth}
          hasAI
        />
        <NotificationButton
          notificationsVisible={notificationsVisible}
          toggleNotifications={toggleNotifications}
        />
      </StyledTaskbar>
      <AnimatePresence initial={false} presenceAffectsLayout={false}>
        {calendarVisible && (
          <Calendar key="calendar" toggleCalendar={toggleCalendar} />
        )}
        {notificationsVisible && (
          <NotificationPanel
            key="notifications"
            toggleNotifications={toggleNotifications}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Taskbar);
