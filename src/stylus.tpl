.icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    background-size: contain;

    <% _.forEach(icons, function(filename) { %>
    &-<%- filename.split(".")[0] %> {
        background-image: url(svg("<%- filename %>"));
        <% _.forEach(colors, function(color, key) { %>
        &-<%- key %> {
            background-image: url(svg("<%- filename %>", <%- color %>));
        }
        <% }); %>
    }
    <% }); %>
}
