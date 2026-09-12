export const generateTicketId = (): string => {
  const prefix = 'TK';
  const randomDigits = Math.floor(10005 + Math.random() * 89990);
  return `${prefix}-${randomDigits}`;
};
