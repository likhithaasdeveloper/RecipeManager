export const NAV_ITEMS = [
  // ADMIN LINKS
  {
    label: 'Pending Approvals',
    path: '/admin/approvals',
    roles: ['ADMIN'],
  },
  {
    label: 'Approved Recipes',
    path: '/admin/recipes',
    roles: ['ADMIN'],
  },

  // CREATOR LINKS
  {
    label: 'Create New Recipe',
    path: '/creator/create',
    roles: ['CREATOR'],
  },
  {
    label: 'All Recipes',
    path: '/creator/recipes',
    roles: ['CREATOR'],
  },
  {
    label: 'My Recipes',
    path: '/creator/my-recipes',
    roles: ['CREATOR'],
  },

  // END USER LINKS
  {
    label: 'Explore Recipes',
    path: '/user/recipes',
    roles: ['USER'],
  },
  {
    label: 'Saved Recipes',
    path: '/saved-recipes',
    roles: ['USER'],
  },
];