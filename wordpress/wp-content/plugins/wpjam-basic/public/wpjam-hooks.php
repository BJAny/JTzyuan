<?php
class WPJAM_Hook{
	public static function init(){
		if(wpjam_basic_get_setting('disable_trackbacks')){
			$GLOBALS['wp']->remove_query_var('tb');
		}

		if(wpjam_basic_get_setting('disable_post_embed')){ 
			$GLOBALS['wp']->remove_query_var('embed');
		}

		if(wpjam_basic_get_setting('remove_post_tag')){
			unregister_taxonomy_for_object_type('post_tag', 'post');
		}
	}

	public static function on_admin_bar_menu($wp_admin_bar){
		remove_action('admin_bar_menu',	'wp_admin_bar_wp_menu', 10);

		if($admin_logo = wpjam_custom_get_setting('admin_logo')){
			$title	= '<img src="'.wpjam_get_thumbnail($admin_logo, 40, 40).'" style="height:20px; padding:6px 0;">';
		}else{
			$title	= '<span class="ab-icon"></span>';
		}

		$wp_admin_bar->add_menu([
			'id'    => 'wp-logo',
			'title' => $title,
			'href'  => is_admin() ? self_admin_url() : site_url(),
			'meta'  => ['title'=>get_bloginfo('name')]
		]);
	}

	public static function filter_schedules($schedules){
		return array_merge($schedules, [
			'five_minutes'		=> ['interval'=>300,	'display'=>'每5分钟一次'],
			'fifteen_minutes'	=> ['interval'=>900,	'display'=>'每15分钟一次'],
		]);
	}

	public static function filter_admin_footer_text($text){
		return wpjam_custom_get_setting('admin_footer') ?: '<span id="footer-thankyou">感谢使用<a href="https://cn.wordpress.org/" target="_blank">WordPress</a>进行创作。</span> | <a href="https://wpjam.com/" title="WordPress JAM" target="_blank">WordPress JAM</a>';
	}

	public static function on_custom(){
		echo wpjam_custom_get_setting(current_action());

		if(wpjam_basic_get_setting('optimized_by_wpjam') && current_action() == 'wp_footer'){
			echo '<p id="optimized_by_wpjam_basic">Optimized by <a href="https://blog.wpjam.com/project/wpjam-basic/">WPJAM Basic</a>。</p>';
		}
	}

	public static function filter_login_headerurl($login_header_url){
		return home_url();
	}

	public static function filter_login_redirect($redirect_to, $request){
		return $request ?: (wpjam_custom_get_setting('login_redirect') ?: $redirect_to);
	}

	public static function filter_login_display_language_dropdown($status){
		return wpjam_custom_get_setting('disable_language_switcher') ? false : $status;
	}

	public static function timestamp_file_name($file){
		if(wpjam_basic_get_setting('timestamp_file_name')){
			return array_merge($file, ['name'=> time().'-'.$file['name']]);
		}

		return $file;
	}

	public static function filter_admin_title($admin_title){
		return str_replace(' &#8212; WordPress', '', $admin_title);
	}

	public static function filter_update_attachment_metadata($data){
		if(isset($data['thumb'])){
			$data['thumb'] = basename($data['thumb']);
		}

		return $data;
	}

	public static function filter_register_post_type_args($args, $post_type){
		if(!empty($args['supports']) && is_array($args['supports'])){
			foreach(['trackbacks'=>'disable_trackbacks', 'revisions'=>'disable_revision'] as $support => $setting_name){
				if(wpjam_basic_get_setting($setting_name, 1) && in_array($support, $args['supports'])){
					$args['supports']	= array_diff($args['supports'], [$support]);

					remove_post_type_support($post_type, $support);	// create_initial_post_types 会执行两次
				}
			}
		}

		return $args;
	}

	public static function filter_pre_term_link($term_link, $term){
		if($term->taxonomy == wpjam_basic_get_setting('no_category_base')){
			return '%'.$term->taxonomy.'%';
		}

		return $term_link;
	}

	public static function filter_request($query_vars){
		if($taxonomy = wpjam_basic_get_setting('no_category_base')){
			if(!isset($query_vars['module']) 
				&& !isset($_GET['page_id']) 
				&& !isset($_GET['pagename']) 
				&& !empty($query_vars['pagename'])
			){
				$pagename	= wp_basename(strtolower($query_vars['pagename']));
				
				$term_slugs	= get_categories([
					'taxonomy'		=> $taxonomy,
					'hide_empty'	=> false,
					'fields'		=> 'slugs'
				]);

				if($term_slugs && in_array($pagename, $term_slugs)){
					unset($query_vars['pagename']);

					if($taxonomy == 'category'){
						$query_vars['category_name']	= $pagename;
					}else{
						$query_vars['taxonomy']	= $taxonomy;
						$query_vars['term']		= $pagename;
					}
				}
			}
		}

		return $query_vars;
	}

