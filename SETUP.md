# NaturesForce CMS Setup Instructions

## 🎉 Your minimal admin panel is ready!

This is a simplified CMS system that allows you to manage website content with text and image editing capabilities.

## 📋 Setup Steps

### 1. Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to your project's SQL Editor
3. Run the SQL schema from `database/schema.sql`

### 2. Environment Configuration

1. Copy your Supabase project details
2. Update `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

### 3. Create Admin User

1. Go to Supabase Auth panel
2. Create a new user with email/password
3. Copy the user's UUID from the auth.users table
4. Insert the admin user into the `admin_users` table:
   ```sql
   INSERT INTO admin_users (id, email, full_name, is_active)
   VALUES ('user-uuid-here', 'admin@example.com', 'Admin Name', true);
   ```

### 4. Run the Application

```bash
npm run dev
```

## 🚀 Usage

### Admin Panel Features

- **Login**: Visit `/admin/login` with your admin credentials
- **Dashboard**: Overview at `/admin`
- **Pages**: Manage pages at `/admin/pages`
  - Create new pages
  - Edit existing pages
  - Content blocks: Hero, Text, Image
- **Media**: Basic media management (to be implemented)

### Content Management

- **Page Types**: Create any type of page (homepage, about, services, etc.)
- **Content Blocks**: Mix and match different content types
  - **Hero Block**: Title, subtitle, description, and call-to-action button
  - **Text Block**: Rich text content with titles
  - **Image Block**: Simple image display with alt text
- **SEO**: Meta titles and descriptions for each page
- **Status**: Draft and Published states

### Frontend

- **Homepage**: Automatically displays page marked as homepage
- **Dynamic Routes**: All other pages accessible via their slug
- **Responsive**: Mobile-friendly design

## 🔧 Key Files

- `src/app/admin/` - Admin panel pages
- `src/components/admin/` - Admin components
- `src/components/ContentRenderer.tsx` - Frontend content display
- `src/lib/supabase.ts` - Database client
- `src/lib/auth.ts` - Authentication utilities
- `database/schema.sql` - Database schema

## 🛡️ Security

- **Row Level Security (RLS)** enabled on all tables
- **Admin authentication** required for all admin operations
- **Public access** only to published pages
- **Environment variables** for sensitive data

## 📝 Next Steps (Optional)

If you want to extend the system, you could add:

- Media upload functionality (Supabase Storage)
- More content block types
- Site settings management
- Contact form handling
- SEO enhancements

## 🆘 Need Help?

1. Check Supabase logs for database errors
2. Verify environment variables are set correctly
3. Ensure admin user exists in `admin_users` table
4. Check browser console for JavaScript errors

Your minimal CMS is ready to use! 🎊
