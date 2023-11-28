This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Run the development server:

```bash
pnpm dev
```

Run all tests

```bash
pnpm test src/__tests__
```

## Enviroment variables

create `.env` file at the root of the project folder

```bash
NEXT_PUBLIC_API_URL=<your-api-url>
```

(default base url of the nextJS project http://localhost:3000/)

```bash
NEXT_PUBLIC_IMAGE_SOURCE_URL=<your-image-url>
```

(default source.unsplash.com)

## API Usage

#### Get all products

```http
  GET /api/products
```

| parameter | type     | description                            |
| :-------- | :------- | :------------------------------------- |
| `query`   | `string` | search string query to filter products |
| `page`    | `number` | pagination parameter for current page  |

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
