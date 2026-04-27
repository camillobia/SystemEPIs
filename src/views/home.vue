<template>                                                                        
 <div class="home">                                                               
  <section class="home__hero">   
    <Header />  
     <div class="home_texto-titulo">                                               <!-- lado esquerdo: título e descrição -->
      <h1>Controle e<br> Gestão de EPIs </h1>   
       <p>Controle estoque, entregas e validade <br> dos equipamentos de proteção em um único sistema.
        </p>
         <router-link to="/login" class="btn-hero">Começar agora</router-link>
          </div>                                  
           </section>
           <div class="indicadores">
            <div class="indicadores_item">
             <div class="indicadores_icone1">📦</div>
              <div class="indicadores_info">
               <span class="indicadores_valor">+1.000</span>
                 <span class="indicadores_texto">EPIs controlados</span>
                  </div>
                    </div>
              <div class="indicadores_item">
               <div class="indicadores_icone2">👥</div>
               <div class="indicadores_info">
               <span class="indicadores_valor">+200</span>
               <span class="indicadores_texto">Colaboradores Ativos</span>
                </div>
                 </div>
                 <div class="indicadores_item">
                  <div class="indicadores_icone3">🛡</div>
                   <div class="indicadores_info">
                    <span class="indicadores_valor">98%</span>
                      <span class="indicadores_texto">Conformidade</span>
                        </div>
                         </div>
               <div class="indicadores_item">
                <div class="indicadores_icone4">📊</div>
                 <div class="indicadores_info">
                  <span class="indicadores_valor">24h</span>
                    <span class="indicadores_texto">Relatórios em tempo real</span>
                     </div>
                      </div>
                       </div>
               <section class="home_texto2">
                <h2>Principais Funcionalidades</h2>
                     </section>
                <section class="home__cards">                                                  
                 <div class="cards-row">
                  <div class="card_controle">                                                              
                    <div>  
            <span class="card_icone">
             <img src="../assets/icone_card1.png" alt="icone package";>
              </span>                                      
               </div>
                <h2>Controle de Estoque</h2>
                 <p>Acompanhe em tempo real a quantidade de EPIs disponíveis e mantenha o estoque sempre organizado.
                  </p>
                   </div>                                                                      
 
        <div class="card_registro">
           <div>  
            <span class="card_icone">
                 <img src="../assets/icone_card2.png" alt="icone calendario";>
            </span>                                      
           </div>
          <h2>Registro de Entregas</h2>    
          <p>Registre e acompanhe a entrega de equipamento de proteção individual para cada colaborador</p>
          </div>
           <div class="card_gestao">                
           <div>  
            <span class="card_icone">
                 <img src="../assets/icone_card3.png" alt="icone boneco";>
            </span>                                      
           </div>
          <h2>Gestão de Usuários</h2>    
          <p>Cadastre colaboradores e gerencie permisões de acessoao sistema de gestão de EPIs
           </p>  
        </div>
      </div>
      <div class="card-segundo">      
        <div class="card_relatorios">                
           <div>  
            <span class="card_icone2">
                 <img src="../assets/icone_card4.png" alt="icone grafico">
            </span>                                      
           </div>
          <h2>Relatórios</h2>    
          <p>Visualize relatórios e dados importantes para acompanhar o uso e controles dos EPIs
           </p>
           </div>
           <div class="card_rastreabilidade">
            <span class="card_icone3">
            <img src="../assets/icone_card5.png" alt="icone rastreabilidade">
            </span>                                      
          <h2>Rastreabilidade</h2>    
          <p>Visualize relatórios e dados importantes para acompanhar o uso e controles dos EPIs
           </p>
           </div>
           </div>                                                              
    </section>
  </div>                                                                          
  <Footer/>
</template>                                                                        
<script setup>
import Header from '../components/header.vue';
import Footer from '../components/footer.vue';
</script>
 
<style scoped>  
 
 .home {    
   background: #eef2f7;
}
 
.home__hero {
 display: flex;
 align-items: center;
 min-height: 95vh;
 background-image: url('../assets/landing_page2.png');
 background-size: cover;
 background-position: center;
 background-repeat: no-repeat;
 position: relative;
 overflow: hidden;
 padding: 50px 0 65px 2rem;
 margin-bottom:2rem;
 padding-top:60px;
}
                      
