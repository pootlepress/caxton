=== Caxton - Create Pro page layouts in Gutenberg ===

Contributors: pootlepress, shramee, jamie
Tags: gutenberg, gutenberg blocks, blocks, posts grid
Requires at least: 4.9.0
Tested up to: 5.9.1
Requires PHP: 5.6.0
Stable tag: 1.30.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Caxton bring to you super useful blocks which make your Gutenberg more and more powerful.

== Description ==

Caxton is a collection of awesome blocks that makes it easy for you to create beautiful WordPress pages
=======================================================================================================

Don’t just take our word for it. This is what Matt Mullenweg said...

Matt Mullenweg - WordPress founder
----------------------------------

> The sites people are creating with it are just gorgeous. It’s going to open up a level of creativity and expression for an audience that’s literally never had it. It’s like people are going to get new notes on a keyboard they can play, or a new voice they can sing with...
Source wptavern.com

We made a little video
----------------------

https://vimeo.com/311873183

Blocks included
---------------

* Advanced layout block
* Shape Dividers Block
* Posts grid Block
* Photo slider Block
* Call To Action Block
* Typography Block
* Icons Block
* Button Block

Functionality
-------------

* Add backgrounds to sections
* Create nested rows
* Create full width sections
* Create parallax rows
* Create beautiful transitions between Blocks
* Awesome customisation controls for each Block
* Advanced mobile controls

We’ve put together a live interactive site here where you can [test Caxton for yourself](http://demo.caxton.pro/).

See Matt Mullenweg feature Caxton Blocks at WordCamp US

https://www.youtube.com/watch?v=R0kZ8TbBr_Y&feature=youtu.be

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
4. Wave block divider
5. Tilt block divider
6. Book block divider
7. Book block divider on column

== Changelog ==

Version 1.30.0
* 2022-02-27
* Fix - Fix deprecated block_categories filter hook.
* Fix - FSE styles compatibility
* Tweak - FSE styles and scripts compatibility
* Tweak - Caxton block registration tweaks
* Tweak - Block editing UI controls tweaks

Version 1.27.0
* 2020-10-09
* Fix - Alignment toolbar not working
* Fix - Caxton layout UI
* Tweak - Editor UI enhancements
* Dev - New time field type
* Dev - Save all block attributes as text
* Dev - CaxtonLayoutOptionsBlock init function supports additional custom attributes
* Dev - Utility CSS classes

Version 1.26.0
* 2020-07-20
* Tweak - WP 5.5 compatibility
* Tweak - New .nowrap class
* Tweak - Layout options UI styles
* Dev - New number field
* Dev - Innerblocks min height inheriting improved

Version 1.25.0
* 2020-07-10
* New - Ordered select field (`orderedSelect`) now supports searching
* New - Ordered select field (`orderedSelect`) now supports drag and drop sorting
* New - Justify text option
* Fix - Button text colored like paragraphs
* Fix - Font Awesome v5 in Caxton breaking themes using v4
* Dev - Innerblocks now inherit min height

Version 1.24.0
* 2020-06-01
* Fix - Mobile layout settings not working

Version 1.23.0
* 2020-05-12
* Fix - Caxton block difficult to select (hover label not showing up)
* Internal - Wrapper props callback called after setting block attributes
* Tweak - New attribute `data-rwd` on body set to mobile, tablet or desktop

Version 1.22.0
* 2020-04-24
* New - Datepicker control `datetime` type.
* New - `CaxtonContentBlock` wrapper functions for innerblocks.
* Fix - Grid elements should inherit color in gutenberg.
* Fix - Google fonts not working (for fonts with space character).
* Tweak - Resizable and dynamic conflict resolved.
* Dev - Caxton.el to create react element.

Version 1.21.0
* 2020-03-16
* Fix - Block errors
* Tweak - Performance tweaks
* Tweak - WP 5.4 compatibility
* Dev - Resizable blocks support
* Dev - User Interaction JS

Version 1.20.0
* 2020-01-24
* Performance - Uses `svg` icons to just load the icons being used
* Performance - FlexSlider not loaded unless used on the page
* New - Flex block
* Fix - FlexSlider container not covering slides.
* Tweak - Gutenberg v7.2 compatibility
* Dev - New background field type

Version 1.10.0
* 2019-07-03
* Fix - Gutenberg 5.9.0 compatibility
* Tweak - Updated Font awesome

Version 1.9.0
* 2019-06-06
* New - 'Horizontal blocks beta' block
* Tweak - Updated FS SDK
* Tweak - New block type

Version 1.8.2.1
* 2019-02-27
* Tweak - Updated FS SDK

Version 1.8.2
* 2019-02-25
* Fix - Keep layout block grid responsive by default

Version 1.8.1
* 2019-02-11
* Fix - Fixing single column breaking layouts.

Version 1.8.0
* 2019-02-06
* Fix - MS Edge layout breaking.
* New - **Responsive layouts for Caxton Layout block**
* Tweak - Freemius SDK updated

Version 1.7.2.1
* 2018-12-17
* Tweak - Adding compatibility files

Version 1.7.2
* 2018-12-17
* New - Improved full width preview in Admin
* Fix - Twenty Nineteen compatibility
* Fix - Full width blocks not working in a few themes
* Tweak - Shape divider block improved compatibility

Version 1.7.1
* 2018-11-28
* Tweak - Bring back admin page for Freemius

Version 1.7.0
* 2018-11-28
* New - Shape divider block
* Tweak - UI improvements

Version 1.6.2
* 2018-11-21
* Fix - Gutenberg v4.5 Compatibility

Version 1.6.1
* 2018-11-14
* Fix - Gutenberg v4.3 Compatibility

Version 1.6.0
* 2018-11-09
* Fix - Gutenberg v4 Compatibility
* Minor block tweaks

Version 1.5.0
* 2018-10-01
* New - Caxton Layout block - Beautiful masonry layouts for Gutenberg without writing any code
* New - Caxton Section block - Beautiful masonry layouts for WordPress without writing any code.

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
* New - Icon picker field - Search and Pick any of the font awesome icons for Gutenberg
* New - Alignment toolbars support
* New - Super hero block - Full height hero, Full width hero, Full screen hero with custom gradients, gradient background
* New - Super text block - Fully customizable typography block, font, letter spacing, calligraphy
* New - Super button block - Fully customizable buttons, font, letter spacing, background and text color, calligraphy.
* New - Super icon block - Font awesome icons with customizable size, color, outline, shapes (circle/curved square/square)
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