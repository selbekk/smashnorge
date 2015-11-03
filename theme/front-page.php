<?php get_header(); ?>

<?php
query_posts('cat=1,3&showposts=3');
?>

    <div class="container">
        <section id="main-content" class="row">
            <article class="row cta-wrap">
                <div class="col-md-9">
                    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                        <div class="page-content">
                            <?php the_content(); ?>
                        </div>
                    <?php endwhile;
                    else : ?>
                        <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
                    <?php endif; ?>
                    <a href="index.php?page_id=17" class="btn btn-main-cta">Bli med!</a>
                </div>
            </article>
        </section>
    </div>

    <div class="container-fluid newsfeed">
        <section class="container">
            <div class="row">
                <div class="section news col-md-6">
                    <a href="#">
                        <div class="featured-picture-wrap">
                            <div class="featured-picture" style="background-image: url(http://fillmurray.com/g/100/100)"></div>
                        </div>
                        <div class="title">
                            <p><strong class="lead-in">siste</strong> Flikkflakk rykker opp på Smashrankingen!</p>
                        </div>
                        <div class="clearfix"></div>
                    </a>
                </div>
                <div class="section next-tournament col-md-6">
                    <a href="#" class="">
                        <div class="date">
                            <div class="day">21</div>
                            <div class="month">feb</div>
                        </div>
                        <div class="title">
                            <p>Octagon VII</p>
                        </div>
                        <div class="clearfix"></div>
                    </a>
                </div>
            </div>
        </section>
    </div>

    <div class="container hidden-xs">
        <article class="row actions">
            <div class="col-sm-4 action">
                <a href="index.php?page_id=19">
                    <div class="bg bg-cover bg-circle bg-tournaments"></div>
                    <h2>Turneringer</h2>
                </a>
            </div>
            <div class="col-sm-4 action">
                <a href="index.php?page_id=21">
                    <div class="bg bg-cover bg-circle bg-ranking"></div>
                    <h2>Ranking</h2>
                </a>
            </div>
            <div class="col-sm-4 action">
                <a href="#">
                    <div class="bg bg-cover bg-circle bg-news"></div>
                    <h2>Bloggen</h2>
                </a>
            </div>
        </article>
    </div>

    <div class="container-fluid fun-facts">
        <section class="container">
            <article class="row">
                <h1>Her er noen kjappe fakta om oss</h1>
                <div class="col-md-5">
                    <ul>
                        <li>
                            <h2>Vi er over 30 medlemmer!</h2>
                            <p>
                                <strong>Over 50 faktisk</strong>, ved siste telling. Det gjør oss til en av de største
                                Melee-klubbene i Europa! Om du har lyst til å bli kjent med en haug kule mennesker, kan
                                du <a href="/signup">melde deg inn til en veldig snill medlemspris à 50 kr!</a>
                            </p>
                        </li>
                        <li>
                            <h2>Vi arrangerer spillkvelder</h2>
                            <p>
                                <strong>I store deler av Norge faktisk!</strong> Fra Oslos slemme gater til Tromsdalens lyse netter
                                arrangerer vi åpne spillkvelder for alle Smash-bros. <a href="#">Sjekk kalenderen!</a>
                            </p>
                        </li>
                    </ul>
                </div>
                <div class="col-md-5 col-md-push-2">
                    <ul>
                        <li>
                            <h2>Vi har de beste referatene i Norge</h2>
                            <p>
                                <strong>Eller kanskje i hele verden?</strong> Alt vi vet er at vi kommenterer flest
                                kamper i hele Norge, med de beste kommentatorene på denne siden av Glomma.
                                <a href="#">Sjekk de nyeste referatene!</a>
                            </p>
                        </li>
                        <li>
                            <h2>Vi er entusiaster!</h2>
                            <p>
                                <strong>Det fører til et trygt miljø!</strong> Smash Norge er ledet av profesjonelle
                                spillere og entusiaster som jobber for å styrke Melee-miljøet i Norge. <a href="#">Les
                                    mer om oss her!</a>
                            </p>
                        </li>
                    </ul>
                </div>
            </article>
        </section>
    </div>


<?php get_footer(); ?>