.home__hero::before {
  content: "";
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
 inset: 0;
 z-index: 1;
}
 
.home__hero::after {
 position: absolute;
  width: 950px;
  height: 280px;
  background: rgba(190,210,230,0.18);
  right: -120px;
  border-radius: 80px;
 
}
 
.home_texto-titulo {
  font-size: 1.9rem;
  font-family:poppins, sans-serif;
  font-weight: semi-bold;
  text-align: left;
  color: #fff4ed;
  margin-left: 6rem;
  position: relative;
  z-index: 2;

}
 
.home_texto-titulo p {
  font-size: 1.25rem;
}
              
 
.home__hero-texto p {
  font-size: 1.25rem;                                                                
  color: #555;                                                                    
  line-height: 1.7;                                                              
}
 
 .btn-hero {
  display: inline-block;
  margin-top: 25px;
  background: #f5b301;
  color: white;
  padding: 17px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  text-decoration: none;
}

.indicadores {
  max-width: 72rem;          
  margin: 53px auto;        
  padding: 40px 35px;
  background: #f6f6f6;      
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.indicadores_item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.indicadores_icone1 {
  width: 50px;
  height: 50px;
  background: #f5b4016f;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.indicadores_icone2 {
  width: 50px;
  height: 50px;
  background: #b401f54e;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.indicadores_icone3 {
  width: 50px;
  height: 50px;
  background: #01f5225d;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.indicadores_icone4 {
  width: 50px;
  height: 50px;
  background: #0187f53d;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.indicadores_info {
  display: flex;
  flex-direction: column;
}

.indicadores_valor {
  font-size: 20px;
  font-weight: 400;
  font-family: poppins, sans-serif;
  color: #0e2238;
}

.indicadores_texto {
  font-size: 15px;
  color: #0e2238;
}

.home_texto2 {
  text-align: center;
  background: #eef2f7;
  padding: 5rem 2rem 2rem;
  margin-bottom: 5rem;
  
}

.home_texto2 h2 {
  font-size: 2rem;
  font-family: Poppins, sans-serif;
  color: #0e2238;
  margin-bottom: 0.7rem;
}

.home_texto2 h2::after {
  content: "";
  display: block;
  width: 69px;
  height: 4px;
  background: #f5b301;
  margin: 0.5rem auto 0;
}

.home__cards {
  display: flex;                                                                  
  flex-direction: column;
  align-items: center;
  gap: 5rem;      
  padding-bottom: 9rem;                                                              
}
 
.cards-row {
  display: flex;
  flex-direction: row;
  gap: 10rem;
}
 
.card_controle {
  display: flex;                                                                  
  flex-direction: column;                                                          
  align-items: center;                                                            
  padding: 1.5rem;                                                                
  background: #ffff;                                                            
  border: 1px solid #E2E8F0;                                                      
  border-radius: 12px;    
  width: 16rem;
  height: 15rem;
  position: relative;   
  box-shadow: 0 8px 20px rgba(0, 0 ,0 ,0.20);                                                         
}
 
.card_controle h2 {
  font-size: 23px;
  font-family: poppins;
  font-weight: 600;
  text-align: center;
  color: #0e2238;
  margin-top: 2rem;
  margin-bottom: 1.9rem;;
}
 
.card_controle p {
  font-size: 1rem;
  font-family:'Inter', sans-serif;
  font-weight: 300;
  text-align: center;
  color: #000000;
}
                                                     
.card_registro {
  display: flex;                                                                  
  flex-direction: column;                                                          
  align-items: center;                                                            
  padding: 1.5rem;                                                                
  background: #ffff;                                                            
  border: 1px solid #E2E8F0;                                                      
  border-radius: 12px;    
  width: 16rem;
  height: 15rem;
  position: relative;   
  box-shadow: 0 8px 20px rgba(0, 0 ,0 ,0.20);                                                           
}
 
.card_registro h2 {
  font-size: 23px;
  font-family: poppins;
  font-weight: 600;
  text-align: center;
  color: #0e2238;
  margin-top: 2rem;
  margin-bottom: 1.9rem;;
}
 
.card_registro p {
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  text-align: center;
  color: #000000;
}
 
.card_gestao {
  display: flex;                                                                  
  flex-direction: column;                                                          
  align-items: center;                                                            
  padding: 1.5rem;                                                                
  background: #ffff;                                                            
  border: 1px solid #E2E8F0;                                                      
  border-radius: 12px;    
  width: 16rem;
  height: 15rem;
  position: relative;
  box-shadow: 0 8px 20px rgba(0, 0 ,0 ,0.20);                                                              
}

 
.card_gestao h2 {
  font-size: 23px;
  font-family: poppins;
  font-weight: 600;
  text-align: center;
  color: #0e2238;
  margin-top: 2rem;
  margin-bottom: 1.9rem;
}
 
.card_gestao p {
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  text-align: center;
  color: #000000;
}
 
.card_relatorios {
  display: flex;                                                                  
  flex-direction: column;                                                          
  align-items: center;                                                            
  padding: 1.5rem;                                                                
  background: #ffff;                                                            
  border: 1px solid #E2E8F0;                                                      
  border-radius: 12px;    
  height: 16rem;
  width: 15rem; 
  box-shadow: 0 8px 20px rgba(0, 0 ,0 ,0.20);             
}
 
.card_relatorios h2 {
  font-size: 23px;
  font-family: poppins;
  font-weight: 600;
  text-align: center;
  color: #0e2238;
  margin-bottom: 1.9rem;
}
 
.card_relatorios p {
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  text-align: center;
  color: #000000 ;
}
 
.card_rastreabilidade {
  display: flex;                                                                  
  flex-direction: column;                                                          
  align-items: center;                                                            
  padding: 1.5rem;                                                                
  background: #ffff;                                                            
  border: 1px solid #E2E8F0;                                                      
  border-radius: 12px;    
  height: 16rem;
  width: 15rem;                                    
   box-shadow: 0 8px 20px rgba(0, 0 ,0 ,0.20);       
}
 
.card_rastreabilidade h2 {
  font-size: 23px;
  font-family: poppins;
  font-weight: 600;
  text-align: center;
  color: #0e2238;
  margin-bottom: 1.9rem;
}
 
.card_rastreabilidade p {
  font-size: 1..1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  text-align: center;
  color: #000000 ;
}
 
.card-segundo {
  display: flex;                                                                  
  flex-direction: row;  
  border-right: 10rem;                                                        
  align-items: center;                                                            
  justify-content: center;
  padding: 1.5rem;                                                                
  border-radius: 12px;    
  gap: 10rem;  
}
 
.card_icone {
  display: flex;
  flex-direction: column;
  width: 45px;
  height: 45px;
  background-color: #0e2238;
  border: 1px solid #E2E8F0;  
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%) rotate(-46deg);
   border: 1px solid #E2E8F0;  
   border-radius: 0.3rem;
}
 
