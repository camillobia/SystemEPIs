<template>
  <footer class="footer">
    <div class="footer__content">
    <div class="footer__brand">
    <div class="footer__brand-top">
    <div class="logo-icon">
    <img src="../assets/logo_icone.png" alt="Logo da Empresa" />
    </div>

    <h2 class="footer_logo-text">
         System<span class="EPI">EPI</span>
        </h2>
        </div>
        <p>Sistema Inteligente para controle <br />
          e gestão de Equipamentos <br />
          de Proteção Individual
        </p>
      </div>

      <div class="footer__colunas">
        <h4>Sistema</h4>
        <a href="#">Controle de EPIs</a>
        <a href="#">Estoque</a>
        <a href="#">Validade</a>
        <a href="#">Dashboard</a>
        <a href="#">Relatórios</a>
      </div>

      <div class="footer__colunas">
        <h4>Funcionalidades</h4>
        <a href="#">Rastreabilidade</a>
        <a href="#">Histórico de entregas</a>
        <a href="#">Gestão de colaboradores</a>
        <a href="#">Segurança do trabalho</a>
      </div>

      <div class="footer__colunas">
        <h4>Suporte</h4>
        <a href="#">Ajuda</a>
        <a href="#">Contato</a>
        <a href="#">Suporte</a>
        <a href="#">FAQ</a>
      </div>

      <div class="footer__colunas">
        <h4>Redes sociais</h4>

        <div class="footer_icones">
          <a href="https://www.instagram.com/" class="footer__link">
            <img src="../assets/icone_instagram.png" alt="icone instagram" />
          </a>

          <a href="https://pt-br.facebook.com/" class="footer__link">
            <img src="../assets/icone_facebook.png" alt="icone facebook" />
          </a>

          <a href="https://br.linkedin.com/" class="footer__link">
            <img src="../assets/icone_linkedin.png" alt="icone linkedin" />
          </a>

          <a href="https://web.whatsapp.com/" class="footer__link">
            <img src="../assets/icone_whatsapp.png" alt="icone whatsapp" />
          </a>
        </div>
      </div>
    </div>

    <div class="footer_copy">
      <p>© 2026 System EPI. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #e8e8ee;
  padding: 3rem 4rem 1rem;
}

.footer__content {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 9rem;
  margin-bottom: 0.5rem;
}

.footer__brand {
  max-width: 240px;
}

.footer__brand-top {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
}

.logo-icon img {
  width: 50px;
  height: 25px;
  object-fit: contain;
  transform: rotate(-12deg) translate(-19px, -27px);
}

.footer_logo-text {
  font-size: 1.2rem;
  font-family: poppins, sans-serif;
  font-weight: semi-bold;
  color: #0e2238;
  position: relative;
  top: -9px;
  left: -57px;
}

.footer_logo-text .EPI {
  color: #f5b301;
  margin-left: 3px;
}

.footer__brand p {
  font-size: 0.7rem;
  line-height: 1.5;
  font-family: poppins, sans-serif;
  font-weight: semi-bold;
  color: #0e2238;
   position: relative;
  top: -23px;
  left: 1px;
}

.footer__colunas {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 150px;
}

.footer__colunas h4 {
  font-size: 0.9rem;
  font-family: poppins, sans-serif;
  font-weight: semi-bold;
  color: #0e2238;

}

.footer__colunas a {
  font-size: 0.8rem;
  font-family: poppins, sans-serif;
  font-weight: semi-bold    ;
  color: #0e2238;
}

.footer__colunas a:hover {
  opacity: 0.7; 
}

.footer_icones {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.3rem;
}

.footer_icones img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.footer_copy {
  width: 100%;
  text-align: center;
  border-top: 1px solid #0e2238;
  padding-top: 1rem;
}

.footer_copy p {
  margin: 0;
  color: #0e2238;
  font-size: 0.6rem;
  font-family: poppins, sans-serif;
}
</style>