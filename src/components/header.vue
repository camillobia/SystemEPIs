<template>
  <header class="header">
    <div class="logo-container">
      <div class="logo-icon">
        <img src="../assets/logo_icone.png" alt="Logo da Empresa" />
      </div>
      <h2 class="logo-text"
      >System<span class="EPI">EPI</span>
    </h2>
          </div>

    <div class="right-group">
        <div class="Funcionalidades">
          <h2>Funcionalidades</h2>
          </div>
      <div class="Sobre">
        <h2>Sobre</h2>
      </div>
      <div class="Contato">
        <h2>Contato</h2>
      </div>
    </div>
      <div class="user-container">
        <router-link to="/login" class="user-icon">
          <span class="icon-placeholder">LOGIN</span>
        </router-link>
      </div>
   
  </header>
</template>
<script setup>
//import imageIcon from '../assets/logo empresa.png'
</script>

<style scoped>
.right-group {
  display: flex;
  align-items: center;
  gap: 58px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 30px;
}
.header {
  display: flex;
  grid-template-columns: 1fr auto 1fr;
  align-items: center  ;
  padding: 20px 40px;
  background-color: #e8e8ee;
  justify-content: space-between;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo-icon {
  border-radius: 16%;
  width: 120px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center; 
}

.logo-icon img {
  width: 40px;
  height: 42px;
  position: absolute;
  top: 5px;
  left:10px;
  transform: rotate(-12deg);
}

.logo-text {
  position: absolute;
  top: 30px;
  left:31px;
  font-size: 2rem;
  font-family: Poppins, sans-serif;
  font-weight: semi-bold;
   margin: 0;
  color:#0E2238;
  .EPI {
    color: #F5B301;
    margin-left:4px;  
  }
}

.user-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-icon {
  background-color: #0E2238;
  width: 92px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  font-family: poppins, sans-serif;

}

.Contato {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 0;
  font-family: poppins, sans-serif;
  font-size: 10px;
  color: #0E2238;
}

.Sobre {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 0;
  font-family: poppins, sans-serif;
  font-size: 10px;
  color: #0E2238;
}

.Funcionalidades {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 0;
  font-family: poppins, sans-serif;
  font-size: 10px;
  color: #0E2238;
}

</style>