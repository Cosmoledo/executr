(() => {
	class Editor {
		constructor(element, options) {
			this.options = options;

			this.buildEditor($(element));
			this.addRunButton();
		}

		buildEditor(element) {
			this.editorCont = $("<div>");
			this.editorCont.addClass("executr-code-editor");
			this.editorCont.insertBefore(element);
			element.remove();

			this.cm = CodeMirror(this.editorCont.get(0), this.options.codeMirrorOptions);

			this.editorCont.css({
				height: $(this.cm.display.gutters).height() - 13 + "px",
			});
		}

		addRunButton() {
			this.runButton = $("<button>");
			this.runButton.addClass("executr-run-button");
			this.runButton.text(this.options.buttonText);
			this.runButton.click(() => this.execute());
			this.editorCont.append(this.runButton);
		};

		execute() {
			const code = this.cm.getValue();
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

	window.executr = options => {
		options = Object.assign({
			codeSelector: "code[executable]",
			outputTo: false,
			appendOutput: false,
			buttonText: "RUN",
			codeMirrorOptions: {}
		}, options);

		if ($.fn.is(options.codeSelector))
			options.codeSelector = null;

		let editors = [];

		$(options.codeSelector).each((index, element) => {
			options.codeMirrorOptions.value = element.value || element.innerHTML || options.codeMirrorOptions.value
			editors.push(new Editor(element, options));
		});

		return editors;
	};
})();
