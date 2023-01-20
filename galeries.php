<!DOCTYPE html>
<html lang="fr">

<head>
    <title>Galeries</title>
    <meta charset="utf-8">
    <link rel="icon" type="image/png" href="asset/dbdr2blackdd.jpg" />
    <link rel="stylesheet" href="css/modalGallery.css">
    <link rel="stylesheet" href="css/menu.css">
    <link rel="stylesheet" href="css/galleries.css">
</head>

<body>
    <?php
    require_once('menu.php');
    getMenu("Galeries");
    ?>
    <div class="backgroundLogo"></div>
    <section class="galleries main">
        <div class="reactContainer" id="galleries"></div>
    </section>
    <!-- <script type="module" src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script type="module" src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script> -->
    <script type="module" src="js/Galleries.js"></script>
</body>

</html>