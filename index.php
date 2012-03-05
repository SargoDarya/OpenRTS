<?php

function getFilesFromDir($dir) { 

  $files = array(); 
  if ($handle = opendir($dir)) { 
    while (false !== ($file = readdir($handle))) { 
        if ($file != "." && $file != "..") { 
            if(is_dir($dir.'/'.$file)) { 
                $dir2 = $dir.'/'.$file; 
                $files[] = getFilesFromDir($dir2); 
            } 
            else { 
              $files[] = $dir.'/'.$file; 
            } 
        } 
    } 
    closedir($handle); 
  } 

  return arrayFlat($files); 
} 

function arrayFlat($array) { 

  foreach($array as $a) { 
    if(is_array($a)) { 
      $tmp = array_merge($tmp, arrayFlat($a)); 
    } 
    else { 
      $tmp[] = $a; 
    } 
  } 

  return $tmp; 
} 

function wrapInTags($array) {
  $buffer = "";
  foreach($array as $script) {
    if(substr($script, -3) != '.js') continue;
    $buffer .= "<script type=\"text/javascript\" src=\"$script\"></script>\r\n";
  }
  return $buffer;
}

$guiClasses = getFilesFromDir("js/GUI");
$gameClasses = getFilesFromDir("js/Game");
$threeXClasses = getFilesFromDir("js/THREE");
$utilsClasses = getFilesFromDir("js/Utils");

$scriptArray = array_merge($gameClasses, $threeXClasses, $utilsClasses);
$scripts = wrapInTags($scriptArray);

$tmpl = file_get_contents("index.html");

echo str_replace('<!--scripts-->', $scripts, $tmpl);

?>
