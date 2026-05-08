export function daysUntilExam(examDate: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const exam = new Date(examDate + 'T00:00:00');
  const diff = exam.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
