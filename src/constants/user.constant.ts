export const USER_ROLES = {
   CUSTOMER: 'customer',
   ADMIN: 'admin',
   MANAGER: 'manager',
   SUPER_ADMIN: 'super-admin',
};

export const RESTAURANTS_TYPES = {
   VEG: 1,
   NON_VEG: 2,
   BOTH: 3,
};

export const PERMISSIONS = {
   READ_USER: 'read_user',
   UPDATE_USER: 'update_user',
   DELETE_USER: 'delete_user',

   CREATE_RESTAURANT: 'create_restaurant',
   READ_RESTAURANT: 'read_restaurant',
   UPDATE_RESTAURANT: 'update_restaurant',
   DELETE_RESTAURANT: 'delete_restaurant',
   CREATE_RESTAURANT_USER: 'create_restaurant_user',
};

export const ROLE_WISE_PERMISSIONS = {
   [USER_ROLES.SUPER_ADMIN]: [...Object.values(PERMISSIONS)],
   [USER_ROLES.ADMIN]: [
      PERMISSIONS.CREATE_RESTAURANT_USER,
      PERMISSIONS.READ_USER,
      PERMISSIONS.UPDATE_USER,
      PERMISSIONS.DELETE_USER,
      PERMISSIONS.READ_RESTAURANT,
   ],
   [USER_ROLES.MANAGER]: [PERMISSIONS.READ_RESTAURANT, PERMISSIONS.UPDATE_USER],
   [USER_ROLES.CUSTOMER]: [
      PERMISSIONS.READ_RESTAURANT,
      PERMISSIONS.UPDATE_USER,
   ],
};
