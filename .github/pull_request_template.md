##  Summary

Provide a concise overview of the changes introduced in this PR. Include the motivation behind these changes, any relevant context, and specify if there are dependencies or prerequisites associated with this update.

## Change Type

Please select the appropriate option(s) that describe the nature of your changes:

- [ ] Bug fix (non-breaking change that resolves an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (modification that may affect existing functionality)
- [ ] Documentation update
- [ ] Refactoring (code restructuring without changing external behavior)

##  Testing

Detail the testing procedures you followed to validate your changes. Include step-by-step instructions to reproduce the tests and mention any specific configurations or variables that are pertinent.

**Test Configuration**: 

##  Checklist

Ensure the following criteria are met before requesting a review:

- [ ] My code adheres to the project's style guidelines( I appeased the linting gods by running `uvx ruff check --fix` and `uvx ruff format`(Install uv with `pip install uv` and then `uv tool install ruff` for ruff) for the backend, Prettier/ESLint for the frontend)
- [ ] I have performed a self-review of my code
- [ ] I have commented on complex areas of the code
- [ ] I have updated the documentation as necessary(Update the README with updated structure if reorganizing or creating new files)
- [ ] All new and existing unit tests pass locally with my changes
- [ ] I have verified that any dependent changes have been merged and deployed in downstream modules
