This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Technical Highlights

### MongoDB and Mongoose

The choice of database was one of the earliest technical decisions. I picked MongoDB for two reasons:

- I had been thinking about learning MongoDB for a while.
- Menus, the core feature of the app, would use polymorphism and nested documents, which is a great use case for a document database.

MongoDB offers an official Node.js driver that enables queries and other basic features. I used that as an initial, very basic solution, but started having additional needs as the application took shape:

- Sanitizing and validating client-submitted documents.
- Frequently casting ObjectId to String, since React reducers require plain values.
- More concise syntax for connecting to the database and querying documents on every page.
- Generating and populating the database consistently in different iterations and environments.

In the end I decided to adopt [Mongoose](https://github.com/Automattic/mongoose), as it offers all those solutions and more.

Database related files:

- `src/database/*`

### Vercel Blob

Vercel Blob is a cloud-based file storage solution by Vercel. I wanted to try it because it's tightly integrated with Vercel, where I'm hosting the app.

- https://vercel.com/joaomarceloods/cardapiooo/stores/blob/store_rAXVvHHchCoCsMG2/browser

The app stores product photos there:

- `src/app/admin/menu/[id]/(edit)/components/items/product.tsx`
- `src/app/api/product-photo/route.ts`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Notes to Self

- https://react-beautiful-dnd.netlify.app/?path=/story/nested-interative-elements--stress-test
- https://react.dev/learn/scaling-up-with-reducer-and-context
- https://ant.design/components/overview/
