<?php
function getMenu($title)
{
    echo "<header>
    <h1 class='titleHeader'>" . $title . "</h1>
    <input id='menu-toggle' type='checkbox' />
    <label class='menu-button-container' for='menu-toggle'>
        <div class='menu-button'></div>
    </label>
    <div class='generalMenu'>
        <a href='index.php'>
            <div class='itemMenu'>Accueil</div>
        </a>
        <a href='galeries.php'>
            <div class='itemMenu'>Galeries</div>
        </a>
        <a href='informations.php'>
            <div class='itemMenu'>Informations</div>
        </a>
        <a href='calendar.php'>
            <div class='itemMenu'>Calendrier</div>
        </a>
        <a href='club.php'>
            <div class='itemMenu'>Le club</div>
        </a>
        <div class='titleMenu'>Nos amis</div>
        <a href='https://www.ville-jurancon.fr/' target='_blank'>
            <div class='itemMenu'>ville de Jurançon</div>
        </a>
        <a href='https://www.audax-uaf.com/' target='_blank'>
            <div class='itemMenu'>Audax UAF</div>
        </a>
        <div class='titleMenu'>Nous rejoindre</div>
        <div class='textMenu'>inscription@doubiderey.fr</div>
        <img class='logo' alt='marcheurs Dou bi de Rey' src='https://www.marcheurs-dou-bi-de-rey.fr/doubiderey/asset/marcheurs-Dou-bi-de-Rey.jpg'></img>
    </div>
</header>";
}
