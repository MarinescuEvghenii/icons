<!DOCTYPE html>
<html>
<head>
	<title>icons</title>
	<link rel="stylesheet" type="text/css" href="styles.css">

	<style type="text/css">
		body {
			margin: 0;
			padding: 0;
			font-family: "Helvetica", sans-serif;
			background: #FAFAFA;
		}
		ul {
			padding: 0 0 50px 0;
			margin: 0;
			list-style: none;
			font-size: 0;
			margin: 0 auto;
			width: 750px;
			display: -webkit-flex;
			display: flex;
			-webkit-flex-wrap: wrap;
			flex-wrap: wrap;
		}

		ul li {
			text-align: center;
			padding: 10px;
			margin: 2px;
			font-size: 14px;
			vertical-align: top;
			border-radius: 6px;
			background: #efefef;
			width: 1%;
            min-width: 90px;
            -webkit-flex: 1 1 auto;
            flex: 1 1 auto;
		}

		i {
			border: 1px dashed #999;
    		border-radius: 3px;
		}

		span {
			margin-top: 5px;
			display: block;
		}

		h1 {
			text-align: center;
		}
	</style>
</head>
<body>
<h1>SVG Icon Pack</h1>
<ul>
	<% _.forEach(icons, function(filename) { %>
	<li>
		<i class="icon icon-<%- filename.split(".")[0] %>"></i>
		<span>.icon .icon-<%- filename.split(".")[0] %></span>
	</li>
	<% _.forEach(colors, function(color, key) { %>
	<li>
		<i class="icon icon-<%- filename.split(".")[0] %>-<%- key %>"></i>
		<span>.icon .icon-<%- filename.split(".")[0] %>-<%- key %></span>
	</li>
	<% }); %>
	<% }); %>
</ul>
</body>
</html>
