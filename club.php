<!DOCTYPE html>
<html lang="fr">

<head>
    <title>Le club</title>
    <meta charset="utf-8">
    <link rel="icon" type="image/png" href="asset/dbdr2blackdd.jpg" />
    <link rel="stylesheet" href="css/menu.css">
    <link rel="stylesheet" href="css/board.css">
    <link rel="stylesheet" href="css/cardMember.css">
</head>

<body>
    <?php
    require_once('menu.php');
    getMenu("Le club");
    ?>
    <div class="backgroundLogo"></div>
    <main class="main firstSection">
        <section>
            <h2>Nous trouver</h2>
            <div class="rowClub">
                <div class="colClub addressClub">
                    <p>LES MARCHEURS DOU BI DE REY</p>
                    <p>Maison pour tous</p>
                    <p>11 Rue Jean Moulin</p>
                    <p>64110 Jurançon</p>
                </div class="colClub">
                <img class="colClub imgClub" src="asset/DSC0514-V2.jpg" alt="Maison pour tous">
            </div>
        </section>
        <section>
            <h2>Dou Bi De Rey ?</h2>
            <div class="rowClub">
                <img class="colClub imgClub" src="asset/Yuransoû-1.jpg" alt="Maison pour tous">
                <div class="colClub">
                    <p>Dou Bi De Rey, en Béarnais (le vin du roi) et Rey Dous Bis (le roi du vin), est la devise de la vile Jurançon, qui se trouve sur le fronton de l'hôtel de ville.</p>
                    <p>Le club à été fondé le 2 octobre 1992 par M. Jacques Lartiguet, Président pendant 5 ans, M. André Ramier et M.Paul Bibé lui ont succédé jusqu'à 2005. Actuellement le responsable est M. Henri Lamarque.</p>
                    <p>La Mairie met à notre disposition la grande salle de la Maison Pour Tous, rue Jean Moulin, pour les départs et les arrivées des différentes marches.</p>
                </div class="colClub">
            </div>
        </section>
        <section>
            <h2>Le bureau</h2>
            <div class="reactContainer" id="board"></div>
        </section>
    </main>
    <!-- <script type="module" src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script> -->
    <!-- <script type="module" src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script> -->
    <script type="module" src="js/board.js"></script>
</body>

</html>