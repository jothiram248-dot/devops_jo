// Mock email service for development
export const sendVerificationEmail = async (email, code, credentialTitle) => {
  console.log(`Verification code ${code} sent to ${email} for credential: ${credentialTitle}`);
  
  // In production, this would integrate with your email service
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Verification code sent successfully'
      });
    }, 1000);
  });
};