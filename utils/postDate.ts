const postDateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'America/Belem',
})

export function formatPostDate(date: string | Date): string {
  return postDateFormatter.format(new Date(date))
}
