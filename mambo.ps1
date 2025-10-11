# Example PowerShell script: mambo.ps1

# Display a welcome message
Write-Host "Welcome to Mambo Client Scenarios Management!"

# data types
[string]$clientName = "Mambo Client 1"
[string]$clientStatus = "Active"
[datetime]$lastContact = (Get-Date).AddDays(-7)
[string]$mamboVersion = "1.0.0"

# Define a sample client scenario as a hashtable
$clientScenario = @{
  Name         = $clientName
  Status       = $clientStatus
  LastContact  = $lastContact
  mamboVersion = $mamboVersion
}

$banner = @(
  "  ███╗   ███╗ █████╗ ███╗   ███╗██████╗  ██████╗ ",
  "  ████╗ ████║██╔══██╗████╗ ████║██╔══██╗██╔═══██╗",
  "  ██╔████╔██║███████║██╔████╔██║██████╔╝██║   ██║",
  "  ██║╚██╔╝██║██╔══██║██║╚██╔╝██║██╔══██╗██║   ██║",
  "  ██║ ╚═╝ ██║██║  ██║██║ ╚═╝ ██║██████╔╝╚██████╔╝",
  "  ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝  ╚═════╝ "
)


$asciiArt = @"
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║    __  __          __  __ ____   ____                        ║
║   |  \/  |   /\   |  \/  |  _ \ / __ \                       ║
║   | \  / |  /  \  | \  / | |_) | |  | |                      ║
║   | |\/| | / /\ \ | |\/| |  _ <| |  | |                      ║
║   | |  | |/ ____ \| |  | | |_) | |__| |                      ║
║   |_|  |_/_/    \_\_|  |_|____/ \____/                       ║
║                                                              ║
║           Client Scenarios Management                        ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
"@

Write-Host $asciiArt -ForegroundColor Cyan

foreach ($line in $banner) {
  Write-Host $line -ForegroundColor Green
}

# Output scenario details
Write-Host "Client Name: $($clientScenario.Name)" -ForegroundColor Cyan
Write-Host "Status: $($clientScenario.Status)" -ForegroundColor White
Write-Host "Mambo Version: $($clientScenario.mamboVersion)" -ForegroundColor Green
Write-Host "Last Contact: $($clientScenario.LastContact)" -ForegroundColor Yellow

# Simulate updating the scenario status
$clientScenario.Status = "Pending Review"
Write-Host "Updated Status: $($clientScenario.Status)"