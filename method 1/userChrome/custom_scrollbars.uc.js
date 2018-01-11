"use strict";

/* Firefox 57+ userChrome.js tweaks - SCROLLBARS ********************************************** */
/* by Aris (aris-addons@gmx.net)*************************************************************** */
/* Github: https://github.com/aris-t2/customscrollbarsforfx *********************************** */
/* ******************************************************************************************** */

/* ******************************************************************************************** */
/* Custom Scrollbars for Firefox ************************************************************** */
/* version 1.0.3 ****************************************************************************** */
/* ******************************************************************************************** */

/* ***********************************************************************************************

 README
 
 [!] 'custom_scrollbars.uc.js' belongs into Firefox profiles 'chrome' folder!
 -> finding profile folder: address bar > about:profiles > Root Directory > Open Folder
 -> add file to \chrome\ folder (create one, if needed)

 [!] STARTUP CACHE HAS TO BE DELETED AFTER EVERY CHANGE!
 -> finding 'startupCache' folder: address bar > about:profiles > Local Directory > Open Folder > startupCache
 -> close Firefox
 -> delete 'startupCache' folders content

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

// GENERAL SCROLLBAR SETTINGS
var hide_scrollbars = false; /* default = false */
var hide_scrollbar_buttons = false; /* default = false */
var custom_scrollbar_size = true; /* default = false */
var custom_scrollbar_size_value = 17; /* default = 17 // in px // 10-? */
var custom_scrollbar_opacity = false; /* default = false */
var custom_opacity_value = "1.0"; /* default = "1.0" */
var enable_floating_scrollbars = false; /* default = false // scrollbars on top of web content // uses "custom_scrollbar_size_value" inside its code anyway */

// CUSTOM SCROLLBAR SETTINGS ("custom_scrollbar_" --> "cs_")
var enable_custom_scrollbars = true;
var cs_thumb_border = 1; /* default = 0 // in px */
var cs_thumb_roundness = 0; /* default = 0 // in px */
var cs_buttons_roundness = 0; /* default = 0 // in px */
var cs_buttons_as_arrows = false; /* default = false // uses "custom_scrollbar_size_value" inside its code anyway */
var cs_arrows_on_buttons = false; /* default = false // uses "custom_scrollbar_size_value" inside its code anyway */

