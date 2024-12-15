export function formatDate(dateString: string) {
  return new Date(`${dateString}`).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
