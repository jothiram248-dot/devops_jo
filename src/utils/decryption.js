import CryptoJS from "crypto-js";

// Encryption constants
const key = CryptoJS.enc.Hex.parse(import.meta.env.VITE_CRYPTO_KEY);
const hmacKey = CryptoJS.enc.Hex.parse(import.meta.env.VITE_HMAC_KEY);

/**
 * Decrypts encrypted string using AES-256-CBC algorithm
 * @param {string} encrypted - The encrypted string in format "iv:encryptedData:hmac"
 * @returns {string} - The decrypted data
 */
export function decrypt(encrypted) {
  // Handle null or undefined encrypted string
  if (!encrypted) return "";

  const parts = encrypted.split(":");

  if (parts.length !== 3) {
    console.error("Invalid encrypted data format");
    return "";
  }

  const iv = CryptoJS.enc.Hex.parse(parts[0]);
  const encryptedData = parts[1];
  const hmac = parts[2];

  // Verify HMAC
  const computedHmac = CryptoJS.HmacSHA256(
    `${parts[0]}:${parts[1]}`,
    hmacKey
  ).toString();

  if (computedHmac !== hmac) {
    console.error("Data integrity verification failed");
    return "";
  }

  try {
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Hex.parse(encryptedData) },
      key,
      { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption failed:", error);
    return "";
  }
}

/**
 * Processes a credential resource object to decrypt sensitive fields
 * @param {Object} resource - The credential resource object
 * @returns {Object} - The credential object with decrypted fields
 */
export function decryptResource(resource) {
  if (!resource) return null;

  return {
    ...resource,
    userId: decrypt(resource.userId),
    password: decrypt(resource.password),
    additionalInfo: resource.additionalInfo
      ? decrypt(resource.additionalInfo)
      : "",
  };
}

/**
 * Processes API response data to decrypt all credential resources
 * @param {Object} responseData - The API response data
 * @returns {Object} - The processed response with decrypted credentials
 */
export function processCredentialsResponse(responseData) {
  // Handle case where response doesn't have resources
  if (!responseData) return responseData;

  // If it's a single resource (not in an array)
  if (!responseData.resources && responseData.id) {
    return decryptResource(responseData);
  }

  // If it's an array of resources
  if (responseData.resources && Array.isArray(responseData.resources)) {
    return {
      ...responseData,
      resources: responseData.resources.map((resource) =>
        decryptResource(resource)
      ),
    };
  }

  // Just return the original data if it doesn't match expected format
  return responseData;
}

/**
 * Decrypts nominee data within a nominee object
 * @param {Object} nominee - The nominee object containing encrypted fields
 * @returns {Object} - The nominee with decrypted fields
 */
export function decryptNomineeFields(nominee) {
  if (!nominee) return nominee;

  // Create a new object with all properties of the original
  const decryptedNominee = { ...nominee };

  // Decrypt common fields
  const fieldsToDecrypt = ["name", "email", "phone", "additionalInfo"];

  // Decrypt all potential encrypted fields
  fieldsToDecrypt.forEach((field) => {
    if (decryptedNominee[field]) {
      decryptedNominee[field] = decrypt(decryptedNominee[field]);
    }
  });

  return decryptedNominee;
}

/**
 * Processes a nominee resource object to decrypt sensitive fields
 * @param {Object} resource - The nominee resource object
 * @returns {Object} - The nominee resource with decrypted fields
 */
export function decryptNomineeResource(resource) {
  if (!resource) return null;

  // Check if there's a direct nominee object that needs decrypting
  if (resource.nominee) {
    return {
      ...resource,
      nominee: decryptNomineeFields(resource.nominee),
    };
  }

  // Check if this is a nominee entry with data structure
  if (resource.nomineeEntry) {
    const { nomineeEntry } = resource;

    // Create a new nomineeEntry object with decrypted data
    return {
      ...resource,
      nomineeEntry: {
        ...nomineeEntry,
        data: decryptNomineeDataObject(nomineeEntry.data),
      },
    };
  }

  return resource;
}

/**
 * Decrypts all sensitive fields in the nominee data object
 * @param {Object} data - The nominee data object containing encrypted fields
 * @returns {Object} - The data object with decrypted fields
 */
export function decryptNomineeDataObject(data) {
  if (!data) return data;

  // Create a copy of the data object
  const decryptedData = { ...data };

  // Decrypt common fields that might be encrypted
  const fieldsToDecrypt = [
    "userId",
    "password",
    "additionalInfo",
    "name",
    "phone",
    "email",
    "role",
  ];

  // Decrypt all potential encrypted fields
  fieldsToDecrypt.forEach((field) => {
    if (decryptedData[field]) {
      decryptedData[field] = decrypt(decryptedData[field]);
    }
  });

  // If there's a nested nominee object, decrypt it too
  if (decryptedData.nominee) {
    decryptedData.nominee = decryptNomineeFields(decryptedData.nominee);
  }

  return decryptedData;
}

/**
 * Processes API response data to decrypt all nominee resources
 * @param {Object} responseData - The API response data
 * @returns {Object} - The processed response with decrypted nominees
 */
export function processNomineesResponse(responseData) {
  // Handle case where response doesn't have data
  if (!responseData) return responseData;

  // If it has nomineeEntry directly at the top level
  if (responseData.nomineeEntry) {
    return {
      ...responseData,
      nomineeEntry: {
        ...responseData.nomineeEntry,
        data: decryptNomineeDataObject(responseData.nomineeEntry.data),
      },
    };
  }

  // If it's a single resource (not in an array)
  if (!responseData.resources && responseData.id) {
    return decryptNomineeResource(responseData);
  }

  // If it's an array of resources
  if (responseData.resources && Array.isArray(responseData.resources)) {
    return {
      ...responseData,
      resources: responseData.resources.map((resource) =>
        decryptNomineeResource(resource)
      ),
    };
  }

  // Just return the original data if it doesn't match expected format
  return responseData;
}

/**
 * Processes a notification resource object to decrypt sensitive fields
 * @param {Object} resource - The notification resource object
 * @returns {Object} - The notification object with decrypted fields
 */
export function decryptNotificationResource(resource) {
  if (!resource) return null;

  return {
    ...resource,
    additionalInfo: resource.additionalInfo
      ? decrypt(resource.additionalInfo)
      : "",
  };
}

/**
 * Processes API response data to decrypt all notification resources
 * @param {Object} responseData - The API response data
 * @returns {Object} - The processed response with decrypted notifications
 */
export function processNotificationsResponse(responseData) {
  // Handle case where response doesn't have data
  if (!responseData) return responseData;

  // If it's a single resource (not in an array)
  if (!responseData.resources && responseData.id) {
    return decryptNotificationResource(responseData);
  }

  // If it's an array of resources
  if (responseData.resources && Array.isArray(responseData.resources)) {
    return {
      ...responseData,
      resources: responseData.resources.map((resource) =>
        decryptNotificationResource(resource)
      ),
    };
  }

  // Just return the original data if it doesn't match expected format
  return responseData;
}
