/*!
 * jQuery JavaScript Library v2.2.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-03-17T17:51Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.2",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {
		var key;

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );
	ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

	// Support: Opera 12.1x only
	// Fall back to style even without computed
	// computed is undefined for elems on document fragments
	if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
		ret = jQuery.style( elem, name );
	}

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// But now, this "simulate" function is used only for events
				// for which stopPropagation() is noop, so there is no need for that anymore.
				//
				// For the 1.x branch though, guard for "click" and "submit"
				// events is still used, but was moved to jQuery.event.stopPropagation function
				// because `originalEvent` should point to the original event for the constancy
				// with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE8-11+
			// IE throws exception if url is malformed, e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE8-11+
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


jQuery.expr.filters.hidden = function( elem ) {
	return !jQuery.expr.filters.visible( elem );
};
jQuery.expr.filters.visible = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	// Use OR instead of AND as the element is not visible if either is true
	// See tickets #10406 and #13132
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE9
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE9
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		box = elem.getBoundingClientRect();
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},
	size: function() {
		return this.length;
	}
} );

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));

/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 2)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.6
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.6
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.6'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.6
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.6'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.6
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.6'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.6
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.6'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.6
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.6'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.6
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.6'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.6
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.6'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.6
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.6'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.6
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.6'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.6
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.6'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.6'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/*! Isomer v0.2.4 | (c) 2014 Jordan Scales | jdan.github.io/isomer/license.txt */
!function(t){if("object"==typeof exports)module.exports=t();else if("function"==typeof define&&define.amd)define(t);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.Isomer=t()}}(function(){return function t(n,e,r){function i(s,a){if(!e[s]){if(!n[s]){var h="function"==typeof require&&require;if(!a&&h)return h(s,!0);if(o)return o(s,!0);throw new Error("Cannot find module '"+s+"'")}var p=e[s]={exports:{}};n[s][0].call(p.exports,function(t){var e=n[s][1][t];return i(e?e:t)},p,p.exports,t,n,e,r)}return e[s].exports}for(var o="function"==typeof require&&require,s=0;s<r.length;s++)i(r[s]);return i}({1:[function(t,n){n.exports=t("./js/isomer")},{"./js/isomer":4}],2:[function(t,n){function e(t){this.elem=t,this.ctx=this.elem.getContext("2d"),this.width=t.width,this.height=t.height}e.prototype.clear=function(){this.ctx.clearRect(0,0,this.width,this.height)},e.prototype.path=function(t,n){this.ctx.beginPath(),this.ctx.moveTo(t[0].x,t[0].y);for(var e=1;e<t.length;e++)this.ctx.lineTo(t[e].x,t[e].y);this.ctx.closePath(),this.ctx.save(),this.ctx.fillStyle=this.ctx.strokeStyle=n.toHex(),this.ctx.stroke(),this.ctx.fill(),this.ctx.restore()},n.exports=e},{}],3:[function(t,n){function e(t,n,e){this.r=parseInt(t||0),this.g=parseInt(n||0),this.b=parseInt(e||0),this.loadHSL()}e.prototype.toHex=function(){var t=(256*this.r*256+256*this.g+this.b).toString(16);return t.length<6&&(t=new Array(6-t.length+1).join("0")+t),"#"+t},e.prototype.lighten=function(t,n){n=n||new e(255,255,255);var r=new e(n.r/255*this.r,n.g/255*this.g,n.b/255*this.b);return r.l=Math.min(r.l+t,1),r.loadRGB(),r},e.prototype.loadHSL=function(){var t,n,e=this.r/255,r=this.g/255,i=this.b/255,o=Math.max(e,r,i),s=Math.min(e,r,i),a=(o+s)/2;if(o===s)t=n=0;else{var h=o-s;switch(n=a>.5?h/(2-o-s):h/(o+s),o){case e:t=(r-i)/h+(i>r?6:0);break;case r:t=(i-e)/h+2;break;case i:t=(e-r)/h+4}t/=6}this.h=t,this.s=n,this.l=a},e.prototype.loadRGB=function(){var t,n,e,r=this.h,i=this.s,o=this.l;if(0===i)t=n=e=o;else{var s=.5>o?o*(1+i):o+i-o*i,a=2*o-s;t=this._hue2rgb(a,s,r+1/3),n=this._hue2rgb(a,s,r),e=this._hue2rgb(a,s,r-1/3)}this.r=parseInt(255*t),this.g=parseInt(255*n),this.b=parseInt(255*e)},e.prototype._hue2rgb=function(t,n,e){return 0>e&&(e+=1),e>1&&(e-=1),1/6>e?t+6*(n-t)*e:.5>e?n:2/3>e?t+(n-t)*(2/3-e)*6:t},n.exports=e},{}],4:[function(t,n){function e(t,n){n=n||{},this.canvas=new r(t),this.angle=Math.PI/6,this.scale=n.scale||70,this.originX=n.originX||this.canvas.width/2,this.originY=n.originY||.9*this.canvas.height,this.lightPosition=n.lightPosition||new h(2,-1,3),this.lightAngle=this.lightPosition.normalize(),this.colorDifference=.2,this.lightColor=n.lightColor||new i(255,255,255)}var r=t("./canvas"),i=t("./color"),o=t("./path"),s=t("./point"),a=t("./shape"),h=t("./vector");e.prototype.setLightPosition=function(t,n,e){this.lightPosition=new h(t,n,e),this.lightAngle=this.lightPosition.normalize()},e.prototype._translatePoint=function(t){var n=new s(t.x*this.scale*Math.cos(this.angle),t.x*this.scale*Math.sin(this.angle)),e=new s(t.y*this.scale*Math.cos(Math.PI-this.angle),t.y*this.scale*Math.sin(Math.PI-this.angle)),r=this.originX+n.x+e.x,i=this.originY-n.y-e.y-t.z*this.scale;return new s(r,i)},e.prototype.add=function(t,n){if("[object Array]"==Object.prototype.toString.call(t))for(var e=0;e<t.length;e++)this.add(t[e],n);else if(t instanceof o)this._addPath(t,n);else if(t instanceof a){var r=t.orderedPaths();for(var e in r)this._addPath(r[e],n)}},e.prototype._addPath=function(t,n){n=n||new i(120,120,120);var e=h.fromTwoPoints(t.points[1],t.points[0]),r=h.fromTwoPoints(t.points[2],t.points[1]),o=h.crossProduct(e,r).normalize(),s=h.dotProduct(o,this.lightAngle);color=n.lighten(s*this.colorDifference,this.lightColor),this.canvas.path(t.points.map(this._translatePoint.bind(this)),color)},e.Canvas=r,e.Color=i,e.Path=o,e.Point=s,e.Shape=a,e.Vector=h,n.exports=e},{"./canvas":2,"./color":3,"./path":5,"./point":6,"./shape":7,"./vector":8}],5:[function(t,n){function e(t){this.points="[object Array]"===Object.prototype.toString.call(t)?t:Array.prototype.slice.call(arguments)}var r=t("./point");e.prototype.push=function(t){this.points.push(t)},e.prototype.reverse=function(){var t=Array.prototype.slice.call(this.points);return new e(t.reverse())},e.prototype.translate=function(){var t=arguments;return new e(this.points.map(function(n){return n.translate.apply(n,t)}))},e.prototype.rotateZ=function(){var t=arguments;return new e(this.points.map(function(n){return n.rotateZ.apply(n,t)}))},e.prototype.scale=function(){var t=arguments;return new e(this.points.map(function(n){return n.scale.apply(n,t)}))},e.prototype.depth=function(){var t,n=0;for(t=0;t<this.points.length;t++)n+=this.points[t].depth();return n/(this.points.length||1)},e.Rectangle=function(t,n,i){void 0===n&&(n=1),void 0===i&&(i=1);var o=new e([t,new r(t.x+n,t.y,t.z),new r(t.x+n,t.y+i,t.z),new r(t.x,t.y+i,t.z)]);return o},e.Circle=function(t,n,i){i=i||20;var o,s=new e;for(o=0;i>o;o++)s.push(new r(n*Math.cos(2*o*Math.PI/i),n*Math.sin(2*o*Math.PI/i),0));return s.translate(t.x,t.y,t.z)},e.Star=function(t,n,i,o){var s,a,h=new e;for(s=0;2*o>s;s++)a=s%2===0?n:i,h.push(new r(a*Math.cos(s*Math.PI/o),a*Math.sin(s*Math.PI/o),0));return h.translate(t.x,t.y,t.z)},n.exports=e},{"./point":6}],6:[function(t,n){function e(t,n,r){return this instanceof e?(this.x="number"==typeof t?t:0,this.y="number"==typeof n?n:0,this.z="number"==typeof r?r:0,void 0):new e(t,n,r)}e.ORIGIN=new e(0,0,0),e.prototype.translate=function(t,n,r){return new e(this.x+t,this.y+n,this.z+r)},e.prototype.scale=function(t,n,e,r){var i=this.translate(-t.x,-t.y,-t.z);return void 0===e&&void 0===r?e=r=n:r="number"==typeof r?r:1,i.x*=n,i.y*=e,i.z*=r,i.translate(t.x,t.y,t.z)},e.prototype.rotateZ=function(t,n){var e=this.translate(-t.x,-t.y,-t.z),r=e.x*Math.cos(n)-e.y*Math.sin(n),i=e.x*Math.sin(n)+e.y*Math.cos(n);return e.x=r,e.y=i,e.translate(t.x,t.y,t.z)},e.prototype.depth=function(){return this.x+this.y-2*this.z},e.distance=function(t,n){var e=n.x-t.x,r=n.y-t.y,i=n.z-t.z;return Math.sqrt(e*e+r*r+i*i)},n.exports=e},{}],7:[function(t,n){function e(t){this.paths="[object Array]"===Object.prototype.toString.call(t)?t:Array.prototype.slice.call(arguments)}var r=t("./path"),i=t("./point");e.prototype.push=function(t){this.paths.push(t)},e.prototype.translate=function(){var t=arguments;return new e(this.paths.map(function(n){return n.translate.apply(n,t)}))},e.prototype.rotateZ=function(){var t=arguments;return new e(this.paths.map(function(n){return n.rotateZ.apply(n,t)}))},e.prototype.scale=function(){var t=arguments;return new e(this.paths.map(function(n){return n.scale.apply(n,t)}))},e.prototype.orderedPaths=function(){var t=this.paths.slice();return t.sort(function(t,n){return n.depth()-t.depth()})},e.extrude=function(t,n){n="number"==typeof n?n:1;var i,o=t.translate(0,0,n),s=new e;for(s.push(t.reverse()),s.push(o),i=0;i<t.points.length;i++)s.push(new r([o.points[i],t.points[i],t.points[(i+1)%t.points.length],o.points[(i+1)%o.points.length]]));return s},e.Prism=function(t,n,o,s){n="number"==typeof n?n:1,o="number"==typeof o?o:1,s="number"==typeof s?s:1;var a=new e,h=new r([t,new i(t.x+n,t.y,t.z),new i(t.x+n,t.y,t.z+s),new i(t.x,t.y,t.z+s)]);a.push(h),a.push(h.reverse().translate(0,o,0));var p=new r([t,new i(t.x,t.y,t.z+s),new i(t.x,t.y+o,t.z+s),new i(t.x,t.y+o,t.z)]);a.push(p),a.push(p.reverse().translate(n,0,0));var u=new r([t,new i(t.x+n,t.y,t.z),new i(t.x+n,t.y+o,t.z),new i(t.x,t.y+o,t.z)]);return a.push(u.reverse()),a.push(u.translate(0,0,s)),a},e.Pyramid=function(t,n,o,s){n="number"==typeof n?n:1,o="number"==typeof o?o:1,s="number"==typeof s?s:1;var a=new e,h=new r([t,new i(t.x+n,t.y,t.z),new i(t.x+n/2,t.y+o/2,t.z+s)]);a.push(h),a.push(h.rotateZ(t.translate(n/2,o/2),Math.PI));var p=new r([t,new i(t.x+n/2,t.y+o/2,t.z+s),new i(t.x,t.y+o,t.z)]);return a.push(p),a.push(p.rotateZ(t.translate(n/2,o/2),Math.PI)),a},e.Cylinder=function(t,n,i,o){n="number"==typeof n?n:1;var s=r.Circle(t,n,i),a=e.extrude(s,o);return a},n.exports=e},{"./path":5,"./point":6}],8:[function(t,n){function e(t,n,e){this.i="number"==typeof t?t:0,this.j="number"==typeof n?n:0,this.k="number"==typeof e?e:0}e.fromTwoPoints=function(t,n){return new e(n.x-t.x,n.y-t.y,n.z-t.z)},e.crossProduct=function(t,n){var r=t.j*n.k-n.j*t.k,i=-1*(t.i*n.k-n.i*t.k),o=t.i*n.j-n.i*t.j;return new e(r,i,o)},e.dotProduct=function(t,n){return t.i*n.i+t.j*n.j+t.k*n.k},e.prototype.magnitude=function(){return Math.sqrt(this.i*this.i+this.j*this.j+this.k*this.k)},e.prototype.normalize=function(){var t=this.magnitude();return new e(this.i/t,this.j/t,this.k/t)},n.exports=e},{}]},{},[1])(1)});
/**
 * craftyjs 0.7.1
 * http://craftyjs.com/
 *
 * Copyright 2016, Louis Stowasser
 * Dual licensed under the MIT or GPL licenses.
 */

