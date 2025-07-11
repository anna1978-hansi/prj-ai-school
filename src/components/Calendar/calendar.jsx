import * as React from 'react';
import { useState, useMemo } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

// 这是一个功能完整的日历组件
export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  // 计算当前月份的信息
  const monthInfo = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 获取当月第一天和最后一天
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 获取当月第一天是星期几（0-6，0是星期日）
    const firstDayWeek = firstDay.getDay();

    // 获取当月总天数
    const daysInMonth = lastDay.getDate();

    // 获取上个月的最后几天
    const prevMonthLastDay = new Date(year, month, 0);
    const prevMonthDays = prevMonthLastDay.getDate();

    return {
      year,
      month,
      firstDayWeek,
      daysInMonth,
      prevMonthDays
    };
  }, [currentDate]);

  // 生成日历网格数据
  const calendarDays = useMemo(() => {
    const days = [];
    const today = new Date();
    const { firstDayWeek, daysInMonth, prevMonthDays } = monthInfo;

    // 添加上个月的日期
    for (let i = firstDayWeek - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day),
        day,
        isCurrentMonth: false,
        isToday: false
      });
    }

    // 添加当月的日期
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === today.toDateString();
      days.push({
        date,
        day,
        isCurrentMonth: true,
        isToday
      });
    }

    // 添加下个月的日期（填充到42个格子）
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day),
        day,
        isCurrentMonth: false,
        isToday: false
      });
    }

    return days;
  }, [currentDate, monthInfo]);

  // 切换到上个月
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // 切换到下个月
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // 切换到今天
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // 选择月份
  const selectMonth = (month) => {
    setCurrentDate(new Date(currentDate.getFullYear(), month - 1, 1));
    setIsPickerOpen(false);
  };

  // 选择年份
  const selectYear = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
  };

  // 选择日期
  const selectDate = (date) => {
    setSelectedDate(date);
  };

  // 格式化日期显示
  const formatDate = (date) => {
    return `${date.getFullYear()}年 ${date.getMonth() + 1}月`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-full max-w-2xl mx-auto">
      {/* --- 日历头部 --- */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {/* 日期选择按钮 */}
            <button
              onClick={() => setIsPickerOpen(!isPickerOpen)}
              className="!rounded-button bg-white border border-gray-200 px-4 py-2 text-sm flex items-center space-x-2 cursor-pointer hover:bg-gray-50">
              <span className="text-xl font-semibold text-gray-900">
                {formatDate(currentDate)}
              </span>
              <i className={`fas fa-chevron-down text-gray-500 ml-2 transition-transform ${isPickerOpen ? 'rotate-180' : ''}`}></i>
            </button>

            {/* 日期选择器下拉框 */}
            {isPickerOpen && (
              <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg p-4 w-64 z-20 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <button
                    className="!rounded-button p-1 hover:bg-gray-100"
                    onClick={() => selectYear(currentDate.getFullYear() - 1)}
                  >
                    <i className="fas fa-chevron-left text-gray-500"></i>
                  </button>
                  <div className="text-sm font-medium">{currentDate.getFullYear()}</div>
                  <button
                    className="!rounded-button p-1 hover:bg-gray-100"
                    onClick={() => selectYear(currentDate.getFullYear() + 1)}
                  >
                    <i className="fas fa-chevron-right text-gray-500"></i>
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <button
                      key={month}
                      className={`!rounded-button text-sm p-2 hover:bg-blue-50 hover:text-primary ${month === currentDate.getMonth() + 1 ? 'bg-blue-100 text-primary' : ''
                        }`}
                      onClick={() => selectMonth(month)}
                    >
                      {month}月
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 月份切换按钮 */}
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPreviousMonth}
              className="!rounded-button p-2 hover:bg-gray-100 text-gray-600"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              onClick={goToNextMonth}
              className="!rounded-button p-2 hover:bg-gray-100 text-gray-600"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* 今天按钮 */}
        <button
          onClick={goToToday}
          className="!rounded-button bg-primary text-white px-4 py-2 text-sm hover:bg-primary-dark"
        >
          今天
        </button>
      </div>

      {/* --- 日历网格区域 --- */}
      <div className="grid grid-cols-7 gap-4">
        {/* 星期头部 */}
        {weekDays.map(day => (
          <div key={day} className="text-center text-base font-medium text-gray-500">{day}</div>
        ))}

        {/* 日期单元格 */}
        {calendarDays.map((dayInfo, index) => {
          const isSelected = selectedDate && dayInfo.date.toDateString() === selectedDate.toDateString();

          return (
            <div
              key={index}
              onClick={() => selectDate(dayInfo.date)}
              className={`
                text-center text-sm p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto cursor-pointer transition-colors
                ${dayInfo.isCurrentMonth ? 'text-gray-800' : 'text-gray-300'}
                ${dayInfo.isToday ? 'bg-primary text-white font-semibold' : ''}
                ${isSelected && !dayInfo.isToday ? 'bg-blue-100 text-blue-600 font-semibold' : ''}
                ${!dayInfo.isToday && !isSelected ? 'hover:bg-gray-100' : ''}
              `}
            >
              {dayInfo.day}
            </div>
          );
        })}
      </div>

      {/* 选中日期显示 */}
      {selectedDate && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            选中日期: {selectedDate.toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            })}
          </p>
        </div>
      )}
    </div>
  );
}