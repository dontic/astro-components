This component provides a simple way to add a fully functional waitlist form to your Astro project.

It has 2 files:
1. The `WaitlistForm.tsx` file that contains the form itself.
2. The `createBrevoContact.ts` file that creates an Astro endpoint to handle the form submission.

## Getting Started

### 1. Install dependencies

1.1 React
```bash
npx astro add react
```

1.2 Tailwind
```bash
npx astro add tailwind
```

1.3 React hook form, zod and hookform resolvers
```bash
npm install react-hook-form zod @hookform/resolvers
```

1.4 Shadcn UI `Button`, `Form`, `Alert` and `Input` components  

Follow the instructions [here](https://ui.shadcn.com/docs/installation/astro)

1.5 Lucide Icons
```bash
npm install lucide-react
```

### 2. Enable SSR

For the API endpoint to be secure, you will need to enable SSR in your project.

If you haven't done this yet, you can follow the instructions [here](https://docs.astro.build/en/guides/server-side-rendering/).

### 3. Add environment variables

You will need to add the following environment variable to your `.env` file:

```bash
BREVO_API_KEY=your_api_key
```

### 4. Copy the `WaitlistForm.tsx` file

I normally copy this under `src/components/`.

### 5. Copy the `createbrevocontact.ts` file

This needs to be copied under `src/pages/api/`.

If you want to have it somewhere else, make sure to change the `APIENDPOINT` in the `WaitlistForm.tsx` file.

Modify the data:
- `LISTIDS` - The list IDs you want to add the contact to on creation.
- `UPDATEENABLED` - If you want to update the contact if it already exists. Otherwise, it will return an error.