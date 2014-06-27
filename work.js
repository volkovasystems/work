/*:
*/
var work = function work( command, callback, validator ){
	var task = childprocess.exec( command,
		function onResult( error, output, errorOutput ){
			if( error || errorOutput ){
				error = error || new Error( errorOutput );
			}

			var isValid = !!output;
			if( validator && output.trim( ) ){
				isValid = validator( output );
			}
			
			callback( error, isValid, output );
		} );
};
exports.work = work;