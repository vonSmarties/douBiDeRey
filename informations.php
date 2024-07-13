<!DOCTYPE html>
<html lang="fr">

<head>
    <title>Informations</title>
    <meta charset="utf-8">
    <link rel="icon" type="image/png" href="asset/dbdr2blackdd.jpg" />
    <link rel="stylesheet" href="css/menu.css">
    <link href="css/snow.css" rel="stylesheet">
    <link rel="stylesheet" href="css/informations.css">
    <link rel="stylesheet" href="css/info.css">
</head>

<body>
    <?php
    require_once('menu.php');
    getMenu("Informations");
    ?>
    <main class="informations main">
        <div class="reactContainer" id="infos"></div>
    </main>
    <script>
        var informations = <?php
                            include_once 'api/class/InfoManager.php';

                            $infos = $infoManager->readAll();
                            $data = [];
                            if ($infos)
                                foreach ($infos as $info) {
                                    $data[] = $info->getJson();
                                }
                            echo (json_encode($data))
                            ?>
    </script>
    <!-- <script type="module" src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script type="module" src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script> -->
    <script type="module" src="js/Informations.js"></script>
</body>

</html>