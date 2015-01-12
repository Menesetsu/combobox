/**
 * @copyright Devexperts
 *
 * @requires DX
 * @requires DX.Dom
 * @requires DX.Event
 * @requires Selectbox
 * @namespace
 */
var Combobox = (function(DX, window, document, undefined) {
	'use strict';

	var CN_COMBOBOX = 'comboBox',
			CN_INNER = CN_COMBOBOX + '--inner',
			CN_INPUT = CN_COMBOBOX + '--input',
			tmpl = [
				'<div class="' + CN_INNER + '">',
				'<span class="' + CN_INPUT + '"></span>',
				'</div>'
			].join('');

	/**
	 * Creates new combobox
	 * @constructor Combobox
	 * @param {HTMLInputElement} input
	 */
	return function Combobox(input) {
		var block,
			inputContainer,
			select,
			selectBox,
			selectBoxBlock;

		/**
		 * Triggers when combobox is created
		 *
		 * @event combobox:created
		 */
		function init() {
			initAppearance();
			initSelectBox();
			combineWithSelectBox();
			normalizeValue(); // We can't do it earlier as select resets selectedIndex to 0 after each DOM manipulation
			setValue();
			initListeners();

			DX.Event.trigger(input, Combobox.E_CREATED, {
				detail: {
					block: block,
					eventTarget: input
				}
			});
		}

		function initAppearance() {
			block = DX.Dom.createElement('div', {
				className: CN_COMBOBOX,
				innerHTML: tmpl
			});
			inputContainer = DX.$$('.' + CN_INPUT, block);
		}

		function initSelectBox() {
			select = DX.$(input.getAttribute('data-list'));
			selectBox = new Selectbox(select);
			selectBoxBlock = selectBox.getBlock();
		}

		function combineWithSelectBox() {
			DX.Dom.getParent(input).insertBefore(block, input);
			DX.Dom.getParent(inputContainer).insertBefore(selectBoxBlock, inputContainer);
			inputContainer.appendChild(input);
		}

		function normalizeValue() {
			if (input.value) {
				select.selectedIndex = -1;
			}
		}

		function setValue() {
			input.value = selectBox.getText() || input.value;
		}

		function initListeners() {
			select.addEventListener(Selectbox.E_CHANGED, setValue);
			select.addEventListener(Selectbox.E_CHANGE_VALUE, setValue);
		}

		init();
		/**
		 * Get HTMLNode containing combobox
		 * @method getBlock
		 * @returns {Node}
		 */
		this.getBlock = function() {
			return block;
		};
		/**
		 * Get element which listens to events
		 * @method getEventTarget
		 * @returns {Node}
		 */
		this.getEventTarget = function() {
			return input;
		};
	};
})(DX, window, document);

/** @constant
 * @type {string}
 * @default
 * @memberof Combobox
 */
Combobox.E_CREATED = 'combobox:created';

/**
 * Disable combobox
 * @method enable
 * @static
 * @memberof Combobox
 * @param {Node} HTMLNode containing select block
 */
Combobox.disable = function disableCombobox(input) {
	'use strict';

	var cn = 'comboBox',
		container = DX.Dom.getAscendantByClassName(input, cn),
		select = container.querySelector('select');

	input.disabled = true;
	DX.Bem.addModifier(container, 'disabled', cn);
	Selectbox.disable(select);
};
/**
 * Enable combobox
 * @method enable
 * @static
 * @memberof Combobox
 * @param {Node} HTMLNode containing select block
 */
Combobox.enable = function enableCombobox(input) {
	'use strict';

	var cn = 'comboBox',
		container = DX.Dom.getAscendantByClassName(input, cn),
		select = container.querySelector('select');

	input.disabled = false;
	DX.Bem.removeModifier(container, 'disabled', cn);
	Selectbox.enable(select);
};