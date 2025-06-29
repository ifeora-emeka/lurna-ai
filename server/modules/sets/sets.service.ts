import Set from '../../models/Set';

export const createHardcodedSet = async () => {
  try {
    const hardcodedSet = {
      name: 'Sample Set',
      description: 'This is a hardcoded sample set created via API',
    };

    const newSet = await Set.create(hardcodedSet);
    return newSet;
  } catch (error) {
    throw error;
  }
};