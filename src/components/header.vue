  <template>
    <header class="header">
      <div class="logo-container">
      <HardHat class="brand-icon" />
      <h2 class="logo-text">System <span>EPI</span></h2>
      </div>

      
        <div class="user-container">
          <router-link to="/login" class="user-icon">
            <span class="icon-placeholder">LOGIN</span>
          </router-link>
        </div>
    
    </header>
  </template>

<script setup lang="ts">
import { HardHat } from 'lucide-vue-next'
</script>

  <style scoped>

.header {
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 z-index: 3;
 display: flex;
 align-items: center;
 justify-content: space-between;
 padding: 20px 40px;
  }


.logo-container {
 display: flex;
 align-items: center;
 gap: 6px;
 margin-left: -25px;

}

.brand-icon {
 width: 34px;
 height: 34px;
 color: #ffc107;
 
}

.logo-text {
  font-size: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.logo-text span {
  color: #ffffff;
  margin-left: -3px;
}

  .user-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }

  .user-icon {
    background-color:#f5b301;
    width: 100px;
    height: 43px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-family: 'inter', sans-serif;
    font-weight: 300;
    text-decoration: none;
    color: white;

  }


  </style>