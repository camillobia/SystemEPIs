<template>                                                                         
<Header />
  <div class="home">                                                               <!-- div principal que centraliza o conteúdo -->

    <!-- ========== HERO ========== -->
    <section class="home__hero">                                                   <!-- seção com título, texto e imagem -->


      <div class="home_texto-titulo">                                               <!-- lado esquerdo: título e descrição -->
        <h1>Controle e<br> Gestão de EPIs </h1>   
                                    
        <p>Controle estoque, entregas e validade <br> dos equipamentos de proteção em um único sistema.
       </p>
      </div>                                                                       <!-- fecha o bloco de texto -->
      

      <div class="landing_page-imagem">                                                   <!-- lado direito: imagem ilustrativa -->
        <img src="../assets/landing_page.jpeg" alt="Ilustração de segurança no trabalho"> <!-- imagem do herói -->
      </div>                                                                       <!-- fecha o bloco de imagem -->

    </section>                                                                     <!-- fecha a seção hero -->

    <!-- ========== CARDS DE RESUMO ========== -->
    <section class="home__cards">                                                  <!-- seção com os 4 cards de números -->

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
  background: #e8e8ee;
}


.home__hero {
  display: flex;                                                                  
  align-items: flex-start;                                                         
  gap: 2rem;                                                                       
  margin-bottom:15rem;     
   background:radial-gradient(circle, #e8e8ee 0%, #E1EBEE 70%, #0e2238 100%);
   position: relative;
   overflow: hidden;   
   padding: 50px 0rem 65px 2rem;                                                   
}

.home__hero::before {
  content: "";
  position: absolute;
  top: 20px;
  left: -120px;
  width: 900px;
  height: 300px;
  background: rgba (255,255, 255, 0.22);
  border-radius: 80px;
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
  font-family: poppins, sans-serif;
  font-weight: semi-bold;
  text-align: left;
  color: #0e2238;
  margin-left: 11rem;
  margin-top: 10rem;
}

.home_texto-titulo p {
  font-size: 1.25rem;
}
              

.landing_page-imagem { 
  flex: 1;
  display: flex;
  justify-content: right;
  align-items: center;
  margin-right: 5rem;
  margin-top: 3rem;
}

.landing_page-imagem img {
  width: 40rem;
  max-width: 100rem;
  height: auto;
  border-radius: 1rem;
}



.home__hero-texto p {
  font-size: 1.25rem;                                                                 
  color: #555;                                                                     
  line-height: 1.7;                                                               
}


.home__hero-img {
  width: 100%;                                                                    
  border-radius: 12px;                                                             
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
  width: 12rem;
  height: 16rem;
  position: relative;    
                                                         
}


.card_controle h2 {
  font-size: 22px;
  font-family: poppins;
  font-weight: semi-bold;
  text-align: center;
  color: #0e2238;
  margin-top: 2rem;
  margin-bottom: 1.9rem;;
}

.card_controle p {
  font-size: 0.93rem;
  text-align: center;
  color: #0e2238 ;
}
                                                     
.card_registro {
  display: flex;                                                                   
  flex-direction: column;                                                          
  align-items: center;                                                            
  padding: 1.5rem;                                                                 
  background: #ffff;                                                             
  border: 1px solid #E2E8F0;                                                      
  border-radius: 12px;    
  width: 12rem;
  height: 16rem;
  position: relative;                                                          
}

.card_registro h2 {
  font-size: 22px;
  font-family: poppins;
  font-weight: semi-bold;
  text-align: center;
  color: #0e2238;
  margin-top: 2rem;
  margin-bottom: 1.9rem;;
}

.card_registro p {
  font-size: 0.94rem;
  text-align: center;
  color: #0e2238 ;
}

.card_gestao {
  display: flex;                                                                   
  flex-direction: column;                                                          
  align-items: center;                                                            
  padding: 1.5rem;                                                                 
  background: #ffff;                                                             
  border: 1px solid #E2E8F0;                                                      
  border-radius: 12px;    
  width: 12rem;
  height: 16rem;
  position: relative;                                                          
}

.card_gestao h2 {
  font-size: 20px;
  font-family: poppins;
  font-weight: semi-bold;
  text-align: center;
  color: #0e2238;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.card_gestao p {
  font-size: 0.93rem;
  text-align: center;
  color: #0e2238 ;
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
  width: 12rem;                                             
}

.card_relatorios h2 {
  font-size: 20px;
  font-family: poppins;
  font-weight: semi-bold;
  text-align: center;
  color: #0e2238;
  margin-bottom: 1rem;
}

.card_relatorios p {
  font-size: 1.0rem;
  text-align: center;
  color: #0e2238 ;
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
  width: 12rem;   
                                       
}

.card_rastreabilidade h2 {
  font-size: 20px;
  font-family: poppins;
  font-weight: semi-bold;
  text-align: center;
  color: #0e2238;
  margin-bottom: 1rem;
}

.card_rastreabilidade p {
  font-size: 1.0rem;
  text-align: center;
  color: #0e2238 ;
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