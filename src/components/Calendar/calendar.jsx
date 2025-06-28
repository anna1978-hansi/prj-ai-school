import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';



// 这是一个独立的、纯展示性的日历组件
export default function Calendar() {
  // 为了填充日历网格，我们先用一些占位数据
  const calendarDays = Array.from({ length: 35 });
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-full max-w-2xl mx-auto">
      {/* --- 日历头部 --- */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {/* 日期选择按钮 (后续用state控制) */}
            <button
              // onClick 事件将用于切换下面选择器的显示/隐藏
              className="!rounded-button bg-white border border-gray-200 px-4 py-2 text-sm flex items-center space-x-2 cursor-pointer">
              <span className="text-xl font-semibold text-gray-900">2025年 6月</span>
              <i className="fas fa-chevron-down text-gray-500 ml-2"></i>
            </button>

            {/* 日期选择器下拉框
                          在实际应用中，这个 div 的显示/隐藏将由 React state 控制。
                          例如: { isPickerOpen && ( ... ) }
                          这里我们默认展示它，以便您看到完整的静态结构。
                        */}
            <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg p-4 w-64 z-20">
              <div className="flex justify-between items-center mb-4">
                <button className="!rounded-button p-1 hover:bg-gray-100">
                  <i className="fas fa-chevron-left text-gray-500"></i>
                </button>
                <div className="text-sm font-medium">2025</div>
                <button className="!rounded-button p-1 hover:bg-gray-100">
                  <i className="fas fa-chevron-right text-gray-500"></i>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <button
                    key={month}
                    className="!rounded-button text-sm p-2 hover:bg-blue-50 hover:text-primary"
                  >
                    {month}月
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* 如果需要，可以在这里添加 “今天” 或其他控制按钮 */}
      </div>

      {/* --- 日历网格区域 --- */}
      <div className="grid grid-cols-7 gap-4">
        {/* 星期头部 */}
        {weekDays.map(day => (
          <div key={day} className="text-center text-base font-medium text-gray-500">{day}</div>
        ))}

        {/* 日期单元格
                  这里是静态的占位符，用于展示样式。
                  在实际应用中，您需要用一个日期库 (如 date-fns) 结合 state 来动态生成当月的正确日期。
                */}
        {calendarDays.map((_, index) => {
          // --- 以下为示例逻辑，用于展示不同状态的样式 ---
          const dayNumber = (index % 31) + 1; // 模拟日期数字
          const isCurrentMonth = index > 2 && index < 34; // 模拟非本月日期置灰
          const isToday = index === 27; // 模拟今天

          return (
            <div
              key={index}
              className={`
                                text-center text-sm p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto cursor-pointer
                                ${isCurrentMonth ? 'text-gray-800' : 'text-gray-300'}
                                ${isToday ? 'bg-primary text-white font-semibold' : 'hover:bg-gray-100'}
                            `}
            >
              {dayNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
}