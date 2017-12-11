"use strict";

/* Firefox 57+ userChrome.js tweaks - SCROLLBARS ********************************************** */
/* by Aris (aris-addons@gmx.net)*************************************************************** */
/* Github: https://github.com/aris-t2/customscrollbarsforfx *********************************** */
/* ******************************************************************************************** */

/* ******************************************************************************************** */
/* Custom Scrollbars for Firefox ************************************************************** */
/* version 1.0.2 ****************************************************************************** */
/* ******************************************************************************************** */

/* ***********************************************************************************************

 README
 
 This file belongs into Firefox profile folder!
 Finding profile folder: address bar > about:support > Profile Folder > Open Folder
 File belongs into \ PROFILE \chrome\ directory.

 STARTUP CACHE HAS TO BE DELETED AFTER EVERY CHANGE!

 Close Firefox, search for "startupCache" folder and delete its content
 WINDOWS: C:\Users\ NAME \AppData\Local\Mozilla\Firefox\Profiles\ PROFILE \startupCache

 ENABLING options > set var to true
 DISABLING options > set var to false
 Modifying appearance > change values
 - color - name: red, blue, transparent / hex code: #33CCFF, #FFF
 - color - rgb(a): rgba(0,0,255,0.8) / hsl(a): hsla(240,100%,50%,0.8)
 - numbers: 1, 2, 3 ... 10, 11, 12 ...
 - opacity: 0.0 to 1.0 e.g. 1.4, 1,75
 - gradients: linear-gradient(direction, color, color, color)
 - gradients example: linear-gradient(to right, blue, #33CCFF, rgba(0,0,255,0.8))
 
 NOTE
 - This is a tiny collection of scrollbar tweaks, not a port of 'NewScrollbars' add-on!
 - Small scrollbar width values will corrupt some parts of the ui!
 
*********************************************************************************************** */

// General scrollbar settings
var hide_scrollbars = false; /* default = false */
var hide_scrollbar_buttons = false; /* default = false */
var custom_scrollbar_width = true; /* default = false */
var custom_scrollbar_width_value = 17; /* 10-? // default = 17 (in px) */
var custom_scrollbar_opacity = false; /* default = false */
var custom_opacity_value = "1.0"; /* default = 1.0 */
var enable_floating_scrollbars = false; /* default = false // scrollbars on top of web content */

// Custom scrollbar appearance settings - "cs"
var enable_custom_scrollbars = true;
var cs_background_color = "#CCCCCC"; /* default = #CCCCCC */
var cs_background_image = "linear-gradient(to right,transparent,rgba(255,255,255,0.5),transparent)"; /* default = none */
var cs_thumb_color = "#33CCFF"; /* default = #33CCFF */
var cs_thumb_image = "linear-gradient(to right,transparent,rgba(255,255,255,0.5),transparent)"; /* default = unset */
var cs_thumb_hover_color = "#66FFFF"; /* default = #66FFFF */
var cs_thumb_hover_image = "linear-gradient(to right,transparent,rgba(255,255,255,0.5),transparent)"; /* default = unset */
var cs_thumb_roundness = 0; /* default = 0 (in px) */
var cs_thumb_border = 1; /* default = 0 (in px) */
var cs_thumb_border_color = "#33CCFF"; /* default ##33CCFF */
var cs_buttons_color = "#000000"; /* default = #000000 */
var cs_buttons_image = "linear-gradient(to right,transparent,rgba(255,255,255,0.5),transparent)"; /* default = unset */
var cs_buttons_hover_color = "#000066"; /* default = #000066 */
var cs_buttons_hover_image = "linear-gradient(to right,transparent,rgba(255,255,255,0.5),transparent)"; /* default = unset */
var cs_buttons_roundness = 0; /* default = 0 (in px) */


/* ******************************************************************************************** */
/* ******************************************************************************************** */
/* ******************************************************************************************** */


// Scrollbar code

Components.utils.import("resource://gre/modules/Services.jsm");
var ss =  Components.classes["@mozilla.org/content/style-sheet-service;1"].getService(Components.interfaces.nsIStyleSheetService);