// CUSTOM SCROLLBAR COLORS/GRADIENTS
// - background
var cs_background_color = "#CCCCCC"; /* default = "#CCCCCC" */
var cs_background_image_vertical = "linear-gradient(to right,transparent,rgba(255,255,255,0.5),transparent)"; /* default = "unset" */
var cs_background_image_horizontal = "linear-gradient(to bottom,transparent,rgba(255,255,255,0.5),transparent)"; /* default = "unset" */
// - corner
var cs_corner_background_color = "#CCCCCC"; /* default = "#CCCCCC" */
var cs_corner_background_image = "linear-gradient(45deg,transparent 30%,rgba(255,255,240,0.5) 50%,transparent 70%),linear-gradient(-45deg,transparent 30%,rgba(255,255,240,0.5) 50%,transparent 70%)"; /* default = "unset" */
// - thumb/slider
var cs_thumb_color = "#33CCFF"; /* default = "#33CCFF" */
var cs_thumb_image_vertical = "linear-gradient(to right,transparent,rgba(255,255,255,0.5),transparent)"; /* default = "unset" */
var cs_thumb_image_horizontal = "linear-gradient(to bottom,transparent,rgba(255,255,255,0.5),transparent)"; /* default = "unset" */
var cs_thumb_hover_color = "#66FFFF"; /* default = "#66FFFF" */
var cs_thumb_hover_image_vertical = "linear-gradient(to right,transparent,rgba(255,255,255,0.5),transparent)"; /* default = "unset" */
var cs_thumb_hover_image_horizontal = "linear-gradient(to bottom,transparent,rgba(255,255,255,0.5),transparent)"; /* default = "unset" */
var cs_thumb_border_color = "#33CCFF"; /* default "#33CCFF" */
// - buttons
var cs_buttons_color = "#000000"; /* default = "#000000" */
var cs_buttons_image_vertical = "linear-gradient(to right,transparent,rgba(255,255,255,0.5),transparent)"; /* default = "unset" */
var cs_buttons_image_horizontal = "linear-gradient(to bottom,transparent,rgba(255,255,255,0.5),transparent)"; /* default = "unset" */
var cs_buttons_hover_color = "#000066"; /* default = "#000066" */
var cs_buttons_hover_image_vertical = "linear-gradient(to right,transparent,rgba(255,255,255,0.5),transparent)"; /* default = "unset" */
var cs_buttons_hover_image_horizontal = "linear-gradient(to bottom,transparent,rgba(255,255,255,0.5),transparent)"; /* default = "unset" */
// - button arrows
var cs_arrows_on_buttons_color = "#FF0000"; /* default = "#FF0000" */
var cs_arrows_on_buttons_hover_color = "#FFBB00"; /* default = "#FFBB00" */


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
	scrollbar, scrollcorner, scrollbar thumb, scrollbar scrollbarbutton {\
	  -moz-appearance: none !important;\
	}\
	scrollbar {\
	  background-color: '+cs_background_color+' !important;\
	}\
	scrollbar[orient="vertical"] {\
	  background-image: '+cs_background_image_vertical+' !important;\
	}\
	scrollbar[orient="horizontal"] {\
	  background-image: '+cs_background_image_horizontal+' !important;\
	}\
	scrollcorner {\
	  background-color: '+cs_corner_background_color+' !important;\
	  background-image: '+cs_corner_background_image+' !important;\
	}\
	scrollbar thumb {\
	  background-color: '+cs_thumb_color+' !important;\
	  border-radius: '+cs_thumb_roundness+'px !important;\
	  border: '+cs_thumb_border+'px solid '+cs_thumb_border_color+' !important;\
	}\
	scrollbar thumb[orient="vertical"] {\
	  background-image: '+cs_thumb_image_vertical+' !important;\
	}\
	scrollbar thumb[orient="horizontal"] {\
	  background-image: '+cs_thumb_image_horizontal+' !important;\
	}\
	scrollbar thumb:hover, scrollbar thumb:active {\
	  background-color: '+cs_thumb_hover_color+' !important;\
	}\
	scrollbar thumb[orient="vertical"]:hover, scrollbar thumb[orient="vertical"]:active {\
	  background-image: '+cs_thumb_hover_image_vertical+' !important;\
	}\
	scrollbar thumb[orient="horizontal"]:hover, scrollbar thumb[orient="horizontal"]:active {\
	  background-image: '+cs_thumb_hover_image_horizontal+' !important;\
	}\
	scrollbar scrollbarbutton {\
	  background-color: '+cs_buttons_color+' !important;\
	  border-radius: '+cs_buttons_roundness+'px !important;\
	}\
	scrollbar[orient="vertical"] scrollbarbutton {\
	  background-image: '+cs_buttons_image_vertical+' !important;\
	}\
	scrollbar[orient="horizontal"] scrollbarbutton {\
	  background-image: '+cs_buttons_image_horizontal+' !important;\
	}\
	scrollbar scrollbarbutton:hover {\
	  background-color: '+cs_buttons_hover_color+' !important;\
	}\
	scrollbar[orient="vertical"] scrollbarbutton:hover {\
	  background-image: '+cs_buttons_hover_image_vertical+' !important;\
	}\
	scrollbar[orient="horizontal"] scrollbarbutton:hover {\
	  background-image: '+cs_buttons_hover_image_horizontal+' !important;\
	}\
	'), null, null);

	ss.loadAndRegisterSheet(uri, ss.AGENT_SHEET);

	}
};

