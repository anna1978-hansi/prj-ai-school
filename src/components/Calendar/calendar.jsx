import * as React from 'react';
import { useState, useMemo, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
// 这是一个功能完整的日历组件
export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState(null);
  // 新增：用于控制悬浮卡片显示的日期key
  const [hoveredDateKey, setHoveredDateKey] = useState(null);
  const hideTimer = useRef(null);
  // 写死部分计划数据用于样式演示
  const [schedules, setSchedules] = useState({
    '2024-6-1': [
      { type: '课程', content: '高等数学', time: '08:00-09:30' },
      { type: '备课', content: '物理实验准备', time: '14:00-15:00' }
    ],
    '2024-6-3': [
      { type: '课程', content: '英语阅读', time: '10:00-11:30' }
    ],
    '2024-6-5': [
      { type: '备课', content: '下周教案', time: '16:00-17:30' }
    ],
    '2024-6-8': [
      { type: '课程', content: '化学实验', time: '09:00-11:00' },
      { type: '备课', content: '批改作业', time: '15:00-16:00' }
    ]
  });

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

  // 计划弹窗表单处理
  const handleAddSchedule = (date) => {
    setModalDate(date);
    setModalOpen(true);
  };
  const handleSaveSchedule = (e) => {
    e.preventDefault();
    const form = e.target;
    const planType = form.planType.value;
    const planContent = form.planContent.value;
    const startTime = form.startTime.value;
    const endTime = form.endTime.value;
    if (!planType || !planContent || !startTime || !endTime) {
      alert('请填写所有必填项！');
      return;
    }
    if (startTime >= endTime) {
      alert('开始时间必须早于结束时间！');
      return;
    }
    const dateKey = `${modalDate.getFullYear()}-${modalDate.getMonth() + 1}-${modalDate.getDate()}`;
    const newPlan = { type: planType, content: planContent, time: `${startTime}-${endTime}` };
    setSchedules(prev => ({
      ...prev,
      [dateKey]: prev[dateKey] ? [...prev[dateKey], newPlan] : [newPlan]
    }));
    setModalOpen(false);
  };
  const handleDeletePlan = (dateKey, idx) => {
    setSchedules(prev => {
      const newArr = [...prev[dateKey]];
      newArr.splice(idx, 1);
      const newObj = { ...prev };
      if (newArr.length) newObj[dateKey] = newArr;
      else delete newObj[dateKey];
      return newObj;
    });
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
              <FontAwesomeIcon icon={faChevronDown} className={`text-gray-500 ml-2 transition-transform ${isPickerOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* 日期选择器下拉框 */}
            {isPickerOpen && (
              <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg p-4 w-64 z-20 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <button
                    className="!rounded-button p-1 hover:bg-gray-100"
                    onClick={() => selectYear(currentDate.getFullYear() - 1)}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} className="text-gray-500" />
                  </button>
                  <div className="text-sm font-medium">{currentDate.getFullYear()}</div>
                  <button
                    className="!rounded-button p-1 hover:bg-gray-100"
                    onClick={() => selectYear(currentDate.getFullYear() + 1)}
                  >
                    <FontAwesomeIcon icon={faChevronRight} className="text-gray-500" />
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
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={goToNextMonth}
              className="!rounded-button p-2 hover:bg-gray-100 text-gray-600"
            >
              <FontAwesomeIcon icon={faChevronRight} />
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
          // 生成日期key
          const dateKey = `${dayInfo.date.getFullYear()}-${dayInfo.date.getMonth() + 1}-${dayInfo.day}`;
          const hasPlans = schedules[dateKey] && schedules[dateKey].length > 0;

          // 鼠标移入/移出处理
          const handleEnter = () => {
            if (hideTimer.current) clearTimeout(hideTimer.current);
            setHoveredDateKey(dateKey);
          };
          const handleLeave = () => {
            hideTimer.current = setTimeout(() => setHoveredDateKey(null), 120);
          };

          return (
            <div key={index} className="relative"
              onMouseEnter={hasPlans ? handleEnter : undefined}
              onMouseLeave={hasPlans ? handleLeave : undefined}
            >
              <div
                onClick={() => {
                  selectDate(dayInfo.date);
                  handleAddSchedule(dayInfo.date);
                }}
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
              {/* 小圆点标识 */}
              {hasPlans && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex space-x-1">
                  {schedules[dateKey].map((plan, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full ${plan.type === '课程' ? 'bg-blue-400' : plan.type === '备课' ? 'bg-green-400' : 'bg-gray-400'
                        }`}
                    />
                  ))}
                </div>
              )}
              {/* 悬浮卡片 */}
              {hasPlans && hoveredDateKey === dateKey && (
                <div
                  className="absolute z-10 bg-white rounded-lg shadow p-2 w-48 text-left left-1/2 -translate-x-1/2 top-full mt-2"
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}
                  style={{ pointerEvents: 'auto' }}
                >
                  {schedules[dateKey].map((plan, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs mb-1">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-sky-600 font-medium truncate cursor-pointer hover:underline" title={plan.content}>{plan.content}</div>
                        <div className="text-[11px] text-gray-500 leading-tight mt-0.5">{plan.time}</div>
                      </div>
                      <button
                        className="ml-2 p-0.5 text-red-500 opacity-80 hover:opacity-100 hover:bg-red-50 rounded transition"
                        style={{ lineHeight: 0 }}
                        onClick={e => { e.stopPropagation(); handleDeletePlan(dateKey, idx); }}
                        title="删除"
                      >
                        {/* 实心垃圾桶SVG */}
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M6.5 2A1.5 1.5 0 0 1 8 3.5h4A1.5 1.5 0 0 1 13.5 2h2A.5.5 0 0 1 16 2.5v1a.5.5 0 0 1-.5.5H4.5A.5.5 0 0 1 4 3.5v-1A.5.5 0 0 1 4.5 2h2ZM4.5 5h11l-.833 11.667A2 2 0 0 1 12.673 18H7.327a2 2 0 0 1-1.994-1.333L4.5 5Zm3 2a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0V7Zm3 0a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0V7Zm3 0a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0V7Z" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 计划弹窗 */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setModalOpen(false)}></div>
          <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative z-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">添加安排</h3>
            <p className="text-sm text-gray-600 mb-4">{modalDate && `${modalDate.getFullYear()}年${modalDate.getMonth() + 1}月${modalDate.getDate()}日`}</p>
            <form onSubmit={handleSaveSchedule} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">计划名称</label>
                <input type="text" name="planContent" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">时间</label>
                <div className="flex space-x-2">
                  <input type="time" name="startTime" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" required />
                  <span className="flex items-center text-gray-500">至</span>
                  <input type="time" name="endTime" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">类型</label>
                <select name="planType" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" required>
                  <option>课程</option>
                  <option>备课</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button type="button" onClick={() => setModalOpen(false)} className="!rounded-button px-4 py-2 border border-gray-200 text-sm">取消</button>
                <button type="submit" className="!rounded-button bg-primary text-white px-4 py-2 text-sm">保存</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* 选中日期显示及计划列表 */}
      {/* {selectedDate && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            选中日期: {selectedDate.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
          </p>
          <ul className="mt-2 space-y-2">
            {(schedules[`${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`] || []).map((plan, idx) => (
              <li key={idx} className="flex justify-between items-center bg-white rounded p-2 shadow">
                <div>
                  <span className="font-bold">{plan.type}</span>：{plan.content}（{plan.time}）
                </div>
                <button className="text-red-500 text-xs" onClick={() => handleDeletePlan(`${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`, idx)}>删除</button>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}