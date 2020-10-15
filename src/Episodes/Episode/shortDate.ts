import format from "date-fns/format"
import isSameDay from "date-fns/isSameDay"
import isSameYear from "date-fns/isSameYear"
import addDays from "date-fns/addDays"

const shortDate = (date: Date) => {
  if (isSameDay(date, new Date())) {
    return "TODAY"
  } else if (isSameDay(date, addDays(new Date(), -1))) {
    return "YESTERDAY"
  } else if (isSameYear(date, new Date())) {
    return format(date, "MMM d").toUpperCase()
  }
  return format(date, "MMM d, yyyy").toUpperCase()
}

export default shortDate
