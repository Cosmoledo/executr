## executr
At first, I am german and I use double quotes instead of single ones in JS. Don't blame me.

### Why this branch
The master branch is nice but I missed the option to change the CodeMirror object. I wanted to give him a special KeyListener but I couldn't reach it.
So I wrote my own executr. I also removed the CoffeeScript stuff, because I didn't need it.

### Include the files
````html
<!-- You should already have jQuery included -->

<!-- CodeMirror is used to make the code blocks editable -->
<script type="text/javascript" src="lib/CodeMirror/codemirror.js"></script>
<link rel="stylesheet" type="text/css" href="lib/CodeMirror/codemirror.css">

<!-- Include the CodeMirror language you're going to use -->
<script type="text/javascript" src="lib/CodeMirror/mode/javascript/javascript.js"></script>

<!-- Add this library -->
<script type="text/javascript" src="build/executr.js"></script>
<link rel="stylesheet" type="text/css" href="build/executr.css">
````

### Usage
The element you wish to convert into an CodeMirror Editor can be any element, but I would use a `textarea`, that feels the most normal.

Then run `window.executr` and pass a selector for multiple code elements or a single element.

They will be converted into CodeMirror Editors and a run button will be added.

````html
<textarea id="toBeConverted">alert("example #1")</textarea>
````

````javascript
let element = window.executr({
	"codeSelector": "#toBeConverted"
});
````

`element` will now be the jQuery element of `codeSelector`. It will have a new attribute called `executr`, this holds the CodeMirror object, the starting options and some jquery elements.

### Other Options
`window.executr` can be passed the following options

````coffeescript
{
    codeSelector: "#toBeConverted"  # jQuery selector
    buttonText:   "Start !"         # Text for the button
    outputTo:     ""                # jQuery selector for the result, no output in this case
    appendOutput: true              # Whether output should replace the contents of outputTo or append to it
    codeMirrorOptions: {}           # Extra options for CodeMirror
    beforeRun:    ->                # Code to run before run-button executes editors-code
    afterRun:     ->                # Code to run after run-button executed editors-code
}
````

#### Methods

`beforeRun`
- `options` Shows the options you passed to `window.executr`

`afterRun`
- `options` Shows the options you passed to `window.executr`
- `result` Shows the result of your code

### Example
This shows an example from my current project.
````html
<textarea id="editor" rows="10" style="width: 100%;"></textarea>
````
````js
let editor = window.executr({
	codeSelector: "#editor",
	buttonText: "Start",
	codeMirrorOptions: {
		lineNumbers: true,
		mode: "javascript",
		indentUnit: 4,
		indentWithTabs: true,
		autofocus: true,
		theme: "monokai",
		value: "console.log('test')"
	}
});
````