!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){function d(){k=!1,h.length?j=h.concat(j):l=-1,j.length&&e()}function e(){if(!k){var a=setTimeout(d);k=!0;for(var b=j.length;b;){for(h=j,j=[];++l<b;)h&&h[l].run();l=-1,b=j.length}h=null,k=!1,clearTimeout(a)}}function f(a,b){this.fun=a,this.array=b}function g(){}var h,i=b.exports={},j=[],k=!1,l=-1;i.nextTick=function(a){var b=new Array(arguments.length-1);if(arguments.length>1)for(var c=1;c<arguments.length;c++)b[c-1]=arguments[c];j.push(new f(a,b)),1!==j.length||k||setTimeout(e,0)},f.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=g,i.addListener=g,i.once=g,i.off=g,i.removeListener=g,i.removeAllListeners=g,i.emit=g,i.binding=function(a){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(a){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},{}],2:[function(a,b,c){var d=a("../core/core.js");d.c("Draggable",{_origX:null,_origY:null,_oldX:null,_oldY:null,_dir:null,init:function(){this.requires("MouseDrag"),this.bind("StartDrag",this._startDrag).bind("Dragging",this._drag)},remove:function(){this.unbind("StartDrag",this._startDrag).unbind("Dragging",this._drag)},enableDrag:function(){return this.uniqueBind("Dragging",this._drag),this},disableDrag:function(){return this.unbind("Dragging",this._drag),this},dragDirection:function(a){if("undefined"==typeof a)this._dir=null;else if(""+parseInt(a,10)==a)this._dir={x:Math.cos(a/180*Math.PI),y:Math.sin(a/180*Math.PI)};else if(0===a.x&&0===a.y)this._dir={x:0,y:0};else{var b=Math.sqrt(a.x*a.x+a.y*a.y);this._dir={x:a.x/b,y:a.y/b}}return this},_startDrag:function(a){this._origX=a.realX,this._origY=a.realY,this._oldX=this._x,this._oldY=this._y},_drag:function(a){if(this._dir){if(0!==this._dir.x||0!==this._dir.y){var b=(a.realX-this._origX)*this._dir.x+(a.realY-this._origY)*this._dir.y;this.x=this._oldX+b*this._dir.x,this.y=this._oldY+b*this._dir.y}}else this.x=this._oldX+(a.realX-this._origX),this.y=this._oldY+(a.realY-this._origY)}}),d.c("Multiway",{_speed:null,init:function(){this.requires("Motion, Keyboard"),this._keyDirection={},this._activeDirections={},this._directionSpeed={},this._speed={x:150,y:150},this.bind("KeyDown",this._keydown).bind("KeyUp",this._keyup)},remove:function(){this.unbind("KeyDown",this._keydown).unbind("KeyUp",this._keyup),this.__unapplyActiveDirections()},_keydown:function(a){var b=this._keyDirection[a.key];void 0!==b&&(0!==this._activeDirections[b]||this.disableControls||(this.vx+=this._directionSpeed[b].x,this.vy+=this._directionSpeed[b].y),this._activeDirections[b]++)},_keyup:function(a){var b=this._keyDirection[a.key];void 0!==b&&(this._activeDirections[b]--,0!==this._activeDirections[b]||this.disableControls||(this.vx-=this._directionSpeed[b].x,this.vy-=this._directionSpeed[b].y))},multiway:function(a,b){return b?void 0!==a.x&&void 0!==a.y?(this._speed.x=a.x,this._speed.y=a.y):(this._speed.x=a,this._speed.y=a):b=a,this.disableControls||this.__unapplyActiveDirections(),this._updateKeys(b),this._updateSpeed(this._speed),this.disableControls||this.__applyActiveDirections(),this},speed:function(a){return this.disableControls||this.__unapplyActiveDirections(),this._updateSpeed(a),this.disableControls||this.__applyActiveDirections(),this},_updateKeys:function(a){this._keyDirection={},this._activeDirections={};for(var b in a){var c=d.keys[b]||b,e=this._keyDirection[c]=a[b];this._activeDirections[e]=this._activeDirections[e]||0,this.isDown(c)&&this._activeDirections[e]++}},_updateSpeed:function(a){this._directionSpeed={};var b;for(var c in this._keyDirection)b=this._keyDirection[c],this._directionSpeed[b]={x:Math.round(1e3*Math.cos(b*(Math.PI/180))*a.x)/1e3,y:Math.round(1e3*Math.sin(b*(Math.PI/180))*a.y)/1e3}},__applyActiveDirections:function(){for(var a in this._activeDirections)this._activeDirections[a]>0&&(this.vx+=this._directionSpeed[a].x,this.vy+=this._directionSpeed[a].y)},__unapplyActiveDirections:function(){for(var a in this._activeDirections)this._activeDirections[a]>0&&(this.vx-=this._directionSpeed[a].x,this.vy-=this._directionSpeed[a].y)},enableControl:function(){return this.disableControls&&this.__applyActiveDirections(),this.disableControls=!1,this},disableControl:function(){return this.disableControls||this.__unapplyActiveDirections(),this.disableControls=!0,this}}),d.c("Jumper",{_jumpSpeed:300,canJump:!0,init:function(){this.requires("Supportable, Motion, Keyboard"),this.enableControl=this.enableControl||function(){this.disableControls=!1},this.disableControl=this.disableControl||function(){this.disableControls=!0}},remove:function(){this.unbind("KeyDown",this._keydown_jumper)},_keydown_jumper:function(a){if(!this.disableControls&&this._jumpKeys[a.key]){var b=this.ground;this.canJump=!!b,this.trigger("CheckJumping",b),this.canJump&&(this.vy=-this._jumpSpeed)}},jumper:function(a,b){b?this._jumpSpeed=a:b=a,this._jumpKeys={};for(var c=0;c<b.length;++c){var e=b[c],f=d.keys[e]||e;this._jumpKeys[f]=!0}return this.uniqueBind("KeyDown",this._keydown_jumper),this},jumpSpeed:function(a){return this._jumpSpeed=a,this}}),d.c("Fourway",{init:function(){this.requires("Multiway")},fourway:function(a){return this.multiway(a||this._speed,{UP_ARROW:-90,DOWN_ARROW:90,RIGHT_ARROW:0,LEFT_ARROW:180,W:-90,S:90,D:0,A:180,Z:-90,Q:180}),this}}),d.c("Twoway",{init:function(){this.requires("Multiway, Jumper")},twoway:function(a,b){return this.multiway(a||this._speed,{RIGHT_ARROW:0,LEFT_ARROW:180,D:0,A:180,Q:180}),this.jumper(b||2*a||this._jumpSpeed,[d.keys.UP_ARROW,d.keys.W,d.keys.Z]),this}})},{"../core/core.js":7}],3:[function(a,b,c){var d=a("../core/core.js");d.extend({device:{_deviceOrientationCallback:!1,_deviceMotionCallback:!1,_normalizeDeviceOrientation:function(a){var b;window.DeviceOrientationEvent?b={tiltLR:a.gamma,tiltFB:a.beta,dir:a.alpha,motUD:null}:window.OrientationEvent&&(b={tiltLR:90*a.x,tiltFB:-90*a.y,dir:null,motUD:a.z}),d.device._deviceOrientationCallback(b)},_normalizeDeviceMotion:function(a){var b=a.accelerationIncludingGravity,c=b.z>0?1:-1,e={acceleration:b,rawAcceleration:"["+Math.round(b.x)+", "+Math.round(b.y)+", "+Math.round(b.z)+"]",facingUp:c,tiltLR:Math.round(b.x/9.81*-90),tiltFB:Math.round((b.y+9.81)/9.81*90*c)};d.device._deviceMotionCallback(e)},deviceOrientation:function(a){this._deviceOrientationCallback=a,d.support.deviceorientation&&(window.DeviceOrientationEvent?d.addEvent(this,window,"deviceorientation",this._normalizeDeviceOrientation):window.OrientationEvent&&d.addEvent(this,window,"MozOrientation",this._normalizeDeviceOrientation))},deviceMotion:function(a){this._deviceMotionCallback=a,d.support.devicemotion&&window.DeviceMotionEvent&&d.addEvent(this,window,"devicemotion",this._normalizeDeviceMotion)}}})},{"../core/core.js":7}],4:[function(a,b,c){var d=a("../core/core.js"),e=window.document;d.extend({over:null,mouseObjs:0,mousePos:{},lastEvent:null,touchObjs:0,selected:!1,keydown:{},detectBlur:function(a){var b=a.clientX>d.stage.x&&a.clientX<d.stage.x+d.viewport.width&&a.clientY>d.stage.y&&a.clientY<d.stage.y+d.viewport.height;!d.selected&&b&&d.trigger("CraftyFocus"),d.selected&&!b&&d.trigger("CraftyBlur"),d.selected=b},multitouch:function(a){return"boolean"!=typeof a?this._touchHandler.multitouch:void(this._touchHandler.multitouch=a)},resetKeyDown:function(){for(var a in d.keys)d.keydown[d.keys[a]]&&this.trigger("KeyUp",{key:d.keys[a]});d.keydown={}},mouseDispatch:function(a){if(d.mouseObjs){d.lastEvent=a;var b,c,e,f=a.target?a.target:a.srcElement,g=d.domHelper.translate(a.clientX,a.clientY),h=a.type;"undefined"==typeof a.which?a.mouseButton=a.button<2?d.mouseButtons.LEFT:4==a.button?d.mouseButtons.MIDDLE:d.mouseButtons.RIGHT:a.mouseButton=a.which<2?d.mouseButtons.LEFT:2==a.which?d.mouseButtons.MIDDLE:d.mouseButtons.RIGHT,a.realX=c=d.mousePos.x=g.x,a.realY=e=d.mousePos.y=g.y,b=d.findClosestEntityByComponent("Mouse",c,e,f),b?"mousedown"===h?b.trigger("MouseDown",a):"mouseup"===h?b.trigger("MouseUp",a):"dblclick"==h?b.trigger("DoubleClick",a):"click"==h?b.trigger("Click",a):"mousemove"===h?(b.trigger("MouseMove",a),this.over!==b&&(this.over&&(this.over.trigger("MouseOut",a),this.over=null),this.over=b,b.trigger("MouseOver",a))):b.trigger(h,a):("mousemove"===h&&this.over&&(this.over.trigger("MouseOut",a),this.over=null),"mousedown"===h?d.viewport.mouselook("start",a):"mousemove"===h?d.viewport.mouselook("drag",a):"mouseup"==h&&d.viewport.mouselook("stop")),"mousemove"===h&&(this.lastEvent=a)}},touchDispatch:function(a){if(d.touchObjs||d.mouseObjs){if(this._touchHandler.multitouch)switch(a.type){case"touchstart":this._touchHandler.handleStart(a);break;case"touchmove":this._touchHandler.handleMove(a);break;case"touchleave":case"touchcancel":case"touchend":this._touchHandler.handleEnd(a)}else this._touchHandler.mimicMouse(a);a.target&&"INPUT"!==a.target.nodeName&&"TEXTAREA"!==a.target.nodeName&&(a.preventDefault?a.preventDefault():a.returnValue=!1)}},_touchHandler:{fingers:[],multitouch:!1,handleStart:function(a){for(var b=a.changedTouches,c=0,e=b.length;e>c;c++){var f,g,h,i=!1,j=d.domHelper.translate(b[c].clientX,b[c].clientY),k=a.target?a.target:a.srcElement;b[c].realX=f=j.x,b[c].realY=g=j.y,h=this.findClosestTouchEntity(f,g,k),h&&(h.trigger("TouchStart",b[c]),i=this.fingerDownIndexByEntity(h));var l=this.setTouch(b[c],h);i!==!1&&i>=0?this.fingers[i]=l:this.fingers.push(l)}},handleMove:function(a){for(var b=a.changedTouches,c=0,e=b.length;e>c;c++){var f,g,h,i=this.fingerDownIndexById(b[c].identifier),j=d.domHelper.translate(b[c].clientX,b[c].clientY),k=a.target?a.target:a.srcElement;b[c].realX=f=j.x,b[c].realY=g=j.y,h=this.findClosestTouchEntity(f,g,k),i>=0&&("undefined"!=typeof this.fingers[i].entity&&(this.fingers[i].entity==h?this.fingers[i].entity.trigger("TouchMove",b[c]):("object"==typeof h&&h.trigger("TouchStart",b[c]),this.fingers[i].entity.trigger("TouchEnd"))),this.fingers[i].entity=h,this.fingers[i].realX=f,this.fingers[i].realY=g)}},handleEnd:function(a){for(var b=a.changedTouches,c="touchcancel"==a.type?"TouchCancel":"TouchEnd",d=0,e=b.length;e>d;d++){var f=this.fingerDownIndexById(b[d].identifier);f>=0&&(this.fingers[f].entity&&this.fingers[f].entity.trigger(c),this.fingers.splice(f,1))}},setTouch:function(a,b){return{identifier:a.identifier,realX:a.realX,realY:a.realY,entity:b}},findClosestTouchEntity:function(a,b,c){return d.findClosestEntityByComponent("Touch",a,b,c)},fingerDownIndexById:function(a){for(var b=0,c=this.fingers.length;c>b;b++){var d=this.fingers[b].identifier;if(d==a)return b}return-1},fingerDownIndexByEntity:function(a){for(var b=0,c=this.fingers.length;c>b;b++){var d=this.fingers[b].entity;if(d==a)return b}return-1},mimicMouse:function(a){var b,c=d.lastEvent;"touchstart"===a.type?b="mousedown":"touchmove"===a.type?b="mousemove":"touchend"===a.type?b="mouseup":"touchcancel"===a.type?b="mouseup":"touchleave"===a.type&&(b="mouseup"),a.touches&&a.touches.length?first=a.touches[0]:a.changedTouches&&a.changedTouches.length&&(first=a.changedTouches[0]);var f=e.createEvent("MouseEvent");f.initMouseEvent(b,!0,!0,window,1,first.screenX,first.screenY,first.clientX,first.clientY,!1,!1,!1,!1,0,a.relatedTarget),first.target.dispatchEvent(f),null!==c&&"mousedown"==c.type&&"mouseup"==b&&(b="click",f=e.createEvent("MouseEvent"),f.initMouseEvent(b,!0,!0,window,1,first.screenX,first.screenY,first.clientX,first.clientY,!1,!1,!1,!1,0,a.relatedTarget),first.target.dispatchEvent(f))}},findClosestEntityByComponent:function(a,b,c,e){var f,g,h,i=e?e:d.stage.elem,j=0,k=-1,l={};if("CANVAS"!=i.nodeName){for(;"string"!=typeof i.id&&-1==i.id.indexOf("ent");)i=i.parentNode;var m=d(parseInt(i.id.replace("ent",""),10));m.__c[a]&&m.isAt(b,c)&&(f=m)}if(!f)for(g=d.map.search({_x:b,_y:c,_w:1,_h:1},!1),h=g.length;h>j;++j)if(g[j].__c[a]&&g[j]._visible){var n=g[j],o=!1;if(!l[n[0]]&&(l[n[0]]=!0,n.mapArea?n.mapArea.containsPoint(b,c)&&(o=!0):n.isAt(b,c)&&(o=!0),o&&(n._z>=k||-1===k))){if(n._z===k&&n[0]<f[0])continue;k=n._z,f=n}}return f},mouseWheelDispatch:function(a){a.direction=a.detail<0||a.wheelDelta>0?1:-1,d.trigger("MouseWheelScroll",a)},keyboardDispatch:function(a){for(var b=a,c={},e="char charCode keyCode type shiftKey ctrlKey metaKey timestamp".split(" "),f=e.length;f;){var g=e[--f];c[g]=b[g]}return c.which=null!==b.charCode?b.charCode:b.keyCode,c.key=b.keyCode||b.which,c.originalEvent=b,a=c,"keydown"===a.type?d.keydown[a.key]!==!0&&(d.keydown[a.key]=!0,d.trigger("KeyDown",a)):"keyup"===a.type&&(delete d.keydown[a.key],d.trigger("KeyUp",a)),d.selected&&!(8==a.key||a.key>=112&&a.key<=135)?(b.stopPropagation?b.stopPropagation():b.cancelBubble=!0,b.target&&"INPUT"!==b.target.nodeName&&"TEXTAREA"!==b.target.nodeName&&(b.preventDefault?b.preventDefault():b.returnValue=!1),!1):void 0}}),d._preBind("Load",function(){d.addEvent(this,"keydown",d.keyboardDispatch),d.addEvent(this,"keyup",d.keyboardDispatch),d.addEvent(this,d.stage.elem,"mousedown",d.mouseDispatch),d.addEvent(this,d.stage.elem,"mouseup",d.mouseDispatch),d.addEvent(this,e.body,"mouseup",d.detectBlur),d.addEvent(this,window,"blur",d.resetKeyDown),d.addEvent(this,d.stage.elem,"mousemove",d.mouseDispatch),d.addEvent(this,d.stage.elem,"click",d.mouseDispatch),d.addEvent(this,d.stage.elem,"dblclick",d.mouseDispatch),d.addEvent(this,d.stage.elem,"touchstart",d.touchDispatch),d.addEvent(this,d.stage.elem,"touchmove",d.touchDispatch),d.addEvent(this,d.stage.elem,"touchend",d.touchDispatch),d.addEvent(this,d.stage.elem,"touchcancel",d.touchDispatch),d.addEvent(this,d.stage.elem,"touchleave",d.touchDispatch),"Moz"===d.support.prefix?d.addEvent(this,d.stage.elem,"DOMMouseScroll",d.mouseWheelDispatch):d.addEvent(this,d.stage.elem,"mousewheel",d.mouseWheelDispatch)}),d._preBind("CraftyStop",function(){d.removeEvent(this,"keydown",d.keyboardDispatch),d.removeEvent(this,"keyup",d.keyboardDispatch),d.stage&&(d.removeEvent(this,d.stage.elem,"mousedown",d.mouseDispatch),d.removeEvent(this,d.stage.elem,"mouseup",d.mouseDispatch),d.removeEvent(this,d.stage.elem,"mousemove",d.mouseDispatch),d.removeEvent(this,d.stage.elem,"click",d.mouseDispatch),d.removeEvent(this,d.stage.elem,"dblclick",d.mouseDispatch),d.removeEvent(this,d.stage.elem,"touchstart",d.touchDispatch),d.removeEvent(this,d.stage.elem,"touchmove",d.touchDispatch),d.removeEvent(this,d.stage.elem,"touchend",d.touchDispatch),d.removeEvent(this,d.stage.elem,"touchcancel",d.touchDispatch),d.removeEvent(this,d.stage.elem,"touchleave",d.touchDispatch),"Moz"===d.support.prefix?d.removeEvent(this,d.stage.elem,"DOMMouseScroll",d.mouseWheelDispatch):d.removeEvent(this,d.stage.elem,"mousewheel",d.mouseWheelDispatch)),d.removeEvent(this,e.body,"mouseup",d.detectBlur),d.removeEvent(this,window,"blur",d.resetKeyDown)}),d.c("Mouse",{init:function(){d.mouseObjs++,this.requires("AreaMap").bind("Remove",function(){d.mouseObjs--})}}),d.c("Touch",{init:function(){d.touchObjs++,this.requires("AreaMap").bind("Remove",function(){d.touchObjs--})}}),d.c("AreaMap",{init:function(){},areaMap:function(a){if(arguments.length>1){var b=Array.prototype.slice.call(arguments,0);a=new d.polygon(b)}else a=a.constructor===Array?new d.polygon(a.slice()):a.clone();return a.shift(this._x,this._y),this.mapArea=a,this.attach(this.mapArea),this.trigger("NewAreaMap",a),this}}),d.c("Button",{init:function(){var a=!d.mobile||d.mobile&&!d.multitouch()?"Mouse":"Touch";this.requires(a)}}),d.c("MouseDrag",{_dragging:!1,init:function(){this.requires("Mouse"),this.bind("MouseDown",this._ondown)},remove:function(){this.unbind("MouseDown",this._ondown)},_ondown:function(a){a.mouseButton===d.mouseButtons.LEFT&&this.startDrag(a)},_ondrag:function(a){return this._dragging&&0!==a.realX&&0!==a.realY?void this.trigger("Dragging",a):!1},_onup:function(a){a.mouseButton===d.mouseButtons.LEFT&&this.stopDrag(a)},startDrag:function(a){return this._dragging?void 0:(this._dragging=!0,d.addEvent(this,d.stage.elem,"mousemove",this._ondrag),d.addEvent(this,d.stage.elem,"mouseup",this._onup),this.trigger("StartDrag",a||d.lastEvent),this)},stopDrag:function(a){return this._dragging?(this._dragging=!1,d.removeEvent(this,d.stage.elem,"mousemove",this._ondrag),d.removeEvent(this,d.stage.elem,"mouseup",this._onup),this.trigger("StopDrag",a||d.lastEvent),this):void 0}}),d.c("Keyboard",{isDown:function(a){return"string"==typeof a&&(a=d.keys[a]),!!d.keydown[a]}})},{"../core/core.js":7}],5:[function(a,b,c){var d=a("../core/core.js");d.extend({keys:{BACKSPACE:8,TAB:9,ENTER:13,PAUSE:19,CAPS:20,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,MULTIPLY:106,ADD:107,SUBSTRACT:109,DECIMAL:110,DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,SHIFT:16,CTRL:17,ALT:18,PLUS:187,COMMA:188,MINUS:189,PERIOD:190,PULT_UP:29460,PULT_DOWN:29461,PULT_LEFT:4,PULT_RIGHT:5},mouseButtons:{LEFT:0,MIDDLE:1,RIGHT:2}})},{"../core/core.js":7}],6:[function(a,b,c){var d=function(a,b){this.timePerFrame=1e3/Crafty.timer.FPS(),this.duration=a,"function"==typeof b?this.easing_function=b:"string"==typeof b&&this.standardEasingFunctions[b]?this.easing_function=this.standardEasingFunctions[b]:this.easing_function=this.standardEasingFunctions.linear,this.reset()};d.prototype={duration:0,clock:0,steps:null,complete:!1,paused:!1,reset:function(){this.loops=1,this.clock=0,this.complete=!1,this.paused=!1},repeat:function(a){this.loops=a},setProgress:function(a,b){this.clock=this.duration*a,"undefined"!=typeof b&&(this.loops=b)},pause:function(){this.paused=!0},resume:function(){this.paused=!1,this.complete=!1},tick:function(a){if(!this.paused&&!this.complete)for(this.clock+=a,this.frames=Math.floor(this.clock/this.timePerFrame);this.clock>=this.duration&&this.complete===!1;)this.loops--,this.loops>0?this.clock-=this.duration:this.complete=!0},time:function(){return Math.min(this.clock/this.duration,1)},value:function(){return this.easing_function(this.time())},standardEasingFunctions:{linear:function(a){return a},smoothStep:function(a){return(3-2*a)*a*a},smootherStep:function(a){return(6*a*a-15*a+10)*a*a*a},easeInQuad:function(a){return a*a},easeOutQuad:function(a){return a*(2-a)},easeInOutQuad:function(a){return.5>a?2*a*a:(4-2*a)*a-1}}},b.exports=d},{}],7:[function(a,b,c){function d(){var a=f++;return a in i?d():a}function e(a){if(null===a||"object"!=typeof a)return a;var b=a.constructor();for(var c in a)b[c]=e(a[c]);return b}var f,g,h,i,j,k,l,m,n,o=a("./version"),p=function(a){return new p.fn.init(a)};h={},l=Array.prototype.slice,m=/\s*,\s*/,n=/\s+/;var q=function(){f=1,g=0,i={},j={},k=[]};q(),p.fn=p.prototype={init:function(a){if("string"!=typeof a)return a||(a=0,a in i||(i[a]=this)),a in i?(this[0]=a,this.length=1,this.__c||(this.__c={}),this._callbacks||p._addCallbackMethods(this),i[a]||(i[a]=this),i[a]):(this.length=0,this);var b,c,d,e,f,g,j,k=0,l=!1,o=!1;if("*"===a){g=0;for(b in i)this[g]=+b,g++;return this.length=g,1===g?i[this[0]]:this}-1!==a.indexOf(",")?(o=!0,d=m):-1!==a.indexOf(" ")&&(l=!0,d=n);for(b in i)if(i.hasOwnProperty(b))if(c=i[b],l||o){for(e=a.split(d),g=0,j=e.length,f=0;j>g;g++)c.__c[e[g]]&&f++;(l&&f===j||o&&f>0)&&(this[k++]=+b)}else c.__c[a]&&(this[k++]=+b);if(k>0&&!l&&!o&&this.extend(h[a]),e&&l)for(g=0;j>g;g++)this.extend(h[e[g]]);return this.length=k,1===k?i[this[k-1]]:(p._addCallbackMethods(this),this)},setName:function(a){var b=String(a);return this._entityName=b,this.trigger("NewEntityName",b),this},addComponent:function(a){var b,c,d=0;for(b=1===arguments.length&&-1!==a.indexOf(",")?a.split(m):arguments;d<b.length;d++)if(this.__c[b[d]]!==!0&&(this.__c[b[d]]=!0,c=h[b[d]],this.extend(c),c&&"required"in c&&this.requires(c.required),c&&"init"in c&&c.init.call(this),c&&"events"in c)){var e=c.events;for(var f in e){var g="function"==typeof e[f]?e[f]:c[e[f]];this.bind(f,g)}}return this.trigger("NewComponent",b),this},toggleComponent:function(a){var b,c,d=0;if(arguments.length>1)for(b=arguments.length;b>d;d++)this.has(arguments[d])?this.removeComponent(arguments[d]):this.addComponent(arguments[d]);else if(-1!==a.indexOf(","))for(c=a.split(m),b=c.length;b>d;d++)this.has(c[d])?this.removeComponent(c[d]):this.addComponent(c[d]);else this.has(a)?this.removeComponent(a):this.addComponent(a);return this},requires:function(a){return this.addComponent(a)},removeComponent:function(a,b){var c=h[a];if(this.trigger("RemoveComponent",a),c&&"events"in c){var d=c.events;for(var e in d){var f="function"==typeof d[e]?d[e]:c[d[e]];this.unbind(e,f)}}if(c&&"remove"in c&&c.remove.call(this,!1),b===!1&&c)for(var g in c)delete this[g];return delete this.__c[a],this},getId:function(){return this[0]},has:function(a){return!!this.__c[a]},attr:function(a,b,c,d){return 1===arguments.length&&"string"==typeof arguments[0]?this._attr_get(a):this._attr_set(a,b,c,d)},_attr_get:function(a,b){var c,d,e;return("undefined"==typeof b||null===b)&&(b=this),a.indexOf(".")>-1?(d=a.split("."),c=d.shift(),e=d.join("."),this._attr_get(d.join("."),b[c])):b[a]},_attr_set:function(){var a,b,c;return"string"==typeof arguments[0]?(a=this._set_create_object(arguments[0],arguments[1]),b=!!arguments[2],c=arguments[3]||arguments[0].indexOf(".")>-1):(a=arguments[0],b=!!arguments[1],c=!!arguments[2]),b||this.trigger("Change",a),c?this._recursive_extend(a,this):this.extend.call(this,a),this},_set_create_object:function(a,b){var c,d,e,f={};return a.indexOf(".")>-1?(c=a.split("."),d=c.shift(),e=c.join("."),f[d]=this._set_create_object(e,b)):f[a]=b,f},_recursive_extend:function(a,b){var c;for(c in a)a[c].constructor===Object?b[c]=this._recursive_extend(a[c],b[c]):b[c]=a[c];return b},toArray:function(){return l.call(this,0)},timeout:function(a,b){return this.each(function(){var c=this;setTimeout(function(){a.call(c)},b)}),this},bind:function(a,b){if(1===this.length)this._bindCallback(a,b);else for(var c=0;c<this.length;c++){var d=i[this[c]];d&&d._bindCallback(a,b)}return this},uniqueBind:function(a,b){this.unbind(a,b),this.bind(a,b)},one:function(a,b){var c=this,d=function(e){b.call(c,e),c.unbind(a,d)};return c.bind(a,d)},unbind:function(a,b){var c,d;for(c=0;c<this.length;c++)d=i[this[c]],d&&d._unbindCallbacks(a,b);return this},trigger:function(a,b){if(1===this.length)this._runCallbacks(a,b);else for(var c=0;c<this.length;c++){var d=i[this[c]];d&&d._runCallbacks(a,b)}return this},each:function(a){for(var b=0,c=this.length;c>b;b++)i[this[b]]&&a.call(i[this[b]],b);return this},get:function(a){var b=this.length;if("undefined"!=typeof a){if(a>=b||0>a+b)return;return a>=0?i[this[a]]:i[this[a+b]]}for(var c=0,d=[];b>c;c++)i[this[c]]&&d.push(i[this[c]]);return d},clone:function(){var a,b,c=this.__c,d=p.e();for(a in c)d.addComponent(a);for(b in this)"0"!=b&&"_global"!=b&&"_changed"!=b&&"function"!=typeof this[b]&&"object"!=typeof this[b]&&(d[b]=this[b]);return d},setter:function(a,b){return this.defineField(a,function(){},b)},defineField:function(a,b,c){return p.defineField(this,a,b,c),this},destroy:function(){this.each(function(){var a;this.trigger("Remove");for(var b in this.__c)a=h[b],a&&"remove"in a&&a.remove.call(this,!0);this._unbindAll(),delete i[this[0]]})}},p.fn.init.prototype=p.fn,p.extend=p.fn.extend=function(a){var b,c=this;if(!a)return c;for(b in a)c!==a[b]&&(c[b]=a[b]);return c},p._callbackMethods={_bindCallback:function(a,b){var c=this._callbacks[a];c||(c=this._callbacks[a]=(j[a]||(j[a]={}))[this[0]]=[],c.context=this,c.depth=0),c.push(b)},_runCallbacks:function(a,b){if(this._callbacks[a]){var c,d=this._callbacks[a],e=d.length;for(d.depth++,c=0;e>c;c++)"undefined"==typeof d[c]?d.depth<=1&&(d.splice(c,1),c--,e--,0===d.length&&(delete this._callbacks[a],delete j[a][this[0]])):d[c].call(this,b);d.depth--}},_unbindCallbacks:function(a,b){if(this._callbacks[a])for(var c=this._callbacks[a],d=0;d<c.length;d++)b&&c[d]!=b||delete c[d]},_unbindAll:function(){if(this._callbacks)for(var a in this._callbacks)this._callbacks[a]&&(this._unbindCallbacks(a),delete j[a][this[0]])}},p._addCallbackMethods=function(a){a.extend(p._callbackMethods),a._callbacks={}},p._addCallbackMethods(p),p.extend({0:"global",init:function(a,b,c){if(!this._preBindDone)for(var d=0;d<this._bindOnInit.length;d++){var e=this._bindOnInit[d];p.bind(e.event,e.handler)}return p.viewport.init(a,b,c),this.trigger("Load"),this.timer.init(),this},_bindOnInit:[],_preBindDone:!1,_preBind:function(a,b){this._bindOnInit.push({event:a,handler:b})},getVersion:function(){return o},stop:function(a){if(p.trigger("CraftyStop",a),this.timer.stop(),a){if(p.audio.remove(),p.stage&&p.stage.elem.parentNode){var b=document.createElement("div");b.id=p.stage.elem.id,p.stage.elem.parentNode.replaceChild(b,p.stage.elem)}delete p.canvasLayer.context,delete p.domLayer._div,delete p.webgl.context,p._unbindAll(),p._addCallbackMethods(p),this._preBindDone=!1,q()}return this},pause:function(a){return(1===arguments.length?a:!this._paused)?(this.trigger("Pause"),this._paused=!0,setTimeout(function(){p.timer.stop()},0),p.keydown={}):(this.trigger("Unpause"),this._paused=!1,setTimeout(function(){p.timer.init()},0)),this},isPaused:function(){return this._paused},timer:function(){var a,b,c,d="fixed",e=5,f=40,h=0,i=0,j=50,k=1e3/j;return{init:function(){"undefined"==typeof c&&(c=(new Date).getTime()-k);var d="undefined"!=typeof window&&(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||null);d?(a=function(){p.timer.step(),null!==a&&(b=d(a))})():a=setInterval(function(){p.timer.step()},1e3/j)},stop:function(){p.trigger("CraftyStopTimer"),"function"!=typeof a&&clearInterval(a);var c="undefined"!=typeof window&&(window.cancelAnimationFrame||window.cancelRequestAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||null);c&&c(b),a=null},steptype:function(a,b){if("variable"===a||"semifixed"===a)d=a,b&&(f=b);else{if("fixed"!==a)throw"Invalid step type specified";d="fixed",b&&(e=b)}},step:function(){var a,b,j,l=0;if(currentTime=(new Date).getTime(),h>0&&p.trigger("MeasureWaitTime",currentTime-h),c+i>=currentTime)return void(h=currentTime);var m=currentTime-(c+i);m>20*k&&(i+=m-k,m=k),"fixed"===d?(l=Math.ceil(m/k),l=Math.min(l,e),b=k):"variable"===d?(l=1,b=m,b=Math.min(b,f)):"semifixed"===d&&(l=Math.ceil(m/f),b=m/l);for(var n=0;l>n;n++){j=currentTime;var o={frame:g++,dt:b,gameTime:c};p.trigger("EnterFrame",o),p.trigger("ExitFrame",o),c+=b,currentTime=(new Date).getTime(),p.trigger("MeasureFrameTime",currentTime-j)}l>0&&(a=currentTime,p.trigger("PreRender"),p.trigger("RenderScene"),p.trigger("PostRender"),currentTime=(new Date).getTime(),p.trigger("MeasureRenderTime",currentTime-a)),h=currentTime},FPS:function(a){return"undefined"==typeof a?j:(j=a,k=1e3/j,p.trigger("FPSChange",a),void 0)},simulateFrames:function(a,b){for("undefined"==typeof b&&(b=k);a-- >0;){var c={frame:g++,dt:b};p.trigger("EnterFrame",c),p.trigger("ExitFrame",c)}p.trigger("PreRender"),p.trigger("RenderScene"),p.trigger("PostRender")}}}(),e:function(){var a=d();return i[a]=null,i[a]=p(a),arguments.length>0&&i[a].addComponent.apply(i[a],arguments),i[a].setName("Entity #"+a),i[a].addComponent("obj"),p.trigger("NewEntity",{id:a}),i[a]},c:function(a,b){h[a]=b},trigger:function(a,b){var c,d,e=j[a]||(j[a]={});for(c in e)e.hasOwnProperty(c)&&(d=e[c],d&&0!==d.length&&d.context._runCallbacks(a,b))},bind:function(a,b){return this._bindCallback(a,b),b},uniqueBind:function(a,b){return this.unbind(a,b),this.bind(a,b)},one:function(a,b){var c=this,d=function(e){b.call(c,e),c.unbind(a,d)};return c.bind(a,d)},unbind:function(a,b){this._unbindCallbacks(a,b)},frame:function(){return g},components:function(){return h},isComp:function(a){return a in h},debug:function(a){return"handlers"===a?j:i},settings:function(){var a={},b={};return{register:function(a,c){b[a]=c},modify:function(c,d){b[c]&&(b[c].call(a[c],d),a[c]=d)},get:function(b){return a[b]}}}(),defineField:function(a,b,c,d){Object.defineProperty(a,b,{get:c,set:d,configurable:!1,enumerable:!0})},clone:e}),"function"==typeof define&&define("crafty",[],function(){return p}),b.exports=p},{"./version":16}],8:[function(a,b,c){(function(c){var d=a("./core"),e="undefined"!=typeof window&&window.document;!function(){var a=d.support={},b="undefined"!=typeof navigator&&navigator.userAgent.toLowerCase()||"undefined"!=typeof c&&c.version,f=/(webkit)[ \/]([\w.]+)/.exec(b)||/(o)pera(?:.*version)?[ \/]([\w.]+)/.exec(b)||/(ms)ie ([\w.]+)/.exec(b)||/(moz)illa(?:.*? rv:([\w.]+))?/.exec(b)||/(v)\d+\.(\d+)/.exec(b)||[],g=/iPad|iPod|iPhone|Android|webOS|IEMobile/i.exec(b);if(g&&(d.mobile=g[0]),a.defineProperty=function(){if(!("defineProperty"in Object))return!1;try{Object.defineProperty({},"x",{})}catch(a){return!1}return!0}(),a.audio="undefined"!=typeof window&&"canPlayType"in e.createElement("audio"),a.prefix=f[1]||f[0],"moz"===a.prefix&&(a.prefix="Moz"),"o"===a.prefix&&(a.prefix="O"),"v"===a.prefix&&(a.prefix="node"),f[2]&&(a.versionName=f[2],a.version=+f[2].split(".")[0]),a.canvas="undefined"!=typeof window&&"getContext"in e.createElement("canvas"),a.canvas){var h;try{var i=e.createElement("canvas");h=i.getContext("webgl")||i.getContext("experimental-webgl"),h.viewportWidth=a.canvas.width,h.viewportHeight=a.canvas.height}catch(j){}a.webgl=!!h}else a.webgl=!1;a.css3dtransform="undefined"!=typeof window&&("undefined"!=typeof e.createElement("div").style.Perspective||"undefined"!=typeof e.createElement("div").style[a.prefix+"Perspective"]),a.deviceorientation="undefined"!=typeof window&&("undefined"!=typeof window.DeviceOrientationEvent||"undefined"!=typeof window.OrientationEvent),a.devicemotion="undefined"!=typeof window&&"undefined"!=typeof window.DeviceMotionEvent}(),b.exports={_events:{},addEvent:function(a,b,c,d){3===arguments.length&&(d=c,c=b,b=window.document);var e=function(b){d.call(a,b)},f=a[0]||"";this._events[f+b+c+d]||(this._events[f+b+c+d]=e,b.addEventListener(c,e,!1))},removeEvent:function(a,b,c,d){3===arguments.length&&(d=c,c=b,b=window.document);var e=a[0]||"",f=this._events[e+b+c+d];f&&(b.removeEventListener(c,f,!1),delete this._events[e+b+c+d])},background:function(a){d.stage.elem.style.background=a}}}).call(this,a("_process"))},{"./core":7,_process:1}],9:[function(a,b,c){var d=a("../core/core.js");b.exports={assets:{},__paths:{audio:"",images:""},paths:function(a){return"undefined"==typeof a?this.__paths:(a.audio&&(this.__paths.audio=a.audio),void(a.images&&(this.__paths.images=a.images)))},asset:function(a,b){return 1===arguments.length?d.assets[a]:d.assets[a]?void 0:(d.assets[a]=b,this.trigger("NewAsset",{key:a,value:b}),b)},image_whitelist:["jpg","jpeg","gif","png","svg"],load:function(a,b,c,e){function f(){var a=this.src;this.removeEventListener&&this.removeEventListener("canplaythrough",f,!1),m++,c&&c({loaded:m,total:n,percent:m/n*100,src:a}),m===n&&b&&b()}function g(){var a=this.src;e&&e({loaded:m,total:n,percent:m/n*100,src:a}),m++,m===n&&b&&b()}Array.isArray(a)&&d.log("Calling Crafty.load with an array of assets no longer works; see the docs for more details."),a="string"==typeof a?JSON.parse(a):a;var h,i,j,k,l,m=0,n=(a.audio?Object.keys(a.audio).length:0)+(a.images?Object.keys(a.images).length:0)+(a.sprites?Object.keys(a.sprites).length:0),o=d.support.audio,p=d.paths(),q=function(a){
return a.substr(a.lastIndexOf(".")+1).toLowerCase()},r=function(a,b){return-1===b.search("://")?"audio"==a?p.audio+b:p.images+b:b},s=function(a){return d.asset(a)||null},t=function(a){return d.audio.supports(q(a))},u=function(a){return-1!=d.image_whitelist.indexOf(q(a))},v=function(a,b){a.onload=f,"webkit"===d.support.prefix&&(a.src=""),a.src=b};for(k in a)for(l in a[k])if(a[k].hasOwnProperty(l)){if(h=a[k][l],"audio"===k&&o){if("object"==typeof h){var w=[];for(var x in h)i=r(k,h[x]),!s(i)&&t(h[x])&&w.push(i);j=d.audio.add(l,w).obj}else"string"==typeof h&&t(h)&&(i=r(k,h),s(i)||(j=d.audio.add(l,i).obj));j&&j.addEventListener&&j.addEventListener("canplaythrough",f,!1)}else l="sprites"===k?l:h,i=r(k,l),u(l)&&(j=s(i),j||(j=new Image,"sprites"===k&&d.sprite(h.tile,h.tileh,i,h.map,h.paddingX,h.paddingY,h.paddingAroundBorder),d.asset(i,j)),v(j,i));j?j.onerror=g:--n}0===n&&b()},removeAssets:function(a){a="string"==typeof a?JSON.parse(a):a;var b,c,e,f,g=d.paths(),h=function(a,b){return-1===b.search("://")?"audio"==a?g.audio+b:g.images+b:b};for(e in a)for(f in a[e])if(a[e].hasOwnProperty(f))if(b=a[e][f],"audio"===e)if("object"==typeof b)for(var i in b)c=h(e,b[i]),d.asset(c)&&d.audio.remove(f);else"string"==typeof b&&(c=h(e,b),d.asset(c)&&d.audio.remove(f));else if(f="sprites"===e?f:b,c=h(e,f),d.asset(c)){if("sprites"===e)for(var j in b.map)delete d.components()[j];delete d.assets[c]}}}},{"../core/core.js":7}],10:[function(a,b,c){b.exports={init:function(){this.changed=[],this.bind("Change",this._changed_attributes),this.bind("Change",this._changed_triggers)},_changed_triggers:function(a,b){var c;b=Crafty.extend.call({pre:""},b);for(c in a)this.trigger("Change["+b.pre+c+"]",a[c]),a[c].constructor===Object&&this._changed_triggers(a[c],{pre:b.pre+c+"."})},_changed_attributes:function(a){var b;for(b in a)this.changed.push(b);return this},is_dirty:function(a){return 0===arguments.length?!!this.changed.length:this.changed.indexOf(a)>-1}}},{}],11:[function(a,b,c){var d=a("../core/core.js");b.exports={_scenes:{},_current:null,scene:function(a,b,c){return 1===arguments.length||"function"!=typeof arguments[1]?void d.enterScene(a,arguments[1]):void d.defineScene(a,b,c)},defineScene:function(a,b,c){if("function"!=typeof b)throw"Init function is the wrong type.";this._scenes[a]={},this._scenes[a].initialize=b,"undefined"!=typeof c&&(this._scenes[a].uninitialize=c)},enterScene:function(a,b){if("function"==typeof b)throw"Scene data cannot be a function";d.trigger("SceneDestroy",{newScene:a}),d.viewport.reset(),d("2D").each(function(){this.has("Persist")||this.destroy()}),null!==this._current&&"uninitialize"in this._scenes[this._current]&&this._scenes[this._current].uninitialize.call(this);var c=this._current;this._current=a,d.trigger("SceneChange",{oldScene:c,newScene:a}),this._scenes.hasOwnProperty(a)?this._scenes[a].initialize.call(this,b):d.error('The scene "'+a+'" does not exist')}}},{"../core/core.js":7}],12:[function(a,b,c){var d=a("../core/core.js");try{var e="undefined"!=typeof window&&window.localStorage||new a("node-localstorage").LocalStorage("./localStorage")}catch(f){var e=null}var g=function(a,b){var c=b;if(!e)return d.error("Local storage is not accessible.  (Perhaps you are including crafty.js cross-domain?)"),!1;if(1===arguments.length)try{return JSON.parse(e.getItem(a))}catch(f){return e.getItem(a)}else"object"==typeof b&&(c=JSON.stringify(b)),e.setItem(a,c)};g.remove=function(a){return e?void e.removeItem(a):void d.error("Local storage is not accessible.  (Perhaps you are including crafty.js cross-domain?)")},b.exports=g},{"../core/core.js":7}],13:[function(a,b,c){var d=a("../core/core.js");d._systems={},d.s=function(a,b,c){return b?void(c===!1?(d._systems[a]=new d.CraftySystem(a,b),d.trigger("SystemLoaded",a)):d._registerLazySystem(a,b)):d._systems[a]},d._registerLazySystem=function(a,b){Object.defineProperty(d._systems,a,{get:function(){return Object.defineProperty(d._systems,a,{value:new d.CraftySystem(a,b),writable:!0,enumerable:!0,configurable:!0}),d.trigger("SystemLoaded",a),d._systems[a]},configurable:!0})},d.CraftySystem=function(){return systemID=1,function(a,b){if(this.name=a,!b)return this;if(this._systemTemplate=b,this.extend(b),d._addCallbackMethods(this),this[0]="system"+systemID++,"function"==typeof this.init&&this.init(a),"events"in b){var c=b.events;for(var e in c){var f="function"==typeof c[e]?c[e]:b[c[e]];this.bind(e,f)}}}}(),d.CraftySystem.prototype={extend:function(a){for(var b in a)"undefined"==typeof this[b]&&(this[b]=a[b])},bind:function(a,b){return this._bindCallback(a,b),this},trigger:function(a,b){return this._runCallbacks(a,b),this},unbind:function(a,b){return this._unbindCallbacks(a,b),this},one:function(a,b){var c=this,d=function(e){b.call(c,e),c.unbind(a,d)};return c.bind(a,d)},uniqueBind:function(a,b){return this.unbind(a,b),this.bind(a,b)},destroy:function(){d.trigger("SystemDestroyed",this),"function"==typeof this.remove&&this.remove(),this._unbindAll(),delete d._systems[this.name]}}},{"../core/core.js":7}],14:[function(a,b,c){b.exports={init:function(){this._delays=[],this.bind("EnterFrame",function(a){for(var b=this._delays.length;--b>=0;){var c=this._delays[b];if(c===!1)this._delays.splice(b,1);else{for(c.accumulator+=a.dt;c.accumulator>=c.delay&&c.repeat>=0;)c.accumulator-=c.delay,c.repeat--,c.callback.call(this);c.repeat<0&&(this._delays.splice(b,1),"function"==typeof c.callbackOff&&c.callbackOff.call(this))}}})},delay:function(a,b,c,d){return this._delays.push({accumulator:0,callback:a,callbackOff:d,delay:b,repeat:(0>c?1/0:c)||0}),this},cancelDelay:function(a){for(var b=this._delays.length;--b>=0;){var c=this._delays[b];c&&c.callback==a&&(this._delays[b]=!1)}return this}}},{}],15:[function(a,b,c){b.exports={init:function(){this.tweenGroup={},this.tweenStart={},this.tweens=[],this.uniqueBind("EnterFrame",this._tweenTick)},_tweenTick:function(a){var b,c,d;for(d=this.tweens.length-1;d>=0;d--)b=this.tweens[d],b.easing.tick(a.dt),c=b.easing.value(),this._doTween(b.props,c),b.easing.complete&&(this.tweens.splice(d,1),this._endTween(b.props))},_doTween:function(a,b){for(var c in a)this[c]=(1-b)*this.tweenStart[c]+b*a[c]},tween:function(a,b,c){var d={props:a,easing:new Crafty.easing(b,c)};for(var e in a)"undefined"!=typeof this.tweenGroup[e]&&this.cancelTween(e),this.tweenStart[e]=this[e],this.tweenGroup[e]=a;return this.tweens.push(d),this},cancelTween:function(a){if("string"==typeof a)"object"==typeof this.tweenGroup[a]&&delete this.tweenGroup[a][a];else if("object"==typeof a)for(var b in a)this.cancelTween(b);return this},pauseTweens:function(){this.tweens.map(function(a){a.easing.pause()})},resumeTweens:function(){this.tweens.map(function(a){a.easing.resume()})},_endTween:function(a){for(var b in a)delete this.tweenGroup[b];this.trigger("TweenEnd",a)}}},{}],16:[function(a,b,c){b.exports="0.7.1"},{}],17:[function(a,b,c){var d=a("./core/core");d.easing=a("./core/animation"),d.extend(a("./core/extensions")),d.extend(a("./core/loader")),d.c("Model",a("./core/model")),d.extend(a("./core/scenes")),d.storage=a("./core/storage"),d.c("Delay",a("./core/time")),d.c("Tween",a("./core/tween")),a("./core/systems"),a("./spatial/2d"),a("./spatial/collision"),a("./spatial/spatial-grid"),a("./spatial/rect-manager"),a("./spatial/math"),a("./graphics/canvas"),a("./graphics/canvas-layer"),a("./graphics/color"),a("./graphics/dom"),a("./graphics/dom-helper"),a("./graphics/dom-layer"),a("./graphics/drawing"),a("./graphics/gl-textures"),a("./graphics/html"),a("./graphics/image"),a("./graphics/particles"),a("./graphics/sprite-animation"),a("./graphics/sprite"),a("./graphics/text"),a("./graphics/viewport"),a("./graphics/webgl"),a("./isometric/diamond-iso"),a("./isometric/isometric"),a("./controls/inputs"),a("./controls/controls"),a("./controls/device"),a("./controls/keycodes"),a("./sound/sound"),a("./debug/debug-layer"),a("./debug/logging"),window&&(window.Crafty=d),b.exports=d},{"./controls/controls":2,"./controls/device":3,"./controls/inputs":4,"./controls/keycodes":5,"./core/animation":6,"./core/core":7,"./core/extensions":8,"./core/loader":9,"./core/model":10,"./core/scenes":11,"./core/storage":12,"./core/systems":13,"./core/time":14,"./core/tween":15,"./debug/debug-layer":18,"./debug/logging":19,"./graphics/canvas":21,"./graphics/canvas-layer":20,"./graphics/color":22,"./graphics/dom":25,"./graphics/dom-helper":23,"./graphics/dom-layer":24,"./graphics/drawing":26,"./graphics/gl-textures":27,"./graphics/html":28,"./graphics/image":29,"./graphics/particles":30,"./graphics/sprite":32,"./graphics/sprite-animation":31,"./graphics/text":33,"./graphics/viewport":34,"./graphics/webgl":35,"./isometric/diamond-iso":36,"./isometric/isometric":37,"./sound/sound":38,"./spatial/2d":39,"./spatial/collision":40,"./spatial/math":41,"./spatial/rect-manager":42,"./spatial/spatial-grid":43}],18:[function(a,b,c){var d=a("../core/core.js"),e=window.document;d.c("DebugCanvas",{init:function(){this.requires("2D"),d.DebugCanvas.context||d.DebugCanvas.init(),d.DebugCanvas.add(this),this._debug={alpha:1,lineWidth:1},this.bind("RemoveComponent",this.onDebugRemove),this.bind("Remove",this.onDebugDestroy)},onDebugRemove:function(a){"DebugCanvas"===a&&d.DebugCanvas.remove(this)},onDebugDestroy:function(a){d.DebugCanvas.remove(this)},debugAlpha:function(a){return this._debug.alpha=a,this},debugFill:function(a){return"undefined"==typeof a&&(a="red"),this._debug.fillStyle=a,this},debugStroke:function(a){return"undefined"==typeof a&&(a="red"),this._debug.strokeStyle=a,this},debugDraw:function(a){var b=a.globalAlpha,c=this._debug;c.alpha&&(a.globalAlpha=this._debug.alpha),c.strokeStyle&&(a.strokeStyle=c.strokeStyle),c.lineWidth&&(a.lineWidth=c.lineWidth),c.fillStyle&&(a.fillStyle=c.fillStyle),this.trigger("DebugDraw"),a.globalAlpha=b}}),d.c("DebugRectangle",{init:function(){this.requires("2D, DebugCanvas")},debugRectangle:function(a){return this.debugRect=a,this.unbind("DebugDraw",this.drawDebugRect),this.bind("DebugDraw",this.drawDebugRect),this},drawDebugRect:function(){var a=d.DebugCanvas.context,b=this.debugRect;null!==b&&void 0!==b&&b._h&&b._w&&(this._debug.fillStyle&&a.fillRect(b._x,b._y,b._w,b._h),this._debug.strokeStyle&&a.strokeRect(b._x,b._y,b._w,b._h))}}),d.c("VisibleMBR",{init:function(){this.requires("DebugRectangle").debugFill("purple").bind("EnterFrame",this._assignRect)},_assignRect:function(){this._mbr?this.debugRectangle(this._mbr):this.debugRectangle(this)}}),d.c("DebugPolygon",{init:function(){this.requires("2D, DebugCanvas")},debugPolygon:function(a){return this.polygon=a,this.unbind("DebugDraw",this.drawDebugPolygon),this.bind("DebugDraw",this.drawDebugPolygon),this},drawDebugPolygon:function(){if("undefined"!=typeof this.polygon){var a=d.DebugCanvas.context;a.beginPath();for(var b=this.polygon.points,c=b.length,e=0;c>e;e+=2)a.lineTo(b[e],b[e+1]);a.closePath(),this._debug.fillStyle&&a.fill(),this._debug.strokeStyle&&a.stroke()}}}),d.c("WiredHitBox",{init:function(){this.requires("DebugPolygon").debugStroke("red").matchHitBox(),this.bind("NewHitbox",this.matchHitBox)},matchHitBox:function(){this.debugPolygon(this.map)}}),d.c("SolidHitBox",{init:function(){this.requires("Collision, DebugPolygon").debugFill("orange").debugAlpha(.7).matchHitBox(),this.bind("NewHitbox",this.matchHitBox)},matchHitBox:function(){this.debugPolygon(this.map)}}),d.c("WiredAreaMap",{init:function(){this.requires("DebugPolygon").debugStroke("green").matchAreaMap(),this.bind("NewAreaMap",this.matchAreaMap)},matchAreaMap:function(){this.debugPolygon(this.mapArea)}}),d.c("SolidAreaMap",{init:function(){this.requires("DebugPolygon").debugFill("lime").debugAlpha(.7).matchAreaMap(),this.bind("NewAreaMap",this.matchAreaMap)},matchAreaMap:function(){this.debugPolygon(this.mapArea)}}),d.DebugCanvas={context:null,entities:[],onetimeEntities:[],add:function(a){this.entities.push(a)},remove:function(a){for(var b=this.entities,c=b.length-1;c>=0;c--)b[c]==a&&b.splice(c,1)},init:function(){if(!d.DebugCanvas.context){if(!d.support.canvas)return d.trigger("NoCanvas"),void d.stop();var a;a=e.createElement("canvas"),a.width=d.viewport.width,a.height=d.viewport.height,a.style.position="absolute",a.style.left="0px",a.style.top="0px",a.id="debug-canvas",a.style.zIndex=1e5,d.stage.elem.appendChild(a),d.DebugCanvas.context=a.getContext("2d"),d.DebugCanvas._canvas=a}d.unbind("RenderScene",d.DebugCanvas.renderScene),d.bind("RenderScene",d.DebugCanvas.renderScene)},renderScene:function(a){a=a||d.viewport.rect();var b,c=d.DebugCanvas.entities,e=0,f=c.length,g=d.DebugCanvas.context,h=d.viewport;for(g.setTransform(h._scale,0,0,h._scale,Math.round(h._x*h._scale),Math.round(h._y*h._scale)),g.clearRect(a._x,a._y,a._w,a._h);f>e;e++)b=c[e],b.debugDraw(g)}}},{"../core/core.js":7}],19:[function(a,b,c){var d=a("../core/core.js");d.extend({loggingEnabled:!0,log:function(){d.loggingEnabled&&console&&console.log&&console.log.apply(console,arguments)},error:function(){d.loggingEnabled&&console&&console.error&&console.error.apply(console,arguments)}})},{"../core/core.js":7}],20:[function(a,b,c){var d=a("../core/core.js");d.extend({canvasLayer:{_dirtyRects:[],_changedObjs:[],layerCount:0,_dirtyViewport:!1,_sort:function(a,b){return a._globalZ-b._globalZ},add:function(a){this._changedObjs.push(a)},context:null,_canvas:null,init:function(){if(!d.support.canvas)return d.trigger("NoCanvas"),void d.stop();this._dirtyRects=[],this._changedObjs=[],this.layerCount=0;var a;a=document.createElement("canvas"),a.width=d.viewport.width,a.height=d.viewport.height,a.style.position="absolute",a.style.left="0px",a.style.top="0px";d.canvasLayer;d.stage.elem.appendChild(a),this.context=a.getContext("2d"),this._canvas=a;var b=d.viewport._scale;1!=b&&a.scale(b,b),this._setPixelart(d._pixelartEnabled),d.uniqueBind("PixelartSet",this._setPixelart),d.uniqueBind("RenderScene",this._render),d.uniqueBind("ViewportResize",this._resize),d.bind("InvalidateViewport",function(){d.canvasLayer._dirtyViewport=!0})},_render:function(){var a=d.canvasLayer,b=a._dirtyViewport,c=a._changedObjs.length,e=a.context;if(c||b){if(b){var f=d.viewport;e.setTransform(f._scale,0,0,f._scale,Math.round(f._x*f._scale),Math.round(f._y*f._scale))}c/a.layerCount>.6||b?a._drawAll():a._drawDirty(),a._clean()}},_drawDirty:function(){var a,b,c,e,f,g,h=this._changedObjs,i=h.length,j=this._dirtyRects,k=d.rectManager,l=k.overlap,m=this.context,n=[],o=[];for(a=0;i>a;a++)this._createDirty(h[a]);for(k.mergeSet(j),i=j.length,a=0;i>a;++a)if(e=j[a],n.length=0,o.length=0,e){for(e._w=e._x+e._w,e._h=e._y+e._h,e._x=e._x>0?0|e._x:(0|e._x)-1,e._y=e._y>0?0|e._y:(0|e._y)-1,e._w-=e._x,e._h-=e._y,e._w=e._w===(0|e._w)?e._w:(0|e._w)+1,e._h=e._h===(0|e._h)?e._h:(0|e._h)+1,c=d.map.search(e,!1),m.clearRect(e._x,e._y,e._w,e._h),m.save(),m.beginPath(),m.rect(e._x,e._y,e._w,e._h),m.clip(),b=0,f=c.length;f>b;++b)g=c[b],!n[g[0]]&&g._visible&&g.__c.Canvas&&(n[g[0]]=!0,o.push(g));for(o.sort(this._sort),b=0,f=o.length;f>b;++b){g=o[b];var p=g._mbr||g;l(p,e)&&g.draw(),g._changed=!1}m.closePath(),m.restore()}if(d.canvasLayer.debugDirty===!0)for(m.strokeStyle="red",a=0,i=j.length;i>a;++a)e=j[a],m.strokeRect(e._x,e._y,e._w,e._h)},_drawAll:function(a){a=a||d.viewport.rect();var b,c=d.map.search(a),e=0,f=c.length,g=this.context;for(g.clearRect(a._x,a._y,a._w,a._h),c.sort(this._sort);f>e;e++)b=c[e],b._visible&&b.__c.Canvas&&(b.draw(),b._changed=!1)},debug:function(){d.log(this._changedObjs)},_clean:function(){var a,b,c,d,e=this._changedObjs;for(c=0,d=e.length;d>c;c++)b=e[c],a=b._mbr||b,"undefined"==typeof b.staleRect&&(b.staleRect={}),b.staleRect._x=a._x,b.staleRect._y=a._y,b.staleRect._w=a._w,b.staleRect._h=a._h,b._changed=!1;e.length=0,this._dirtyRects.length=0,this._dirtyViewport=!1},_createDirty:function(a){var b=a._mbr||a,c=this._dirtyRects,e=d.rectManager;if(a.staleRect){if(e.overlap(a.staleRect,b))return e.merge(a.staleRect,b,a.staleRect),void c.push(a.staleRect);c.push(a.staleRect)}a.currentRect._x=b._x,a.currentRect._y=b._y,a.currentRect._w=b._w,a.currentRect._h=b._h,c.push(a.currentRect)},_resize:function(){var a=d.canvasLayer._canvas;a.width=d.viewport.width,a.height=d.viewport.height},_setPixelart:function(a){var b=d.canvasLayer.context;b.imageSmoothingEnabled=!a,b.mozImageSmoothingEnabled=!a,b.webkitImageSmoothingEnabled=!a,b.oImageSmoothingEnabled=!a,b.msImageSmoothingEnabled=!a}}})},{"../core/core.js":7}],21:[function(a,b,c){var d=a("../core/core.js");d.c("Canvas",{init:function(){var a=d.canvasLayer;a.context||a.init(),this._drawLayer=a,this._drawContext=a.context,a.layerCount++,this.currentRect={},this._changed=!0,a.add(this),this.bind("Invalidate",function(b){this._changed===!1&&(this._changed=!0,a.add(this))}),this.bind("Remove",function(){this._drawLayer.layerCount--,this._changed=!0,this._drawLayer.add(this)})},drawVars:{type:"canvas",pos:{},ctx:null,coord:[0,0,0,0],co:{x:0,y:0,w:0,h:0}},draw:function(a,b,c,d,e){if(this.ready){4===arguments.length&&(e=d,d=c,c=b,b=a,a=this._drawContext);var f=this.drawVars.pos;f._x=this._x+(b||0),f._y=this._y+(c||0),f._w=d||this._w,f._h=e||this._h,context=a||this._drawContext,coord=this.__coord||[0,0,0,0];var g=this.drawVars.co;g.x=coord[0]+(b||0),g.y=coord[1]+(c||0),g.w=d||coord[2],g.h=e||coord[3],(this._flipX||this._flipY||this._rotation)&&context.save(),0!==this._rotation&&(context.translate(this._origin.x+this._x,this._origin.y+this._y),f._x=-this._origin.x,f._y=-this._origin.y,context.rotate(this._rotation%360*(Math.PI/180))),(this._flipX||this._flipY)&&(context.scale(this._flipX?-1:1,this._flipY?-1:1),this._flipX&&(f._x=-(f._x+f._w)),this._flipY&&(f._y=-(f._y+f._h)));var h;return this._alpha<1&&(h=context.globalAlpha,context.globalAlpha=this._alpha),this.drawVars.ctx=context,this.trigger("Draw",this.drawVars),(0!==this._rotation||this._flipX||this._flipY)&&context.restore(),h&&(context.globalAlpha=h),this}}})},{"../core/core.js":7}],22:[function(a,b,c){var d=a("../core/core.js"),e=window.document;d.extend({assignColor:function(){function a(a){return a._red=a._blue=a._green=0,a}function b(a){var b=a.toString(16);return 1==b.length&&(b="0"+b),b}function c(a,c,d){return"#"+b(a)+b(c)+b(d)}function d(b,c){var d;if(7===b.length)d=2;else{if(4!==b.length)return a(c);d=1}return c._red=parseInt(b.substr(1,d),16),c._green=parseInt(b.substr(1+d,d),16),c._blue=parseInt(b.substr(1+2*d,d),16),c}function f(b,c){var d=l.exec(b);return null===d||4!=d.length&&5!=d.length?a(c):(c._red=Math.round(parseFloat(d[1])),c._green=Math.round(parseFloat(d[2])),c._blue=Math.round(parseFloat(d[3])),d[4]&&(c._strength=parseFloat(d[4])),c)}function g(a,b){if("undefined"==typeof k[a]){j===!1&&(window.document.body.appendChild(i),j=!0),i.style.color=a;var e=window.getComputedStyle(i).color;f(e,b),k[a]=c(b._red,b._green,b._blue)}else d(k[a],b);return b}function h(a){return"rgba("+a._red+", "+a._green+", "+a._blue+", "+a._strength+")"}var i=e.createElement("div");i.style.display="none";var j=!1,k={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#00ff00",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",orange:"#ffa500",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00"},l=/rgba?\s*\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,?\s*([0-9.]+)?\)/;return function(a,b){b=b||{},a=a.trim().toLowerCase();var c=null;c="#"===a[0]?d(a,b):"r"===a[0]&&"g"===a[1]&&"b"===a[2]?f(a,b):g(a,b),b._strength=b._strength||1,b._color=h(b)}}()});var f="attribute vec2 aPosition;\nattribute vec3 aOrientation;\nattribute vec2 aLayer;\nattribute vec4 aColor;\n\nvarying lowp vec4 vColor;\n\nuniform  vec4 uViewport;\n\nmat4 viewportScale = mat4(2.0 / uViewport.z, 0, 0, 0,    0, -2.0 / uViewport.w, 0,0,    0, 0,1,0,    -1,+1,0,1);\nvec4 viewportTranslation = vec4(uViewport.xy, 0, 0);\n\nvoid main() {\n  vec2 pos = aPosition;\n  vec2 entityOrigin = aOrientation.xy;\n  mat2 entityRotationMatrix = mat2(cos(aOrientation.z), sin(aOrientation.z), -sin(aOrientation.z), cos(aOrientation.z));\n\n  pos = entityRotationMatrix * (pos - entityOrigin) + entityOrigin;\n  gl_Position = viewportScale * (viewportTranslation + vec4(pos, 1.0/(1.0+exp(aLayer.x) ), 1) );\n  vColor = vec4(aColor.rgb*aColor.a*aLayer.y, aColor.a*aLayer.y);\n}",g="precision mediump float;\nvarying lowp vec4 vColor;\nvoid main(void) {\n	gl_FragColor = vColor;\n}",h=[{name:"aPosition",width:2},{name:"aOrientation",width:3},{name:"aLayer",width:2},{name:"aColor",width:4}];d.c("Color",{_red:0,_green:0,_blue:0,_strength:1,_color:"",ready:!0,init:function(){this.bind("Draw",this._drawColor),this.has("WebGL")&&this._establishShader("Color",g,f,h),this.trigger("Invalidate")},remove:function(){this.unbind("Draw",this._drawColor),this.has("DOM")&&(this._element.style.backgroundColor="transparent"),this.trigger("Invalidate")},_drawColor:function(a){this._color&&("DOM"===a.type?(a.style.backgroundColor=this._color,a.style.lineHeight=0):"canvas"===a.type?(a.ctx.fillStyle=this._color,a.ctx.fillRect(a.pos._x,a.pos._y,a.pos._w,a.pos._h)):"webgl"===a.type&&a.program.writeVector("aColor",this._red/255,this._green/255,this._blue/255,this._strength))},color:function(a){return 0===arguments.length?this._color:(arguments.length>=3?(this._red=arguments[0],this._green=arguments[1],this._blue=arguments[2],"number"==typeof arguments[3]&&(this._strength=arguments[3])):(d.assignColor(a,this),"number"==typeof arguments[1]&&(this._strength=arguments[1])),this._color="rgba("+this._red+", "+this._green+", "+this._blue+", "+this._strength+")",this.trigger("Invalidate"),this)}})},{"../core/core.js":7}],23:[function(a,b,c){var d=a("../core/core.js"),e=window.document;d.extend({domHelper:{innerPosition:function(a){var b=a.getBoundingClientRect(),c=b.left+(window.pageXOffset?window.pageXOffset:e.body.scrollLeft),d=b.top+(window.pageYOffset?window.pageYOffset:e.body.scrollTop),f=parseInt(this.getStyle(a,"border-left-width")||0,10)||parseInt(this.getStyle(a,"borderLeftWidth")||0,10)||0,g=parseInt(this.getStyle(a,"border-top-width")||0,10)||parseInt(this.getStyle(a,"borderTopWidth")||0,10)||0;return c+=f,d+=g,{x:c,y:d}},getStyle:function(a,b){var c;return a.currentStyle?c=a.currentStyle[this.camelize(b)]:window.getComputedStyle&&(c=e.defaultView.getComputedStyle(a,null).getPropertyValue(this.csselize(b))),c},camelize:function(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})},csselize:function(a){return a.replace(/[A-Z]/g,function(a){return a?"-"+a.toLowerCase():""})},translate:function(a,b){var c=e.documentElement,f=e.body;return{x:(a-d.stage.x+(c&&c.scrollLeft||f&&f.scrollLeft||0))/d.viewport._scale-d.viewport._x,y:(b-d.stage.y+(c&&c.scrollTop||f&&f.scrollTop||0))/d.viewport._scale-d.viewport._y}}}})},{"../core/core.js":7}],24:[function(a,b,c){var d=a("../core/core.js"),e=window.document;d.extend({domLayer:{_changedObjs:[],_dirtyViewport:!1,_div:null,init:function(){this._changedObjs=[],this._dirtyViewport=!1;var a=this._div=e.createElement("div");d.stage.elem.appendChild(a),a.style.position="absolute",a.style.zIndex="1",a.style.transformStyle="preserve-3d",d.uniqueBind("RenderScene",this._render),d.uniqueBind("PixelartSet",this._setPixelArt),d.uniqueBind("InvalidateViewport",function(){d.domLayer._dirtyViewport=!0})},_setPixelArt:function(a){var b=d.domLayer._div.style,c=d.domHelper.camelize;a?(b[c("image-rendering")]="optimizeSpeed",b[c("image-rendering")]="-moz-crisp-edges",b[c("image-rendering")]="-o-crisp-edges",b[c("image-rendering")]="-webkit-optimize-contrast",b[c("-ms-interpolation-mode")]="nearest-neighbor",b[c("image-rendering")]="optimize-contrast",b[c("image-rendering")]="pixelated",b[c("image-rendering")]="crisp-edges"):(b[c("image-rendering")]="optimizeQuality",b[c("-ms-interpolation-mode")]="bicubic",b[c("image-rendering")]="auto")},debug:function(){d.log(this._changedObjs)},_render:function(){var a=d.domLayer,b=a._changedObjs;if(a._dirtyViewport&&(a._setViewport(),a._dirtyViewport=!1),b.length){for(var c=0,e=b.length;e>c;++c)b[c].draw()._changed=!1;b.length=0}},add:function(a){this._changedObjs.push(a)},_setViewport:function(){var a=d.domLayer._div.style,b=d.viewport;a.transform=a[d.support.prefix+"Transform"]="scale("+b._scale+", "+b._scale+")",a.left=Math.round(b._x*b._scale)+"px",a.top=Math.round(b._y*b._scale)+"px",a.zIndex=10}}})},{"../core/core.js":7}],25:[function(a,b,c){var d=a("../core/core.js"),e=window.document;d.c("DOM",{_element:null,_cssStyles:null,avoidCss3dTransforms:!1,init:function(){var a=d.domLayer;a._div||a.init(),this._drawLayer=a,this._cssStyles={visibility:"",left:"",top:"",width:"",height:"",zIndex:"",opacity:"",transformOrigin:"",transform:""},this._element=e.createElement("div"),a._div.appendChild(this._element),this._element.style.position="absolute",this._element.id="ent"+this[0],this.bind("Invalidate",this._invalidateDOM),this.bind("NewComponent",this._updateClass),this.bind("RemoveComponent",this._removeClass),this._invalidateDOM()},remove:function(){this.undraw(),this.unbind("NewComponent",this._updateClass),this.unbind("RemoveComponent",this._removeClass),this.unbind("Invalidate",this._invalidateDOM)},getDomId:function(){return this._element.id},_removeClass:function(a){var b=0,c=this.__c,d="";for(b in c)b!=a&&(d+=" "+b);d=d.substr(1),this._element.className=d},_updateClass:function(){var a=0,b=this.__c,c="";for(a in b)c+=" "+a;c=c.substr(1),this._element.className=c},_invalidateDOM:function(){this._changed||(this._changed=!0,this._drawLayer.add(this))},DOM:function(a){return a&&a.nodeType&&(this.undraw(),this._element=a,this._element.style.position="absolute"),this},draw:function(){var a=this._element.style,b=this.__coord||[0,0,0,0],c={x:b[0],y:b[1],w:b[2],h:b[3]},e=d.support.prefix,f=[];if(this._cssStyles.visibility!==this._visible&&(this._cssStyles.visibility=this._visible,this._visible?a.visibility="visible":a.visibility="hidden"),d.support.css3dtransform&&!this.avoidCss3dTransforms?f.push("translate3d("+~~this._x+"px,"+~~this._y+"px,0)"):(this._cssStyles.left!==this._x&&(this._cssStyles.left=this._x,a.left=~~this._x+"px"),this._cssStyles.top!==this._y&&(this._cssStyles.top=this._y,a.top=~~this._y+"px")),this._cssStyles.width!==this._w&&(this._cssStyles.width=this._w,a.width=~~this._w+"px"),this._cssStyles.height!==this._h&&(this._cssStyles.height=this._h,a.height=~~this._h+"px"),this._cssStyles.zIndex!==this._z&&(this._cssStyles.zIndex=this._z,a.zIndex=this._z),this._cssStyles.opacity!==this._alpha&&(this._cssStyles.opacity=this._alpha,a.opacity=this._alpha,a[e+"Opacity"]=this._alpha),this._mbr){var g=this._origin.x+"px "+this._origin.y+"px";a.transformOrigin=g,a[e+"TransformOrigin"]=g,d.support.css3dtransform?f.push("rotateZ("+this._rotation+"deg)"):f.push("rotate("+this._rotation+"deg)")}return this._flipX&&f.push("scaleX(-1)"),this._flipY&&f.push("scaleY(-1)"),this._cssStyles.transform!=f.join(" ")&&(this._cssStyles.transform=f.join(" "),a.transform=this._cssStyles.transform,a[e+"Transform"]=this._cssStyles.transform),this.trigger("Draw",{style:a,type:"DOM",co:c}),this},undraw:function(){var a=this._element;return a&&null!==a.parentNode&&a.parentNode.removeChild(a),this},css:function(a,b){var c,e,f=this._element,g=f.style;if("object"==typeof a)for(c in a)a.hasOwnProperty(c)&&(e=a[c],"number"==typeof e&&(e+="px"),g[d.domHelper.camelize(c)]=e);else{if(!b)return d.domHelper.getStyle(f,a);"number"==typeof b&&(b+="px"),g[d.domHelper.camelize(a)]=b}return this.trigger("Invalidate"),this}})},{"../core/core.js":7}],26:[function(a,b,c){var d=a("../core/core.js");d.extend({_pixelartEnabled:!1,pixelart:function(a){d._pixelartEnabled=a,d.trigger("PixelartSet",a)}})},{"../core/core.js":7}],27:[function(a,b,c){var d=a("../core/core.js"),e=d.TextureManager=function(a,b){this.gl=a,this.webgl=b,this.max_units=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS),this.bound_textures=[],this.registered_textures={},this.active=null};e.prototype={reset:function(){for(var a,b=0;b<this.bound_textures.length;b++)a=this.bound_textures[b],a.unbind();this.bound_textures=[],this.active=null},makeTexture:function(a,b,c){var d=(this.gl,this.webgl),e="texture-(r:"+c+")-"+a;if("undefined"!=typeof this.registered_textures[e])return this.registered_textures[e];var g=new f(this,e);return this.registered_textures[e]=g,this.bindTexture(g),g.setImage(b),g.setFilter(d.texture_filter),g.setRepeat(c),g},smallest:function(){for(var a=1/0,b=null,c=0;c<this.bound_textures.length;c++){var d=this.bound_textures[c];d.size<a&&(a=d.size,b=c)}return b},getAvailableUnit:function(){return this.bound_textures.length<this.max_units?this.bound_textures.length:this.smallest()},bindTexture:function(a){if(null===a.unit){var b=this.getAvailableUnit();this.bound_textures[b]&&this.unbindTexture(this.bound_textures[b]),this.bound_textures[b]=a,a.bind(b)}},unbindTexture:function(a){a.unbind()},setActiveTexture:function(a){this.active!==a.id&&(this.gl.activeTexture(this.gl[a.name]),this.active=a.unit)}};var f=d.TextureWrapper=function(a,b){this.manager=a,this.gl=a.gl,this.glTexture=this.gl.createTexture(),this.id=b,this.active=!1,this.unit=null,this.powerOfTwo=!1};f.prototype={bind:function(a){var b=this.gl;this.unit=a,this.name="TEXTURE"+a,this.manager.setActiveTexture(this),b.bindTexture(b.TEXTURE_2D,this.glTexture)},isActive:function(){return this.manager.active===this.unit},unbind:function(){this.unit=null,this.name=null,this.isActive()&&(this.manager.active=null)},setImage:function(a){if(!this.isActive())throw"Trying to set image of texture that isn't active";this.width=a.width,this.height=a.height,this.size=a.width*a.height,this.powerOfTwo=!(Math.log(a.width)/Math.LN2!=Math.floor(Math.log(a.width)/Math.LN2)||Math.log(a.height)/Math.LN2!=Math.floor(Math.log(a.height)/Math.LN2));var b=this.gl;b.texImage2D(b.TEXTURE_2D,0,b.RGBA,b.RGBA,b.UNSIGNED_BYTE,a)},setFilter:function(a){if(!this.isActive())throw"Trying to set filter of texture that isn't active";var b=this.gl;b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,a),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,a)},setRepeat:function(a){if(!this.isActive())throw"Trying to set repeat property of texture that isn't active";if(a&&!this.powerOfTwo)throw"Can't create a repeating image whose dimensions aren't a power of 2 in WebGL contexts";var b=this.gl;this.repeatMode=a?b.REPEAT:b.CLAMP_TO_EDGE,b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,this.repeatMode),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,this.repeatMode)},setToProgram:function(a,b,c){if(null===this.unit)throw"Trying to use texture not set to a texture unit.";var d=this.gl;d.useProgram(a),d.uniform1i(d.getUniformLocation(a,b),this.unit),d.uniform2f(d.getUniformLocation(a,c),this.width,this.height)}}},{"../core/core.js":7}],28:[function(a,b,c){var d=a("../core/core.js");d.c("HTML",{inner:"",init:function(){this.requires("2D, DOM")},replace:function(a){return this.inner=a,this._element.innerHTML=a,this},append:function(a){return this.inner+=a,this._element.innerHTML+=a,this},prepend:function(a){return this.inner=a+this.inner,this._element.innerHTML=a+this.inner,this}})},{"../core/core.js":7}],29:[function(a,b,c){var d=a("../core/core.js"),e="attribute vec2 aPosition;\nattribute vec3 aOrientation;\nattribute vec2 aLayer;\nattribute vec2 aTextureCoord;\n\nvarying mediump vec3 vTextureCoord;\n\nuniform vec4 uViewport;\nuniform mediump vec2 uTextureDimensions;\n\nmat4 viewportScale = mat4(2.0 / uViewport.z, 0, 0, 0,    0, -2.0 / uViewport.w, 0,0,    0, 0,1,0,    -1,+1,0,1);\nvec4 viewportTranslation = vec4(uViewport.xy, 0, 0);\n\nvoid main() {\n  vec2 pos = aPosition;\n  vec2 entityOrigin = aOrientation.xy;\n  mat2 entityRotationMatrix = mat2(cos(aOrientation.z), sin(aOrientation.z), -sin(aOrientation.z), cos(aOrientation.z));\n  \n  pos = entityRotationMatrix * (pos - entityOrigin) + entityOrigin ;\n  gl_Position = viewportScale * (viewportTranslation + vec4(pos, 1.0/(1.0+exp(aLayer.x) ), 1) );\n  vTextureCoord = vec3(aTextureCoord, aLayer.y);\n}",f="varying mediump vec3 vTextureCoord;\n  \nuniform sampler2D uSampler;\nuniform mediump vec2 uTextureDimensions;\n\nvoid main(void) {\n  highp vec2 coord =   vTextureCoord.xy / uTextureDimensions;\n  mediump vec4 base_color = texture2D(uSampler, coord);\n  gl_FragColor = vec4(base_color.rgb*base_color.a*vTextureCoord.z, base_color.a*vTextureCoord.z);\n}",g=[{
name:"aPosition",width:2},{name:"aOrientation",width:3},{name:"aLayer",width:2},{name:"aTextureCoord",width:2}];d.c("Image",{_repeat:"repeat",ready:!1,init:function(){this.bind("Draw",this._drawImage)},remove:function(){this.unbind("Draw",this._drawImage)},image:function(a,b){if(this.__image=a,this._repeat=b||"no-repeat",this.img=d.asset(a),this.img)this._onImageLoad();else{this.img=new Image,d.asset(a,this.img),this.img.src=a;var c=this;this.img.onload=function(){c._onImageLoad()}}return this.trigger("Invalidate"),this},_onImageLoad:function(){this.has("Canvas")?this._pattern=this._drawContext.createPattern(this.img,this._repeat):this.has("WebGL")&&(this._establishShader("image:"+this.__image,f,e,g),this.program.setTexture(this.webgl.makeTexture(this.__image,this.img,"no-repeat"!==this._repeat))),"no-repeat"===this._repeat&&(this.w=this.w||this.img.width,this.h=this.h||this.img.height),this.ready=!0,this.trigger("Invalidate")},_drawImage:function(a){if("canvas"===a.type){if(!this.ready||!this._pattern)return;var b=a.ctx;b.fillStyle=this._pattern,b.save(),b.translate(a.pos._x,a.pos._y),b.fillRect(0,0,a.pos._w,a.pos._h),b.restore()}else if("DOM"===a.type)this.__image&&(a.style.backgroundImage="url("+this.__image+")",a.style.backgroundRepeat=this._repeat);else if("webgl"===a.type){var c=a.pos;a.program.writeVector("aTextureCoord",0,0,0,c._h,c._w,0,c._w,c._h)}}})},{"../core/core.js":7}],30:[function(a,b,c){var d=a("../core/core.js"),e=window.document;d.c("Particles",{init:function(){this._Particles=d.clone(this._Particles),this._Particles.parentEntity=this},particles:function(a){if(!d.support.canvas||d.deactivateParticles)return this;var b,c,f,g,h;b=e.createElement("canvas"),b.width=d.viewport.width,b.height=d.viewport.height,b.style.position="absolute",b.style.left="0px",b.style.top="0px",d.stage.elem.appendChild(b),c=b.getContext("2d"),this._Particles.init(a),this.bind("Remove",function(){d.stage.elem.removeChild(b)}).bind("RemoveComponent",function(a){"particles"===a&&d.stage.elem.removeChild(b)}),f=this.x+d.viewport.x,g=this.y+d.viewport.y,this._Particles.position=this._Particles.vectorHelpers.create(f,g);var i={x:d.viewport.x,y:d.viewport.y};return this.bind("EnterFrame",function(){f=this.x+d.viewport.x,g=this.y+d.viewport.y,this._Particles.viewportDelta={x:d.viewport.x-i.x,y:d.viewport.y-i.y},i={x:d.viewport.x,y:d.viewport.y},this._Particles.position=this._Particles.vectorHelpers.create(f,g),"function"==typeof d.rectManager.boundingRect?(h=d.rectManager.boundingRect(this._Particles.register),h&&c.clearRect(h._x,h._y,h._w,h._h)):c.clearRect(0,0,d.viewport.width,d.viewport.height),this._Particles.update(),this._Particles.render(c)}),this},_Particles:{presets:{maxParticles:150,size:18,sizeRandom:4,speed:1,speedRandom:1.2,lifeSpan:29,lifeSpanRandom:7,angle:65,angleRandom:34,startColour:[255,131,0,1],startColourRandom:[48,50,45,0],endColour:[245,35,0,0],endColourRandom:[60,60,60,0],sharpness:20,sharpnessRandom:10,spread:10,duration:-1,fastMode:!1,gravity:{x:0,y:.1},jitter:0,originOffset:{x:0,y:0},particles:[],active:!0,particleCount:0,elapsedFrames:0,emissionRate:0,emitCounter:0,particleIndex:0},init:function(a){this.position=this.vectorHelpers.create(0,0),"undefined"==typeof a&&(a={});for(var b in this.presets)"undefined"!=typeof a[b]?this[b]=a[b]:this[b]=this.presets[b];this.emissionRate=this.maxParticles/this.lifeSpan,this.positionRandom=this.vectorHelpers.create(this.spread,this.spread)},addParticle:function(){if(this.particleCount==this.maxParticles)return!1;var a=new this.particle(this.vectorHelpers);return this.initParticle(a),this.particles[this.particleCount]=a,this.particleCount++,!0},RANDM1TO1:function(){return 2*Math.random()-1},initParticle:function(a){a.position.x=d.viewport._scale*(this.position.x+this.originOffset.x+this.positionRandom.x*this.RANDM1TO1()),a.position.y=d.viewport._scale*(this.position.y+this.originOffset.y+this.positionRandom.y*this.RANDM1TO1());var b=(this.angle+this.angleRandom*this.RANDM1TO1())*(Math.PI/180),c=this.vectorHelpers.create(Math.sin(b),-Math.cos(b)),e=this.speed+this.speedRandom*this.RANDM1TO1();a.direction=this.vectorHelpers.multiply(c,e),a.size=d.viewport._scale*(this.size+this.sizeRandom*this.RANDM1TO1()),a.size=a.size<0?0:~~a.size,a.timeToLive=this.lifeSpan+this.lifeSpanRandom*this.RANDM1TO1(),a.sharpness=this.sharpness+this.sharpnessRandom*this.RANDM1TO1(),a.sharpness=a.sharpness>100?100:a.sharpness<0?0:a.sharpness,a.sizeSmall=~~(a.size/200*a.sharpness);var f=[this.startColour[0]+this.startColourRandom[0]*this.RANDM1TO1(),this.startColour[1]+this.startColourRandom[1]*this.RANDM1TO1(),this.startColour[2]+this.startColourRandom[2]*this.RANDM1TO1(),this.startColour[3]+this.startColourRandom[3]*this.RANDM1TO1()],g=[this.endColour[0]+this.endColourRandom[0]*this.RANDM1TO1(),this.endColour[1]+this.endColourRandom[1]*this.RANDM1TO1(),this.endColour[2]+this.endColourRandom[2]*this.RANDM1TO1(),this.endColour[3]+this.endColourRandom[3]*this.RANDM1TO1()];a.colour=f,a.deltaColour[0]=(g[0]-f[0])/a.timeToLive,a.deltaColour[1]=(g[1]-f[1])/a.timeToLive,a.deltaColour[2]=(g[2]-f[2])/a.timeToLive,a.deltaColour[3]=(g[3]-f[3])/a.timeToLive},update:function(){if(this.active&&this.emissionRate>0){var a=1/this.emissionRate;for(this.emitCounter++;this.particleCount<this.maxParticles&&this.emitCounter>a;)this.addParticle(),this.emitCounter-=a;this.elapsedFrames++,-1!=this.duration&&this.duration<this.elapsedFrames&&this.stop()}this.particleIndex=0,this.register=[];for(var b;this.particleIndex<this.particleCount;){var c=this.particles[this.particleIndex];if(c.timeToLive>0){c.direction=this.vectorHelpers.add(c.direction,this.gravity),c.position=this.vectorHelpers.add(c.position,c.direction),c.position=this.vectorHelpers.add(c.position,this.viewportDelta),this.jitter&&(c.position.x+=this.jitter*this.RANDM1TO1(),c.position.y+=this.jitter*this.RANDM1TO1()),c.timeToLive--;var d=c.colour[0]+=c.deltaColour[0],e=c.colour[1]+=c.deltaColour[1],f=c.colour[2]+=c.deltaColour[2],g=c.colour[3]+=c.deltaColour[3];b=[],b.push("rgba("+(d>255?255:0>d?0:~~d)),b.push(e>255?255:0>e?0:~~e),b.push(f>255?255:0>f?0:~~f),b.push((g>1?1:0>g?0:g.toFixed(2))+")"),c.drawColour=b.join(","),this.fastMode||(b[3]="0)",c.drawColourEnd=b.join(",")),this.particleIndex++}else this.particleIndex!=this.particleCount-1&&(this.particles[this.particleIndex]=this.particles[this.particleCount-1]),this.particleCount--;var h={};h._x=~~c.position.x,h._y=~~c.position.y,h._w=c.size,h._h=c.size,this.register.push(h)}},stop:function(){this.active=!1,this.elapsedFrames=0,this.emitCounter=0,this.parentEntity.trigger("ParticleEnd")},render:function(a){for(var b=0,c=this.particleCount;c>b;b++){var e=this.particles[b],f=e.size,g=f>>1;if(!(e.position.x+f<0||e.position.y+f<0||e.position.x-f>d.viewport.width||e.position.y-f>d.viewport.height)){var h=~~e.position.x,i=~~e.position.y;if(this.fastMode)a.fillStyle=e.drawColour;else{var j=a.createRadialGradient(h+g,i+g,e.sizeSmall,h+g,i+g,g);j.addColorStop(0,e.drawColour),j.addColorStop(.9,e.drawColourEnd),a.fillStyle=j}a.fillRect(h,i,f,f)}}},particle:function(a){this.position=a.create(0,0),this.direction=a.create(0,0),this.size=0,this.sizeSmall=0,this.timeToLive=0,this.colour=[],this.drawColour="",this.deltaColour=[],this.sharpness=0},vectorHelpers:{create:function(a,b){return{x:a,y:b}},multiply:function(a,b){return a.x*=b,a.y*=b,a},add:function(a,b){return a.x+=b.x,a.y+=b.y,a}}}})},{"../core/core.js":7}],31:[function(a,b,c){var d=a("../core/core.js");d.c("SpriteAnimation",{_reels:null,_currentReelId:null,_currentReel:null,_isPlaying:!1,animationSpeed:1,init:function(){this._reels={}},reel:function(a,b,c,e,f){if(0===arguments.length)return this._currentReelId;if(1===arguments.length&&"string"==typeof a){if("undefined"==typeof this._reels[a])throw"The specified reel "+a+" is undefined.";return this.pauseAnimation(),this._currentReelId!==a&&(this._currentReelId=a,this._currentReel=this._reels[a],this._updateSprite(),this.trigger("ReelChange",this._currentReel)),this}var g,h,i;if(g={id:a,frames:[],currentFrame:0,easing:new d.easing(b),defaultLoops:1},g.duration=g.easing.duration,"number"==typeof c)if(h=c,i=e,f>=0)for(;c+f>h;h++)g.frames.push([h,i]);else for(;h>c+f;h--)g.frames.push([h,i]);else{if(3!==arguments.length||"object"!=typeof c)throw"Urecognized arguments. Please see the documentation for 'reel(...)'.";g.frames=c}return this._reels[a]=g,this},animate:function(a,b){"string"==typeof a&&this.reel(a);var c=this._currentReel;if("undefined"==typeof c||null===c)throw"No reel is specified, and there is no currently active reel.";return this.pauseAnimation(),"undefined"==typeof b&&(b="number"==typeof a?a:1),c.easing.reset(),this.loops(b),this._setFrame(0),this.bind("EnterFrame",this._animationTick),this._isPlaying=!0,this.trigger("StartAnimation",c),this},resumeAnimation:function(){return this._isPlaying===!1&&null!==this._currentReel&&(this.bind("EnterFrame",this._animationTick),this._isPlaying=!0,this._currentReel.easing.resume(),this.trigger("StartAnimation",this._currentReel)),this},pauseAnimation:function(){return this._isPlaying===!0&&(this.unbind("EnterFrame",this._animationTick),this._isPlaying=!1,this._reels[this._currentReelId].easing.pause()),this},resetAnimation:function(){var a=this._currentReel;if(null===a)throw"No active reel to reset.";return this.reelPosition(0),a.easing.repeat(a.defaultLoops),this},loops:function(a){return 0===arguments.length?null!==this._currentReel?this._currentReel.easing.loops:0:(null!==this._currentReel&&(0>a&&(a=1/0),this._currentReel.easing.repeat(a),this._currentReel.defaultLoops=a),this)},reelPosition:function(a){if(null===this._currentReel)throw"No active reel.";if(0===arguments.length)return this._currentReel.currentFrame;var b,c=this._currentReel.frames.length;if("end"===a&&(a=c-1),1>a&&a>0)b=a,a=Math.floor(c*b);else{if(a!==Math.floor(a))throw"Position "+a+" is invalid.";0>a&&(a=c-1+a),b=a/c}return a=Math.min(a,c-1),a=Math.max(a,0),this._setProgress(b),this._setFrame(a),this},_animationTick:function(a){var b=this._reels[this._currentReelId];b.easing.tick(a.dt*this.animationSpeed);var c=b.easing.value(),d=Math.min(Math.floor(b.frames.length*c),b.frames.length-1);this._setFrame(d),b.easing.complete===!0&&(this.pauseAnimation(),this.trigger("AnimationEnd",this._currentReel))},_setFrame:function(a){var b=this._currentReel;a!==b.currentFrame&&(b.currentFrame=a,this._updateSprite(),this.trigger("FrameChange",b))},_updateSprite:function(){var a=this._currentReel,b=a.frames[a.currentFrame];this.sprite(b[0],b[1])},_setProgress:function(a,b){this._currentReel.easing.setProgress(a,b)},isPlaying:function(a){return this._isPlaying?a?this._currentReelId===a:!!this._currentReelId:!1},getReel:function(a){if(0===arguments.length){if(!this._currentReelId)return null;a=this._currentReelId}return this._reels[a]}})},{"../core/core.js":7}],32:[function(a,b,c){var d=a("../core/core.js"),e="attribute vec2 aPosition;\nattribute vec3 aOrientation;\nattribute vec2 aLayer;\nattribute vec2 aTextureCoord;\n\nvarying mediump vec3 vTextureCoord;\n\nuniform vec4 uViewport;\nuniform mediump vec2 uTextureDimensions;\n\nmat4 viewportScale = mat4(2.0 / uViewport.z, 0, 0, 0,    0, -2.0 / uViewport.w, 0,0,    0, 0,1,0,    -1,+1,0,1);\nvec4 viewportTranslation = vec4(uViewport.xy, 0, 0);\n\nvoid main() {\n  vec2 pos = aPosition;\n  vec2 entityOrigin = aOrientation.xy;\n  mat2 entityRotationMatrix = mat2(cos(aOrientation.z), sin(aOrientation.z), -sin(aOrientation.z), cos(aOrientation.z));\n  \n  pos = entityRotationMatrix * (pos - entityOrigin) + entityOrigin ;\n  gl_Position = viewportScale * (viewportTranslation + vec4(pos, 1.0/(1.0+exp(aLayer.x) ), 1) );\n  vTextureCoord = vec3(aTextureCoord, aLayer.y);\n}",f="varying mediump vec3 vTextureCoord;\n  \nuniform sampler2D uSampler;\nuniform mediump vec2 uTextureDimensions;\n\nvoid main(void) {\n  highp vec2 coord =   vTextureCoord.xy / uTextureDimensions;\n  mediump vec4 base_color = texture2D(uSampler, coord);\n  gl_FragColor = vec4(base_color.rgb*base_color.a*vTextureCoord.z, base_color.a*vTextureCoord.z);\n}",g=[{name:"aPosition",width:2},{name:"aOrientation",width:3},{name:"aLayer",width:2},{name:"aTextureCoord",width:2}];d.extend({sprite:function(a,b,c,h,i,j,k){var l,m,n;"string"==typeof a&&(j=i,i=h,h=b,c=a,a=1,b=1),"string"==typeof b&&(j=i,i=h,h=c,c=b,b=a),!j&&i&&(j=i),i=parseInt(i||0,10),j=parseInt(j||0,10);var o=function(){this.ready=!0,this.trigger("Invalidate")};n=d.asset(c),n||(n=new Image,n.src=c,d.asset(c,n),n.onload=function(){for(var a in h)d(a).each(o)});var p=function(){this.requires("2D, Sprite"),this.__trim=[0,0,0,0],this.__image=c,this.__coord=[this.__coord[0],this.__coord[1],this.__coord[2],this.__coord[3]],this.__tile=a,this.__tileh=b,this.__padding=[i,j],this.__padBorder=k,this.sprite(this.__coord[0],this.__coord[1],this.__coord[2],this.__coord[3]),this.img=n,this.img.complete&&this.img.width>0&&(this.ready=!0,this.trigger("Invalidate")),this.w=this.__coord[2],this.h=this.__coord[3],this.has("WebGL")&&(this._establishShader(this.__image,f,e,g),this.program.setTexture(this.webgl.makeTexture(this.__image,this.img,!1)))};for(l in h)h.hasOwnProperty(l)&&(m=h[l],d.c(l,{ready:!1,__coord:[m[0],m[1],m[2]||1,m[3]||1],init:p}));return this}}),d.c("Sprite",{__image:"",__tile:0,__tileh:0,__padding:null,__trim:null,img:null,ready:!1,init:function(){this.__trim=[0,0,0,0],this.bind("Draw",this._drawSprite)},remove:function(){this.unbind("Draw",this._drawSprite)},_drawSprite:function(a){var b=a.co,c=a.pos,d=a.ctx;if("canvas"===a.type)d.drawImage(this.img,b.x,b.y,b.w,b.h,c._x,c._y,c._w,c._h);else if("DOM"===a.type){var e=this._h/b.h,f=this._w/b.w,g=this._element.style,h=g.backgroundColor;"initial"===h&&(h="");var i=h+" url('"+this.__image+"') no-repeat";i!==g.background&&(g.background=i),g.backgroundPosition="-"+b.x*f+"px -"+b.y*e+"px",(1!=e||1!=f)&&(g.backgroundSize=this.img.width*f+"px "+this.img.height*e+"px")}else"webgl"===a.type&&a.program.writeVector("aTextureCoord",b.x,b.y,b.x,b.y+b.h,b.x+b.w,b.y,b.x+b.w,b.y+b.h)},sprite:function(a,b,c,d){return this.__coord=this.__coord||[0,0,0,0],this.__coord[0]=a*(this.__tile+this.__padding[0])+(this.__padBorder?this.__padding[0]:0)+this.__trim[0],this.__coord[1]=b*(this.__tileh+this.__padding[1])+(this.__padBorder?this.__padding[1]:0)+this.__trim[1],"undefined"!=typeof c&&"undefined"!=typeof d&&(this.__coord[2]=this.__trim[2]||c*this.__tile||this.__tile,this.__coord[3]=this.__trim[3]||d*this.__tileh||this.__tileh),this.trigger("Invalidate"),this},crop:function(a,b,c,d){var e=this._mbr||this.pos();return this.__trim=[],this.__trim[0]=a,this.__trim[1]=b,this.__trim[2]=c,this.__trim[3]=d,this.__coord[0]+=a,this.__coord[1]+=b,this.__coord[2]=c,this.__coord[3]=d,this._w=c,this._h=d,this.trigger("Invalidate",e),this}})},{"../core/core.js":7}],33:[function(a,b,c){var d=a("../core/core.js");d.c("Text",{_text:"",defaultSize:"10px",defaultFamily:"sans-serif",defaultVariant:"normal",defaultLineHeight:"normal",ready:!0,init:function(){this.requires("2D"),this._textFont={type:"",weight:"",size:this.defaultSize,lineHeight:this.defaultLineHeight,family:this.defaultFamily,variant:this.defaultVariant},this.bind("Draw",function(a){var b=this._fontString();if("DOM"===a.type){var c=this._element,d=c.style;d.color=this._textColor,d.font=b,c.innerHTML=this._text}else if("canvas"===a.type){var e=a.ctx;e.save(),e.textBaseline="top",e.fillStyle=this._textColor||"rgb(0,0,0)",e.font=b,e.fillText(this._text,a.pos._x,a.pos._y),e.restore()}})},_getFontHeight:function(){var a=/([a-zA-Z]+)\b/,b={px:1,pt:4/3,pc:16,cm:96/2.54,mm:96/25.4,"in":96,em:void 0,ex:void 0};return function(c){var d=parseFloat(c),e=a.exec(c),f=e?e[1]:"px";return void 0!==b[f]?Math.ceil(d*b[f]):Math.ceil(d)}}(),text:function(a){return"undefined"==typeof a||null===a?this._text:("function"==typeof a?this._text=a.call(this):this._text=a,this.has("Canvas")&&this._resizeForCanvas(),this.trigger("Invalidate"),this)},_resizeForCanvas:function(){var a=this._drawContext;a.font=this._fontString(),this.w=a.measureText(this._text).width;var b=this._textFont.size||this.defaultSize;this.h=1.1*this._getFontHeight(b)},_fontString:function(){return this._textFont.type+" "+this._textFont.variant+" "+this._textFont.weight+" "+this._textFont.size+" / "+this._textFont.lineHeight+" "+this._textFont.family},textColor:function(a){return d.assignColor(a,this),this._textColor="rgba("+this._red+", "+this._green+", "+this._blue+", "+this._strength+")",this.trigger("Invalidate"),this},textFont:function(a,b){if(1===arguments.length){if("string"==typeof a)return this._textFont[a];if("object"==typeof a)for(var c in a)"family"==c?this._textFont[c]="'"+a[c]+"'":this._textFont[c]=a[c]}else this._textFont[a]=b;return this.has("Canvas")&&this._resizeForCanvas(),this.trigger("Invalidate"),this},unselectable:function(){return this.has("DOM")&&(this.css({"-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",cursor:"default"}),this.trigger("Invalidate")),this}})},{"../core/core.js":7}],34:[function(a,b,c){var d=a("../core/core.js"),e=window.document;d.extend({viewport:{clampToEntities:!0,_width:0,_height:0,_x:0,_y:0,_scale:1,bounds:null,scroll:function(a,b){this[a]=b,d.trigger("ViewportScroll"),d.trigger("InvalidateViewport")},rect_object:{_x:0,_y:0,_w:0,_h:0},rect:function(){return this.rect_object._x=-this._x,this.rect_object._y=-this._y,this.rect_object._w=this._width/this._scale,this.rect_object._h=this._height/this._scale,this.rect_object},pan:function(){function a(a){h.tick(a.dt);var i=h.value();d.viewport.x=(1-i)*f+i*c,d.viewport.y=(1-i)*g+i*e,d.viewport._clamp(),h.complete&&(b(),d.trigger("CameraAnimationDone"))}function b(){d.unbind("EnterFrame",a)}var c,e,f,g,h;return d._preBind("StopCamera",b),function(b,i,j,k){d.trigger("StopCamera"),"reset"!=b&&(f=d.viewport._x,g=d.viewport._y,c=f-b,e=g-i,h=new d.easing(j,k),d.uniqueBind("EnterFrame",a))}}(),follow:function(){function a(){var a=d.viewport._scale;d.viewport.scroll("_x",-(this.x+this.w/2-d.viewport.width/2/a-e*a)),d.viewport.scroll("_y",-(this.y+this.h/2-d.viewport.height/2/a-f*a)),d.viewport._clamp()}function b(){c&&(c.unbind("Move",a),c.unbind("ViewportScale",a),c.unbind("ViewportResize",a))}var c,e,f;return d._preBind("StopCamera",b),function(b,g,h){b&&b.has("2D")&&(d.trigger("StopCamera"),c=b,e="undefined"!=typeof g?g:0,f="undefined"!=typeof h?h:0,b.bind("Move",a),b.bind("ViewportScale",a),b.bind("ViewportResize",a),a.call(b))}}(),centerOn:function(a,b){var c=a.x+d.viewport.x,e=a.y+d.viewport.y,f=a.w/2,g=a.h/2,h=d.viewport.width/2/d.viewport._scale,i=d.viewport.height/2/d.viewport._scale,j=c+f-h,k=e+g-i;d.viewport.pan(j,k,b)},zoom:function(){function a(){d.unbind("EnterFrame",b)}function b(b){var e,l;k.tick(b.dt),e=Math.pow(f,k.value()),l=1===f?k.value():(1/e-1)/(1/f-1),d.viewport.scale(e*c),d.viewport.scroll("_x",g*(1-l)+h*l),d.viewport.scroll("_y",i*(1-l)+j*l),d.viewport._clamp(),k.complete&&(a(),d.trigger("CameraAnimationDone"))}d._preBind("StopCamera",a);var c,e,f,g,h,i,j,k;return function(a,l,m,n,o){return a?(arguments.length<=2&&(n=l,l=d.viewport.x-d.viewport.width,m=d.viewport.y-d.viewport.height),d.trigger("StopCamera"),c=d.viewport._scale,f=a,e=c*f,g=d.viewport.x,i=d.viewport.y,h=-(l-d.viewport.width/(2*e)),j=-(m-d.viewport.height/(2*e)),k=new d.easing(n,o),void d.uniqueBind("EnterFrame",b)):void d.viewport.scale(1)}}(),scale:function(){return function(a){this._scale=a?a:1,d.trigger("InvalidateViewport"),d.trigger("ViewportScale")}}(),mouselook:function(){var a=!1,b=!1,c={};return old={},function(e,f){if("boolean"==typeof e)return a=e,void(a?d.mouseObjs++:d.mouseObjs=Math.max(0,d.mouseObjs-1));if(a)switch(e){case"move":case"drag":if(!b)return;diff={x:f.clientX-c.x,y:f.clientY-c.y},c.x=f.clientX,c.y=f.clientY,d.viewport.x+=diff.x,d.viewport.y+=diff.y,d.viewport._clamp();break;case"start":d.trigger("StopCamera"),c.x=f.clientX,c.y=f.clientY,b=!0;break;case"stop":b=!1}}}(),_clamp:function(){if(this.clampToEntities){var a=d.clone(this.bounds)||d.map.boundaries();a.max.x*=this._scale,a.min.x*=this._scale,a.max.y*=this._scale,a.min.y*=this._scale,a.max.x-a.min.x>d.viewport.width?d.viewport.x<(-a.max.x+d.viewport.width)/this._scale?d.viewport.x=(-a.max.x+d.viewport.width)/this._scale:d.viewport.x>-a.min.x&&(d.viewport.x=-a.min.x):d.viewport.x=-1*(a.min.x+(a.max.x-a.min.x)/2-d.viewport.width/2),a.max.y-a.min.y>d.viewport.height?d.viewport.y<(-a.max.y+d.viewport.height)/this._scale?d.viewport.y=(-a.max.y+d.viewport.height)/this._scale:d.viewport.y>-a.min.y&&(d.viewport.y=-a.min.y):d.viewport.y=-1*(a.min.y+(a.max.y-a.min.y)/2-d.viewport.height/2)}},init:function(a,b,c){this._defineViewportProperties(),this._x=0,this._y=0,this._scale=1,this.bounds=null,this._width=a||window.innerWidth,this._height=b||window.innerHeight,"undefined"==typeof c&&(c="cr-stage");var f;if("string"==typeof c)f=e.getElementById(c);else{if(!("undefined"!=typeof HTMLElement?c instanceof HTMLElement:c instanceof Element))throw new TypeError("stage_elem must be a string or an HTMLElement");f=c}d.stage={x:0,y:0,fullscreen:!1,elem:f?f:e.createElement("div")},a||b||(e.body.style.overflow="hidden",d.stage.fullscreen=!0),d.addEvent(this,window,"resize",d.viewport.reload),d.addEvent(this,window,"blur",function(){d.settings.get("autoPause")&&(d._paused||d.pause())}),d.addEvent(this,window,"focus",function(){d._paused&&d.settings.get("autoPause")&&d.pause()}),d.settings.register("stageSelectable",function(a){d.stage.elem.onselectstart=a?function(){return!0}:function(){return!1}}),d.settings.modify("stageSelectable",!1),d.settings.register("stageContextMenu",function(a){d.stage.elem.oncontextmenu=a?function(){return!0}:function(){return!1}}),d.settings.modify("stageContextMenu",!1),d.settings.register("autoPause",function(){}),d.settings.modify("autoPause",!1),f||(e.body.appendChild(d.stage.elem),d.stage.elem.id=c);var g,h=d.stage.elem.style;if(h.width=this.width+"px",h.height=this.height+"px",h.overflow="hidden",d.bind("ViewportResize",function(){d.trigger("InvalidateViewport")}),d.mobile){void 0!==typeof h.webkitTapHighlightColor&&(h.webkitTapHighlightColor="rgba(0,0,0,0)");var i=e.createElement("meta"),j=e.getElementsByTagName("head")[0];i=e.createElement("meta"),i.setAttribute("name","apple-mobile-web-app-capable"),i.setAttribute("content","yes"),j.appendChild(i),d.addEvent(this,d.stage.elem,"touchmove",function(a){a.preventDefault()})}h.position="relative",g=d.domHelper.innerPosition(d.stage.elem),d.stage.x=g.x,d.stage.y=g.y,d.uniqueBind("ViewportResize",this._resize)},_resize:function(){d.stage.elem.style.width=d.viewport.width+"px",d.stage.elem.style.height=d.viewport.height+"px"},_defineViewportProperties:function(){Object.defineProperty(this,"x",{set:function(a){this.scroll("_x",a)},get:function(){return this._x},configurable:!0}),Object.defineProperty(this,"y",{set:function(a){this.scroll("_y",a)},get:function(){return this._y},configurable:!0}),Object.defineProperty(this,"width",{set:function(a){this._width=a,d.trigger("ViewportResize")},get:function(){return this._width},configurable:!0}),Object.defineProperty(this,"height",{set:function(a){this._height=a,d.trigger("ViewportResize")},get:function(){return this._height},configurable:!0})},reload:function(){var a,b=window.innerWidth,c=window.innerHeight;d.stage.fullscreen&&(this._width=b,this._height=c,d.trigger("ViewportResize")),a=d.domHelper.innerPosition(d.stage.elem),d.stage.x=a.x,d.stage.y=a.y},reset:function(){d.viewport.mouselook("stop"),d.trigger("StopCamera"),d.viewport.scroll("_x",0),d.viewport.scroll("_y",0),d.viewport.scale(1)},onScreen:function(a){return d.viewport._x+a._x+a._w>0&&d.viewport._y+a._y+a._h>0&&d.viewport._x+a._x<d.viewport.width&&d.viewport._y+a._y<d.viewport.height}}})},{"../core/core.js":7}],35:[function(a,b,c){var d=a("../core/core.js"),e=window.document;RenderProgramWrapper=function(a,b){this.shader=b,this.context=a,this.array_size=16,this.max_size=1024,this._indexArray=new Uint16Array(6*this.array_size),this._indexBuffer=a.createBuffer()},RenderProgramWrapper.prototype={initAttributes:function(a){this.attributes=a,this._attribute_table={};for(var b=0,c=0;c<a.length;c++){var d=a[c];this._attribute_table[d.name]=d,d.bytes=d.bytes||Float32Array.BYTES_PER_ELEMENT,d.type=d.type||this.context.FLOAT,d.offset=b,d.location=this.context.getAttribLocation(this.shader,d.name),this.context.enableVertexAttribArray(d.location),b+=d.width}this.stride=b,this._attributeArray=new Float32Array(4*this.array_size*this.stride),this._attributeBuffer=this.context.createBuffer(),this._registryHoles=[],this._registrySize=0},growArrays:function(a){if(!(this.array_size>=this.max_size)){var b=Math.min(a,this.max_size),c=new Float32Array(4*b*this.stride),d=new Uint16Array(6*b);c.set(this._attributeArray),d.set(this._indexArray),this._attributeArray=c,this._indexArray=d,this.array_size=b}},registerEntity:function(a){if(0===this._registryHoles.length){if(this._registrySize>=this.max_size)throw"Number of entities exceeds maximum limit.";this._registrySize>=this.array_size&&this.growArrays(2*this.array_size),a._glBufferIndex=this._registrySize,this._registrySize++}else a._glBufferIndex=this._registryHoles.pop()},unregisterEntity:function(a){"number"==typeof a._glBufferIndex&&this._registryHoles.push(a._glBufferIndex),a._glBufferIndex=null},resetRegistry:function(){this._maxElement=0,this._registryHoles.length=0},setCurrentEntity:function(a){this.ent_offset=4*a._glBufferIndex,this.ent=a},switchTo:function(){var a=this.context;a.useProgram(this.shader),a.bindBuffer(a.ARRAY_BUFFER,this._attributeBuffer);for(var b,c=this.attributes,e=0;e<c.length;e++)b=c[e],a.vertexAttribPointer(b.location,b.width,b.type,!1,this.stride*b.bytes,b.offset*b.bytes);var f=this.texture_obj;f&&null===f.unit&&d.webgl.texture_manager.bindTexture(f),this.index_pointer=0},setTexture:function(a){void 0===this.texture_obj&&(a.setToProgram(this.shader,"uSampler","uTextureDimensions"),this.texture_obj=a)},addIndices:function(a){var b=this._indexArray,c=this.index_pointer;b[0+c]=0+a,b[1+c]=1+a,b[2+c]=2+a,b[3+c]=1+a,b[4+c]=2+a,b[5+c]=3+a,this.index_pointer+=6},renderBatch:function(){var a=this.context;a.bindBuffer(a.ARRAY_BUFFER,this._attributeBuffer),a.bufferData(a.ARRAY_BUFFER,this._attributeArray,a.STATIC_DRAW),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this._indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,this._indexArray,a.STATIC_DRAW),a.drawElements(a.TRIANGLES,this.index_pointer,a.UNSIGNED_SHORT,0)},setViewportUniforms:function(a){var b=this.context;b.useProgram(this.shader),b.uniform4f(this.shader.viewport,a._x,a._y,a._width/a._scale,a._height/a._scale)},writeVector:function(a,b,c){for(var d=this._attribute_table[a],e=this.stride,f=d.offset+this.ent_offset*e,g=d.width,h=arguments.length-1,i=this._attributeArray,j=0;4>j;j++)for(var k=0;g>k;k++)i[f+e*j+k]=arguments[(g*j+k)%h+1]}},d.c("WebGL",{init:function(){d.webgl.context||d.webgl.init();var a=this.webgl=d.webgl;a.context;this._changed=!0,this.bind("Change",this._glChange)},remove:function(){this._changed=!0,this.unbind(this._glChange),this.program&&this.program.unregisterEntity(this)},_glChange:function(){this._changed===!1&&(this._changed=!0)},drawVars:{type:"webgl",pos:{},ctx:null,coord:[0,0,0,0],co:{x:0,y:0,w:0,h:0}},draw:function(a,b,c,d,e){if(this.ready){4===arguments.length&&(e=d,d=c,c=b,b=a,a=this.webgl.context);var f=this.drawVars.pos;f._x=this._x+(b||0),f._y=this._y+(c||0),f._w=d||this._w,f._h=e||this._h;var g=this.__coord||[0,0,0,0],h=this.drawVars.co;h.x=g[0]+(b||0),h.y=g[1]+(c||0),h.w=d||g[2],h.h=e||g[3],this._flipX&&(h.x=h.x+h.w,h.w=-h.w),this._flipY&&(h.y=h.y+h.h,h.h=-h.h);var i=this.webgl.context;this.drawVars.gl=i;var j=this.drawVars.program=this.program;return j.setCurrentEntity(this),j.writeVector("aPosition",this._x,this._y,this._x,this._y+this._h,this._x+this._w,this._y,this._x+this._w,this._y+this._h),j.writeVector("aOrientation",this._origin.x+this._x,this._origin.y+this._y,this._rotation*Math.PI/180),j.writeVector("aLayer",this._globalZ,this._alpha),this.trigger("Draw",this.drawVars),j.addIndices(j.ent_offset),this}},_establishShader:function(a,b,c,d){this.program=this.webgl.getProgramWrapper(a,b,c,d),this.program.registerEntity(this),this.ready=!0}}),d.extend({webgl:{context:null,changed_objects:[],_compileShader:function(a,b){var c=this.context,d=c.createShader(b);if(c.shaderSource(d,a),c.compileShader(d),!c.getShaderParameter(d,c.COMPILE_STATUS))throw c.getShaderInfoLog(d);return d},_makeProgram:function(a,b){var c=this.context,d=this._compileShader(a,c.FRAGMENT_SHADER),e=this._compileShader(b,c.VERTEX_SHADER),f=c.createProgram();if(c.attachShader(f,e),c.attachShader(f,d),c.linkProgram(f),!c.getProgramParameter(f,c.LINK_STATUS))throw"Could not initialise shaders";return f.viewport=c.getUniformLocation(f,"uViewport"),f},programs:{},getProgramWrapper:function(a,b,c,e){if(void 0===this.programs[a]){var f=this._makeProgram(b,c),g=new RenderProgramWrapper(this.context,f);g.name=a,g.initAttributes(e),g.setViewportUniforms(d.viewport),this.programs[a]=g}return this.programs[a]},makeTexture:function(a,b,c){var d=this;return d.texture_manager.makeTexture(a,b,c)},init:function(){if(!d.support.webgl)return d.trigger("NoWebGL"),void d.stop();this.changed_objects=[];var a;a=e.createElement("canvas"),a.width=d.viewport.width,a.height=d.viewport.height,a.style.position="absolute",a.style.left="0px",a.style.top="0px",d.stage.elem.appendChild(a);var b;try{b=a.getContext("webgl",{premultipliedalpha:!0})||a.getContext("experimental-webgl",{premultipliedalpha:!0}),b.viewportWidth=a.width,b.viewportHeight=a.height}catch(c){return d.trigger("NoWebGL"),void d.stop()}this.context=b,this._canvas=a,b.clearColor(0,0,0,0),b.disable(b.DEPTH_TEST),b.blendFunc(b.ONE,b.ONE_MINUS_SRC_ALPHA),b.enable(b.BLEND);var f=this;d.uniqueBind("RenderScene",f.render),d.uniqueBind("ViewportResize",f._resize),d.uniqueBind("InvalidateViewport",function(){f.dirtyViewport=!0}),d.uniqueBind("PixelartSet",f._setPixelart),f._setPixelart(d._pixelartEnabled),this.dirtyViewport=!0,this.texture_manager=new d.TextureManager(b,this)},_resize:function(){var a=d.webgl._canvas;a.width=d.viewport.width,a.height=d.viewport.height;var b=d.webgl.context;b.viewportWidth=a.width,b.viewportHeight=a.height},_setPixelart:function(a){var b=d.webgl.context;a?d.webgl.texture_filter=b.NEAREST:d.webgl.texture_filter=b.LINEAR},zsort:function(a,b){return a._globalZ-b._globalZ},visible_gl:[],render:function(a){a=a||d.viewport.rect();var b=d.webgl,c=b.context;c.viewport(0,0,c.viewportWidth,c.viewportHeight),c.clear(c.COLOR_BUFFER_BIT|c.DEPTH_BUFFER_BIT);var e=b.programs;if(b.dirtyViewport){for(var f in e)e[f].setViewportUniforms(d.viewport);b.dirtyViewport=!1}var g,h=d.map.search(a),i=0,j=h.length,k=b.visible_gl;for(k.length=0,i=0;j>i;i++)g=h[i],g._visible&&g.__c.WebGL&&g.program&&k.push(g);k.sort(b.zsort),j=k.length;var l=null;for(i=0;j>i;i++)g=k[i],l!==g.program&&(null!==l&&l.renderBatch(),l=g.program,l.index_pointer=0,l.switchTo()),g.draw(),g._changed=!1;null!==l&&l.renderBatch()}}})},{"../core/core.js":7}],36:[function(a,b,c){var d=a("../core/core.js");d.extend({diamondIso:{_tile:{width:0,height:0},getTileDimensions:function(){return{w:this._tile.width,h:this._tile.height}},_map:{width:0,height:0},_origin:{x:0,y:0},_tiles:[],getTile:function(a,b,c){return this._tiles[a][b][c]},init:function(a,b,c,d,e,f){this._tile.width=parseInt(a,10),this._tile.height=parseInt(b,10)||parseInt(a,10)/2,this._tile.r=this._tile.width/this._tile.height,this._map.width=parseInt(c,10),this._map.height=parseInt(d,10)||parseInt(c,10);for(var g=0;c>g;g++){this._tiles[g]=Array();for(var h=0;d>h;h++)this._tiles[g][h]=Array()}return this.x=parseInt(e,10)||0,this.y=parseInt(f,10)||0,this.layerZLevel=c+d+1,this},place:function(a,b,c,d){var e=this.pos2px(b,c),f=(a.tileHeight,a.h/this._tile.height);a.x=e.x,a.y=e.y-(f-2)*this._tile.height-this._tile.height*d,
a.z=this.getZAtLoc(b,c,d);for(var g=0;f-2>=g;g++){var h=this._tiles[b][c][d+g];h&&h!==a&&h.destroy(),this._tiles[b][c][d+g]=a}return this},detachTile:function(a){for(var b=0;b<this._map.width;b++)for(var c=0;c<this._map.height;c++)for(var d=this._tiles[b][c].length,e=0;d>e;e++)if(this._tiles[b][c][e]&&a===this._tiles[b][c][e]){tHeight=a.h/this._tile.height;for(var f=0;f<tHeight;f++)this._tiles[b][c][e+f]=void 0;return{x:b,y:c,z:e}}return!1},centerAt:function(a,b){var c=this.pos2px(a,b);d.viewport.x=-c.x+d.viewport.width/2-this._tile.width,d.viewport.y=-c.y+d.viewport.height/2},getZAtLoc:function(a,b,c){return this.layerZLevel*c+a+b},pos2px:function(a,b){return{x:this.x+(a-b-1)*this._tile.width/2,y:this.y+(a+b)*this._tile.height/2}},px2pos:function(a,b){var c=(b-this.y)/this._tile.height,d=(a-this.x)/this._tile.width,e=c+d,f=c-d;return inX=e>0&&e<this._map.width,inY=f>0&&f<this._map.height,inX&&inY?{x:~~e,y:~~f}:void 0},getOverlappingTiles:function(a,b){var c=this.px2pos(a,b),d=[],e=~~c.x,f=~~c.y,g=this._map.width-e,h=this._map.height-f,i=Math.min(g,h),j=this._tiles[e][f][1];j&&d.push(j);for(var k=1;i>k;k++){var l=this._tiles[e+k][f+k][k];l&&d.push(l)}return d},polygon:function(a){a.requires("Collision");var b=0,c=0,e=[b-0,a.h-c-this._tile.height/2,b-this._tile.width/2,a.h-c-0,b-this._tile.width,a.h-c-this._tile.height/2,b-this._tile.width/2,a.h-c-this._tile.height],f=new d.polygon(e);return f}}})},{"../core/core.js":7}],37:[function(a,b,c){var d=a("../core/core.js");d.extend({isometric:{_tile:{width:0,height:0},_elements:{},_pos:{x:0,y:0},_z:0,size:function(a,b){return this._tile.width=a,this._tile.height=b>0?b:a/2,this},place:function(a,b,c,e){var f=this.pos2px(a,b);return f.top-=c*(this._tile.height/2),e.attr({x:f.left+d.viewport._x,y:f.top+d.viewport._y}).z+=c,this},pos2px:function(a,b){return{left:a*this._tile.width+(1&b)*(this._tile.width/2),top:b*this._tile.height/2}},px2pos:function(a,b){return{x:-Math.ceil(-a/this._tile.width-.5*(1&b)),y:b/this._tile.height*2}},centerAt:function(a,b){if("number"==typeof a&&"number"==typeof b){var c=this.pos2px(a,b);return d.viewport._x=-c.left+d.viewport.width/2-this._tile.width/2,d.viewport._y=-c.top+d.viewport.height/2-this._tile.height/2,this}return{top:-d.viewport._y+d.viewport.height/2-this._tile.height/2,left:-d.viewport._x+d.viewport.width/2-this._tile.width/2}},area:function(){var a=this.centerAt(),b=this.px2pos(-a.left+d.viewport.width/2,-a.top+d.viewport.height/2),c=this.px2pos(-a.left-d.viewport.width/2,-a.top-d.viewport.height/2);return{x:{start:b.x,end:c.x},y:{start:b.y,end:c.y}}}}})},{"../core/core.js":7}],38:[function(a,b,d){var e=a("../core/core.js"),f=window.document;e.extend({audio:{sounds:{},supported:null,codecs:{ogg:'audio/ogg; codecs="vorbis"',wav:'audio/wav; codecs="1"',webma:'audio/webm; codecs="vorbis"',mp3:'audio/mpeg; codecs="mp3"',m4a:'audio/mp4; codecs="mp4a.40.2"'},volume:1,muted:!1,paused:!1,playCheck:null,_canPlay:function(){if(this.supported={},e.support.audio){var a,b=this.audioElement();for(var c in this.codecs)a=b.canPlayType(this.codecs[c]),""!==a&&"no"!==a?this.supported[c]=!0:this.supported[c]=!1}},supports:function(a){return null===this.supported&&this._canPlay(),this.supported[a]?!0:!1},audioElement:function(){return"undefined"!=typeof Audio?new Audio(""):f.createElement("audio")},create:function(a,b){var c=b.substr(b.lastIndexOf(".")+1).toLowerCase();if(!this.supports(c))return!1;var d=this.audioElement();return d.id=a,d.preload="auto",d.volume=e.audio.volume,d.src=b,e.asset(b,d),this.sounds[a]={obj:d,played:0,volume:e.audio.volume},this.sounds[a]},add:function(a,b){if(e.support.audio){var c,d;if(1===arguments.length&&"object"==typeof a)for(var f in a)for(c in a[f])if(d=e.audio.create(f,a[f][c]))break;if("string"==typeof a&&("string"==typeof b&&(d=e.audio.create(a,b)),"object"==typeof b))for(c in b)if(d=e.audio.create(a,b[c]))break;return d}},play:function(a,b,c){if(0!==b&&e.support.audio&&this.sounds[a]){var d=this.sounds[a],f=this.getOpenChannel();if(!f)return null;f.id=a,f.repeat=b;var g=f.obj;return f.volume=d.volume=d.obj.volume=c||e.audio.volume,g.volume=d.volume,g.src=d.obj.src,this.muted&&(g.volume=0),g.play(),d.played++,f.onEnd=function(){d.played<f.repeat||-1==b?(this.currentTime&&(this.currentTime=0),this.play(),d.played++):(f.active=!1,this.pause(),this.removeEventListener("ended",f.onEnd,!0),this.currentTime=0,e.trigger("SoundComplete",{id:f.id}))},g.addEventListener("ended",f.onEnd,!0),g}},maxChannels:7,setChannels:function(a){this.maxChannels=a,a<this.channels.length&&(this.channels.length=a)},channels:[],getOpenChannel:function(){for(var a=0;a<this.channels.length;a++){var b=this.channels[a];if(b.active===!1||b.obj.ended&&b.repeat<=this.sounds[b.id].played)return b.active=!0,b}if(a<this.maxChannels){var c={obj:this.audioElement(),active:!0,_is:function(a){return this.id===a&&this.active}};return this.channels.push(c),c}return null},remove:function(a){if(e.support.audio){var b,c,d=e.paths().audio;if(a)this.sounds[a]&&(b=this.sounds[a],c=b.obj.src.split("/").pop(),e.audio.stop(a),delete e.assets[d+c],delete e.assets[b.obj.src],delete e.audio.sounds[a]);else for(var f in this.sounds)b=this.sounds[f],c=b.obj.src.split("/").pop(),e.audio.stop(a),delete e.assets[d+c],delete e.assets[b.obj.src],delete e.audio.sounds[a]}},stop:function(a){if(e.support.audio)for(var b in this.channels)c=this.channels[b],(!a&&c.active||c._is(a))&&(c.active=!1,c.obj.pause())},_mute:function(a){if(e.support.audio){var b;for(var c in this.channels)b=this.channels[c],b.obj.volume=a?0:b.volume;this.muted=a}},toggleMute:function(){this.muted?this._mute(!1):this._mute(!0)},mute:function(){this._mute(!0)},unmute:function(){this._mute(!1)},pause:function(a){if(e.support.audio&&a&&this.sounds[a]){var b;for(var c in this.channels)b=this.channels[c],b._is(a)&&!b.obj.paused&&b.obj.pause()}},unpause:function(a){if(e.support.audio&&a&&this.sounds[a]){var b;for(var c in this.channels)b=this.channels[c],b._is(a)&&b.obj.paused&&b.obj.play()}},togglePause:function(a){if(e.support.audio&&a&&this.sounds[a]){var b;for(var c in this.channels)b=this.channels[c],b._is(a)&&(b.obj.paused?b.obj.play():b.obj.pause())}},isPlaying:function(a){if(!e.support.audio)return!1;for(var b in this.channels)if(this.channels[b]._is(a))return!0;return!1}}})},{"../core/core.js":7}],39:[function(a,b,c){var d=a("../core/core.js"),e=a("./spatial-grid.js");d.map=new e;var f=Math,g=(f.cos,f.sin,f.PI),h=g/180;d.c("2D",{_x:0,_y:0,_w:0,_h:0,_z:0,_rotation:0,_alpha:1,_visible:!0,_globalZ:null,_origin:null,_mbr:null,_entry:null,_children:null,_parent:null,_changed:!1,_2D_property_definitions:{x:{set:function(a){this._attr("_x",a)},get:function(){return this._x},configurable:!0,enumerable:!0},_x:{enumerable:!1},y:{set:function(a){this._attr("_y",a)},get:function(){return this._y},configurable:!0,enumerable:!0},_y:{enumerable:!1},w:{set:function(a){this._attr("_w",a)},get:function(){return this._w},configurable:!0,enumerable:!0},_w:{enumerable:!1},h:{set:function(a){this._attr("_h",a)},get:function(){return this._h},configurable:!0,enumerable:!0},_h:{enumerable:!1},z:{set:function(a){this._attr("_z",a)},get:function(){return this._z},configurable:!0,enumerable:!0},_z:{enumerable:!1},rotation:{set:function(a){this._attr("_rotation",a)},get:function(){return this._rotation},configurable:!0,enumerable:!0},_rotation:{enumerable:!1},alpha:{set:function(a){this._attr("_alpha",a)},get:function(){return this._alpha},configurable:!0,enumerable:!0},_alpha:{enumerable:!1},visible:{set:function(a){this._attr("_visible",a)},get:function(){return this._visible},configurable:!0,enumerable:!0},_visible:{enumerable:!1}},_define2DProperties:function(){for(var a in this._2D_property_definitions)Object.defineProperty(this,a,this._2D_property_definitions[a])},init:function(){this._globalZ=this[0],this._origin={x:0,y:0},this._bx1=0,this._bx2=0,this._by1=0,this._by2=0,this._children=[],this._define2DProperties(),this._entry=d.map.insert(this),this.bind("Move",function(a){var b=this._cbr||this._mbr||this;this._entry.update(b),this._children.length>0&&this._cascade(a)}),this.bind("Rotate",function(a){var b=this._cbr||this._mbr||this;this._entry.update(b),this._children.length>0&&this._cascade(a)}),this.bind("Remove",function(){if(this._children){for(var a=0;a<this._children.length;a++)delete this._children[a]._parent,this._children[a].destroy&&this._children[a].destroy();this._children=[]}this._parent&&this._parent.detach(this),d.map.remove(this),this.detach()})},offsetBoundary:function(a,b,c,d){return 1===arguments.length&&(b=c=d=a),this._bx1=a,this._bx2=c,this._by1=b,this._by2=d,this.trigger("BoundaryOffset"),this._calculateMBR(),this},_calculateMBR:function(){var a=this._origin.x+this._x,b=this._origin.y+this._y,c=-this._rotation*h,d=this._x-this._bx1-a,e=this._x+this._w+this._bx2-a,f=this._y-this._by1-b,g=this._y+this._h+this._by2-b,i=Math.cos(c),j=Math.sin(c);i=1e-10>i&&i>-1e-10?0:i,j=1e-10>j&&j>-1e-10?0:j;var k=d*i+f*j,l=-d*j+f*i,m=e*i+f*j,n=-e*j+f*i,o=e*i+g*j,p=-e*j+g*i,q=d*i+g*j,r=-d*j+g*i,s=Math.floor(Math.min(k,m,o,q)+a),t=Math.floor(Math.min(l,n,p,r)+b),u=Math.ceil(Math.max(k,m,o,q)+a),v=Math.ceil(Math.max(l,n,p,r)+b);if(this._mbr?(this._mbr._x=s,this._mbr._y=t,this._mbr._w=u-s,this._mbr._h=v-t):this._mbr={_x:s,_y:t,_w:u-s,_h:v-t},this._cbr){var w=this._cbr,x=w.cx,y=w.cy,z=w.r,A=a+(x+this._x-a)*i+(y+this._y-b)*j,B=b-(x+this._x-a)*j+(y+this._y-b)*i;w._x=Math.min(A-z,s),w._y=Math.min(B-z,t),w._w=Math.max(A+z,u)-w._x,w._h=Math.max(B+z,v)-w._y}},_rotate:function(a){var b=this._rotation-a;if(0!==b){this._rotation=a;var c={x:this._origin.x+this._x,y:this._origin.y+this._y};this._calculateMBR();var d=b*h,e=Math.cos(d),f=Math.sin(d);this.trigger("Rotate",{cos:e>-1e-10&&1e-10>e?0:e,sin:f>-1e-10&&1e-10>f?0:f,deg:b,rad:d,o:c})}},area:function(){return this._w*this._h},intersect:function(a,b,c,d){var e,f=this._mbr||this;return e="object"==typeof a?a:{_x:a,_y:b,_w:c,_h:d},f._x<e._x+e._w&&f._x+f._w>e._x&&f._y<e._y+e._h&&f._y+f._h>e._y},within:function(a,b,c,d){var e,f=this._mbr||this;return e="object"==typeof a?a:{_x:a,_y:b,_w:c,_h:d},e._x<=f._x&&e._x+e._w>=f._x+f._w&&e._y<=f._y&&e._y+e._h>=f._y+f._h},contains:function(a,b,c,d){var e,f=this._mbr||this;return e="object"==typeof a?a:{_x:a,_y:b,_w:c,_h:d},e._x>=f._x&&e._x+e._w<=f._x+f._w&&e._y>=f._y&&e._y+e._h<=f._y+f._h},pos:function(a){return a=a||{},a._x=this._x,a._y=this._y,a._w=this._w,a._h=this._h,a},mbr:function(a){return a=a||{},this._mbr?(a._x=this._mbr._x,a._y=this._mbr._y,a._w=this._mbr._w,a._h=this._mbr._h,a):this.pos(a)},isAt:function(a,b){if(this.mapArea)return this.mapArea.containsPoint(a,b);if(this.map)return this.map.containsPoint(a,b);var c=this._mbr||this;return c._x<=a&&c._x+c._w>=a&&c._y<=b&&c._y+c._h>=b},move:function(a,b){return"n"===a.charAt(0)&&(this.y-=b),"s"===a.charAt(0)&&(this.y+=b),("e"===a||"e"===a.charAt(1))&&(this.x+=b),("w"===a||"w"===a.charAt(1))&&(this.x-=b),this},shift:function(a,b,c,d){return a&&(this.x+=a),b&&(this.y+=b),c&&(this.w+=c),d&&(this.h+=d),this},_cascade:function(a){if(a){var b,c=0,d=this._children,e=d.length;if("cos"in a||"sin"in a)for(;e>c;++c)b=d[c],"rotate"in b&&b.rotate(a);else for(var f=this._x-a._x,g=this._y-a._y,h=this._w-a._w,i=this._h-a._h;e>c;++c)b=d[c],b.shift(f,g,h,i)}},attach:function(){for(var a,b=0,c=arguments,d=arguments.length;d>b;++b)a=c[b],a._parent&&a._parent.detach(a),a._parent=this,this._children.push(a);return this},detach:function(a){var b;if(!a){for(b=0;b<this._children.length;b++)this._children[b]._parent=null;return this._children=[],this}for(b=0;b<this._children.length;b++)this._children[b]==a&&this._children.splice(b,1);return a._parent=null,this},origin:function(a,b){if("string"==typeof a)if("centre"===a||"center"===a||-1===a.indexOf(" "))a=this._w/2,b=this._h/2;else{var c=a.split(" ");"top"===c[0]?b=0:"bottom"===c[0]?b=this._h:("middle"===c[0]||"center"===c[1]||"centre"===c[1])&&(b=this._h/2),"center"===c[1]||"centre"===c[1]||"middle"===c[1]?a=this._w/2:"left"===c[1]?a=0:"right"===c[1]&&(a=this._w)}return this._origin.x=a,this._origin.y=b,this},flip:function(a){return a=a||"X",this["_flip"+a]||(this["_flip"+a]=!0,this.trigger("Invalidate")),this},unflip:function(a){return a=a||"X",this["_flip"+a]&&(this["_flip"+a]=!1,this.trigger("Invalidate")),this},rotate:function(a){var b,c;b=(this._x+this._origin.x-a.o.x)*a.cos+(this._y+this._origin.y-a.o.y)*a.sin+(a.o.x-this._origin.x),c=(this._y+this._origin.y-a.o.y)*a.cos-(this._x+this._origin.x-a.o.x)*a.sin+(a.o.y-this._origin.y),this._attr("_rotation",this._rotation-a.deg),this._attr("_x",b),this._attr("_y",c)},_attr:function(a,b){if(this[a]!==b){var c,e=d.rectManager._pool.copy(this);if("_rotation"===a)this._rotate(b);else if("_z"===a){var f=b<<0;b=b==f?f:f+1,this._globalZ=1e5*b+this[0],this[a]=b,this.trigger("Reorder")}else if("_x"===a||"_y"===a)c=this._mbr,c&&(c[a]-=this[a]-b,this._cbr&&(this._cbr[a]-=this[a]-b)),this[a]=b,this.trigger("Move",e);else if("_h"===a||"_w"===a){c=this._mbr;var g=this[a];this[a]=b,c&&this._calculateMBR(),"_w"===a?this.trigger("Resize",{axis:"w",amount:b-g}):"_h"===a&&this.trigger("Resize",{axis:"h",amount:b-g}),this.trigger("Move",e)}this[a]=b,this.trigger("Invalidate"),d.rectManager._pool.recycle(e)}}}),d.c("Supportable",{_ground:null,_groundComp:null,canLand:!0,init:function(){this.requires("2D"),this.__area={_x:0,_y:0,_w:0,_h:0},this.defineField("ground",function(){return this._ground},function(a){})},remove:function(a){this.unbind("EnterFrame",this._detectGroundTick)},startGroundDetection:function(a){return a&&(this._groundComp=a),this.uniqueBind("EnterFrame",this._detectGroundTick),this},stopGroundDetection:function(){return this.unbind("EnterFrame",this._detectGroundTick),this},_detectGroundTick:function(){var a=this._groundComp,b=this._ground,c=d.rectManager.overlap,e=this._cbr||this._mbr||this,f=this.__area;if(f._x=e._x,f._y=e._y+1,f._w=e._w,f._h=e._h,b){var g=b._cbr||b._mbr||b;b.__c[a]&&c(g,f)||(this._ground=null,this.trigger("LiftedOffGround",b),b=null)}if(!b)for(var h,i,j=d.map.search(f,!1),k=0,l=j.length;l>k;++k)if(h=j[k],i=h._cbr||h._mbr||h,h!==this&&h.__c[a]&&c(i,f)&&(this.canLand=!0,this.trigger("CheckLanding",h),this.canLand)){this._ground=b=h,this.y=h._y-this._h,this.trigger("LandedOnGround",b);break}}}),d.c("GroundAttacher",{_groundAttach:function(a){a.attach(this)},_groundDetach:function(a){a.detach(this)},init:function(){this.requires("Supportable"),this.bind("LandedOnGround",this._groundAttach),this.bind("LiftedOffGround",this._groundDetach)},remove:function(a){this.unbind("LandedOnGround",this._groundAttach),this.unbind("LiftedOffGround",this._groundDetach)}}),d.c("Gravity",{_gravityConst:500,init:function(){this.requires("2D, Supportable, Motion"),this.bind("LiftedOffGround",this._startGravity),this.bind("LandedOnGround",this._stopGravity)},remove:function(a){this.unbind("LiftedOffGround",this._startGravity),this.unbind("LandedOnGround",this._stopGravity)},_gravityCheckLanding:function(a){this._dy<0&&(this.canLand=!1)},gravity:function(a){return this.bind("CheckLanding",this._gravityCheckLanding),this.startGroundDetection(a),this._startGravity(),this},antigravity:function(){return this._stopGravity(),this.stopGroundDetection(),this.unbind("CheckLanding",this._gravityCheckLanding),this},gravityConst:function(a){return this._gravityActive&&(this.ay-=this._gravityConst,this.ay+=a),this._gravityConst=a,this},_startGravity:function(){this._gravityActive=!0,this.ay+=this._gravityConst},_stopGravity:function(){this.ay=0,this.vy=0,this._gravityActive=!1}});var i=function(a,b,c,e){var f=b+c,g="_"+f,h={key:"",oldValue:0};e?d.defineField(a,f,function(){return this[g]},function(a){var b=this[g];a!==b&&(this[g]=a,h.key=f,h.oldValue=b,this.trigger("MotionChange",h))}):d.defineField(a,f,function(){return this[g]},function(a){}),Object.defineProperty(a,g,{value:0,writable:!0,enumerable:!1,configurable:!1})},j=function(a,b,c,e){var f=b+"x",g=b+"y",h="_"+f,i="_"+g;return c?(d.defineField(e,"x",function(){return a[h]},function(b){a[f]=b}),d.defineField(e,"y",function(){return a[i]},function(b){a[g]=b})):(d.defineField(e,"x",function(){return a[h]},function(a){}),d.defineField(e,"y",function(){return a[i]},function(a){})),Object.seal&&Object.seal(e),e};d.c("AngularMotion",{_vrotation:0,_arotation:0,_drotation:0,init:function(){this.requires("2D"),i(this,"v","rotation",!0),i(this,"a","rotation",!0),i(this,"d","rotation",!1),this.__oldRotationDirection=0,this.bind("EnterFrame",this._angularMotionTick)},remove:function(a){this.unbind("EnterFrame",this._angularMotionTick)},resetAngularMotion:function(){return this._drotation=0,this.vrotation=0,this.arotation=0,this},_angularMotionTick:function(a){var b=a.dt/1e3,c=this._rotation,d=this._vrotation,e=this._arotation,f=c+d*b+.5*e*b*b;this.vrotation=d+e*b;var g=this._vrotation,h=g?0>g?-1:1:0;this.__oldRotationDirection!==h&&(this.__oldRotationDirection=h,this.trigger("NewRotationDirection",h)),this._drotation=f-c,0!==this._drotation&&(this.rotation=f,this.trigger("Rotated",c))}}),d.c("Motion",{_vx:0,_vy:0,_ax:0,_ay:0,_dx:0,_dy:0,init:function(){this.requires("2D"),i(this,"v","x",!0),i(this,"v","y",!0),this._velocity=j(this,"v",!0,new d.math.Vector2D),i(this,"a","x",!0),i(this,"a","y",!0),this._acceleration=j(this,"a",!0,new d.math.Vector2D),i(this,"d","x",!1),i(this,"d","y",!1),this._motionDelta=j(this,"d",!1,new d.math.Vector2D),this.__movedEvent={axis:"",oldValue:0},this.__oldDirection={x:0,y:0},this.bind("EnterFrame",this._linearMotionTick)},remove:function(a){this.unbind("EnterFrame",this._linearMotionTick)},resetMotion:function(){return this.vx=0,this.vy=0,this.ax=0,this.ay=0,this._dx=0,this._dy=0,this},motionDelta:function(){return this._motionDelta},velocity:function(){return this._velocity},acceleration:function(){return this._acceleration},_linearMotionTick:function(a){var b=a.dt/1e3,c=this._x,d=this._vx,e=this._ax,f=this._y,g=this._vy,h=this._ay,i=c+d*b+.5*e*b*b,j=f+g*b+.5*h*b*b;this.vx=d+e*b,this.vy=g+h*b;var k=this.__oldDirection,l=this._vx,m=l?0>l?-1:1:0,n=this._vy,o=n?0>n?-1:1:0;(k.x!==m||k.y!==o)&&(k.x=m,k.y=o,this.trigger("NewDirection",k));var p=this.__movedEvent;this._dx=i-c,this._dy=j-f,0!==this._dx&&(this.x=i,p.axis="x",p.oldValue=c,this.trigger("Moved",p)),0!==this._dy&&(this.y=j,p.axis="y",p.oldValue=f,this.trigger("Moved",p))}}),d.polygon=function(a){arguments.length>1&&(a=Array.prototype.slice.call(arguments,0)),this.points=a},d.polygon.prototype={containsPoint:function(a,b){var c,d,e=this.points,f=e.length/2,g=!1;for(c=0,d=f-1;f>c;d=c++)e[2*c+1]>b!=e[2*d+1]>b&&a<(e[2*d]-e[2*c])*(b-e[2*c+1])/(e[2*d+1]-e[2*c+1])+e[2*c]&&(g=!g);return g},shift:function(a,b){for(var c=0,d=this.points,e=d.length;e>c;c+=2)d[c]+=a,d[c+1]+=b},clone:function(){return new d.polygon(this.points.slice(0))},rotate:function(a){for(var b,c,d=0,e=this.points,f=e.length;f>d;d+=2)b=a.o.x+(e[d]-a.o.x)*a.cos+(e[d+1]-a.o.y)*a.sin,c=a.o.y-(e[d]-a.o.x)*a.sin+(e[d+1]-a.o.y)*a.cos,e[d]=b,e[d+1]=c}},d.circle=function(a,b,c){this.x=a,this.y=b,this.radius=c,this.points=[];for(var d,e=0;16>e;e+=2)d=e*Math.PI/8,this.points[e]=this.x+Math.sin(d)*c,this.points[e+1]=this.y+Math.cos(d)*c},d.circle.prototype={containsPoint:function(a,b){var c=this.radius,d=(Math.sqrt,this.x-a),e=this.y-b;return c*c>d*d+e*e},shift:function(a,b){this.x+=a,this.y+=b;for(var c=0,d=this.points,e=d.length;e>c;c+=2)d[c]+=a,d[c+1]+=b},rotate:function(){}},d.matrix=function(a){this.mtx=a,this.width=a[0].length,this.height=a.length},d.matrix.prototype={x:function(a){if(this.width==a.height){for(var b=[],c=0;c<this.height;c++){b[c]=[];for(var e=0;e<a.width;e++){for(var f=0,g=0;g<this.width;g++)f+=this.mtx[c][g]*a.mtx[g][e];b[c][e]=f}}return new d.matrix(b)}},e:function(a,b){return 1>a||a>this.mtx.length||1>b||b>this.mtx[0].length?null:this.mtx[a-1][b-1]}}},{"../core/core.js":7,"./spatial-grid.js":43}],40:[function(a,b,c){var d=a("../core/core.js"),e=Math.PI/180;d.c("Collision",{init:function(){this.requires("2D"),this._collisionData={},this.collision()},remove:function(){this._cbr=null,this.unbind("Resize",this._resizeMap),this.unbind("Resize",this._checkBounds)},collision:function(a){if(this.unbind("Resize",this._resizeMap),this.unbind("Resize",this._checkBounds),a){if(arguments.length>1){var b=Array.prototype.slice.call(arguments,0);a=new d.polygon(b)}else a=a.constructor===Array?new d.polygon(a.slice()):a.clone();this._findBounds(a.points)}else a=new d.polygon([0,0,this._w,0,this._w,this._h,0,this._h]),this.bind("Resize",this._resizeMap),this._cbr=null;return this.rotation&&a.rotate({cos:Math.cos(-this.rotation*e),sin:Math.sin(-this.rotation*e),o:{x:this._origin.x,y:this._origin.y}}),this.map=a,this.attach(this.map),this.map.shift(this._x,this._y),this.trigger("NewHitbox",a),this},_findBounds:function(a){for(var b=1/0,c=-(1/0),d=1/0,e=-(1/0),f=a.length,g=0;f>g;g+=2)a[g]<b&&(b=a[g]),a[g]>c&&(c=a[g]),a[g+1]<d&&(d=a[g+1]),a[g+1]>e&&(e=a[g+1]);var h={cx:(b+c)/2,cy:(d+e)/2,r:Math.sqrt((c-b)*(c-b)+(e-d)*(e-d))/2};return b>=0&&d>=0&&(this._checkBounds=function(){null===this._cbr&&this._w<c||this._h<e?(this._cbr=h,this._calculateMBR()):this._cbr&&(this._cbr=null,this._calculateMBR())},this.bind("Resize",this._checkBounds)),b>=0&&d>=0&&c<=this._w&&e<=this._h?(this._cbr=null,!1):(this._cbr=h,this._calculateMBR(),!0)},_resizeMap:function(a){var b,c,d=this.rotation*e,f=this.map.points;"w"===a.axis?(d?(b=a.amount*Math.cos(d),c=a.amount*Math.sin(d)):(b=a.amount,c=0),f[2]+=b,f[3]+=c):(d?(c=a.amount*Math.cos(d),b=-a.amount*Math.sin(d)):(b=0,c=a.amount),f[6]+=b,f[7]+=c),f[4]+=b,f[5]+=c},hit:function(a){var b,c,e,f,g=this._cbr||this._mbr||this,h=d.map.search(g,!1),i=0,j=h.length,k={},l=d.rectManager.overlap,m="map"in this&&"containsPoint"in this.map,n=[];if(!j)return!1;for(;j>i;++i)c=h[i],e=c._cbr||c._mbr||c,c&&(b=c[0],!k[b]&&this[0]!==b&&c.__c[a]&&l(e,g)&&(k[b]=c));for(f in k)if(c=k[f],m&&"map"in c){var o=this._SAT(this.map,c.map);o.obj=c,o.type="SAT",o&&n.push(o)}else n.push({obj:c,type:"MBR"});return n.length?n:!1},onHit:function(a,b,c){var d=!1;return this.bind("EnterFrame",function(){var e=this.hit(a);e?(d=!0,b.call(this,e)):d&&("function"==typeof c&&c.call(this),d=!1)}),this},_createCollisionHandler:function(a,b){return function(){var c=this.hit(a);if(b.occurring===!0){if(c!==!1)return;b.occurring=!1,this.trigger("HitOff",a)}else c!==!1&&(b.occurring=!0,this.trigger("HitOn",c))}},checkHits:function(){var a=arguments,b=0;for(1===a.length&&(a=a[0].split(/\s*,\s*/));b<a.length;++b){var c=a[b],d=this._collisionData[c];void 0===d&&(this._collisionData[c]=d={occurring:!1,handler:null},d.handler=this._createCollisionHandler(c,d),this.bind("EnterFrame",d.handler))}return this},ignoreHits:function(){var a,b=arguments,c=0;if(0===b.length){for(a in this._collisionData)this.unbind("EnterFrame",a.handler);this._collisionData={}}for(1===b.length&&(b=b[0].split(/\s*,\s*/));c<b.length;++c){var d=b[c];a=this._collisionData[d],void 0!==a&&(this.unbind("EnterFrame",a.handler),delete this._collisionData[d])}return this},resetHitChecks:function(){var a,b=arguments,c=0;if(0===b.length)for(a in this._collisionData)this._collisionData[a].occurring=!1;for(1===b.length&&(b=b[0].split(/\s*,\s*/));c<b.length;++c){var d=b[c];a=this._collisionData[d],void 0!==a&&(a.occurring=!1)}return this},_SAT:function(a,b){for(var c,d,e,f,g,h,i,j,k,l=0,m=a.points,n=b.points,o=m.length/2,p=n.length/2,q=0,r=0,s=-(1/0),t=null,u=null;o>l;l++){for(k=l==o-1?0:l+1,q=-(m[2*l+1]-m[2*k+1]),r=m[2*l]-m[2*k],d=Math.sqrt(q*q+r*r),q/=d,r/=d,e=f=1/0,g=h=-(1/0),c=0;o>c;++c)j=m[2*c]*q+m[2*c+1]*r,j>g&&(g=j),e>j&&(e=j);for(c=0;p>c;++c)j=n[2*c]*q+n[2*c+1]*r,j>h&&(h=j),f>j&&(f=j);if(f>e?(i=f-g,q=-q,r=-r):i=e-h,i>=0)return!1;i>s&&(s=i,t=q,u=r)}for(l=0;p>l;l++){for(k=l==p-1?0:l+1,q=-(n[2*l+1]-n[2*k+1]),r=n[2*l]-n[2*k],d=Math.sqrt(q*q+r*r),q/=d,r/=d,e=f=1/0,g=h=-(1/0),c=0;o>c;++c)j=m[2*c]*q+m[2*c+1]*r,j>g&&(g=j),e>j&&(e=j);for(c=0;p>c;++c)j=n[2*c]*q+n[2*c+1]*r,j>h&&(h=j),f>j&&(f=j);if(f>e?(i=f-g,q=-q,r=-r):i=e-h,i>=0)return!1;i>s&&(s=i,t=q,u=r)}return{overlap:s,normal:{x:t,y:u}}}})},{"../core/core.js":7}],41:[function(a,b,c){var d=a("../core/core.js");d.math={abs:function(a){return 0>a?-a:a},amountOf:function(a,b,c){return c>b?(a-b)/(c-b):(a-c)/(b-c)},clamp:function(a,b,c){return a>c?c:b>a?b:a},degToRad:function(a){return a*Math.PI/180},distance:function(a,b,c,e){var f=d.math.squaredDistance(a,b,c,e);return Math.sqrt(parseFloat(f))},lerp:function(a,b,c){return a+(b-a)*c},negate:function(a){return Math.random()<a?-1:1},radToDeg:function(a){return 180*a/Math.PI},randomElementOfArray:function(a){return a[Math.floor(a.length*Math.random())]},randomInt:function(a,b){return a+Math.floor((1+b-a)*Math.random())},randomNumber:function(a,b){return a+(b-a)*Math.random()},squaredDistance:function(a,b,c,d){return(a-c)*(a-c)+(b-d)*(b-d)},withinRange:function(a,b,c){return a>=b&&c>=a}},d.math.Vector2D=function(){function a(b,c){if(b instanceof a)this.x=b.x,this.y=b.y;else if(2===arguments.length)this.x=b,this.y=c;else if(arguments.length>0)throw"Unexpected number of arguments for Vector2D()"}return a.prototype.x=0,a.prototype.y=0,a.prototype.add=function(a){return this.x+=a.x,this.y+=a.y,this},a.prototype.angleBetween=function(a){return Math.atan2(this.x*a.y-this.y*a.x,this.x*a.x+this.y*a.y)},a.prototype.angleTo=function(a){return Math.atan2(a.y-this.y,a.x-this.x)},a.prototype.clone=function(){return new a(this)},a.prototype.distance=function(a){return Math.sqrt((a.x-this.x)*(a.x-this.x)+(a.y-this.y)*(a.y-this.y))},a.prototype.distanceSq=function(a){return(a.x-this.x)*(a.x-this.x)+(a.y-this.y)*(a.y-this.y)},a.prototype.divide=function(a){return this.x/=a.x,this.y/=a.y,this},a.prototype.dotProduct=function(a){return this.x*a.x+this.y*a.y},a.prototype.crossProduct=function(a){return this.x*a.y-this.y*a.x},a.prototype.equals=function(b){return b instanceof a&&this.x==b.x&&this.y==b.y},a.prototype.perpendicular=function(b){return b=b||new a,b.setValues(-this.y,this.x)},a.prototype.getNormal=function(b,c){return c=c||new a,c.setValues(b.y-this.y,this.x-b.x).normalize()},a.prototype.isZero=function(){return 0===this.x&&0===this.y},a.prototype.magnitude=function(){return Math.sqrt(this.x*this.x+this.y*this.y)},a.prototype.magnitudeSq=function(){return this.x*this.x+this.y*this.y},a.prototype.multiply=function(a){return this.x*=a.x,this.y*=a.y,this},a.prototype.negate=function(){return this.x=-this.x,this.y=-this.y,this},a.prototype.normalize=function(){var a=Math.sqrt(this.x*this.x+this.y*this.y);return 0===a?(this.x=1,this.y=0):(this.x/=a,this.y/=a),this},a.prototype.scale=function(a,b){return void 0===b&&(b=a),this.x*=a,this.y*=b,this},a.prototype.scaleToMagnitude=function(a){var b=a/this.magnitude();return this.x*=b,this.y*=b,this},a.prototype.setValues=function(b,c){return b instanceof a?(this.x=b.x,this.y=b.y):(this.x=b,this.y=c),this},a.prototype.subtract=function(a){return this.x-=a.x,this.y-=a.y,this},a.prototype.toString=function(){return"Vector2D("+this.x+", "+this.y+")"},a.prototype.translate=function(a,b){return void 0===b&&(b=a),this.x+=a,this.y+=b,this},a.tripleProduct=function(a,b,c,e){e=e||new d.math.Vector2D;var f=a.dotProduct(c),g=b.dotProduct(c);return e.setValues(b.x*f-a.x*g,b.y*f-a.y*g)},a}(),d.math.Matrix2D=function(){return Matrix2D=function(a,b,c,d,e,f){if(a instanceof Matrix2D)this.a=a.a,this.b=a.b,this.c=a.c,this.d=a.d,this.e=a.e,this.f=a.f;else if(6===arguments.length)this.a=a,this.b=b,this.c=c,this.d=d,this.e=e,this.f=f;else if(arguments.length>0)throw"Unexpected number of arguments for Matrix2D()"},Matrix2D.prototype.a=1,Matrix2D.prototype.b=0,Matrix2D.prototype.c=0,Matrix2D.prototype.d=1,Matrix2D.prototype.e=0,Matrix2D.prototype.f=0,Matrix2D.prototype.apply=function(a){var b=a.x;return a.x=b*this.a+a.y*this.c+this.e,a.y=b*this.b+a.y*this.d+this.f,a},Matrix2D.prototype.clone=function(){return new Matrix2D(this)},Matrix2D.prototype.combine=function(a){var b=this.a;return this.a=b*a.a+this.b*a.c,this.b=b*a.b+this.b*a.d,b=this.c,this.c=b*a.a+this.d*a.c,this.d=b*a.b+this.d*a.d,b=this.e,this.e=b*a.a+this.f*a.c+a.e,this.f=b*a.b+this.f*a.d+a.f,this},Matrix2D.prototype.equals=function(a){return a instanceof Matrix2D&&this.a==a.a&&this.b==a.b&&this.c==a.c&&this.d==a.d&&this.e==a.e&&this.f==a.f},Matrix2D.prototype.determinant=function(){return this.a*this.d-this.b*this.c},Matrix2D.prototype.invert=function(){var a=this.determinant();if(0!==a){var b={a:this.a,b:this.b,c:this.c,d:this.d,e:this.e,f:this.f};this.a=b.d/a,this.b=-b.b/a,this.c=-b.c/a,this.d=b.a/a,this.e=(b.c*b.f-b.e*b.d)/a,this.f=(b.e*b.b-b.a*b.f)/a}return this},Matrix2D.prototype.isIdentity=function(){return 1===this.a&&0===this.b&&0===this.c&&1===this.d&&0===this.e&&0===this.f},Matrix2D.prototype.isInvertible=function(){return 0!==this.determinant()},Matrix2D.prototype.preRotate=function(a){var b=Math.cos(a),c=Math.sin(a),d=this.a;return this.a=b*d-c*this.b,this.b=c*d+b*this.b,d=this.c,this.c=b*d-c*this.d,this.d=c*d+b*this.d,this},Matrix2D.prototype.preScale=function(a,b){return void 0===b&&(b=a),this.a*=a,this.b*=b,this.c*=a,this.d*=b,this},Matrix2D.prototype.preTranslate=function(a,b){return"number"==typeof a?(this.e+=a,this.f+=b):(this.e+=a.x,this.f+=a.y),this},Matrix2D.prototype.rotate=function(a){var b=Math.cos(a),c=Math.sin(a),d=this.a;return this.a=b*d-c*this.b,this.b=c*d+b*this.b,d=this.c,this.c=b*d-c*this.d,this.d=c*d+b*this.d,d=this.e,this.e=b*d-c*this.f,this.f=c*d+b*this.f,this},Matrix2D.prototype.scale=function(a,b){return void 0===b&&(b=a),this.a*=a,this.b*=b,this.c*=a,this.d*=b,this.e*=a,this.f*=b,this},Matrix2D.prototype.setValues=function(a,b,c,d,e,f){return a instanceof Matrix2D?(this.a=a.a,this.b=a.b,this.c=a.c,this.d=a.d,this.e=a.e,this.f=a.f):(this.a=a,this.b=b,this.c=c,this.d=d,this.e=e,this.f=f),this},Matrix2D.prototype.toString=function(){return"Matrix2D(["+this.a+", "+this.c+", "+this.e+"] ["+this.b+", "+this.d+", "+this.f+"] [0, 0, 1])"},Matrix2D.prototype.translate=function(a,b){return"number"==typeof a?(this.e+=this.a*a+this.c*b,this.f+=this.b*a+this.d*b):(this.e+=this.a*a.x+this.c*a.y,this.f+=this.b*a.x+this.d*a.y),this},Matrix2D}()},{"../core/core.js":7}],42:[function(a,b,c){var d=a("../core/core.js");d.extend({rectManager:{merge:function(a,b,c){return"undefined"==typeof c&&(c={}),c._h=Math.max(a._y+a._h,b._y+b._h),c._w=Math.max(a._x+a._w,b._x+b._w),c._x=Math.min(a._x,b._x),c._y=Math.min(a._y,b._y),c._w-=c._x,c._h-=c._y,c},overlap:function(a,b){return a._x<b._x+b._w&&a._x+a._w>b._x&&a._y<b._y+b._h&&a._y+a._h>b._y},mergeSet:function(a){for(var b=0;b<a.length-1;)this.overlap(a[b],a[b+1])?(this.merge(a[b],a[b+1],a[b]),a.splice(b+1,1),b>0&&b--):b++;return a},boundingRect:function(a){if(a&&a.length){var b,c,d=1,e=a.length,f=a[0];for(f=[f._x,f._y,f._x+f._w,f._y+f._h];e>d;)b=a[d],c=[b._x,b._y,b._x+b._w,b._y+b._h],c[0]<f[0]&&(f[0]=c[0]),c[1]<f[1]&&(f[1]=c[1]),c[2]>f[2]&&(f[2]=c[2]),c[3]>f[3]&&(f[3]=c[3]),d++;return c=f,f={_x:c[0],_y:c[1],_w:c[2]-c[0],_h:c[3]-c[1]}}},_pool:function(){var a=[],b=0;return{get:function(c,d,e,f){a.length<=b&&a.push({});var g=a[b++];return g._x=c,g._y=d,g._w=e,g._h=f,g},copy:function(c){a.length<=b&&a.push({});var d=a[b++];return d._x=c._x,d._y=c._y,d._w=c._w,d._h=c._h,d},recycle:function(a){b--}}}()}})},{"../core/core.js":7}],43:[function(a,b,c){function d(a,b,c){this.keys=a,this.map=c,this.obj=b}var e,f=(a("../core/core.js"),function(a){e=a||64,this.map={}}),g=" ",h={};f.prototype={insert:function(a){var b,c,e=f.key(a),g=new d(e,a,this),h=0;for(h=e.x1;h<=e.x2;h++)for(b=e.y1;b<=e.y2;b++)c=h<<16^b,this.map[c]||(this.map[c]=[]),this.map[c].push(a);return g},search:function(a,b){var c,d,e,g,i,j=f.key(a,h),k=[];for(void 0===b&&(b=!0),c=j.x1;c<=j.x2;c++)for(d=j.y1;d<=j.y2;d++)if(i=this.map[c<<16^d])for(e=0;e<i.length;e++)k.push(i[e]);if(b){var l,m,n=[],o={};for(c=0,g=k.length;g>c;c++)l=k[c],l&&(m=l[0],l=l._mbr||l,!o[m]&&l._x<a._x+a._w&&l._x+l._w>a._x&&l._y<a._y+a._h&&l._y+l._h>a._y&&(o[m]=k[c]));for(l in o)n.push(o[l]);return n}return k},remove:function(a,b){var c,d,e=0;for(1==arguments.length&&(b=a,
a=f.key(b,h)),e=a.x1;e<=a.x2;e++)for(c=a.y1;c<=a.y2;c++)if(d=e<<16^c,this.map[d]){var g,i=this.map[d],j=i.length;for(g=0;j>g;g++)i[g]&&i[g][0]===b[0]&&i.splice(g,1)}},refresh:function(a){var b,c,d,e,g,h=a.keys,i=a.obj;for(c=h.x1;c<=h.x2;c++)for(d=h.y1;d<=h.y2;d++)if(b=this.map[c<<16^d])for(g=b.length,e=0;g>e;e++)b[e]&&b[e][0]===i[0]&&b.splice(e,1);for(f.key(i,h),c=h.x1;c<=h.x2;c++)for(d=h.y1;d<=h.y2;d++)b=this.map[c<<16^d],b||(b=this.map[c<<16^d]=[]),b.push(i);return a},boundaries:function(){var a,b,c={max:{x:-(1/0),y:-(1/0)},min:{x:1/0,y:1/0}},d={max:{x:-(1/0),y:-(1/0)},min:{x:1/0,y:1/0}};for(var e in this.map)if(this.map[e].length){var f=e>>16,g=e<<16>>16;if(0>g&&(f=-1^f),f>=c.max.x){c.max.x=f;for(a in this.map[e])b=this.map[e][a],"object"==typeof b&&"requires"in b&&(d.max.x=Math.max(d.max.x,b.x+b.w))}if(f<=c.min.x){c.min.x=f;for(a in this.map[e])b=this.map[e][a],"object"==typeof b&&"requires"in b&&(d.min.x=Math.min(d.min.x,b.x))}if(g>=c.max.y){c.max.y=g;for(a in this.map[e])b=this.map[e][a],"object"==typeof b&&"requires"in b&&(d.max.y=Math.max(d.max.y,b.y+b.h))}if(g<=c.min.y){c.min.y=g;for(a in this.map[e])b=this.map[e][a],"object"==typeof b&&"requires"in b&&(d.min.y=Math.min(d.min.y,b.y))}}return d}},f.key=function(a,b){return a._mbr&&(a=a._mbr),b||(b={}),b.x1=Math.floor(a._x/e),b.y1=Math.floor(a._y/e),b.x2=Math.floor((a._w+a._x)/e),b.y2=Math.floor((a._h+a._y)/e),b},f.hash=function(a){return a.x1+g+a.y1+g+a.x2+g+a.y2},d.prototype={update:function(a){f.hash(f.key(a,h))!=f.hash(this.keys)&&this.map.refresh(this)}},b.exports=f},{"../core/core.js":7}]},{},[17]);
//# sourceMappingURL=vendor.js.map
