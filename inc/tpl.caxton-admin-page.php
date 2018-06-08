<?php
$disabled_blocks = get_option( 'caxton_disabled_block' );
?>
<style>
	.block {
		display: block;
		text-align: center;
		float: left;
		padding: 1em;
		margin: 1em;
		width: 140px;
		height: 140px;
		background: #fff;
		border: 1px solid #aaa;
		border-radius: 3px;
		box-sizing: border-box;
	}

	#blocks-toggle ~ .submit {
		text-align: center;
	}

	#blocks-toggle input[type='checkbox'] {
		display: none;
	}

	input:checked + .block {
		opacity: .5;
		background: #ccc;
	}

	.block h3 {
		font-weight: 300;
	}

	.icon svg,
	.icon span {
		width: 50px;
		height: 50px;
		font-size: 50px;
	}
</style>

<div class="wrap">
	<h1>Caxton blocks toggle</h1>
	<h3>Click the blocks below to turn them on/off in Gutenberg editor</h3>
	<form method="POST" action="options.php">
		<?php settings_fields( 'caxton_disabled_block' ); ?>

		<div id="blocks-toggle">
			<?php
			$blocks = stripslashes( get_option( 'caxton_all_locks', '{}' ) );
			$blocks = json_decode( $blocks, 'array' );

			foreach ( $blocks as $id => $block ) {
				?>
				<input name="caxton_disabled_block[<?php echo $id ?>]" id="caxton-disabled-block-<?php echo $id ?>"
							 class="block-toggle" type="checkbox"
							 value="<?php echo $id ?>" <?php checked( ! empty( $disabled_blocks[ $id ] ) ) ?>>
				<label class="block" for="caxton-disabled-block-<?php echo $id ?>">
					<div class="icon"><?php echo $block['icon'] ?></div>
					<h3><?php echo $block['title'] ?></h3>
				</label>
				<?php
			}
			?>
		</div>
		<div class="clear"></div>
		<?php submit_button(); ?>
	</form>
</div>