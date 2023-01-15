<script setup>

import IconHome from '../icons/IconHome.vue';

</script>

<template>
    <div id="wrapper">
        <aside id="sidebar-wrapper">
            <div class="sidebar-brand">
                <h2>Logo</h2>
            </div>
            <ul class="sidebar-nav">
                <li>
                    <a href="#" class="text-decoration-none font-weight-light">
                        <template>
                            <IconHome />Home
                        </template>
                    </a>
                </li>
                <li>
                    <a href="#" class="text-decoration-none font-weight-light"><i class="fa fa-plug"></i>Explore</a>
                </li>
                <li>
                    <a href="#" class="text-decoration-none font-weight-light"><i class="fa fa-user"></i>Notifications</a>
                </li>
                <li>
                    <a href="#" class="text-decoration-none font-weight-light"><i class="fa fa-user"></i>Messages</a>
                </li>
                <li>
                    <a href="#" class="text-decoration-none font-weight-light"><i class="fa fa-user"></i>Bookmarks</a>
                </li>
                <li>
                    <a href="#" class="text-decoration-none font-weight-light"><i class="fa fa-user"></i>Lists</a>
                </li>
                <li>
                    <a href="#" class="text-decoration-none font-weight-light"><i class="fa fa-user"></i>Profile</a>
                </li>
                <li>
                    <a href="#" class="text-decoration-none font-weight-light"><i class="fa fa-user"></i>More</a>
                </li>
            </ul>
        </aside>
        <div id="navbar-wrapper">
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a href="#" class="navbar-brand" id="sidebar-toggle"><i class="fa fa-bars"></i></a>
                    </div>
                </div>
            </nav>
        </div>
        <section id="content-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h2 class="content-title">Test</h2>
                    <p>Lorem ipsum...</p>
                </div>
            </div>
        </section>
    </div>
</template>

<style>
ul {
    list-style-type: none;
}
a {
    color: #0f1419;
    font-size: 21px;
}
</style>

