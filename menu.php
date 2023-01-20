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
        <a href='index'>
            <div class='itemMenu'>Accueil</div>
        </a>
        <a href='galeries'>
            <div class='itemMenu'>Galeries</div>
        </a>
        <a href='informations'>
            <div class='itemMenu'>Informations</div>
        </a>
        <a href='calendar'>
            <div class='itemMenu'>Calendrier</div>
        </a>
        <a href='club'>
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
    </div>
</header>";
}
