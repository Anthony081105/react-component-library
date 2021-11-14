import { addDays, setDay, startOfWeek, format, setMonth } from 'date-fns';
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

export function buildMonths(){
    const months = new Array(12)
        .fill(0)
        .map((_, i)=> setMonth(new Date(0), i))
        .map((month, j)=> ({index:j ,name: format(month, 'MMMM')}))
    return chunk(months, 3);
}

export function buildYears(middle,windowSize = 3){
    const start =middle -windowSize;
    const end = middle + windowSize;
    const years = [];
    for(let i = start;i<=end ;i++){
        years.push(i);
    }
    return years;
}