var custom_scrollbars = {

  init: function() {

  var uri = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
	\
	@namespace html url("http://www.w3.org/1999/xhtml");\
	\
	scrollbar, scrollcorner {\
	  -moz-appearance: none !important;\
	  background-color: '+cs_background_color+' !important; \
	  background-image: '+cs_background_image+' !important; \
	}\
	scrollbar thumb {\
	  -moz-appearance: none !important;\
	  background-color: '+cs_thumb_color+' !important;\
	  background-image: '+cs_thumb_image+' !important;\
	  border-radius: '+cs_thumb_roundness+'px !important;\
	  border: '+cs_thumb_border+'px solid '+cs_thumb_border_color+' !important; \
	}\
	scrollbar thumb:hover, scrollbar thumb:active {\
	  -moz-appearance: none !important;\
	  background-color: '+cs_thumb_hover_color+' !important;\
	  background-image: '+cs_thumb_hover_image+' !important;\
	}\
	scrollbar scrollbarbutton {\
	  -moz-appearance: none !important;\
	  background-color: '+cs_buttons_color+' !important;\
	  background-image: '+cs_buttons_image+' !important;\
	  border-radius: '+cs_buttons_roundness+'px !important;\
	}\
	scrollbar scrollbarbutton:hover {\
	  -moz-appearance: none !important;\
	  background-color: '+cs_buttons_hover_color+' !important;\
	  background-image: '+cs_buttons_hover_image+' !important;\
	}\
	\
  '), null, null);

  ss.loadAndRegisterSheet(uri, ss.AGENT_SHEET);

  }
};

var scrollbar_buttons = {

  init: function() {

  var uri = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
	\
	@namespace html url("http://www.w3.org/1999/xhtml");\
	\
	scrollbar scrollbarbutton {\
	  opacity: 0 !important;\
	}\
	scrollbar[orient="vertical"] scrollbarbutton {\
	  min-height: 1px !important;\
	  height: 1px !important;\
	  max-height: 1px !important;\
	}\
	scrollbar[orient="horizontal"] scrollbarbutton {\
	  min-width: 1px !important;\
	  width: 1px !important;\
	  max-width: 1px !important;\
	}\
	\
  '), null, null);

  ss.loadAndRegisterSheet(uri, ss.AGENT_SHEET);

  }
};

var scrollbar_width = {

  init: function() {

  var uri = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
	\
	@namespace html url("http://www.w3.org/1999/xhtml");\
	\
	scrollbar[orient="vertical"] scrollbarbutton {\
	  min-width: 0 !important;\
	  width: '+custom_scrollbar_width_value+'px !important;\
	  max-width: '+custom_scrollbar_width_value+'px !important;\
	}\
	scrollbar[orient="horizontal"] scrollbarbutton {\
	  min-height: 0 !important;\
	  height: '+custom_scrollbar_width_value+'px !important;\
	  max-height: '+custom_scrollbar_width_value+'px !important;\
	}\
	\
  '), null, null);

  ss.loadAndRegisterSheet(uri, ss.AGENT_SHEET);

  }
};

var floating_scrollbars = {

  init: function() {

  var uri = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
	\
	@namespace html url("http://www.w3.org/1999/xhtml");\
	\
	scrollbar {\
	  position: relative !important;\
	  z-index: 1000000000 !important;\
	}\
	scrollbar, scrollcorner {\
	  background-color: transparent !important; \
	  background-image: unset !important; \
	}\
	scrollbar[orient="vertical"] {\
	  -moz-margin-start: -'+custom_scrollbar_width_value+'px !important;\
	  width: '+custom_scrollbar_width_value+'px !important;\
	}\
	scrollbar[orient="horizontal"] {\
	  margin-top: -'+custom_scrollbar_width_value+'px !important;\
	  height: '+custom_scrollbar_width_value+'px !important;\
	}\
	\
  '), null, null);

  ss.loadAndRegisterSheet(uri, ss.AGENT_SHEET);

  }
};

var scrollbar_opacity = {

  init: function() {

  var uri = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
	\
	@namespace html url("http://www.w3.org/1999/xhtml");\
	\
	scrollbar {\
	  opacity: '+custom_opacity_value+' !important;\
	}\
	\
  '), null, null);

  ss.loadAndRegisterSheet(uri, ss.AGENT_SHEET);

  }
};

var remove_scrollbars = {

  init: function() {

  var uri = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
	\
	@namespace html url("http://www.w3.org/1999/xhtml");\
	\
	scrollbar, scrollcorner {\
	  display: none !important;\
	  visibility: collapse !important;\
	}\
	\
  '), null, null);

  ss.loadAndRegisterSheet(uri, ss.AGENT_SHEET);

  }
};

// enables settings as set
if(enable_custom_scrollbars==true) custom_scrollbars.init();
if(hide_scrollbar_buttons==true) scrollbar_buttons.init();
if(custom_scrollbar_width==true) scrollbar_width.init();
if(enable_floating_scrollbars==true) floating_scrollbars.init();
if(custom_scrollbar_opacity==true) scrollbar_opacity.init();
if(hide_scrollbars==true) remove_scrollbars.init();