.card_controle .card_icone img {
  width: 24px;
  height: 24px;
  transform: rotate(45deg);
}
 
.card_registro .card_icone img {
  width: 24px;
  height: 24px;
  transform: rotate(45deg);
}
 
.card_gestao .card_icone img {
  width: 24px;
  height: 24px;
  transform: rotate(45deg);
}
 
.card_icone2 {
  display: flex;
  flex-direction: column;
  width: 45px;
  height: 45px;
  background-color: #0e2238;
  border: 1px solid #E2E8F0;  
  justify-content: center;
  align-items: center;
  position: relative;
  top: -46px;
  left: 50%;
  transform: translateX(-50%) rotate(-46deg);
   border: 1px solid #E2E8F0;  
   border-radius: 0.3rem;
}
 
.card_relatorios .card_icone2 img {
  width: 24px;
  height: 24px;
  transform: rotate(45deg);
}
 
.card_rastreabilidade .card_icone3 img {
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
}
 
.card_icone3 {
  display: flex;
  flex-direction: column;
  width: 45px;
  height: 45px;
  background-color: #0e2238;
  border: 1px solid #E2E8F0;  
  justify-content: center;
  align-items: center;
  position: relative;
  top: -46px;
  left: 1.5rem;;
  transform: translateX(-50%) rotate(-46deg);
   border: 1px solid #E2E8F0;  
   border-radius: 0.3rem;
}
 
</style>