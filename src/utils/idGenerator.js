// Utility to generate unique IDs
export const generateUserId = () => {
  // Format: SS-TIMESTAMP-RANDOM
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `SS-${timestamp}-${random}`;
};

// Validate user ID format
export const isValidUserId = (id) => {
  return /^SS-[a-z0-9]+-[A-Z0-9]+$/.test(id);
};