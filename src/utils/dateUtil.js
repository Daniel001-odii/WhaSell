export function formatJoinedDate(isoDateString) {
    const now = new Date();
    const pastDate = new Date(isoDateString);
  
    const diffInMs = now - pastDate;
    const diffInYears = now.getFullYear() - pastDate.getFullYear();
    const diffInMonths = now.getMonth() - pastDate.getMonth() + (diffInYears * 12);
  
    const years = Math.floor(diffInMonths / 12);
    const months = diffInMonths % 12;
  
    let result = 'Joined ';
    if (years > 0) {
      result += `${years} year${years > 1 ? 's' : ''}`;
    }
    if (months > 0) {
      if (years > 0) {
        result += ' and ';
      }
      result += `${months} month${months > 1 ? 's' : ''}`;
    }
  
    result += ' ago';
    return result;
  }