var cs_scrollbars_scrollbar_button_arrows = {

  init: function() {

  var uri = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
	\
	@namespace html url("http://www.w3.org/1999/xhtml");\
	\
	scrollbar scrollbarbutton, \
	scrollbar[orient="vertical"] scrollbarbutton,\
	scrollbar[orient="horizontal"] scrollbarbutton, \
	scrollbar[orient="vertical"] scrollbarbutton:hover,\
	scrollbar[orient="horizontal"] scrollbarbutton:hover {\
	  background-color: unset !important;\
	  background-image: unset !important;\
	  border-radius: 0px !important;\
	}\
	scrollbar[orient="vertical"] > scrollbarbutton {\
	  min-height: '+(custom_scrollbar_size_value/2)+'px !important;\
	  height: '+(custom_scrollbar_size_value/2)+'px !important;\
	  max-height: '+(custom_scrollbar_size_value/2)+'px !important;\
	  min-width: '+custom_scrollbar_size_value+'px !important;\
	  width: '+custom_scrollbar_size_value+'px !important;\
	  max-width: '+custom_scrollbar_size_value+'px !important;\
	}\
	scrollbar[orient="horizontal"] > scrollbarbutton {\
	  min-width: '+(custom_scrollbar_size_value/2)+'px !important;\
	  width: '+(custom_scrollbar_size_value/2)+'px !important;\
	  max-width: '+(custom_scrollbar_size_value/2)+'px !important;\
	  min-height: '+custom_scrollbar_size_value+'px !important;\
	  height: '+custom_scrollbar_size_value+'px !important;\
	  max-height: '+custom_scrollbar_size_value+'px !important;\
	}\
	scrollbar[orient="vertical"] > scrollbarbutton[type="decrement"] {\
	  border-left: '+(custom_scrollbar_size_value/2)+'px solid transparent !important;\
	  border-right: '+(custom_scrollbar_size_value/2)+'px solid transparent !important;\
	  border-bottom: '+(custom_scrollbar_size_value/2)+'px solid '+cs_buttons_color+' !important;\
	}\
	scrollbar[orient="vertical"] > scrollbarbutton[type="decrement"]:hover {\
	  border-bottom: '+(custom_scrollbar_size_value/2)+'px solid '+cs_buttons_hover_color+' !important;\
	}\
	scrollbar[orient="vertical"] > scrollbarbutton[type="increment"] {\
	  border-left: '+(custom_scrollbar_size_value/2)+'px solid transparent !important;\
	  border-right: '+(custom_scrollbar_size_value/2)+'px solid transparent !important;\
	  border-top: '+(custom_scrollbar_size_value/2)+'px solid '+cs_buttons_color+' !important;\
	}\
	scrollbar[orient="vertical"] > scrollbarbutton[type="increment"]:hover {\
	  border-top: '+(custom_scrollbar_size_value/2)+'px solid '+cs_buttons_hover_color+' !important;\
	}\
	scrollbar[orient="horizontal"] > scrollbarbutton[type="decrement"] {\
	  border-top: '+(custom_scrollbar_size_value/2)+'px solid transparent !important;\
	  border-bottom: '+(custom_scrollbar_size_value/2)+'px solid transparent !important;\
	  border-right: '+(custom_scrollbar_size_value/2)+'px solid '+cs_buttons_color+' !important;\
	}\
	scrollbar[orient="horizontal"] > scrollbarbutton[type="decrement"]:hover {\
	  border-right: '+(custom_scrollbar_size_value/2)+'px solid '+cs_buttons_hover_color+' !important;\
	}\
	scrollbar[orient="horizontal"] > scrollbarbutton[type="increment"] {\
	  border-top: '+(custom_scrollbar_size_value/2)+'px solid transparent !important;\
	  border-bottom: '+(custom_scrollbar_size_value/2)+'px solid transparent !important;\
	  border-left: '+(custom_scrollbar_size_value/2)+'px solid '+cs_buttons_color+' !important;\
	}\
	scrollbar[orient="horizontal"] > scrollbarbutton[type="increment"]:hover {\
	  border-left: '+(custom_scrollbar_size_value/2)+'px solid '+cs_buttons_hover_color+' !important;\
	}\
	\
  '), null, null);

  ss.loadAndRegisterSheet(uri, ss.AGENT_SHEET);

  }
};

