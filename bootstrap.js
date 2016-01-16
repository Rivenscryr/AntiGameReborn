// =======================================================================
// AntiGameOrigin by Francolino - see license.txt
// =======================================================================
/*global chrome */
'use strict';
// bootstrap.js: Exactly the same Final, Beta and Alpha
// manifest.json: Different for Final, Beta and Alpha

if ( ! AGB ) { var AGB = {}; }



AGB.Config = {

	id													: '',
	beta												: 0,					// 0 final,		1 beta, log		2  alpha, log + constant.js		3 alpha, log + constant.js +  log content to background
	version												: '',
	
	pathSkin											: ''
 };





AGB.Core = {

		

	Log: function( text, force )						{ if ( AGB.Config.beta || force ) { window.console.log( 'AntiGameOriginX:  ' + text ); } },



	setTimeout: function( callback, delay )				{ return window.setTimeout( callback, delay ); },
		
		
		
	clearTimeout: function( timer )						{ if ( timer ) { window.clearTimeout( timer ); timer = null; } },
		

		
	resourceFile: function( file ) {
		var request;
		
		if ( file ) {
		
			try {
			
				request									= new XMLHttpRequest();
				request.open( 'GET', chrome.extension.getURL( file ), false );
				request.overrideMimeType( 'text/plain' );														//	"text/plain;charset=UTF-8"
				request.send( null );																			// Synchron !
				
				return request.responseText || '';
			}
			catch (e)									{ return ''; }
		}
		return ''; 
	}
};
	
	

window.setTimeout( function() { if ( AGB.Manager ) { AGB.Manager.Start(); } }, 1000 );							// Use a timeout
