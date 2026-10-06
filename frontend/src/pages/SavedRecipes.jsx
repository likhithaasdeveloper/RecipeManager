import React from 'react';
import { RecipeBrowser } from './RecipeBrowser';

export const SavedRecipes = () => {
  return <RecipeBrowser showSavedOnly={true} />;
};