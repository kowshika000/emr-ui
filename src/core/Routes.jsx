import { PUBLIC_ROUTES } from "./modules/public/PublicRoutes";
import { SECURE_ROUTES } from "./modules/secure/SecureRoutes";

export const EMR_ROUTES = [...PUBLIC_ROUTES, ...SECURE_ROUTES];
