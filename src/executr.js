class Editor {
	constructor(element, options) {
		this.element = $(element);
		this.options = options;

		this.buildEditor();
		this.addRunButton();
	}

	buildEditor() {
		this.editorCont = $("<div>");
		this.editorCont.addClass("executr-code-editor");
		this.editorCont.css({
			height: this.element.height() + 10 + "px",
			width: this.element.width() + "px"
		});
		this.editorCont.insertBefore(this.element);
		this.element.detach();

		this.editor = CodeMirror(this.editorCont.get(0), this.options.codeMirrorOptions);
	}

	addRunButton() {
		this.runButton = $("<button>");
		this.runButton.addClass("executr-run-button");
		this.runButton.text(this.options.buttonText);
		this.runButton.click(() => this.execute());
		this.editorCont.append(this.runButton);
	};

	execute() {
		const code = this.editor.getValue();
		if (this.options.beforeRun)
			this.options.beforeRun(this.options);
		const output = eval(code);
		if (this.options.afterRun)
			this.options.afterRun(this.options, output);
		if (this.options.outputTo)
			if (this.options.appendOutput)
				$(this.options.outputTo).append($("<div>").text(output));
			else
				$(this.options.outputTo).html(output);
	}
}

window.executr = function(options) {
	options = Object.assign({
		codeSelector: "code[executable]",
		outputTo: false,
		appendOutput: false,
		buttonText: "RUN",
		codeMirrorOptions: {}
	}, options);

	if ($.fn.is(options.codeSelector))
		options.codeSelector = null;

	let codeSelectors = $(options.codeSelector);
	codeSelectors.each((index, element) => {
		options.codeMirrorOptions.value = element.value || element.innerHTML || options.codeMirrorOptions.value
		element.executr = new Editor(element, options);
	});

	return codeSelectors;
};
