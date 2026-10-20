
<?php
require_once("task02.php");

function dynamic_body(): string {
    $page = $_GET["page"] ?? "";

    if (!is_string($page)) {
        return "<p>Unknown page</p>";
    }

    return render_body($page);
}
