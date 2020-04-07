# Project Title

Photoshop plugin, that automatically applies data-set parameters to defined variables, then save every artboard to defined directory.

### Installing

Move .jsx file to Photoshop's script directory.

Example for macOS: /Applications/Adobe Photoshop CC 2018/Presets/Scripts

Restart Photoshop then go to File >> Script  to access.

## Getting Started

1. Fill data-set file, where 1st string for variables names (use dataSetExampleTemplate.csv as a reference).
Each subsequent line corresponds to a separate banner type.
It is very important to pass the values to the variables in the order that corresponds to the order of their names in the first line, separated by comma.
If rational numbers are used, use dot symbol as a separator (e.g. $ 47.54).

2. Define variables in Photoshop file.

3. Make one or more artboards. Artboard's name will become relative path to banner, so if you want to save banners in separated directories you need to describe this path (ex. fb/1200x628)*.

4. Start script.

5. Get some tea and enjoy how tiny robot works.

## Authors

* Leo Nardo

See also the list of [contributors](http://192.168.88.240:3000/leonardo/scripts.ps.saveFromDatasetToJpg) who participated in this project.
