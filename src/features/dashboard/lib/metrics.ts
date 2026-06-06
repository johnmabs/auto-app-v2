export function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

export function bucketMonthlyCounts(dates: Date[]) {
  const months = Array.from({ length: 12 }, (_, month) => ({
    month,
    count: 0,
  }));

  for (const date of dates) {
    months[date.getMonth()].count += 1;
  }

  return months;
}
