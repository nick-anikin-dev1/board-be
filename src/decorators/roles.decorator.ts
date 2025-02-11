import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../task/types';

export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);
