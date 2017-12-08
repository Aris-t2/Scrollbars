<h1>Custom Scrollbars for Firefox 57+</h1>
<h2>Want to support this project?</h2>
<b><a href=https://www.paypal.me/tkpay>[ Paypal Me ]</a></b></br>
</br>
<h2>Method 1 - files for Firefox profile folder only</h2>
M1 is based on this project by nuchi: https://github.com/nuchi/firefox-quantum-userchromejs </br>
M1 will stop working when Mozilla drops XBL support.</br>
</br>
From this projects <code>/method 1/</code> folder copy <code>userChrome</code> folder and <code>userChrome.css</code> file to <code>\ PROFILENAME \chrome\ </code> or add code from <code>userChrome.css</code> file to a existing <code>userChrome.css</code> file.</br>
</br>
<h2>Method 2 - files for Firefox folder and to Firefox profile folder</h2>
M2 is based on this project by ardiman: https://github.com/ardiman/userChrome.js </br>
</br>
From this projects <code>/method 2/profile/</code> folder copy <code>userChrome</code> folder and <code>userChrome.js</code> file to <code>\ PROFILENAME \chrome\ </code>.</br>
</br>
From this projects <code>/method 2/firefox/</code> folder copy <code>defaults</code> folder and <code>config.js</code> file to Firefox main directory (where the Firefox executable is).
</br>
<h2>Script/startup cache must be deleted after every change!</h2>
Close Firefox, search for <code>startupCache</code> folder and delete its content.</br>
</br>
WINDOWS: <code>C:\Users\ NAME \AppData\Local\Mozilla\Firefox\Profiles\ PROFILE \startupCache</code></br>
</br>
This is not the same profile folder custom scripts and styles are stored!</br>
</br>
More info about startup cache removal (in German): https://github.com/ardiman/userChrome.js/wiki/Skriptcache </br>
More info about startup cache removal (in English [Google translate]): https://translate.googleusercontent.com/translate_c?act=url&depth=1&ie=UTF8&prev=_t&rurl=translate.google.com&sl=auto&sp=nmt4&tl=en&u=https://github.com/ardiman/userChrome.js/wiki/Skriptcache </br>
<h2>Where to find Firefox profile folder?</h2>
<b>1.</b> Find your profile folder.</br>
<code>about:support > Profile Folder > Open Folder</code></br>
or <code>Shift+F2</code> to open Firefox's command line, then enter the command <code>folder openprofile</code></br>
</br>
<b>2.</b> User styles belong into <code>\chrome\</code> folder. Create it, if there is none yet.</br>
<code>\ PROFILENAME \chrome\ </code></br>
</br>
<b>3.</b> Copy files and the folders into <code>\chrome\</code> sub-folder so the results look like this.</br>
<code>\ PROFILENAME \chrome\userChrome\</code> (method 1 and 2)</br>
<code>\ PROFILENAME \chrome\userChrome.css</code> (method 1)</br>
<code>\ PROFILENAME \chrome\userChrome.js</code> (method 2)</br>
</br>
<h2>Customize scrollbars</h2>
Open <code>custom_scrollbars.uc.js</code> with any text editor (<b><a href=https://notepad-plus-plus.org/download/>Notepad++</a></b> recommended on Windows).</br>
Follow instruction inside file on how to modify scrollbar attributes</br>
<h2>What scrollbar tweaks does this project offer?</h2>
- hide scrollbars</br>
- hide scrollbar buttons</br>
- change width</br>
- change opacity</br>
- change background color / background image</br>
- change thumb color / background image</br>
- change hovered thumb color / background image</br>
- change thumb roundness</br>
- change thumb border</br>
- change thumb border color</br>
- change button color / background image</br>
- change hovered button color / background image</br>
- change button roundness</br>
</br>
