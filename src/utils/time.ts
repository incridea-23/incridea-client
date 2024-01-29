export function parseTime(timeString: string): number {
  const timeParts = timeString.split(':').map(Number);
  let totalMilliseconds = 0;
  if (timeParts.length === 1) {
    totalMilliseconds = timeParts[0];
  } else if (timeParts.length === 2) {
    totalMilliseconds = timeParts[0] * 1000 + timeParts[1];
  } else if (timeParts.length === 3) {
    totalMilliseconds =
      timeParts[0] * 60000 + timeParts[1] * 1000 + timeParts[2];
  } else if (timeParts.length === 4) {
    totalMilliseconds =
      timeParts[0] * 3600000 +
      timeParts[1] * 60000 +
      timeParts[2] * 1000 +
      timeParts[3];
  }
  return totalMilliseconds;
}

export function formatTime(milliseconds: number): string {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const millisecondsLeft = milliseconds % 1000;
  let timeString = '';
  if (hours > 0) {
    timeString += `${hours}:`;
  }
  if (hours > 0 || minutes > 0) {
    timeString += `${minutes.toString().padStart(2, '0')}:`;
  }
  timeString += `${seconds.toString().padStart(2, '0')}.${millisecondsLeft
    .toString()
    .padStart(3, '0')}`;
  return timeString;
}
