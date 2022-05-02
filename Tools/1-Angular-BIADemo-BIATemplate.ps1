# $oldName = Read-Host "old project name ?"
$oldName = 'BIADemo'
# $newName = Read-Host "new project name ?"
$newName = 'BIATemplate'

$scriptPath = split-path -parent $MyInvocation.MyCommand.Definition
$newPath = $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath("$scriptPath\..\..\$newName\Angular")
$oldPath = Resolve-Path -Path "$scriptPath\..\..\$oldName\Angular"

Write-Host "old name: " $oldName
Write-Host "new name: " $newName


# Returns all line numbers containing the value passed as a parameter.
function GetLineNumber($pattern, $file) {
  $LineNumber = Select-String -Path $file -Pattern $pattern | Select-Object -ExpandProperty LineNumber
  return $LineNumber
}

# Deletes a set of lines whose number is between $start and $end.
function DeleteLine($start, $end, $file) {
  $i = 0
  $start--
  $end--
  Write-Host "start " $start "end " $end "file " $file
  (Get-Content $file) | Where-Object {
	(($i -ne $start -1 -or $_.Trim() -ne '') -and 
    ($i -lt $start -or $i -gt $end))
    $i++
  } | set-content $file 
}

# Deletes lines between // Begin BIADemo and // End BIADemo 
function RemoveCodeExample {
  Get-ChildItem -File -Recurse -exclude *.ps1, *.md | Where-Object { $_.FullName -NotLike "*/node_modules/*" -and $_.FullName -NotLike "*/dist/*" -and $_.FullName -NotLike "*/scss/*" -and $_.FullName -NotLike "*/docs/*" -and $_.FullName -NotLike "*/assets/*" } | ForEach-Object { 
    $lineBegin = @()
    $file = $_.FullName
  
    $searchWord = 'Begin BIADemo'
    $starts = GetLineNumber -pattern $searchWord -file $file
    $lineBegin += $starts
  
    $searchWord = 'End BIADemo'
    $ends = GetLineNumber -pattern $searchWord -file $file
    $lineBegin += $ends
  
    if ($lineBegin -and $lineBegin.Length -gt 0) {
      $lineBegin = $lineBegin | Sort-Object
      for ($i = $lineBegin.Length - 1; $i -gt 0; $i = $i - 2) {
        $start = [int]$lineBegin[$i - 1]
        $end = [int]$lineBegin[$i]
        DeleteLine -start $start -end $end -file $file
      }
    }
  }
}

function RemoveBIADemoOnlyFiles {
	foreach ($childFile in Get-ChildItem -File -Recurse | Where-Object { Select-String "// BIADemo only" $_ -Quiet } ) { 
		$file = $childFile.FullName
		$fileRel = Resolve-Path -Path "$file" -Relative
		$searchWord = '// BIADemo only'
		$starts = GetLineNumber -pattern $searchWord -file $file
		if ($starts -eq 1)
		{
			Write-Verbose "Remove $fileRel" -Verbose
			Remove-Item -Force -LiteralPath $file
		}
	}
}

function RemoveEmptyFolder {
    param(
        $Path
    )
    foreach ($childDirectory in Get-ChildItem -Force -Path $Path -Directory -Exclude PublishProfiles,RepoContract) {
        RemoveEmptyFolder $childDirectory.FullName
    }
    $currentChildren = Get-ChildItem -Force -LiteralPath $Path
    $isEmpty = $currentChildren -eq $null
    if ($isEmpty) {
	 	$fileRel = Resolve-Path -Path "$Path" -Relative
        Write-Verbose "Removing empty folder '${fileRel}'." -Verbose
        Remove-Item -Force -LiteralPath $Path
    }
}

function RemoveFolder {
  param (
    [string]$path
	$exclude
  )
  if (Test-Path $path) {
    Write-Host "delete " $path " folder"
    Remove-Item $path -Recurse -Force -Confirm:$false -Exclude $exclude
  }
}

function RemoveByExtension {
  param (
    [string]$path,
    [string]$extension
  )
  if (Test-Path $path) {
    Write-Host "delete " $extension " in " $path " folder" 
    Get-ChildItem -Path $path $extension | ForEach-Object { Remove-Item -Path $_.FullName -Recurse -Force -Confirm:$false }
  }
}