	public static function on_template_redirect(){
		if(is_feed()){
			// 屏蔽站点 Feed
			if(wpjam_basic_get_setting('disable_feed')){
				wp_die('Feed已经关闭, 请访问<a href="'.get_bloginfo('url').'">网站首页</a>！', 'Feed关闭'	, 200);
			}
		}elseif($taxonomy = wpjam_basic_get_setting('no_category_base')){
			// 开启去掉URL中category，跳转到 no base 的 link
			if((is_category() && $taxonomy == 'category') || is_tax($taxonomy)){
				if(strpos($_SERVER['REQUEST_URI'], '/'.$taxonomy.'/') !== false){
					wp_redirect(site_url(str_replace('/'.$taxonomy, '', $_SERVER['REQUEST_URI'])), 301);
					exit;
				}
			}
		}		
	}

	public static function filter_old_slug_redirect_post_id($post_id){
		if(empty($post_id) && wpjam_basic_get_setting('404_optimization')){
			if($post = WPJAM_Post::find_by_name(get_query_var('name'), get_query_var('post_type'))){
				$post_id	= $post->ID;
			}
		}

		return $post_id;
	}

	public static function filter_get_the_excerpt($text='', $post=null){
		if(empty($text)){
			if($optimization = wpjam_basic_get_setting('excerpt_optimization')){ 
				remove_filter('get_the_excerpt', 'wp_trim_excerpt');

				if($optimization != 2){
					remove_filter('the_excerpt', 'wp_filter_content_tags');
					remove_filter('the_excerpt', 'shortcode_unautop');

					$length	= wpjam_basic_get_setting('excerpt_length') ?: 200;	
					$text	= wpjam_get_post_excerpt($post, $length);
				}
			}	
		}

		return $text;
	}
}

add_action('init',	['WPJAM_Hook', 'init'], 0);

add_filter('register_post_type_args',	['WPJAM_Hook', 'filter_register_post_type_args'], 10, 2);

add_action('template_redirect',	['WPJAM_Hook', 'on_template_redirect']);

add_filter('cron_schedules',	['WPJAM_Hook', 'filter_schedules']);

// 修正任意文件删除漏洞
add_filter('wp_update_attachment_metadata', ['WPJAM_Hook', 'filter_update_attachment_metadata']);

// 解决日志改变 post type 之后跳转错误的问题，
// WP 原始解决函数 'wp_old_slug_redirect' 和 'redirect_canonical'
add_filter('old_slug_redirect_post_id',	['WPJAM_Hook', 'filter_old_slug_redirect_post_id']);

// 防止重名造成大量的 SQL 请求
add_filter('wp_handle_sideload_prefilter',	['WPJAM_Hook', 'timestamp_file_name']);
add_filter('wp_handle_upload_prefilter',	['WPJAM_Hook', 'timestamp_file_name']);

// 去掉URL中category
add_filter('request',		['WPJAM_Hook', 'filter_request']);
add_filter('pre_term_link',	['WPJAM_Hook', 'filter_pre_term_link'], 1, 2);

// 优化文章摘要
add_filter('get_the_excerpt',	['WPJAM_Hook', 'filter_get_the_excerpt'], 9, 2);

add_action('admin_bar_menu',	['WPJAM_Hook', 'on_admin_bar_menu'], 1);

if(is_admin()){
	add_action('admin_head',		['WPJAM_Hook', 'on_custom']);
	add_filter('admin_title', 		['WPJAM_Hook', 'filter_admin_title']);
	add_filter('admin_footer_text',	['WPJAM_Hook', 'filter_admin_footer_text']);
}elseif(wpjam_is_login()){
	add_filter('login_headerurl',	['WPJAM_Hook', 'filter_login_headerurl']);
	add_filter('login_headertext',	'get_bloginfo');

	add_action('login_head', 		['WPJAM_Hook', 'on_custom']);
	add_action('login_footer',		['WPJAM_Hook', 'on_custom']);
	add_filter('login_redirect',	['WPJAM_Hook', 'filter_login_redirect'], 10, 2);
	add_filter('login_display_language_dropdown',	['WPJAM_Hook', 'filter_login_display_language_dropdown']);
}else{
	add_action('wp_head',	['WPJAM_Hook', 'on_custom'], 1);
	add_action('wp_footer', ['WPJAM_Hook', 'on_custom'], 99);
}

