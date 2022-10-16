# Auth API

---

## Getting Started 🚀

Project Clean Structure:

```
--project
|   ├── src
│   │   ├── modules
│   │   │   ├── name
│   │   │   │   ├── application
|   |   |   |   |   ├── mappers
|   |   |   |   |   |   ├── name-mapper.ts
|   |   |   |   |   ├── repositories
|   |   |   |   |   |   ├── name-repository-impl.ts
|   |   |   |   |   |   |
|   |   |   |   ├── domain
|   |   |   |   |   ├── dtos
|   |   |   |   |   |   ├── name-dto.dart
|   |   |   |   |   ├── entities
|   |   |   |   |   |   ├── name-entity.ts
|   |   |   |   |   ├── repositories
|   |   |   |   |   |   ├── i-name-repository.ts
|   |   |   |   |   ├── usecases
|   |   |   |   |   |   ├── name_repository_impl.dart
|   |   |   |   |   |   |
|   |   |   |   ├── presenter
|   |   |   |   |   ├── controllers
|   |   |   |   |   |   ├── name-controller.ts
|   |   |   └── └── └──
│   │   └── 
│   └──  
└── ...
```

---

How to run this project?

To run this project, use those commands below:

```sh
# Install dependencies
$ yarn

# Run in developing mode
$ yarn dev
```

---

## Running Tests 🧪

To run all unit and integration tests use the command below:

```sh
# Simple test result overview
$ yarn test

# Run tests and get coverage
$ yarn test:cov

# Run E2E tests
$ yarn test:e2e
```