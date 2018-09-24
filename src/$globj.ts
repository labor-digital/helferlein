/**
 * Created by Martin Neundorfer on 20.08.2018.
 * For LABOR.digital
 */
const storage = new Map();

/**
 * Global objects for general use
 */
class $globj {
	static get document(): JQuery {
		if (!storage.has('document')) storage.set('document', $(document.documentElement));
		return storage.get('document');
	}

	static get window(): JQuery {
		if (!storage.has('window')) storage.set('window', $(<any>window));
		return storage.get('window');
	}

	static get html(): JQuery  {
		if (!storage.has('html')) storage.set('html', $('html'));
		return storage.get('html');
	}

	static get body(): JQuery  {
		if (!storage.has('body')) storage.set('body', $('body'));
		return storage.get('body');
	}

	static get htmlBody(): JQuery  {
		if (!storage.has('htmlBody')) storage.set('htmlBody', $('html, body'));
		return storage.get('htmlBody');
	}
}

export default $globj;