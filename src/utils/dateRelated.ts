export const addTimeToDate = (dateString:any , startTime:any ) => {
    dateString = dateString.toString()
    var parts:any[] = dateString.split(/[\s:]+/)
    var monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(parts[1])

    var date = new Date(parts[3], monthIndex, parts[2], parts[4], parts[5], parts[6])

    var startTimeParts = startTime.split(":")
    var desiredHours = parseInt(startTimeParts[0], 10)
    var desiredMinutes = parseInt(startTimeParts[1], 10)

    date.setHours(desiredHours)
    date.setMinutes(desiredMinutes)

    console.log(date)
    const ISOString = date.toISOString()
    console.log(ISOString)
    return ISOString
}


export const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: '2-digit' 
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };