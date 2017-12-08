
try {

	Components.utils.import("resource://gre/modules/osfile.jsm");

	function UserChrome_js() {
	  var os = Components.classes["@mozilla.org/observer-service;1"]
						 .getService(Components.interfaces.nsIObserverService);
	  os.addObserver(this, "final-ui-startup", false);
	};

	UserChrome_js.prototype = {


	  observe: function(aSubject, aTopic, aData) {
		var os = Components.classes["@mozilla.org/observer-service;1"]
						   .getService(Components.interfaces.nsIObserverService);

		switch (aTopic) {
		case "final-ui-startup":
		  var file = Components.classes["@mozilla.org/file/directory_service;1"]
							   .getService(Components.interfaces.nsIProperties)
							   .get("UChrm", Components.interfaces.nsIFile);
		  file.append("userChrome.js");

		  if (file.exists() && file.isFile() &&
			  !Components.classes["@mozilla.org/xre/app-info;1"]
						 .getService(Components.interfaces.nsIXULRuntime)
						 .inSafeMode) {
			this.mFileURL = Components.classes["@mozilla.org/network/io-service;1"]
									  .getService(Components.interfaces.nsIIOService)
									  .getProtocolHandler("file")
									  .QueryInterface(Components.interfaces.nsIFileProtocolHandler)
									  .getURLSpecFromFile(file);
			var path = OS.Constants.Path.profileDir;
			path = OS.Path.join(path, "./chrome/userChrome/userChromeJS.js");
			this.uCFileURI = OS.Path.toFileURI(path);

			os.addObserver(this, "domwindowopened", false);
		  }
		  break;
		case "domwindowopened":
		  aSubject.addEventListener("load", this, true);
		  break;
		}
	  },

	/* ........ nsIDOMEventListener ............................................. */

	  handleEvent: function(aEvent) {
		var document = aEvent.originalTarget;
		if (document.location && document.location.protocol == "chrome:") {
		  try {
			let loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
								   .getService(Components.interfaces.mozIJSSubScriptLoader);

			loader.loadSubScript(this.uCFileURI,
								 document.defaultView,
								 "UTF-8");

			loader.loadSubScript(this.mFileURL,
								 document.defaultView,
								 "UTF-8");
		  }
		  catch (ex) {
			// script execution can be stopped with |throw "stop";|
			if (ex !== "stop") {
			  Components.utils.reportError(ex);
			}
		  }
		}
	  }

	};

	new UserChrome_js();

} catch(ex) {
  Components.utils.reportError(ex);
};
