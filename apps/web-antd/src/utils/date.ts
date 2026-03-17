// 计算两个时间的分钟差（跨天自动处理）
export function calculateDuration(
  start: string,
  end: string,
  firstDayAfter: string,
  secondDayAfter: string,
): number {
  const startDate = new Date(`1970-01-01T${start}`);
  const endDate = new Date(`1970-01-01T${end}`);

  // 处理跨天（如 22:00 到 02:00）
  if (firstDayAfter < secondDayAfter) {
    endDate.setDate(endDate.getDate() + 1);
  }

  return (endDate.getTime() - startDate.getTime()) / 1000 / 60;
}

// 分钟时长转换为xx小时xx分钟
export function formatDuration(duration: number): string {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}小时${minutes}分钟`;
}
