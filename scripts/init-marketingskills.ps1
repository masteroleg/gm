<#
.SYNOPSIS
    Creates junction links from .agents/skills/<name> to D:\w\_skills\marketingskills\skills\<external-name>.
    Run after cloning the repo or after the external repo updates.
.DESCRIPTION
    Uses the MAPPING table to connect local skill names to external directories.
    Junction = no admin / Developer Mode required (same drive D: only).
    Pass -Force to overwrite real directories that are in the way.
.PARAMETER SourceBase
    Path to the external marketingskills skills directory.
.PARAMETER Force
    Remove existing directories that block junction creation.
#>

param(
    [string]$SourceBase = "D:\w\_skills\marketingskills\skills",
    [switch]$Force
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$TargetBase = Join-Path $RepoRoot ".agents" "skills"

# ---- MAPPING: local_name -> external_name ----
$MAPPING = @{
    "ab-test-setup"            = "ab-testing"
    "ad-creative"              = "ad-creative"
    "ai-seo"                   = "ai-seo"
    "analytics-tracking"       = "analytics"
    "aso-audit"                = "aso"
    "churn-prevention"         = "churn-prevention"
    "co-marketing"             = "co-marketing"
    "cold-email"               = "cold-email"
    "community-marketing"      = "community-marketing"
    "competitor-alternatives"  = "competitors"
    "competitor-profiling"     = "competitor-profiling"
    "content-strategy"         = "content-strategy"
    "copy-editing"             = "copy-editing"
    "copywriting"              = "copywriting"
    "customer-research"        = "customer-research"
    "directory-submissions"    = "directory-submissions"
    "email-sequence"           = "emails"
    "form-cro"                 = "cro"
    "free-tool-strategy"       = "free-tools"
    "image"                    = "image"
    "launch-strategy"          = "launch"
    "lead-magnets"             = "lead-magnets"
    "marketing-ideas"          = "marketing-ideas"
    "marketing-psychology"     = "marketing-psychology"
    "onboarding-cro"           = "onboarding"
    "page-cro"                 = "cro"
    "paid-ads"                 = "ads"
    "paywall-upgrade-cro"      = "paywalls"
    "popup-cro"                = "popups"
    "pricing-strategy"         = "pricing"
    "product-marketing-context" = "product-marketing"
    "programmatic-seo"         = "programmatic-seo"
    "referral-program"         = "referrals"
    "revops"                   = "revops"
    "sales-enablement"         = "sales-enablement"
    "schema-markup"            = "schema"
    "seo-audit"                = "seo-audit"
    "signup-flow-cro"          = "signup"
    "site-architecture"        = "site-architecture"
    "social-content"           = "social"
    "video"                    = "video"
}

# ---- Validate source ----
if (-not (Test-Path -LiteralPath $SourceBase)) {
    Write-Error "Source not found: $SourceBase"
    exit 1
}

Write-Host "Source: $SourceBase" -ForegroundColor Cyan
Write-Host "Target: $TargetBase" -ForegroundColor Cyan
Write-Host ""

# ---- Create junctions ----
$created = 0
$skipped = 0
$errors = 0

foreach ($entry in ($MAPPING.GetEnumerator() | Sort-Object Name)) {
    $localName = $entry.Key
    $externalName = $entry.Value
    $sourcePath = Join-Path $SourceBase $externalName
    $targetPath = Join-Path $TargetBase $localName

    if (-not (Test-Path -LiteralPath $sourcePath)) {
        Write-Warning "  [SKIP] Source missing: $sourcePath"
        $skipped++
        continue
    }

    if (Test-Path -LiteralPath $targetPath) {
        $item = Get-Item -LiteralPath $targetPath -Force
        if ($item.LinkType -eq "Junction") {
            Write-Host "  [ OK ] Already a junction: $localName" -ForegroundColor Green
            $skipped++
            continue
        }
        if (-not $Force) {
            Write-Warning "  [SKIP] Exists (not a junction): $targetPath — use -Force to replace"
            $skipped++
            continue
        }
            Remove-Item -Recurse -Force -LiteralPath $targetPath
    }

    try {
        # NOTE: -Force on New-Item -ItemType Junction creates a regular dir on some systems
        $null = New-Item -ItemType Junction -Path $targetPath -Target $sourcePath
        $createdItem = Get-Item -LiteralPath $targetPath -Force
        if ($createdItem.LinkType -ne "Junction") {
            Remove-Item -Recurse -Force -LiteralPath $targetPath
            throw "New-Item created a regular directory instead of a junction"
        }
        Write-Host "  [ OK ] $localName → $externalName" -ForegroundColor Green
        $created++
    } catch {
        Write-Error "  [FAIL] $localName → $externalName: $_"
        $errors++
    }
}

Write-Host ""
Write-Host "Done. Created: $created | Skipped: $skipped | Errors: $errors" -ForegroundColor Cyan

if ($created -gt 0) {
    Write-Host ""
    Write-Host "Junctions created. Run the following to update .gitignore:" -ForegroundColor Yellow
    Write-Host "  git rm -r --cached .agents/skills/<name>  (for each replaced skill)" -ForegroundColor Yellow
}
