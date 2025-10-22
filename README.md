# Vercel with Mixedbread

A starter template for building AI Search applications using Next.js, Vercel, and Mixedbread.

> **Note:** This is a demo store that is currently not publicly accessible. We will add public stores in the future. Feel free to explore the code and use this as a starter template to build your own AI-powered search application.

## Demo Video

See the application in action:


## Getting Started

### Prerequisites

- Node.js 22+ installed
- Git installeds

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
```

**To get your API key, you have two options:**

1. **From Vercel Integration** (Recommended if deploying to Vercel):
   - Go to your [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to your project's **Integrations** tab
   - Install or access the Mixedbread integration
   - Copy your API key from the integration settings

2. **From Mixedbread Platform** (For standalone use):
   - Visit the [Mixedbread Platform](https://platform.mixedbread.com/platform?next=api-keys)
   - Sign up or log in to your account
   - Navigate to API Keys and create a new key

### 4. Run the Application

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

This project is open source and available as a starter template for building AI-powered search applications.
