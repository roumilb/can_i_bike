<template>
	<div id="full_page_loader"
		 align="center"
		 justify="center">
		<logo
				:width="100"
				:height="50"></logo>
	</div>
</template>

<script>
    import logo from './logo';

    export default {
        components: {
            logo,
        },
    };
</script>

<style>
	#full_page_loader{
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background-color: white;
		z-index: 110;
		align-items: center;
		display: flex;
	}

	#full_page_loader path{
		stroke-dasharray: 200;
		animation: dash 3.5s linear infinite;
		fill: none;
		stroke: #343434;
	}

	#full_page_loader .bike-container{
		width: 100%;
	}

	@keyframes dash{
		to{
			stroke-dashoffset: 5000;
		}
	}
</style>