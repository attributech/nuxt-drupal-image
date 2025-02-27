# Contributing to @attributech/nuxt-drupal-image

Thank you for considering contributing to this project! Here's how you can help.

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/attributech/nuxt-drupal-image.git
   cd nuxt-drupal-image
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the module:
   ```bash
   npm run build
   ```

4. Run the playground (for testing):
   ```bash
   npm run dev
   ```

## Development Workflow

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and ensure they follow the project's coding style.

3. Run linting:
   ```bash
   npm run lint
   ```

4. Fix any linting issues:
   ```bash
   npm run lint:fix
   ```

5. Build the module to ensure it compiles correctly:
   ```bash
   npm run build
   ```

6. Commit your changes with a descriptive commit message.

7. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```

8. Create a pull request against the main branch.

## Pull Request Guidelines

- Ensure your code follows the project's coding style.
- Include tests for new features or bug fixes if applicable.
- Update documentation if necessary.
- Keep pull requests focused on a single change.
- Make sure all tests pass and there are no linting errors.

## Release Process

Releases are managed by the maintainers. The process typically involves:

1. Updating the version in package.json
2. Creating a new GitHub release
3. The GitHub Actions workflow will automatically publish to npm

## Code of Conduct

Please be respectful and considerate of others when contributing to this project.

## License

By contributing to this project, you agree that your contributions will be licensed under the project's MIT license.
