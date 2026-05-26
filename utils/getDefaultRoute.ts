import { ROLES } from '@/constants/roles';

export const getDefaultRoute = (roles: string[]) => {
    if (roles.includes(ROLES.ADMIN)) return '/admin';

    if (roles.includes(ROLES.REGISTRAR)) return '/registrar';

    if (roles.includes(ROLES.VERIFIER)) return '/verifier';

    return '/appeals';
};
