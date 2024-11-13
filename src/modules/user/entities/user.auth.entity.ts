import { UserProfile } from './user.entity';

export class LoginResponse {
  tokens: {
    accessToken: string;
  };
  user: UserProfile;
}
