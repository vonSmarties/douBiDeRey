<!DOCTYPE html>
<html lang="fr">

<head>
    <title>Calendrier</title>
    <meta charset="utf-8">
    <link rel="icon" type="image/png" href="asset/dbdr2blackdd.jpg" />
    <link rel="stylesheet" href="css/menu.css">
    <link rel="stylesheet" href="css/calendar.css">
    <link rel="stylesheet" href="css/event.css">
</head>

<body>
    <?php
    require_once('menu.php');
    getMenu("Calendrier");
    ?>
    <main class="calendar main">
            <div class="reactContainer" id="calendar"></div>
    </main>
    <!-- <script type="module" src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script type="module" src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script> -->
    <script type="module" src="js/calendar.js"></script>
</body>

</html>