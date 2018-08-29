/**
 * Created by Martin Neundorfer on 20.08.2018.
 * For LABOR.digital
 */
/**
 * Global objects for general use
 */
export default new class Globj{
	get document() {
		if(typeof this._document !== 'undefined') return this._document;
		return this._document = $(document);
	}

	get window() {
		if(typeof this._window !== 'undefined') return this._window;
		return this._window = $(window);
	}

	get html() {
		if(typeof this._html !== 'undefined') return this._html;
		return this._html = $('html');
	}

	get body() {
		if(typeof this._body !== 'undefined') return this._body;
		return this._body = $('body');
	}

	get htmlBody() {
		if(typeof this._htmlBody !== 'undefined') return this._htmlBody;
		return this._htmlBody = $('html, body');
	}
};
