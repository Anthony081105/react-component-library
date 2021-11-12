import { addDays, setDay, startOfWeek, format } from 'date-fns';
import chunk from 'lodash/chunk';

export function buildWeeks(year,monthIndex) {
    // 获取每个月的第一天
    const firstDayofMonth = new Date(year, monthIndex);
    // 根据每个月的第一天，推算出这个日历表应该显示的完整第一周的起始日期
    const firstDayofCalendar = startOfWeek(firstDayofMonth,{weekStartsOn: 0});// date-fns
    const weeks = new Array(6 * 7)
        .fill(0)
        .map((_,i)=>addDays(firstDayofCalendar, i));
    return chunk(weeks, 7);
}

export function buildDayNames(weekStartsOn){
    return new Array(7)
        .fill(0)
        .map((_,i)=> (i + weekStartsOn) % 7)
        .map(dayofWeek=>{
            const day = setDay(new Date(0), dayofWeek);
            return format(day, "EEEEEE");
        })
}