var cs_scrollbars_arrows_on_buttons = {

  init: function() {

  var uri = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
	\
	@namespace html url("http://www.w3.org/1999/xhtml");\
	\
	scrollbar scrollbarbutton, \
	scrollbar[orient="vertical"] scrollbarbutton,\
	scrollbar[orient="horizontal"] scrollbarbutton, \
	scrollbar[orient="vertical"] scrollbarbutton:hover,\
	scrollbar[orient="horizontal"] scrollbarbutton:hover {\
	  border-radius: 0px !important;\
	}\
	\
	scrollbar[orient="vertical"] > scrollbarbutton {\
	  min-height: '+(custom_scrollbar_size_value/2)+'px !important;\
	  height: '+(custom_scrollbar_size_value/2)+'px !important;\
	  max-height: '+(custom_scrollbar_size_value/2)+'px !important;\
	  min-width: '+custom_scrollbar_size_value+'px !important;\
	  width: '+custom_scrollbar_size_value+'px !important;\
	  max-width: '+custom_scrollbar_size_value+'px !important;\
	}\
	scrollbar[orient="horizontal"] > scrollbarbutton {\
	  min-width: '+(custom_scrollbar_size_value/2)+'px !important;\
	  width: '+(custom_scrollbar_size_value/2)+'px !important;\
	  max-width: '+(custom_scrollbar_size_value/2)+'px !important;\
	  min-height: '+custom_scrollbar_size_value+'px !important;\
	  height: '+custom_scrollbar_size_value+'px !important;\
	  max-height: '+custom_scrollbar_size_value+'px !important;\
	}\
	scrollbar[orient="vertical"] > scrollbarbutton[type="decrement"] {\
	  border-left: '+(custom_scrollbar_size_value/2)+'px solid transparent !important;\
	  border-right: '+(custom_scrollbar_size_value/2)+'px solid transparent !important;\
	  border-bottom: '+(custom_scrollbar_size_value/2)+'px solid '+cs_arrows_on_buttons_color+' !important;\
	}\
	scrollbar[orient="vertical"] > scrollbarbutton[type="decrement"]:hover {\
	  border-bottom: '+(custom_scrollbar_size_value/2)+'px solid '+cs_arrows_on_buttons_hover_color+' !important;\
	}\
	scrollbar[orient="vertical"] > scrollbarbutton[type="increment"] {\
	  border-left: '+(custom_scrollbar_size_value/2)+'px solid transparent !important;\
	  border-right: '+(custom_scrollbar_size_value/2)+'px solid transparent !important;\
	  border-top: '+(custom_scrollbar_size_value/2)+'px solid '+cs_arrows_on_buttons_color+' !important;\
	}\
	scrollbar[orient="vertical"] > scrollbarbutton[type="increment"]:hover {\
	  border-top: '+(custom_scrollbar_size_value/2)+'px solid '+cs_arrows_on_buttons_hover_color+' !important;\
	}\
	scrollbar[orient="horizontal"] > scrollbarbutton[type="decrement"] {\
	  border-top: '+(custom_scrollbar_size_value/2)+'px solid transparent !important;\
	  border-bottom: '+(custom_scrollbar_size_value/2)+'px solid transparent !important;\
	  border-right: '+(custom_scrollbar_size_value/2)+'px solid '+cs_arrows_on_buttons_color+' !important;\
	}\
	scrollbar[orient="horizontal"] > scrollbarbutton[type="decrement"]:hover {\
	  border-right: '+(custom_scrollbar_size_value/2)+'px solid '+cs_arrows_on_buttons_hover_color+' !important;\
	}\
	scrollbar[orient="horizontal"] > scrollbarbutton[type="increment"] {\
	  border-top: '+(custom_scrollbar_size_value/2)+'px solid transparent !important;\
	  border-bottom: '+(custom_scrollbar_size_value/2)+'px solid transparent !important;\
	  border-left: '+(custom_scrollbar_size_value/2)+'px solid '+cs_arrows_on_buttons_color+' !important;\
	}\
	scrollbar[orient="horizontal"] > scrollbarbutton[type="increment"]:hover {\
	  border-left: '+(custom_scrollbar_size_value/2)+'px solid '+cs_arrows_on_buttons_hover_color+' !important;\
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

var scrollbar_size = {

  init: function() {

  var uri = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
	\
	@namespace html url("http://www.w3.org/1999/xhtml");\
	\
	scrollbar[orient="vertical"] scrollbarbutton {\
	  min-width: 0 !important;\
	  width: '+custom_scrollbar_size_value+'px !important;\
	  max-width: '+custom_scrollbar_size_value+'px !important;\
	}\
	scrollbar[orient="horizontal"] scrollbarbutton {\
	  min-height: 0 !important;\
	  height: '+custom_scrollbar_size_value+'px !important;\
	  max-height: '+custom_scrollbar_size_value+'px !important;\
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
	scrollbar[orient="vertical"],\
	scrollbar[orient="horizontal"],\
	scrollbar, scrollcorner {\
	  background-color: transparent !important; \
	  background-image: unset !important; \
	}\
	scrollbar[orient="vertical"] {\
	  -moz-margin-start: -'+custom_scrollbar_size_value+'px !important;\
	  width: '+custom_scrollbar_size_value+'px !important;\
	}\
	scrollbar[orient="horizontal"] {\
	  margin-top: -'+custom_scrollbar_size_value+'px !important;\
	  height: '+custom_scrollbar_size_value+'px !important;\
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
if(cs_buttons_as_arrows==true && hide_scrollbars==false) cs_scrollbars_scrollbar_button_arrows.init();
if(cs_arrows_on_buttons==true && cs_buttons_as_arrows==false && hide_scrollbars==false) cs_scrollbars_arrows_on_buttons.init();
if(hide_scrollbar_buttons==true) scrollbar_buttons.init();
if(custom_scrollbar_size==true) scrollbar_size.init();
if(enable_floating_scrollbars==true) floating_scrollbars.init();
if(custom_scrollbar_opacity==true) scrollbar_opacity.init();
if(hide_scrollbars==true) remove_scrollbars.init();