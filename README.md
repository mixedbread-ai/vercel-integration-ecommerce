# Vercel Integration Ecommerce Demo

A starter template for integrating Mixedbread Search into ecommerce applications using Next.js, Vercel, and Mixedbread.

> **Note:** This is a demo store that is currently not publicly accessible. We will add public stores in the future. Feel free to explore the code and use this as a starter template to build your own AI-powered search application.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmixedbread-ai%2Fvercel-integration-ecommerce&project-name=mixedbread-ecommerce-app&repository-name=mixedbread-ecommerce-app&demo-title=Mixedbread%20Starter&demo-description=A%20starter%20ecommerce%20template%20using%20Next.js%2C%20Vercel%2C%20and%20Mixedbread.%20Ship%20your%20app%20with%20AI%20search.&demo-url=https%3A%2F%2Fvercel-integration-ecommerce.vercel.app&demo-image=https%3A%2F%2Fvercel-integration-ecommerce.vercel.app%2Fhome.png&products=%5B%7B%22type%22%3A%22integration%22%2C%22integrationSlug%22%3A%22mixedbread%22%2C%22productSlug%22%3A%22search%22%2C%22protocol%22%3A%22other%22%7D%5D)

## See it in action:

https://github.com/user-attachments/assets/e57e6d13-10b0-40f7-9b3b-29e7d04c0de1

## Getting Started

### Prerequisites

- Node.js 22+
- Git

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd vercel-integration-ecommerce
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your Mixedbread API key to the `.env` file:

```txt
MXBAI_API_KEY=your-api-key-here
MXBAI_STORE_ID=your-store-id
```

**To get your API key and store ID, you have two options:**

1. **From Vercel Integration** (Recommended if deploying to Vercel):
   - Go to your [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to your project's **Integrations** tab
   - Install or access the Mixedbread integration
   - Copy your API key and store ID from the integration settings

2. **From Mixedbread Platform** (For standalone use):
   - Visit the [Mixedbread Platform](https://platform.mixedbread.com/platform?next=api-keys)
   - Sign up or log in to your account
   - Navigate to API Keys and create a new key
   - Copy your API key and store ID from the platform

### 4. Update Code and Metadata

This template is pre-configured to work with the commerce dataset. If you're using your own dataset, you'll need to update the code to match your metadata structure and content URLs.

**Key files to update:**

1. **`lib/types.ts`** - Update the `ProductMetadata` interface to match your dataset's metadata fields
2. **`components/product-grid.tsx`** - Update references to `metadata` fields (e.g., `metadata.name`, `metadata.description`) and `image_url.url`
3. **`app/api/search/route.ts`** - Adjust search parameters if needed (e.g., `top_k`, `score_threshold`)

**Example metadata structure used in this template:**

```typescript
{
  name: string;
  description?: string;
  filename?: string;
  price?: number;
  category?: string;
  // ... other fields
}
```

The template also expects search results to include an `image_url.url` field for product images.

### 5. Run the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Learn More

### Mixedbread Resources

- [Mixedbread Documentation](https://www.mixedbread.com/docs) - Learn about Mixedbread's features and APIs
- [Quickstart Guide](https://www.mixedbread.com/docs/quickstart) - Get started with creating stores and uploading files
- [Mixedbread Discord](https://discord.gg/fCpaq2dr) - Join the community and get support

## License

MIT
