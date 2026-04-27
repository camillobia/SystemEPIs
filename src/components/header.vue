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
  gap: 40px;
}
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
  color: #0e2238;
  .EPI {
  color: #0e2238;

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

.Contato {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 9px;
  color: #ffffff;
}

.Sobre {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 9px;
  color: #ffffff;
}

.Funcionalidades {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 0;
  font-family:'Inter', sans-serif;
  font-weight: 600;
  font-size: 9px;
  color: #ffffff;
}

</style>