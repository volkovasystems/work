/*:
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
( module || { } ).exports = work;