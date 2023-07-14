export class UnexpectedError extends Error {
  constructor() {
    super('UnexpectedError');
  }
}

export class QuotaExceededError extends Error {
  constructor() {
    super('QuotaExceededError');
  }
}

export function getErrorDetail(key: string) {
  const errorMapping: Record<string, { title: string; description: string }> = {
    default: {
      title: 'Something went wrong!',
      description: 'Please try again later',
    },
    QuotaExceededError: {
      title: 'The Quota Has Been Exceeded!',
      description:
        'Daily quota has been reached today, please try again tomorrow',
    },
  };

  return errorMapping[key] ?? errorMapping.default;
}
