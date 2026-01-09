# GitHub Setup Guide

Your project is now ready to push to GitHub! Follow these steps:

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right, then select **"New repository"**
3. Fill in the repository details:
   - **Repository name**: `menuzen` (or any name you prefer)
   - **Description**: "Menuzin - Restaurant landing page with admin panel"
   - **Visibility**: Choose **Private** (recommended) or **Public**
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

## Step 2: Connect and Push

After creating the repository, GitHub will show you commands. Use these in your terminal:

```bash
# Navigate to your project (if not already there)
cd C:\Users\muham\OneDrive\Desktop\web

# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/menuzen.git

# Push your code
git branch -M main
git push -u origin main
```

**Note**: If you already have a `main` branch, the `git branch -M main` command will rename your current branch to `main`. If you prefer to keep `master`, you can skip that line and use:
```bash
git push -u origin master
```

## Step 3: Authentication

GitHub may ask for authentication:
- **Personal Access Token**: If using HTTPS, you'll need a token
- **SSH**: If you have SSH keys set up, you can use the SSH URL instead: `git@github.com:YOUR_USERNAME/menuzen.git`

To create a Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Copy the token and use it as your password when pushing

## Important Notes

✅ **Your `.env` file is safely ignored** - it won't be pushed to GitHub  
✅ **All sensitive data is protected** - only `.env.example` is included  
✅ **Your code is ready** - everything is committed and ready to push

## After Pushing

Once pushed, you can:
- Share the repository URL with collaborators
- Set up CI/CD pipelines
- Deploy to Vercel (connect GitHub repo for automatic deployments)
- Add collaborators in GitHub settings

## Troubleshooting

**If you get authentication errors:**
- Use a Personal Access Token instead of password
- Or set up SSH keys for easier authentication

**If you want to remove sensitive files before pushing:**
- They're already in `.gitignore`, so they won't be tracked
- If you accidentally committed them before adding to `.gitignore`, contact me for help





