export class UserProfile {
  email: string;
  username: string;
}
export class LoginResponse {
  tokens: {
    accessToken: string;
  };
  user: UserProfile;
}
