export const formatNumber = (number) => {
    if (number >= 1_000_000_000) {
        return (number / 1_000_000_000).toFixed(1) + 'B';
    } else if (number >= 1_000_000) {
        return (number / 1_000_000).toFixed(1) + 'M';
    } else if (number >= 1_000) {
        return (number / 1_000).toFixed(1) + 'K';
    } else {
        return number.toString();
    }
}


export const formatPublishedTime = (publishedAt) => {
    const publishedDate = new Date(publishedAt);
    const now = new Date();
    const secondsAgo = Math.floor((now - publishedDate) / 1000);

    const intervals = [
        {label: 'year', seconds: 31536000},
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
    ]

    for (const interval of intervals) {
        const count = Math.floor(secondsAgo / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`
        }
    }

    return 'Just now';
}


export const formatISODuration = (duration) => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  } else {
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }
}