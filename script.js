document.addEventListener(
  "DOMContentLoaded",
  function () {

    const canvas =
      document.getElementById("roleta");

    const ctx =
      canvas.getContext("2d");

    const btnGirar =
      document.getElementById("btnGirar");

    const btnReiniciar =
      document.getElementById("btnReiniciar");

    const nomeSorteado =
      document.getElementById("nomeSorteado");

    const contadorSorteados =
      document.getElementById("contadorSorteados");


    /* =========================================
       PARTICIPANTES
    ========================================= */

    const participantes = [

      {
        nome: "Marliane",
        cor: "#E7C2B8"
      },

      {
        nome: "Luis",
        cor: "#87CEEB"
      },

      {
        nome: "Solange",
        cor: "#E7C2B8"
      },

      {
        nome: "Claudia E.",
        cor: "#E7C2B8"
      },

      {
        nome: "Claudia K.",
        cor: "#E7C2B8"
      },

      {
        nome: "Patrick",
        cor: "#87CEEB"
      },

      {
        nome: "Janice",
        cor: "#E7C2B8"
      },

      {
        nome: "William",
        cor: "#87CEEB"
      },

      {
        nome: "Poliana",
        cor: "#E7C2B8"
      },

      {
        nome: "Ermelinda",
        cor: "#E7C2B8"
      }

    ];


    const quantidade =
      participantes.length;

    const circulo =
      Math.PI * 2;

    const anguloFatia =
      circulo / quantidade;

    const centroX =
      canvas.width / 2;

    const centroY =
      canvas.height / 2;

    const raio =
      canvas.width / 2 - 15;


    let rotacaoAtual = 0;

    let girando = false;

    let nomesDisponiveis = [];

    let nomesJaSorteados = [];


    /* =========================================
       PREPARAR NOMES
    ========================================= */

    function prepararNomes() {

      nomesDisponiveis =
        participantes.map(
          function (_, indice) {
            return indice;
          }
        );

      nomesJaSorteados = [];

      atualizarContador();

    }


    /* =========================================
       NORMALIZAR ÂNGULO
    ========================================= */

    function normalizarAngulo(angulo) {

      return (
        (angulo % circulo) +
        circulo
      ) % circulo;

    }


    /* =========================================
       ESCURECER COR
    ========================================= */

    function escurecerCor(cor) {

      if (cor === "#87CEEB") {
        return "#416774";
      }

      return "#735F5B";

    }


    /* =========================================
       DESENHAR ROLETA
    ========================================= */

    function desenharRoleta(rotacao) {

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );


      participantes.forEach(
        function (participante, indice) {

          const inicio =
            rotacao +
            indice * anguloFatia;

          const fim =
            inicio + anguloFatia;


          ctx.beginPath();

          ctx.moveTo(
            centroX,
            centroY
          );

          ctx.arc(
            centroX,
            centroY,
            raio,
            inicio,
            fim
          );

          ctx.closePath();


          const jaFoiSorteado =
            nomesJaSorteados.includes(
              indice
            );


          if (jaFoiSorteado) {

            ctx.fillStyle =
              escurecerCor(
                participante.cor
              );

          } else {

            ctx.fillStyle =
              participante.cor;

          }


          ctx.fill();


          ctx.strokeStyle =
            "#101010";

          ctx.lineWidth =
            5;

          ctx.stroke();


          /* =================================
             NOMES
          ================================= */

          const meio =
            inicio +
            anguloFatia / 2;


          ctx.save();

          ctx.translate(
            centroX,
            centroY
          );

          ctx.rotate(
            meio
          );


          const meioNormalizado =
            normalizarAngulo(
              meio
            );


          if (
            meioNormalizado >
              Math.PI / 2 &&
            meioNormalizado <
              Math.PI * 1.5
          ) {

            ctx.rotate(
              Math.PI
            );

            ctx.textAlign =
              "left";

            ctx.translate(
              -raio * 0.88,
              0
            );

          } else {

            ctx.textAlign =
              "right";

            ctx.translate(
              raio * 0.88,
              0
            );

          }


          if (jaFoiSorteado) {

            ctx.fillStyle =
              "#555555";

          } else {

            ctx.fillStyle =
              "#111111";

          }


          /* TAMANHO DOS NOMES */

          ctx.font =
            "italic bold 50px Georgia, serif";


          ctx.textBaseline =
            "middle";


          ctx.shadowColor =
            "rgba(255,255,255,0.25)";

          ctx.shadowBlur =
            2;


          ctx.fillText(
            participante.nome,
            0,
            0
          );


          ctx.restore();

        }
      );


      /* =================================
         CENTRO
      ================================= */

      ctx.beginPath();

      ctx.arc(
        centroX,
        centroY,
        raio * 0.17,
        0,
        circulo
      );

      ctx.fillStyle =
        "#02090d";

      ctx.fill();

      ctx.lineWidth =
        7;

      ctx.strokeStyle =
        "#00c8ff";

      ctx.stroke();

    }


    /* =========================================
       ANIMAÇÃO
    ========================================= */

    function easeOutQuint(t) {

      return (
        1 -
        Math.pow(
          1 - t,
          5
        )
      );

    }


    /* =========================================
       CONTADOR
    ========================================= */

    function atualizarContador() {

      contadorSorteados.textContent =
        nomesJaSorteados.length +
        " / " +
        participantes.length;

    }


    /* =========================================
       ESCOLHER SEM REPETIR
    ========================================= */

    function escolherParticipante() {

      const posicaoAleatoria =
        Math.floor(
          Math.random() *
          nomesDisponiveis.length
        );


      const indiceParticipante =
        nomesDisponiveis[
          posicaoAleatoria
        ];


      return {

        indice:
          indiceParticipante,

        posicao:
          posicaoAleatoria

      };

    }


    /* =========================================
       GIRAR ROLETA
    ========================================= */

    function girarRoleta() {

      if (girando) {
        return;
      }


      if (
        nomesDisponiveis.length === 0
      ) {

        nomeSorteado.textContent =
          "TODOS SORTEADOS";

        nomeSorteado.style.color =
          "#ffffff";

        btnGirar.disabled =
          true;

        return;

      }


      girando = true;

      btnGirar.disabled =
        true;

      nomeSorteado.textContent =
        "...";

      nomeSorteado.style.color =
        "#ffffff";


      /* ESCOLHA SEM REPETIÇÃO */

      const escolha =
        escolherParticipante();


      const vencedorIndice =
        escolha.indice;


      const vencedor =
        participantes[
          vencedorIndice
        ];


      const anguloPonteiro =
        -Math.PI / 2;


      const destinoNormalizado =
        normalizarAngulo(

          anguloPonteiro -

          (
            vencedorIndice +
            0.5
          ) *

          anguloFatia

        );


      const atualNormalizado =
        normalizarAngulo(
          rotacaoAtual
        );


      let diferenca =
        normalizarAngulo(

          destinoNormalizado -
          atualNormalizado

        );


      const voltas =
        7 +
        Math.floor(
          Math.random() * 4
        );


      diferenca +=
        voltas *
        circulo;


      const inicioRotacao =
        rotacaoAtual;


      const destinoRotacao =
        inicioRotacao +
        diferenca;


      const duracao =
        5200;


      const inicioTempo =
        performance.now();


      function animar(
        tempoAtual
      ) {

        const tempo =
          tempoAtual -
          inicioTempo;


        let progresso =
          tempo /
          duracao;


        progresso =
          Math.min(
            progresso,
            1
          );


        const suavizado =
          easeOutQuint(
            progresso
          );


        rotacaoAtual =
          inicioRotacao +
          (
            destinoRotacao -
            inicioRotacao
          ) *
          suavizado;


        desenharRoleta(
          rotacaoAtual
        );


        if (
          progresso < 1
        ) {

          requestAnimationFrame(
            animar
          );

        } else {


          rotacaoAtual =
            destinoNormalizado;


          /* REMOVE O VENCEDOR
             DOS PRÓXIMOS SORTEIOS */

          nomesDisponiveis.splice(
            escolha.posicao,
            1
          );


          nomesJaSorteados.push(
            vencedorIndice
          );


          desenharRoleta(
            rotacaoAtual
          );


          nomeSorteado.textContent =
            vencedor.nome;


          /* =================================
             COR DO RESULTADO
          ================================= */

          if (
            vencedor.nome === "Luis" ||
            vencedor.nome === "Patrick" ||
            vencedor.nome === "William"
          ) {

            nomeSorteado.style.color =
              "#87CEEB";

          } else {

            nomeSorteado.style.color =
              "#E7C2B8";

          }


          atualizarContador();


          girando = false;


          if (
            nomesDisponiveis.length > 0
          ) {

            btnGirar.disabled =
              false;

          } else {

            btnGirar.disabled =
              true;


            setTimeout(
              function () {

                nomeSorteado.textContent =
                  "TODOS SORTEADOS";

                nomeSorteado.style.color =
                  "#ffffff";

              },
              1600
            );

          }

        }

      }


      requestAnimationFrame(
        animar
      );

    }


    /* =========================================
       REINICIAR
    ========================================= */

    function reiniciarRoleta() {

      if (girando) {
        return;
      }


      prepararNomes();


      nomeSorteado.textContent =
        "—";

      nomeSorteado.style.color =
        "#ffffff";


      btnGirar.disabled =
        false;


      rotacaoAtual =
        -Math.PI / 2 -
        anguloFatia / 2;


      desenharRoleta(
        rotacaoAtual
      );

    }


    /* =========================================
       EVENTOS
    ========================================= */

    btnGirar.addEventListener(
      "click",
      girarRoleta
    );


    btnReiniciar.addEventListener(
      "click",
      reiniciarRoleta
    );


    /* =========================================
       INICIALIZAÇÃO
    ========================================= */

    prepararNomes();


    rotacaoAtual =
      -Math.PI / 2 -
      anguloFatia / 2;


    desenharRoleta(
      rotacaoAtual
    );

  }
);