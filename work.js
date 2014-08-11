/*:
	@module-license:
		The MIT License (MIT)

		Copyright (c) 2014 Richeve Siodina Bebedor

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license
	
	@module-configuration:
		{
			"packageName": "work",
			"fileName": "work.js",
			"moduleName": "work",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/work.git"
			"isGlobal": true
		}
	@end-module-configuration

	@module-documentation:

	@end-module-documentation

	@include:
		{
			"child_process": "childprocess"
		}
	@end-include
*/
var work = function work( command, callback, validator ){
	/*:
		@meta-configuration:
			{
				"command:required": "string",
				"callback:required": "Callback",
				"validator:optional": "Validator"
			}
		@end-meta-configuration
	*/

	var task = childprocess.exec( command,
		function onResult( error, output, errorOutput ){
			if( typeof errorOutput != undefined ||
				errorOutput !== null )
			{
				errorOutput = errorOutput.toString( ).trim( );
			}

			if( error || errorOutput ){
				error = error || errorOutput && new Error( errorOutput );
			}

			var isValid = false;
			if( typeof output != undefined
				|| output !== null )
			{
				output = output.toString( );

				isValid = !!output.trim( );

				if( validator && output.trim( ) ){
					isValid = validator( output );
				}
			}

			callback( error, isValid, output );
		} );
};

var childprocess = require( "child_process" );

module.exports = work;