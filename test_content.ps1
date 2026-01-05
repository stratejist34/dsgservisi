$path = "c:\Users\Emrah\Desktop\ASTRO  Projeler\dsgservisi\src\content\blog\dsg-volant-degisimi.md"
$hero = Select-String -Path $path -Pattern "# DSG Volant Değişimi"
$table = Select-String -Path $path -Pattern "\| İşlem \|"
if ($hero -and $table) { exit 0 } else { exit 1 }
