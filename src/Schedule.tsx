import React, { useState } from 'react';

export function CalendarRegistration() {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [dateType, setDateType] = useState<"single" | "range">('single');
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [isAllDay, setIsAllDay] = useState(true);
  const [startHour, setStartHour] = useState('09');
  const [startMinute, setStartMinute] = useState('00');
  const [endHour, setEndHour] = useState('18');
  const [endMinute, setEndMinute] = useState('00');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  };

  const isInRange = (date: Date) => {
    if (!selectedStartDate || !selectedEndDate || !date) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  const handleDateClick = (date: Date) => {
    if (dateType === 'single') {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else {
      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        setSelectedStartDate(date);
        setSelectedEndDate(null);
      } else {
        if (date >= selectedStartDate) {
          setSelectedEndDate(date);
        } else {
          setSelectedEndDate(selectedStartDate);
          setSelectedStartDate(date);
        }
      }
    }
  };

  const handleSubmit = () => {
    const formateDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}${month}${day}`;
    };
    const formatZDate = (date: Date, hourStr: string, minStr: string) => {
      const date2 = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${hourStr}:${minStr}:00`);
      return [
        date2.getUTCFullYear().toString(),
        String(date2.getUTCMonth() + 1).padStart(2, '0'),
        String(date2.getUTCDate()).padStart(2, '0'),
        "T",
        String(date2.getUTCHours()).padStart(2, '0'),
        String(date2.getUTCMinutes()).padStart(2, '0'),
        "00Z",
      ].join("");
    }
    if (!title) {
      alert('タイトルを入力してください');
      return;
    }
    if (!selectedStartDate) {
      alert('日付を選択してください');
      return;
    }
    if (dateType === 'range' && !selectedEndDate) {
      alert('終了日を選択してください');
      return;
    }
    const requestUrl = new URL("https://calendar.google.com/calendar/render");
    requestUrl.searchParams.append("action", "TEMPLATE");
    requestUrl.searchParams.append("text", title);
    if (isAllDay) {
      if (dateType == "range" && selectedEndDate != null) {
        requestUrl.searchParams.append("dates", `${formateDate(selectedStartDate)}/${formateDate(selectedEndDate)}`);
      } else {
        requestUrl.searchParams.append("dates", `${formateDate(selectedStartDate)}/${formateDate(selectedStartDate)}`);
      }
    } else {
      if (dateType == "range" && selectedEndDate != null) {
        requestUrl.searchParams.append("dates", `${formatZDate(selectedStartDate, startHour, startMinute)}/${formatZDate(selectedEndDate, endHour, endMinute)}`);
      } else {
        requestUrl.searchParams.append("dates", `${formatZDate(selectedStartDate, startHour, startMinute)}/${formatZDate(selectedStartDate, endHour, endMinute)}`);
      }
    }
    requestUrl.searchParams.append("details", detail);
    window.open(requestUrl);
    /*
        const formData = {
          title: title,
          detail: detail,
          dateType: dateType,
          startDate: formatDate(selectedStartDate),
          endDate: dateType === 'range' ? formatDate(selectedEndDate) : null,
          isAllDay: isAllDay,
          startTime: isAllDay ? null : `${startHour}:${startMinute}`,
          endTime: isAllDay ? null : `${endHour}:${endMinute}`
        };
        console.log('登録データ:', formData);
        alert('スケジュールを登録しました！\n\n' + JSON.stringify(formData, null, 2));
    
        setTitle('');
        setDetail('');
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        */
  };

  const renderCalendar = (monthOffset: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
    const daysInMonth = getDaysInMonth(date);
    const firstDay = getFirstDayOfMonth(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthName = `${year}年${month}月`;
    const reiwa = `R${year - 2018}`
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const wagetsuDefines: { kanji: string; yomi: string }[] = [
      { kanji: "睦月", yomi: "むつき" }, // 1月
      { kanji: "如月", yomi: "きさらぎ" }, // 2月
      { kanji: "弥生", yomi: "やよい" }, // 3月
      { kanji: "卯月", yomi: "うずき" }, // 4月
      { kanji: "皐月", yomi: "さつき" }, // 5月
      { kanji: "水無月", yomi: "みなづき" }, // 6月
      { kanji: "文月", yomi: "ふみづき" }, // 7月
      { kanji: "葉月", yomi: "はづき" }, // 8月
      { kanji: "長月", yomi: "なづき" }, // 9月
      { kanji: "神無月", yomi: "かんなづき" }, // 10月
      { kanji: "霜月", yomi: "しもつき" }, // 11月
      { kanji: "師走", yomi: "しわす" }, // 12月
    ];
    const hollidayList: { date: Date; name: string }[] = [
      { date: new Date("2020/11/03"), name: "文化の日" },
      { date: new Date("2020/11/23"), name: "勤労感謝の日" },

      { date: new Date("2020/12/28"), name: "有給" },
      { date: new Date("2020/12/29"), name: "有給奨励日" },
      { date: new Date("2020/12/30"), name: "年末年始" },
      { date: new Date("2020/12/31"), name: "年末年始" },

      { date: new Date("2021/01/01"), name: "元日" },
      { date: new Date("2021/01/04"), name: "有給奨励日" },
      { date: new Date("2021/01/11"), name: "成人の日" },
      { date: new Date("2021/02/11"), name: "建国記念の日" },
      { date: new Date("2021/02/23"), name: "天皇誕生日" },
      { date: new Date("2021/03/20"), name: "春分の日" },
      { date: new Date("2021/04/29"), name: "昭和の日" },
      { date: new Date("2021/05/03"), name: "憲法記念日" },
      { date: new Date("2021/05/04"), name: "みどりの日" },
      { date: new Date("2021/05/05"), name: "こどもの日" },
      { date: new Date("2021/07/22"), name: "海の日" },
      { date: new Date("2021/07/23"), name: "スポーツの日" },
      { date: new Date("2021/08/08"), name: "山の日" },
      { date: new Date("2021/08/09"), name: "休日" },
      { date: new Date("2021/09/20"), name: "敬老の日" },
      { date: new Date("2021/09/23"), name: "秋分の日" },
      { date: new Date("2021/11/03"), name: "文化の日" },
      { date: new Date("2021/11/23"), name: "勤労感謝の日" },
      { date: new Date("2022/01/01"), name: "元日" },
      { date: new Date("2022/01/10"), name: "成人の日" },
      { date: new Date("2022/02/11"), name: "建国記念の日" },
      { date: new Date("2022/02/23"), name: "天皇誕生日" },
      { date: new Date("2022/03/21"), name: "春分の日" },
      { date: new Date("2022/04/29"), name: "昭和の日" },
      { date: new Date("2022/05/03"), name: "憲法記念日" },
      { date: new Date("2022/05/04"), name: "みどりの日" },
      { date: new Date("2022/05/05"), name: "こどもの日" },
      { date: new Date("2022/07/18"), name: "海の日" },
      { date: new Date("2022/08/11"), name: "山の日" },
      { date: new Date("2022/09/19"), name: "敬老の日" },
      { date: new Date("2022/09/23"), name: "秋分の日" },
      { date: new Date("2022/10/10"), name: "スポーツの日" },
      { date: new Date("2022/11/03"), name: "文化の日" },
      { date: new Date("2022/11/23"), name: "勤労感謝の日" },
      // 2023年
      { date: new Date("2023/01/01"), name: "元日" },
      { date: new Date("2023/01/02"), name: "祝日" },
      { date: new Date("2023/01/09"), name: "成人の日" },
      { date: new Date("2023/02/11"), name: "建国記念日" },
      { date: new Date("2023/02/23"), name: "天皇誕生日" },
      { date: new Date("2023/03/21"), name: "春分の日" },
      { date: new Date("2023/04/29"), name: "昭和の日" },
      { date: new Date("2023/05/03"), name: "憲法記念日" },
      { date: new Date("2023/05/04"), name: "みどりの日" },
      { date: new Date("2023/05/05"), name: "こどもの日" },
      { date: new Date("2023/07/17"), name: "海の日" },
      { date: new Date("2023/08/11"), name: "山の日" },
      { date: new Date("2023/09/18"), name: "敬老の日" },
      { date: new Date("2023/09/23"), name: "秋分の日" },
      { date: new Date("2023/10/09"), name: "スポーツの日" },
      { date: new Date("2023/11/03"), name: "文化の日" },
      { date: new Date("2023/11/23"), name: "勤労感謝の日" },
      // 2024年
      { date: new Date("2024/01/01"), name: "元日" },
      { date: new Date("2024/01/08"), name: "成人の日" },
      { date: new Date("2024/02/11"), name: "建国記念の日" },
      { date: new Date("2024/02/12"), name: "休日" },
      { date: new Date("2024/02/23"), name: "天皇誕生日" },
      { date: new Date("2024/03/20"), name: "春分の日" },
      { date: new Date("2024/04/29"), name: "昭和の日" },
      { date: new Date("2024/05/03"), name: "憲法記念日" },
      { date: new Date("2024/05/04"), name: "みどりの日" },
      { date: new Date("2024/05/05"), name: "こどもの日" },
      { date: new Date("2024/05/06"), name: "休日" },
      { date: new Date("2024/07/15"), name: "海の日" },
      { date: new Date("2024/08/11"), name: "山の日" },
      { date: new Date("2024/08/12"), name: "休日" },
      { date: new Date("2024/09/16"), name: "敬老の日" },
      { date: new Date("2024/09/22"), name: "秋分の日" },
      { date: new Date("2024/09/23"), name: "休日" },
      { date: new Date("2024/10/14"), name: "スポーツの日" },
      { date: new Date("2024/11/03"), name: "文化の日" },
      { date: new Date("2024/11/04"), name: "休日" },
      { date: new Date("2024/11/23"), name: "勤労感謝の日" },
      { date: new Date("2024/12/30"), name: "年末年始休暇" },
      { date: new Date("2024/12/31"), name: "年末年始休暇" },
      // 2025年
      { date: new Date("2025/01/01"), name: "元日" },
      { date: new Date("2025/01/02"), name: "年末年始休暇" },
      { date: new Date("2025/01/03"), name: "年末年始休暇" },
      { date: new Date("2025/01/13"), name: "成人の日" },
      { date: new Date("2025/02/11"), name: "建国記念の日" },
      { date: new Date("2025/02/23"), name: "天皇誕生日" },
      { date: new Date("2025/02/24"), name: "休日" },
      { date: new Date("2025/03/20"), name: "春分の日" },
      { date: new Date("2025/04/29"), name: "昭和の日" },
      { date: new Date("2025/05/03"), name: "憲法記念日" },
      { date: new Date("2025/05/04"), name: "みどりの日" },
      { date: new Date("2025/05/05"), name: "こどもの日" },
      { date: new Date("2025/05/06"), name: "休日" },
      { date: new Date("2025/07/21"), name: "海の日" },
      { date: new Date("2025/08/11"), name: "山の日" },
      { date: new Date("2025/09/15"), name: "敬老の日" },
      { date: new Date("2025/09/23"), name: "秋分の日" },
      { date: new Date("2025/10/13"), name: "スポーツの日" },
      { date: new Date("2025/11/03"), name: "文化の日" },
      { date: new Date("2025/11/23"), name: "勤労感謝の日" },
      { date: new Date("2025/11/24"), name: "休日" },
      // 2026年
      { date: new Date("2026/01/01"), name: "元日" },
      { date: new Date("2026/01/12"), name: "成人の日" },
      { date: new Date("2026/02/11"), name: "建国記念の日" },
      { date: new Date("2026/02/23"), name: "天皇誕生日" },
      { date: new Date("2026/03/20"), name: "春分の日" },
      { date: new Date("2026/04/29"), name: "昭和の日" },
      { date: new Date("2026/05/03"), name: "憲法記念日" },
      { date: new Date("2026/05/04"), name: "みどりの日" },
      { date: new Date("2026/05/05"), name: "こどもの日" },
      { date: new Date("2026/05/06"), name: "休日" },
      { date: new Date("2026/07/20"), name: "海の日" },
      { date: new Date("2026/08/11"), name: "山の日" },
      { date: new Date("2026/09/21"), name: "敬老の日" },
      { date: new Date("2026/09/22"), name: "休日" },
      { date: new Date("2026/09/23"), name: "秋分の日" },
      { date: new Date("2026/10/12"), name: "スポーツの日" },
      { date: new Date("2026/11/03"), name: "文化の日" },
      { date: new Date("2026/11/23"), name: "勤労感謝の日" },
    ];
    const dayBgColor = {
      holiday: "bg-[#f7eb3f]",
      saturday: "bg-[#babaff]",
      sunday: "bg-[#ffa1a1]",
    }
    let bgColor = `bg-white`;
    if (new Date().getFullYear() == date.getFullYear() && new Date().getMonth() == date.getMonth()) {
      bgColor = "bg-[#e6ffe8]";
    }
    const monthNameEng = monthNames[date.getMonth()];
    const monthNameJa = wagetsuDefines[date.getMonth()];
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-4"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      const isStart = isSameDay(currentDate, selectedStartDate);
      const isEnd = isSameDay(currentDate, selectedEndDate);
      const inRange = dateType === 'range' && isInRange(currentDate);
      const holiday = hollidayList.find(d => d.date.getFullYear() == currentDate.getFullYear() && d.date.getMonth() == currentDate.getMonth() && d.date.getDate() == currentDate.getDate());

      let className = 'h-4 w-6 flex items-center justify-center text-xs cursor-pointer rounded transition-all ';
      let innerDivClass = "h-3 w-4 flex items-center justify-center ";
      if (isStart || isEnd) {
        innerDivClass += 'bg-blue-500 text-white font-bold shadow-sm ';
      } else if (inRange) {
        innerDivClass += 'bg-blue-100 ';
      } else {
        innerDivClass += 'hover:bg-gray-100 ';
      }
      let titleAttribute: string | undefined = undefined;
      if (holiday) {
        className += `${dayBgColor.holiday}`;
        titleAttribute = holiday.name;
      } else if (currentDate.getDay() == 0) {
        className += `${dayBgColor.sunday}`;
      } else if (currentDate.getDay() == 6) {
        className += `${dayBgColor.saturday}`;
      }
      let innerText = String(day);
      if (new Date().getFullYear() == currentDate.getFullYear() && new Date().getMonth() == currentDate.getMonth() && new Date().getDate() == currentDate.getDate()) {
        innerText = `[${day}]`;
      }

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(currentDate)}
          className={className}
          title={titleAttribute}
        >
          <div className={innerDivClass}>
            {innerText}
          </div>
        </div>
      );
    }
    return (
      <div className={"rounded-md shadow-sm border border-gray-200 p-1 " + bgColor}>
        <div className="text-center font-medium text-s mb-1 text-gray-700">{reiwa} {monthName}</div>
        <div className="text-center font-medium text-xs mb-1 text-gray-700">{monthNameEng}/{monthNameJa.kanji}({monthNameJa.yomi})</div>
        <div className="grid grid-cols-7 gap-0 text-xs text-gray-500 mb-0.5">
          <div className="text-center text-red-500 text-xs">日</div>
          <div className="text-center text-xs">月</div>
          <div className="text-center text-xs">火</div>
          <div className="text-center text-xs">水</div>
          <div className="text-center text-xs">木</div>
          <div className="text-center text-xs">金</div>
          <div className="text-center text-blue-500 text-xs">土</div>
        </div>
        <div className="grid grid-cols-7 gap-0 place-items-center">
          {days}
        </div>
      </div>
    );
  };

  const hours: string[] = [];
  for (let i = 0; i < 24; i++) {
    hours.push(String(i).padStart(2, '0'));
  }

  const minutes: string[] = [];
  for (let i = 0; i < 12; i++) {
    minutes.push(String(i * 5).padStart(2, '0'));
  }

  // 時を3列で縦に並べるための配列を作成
  const hoursGrid = [];
  const hoursPerColumn = 8; // 24 / 3 = 8
  for (let col = 0; col < 3; col++) {
    for (let row = 0; row < hoursPerColumn; row++) {
      const index = col * hoursPerColumn + row;
      if (index < 24) {
        hoursGrid.push(hours[index]);
      }
    }
  }

  // 分を4列で縦に並べるための配列を作成
  const minutesGrid = [];
  const minutesPerColumn = 3; // 12 / 4 = 3
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < minutesPerColumn; row++) {
      const index = col * minutesPerColumn + row;
      if (index < 12) {
        minutesGrid.push(minutes[index]);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-blue-600">📅</span>
          スケジュール登録
        </h1>

        <div className="space-y-3">
          <div className="bg-white rounded-lg shadow-md p-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              タイトル <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="スケジュールのタイトルを入力"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-medium text-gray-700">日付選択</h3>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dateType === 'range'}
                    onChange={(e) => {
                      setDateType(e.target.checked ? 'range' : 'single');
                      if (!e.target.checked) {
                        setSelectedEndDate(null);
                      }
                    }}
                    className="mr-1.5 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">期間指定</span>
                </label>
                <div className="text-s text-gray-600 bg-blue-50 px-2 py-1 rounded">
                  {dateType === 'single' ? (
                    <span>{formatDate(selectedStartDate) || '未選択'}</span>
                  ) : (
                    <span>{formatDate(selectedStartDate) || '未選択'} ～ {formatDate(selectedEndDate) || '未選択'}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <span className="text-gray-600">◀</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentMonth(new Date())}
                  className="px-2 py-1 text-xs hover:bg-gray-100 rounded transition-colors"
                >
                  今月
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <span className="text-gray-600">▶</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(offset => (
                <div key={offset}>
                  {renderCalendar(offset)}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-blue-600">⏰</span>
                <h3 className="text-sm font-medium text-gray-700">時刻設定</h3>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAllDay}
                    onChange={(e) => setIsAllDay(e.target.checked)}
                    className="mr-2 w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700 font-medium">終日</span>
                </label>
                <div className="text-s text-gray-600 bg-blue-50 px-2 py-1 rounded">
                  {isAllDay ? (
                    <span>終日</span>
                  ) : (
                    <span>{startHour}:{startMinute} ～ {endHour}:{endMinute}</span>
                  )}
                </div>
              </div>

              <div className="space-y-3">


                <div className={`p-3 bg-gray-50 rounded-md transition-opacity ${isAllDay ? 'opacity-50 pointer-events-none' : ''}`}>
                  <div className="grid grid-cols-4 gap-3" style={{ display: "flex" }}>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">開始時</label>
                      <div className="grid gap-0.5 grid-rows-[repeat(6,1fr)] grid-cols-[repeat(4,1fr)]" style={{ gridAutoFlow: 'column' }}>
                        {hours.map((h, i) => (
                          <button
                            key={h}
                            type="button"
                            onClick={() => setStartHour(h)}
                            disabled={isAllDay}
                            className={`px-2 py-0.5 text-xs border rounded-sm transition-colors ${startHour === h
                              ? 'bg-blue-500 text-white border-blue-500'
                              : 'bg-white border-gray-300 hover:bg-gray-100'
                              }`}
                          >
                            {h}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">開始分</label>
                      <div className="grid gap-0.5 grid-rows-[repeat(6,1fr)] grid-cols-[repeat(2,1fr)]" style={{ gridAutoFlow: 'column' }}>
                        {minutes.map((m, i) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setStartMinute(m)}
                            disabled={isAllDay}
                            className={`px-2 py-0.5 text-xs border rounded-sm transition-colors ${startMinute === m
                              ? 'bg-blue-500 text-white border-blue-500'
                              : 'bg-white border-gray-300 hover:bg-gray-100'
                              }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">終了時</label>
                      <div className="grid gap-0.5 grid-rows-[repeat(6,1fr)] grid-cols-[repeat(4,1fr)]" style={{ gridAutoFlow: 'column' }}>
                        {hours.map((h, i) => {
                          let isDisabled = false;
                          if (parseInt(h) < parseInt(startHour)) {
                            isDisabled = true;
                          } else if (parseInt(h) > parseInt(startHour)) {
                            isDisabled = false;
                          } else {
                            if (minutes[minutes.length - 1] == startMinute) {
                              isDisabled = true;
                            }
                          }
                          return (
                            <button
                              key={h}
                              type="button"
                              onClick={() => !isDisabled && setEndHour(h)}
                              disabled={isAllDay || isDisabled}
                              className={`px-2 py-0.5 text-xs border rounded-sm transition-colors ${endHour === h
                                ? 'bg-blue-500 text-white border-blue-500'
                                : isDisabled
                                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                  : 'bg-white border-gray-300 hover:bg-gray-100'
                                }`}
                            >
                              {h}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">終了分</label>
                      <div className="grid gap-0.5 grid-rows-[repeat(6,1fr)] grid-cols-[repeat(2,1fr)]" style={{ gridAutoFlow: 'column' }}>
                        {minutes.map((m, i) => {
                          let isDisabled = false;
                          if (parseInt(endHour) < parseInt(startHour)) {
                            isDisabled = true;
                          } else if (parseInt(endHour) > parseInt(startHour)) {
                            isDisabled = false;
                          } else {
                            if (parseInt(m) <= parseInt(startMinute)) {
                              isDisabled = true;
                            }
                          }
                          return (
                            <button
                              key={m}
                              type="button"
                              onClick={() => !isDisabled && setEndMinute(m)}
                              disabled={isAllDay || isDisabled}
                              className={`px-2 py-0.5 text-xs border rounded-sm transition-colors ${endMinute === m
                                ? 'bg-blue-500 text-white border-blue-500'
                                : isDisabled
                                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                  : 'bg-white border-gray-300 hover:bg-gray-100'
                                }`}
                            >
                              {m}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-lg shadow-md p-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                詳細
              </label>
              <textarea
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                rows={10}
                placeholder="スケジュールの詳細を入力"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md transform hover:scale-[1.01] active:scale-[0.99]"
          >
            スケジュールを登録
          </button>
        </div>
      </div>
    </div>
  );
};

