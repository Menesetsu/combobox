describe('Combobox', function() {
	var tmpl = [
		'<div class="control control-comboBox">',
			'<span class="control--wrap">',
				'<select id="Combobox_Id" class="band musicians doors" data-combobox>',
					'<option value="jim" class="deceased vocals">Jim Morrison</option>',
					'<option value="ray" class="deceased keyboards">Ray Manzarek</option>',
					'<option value="john" class="drums">John Densmore</option>',
					'<option value="robby" class="guitar">Robby Krieger</option>',
				'</select>',
				'<input type="text" id="test" data-list="Combobox_Id">',
			'</span>',
		'</div>'
	].join('');

	beforeEach(function() {
		document.body.innerHTML = tmpl;
		window.Selectbox = SelectboxMock;
	});
	afterEach(function() {
		document.body.innerHTML = '';
		window.Selectbox = null;
	});

	describe('#constructor', function() {
		it('should generate .comboBox element', function() {
			new Combobox(document.querySelector('input'));

			expect(document.querySelector('.comboBox')).toBeDefined();
			expect(document.querySelectorAll('.comboBox').length).toBe(1);
		});

		it('should leave the same input', function() {
			var input = document.querySelector('input');

			new Combobox(input);

			expect(document.querySelector('.comboBox input')).toBe(input);
		});

		it('should set first option text as input value, if input value is empty and none option is selected', function() {
			var input = document.querySelector('input');

			new Combobox(input);

			expect(input.value).toBe('Jim Morrison');
		});

		it('should set selected option text as input value, if input value is empty', function() {
			var select = document.querySelector('select'),
				input = document.querySelector('input');

			select.selectedIndex = 3;
			new Combobox(input);

			expect(input.value).toBe('Robby Krieger');
		});

		it('should use input value, if input value isn\'t empty', function() {
			var input = document.querySelector('input');

			input.value = 'Ian Astbury';
			new Combobox(input);

			expect(input.value).toBe('Ian Astbury');
		});
	});

	describe('Methods', function() {
		describe('#getBlock()', function() {
			it('should return block', function() {
				var combobox = new Combobox(document.querySelector('input'));

				expect(combobox.getBlock()).toBe(document.querySelector('.comboBox'));
			});
		});

		describe('#getEventTarget()', function() {
			it('should return original input', function() {
				var input = document.querySelector('input'),
						combobox = new Combobox(input);

				expect(combobox.getEventTarget()).toBe(input);
			});
		});
	});

	describe('Constants', function() {
		it('should provide event names as constants', function() {
			expect(Combobox.E_CREATED).toBe('combobox:created');
		});
	});

	describe('Events API', function() {
		var combobox,
			select,
			input;

		beforeEach(function() {
			document.body.innerHTML = tmpl;
			input = document.querySelector('input');
			select = document.querySelector('select');
			window.Selectbox = SelectboxMock;
			combobox = new Combobox(input);
		});
		afterEach(function() {
			document.body.innerHTML = '';
			combobox = select = input = window.Selectbox = null;
		});

		describe('Selectbox.E_CHANGED', function() {
			it('should set selected option as input value', function() {
				select.selectedIndex = 1;
				DX.Event.trigger(select, Selectbox.E_CHANGED);

				expect(input.value).toBe('Ray Manzarek')
			});
		});

		describe('Selectbox.E_CHANGE_VALUE', function() {
			it('should set selected option as input value', function() {
				select.selectedIndex = 2;
				DX.Event.trigger(select, Selectbox.E_CHANGE_VALUE);

				expect(input.value).toBe('John Densmore')
			});

			it('should use input value, if input value isn\'t empty', function() {
				input.value = 'Ian Astbury';
				select.selectedIndex = -1;
				DX.Event.trigger(select, Selectbox.E_CHANGE_VALUE);

				expect(input.value).toBe('Ian Astbury')
			});
		});
	});

	describe('Static Methods', function() {
		describe('#disable()', function() {
			it('should disable original input element', function() {
				var input = document.querySelector('input');

				new Combobox(input);

				Combobox.disable(input);

				expect(input.disabled).toBe(true);
			});

			it('should add comboBox-disabled modifier to container', function() {
				var input = document.querySelector('input'),
					container;

				new Combobox(input);
				container = document.querySelector('.comboBox');

				Combobox.disable(input);

				expect(container.classList.contains('comboBox-disabled')).toBe(true);
			});

			it('should disable related selectBox element', function() {
				var input = document.querySelector('input'),
					container,
					select;

				new Combobox(input);
				container = document.querySelector('.comboBox');
				select = container.querySelector('select');

				Combobox.disable(input);

				expect(Selectbox.disable).toHaveBeenCalled();
				expect(Selectbox.disable).toHaveBeenCalledWith(select);
			});
		});

		describe('#enable()', function() {
			it('should enable original input element', function() {
				var input = document.querySelector('input');

				new Combobox(input);

				Combobox.disable(input);
				Combobox.enable(input);

				expect(input.disabled).toBe(false);
			});

			it('should remove comboBox-disabled modifier from container', function() {
				var input = document.querySelector('input'),
					container;

				new Combobox(input);
				container = document.querySelector('.comboBox');

				Combobox.disable(input);
				Combobox.enable(input);

				expect(container.classList.contains('comboBox-disabled')).toBe(false);
			});

			it('should enable related selectBox element', function() {
				var input = document.querySelector('input'),
					container,
					select;

				new Combobox(input);
				container = document.querySelector('.comboBox');
				select = container.querySelector('select');

				Combobox.disable(input);
				Combobox.enable(input);

				expect(Selectbox.enable).toHaveBeenCalled();
				expect(Selectbox.enable).toHaveBeenCalledWith(select);
			});
		});
	});

});