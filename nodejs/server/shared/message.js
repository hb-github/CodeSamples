const ERRORS = {
  ALREADY_REGISTERED: 'A user has already registered with that email address.',
  BAD_LOGIN: 'Your login details could not be verified. Please try again.',
  INVALID_EMAIL: 'You must enter a valid email address.',
  INVALID_ENTRY: 'You have not filled out all the required fields.',
  INVALID_NAME: 'You must enter a full name.',
  INVALID_PASSWORD: 'You must enter a password.',
  JWT_EXPIRED:
    'For your safety, your session has expired. Please log back in and try your request again.',
  NO_PERMISSION: 'You do not have permission to access this content.',
  PASSWORD_CONFIRM_FAIL:
    'Your passwords did not match. Please attempt your request again.',
  PASSWORD_MUST_MATCH: 'Your passwords must match.',
  PASSWORD_RESET_EXPIRED:
    'Your password reset request may have expired. Please attempt to reset your password again.',
  PASSWORD_TOO_SHORT: 'Your password must be at least eight characters long.',
  USER_NOT_FOUND: 'No user was found.',
  ADMIN_ADDED_SUCCESS: 'Sub-user successfully insert.',
  REGISTER_MESSAGE:
    'Register completed, please check your mail for verification link',
  ADMIN_EDIT_SUCCESS: 'Profile update successfully.',
  OLD_PASSWORD_NOT_MATCH: 'Your old password does not match.',
  NEW_PASSWORD_CHANGED: 'Your new password has been updated.'
};

export default ERRORS;
