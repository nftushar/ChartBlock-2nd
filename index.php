<?php
/**
 * Plugin Name: Pei Chart
 * Description: Pei Chart Gutenberg plugin: Streamline Gutenberg editing with easy-to-use, responsive pie-chart  and more..
 * Version: 1.0.0
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: pie-chart
 */
// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }
 
// Constant
define( 'B_BLOCKS_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.7.8' );
define( 'B_BLOCKS_DIR_URL', plugin_dir_url( __FILE__ ) );

require_once plugin_dir_path( __FILE__ ) . 'inc/block.php';

class PieChartPlugin{
    function __construct(){
        add_filter( 'upload_mimes', [$this, 'uploadMimes'] );
        if ( version_compare( $GLOBALS['wp_version'], '5.1' ) >= 0 ) {
			add_filter( 'wp_check_filetype_and_ext', [$this, 'wpCheckFiletypeAndExt'], 10, 5 );
		} else { add_filter( 'wp_check_filetype_and_ext', [$this, 'wpCheckFiletypeAndExt'], 10, 4 ); }
    }

    function uploadMimes( $mimes ) {
        $mimes['xml'] = 'application/rss+xml';
        $mimes['json'] = 'application/json';
    
        return $mimes;
    }
    function wpCheckFiletypeAndExt( $data, $file, $filename, $mimes, $real_mime=null ){
		// If file extension is 2 or more 
		$f_sp = explode( '.', $filename );
		$f_exp_count = count( $f_sp );

		if( $f_exp_count <= 1 ){
			return $data;
		}else{
			$f_name = $f_sp[0];
			$ext = $f_sp[$f_exp_count - 1];
		}

		if( $ext == 'xml' ){
			$type = 'application/rss+xml';
			$proper_filename = '';
			return compact('ext', 'type', 'proper_filename');
		}else if( $ext == 'json' ){
			$type = 'application/json';
			$proper_filename = '';
			return compact('ext', 'type', 'proper_filename');
		}else {
			return $data;
		}
	}
}
new PieChartPlugin;