add_action('wp_loaded', function(){
	ob_start(function ($html){
		return apply_filters('wpjam_html', $html);
	});
});

//移除 WP_Head 无关紧要的代码
if(wpjam_basic_get_setting('remove_head_links', 1)){
	remove_action( 'wp_head', 'wp_generator');					//删除 head 中的 WP 版本号
	foreach (['rss2_head', 'commentsrss2_head', 'rss_head', 'rdf_header', 'atom_head', 'comments_atom_head', 'opml_head', 'app_head'] as $action) {
		remove_action( $action, 'the_generator' );
	}

	remove_action( 'wp_head', 'rsd_link' );						//删除 head 中的 RSD LINK
	remove_action( 'wp_head', 'wlwmanifest_link' );				//删除 head 中的 Windows Live Writer 的适配器？ 

	remove_action( 'wp_head', 'feed_links_extra', 3 );			//删除 head 中的 Feed 相关的link
	//remove_action( 'wp_head', 'feed_links', 2 );	

	remove_action( 'wp_head', 'index_rel_link' );				//删除 head 中首页，上级，开始，相连的日志链接
	remove_action( 'wp_head', 'parent_post_rel_link', 10); 
	remove_action( 'wp_head', 'start_post_rel_link', 10); 
	remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10);

	remove_action( 'wp_head', 'wp_shortlink_wp_head', 10, 0 );	//删除 head 中的 shortlink
	remove_action( 'wp_head', 'rest_output_link_wp_head', 10);	//删除头部输出 WP RSET API 地址

	remove_action( 'template_redirect',	'wp_shortlink_header', 11);		//禁止短链接 Header 标签。	
	remove_action( 'template_redirect',	'rest_output_link_header', 11);	//禁止输出 Header Link 标签。
}

//让用户自己决定是否书写正确的 WordPress
if(wpjam_basic_get_setting('remove_capital_P_dangit', 1)){
	remove_filter( 'the_content', 'capital_P_dangit', 11 );
	remove_filter( 'the_title', 'capital_P_dangit', 11 );
	remove_filter( 'wp_title', 'capital_P_dangit', 11 );
	remove_filter( 'document_title', 'capital_P_dangit', 11 );
	remove_filter( 'comment_text', 'capital_P_dangit', 31 );
	remove_filter( 'widget_text_content', 'capital_P_dangit', 11 );
}

// 屏蔽字符转码
if(wpjam_basic_get_setting('disable_texturize', 1)){
	add_filter('run_wptexturize', '__return_false');
}

//移除 admin bar
if(wpjam_basic_get_setting('remove_admin_bar')){
	add_filter('show_admin_bar', '__return_false');
}

//禁用 XML-RPC 接口
if(wpjam_basic_get_setting('disable_xml_rpc')){
	// if(wpjam_basic_get_setting('disable_block_editor')){
		add_filter('xmlrpc_enabled', '__return_false');
		add_filter('xmlrpc_methods', '__return_empty_array');
		remove_action('xmlrpc_rsd_apis', 'rest_output_rsd');
	// }
}

// 屏蔽古腾堡编辑器
if(wpjam_basic_get_setting('disable_block_editor')){
	remove_action('wp_enqueue_scripts', 'wp_common_block_scripts_and_styles');
	remove_action('admin_enqueue_scripts', 'wp_common_block_scripts_and_styles');
	remove_filter('the_content', 'do_blocks', 9);
}

// 屏蔽站点管理员邮箱验证功能
if(wpjam_basic_get_setting('disable_admin_email_check')){
	add_filter('admin_email_check_interval', '__return_false');
}

// 屏蔽 Emoji
if(wpjam_basic_get_setting('disable_emoji', 1)){  
	remove_action('admin_print_scripts','print_emoji_detection_script');
	remove_action('admin_print_styles',	'print_emoji_styles');

	remove_action('wp_head',			'print_emoji_detection_script',	7);
	remove_action('wp_print_styles',	'print_emoji_styles');

	remove_action('embed_head',			'print_emoji_detection_script');

	remove_filter('the_content_feed',	'wp_staticize_emoji');
	remove_filter('comment_text_rss',	'wp_staticize_emoji');
	remove_filter('wp_mail',			'wp_staticize_emoji_for_email');

	add_filter('emoji_svg_url',		'__return_false');

	add_filter('tiny_mce_plugins',	function($plugins){ 
		return array_diff($plugins, ['wpemoji']); 
	});
}

//禁用文章修订功能
if(wpjam_basic_get_setting('disable_revision', 1)){
	if(!defined('WP_POST_REVISIONS')){
		define('WP_POST_REVISIONS', false);
	}
	
	remove_action('pre_post_update', 'wp_save_post_revision');
}

// 屏蔽Trackbacks
if(wpjam_basic_get_setting('disable_trackbacks', 1)){
	if(!wpjam_basic_get_setting('disable_xml_rpc')){
		//彻底关闭 pingback
		add_filter('xmlrpc_methods', function($methods){
			return array_merge($methods, [
				'pingback.ping'						=> '__return_false',
				'pingback.extensions.getPingbacks'	=> '__return_false'
			]);
		});
	}

	//禁用 pingbacks, enclosures, trackbacks 
	remove_action('do_pings', 'do_all_pings', 10);

	//去掉 _encloseme 和 do_ping 操作。
	remove_action('publish_post','_publish_post_hook',5);
}

//禁用 Auto OEmbed
if(wpjam_basic_get_setting('disable_autoembed')){ 
	remove_filter('the_content',			[$GLOBALS['wp_embed'], 'autoembed'], 8);
	remove_filter('widget_text_content',	[$GLOBALS['wp_embed'], 'autoembed'], 8);
	remove_filter('widget_block_content',	[$GLOBALS['wp_embed'], 'autoembed'], 8);
}

// 屏蔽文章Embed
if(wpjam_basic_get_setting('disable_post_embed')){
	remove_action('wp_head', 'wp_oembed_add_discovery_links');
	remove_action('wp_head', 'wp_oembed_add_host_js');
}

// 屏蔽自动更新和更新检查作业
if(wpjam_basic_get_setting('disable_auto_update')){  
	add_filter('automatic_updater_disabled', '__return_true');

	remove_action('init', 'wp_schedule_update_checks');
	remove_action('wp_version_check', 'wp_version_check');
	remove_action('wp_update_plugins', 'wp_update_plugins');
	remove_action('wp_update_themes', 'wp_update_themes');
}

add_action('send_headers', function($wp){
	if($x_frame_options = wpjam_basic_get_setting('x-frame-options')){
		header('X-Frame-Options: '.$x_frame_options);
	}
});

// 屏蔽后台隐私
if(wpjam_basic_get_setting('disable_privacy', 1)){
	remove_action('user_request_action_confirmed', '_wp_privacy_account_request_confirmed');
	remove_action('user_request_action_confirmed', '_wp_privacy_send_request_confirmation_notification', 12);
	remove_action('wp_privacy_personal_data_exporters', 'wp_register_comment_personal_data_exporter');
	remove_action('wp_privacy_personal_data_exporters', 'wp_register_media_personal_data_exporter');
	remove_action('wp_privacy_personal_data_exporters', 'wp_register_user_personal_data_exporter', 1);
	remove_action('wp_privacy_personal_data_erasers', 'wp_register_comment_personal_data_eraser');
	remove_action('init', 'wp_schedule_delete_old_privacy_export_files');
	remove_action('wp_privacy_delete_old_export_files', 'wp_privacy_delete_old_export_files');

	add_filter('option_wp_page_for_privacy_policy', '__return_zero');
}

if(is_admin()){
	if(wpjam_basic_get_setting('disable_auto_update')){
		remove_action('admin_init', '_maybe_update_core');
		remove_action('admin_init', '_maybe_update_plugins');
		remove_action('admin_init', '_maybe_update_themes');
	}

	if(wpjam_basic_get_setting('remove_help_tabs')){  
		add_action('in_admin_header', function(){
			$GLOBALS['current_screen']->remove_help_tabs();
		});
	}

	if(wpjam_basic_get_setting('disable_block_editor')){
		add_filter('use_block_editor_for_post_type', '__return_false');
	}

	if(wpjam_basic_get_setting('remove_screen_options')){  
		add_filter('screen_options_show_screen', '__return_false');
		add_filter('hidden_columns', '__return_empty_array');
	}

	if(wpjam_basic_get_setting('disable_privacy', 1)){
		add_action('admin_menu', function(){
			remove_submenu_page('options-general.php', 'options-privacy.php');
			remove_submenu_page('tools.php', 'export-personal-data.php');
			remove_submenu_page('tools.php', 'erase-personal-data.php');
		}, 11);

		add_action('admin_init', function(){
			remove_action('admin_init', ['WP_Privacy_Policy_Content', 'text_change_check'], 100);
			remove_action('edit_form_after_title', ['WP_Privacy_Policy_Content', 'notice']);
			remove_action('admin_init', ['WP_Privacy_Policy_Content', 'add_suggested_content'], 1);
			remove_action('post_updated', ['WP_Privacy_Policy_Content', '_policy_page_updated']);
			remove_filter('list_pages', '_wp_privacy_settings_filter_draft_page_titles', 10, 2);
		}, 1);
	}
}