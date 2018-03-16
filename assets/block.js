/**
 * Plugin front end scripts
 *
 * @package Caxton
 * @version 1.0.0
 */
(function ($, blocks, el, withAPIData, i18n) {
        var
            registerBlockType = blocks.registerBlockType,
            InspectorControls = blocks.InspectorControls,
            __ = i18n.__;

        CaxtonBlock({
            id: 'hero',
            title: 'Hero section',
            icon: 'archive',
            tpl:
            '<div class="cover bg-center" style="background-image:url([Background image]);[Background parallax]">' +
            '<div class="pv4 min-h-7 dt w-100 center-mid-children [Dim image][Full width][Full height]">' +
            '<div class="tc white ph3 ph4-l[Text position]">' +
            '<h2 style="color:[Title color];font-size:[Title size]px">[Title]</h2>' +
            '<div style="padding: 1em 0;color:[Sub-title color];font-size:[Sub-title size]px">[Sub-title]</div>' +
            '<a href="[Button Link]" class="button" ' +
            'style="color:[Button text color];background:[Button background color];font-size:[Button size]px">' +
            '[Call to action button]</a></div></div></div>',
            fields: {
                'Background image': {
                    type: 'image',
                    default: ''
                },
                'Dim image': {
                    type: 'radio',
                    options: [
                        {value: ' bg-white-50', label: 'Lighter',},
                        {value: ' bg-white-30', label: 'Light',},
                        {value: '', label: "Don't dim",},
                        {value: ' bg-black-20', label: 'Dark',},
                        {value: ' bg-black-40', label: 'Darker',},
                    ],
                    default: ' bg-black-20',
                },
                'Text position': {
                    type: 'radio',
                    options: [
                        {value: ' mba', label: 'Top',},
                        {value: ' mva', label: 'Center',},
                        {value: ' mta', label: 'Bottom',},
                    ],
                    default: ' mva',
                },
                'Background parallax': {
                    type: 'checkbox',
                    value: 'background-attachment:fixed;',
                },
                'Full width': {
                    type: 'checkbox',
                    value: ' vw-100',
                },
                'Full height': {
                    type: 'checkbox',
                    value: ' min-vh-100',
                },
                'Title': {
                    type: 'editable',
                    default: 'Click here to edit title'
                },
                'Title color': {
                    type: 'color',
                    default: '#fff'
                },
                'Title size': {
                    type: 'range',
                    default: '20'
                },
                'Sub-title': {
                    type: 'editable',
                    default: 'Edit sub-title'
                },
                'Sub-title color': {
                    type: 'color',
                    default: '#fff'
                },
                'Sub-title size': {
                    type: 'range',
                    default: '16'
                },
                'Call to action button': {
                    type: 'editable',
                    default: 'Button'
                },
                'Button Link': {
                    type: 'range',
                    default: '16'
                },
                'Button size': {
                    type: 'range',
                    default: '16'
                },
                'Button text color': {
                    type: 'color',
                    default: '#444'
                },
                'Button background color': {
                    type: 'color',
                    default: '#eee'
                },
            },
        });

        CaxtonBlock({
            id: 'hero-2-col',
            title: 'Hero - 2 columns',
            icon: '<svg enable-background="new 0 0 475.082 475.082" version="1.1" viewBox="0 0 475.08 475.08" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m461.67 31.691c-8.949-8.945-19.698-13.417-32.265-13.417h-383.72c-12.562 0-23.317 4.471-32.264 13.417-8.945 8.947-13.418 19.698-13.418 32.261v347.17c0 12.566 4.473 23.318 13.418 32.264 8.947 8.946 19.701 13.419 32.264 13.419h383.72c12.566 0 23.315-4.473 32.265-13.419 8.945-8.945 13.415-19.697 13.415-32.264v-347.17c0-12.563-4.47-23.314-13.415-32.261zm-242.4 388.58h-173.59c-2.474 0-4.615-0.907-6.423-2.707-1.809-1.811-2.712-3.949-2.712-6.427v-319.76h182.72v328.9zm219.26-9.141c0 2.478-0.903 4.62-2.71 6.427-1.813 1.807-3.949 2.71-6.427 2.71h-173.59v-328.9h182.73v319.76h-6e-3z"/></svg>',
            tpl:
            '<div class="cover bg-center" style="background-image:url([Background image]);[Background parallax]">' +
            '<div class="dt w-100 center-mid-children [Full width]">' +
            '<div class="min-h-7 p4 tc white ph3 ph4-l center-mid-children [Content width][Content position][Dim image behind content][Full height]">' +
            '<h2 style="color:[Title color];font-size:[Title size]px">[Title]</h2>' +
            '<div style="padding: 1em 0;color:[Sub-title color];font-size:[Sub-title size]px">[Sub-title]</div>' +
            '<a href="[Button Link]" class="button" ' +
            'style="color:[Button text color];background:[Button background color];font-size:[Button size]px">' +
            '[Call to action button]</a></div></div></div>',
            fields: {
                'Background image': {
                    type: 'image',
                    default: ''
                },
                'Dim image behind content': {
                    type: 'radio',
                    options: [
											{value: ' bg-white-90', label: 'Lighter',},
                      {value: ' bg-white-70', label: 'Light',},
                      {value: '', label: "Don't dim",},
											{value: ' bg-black-50', label: 'Dark',},
											{value: ' bg-black-70', label: 'Darker',},
                    ],
                    default: ' bg-white-70',
                },
                'Content position': {
                    type: 'radio',
                    options: [
                        {value: ' mra', label: 'Left',},
                        {value: ' mla', label: 'Right',},
                    ],
                    default: ' mra',
                },
                'Content width': {
                    type: 'radio',
                    options: [
                        {value: 'w-100 w-auto-l w-auto-m', label: 'Fit content',},
                        {value: 'w-100 w-30-l w-50-m', label: 'Small',},
                        {value: 'w-100 w-50-l w-70-m', label: 'Large',},
                    ],
                    default: 'w-100 w-auto-l w-auto-m',
                },
                'Background parallax': {
                    type: 'checkbox',
                    value: 'background-attachment:fixed;',
                },
                'Full width': {
                    type: 'checkbox',
                    value: ' vw-100',
                },
                'Full height': {
                    type: 'checkbox',
                    value: ' min-vh-100',
                },
                'Title': {
                    type: 'editable',
                    default: 'Click here to edit title'
                },
                'Title color': {
                    type: 'color',
                    default: '#232324'
                },
                'Title size': {
                    type: 'range',
                    default: '20'
                },
                'Sub-title': {
                    type: 'editable',
                    default: 'Edit sub-title'
                },
                'Sub-title color': {
                    type: 'color',
                    default: '#232324'
                },
                'Sub-title size': {
                    type: 'range',
                    default: '16'
                },
                'Call to action button': {
                    type: 'editable',
                    default: 'Button'
                },
                'Button Link': {
                    type: 'range',
                    default: '16'
                },
                'Button size': {
                    type: 'range',
                    default: '16'
                },
                'Button text color': {
                    type: 'color',
                    default: '#444'
                },
                'Button background color': {
                    type: 'color',
                    default: '#eee'
                },
            },
        });

        CaxtonBlock({
            id: 'social-share-icons',
            title: 'Social share icons',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M15.117 0H.883C.395 0 0 .395 0 .883v14.234c0 .488.395.883.883.883h7.663V9.804H6.46V7.39h2.086V5.607c0-2.066 1.262-3.19 3.106-3.19.883 0 1.642.064 1.863.094v2.16h-1.28c-1 0-1.195.476-1.195 1.176v1.54h2.39l-.31 2.416h-2.08V16h4.077c.488 0 .883-.395.883-.883V.883C16 .395 15.605 0 15.117 0" fill-rule="nonzero"/></svg>',
            tpl:
            '<div class="pv4 ph2 [All caps] tc-l">\n' +
            '<a class="no-underline white-80 hover-white inline-flex items-center ma2 tc [Buttons style] pa2" href="https://www.facebook.com/sharer/sharer.php?u=[Share URL]" title="Facebook" style="background-color:#3b5998">' +
            '<svg class="dib h2 w2" enable-background="new 0 0 470.513 470.513" version="1.1" viewBox="0 0 470.51 470.51" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m271.52 154.17v-40.541c0-6.086 0.28-10.8 0.849-14.13 0.567-3.335 1.857-6.615 3.859-9.853 1.999-3.236 5.236-5.47 9.706-6.708 4.476-1.24 10.424-1.858 17.85-1.858h40.539v-81.08h-64.809c-37.5 0-64.433 8.897-80.803 26.691-16.368 17.798-24.551 44.014-24.551 78.658v48.82h-48.542v81.086h48.539v235.26h97.362v-235.26h64.805l8.566-81.086h-73.37z"/></svg>' +
            '<span class="f6 ml2">Facebook</span>' +
            '</a>' +
            '<a class="no-underline white-80 hover-white inline-flex items-center ma2 tc [Buttons style] [All caps] pa2" href="http://pinterest.com/pin/create/bookmarklet/?media=&url=[Share URL]" title="Pinterest" style="background-color:#bd081c">' +
            '<svg class="dib h2 w2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title id="simpleicons-pinterest-icon">Pinterest icon</title><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>' +
            '<span class="f6 ml2">Pinterest</span>' +
            '</a>' +
            '<a class="no-underline white-80 hover-white inline-flex items-center ma2 tc [Buttons style] [All caps] pa2" href="http://twitter.com/share?url=[Share URL]" title="Twitter" style="background-color:#1da1f2">' +
            '<svg class="dib h2 w2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M16 3.038c-.59.26-1.22.437-1.885.517.677-.407 1.198-1.05 1.443-1.816-.634.375-1.337.648-2.085.795-.598-.638-1.45-1.036-2.396-1.036-1.812 0-3.282 1.468-3.282 3.28 0 .258.03.51.085.75C5.152 5.39 2.733 4.084 1.114 2.1.83 2.583.67 3.147.67 3.75c0 1.14.58 2.143 1.46 2.732-.538-.017-1.045-.165-1.487-.41v.04c0 1.59 1.13 2.918 2.633 3.22-.276.074-.566.114-.865.114-.21 0-.416-.02-.617-.058.418 1.304 1.63 2.253 3.067 2.28-1.124.88-2.54 1.404-4.077 1.404-.265 0-.526-.015-.783-.045 1.453.93 3.178 1.474 5.032 1.474 6.038 0 9.34-5 9.34-9.338 0-.143-.004-.284-.01-.425.64-.463 1.198-1.04 1.638-1.7z" fill-rule="nonzero"/></svg>' +
            '<span class="f6 ml2">Twitter</span>' +
            '</a>' +
            '<a class="no-underline white-80 hover-white inline-flex items-center ma2 tc [Buttons style] [All caps] pa2" href="mailto:?body=[Share URL]" title="Mail" style="background-color:#ea4335">' +
            '<svg class="dib h2 w2" fill="currentColor" enable-background="new 0 0 511.626 511.626" version="1.1" viewBox="0 0 511.63 511.63" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m49.106 178.73c6.472 4.567 25.981 18.131 58.528 40.685 32.548 22.554 57.482 39.92 74.803 52.099 1.903 1.335 5.946 4.237 12.131 8.71 6.186 4.476 11.326 8.093 15.416 10.852 4.093 2.758 9.041 5.852 14.849 9.277 5.806 3.422 11.279 5.996 16.418 7.7 5.14 1.718 9.898 2.569 14.275 2.569h0.575c4.377 0 9.137-0.852 14.277-2.569 5.137-1.704 10.615-4.281 16.416-7.7 5.804-3.429 10.752-6.52 14.845-9.277 4.093-2.759 9.229-6.376 15.417-10.852 6.184-4.477 10.232-7.375 12.135-8.71 17.508-12.179 62.051-43.11 133.62-92.79 13.894-9.703 25.502-21.411 34.827-35.116 9.332-13.699 13.993-28.07 13.993-43.105 0-12.564-4.523-23.319-13.565-32.264-9.041-8.947-19.749-13.418-32.117-13.418h-420.26c-14.655 0-25.933 4.948-33.832 14.844-7.898 9.898-11.847 22.27-11.847 37.115 0 11.991 5.236 24.985 15.703 38.974 10.466 13.99 21.604 24.983 33.403 32.976z"/><path d="m483.07 209.28c-62.424 42.251-109.82 75.087-142.18 98.501-10.849 7.991-19.65 14.229-26.409 18.699-6.759 4.473-15.748 9.041-26.98 13.702-11.228 4.668-21.692 6.995-31.401 6.995h-0.578c-9.707 0-20.177-2.327-31.405-6.995-11.228-4.661-20.223-9.229-26.98-13.702-6.755-4.47-15.559-10.708-26.407-18.699-25.697-18.842-72.995-51.68-141.9-98.501-10.852-7.228-20.464-15.513-28.839-24.838v226.68c0 12.57 4.471 23.319 13.418 32.265 8.945 8.949 19.701 13.422 32.264 13.422h420.27c12.56 0 23.315-4.473 32.261-13.422 8.949-8.949 13.418-19.694 13.418-32.265v-226.68c-8.186 9.132-17.7 17.417-28.555 24.838z"/></svg>' +
            '<span class="f6 ml2">Mail</span>' +
            '</a>' +
            '</ul>',
            fields: {
                'Share URL': {
                    type: 'text',
                    default: ''
                },
                'All caps': {
                    type: 'checkbox',
                    value: 'ttu',
                },
                'Buttons style': {
                    type: 'radio',
                    options: [
                        {value: 'br0', label: 'Boxed corners',},
                        {value: 'br3', label: "Rounded corners",},
                        {value: 'ph3 br-pill', label: 'Pill',},
                    ],
                    default: 'br2',
                },
            },
        });

        registerBlockType(
            'caxton/posts-grid',
            {
                title: 'Posts grid',
                icon: 'screenoptions',
                category: 'widgets',

                attributes: {
                    cat: {
                        type: 'string',
                    },
                    order: {
                        type: 'string',
                    },
                    imagesType: {
                        type: 'string',
                    },
                    displayPostWithoutImages: {
                        type: 'boolean',
                    },
                    displayDate: {
                        type: 'boolean',
                    },
                    displayExcerpt: {
                        type: 'boolean',
                    },
                    displayMeta: {
                        type: 'boolean',
                    },
                    titleBelowImage: {
                        type: 'boolean',
                    },
                    titleSize: {
                        type: 'number',
                    },
                    rows: {
                        type: 'number',
                    },
                    columns: {
                        type: 'number',
                    },
                },
                edit: withAPIData(function (props) {
                    var attrs = $.extend({
                        cat: [],
                        order: 'date/desc',
                        rows: 4,
                        columns: 2,
                    }, props.attributes);

                    var
                        order = attrs.order.split('/'),
                        url =
                            '/caxton/v1/posts' +
                            '?posts_per_page=' + (attrs.rows * attrs.columns) +
                            '&post__not_in=' + caxton.post +
                            '&cat=' + attrs.cat +
                            ( attrs.displayPostWithoutImages ? '&meta_key=' : '' ) +
                            '&orderby=' + order[0] +
                            '&order=' + order[1];
                    return {posts: url};
                })(function (props) {
                    var attrs = $.extend({
                        cat: '',
                        order: 'date/desc',
                        rows: 4,
                        columns: 2,
                        titleSize: 20,
                    }, props.attributes);

                    var post, gridInfo,
                        commentIcon = '<span class="fa fa-comments"></span>',
                        authorIcon = '<span class="fa fa-user-circle-o"></span>',
                        grids = [],
                        focus = props.focus,
                        className = props.className + ' ' + props.name.replace('/', '-') + ' caxton-grid';

                    className += ' caxton-' + attrs.imagesType + '-images';

                    if (attrs.titleBelowImage) {
                        className += ' caxton-title-below-image';
                    }


                    if (!props.posts.data) {
                        grids.push(el('div', {className: 'caxton-notification',}, 'Loading posts...'));
                    } else if (props.posts.data.length === 0) {
                        grids.push(el('div', {className: 'caxton-notification',}, 'No posts match criteria.'));
                    } else {
                        for (var i = 0; i < props.posts.data.length; i++) {
                            post = props.posts.data[i];

                            function postMetaMarkup() {
                                if (attrs.displayMeta) {
                                    return {__html: '<span class="author">' + authorIcon + post.author + '</span><span class="comments">' + commentIcon + ' ' + post.comments + '</span>'};
                                } else {
                                    return {__html: ''};
                                }
                            };
                            gridInfo = [
                                el('a', {className: 'grid-link', href: '#',},
                                    el('div', {
                                            className: 'grid-image',
                                            style: {backgroundImage: 'url(' + post.thumb_ml + ')'},
                                        },
                                        el('h3', {
                                            className: 'grid-title',
                                            style: {fontSize: attrs.titleSize},
                                        }, post.title),
                                    ),
                                )
                            ];

                            gridInfo.push(el('h3', {
                                className: 'grid-title',
                                style: {fontSize: attrs.titleSize},
                            }, post.title));

                            if (attrs.displayDate) {
                                gridInfo.push(el('time', {}, post.date));
                            }

                            if (attrs.displayExcerpt) {
                                gridInfo.push(el('p', {}, post.excerpt));
                            }

                            gridInfo.push(el('div', {
                                className: 'grid-meta',
                                dangerouslySetInnerHTML: postMetaMarkup()
                            },),);

                            grids.push(
                                el(
                                    'div',
                                    {
                                        className: 'grid-item',
                                        style: {width: ( 100 / attrs.columns - 2 ) + '%'}
                                    },
                                    gridInfo
                                )
                            );
                        }
                    }
                    return [
                        !!focus && el(
                            InspectorControls,
                            {key: 'inspector'},
                            el(
                                InspectorControls.SelectControl,
                                {
                                    label: 'Category',
                                    value: attrs.cat,
                                    options: caxton.postCategories,
                                    onChange: function (val) {
                                        props.setAttributes({cat: val});
                                    }
                                }
                            ),
                            el(
                                InspectorControls.SelectControl,
                                {
                                    label: 'Order',
                                    value: attrs.order,
                                    options: [
                                        {label: __('Newest to Oldest'), value: 'date/desc',},
                                        {label: __('Oldest to Newest'), value: 'date/asc',},
                                        {label: __('A → Z'), value: 'title/asc',},
                                        {label: __('Z → A'), value: 'title/desc',},
                                    ],
                                    onChange: function (val) {
                                        props.setAttributes({order: val});
                                    }
                                }
                            ),
                            el(
                                InspectorControls.SelectControl,
                                {
                                    label: 'Images shape',
                                    value: attrs.imagesType,
                                    options: [
                                        {label: __('Square'), value: '',},
                                        {label: __('Circle'), value: 'circle',},
                                        {label: __('Rectangle'), value: 'rectangle',},
                                    ],
                                    onChange: function (val) {
                                        props.setAttributes({imagesType: val});
                                    }
                                }
                            ),
                            el(
                                InspectorControls.ToggleControl,
                                {
                                    label: 'Include posts without image',
                                    checked: attrs.displayPostWithoutImages,
                                    onChange: function (val) {
                                        if (val.target) {
                                            props.setAttributes({displayPostWithoutImages: val.target.checked});
                                        } else {
                                            props.setAttributes({displayPostWithoutImages: val});
                                        }
                                    }
                                }
                            ),
                            el(
                                InspectorControls.ToggleControl,
                                {
                                    label: 'Display post date',
                                    checked: attrs.displayDate,
                                    onChange: function (val) {
                                        if (val.target) {
                                            props.setAttributes({displayDate: val.target.checked});
                                        } else {
                                            props.setAttributes({displayDate: val});
                                        }
                                    }
                                }
                            ),
                            el(
                                InspectorControls.ToggleControl,
                                {
                                    label: 'Display post meta',
                                    checked: attrs.displayMeta,
                                    onChange: function (val) {
                                        if (val.target) {
                                            props.setAttributes({displayMeta: val.target.checked});
                                        } else {
                                            props.setAttributes({displayMeta: val});
                                        }
                                    }
                                }
                            ),
                            el(
                                InspectorControls.ToggleControl,
                                {
                                    label: 'Display post excerpt',
                                    checked: attrs.displayExcerpt,
                                    onChange: function (val) {
                                        if (val.target) {
                                            props.setAttributes({displayExcerpt: val.target.checked});
                                        } else {
                                            props.setAttributes({displayExcerpt: val});
                                        }
                                    }
                                }
                            ),
                            el(
                                InspectorControls.ToggleControl,
                                {
                                    label: 'Show title below image',
                                    checked: attrs.titleBelowImage,
                                    onChange: function (val) {
                                        if (val.target) {
                                            props.setAttributes({titleBelowImage: val.target.checked});
                                        } else {
                                            props.setAttributes({titleBelowImage: val});
                                        }
                                    }
                                }
                            ),
                            el(
                                InspectorControls.RangeControl,
                                {
                                    label: 'Title size',
                                    value: attrs.titleSize,
                                    onChange: function (val) {
                                        props.setAttributes({titleSize: val});
                                    },
                                    min: 10,
                                    max: 50,
                                }
                            ),
                            el(
                                InspectorControls.RangeControl,
                                {
                                    label: 'Post columns',
                                    value: attrs.columns,
                                    onChange: function (val) {
                                        props.setAttributes({columns: val});
                                    },
                                    min: 1,
                                    max: 5,
                                }
                            ),
                            el(
                                InspectorControls.RangeControl,
                                {
                                    label: 'Post rows',
                                    value: attrs.rows,
                                    onChange: function (val) {
                                        props.setAttributes({rows: val});
                                    },
                                    min: 1,
                                    max: 20,
                                }
                            )
                        ),
                        el('div', {className: className}, grids)
                    ];
                }),

                save: function () {
                    // Rendering in PHP
                    return null;
                },
            }
        );

    })(jQuery, wp.blocks, wp.element.createElement, wp.components.withAPIData, window.wp.i18n);
