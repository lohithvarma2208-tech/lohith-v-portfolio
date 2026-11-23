# ==============================================================================
# LOHITH VARMA PORTFOLIO - DEPLOYMENT AUTOMATION SCRIPT
# ==============================================================================
# Usage: Run in PowerShell from project root:
# .\deploy.ps1

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   LOHITH VARMA PORTFOLIO - DEPLOYMENT ORCHESTRATOR      " -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Test Production Build
Write-Host "[1/3] Building production bundle (tsc & vite)..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Production build failed. Please fix any errors above." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Production bundle built successfully in ./dist" -ForegroundColor Green
Write-Host ""

# 2. Check Git Status & Remote
Write-Host "[2/3] Checking Git status..." -ForegroundColor Yellow
$remotes = git remote -v
if (-not $remotes) {
    Write-Host "⚠️  No Git remote configured yet." -ForegroundColor Yellow
    Write-Host "   To link to your GitHub account (lohithvarma2208-tech):" -ForegroundColor Cyan
    Write-Host "   1. Create an empty repository at: https://github.com/new (e.g. lohith-v-portfolio)" -ForegroundColor White
    Write-Host "   2. Run:" -ForegroundColor White
    Write-Host "      git remote add origin https://github.com/lohithvarma2208-tech/lohith-v-portfolio.git" -ForegroundColor Green
    Write-Host "      git push -u origin master" -ForegroundColor Green
} else {
    Write-Host "✅ Git remote found:" -ForegroundColor Green
    git remote -v
    Write-Host "Pushing latest commits to remote..." -ForegroundColor Cyan
    git push origin master
}
Write-Host ""

# 3. Vercel & Render Deployment Options
Write-Host "[3/3] Cloud Deployment Options:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   Option A: Deploy to Vercel via CLI" -ForegroundColor White
Write-Host "   Run: npx vercel" -ForegroundColor Green
Write-Host "   (Follow the prompt to link to your Vercel account or deploy preview)" -ForegroundColor Gray
Write-Host ""
Write-Host "   Option B: Deploy to Vercel / Render via GitHub" -ForegroundColor White
Write-Host "   1. Push your code to GitHub (Option 2 above)" -ForegroundColor Gray
Write-Host "   2. Import repository at https://vercel.com/new" -ForegroundColor Gray
Write-Host "   3. Vercel automatically detects Vite and deploys in 30 seconds!" -ForegroundColor Gray
Write-Host ""
Write-Host "   Option C: Supabase Database Setup" -ForegroundColor White
Write-Host "   1. Open: https://supabase.com/dashboard/project/_/sql" -ForegroundColor Gray
Write-Host "   2. Paste the contents of ./supabase/schema.sql and click Run" -ForegroundColor Gray
Write-Host "   3. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan
