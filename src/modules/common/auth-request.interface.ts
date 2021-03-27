import { User } from '../../models/user.entity';

export interface AuthenticatedRequest {
  user: User;
}
