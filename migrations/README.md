# Database Migrations

This project uses Sequelize migrations to manage database schema changes.

## Migration Commands

- `npm run db:migrate` - Run all pending migrations
- `npm run db:migrate:undo` - Undo the most recent migration
- `npm run db:migrate:undo:all` - Undo all migrations
- `npm run db:seed:all` - Run all seed files
- `npm run db:seed:undo:all` - Undo all seed files

## Creating New Migrations

To create a new migration:

```bash
npx sequelize-cli migration:generate --name migration-name
```

## Migration File Structure

Migration files should export an object with `up` and `down` methods:

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Code to migrate database forward
  },

  down: async (queryInterface, Sequelize) => {
    // Code to revert the migration
  }
};
```

## Best Practices

1. Always create a migration for schema changes
2. Test both up and down migrations
3. Include foreign key constraints
4. Keep migrations small and focused
5. Use descriptive migration names
