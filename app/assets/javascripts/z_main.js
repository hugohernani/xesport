$(document).ready(function(){

	"use strict";

	// jQuery tooltips
	$('#top-navigation ul.social li a, .widget ul.social-subscribers li a').tooltip();


	/* Highlight posts */
	$('#highlight-posts ul li a').hover(
	function() {
		$(this).parent().children('.masked-color').show();
		$(this).parent().children('.masked-base').hide();
	},
	function() {
		$(this).parent().children('.masked-base').show();
		$(this).parent().children('.masked-color').hide();
	});
	/* End Highlight posts */


	/* jQuery slider */
	// Highlight posts image rotate
	$('#highlight-posts .flexslider.highlight-one').flexslider({ controlNav: false, directionNav: false, slideshowSpeed: 10000, start: function(){ $('#highlight-posts .flexslider.highlight-one').removeClass('loading'); }});
	$('#highlight-posts .flexslider.highlight-two').flexslider({ controlNav: false, directionNav: false, slideshowSpeed: 3500, start: function(){ $('#highlight-posts .flexslider.highlight-two').removeClass('loading'); }});
	$('#highlight-posts .flexslider.highlight-three').flexslider({ controlNav: false, directionNav: false, slideshowSpeed: 8000, start: function(){ $('#highlight-posts .flexslider.highlight-three').removeClass('loading'); }});
	$('#highlight-posts .flexslider.highlight-four').flexslider({ controlNav: false, directionNav: false, slideshowSpeed: 6000, start: function(){ $('#highlight-posts .flexslider.highlight-four').removeClass('loading'); }});

	// Homepage thumb slider
	$('#home-slider.home-slider .flexslider.home-slider-carousel').flexslider({
		animation: "slide",
		controlNav: false,
		directionNav: false,
		animationLoop: false,
		slideshow: false,
		itemWidth: 1,
		asNavFor: '#home-slider.home-slider .flexslider.home-slider-gallery'
	});

	// Homepage slider
	$('#home-slider.home-slider .flexslider.home-slider-gallery').flexslider({
		animationSpeed: 1000,
		controlNav: false,
		sync: "#home-slider.home-slider .flexslider.home-slider-carousel",
		start: function() { $('#home-slider.home-slider .flexslider.home-slider-gallery').removeClass('loading'); }
    });

	// Homepage slider 2
	$('#home-slider.home-slider2 .flexslider').flexslider({
		animationSpeed: 1000,
		start: function() { $('#home-slider.home-slider2 .flexslider').removeClass('loading'); }
    });

	// Homepage thumb slider 3
	$('#home-slider.home-slider3 .flexslider.home-slider3-carousel').flexslider({
		animation: "slide",
		controlNav: false,
		directionNav: false,
		animationLoop: false,
		slideshow: false,
		itemWidth: 1,
		asNavFor: '#home-slider.home-slider3 .flexslider.home-slider3-gallery'
    });

	// Homepage slider 3
	$('#home-slider.home-slider3 .flexslider.home-slider3-gallery').flexslider({
		animationSpeed: 1000,
		controlNav: false,
		sync: "#home-slider.home-slider3 .flexslider.home-slider3-carousel",
		start: function() { $('#home-slider.home-slider3 .flexslider.home-slider3-gallery').removeClass('loading'); }
    });

	// Single gallery thumb slider
	$('#main .flexslider.slider-carousel').flexslider({
		animation: "slide",
		controlNav: false,
		animationLoop: false,
		slideshow: false,
		itemWidth: 120,
		asNavFor: '#main .flexslider.slider-gallery'
	});

	// Single gallery slider
	$('#main .flexslider.slider-gallery').flexslider({
		animationSpeed: 1000,
		animationLoop: false,
		slideshow: false,
		controlNav: false,
		sync: "#main .flexslider.slider-carousel",
		start: function(){ $('#main .flexslider.slider-gallery').removeClass('loading'); }
    });

	// General slider
	$('#main .flexslider, #sidebar .flexslider').flexslider({
		animationSpeed: 1000,
		animationLoop: false,
		slideshow: false,
		start: function() { $('#main .flexslider, #sidebar .flexslider').removeClass('loading'); }
    });
	/* End jQuery slider */


	/* Twitter integration */
	$.ajax({ // Twitter integration (JSON format) with AJAX
		url: 'http://api.twitter.com/1/statuses/user_timeline.json/',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			screen_name:'envato', // Your twitter username
			include_rts:true,
			count:2,
			include_entities:true
		},
		success: function(tweet) {
			$(".widget .tweets ul").hide();

			var id			= 0;
			var tweet_num		= tweet.length;
			var tweet_text	= "";

			while(id < tweet_num) {
				tweet_text	+= '<li><span class="picons"><!-- --></span><p>' + JQTWEET.ify.clean(tweet[id].text) + '</p><span class="date">- ' +  JQTWEET.timeAgo(tweet[id].created_at) + '</span></li>';
				id++;
			}

			$(".widget .tweets ul").html(tweet_text);
			$(".widget .tweets ul").hide().fadeIn(1000);
		}
	});

	var JQTWEET = { // Twitter data format function
		timeAgo: function(dateString) { // twitter date string format function
			var rightNow = new Date();
			var then = new Date(dateString);

			if ($.browser.msie) {
				// IE can't parse these crazy Ruby dates
				then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
			}

			var diff = rightNow - then;
			var second = 1000,
			minute = second * 60,
			hour = minute * 60,
			day = hour * 24;

			if (isNaN(diff) || diff < 0) { return ""; }
			if (diff < second * 2) { return "right now"; }
			if (diff < minute) { return Math.floor(diff / second) + " seconds ago"; }
			if (diff < minute * 2) { return "1 minute ago"; }
			if (diff < hour) { return Math.floor(diff / minute) + " minutes ago"; }
			if (diff < hour * 2) { return "1 hour ago"; }
			if (diff < day) { return  Math.floor(diff / hour) + " hours ago"; }
			if (diff > day && diff < day * 2) { return "1 day ago"; }
			if (diff < day * 365) { return Math.floor(diff / day) + " days ago"; }
			else { return "over a year ago"; }
		}, // timeAgo()

		ify: {
			link: function(tweet) { // twitter link string replace function
				return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
					var http = m2.match(/w/) ? 'http://' : '';
					return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
				});
			},

			at: function(tweet) { // twitter at (@) character format function
				return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
					return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
				});
			},

			list: function(tweet) { // twitter list string format function
				return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
					return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
				});
			},

			hash: function(tweet) { // twitter hash (#) string format function
				return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
					return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
				});
			},

			clean: function(tweet) { // twitter clean all string format function
				return this.hash(this.at(this.list(this.link(tweet))));
			}
		} // ify
	};
	/* End twitter integration */


	/* Email subcribe process */
	$("#enews-subscribe-form input[type='text']").on('focus keypress',function(){ // Checking subcribe form when focus event
		var email = $(this).val();
		if (email === "Please enter your email address...." || email === "Please enter a valid email address...." || email === "Subscribe process completed...." || email === "Email is already registered....") {
			$(this).val('').css({'backgroundColor':'#FFF'});
		}
	});

	$("#enews-subscribe-form").submit(function(){ // Checking subcribe form when submit to database
		var email = $("#enews-subscribe-form input[type='text']").val();
		var email_pattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
		if (email_pattern.test(email) === false) {
			$("#enews-subscribe-form input[type='text']").val('Please enter a valid email address....').css({'backgroundColor':'#ffb2b2'});
		} else {
			var submitData = $(this).serialize();
			$("#enews-subscribe-form input[type='text']").attr('disabled','disabled');
			$("#enews-subscribe-form input[type='submit']").attr('disabled','disabled');
			$.ajax({ // Subcribe process with AJAX
				type: "POST",
				url: "subcribe.php",
				data: submitData + "&action=add",
				dataType: "html",
				success: function(msg){
					if (parseInt(msg, 0) !== 0) {
						var msg_splits = msg.split("|");

						if (msg_splits[0] === 'success') {
							$("#enews-subscribe-form input[type='submit']").removeAttr('disabled');
							$("#enews-subscribe-form input[type='text']").removeAttr('disabled').val(msg_splits[1]).css({'backgroundColor':'#a5ffa5'});
							} else {
							$("#enews-subscribe-form input[type='submit']").removeAttr('disabled');
							$("#enews-subscribe-form input[type='text']").removeAttr('disabled').val(msg_splits[1]).css({'backgroundColor':'#ffb2b2'});
							}
						}
					}
				});
			}
		return false;
	});
	/* End email subcribe process */


	/* Contact us process */
	$("#enews-contact-form").submit(function() {
		var submitData = $('#enews-contact-form').serialize();
		$("#enews-contact-form input[name='name']").attr('disabled','disabled');
		$("#enews-contact-form input[name='email']").attr('disabled','disabled');
		$("#enews-contact-form input[name='subject']").attr('disabled','disabled');
		$("#enews-contact-form textarea[name='message']").attr('disabled','disabled');
		$("#enews-contact-form input[name='submit']").attr('disabled','disabled');
		$("#enews-contact-form .data-status").show().html('<div class="alert alert-info"><strong>Loading...</strong></div>');
		$.ajax({ // Send an offer process with AJAX
			type: "POST",
			url: "contact.php",
			data: submitData + "&action=add",
			dataType: "html",
			success: function(msg){
				if (parseInt(msg, 0) !== 0) {
					var msg_splits = msg.split("|");
					if (msg_splits[0] === "success") {
						$("#enews-contact-form input[name='name']").val('').removeAttr('disabled');
						$("#enews-contact-form input[name='email']").val('').removeAttr('disabled');
						$("#enews-contact-form input[name='subject']").val('').removeAttr('disabled');
						$("#enews-contact-form textarea[name='message']").val('').removeAttr('disabled');
						$("#enews-contact-form input[name='submit']").removeAttr('disabled');
						$("#enews-contact-form .data-status").html(msg_splits[1]).fadeIn();
					} else {
						$("#enews-contact-form input[name='name']").removeAttr('disabled');
						$("#enews-contact-form input[name='email']").removeAttr('disabled');
						$("#enews-contact-form input[name='subject']").removeAttr('disabled');
						$("#enews-contact-form textarea[name='message']").removeAttr('disabled');
						$("#enews-contact-form input[name='submit']").removeAttr('disabled');
						$("#enews-contact-form .data-status").html(msg_splits[1]).fadeIn();
					}
					}
				}
		});
		return false;
	});
	/* End contact us process */


	// Headline news text rotator
	$(".headlines .text-rotator").show().ticker({ rate: 50, delay: 5000 }).trigger("play");

	// Responsive video object
	$("body").fitVids();

	// Pretty Photo for image gallery modal popup
	$("a[data-rel^='prettyPhoto']").prettyPhoto({
		social_tools:false,
		theme:'light_square',
		hook:'data-rel'
	});


	/* Responsive menu */
	$('#top-navigation ul.nav-menu').mobileMenu({ // Create a top navigation menu for the responsive navigation
		defaultText:'Please select one option....',
		className:'select-top-nav',
		subMenuDash:'&mdash;'
	});

	$('#main-navigation > ul').mobileMenu({ // Create a main navigation menu for the responsive navigation
		defaultText: 'Please select one option....',
		className: 'slect-main-nav',
		subMenuDash: '&mdash;'
	});

	$("#top-navigation select, #main-navigation select").change(function() { // Make the drop-down work
		window.location = $(this).find("option:selected").val();
	});
	/* End responsive menu */


	// Portofolio filter
	$(window).load(function(){
        var $container          = $('.portofolio .portofolio-items');
        var $filter             = $('.portofolio .portofolio-filter');

		// Initialize
        $container.isotope({
            filter              :'*',
            layoutMode          :'fitRows',
            animationOptions    : {
				duration:400
			}
        });

        // Trigger item lists filter when link clicked
        $filter.find('a').click(function() {
            var selector = $(this).attr('data-filter');
            $filter.find('a').removeClass('active');
            $(this).addClass('active');
            $container.isotope({
                filter             :selector,
                animationOptions   : {
					animationDuration:400,
					queue:false
				}
            });
            return false;
        });
    });

	// jQuery placeholder for IE
	$("input, textarea").placeholder();


	/* Back to top scroll */
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) { $('.scrollup').slideDown(); } else { $('.scrollup').slideUp(); }
	});
	$('.scrollup').click(function(){
		$("html, body").stop().animate({ scrollTop: 0 }, 2000, 'easeInOutExpo');
		return false;
	});
	/* End Back to top scroll */


	// Flickr gallery
	$('.widget #flickr-gallery').jflickrfeed({
		limit:12,
		qstrings: {
			id:'36587311@N08' // Your flickr id
		},
		itemTemplate: '<li class="photo">' + '<a href="{{image_b}}" target="_blank"><img src="{{image_s}}" alt="{{title}}" /></a>' + '</li>'
	});

	// Image preloader
	$("#main.image-preloader figure > img, #main.image-preloader figure.figure-overlay img, #main.image-preloader figure.figure-hover img, #main.image-preloader p img, #main.image-preloader div > a > img").lazyload({
		placeholder: "assets/grey.gif",
		effect: "fadeIn"
	});


	/* Customizer */
	$("#customize h5").click(function() {
		$("#customize .wrapper").slideToggle();
	});

	$("#customize .colors a").click(function(e) {
		var $color = $(this).attr('class');
		$('head').append('<link rel="stylesheet" type="text/css" href="assets/customizer/'+ $color +'.css">');
		$('#header .logo img').attr('src', 'assets/customizer/' + $color + '/logo.png');
		e.preventDefault();
	});
	/* End customizer */


	/* Figure overlay & hover */
	$('figure.figure-hover').hover( // Figure hover effect
		function() { $(this).children(".figure-hover-masked").fadeIn();	},
		function() { $(this).children(".figure-hover-masked").fadeOut(); }
	);

	$('figure.figure-overlay').each(function() { $(this).hoverdir({ // Figure overlay effect
			hoverParent: $(this).children('a'),
			hoverElement:  $(this).children('a').children('div').children('p')
		});
	});
	/* End figure overlay & hover */

});
