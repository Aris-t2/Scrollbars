<h1>Custom Scrollbars for Firefox 57+</h1>
<b><a href=https://github.com/Aris-t2/Scrollbars/releases>[ Download ]</a></b></br>
<h2>Want to support this project?</h2>
<b><a href=https://www.paypal.me/tkpay>[ Paypal Me ]</a></b></br>
</br>
<h2>Method 1 - files for Firefox profile folder only</h2>
M1 is based on this project by nuchi: https://github.com/nuchi/firefox-quantum-userchromejs </br>
M1 will stop working when Mozilla drops XBL support.</br>
</br>
From this projects <code>\method 1\</code> folder copy <code>userChrome</code> folder and <code>userChrome.css</code> file to <code>\ PROFILENAME \chrome\ </code> or add code from <code>userChrome.css</code> file to an existing <code>userChrome.css</code> file.</br>
</br>
<h2>Method 2 - files for Firefox folder and to Firefox profile folder</h2>
M2 is based on this project by ardiman: https://github.com/ardiman/userChrome.js </br>
</br>
From this projects <code>\method 2\profile\</code> folder copy <code>userChrome</code> folder and <code>userChrome.js</code> file to <code>\ PROFILENAME \chrome\ </code>.</br>
</br>
From this projects <code>\method 2\firefox\</code> folder copy <code>defaults</code> folder and <code>config.js</code> file to Firefox main directory (where the Firefox executable is).
</br>
<h2>Script/startup cache must be deleted after every change!</h2>
Open <code>about:profiles > Local Directory > Open Folder</code>, close Firefox and delete all files in <code>startupCache</code> folder.</br>
WINDOWS: <code>C:\Users\ NAME \AppData\Local\Mozilla\Firefox\Profiles\ PROFILE \startupCache</code></br>
LINUX: <code>\home\ NAME \.cache\mozilla\firefox\ PROFILE \startupCache</code></br>
</br>
This is not the same profile folder custom scripts and styles are stored!</br>
</br>
More info about startup cache removal (in German): https://github.com/ardiman/userChrome.js/wiki/Skriptcache </br>
More info about startup cache removal (in English [Google translation]): https://translate.googleusercontent.com/translate_c?act=url&depth=1&ie=UTF8&prev=_t&rurl=translate.google.com&sl=auto&sp=nmt4&tl=en&u=https://github.com/ardiman/userChrome.js/wiki/Skriptcache </br>
<h2>Where to find Firefox profile folder?</h2>
<b>1.</b> Find your profile folder.</br>
<code>about:profiles > Root Directory > Open Folder</code></br>
<code>about:support > Profile Folder > Open Folder</code></br>
or <code>Shift+F2</code> to open Firefox's command line, then enter the command <code>folder openprofile</code></br>
</br>
<b>2.</b> User styles belong into <code>\chrome\</code> folder. Create it, if there is none yet.</br>
<code>\ PROFILENAME \chrome\ </code></br>
</br>
<b>3.</b> Copy files and the folders into <code>\chrome\</code> sub-folder so the results look like this:</br>
<code>\ PROFILENAME \chrome\userChrome\</code> (method 1 and 2)</br>
<code>\ PROFILENAME \chrome\userChrome.css</code> (method 1)</br>
<code>\ PROFILENAME \chrome\userChrome.js</code> (method 2)</br>
</br>
<h2>Customize scrollbars</h2>
Open <code>\chrome\userChrome\custom_scrollbars.uc.js</code> with any text editor (<b><a href=https://notepad-plus-plus.org/download/>Notepad++</a></b> recommended on Windows).</br>
Follow instruction inside <code>custom_scrollbars.uc.js</code> on how to modify scrollbar attributes and appearance.</br>
<h2>What features does this project offer?</h2>
- hide scrollbars</br>
- hide scrollbar buttons</br>
- floating scrollbars (on top of web content)</br>
- custom scrollbar width</br>
- custom scrollbar opacity</br>
- custom scrollbar background color / background image for color gradient</br>
- custom scrollbar thumb color / background image</br>
- custom scrollbar hovered-thumb color / background image for color gradient</br>
- custom scrollbar thumb roundness / border-radius</br>
- custom scrollbar thumb border width</br>
- custom scrollbar thumb border color</br>
- custom scrollbar button color / background image for color gradient</br>
- custom scrollbar hovered-button color / background image for color gradient</br>
- custom scrollbar button roundness / border-radius</br>
</br>
