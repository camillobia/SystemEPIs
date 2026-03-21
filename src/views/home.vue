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
                 <img src="../assets/card_1.png" alt="icone de EPI";>
            </span>                                       
           </div>
         <h2>Controle de Estoque</h2>
         <p>Acompanhe em tempo real a quantidade de EPIs disponíveis e mantenha o estoque sempre organizado.
           </p>
        </div>                                                                       

        <div class="card_registro">                 
          <span class="card_icone"></span>                                       
          <h2>Registro de Entregas</h2>    
          <p>Registre e acompanhe a entrega de equipamento de proteção individual para cada colaborador</p>
          </div>
        
        
           <div class="card_gestao">                 
          <span class="card_icone"></span>                                       
          <h2>Gestão de Usuários</h2>    
          <p>Cadastre colaboradores e gerencie permisões de acessoao sistema de gestão de EPIs
           </p>  
        </div>
      </div>
      <div class="card-segundo">      
        <div class="card_relatorios">                 
          <span class="card__icone"></span>                                       
          <h2>Relatórios</h2>    
          <p>Visualize relatórios e dados importantes para acompanhar o uso e controles dos EPIs
           </p>
           </div>
           <div class="card_rastreabilidade">
          <span class="card__icone"></span>                                       
          <h2>Rastreabilidade</h2>    
          <p>Visualize relatórios e dados importantes para acompanhar o uso e controles dos EPIs
           </p>
           </div>
           </div>                                                               
    </section>
  </div>                                                                           

</template>                                                                        <!-- fecha o template -->
<script setup>
import Header from '../components/header.vue';
</script>

<style scoped>  


.home {                                                                 
  background: #E8E8EE;                                                             /* fundo cinza claro */
}
.home__hero {
  display: flex;                                                                   /* texto e imagem lado a lado */
  align-items: flex-start;                                                         /* alinha no topo */
  gap: 2rem;                                                                       /* espaço entre texto e imagem */
  margin-bottom:15rem;                                                             /* espaço abaixo da seção */
}

.home_texto-titulo { 
  font-size: 26px;
  font-family: poppins, sans-serif;
  font-weight: semi-bold;
  text-align: left;
  color: #0e2238;
  margin-left: 11rem;
  margin-top: 10rem;
}

.home_texto-titulo p {
  font-size: 20px;
}/* ocupa metade do espaço */
              

.landing_page-imagem { 
  flex: 1;
  display: flex;
  justify-content: right;
  align-items: center;
  margin-right: 3rem;
  margin-top: 1rem;
}

.landing_page-imagem img {
  width: 45rem;
  max-width: 100rem;
  height: auto;
  border-radius: 10px;
}


/* estilo do <p> dentro de .home__hero-texto */
.home__hero-texto p {
  font-size: 20px;                                                                 /* tamanho do texto */
  color: #555;                                                                     /* cinza médio */
  line-height: 1.7;                                                                /* espaço entre linhas */
}

/* estilo do <img class="home__hero-img"> */
.home__hero-img {
  width: 100%;                                                                     /* ocupa toda a largura do bloco */
  border-radius: 12px;                                                             /* cantos arredondados */
}

/* estilo do <section class="home__cards"> */
.home__cards {
  display: flex;                                                                  
  flex-direction: column;
  align-items: center;
  gap: 5rem;                                                                    
}

.cards-row {
  display: flex;
  flex-direction: row;
  gap: 5rem;
}

/* estilo do <div class="card"> */
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
  font-size: 20px;
  font-family: poppins;
  font-weight: semi-bold;
  text-align: center;
  color: #0e2238;
  margin-bottom: 1rem;
}

.card_controle p {
  font-size: 1.0rem;
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
}

.card_registro h2 {
  font-size: 20px;
  font-family: poppins;
  font-weight: semi-bold;
  text-align: center;
  color: #0e2238;
  margin-bottom: 1rem;
}

.card_registro p {
  font-size: 1.0rem;
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
}

.card_gestao h2 {
  font-size: 20px;
  font-family: poppins;
  font-weight: semi-bold;
  text-align: center;
  color: #0e2238;
  margin-bottom: 1rem;
}

.card_gestao p {
  font-size: 1.0rem;
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
  width: 50px;
  height: 50px;
  background-color: #0e2238;
  border: 1px solid #E2E8F0;   
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%) rotate(-50deg);
}

</style>                                                                            