function ReplaceProjectName {
  param (
    [string]$oldName,
    [string]$newName
  )
  Get-ChildItem -File -Recurse -include *.csproj, *.cs, *.sln, *.json, *.config, *.ps1, *.ts, *.html, *.yml | Where-Object { $_.FullName -NotLike "*\node_modules\*" -and $_.FullName -NotLike "*\dist\*" -and $_.FullName -NotLike "*\scss\*" -and $_.FullName -NotLike "*\assets\*" } | ForEach-Object { 
    $oldContent = [System.IO.File]::ReadAllText($_.FullName);
    $newContent = $oldContent.Replace($oldName, $newName);
    if ($oldContent -ne $newContent) {
      Write-Host $_.FullName
      [System.IO.File]::WriteAllText($_.FullName, $newContent)
    }
  }
  
}

RemoveFolder -path "$newPath\*" -Exclude ('dist', 'node_modules')

Write-Host "Copy from $oldPath to $newPath"
Copy-Item -Path (Get-Item -Path "$oldPath\*" -Exclude ('dist', 'node_modules')).FullName -Destination $newPath -Recurse -Force

Set-Location -Path $newPath

New-Item -ItemType Directory -Path '.\docs'
Write-Host "Zip plane"
compress-archive -path '.\src\app\features\planes\*' -destinationpath '.\docs\feature-planes.zip' -compressionlevel optimal

Write-Host "Zip airport option"
compress-archive -path '.\src\app\domains\airport-option\*' -destinationpath '.\docs\domain-airport-option.zip' -compressionlevel optimal

Write-Host "Zip aircraft-maintenance-companies"
compress-archive -path '.\src\app\features\aircraft-maintenance-companies\*' -destinationpath '.\docs\aircraft-maintenance-companies.zip' -compressionlevel optimal


Write-Host "RemoveFolder dist"
RemoveFolder -path 'dist'
Write-Host "RemoveFolder node_modules"
RemoveFolder -path 'node_modules'

Write-Host "RemoveFolder src\app\features\aircraft-maintenance-companies"
RemoveFolder -path 'src\app\features\aircraft-maintenance-companies'

Write-Host "RemoveFolder src\app\features\planes"
RemoveFolder -path 'src\app\features\planes'
Write-Host "RemoveFolder src\app\features\planes-popup"
RemoveFolder -path 'src\app\features\planes-popup'
Write-Host "RemoveFolder src\app\features\planes-page"
RemoveFolder -path 'src\app\features\planes-page'
Write-Host "RemoveFolder src\app\features\planes-view"
RemoveFolder -path 'src\app\features\planes-view'
Write-Host "RemoveFolder src\app\features\planes-types"
RemoveFolder -path 'src\app\features\planes-types'
Write-Host "RemoveFolder src\app\features\planes-signalR"
RemoveFolder -path 'src\app\features\planes-signalR'
Write-Host "RemoveFolder src\app\features\planes-calc"
RemoveFolder -path 'src\app\features\planes-calc'
Write-Host "RemoveFolder src\app\features\planes-offline"
RemoveFolder -path 'src\app\features\planes-offline'
Write-Host "RemoveFolder src\app\features\airports"
RemoveFolder -path 'src\app\features\airports'
Write-Host "RemoveFolder src\app\features\hangfire"
RemoveFolder -path 'src\app\features\hangfire'

Write-Host "RemoveFolder src\app\domains\airport-option"
RemoveFolder -path 'src\app\domains\airport-option'
Write-Host "RemoveFolder src\app\domains\plane-type-option"
RemoveFolder -path 'src\app\domains\plane-type-option'

#Write-Host "RemoveFolder src\assets\bia\primeng\sass"
#RemoveFolder -path 'src\assets\bia\primeng\sass'
#RemoveByExtension -path 'src\assets\bia\primeng\layout\css' -extension '*.scss'
#RemoveByExtension -path 'src\assets\bia\primeng\theme' -extension '*.scss'

Write-Host "Remove BIA demo only files"
RemoveBIADemoOnlyFiles

Write-Host "Remove Empty Folder"
RemoveEmptyFolder "."

Write-Host "Remove code example partial files"
RemoveCodeExample

Write-Host "replace project name"
ReplaceProjectName -oldName $oldName -newName $newName
ReplaceProjectName -oldName $oldName.ToLower() -newName $newName.ToLower()

# Write-Host "npm install"
# npm install
# Write-Host "ng build --aot"
# ng build --aot


Set-Location -Path $scriptPath


# Write-Host "Prepare the zip."
# compress-archive -path '.\Angular' -destinationpath '..\BIADemo\Docs\Templates\VX.Y.Z\BIA.AngularTemplate.X.Y.Z.zip' -compressionlevel optimal -Force


Write-Host "Finish"
pause
