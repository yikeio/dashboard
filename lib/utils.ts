import { ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { twMerge } from 'tailwind-merge';

import 'dayjs/locale/zh-cn';
import { NextRouter, useRouter } from 'next/router';

dayjs.locale('zh-cn'); // 全局使用

dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(dateStr) {
  const date = dayjs(dateStr);
  return date.fromNow();
}

export function formatDatetime(dateStr, format = 'YYYY-MM-DD HH:mm:ss') {
  const date = dayjs(dateStr);
  return date.format(format);
}

export function pagginationHandler(router: NextRouter) {
  return (page: { selected: number }) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = (page.selected + 1).toString();

    router.push({
      pathname: currentPath,
      query: currentQuery
    });
  };
}
