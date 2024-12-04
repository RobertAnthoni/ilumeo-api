export function getStartAndEndOfDay(date: Date): {
  startOfDay: Date;
  endOfDay: Date;
} {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return { startOfDay, endOfDay };
}

export function getFirstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getLastDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function formatDateDDMMYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function groupeByDay(points: Date[]): { [date: string]: string[] } {
  return points.reduce((dateArray: { [date: string]: string[] }, point) => {
    let day = point.toISOString().split("T")[0];
    let hour = point.getHours();
    let minute = point.getMinutes();

    day = formatDateDDMMYYY(new Date(day));

    if (!dateArray[day]) {
      dateArray[day] = [];
    }

    dateArray[day].push(
      `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
    );

    return dateArray;
  }, {});
}

export function sumHours(points: Date[]): number {
  return points.reduce((sum, point) => {
    const hour = point.getHours();
    const minute = point.getMinutes();
    return sum + hour + minute / 60;
  }, 0);
}

export function sumWorkedHours(points: Date[]): string {
  let minutes = 0;

  for (let i = 0; i < points.length; i += 2) {
    let start = points[i];
    let end = points[i + 1];

    if (!end) {
      end = start;
    }

    const difMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    minutes += difMinutes;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(remainingMinutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}
