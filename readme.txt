=== Caxton ===
Contributors: pootlepress, shramee, jamie
Tags: gutenberg, gutenberg blocks, blocks, posts grid
Requires at least: 4.9.0
Tested up to: 4.9.5
Requires PHP: 5.6.0
Stable tag: 1.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Caxton bring to you super useful blocks which make your Gutenberg more and more powerful.

== Description ==
Caxton adds new blocks to WordPress' Gutenberg editor.

https://www.youtube.com/watch?v=ZCfp1RtSnWg

**THIS IS IN BETA RIGHT NOW, USE ON PRODUCTION SITE AT YOUR OWN RISK.**

== Installation ==
Automatic installation is the easiest way to install Caxton.
From your WordPress dashboard, navigate to the Plugins menu and click Add New. In the search field type `Caxton` and click Search Plugins. Find Caxton plugin and install it by simply clicking “Install Now”.

For manual installation...
1. Upload the `caxton` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the \'Plugins\' menu in WordPress
3. Start using blocks!

**Requires Gutenberg until it is a part of WordPress core **

== Frequently Asked Questions ==
= I don\'t see any blocks, just my default WordPress editor? =

Make sure you have Gutenberg installed and are using Gutenberg editor (not the old editor).

= Where can I log bugs? =

You can log bugs on our Github repository https://github.com/pootlepress/caxton/issues/

= How can I contribute? =

You can contribute by forking code at Github https://github.com/pootlepress/caxton/

= When can I see more blocks? =

With WordPress including Gutenberg in core in WP v5. We will be adding more and more blocks real soon ;)

== Screenshots ==
1. Blocks menu
2. Block settings
3. Block preview

== Changelog ==

Version 1.0.0
* 2018-09-17
* Tweak - Uses of withAPIData removed
* Fixed - Hero block columns broken
* Dev - New `apiCallback` and `apiUrl` params for CaxtonBlock constructor
* Dev - Now using ES6 for JS scripting

Version 0.7.0
* 2018-06-04
* New - Field section supported
* New - Field template supported, %s in tpl replaced with value
* New - Icon picker field
* New - Alignment toolbars support
* New - Super hero block
* New - Super text block
* New - Super button block
* New - Super icon block
* New - Improved editor support for `Full width`
* Tweak - Caxton posts grid responsive
* Fix - Bug which causes issues while editing multiple blocks

Version 0.5.0
* 2018-04-10
* New - Hero template
* New - 2 col hero template
* New - Social share icons
* Fix - Posts grid not working

Version 0.1.2.1
* 02-02-2018
* Tweak - Query only public posts in posts endpoint, Thanks again Ov3rfly :)
* Tweak - Posts endpoint - Disallowed setting password, permissions and cache parameters

Version 0.1.1
* 01-02-2018
* Tweak - Securing posts endpoint Thanks Ov3rfly :)

Version 0.1.0
THIS IS BETA VERSION PLEASE BACKUP YOUR SITE BEFORE TESTING THIS PLUGIN