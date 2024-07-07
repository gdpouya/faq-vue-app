<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">FAQ</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/manage-categories" class="nav-link">مدیریت دسته‌بندی‌ها</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/manage-questions" class="nav-link">مدیریت سوالات</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/manage-labels" class="nav-link">مدیریت برچسب‌ها</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
</style>
